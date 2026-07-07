/* ============================================================
   Cortex task — Word Pairs  (domain: verbal)

   Gameplay: paired-associate recognition. Study phase shows k
   word pairs ("APPLE — RIVER", 2.5s each); test phase replays
   the left words in shuffled order and asks for each partner
   among 4 choices: the correct word, 2 unstudied foils, and 1
   studied-but-mismatched lure. Lure errors cost half a point.
   One study+test cycle per round; practice = one k=3 cycle.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  // ~300 concrete common nouns, embedded so the task is fully offline.
  const WORDS = (
    'acorn airport almond anchor ankle ant apple apron arrow attic avocado axe' +
    ' badge balloon banana barn basket beach bean bear bed bee bell belt bicycle bird' +
    ' blanket boat bone book boot bottle bowl bread brick bridge broom brush bucket' +
    ' bus butter button' +
    ' cage cake camel camera candle canoe car carpet carrot castle cat cave chain' +
    ' chair cheese cherry chicken church clock cloud coat coin corn cow crab crayon' +
    ' crown curtain' +
    ' deer desk diamond dish dog doll dolphin donkey door dragon dress drum duck' +
    ' eagle ear egg elbow elephant engine envelope' +
    ' falcon fan farm feather fence field finger fire fish flag flame flour flower' +
    ' forest fork fox frog' +
    ' garden garlic gate giraffe glass glove goat goose grape grass guitar' +
    ' hammer hand harbor harp hat hawk helmet hill honey hook horn horse house' +
    ' ice igloo iron island ivy' +
    ' jacket jar jeep jelly jewel jungle' +
    ' key kitchen kite kitten knee knife knot' +
    ' ladder lake lamp leaf lemon library lion lizard lobster lock log' +
    ' magnet mango map marble mask meadow melon mirror monkey moon moss mountain' +
    ' mouse mushroom' +
    ' nail napkin neck needle nest net nose nut' +
    ' oak oar ocean octopus onion orange otter oven owl' +
    ' palace palm pan panda paper parrot peach peanut pear pencil penguin pepper' +
    ' piano pillow pine pizza planet plate plum pond pony potato pumpkin puzzle' +
    ' quilt rabbit raccoon radio rain rainbow rake ribbon rice ring river road robin' +
    ' rocket roof rope rose' +
    ' sail salad salt sand scarf school seal seed shark sheep shell shield ship' +
    ' shirt shoe shovel snail snake snow soap sock sofa soup spider spoon squirrel' +
    ' stamp star stone sugar sun swan' +
    ' table tail telescope tent thread thumb ticket tiger toast tomato tongue tooth' +
    ' towel tower tractor train tree truck trumpet turtle' +
    ' valley vase vest village violin volcano' +
    ' wagon wall walnut watch waterfall wave whale wheat wheel whistle willow window' +
    ' wolf wool' +
    ' yacht yarn zebra zipper zoo'
  ).trim().split(/\s+/);

  BT.registerTask({
    id: 'wordpairs',
    name: 'Word Pairs',
    icon: '🔗',
    domain: 'verbal',
    tagline: 'Learn which words go together, then pick the right partner.',
    howTo: [
      'Word pairs appear one at a time — learn which words go together.',
      'Then each first word comes back with four possible partners.',
      'Tap the word it was paired with, or press keys 1–4.',
      'Careful: one option was studied too — but with a different partner.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,

    // primary = 100·(correct − 0.5·lureErrors)/k — recognition accuracy
    // with lures costing half credit, normalized per pair count.
    norms: { metric: 'pairScore', mean: 62, sd: 18, higherIsBetter: true },
    fmtPrimary: s => s.metrics
      ? s.metrics.correct + ' of ' + s.metrics.k + ' pairs'
      : Math.round(s.primary) + ' pts',

    run(ctx) {
      // practice warm-up: one short k=3 cycle, then finish normally
      const k = ctx.practice ? 3 : 4 + Math.floor(ctx.level / 2);
      const STUDY_MS = 2500, GAP_MS = 250;
      const startedAt = ctx.now();
      const up = w => w.toUpperCase();

      // deal words without replacement: 2k studied + 2k unstudied foils
      const deck = BT.shuffle(WORDS, ctx.rng);
      const pairs = [];
      for (let i = 0; i < k; i++) pairs.push({ left: deck[2 * i], right: deck[2 * i + 1] });
      const foils = deck.slice(2 * k, 4 * k);
      const order = BT.shuffle(pairs, ctx.rng); // test order ≠ study order

      let phase = 'study'; // study | test
      let studied = 0, tested = 0;
      let correct = 0, lureErrors = 0, foilErrors = 0;
      // per-item score contribution: correct +1, lure −0.5, foil 0 —
      // keeps overall primary and split-half computation uniform.
      const results = [];
      let cur = null, options = null, live = false, done = false;

      const msg = el('div', { class: 'task-msg', text: 'Memorise which words go together' });
      const stim = el('div', { class: 'stim', style: 'font-size:clamp(1.3rem, 5.5vw, 2.2rem);' });
      const row = el('div', { class: 'choice-row', style: 'visibility:hidden;' });
      const wordSpans = [];
      for (let i = 0; i < 4; i++) {
        const span = el('span', { text: '' });
        wordSpans.push(span);
        const btn = el('button', { class: 'choice' },
          span,
          el('span', { class: 'key-hint', text: String(i + 1) }));
        ctx.listen(btn, 'pointerdown', () => answer(i));
        row.appendChild(btn);
      }
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        msg,
        el('div', { class: 'stim-box' }, stim),
        row));

      ctx.keys({
        '1': () => answer(0),
        '2': () => answer(1),
        '3': () => answer(2),
        '4': () => answer(3),
      });

      function updateHud() {
        ctx.hud.progress((studied + tested) / (2 * k));
        ctx.hud.stat(phase === 'study'
          ? 'Study ' + Math.min(studied + 1, k) + ' / ' + k
          : 'Recall ' + Math.min(tested + 1, k) + ' / ' + k +
            (tested ? ' · ' + correct + ' correct' : ''));
      }

      function showStudy() {
        if (!ctx.running || done) return;
        if (studied >= k) return startTest();
        updateHud();
        const p = pairs[studied];
        stim.textContent = up(p.left) + ' — ' + up(p.right);
        ctx.timeout(() => {
          if (!ctx.running || done) return;
          stim.textContent = '';
          studied++;
          ctx.timeout(showStudy, GAP_MS);
        }, STUDY_MS);
      }

      function startTest() {
        phase = 'test';
        msg.textContent = 'Pick the word it was paired with';
        row.style.visibility = 'visible';
        nextItem();
      }

      function nextItem() {
        if (!ctx.running || done) return;
        if (tested >= k || ctx.now() - startedAt > ctx.durationMs) return end();
        updateHud();
        cur = order[tested];
        const others = pairs.filter(p => p !== cur);
        const lure = others[Math.floor(ctx.rng() * others.length)].right;
        options = BT.shuffle([
          { word: cur.right, kind: 'correct' },
          { word: lure, kind: 'lure' },
          { word: foils[2 * tested], kind: 'foil' },
          { word: foils[2 * tested + 1], kind: 'foil' },
        ], ctx.rng);
        for (let i = 0; i < 4; i++) wordSpans[i].textContent = up(options[i].word);
        stim.textContent = up(cur.left) + ' — ?';
        live = true;
      }

      function answer(i) {
        if (!ctx.running || done || phase !== 'test' || !live) return; // also blocks double-taps
        live = false;
        const kind = options[i].kind;
        const ok = kind === 'correct';
        if (ok) correct++;
        else if (kind === 'lure') lureErrors++;
        else foilErrors++;
        results.push(ok ? 1 : kind === 'lure' ? -0.5 : 0);
        tested++;
        if (ok) {
          ctx.flash('good'); ctx.beep('good');
          msg.textContent = 'Pick the word it was paired with';
        } else {
          ctx.flash('bad'); ctx.beep('bad');
          msg.textContent = 'It was ' + up(cur.left) + ' — ' + up(cur.right);
        }
        stim.textContent = '';
        ctx.timeout(nextItem, ok ? 600 : 1400);
      }

      // hard stop: soft time budget ends the round even if a test
      // item sits unanswered (there is no per-item deadline).
      ctx.interval(() => {
        if (!ctx.running || done) return;
        if (ctx.now() - startedAt >= ctx.durationMs) end();
      }, 500);

      function end() {
        if (!ctx.running || done) return;
        done = true;
        // unanswered items simply earn nothing — /k stays the honest denominator
        const primary = BT.round1(k > 0 ? (100 * (correct - 0.5 * lureErrors)) / k : 0);
        const h1 = results.filter((_, i) => i % 2 === 0);
        const h2 = results.filter((_, i) => i % 2 === 1);
        const haveHalves = h1.length > 0 && h2.length > 0;
        const halfScore = a => Math.round(100 * BT.mean(a));
        ctx.hud.progress(1);
        ctx.finish({
          primary,
          // advance band: primary 45 (down) .. 85 (up)
          levelProgress: results.length ? BT.clamp((primary - 45) / 40, 0, 1) : 0,
          metrics: {
            pairScore: primary, k,
            correct, lureErrors, foilErrors, asked: results.length,
            half1: haveHalves ? halfScore(h1) : null,
            half2: haveHalves ? halfScore(h2) : null,
          },
          advance: results.length === 0 ? 'hold'
            : primary >= 85 ? 'up'
            : primary < 45 ? 'down' : 'hold',
        });
      }

      updateHud();
      ctx.timeout(showStudy, 900); // a beat to read the prompt before pairs start
    },
  });
})();
