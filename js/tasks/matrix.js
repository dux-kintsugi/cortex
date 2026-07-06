/* ============================================================
   Cortex task — Memory Matrix  (domain: memory)

   Gameplay: a pattern of k tiles lights up briefly, then hides;
   rebuild it by tapping. One wrong tap fails the board (missed
   tiles are revealed). Staircase over 10 boards: solved → k+1,
   failed → max(2, k−1). Score = largest pattern fully recalled.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'matrix',
    name: 'Memory Matrix',
    icon: '🟦',
    domain: 'memory',
    tagline: 'Flash-memorise the tile pattern, then rebuild it.',
    howTo: [
      'A pattern of tiles lights up — memorise it.',
      'When it hides, tap every tile that was lit.',
      'One wrong tap fails the board and reveals what you missed.',
      'Each solved board adds a tile; a miss removes one.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = largest pattern size fully recalled (0 if none).
    norms: { metric: 'bestK', mean: 9, sd: 2.2, higherIsBetter: true },
    fmtPrimary: s => 'best pattern: ' + s.primary + ' tiles',

    run(ctx) {
      const BOARDS = 10;
      const IDLE_MS = 15000; // no taps for this long during recall = board fails
      const startK = 3 + Math.floor(ctx.level / 3);
      const startedAt = ctx.now();

      let k = startK;
      let bestK = 0, solved = 0, failed = 0, boardsDone = 0;
      let boardSeq = 0;
      let phase = 'idle'; // idle | show | recall | lock
      let pattern = null, found = null, tiles = null, idleId = null;

      const msg = el('div', { class: 'task-msg', text: 'Get ready…' });
      const boardWrap = el('div');
      ctx.container.appendChild(el('div', { class: 'stage-center' }, msg, boardWrap));

      function gridFor(kk) {
        return kk <= 4 ? 3 : kk <= 7 ? 4 : kk <= 10 ? 5 : 6;
      }

      function pickCells(total, count) {
        const idx = [];
        for (let i = 0; i < total; i++) idx.push(i);
        for (let i = total - 1; i > 0; i--) {
          const j = Math.floor(ctx.rng() * (i + 1));
          const tmp = idx[i]; idx[i] = idx[j]; idx[j] = tmp;
        }
        return new Set(idx.slice(0, count));
      }

      function updateHud() {
        ctx.hud.progress(boardsDone / BOARDS);
        ctx.hud.stat('Board ' + Math.min(boardsDone + 1, BOARDS) + ' / ' + BOARDS +
          ' · ' + k + ' tiles' + (bestK ? ' · best ' + bestK : ''));
      }

      function clearIdle() {
        if (idleId != null) { ctx.clearTimer(idleId); idleId = null; }
      }

      function armIdle() {
        clearIdle();
        const seq = boardSeq;
        idleId = ctx.timeout(() => {
          if (!ctx.running || seq !== boardSeq || phase !== 'recall') return;
          failBoard();
        }, IDLE_MS);
      }

      function nextBoard() {
        if (!ctx.running) return;
        if (boardsDone >= BOARDS || ctx.now() - startedAt > ctx.durationMs) return end();
        boardSeq++;
        const seq = boardSeq;
        const g = gridFor(k);
        pattern = pickCells(g * g, k);
        found = new Set();
        tiles = [];

        boardWrap.innerHTML = '';
        const board = el('div', {
          class: 'board',
          style: 'grid-template-columns:repeat(' + g + ',1fr); width:min(420px,90vw);',
        });
        for (let i = 0; i < g * g; i++) {
          const tile = el('div', { class: 'tile', dataset: { i: String(i) } });
          tiles.push(tile);
          board.appendChild(tile);
        }
        boardWrap.appendChild(board);
        updateHud();

        phase = 'show';
        msg.textContent = 'Memorise the pattern…';
        pattern.forEach(i => tiles[i].classList.add('lit'));
        ctx.timeout(() => {
          if (!ctx.running || seq !== boardSeq) return;
          pattern.forEach(i => tiles[i].classList.remove('lit'));
          phase = 'recall';
          msg.textContent = 'Tap the tiles that were lit';
          armIdle();
        }, 900 + 60 * k);
      }

      function solveBoard() {
        phase = 'lock';
        clearIdle();
        boardsDone++;
        solved++;
        if (k > bestK) bestK = k;
        ctx.flash('good'); ctx.beep('good');
        msg.textContent = 'Pattern complete!';
        ctx.hud.progress(boardsDone / BOARDS);
        k = k + 1;
        ctx.timeout(nextBoard, 700);
      }

      function failBoard() {
        phase = 'lock';
        clearIdle();
        boardsDone++;
        failed++;
        pattern.forEach(i => { if (!found.has(i)) tiles[i].classList.add('reveal'); });
        ctx.flash('bad'); ctx.beep('bad');
        msg.textContent = 'Missed — here’s what was left.';
        ctx.hud.progress(boardsDone / BOARDS);
        k = Math.max(2, k - 1);
        ctx.timeout(nextBoard, 1200);
      }

      // Inherently spatial — pointer-only is fine per the contract.
      ctx.listen(boardWrap, 'pointerdown', e => {
        if (!ctx.running || phase !== 'recall') return;
        const tile = e.target.closest('.tile');
        if (!tile || !boardWrap.contains(tile)) return;
        const i = Number(tile.dataset.i);
        if (found.has(i)) return; // repeat tap on a found tile — ignore
        if (pattern.has(i)) {
          found.add(i);
          tile.classList.add('good');
          if (found.size === k) solveBoard();
          else armIdle(); // taps reset the inactivity timer
        } else {
          tile.classList.add('bad');
          failBoard();
        }
      });

      function end() {
        ctx.hud.progress(1);
        ctx.finish({
          primary: bestK,
          metrics: { bestK, startK, solved, failed, boards: boardsDone },
          advance: bestK >= startK + 3 ? 'up' : bestK <= startK ? 'down' : 'hold',
        });
      }

      nextBoard();
    },
  });
})();
