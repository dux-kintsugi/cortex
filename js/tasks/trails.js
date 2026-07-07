/* ============================================================
   Cortex task — Trail Blazer  (domain: speed)

   Trail-making: round nodes scatter across the board — tap them
   in order as fast as possible. Levels 1–4: numbers only, 1..N
   (Trails A). Level 5+: alternate numbers and letters,
   1 → A → 2 → B → … (Trails B). Wrong node = error, the board
   continues. Survival mode: play until 3 errors.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const LETTERS = 'ABCDEFGHIJKLMN';

  // Ordered labels for one board at this level.
  function buildLabels(level) {
    const seq = [];
    if (level <= 4) {
      const total = 6 + level;
      for (let i = 1; i <= total; i++) seq.push(String(i));
      return seq;
    }
    const total = 8 + level;
    for (let i = 0; i < total; i++) {
      seq.push(i % 2 === 0 ? String(i / 2 + 1) : LETTERS[(i - 1) / 2]);
    }
    return seq;
  }

  // Rejection-sample `count` non-overlapping node positions (top-left
  // coords for size×size round nodes) inside W×H with ≥8px gaps.
  // Returns null when the box is too crowded at this node size.
  function samplePositions(count, W, H, size, rng) {
    const minDist = size + 8; // center distance ⇒ ≥8px edge gap
    const maxX = W - size, maxY = H - size;
    if (maxX < 0 || maxY < 0) return null;
    for (let restart = 0; restart < 4; restart++) {
      const pts = [];
      let attempts = 0;
      const cap = count * 90;
      while (pts.length < count && attempts < cap) {
        attempts++;
        const x = rng() * maxX, y = rng() * maxY;
        let ok = true;
        for (let i = 0; i < pts.length; i++) {
          const dx = pts[i].x - x, dy = pts[i].y - y;
          if (dx * dx + dy * dy < minDist * minDist) { ok = false; break; }
        }
        if (ok) pts.push({ x, y });
      }
      if (pts.length === count) return pts;
    }
    return null;
  }

  // Guaranteed fallback: jittered grid. Cells are ≥ size+8, and the
  // jitter keeps 4px off each cell edge, so gaps stay ≥8px.
  function gridPositions(count, W, H, size, rng) {
    const cell = size + 8;
    const cols = Math.max(1, Math.floor(W / cell));
    const rows = Math.max(1, Math.floor(H / cell));
    const cw = W / cols, ch = H / rows;
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ c, r });
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = cells[i]; cells[i] = cells[j]; cells[j] = t;
    }
    const pts = [];
    for (let i = 0; i < count; i++) {
      const g = cells[i % cells.length]; // cycling only on absurdly small screens
      const fx = Math.max(0, cw - size - 8), fy = Math.max(0, ch - size - 8);
      pts.push({
        x: BT.clamp(g.c * cw + 4 + rng() * fx, 0, Math.max(0, W - size)),
        y: BT.clamp(g.r * ch + 4 + rng() * fy, 0, Math.max(0, H - size)),
      });
    }
    return pts;
  }

  BT.registerTask({
    id: 'trails',
    name: 'Trail Blazer',
    icon: '🧭',
    domain: 'speed',
    tagline: 'Connect the dots in order — fast eyes, faster hands.',
    survival: true,
    howTo: [
      'Round nodes are scattered on the board — find “1” and tap it.',
      'Then 2, 3, 4… tap the whole trail in order, as fast as you can.',
      'A wrong node counts as an error — the board keeps going.',
      'Finish a board and a fresh one appears.',
      'From level 5: alternate numbers and letters — 1 → A → 2 → B …',
    ],

    // Looping mini-walkthrough on the instructions screen.
    introDemo(box, level) {
      const labels = level >= 5 ? ['1', 'A', '2', 'B', '3'] : ['1', '2', '3', '4', '5'];
      const pos = [
        { x: 8, y: 46 }, { x: 66, y: 4 }, { x: 122, y: 52 },
        { x: 178, y: 8 }, { x: 226, y: 56 },
      ];
      const wrap = el('div', { style: 'position:relative; width:274px; height:104px; margin:0 auto 8px;' });
      const nodes = labels.map((lab, i) => {
        const n = el('div', {
          class: 'tile',
          style: 'position:absolute; left:' + pos[i].x + 'px; top:' + pos[i].y + 'px;' +
            ' width:44px; height:44px; border-radius:50%; min-width:0; min-height:0;' +
            ' cursor:default; font-size:1rem;',
          text: lab,
        });
        wrap.appendChild(n);
        return n;
      });
      const caption = el('div', { class: 'task-msg', style: 'font-size:.85rem; min-height:22px;' });
      box.appendChild(el('div', {
        class: 'small muted',
        style: 'text-align:center; margin-bottom:6px; font-weight:700; letter-spacing:.06em;',
        text: 'TAP IN ORDER',
      }));
      box.appendChild(wrap);
      box.appendChild(caption);

      let step = -1;
      function tick() {
        step = (step + 1) % (labels.length + 1);
        if (step === labels.length) {
          nodes.forEach((n, i) => {
            n.classList.remove('good');
            n.style.opacity = '1';
            n.textContent = labels[i];
          });
          caption.textContent = '…and again from 1.';
          return;
        }
        const n = nodes[step];
        n.classList.add('good');
        n.style.opacity = '0.5';
        n.textContent = '✓';
        caption.textContent = step < labels.length - 1
          ? labels.slice(0, step + 1).join(' → ') + ' → …'
          : labels.join(' → ') + '  — board done ✅';
      }
      tick();
      const iv = setInterval(tick, 900);
      return () => clearInterval(iv);
    },

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = net correct taps per minute = (correct − errors) / min.
    norms: { metric: 'netTapsPerMin', mean: 40, sd: 12, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + ' taps/min',
    fmtSurvival: s => 'Blazed ' + s.metrics.correctTaps + ' taps before 3 strikes',

    run(ctx) {
      const labels = buildLabels(ctx.level);
      const perBoard = labels.length;
      const trailB = ctx.level >= 5;
      const startedAt = ctx.now();

      let correct = 0, errors = 0, boards = 0;
      let nextIdx = 0;     // index into labels of the node wanted next
      let busy = false;    // true between boards — taps ignored
      // Split-half: each scored tap (±1) bucketed by attempt parity.
      const halfNet = [0, 0], halfGood = [0, 0], halfN = [0, 0];

      const msg = el('div', {
        class: 'task-msg',
        style: 'margin-bottom:8px;',
        text: trailB ? 'Tap in order: 1 → A → 2 → B …' : 'Tap the numbers in order: 1 → 2 → 3 …',
      });
      const board = el('div', {
        style: 'position:relative; flex:1; width:100%; min-height:0; touch-action:manipulation;',
      });
      ctx.container.appendChild(msg);
      ctx.container.appendChild(board);

      function updateHud() {
        if (ctx.survival) {
          ctx.hud.stat('💀 Survival · ✓ ' + correct + ' · strikes ' + errors + '/3');
        } else {
          ctx.hud.stat('Board ' + (boards + 1) + ' · ' + nextIdx + '/' + perBoard +
            ' · ✓ ' + correct + ' · ✗ ' + errors);
        }
      }

      // Call BEFORE incrementing correct/errors: their sum is the tap's index.
      function bucket(delta) {
        const h = (correct + errors) % 2;
        halfN[h]++;
        halfNet[h] += delta;
        if (delta > 0) halfGood[h]++;
      }

      function renderBoard() {
        board.innerHTML = '';
        nextIdx = 0;
        // Measure AFTER the board div is in the DOM, then place.
        const W = Math.max(board.clientWidth, 240);
        const H = Math.max(board.clientHeight, 240);
        // Node size adapts to crowding, never below the 48px tap minimum.
        let size = BT.clamp(Math.floor(Math.sqrt((W * H) / (perBoard * 3))), 48, 64);
        let pts = samplePositions(perBoard, W, H, size, ctx.rng);
        while (!pts && size > 48) {
          size = Math.max(48, size - 4);
          pts = samplePositions(perBoard, W, H, size, ctx.rng);
        }
        if (!pts) {
          // The grid fallback needs one cell per node: recycled cells stack
          // nodes, and a buried node is untappable (pointerdown resolves to
          // the top tile), leaving the board uncompletable. On very small
          // boards shrink below the 48px floor until every node gets a cell.
          while (size > 24 &&
            Math.floor(W / (size + 8)) * Math.floor(H / (size + 8)) < perBoard) {
            size -= 4;
          }
          pts = gridPositions(perBoard, W, H, size, ctx.rng);
        }
        for (let i = 0; i < perBoard; i++) {
          board.appendChild(el('div', {
            class: 'tile',
            dataset: { idx: String(i) },
            text: labels[i],
            style: 'position:absolute; left:' + Math.round(pts[i].x) + 'px; top:' +
              Math.round(pts[i].y) + 'px; width:' + size + 'px; height:' + size +
              'px; border-radius:50%;',
          }));
        }
        updateHud();
      }

      function boardDone() {
        boards++;
        busy = true;
        ctx.timeout(() => {
          if (!ctx.running) return;
          busy = false;
          // In survival ctx.durationMs is the engine's 300s cap.
          if (ctx.now() - startedAt >= ctx.durationMs) return end();
          renderBoard();
        }, 450);
      }

      function onTap(e) {
        if (!ctx.running || busy) return;
        const t = e.target.closest ? e.target.closest('.tile') : null;
        if (!t || !board.contains(t)) return;
        // .good = already done; .bad = wrong-flash still showing —
        // both ignore re-taps, so rapid double-taps can't double-count.
        if (t.classList.contains('good') || t.classList.contains('bad')) return;
        if (Number(t.dataset.idx) === nextIdx) {
          bucket(1);
          correct++;
          nextIdx++;
          t.classList.add('good');
          t.textContent = '✓';
          t.style.opacity = '0.45'; // dims, stays visible
          ctx.feedback(true);
          updateHud();
          if (nextIdx >= perBoard) boardDone();
        } else {
          bucket(-1);
          errors++;
          t.classList.add('bad');
          ctx.feedback(false);
          updateHud();
          ctx.timeout(() => { t.classList.remove('bad'); }, 400);
          if (ctx.survival && errors >= 3) {
            busy = true;
            ctx.timeout(end, 450);
          }
        }
      }
      ctx.listen(board, 'pointerdown', onTap);

      // Clock: drives the progress bar and guarantees the round ends.
      ctx.interval(() => {
        if (!ctx.running) return;
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(Math.min(elapsed / ctx.durationMs, 1));
        if (elapsed >= ctx.durationMs) end();
      }, 200);

      function end() {
        if (!ctx.running) return;
        const minutes = Math.max(ctx.now() - startedAt, 1000) / 60000;
        const attempts = correct + errors;
        const acc = attempts ? correct / attempts : 0;
        const netPerMin = (correct - errors) / minutes;
        const bothHalves = halfN[0] > 0 && halfN[1] > 0;
        // Halves mirror the mode's primary: net/min normally, raw count in survival.
        const half1 = bothHalves ? (ctx.survival ? halfGood[0] : halfNet[0] / (minutes / 2)) : null;
        const half2 = bothHalves ? (ctx.survival ? halfGood[1] : halfNet[1] / (minutes / 2)) : null;
        ctx.hud.progress(1);
        ctx.finish({
          primary: ctx.survival ? correct : netPerMin,
          // advance band tests accuracy: down < .75, up ≥ .93
          levelProgress: attempts ? BT.clamp((acc - 0.75) / (0.93 - 0.75), 0, 1) : 0,
          metrics: {
            correctTaps: correct, errors, boards,
            accuracy: Math.round(acc * 100) / 100,
            nodesPerBoard: perBoard,
            trailType: trailB ? 'B' : 'A',
            half1, half2,
          },
          advance: attempts === 0 ? 'hold'
            : acc >= 0.93 ? 'up'
            : acc < 0.75 ? 'down' : 'hold',
        });
      }

      ctx.hud.progress(0);
      renderBoard();
    },
  });
})();
