/* ============================================================
   Cortex task — Go / No-Go  (domain: attention)

   Gameplay: shapes flash in the centre of a tap pad. GREEN
   shapes are GO — tap the pad or press SPACE before the window
   closes. RED/ORANGE shapes are NO-GO — withhold. Higher levels
   raise the go ratio (stronger prepotency) and shorten the ISI.
   Levels 11–12 add Stop-Signal trials: on 25% of GO trials a
   loud stop tone + red border fires 150–400ms after onset —
   responding after it is an error. Survival mode: play until
   3 strikes (misses + false alarms) or the 300s cap.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const SHAPES = ['●', '■', '▲', '◆', '⬢'];
  const CVD_GO_SHAPES = ['●', '■', '▲'];      // filled = GO (redundant shape cue)
  const CVD_NOGO_SHAPES = ['○', '□', '△'];    // hollow = NO-GO
  const HINT = 'Green → tap · Red/Orange → hold';
  const HINT_STOP = 'Green → tap · Red/Orange → hold · Stop tone → hold!';
  const SURVIVAL_STRIKES = 3;

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
      'From level 11: a loud stop tone + red flash right after a green means cancel — do NOT tap.',
    ],

    maxLevel: 12,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,
    survival: true,

    // primary = (hitRate − faRate) × 100 — rewards speed-with-restraint.
    norms: { metric: 'netAccuracy', mean: 70, sd: 15, higherIsBetter: true },
    fmtPrimary: s => 'hits ' + Math.round(s.metrics.hitRate * 100) +
      '% · false alarms ' + Math.round(s.metrics.faRate * 100) + '%',
    fmtSurvival: s => (s.metrics.hits + s.metrics.correctRejections) +
      ' correct before 3 strikes',

    run(ctx) {
      // Level knobs: more GO trials and a quicker stream as level rises.
      const goRatio = Math.min(0.70 + 0.02 * ctx.level, 0.85);
      const stimMs = 650;                                   // stimulus visible
      const windowMs = 950;                                 // response window from onset
      const isiMs = Math.max(1400 - 65 * ctx.level, 750);   // base ISI, ±20% jitter
      const cvdAssist = !!(BT.state.settings && BT.state.settings.cvdAssist);
      const stopMode = ctx.level >= 11; // Stop-Signal twist (levels 11–12)
      const hint = stopMode ? HINT_STOP : HINT;
      const startedAt = ctx.now();

      let goTrials = 0, noGoTrials = 0;
      let hits = 0, misses = 0, falseAlarms = 0, correctRejections = 0;
      const halves = [ // split-half buckets by scored-trial parity
        { go: 0, hits: 0, noGo: 0, fa: 0 },
        { go: 0, hits: 0, noGo: 0, fa: 0 },
      ];
      const hitRTs = [];
      let noGoStreak = 0;
      let trial = null; // { isGo, onset, open, responded, stopped }

      const shape = el('div', { class: 'big-shape', text: '●', style: 'opacity:0;' });
      const label = el('div', { text: hint });
      const pad = el('div', { class: 'tap-pad' }, shape, label);
      ctx.container.appendChild(el('div', { class: 'stage-center' }, pad));

      const strikes = () => misses + falseAlarms; // survival: wrong taps + missed greens

      function updateHud() {
        const timeFrac = BT.clamp((ctx.now() - startedAt) / ctx.durationMs, 0, 1);
        const twistNote = stopMode ? 'STOP-SIGNAL: tone + red flash = hold, even on green · ' : '';
        if (ctx.survival) {
          ctx.hud.progress(Math.max(timeFrac, BT.clamp(strikes() / SURVIVAL_STRIKES, 0, 1)));
          ctx.hud.stat(twistNote + 'Correct ' + (hits + correctRejections) +
            ' · strikes ' + strikes() + '/' + SURVIVAL_STRIKES);
          return;
        }
        ctx.hud.progress(timeFrac);
        const hr = goTrials ? Math.round((hits / goTrials) * 100) + '%' : '—';
        const fa = noGoTrials ? Math.round((falseAlarms / noGoTrials) * 100) + '%' : '—';
        ctx.hud.stat(twistNote + 'Trial ' + (goTrials + noGoTrials + 1) +
          ' · hits ' + hr + ' · false alarms ' + fa);
      }

      function scheduleNext() {
        if (!ctx.running) return;
        if (ctx.survival && strikes() >= SURVIVAL_STRIKES) return end();
        if (ctx.now() - startedAt > ctx.durationMs) return end();
        const jitter = 1 + (ctx.rng() * 0.4 - 0.2);
        ctx.timeout(startTrial, isiMs * jitter);
      }

      function startTrial() {
        if (!ctx.running) return;
        let isGo = ctx.rng() < goRatio;
        if (noGoStreak >= 2) isGo = true; // keep the go response prepotent
        noGoStreak = isGo ? 0 : noGoStreak + 1;

        const glyphs = cvdAssist ? (isGo ? CVD_GO_SHAPES : CVD_NOGO_SHAPES) : SHAPES;
        shape.textContent = glyphs[Math.floor(ctx.rng() * glyphs.length)];
        shape.style.color = isGo ? 'var(--good)'
          : ctx.rng() < 0.5 ? 'var(--bad)' : 'var(--warn)';
        shape.style.opacity = '1';
        label.textContent = hint;
        pad.style.boxShadow = '';

        const t = { isGo, onset: ctx.now(), open: true, responded: false, stopped: false };
        trial = t;
        updateHud();

        // Stop-Signal twist (levels 11–12): 25% of GO trials get a loud stop
        // tone + red border 150–400ms after onset — responding after it = error.
        if (stopMode && isGo && ctx.rng() < 0.25) {
          const stopDelay = 150 + ctx.rng() * 250;
          ctx.timeout(() => {
            if (!ctx.running || t !== trial || !t.open || t.responded) return;
            t.stopped = true;
            ctx.beep('bad');
            pad.style.boxShadow = 'inset 0 0 0 4px var(--bad)';
            label.textContent = 'STOP — hold!';
          }, stopDelay);
        }

        ctx.timeout(() => {
          if (ctx.running && t === trial && t.open && !t.responded) shape.style.opacity = '0';
        }, stimMs);
        ctx.timeout(() => closeWindow(t), windowMs);
      }

      function closeWindow(t) {
        if (!ctx.running || t !== trial || !t.open) return;
        t.open = false;
        shape.style.opacity = '0';
        pad.style.boxShadow = '';
        const half = halves[(goTrials + noGoTrials) % 2];
        // A stopped GO trial is scored like a NO-GO: withholding is correct.
        if (t.isGo && !t.stopped) {
          goTrials++;
          half.go++;
          if (t.responded) {
            hits++;
            half.hits++;
          } else {
            misses++;
            ctx.feedback(false);
            label.textContent = 'Missed a green!';
          }
        } else {
          noGoTrials++;
          half.noGo++;
          if (t.responded) { falseAlarms++; half.fa++; }
          else correctRejections++;
        }
        updateHud();
        scheduleNext();
      }

      function respond() {
        if (!ctx.running || !trial || !trial.open || trial.responded) return;
        trial.responded = true;
        shape.style.opacity = '0';
        if (trial.stopped) {
          ctx.feedback(false);
          label.textContent = 'The stop tone said hold!';
        } else if (trial.isGo) {
          const rt = ctx.now() - trial.onset;
          hitRTs.push(rt);
          ctx.feedback(true);
          label.textContent = Math.round(rt) + ' ms';
        } else {
          ctx.feedback(false);
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
        const halfNet = h =>
          ((h.go ? h.hits / h.go : 0) - (h.noGo ? h.fa / h.noGo : 0)) * 100;
        const bothHalves = halves.every(h => h.go + h.noGo > 0);
        ctx.hud.progress(1);
        ctx.finish({
          // Survival: primary = correct answers achieved before 3 strikes.
          primary: ctx.survival ? hits + correctRejections : netAccuracy,
          levelProgress: BT.clamp((netAccuracy - 50) / (88 - 50), 0, 1),
          metrics: {
            netAccuracy, hitRate, faRate,
            half1: bothHalves ? halfNet(halves[0]) : null,
            half2: bothHalves ? halfNet(halves[1]) : null,
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
