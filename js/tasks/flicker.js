/* ============================================================
   Cortex task — Flicker  (domain: memory)

   Change blindness: two versions of a glyph board alternate
   with a blank mask between them (A → blank → B → blank …).
   Exactly ONE tile differs — its glyph OR its ink. Tap the
   changing tile to clear the board; a wrong tap is an error
   and the same board keeps flickering.
   Survival: play until 3 errors — primary = boards solved.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const GLYPHS = ['◆', '▲', '●', '★', '✚', '☾', '♠', '⬢', '✦'];
  const INKS = ['ink-red', 'ink-blue', 'ink-green', 'ink-yellow'];
  const SHOW_MS = 700, BLANK_MS = 250;

  function gridFor(level) {
    return level < 5 ? 4 : level < 8 ? 5 : 6;
  }

  BT.registerTask({
    id: 'flicker',
    name: 'Flicker',
    icon: '👁️',
    domain: 'memory',
    tagline: 'Two boards, one difference — catch the change.',
    howTo: [
      'Two versions of the board flash back and forth, with a blank between them.',
      'Exactly ONE tile changes: its symbol or its color.',
      'Hold the board in memory across the blank — that’s how you catch it.',
      'Tap the changing tile the moment you spot it; a new board follows.',
      'Tapping any other tile is an error, and the same board keeps flickering.',
    ],

    // Looping walkthrough on the instructions screen (pre-ctx: plain timers OK).
    introDemo(box) {
      const a = ['◆', '●', '★', '✚', '▲', '☾', '●', '◆', '▲'];
      const b = a.slice(); b[4] = '✦';
      const inks = ['ink-blue', 'ink-red', 'ink-yellow', 'ink-green',
        'ink-blue', 'ink-red', 'ink-green', 'ink-yellow', 'ink-blue'];
      const glyphEls = [], tileEls = [];
      const grid = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(3,1fr);width:150px;margin:0 auto 8px;gap:5px;',
      });
      for (let i = 0; i < 9; i++) {
        const s = el('span', { class: inks[i], text: a[i] });
        const t = el('div', {
          class: 'tile',
          style: 'min-width:0;min-height:0;border-radius:8px;cursor:default;font-size:.95rem;',
        }, s);
        glyphEls.push(s); tileEls.push(t); grid.appendChild(t);
      }
      const caption = el('div', { class: 'task-msg', style: 'font-size:.85rem;min-height:36px;' });
      box.appendChild(el('div', {
        class: 'small muted',
        style: 'text-align:center;margin-bottom:6px;font-weight:700;letter-spacing:.06em;',
        text: 'LIVE DEMO',
      }));
      box.appendChild(grid);
      box.appendChild(caption);

      let step = -1;
      function tick() {
        step = (step + 1) % 12; // 3 A/blank/B/blank cycles; reveal on the last
        const phase = ['A', 'blank', 'B', 'blank'][step % 4];
        const src = phase === 'B' ? b : a;
        const hidden = phase === 'blank';
        for (let i = 0; i < 9; i++) {
          glyphEls[i].textContent = src[i];
          glyphEls[i].style.visibility = hidden ? 'hidden' : 'visible';
        }
        const reveal = step >= 8;
        tileEls[4].classList.toggle('good', reveal && !hidden);
        caption.textContent = reveal
          ? 'The middle tile flips ▲ ↔ ✦ — that’s the one to tap.'
          : 'One tile changes between flashes. Spot it…';
      }
      tick();
      const iv = setInterval(tick, 550);
      return () => clearInterval(iv);
    },

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,
    survival: true,

    // primary = net boards per minute = (solved − errors) / min.
    norms: { metric: 'netPerMin', mean: 4.5, sd: 2, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + ' boards/min',
    fmtSurvival: s => 'Spotted ' + s.metrics.solved + ' change' +
      (s.metrics.solved === 1 ? '' : 's') + ' before 3 strikes',

    run(ctx) {
      const g = gridFor(ctx.level);
      const total = g * g;
      const startedAt = ctx.now();

      let solved = 0, errors = 0;
      let boardIdx = -1;      // index of the board on screen (halves by parity)
      let busy = true;        // taps blocked until the first board renders
      let boardSeq = 0;       // token — stale flicker timers must not repaint a new board
      let changeIdx = -1;
      let boardShownAt = 0;
      let cellsA = null, cellsB = null;
      const findTimes = [];
      const halfNet = [0, 0], halfN = [0, 0];

      const glyphEls = [], tileEls = [];
      const board = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(' + g + ',1fr); width:min(420px,90vw);',
      });
      for (let i = 0; i < total; i++) {
        const s = el('span', { text: '' });
        const t = el('div', { class: 'tile' }, s);
        glyphEls.push(s); tileEls.push(t); board.appendChild(t);
      }
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { class: 'task-msg', text: 'Tap the tile that changes between flashes.' }),
        board));

      function updateHud() {
        ctx.hud.stat(ctx.survival
          ? '💀 Boards ' + solved + ' · strikes ' + errors + ' / 3'
          : 'Boards ' + solved + ' · Errors ' + errors);
      }

      // call BEFORE incrementing solved/errors — boardIdx is the live board
      function bucket(delta) {
        const h = boardIdx % 2;
        halfN[h]++;
        halfNet[h] += delta;
      }

      // uniform pick from arr excluding `not`
      function pickOther(arr, not) {
        const i = arr.indexOf(not);
        return arr[(i + 1 + Math.floor(ctx.rng() * (arr.length - 1))) % arr.length];
      }

      function paint(cells) {
        for (let i = 0; i < total; i++) {
          glyphEls[i].textContent = cells[i].glyph;
          glyphEls[i].className = cells[i].ink;
          glyphEls[i].style.visibility = 'visible';
        }
      }
      function paintBlank() {
        for (let i = 0; i < total; i++) glyphEls[i].style.visibility = 'hidden';
      }

      // A 700ms → blank 250ms → B 700ms → blank 250ms → repeat
      function cycle(step, mySeq) {
        if (!ctx.running || mySeq !== boardSeq) return;
        if (step === 0) { paint(cellsA); ctx.timeout(() => cycle(1, mySeq), SHOW_MS); }
        else if (step === 1) { paintBlank(); ctx.timeout(() => cycle(2, mySeq), BLANK_MS); }
        else if (step === 2) { paint(cellsB); ctx.timeout(() => cycle(3, mySeq), SHOW_MS); }
        else { paintBlank(); ctx.timeout(() => cycle(0, mySeq), BLANK_MS); }
      }

      function makeBoard() {
        if (!ctx.running) return;
        boardIdx++;
        boardSeq++;
        cellsA = [];
        for (let i = 0; i < total; i++) {
          cellsA.push({
            glyph: GLYPHS[Math.floor(ctx.rng() * GLYPHS.length)],
            ink: INKS[Math.floor(ctx.rng() * INKS.length)],
          });
        }
        // version B: exactly one tile differs — glyph OR ink, 50/50.
        // CVD assist: ink-only changes on a red/green-heavy palette can be
        // invisible to colorblind players, so changes become glyph-only.
        const cvd = !!(BT.state.settings && BT.state.settings.cvdAssist);
        cellsB = cellsA.map(c => ({ glyph: c.glyph, ink: c.ink }));
        changeIdx = Math.floor(ctx.rng() * total);
        const c = cellsB[changeIdx];
        if (cvd || ctx.rng() < 0.5) c.glyph = pickOther(GLYPHS, c.glyph);
        else c.ink = pickOther(INKS, c.ink);

        tileEls.forEach(t => t.classList.remove('good', 'bad'));
        boardShownAt = ctx.now();
        busy = false;
        updateHud();
        cycle(0, boardSeq);
      }

      function nextBoard() {
        if (!ctx.running) return;
        if (ctx.now() - startedAt >= ctx.durationMs) return end();
        makeBoard();
      }

      // Tapping any tile at ANY time (even during the blank) is an answer.
      function onTap(e) {
        if (!ctx.running || busy) return;
        const tile = e.target.closest ? e.target.closest('.tile') : null;
        if (!tile || !board.contains(tile)) return;
        const idx = tileEls.indexOf(tile);
        if (idx < 0) return;
        if (idx === changeIdx) {
          busy = true;
          boardSeq++; // freeze the flicker cycle
          bucket(1);
          solved++;
          findTimes.push(ctx.now() - boardShownAt);
          paint(cellsB);
          tile.classList.add('good');
          ctx.feedback(true);
          updateHud();
          ctx.timeout(nextBoard, 450);
        } else if (!tile.classList.contains('bad')) {
          // .bad doubles as a debounce: re-taps on the same wrong tile
          // can't double-count while its flash is showing
          bucket(-1);
          errors++;
          tile.classList.add('bad');
          ctx.feedback(false);
          updateHud();
          ctx.timeout(() => tile.classList.remove('bad'), 400);
          if (ctx.survival && errors >= 3) {
            busy = true;
            boardSeq++;
            ctx.timeout(end, 450); // let the last strike register visually
          }
        }
      }
      ctx.listen(board, 'pointerdown', onTap);

      // clock: drives the progress bar and guarantees the round ends
      // (in survival ctx.durationMs is the engine's 300s cap)
      ctx.interval(() => {
        if (!ctx.running) return;
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(ctx.survival
          ? Math.min(Math.max(elapsed / ctx.durationMs, errors / 3), 1)
          : Math.min(elapsed / ctx.durationMs, 1));
        if (elapsed >= ctx.durationMs) end();
      }, 200);

      function end() {
        if (!ctx.running) return;
        const minutes = Math.max(ctx.now() - startedAt, 1000) / 60000;
        const attempts = solved + errors;
        const acc = attempts ? solved / attempts : 0;
        const netPerMin = (solved - errors) / minutes;
        const bothHalves = halfN[0] > 0 && halfN[1] > 0;
        ctx.hud.progress(1);
        ctx.finish({
          primary: ctx.survival ? solved : netPerMin,
          // advance band tests accuracy: down < .65, up ≥ .90
          levelProgress: attempts ? BT.clamp((acc - 0.65) / (0.9 - 0.65), 0, 1) : 0,
          metrics: {
            solved, errors,
            accuracy: Math.round(acc * 100) / 100,
            grid: g,
            meanFindMs: findTimes.length ? Math.round(BT.mean(findTimes)) : null,
            half1: bothHalves ? halfNet[0] / (minutes / 2) : null,
            half2: bothHalves ? halfNet[1] / (minutes / 2) : null,
          },
          advance: attempts && acc >= 0.9 ? 'up'
            : attempts && acc < 0.65 ? 'down' : 'hold',
        });
      }

      ctx.hud.progress(0);
      ctx.hud.stat('Watch for the change…');
      ctx.timeout(makeBoard, 600); // brief lead-in before the first board
    },
  });
})();
