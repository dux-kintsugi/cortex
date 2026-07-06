/* ============================================================
   Cortex — training.js
   Personalized plan: weight domains by weakness, build a daily
   4-game session (deterministic per day), run it, track streaks.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT;

  const SESSION_SIZE = 4;

  /* Weakness-weighted plan. Weight ≈ how much a domain needs work. */
  BT.generatePlan = function (domainScores) {
    const weights = {};
    for (const dk of BT.DOMAIN_KEYS) {
      const s = domainScores[dk];
      // Unassessed domains get a middling weight so they still show up.
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

  /* Today's session: deterministic for a given day + plan.
     Slot 1: weakest domain. Slots 2-3: weighted sample. Slot 4: variety. */
  BT.todaysGames = function () {
    const plan = BT.state.plan;
    const allIds = BT.taskOrder.slice();
    if (!allIds.length) return [];
    const rnd = BT.rng(BT.hashStr(BT.dayKey() + ':' + (plan ? plan.generatedAt : 0)));

    if (!plan) {
      // No assessment yet — rotate through everything.
      return BT.shuffle(allIds, rnd).slice(0, SESSION_SIZE);
    }

    const chosen = [];
    const usedDomains = [];

    function pickFromDomain(dk) {
      const pool = BT.tasksByDomain(dk).map(t => t.id).filter(id => chosen.indexOf(id) === -1);
      if (!pool.length) return false;
      chosen.push(pool[Math.floor(rnd() * pool.length)]);
      usedDomains.push(dk);
      return true;
    }

    // Slot 1: weakest (focus[0]) — guaranteed daily work on the weakest area.
    if (plan.focus.length) pickFromDomain(plan.focus[0]);

    // Slots 2..3: weighted sampling over domains not yet used.
    while (chosen.length < SESSION_SIZE - 1) {
      const candidates = BT.DOMAIN_KEYS.filter(dk => usedDomains.indexOf(dk) === -1);
      if (!candidates.length) break;
      const total = candidates.reduce((s, dk) => s + plan.weights[dk], 0);
      let r = rnd() * total;
      let picked = candidates[candidates.length - 1];
      for (const dk of candidates) { r -= plan.weights[dk]; if (r <= 0) { picked = dk; break; } }
      if (!pickFromDomain(picked)) usedDomains.push(picked); // domain empty/exhausted — skip it
    }

    // Slot 4: variety — any task not already chosen.
    const rest = allIds.filter(id => chosen.indexOf(id) === -1);
    if (rest.length && chosen.length < SESSION_SIZE) {
      chosen.push(rest[Math.floor(rnd() * rest.length)]);
    }
    return chosen.slice(0, SESSION_SIZE);
  };

  /* Which of today's games already have a training rep today */
  BT.todaysProgress = function () {
    const games = BT.todaysGames();
    const today = BT.dayKey();
    const done = {};
    for (const s of BT.state.sessions) {
      if (s.mode !== 'assess' && BT.dayKey(s.ts) === today) done[s.taskId] = true;
    }
    return games.map(id => ({ id, done: !!done[id] }));
  };

  /* Run today's remaining games back-to-back.
     onDone({completed, aborted}) */
  BT.runTrainingSession = function (onDone) {
    const remaining = BT.todaysProgress().filter(g => !g.done).map(g => g.id);
    if (!remaining.length) { markDayDone(); if (onDone) onDone({ completed: true, aborted: false }); return; }
    const total = remaining.length;

    function runFrom(i) {
      if (i >= remaining.length) {
        markDayDone(); // engine's maybeMarkDayDone usually beat us here; markDayDone is idempotent
        if (onDone) onDone({ completed: true, aborted: false });
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

  function markDayDone() {
    const today = BT.dayKey();
    if (BT.state.doneDays[today]) return; // already counted
    BT.state.doneDays[today] = true;

    const st = BT.state.streak;
    if (st.lastDay && BT.daysBetween(st.lastDay, today) === 1) st.count += 1;
    else if (st.lastDay !== today) st.count = 1;
    st.lastDay = today;
    BT.save();
  }

  /* Called by the engine after every non-assess round — completing today's
     games through free play counts toward the streak too. */
  BT.maybeMarkDayDone = function () {
    const prog = BT.todaysProgress();
    if (prog.length && prog.every(g => g.done)) markDayDone();
  };

  /* Streak that displays as 0 if the chain is actually broken */
  BT.currentStreak = function () {
    const st = BT.state.streak;
    if (!st.lastDay) return 0;
    const gap = BT.daysBetween(st.lastDay, BT.dayKey());
    return gap <= 1 ? st.count : 0;
  };

  /* Rolling domain scores from ALL sessions (assess + train),
     recency-weighted: recent days count more. Used for the live radar. */
  BT.liveDomainScores = function () {
    const now = Date.now();
    const byDomain = {};
    for (const s of BT.state.sessions) {
      const def = BT.tasks[s.taskId];
      if (!def || s.score == null) continue;
      const ageDays = (now - s.ts) / 86400000;
      const w = Math.exp(-ageDays / 14); // half-life ~10 days
      (byDomain[def.domain] = byDomain[def.domain] || []).push({ v: s.score, w });
    }
    const out = {};
    for (const dk of BT.DOMAIN_KEYS) {
      const arr = byDomain[dk];
      if (!arr || !arr.length) { out[dk] = null; continue; }
      const totW = arr.reduce((s, x) => s + x.w, 0);
      out[dk] = totW > 0 ? Math.round(arr.reduce((s, x) => s + x.v * x.w, 0) / totW) : null;
    }
    return out;
  };
})();
