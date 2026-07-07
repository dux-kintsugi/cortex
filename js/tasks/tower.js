/* ============================================================
   Cortex task — Tower  (domain: executive)

   Tower of London. 3 pegs with capacities 3/2/1 and 3 colored
   discs. Rebuild the GOAL arrangement: tap a peg to lift its top
   disc, tap another to drop it. Solving in the BFS-minimum number
   of moves is a "perfect". Puzzle distance grows with level.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const CAPS = [3, 2, 1];
  const FILL = ['fill-red', 'fill-blue', 'fill-yellow'];

  function ser(st) { return st.map(p => p.join('')).join('|'); }
  function clone(st) { return st.map(p => p.slice()); }

  // All legal single-disc moves from a state (top disc → peg with space).
  function neighbors(st) {
    const out = [];
    for (let i = 0; i < 3; i++) {
      if (!st[i].length) continue;
      for (let j = 0; j < 3; j++) {
        if (j === i || st[j].length >= CAPS[j]) continue;
        const n = clone(st);
        n[j].push(n[i].pop());
        out.push(n);
      }
    }
    return out;
  }

  // The full 36-state space, enumerated once by flood-fill (graph is connected).
  const ALL_STATES = (function () {
    const seed = [[0, 1, 2], [], []];
    const seen = new Map([[ser(seed), seed]]);
    const queue = [seed];
    while (queue.length) {
      const s = queue.shift();
      for (const n of neighbors(s)) {
        const k = ser(n);
        if (!seen.has(k)) { seen.set(k, n); queue.push(n); }
      }
    }
    return Array.from(seen.values());
  })();

  // BFS distances from `goal` to every state, keyed by serialization.
  function distancesFrom(goal) {
    const dist = new Map([[ser(goal), 0]]);
    const queue = [goal];
    while (queue.length) {
      const s = queue.shift();
      const d = dist.get(ser(s));
      for (const n of neighbors(s)) {
        const k = ser(n);
        if (!dist.has(k)) { dist.set(k, d + 1); queue.push(n); }
      }
    }
    return dist;
  }

  // Pick {start, goal, minMoves} whose BFS distance is exactly d
  // (every d in 1..7 exists from every goal — verified over all 36
  // states; the fallback loop is just insurance).
  function makePuzzle(d, rng) {
    const goal = ALL_STATES[Math.floor(rng() * ALL_STATES.length)];
    const dist = distancesFrom(goal);
    let want = d, cands = [];
    while (want >= 1) {
      cands = ALL_STATES.filter(s => dist.get(ser(s)) === want);
      if (cands.length) break;
      want--;
    }
    const start = cands[Math.floor(rng() * cands.length)];
    return { start: clone(start), goal: clone(goal), minMoves: want };
  }

  /* ---- shared renderer: one peg column of slot cells + base bar ---- */
  function renderPegInto(box, stack, cap, cellPx, lifted) {
    box.innerHTML = '';
    const r = Math.max(6, Math.round(cellPx * 0.16));
    for (let s = cap - 1; s >= 0; s--) {
      const disc = s < stack.length ? stack[s] : null;
      let cls = 'tile hollow';
      let style = 'width:' + cellPx + 'px;min-width:0;min-height:0;border-radius:' + r + 'px;';
      if (disc != null) {
        cls = 'tile ' + FILL[disc];
        if (lifted && s === stack.length - 1) {
          style += 'transform:translateY(-' + Math.max(5, Math.round(cellPx * 0.18)) + 'px);outline:2px solid var(--accent-2);';
        }
      }
      box.appendChild(el('div', { class: cls, style }));
    }
    box.appendChild(el('div', {
      style: 'height:4px;border-radius:2px;background:var(--line);width:' + (cellPx + 8) + 'px;margin-top:2px;',
    }));
  }

  // Read-only mini diagram of a full state (goal preview, intro demo).
  function buildStateRow(state, cellPx, liftedPeg) {
    const row = el('div', {
      style: 'display:flex;align-items:flex-end;justify-content:center;gap:' +
        Math.max(6, Math.round(cellPx * 0.45)) + 'px;pointer-events:none;',
    });
    for (let i = 0; i < 3; i++) {
      const col = el('div', {
        style: 'display:flex;flex-direction:column;align-items:center;gap:' +
          Math.max(3, Math.round(cellPx * 0.12)) + 'px;',
      });
      renderPegInto(col, state[i], CAPS[i], cellPx, liftedPeg === i);
      row.appendChild(col);
    }
    return row;
  }

  BT.registerTask({
    id: 'tower',
    name: 'Tower',
    icon: '🗼',
    domain: 'executive',
    tagline: 'Plan the whole move sequence before you touch a disc.',
    howTo: [
      'Rebuild the GOAL picture on your three pegs.',
      'Tap a peg to lift its top disc, then tap another peg to drop it there (keys 1 / 2 / 3 work too).',
      'The pegs are small: they hold only 3, 2 and 1 discs.',
      'Solve in the minimum number of moves for a PERFECT — plan first, then move.',
    ],

    // Looping walkthrough of a 2-move perfect solve.
    introDemo(box) {
      const s0 = [[0, 1, 2], [], []];
      const s1 = [[0, 1], [], [2]];
      const s2 = [[0], [1], [2]];
      const frames = [
        { st: s0, lift: -1, cap: 'Make YOUR pegs match the GOAL.' },
        { st: s0, lift: 0, cap: 'Tap peg 1 — the top disc lifts.' },
        { st: s1, lift: -1, cap: 'Tap peg 3 — it drops there. Move 1.' },
        { st: s1, lift: 0, cap: 'Lift the next disc…' },
        { st: s2, lift: -1, cap: 'Move 2 — minimum moves. PERFECT ✅' },
      ];
      const goalSide = el('div', null,
        el('div', { class: 'small muted', style: 'text-align:center;font-weight:700;letter-spacing:.06em;margin-bottom:4px;', text: 'GOAL' }),
        buildStateRow(s2, 14, -1));
      const playBox = el('div');
      const playSide = el('div', null,
        el('div', { class: 'small muted', style: 'text-align:center;font-weight:700;letter-spacing:.06em;margin-bottom:4px;', text: 'YOUR PEGS' }),
        playBox);
      box.appendChild(el('div', { style: 'display:flex;gap:22px;align-items:flex-end;justify-content:center;' }, goalSide, playSide));
      const caption = el('div', { class: 'task-msg', style: 'font-size:.85rem;min-height:38px;margin-top:8px;' });
      box.appendChild(caption);

      let f = -1;
      function tick() {
        f = (f + 1) % frames.length;
        playBox.innerHTML = '';
        playBox.appendChild(buildStateRow(frames[f].st, 20, frames[f].lift));
        caption.textContent = frames[f].cap;
      }
      tick();
      const iv = setInterval(tick, 1500);
      return () => clearInterval(iv);
    },

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = perfect (minimum-move) solves per minute.
    norms: { metric: 'perfectPerMin', mean: 2.2, sd: 1.1, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + ' perfect/min',

    run(ctx) {
      const dTarget = ctx.practice ? 2 : Math.min(2 + Math.floor(ctx.level / 2), 7);
      const MAX_PUZZLES = ctx.practice ? 1 : 8;
      const GRACE_MS = 20000; // mid-puzzle overrun allowance past durationMs
      const startedAt = ctx.now();

      let state = null, goalKey = '', minMoves = 0, moves = 0;
      let selected = null;   // peg index holding the lifted disc, or null
      let locked = true;     // blocks input between puzzles
      let puzzleStartAt = 0, firstMoveDone = false;
      let attempted = 0, solved = 0, perfect = 0, totalMoves = 0, extraMoves = 0;
      const perfectH = [0, 0], solvedH = [0, 0]; // split-half by solved-puzzle parity
      const planTimes = [];

      /* ---- DOM ---- */
      const goalRow = el('div');
      const goalBox = el('div', { style: 'background:var(--panel-2);border:1px solid var(--line);border-radius:12px;padding:10px 18px 8px;' },
        el('div', { class: 'small muted', style: 'text-align:center;font-weight:700;letter-spacing:.08em;margin-bottom:6px;', text: 'GOAL' }),
        goalRow);
      const msg = el('div', { class: 'task-msg' });

      const CELL = 58;
      const pegCols = [], pegWraps = [];
      const boardRow = el('div', { style: 'display:flex;align-items:flex-end;justify-content:center;gap:20px;' });
      for (let i = 0; i < 3; i++) {
        const col = el('div', { style: 'display:flex;flex-direction:column;align-items:center;gap:7px;' });
        const wrap = el('div', {
          style: 'display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:6px 8px 2px;border-radius:14px;transition:transform .06s;',
        }, col, el('div', { class: 'small muted', text: String(i + 1) }));
        pegCols.push(col); pegWraps.push(wrap);
        boardRow.appendChild(wrap);
      }
      ctx.container.appendChild(el('div', { class: 'stage-center' }, goalBox, msg, boardRow));

      function render() {
        for (let i = 0; i < 3; i++) {
          renderPegInto(pegCols[i], state[i], CAPS[i], CELL, selected === i);
        }
      }

      function updateHud() {
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(Math.max(BT.clamp(elapsed / ctx.durationMs, 0, 1), solved / MAX_PUZZLES));
        ctx.hud.stat('Puzzle ' + Math.max(attempted, 1) + ' · move ' + moves + ' / min ' + minMoves +
          ' · perfect ' + perfect + '/' + solved);
      }

      function newPuzzle() {
        const p = makePuzzle(dTarget, ctx.rng);
        state = p.start;
        goalKey = ser(p.goal);
        minMoves = p.minMoves;
        moves = 0;
        selected = null;
        firstMoveDone = false;
        locked = false;
        attempted++;
        puzzleStartAt = ctx.now();
        goalRow.innerHTML = '';
        goalRow.appendChild(buildStateRow(p.goal, 22, -1));
        msg.textContent = 'Rebuild the goal — perfect in ' + minMoves + ' moves.';
        render();
        updateHud();
      }

      // Illegal tap: shake the peg, bad beep — deliberately NOT an error count.
      function reject(i) {
        ctx.beep('bad');
        const w = pegWraps[i];
        w.style.transform = 'translateX(6px)';
        ctx.timeout(() => { w.style.transform = 'translateX(-6px)'; }, 70);
        ctx.timeout(() => { w.style.transform = ''; }, 140);
      }

      function tapPeg(i) {
        if (!ctx.running || locked) return;
        if (selected == null) {
          if (!state[i].length) return reject(i); // nothing to lift
          selected = i;
          render();
          return;
        }
        if (selected === i) { selected = null; render(); return; } // put it back down
        if (state[i].length >= CAPS[i]) return reject(i); // peg full — disc stays lifted
        state[i].push(state[selected].pop());
        selected = null;
        moves++;
        totalMoves++;
        if (!firstMoveDone) { firstMoveDone = true; planTimes.push(ctx.now() - puzzleStartAt); }
        render();
        updateHud();
        if (ser(state) === goalKey) onSolved();
      }

      function onSolved() {
        locked = true; // swallow taps during the between-puzzle pause
        const isPerfect = moves <= minMoves;
        solvedH[solved % 2]++;
        if (isPerfect) perfectH[solved % 2]++;
        solved++;
        if (isPerfect) perfect++;
        extraMoves += moves - minMoves;
        ctx.feedback(true);
        msg.textContent = isPerfect
          ? 'Perfect — solved in the minimum ' + minMoves + '!'
          : 'Solved in ' + moves + ' (minimum was ' + minMoves + ').';
        updateHud();
        ctx.timeout(() => {
          if (!ctx.running) return;
          if (solved >= MAX_PUZZLES || ctx.now() - startedAt > ctx.durationMs) return end();
          newPuzzle();
        }, 900);
      }

      ctx.keys({ 1: () => tapPeg(0), 2: () => tapPeg(1), 3: () => tapPeg(2) });
      for (let i = 0; i < 3; i++) {
        (function (idx) { ctx.listen(pegWraps[idx], 'pointerdown', () => tapPeg(idx)); })(i);
      }

      // Progress ticker + hard stop: a puzzle in flight gets a short grace
      // past the duration, then the round ends — finish is always reachable.
      ctx.interval(() => {
        if (!ctx.running) return;
        updateHud();
        if (ctx.now() - startedAt > ctx.durationMs + GRACE_MS) end();
      }, 500);

      function end() {
        const minutes = Math.max(ctx.now() - startedAt, 1000) / 60000;
        const primary = perfect / minutes; // finite; 0 when nothing solved
        const ratio = solved > 0 ? perfect / solved : 0;
        // split-half: perfect/min per puzzle-parity bucket, each over half the time
        let half1 = null, half2 = null;
        if (solvedH[0] > 0 && solvedH[1] > 0) {
          half1 = perfectH[0] / (minutes / 2);
          half2 = perfectH[1] / (minutes / 2);
        }
        ctx.hud.progress(1);
        ctx.finish({
          primary,
          levelProgress: solved > 0 ? BT.clamp((ratio - 0.4) / (0.75 - 0.4), 0, 1) : 0,
          metrics: {
            perfectPerMin: Math.round(primary * 100) / 100,
            d: dTarget, attempted, solved, perfect,
            moves: totalMoves, extraMoves,
            meanPlanMs: planTimes.length ? Math.round(BT.mean(planTimes)) : null,
            half1, half2,
          },
          advance: solved === 0 ? 'down'
            : ratio >= 0.75 ? 'up'
            : ratio < 0.4 ? 'down' : 'hold',
        });
      }

      ctx.hud.progress(0);
      newPuzzle();
    },
  });
})();
