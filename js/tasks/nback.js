/* ============================================================
   Cortex task — N-Back  (domain: workingMemory)

   Gameplay: tiles light up one at a time on a 3×3 grid. Press
   MATCH (button or SPACE) when the lit position is the same as
   the one N steps back. N grows with level (1-back → 2-back →
   3-back) and the stream speeds up.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  function nForLevel(level) {
    return level <= 2 ? 1 : level <= 6 ? 2 : 3;
  }

  // Sequence of tile positions (0..8). Exactly the chosen target
  // indices match at lag N — non-targets are forced to differ from
  // the position N back, so no accidental extra matches at lag N
  // (lures at other lags are fine).
  function makeSequence(n, total, rng) {
    const cand = [];
    for (let i = n; i < total; i++) cand.push(i);
    for (let i = cand.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = cand[i]; cand[i] = cand[j]; cand[j] = t;
    }
    const targetIdx = new Set(cand.slice(0, Math.max(1, Math.round(0.3 * (total - n)))));
    const seq = [];
    for (let i = 0; i < total; i++) {
      if (targetIdx.has(i)) { seq.push(seq[i - n]); continue; }
      let pos = Math.floor(rng() * 9);
      if (i >= n && pos === seq[i - n]) pos = (pos + 1 + Math.floor(rng() * 8)) % 9;
      seq.push(pos);
    }
    return seq;
  }

  BT.registerTask({
    id: 'nback',
    name: 'N-Back',
    icon: '🔁',
    domain: 'workingMemory',
    tagline: 'Does this tile repeat the one from N steps back?',
    howTo: [
      'Watch the grid — one tile lights up at a time.',
      'Press MATCH (or SPACE) when the lit position is the same as N steps back.',
      '1-back = the previous tile, 2-back = two tiles ago, 3-back = three ago.',
      'Don’t press for anything else — false alarms cost points.',
    ],

    maxLevel: 10,
    assessLevel: 3, // = 2-back
    startLevel: 3,
    // Trial-based: a round is 24+N tiles (~60s). Budgets are a safety net.
    assessDurationMs: 75000,
    trainDurationMs: 75000,

    // primary = (hits − false alarms) / targets × 100, floored at −100.
    norms: { metric: 'targetAccuracy', mean: 55, sd: 22, higherIsBetter: true },
    fmtPrimary: s => s.metrics.n + '-back · ' + Math.round(s.primary) + '% target accuracy',

    run(ctx) {
      const N = nForLevel(ctx.level);
      const ISI = Math.max(2400 - 80 * ctx.level, 1700); // onset-to-onset
      const LIT_MS = 500;
      const TOTAL = 24 + N;
      const seq = makeSequence(N, TOTAL, ctx.rng);
      const isTarget = seq.map((p, i) => i >= N && p === seq[i - N]);
      const targetCount = isTarget.filter(Boolean).length;
      const startedAt = ctx.now();

      let hits = 0, misses = 0, falseAlarms = 0;
      let trial = -1;       // index of the trial currently on screen
      let responded = true; // true blocks input (before first onset / after a press)

      const tiles = [];
      const board = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(3,1fr); width:min(300px,80vw);',
      });
      for (let i = 0; i < 9; i++) {
        const t = el('div', { class: 'tile', style: 'cursor:default;' });
        tiles.push(t);
        board.appendChild(t);
      }
      const matchBtn = el('button', { class: 'choice', text: 'MATCH' },
        el('span', { class: 'key-hint', text: 'SPACE' }));
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { class: 'task-msg', text: N + '-back — press MATCH when the position repeats.' }),
        board,
        el('div', { class: 'choice-row' }, matchBtn)));

      function updateHud() {
        ctx.hud.progress(trial / TOTAL);
        ctx.hud.stat(N + '-back · tile ' + (trial + 1) + ' / ' + TOTAL +
          ' · ✓ ' + hits + ' · ✗ ' + (falseAlarms + misses));
      }

      function startTrial() {
        if (!ctx.running) return;
        trial++;
        if (trial >= TOTAL || ctx.now() - startedAt > ctx.durationMs) return end();
        responded = false;
        updateHud();
        const tile = tiles[seq[trial]];
        tile.classList.add('lit');
        ctx.timeout(() => tile.classList.remove('lit'), LIT_MS);
        ctx.timeout(endTrial, ISI);
      }

      function endTrial() {
        if (!ctx.running) return;
        if (isTarget[trial] && !responded) {
          misses++;
          ctx.beep('bad'); // missed target: sound only, no flash
        }
        startTrial();
      }

      // One response per trial window (onset → next onset); the
      // `responded` latch also swallows rapid double-taps.
      function respond() {
        if (!ctx.running || responded) return;
        responded = true;
        if (isTarget[trial]) { hits++; ctx.flash('good'); ctx.beep('good'); }
        else { falseAlarms++; ctx.flash('bad'); ctx.beep('bad'); }
        updateHud();
      }

      ctx.listen(matchBtn, 'pointerdown', respond);
      ctx.keys({ ' ': respond });

      function end() {
        const primary = targetCount > 0
          ? Math.max(-100, (hits - falseAlarms) / targetCount * 100)
          : 0;
        ctx.hud.progress(1);
        ctx.finish({
          primary,
          metrics: { n: N, trials: TOTAL, targets: targetCount, hits, misses, falseAlarms },
          advance: primary >= 80 ? 'up' : primary < 40 ? 'down' : 'hold',
        });
      }

      ctx.hud.progress(0);
      ctx.hud.stat(N + '-back · get ready…');
      ctx.timeout(startTrial, 900); // brief lead-in before the first tile
    },
  });
})();
