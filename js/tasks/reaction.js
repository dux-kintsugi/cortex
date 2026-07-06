/* ============================================================
   Cortex task — Reaction Time  (domain: speed)
   EXEMPLAR MODULE: this file demonstrates the full task contract
   documented in docs/ARCHITECTURE.md. Other task modules follow
   the same shape.

   Gameplay: wait for the pad to turn green, tap (or SPACE) as
   fast as possible. Tapping early = false start. From level 4,
   orange decoys appear — withhold on those.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'reaction',
    name: 'Reaction Time',
    icon: '⚡',
    domain: 'speed',
    tagline: 'Pure speed — tap the instant it turns green.',
    howTo: [
      'Watch the pad and wait…',
      'The moment it turns GREEN, tap it (or press SPACE).',
      'Tapping too early is a false start.',
      'From level 4: ORANGE flashes are decoys — don’t tap those.',
    ],

    maxLevel: 10,
    assessLevel: 2,
    startLevel: 3,
    assessDurationMs: 70000,
    trainDurationMs: 80000,

    // primary = median reaction time in ms (lower is better).
    // Reference values are rough estimates for web/touch testing.
    norms: { metric: 'medianRT', mean: 310, sd: 65, higherIsBetter: false },
    fmtPrimary: s => (s.metrics && s.metrics.trials === 0)
      ? 'no valid trials — wait for green!'
      : Math.round(s.primary) + ' ms median reaction',

    run(ctx) {
      const el_ = el;
      const TRIALS = ctx.mode === 'assess' ? 12 : 14;
      // Level knobs: shorter min-delay window & more decoys as level rises.
      const delayMin = 1000;
      const delayMax = Math.max(1800, 3400 - ctx.level * 120);
      const decoyProb = ctx.level >= 4 ? Math.min(0.15 + (ctx.level - 4) * 0.06, 0.45) : 0;
      const startedAt = ctx.now();

      const rts = [];
      let falseStarts = 0, decoyErrors = 0;
      let state = 'idle'; // idle | waiting | decoy | go
      let goAt = 0;
      let trialsDone = 0;
      let seq = 0; // trial token — stale timers from an aborted trial must not fire into the next one

      const label = el_('div', { text: 'Get ready…' });
      const shape = el_('div', { class: 'big-shape', text: '●', style: 'color: var(--muted); opacity:.35;' });
      const pad = el_('div', { class: 'tap-pad' }, shape, label);
      ctx.container.appendChild(el_('div', { class: 'stage-center' }, pad));

      function updateHud() {
        ctx.hud.progress(trialsDone / TRIALS);
        ctx.hud.stat('Trial ' + Math.min(trialsDone + 1, TRIALS) + ' / ' + TRIALS +
          (rts.length ? ' · median ' + Math.round(BT.median(rts)) + ' ms' : ''));
      }

      function setPad(mode) {
        if (mode === 'wait') {
          pad.style.background = 'var(--panel)';
          shape.style.color = 'var(--muted)'; shape.style.opacity = '.35';
          label.textContent = 'Wait for green…';
        } else if (mode === 'go') {
          pad.style.background = 'rgba(61,220,132,0.12)';
          shape.style.color = 'var(--good)'; shape.style.opacity = '1';
          label.textContent = 'TAP!';
        } else if (mode === 'decoy') {
          pad.style.background = 'rgba(255,180,84,0.10)';
          shape.style.color = 'var(--warn)'; shape.style.opacity = '1';
          label.textContent = 'Not this one…';
        }
      }

      function nextTrial() {
        if (!ctx.running) return;
        if (trialsDone >= TRIALS || ctx.now() - startedAt > ctx.durationMs) return end();
        updateHud();
        const mySeq = ++seq;
        state = 'waiting';
        setPad('wait');
        const delay = delayMin + ctx.rng() * (delayMax - delayMin);
        ctx.timeout(() => {
          if (mySeq !== seq || state !== 'waiting') return;
          if (ctx.rng() < decoyProb) {
            state = 'decoy';
            setPad('decoy');
            ctx.timeout(() => {
              if (mySeq !== seq || state !== 'decoy') return; // tapped (error already handled)
              // successful withhold — continue to the real go after a beat
              state = 'waiting';
              setPad('wait');
              ctx.timeout(() => fireGo(mySeq), 500 + ctx.rng() * 900);
            }, 850);
          } else {
            fireGo(mySeq);
          }
        }, delay);
      }

      function fireGo(mySeq) {
        if (mySeq !== seq || state !== 'waiting' || !ctx.running) return;
        state = 'go';
        goAt = ctx.now();
        setPad('go');
        // stale-go guard: if no response in 1.5s, count as a slow trial (1500ms)
        ctx.timeout(() => {
          if (mySeq !== seq || state !== 'go') return;
          rts.push(1500);
          trialsDone++;
          ctx.beep('bad');
          nextTrial();
        }, 1500);
      }

      function respond() {
        if (!ctx.running) return;
        if (state === 'go') {
          const rt = ctx.now() - goAt;
          rts.push(rt);
          trialsDone++;
          state = 'idle';
          seq++; // kill this trial's remaining timers
          ctx.flash('good'); ctx.beep('good');
          label.textContent = Math.round(rt) + ' ms';
          ctx.timeout(nextTrial, 650);
        } else if (state === 'waiting') {
          falseStarts++;
          state = 'idle';
          seq++; // kill the pending go/decoy timers of the aborted trial
          ctx.flash('bad'); ctx.beep('bad');
          label.textContent = 'Too soon! Wait for green.';
          ctx.timeout(nextTrial, 900);
        } else if (state === 'decoy') {
          decoyErrors++;
          state = 'idle';
          seq++; // kill the withhold-follow-up timer
          ctx.flash('bad'); ctx.beep('bad');
          label.textContent = 'That was a decoy!';
          ctx.timeout(nextTrial, 900);
        }
      }

      // pointerdown (not click) for timing accuracy; SPACE for keyboard
      ctx.listen(pad, 'pointerdown', respond);
      ctx.keys({ ' ': respond });

      function end() {
        // contract: primary must be finite. Zero valid trials = worst-case RT,
        // NOT 0 (0 ms would score as superhuman on a lower-is-better metric).
        const medianRT = rts.length ? BT.median(rts) : 1500;
        const errors = falseStarts + decoyErrors;
        ctx.hud.progress(1);
        ctx.finish({
          primary: medianRT,
          metrics: {
            medianRT: rts.length ? BT.median(rts) : null,
            meanRT: rts.length ? Math.round(BT.mean(rts)) : null,
            trials: rts.length, falseStarts, decoyErrors,
          },
          advance: errors === 0 && rts.length >= TRIALS ? 'up'
            : errors >= 3 ? 'down' : 'hold',
        });
      }

      nextTrial();
    },
  });
})();
