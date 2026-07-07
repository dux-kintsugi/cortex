/* ============================================================
   Cortex task — Spot It  (domain: attention)

   Visual search: one target hides among distractors on a grid.
   Levels 1–4: feature search — a T among rotated Ls.
   Levels 5+: conjunction search — a blue T among blue Ls and
   red Ts. Tap the target to clear the board; wrong taps count
   as errors and the same board continues.
   Levels 11–12: drifting tiles — the whole board slowly wanders
   (±14px sinusoidal per tile) so pop-out never settles.
   Survival: no duration cutoff — play until 3 errors (or the
   engine's 300s cap); primary = boards found.
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

    maxLevel: 12,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = net boards per minute = (solved − errors) / min.
    norms: { metric: 'netPerMin', mean: 9, sd: 3.5, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + ' boards/min',
    survival: true,
    fmtSurvival: s => 'Found ' + s.metrics.solved + ' boards before 3 strikes',

    run(ctx) {
      const setSize = 9 + 3 * ctx.level;
      const cols = Math.ceil(Math.sqrt(setSize));
      const conjunction = ctx.level >= 5;
      const drifting = ctx.level >= 11;
      const ROTATIONS = [0, 90, 180, 270];

      let solved = 0, errors = 0;
      let busy = false;          // true between boards — taps ignored
      let targetTile = null;
      let boardStart = 0;
      const findTimes = [];
      const driftTiles = [];     // {node, ax, ay} — rebuilt per board
      const halfNet = [0, 0], halfN = [0, 0]; // split-half: taps bucketed by attempt parity
      const startedAt = ctx.now();

      const board = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(' + cols + ',1fr); width:min(420px,90vw);',
      });
      const msg = el('div', {
        class: 'task-msg',
        text: (conjunction ? 'Tap the blue T' : 'Tap the T') +
          (drifting ? ' — the tiles won’t sit still' : ''),
      });
      ctx.container.appendChild(el('div', { class: 'stage-center' }, msg, board));

      function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(ctx.rng() * (i + 1));
          const t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
      }

      // call BEFORE incrementing solved/errors: their sum is the tap's index
      function bucket(delta) {
        const h = (solved + errors) % 2;
        halfN[h]++;
        halfNet[h] += delta;
      }

      function updateHud() {
        ctx.hud.stat(ctx.survival
          ? 'Boards ' + solved + ' · Strikes ' + errors + '/3'
          : 'Boards ' + solved + ' · Errors ' + errors);
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
        if (drifting) {
          driftTiles.length = 0;
          for (let i = 0; i < board.children.length; i++) {
            driftTiles.push({
              node: board.children[i],
              ax: ctx.rng() * 2 * Math.PI,
              ay: ctx.rng() * 2 * Math.PI,
            });
          }
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
          bucket(1);
          solved++;
          findTimes.push(ctx.now() - boardStart);
          tile.classList.add('good');
          ctx.feedback(true);
          updateHud();
          ctx.timeout(nextBoard, 350);
        } else if (!tile.classList.contains('bad')) {
          // .bad acts as a debounce: rapid re-taps on the same wrong
          // tile can't double-count while its flash is showing
          bucket(-1);
          errors++;
          tile.classList.add('bad');
          ctx.feedback(false);
          updateHud();
          if (ctx.survival && errors >= 3) {
            busy = true; // freeze the board while the last strike flashes
            ctx.timeout(end, 400);
            return;
          }
          ctx.timeout(() => { tile.classList.remove('bad'); }, 400);
        }
      }
      ctx.listen(board, 'pointerdown', onTap);

      // levels 11–12: tiles wander ±14px sinusoidally, phase-offset per tile
      if (drifting) {
        ctx.interval(() => {
          if (!ctx.running) return;
          const t = (ctx.now() - startedAt) / 1000;
          for (let i = 0; i < driftTiles.length; i++) {
            const d = driftTiles[i];
            d.node.style.transform = 'translate(' +
              (14 * Math.sin(1.3 * t + d.ax)).toFixed(1) + 'px,' +
              (14 * Math.sin(1.7 * t + d.ay)).toFixed(1) + 'px)';
          }
        }, 50);
      }

      // clock: drives the progress bar and guarantees the round ends
      // (in survival ctx.durationMs is the engine's 300s cap)
      ctx.interval(() => {
        if (!ctx.running) return;
        const elapsed = ctx.now() - startedAt;
        const frac = Math.min(elapsed / ctx.durationMs, 1);
        ctx.hud.progress(ctx.survival ? Math.max(frac, errors / 3) : frac);
        if (elapsed >= ctx.durationMs) end();
      }, 200);

      function end() {
        if (!ctx.running) return;
        const minutes = Math.max(ctx.now() - startedAt, 1000) / 60000;
        const attempts = solved + errors;
        const acc = attempts ? solved / attempts : 1;
        const netPerMin = (solved - errors) / minutes;
        const bothHalves = halfN[0] > 0 && halfN[1] > 0;
        ctx.hud.progress(1);
        ctx.finish({
          primary: ctx.survival ? solved : netPerMin,
          // advance band tests accuracy: down < .75, up = 1.0 (zero errors)
          levelProgress: attempts ? BT.clamp((acc - 0.75) / (1 - 0.75), 0, 1) : 0,
          metrics: {
            solved, errors,
            accuracy: Math.round(acc * 100) / 100,
            meanFindMs: findTimes.length ? Math.round(BT.mean(findTimes)) : null,
            setSize,
            half1: bothHalves ? halfNet[0] / (minutes / 2) : null,
            half2: bothHalves ? halfNet[1] / (minutes / 2) : null,
          },
          advance: errors === 0 && solved >= 8 ? 'up'
            : acc < 0.75 ? 'down' : 'hold',
        });
      }

      renderBoard();
    },
  });
})();
