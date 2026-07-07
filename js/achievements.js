/* ============================================================
   Cortex — achievements.js
   Honest milestones. Exposes BT.checkAchievements() — cheap,
   idempotent, called by the engine after every recorded round —
   and BT.buildAchievementsCard() for the progress screen.
   Earned badges persist in BT.state.badges = {id: ts}.
   No other globals.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  /* ---------------- Milestone catalogue ----------------
     Each test() reads only from the precomputed facts object,
     so one pass over state serves every pending achievement. */
  const DEFS = [
    { id: 'streak3',   icon: '🔥', name: 'Warming up',
      blurb: 'Train 3 days in a row — lite days count.',
      test: f => f.bestStreak >= 3 },
    { id: 'streak7',   icon: '📅', name: 'A full week',
      blurb: 'Train 7 days in a row.',
      test: f => f.bestStreak >= 7 },
    { id: 'streak14',  icon: '⚡', name: 'Two weeks strong',
      blurb: 'Train 14 days in a row.',
      test: f => f.bestStreak >= 14 },
    { id: 'streak30',  icon: '🏆', name: 'Iron habit',
      blurb: 'Train 30 days in a row.',
      test: f => f.bestStreak >= 30 },
    { id: 'baseline',  icon: '📊', name: 'Baseline mapped',
      blurb: 'Complete your first full assessment.',
      test: f => f.assessCount >= 1 },
    { id: 'baseline2', icon: '🔁', name: 'Confirmed baseline',
      blurb: 'Complete a second assessment — now comparisons mean something.',
      test: f => f.assessCount >= 2 },
    { id: 'beatBaseline', icon: '📈', name: 'Beat your baseline',
      blurb: 'Score any domain 10+ points above your baseline at a later assessment.',
      test: f => f.beatBaseline },
    { id: 'allGames',  icon: '🧭', name: 'Explorer',
      blurb: 'Play every game in the library at least once.',
      test: f => f.allPlayed },
    { id: 'level5',    icon: '⭐', name: 'Climbing',
      blurb: 'Reach level 5 on any game.',
      test: f => f.topLevel >= 5 },
    { id: 'level10',   icon: '🌟', name: 'Summit',
      blurb: 'Reach level 10 on any game.',
      test: f => f.topLevel >= 10 },
    { id: 'rounds50',  icon: '🥉', name: '50 rounds',
      blurb: 'Finish 50 training rounds all-time.',
      test: f => f.rounds >= 50 },
    { id: 'rounds100', icon: '🥈', name: '100 rounds',
      blurb: 'Finish 100 training rounds all-time.',
      test: f => f.rounds >= 100 },
    { id: 'rounds250', icon: '🥇', name: '250 rounds',
      blurb: 'Finish 250 training rounds all-time.',
      test: f => f.rounds >= 250 },
    { id: 'shield',    icon: '🛡️', name: 'Saved by the shield',
      blurb: 'A streak shield bridged a missed day for you.',
      test: f => f.shieldUsed },
    { id: 'challenger', icon: '⚔️', name: 'Challenger',
      blurb: 'Complete a daily challenge.',
      test: f => f.challenged },
  ];

  /* ---------------- Facts (one cheap pass over state) ---------------- */
  function gatherFacts() {
    const st = BT.state;

    // lifetime non-assess rounds + which tasks have ever been played
    let rounds = 0;
    const played = {};
    for (const s of st.sessions) {
      if (s.mode !== 'assess') rounds++;
      played[s.taskId] = true;
    }

    let allPlayed = !!(BT.taskOrder && BT.taskOrder.length);
    if (allPlayed) {
      for (const id of BT.taskOrder) {
        if (!played[id]) { allPlayed = false; break; }
      }
    }

    // highest training level reached on any game
    let topLevel = 0;
    const levels = st.levels || {};
    for (const id of Object.keys(levels)) {
      if (levels[id] > topLevel) topLevel = levels[id];
    }

    // streak: best-ever, or the live count if it somehow runs ahead
    const streak = st.streak || {};
    const live = BT.currentStreak ? BT.currentStreak() : 0;
    const bestStreak = Math.max(streak.best || 0, live);

    // any day ever bridged by a shield
    let shieldUsed = false;
    const doneDays = st.doneDays || {};
    for (const k of Object.keys(doneDays)) {
      if (doneDays[k] === 'shield') { shieldUsed = true; break; }
    }

    // any domain +10 vs the anchor assessment at a LATER assessment
    let beatBaseline = false;
    const anchor = BT.anchorAssessment ? BT.anchorAssessment() : null;
    if (anchor && anchor.domainScores) {
      for (const a of st.assessments) {
        if (a.ts <= anchor.ts || !a.domainScores) continue;
        for (const dk of BT.DOMAIN_KEYS) {
          const base = anchor.domainScores[dk], now = a.domainScores[dk];
          if (base != null && now != null && now - base >= 10) { beatBaseline = true; break; }
        }
        if (beatBaseline) break;
      }
    }

    return {
      rounds,
      allPlayed,
      topLevel,
      bestStreak,
      shieldUsed,
      beatBaseline,
      assessCount: st.assessments.length,
      challenged: Object.keys(st.challengeDays || {}).length > 0,
    };
  }

  /* ---------------- Check (engine calls after every round) ----------------
     Idempotent: already-earned ids are skipped and never re-announced.
     Saves only when something new was earned. Returns newly earned
     [{id, name, icon, blurb}] for the result splash. */
  BT.checkAchievements = function () {
    const badges = BT.state.badges || (BT.state.badges = {});
    const pending = DEFS.filter(d => badges[d.id] == null);
    if (!pending.length) return [];

    const facts = gatherFacts();
    const fresh = [];
    for (const d of pending) {
      if (d.test(facts)) {
        badges[d.id] = Date.now();
        fresh.push({ id: d.id, name: d.name, icon: d.icon, blurb: d.blurb });
      }
    }
    if (fresh.length) BT.save();
    return fresh;
  };

  /* ---------------- Card (progress screen) ---------------- */
  BT.buildAchievementsCard = function () {
    // Some milestone state (assessments, challengeDays, shield doneDays) is
    // written AFTER the engine's per-round check runs, so re-run the cheap,
    // idempotent check here to award anything already earned before rendering.
    BT.checkAchievements();
    const badges = BT.state.badges || {};
    const earnedCount = DEFS.filter(d => badges[d.id] != null).length;

    const card = el('div', { class: 'card' },
      el('div', { style: 'display:flex;align-items:center;gap:10px;margin-bottom:10px;' },
        el('h2', { style: 'margin-bottom:0;', text: 'Achievements' }),
        el('span', { class: 'pill' + (earnedCount === DEFS.length ? ' focus' : ''), text: earnedCount + ' / ' + DEFS.length })),
      el('p', { class: 'sub', style: 'margin-bottom:10px;', text: 'Honest milestones — earned by doing, not by logging in.' }));

    for (const d of DEFS) {
      const ts = badges[d.id];
      const earned = ts != null;
      card.appendChild(el('div', { class: 'today-item' + (earned ? '' : ' done') },
        el('span', { class: 't-icon', text: d.icon }),
        el('div', { class: 't-name' },
          el('div', { text: d.name }),
          el('div', { class: 'small muted', text: d.blurb })),
        earned
          ? el('span', { class: 'pill focus', text: typeof ts === 'number' ? '✓ ' + BT.fmtDate(ts) : '✓ earned' })
          : el('span', { class: 'pill', text: '🔒 locked' })));
    }
    return card;
  };
})();
