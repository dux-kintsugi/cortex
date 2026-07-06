/* ============================================================
   Cortex task — Spot It  (domain: attention)

   Visual search: one target hides among distractors on a grid.
   Levels 1–4: feature search — a T among rotated Ls.
   Levels 5+: conjunction search — a blue T among blue Ls and
   red Ts. Tap the target to clear the board; wrong taps count
   as errors and the same board continues.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'search',
    name: 'Spot It',
    icon: '🔎',
    domain: 'attention',
    tagline: 'Find the odd one out — again and again, faster.',
    howTo: [
      'One tile on the board hides the target: the letter T.',
      'Tap it as fast as you can — then a new board appears.',
      'Tapping any other tile counts as an error.',
      'From level 5: find the BLUE T among blue Ls and red Ts.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = net boards per minute = (solved − errors) / min.
    norms: { metric: 'netPerMin', mean: 9, sd: 3.5, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + ' boards/min',

    run(ctx) {
      const setSize = 9 + 3 * ctx.level;
      const cols = Math.ceil(Math.sqrt(setSize));
      const conjunction = ctx.level >= 5;
      const ROTATIONS = [0, 90, 180, 270];

      let solved = 0, errors = 0;
      let busy = false;          // true between boards — taps ignored
      let targetTile = null;
      let boardStart = 0;
      const findTimes = [];
      const startedAt = ctx.now();

      const board = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(' + cols + ',1fr); width:min(420px,90vw);',
      });
      const msg = el('div', {
        class: 'task-msg',
        text: conjunction ? 'Tap the blue T' : 'Tap the T',
      });
      ctx.container.appendChild(el('div', { class: 'stage-center' }, msg, board));

      function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(ctx.rng() * (i + 1));
          const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
      }

      function updateHud() {
        ctx.hud.stat('Boards ' + solved + ' · Errors ' + errors);
      }

      // spec: {letter, ink} — ink '' for feature-search boards
      function makeTile(spec, isTarget) {
        const rot = ROTATIONS[Math.floor(ctx.rng() * ROTATIONS.length)];
        const tile = el('div', { class: 'tile' + (spec.ink ? ' ' + spec.ink : '') },
          el('span', {
            text: spec.letter,
            style: 'display:inline-block; transform:rotate(' + rot + 'deg);',
          }));
        if (isTarget) targetTile = tile;
        return tile;
      }

      function renderBoard() {
        // one target + (setSize − 1) distractors, shuffled into the grid
        const target = conjunction ? { letter: 'T', ink: 'ink-blue' } : { letter: 'T', ink: '' };
        const distractors = [];
        for (let i = 0; i < setSize - 1; i++) {
          distractors.push(conjunction
            ? (i % 2 === 0 ? { letter: 'L', ink: 'ink-blue' } : { letter: 'T', ink: 'ink-red' })
            : { letter: 'L', ink: '' });
        }
        shuffle(distractors);
        const targetIdx = Math.floor(ctx.rng() * setSize);

        board.innerHTML = '';
        targetTile = null;
        for (let i = 0; i < setSize; i++) {
          board.appendChild(i === targetIdx
            ? makeTile(target, true)
            : makeTile(distractors.pop(), false));
        }
        boardStart = ctx.now();
        updateHud();
      }

      function nextBoard() {
        if (!ctx.running) return;
        if (ctx.now() - startedAt >= ctx.durationMs) return end();
        busy = false;
        renderBoard();
      }

      function onTap(e) {
        if (!ctx.running || busy) return;
        const tile = e.target.closest ? e.target.closest('.tile') : null;
        if (!tile || !board.contains(tile)) return;
        if (tile === targetTile) {
          busy = true;
          solved++;
          findTimes.push(ctx.now() - boardStart);
          tile.classList.add('good');
          ctx.flash('good'); ctx.beep('good');
          updateHud();
          ctx.timeout(nextBoard, 350);
        } else if (!tile.classList.contains('bad')) {
          // .bad acts as a debounce: rapid re-taps on the same wrong
          // tile can't double-count while its flash is showing
          errors++;
          tile.classList.add('bad');
          ctx.flash('bad'); ctx.beep('bad');
          updateHud();
          ctx.timeout(() => { tile.classList.remove('bad'); }, 400);
        }
      }
      ctx.listen(board, 'pointerdown', onTap);

      // clock: drives the progress bar and guarantees the round ends
      ctx.interval(() => {
        if (!ctx.running) return;
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(Math.min(elapsed / ctx.durationMs, 1));
        if (elapsed >= ctx.durationMs) end();
      }, 200);

      function end() {
        if (!ctx.running) return;
        const minutes = Math.max(ctx.now() - startedAt, 1000) / 60000;
        const attempts = solved + errors;
        const acc = attempts ? solved / attempts : 1;
        const netPerMin = (solved - errors) / minutes;
        ctx.hud.progress(1);
        ctx.finish({
          primary: netPerMin,
          metrics: {
            solved, errors,
            accuracy: Math.round(acc * 100) / 100,
            meanFindMs: findTimes.length ? Math.round(BT.mean(findTimes)) : null,
            setSize,
          },
          advance: errors === 0 && solved >= 8 ? 'up'
            : acc < 0.75 ? 'down' : 'hold',
        });
      }

      renderBoard();
    },
  });
})();
