/* ============================================================
   Cortex — gamedetail.js
   Per-game deep-dive screen ("game", params {id}): header with
   level / best / last, score history with rolling average,
   level & ability timeline, and task-specific sub-metric trends.
   Loaded AFTER main.js — BT.registerScreen already exists.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  // Task-specific sub-metric charts. Keys match what each task actually
  // records in summary.metrics (verified against js/tasks/*.js):
  //   stroop.interference · switching.switchCost · gonogo.hitRate/.faRate
  //   digitspan.bestForward/.bestBackward · nback.n · reaction.medianRT
  // Values may exceed drawLine's autoScale cap (110), so each chart passes
  // explicit yMin/yMax computed from its own data.
  const SUB_CHARTS = {
    stroop: {
      title: 'Interference cost',
      sub: 'Extra time to name the ink when the word disagrees — lower is better.',
      series: [{ key: 'interference', label: 'Interference (ms)' }],
    },
    switching: {
      title: 'Switch cost',
      sub: 'Slowdown on rule-switch trials vs repeats — lower is better.',
      series: [{ key: 'switchCost', label: 'Switch cost (ms)' }],
    },
    gonogo: {
      title: 'Hits vs false alarms',
      sub: 'Aim to keep hits high while false alarms stay low.',
      clampLo: 0, clampHi: 100,
      series: [
        { key: 'hitRate', label: 'Hit rate %', scale: 100, colorVar: '--good' },
        { key: 'faRate', label: 'False alarms %', scale: 100, colorVar: '--bad' },
      ],
    },
    digitspan: {
      title: 'Span length',
      sub: 'Longest digit sequence recalled, forward and backward.',
      clampLo: 0,
      series: [
        { key: 'bestForward', label: 'Forward' },
        { key: 'bestBackward', label: 'Backward' },
      ],
    },
    nback: {
      title: 'N-back level',
      sub: 'How many steps back you were holding in mind.',
      clampLo: 0,
      series: [{ key: 'n', label: 'N' }],
    },
    reaction: {
      title: 'Median reaction time',
      sub: 'Median RT per round — lower is better.',
      clampLo: 0,
      series: [{ key: 'medianRT', label: 'Median RT (ms)' }],
    },
  };

  const MIN_METRIC_SESSIONS = 3; // sub-metric needs this many finite values
  const ROLL_WINDOW = 7;         // rolling-mean window for the score chart

  // Width-change resizes rebuild the current screen without params (see
  // main.js boot) — remember the last id so the deep dive survives that.
  let lastId = null;

  /* ---------------- helpers ---------------- */
  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function statBox(value, label) {
    return el('div', { class: 'stat-box' },
      el('div', { class: 'v', text: value }),
      el('div', { class: 'l', text: label }));
  }

  // card with a canvas; drawing deferred to rAF so the canvas has layout size
  function chartCard(title, sub, height, draw) {
    const canvas = el('canvas', { style: 'width:100%;height:' + height + 'px;' });
    const card = el('div', { class: 'card' },
      el('h2', { text: title }),
      sub ? el('div', { class: 'sub small', style: 'margin-bottom:8px;', text: sub }) : null,
      canvas);
    requestAnimationFrame(() => { draw(canvas); });
    return card;
  }

  // trailing rolling mean over chronologically ordered points
  function rollingMean(points, win) {
    const out = [];
    for (let i = 0; i < points.length; i++) {
      const from = Math.max(0, i - win + 1);
      let sum = 0;
      for (let j = from; j <= i; j++) sum += points[j].y;
      out.push({ x: points[i].x, y: sum / (i - from + 1) });
    }
    return out;
  }

  // insert corner points so drawLine renders a step function
  function stepPoints(points) {
    const out = [];
    for (let i = 0; i < points.length; i++) {
      if (i > 0 && points[i].y !== points[i - 1].y) {
        out.push({ x: points[i].x, y: points[i - 1].y });
      }
      out.push(points[i]);
    }
    return out;
  }

  // one point per session where metrics[key] is a finite number
  function metricPoints(sessions, key, scale) {
    const pts = [];
    for (const s of sessions) {
      if (!s.metrics) continue;
      const v = s.metrics[key];
      if (typeof v === 'number' && isFinite(v)) pts.push({ x: s.ts, y: v * (scale || 1) });
    }
    return pts;
  }

  // padded y-range across all series (autoScale in drawLine caps at 110,
  // which breaks ms-scale metrics — compute our own bounds instead)
  function yBounds(seriesArr, clampLo, clampHi) {
    const ys = [];
    for (const s of seriesArr) for (const p of s.points) ys.push(p.y);
    if (!ys.length) return null;
    let lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys);
    let pad = (hi - lo) * 0.15;
    if (pad < 1) pad = 1;
    lo = Math.floor(lo - pad); hi = Math.ceil(hi + pad);
    if (clampLo != null && lo < clampLo) lo = clampLo;
    if (clampHi != null && hi > clampHi) hi = clampHi;
    if (hi - lo < 2) hi = lo + 2;
    return { yMin: lo, yMax: hi };
  }

  /* ---------------- screen ---------------- */
  BT.registerScreen('game', function (main, params) {
    const id = (params && params.id) || lastId;
    const def = id ? BT.tasks[id] : null;
    if (!def) { BT.go('progress'); return; }
    lastId = id;

    const sessions = BT.sessionsFor(id).slice().sort((a, b) => a.ts - b.ts);
    const dom = BT.DOMAINS[def.domain] || { name: def.domain, icon: '' };
    const best = BT.bestScore(id), last = BT.lastScore(id);

    function playNow() {
      BT.runTask({
        taskId: id, mode: 'free', level: BT.taskLevel(id),
        onDone: () => BT.go('game', { id }),
      });
    }

    // --- back ---
    main.appendChild(el('div', { style: 'margin-bottom:14px;' },
      el('button', { class: 'btn ghost', text: '← Progress', onclick: () => BT.go('progress') })));

    // --- header ---
    main.appendChild(el('div', { class: 'card' },
      el('div', { style: 'display:flex;align-items:center;gap:14px;flex-wrap:wrap;' },
        el('div', { style: 'font-size:2.4rem;line-height:1;', text: def.icon }),
        el('div', { style: 'flex:1;min-width:180px;' },
          el('h2', { style: 'margin-bottom:2px;', text: def.name }),
          el('div', { class: 'sub small', text: def.tagline })),
        el('span', { class: 'pill', text: dom.icon + ' ' + dom.name })),
      el('div', { class: 'stat-strip', style: 'margin-top:16px;' },
        statBox('Lv ' + BT.taskLevel(id), 'current level'),
        statBox(best == null ? '—' : String(best), 'best score'),
        statBox(last == null ? '—' : String(last), 'last score'),
        statBox(String(sessions.length), 'rounds played'))));

    // --- not enough history: message instead of charts ---
    if (sessions.length < 2) {
      main.appendChild(el('div', { class: 'card' },
        el('h2', { text: 'Not enough history yet' }),
        el('p', { class: 'sub', style: 'margin-bottom:14px;', text:
          sessions.length === 0
            ? 'You haven’t played ' + def.name + ' yet — play a couple of rounds and your trend charts will appear here.'
            : 'One round down — play ' + def.name + ' again and your trend charts will appear here.' }),
        el('button', { class: 'btn primary', text: 'Play now', onclick: playNow })));
      return;
    }

    let chartsShown = 0;

    // --- chart 1: score over time ---
    const scored = sessions.filter(s => s.score != null);
    const practice = scored.filter(s => s.mode !== 'assess'); // train / free / challenge
    const assess = scored.filter(s => s.mode === 'assess');
    if (scored.length >= 2) {
      const series = [];
      if (practice.length) {
        const pts = practice.map(s => ({ x: s.ts, y: s.score }));
        series.push({ label: 'Rounds', dotsOnly: true, points: pts });
        if (pts.length >= 2) {
          series.push({
            label: ROLL_WINDOW + '-round avg',
            color: cssVar('--accent-2', '#38d0c4'),
            points: rollingMean(pts, ROLL_WINDOW),
          });
        }
      }
      if (assess.length) {
        series.push({
          label: 'Assessment', dotsOnly: true,
          color: cssVar('--warn', '#ffb454'),
          points: assess.map(s => ({ x: s.ts, y: s.score })),
        });
      }
      main.appendChild(chartCard('Score over time',
        'Dots are single rounds; the line is your rolling ' + ROLL_WINDOW + '-round average.',
        240, canvas => BT.drawLine(canvas, series, { autoScale: true })));
      chartsShown++;
    }

    // --- chart 2: level & ability timeline ---
    const levelPts = [], abilityPts = [];
    for (const s of sessions) {
      if (s.mode === 'assess') continue; // assess runs at a fixed level
      if (typeof s.level === 'number' && isFinite(s.level)) levelPts.push({ x: s.ts, y: s.level });
      if (typeof s.ability === 'number' && isFinite(s.ability)) abilityPts.push({ x: s.ts, y: s.ability });
    }
    if (levelPts.length >= 2 || abilityPts.length >= 2) {
      const series = [];
      if (levelPts.length) series.push({ label: 'Level', points: stepPoints(levelPts) });
      if (abilityPts.length) {
        series.push({ label: 'Ability', color: cssVar('--accent-2', '#38d0c4'), points: abilityPts });
      }
      const opts = yBounds(series, 0, null) || {};
      opts.markers = BT.state.assessments.map(a => ({ x: a.ts, label: 'assess' }));
      main.appendChild(chartCard('Level & ability',
        'Level steps when you master or drop a difficulty band; ability adds within-level progress.',
        220, canvas => BT.drawLine(canvas, series, opts)));
      chartsShown++;
    }

    // --- chart 3 (conditional): task-specific sub-metric ---
    const cfg = SUB_CHARTS[id];
    if (cfg) {
      const series = [];
      for (const spec of cfg.series) {
        const pts = metricPoints(sessions, spec.key, spec.scale);
        if (pts.length < MIN_METRIC_SESSIONS) continue;
        series.push({
          label: spec.label,
          color: spec.colorVar ? cssVar(spec.colorVar, '') : null,
          points: pts,
        });
      }
      if (series.length) {
        const opts = yBounds(series, cfg.clampLo != null ? cfg.clampLo : null,
          cfg.clampHi != null ? cfg.clampHi : null) || {};
        main.appendChild(chartCard(cfg.title, cfg.sub, 200,
          canvas => BT.drawLine(canvas, series, opts)));
        chartsShown++;
      }
    }

    if (!chartsShown) {
      main.appendChild(el('div', { class: 'card' },
        el('p', { class: 'sub', text:
          'Not enough scored rounds to chart yet — trends appear after a couple more plays.' }),
        el('div', { class: 'btn-row', style: 'justify-content:flex-start;' },
          el('button', { class: 'btn primary', text: 'Play now', onclick: playNow }))));
    }
  });
})();
