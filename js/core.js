/* ============================================================
   Cortex — core.js
   Namespace, cognitive domains, persistent state, DOM helpers,
   RNG, stats (norm-based scoring), audio. Loaded first; every
   other file hangs off window.BT.
   ============================================================ */
(function () {
  'use strict';

  const BT = (window.BT = {});
  BT.VERSION = 1;
  const STORE_KEY = 'cortex_state_v1';

  /* ---------------- Cognitive domains ---------------- */
  BT.DOMAINS = {
    speed:         { name: 'Processing Speed',  icon: '⚡', blurb: 'How quickly you take in information and react to it.' },
    attention:     { name: 'Attention',         icon: '🎯', blurb: 'Sustaining focus, scanning efficiently, resisting distraction.' },
    workingMemory: { name: 'Working Memory',    icon: '🧮', blurb: 'Holding and juggling information in mind while using it.' },
    memory:        { name: 'Visual Memory',     icon: '🖼️', blurb: 'Encoding and recalling what you just saw.' },
    visuospatial:  { name: 'Visuospatial',      icon: '🧊', blurb: 'Reasoning about shapes, space and locations.' },
    executive:     { name: 'Executive Control', icon: '🎛️', blurb: 'Inhibiting impulses and switching flexibly between rules.' },
    math:          { name: 'Number Fluency',    icon: '➗', blurb: 'Fast, accurate mental arithmetic.' },
  };
  BT.DOMAIN_KEYS = Object.keys(BT.DOMAINS);

  /* ---------------- DOM helper ---------------- */
  // el('div', {class:'card', onclick:fn, text:'hi'}, child1, child2, [more])
  BT.el = function el(tag, attrs) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k of Object.keys(attrs)) {
        const v = attrs[k];
        if (v == null) continue;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else if (k === 'html') node.innerHTML = v;
        else if (k === 'style') node.style.cssText = v;
        else if (k === 'dataset') Object.assign(node.dataset, v);
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v);
      }
    }
    for (let i = 2; i < arguments.length; i++) {
      const c = arguments[i];
      appendChild(node, c);
    }
    return node;
  };
  function appendChild(node, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(x => appendChild(node, x)); return; }
    node.appendChild(typeof c === 'string' || typeof c === 'number'
      ? document.createTextNode(String(c)) : c);
  }

  /* ---------------- Random ---------------- */
  BT.hashStr = function (s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  };
  // mulberry32 — deterministic when seeded (used for "same plan all day")
  BT.rng = function (seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  BT.shuffle = function (arr, rnd) {
    rnd = rnd || Math.random;
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };
  BT.pick = (arr, rnd) => arr[Math.floor((rnd || Math.random)() * arr.length)];

  /* ---------------- Small utils ---------------- */
  BT.clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
  BT.mean = a => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
  BT.median = a => {
    if (!a.length) return 0;
    const s = a.slice().sort((x, y) => x - y);
    const m = s.length >> 1;
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  };
  BT.round1 = x => Math.round(x * 10) / 10;

  /* ---------------- Dates ---------------- */
  BT.dayKey = function (ts) {
    const d = ts != null ? new Date(ts) : new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') +
      '-' + String(d.getDate()).padStart(2, '0');
  };
  BT.daysBetween = (k1, k2) => Math.round((new Date(k2 + 'T12:00') - new Date(k1 + 'T12:00')) / 86400000);
  BT.fmtDate = ts => new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  /* ---------------- Stats ---------------- */
  // Abramowitz–Stegun erf approximation (max err ~1.5e-7)
  function erf(x) {
    const sign = x < 0 ? -1 : 1; x = Math.abs(x);
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741,
      a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const t = 1 / (1 + p * x);
    const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }
  const normCdf = (x, mean, sd) => 0.5 * (1 + erf((x - mean) / (sd * Math.SQRT2)));
  BT.stats = {
    erf, normCdf,
    // Map a raw task metric onto a 1–99 percentile-style score against rough
    // reference values for a web/touch context. These are coarse estimates,
    // NOT clinical norms — in-app copy says as much.
    scoreFromNorms(value, norms) {
      if (value == null || !isFinite(value)) return null;
      let p = normCdf(value, norms.mean, norms.sd);
      if (norms.higherIsBetter === false) p = 1 - p;
      return BT.clamp(Math.round(p * 100), 1, 99);
    },
    // Inverse: raw value for a given score (used by the debug data seeder)
    valueForScore(score, norms) {
      // crude inverse-CDF via bisection — plenty for seeding fake data
      let p = BT.clamp(score / 100, 0.01, 0.99);
      if (norms.higherIsBetter === false) p = 1 - p;
      let lo = norms.mean - 4 * norms.sd, hi = norms.mean + 4 * norms.sd;
      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        if (normCdf(mid, norms.mean, norms.sd) < p) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    },
  };

  /* ---------------- Persistent state ---------------- */
  function defaults() {
    return {
      version: BT.VERSION,
      createdAt: Date.now(),
      settings: { sound: true },
      levels: {},        // taskId -> current training level (int)
      sessions: [],      // {ts, taskId, mode, level, score, primary, metrics}
      assessments: [],   // {ts, taskScores:{taskId:score}, domainScores:{domain:score}}
      plan: null,        // {generatedAt, weights:{domain:w}, focus:[domainKeys]}
      streak: { count: 0, lastDay: null },
      doneDays: {},      // dayKey -> true (full training session completed)
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        // shallow-merge over defaults so new fields appear after upgrades
        return Object.assign(defaults(), s, {
          settings: Object.assign({ sound: true }, s.settings),
          streak: Object.assign({ count: 0, lastDay: null }, s.streak),
        });
      }
    } catch (e) { /* corrupted or blocked storage — start fresh */ }
    return defaults();
  }

  BT.state = loadState();

  let warnedStorage = false;
  BT.save = function () {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(BT.state));
    } catch (e) {
      // Progress lives only in memory this session (private mode / quota).
      if (!warnedStorage) {
        warnedStorage = true;
        console.warn('[Cortex] localStorage unavailable — progress won’t survive a reload.');
      }
    }
  };

  BT.resetAll = function () {
    BT.state = defaults();
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    BT.save();
  };

  BT.exportJSON = () => JSON.stringify(BT.state, null, 2);
  BT.importJSON = function (text) {
    const s = JSON.parse(text); // throws on bad JSON — caller handles
    if (!s || typeof s !== 'object' || !Array.isArray(s.sessions)) {
      throw new Error('Not a Cortex backup file');
    }
    BT.state = Object.assign(defaults(), s);
    BT.save();
  };

  const MAX_SESSIONS = 5000;
  BT.recordSession = function (rec) {
    BT.state.sessions.push(rec);
    if (BT.state.sessions.length > MAX_SESSIONS) {
      BT.state.sessions.splice(0, BT.state.sessions.length - MAX_SESSIONS);
    }
    BT.save();
  };

  /* ---------------- Session queries ---------------- */
  BT.sessionsFor = taskId => BT.state.sessions.filter(s => s.taskId === taskId);
  BT.bestScore = function (taskId) {
    let best = null;
    for (const s of BT.state.sessions) {
      if (s.taskId === taskId && s.score != null && (best == null || s.score > best)) best = s.score;
    }
    return best;
  };
  BT.lastScore = function (taskId) {
    for (let i = BT.state.sessions.length - 1; i >= 0; i--) {
      if (BT.state.sessions[i].taskId === taskId && BT.state.sessions[i].score != null) {
        return BT.state.sessions[i].score;
      }
    }
    return null;
  };
  BT.latestAssessment = () =>
    BT.state.assessments.length ? BT.state.assessments[BT.state.assessments.length - 1] : null;

  /* ---------------- Overlay / dialog helpers ---------------- */
  BT.overlay = function (contentEl, opts) {
    opts = opts || {};
    const wrap = BT.el('div', { class: 'overlay' },
      BT.el('div', { class: 'overlay-card' }, contentEl));
    function close() { wrap.remove(); }
    if (opts.dismissible !== false) {
      wrap.addEventListener('pointerdown', e => { if (e.target === wrap) close(); });
    }
    document.body.appendChild(wrap);
    return { el: wrap, close };
  };

  BT.confirmDialog = function (title, msg, yesLabel, onYes) {
    const body = BT.el('div', null,
      BT.el('h3', { text: title }),
      BT.el('p', { class: 'muted', text: msg }),
      BT.el('div', { class: 'btn-row' },
        BT.el('button', { class: 'btn ghost', text: 'Cancel', onclick: () => ov.close() }),
        BT.el('button', {
          class: 'btn danger', text: yesLabel,
          onclick: () => { ov.close(); onYes(); },
        })));
    const ov = BT.overlay(body, { dismissible: true });
    return ov;
  };

  /* ---------------- Audio (WebAudio beeps, no assets) ---------------- */
  let actx = null;
  function ac() {
    if (!actx) {
      try { actx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return null; }
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  BT.unlockAudio = () => { ac(); }; // call on a user gesture

  function tone(freq, dur, type, gain, when) {
    const c = ac(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    const g0 = gain == null ? 0.07 : gain;
    o.connect(g); g.connect(c.destination);
    const t = c.currentTime + (when || 0);
    g.gain.setValueAtTime(g0, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  }

  BT.beep = function (kind) {
    if (!BT.state.settings.sound) return;
    switch (kind) {
      case 'go':   tone(600, 0.12); break;
      case 'good': tone(660, 0.09); tone(880, 0.12, 'sine', 0.06, 0.07); break;
      case 'bad':  tone(160, 0.18, 'square', 0.045); break;
      case 'tick': tone(880, 0.05, 'sine', 0.035); break;
      case 'end':  tone(523, 0.12); tone(659, 0.12, 'sine', 0.07, 0.10); tone(784, 0.22, 'sine', 0.07, 0.20); break;
    }
  };
})();
