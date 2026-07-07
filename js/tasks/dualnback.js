/* ============================================================
   Cortex task — Dual N-Back  (domain: workingMemory)

   Gameplay: two simultaneous streams. A tile lights on a 3×3
   grid AND a letter is spoken (speechSynthesis). Press POSITION
   (A) when the tile matches the one N steps back; press SOUND
   (L) when the letter does. Both can match on the same step.
   If speech is unavailable or sound is off, the letter is shown
   as text under the grid instead (visual-visual fallback).
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const LETTERS = ['C', 'H', 'K', 'L', 'Q', 'R', 'S', 'T'];

  function nForLevel(level) {
    return level <= 2 ? 1 : level <= 6 ? 2 : 3;
  }

  // Sequence of indices 0..size-1. Exactly round(0.25·(total−n))
  // chosen indices match at lag N — non-targets are forced to differ
  // from the item N back, so no accidental extra matches at lag N
  // (lures at other lags are fine). Same trick as nback.js, per stream.
  function makeSequence(n, total, size, rng) {
    const cand = [];
    for (let i = n; i < total; i++) cand.push(i);
    for (let i = cand.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const t = cand[i]; cand[i] = cand[j]; cand[j] = t;
    }
    const targetIdx = new Set(cand.slice(0, Math.max(1, Math.round(0.25 * (total - n)))));
    const seq = [];
    for (let i = 0; i < total; i++) {
      if (targetIdx.has(i)) { seq.push(seq[i - n]); continue; }
      let v = Math.floor(rng() * size);
      if (i >= n && v === seq[i - n]) v = (v + 1 + Math.floor(rng() * (size - 1))) % size;
      seq.push(v);
    }
    return seq;
  }

  BT.registerTask({
    id: 'dualnback',
    name: 'Dual N-Back',
    icon: '🎧',
    domain: 'workingMemory',
    tagline: 'Track TWO streams at once — positions you see, letters you hear.',
    howTo: [
      'Each step, a tile lights up AND a letter plays — two streams at once.',
      'Press POSITION (or A) when the tile matches the one N steps back.',
      'Press SOUND (or L) when the letter matches the one N steps back.',
      'Both can match on the same step — press both. Wrong presses cost points.',
      'Watch the demo until it clicks 👇',
    ],
    // Looping animated walkthrough on the instructions screen.
    introDemo(box, level) {
      const n = nForLevel(level);
      // canned sequences with obvious, mostly non-overlapping lag-N repeats
      const pos = n === 1 ? [4, 4, 2, 6, 6] : n === 3 ? [4, 1, 7, 4, 2, 7] : [4, 1, 4, 6, 2, 6];
      const ltr = n === 1 ? ['C', 'H', 'H', 'K', 'L'] : n === 3 ? ['C', 'H', 'K', 'L', 'H', 'S'] : ['C', 'H', 'K', 'H', 'R', 'S'];
      const isPosMatch = i => i >= n && pos[i] === pos[i - n];
      const isSndMatch = i => i >= n && ltr[i] === ltr[i - n];

      const tiles = [];
      const grid = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(3,1fr);width:110px;gap:4px;',
      });
      for (let i = 0; i < 9; i++) {
        const t = el('div', {
          class: 'tile',
          style: 'min-width:0;min-height:0;border-radius:6px;cursor:default;',
        });
        tiles.push(t); grid.appendChild(t);
      }
      const letterCell = el('div', {
        style: 'font-size:2rem;font-weight:800;min-width:52px;text-align:center;',
      });
      const caption = el('div', { class: 'task-msg', style: 'font-size:.82rem;min-height:52px;' });
      box.appendChild(el('div', {
        class: 'small muted',
        style: 'text-align:center;margin-bottom:6px;font-weight:700;letter-spacing:.06em;',
        text: 'LIVE DEMO — ' + n + '-BACK ×2',
      }));
      box.appendChild(el('div', {
        style: 'display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:6px;',
      }, grid, letterCell));
      box.appendChild(caption);

      let step = -1;
      function tick() {
        step = (step + 1) % (pos.length + 1);
        tiles.forEach(t => t.classList.remove('lit', 'good'));
        if (step === pos.length) {
          letterCell.textContent = '';
          letterCell.style.color = '';
          caption.textContent = '…and again from the top.';
          return;
        }
        const pm = isPosMatch(step), sm = isSndMatch(step);
        tiles[pos[step]].classList.add(pm ? 'good' : 'lit');
        letterCell.textContent = ltr[step];
        letterCell.style.color = sm ? 'var(--good)' : '';
        if (pm && sm) {
          caption.textContent = 'Step ' + (step + 1) + ': BOTH match ' + n + ' back → press A and L!';
        } else if (pm) {
          caption.textContent = 'Step ' + (step + 1) + ': same tile as ' + n + ' back → POSITION (A).';
        } else if (sm) {
          caption.textContent = 'Step ' + (step + 1) + ': same letter as ' + n + ' back → SOUND (L).';
        } else if (step < n) {
          caption.textContent = 'Step ' + (step + 1) + ': memorize — nothing to compare yet.';
        } else {
          caption.textContent = 'Step ' + (step + 1) + ': no match on either stream — stay quiet.';
        }
      }
      tick();
      const iv = setInterval(tick, 1600);
      return () => clearInterval(iv);
    },

    maxLevel: 10,
    assessLevel: 3, // = 2-back
    startLevel: 3,
    // Trial-based: a round is 20+N steps (~60s). Budgets are a safety net.
    assessDurationMs: 75000,
    trainDurationMs: 75000,

    // Per stream: (hits − false alarms) / targets × 100, floor −100.
    // primary = mean of the two streams.
    norms: { metric: 'dualAccuracy', mean: 45, sd: 22, higherIsBetter: true },
    fmtPrimary: s => s.metrics.n + '-back ×2 · ' + Math.round(s.primary) + '%',

    run(ctx) {
      const N = nForLevel(ctx.level);
      const ISI = Math.max(2800 - 70 * ctx.level, 2100); // onset-to-onset
      const LIT_MS = 500;
      // Practice warm-up: just enough steps for ~2 scoreable trials.
      const TOTAL = ctx.practice ? N + 2 : 20 + N;
      const startedAt = ctx.now();

      // Independent target streams (position 0..8, letter 0..7).
      const posSeq = makeSequence(N, TOTAL, 9, ctx.rng);
      const sndSeq = makeSequence(N, TOTAL, LETTERS.length, ctx.rng);
      const posIsT = posSeq.map((v, i) => i >= N && v === posSeq[i - N]);
      const sndIsT = sndSeq.map((v, i) => i >= N && v === sndSeq[i - N]);
      const posTargets = posIsT.filter(Boolean).length;
      const sndTargets = sndIsT.filter(Boolean).length;

      // Speech works only if the API exists AND sound is on; otherwise the
      // letter is rendered as text under the grid (visual-visual fallback).
      const synth = window.speechSynthesis;
      const speechOk = !!synth && !!(BT.state.settings && BT.state.settings.sound);
      if (synth) ctx.onCleanup(() => { try { synth.cancel(); } catch (e) {} });
      function speak(letter) {
        try {
          if (synth.speaking || synth.pending) synth.cancel();
          const u = new SpeechSynthesisUtterance(letter);
          u.rate = 1.1;
          u.lang = 'en-US';
          synth.speak(u);
        } catch (e) {}
      }

      let posHits = 0, posMisses = 0, posFA = 0;
      let sndHits = 0, sndMisses = 0, sndFA = 0;
      // Split-half buckets by trial parity, streams POOLED.
      const hitsH = [0, 0], faH = [0, 0], targetsH = [0, 0];
      let trial = -1;      // index of the step currently on screen
      let posDone = true;  // per-stream latches; true blocks input
      let sndDone = true;  // (before first onset / after a press)

      const tiles = [];
      const board = el('div', {
        class: 'board',
        style: 'grid-template-columns:repeat(3,1fr); width:min(260px,72vw);',
      });
      for (let i = 0; i < 9; i++) {
        const t = el('div', { class: 'tile', style: 'cursor:default;' });
        tiles.push(t);
        board.appendChild(t);
      }
      // Letter line under the grid — filled only in fallback mode, but always
      // present so the layout doesn't jump.
      const letterEl = el('div', {
        style: 'font-size:2.4rem;font-weight:800;min-height:52px;line-height:52px;text-align:center;',
      });
      const posBtn = el('button', { class: 'choice', text: 'POSITION — tile ' + N + ' back' },
        el('span', { class: 'key-hint', text: 'A' }));
      const sndBtn = el('button', { class: 'choice', text: 'SOUND — letter ' + N + ' back' },
        el('span', { class: 'key-hint', text: 'L' }));
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { class: 'task-msg', text: N + '-back ×2: POSITION for tile repeats, SOUND for letter repeats.' }),
        board,
        letterEl,
        el('div', { class: 'choice-row' }, posBtn, sndBtn)));

      function updateHud() {
        const hits = posHits + sndHits;
        const errs = posFA + sndFA + posMisses + sndMisses;
        ctx.hud.progress(trial / TOTAL);
        ctx.hud.stat(N + '-back ×2 · step ' + (trial + 1) + ' / ' + TOTAL +
          ' · ✓ ' + hits + ' · ✗ ' + errs);
      }

      function startTrial() {
        if (!ctx.running) return;
        trial++;
        if (trial >= TOTAL || ctx.now() - startedAt > ctx.durationMs) return end();
        posDone = false;
        sndDone = false;
        updateHud();
        const tile = tiles[posSeq[trial]];
        tile.classList.add('lit');
        ctx.timeout(() => tile.classList.remove('lit'), LIT_MS);
        const letter = LETTERS[sndSeq[trial]];
        if (speechOk) {
          speak(letter);
        } else {
          letterEl.textContent = letter;
          ctx.timeout(() => { letterEl.textContent = ''; }, LIT_MS);
        }
        ctx.timeout(endTrial, ISI);
      }

      function endTrial() {
        if (!ctx.running) return;
        const p = trial % 2;
        if (posIsT[trial]) targetsH[p]++;
        if (sndIsT[trial]) targetsH[p]++;
        let missed = false;
        if (posIsT[trial] && !posDone) { posMisses++; missed = true; }
        if (sndIsT[trial] && !sndDone) { sndMisses++; missed = true; }
        if (missed) ctx.beep('bad'); // missed target: sound only, no flash
        startTrial();
      }

      // One response per stream per trial window; the latches also
      // swallow rapid double-taps.
      function respondPos() {
        if (!ctx.running || posDone) return;
        posDone = true;
        const p = trial % 2;
        if (posIsT[trial]) { posHits++; hitsH[p]++; ctx.flash('good'); ctx.beep('good'); }
        else { posFA++; faH[p]++; ctx.flash('bad'); ctx.beep('bad'); }
        updateHud();
      }
      function respondSnd() {
        if (!ctx.running || sndDone) return;
        sndDone = true;
        const p = trial % 2;
        if (sndIsT[trial]) { sndHits++; hitsH[p]++; ctx.flash('good'); ctx.beep('good'); }
        else { sndFA++; faH[p]++; ctx.flash('bad'); ctx.beep('bad'); }
        updateHud();
      }

      ctx.listen(posBtn, 'pointerdown', respondPos);
      ctx.listen(sndBtn, 'pointerdown', respondSnd);
      ctx.keys({ a: respondPos, A: respondPos, l: respondSnd, L: respondSnd });

      function end() {
        const posScore = posTargets > 0
          ? Math.max(-100, (posHits - posFA) / posTargets * 100) : 0;
        const sndScore = sndTargets > 0
          ? Math.max(-100, (sndHits - sndFA) / sndTargets * 100) : 0;
        const primary = (posScore + sndScore) / 2;
        // Split-half primaries (pooled streams); null if either half saw no target.
        let half1 = null, half2 = null;
        if (targetsH[0] > 0 && targetsH[1] > 0) {
          half1 = Math.max(-100, (hitsH[0] - faH[0]) / targetsH[0] * 100);
          half2 = Math.max(-100, (hitsH[1] - faH[1]) / targetsH[1] * 100);
        }
        ctx.hud.progress(1);
        ctx.finish({
          primary,
          levelProgress: BT.clamp((primary - 35) / (75 - 35), 0, 1),
          metrics: {
            n: N, trials: TOTAL,
            posTargets, posHits, posMisses, posFA, posScore: Math.round(posScore),
            sndTargets, sndHits, sndMisses, sndFA, sndScore: Math.round(sndScore),
            half1, half2,
          },
          advance: primary >= 75 ? 'up' : primary < 35 ? 'down' : 'hold',
        });
      }

      ctx.hud.progress(0);
      ctx.hud.stat(N + '-back ×2 · get ready…' +
        (speechOk ? '' : ' (no speech — letters shown as text)'));
      ctx.timeout(startTrial, 900); // brief lead-in before the first step
    },
  });
})();
