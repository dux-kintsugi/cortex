/* ============================================================
   Cortex task — Digit Span  (domain: workingMemory)

   Gameplay: digits flash one at a time in the stimulus box, then
   you type them back on a keypad (or keyboard). Phase 1 recalls
   FORWARD starting at length 4; phase 2 recalls BACKWARD starting
   at length 3. Correct → length+1; wrong → one retry at the same
   length; a second miss ends the phase. Higher levels speed up
   the presentation. primary = (bestForward + bestBackward) / 2.
   Twist (v3): levels 11–12 are SEQUENCING span — both phases
   recall the digits in ASCENDING order; sequences are generated
   without duplicate digits. Below level 11 nothing changes.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'digitspan',
    name: 'Digit Span',
    icon: '🔢',
    domain: 'workingMemory',
    tagline: 'How many digits can you hold in mind at once?',
    howTo: [
      'Digits flash one at a time — memorize the sequence.',
      'Type it back on the keypad (or your keyboard), then press OK.',
      'Phase 1: enter the digits in the SAME order. Phase 2: in REVERSE.',
      'Levels 11–12: type every sequence in ASCENDING order instead.',
      'Each success adds a digit; two misses at one length ends the phase.',
    ],

    maxLevel: 12,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = mean of best forward and best backward span lengths.
    norms: { metric: 'meanSpan', mean: 5.6, sd: 1.0, higherIsBetter: true },
    fmtPrimary: s => s.metrics.sequencing
      ? 'ascending spans ' + s.metrics.bestForward + ' · ' + s.metrics.bestBackward
      : 'forward ' + s.metrics.bestForward + ' · backward ' + s.metrics.bestBackward,

    run(ctx) {
      // Level knob: presentation speeds up with level; gap stays fixed.
      const ON_MS = Math.max(750 - 30 * ctx.level, 450);
      const GAP_MS = 250;
      // Twist levels: both phases become sequencing span (ascending recall).
      const SEQUENCING = ctx.level >= 11;
      // Safety cap so a perfect run still terminates. Sequencing caps at 8:
      // with distinct digits 0-9, n=10 always sorts to '0123456789' and n=9
      // reduces to spotting the one missing digit — no memory needed.
      const MAX_LEN = SEQUENCING ? 8 : 10;
      const startedAt = ctx.now();

      let phase = 'fwd';                     // 'fwd' | 'bwd'
      let len = 4;                           // current sequence length
      let misses = 0;                        // misses at the current length
      let bestForward = 0, bestBackward = 0; // last passed length per phase
      let attempts = 0, passes = 0, totalMisses = 0;
      let attemptsInPhase = 0;

      let state = 'pause';                   // 'pause' | 'show' | 'recall'
      let seq = [];
      let entered = '';

      const stim = el('div', { class: 'stim' });
      const msg = el('div', { class: 'task-msg', text: 'Watch…' });
      const answer = el('div', { class: 'answer-line' });
      const padWrap = el('div', { class: 'keypad' },
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', 'OK'].map(k =>
          el('button', {
            class: 'key' + (k === '⌫' || k === 'OK' ? ' action' : ''),
            text: k, dataset: { k: k },
          })));
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { class: 'stim-box' }, stim),
        msg, answer, padWrap));

      function setPadEnabled(on) {
        padWrap.style.opacity = on ? '' : '0.35';
        padWrap.style.pointerEvents = on ? '' : 'none';
      }

      function updateHud() {
        // Trial-based progress: forward phase fills 0–.5, backward .5–1.
        const base = phase === 'fwd' ? 0 : 0.5;
        ctx.hud.progress(base + 0.5 * Math.min(attemptsInPhase / 8, 0.96));
        ctx.hud.stat((SEQUENCING
          ? 'Sequencing span ' + (phase === 'fwd' ? '1' : '2') + '/2 · type in ASCENDING order'
          : (phase === 'fwd' ? 'Forward' : 'Backward') + ' span') +
          ' · length ' + len + (misses ? ' · retry' : ''));
      }

      function makeSeq(n) {
        if (SEQUENCING) {
          // Sequencing twist: distinct digits only (n <= MAX_LEN = 8, so a
          // duplicate-free draw always exists). Reject shows that are already
          // in ascending order — they'd reduce to a plain forward trial.
          const pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          let s;
          do {
            for (let i = pool.length - 1; i > 0; i--) {
              const j = Math.floor(ctx.rng() * (i + 1));
              const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
            }
            s = pool.slice(0, n);
          } while (n > 2 && s.every((d, i) => i === 0 || d > s[i - 1]));
          return s;
        }
        const s = [];
        for (let i = 0; i < n; i++) {
          let d;
          do { d = Math.floor(ctx.rng() * 10); } while (i > 0 && d === s[i - 1]);
          s.push(d);
        }
        return s;
      }

      function nextTrial() {
        if (!ctx.running) return;
        if (ctx.practice && attempts >= 2) return end(); // warm-up: two attempts are enough
        if (ctx.now() - startedAt > ctx.durationMs) return end(); // duration end (avoids engine overrun void)
        attemptsInPhase++;
        updateHud();
        state = 'show';
        setPadEnabled(false);
        entered = '';
        answer.textContent = '';
        stim.textContent = '';
        msg.textContent = 'Watch…';
        seq = makeSeq(len);
        ctx.timeout(() => present(0), 600);
      }

      function present(i) {
        if (!ctx.running) return;
        if (i >= seq.length) return startRecall();
        stim.textContent = String(seq[i]);
        ctx.timeout(() => {
          if (!ctx.running) return;
          stim.textContent = '';
          ctx.timeout(() => present(i + 1), GAP_MS);
        }, ON_MS);
      }

      function startRecall() {
        if (!ctx.running) return;
        state = 'recall';
        msg.textContent = SEQUENCING
          ? 'Type the digits in ASCENDING order (smallest first), then OK'
          : phase === 'fwd'
            ? 'Type the digits in order, then OK'
            : 'Type the digits in REVERSE order, then OK';
        setPadEnabled(true);
      }

      function pressDigit(d) {
        if (state !== 'recall' || !ctx.running) return;
        if (entered.length >= seq.length) return;
        entered += d;
        answer.textContent = entered;
      }

      function backspace() {
        if (state !== 'recall' || !ctx.running) return;
        entered = entered.slice(0, -1);
        answer.textContent = entered;
      }

      function submit() {
        if (state !== 'recall' || !ctx.running || !entered) return;
        state = 'pause'; // blocks double-submit immediately
        setPadEnabled(false);
        attempts++;
        const target = SEQUENCING
          ? seq.slice().sort((a, b) => a - b).join('')
          : phase === 'fwd' ? seq.join('') : seq.slice().reverse().join('');
        if (entered === target) {
          passes++;
          ctx.flash('good'); ctx.beep('good');
          if (phase === 'fwd') bestForward = len; else bestBackward = len;
          misses = 0;
          if (len >= MAX_LEN) {
            msg.textContent = 'Maximum length reached!';
            ctx.timeout(endPhase, 900);
          } else {
            len++;
            msg.textContent = 'Correct! Next: ' + len + ' digits.';
            ctx.timeout(nextTrial, 900);
          }
        } else {
          misses++; totalMisses++;
          ctx.flash('bad'); ctx.beep('bad');
          if (misses >= 2) {
            msg.textContent = 'The answer was ' + target.split('').join(' ');
            ctx.timeout(endPhase, 1400);
          } else {
            msg.textContent = 'Not quite — one more try at ' + len + ' digits.';
            ctx.timeout(nextTrial, 1100);
          }
        }
      }

      function endPhase() {
        if (!ctx.running) return;
        if (ctx.practice) return end(); // warm-up skips the backward phase
        if (phase === 'fwd') {
          phase = 'bwd';
          len = 3;
          misses = 0;
          attemptsInPhase = 0;
          updateHud();
          stim.textContent = SEQUENCING ? '⇅' : '↩';
          msg.textContent = SEQUENCING
            ? 'Phase 2 — again: enter each sequence in ASCENDING order.'
            : 'Phase 2 — BACKWARD: enter each sequence in reverse.';
          ctx.beep('tick');
          ctx.timeout(() => {
            if (!ctx.running) return;
            stim.textContent = '';
            nextTrial();
          }, 2200);
        } else {
          end();
        }
      }

      function end() {
        const primary = (bestForward + bestBackward) / 2;
        ctx.hud.progress(1);
        ctx.hud.stat(SEQUENCING
          ? 'ascending spans ' + bestForward + ' · ' + bestBackward
          : 'forward ' + bestForward + ' · backward ' + bestBackward);
        ctx.finish({
          primary,
          // Span halves don't decompose into odd/even trials meaningfully.
          metrics: { bestForward, bestBackward, sequencing: SEQUENCING ? 1 : 0, attempts, correct: passes, misses: totalMisses, half1: null, half2: null },
          advance: primary >= 6.5 ? 'up' : primary <= 4 ? 'down' : 'hold',
          levelProgress: BT.clamp((primary - 4) / (6.5 - 4), 0, 1),
        });
      }

      // Pointer: one delegated listener on the keypad. Keyboard: digits + ⌫ + Enter.
      ctx.listen(padWrap, 'click', e => {
        const btn = e.target.closest('.key');
        if (!btn) return;
        const k = btn.dataset.k;
        if (k === '⌫') backspace();
        else if (k === 'OK') submit();
        else pressDigit(k);
      });
      const keyMap = { Backspace: backspace, Enter: submit };
      for (let d = 0; d <= 9; d++) keyMap[String(d)] = () => pressDigit(String(d));
      ctx.keys(keyMap);

      nextTrial();
    },
  });
})();
