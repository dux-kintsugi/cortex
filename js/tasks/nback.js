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
      'Tiles light up one at a time, like a slideshow. Your job: spot repeats.',
      'In 2-back, compare each tile to the one TWO steps earlier. Corner… middle… corner — that third tile repeats the first ⇒ press MATCH.',
      'No repeat? Do nothing and keep watching. Wrong presses cost points.',
      'You’re holding the last few positions in your head, updating as you go — that’s the workout.',
      'Watch the demo until it clicks 👇',
    ],
    // Looping animated walkthrough on the instructions screen.
    introDemo(box, level) {
      const n = nForLevel(level);
      // canned sequences with obvious lag-N repeats
      const seq = n === 1 ? [4, 4, 2, 6, 6] : n === 3 ? [4, 1, 7, 4, 1, 7] : [4, 1, 4, 6, 1, 6];
      const isMatch = i => i >= n && seq[i] === seq[i - n];

      const tiles = [];
      const grid = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(3,1fr);width:150px;margin:0 auto 8px;gap:5px;',
      });
      for (let i = 0; i < 9; i++) {
        const t = el('div', {
          class: 'tile',
          style: 'min-width:0;min-height:0;border-radius:8px;cursor:default;font-size:.72rem;color:var(--muted);',
        });
        tiles.push(t); grid.appendChild(t);
      }
      const caption = el('div', { class: 'task-msg', style: 'font-size:.85rem;min-height:40px;' });
      box.appendChild(el('div', {
        class: 'small muted',
        style: 'text-align:center;margin-bottom:6px;font-weight:700;letter-spacing:.06em;',
        text: 'LIVE DEMO — ' + n + '-BACK',
      }));
      box.appendChild(grid);
      box.appendChild(caption);

      // Each tile keeps small step-numbers as it lights, so a match is visibly
      // "this tile lit at 1 and 3 — that's 2 apart".
      let step = -1;
      let hist = Array(9).fill('');
      function tick() {
        step = (step + 1) % (seq.length + 1);
        tiles.forEach(t => t.classList.remove('lit', 'good'));
        if (step === seq.length) {
          caption.textContent = '…and again from the top.';
          hist = Array(9).fill('');
          tiles.forEach(t => { t.textContent = ''; });
          return;
        }
        const pos = seq[step];
        hist[pos] = hist[pos] ? hist[pos] + '·' + (step + 1) : String(step + 1);
        tiles[pos].textContent = hist[pos];
        const match = isMatch(step);
        tiles[pos].classList.add(match ? 'good' : 'lit');
        if (match) {
          caption.textContent = 'Step ' + (step + 1) + ': same tile as step ' + (step + 1 - n) + ' — ' + n + ' apart → MATCH ✅';
        } else if (step < n) {
          caption.textContent = 'Step ' + (step + 1) + ': nothing to compare yet — just remember it.';
        } else {
          caption.textContent = 'Step ' + (step + 1) + ': different tile than ' + n + ' back — stay quiet.';
        }
      }
      tick();
      const iv = setInterval(tick, 1500);
      return () => clearInterval(iv);
    },

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
      // Practice warm-up: just enough tiles for ~2 scoreable trials.
      const TOTAL = ctx.practice ? N + 2 : 24 + N;
      const seq = makeSequence(N, TOTAL, ctx.rng);
      const isTarget = seq.map((p, i) => i >= N && p === seq[i - N]);
      const targetCount = isTarget.filter(Boolean).length;
      const startedAt = ctx.now();

      let hits = 0, misses = 0, falseAlarms = 0;
      // Split-half buckets by trial parity (0 = even-indexed, 1 = odd-indexed).
      const hitsH = [0, 0], faH = [0, 0], targetsH = [0, 0];
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
      const matchBtn = el('button', { class: 'choice', text: 'MATCH — same as ' + N + ' back' },
        el('span', { class: 'key-hint', text: 'SPACE' }));
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { class: 'task-msg', text: N + '-back: press when a tile repeats the one from ' + N + ' step' + (N > 1 ? 's' : '') + ' ago.' }),
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
        if (isTarget[trial]) targetsH[trial % 2]++;
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
        if (isTarget[trial]) { hits++; hitsH[trial % 2]++; ctx.flash('good'); ctx.beep('good'); }
        else { falseAlarms++; faH[trial % 2]++; ctx.flash('bad'); ctx.beep('bad'); }
        updateHud();
      }

      ctx.listen(matchBtn, 'pointerdown', respond);
      ctx.keys({ ' ': respond });

      function end() {
        const primary = targetCount > 0
          ? Math.max(-100, (hits - falseAlarms) / targetCount * 100)
          : 0;
        // Split-half primaries; null for both if either half saw no target.
        let half1 = null, half2 = null;
        if (targetsH[0] > 0 && targetsH[1] > 0) {
          half1 = Math.max(-100, (hitsH[0] - faH[0]) / targetsH[0] * 100);
          half2 = Math.max(-100, (hitsH[1] - faH[1]) / targetsH[1] * 100);
        }
        ctx.hud.progress(1);
        ctx.finish({
          primary,
          levelProgress: BT.clamp((primary - 40) / (80 - 40), 0, 1),
          metrics: { n: N, trials: TOTAL, targets: targetCount, hits, misses, falseAlarms, half1, half2 },
          advance: primary >= 80 ? 'up' : primary < 40 ? 'down' : 'hold',
        });
      }

      ctx.hud.progress(0);
      ctx.hud.stat(N + '-back · get ready…');
      ctx.timeout(startTrial, 900); // brief lead-in before the first tile
    },
  });
})();
