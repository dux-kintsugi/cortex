/* ============================================================
   Cortex task — Mind Spin  (domain: visuospatial)

   Gameplay: two polyomino boards side by side. The right one is
   always rotated 90/180/270° — and half the time also mirrored.
   Answer SAME (rotation only) vs MIRRORED as fast as you can.
   Shapes are generated as cell sets and transformed on the cell
   coordinates (no CSS transforms); achiral shapes are rejected
   so the answer is always well-defined.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'rotation',
    name: 'Mind Spin',
    icon: '🌀',
    domain: 'visuospatial',
    tagline: 'Rotate shapes in your head — spot the mirrored imposters.',
    howTo: [
      'Two shapes appear side by side.',
      'The right one is always ROTATED (90/180/270°)…',
      '…and half the time it is ALSO mirrored.',
      'Rotation only → SAME (←). Flipped → MIRRORED (→).',
      'Wrong answers count against you — accuracy beats speed.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = net correct pairs per minute = (correct − wrong) / min.
    norms: { metric: 'netPerMin', mean: 8, sd: 3.5, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + ' pairs/min',

    run(ctx) {
      const cellCount = 4 + Math.floor(ctx.level / 3);
      const startedAt = ctx.now();

      let correct = 0, wrong = 0;
      // split-half buckets by trial parity (odd/even scored trial index)
      const h1 = { correct: 0, wrong: 0 }, h2 = { correct: 0, wrong: 0 };
      let busy = true;       // blocks input during feedback / before first pair
      let ended = false;
      let isMirrored = false; // ground truth for the current pair

      /* ---- cell-set geometry (a shape is an array of [x, y]) ---- */
      function normalize(cells) {
        let mx = Infinity, my = Infinity;
        for (const c of cells) { mx = Math.min(mx, c[0]); my = Math.min(my, c[1]); }
        return cells.map(c => [c[0] - mx, c[1] - my]);
      }
      function canon(cells) {
        return normalize(cells).map(c => c[0] + ',' + c[1]).sort().join('|');
      }
      const rot90 = cells => cells.map(c => [-c[1], c[0]]);
      const mirror = cells => cells.map(c => [-c[0], c[1]]);
      function rotN(cells, n) {
        let out = cells;
        for (let i = 0; i < n; i++) out = rot90(out);
        return out;
      }

      // Random connected polyomino of n cells; must be chiral —
      // reject the shape if any rotation of it equals its mirror.
      function genShape(n) {
        for (let tries = 0; tries < 80; tries++) {
          const cells = [[0, 0]];
          const seen = { '0,0': true };
          let guard = 0;
          while (cells.length < n && guard++ < 200) {
            const b = cells[Math.floor(ctx.rng() * cells.length)];
            const d = [[1, 0], [-1, 0], [0, 1], [0, -1]][Math.floor(ctx.rng() * 4)];
            const key = (b[0] + d[0]) + ',' + (b[1] + d[1]);
            if (!seen[key]) { seen[key] = true; cells.push([b[0] + d[0], b[1] + d[1]]); }
          }
          if (cells.length !== n) continue;
          const mirKey = canon(mirror(cells));
          let chiral = true;
          for (let r = 0; r < 4; r++) {
            if (canon(rotN(cells, r)) === mirKey) { chiral = false; break; }
          }
          if (chiral) return cells;
        }
        // fallback: an L (arm n−1, foot 1) — chiral for n ≥ 4
        const L = [[1, 0]];
        for (let y = 0; y < n - 1; y++) L.push([0, y]);
        return L;
      }

      /* ---- DOM ---- */
      const pairRow = el('div', {
        style: 'display:flex; gap:26px; align-items:center; justify-content:center; flex-wrap:wrap;',
      });
      const btnSame = el('button', { class: 'choice' }, 'SAME',
        el('span', { class: 'key-hint', text: '← rotated only' }));
      const btnMir = el('button', { class: 'choice' }, 'MIRRORED',
        el('span', { class: 'key-hint', text: '→ flipped' }));
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        pairRow,
        el('div', { class: 'choice-row' }, btnSame, btnMir),
        el('div', { class: 'task-msg', text: 'Is the right shape just rotated, or also mirrored?' })));

      // Render a shape centered on a g×g grid of tiles (no CSS transforms —
      // the transformed cell coordinates are drawn directly).
      function buildBoard(cells, g) {
        const norm = normalize(cells);
        let w = 0, h = 0;
        for (const c of norm) { w = Math.max(w, c[0] + 1); h = Math.max(h, c[1] + 1); }
        const ox = Math.floor((g - w) / 2), oy = Math.floor((g - h) / 2);
        const filled = {};
        for (const c of norm) filled[(c[0] + ox) + ',' + (c[1] + oy)] = true;
        const board = el('div', {
          class: 'board',
          style: 'grid-template-columns:repeat(' + g + ',1fr); width:min(160px,40vw); gap:6px;',
        });
        for (let y = 0; y < g; y++) {
          for (let x = 0; x < g; x++) {
            board.appendChild(el('div', {
              class: 'tile ' + (filled[x + ',' + y] ? 'lit' : 'hollow'),
              style: 'min-width:0; min-height:0; cursor:default;',
            }));
          }
        }
        return board;
      }

      function updateHud() {
        ctx.hud.progress(Math.min((ctx.now() - startedAt) / ctx.durationMs, 1));
        const done = correct + wrong;
        ctx.hud.stat('Pair ' + (done + 1) + ' · ✓ ' + correct + ' · ✗ ' + wrong +
          (done ? ' · ' + Math.round(correct / done * 100) + '%' : ''));
      }

      function nextPair() {
        if (!ctx.running || ended) return;
        if (ctx.now() - startedAt >= ctx.durationMs) return end();
        const shape = genShape(cellCount);
        // prefer a rotation that actually looks different from the original
        const baseKey = canon(shape);
        let ks = [1, 2, 3].filter(k => canon(rotN(shape, k)) !== baseKey);
        if (!ks.length) ks = [1, 2, 3];
        const k = ks[Math.floor(ctx.rng() * ks.length)];
        isMirrored = ctx.rng() < 0.5;
        const right = rotN(isMirrored ? mirror(shape) : shape, k);

        let w = 0, h = 0;
        for (const c of normalize(shape)) { w = Math.max(w, c[0] + 1); h = Math.max(h, c[1] + 1); }
        const g = Math.max(w, h); // rotation swaps w/h, so g fits both boards

        pairRow.innerHTML = '';
        pairRow.appendChild(buildBoard(shape, g));
        pairRow.appendChild(el('div', { class: 'task-msg', text: '➜' }));
        pairRow.appendChild(buildBoard(right, g));
        busy = false;
        updateHud();
      }

      function answer(saidMirrored) {
        if (!ctx.running || ended || busy) return;
        busy = true; // rapid double-taps can't double-count
        const ok = saidMirrored === isMirrored;
        const half = (correct + wrong) % 2 === 0 ? h1 : h2;
        if (ok) { correct++; half.correct++; }
        else { wrong++; half.wrong++; }
        ctx.feedback(ok);
        updateHud();
        ctx.timeout(nextPair, ok ? 280 : 550);
      }

      ctx.listen(btnSame, 'pointerdown', () => answer(false));
      ctx.listen(btnMir, 'pointerdown', () => answer(true));
      ctx.keys({ ArrowLeft: () => answer(false), ArrowRight: () => answer(true) });

      // progress heartbeat + hard stop at the time budget (even mid-pair,
      // so ctx.finish is reached even if the user never answers)
      ctx.interval(() => {
        if (!ctx.running || ended) return;
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(Math.min(elapsed / ctx.durationMs, 1));
        if (elapsed >= ctx.durationMs) end();
      }, 250);

      function end() {
        if (ended || !ctx.running) return;
        ended = true;
        busy = true;
        const attempts = correct + wrong;
        const minutes = Math.max(ctx.now() - startedAt, 1000) / 60000;
        const netPerMin = (correct - wrong) / minutes;
        const acc = attempts ? correct / attempts : 0;
        // each half's net counts over half the elapsed minutes
        const n1 = h1.correct + h1.wrong, n2 = h2.correct + h2.wrong;
        const halfMin = minutes / 2;
        const half1 = n1 && n2 ? Math.round((h1.correct - h1.wrong) / halfMin * 10) / 10 : null;
        const half2 = n1 && n2 ? Math.round((h2.correct - h2.wrong) / halfMin * 10) / 10 : null;
        ctx.hud.progress(1);
        ctx.finish({
          primary: netPerMin,
          levelProgress: BT.clamp((acc - 0.60) / (0.85 - 0.60), 0, 1),
          metrics: {
            netPerMin: Math.round(netPerMin * 10) / 10,
            correct, wrong, pairs: attempts,
            accuracy: Math.round(acc * 100),
            half1, half2,
          },
          advance: attempts === 0 ? 'hold' : acc >= 0.85 ? 'up' : acc < 0.60 ? 'down' : 'hold',
        });
      }

      nextPair();
    },
  });
})();
