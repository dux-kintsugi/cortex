/* ============================================================
   Cortex — training.js (v2)
   Personalized plan, daily sessions, two-tier streaks with
   shields, quick sessions, finale ceremony + day tags, daily
   challenge, assess-anchored live domain scores.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const SESSION_SIZE = 4;

  /* ---------------- Plan ---------------- */
  BT.generatePlan = function (domainScores) {
    const weights = {};
    for (const dk of BT.DOMAIN_KEYS) {
      const s = domainScores[dk];
      weights[dk] = BT.clamp(105 - (s == null ? 55 : s), 15, 105);
    }
    const focus = BT.DOMAIN_KEYS
      .filter(dk => domainScores[dk] != null)
      .sort((a, b) => domainScores[a] - domainScores[b])
      .slice(0, 3);
    BT.state.plan = { generatedAt: Date.now(), weights, focus };
    BT.save();
    return BT.state.plan;
  };

  /* ---------------- Today's session (variety-aware) ----------------
     Deterministic per day. Weights combine: domain weakness (from the plan)
     × recency starvation (games you haven't seen in a while bubble up)
     × a soft same-domain penalty. Recency is frozen to *before today* so the
     lineup never changes mid-day as you play. Max 2 never-played games per
     session so a content drop doesn't turn training into a tutorial marathon. */
  BT.todaysGames = function () {
    const plan = BT.state.plan;
    const allIds = BT.taskOrder.slice();
    if (!allIds.length) return [];
    const today = BT.dayKey();
    const rnd = BT.rng(BT.hashStr(today + ':' + (plan ? plan.generatedAt : 0)));

    // last play BEFORE today (mid-day stability)
    const lastPlayed = {};
    for (const s of BT.state.sessions) {
      if (s.mode !== 'assess' && BT.dayKey(s.ts) !== today) lastPlayed[s.taskId] = s.ts;
    }
    const NEVER = 8;
    const starve = id => lastPlayed[id] == null ? NEVER
      : BT.clamp(BT.daysBetween(BT.dayKey(lastPlayed[id]), today), 0.5, NEVER);
    const isNew = id => lastPlayed[id] == null;

    const chosen = [];
    const domainCount = {};
    let newCount = 0;

    function weightedPick(pool, weightFn) {
      let usable = pool.filter(id => chosen.indexOf(id) === -1 &&
        (!isNew(id) || newCount < 2));
      // fresh installs: everything is "new" — the cap must not starve the session
      if (!usable.length) usable = pool.filter(id => chosen.indexOf(id) === -1);
      if (!usable.length) return null;
      const weights = usable.map(weightFn);
      const total = weights.reduce((s, w) => s + w, 0);
      let r = rnd() * total;
      for (let i = 0; i < usable.length; i++) {
        r -= weights[i];
        if (r <= 0) return usable[i];
      }
      return usable[usable.length - 1];
    }

    function commit(id) {
      if (!id) return;
      chosen.push(id);
      const dk = BT.tasks[id].domain;
      domainCount[dk] = (domainCount[dk] || 0) + 1;
      if (isNew(id)) newCount++;
    }

    if (!plan) {
      // no assessment yet — pure variety rotation
      while (chosen.length < SESSION_SIZE) {
        const pick = weightedPick(allIds, id => starve(id));
        if (!pick) break;
        commit(pick);
      }
      return chosen;
    }

    // Slot 1: weakest domain — always trained, rotating by starvation within it.
    if (plan.focus.length) {
      const pool = BT.tasksByDomain(plan.focus[0]).map(t => t.id);
      commit(weightedPick(pool, id => starve(id)));
    }

    // Remaining slots: weakness × starvation × soft same-domain penalty.
    while (chosen.length < SESSION_SIZE) {
      const pick = weightedPick(allIds, id => {
        const dk = BT.tasks[id].domain;
        const domainW = (plan.weights[dk] || 50);
        const repeatPenalty = Math.pow(0.25, domainCount[dk] || 0);
        return domainW * starve(id) * repeatPenalty;
      });
      if (!pick) break;
      commit(pick);
    }
    return chosen;
  };

  BT.todaysProgress = function () {
    const games = BT.todaysGames();
    const today = BT.dayKey();
    const done = {};
    for (const s of BT.state.sessions) {
      if (s.mode !== 'assess' && BT.dayKey(s.ts) === today) done[s.taskId] = true;
    }
    return games.map(id => ({ id, done: !!done[id] }));
  };

  /* ---------------- Streak v2: two tiers + shields ---------------- */
  // tier: 'lite' (>=1 game — keeps the streak) | 'full' (whole session) | 'shield'
  function markDayDone(tier) {
    const today = BT.dayKey();
    const st = BT.state.streak;
    const already = BT.state.doneDays[today];

    if (already === true) BT.state.doneDays[today] = 'full'; // v1 migration
    if (already) {
      // upgrade lite -> full; never downgrade
      if (tier === 'full' && BT.state.doneDays[today] === 'lite') {
        BT.state.doneDays[today] = 'full';
        BT.save();
      }
      return;
    }

    BT.state.doneDays[today] = tier;
    if (st.lastDay && BT.daysBetween(st.lastDay, today) === 1) st.count += 1;
    else if (st.lastDay !== today) st.count = 1;
    st.lastDay = today;
    st.best = Math.max(st.best || 0, st.count);
    // earn a shield every 7 consecutive days (cap 2)
    if (st.count > 0 && st.count % 7 === 0) st.shields = Math.min((st.shields || 0) + 1, 2);
    BT.save();
  }

  /* Engine hook — runs after every recorded non-assess round.
     >=1 game today keeps the streak alive (lite); all of today's games = full. */
  BT.maybeMarkDayDone = function () {
    const prog = BT.todaysProgress();
    if (!prog.length) return;
    if (prog.every(g => g.done)) markDayDone('full');
    else if (prog.some(g => g.done)) markDayDone('lite');
  };

  /* Boot-time repair: consume a shield to bridge exactly one missed day. */
  BT.reconcileStreak = function () {
    const st = BT.state.streak;
    if (!st.lastDay) return;
    const gap = BT.daysBetween(st.lastDay, BT.dayKey());
    if (gap === 2 && (st.shields || 0) > 0) {
      const missed = new Date(st.lastDay + 'T12:00');
      missed.setDate(missed.getDate() + 1);
      const missedKey = BT.dayKey(missed.getTime());
      st.shields -= 1;
      BT.state.doneDays[missedKey] = 'shield';
      st.lastDay = missedKey;
      st.count += 1;
      st.best = Math.max(st.best || 0, st.count);
      BT.save();
      return missedKey; // caller may announce the save
    }
    return null;
  };

  BT.currentStreak = function () {
    const st = BT.state.streak;
    if (!st.lastDay) return 0;
    const gap = BT.daysBetween(st.lastDay, BT.dayKey());
    return gap <= 1 ? st.count : 0;
  };

  /* ---------------- Sessions ---------------- */
  BT.runTrainingSession = function (onDone) {
    const remaining = BT.todaysProgress().filter(g => !g.done).map(g => g.id);
    const streakBefore = BT.currentStreak();
    if (!remaining.length) {
      markDayDone('full');
      showFinale(streakBefore, () => { if (onDone) onDone({ completed: true, aborted: false }); });
      return;
    }
    const total = remaining.length;

    function runFrom(i) {
      if (i >= remaining.length) {
        markDayDone('full'); // idempotent; engine hook usually beat us here
        showFinale(streakBefore, () => { if (onDone) onDone({ completed: true, aborted: false }); });
        return;
      }
      BT.runTask({
        taskId: remaining[i],
        mode: 'train',
        seq: { index: i + 1, total },
        onDone: res => {
          if (!res) { if (onDone) onDone({ completed: false, aborted: true }); return; }
          runFrom(i + 1);
        },
      });
    }
    runFrom(0);
  };

  /* Quick session: one game (~2 min), keeps the streak on busy days. */
  BT.runQuickSession = function (onDone) {
    const prog = BT.todaysProgress();
    const next = prog.filter(g => !g.done).map(g => g.id)[0];
    if (!next) { if (onDone) onDone({ completed: true }); return; }
    const streakBefore = BT.currentStreak();
    BT.runTask({
      taskId: next,
      mode: 'train',
      onDone: res => {
        if (!res) { if (onDone) onDone({ completed: false, aborted: true }); return; }
        showQuickFinale(streakBefore, () => { if (onDone) onDone({ completed: true, aborted: false }); });
      },
    });
  };

  /* ---------------- Daily challenge (seeded 3-game gauntlet) ----------------
     ~Half of days roll a modifier — the twist keeps day 40 from feeling like day 4. */
  BT.CHALLENGE_MODS = {
    sprint:   { name: '⚡ Sprint', blurb: 'Rounds 25% shorter — pure pace.', durationScale: 0.75 },
    marathon: { name: '🏔 Marathon', blurb: 'Rounds 40% longer — hold your focus.', durationScale: 1.4 },
    highwire: { name: '🎪 High Wire', blurb: 'Every game one level up (maxed games stay maxed).', levelOffset: 1 },
  };

  // Games whose rounds are genuinely duration-driven — Sprint/Marathon are
  // no-ops on trial-based games, so those modifiers only draw from this pool.
  const DURATION_GAMES = ['symbols', 'gonogo', 'search', 'rotation', 'stroop', 'switching',
    'math', 'flanker', 'trails', 'mot', 'flicker', 'flashcount'];

  BT.todaysChallenge = function () {
    const day = BT.dayKey();
    const rnd = BT.rng(BT.hashStr(day + ':challenge'));
    const roll = rnd();
    const modKey = roll < 0.5 ? null : roll < 0.7 ? 'sprint' : roll < 0.85 ? 'marathon' : 'highwire';
    let pool = BT.taskOrder.slice();
    if (modKey === 'sprint' || modKey === 'marathon') {
      const dur = pool.filter(id => DURATION_GAMES.indexOf(id) !== -1);
      if (dur.length >= 3) pool = dur;
    }
    const ids = BT.shuffle(pool, rnd).slice(0, 3);
    return {
      games: ids.map((id, i) => ({ taskId: id, seed: BT.hashStr(day + ':' + id + ':' + i) })),
      modifier: modKey ? Object.assign({ key: modKey }, BT.CHALLENGE_MODS[modKey]) : null,
      done: BT.state.challengeDays[day] != null,
      score: BT.state.challengeDays[day],
    };
  };

  BT.runChallenge = function (onDone) {
    const ch = BT.todaysChallenge();
    const scores = [];

    function runFrom(i) {
      if (i >= ch.games.length) {
        const combined = Math.round(BT.mean(scores.filter(s => s != null)));
        BT.state.challengeDays[BT.dayKey()] = combined;
        BT.save();
        showChallengeFinale(combined, ch.modifier, () => { if (onDone) onDone({ completed: true, combined }); });
        return;
      }
      BT.runTask({
        taskId: ch.games[i].taskId,
        mode: 'challenge',
        rngSeed: ch.games[i].seed,
        durationScale: ch.modifier ? ch.modifier.durationScale : undefined,
        levelOffset: ch.modifier ? ch.modifier.levelOffset : undefined,
        seq: { index: i + 1, total: ch.games.length },
        onDone: res => {
          if (!res) { if (onDone) onDone({ completed: false, aborted: true }); return; }
          scores.push(res.score);
          runFrom(i + 1);
        },
      });
    }
    runFrom(0);
  };

  /* ---------------- Finale ceremonies ---------------- */
  function todaysSessionRows() {
    const today = BT.dayKey();
    const rows = [];
    for (const g of BT.todaysGames()) {
      const recs = BT.state.sessions.filter(s =>
        s.taskId === g && s.mode !== 'assess' && BT.dayKey(s.ts) === today && s.score != null);
      if (!recs.length) continue;
      const rec = recs[recs.length - 1];
      const prior = BT.state.sessions.filter(s =>
        s.taskId === g && s.mode !== 'assess' && s.score != null && s.ts < rec.ts);
      const prev = prior.length ? prior[prior.length - 1].score : null;
      rows.push({ id: g, score: rec.score, delta: prev == null ? null : rec.score - prev });
    }
    return rows;
  }

  function tagChips() {
    const today = BT.dayKey();
    const tags = BT.state.dayTags[today] = BT.state.dayTags[today] || {};
    function chip(label, isOn, onToggle) {
      const b = el('button', { class: 'pill tag-chip' + (isOn() ? ' active' : ''), text: label });
      b.addEventListener('click', () => { onToggle(); b.classList.toggle('active', isOn()); BT.save(); });
      return b;
    }
    const sleepRow = el('div', { class: 'tag-row' }, el('span', { class: 'small muted', text: '😴 Sleep' }),
      ['bad', 'ok', 'good'].map(v =>
        chip(v, () => tags.sleep === v, () => { tags.sleep = tags.sleep === v ? undefined : v; sleepRow.querySelectorAll('.tag-chip').forEach((c, i) => c.classList.toggle('active', tags.sleep === ['bad', 'ok', 'good'][i])); })));
    const boolRow = el('div', { class: 'tag-row' },
      chip('☕ caffeine', () => !!tags.caffeine, () => { tags.caffeine = !tags.caffeine; }),
      chip('🏃 exercise', () => !!tags.exercise, () => { tags.exercise = !tags.exercise; }),
      chip('😰 stress', () => !!tags.stress, () => { tags.stress = !tags.stress; }));
    return el('div', { class: 'tags-block' },
      el('div', { class: 'small muted', style: 'margin-bottom:6px;', text: 'How was today? (optional — unlocks correlations)' }),
      sleepRow, boolRow);
  }

  function ceremonyLayer(content, onClose) {
    const layer = el('div', { class: 'task-layer' },
      el('div', { class: 'task-veil' },
        el('div', { class: 'task-intro finale' }, content,
          el('button', {
            class: 'btn primary big', style: 'margin-top:18px;', text: 'Done',
            onclick: () => { layer.remove(); document.body.classList.remove('task-open'); onClose(); },
          }))));
    document.body.classList.add('task-open');
    document.body.appendChild(layer);
  }

  function streakTicker(from) {
    const to = BT.currentStreak();
    const n = el('div', { class: 'streak-big', text: '🔥 ' + from });
    if (to > from) {
      setTimeout(() => { n.textContent = '🔥 ' + to; n.classList.add('pb-pulse'); BT.beep('best'); }, 700);
    }
    const st = BT.state.streak;
    return el('div', null, n,
      el('div', { class: 'small muted', text:
        'day streak' + ((st.shields || 0) > 0 ? ' · 🛡 ×' + st.shields + ' shield' + (st.shields > 1 ? 's' : '') : '') +
        ((st.best || 0) > to ? ' · record ' + st.best : '') }));
  }

  function showFinale(streakBefore, onClose) {
    const rows = todaysSessionRows();
    const avg = rows.length ? Math.round(BT.mean(rows.map(r => r.score))) : null;
    ceremonyLayer(el('div', null,
      el('h2', { text: 'Session complete 🎉' }),
      avg != null ? el('div', { class: 'streak-big', style: 'font-size:2rem;', text: avg }) : null,
      avg != null ? el('div', { class: 'small muted', style: 'margin-bottom:12px;', text: 'today’s average score' }) : null,
      el('div', { style: 'margin:10px 0;text-align:left;' }, rows.map(r => {
        const t = BT.tasks[r.id];
        return el('div', { class: 'today-item' },
          el('span', { class: 't-icon', text: t ? t.icon : '❓' }),
          el('span', { class: 't-name', text: t ? t.name : r.id }),
          el('span', { class: 'pill', text: String(r.score) }),
          r.delta != null && r.delta !== 0
            ? el('span', { class: 'small', style: 'color:var(--' + (r.delta > 0 ? 'good' : 'bad') + ');', text: (r.delta > 0 ? '▲+' : '▼') + r.delta })
            : null);
      })),
      streakTicker(streakBefore),
      tagChips()), onClose);
  }

  function showQuickFinale(streakBefore, onClose) {
    ceremonyLayer(el('div', null,
      el('h2', { text: 'Streak kept 🔥' }),
      el('p', { class: 'muted', style: 'margin-bottom:10px;', text: 'A short day still counts. Come back for the full session if you find the time.' }),
      streakTicker(streakBefore),
      tagChips()), onClose);
  }

  function showChallengeFinale(combined, modifier, onClose) {
    // yesterday's challenge, if any, for comparison
    const y = new Date(); y.setDate(y.getDate() - 1);
    const prev = BT.state.challengeDays[BT.dayKey(y.getTime())];
    ceremonyLayer(el('div', null,
      el('h2', { text: 'Challenge complete ⚔️' }),
      modifier ? el('div', { class: 'pill focus', style: 'margin-bottom:8px;', text: modifier.name + ' modifier' }) : null,
      el('div', { class: 'streak-big', style: 'font-size:2.2rem;', text: String(combined) }),
      el('div', { class: 'small muted', text: 'combined score · 3 seeded games — same boards for everyone who plays today' }),
      prev != null ? el('div', { class: 'r-delta ' + (combined > prev ? 'up' : combined < prev ? 'down' : ''), style: 'margin-top:8px;', text: 'yesterday: ' + prev }) : null),
      onClose);
  }

  /* ---------------- Live domain scores (assess-anchored + ability drift) ----------------
     Percentile scores are only comparable at fixed difficulty, so the radar anchors on
     the latest assessment and drifts with training-ability change since then (~6 pts
     per ability level). Honest: no anchor -> no number. */
  BT.liveDomainScores = function () {
    const out = {};
    const a = BT.latestAssessment();
    for (const dk of BT.DOMAIN_KEYS) out[dk] = null;
    if (!a) return out;
    for (const dk of BT.DOMAIN_KEYS) {
      const anchor = a.domainScores[dk];
      if (anchor == null) continue;
      const ids = BT.tasksByDomain(dk).map(t => t.id);
      // 'train' rounds only: free play at a self-picked low level (or a
      // modifier-distorted challenge) must not crater the radar's drift.
      const trains = BT.state.sessions.filter(s =>
        ids.indexOf(s.taskId) !== -1 && s.mode === 'train' && s.ability != null);
      const since = trains.filter(s => s.ts >= a.ts);
      if (since.length < 3) { out[dk] = anchor; continue; }
      const early = BT.mean(since.slice(0, 3).map(s => s.ability));
      const late = BT.mean(since.slice(-3).map(s => s.ability));
      out[dk] = BT.clamp(Math.round(anchor + (late - early) * 6), 1, 99);
    }
    return out;
  };
})();
