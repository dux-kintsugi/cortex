/* ============================================================
   Cortex task — Tile Trail  (domain: visuospatial)
   Corsi block span: tiles light up one at a time, then you tap
   the trail back in order (in REVERSE from level 7). Correct
   trail → one tile longer; one retry per length; two misses at
   the same length end the round. Contract: docs/ARCHITECTURE.md.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'spatialspan',
    name: 'Tile Trail',
    icon: '🟦',
    domain: 'visuospatial',
    tagline: 'Tiles flash a trail — tap it back from memory.',
    howTo: [
      'Tiles light up one at a time — memorize the order.',
      'When it’s your turn, tap the tiles back IN ORDER.',
      'Each correct trail gets one tile longer.',
      'A wrong tap ends the attempt — you get one retry per length.',
      'From level 7: tap the trail back in REVERSE order.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = best fully reproduced trail length.
    norms: { metric: 'bestLen', mean: 5.4, sd: 1.1, higherIsBetter: true },
    fmtPrimary: s => 'span of ' + s.primary,

    run(ctx) {
      // Level knobs: bigger board from level 5, reverse recall from level 7.
      const gridSize = ctx.level < 5 ? 3 : 4;
      const nTiles = gridSize * gridSize;
      const reverse = ctx.level >= 7;
      const START_LEN = 3;
      const MAX_LEN = 12; // safety cap so the round always terminates
      const ON_MS = 600, GAP_MS = 200;
      const MAX_TRIALS = (MAX_LEN - START_LEN + 1) * 2;
      const startedAt = ctx.now();

      let len = START_LEN;
      let missesAtLen = 0;
      let bestLen = 0;
      let trialsDone = 0;
      let seq = [];
      let inputIdx = 0;
      let phase = 'idle'; // idle | show | input | pause
      let lastTapTile = -1, lastTapAt = 0;

      const tiles = [];
      const board = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(' + gridSize + ',1fr); width:min(420px,90vw);',
      });
      for (let i = 0; i < nTiles; i++) {
        const t = el('div', { class: 'tile' });
        tiles.push(t);
        board.appendChild(t);
      }
      const msg = el('div', { class: 'task-msg', text: 'Watch the trail…' });
      ctx.container.appendChild(el('div', { class: 'stage-center' }, board, msg));

      function updateHud() {
        const f = Math.max(trialsDone / MAX_TRIALS, (ctx.now() - startedAt) / ctx.durationMs);
        ctx.hud.progress(Math.min(f, 1));
        ctx.hud.stat('Trail of ' + len + ' · best ' + bestLen + (reverse ? ' · REVERSE' : ''));
      }

      function makeSeq(n) {
        const s = [];
        let prev = -1;
        for (let i = 0; i < n; i++) {
          let t;
          do { t = Math.floor(ctx.rng() * nTiles); } while (t === prev);
          s.push(t);
          prev = t;
        }
        return s;
      }

      function playSeq() {
        phase = 'show';
        msg.textContent = 'Watch the trail…';
        let i = 0;
        function step() {
          if (!ctx.running) return;
          if (i >= seq.length) {
            phase = 'input';
            inputIdx = 0;
            msg.textContent = reverse
              ? 'Your turn — tap in REVERSE order'
              : 'Your turn — tap in the same order';
            return;
          }
          const t = tiles[seq[i]];
          t.classList.add('lit');
          ctx.timeout(() => {
            if (!ctx.running) return;
            t.classList.remove('lit');
            i++;
            ctx.timeout(step, GAP_MS);
          }, ON_MS);
        }
        ctx.timeout(step, 400);
      }

      function onTap(idx) {
        if (!ctx.running || phase !== 'input') return;
        // debounce: a rapid double-tap on the same tile is one tap
        // (sequences never repeat a tile back-to-back, so this is safe)
        const t = ctx.now();
        if (idx === lastTapTile && t - lastTapAt < 300) return;
        lastTapTile = idx; lastTapAt = t;

        const expected = seq[reverse ? seq.length - 1 - inputIdx : inputIdx];
        const tile = tiles[idx];

        if (idx === expected) {
          inputIdx++;
          if (inputIdx >= seq.length) return trailDone(tile);
          tile.classList.add('good');
          ctx.beep('tick');
          ctx.timeout(() => { tile.classList.remove('good'); }, 250);
        } else {
          trailFailed(tile);
        }
      }

      function trailDone(tile) {
        phase = 'pause';
        tile.classList.add('good');
        bestLen = len;
        trialsDone++;
        missesAtLen = 0;
        len++;
        ctx.flash('good'); ctx.beep('good');
        msg.textContent = len > MAX_LEN
          ? 'Trail complete — perfect run!'
          : 'Trail complete! Next: ' + len + ' tiles.';
        updateHud();
        ctx.timeout(() => {
          if (!ctx.running) return;
          tile.classList.remove('good');
          nextTrial();
        }, 900);
      }

      function trailFailed(tile) {
        phase = 'pause';
        trialsDone++;
        missesAtLen++;
        tile.classList.add('bad');
        for (const s of seq) if (tiles[s] !== tile) tiles[s].classList.add('reveal');
        ctx.flash('bad'); ctx.beep('bad');
        msg.textContent = missesAtLen >= 2
          ? 'Second miss — round over.'
          : 'Miss — one more try at ' + len + ' tiles.';
        updateHud();
        ctx.timeout(() => {
          if (!ctx.running) return;
          tile.classList.remove('bad');
          for (const s of seq) tiles[s].classList.remove('reveal');
          if (missesAtLen >= 2) end(); else nextTrial();
        }, 1400);
      }

      function nextTrial() {
        if (!ctx.running) return;
        // practice warm-up: two short-but-real trials, then a normal finish
        if (ctx.practice && trialsDone >= 2) return end();
        if (len > MAX_LEN || ctx.now() - startedAt > ctx.durationMs) return end();
        seq = makeSeq(len);
        lastTapTile = -1;
        updateHud();
        playSeq();
      }

      function end() {
        ctx.hud.progress(1);
        ctx.finish({
          primary: bestLen,
          // advance band: down ≤ 4, up ≥ 6 — span halves don't decompose, so null/null
          levelProgress: BT.clamp((bestLen - 4) / (6 - 4), 0, 1),
          metrics: { bestLen, trials: trialsDone, gridSize, reverse, half1: null, half2: null },
          advance: bestLen >= 6 ? 'up' : bestLen <= 4 ? 'down' : 'hold',
        });
      }

      // inherently spatial — pointer input on the tiles
      tiles.forEach((tile, i) => ctx.listen(tile, 'pointerdown', () => onTap(i)));

      nextTrial();
    },
  });
})();
