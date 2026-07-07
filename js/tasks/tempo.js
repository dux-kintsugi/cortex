/* ============================================================
   Cortex task — Tempo  (domain: speed)

   Sensorimotor synchronization. A round = 3 cycles. Each cycle:
   a metronome plays 8 beats (tone + pulsing dot) and the player
   taps along from beat 3; then the cues stop and the player must
   keep tapping 10 more intervals from memory. Scored ONLY on the
   silent continuation taps: mean absolute asynchrony vs the
   invisible beat, capped at half an interval (lower = better).
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  function ioiForLevel(level) {
    return 60000 / (70 + 6 * level); // inter-onset interval in ms
  }

  BT.registerTask({
    id: 'tempo',
    name: 'Tempo',
    icon: '🥁',
    domain: 'speed',
    tagline: 'Keep the beat going after the metronome cuts out.',
    howTo: [
      'A metronome plays 8 beats — the dot pulses with each one.',
      'Tap along (pad or SPACE) from beat 3 to lock in the rhythm.',
      'Then the beats STOP. Keep tapping the exact same tempo, 10 more taps.',
      'Only the silent taps are scored: how close each lands to the hidden beat.',
      '3 cycles per round. Lower timing drift = better.',
    ],

    // Looping walkthrough: pulsing beats, then a frozen dot while "you" keep time.
    introDemo(box, level) {
      const ioi = Math.max(500, Math.round(ioiForLevel(level)));
      const dot = el('div', {
        text: '●',
        style: 'font-size:2.8rem;line-height:1;color:var(--accent);' +
          'transition:transform .1s ease-out,color .15s,opacity .15s;',
      });
      const cap = el('div', { class: 'task-msg', style: 'font-size:.85rem;min-height:40px;' });
      box.appendChild(el('div', {
        class: 'small muted',
        style: 'text-align:center;margin-bottom:6px;font-weight:700;letter-spacing:.06em;',
        text: 'LIVE DEMO',
      }));
      box.appendChild(el('div',
        { style: 'display:flex;flex-direction:column;align-items:center;gap:10px;padding:2px 0;' },
        dot, cap));

      let step = -1;
      function tick() {
        step = (step + 1) % 10;
        if (step < 4) {
          dot.style.color = 'var(--accent)';
          dot.style.opacity = '1';
          dot.style.transform = 'scale(1.35)';
          setTimeout(() => { dot.style.transform = 'scale(1)'; }, 140);
          cap.textContent = 'Metronome beats — tap along with the dot…';
        } else if (step < 8) {
          dot.style.color = 'var(--muted)';
          dot.style.opacity = '.45';
          dot.style.transform = 'scale(1.1)';
          setTimeout(() => { dot.style.transform = 'scale(1)'; }, 140);
          cap.textContent = 'Beats stop — YOU keep tapping the same tempo.';
        } else {
          dot.style.transform = 'scale(1)';
          cap.textContent = 'Scored on how close your silent taps land.';
        }
      }
      tick();
      const iv = setInterval(tick, ioi);
      return () => clearInterval(iv);
    },

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    // Trial-based (3 fixed cycles ≈ 40–55s). Budgets are a safety net.
    assessDurationMs: 70000,
    trainDurationMs: 70000,

    // primary = mean absolute asynchrony (ms) across all continuation taps.
    norms: { metric: 'meanAsync', mean: 85, sd: 35, higherIsBetter: false },
    fmtPrimary: s => '±' + Math.round(s.primary) + ' ms timing drift',

    run(ctx) {
      const IOI = ioiForLevel(ctx.level);
      const BEATS = 8;   // audible beats per cycle
      const CONT = 10;   // silent continuation intervals per cycle
      const CYCLES = ctx.practice ? 1 : 3;
      // Sound off → the game must stay playable silently: the audible phase
      // shows a countdown-style pulse (8…1) so the hand-off is still obvious.
      const muted = !(BT.state.settings && BT.state.settings.sound);
      const startedAt = ctx.now();

      const asyncs = []; // capped asynchrony per continuation interval, in scoring order
      let tapped = 0, skipped = 0;

      let cycle = 0;        // completed-cycle counter (0-based current)
      let phase = 'idle';   // idle | sync | cont | rest
      let beatNum = 0;      // beats fired this cycle
      let cycleStart = 0;   // absolute target time of beat 1
      let contBase = 0;     // perceived time of the final audible beat (latency-calibrated)
      let syncOffs = [];    // sync-phase tap offsets vs the scheduled beat grid, this cycle
      let cycleFirstIdx = 0;// asyncs index where this cycle's scoring began
      let k = 1;            // next expected continuation interval (1..CONT)
      let lastTapAt = -1e9; // debounce: rapid double-taps must not eat two intervals
      let checker = null;   // skip-watcher interval id (cont phase only)

      /* ----- stage ----- */
      const dot = el('div', {
        class: 'big-shape', text: '●',
        style: 'color:var(--muted);opacity:.4;' +
          'transition:transform .09s ease-out,opacity .09s,color .12s;',
      });
      const label = el('div', { text: 'Get ready…' });
      const pad = el('div', { class: 'tap-pad' }, dot, label);
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { class: 'task-msg', text: 'Tap along from beat 3, then keep the beat through the silence.' }),
        pad));

      function setDotIdle() {
        dot.textContent = '●';
        dot.style.color = 'var(--muted)';
        dot.style.opacity = '.4';
        dot.style.transform = 'scale(1)';
      }
      function freezeDot() {
        if (!ctx.running) return;
        dot.textContent = '●';
        dot.style.color = 'var(--muted)';
        dot.style.opacity = '.35';
        dot.style.transform = 'scale(1)';
      }
      function beatPulse() {
        dot.textContent = muted ? String(BEATS - beatNum + 1) : '●';
        dot.style.color = 'var(--accent-2)';
        dot.style.opacity = '1';
        dot.style.transform = 'scale(1.3)';
        ctx.timeout(() => {
          if (!ctx.running || phase !== 'sync') return;
          dot.style.color = 'var(--accent)';
          dot.style.opacity = '.55';
          dot.style.transform = 'scale(1)';
        }, 130);
      }
      // Ack the player's own tap on the pad, never on the stimulus dot —
      // the frozen dot must give zero timing cues during the silent phase.
      function padAck() {
        pad.style.background = 'var(--panel-2)';
        ctx.timeout(() => { if (ctx.running) pad.style.background = 'var(--panel)'; }, 100);
      }

      /* ----- hud ----- */
      function updateHud() {
        const upc = BEATS + CONT;
        const units = cycle * upc +
          (phase === 'sync' ? beatNum : phase === 'cont' ? BEATS + Math.min(k - 1, CONT) : 0);
        ctx.hud.progress(units / (CYCLES * upc));
        const drift = asyncs.length ? ' · drift ±' + Math.round(BT.mean(asyncs)) + ' ms' : '';
        if (phase === 'sync') {
          ctx.hud.stat('Cycle ' + (cycle + 1) + '/' + CYCLES + ' · beat ' + beatNum + '/' + BEATS + drift);
        } else if (phase === 'cont') {
          ctx.hud.stat('Cycle ' + (cycle + 1) + '/' + CYCLES + ' · silent tap ' +
            Math.min(k - 1, CONT) + '/' + CONT + drift);
        }
      }

      /* ----- cycle machinery ----- */
      function startCycle() {
        if (!ctx.running) return;
        if (cycle >= CYCLES || ctx.now() - startedAt > ctx.durationMs) return end();
        phase = 'sync';
        beatNum = 0;
        syncOffs = [];
        cycleFirstIdx = asyncs.length;
        label.textContent = 'Cycle ' + (cycle + 1) + ' of ' + CYCLES + ' — tap along from beat 3';
        setDotIdle();
        updateHud();
        cycleStart = ctx.now() + 900; // brief lead-in before beat 1
        scheduleBeat();
      }

      // Absolute-time scheduling: each beat aims at cycleStart + n·IOI so
      // setTimeout drift never accumulates across the metronome.
      function scheduleBeat() {
        ctx.timeout(fireBeat, Math.max(0, cycleStart + beatNum * IOI - ctx.now()));
      }

      function fireBeat() {
        if (!ctx.running || phase !== 'sync') return;
        const t = ctx.now();
        beatNum++;
        ctx.beep('tick'); // silent no-op when sound is off
        beatPulse();
        updateHud();
        if (beatNum >= BEATS) {
          // Hand off to the silent continuation. Expected taps land at
          // contBase + k·IOI; a tap synced with THIS beat is ignored below.
          // Anchor the grid to when the player HEARS the beats, not when JS
          // schedules them: the median offset of their own entrainment taps
          // self-calibrates audio output latency (~150-250ms on Bluetooth)
          // plus touch input latency. No sync taps → fall back to schedule time.
          contBase = t + (syncOffs.length >= 3 ? BT.median(syncOffs) : 0);
          phase = 'cont';
          k = 1;
          label.textContent = 'Keep the beat — ' + CONT + ' taps, no cues';
          ctx.timeout(freezeDot, 160);
          checker = ctx.interval(checkSkips, 80);
          updateHud();
        } else {
          scheduleBeat();
        }
      }

      function recordInterval(a, wasSkip) {
        asyncs.push(a);
        if (wasSkip) skipped++; else tapped++;
        k++;
        updateHud();
      }

      // A gap > 1.6·IOI (i.e. now past expected_k + 0.6·IOI) = one skipped
      // interval at the IOI/2 cap; k advances so one miss never cascades.
      function catchUpSkips(t) {
        while (k <= CONT && t > contBase + k * IOI + 0.6 * IOI) {
          recordInterval(IOI / 2, true);
        }
      }

      function checkSkips() {
        if (!ctx.running || phase !== 'cont') return;
        catchUpSkips(ctx.now());
        if (k > CONT) endContinuation();
      }

      function endContinuation() {
        if (phase !== 'cont') return; // tap handler + checker may race in one tick
        phase = 'rest';
        if (checker != null) { ctx.clearTimer(checker); checker = null; }
        const cyc = asyncs.slice(cycleFirstIdx);
        label.textContent = 'Cycle done — drift ±' + Math.round(cyc.length ? BT.mean(cyc) : IOI / 2) + ' ms';
        setDotIdle();
        cycle++;
        updateHud();
        ctx.timeout(startCycle, 1500);
      }

      /* ----- input ----- */
      function onTap() {
        if (!ctx.running) return;
        const t = ctx.now();
        if (t - lastTapAt < IOI * 0.35) return; // swallow accidental double-taps
        lastTapAt = t;
        if (phase === 'sync') {
          padAck();
          // Entrainment taps stay unscored, but their offset vs the scheduled
          // grid calibrates the continuation anchor (wrapped to ±IOI/2).
          if (beatNum >= 2) {
            let off = ((t - cycleStart) % IOI + IOI) % IOI;
            if (off > IOI / 2) off -= IOI;
            syncOffs.push(off);
          }
          return;
        }
        if (phase !== 'cont' || k > CONT) return;
        if (t < contBase + 0.5 * IOI) { padAck(); return; } // still the final-beat tap
        padAck();
        catchUpSkips(t);
        if (k > CONT) return endContinuation();
        const a = Math.min(Math.abs(t - (contBase + k * IOI)), IOI / 2);
        recordInterval(a, false);
        if (k > CONT) endContinuation();
      }

      ctx.listen(pad, 'pointerdown', onTap);
      ctx.keys({ ' ': onTap });

      /* ----- finish ----- */
      function end() {
        // Fully passive rounds still end (the skip watcher fills every
        // interval at IOI/2), so primary is always finite.
        const primary = asyncs.length ? BT.mean(asyncs) : IOI / 2;
        const h1 = [], h2 = [];
        asyncs.forEach((a, i) => { (i % 2 === 0 ? h1 : h2).push(a); });
        const haveHalves = h1.length > 0 && h2.length > 0;
        ctx.hud.progress(1);
        ctx.finish({
          primary,
          // Inverted band: ≤50 ms is mastery, >120 ms drops the level.
          levelProgress: BT.clamp((120 - primary) / (120 - 50), 0, 1),
          metrics: {
            meanAsync: Math.round(primary * 10) / 10,
            ioi: Math.round(IOI),
            cycles: CYCLES,
            intervals: asyncs.length,
            taps: tapped,
            skipped,
            half1: haveHalves ? Math.round(BT.mean(h1) * 10) / 10 : null,
            half2: haveHalves ? Math.round(BT.mean(h2) * 10) / 10 : null,
          },
          advance: primary <= 50 ? 'up' : primary > 120 ? 'down' : 'hold',
        });
      }

      ctx.hud.progress(0);
      ctx.hud.stat('Tempo · ' + Math.round(60000 / IOI) + ' BPM · get ready…');
      startCycle();
    },
  });
})();
