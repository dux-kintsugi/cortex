/* ============================================================
   Cortex — charts.js
   Tiny dependency-free canvas charts: radar (domain profile)
   and line (score trends). DPR-aware; colors read from CSS vars.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT;

  function cssVar(name, fallback) {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function setup(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(10, rect.width || canvas.clientWidth || 300);
    const h = Math.max(10, rect.height || canvas.clientHeight || 220);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const g = canvas.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { g, w, h };
  }

  /* ---------------- Radar ----------------
     items: [{label, icon, value:0-100|null}]
     series2: optional second value set (older assessment, drawn faint)
  ------------------------------------------ */
  BT.drawRadar = function (canvas, items, series2) {
    const { g, w, h } = setup(canvas);
    const cx = w / 2, cy = h / 2 + 4;
    const R = Math.min(w, h) / 2 - 34;
    const n = items.length;
    if (n < 3 || R < 20) return;

    const line = cssVar('--line', '#2a3154');
    const muted = cssVar('--muted', '#8b93b8');
    const accent = cssVar('--accent', '#5b8cff');
    const accent2 = cssVar('--accent-2', '#38d0c4');

    const angle = i => -Math.PI / 2 + (i * 2 * Math.PI) / n;
    const pt = (i, frac) => [cx + Math.cos(angle(i)) * R * frac, cy + Math.sin(angle(i)) * R * frac];

    // grid rings
    g.strokeStyle = line;
    g.lineWidth = 1;
    for (const frac of [0.25, 0.5, 0.75, 1]) {
      g.beginPath();
      for (let i = 0; i <= n; i++) {
        const [x, y] = pt(i % n, frac);
        i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
      }
      g.stroke();
    }
    // spokes + labels
    g.font = '600 11px ' + cssVar('--font', 'sans-serif');
    for (let i = 0; i < n; i++) {
      const [x, y] = pt(i, 1);
      g.beginPath(); g.moveTo(cx, cy); g.lineTo(x, y); g.stroke();
      const [lx, ly] = pt(i, 1.16);
      g.fillStyle = muted;
      g.textAlign = lx < cx - 6 ? 'right' : lx > cx + 6 ? 'left' : 'center';
      g.textBaseline = ly < cy - 6 ? 'bottom' : ly > cy + 6 ? 'top' : 'middle';
      const it = items[i];
      g.fillText((it.icon ? it.icon + ' ' : '') + it.label, lx, ly);
    }

    function poly(values, stroke, fill) {
      g.beginPath();
      let started = false;
      for (let i = 0; i < n; i++) {
        const v = values[i];
        const frac = v == null ? 0.02 : BT.clamp(v, 0, 100) / 100;
        const [x, y] = pt(i, frac);
        started ? g.lineTo(x, y) : g.moveTo(x, y);
        started = true;
      }
      g.closePath();
      g.fillStyle = fill; g.fill();
      g.strokeStyle = stroke; g.lineWidth = 2; g.stroke();
    }

    if (series2) poly(series2, 'rgba(139,147,184,0.6)', 'rgba(139,147,184,0.10)');
    poly(items.map(it => it.value), accent, hexToRgba(accent, 0.18));

    // dots
    g.fillStyle = accent2;
    for (let i = 0; i < n; i++) {
      const v = items[i].value;
      if (v == null) continue;
      const [x, y] = pt(i, BT.clamp(v, 0, 100) / 100);
      g.beginPath(); g.arc(x, y, 3, 0, Math.PI * 2); g.fill();
    }
  };

  function hexToRgba(hex, a) {
    const m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    if (!m) return 'rgba(91,140,255,' + a + ')';
    return 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',' + a + ')';
  }

  /* ---------------- Line chart ----------------
     series: [{label, color?, dotsOnly?, points:[{x:ts, y}]}]
     opts: {yMin=0, yMax=100, autoScale?, markers?: [{x, label}]}
  ----------------------------------------------- */
  BT.drawLine = function (canvas, series, opts) {
    opts = opts || {};
    const { g, w, h } = setup(canvas);
    const padL = 30, padR = 12, padT = 12, padB = 24;
    let yMin = opts.yMin != null ? opts.yMin : 0;
    let yMax = opts.yMax != null ? opts.yMax : 100;
    if (opts.autoScale) {
      const ys = series.flatMap(s => s.points.map(p => p.y));
      if (ys.length) {
        yMin = Math.max(0, Math.floor(Math.min.apply(null, ys) - 5));
        // 135 headroom: ability×10 reaches 130 on maxLevel-12 games
        yMax = Math.min(135, Math.ceil(Math.max.apply(null, ys) + 5));
        if (yMax - yMin < 10) { yMax = yMin + 10; }
      }
    }

    const line = cssVar('--line', '#2a3154');
    const muted = cssVar('--muted', '#8b93b8');
    const palette = [cssVar('--accent', '#5b8cff'), cssVar('--accent-2', '#38d0c4'),
      cssVar('--warn', '#ffb454'), cssVar('--bad', '#ff5d73')];

    const allPts = series.flatMap(s => s.points);
    if (!allPts.length) {
      g.fillStyle = muted;
      g.font = '600 13px ' + cssVar('--font', 'sans-serif');
      g.textAlign = 'center';
      g.fillText('No data yet — play some games!', w / 2, h / 2);
      return;
    }
    let xMin = Math.min.apply(null, allPts.map(p => p.x));
    let xMax = Math.max.apply(null, allPts.map(p => p.x));
    if (xMax === xMin) { xMin -= 43200000; xMax += 43200000; }

    const X = x => padL + ((x - xMin) / (xMax - xMin)) * (w - padL - padR);
    const Y = y => padT + (1 - (y - yMin) / (yMax - yMin)) * (h - padT - padB);

    // gridlines + y labels
    g.font = '600 10px ' + cssVar('--font', 'sans-serif');
    g.textAlign = 'right'; g.textBaseline = 'middle';
    for (const yv of [yMin, (yMin + yMax) / 2, yMax]) {
      g.strokeStyle = line; g.lineWidth = 1;
      g.beginPath(); g.moveTo(padL, Y(yv)); g.lineTo(w - padR, Y(yv)); g.stroke();
      g.fillStyle = muted; g.fillText(String(Math.round(yv)), padL - 6, Y(yv));
    }
    // x labels (first / last date)
    g.textAlign = 'left'; g.textBaseline = 'top';
    g.fillText(BT.fmtDate(xMin), padL, h - padB + 6);
    g.textAlign = 'right';
    g.fillText(BT.fmtDate(xMax), w - padR, h - padB + 6);

    // vertical markers (e.g., assessment dates)
    if (opts.markers) {
      for (const mk of opts.markers) {
        if (mk.x < xMin || mk.x > xMax) continue;
        g.strokeStyle = muted; g.lineWidth = 1;
        g.setLineDash([4, 4]);
        g.beginPath(); g.moveTo(X(mk.x), padT); g.lineTo(X(mk.x), h - padB); g.stroke();
        g.setLineDash([]);
        if (mk.label) {
          g.fillStyle = muted; g.textAlign = 'center'; g.textBaseline = 'bottom';
          g.fillText(mk.label, X(mk.x), padT + 8);
        }
      }
    }

    series.forEach((s, si) => {
      const color = s.color || palette[si % palette.length];
      const pts = s.points.slice().sort((a, b) => a.x - b.x);
      if (!pts.length) return;
      if (!s.dotsOnly) {
        g.strokeStyle = color; g.lineWidth = 2;
        g.beginPath();
        pts.forEach((p, i) => { i === 0 ? g.moveTo(X(p.x), Y(p.y)) : g.lineTo(X(p.x), Y(p.y)); });
        g.stroke();
      }
      g.fillStyle = color;
      const r = s.dotsOnly ? 2.5 : 3;
      for (const p of pts) { g.beginPath(); g.arc(X(p.x), Y(p.y), r, 0, Math.PI * 2); g.fill(); }
    });

    // legend
    if (series.length > 1) {
      let lx = padL;
      g.textAlign = 'left'; g.textBaseline = 'alphabetic';
      series.forEach((s, si) => {
        const color = s.color || palette[si % palette.length];
        g.fillStyle = color;
        g.fillRect(lx, padT - 4, 10, 3);
        g.fillStyle = muted;
        g.fillText(s.label || '', lx + 14, padT + 1);
        lx += 14 + g.measureText(s.label || '').width + 16;
      });
    }
  };
})();
