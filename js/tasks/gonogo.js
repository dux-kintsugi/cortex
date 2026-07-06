/* ============================================================
   Cortex task — Go / No-Go  (domain: attention)

   Gameplay: shapes flash in the centre of a tap pad. GREEN
   shapes are GO — tap the pad or press SPACE before the window
   closes. RED/ORANGE shapes are NO-GO — withhold. Higher levels
   raise the go ratio (stronger prepotency) and shorten the ISI.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const SHAPES = ['●', '■', '▲', '◆', '⬢'];
  const HINT = 'Green → tap · Red/Orange → hold';

  BT.registerTask({
    id: 'gonogo',
    name: 'Go / No-Go',
    icon: '🚦',
    domain: 'attention',
    tagline: 'Tap the green shapes — resist the red ones.',
    howTo: [
      'Shapes flash one at a time on the pad.',
      'GREEN shape → tap the pad (or press SPACE) quickly.',
      'RED or ORANGE shape → do nothing. Hold back!',
      'Higher levels are faster, with more greens to lure you in.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = (hitRate − faRate) × 100 — rewards speed-with-restraint.
    norms: { metric: 'netAccuracy', mean: 70, sd: 15, higherIsBetter: true },
    fmtPrimary: s => 'hits ' + Math.round(s.metrics.hitRate * 100) +
      '% · false alarms ' + Math.round(s.metrics.faRate * 100) + '%',

    run(ctx) {
      // Level knobs: more GO trials and a quicker stream as level rises.
      const goRatio = Math.min(0.70 + 0.02 * ctx.level, 0.85);
      const stimMs = 650;                                   // stimulus visible
      const windowMs = 950;                                 // response window from onset
      const isiMs = Math.max(1400 - 65 * ctx.level, 750);   // base ISI, ±20% jitter
      const startedAt = ctx.now();

      let goTrials = 0, noGoTrials = 0;
      let hits = 0, misses = 0, falseAlarms = 0, correctRejections = 0;
      const hitRTs = [];
      let noGoStreak = 0;
      let trial = null; // { isGo, onset, open, responded }

      const shape = el('div', { class: 'big-shape', text: '●', style: 'opacity:0;' });
      const label = el('div', { text: HINT });
      const pad = el('div', { class: 'tap-pad' }, shape, label);
      ctx.container.appendChild(el('div', { class: 'stage-center' }, pad));

      function updateHud() {
        ctx.hud.progress(BT.clamp((ctx.now() - startedAt) / ctx.durationMs, 0, 1));
        const hr = goTrials ? Math.round((hits / goTrials) * 100) + '%' : '—';
        const fa = noGoTrials ? Math.round((falseAlarms / noGoTrials) * 100) + '%' : '—';
        ctx.hud.stat('Trial ' + (goTrials + noGoTrials + 1) +
          ' · hits ' + hr + ' · false alarms ' + fa);
      }

      function scheduleNext() {
        if (!ctx.running) return;
        if (ctx.now() - startedAt > ctx.durationMs) return end();
        const jitter = 1 + (ctx.rng() * 0.4 - 0.2);
        ctx.timeout(startTrial, isiMs * jitter);
      }

      function startTrial() {
        if (!ctx.running) return;
        let isGo = ctx.rng() < goRatio;
        if (noGoStreak >= 2) isGo = true; // keep the go response prepotent
        noGoStreak = isGo ? 0 : noGoStreak + 1;

        shape.textContent = SHAPES[Math.floor(ctx.rng() * SHAPES.length)];
        shape.style.color = isGo ? 'var(--good)'
          : ctx.rng() < 0.5 ? 'var(--bad)' : 'var(--warn)';
        shape.style.opacity = '1';
        label.textContent = HINT;

        const t = { isGo, onset: ctx.now(), open: true, responded: false };
        trial = t;
        updateHud();

        ctx.timeout(() => {
          if (ctx.running && t === trial && t.open && !t.responded) shape.style.opacity = '0';
        }, stimMs);
        ctx.timeout(() => closeWindow(t), windowMs);
      }

      function closeWindow(t) {
        if (!ctx.running || t !== trial || !t.open) return;
        t.open = false;
        shape.style.opacity = '0';
        if (t.isGo) {
          goTrials++;
          if (t.responded) {
            hits++;
          } else {
            misses++;
            ctx.beep('bad');
            label.textContent = 'Missed a green!';
          }
        } else {
          noGoTrials++;
          if (t.responded) falseAlarms++;
          else correctRejections++;
        }
        updateHud();
        scheduleNext();
      }

      function respond() {
        if (!ctx.running || !trial || !trial.open || trial.responded) return;
        trial.responded = true;
        shape.style.opacity = '0';
        if (trial.isGo) {
          const rt = ctx.now() - trial.onset;
          hitRTs.push(rt);
          ctx.flash('good'); ctx.beep('good');
          label.textContent = Math.round(rt) + ' ms';
        } else {
          ctx.flash('bad'); ctx.beep('bad');
          label.textContent = 'That one was a trap!';
        }
      }

      // pointerdown (not click) for timing accuracy; SPACE for keyboard
      ctx.listen(pad, 'pointerdown', respond);
      ctx.keys({ ' ': respond });

      function end() {
        const hitRate = goTrials ? hits / goTrials : 0;
        const faRate = noGoTrials ? falseAlarms / noGoTrials : 0;
        const netAccuracy = (hitRate - faRate) * 100;
        ctx.hud.progress(1);
        ctx.finish({
          primary: netAccuracy,
          metrics: {
            netAccuracy, hitRate, faRate,
            meanRT: hitRTs.length ? Math.round(BT.mean(hitRTs)) : null,
            hits, misses, falseAlarms, correctRejections, goTrials, noGoTrials,
          },
          advance: netAccuracy >= 88 ? 'up' : netAccuracy < 50 ? 'down' : 'hold',
        });
      }

      updateHud();
      scheduleNext();
    },
  });
})();
