/* ============================================================
   Cortex task — Color Clash (Stroop)  (domain: executive)

   Gameplay: a color word (RED/BLUE/GREEN/YELLOW) appears in a
   random ink color. Respond with the INK color, not the word,
   via 4 fixed buttons or keys 1–4. Incongruent trials get more
   frequent with level; from level 5 a response deadline applies.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const COLORS = ['red', 'blue', 'green', 'yellow'];
  const COLORS_CVD = ['blue', 'yellow', 'white', 'gray']; // colorblind-safe set
  const WORDS = { red: 'RED', blue: 'BLUE', green: 'GREEN', yellow: 'YELLOW', white: 'WHITE', gray: 'GRAY' };
  const LABELS = { red: 'Red', blue: 'Blue', green: 'Green', yellow: 'Yellow', white: 'White', gray: 'Gray' };

  BT.registerTask({
    id: 'stroop',
    name: 'Color Clash',
    icon: '🎨',
    domain: 'executive',
    tagline: 'Name the ink color — ignore what the word says.',
    howTo: [
      'A color word appears — its ink color may not match the word.',
      'Answer with the INK COLOR, never the word itself.',
      'Tap Red / Blue / Green / Yellow, or press keys 1–4.',
      'From level 5: answer before the deadline or it counts as wrong.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = net correct per minute = (correct − wrong) / minutes.
    norms: { metric: 'netPerMin', mean: 32, sd: 9, higherIsBetter: true },
    fmtPrimary: s => Math.round(s.primary) + '/min · interference ' +
      Math.round((s.metrics && s.metrics.interference) || 0) + 'ms',

    run(ctx) {
      // Level knobs
      const incongruentP = Math.min(0.4 + 0.04 * ctx.level, 0.8);
      const deadlineMs = ctx.level >= 5 ? Math.max(2600 - 150 * ctx.level, 1100) : 0;
      // CVD assist: swap to a colorblind-safe word/ink set (read once per round).
      const colors = (BT.state.settings && BT.state.settings.cvdAssist) ? COLORS_CVD : COLORS;

      let correct = 0, wrong = 0, timeouts = 0;
      let trialIdx = 0;         // scored-trial counter for split-half buckets
      const halves = [{ c: 0, w: 0, n: 0 }, { c: 0, w: 0, n: 0 }];
      const rtCongruent = [], rtIncongruent = []; // correct trials only
      let cur = null;          // { word, ink, congruent }
      let lastCombo = '';      // word|ink of previous trial
      let live = false;        // a stimulus is on screen awaiting response
      let shownAt = 0;
      let deadlineTimer = null;

      const stim = el('div', { class: 'stim' });
      const msg = el('div', { class: 'task-msg', text: 'Answer with the INK color' });
      const row = el('div', { class: 'choice-row' });
      colors.forEach((color, i) => {
        const btn = el('button', { class: 'choice' },
          LABELS[color],
          el('span', { class: 'key-hint', text: String(i + 1) }));
        ctx.listen(btn, 'pointerdown', () => respond(color));
        row.appendChild(btn);
      });
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        msg,
        el('div', { class: 'stim-box' }, stim),
        row));

      ctx.keys({
        '1': () => respond(colors[0]),
        '2': () => respond(colors[1]),
        '3': () => respond(colors[2]),
        '4': () => respond(colors[3]),
      });

      const startedAt = ctx.now();

      function updateHud() {
        const total = correct + wrong;
        ctx.hud.stat('Trial ' + (total + 1) + (total
          ? ' · ' + Math.round((correct / total) * 100) + '%'
          : ''));
      }

      function makeStim() {
        // never repeat the same word+ink combo twice in a row
        for (let tries = 0; tries < 30; tries++) {
          const word = colors[Math.floor(ctx.rng() * 4)];
          let ink;
          const congruent = ctx.rng() >= incongruentP;
          if (congruent) {
            ink = word;
          } else {
            const others = colors.filter(c => c !== word);
            ink = others[Math.floor(ctx.rng() * others.length)];
          }
          if (word + '|' + ink !== lastCombo) {
            lastCombo = word + '|' + ink;
            return { word, ink, congruent };
          }
        }
        // unreachable in practice; keep the round alive regardless
        lastCombo = colors[0] + '|' + colors[1];
        return { word: colors[0], ink: colors[1], congruent: false };
      }

      function nextTrial() {
        if (!ctx.running) return;
        if (ctx.now() - startedAt >= ctx.durationMs) return end();
        cur = makeStim();
        stim.className = 'stim ink-' + cur.ink;
        stim.textContent = WORDS[cur.word];
        shownAt = ctx.now();
        live = true;
        if (deadlineMs) {
          deadlineTimer = ctx.timeout(() => {
            if (!ctx.running || !live) return;
            live = false;
            const half = halves[trialIdx % 2];
            trialIdx++; half.n++;
            wrong++; timeouts++; half.w++;
            ctx.feedback(false);
            stim.textContent = '';
            updateHud();
            ctx.timeout(nextTrial, 350);
          }, deadlineMs);
        }
      }

      function respond(color) {
        if (!ctx.running || !live) return; // also blocks rapid double-taps
        live = false;
        if (deadlineTimer != null) { ctx.clearTimer(deadlineTimer); deadlineTimer = null; }
        const rt = ctx.now() - shownAt;
        const half = halves[trialIdx % 2];
        trialIdx++; half.n++;
        if (color === cur.ink) {
          correct++; half.c++;
          (cur.congruent ? rtCongruent : rtIncongruent).push(rt);
          ctx.feedback(true);
        } else {
          wrong++; half.w++;
          ctx.feedback(false);
        }
        stim.textContent = '';
        updateHud();
        ctx.timeout(nextTrial, 350);
      }

      // Progress + hard stop, so time-up ends the round even if a
      // stimulus sits unanswered (no deadline below level 5).
      ctx.interval(() => {
        if (!ctx.running) return;
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(elapsed / ctx.durationMs);
        if (elapsed >= ctx.durationMs) end();
      }, 250);

      function end() {
        if (!ctx.running) return;
        const minutes = Math.max((ctx.now() - startedAt) / 60000, 1 / 60);
        const netPerMin = (correct - wrong) / minutes;
        const medCon = rtCongruent.length ? BT.median(rtCongruent) : null;
        const medInc = rtIncongruent.length ? BT.median(rtIncongruent) : null;
        const interference = medCon != null && medInc != null
          ? Math.round(medInc - medCon) : 0;
        const total = correct + wrong;
        const acc = total ? correct / total : 0;
        // Split halves: net/min per parity bucket over half the elapsed time.
        const halfMinutes = minutes / 2;
        const haveHalves = halves[0].n > 0 && halves[1].n > 0;
        ctx.hud.progress(1);
        ctx.finish({
          primary: netPerMin,
          levelProgress: BT.clamp((acc - 0.70) / (0.90 - 0.70), 0, 1),
          metrics: {
            netPerMin, correct, wrong, timeouts, trials: total,
            accuracy: Math.round(acc * 100),
            medianRTCongruent: medCon != null ? Math.round(medCon) : null,
            medianRTIncongruent: medInc != null ? Math.round(medInc) : null,
            interference,
            half1: haveHalves ? (halves[0].c - halves[0].w) / halfMinutes : null,
            half2: haveHalves ? (halves[1].c - halves[1].w) / halfMinutes : null,
          },
          advance: total === 0 ? 'hold'
            : acc >= 0.90 ? 'up'
            : acc < 0.70 ? 'down' : 'hold',
        });
      }

      updateHud();
      nextTrial();
    },
  });
})();
