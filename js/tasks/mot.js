/* ============================================================
   Cortex task — Orbit Tracker  (domain: attention)

   Multiple object tracking. A few dots flash accent, then every
   dot turns identical and drifts around the arena. When they
   freeze, tap the ones you were tracking. Rounds repeat until
   the time budget runs out. Survival: play until 3 wrong picks.
   Contract: docs/ARCHITECTURE.md (v3 addendum).
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const TAU = Math.PI * 2;

  // Canvas can't read CSS variables — resolve the theme once per round.
  function themeColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (name, fb) => (cs.getPropertyValue(name) || '').trim() || fb;
    return {
      arena: v('--panel', '#151a2e'),
      edge: v('--line', '#2a3154'),
      dot: v('--panel-3', '#262d52'),
      accent: v('--accent', '#5b8cff'),
      accent2: v('--accent-2', '#38d0c4'),
      good: v('--good', '#3ddc84'),
      bad: v('--bad', '#ff5d73'),
    };
  }

  // Rejection-sample non-overlapping dot centers in a side×side arena.
  // Relaxes the gap if the arena is too crowded to place them all.
  function placeDots(count, side, r, rng) {
    const margin = r + 6;
    const span = side - margin * 2;
    let minGap = r * 2 + 6;
    const pts = [];
    let attempts = 0;
    while (pts.length < count) {
      const x = margin + rng() * span;
      const y = margin + rng() * span;
      let ok = true;
      for (let i = 0; i < pts.length; i++) {
        const dx = pts[i].x - x, dy = pts[i].y - y;
        if (dx * dx + dy * dy < minGap * minGap) { ok = false; break; }
      }
      if (ok) pts.push({ x, y });
      else if (++attempts > 300) { attempts = 0; minGap = Math.max(r, minGap - 4); }
    }
    return pts;
  }

  BT.registerTask({
    id: 'mot',
    name: 'Orbit Tracker',
    icon: '🛰️',
    domain: 'attention',
    tagline: 'Keep your eyes locked on dots that all look alike.',
    howTo: [
      'A few dots glow blue for a moment — those are your targets.',
      'Then every dot turns grey and they all drift around.',
      'Don’t lose them! Follow your targets with your eyes.',
      'When the dots freeze, tap the ones you were tracking.',
    ],

    // Looping walkthrough: flash → drift → freeze/reveal, on a mini canvas.
    introDemo(box) {
      const W = 250, H = 118, r = 9;
      const C = themeColors();
      const cv = el('canvas', { style: 'display:block;margin:0 auto;' });
      cv.width = W; cv.height = H;
      const g = cv.getContext('2d');
      const caption = el('div', { class: 'task-msg', style: 'font-size:.85rem;min-height:34px;margin-top:6px;' });
      box.appendChild(el('div', {
        class: 'small muted',
        style: 'text-align:center;margin-bottom:6px;font-weight:700;letter-spacing:.06em;',
        text: 'LIVE DEMO',
      }));
      box.appendChild(cv);
      box.appendChild(caption);

      let dots = [];
      function resetDots() {
        dots = [];
        let tries = 0;
        while (dots.length < 5 && tries++ < 400) {
          const x = r + 8 + Math.random() * (W - (r + 8) * 2);
          const y = r + 8 + Math.random() * (H - (r + 8) * 2);
          let ok = true;
          for (let i = 0; i < dots.length; i++) {
            const dx = dots[i].x - x, dy = dots[i].y - y;
            if (dx * dx + dy * dy < (r * 3) * (r * 3)) { ok = false; break; }
          }
          if (ok) dots.push({ x, y, h: Math.random() * TAU, target: dots.length < 2 });
        }
      }

      function draw(phase) {
        g.clearRect(0, 0, W, H);
        g.fillStyle = C.arena; g.fillRect(0, 0, W, H);
        g.strokeStyle = C.edge; g.lineWidth = 2; g.strokeRect(1, 1, W - 2, H - 2);
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          g.beginPath(); g.arc(d.x, d.y, r, 0, TAU);
          if (phase === 'flash' && d.target) { g.fillStyle = C.accent; g.strokeStyle = C.accent; }
          else if (phase === 'reveal' && d.target) { g.fillStyle = C.good; g.strokeStyle = C.good; }
          else { g.fillStyle = C.dot; g.strokeStyle = C.edge; }
          g.fill(); g.lineWidth = 2; g.stroke();
        }
      }

      let phase = 'flash', ms = 0;
      resetDots();
      draw(phase);
      caption.textContent = 'Two dots glow — those are yours.';
      const iv = setInterval(() => {
        ms += 50;
        if (phase === 'flash' && ms >= 1400) {
          phase = 'drift'; ms = 0;
          caption.textContent = 'Now they all look alike… follow them!';
        } else if (phase === 'drift') {
          for (let i = 0; i < dots.length; i++) {
            const d = dots[i];
            d.h += (Math.random() - 0.5) * 0.3;
            d.x += Math.cos(d.h) * 2.4;
            d.y += Math.sin(d.h) * 2.4;
            if (d.x < r + 3) { d.x = r + 3; d.h = Math.PI - d.h; }
            else if (d.x > W - r - 3) { d.x = W - r - 3; d.h = Math.PI - d.h; }
            if (d.y < r + 3) { d.y = r + 3; d.h = -d.h; }
            else if (d.y > H - r - 3) { d.y = H - r - 3; d.h = -d.h; }
          }
          if (ms >= 2600) {
            phase = 'reveal'; ms = 0;
            caption.textContent = 'Freeze! Tap where your two ended up. ✔';
          }
        } else if (phase === 'reveal' && ms >= 1700) {
          phase = 'flash'; ms = 0;
          resetDots();
          caption.textContent = 'Two dots glow — those are yours.';
        }
        draw(phase);
      }, 50);
      return () => clearInterval(iv);
    },

    maxLevel: 10,
    assessLevel: 3,
    startLevel: 3,
    assessDurationMs: 75000,
    trainDurationMs: 90000,
    survival: true,

    // primary = 100 · correct picks / total targets across all rounds.
    norms: { metric: 'trackPct', mean: 75, sd: 15, higherIsBetter: true },
    fmtPrimary: s => Math.round(s.primary) + '% tracked',
    fmtSurvival: s => 'Tracked ' + s.metrics.correctPicks + ' dots before 3 strikes',

    run(ctx) {
      const T = 2 + Math.ceil(ctx.level / 3);          // targets to track
      const D = Math.min(7 + ctx.level, 16);           // total dots
      const R = 12;                                    // dot radius (px)
      const SPEED = 55 + 9 * ctx.level;                // px/s, constant
      const FLASH_MS = 1500;
      const DRIFT_MS = (6 + ctx.level * 0.3) * 1000;
      const HIT_R = 28;                                // nearest-dot tap tolerance
      const C = themeColors();
      const startedAt = ctx.now();

      let totalCorrect = 0, totalWrong = 0, totalTargets = 0;
      const correctH = [0, 0], targetsH = [0, 0];      // split halves by round parity
      let round = 0;
      let phase = 'idle';                              // idle | flash | drift | pick | reveal
      let dots = [];
      let picksMade = 0, roundCorrect = 0, roundWrong = 0;

      const msg = el('div', { class: 'task-msg', text: 'Get ready…' });
      const wrap = el('div', { style: 'flex:1;min-height:0;width:100%;display:flex;align-items:center;justify-content:center;' });
      const canvas = el('canvas');
      wrap.appendChild(canvas);
      ctx.container.appendChild(el('div', { class: 'stage-center' }, msg, wrap));

      // Square arena: measure AFTER appending. The wrapper is the stage
      // minus the caption line, so min(w, h) already leaves the spec's
      // breathing room; render at devicePixelRatio for crisp dots.
      const side = Math.max(220, Math.min(wrap.clientWidth, wrap.clientHeight) - 4);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(side * dpr);
      canvas.height = Math.round(side * dpr);
      canvas.style.width = side + 'px';
      canvas.style.height = side + 'px';
      const g = canvas.getContext('2d');
      g.setTransform(dpr, 0, 0, dpr, 0, 0);

      let rafId = 0;
      ctx.onCleanup(() => { if (rafId) cancelAnimationFrame(rafId); });

      function updateHud() {
        if (ctx.survival) {
          ctx.hud.progress(BT.clamp(totalWrong / 3, 0, 1));
          ctx.hud.stat('💀 ' + totalWrong + ' / 3 strikes · tracked ' + totalCorrect);
        } else {
          ctx.hud.progress(BT.clamp((ctx.now() - startedAt) / ctx.durationMs, 0, 1));
          ctx.hud.stat('Round ' + (round + 1) + ' · ' + T + ' targets' +
            (totalTargets ? ' · tracked ' + totalCorrect + ' / ' + totalTargets : ''));
        }
      }

      function draw() {
        g.clearRect(0, 0, side, side);
        g.fillStyle = C.arena;
        g.fillRect(0, 0, side, side);
        g.strokeStyle = C.edge;
        g.lineWidth = 2;
        g.strokeRect(1, 1, side - 2, side - 2);
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          let fill = C.dot, stroke = C.edge, lw = 2, dash = null;
          if (phase === 'flash' && d.target) { fill = C.accent; stroke = C.accent; }
          else if (phase === 'pick' && d.picked) { stroke = C.accent; lw = 3; }
          else if (phase === 'reveal') {
            if (d.picked && d.target) { fill = C.good; stroke = C.good; }
            else if (d.picked) { fill = C.bad; stroke = C.bad; }
            else if (d.target) { stroke = C.accent2; lw = 3; dash = [5, 4]; } // the one(s) you missed
          }
          g.beginPath();
          g.arc(d.x, d.y, R, 0, TAU);
          g.fillStyle = fill;
          g.fill();
          g.setLineDash(dash || []);
          g.lineWidth = lw;
          g.strokeStyle = stroke;
          g.stroke();
          g.setLineDash([]);
        }
      }

      function startRound() {
        if (!ctx.running) return;
        const elapsed = ctx.now() - startedAt;
        const done = ctx.survival
          ? (totalWrong >= 3 || elapsed > ctx.durationMs)  // 3 strikes, or the 300s cap
          : elapsed > ctx.durationMs;
        if (done) return end();

        picksMade = 0; roundCorrect = 0; roundWrong = 0;
        dots = placeDots(D, side, R, ctx.rng).map(p => ({
          x: p.x, y: p.y, h: ctx.rng() * TAU, target: false, picked: false,
        }));
        // Fisher–Yates over indices; first T become targets.
        const idx = dots.map((_, i) => i);
        for (let i = idx.length - 1; i > 0; i--) {
          const j = Math.floor(ctx.rng() * (i + 1));
          const t = idx[i]; idx[i] = idx[j]; idx[j] = t;
        }
        for (let k = 0; k < T; k++) dots[idx[k]].target = true;

        phase = 'flash';
        msg.textContent = 'Memorize the ' + T + ' glowing dots…';
        updateHud();
        draw();
        ctx.timeout(startDrift, FLASH_MS);
      }

      let lastTs = 0, driftLeft = 0;

      function startDrift() {
        if (!ctx.running) return;
        phase = 'drift';
        msg.textContent = 'Track them!';
        driftLeft = DRIFT_MS / 1000;
        lastTs = 0;
        draw();
        rafId = requestAnimationFrame(step);
      }

      // Dots must never fully overlap: an occluded pair makes the pick phase a
      // coin flip on which center is nearer the tap. Positional push-apart each
      // frame (with a heading bounce during drift), and a relaxation pass before
      // picking that GUARANTEES tappable separation.
      function resolveCollisions(minSep, bounce) {
        const lo = R + 2, hi = side - R - 2;
        let moved = false;
        for (let i = 0; i < dots.length; i++) {
          for (let j = i + 1; j < dots.length; j++) {
            const a = dots[i], b = dots[j];
            let dx = b.x - a.x, dy = b.y - a.y;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d >= minSep) continue;
            let ux, uy;
            if (d < 0.001) { const ang = ctx.rng() * TAU; ux = Math.cos(ang); uy = Math.sin(ang); }
            else { ux = dx / d; uy = dy / d; }
            const push = (minSep - d) / 2;
            a.x = BT.clamp(a.x - ux * push, lo, hi); a.y = BT.clamp(a.y - uy * push, lo, hi);
            b.x = BT.clamp(b.x + ux * push, lo, hi); b.y = BT.clamp(b.y + uy * push, lo, hi);
            if (bounce) {
              a.h = Math.atan2(-uy, -ux) + (ctx.rng() - 0.5) * 0.5;
              b.h = Math.atan2(uy, ux) + (ctx.rng() - 0.5) * 0.5;
            }
            moved = true;
          }
        }
        return moved;
      }

      function step(ts) {
        if (!ctx.running || phase !== 'drift') return; // self-terminates after finish/abort
        if (!lastTs) lastTs = ts;
        const dt = Math.min((ts - lastTs) / 1000, 0.05); // clamp frame hiccups — no teleporting
        lastTs = ts;
        const lo = R + 2, hi = side - R - 2;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          d.h += (ctx.rng() - 0.5) * 0.12; // small per-frame heading jitter
          d.x += Math.cos(d.h) * SPEED * dt;
          d.y += Math.sin(d.h) * SPEED * dt;
          if (d.x < lo) { d.x = lo; d.h = Math.PI - d.h; }
          else if (d.x > hi) { d.x = hi; d.h = Math.PI - d.h; }
          if (d.y < lo) { d.y = lo; d.h = -d.h; }
          else if (d.y > hi) { d.y = hi; d.h = -d.h; }
        }
        resolveCollisions(2 * R + 4, true); // soft repulsion — near-misses stay hard, occlusion never happens
        draw();
        if (!ctx.survival) ctx.hud.progress(BT.clamp((ctx.now() - startedAt) / ctx.durationMs, 0, 1));
        driftLeft -= dt;
        if (driftLeft <= 0) return enterPick();
        rafId = requestAnimationFrame(step);
      }

      function enterPick() {
        phase = 'pick';
        // guarantee: at pick time every pair is ≥ 2R+8 apart, so a tap on a
        // dot's visible disc always resolves to THAT dot.
        for (let it = 0; it < 40; it++) {
          if (!resolveCollisions(2 * R + 8, false)) break;
        }
        msg.textContent = 'Frozen — tap the ' + T + ' dots you tracked.';
        ctx.beep('tick');
        draw();
      }

      // Nearest untapped dot within HIT_R; picked latch swallows re-taps.
      ctx.listen(canvas, 'pointerdown', e => {
        if (!ctx.running || phase !== 'pick') return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top;
        let best = null, bestD2 = HIT_R * HIT_R;
        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];
          if (d.picked) continue;
          const dx = d.x - x, dy = d.y - y;
          const d2 = dx * dx + dy * dy;
          if (d2 <= bestD2) { bestD2 = d2; best = d; }
        }
        if (!best) return;
        best.picked = true;
        picksMade++;
        if (best.target) roundCorrect++;
        else { roundWrong++; totalWrong++; }
        draw();
        updateHud();
        msg.textContent = 'Frozen — ' + picksMade + ' / ' + T + ' picked.';
        if (picksMade >= T || (ctx.survival && totalWrong >= 3)) reveal();
      });

      function reveal() {
        phase = 'reveal';
        totalCorrect += roundCorrect;
        totalTargets += T;
        correctH[round % 2] += roundCorrect;
        targetsH[round % 2] += T;
        const perfect = roundCorrect === T;
        draw();
        msg.textContent = perfect
          ? 'Perfect — all ' + T + ' tracked!'
          : 'Got ' + roundCorrect + ' of ' + T + '.';
        ctx.feedback(perfect);
        updateHud();
        round++;
        ctx.timeout(startRound, 1400);
      }

      function end() {
        const pct = totalTargets > 0 ? 100 * totalCorrect / totalTargets : 0;
        // Split-half primaries over even- vs odd-indexed rounds; null if a half is empty.
        let half1 = null, half2 = null;
        if (targetsH[0] > 0 && targetsH[1] > 0) {
          half1 = 100 * correctH[0] / targetsH[0];
          half2 = 100 * correctH[1] / targetsH[1];
        }
        ctx.hud.progress(1);
        ctx.finish({
          primary: ctx.survival ? totalCorrect : pct,
          levelProgress: BT.clamp((pct - 60) / (92 - 60), 0, 1),
          metrics: {
            rounds: round, targetsPerRound: T, dots: D,
            targets: totalTargets, correctPicks: totalCorrect, wrongPicks: totalWrong,
            trackPct: Math.round(pct * 10) / 10,
            half1, half2,
          },
          advance: pct >= 92 ? 'up' : pct < 60 ? 'down' : 'hold',
        });
      }

      updateHud();
      ctx.timeout(startRound, 600); // brief lead-in before the first flash
    },
  });
})();
