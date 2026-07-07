/* ============================================================
   Cortex task — Number Sprint  (domain: math)
   Mental arithmetic sprint: solve as many problems as you can
   before the clock runs out. Level bands:
   1–2 add/sub · 3–4 adds × · 5–6 adds ÷ · 7+ two-step (a + b × c).
   Wrong answers keep the problem on screen; two misses skip it.
   Survival mode: play until 3 wrong submits or the 300s cap;
   primary = problems solved.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  BT.registerTask({
    id: 'math',
    name: 'Number Sprint',
    icon: '🧮',
    domain: 'math',
    tagline: 'Rapid-fire mental arithmetic against the clock.',
    howTo: [
      'A problem appears — type the answer with the keypad or keyboard.',
      'Press OK (or Enter) to submit.',
      'Wrong answers stay on screen — fix it and try again.',
      'After two misses the problem is skipped.',
      'Higher levels add ×, ÷, negatives and two-step problems.',
    ],

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 60000,
    trainDurationMs: 75000,

    // primary = net correct per minute = (correct − wrong) / minutes.
    norms: { metric: 'netPerMin', mean: 12, sd: 5, higherIsBetter: true },
    fmtPrimary: s => (Math.round(s.primary * 10) / 10) + ' problems/min',
    survival: true,
    fmtSurvival: s => 'Solved ' + s.metrics.correct + ' before 3 strikes',

    run(ctx) {
      const level = ctx.level;
      // Minus entry (and thus negative answers) unlocks with the minus key.
      const allowMinus = level >= 6;
      const startedAt = ctx.now();

      let correct = 0, wrong = 0, skipped = 0;
      const halves = [{ c: 0, w: 0 }, { c: 0, w: 0 }]; // scored submits split by trial parity
      let trialIdx = 0;
      let problem = null;   // { text, answer }
      let lastText = '';
      let misses = 0;       // wrong submits on the current problem
      let typed = '';
      let accepting = true; // blocks input during between-problem feedback

      /* ---------- problem generation ---------- */
      const ri = (lo, hi) => lo + Math.floor(ctx.rng() * (hi - lo + 1));

      function makeSimple() {
        const ops = level <= 2 ? ['add', 'sub']
          : level <= 4 ? ['add', 'sub', 'mul']
          : ['add', 'sub', 'mul', 'div'];
        const op = ops[ri(0, ops.length - 1)];
        // add/sub operand range grows with level: 12 → 20 → 30 (level 4+)
        const hiOp = level === 1 ? 12 : level <= 3 ? 20 : 30;
        let a, b;
        if (op === 'add') {
          a = ri(2, hiOp); b = ri(2, hiOp);
          return { text: a + ' + ' + b, answer: a + b };
        }
        if (op === 'sub') {
          a = ri(2, hiOp); b = ri(2, hiOp);
          if (!allowMinus && b > a) { const t = a; a = b; b = t; } // keep answers typeable
          return { text: a + ' − ' + b, answer: a - b };
        }
        if (op === 'mul') {
          a = ri(2, 9); b = ri(2, 12);
          return { text: a + ' × ' + b, answer: a * b };
        }
        const d = ri(2, 9), q = ri(2, 12); // division always exact
        return { text: (d * q) + ' ÷ ' + d, answer: q };
      }

      function makeTwoStep() {
        // a ± (b × c) or a ± (b ÷ c), precedence respected, answers −99..999.
        const aMax = 20 + (level - 7) * 10;
        for (let tries = 0; tries < 40; tries++) {
          const a = ri(2, aMax);
          let termText, termVal;
          if (ctx.rng() < 0.6) {
            const b = ri(2, 9), c = ri(2, 12);
            termText = b + ' × ' + c; termVal = b * c;
          } else {
            const d = ri(2, 9), q = ri(2, 12);
            termText = (d * q) + ' ÷ ' + d; termVal = q;
          }
          const form = ri(0, 2);
          const p = form === 0 ? { text: a + ' + ' + termText, answer: a + termVal }
            : form === 1 ? { text: a + ' − ' + termText, answer: a - termVal }
            : { text: termText + ' − ' + a, answer: termVal - a };
          if (p.answer >= -99 && p.answer <= 999) return p;
        }
        return makeSimple();
      }

      const makeProblem = () => (level >= 7 ? makeTwoStep() : makeSimple());

      /* ---------- DOM ---------- */
      const stim = el('div', { class: 'stim' });
      const answer = el('div', { class: 'answer-line' });
      const msg = el('div', { class: 'task-msg' });
      const pad = el('div', { class: 'keypad' });

      function keyBtn(label, fn, cls, style) {
        const b = el('button', { class: 'key' + (cls ? ' ' + cls : ''), text: label, style: style });
        ctx.listen(b, 'click', () => { fn(); b.blur(); });
        return b;
      }

      ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        .forEach(d => pad.appendChild(keyBtn(d, () => pressDigit(d))));
      if (allowMinus) {
        pad.appendChild(keyBtn('−', toggleMinus));
        pad.appendChild(keyBtn('0', () => pressDigit('0')));
        pad.appendChild(keyBtn('⌫', pressBack, 'action'));
        pad.appendChild(keyBtn('OK', submit, 'action', 'grid-column:1 / -1;'));
      } else {
        pad.appendChild(keyBtn('⌫', pressBack, 'action'));
        pad.appendChild(keyBtn('0', () => pressDigit('0')));
        pad.appendChild(keyBtn('OK', submit, 'action'));
      }

      ctx.container.appendChild(el('div', { class: 'stage-center' },
        el('div', { class: 'stim-box' }, stim),
        answer, msg, pad));

      /* ---------- input ---------- */
      function pressDigit(d) {
        if (!ctx.running || !accepting) return;
        if (typed.replace('-', '').length >= 4) return;
        typed += d;
        renderAnswer();
      }
      function pressBack() {
        if (!ctx.running || !accepting) return;
        typed = typed.slice(0, -1);
        renderAnswer();
      }
      function toggleMinus() {
        if (!ctx.running || !accepting) return;
        typed = typed.charAt(0) === '-' ? typed.slice(1) : '-' + typed;
        renderAnswer();
      }
      function renderAnswer() {
        answer.textContent = typed.replace('-', '−');
      }

      const keyMap = { Enter: submit, Backspace: pressBack };
      for (let d = 0; d <= 9; d++) {
        keyMap[String(d)] = (dd => () => pressDigit(dd))(String(d));
      }
      if (allowMinus) keyMap['-'] = toggleMinus;
      ctx.keys(keyMap);

      /* ---------- round flow ---------- */
      const timeUp = () => ctx.now() - startedAt >= ctx.durationMs;

      function updateHud() {
        const attempts = correct + wrong;
        if (ctx.survival) {
          ctx.hud.stat('Strikes ' + Math.min(wrong, 3) + '/3 · solved ' + correct);
          return;
        }
        ctx.hud.stat('Solved ' + correct + ' · errors ' + wrong +
          (attempts ? ' · ' + Math.round((correct / attempts) * 100) + '%' : ''));
      }

      function nextProblem() {
        if (!ctx.running) return;
        if (timeUp()) return end();
        misses = 0;
        typed = '';
        renderAnswer();
        msg.textContent = '';
        let p = makeProblem();
        for (let i = 0; i < 8 && p.text === lastText; i++) p = makeProblem();
        problem = p;
        lastText = p.text;
        stim.textContent = p.text;
        // shrink long problems so they always fit the stage
        stim.style.fontSize = p.text.length >= 11 ? '2.8rem' : p.text.length >= 8 ? '3.6rem' : '';
        updateHud();
      }

      function submit() {
        if (!ctx.running || !accepting || !problem) return;
        if (typed === '' || typed === '-') return; // nothing entered — no penalty
        if (timeUp()) return end();
        const val = parseInt(typed, 10);
        if (val === problem.answer) {
          correct++;
          halves[trialIdx++ % 2].c++;
          accepting = false;
          ctx.feedback(true);
          updateHud();
          ctx.timeout(() => {
            if (!ctx.running) return;
            accepting = true;
            nextProblem();
          }, 350);
        } else {
          wrong++; misses++;
          halves[trialIdx++ % 2].w++;
          ctx.feedback(false);
          typed = '';
          renderAnswer();
          updateHud();
          if (ctx.survival && wrong >= 3) {
            // third strike — show the answer briefly, then end the run
            accepting = false;
            msg.textContent = 'Answer: ' + problem.answer;
            ctx.timeout(() => { if (ctx.running) end(); }, 700);
          } else if (misses >= 2) {
            skipped++;
            accepting = false;
            msg.textContent = 'Answer: ' + problem.answer;
            ctx.timeout(() => {
              if (!ctx.running) return;
              accepting = true;
              nextProblem();
            }, 700);
          }
        }
      }

      // progress + hard time-up check (covers idle rounds too).
      // In survival ctx.durationMs is the engine's 300s cap, so this
      // doubles as the survival hard stop; the bar tracks strikes too.
      ctx.interval(() => {
        if (!ctx.running) return;
        const t = ctx.now() - startedAt;
        const frac = Math.min(t / ctx.durationMs, 1);
        ctx.hud.progress(ctx.survival ? Math.max(frac, wrong / 3) : frac);
        if (t >= ctx.durationMs) end();
      }, 250);

      function end() {
        if (!ctx.running) return;
        const minutes = Math.max(ctx.now() - startedAt, 1000) / 60000;
        const attempts = correct + wrong;
        const acc = attempts ? correct / attempts : 0;
        const netPerMin = attempts ? (correct - wrong) / minutes : 0;
        const halfMin = minutes / 2;
        const hasHalves = halves[0].c + halves[0].w > 0 && halves[1].c + halves[1].w > 0;
        ctx.hud.progress(1);
        ctx.finish({
          // Survival: primary = problems solved before 3 strikes.
          primary: ctx.survival ? correct : netPerMin,
          // advance rule tests accuracy: down < 0.65, up ≥ 0.90
          levelProgress: BT.clamp((acc - 0.65) / (0.90 - 0.65), 0, 1),
          metrics: {
            correct, wrong, skipped,
            accuracy: Math.round(acc * 100),
            netPerMin: Math.round(netPerMin * 10) / 10,
            half1: hasHalves ? Math.round(((halves[0].c - halves[0].w) / halfMin) * 10) / 10 : null,
            half2: hasHalves ? Math.round(((halves[1].c - halves[1].w) / halfMin) * 10) / 10 : null,
          },
          advance: attempts === 0 ? 'hold'
            : acc >= 0.90 ? 'up'
            : acc < 0.65 ? 'down' : 'hold',
        });
      }

      nextProblem();
    },
  });
})();
