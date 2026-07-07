/* ============================================================
   Cortex task — Rule Flip  (domain: executive)

   Task switching: a cue announces the active rule (COLOR or
   SHAPE), then a colored shape appears. COLOR: red → LEFT,
   blue → RIGHT. SHAPE: ● → LEFT, ▲ → RIGHT. The rule flips
   more often at higher levels; answer within 2.5s.
   Survival mode: play until 3 total errors (wrong + timeouts)
   or the 300s cap; primary = correct answers achieved.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'switching',
    name: 'Rule Flip',
    icon: '🔀',
    domain: 'executive',
    tagline: 'Flip between two rules without missing a beat.',
    howTo: [
      'A cue above the shape shows the active rule: COLOR or SHAPE.',
      'COLOR rule: red → LEFT, blue → RIGHT.',
      'SHAPE rule: ● → LEFT, ▲ → RIGHT.',
      'Tap the buttons or press the ← / → arrow keys.',
      'The rule flips without warning — answer within 2.5 seconds.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = net correct per minute = (correct − wrong) / minutes.
    norms: { metric: 'netPerMin', mean: 30, sd: 9, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + '/min · switch cost ' +
      (s.metrics && s.metrics.switchCost != null ? s.metrics.switchCost + 'ms' : '—'),

    survival: true,
    fmtSurvival: s => Math.round(s.primary) + ' correct before 3 strikes',

    run(ctx) {
      const DEADLINE = 2500;
      const switchProb = Math.min(0.25 + 0.04 * ctx.level, 0.65);
      const startedAt = ctx.now();

      let rule = null;           // 'color' | 'shape'
      let correctSide = null;    // 'left' | 'right'
      let trialKind = 'first';   // 'first' | 'switch' | 'repeat'
      let accepting = false;
      let shownAt = 0;
      let deadlineTimer = null;

      let trials = 0, correct = 0, wrong = 0, timeouts = 0;
      // split-half buckets by trial parity (odd/even scored trial index)
      const h1 = { correct: 0, wrong: 0 }, h2 = { correct: 0, wrong: 0 };
      const rtSwitch = [], rtRepeat = [];

      /* ----- DOM ----- */
      const cue = el('div', {
        class: 'pill',
        style: 'font-size:1.05rem; padding:8px 22px; border-width:2px;',
        text: '…',
      });
      const stim = el('div', { class: 'stim' });
      const leftBtn = el('button', { class: 'choice' },
        '🔴 / ●', el('span', { class: 'key-hint', text: '← left arrow' }));
      const rightBtn = el('button', { class: 'choice' },
        '🔵 / ▲', el('span', { class: 'key-hint', text: 'right arrow →' }));
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        cue,
        el('div', { class: 'stim-box' }, stim),
        el('div', { class: 'choice-row' }, leftBtn, rightBtn)));

      function updateHud() {
        // `wrong` already includes timeouts, so it IS the strike count.
        let line = 'Trial ' + (trials + 1) + ' · ✓ ' + correct + ' · ✗ ' + wrong;
        if (ctx.survival) line = 'Strikes ' + Math.min(wrong, 3) + '/3 · ' + line;
        ctx.hud.stat(line);
      }
      ctx.interval(() => {
        if (!ctx.running) return;
        const frac = Math.min((ctx.now() - startedAt) / ctx.durationMs, 1);
        // Survival: the 300s cap barely moves the bar — track strikes too.
        ctx.hud.progress(ctx.survival ? Math.max(frac, wrong / 3) : frac);
      }, 250);

      function nextTrial() {
        if (!ctx.running) return;
        // In survival ctx.durationMs is the engine's 300s cap, so this
        // doubles as the survival hard stop.
        if (ctx.now() - startedAt > ctx.durationMs) return end();

        if (rule == null) {
          rule = ctx.rng() < 0.5 ? 'color' : 'shape';
          trialKind = 'first';
        } else if (ctx.rng() < switchProb) {
          rule = rule === 'color' ? 'shape' : 'color';
          trialKind = 'switch';
        } else {
          trialKind = 'repeat';
        }

        const isCircle = ctx.rng() < 0.5;
        const isRed = ctx.rng() < 0.5;
        correctSide = rule === 'color'
          ? (isRed ? 'left' : 'right')
          : (isCircle ? 'left' : 'right');

        cue.textContent = rule === 'color' ? 'COLOR' : 'SHAPE';
        const cueColor = rule === 'color' ? 'var(--accent)' : 'var(--accent-2)';
        cue.style.borderColor = cueColor;
        cue.style.color = cueColor;
        stim.className = 'stim ' + (isRed ? 'ink-red' : 'ink-blue');
        stim.textContent = isCircle ? '●' : '▲';
        stim.style.opacity = '1';

        updateHud();
        accepting = true;
        shownAt = ctx.now();
        deadlineTimer = ctx.timeout(() => {
          if (!ctx.running || !accepting) return;
          accepting = false;
          (trials % 2 === 0 ? h1 : h2).wrong++;
          trials++; wrong++; timeouts++;
          ctx.feedback(false);
          stim.style.opacity = '.25';
          if (ctx.survival && wrong >= 3) return end();
          ctx.timeout(nextTrial, 650);
        }, DEADLINE);
      }

      function respond(side) {
        if (!ctx.running || !accepting) return; // also blocks rapid double-taps
        accepting = false;
        ctx.clearTimer(deadlineTimer);
        const rt = ctx.now() - shownAt;
        const half = trials % 2 === 0 ? h1 : h2;
        trials++;
        if (side === correctSide) {
          correct++; half.correct++;
          if (trialKind === 'switch') rtSwitch.push(rt);
          else if (trialKind === 'repeat') rtRepeat.push(rt);
          ctx.feedback(true);
        } else {
          wrong++; half.wrong++;
          ctx.feedback(false);
        }
        stim.style.opacity = '.25';
        updateHud();
        if (ctx.survival && wrong >= 3) return end();
        ctx.timeout(nextTrial, side === correctSide ? 350 : 650);
      }

      ctx.listen(leftBtn, 'pointerdown', () => respond('left'));
      ctx.listen(rightBtn, 'pointerdown', () => respond('right'));
      ctx.keys({
        ArrowLeft: () => respond('left'),
        ArrowRight: () => respond('right'),
      });

      function end() {
        const minutes = Math.max(ctx.now() - startedAt, 1) / 60000;
        const netPerMin = trials ? (correct - wrong) / minutes : 0;
        const acc = (correct + wrong) ? correct / (correct + wrong) : 0;
        const switchCost = (rtSwitch.length && rtRepeat.length)
          ? Math.round(BT.mean(rtSwitch) - BT.mean(rtRepeat))
          : null;
        // each half's net counts over half the elapsed minutes
        const n1 = h1.correct + h1.wrong, n2 = h2.correct + h2.wrong;
        const halfMin = minutes / 2;
        const half1 = n1 && n2 ? Math.round((h1.correct - h1.wrong) / halfMin * 10) / 10 : null;
        const half2 = n1 && n2 ? Math.round((h2.correct - h2.wrong) / halfMin * 10) / 10 : null;
        ctx.hud.progress(1);
        ctx.finish({
          // Survival: primary = correct answers achieved before 3 strikes.
          primary: ctx.survival ? correct : netPerMin,
          levelProgress: BT.clamp((acc - 0.70) / (0.90 - 0.70), 0, 1),
          metrics: {
            netPerMin: Math.round(netPerMin * 10) / 10,
            trials, correct, wrong, timeouts,
            acc: Math.round(acc * 100) / 100,
            switchCost,
            meanRTswitch: rtSwitch.length ? Math.round(BT.mean(rtSwitch)) : null,
            meanRTrepeat: rtRepeat.length ? Math.round(BT.mean(rtRepeat)) : null,
            half1, half2,
          },
          advance: trials === 0 ? 'hold'
            : acc >= 0.90 ? 'up'
            : acc < 0.70 ? 'down' : 'hold',
        });
      }

      nextTrial();
    },
  });
})();
