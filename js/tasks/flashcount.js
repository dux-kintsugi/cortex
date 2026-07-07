/* ============================================================
   Cortex task — Flash Count  (domain: math) · survival capable

   Numerosity: a cloud of N dots flashes on a canvas for 450ms,
   then you estimate the count on a keypad. Small clouds (N ≤ 6)
   must be exact; larger ones allow ±15%. Dot radii are jittered
   ±30% so total ink area is never a reliable cue — you have to
   count, not gauge brightness. Levels flash bigger, denser clouds.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const FLASH_MS = 450;
  const FEEDBACK_MS = 900;

  BT.registerTask({
    id: 'flashcount',
    name: 'Flash Count',
    icon: '🫧',
    domain: 'math',
    tagline: 'How many dots? You get half a second.',
    howTo: [
      'A cloud of dots flashes for less than half a second.',
      'Estimate how many you saw — type it on the keypad.',
      'Press OK (or Enter) to lock in your answer.',
      'Small clouds (6 or fewer) must be exact; bigger clouds allow ~15% wiggle.',
      'Higher levels flash bigger, denser clouds.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 60000,
    trainDurationMs: 75000,

    survival: true, // three out-of-tolerance estimates end the run

    // primary = mean per-trial accuracy × 100, accuracy = max(0, 1 − |est−N|/N)
    norms: { metric: 'estimationAccuracy', mean: 82, sd: 8, higherIsBetter: true },
    fmtPrimary: s => Math.round(s.primary) + '% estimation accuracy',
    fmtSurvival: s => 'Counted ' + s.metrics.correct + ' flashes before 3 strikes',

    run(ctx) {
      const minN = 3 + ctx.level;
      const maxN = Math.min(8 + 3 * ctx.level, 45);
      const startedAt = ctx.now();

      let trials = 0, hits = 0, errors = 0;
      let accSum = 0;
      // split-half buckets by trial parity: mean per-trial accuracy each
      const halves = [{ sum: 0, n: 0 }, { sum: 0, n: 0 }];
      let N = 0;
      let lastDots = null;
      let typed = '';
      let phase = 'idle'; // idle | flash | answer | feedback

      /* ---------- DOM ---------- */
      const canvas = el('canvas');
      const answer = el('div', { class: 'answer-line' });
      const msg = el('div', { class: 'task-msg', text: 'Watch the flash…' });
      const pad = el('div', { class: 'keypad' });

      function keyBtn(label, fn, cls) {
        const b = el('button', { class: 'key' + (cls ? ' ' + cls : ''), text: label });
        ctx.listen(b, 'click', () => { fn(); b.blur(); });
        return b;
      }
      ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        .forEach(d => pad.appendChild(keyBtn(d, () => pressDigit(d))));
      pad.appendChild(keyBtn('⌫', pressBack, 'action'));
      pad.appendChild(keyBtn('0', () => pressDigit('0')));
      pad.appendChild(keyBtn('OK', submit, 'action'));

      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { style: 'width:100%; display:flex; justify-content:center;' }, canvas),
        answer, msg, pad));

      // Size the canvas from real stage space (measured after append):
      // keypad + answer line need ~360px; the flash field takes what's left.
      const cssW = Math.max(240, Math.min(ctx.container.clientWidth - 16, 380));
      const cssH = Math.max(130, Math.min(ctx.container.clientHeight - 370, 210));
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      const g = canvas.getContext('2d');

      const rootStyle = getComputedStyle(document.documentElement);
      const cssVar = (name, fallback) => (rootStyle.getPropertyValue(name) || fallback).trim();
      const colField = cssVar('--panel-2', '#1d2340');
      const colDot = cssVar('--accent', '#5b8cff');
      const colMuted = cssVar('--muted', '#8b93b8');
      const colText = cssVar('--text', '#e9edff');

      /* ---------- dot cloud generation (all randomness via ctx.rng) ---------- */
      const ri = (lo, hi) => lo + Math.floor(ctx.rng() * (hi - lo + 1));

      // Non-overlapping rejection sampling; radius jittered ±30% so total
      // area isn't a count proxy. Base radius shrinks and the layout restarts
      // if a cloud can't be packed, so this always returns n dots.
      function makeDots(n) {
        let base = BT.clamp(0.22 * Math.sqrt((cssW * cssH) / n), 4, 12);
        for (let attempt = 0; attempt < 6; attempt++) {
          const dots = [];
          let ok = true;
          for (let i = 0; i < n; i++) {
            const r = base * (0.7 + 0.6 * ctx.rng());
            let placed = false;
            for (let t = 0; t < 300; t++) {
              const x = r + 4 + ctx.rng() * (cssW - 2 * (r + 4));
              const y = r + 4 + ctx.rng() * (cssH - 2 * (r + 4));
              let hit = false;
              for (const d of dots) {
                const dx = d.x - x, dy = d.y - y;
                const min = d.r + r + 3;
                if (dx * dx + dy * dy < min * min) { hit = true; break; }
              }
              if (!hit) { dots.push({ x, y, r }); placed = true; break; }
            }
            if (!placed) { ok = false; break; }
          }
          if (ok) return dots;
          base = Math.max(3, base * 0.82);
        }
        // pathological fallback: tiny dots, overlap tolerated — never fails
        const dots = [];
        for (let i = 0; i < n; i++) {
          dots.push({ x: 7 + ctx.rng() * (cssW - 14), y: 7 + ctx.rng() * (cssH - 14), r: 3 });
        }
        return dots;
      }

      /* ---------- canvas painting ---------- */
      function paintField() {
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        g.fillStyle = colField;
        g.fillRect(0, 0, cssW, cssH);
      }
      function drawDots(dots) {
        paintField();
        g.fillStyle = colDot;
        for (const d of dots) {
          g.beginPath();
          g.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          g.fill();
        }
      }
      function drawBlank(text) {
        paintField();
        if (text) {
          g.fillStyle = colMuted;
          g.font = '700 42px ' + cssVar('--font', 'sans-serif');
          g.textAlign = 'center';
          g.textBaseline = 'middle';
          g.fillText(text, cssW / 2, cssH / 2);
        }
      }
      function drawReveal(dots, n) {
        drawDots(dots);
        g.fillStyle = 'rgba(11, 14, 26, 0.55)';
        g.fillRect(0, 0, cssW, cssH);
        g.fillStyle = colText;
        g.font = '800 52px ' + cssVar('--font', 'sans-serif');
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.fillText(String(n), cssW / 2, cssH / 2);
      }

      /* ---------- input ---------- */
      function pressDigit(d) {
        if (!ctx.running || phase !== 'answer') return;
        if (typed.length >= 2) return; // N caps at 45 — two digits is plenty
        typed += d;
        answer.textContent = typed;
      }
      function pressBack() {
        if (!ctx.running || phase !== 'answer') return;
        typed = typed.slice(0, -1);
        answer.textContent = typed;
      }
      const keyMap = { Enter: submit, Backspace: pressBack };
      for (let d = 0; d <= 9; d++) {
        keyMap[String(d)] = (dd => () => pressDigit(dd))(String(d));
      }
      ctx.keys(keyMap);

      /* ---------- round flow ---------- */
      const timeUp = () => ctx.now() - startedAt >= ctx.durationMs;

      function updateHud() {
        if (ctx.survival) {
          ctx.hud.stat('💀 counted ' + hits + ' · strikes ' + errors + ' / 3');
          ctx.hud.progress(BT.clamp(errors / 3, 0, 1));
        } else {
          ctx.hud.stat('✓ ' + hits + ' / ' + trials +
            (trials ? ' · avg ' + Math.round((accSum / trials) * 100) + '% close' : ''));
        }
      }

      function nextTrial() {
        if (!ctx.running) return;
        if (timeUp()) return end();
        phase = 'flash';
        typed = '';
        answer.textContent = '';
        msg.textContent = '';
        N = ri(minN, maxN);
        lastDots = makeDots(N);
        drawDots(lastDots);
        ctx.timeout(() => {
          if (!ctx.running || phase !== 'flash') return;
          phase = 'answer';
          drawBlank('?');
          msg.textContent = 'How many dots?';
        }, FLASH_MS);
      }

      function submit() {
        if (!ctx.running || phase !== 'answer') return; // phase latch also blocks double-submits
        if (typed === '') return; // nothing entered — no penalty
        const est = parseInt(typed, 10);
        phase = 'feedback';
        const relErr = Math.abs(est - N) / N;
        const isHit = N <= 6 ? est === N : relErr <= 0.15;
        const acc = Math.max(0, 1 - relErr);
        trials++;
        accSum += acc;
        const h = halves[(trials - 1) % 2];
        h.sum += acc; h.n++;
        if (isHit) hits++; else errors++;
        ctx.feedback(isHit);
        drawReveal(lastDots, N); // feedback shows the true count briefly
        msg.textContent = isHit
          ? (est === N ? 'Exactly ' + N + '!' : N + ' dots — close enough')
          : N + ' dots — you said ' + est;
        updateHud();
        if (ctx.survival && errors >= 3) { ctx.timeout(end, FEEDBACK_MS); return; }
        if (timeUp()) return end();
        ctx.timeout(nextTrial, FEEDBACK_MS);
      }

      // progress + hard time-up check (covers idle rounds too).
      // In survival the engine hands us the 300s cap as ctx.durationMs;
      // the bar tracks strikes instead of time (updated in updateHud).
      ctx.interval(() => {
        if (!ctx.running) return;
        const t = ctx.now() - startedAt;
        if (!ctx.survival) ctx.hud.progress(Math.min(t / ctx.durationMs, 1));
        if (t >= ctx.durationMs) end();
      }, 250);

      function end() {
        if (!ctx.running) return;
        const rate = trials ? hits / trials : 0;
        const meanAcc = trials ? (accSum / trials) * 100 : 0;
        const hasHalves = halves[0].n > 0 && halves[1].n > 0;
        ctx.hud.progress(1);
        ctx.finish({
          // survival: primary = flashes counted within tolerance before 3 strikes
          primary: ctx.survival ? hits : meanAcc,
          // advance rule tests tolerance-hit rate: down < 0.70, up ≥ 0.90
          levelProgress: BT.clamp((rate - 0.70) / (0.90 - 0.70), 0, 1),
          metrics: {
            trials, correct: hits, wrong: trials - hits,
            correctRate: Math.round(rate * 100),
            estimationAccuracy: Math.round(meanAcc * 10) / 10,
            half1: hasHalves ? Math.round((halves[0].sum / halves[0].n) * 1000) / 10 : null,
            half2: hasHalves ? Math.round((halves[1].sum / halves[1].n) * 1000) / 10 : null,
          },
          advance: trials === 0 ? 'hold'
            : rate >= 0.90 ? 'up'
            : rate < 0.70 ? 'down' : 'hold',
        });
      }

      updateHud();
      ctx.timeout(nextTrial, 700); // brief lead-in before the first flash
    },
  });
})();
