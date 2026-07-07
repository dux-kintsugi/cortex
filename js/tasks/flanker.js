/* ============================================================
   Cortex task — Flanker  (domain: executive) · survival-capable

   Gameplay: a row of 5 arrows appears — respond to the CENTER
   arrow only (buttons or arrow keys). The outer arrows often
   point the other way and must be ignored. Incongruent trials
   get more frequent with level; from level 5 a response
   deadline applies. Survival mode: play until 3 errors.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const ARROW = { left: '←', right: '→' };
  const OPP = { left: 'right', right: 'left' };

  BT.registerTask({
    id: 'flanker',
    name: 'Flanker',
    icon: '🏹',
    domain: 'executive',
    tagline: 'Answer the middle arrow — ignore its pushy neighbors.',
    howTo: [
      'Five arrows appear in a row. Only the CENTER one matters.',
      'Answer the way the middle arrow points: LEFT / RIGHT buttons or arrow keys.',
      'The outer arrows often point the other way — don’t let them drag you along.',
      'From level 5: answer before the deadline or it counts as wrong.',
    ],

    // Static 2-frame walkthrough: congruent vs incongruent example.
    introDemo(box) {
      const frames = [
        { flank: 'left', center: 'left', note: 'All agree — center points LEFT → answer LEFT.' },
        { flank: 'left', center: 'right', note: 'Neighbors lie! Center points RIGHT → answer RIGHT.' },
      ];
      const row = el('div', { style: 'font-size:2rem;font-weight:800;text-align:center;letter-spacing:.06em;' });
      const caption = el('div', { class: 'task-msg', style: 'font-size:.85rem;min-height:40px;margin-top:6px;' });
      box.appendChild(el('div', {
        class: 'small muted',
        style: 'text-align:center;margin-bottom:6px;font-weight:700;letter-spacing:.06em;',
        text: 'CENTER ARROW ONLY',
      }));
      box.appendChild(row);
      box.appendChild(caption);

      let i = 0;
      function show() {
        const f = frames[i % 2];
        row.innerHTML = '';
        for (let k = 0; k < 5; k++) {
          const isCenter = k === 2;
          row.appendChild(el('span', {
            text: ARROW[isCenter ? f.center : f.flank],
            style: isCenter ? 'color:var(--accent-2);' : 'color:var(--muted);',
          }));
        }
        caption.textContent = f.note;
        i++;
      }
      show();
      const iv = setInterval(show, 2200); // pre-ctx phase: plain timer allowed here
      return () => clearInterval(iv);
    },

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,
    survival: true,

    // primary = net correct per minute = (correct − wrong) / minutes.
    norms: { metric: 'netPerMin', mean: 28, sd: 9, higherIsBetter: true },
    fmtPrimary: s => Math.round(s.primary) + '/min · interference ' +
      Math.round((s.metrics && s.metrics.flankerEffect) || 0) + 'ms',
    fmtSurvival: s => (s.metrics ? s.metrics.correct : 0) + ' arrows before 3 strikes',

    run(ctx) {
      // Level knobs
      const incongruentP = Math.min(0.35 + 0.04 * ctx.level, 0.75);
      const deadlineMs = ctx.level >= 5 ? Math.max(2400 - 150 * ctx.level, 1100) : 0;
      const STRIKES = 3; // survival: round ends at this many errors

      let correct = 0, wrong = 0, timeouts = 0;
      let trialIdx = 0;         // scored-trial counter for split-half buckets
      const halves = [{ c: 0, w: 0, n: 0 }, { c: 0, w: 0, n: 0 }];
      const rtCongruent = [], rtIncongruent = []; // correct trials only
      let cur = null;           // { center, flank, congruent }
      let lastCenter = null;    // center-direction streak guard
      let centerRun = 0;
      let live = false;         // a stimulus is on screen awaiting response
      let shownAt = 0;
      let deadlineTimer = null;

      // 5 arrow glyphs must fit a phone screen — shrink the .stim via
      // inline geometry only.
      const stim = el('div', { class: 'stim', style: 'font-size:min(4.2rem,15vw);letter-spacing:.05em;white-space:nowrap;' });
      const msg = el('div', { class: 'task-msg', text: 'Which way does the MIDDLE arrow point?' });
      const row = el('div', { class: 'choice-row' });
      const dirs = ['left', 'right'];
      dirs.forEach(dir => {
        const btn = el('button', { class: 'choice' },
          dir === 'left' ? '← LEFT' : 'RIGHT →',
          el('span', { class: 'key-hint', text: dir === 'left' ? '←' : '→' }));
        ctx.listen(btn, 'pointerdown', () => respond(dir));
        row.appendChild(btn);
      });
      ctx.container.appendChild(el('div', { class: 'stage-center' },
        msg,
        el('div', { class: 'stim-box' }, stim),
        row));

      ctx.keys({
        ArrowLeft: () => respond('left'),
        ArrowRight: () => respond('right'),
      });

      const startedAt = ctx.now();

      function errors() { return wrong; } // timeouts are already counted in `wrong`

      function updateHud() {
        const total = correct + wrong;
        if (ctx.survival) {
          ctx.hud.stat('💀 Survival · ✓ ' + correct + ' · strikes ' + errors() + '/' + STRIKES);
        } else {
          ctx.hud.stat('Trial ' + (total + 1) + (total
            ? ' · ' + Math.round((correct / total) * 100) + '%'
            : ''));
        }
      }

      function makeStim() {
        let center = ctx.rng() < 0.5 ? 'left' : 'right';
        // never the same center direction more than 3 in a row
        if (center === lastCenter && centerRun >= 3) center = OPP[center];
        if (center === lastCenter) centerRun++;
        else { centerRun = 1; lastCenter = center; }
        const congruent = ctx.rng() >= incongruentP;
        const flank = congruent ? center : OPP[center];
        return { center, flank, congruent };
      }

      function render(s) {
        const f = ARROW[s.flank], c = ARROW[s.center];
        stim.textContent = f + f + c + f + f;
      }

      // Record one scored trial; returns true when the round must end
      // (survival strike-out).
      function score(ok, rt) {
        const half = halves[trialIdx % 2];
        trialIdx++; half.n++;
        if (ok) {
          correct++; half.c++;
          (cur.congruent ? rtCongruent : rtIncongruent).push(rt);
        } else {
          wrong++; half.w++;
        }
        ctx.feedback(ok);
        stim.textContent = '';
        updateHud();
        return ctx.survival && errors() >= STRIKES;
      }

      function nextTrial() {
        if (!ctx.running) return;
        if (ctx.now() - startedAt >= ctx.durationMs) return end();
        cur = makeStim();
        render(cur);
        shownAt = ctx.now();
        live = true;
        if (deadlineMs) {
          deadlineTimer = ctx.timeout(() => {
            if (!ctx.running || !live) return;
            live = false;
            timeouts++;
            if (score(false, 0)) return end();
            ctx.timeout(nextTrial, 350);
          }, deadlineMs);
        }
      }

      function respond(dir) {
        if (!ctx.running || !live) return; // also blocks rapid double-taps
        live = false;
        if (deadlineTimer != null) { ctx.clearTimer(deadlineTimer); deadlineTimer = null; }
        const rt = ctx.now() - shownAt;
        if (score(dir === cur.center, rt)) return end();
        ctx.timeout(nextTrial, 350);
      }

      // Progress + hard stop, so time-up ends the round even if a
      // stimulus sits unanswered (no deadline below level 5).
      ctx.interval(() => {
        if (!ctx.running) return;
        const elapsed = ctx.now() - startedAt;
        ctx.hud.progress(elapsed / ctx.durationMs);
        if (elapsed >= ctx.durationMs) end();
      }, 250);

      function end() {
        if (!ctx.running) return;
        const minutes = Math.max((ctx.now() - startedAt) / 60000, 1 / 60);
        const netPerMin = (correct - wrong) / minutes;
        const medCon = rtCongruent.length ? BT.median(rtCongruent) : null;
        const medInc = rtIncongruent.length ? BT.median(rtIncongruent) : null;
        const flankerEffect = medCon != null && medInc != null
          ? Math.round(medInc - medCon) : 0;
        const total = correct + wrong;
        const acc = total ? correct / total : 0;
        // Split halves: net/min per parity bucket over half the elapsed time.
        const halfMinutes = minutes / 2;
        const haveHalves = halves[0].n > 0 && halves[1].n > 0;
        ctx.hud.progress(1);
        ctx.finish({
          // survival: primary = correct answers achieved (engine records score null)
          primary: ctx.survival ? correct : netPerMin,
          levelProgress: BT.clamp((acc - 0.72) / (0.92 - 0.72), 0, 1),
          metrics: {
            netPerMin, correct, wrong, timeouts, trials: total,
            accuracy: Math.round(acc * 100),
            medianRTCongruent: medCon != null ? Math.round(medCon) : null,
            medianRTIncongruent: medInc != null ? Math.round(medInc) : null,
            flankerEffect,
            half1: haveHalves ? (halves[0].c - halves[0].w) / halfMinutes : null,
            half2: haveHalves ? (halves[1].c - halves[1].w) / halfMinutes : null,
          },
          advance: total === 0 ? 'hold'
            : acc >= 0.92 ? 'up'
            : acc < 0.72 ? 'down' : 'hold',
        });
      }

      updateHud();
      nextTrial();
    },
  });
})();
