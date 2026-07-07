/* ============================================================
   Cortex — main.js
   App shell: router, screens (home / train / games / progress /
   results / settings), onboarding, debug seeding (?debug=1).
   Loaded last.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  let currentScreen = 'home';

  /* ---------------- Router ---------------- */
  const NAV = [
    ['home', 'Home'], ['train', 'Train'], ['games', 'Games'],
    ['progress', 'Progress'], ['settings', 'Settings'],
  ];

  BT.go = function (name, params) {
    currentScreen = name;
    const main = document.getElementById('main');
    main.innerHTML = '';
    document.querySelectorAll('#topbar .nav button').forEach(b =>
      b.classList.toggle('active', b.dataset.screen === name));
    (screens[name] || screens.home)(main, params || {});
    window.scrollTo(0, 0);
  };

  // Modules loaded after main.js (e.g. gamedetail) register extra screens here.
  BT.registerScreen = function (name, fn) { screens[name] = fn; };

  function buildTopbar() {
    const bar = document.getElementById('topbar');
    bar.appendChild(el('div', { class: 'logo' },
      el('span', { text: '🧠' }), 'Cortex', el('span', { class: 'spark', text: '·' })));
    const nav = el('div', { class: 'nav' });
    for (const [key, label] of NAV) {
      nav.appendChild(el('button', {
        text: label, dataset: { screen: key },
        onclick: () => BT.go(key),
      }));
    }
    bar.appendChild(nav);
  }

  /* ---------------- Shared pieces ---------------- */
  function radarCanvas(domainScores, older, height) {
    const canvas = el('canvas', { style: 'width:100%;height:' + (height || 260) + 'px;' });
    requestAnimationFrame(() => {
      const items = BT.DOMAIN_KEYS.map(dk => ({
        label: BT.DOMAINS[dk].name.split(' ')[0],
        icon: BT.DOMAINS[dk].icon,
        value: domainScores[dk],
      }));
      BT.drawRadar(canvas, items, older ? BT.DOMAIN_KEYS.map(dk => older[dk]) : null);
    });
    return canvas;
  }

  function domainRows(domainScores, focus) {
    const wrap = el('div');
    const keys = BT.DOMAIN_KEYS.slice()
      .sort((a, b) => (domainScores[a] == null ? 999 : domainScores[a]) - (domainScores[b] == null ? 999 : domainScores[b]));
    for (const dk of keys) {
      const d = BT.DOMAINS[dk], s = domainScores[dk];
      wrap.appendChild(el('div', { class: 'domain-row' },
        el('div', { class: 'd-icon', text: d.icon }),
        el('div', { class: 'd-name' },
          el('div', { class: 'nm' }, d.name, ' ',
            focus && focus.indexOf(dk) !== -1 ? el('span', { class: 'pill focus', text: 'focus' }) : null),
          el('div', { class: 'bl', text: d.blurb })),
        el('div', { class: 'meter' }, el('div', { style: 'width:' + (s || 0) + '%;' })),
        el('div', { class: 'd-score', text: s == null ? '—' : String(s) })));
    }
    return wrap;
  }

  function startAssessment() {
    BT.runAssessment(assessment => {
      if (assessment) BT.go('results');
      else BT.go('home');
    });
  }

  /* ---------------- Screens ---------------- */
  const screens = {};

  /* ----- HOME ----- */
  screens.home = function (main) {
    const hasBaseline = BT.state.assessments.length > 0;
    const today = BT.dayKey();
    const playedToday = BT.state.sessions.some(s => s.mode !== 'assess' && BT.dayKey(s.ts) === today);
    const st = BT.state.streak;
    const lapseGap = st.lastDay ? BT.daysBetween(st.lastDay, today) : 0;

    // Weekly report card (js/report.js, if loaded and due)
    if (hasBaseline && BT.buildWeeklyReportCard) {
      const rep = BT.buildWeeklyReportCard();
      if (rep) main.appendChild(rep);
    }

    // Comeback flow: lapsed ≥3 days — acknowledge, shrink the re-entry ask.
    if (hasBaseline && lapseGap >= 3 && !playedToday) {
      main.appendChild(el('div', { class: 'card hero' },
        el('h1', { text: 'Welcome back 👋' }),
        el('p', { text: 'It’s been ' + lapseGap + ' days — no guilt, your profile is intact' +
          ((st.best || 0) > 0 ? ' and your record streak (' + st.best + ' days) still stands' : '') +
          '. Ease back in with one 2-minute game.' }),
        el('button', {
          class: 'btn primary big', text: 'Ease back in (~2 min)',
          onclick: () => BT.runQuickSession(() => BT.go('home')),
        })));
    }

    if (!hasBaseline) {
      main.appendChild(el('div', { class: 'card hero' },
        el('h1', { text: 'Map your brain. Then train it.' }),
        el('p', { text: 'A short battery of 8 games measures your processing speed, attention, memory, reasoning and more — then Cortex builds a daily training routine aimed at your weakest areas.' }),
        el('button', { class: 'btn primary big', text: 'Start baseline assessment', onclick: startAssessment }),
        el('p', { class: 'small', style: 'margin-top:14px;', text: '≈ 13 minutes · results stay on this device' })));

      const grid = el('div', { class: 'card' },
        el('h2', { text: 'What gets measured' }));
      grid.appendChild(domainRows({}, null));
      main.appendChild(grid);
      return;
    }

    // --- streak + stats strip ---
    const streak = BT.currentStreak();
    const totalSessions = BT.state.sessions.filter(s => s.mode !== 'assess').length;
    const live = BT.liveDomainScores();
    const liveVals = BT.DOMAIN_KEYS.map(k => live[k]).filter(v => v != null);
    const overall = liveVals.length ? Math.round(BT.mean(liveVals)) : null;
    const streakSub = 'day streak' +
      ((st.shields || 0) > 0 ? ' · 🛡×' + st.shields : '') +
      (streak === 0 && (st.best || 0) > 0 ? ' · record ' + st.best : '');

    main.appendChild(el('div', { class: 'card' },
      el('div', { class: 'stat-strip' },
        el('div', { class: 'stat-box' }, el('div', { class: 'v', text: (streak > 0 ? '🔥 ' : '') + streak }), el('div', { class: 'l', text: streakSub })),
        el('div', { class: 'stat-box' }, el('div', { class: 'v', text: String(totalSessions) }), el('div', { class: 'l', text: 'games played' })),
        el('div', { class: 'stat-box' }, el('div', { class: 'v', text: overall == null ? '—' : String(overall) }), el('div', { class: 'l', text: 'overall score' })))));

    // --- today's session ---
    const prog = BT.todaysProgress();
    const remaining = prog.filter(g => !g.done).length;
    const todayCard = el('div', { class: 'card' },
      el('h2', { text: "Today's training" }),
      el('div', { class: 'sub', style: 'margin-bottom:12px;', text:
        remaining === 0 ? 'All done for today — see you tomorrow! 🎉'
          : remaining + ' of ' + prog.length + ' games left · ~' + (remaining * 2) + ' min' }));
    for (const g of prog) {
      const t = BT.tasks[g.id];
      if (!t) continue;
      todayCard.appendChild(el('div', { class: 'today-item' + (g.done ? ' done' : '') },
        el('span', { class: 't-icon', text: t.icon }),
        el('span', { class: 't-name', text: t.name }),
        el('span', { class: 'pill', text: 'Lv ' + BT.taskLevel(g.id) }),
        g.done ? el('span', { class: 't-done', text: '✓' }) : null));
    }
    if (remaining > 0) {
      todayCard.appendChild(el('div', { class: 'btn-row', style: 'justify-content:center;' },
        el('button', {
          class: 'btn primary big', text: remaining === prog.length ? 'Start session' : 'Continue session',
          onclick: () => BT.runTrainingSession(() => BT.go('home')),
        }),
        !playedToday ? el('button', {
          class: 'btn', text: '⚡ Quick (2 min)', title: 'One game — still keeps the streak',
          onclick: () => BT.runQuickSession(() => BT.go('home')),
        }) : null));
    }
    main.appendChild(todayCard);

    // --- daily challenge (after the day's session is done) ---
    if (remaining === 0 && BT.todaysChallenge) {
      const ch = BT.todaysChallenge();
      main.appendChild(el('div', { class: 'card' },
        el('h2', { text: 'Daily challenge ⚔️' }),
        ch.done
          ? el('div', { class: 'sub', text: 'Done — combined score ' + ch.score + '. New gauntlet tomorrow.' })
          : el('div', null,
              ch.modifier ? el('div', { style: 'margin-bottom:8px;' },
                el('span', { class: 'pill focus', text: ch.modifier.name }),
                el('span', { class: 'small muted', text: ' ' + ch.modifier.blurb })) : null,
              el('div', { class: 'sub', style: 'margin-bottom:12px;', text:
                '3 seeded games at your levels: ' + ch.games.map(g => BT.tasks[g.taskId] ? BT.tasks[g.taskId].icon : '❓').join(' ') +
                ' — the boards are the same for the whole day, so the score is pure you.' }),
              el('div', { class: 'btn-row', style: 'justify-content:center;' },
                el('button', { class: 'btn primary', text: 'Take the challenge', onclick: () => BT.runChallenge(() => BT.go('home')) })))));
    }

    // --- provisional-baseline confirmation nudge ---
    const firstA = BT.state.assessments[0];
    if (BT.state.assessments.length === 1 && firstA.provisional &&
        BT.daysBetween(BT.dayKey(firstA.ts), today) >= 3) {
      main.appendChild(el('div', { class: 'card' },
        el('h2', { text: 'Lock in a fair baseline 🎯' }),
        el('p', { class: 'sub', style: 'margin-bottom:12px;', text:
          'First-ever runs read low — you were learning the controls, not showing your ability. ' +
          'Re-assess once now that the games are familiar; future progress is measured against this second, fairer baseline.' }),
        el('button', { class: 'btn', text: 'Confirm baseline', onclick: startAssessment })));
    }

    // --- radar ---
    const radarCard = el('div', { class: 'card' }, el('h2', { text: 'Your cognitive profile' }));
    radarCard.appendChild(radarCanvas(live, null, 250));
    radarCard.appendChild(el('div', { class: 'center small muted', text: 'Rolling scores from recent play · tap Progress for details' }));
    main.appendChild(radarCard);

    // --- reassessment nudge (time-of-day matched for a fair comparison) ---
    const days = BT.daysSinceAssessment();
    if (days != null && days >= 14) {
      const last = BT.latestAssessment();
      const baseBlock = BT.timeBlockOfHour(new Date(last.ts).getHours());
      const nowBlock = BT.timeBlockOfHour(new Date().getHours());
      main.appendChild(el('div', { class: 'card' },
        el('h2', { text: 'Time to re-map 🗺️' }),
        el('p', { class: 'sub', style: 'margin-bottom:12px;', text:
          'Your baseline is ' + days + ' days old. Re-assess to measure progress and refresh your plan.' +
          (baseBlock !== nowBlock ? ' Tip: your baseline was taken in the ' + baseBlock + ' — re-assess then for the fairest comparison.' : '') }),
        el('button', { class: 'btn', text: 'Re-run assessment', onclick: startAssessment })));
    }
  };

  /* ----- TRAIN ----- */
  screens.train = function (main) {
    if (!BT.state.assessments.length) {
      main.appendChild(el('div', { class: 'card hero' },
        el('h1', { text: 'First: get your baseline' }),
        el('p', { text: 'Your training plan is built from your assessment results. Run the baseline battery first.' }),
        el('button', { class: 'btn primary big', text: 'Start assessment', onclick: startAssessment })));
      return;
    }

    const plan = BT.state.plan;
    const prog = BT.todaysProgress();
    const remaining = prog.filter(g => !g.done).length;

    const card = el('div', { class: 'card' },
      el('h2', { text: "Today's session" }),
      el('div', { class: 'sub', style: 'margin-bottom:12px;', text:
        'Four games, ~8 minutes. Weighted toward your focus areas. A new mix every day.' }));
    for (const g of prog) {
      const t = BT.tasks[g.id];
      if (!t) continue;
      card.appendChild(el('div', { class: 'today-item' + (g.done ? ' done' : '') },
        el('span', { class: 't-icon', text: t.icon }),
        el('span', { class: 't-name', text: t.name }),
        el('span', { class: 'pill', text: BT.DOMAINS[t.domain].name }),
        el('span', { class: 'pill', text: 'Lv ' + BT.taskLevel(g.id) }),
        g.done ? el('span', { class: 't-done', text: '✓' }) : null));
    }
    card.appendChild(el('div', { class: 'btn-row', style: 'justify-content:center;' },
      remaining > 0
        ? el('button', { class: 'btn primary big', text: remaining === prog.length ? 'Start session' : 'Continue session', onclick: () => BT.runTrainingSession(() => BT.go('train')) })
        : el('span', { class: 'pill', text: '✓ Completed today' })));
    main.appendChild(card);

    if (plan) {
      const focusCard = el('div', { class: 'card' },
        el('h2', { text: 'Your focus areas' }),
        el('p', { class: 'sub', style: 'margin-bottom:8px;', text: 'From your latest assessment — these get extra weight when picking daily games.' }));
      const latest = BT.latestAssessment();
      focusCard.appendChild(domainRows(latest ? latest.domainScores : {}, plan.focus));
      main.appendChild(focusCard);
    }
  };

  /* ----- GAMES LIBRARY ----- */
  screens.games = function (main) {
    main.appendChild(el('div', { class: 'card', style: 'padding:14px 20px;' },
      el('span', { class: 'sub', text: 'Free play — pick any game, any level. Everything counts toward your profile.' })));

    const grid = el('div', { class: 'grid-cards' });
    for (const id of BT.taskOrder) {
      const t = BT.tasks[id];
      const best = BT.bestScore(id);
      grid.appendChild(el('div', {
        class: 'game-card', onclick: () => levelPicker(t),
      },
        el('div', { class: 'g-icon', text: t.icon }),
        el('div', { class: 'g-name', text: t.name }),
        el('div', { class: 'sub small', text: t.tagline }),
        el('div', { class: 'g-meta' },
          el('span', { class: 'pill', text: BT.DOMAINS[t.domain].icon + ' ' + BT.DOMAINS[t.domain].name }),
          el('span', { class: 'pill', text: 'Lv ' + BT.taskLevel(id) }),
          best != null ? el('span', { class: 'pill', text: 'Best ' + best }) : null)));
    }
    main.appendChild(grid);
  };

  function levelPicker(def) {
    let lvl = BT.taskLevel(def.id);
    const lvlText = el('span', { style: 'font-size:1.6rem;font-weight:800;min-width:56px;display:inline-block;text-align:center;', text: String(lvl) });
    const body = el('div', { class: 'center' },
      el('div', { style: 'font-size:2.4rem;', text: def.icon }),
      el('h3', { text: def.name }),
      el('p', { class: 'muted', style: 'margin:6px 0 16px;', text: def.tagline }),
      el('div', { style: 'display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:6px;' },
        el('button', { class: 'btn', text: '−', onclick: () => { lvl = Math.max(1, lvl - 1); lvlText.textContent = String(lvl); } }),
        lvlText,
        el('button', { class: 'btn', text: '+', onclick: () => { lvl = Math.min(def.maxLevel, lvl + 1); lvlText.textContent = String(lvl); } })),
      el('div', { class: 'small muted', text: 'Level (max ' + def.maxLevel + ')' }),
      el('div', { class: 'btn-row', style: 'justify-content:center;' },
        el('button', { class: 'btn ghost', text: 'Cancel', onclick: () => ov.close() }),
        def.survival ? el('button', {
          class: 'btn', text: '💀 Survival', title: 'Play until 3 mistakes — how long can you last?',
          onclick: () => {
            ov.close();
            BT.runTask({ taskId: def.id, mode: 'survival', level: lvl, onDone: () => BT.go('games') });
          },
        }) : null,
        el('button', {
          class: 'btn primary', text: 'Play', onclick: () => {
            ov.close();
            BT.runTask({ taskId: def.id, mode: 'free', level: lvl, onDone: () => BT.go('games') });
          },
        })));
    const ov = BT.overlay(body);
  }

  /* ----- RESULTS (post-assessment) ----- */
  screens.results = function (main) {
    const a = BT.latestAssessment();
    if (!a) { BT.go('home'); return; }
    const prev = BT.state.assessments.length > 1
      ? BT.state.assessments[BT.state.assessments.length - 2] : null;

    main.appendChild(el('div', { class: 'card hero' },
      el('h1', { text: 'Your cognitive profile' }),
      el('p', { text: prev ? 'Solid line: today. Faint line: your previous assessment.' : 'Here’s your baseline across all 7 domains. 50 ≈ typical for a web-based test like this.' })));

    const radarCard = el('div', { class: 'card' });
    radarCard.appendChild(radarCanvas(a.domainScores, prev ? prev.domainScores : null, 300));
    main.appendChild(radarCard);

    const focus = BT.state.plan ? BT.state.plan.focus : [];
    const breakdown = el('div', { class: 'card' }, el('h2', { text: 'Breakdown (weakest first)' }));
    breakdown.appendChild(domainRows(a.domainScores, focus));
    main.appendChild(breakdown);

    if (focus.length) {
      const names = focus.map(dk => BT.DOMAINS[dk].name).join(', ');
      main.appendChild(el('div', { class: 'card' },
        el('h2', { text: 'Your plan' }),
        el('p', { class: 'sub', style: 'margin-bottom:14px;', text:
          'Daily sessions of 4 short games (~8 min), weighted toward: ' + names + '. ' +
          'Difficulty adapts automatically as you improve. Re-assess every 2 weeks to track real movement.' }),
        el('div', { class: 'btn-row', style: 'justify-content:center;' },
          el('button', { class: 'btn primary big', text: 'Start first session', onclick: () => BT.runTrainingSession(() => BT.go('home')) }),
          el('button', { class: 'btn ghost', text: 'Later', onclick: () => BT.go('home') }))));
    }

    main.appendChild(el('div', { class: 'notice', style: 'margin-bottom:16px;', text:
      'Scores compare you to rough reference ranges for web/touch tests — they are estimates for tracking your own change over time, not clinical or IQ measures.' }));
  };

  /* ----- Performance patterns (heatmap + weekday/time-of-day) ----- */
  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const TIME_BLOCKS = [
    { label: 'Morning', icon: '🌅', from: 5, to: 12 },
    { label: 'Afternoon', icon: '☀️', from: 12, to: 17 },
    { label: 'Evening', icon: '🌆', from: 17, to: 22 },
    { label: 'Night', icon: '🌙', from: 22, to: 5 },
  ];
  function blockOf(hour) {
    for (const b of TIME_BLOCKS) {
      if (b.from < b.to ? (hour >= b.from && hour < b.to) : (hour >= b.from || hour < b.to)) return b.label;
    }
    return 'Night';
  }

  /* ----- daily reminder (.ics, floating local time) ----- */
  function suggestedReminderTime() {
    const byBlock = {};
    for (const b of TIME_BLOCKS) byBlock[b.label] = { sum: 0, n: 0 };
    for (const s of BT.state.sessions) {
      if (s.score == null) continue;
      const bl = byBlock[blockOf(new Date(s.ts).getHours())];
      bl.sum += s.score; bl.n++;
    }
    const best = TIME_BLOCKS
      .map(b => ({ label: b.label, n: byBlock[b.label].n, avg: byBlock[b.label].n ? byBlock[b.label].sum / byBlock[b.label].n : 0 }))
      .filter(b => b.n >= 3)
      .sort((a, b) => b.avg - a.avg)[0];
    const mid = { Morning: '08:30', Afternoon: '14:00', Evening: '19:00', Night: '21:30' };
    if (!best) return { hhmm: '08:30', reason: null };
    return {
      hhmm: mid[best.label],
      reason: 'Your scores say you’re sharpest in the ' + best.label.toLowerCase() + ', so we suggest ' + mid[best.label] + '.',
    };
  }

  function buildReminderICS(hhmm) {
    const parts = hhmm.split(':');
    const h = String(parseInt(parts[0], 10) || 8).padStart(2, '0');
    const m = String(parseInt(parts[1], 10) || 0).padStart(2, '0');
    const d = new Date();
    const start = d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') +
      String(d.getDate()).padStart(2, '0') + 'T' + h + m + '00';
    return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Cortex//Brain Training//EN',
      'BEGIN:VEVENT', 'UID:cortex-daily-training@local',
      'DTSTART:' + start, // floating local time — fires at this wall-clock time anywhere
      'DURATION:PT10M', 'RRULE:FREQ=DAILY',
      'SUMMARY:🧠 Cortex training',
      'DESCRIPTION:4 short games\\, ~8 minutes. Streak on the line.',
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Cortex training', 'TRIGGER:PT0S', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  }

  function buildPatternsCard() {
    // One chronological pass. Raw scores feed the heatmap/meters; the INSIGHT uses
    // residuals vs a per-task running average (EMA), which removes practice drift
    // and task-mix confounds — otherwise "your best weekday" is just "whichever
    // day you happened to play most recently".
    const byDay = {};
    const byWd = WEEKDAYS.map(() => ({ sum: 0, n: 0, res: [] }));
    const byBlock = {};
    for (const b of TIME_BLOCKS) byBlock[b.label] = { sum: 0, n: 0, res: [] };
    const dayRes = {}; // dayKey -> [residuals] (for tag correlations)
    const ema = {};    // taskId -> running average

    const ordered = BT.state.sessions.slice().sort((a, b) => a.ts - b.ts);
    for (const s of ordered) {
      if (s.score == null) continue;
      const d = new Date(s.ts);
      const day = BT.dayKey(s.ts);
      (byDay[day] = byDay[day] || { sum: 0, n: 0 });
      byDay[day].sum += s.score; byDay[day].n++;

      const prevEma = ema[s.taskId];
      const residual = prevEma == null ? null : s.score - prevEma;
      ema[s.taskId] = prevEma == null ? s.score : prevEma + 0.3 * (s.score - prevEma);

      const wd = byWd[(d.getDay() + 6) % 7]; // 0 = Monday
      const bl = byBlock[blockOf(d.getHours())];
      wd.sum += s.score; wd.n++;
      bl.sum += s.score; bl.n++;
      if (residual != null) {
        wd.res.push(residual);
        bl.res.push(residual);
        (dayRes[day] = dayRes[day] || []).push(residual);
      }
    }

    // residual mean must clear its own standard error to count as a real pattern
    function resStat(arr) {
      if (arr.length < 5) return null;
      const mean = BT.mean(arr);
      const sd = Math.sqrt(BT.mean(arr.map(x => (x - mean) * (x - mean))));
      const se = sd / Math.sqrt(arr.length);
      return { mean, se, n: arr.length, solid: Math.abs(mean) > se };
    }

    const card = el('div', { class: 'card' }, el('h2', { text: 'Your patterns' }));

    /* --- calendar heatmap: last 16 weeks --- */
    const WEEKS = 16;
    const now = new Date(); now.setHours(12, 0, 0, 0);
    const startMon = new Date(now);
    startMon.setDate(now.getDate() - ((now.getDay() + 6) % 7) - (WEEKS - 1) * 7);

    const hm = el('div', { class: 'heatmap' });
    hm.appendChild(el('div', { class: 'hm-col hm-labels' },
      WEEKDAYS.map((w, i) => el('div', { class: 'hm-cell', text: i % 2 === 0 ? w[0] : '' }))));
    for (let w = 0; w < WEEKS; w++) {
      const col = el('div', { class: 'hm-col' });
      for (let r = 0; r < 7; r++) {
        const d = new Date(startMon);
        d.setDate(startMon.getDate() + w * 7 + r);
        if (d > now) { col.appendChild(el('div', { class: 'hm-cell', style: 'opacity:0;' })); continue; }
        const key = BT.dayKey(d.getTime());
        const rec = byDay[key];
        const avg = rec ? Math.round(rec.sum / rec.n) : null;
        const cell = el('div', {
          class: 'hm-cell' + (key === BT.dayKey() ? ' today' : ''),
          title: d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) +
            (rec ? ' · ' + rec.n + ' game' + (rec.n > 1 ? 's' : '') + ' · avg score ' + avg : ' · rest day'),
        });
        if (rec) cell.style.background = 'rgba(91,140,255,' + (0.25 + 0.75 * avg / 100).toFixed(2) + ')';
        col.appendChild(cell);
      }
      hm.appendChild(col);
    }
    card.appendChild(el('div', { class: 'sub small', style: 'margin-bottom:8px;', text:
      'Last ' + WEEKS + ' weeks · brighter = higher average score · hover a day for details' }));
    card.appendChild(hm);

    /* --- weekday / time-of-day meters --- */
    function meterRows(entries) {
      const box = el('div');
      for (const e of entries) {
        box.appendChild(el('div', { class: 'domain-row', style: 'padding:6px 0;' },
          el('div', { style: 'min-width:96px;font-weight:600;font-size:.85rem;', text: (e.icon ? e.icon + ' ' : '') + e.label }),
          el('div', { class: 'meter' }, el('div', { style: 'width:' + (e.avg || 0) + '%;' })),
          el('div', { class: 'd-score', style: 'font-size:.95rem;', text: e.avg == null ? '—' : String(e.avg) })));
      }
      return box;
    }
    const wdEntries = WEEKDAYS.map((label, i) => ({
      label: label + (byWd[i].n ? ' (' + byWd[i].n + ')' : ''), key: label,
      n: byWd[i].n, avg: byWd[i].n ? Math.round(byWd[i].sum / byWd[i].n) : null,
      stat: resStat(byWd[i].res),
    }));
    const blockEntries = TIME_BLOCKS.map(b => ({
      label: b.label + (byBlock[b.label].n ? ' (' + byBlock[b.label].n + ')' : ''), key: b.label,
      icon: b.icon, n: byBlock[b.label].n,
      avg: byBlock[b.label].n ? Math.round(byBlock[b.label].sum / byBlock[b.label].n) : null,
      stat: resStat(byBlock[b.label].res),
    }));

    card.appendChild(el('div', { class: 'grid-2' },
      el('div', null, el('div', { class: 'pattern-h', text: 'By day of week' }), meterRows(wdEntries)),
      el('div', null, el('div', { class: 'pattern-h', text: 'By time of day' }), meterRows(blockEntries))));

    /* --- insight: practice-adjusted, and only when the signal beats its noise --- */
    const FULL = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
    const solidWd = wdEntries.filter(e => e.stat && e.stat.solid && e.stat.mean > 0)
      .sort((a, b) => b.stat.mean - a.stat.mean)[0];
    const solidBl = blockEntries.filter(e => e.stat && e.stat.solid && e.stat.mean > 0)
      .sort((a, b) => b.stat.mean - a.stat.mean)[0];
    if (solidWd || solidBl) {
      const parts = [];
      if (solidWd) parts.push('on ' + FULL[solidWd.key] + 's (+' + solidWd.stat.mean.toFixed(1) + ' vs your trend, n=' + solidWd.stat.n + ')');
      if (solidBl) parts.push('in the ' + solidBl.key.toLowerCase() + ' (+' + solidBl.stat.mean.toFixed(1) + ', n=' + solidBl.stat.n + ')');
      card.appendChild(el('div', { class: 'notice', style: 'margin-top:12px;', text:
        '💡 Adjusted for practice gains, you genuinely run hotter ' + parts.join(' and ') + '. Schedule demanding work — and training — there.' }));
    } else {
      card.appendChild(el('div', { class: 'notice', style: 'margin-top:12px;', text:
        'No reliable when-am-I-sharpest pattern yet — differences so far are within noise. Keep playing across different days and times.' }));
    }

    /* --- day-tag correlations (sleep / caffeine / exercise / stress) --- */
    const tagCard = buildTagCorrelations(dayRes);
    if (tagCard) card.appendChild(tagCard);
    return card;
  }

  function buildTagCorrelations(dayRes) {
    const tags = BT.state.dayTags || {};
    const dayMean = {};
    for (const day of Object.keys(dayRes)) dayMean[day] = BT.mean(dayRes[day]);

    function compare(pick) {
      const yes = [], no = [];
      for (const day of Object.keys(dayMean)) {
        const t = tags[day];
        if (!t) continue;
        (pick(t) ? yes : no).push(dayMean[day]);
      }
      if (yes.length < 3 || no.length < 3) return null;
      return { diff: BT.mean(yes) - BT.mean(no), nYes: yes.length, nNo: no.length };
    }

    const rows = [];
    const sleepBad = compare(t => t.sleep === 'bad');
    if (sleepBad) rows.push({ icon: '😴', label: 'Bad-sleep days', r: sleepBad });
    const sleepGood = compare(t => t.sleep === 'good');
    if (sleepGood) rows.push({ icon: '🛏️', label: 'Good-sleep days', r: sleepGood });
    const caff = compare(t => !!t.caffeine);
    if (caff) rows.push({ icon: '☕', label: 'Caffeine days', r: caff });
    const exer = compare(t => !!t.exercise);
    if (exer) rows.push({ icon: '🏃', label: 'Exercise days', r: exer });
    const stress = compare(t => !!t.stress);
    if (stress) rows.push({ icon: '😰', label: 'High-stress days', r: stress });
    if (!rows.length) return null;

    const box = el('div', { style: 'margin-top:14px;' },
      el('div', { class: 'pattern-h', text: 'What moves your scores' }));
    for (const row of rows) {
      const d = row.r.diff;
      box.appendChild(el('div', { class: 'domain-row', style: 'padding:6px 0;' },
        el('div', { style: 'min-width:150px;font-weight:600;font-size:.85rem;', text: row.icon + ' ' + row.label }),
        el('div', { style: 'flex:1;font-size:.85rem;color:var(--' + (d > 1 ? 'good' : d < -1 ? 'bad' : 'muted') + ');', text:
          (d > 0 ? '+' : '') + d.toFixed(1) + ' vs your trend (n=' + row.r.nYes + ' tagged)' })));
    }
    box.appendChild(el('div', { class: 'small muted', style: 'margin-top:4px;', text:
      'Tag your days after each session to sharpen these. Correlation, not proof — but yours.' }));
    return box;
  }

  /* ----- PROGRESS ----- */
  screens.progress = function (main) {
    // Domain trend chart with selector
    const chartCard = el('div', { class: 'card' }, el('h2', { text: 'Score trends' }));
    const seg = el('div', { class: 'seg' });
    const canvas = el('canvas', { style: 'width:100%;height:240px;' });
    let selected = screens.progress._selected || 'all';

    function drawTrend() {
      // daily mean score + daily mean ability, filtered by selected domain
      const dayScore = {}, dayAbility = {};
      for (const s of BT.state.sessions) {
        const def = BT.tasks[s.taskId];
        if (!def || s.score == null) continue;
        if (selected !== 'all' && def.domain !== selected) continue;
        const day = BT.dayKey(s.ts);
        (dayScore[day] = dayScore[day] || []).push(s.score);
        if (s.mode !== 'assess' && s.ability != null) {
          (dayAbility[day] = dayAbility[day] || []).push(s.ability);
        }
      }
      const dayKeys = Object.keys(dayScore).sort();
      const raw = dayKeys.map(day => ({
        x: new Date(day + 'T12:00').getTime(), y: Math.round(BT.mean(dayScore[day])),
      }));
      // 7-point rolling mean smooths task-mix noise into a readable trend
      const rolling = raw.map((p, i) => {
        const win = raw.slice(Math.max(0, i - 6), i + 1);
        return { x: p.x, y: Math.round(BT.mean(win.map(q => q.y))) };
      });
      const abilityPts = Object.keys(dayAbility).sort().map(day => ({
        x: new Date(day + 'T12:00').getTime(), y: Math.round(BT.mean(dayAbility[day]) * 10),
      }));
      const series = [
        { label: 'daily score', dotsOnly: true, color: 'rgba(139,147,184,0.5)', points: raw },
        { label: 'trend (7-day)', points: rolling },
      ];
      if (abilityPts.length >= 3) series.push({ label: 'ability ×10', points: abilityPts });
      BT.drawLine(canvas, series, {
        autoScale: true,
        markers: BT.state.assessments.map((a, i) => ({ x: a.ts, label: 'A' + (i + 1) })),
      });
    }

    function segBtn(key, label) {
      const b = el('button', {
        text: label, class: key === selected ? 'active' : '',
        onclick: () => {
          selected = key;
          screens.progress._selected = key; // survives screen rebuilds
          seg.querySelectorAll('button').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          drawTrend();
        },
      });
      return b;
    }
    seg.appendChild(segBtn('all', 'Overall'));
    for (const dk of BT.DOMAIN_KEYS) seg.appendChild(segBtn(dk, BT.DOMAINS[dk].icon + ' ' + BT.DOMAINS[dk].name.split(' ')[0]));
    chartCard.appendChild(seg);
    chartCard.appendChild(canvas);
    main.appendChild(chartCard);
    requestAnimationFrame(drawTrend);

    main.appendChild(buildPatternsCard());

    // Assessment comparison — anchored to the confirmation baseline, not the
    // provisional first run (novelty deflates run #1).
    if (BT.state.assessments.length) {
      const a = BT.latestAssessment();
      const anchor = BT.anchorAssessment();
      const compare = anchor && anchor.ts !== a.ts ? anchor : null;
      const compCard = el('div', { class: 'card' },
        el('h2', { text: 'Assessments' }),
        el('div', { class: 'sub', style: 'margin-bottom:10px;', text:
          compare
            ? 'Latest (solid) vs your baseline (faint) — ' + BT.state.assessments.length + ' taken' +
              (BT.state.assessments[0].provisional && BT.state.assessments.length > 1 ? ' · run #1 was provisional and isn’t the anchor' : '')
            : 'One assessment so far — re-assess every ~2 weeks to see movement.' }));
      compCard.appendChild(radarCanvas(a.domainScores, compare ? compare.domainScores : null, 260));
      main.appendChild(compCard);
    }

    // Long-range report + achievements (modules loaded after this file)
    if (BT.buildLongReportCard) {
      const lr = BT.buildLongReportCard();
      if (lr) main.appendChild(lr);
    }
    if (BT.buildAchievementsCard) main.appendChild(BT.buildAchievementsCard());

    // Per-game bests
    const tbl = el('table', { class: 'sessions-table' },
      el('tr', null, el('th', { text: 'Game' }), el('th', { text: 'Level' }), el('th', { text: 'Plays' }), el('th', { text: 'Best' }), el('th', { text: 'Last' })));
    for (const id of BT.taskOrder) {
      const t = BT.tasks[id];
      const plays = BT.sessionsFor(id).length;
      if (!plays) continue;
      const tr = el('tr', {
        style: 'cursor:pointer;',
        onclick: () => BT.go('game', { id }),
      },
        el('td', { text: t.icon + ' ' + t.name }),
        el('td', { text: String(BT.taskLevel(id)) }),
        el('td', { text: String(plays) }),
        el('td', { text: String(BT.bestScore(id) == null ? '—' : BT.bestScore(id)) }),
        el('td', { text: String(BT.lastScore(id) == null ? '—' : BT.lastScore(id)) + ' ›' }));
      tbl.appendChild(tr);
    }
    main.appendChild(el('div', { class: 'card' }, el('h2', { text: 'Games' }),
      el('div', { class: 'sub small', style: 'margin-bottom:8px;', text: 'Tap a game for its full history — trends, levels, and the hidden sub-metrics.' }),
      tbl));

    // Recent sessions
    const recent = BT.state.sessions.slice(-12).reverse();
    if (recent.length) {
      const rt = el('table', { class: 'sessions-table' },
        el('tr', null, el('th', { text: 'When' }), el('th', { text: 'Game' }), el('th', { text: 'Mode' }), el('th', { text: 'Score' })));
      for (const s of recent) {
        const t = BT.tasks[s.taskId];
        rt.appendChild(el('tr', null,
          el('td', { text: BT.fmtDate(s.ts) }),
          el('td', { text: t ? t.icon + ' ' + t.name : s.taskId }),
          el('td', { text: s.mode }),
          el('td', { text: s.score == null ? '—' : String(s.score) })));
      }
      main.appendChild(el('div', { class: 'card' }, el('h2', { text: 'Recent sessions' }), rt));
    }
  };

  /* ----- SETTINGS ----- */
  screens.settings = function (main) {
    const card = el('div', { class: 'card' }, el('h2', { text: 'Settings' }));

    // sound toggle
    const soundInput = el('input', { type: 'checkbox' });
    soundInput.checked = BT.state.settings.sound;
    soundInput.addEventListener('change', () => {
      BT.state.settings.sound = soundInput.checked; BT.save();
      if (soundInput.checked) { BT.unlockAudio(); BT.beep('good'); }
    });
    card.appendChild(el('div', { class: 'toggle-row' },
      el('div', null, el('div', { style: 'font-weight:600;', text: 'Sound effects' }),
        el('div', { class: 'small muted', text: 'Beeps for feedback and countdowns' })),
      el('label', { class: 'switch' }, soundInput, el('span', { class: 'slider' }))));

    // color-vision assist
    const cvdInput = el('input', { type: 'checkbox' });
    cvdInput.checked = !!BT.state.settings.cvdAssist;
    cvdInput.addEventListener('change', () => {
      BT.state.settings.cvdAssist = cvdInput.checked; BT.save();
    });
    card.appendChild(el('div', { class: 'toggle-row' },
      el('div', null, el('div', { style: 'font-weight:600;', text: 'Color-vision assist' }),
        el('div', { class: 'small muted', text: 'Shape-coded signals + CVD-safe Stroop palette (red-green colorblind friendly)' })),
      el('label', { class: 'switch' }, cvdInput, el('span', { class: 'slider' }))));
    main.appendChild(card);

    // --- daily reminder (.ics — works with zero servers) ---
    const bestTime = suggestedReminderTime();
    const timeInput = el('input', {
      type: 'time', value: bestTime.hhmm,
      style: 'background:var(--panel-2);border:1px solid var(--line);color:var(--text);border-radius:10px;padding:8px 10px;font-size:1rem;',
    });
    main.appendChild(el('div', { class: 'card' }, el('h2', { text: 'Daily reminder' }),
      el('p', { class: 'sub', style: 'margin-bottom:12px;', text:
        (bestTime.reason || 'Pick a time that survives your average Tuesday.') +
        ' Adding it to your calendar gives you a daily nudge — no notifications server needed.' }),
      el('div', { style: 'display:flex;gap:10px;align-items:center;flex-wrap:wrap;' },
        timeInput,
        el('button', {
          class: 'btn', text: '📅 Add to Calendar', onclick: () => {
            const blob = new Blob([buildReminderICS(timeInput.value || bestTime.hhmm)], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = el('a', { href: url, download: 'cortex-daily-training.ics' });
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 5000);
          },
        }))));

    // --- device sync (js/sync.js) ---
    if (BT.buildSyncCard) main.appendChild(BT.buildSyncCard());

    // data
    const dataCard = el('div', { class: 'card' }, el('h2', { text: 'Your data' }),
      el('p', { class: 'sub', style: 'margin-bottom:12px;', text:
        'Everything lives in this browser only. Export a backup before clearing browser data or switching devices. Storage: ' +
        (BT.storagePersisted === true ? 'protected ✓' : BT.storagePersisted === false ? 'best-effort (browser may evict — export backups!)' : 'checking…') }),
      el('div', { class: 'btn-row', style: 'justify-content:flex-start;' },
        el('button', {
          class: 'btn', text: '⬇ Export backup', onclick: () => {
            // share sheet where available (reliable in iOS home-screen apps), else download
            try {
              const file = new File([BT.exportJSON()], 'cortex-backup-' + BT.dayKey() + '.json', { type: 'application/json' });
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ files: [file], title: 'Cortex backup' }).catch(() => {});
                return;
              }
            } catch (e) { /* File constructor or canShare unavailable — fall through */ }
            const blob = new Blob([BT.exportJSON()], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = el('a', { href: url, download: 'cortex-backup-' + BT.dayKey() + '.json' });
            document.body.appendChild(a); a.click(); a.remove();
            setTimeout(() => URL.revokeObjectURL(url), 5000);
          },
        }),
        el('button', {
          class: 'btn', text: '⬆ Import backup', onclick: () => {
            const inp = el('input', { type: 'file', accept: '.json,application/json', style: 'display:none;' });
            inp.addEventListener('change', () => {
              const f = inp.files[0]; if (!f) return;
              f.text().then(t => {
                try { BT.importJSON(t); BT.go('home'); }
                catch (e) { alert('Import failed: ' + e.message); }
              });
            });
            document.body.appendChild(inp); inp.click();
            setTimeout(() => inp.remove(), 60000);
          },
        }),
        el('button', {
          class: 'btn danger', text: 'Reset everything', onclick: () =>
            BT.confirmDialog('Reset everything?', 'All scores, assessments and streaks will be permanently deleted from this device.', 'Delete all data',
              () => { BT.resetAll(); BT.go('home'); }),
        })));
    main.appendChild(dataCard);

    // about
    main.appendChild(el('div', { class: 'card' }, el('h2', { text: 'About Cortex' }),
      el('p', { class: 'sub', style: 'line-height:1.6;', text:
        'Cortex measures and trains performance on 12 classic cognitive-psychology tasks across 7 domains. ' +
        'Scores are percentile-style estimates against rough reference ranges for web-based testing — useful for tracking your own change, ' +
        'but not medical, clinical or IQ measurements. Gains on these games primarily reflect improved skill on the tasks themselves; ' +
        'the science on how far that transfers to everyday cognition is genuinely mixed. What is well-supported: sleep, exercise, ' +
        'and learning hard new things. Use Cortex as a fun, honest scoreboard for your brain — alongside those, not instead of them.' })));

    // debug panel
    if (new URLSearchParams(location.search).has('debug')) {
      main.appendChild(el('div', { class: 'card' }, el('h2', { text: '🔧 Debug' }),
        el('div', { class: 'btn-row', style: 'justify-content:flex-start;' },
          el('button', { class: 'btn', text: 'Seed assessment', onclick: () => { BT.debug.seedAssessment(); BT.go('results'); } }),
          el('button', { class: 'btn', text: 'Seed 21 days history', onclick: () => { BT.debug.seedHistory(21); BT.go('progress'); } }),
          el('button', { class: 'btn', text: 'Complete today', onclick: () => { BT.debug.completeToday(); BT.go('home'); } }))));
    }
  };

  /* ---------------- Debug seeding ---------------- */
  BT.debug = {
    seedAssessment() {
      const taskScores = {};
      for (const id of BT.BATTERY) {
        if (BT.tasks[id]) taskScores[id] = BT.clamp(Math.round(20 + Math.random() * 65), 1, 99);
      }
      const domainScores = BT.computeDomainScores(taskScores);
      const ts = Date.now();
      for (const id of Object.keys(taskScores)) {
        const def = BT.tasks[id];
        BT.recordSession({
          ts, taskId: id, mode: 'assess', level: def.assessLevel,
          score: taskScores[id],
          primary: BT.round1(BT.stats.valueForScore(taskScores[id], def.norms)),
          metrics: { seeded: true },
        });
      }
      BT.state.assessments.push({ ts, taskScores, domainScores });
      BT.generatePlan(domainScores);
      BT.save();
    },
    seedHistory(days) {
      if (!BT.state.assessments.length) BT.debug.seedAssessment();
      const now = Date.now();
      for (let d = days; d >= 1; d--) {
        const dayStart = new Date(now - d * 86400000); dayStart.setHours(0, 0, 0, 0);
        // random session time between 07:00 and 23:00 so time-of-day patterns show up
        const dayTs = dayStart.getTime() + (7 + Math.floor(Math.random() * 16)) * 3600000;
        const ids = BT.shuffle(BT.taskOrder).slice(0, 4);
        for (const id of ids) {
          const def = BT.tasks[id];
          const drift = (days - d) * 0.7; // gentle improvement over time
          const score = BT.clamp(Math.round(35 + drift + Math.random() * 25), 1, 99);
          BT.recordSession({
            ts: dayTs + Math.floor(Math.random() * 3600000), taskId: id, mode: 'train',
            level: BT.taskLevel(id), score,
            primary: BT.round1(BT.stats.valueForScore(score, def.norms)),
            ability: BT.round1(BT.taskLevel(id) + Math.min(1, (days - d) / days + Math.random() * 0.3)),
            metrics: { seeded: true },
          });
        }
        if (Math.random() < 0.6) {
          BT.state.dayTags[BT.dayKey(dayTs)] = {
            sleep: BT.pick(['bad', 'ok', 'ok', 'good']),
            caffeine: Math.random() < 0.5, exercise: Math.random() < 0.4, stress: Math.random() < 0.3,
          };
        }
        BT.state.doneDays[BT.dayKey(dayTs)] = true;
      }
      BT.state.streak = { count: days, lastDay: BT.dayKey(now - 86400000) };
      // seeded records were appended out of order — queries assume chronology
      BT.state.sessions.sort((a, b) => a.ts - b.ts);
      BT.save();
    },
    completeToday() {
      for (const g of BT.todaysProgress()) {
        if (g.done) continue;
        const def = BT.tasks[g.id];
        const score = BT.clamp(Math.round(40 + Math.random() * 40), 1, 99);
        BT.recordSession({
          ts: Date.now(), taskId: g.id, mode: 'train', level: BT.taskLevel(g.id),
          score, primary: BT.round1(BT.stats.valueForScore(score, def.norms)), metrics: { seeded: true },
        });
      }
      BT.runTrainingSession(() => {}); // marks day done via empty remaining
    },
  };

  /* ---------------- Boot ---------------- */
  function boot() {
    buildTopbar();
    if (BT.reconcileStreak) BT.reconcileStreak(); // shield auto-repair for a single missed day
    document.body.addEventListener('pointerdown', BT.unlockAudio, { once: true });
    let lastW = window.innerWidth;
    window.addEventListener('resize', () => {
      // Rebuild (for chart redraw) only when WIDTH changes — mobile URL-bar
      // collapse and keyboard-open fire height-only resizes constantly and
      // must not wipe scroll position / screen state.
      clearTimeout(boot._rz);
      boot._rz = setTimeout(() => {
        if (window.innerWidth === lastW) return;
        lastW = window.innerWidth;
        if (!document.body.classList.contains('task-open')) BT.go(currentScreen);
      }, 250);
    });
    BT.go('home');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
