/* ============================================================
   Cortex task — Rule Flip  (domain: executive)

   Task switching: a cue announces the active rule (COLOR or
   SHAPE), then a colored shape appears. COLOR: red → LEFT,
   blue → RIGHT. SHAPE: ● → LEFT, ▲ → RIGHT. The rule flips
   more often at higher levels; answer within 2.5s.
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
        ctx.hud.stat('Trial ' + (trials + 1) + ' · ✓ ' + correct + ' · ✗ ' + wrong);
      }
      ctx.interval(() => {
        if (!ctx.running) return;
        ctx.hud.progress(Math.min((ctx.now() - startedAt) / ctx.durationMs, 1));
      }, 250);

      function nextTrial() {
        if (!ctx.running) return;
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
          trials++; wrong++; timeouts++;
          ctx.flash('bad'); ctx.beep('bad');
          stim.style.opacity = '.25';
          ctx.timeout(nextTrial, 650);
        }, DEADLINE);
      }

      function respond(side) {
        if (!ctx.running || !accepting) return; // also blocks rapid double-taps
        accepting = false;
        ctx.clearTimer(deadlineTimer);
        const rt = ctx.now() - shownAt;
        trials++;
        if (side === correctSide) {
          correct++;
          if (trialKind === 'switch') rtSwitch.push(rt);
          else if (trialKind === 'repeat') rtRepeat.push(rt);
          ctx.flash('good'); ctx.beep('good');
        } else {
          wrong++;
          ctx.flash('bad'); ctx.beep('bad');
        }
        stim.style.opacity = '.25';
        updateHud();
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
        ctx.hud.progress(1);
        ctx.finish({
          primary: netPerMin,
          metrics: {
            netPerMin: Math.round(netPerMin * 10) / 10,
            trials, correct, wrong, timeouts,
            acc: Math.round(acc * 100) / 100,
            switchCost,
            meanRTswitch: rtSwitch.length ? Math.round(BT.mean(rtSwitch)) : null,
            meanRTrepeat: rtRepeat.length ? Math.round(BT.mean(rtRepeat)) : null,
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
