/* ============================================================
   Cortex task — Symbol Match  (domain: speed)

   DSST-style coding: a legend maps N glyphs to digits 1..N.
   A big glyph appears; answer with its digit (keyboard 1..9
   or the on-screen keypad). Immediate feedback, then the next
   glyph. From level 6 the legend reshuffles at half time.
   Survival (ctx.survival): no clock — play until 3 wrong
   answers (or the engine's 300s cap); primary = correct count.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const GLYPHS = ['◆', '▲', '●', '★', '✚', '☾', '♠', '⬢', '✦'];
  const N_BY_LEVEL = [4, 5, 6, 6, 7, 7, 8, 8, 9, 9];

  BT.registerTask({
    id: 'symbols',
    name: 'Symbol Match',
    icon: '🔣',
    domain: 'speed',
    tagline: 'Crack the code — pair symbols with digits at top speed.',
    howTo: [
      'The legend at the top pairs each symbol with a digit.',
      'A big symbol appears — press its digit (keys 1–9 or the keypad).',
      'Instant ✓/✗ feedback, then the next symbol. Keep going!',
      'Wrong answers subtract from your score — fast AND accurate wins.',
      'From level 6: the legend reshuffles halfway through.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = net correct per minute: (correct − wrong) / minutes.
    norms: { metric: 'netPerMin', mean: 26, sd: 8, higherIsBetter: true },
    fmtPrimary: s => Math.round(s.primary) + ' correct/min',
    survival: true,
    fmtSurvival: s => 'Matched ' + s.metrics.correct + ' symbols before 3 strikes',

    run(ctx) {
      const N = N_BY_LEVEL[BT.clamp(ctx.level, 1, N_BY_LEVEL.length) - 1];
      const reshuffles = ctx.level >= 6;
      const survival = !!ctx.survival;
      const STRIKES = 3;

      // glyphs[i] ↔ digits[i]; digits are a permutation of 1..N
      const glyphs = BT.shuffle(GLYPHS, ctx.rng).slice(0, N);
      let digits = BT.shuffle(glyphs.map((g, i) => i + 1), ctx.rng);

      let correct = 0, wrong = 0;
      let trialIdx = 0;         // scored-trial counter for split-half buckets
      const halves = [{ c: 0, w: 0, n: 0 }, { c: 0, w: 0, n: 0 }];
      let curIdx = -1;          // index of the glyph on screen
      let locked = false;       // brief input lock between trials
      let reshuffled = false;
      let ended = false;
      let statHoldUntil = 0;    // keep announcement visible briefly
      const startedAt = ctx.now();

      /* ----- DOM ----- */
      const legendRow = el('div', { class: 'legend-row' });
      const stim = el('div', { class: 'stim' });
      const keypad = el('div', { class: 'keypad wide' });
      for (let d = 1; d <= N; d++) {
        const key = el('button', { class: 'key', type: 'button', text: String(d) });
        ctx.listen(key, 'pointerdown', () => answer(d));
        keypad.appendChild(key);
      }
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        legendRow,
        el('div', { class: 'stim-box' }, stim),
        keypad,
        el('div', { class: 'task-msg', text: survival
          ? 'Match the symbol to its digit — 3 misses ends the run'
          : 'Match the symbol to its digit' })));

      const keyMap = {};
      for (let d = 1; d <= N; d++) keyMap[String(d)] = () => answer(d);
      ctx.keys(keyMap);

      function renderLegend() {
        legendRow.innerHTML = '';
        for (let i = 0; i < N; i++) {
          legendRow.appendChild(el('div', { class: 'legend-cell' },
            el('span', { class: 'sym', text: glyphs[i] }),
            el('span', { class: 'dig', text: String(digits[i]) })));
        }
      }

      function updateStat() {
        if (ctx.now() < statHoldUntil) return;
        if (survival) {
          ctx.hud.stat('✓ ' + correct + ' · strikes ' + wrong + '/' + STRIKES);
          return;
        }
        const minutes = (ctx.now() - startedAt) / 60000;
        const rate = minutes > 0 ? Math.round((correct - wrong) / minutes) : 0;
        ctx.hud.stat('✓ ' + correct + ' · ✗ ' + wrong + ' · net ' + rate + '/min');
      }

      function nextGlyph() {
        let idx;
        if (curIdx < 0) {
          idx = Math.floor(ctx.rng() * N);
        } else { // never repeat the previous glyph
          idx = Math.floor(ctx.rng() * (N - 1));
          if (idx >= curIdx) idx++;
        }
        curIdx = idx;
        stim.textContent = glyphs[curIdx];
      }

      function answer(d) {
        if (!ctx.running || ended || locked) return;
        locked = true; // block rapid double-taps until the next glyph
        const half = halves[trialIdx % 2];
        trialIdx++;
        half.n++;
        if (d === digits[curIdx]) {
          correct++; half.c++;
          ctx.feedback(true);
        } else {
          wrong++; half.w++;
          ctx.feedback(false);
        }
        updateStat();
        ctx.timeout(() => {
          if (!ctx.running || ended) return;
          if (survival && wrong >= STRIKES) return end();
          if (ctx.now() - startedAt >= ctx.durationMs) return end();
          locked = false;
          nextGlyph();
        }, 150);
      }

      // Heartbeat: progress bar, half-time reshuffle, and the
      // duration cutoff (a stimulus can otherwise wait forever).
      // In survival ctx.durationMs is the engine's 300s cap, so the
      // same elapsed check enforces it; strikes drive the bar instead.
      ctx.interval(() => {
        if (!ctx.running || ended) return;
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(survival
          ? Math.max(elapsed / ctx.durationMs, wrong / STRIKES)
          : elapsed / ctx.durationMs);
        if (reshuffles && !reshuffled && elapsed >= ctx.durationMs / 2) {
          reshuffled = true;
          digits = BT.shuffle(digits, ctx.rng);
          renderLegend();
          ctx.beep('tick');
          statHoldUntil = ctx.now() + 1600;
          ctx.hud.stat('⇄ Legend reshuffled — check the codes!');
        }
        if (elapsed >= ctx.durationMs) return end();
        updateStat();
      }, 200);

      function end() {
        if (ended || !ctx.running) return;
        ended = true;
        const minutes = Math.max(ctx.now() - startedAt, 1) / 60000;
        const attempts = correct + wrong;
        const acc = attempts ? correct / attempts : 0;
        // Split halves: net/min per parity bucket over half the elapsed time.
        const halfMinutes = minutes / 2;
        const haveHalves = halves[0].n > 0 && halves[1].n > 0;
        ctx.hud.progress(1);
        ctx.finish({
          primary: survival ? correct : (correct - wrong) / minutes,
          levelProgress: BT.clamp((acc - 0.75) / (0.92 - 0.75), 0, 1),
          metrics: {
            correct, wrong, attempts,
            accuracy: Math.round(acc * 100),
            legendSize: N,
            half1: haveHalves ? (halves[0].c - halves[0].w) / halfMinutes : null,
            half2: haveHalves ? (halves[1].c - halves[1].w) / halfMinutes : null,
          },
          advance: attempts > 0 && acc >= 0.92 ? 'up'
            : acc < 0.75 ? 'down' : 'hold',
        });
      }

      renderLegend();
      updateStat();
      nextGlyph();
    },
  });
})();
