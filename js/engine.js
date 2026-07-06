/* ============================================================
   Cortex — engine.js
   Task registry + full-screen task runner. Owns the lifecycle:
   instructions → countdown → run(ctx) → score → record → splash.
   The ctx API given to each task is documented in
   docs/ARCHITECTURE.md — tasks must ONLY use ctx helpers for
   timers/listeners so the engine can clean everything up.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  /* ---------------- Registry ---------------- */
  BT.tasks = {};      // id -> definition
  BT.taskOrder = [];  // registration order (script order in index.html)

  BT.registerTask = function (def) {
    const required = ['id', 'name', 'domain', 'norms', 'run', 'howTo', 'icon', 'tagline'];
    for (const k of required) {
      if (def[k] == null) console.error('[Cortex] task "' + (def.id || '?') + '" missing field: ' + k);
    }
    if (!BT.DOMAINS[def.domain]) console.error('[Cortex] task "' + def.id + '" has unknown domain: ' + def.domain);
    def.maxLevel = def.maxLevel || 10;
    def.assessLevel = def.assessLevel || 3;
    def.startLevel = def.startLevel || def.assessLevel;
    BT.tasks[def.id] = def;
    BT.taskOrder.push(def.id);
  };

  BT.tasksByDomain = domain =>
    BT.taskOrder.map(id => BT.tasks[id]).filter(t => t.domain === domain);

  BT.taskLevel = function (taskId) {
    const def = BT.tasks[taskId];
    return BT.state.levels[taskId] || (def ? def.startLevel : 1);
  };

  /* ---------------- Task runner ----------------
     BT.runTask({
       taskId, mode: 'assess'|'train'|'free',
       level,                      // optional; defaults per mode
       seq: {index, total} | null, // battery position indicator
       onDone(result|null)         // null => user quit
     })
     result: { taskId, mode, level, score, primary, summary, leveledUp }
  ------------------------------------------------- */
  BT.runTask = function (opts) {
    const def = BT.tasks[opts.taskId];
    if (!def) { console.error('[Cortex] unknown task', opts.taskId); if (opts.onDone) opts.onDone(null); return; }

    const mode = opts.mode || 'free';
    const level = BT.clamp(
      opts.level != null ? opts.level
        : mode === 'assess' ? def.assessLevel
        : BT.taskLevel(def.id),
      1, def.maxLevel);
    const durationMs = mode === 'assess'
      ? (def.assessDurationMs || 75000)
      : (def.trainDurationMs || def.assessDurationMs || 90000);

    /* ----- layer skeleton ----- */
    const quitBtn = el('button', { class: 't-quit', text: '✕', 'aria-label': 'Quit' });
    const bar = el('div', { class: 'bar' });
    const statEl = el('div', { class: 'task-stat' });
    const stage = el('div', { class: 'task-stage' });
    const veil = el('div', { class: 'task-veil' });
    const layer = el('div', { class: 'task-layer' },
      el('div', { class: 'task-top' },
        quitBtn,
        el('div', { class: 't-title' }, el('span', { text: def.icon }), el('span', { text: def.name })),
        opts.seq ? el('div', { class: 't-seq', text: 'Task ' + opts.seq.index + ' of ' + opts.seq.total }) : null),
      el('div', { class: 'task-progress' }, bar),
      statEl, stage, veil);

    document.body.appendChild(layer);
    document.body.classList.add('task-open');

    let ctx = null;
    let countdownIv = null;
    let quitDlg = null;
    let phase = 'intro'; // intro | countdown | running | done

    function teardownLayer() {
      if (countdownIv) { clearInterval(countdownIv); countdownIv = null; }
      if (quitDlg) { quitDlg.close(); quitDlg = null; }
      if (ctx) ctx._abort();
      layer.remove();
      document.body.classList.remove('task-open');
    }

    quitBtn.addEventListener('click', () => {
      if (phase === 'done' || quitDlg) return;
      // Nothing to lose before the game starts — quit immediately.
      if (phase === 'intro' || phase === 'countdown') {
        teardownLayer();
        if (opts.onDone) opts.onDone(null);
        return;
      }
      quitDlg = BT.confirmDialog('Quit this game?', 'This round won’t be saved.', 'Quit', () => {
        quitDlg = null;
        // The round may have finished behind the dialog — quitting is then moot.
        if (phase === 'done') return;
        teardownLayer();
        if (opts.onDone) opts.onDone(null);
      });
      // Cancel (or backdrop) path: allow re-opening the dialog later.
      quitDlg.el.addEventListener('pointerdown', e => {
        if (e.target === quitDlg.el) quitDlg = null;
      });
      const cancelBtn = quitDlg.el.querySelector('.btn.ghost');
      if (cancelBtn) cancelBtn.addEventListener('click', () => { quitDlg = null; });
    });

    /* ----- instructions ----- */
    function showIntro() {
      const domain = BT.DOMAINS[def.domain];
      veil.innerHTML = '';
      veil.appendChild(el('div', { class: 'task-intro' },
        el('div', { class: 'ti-icon', text: def.icon }),
        el('h2', { text: def.name }),
        el('div', { class: 'ti-domain' },
          el('span', { class: 'pill', text: domain.icon + ' ' + domain.name }),
          ' ',
          el('span', { class: 'pill', text: mode === 'assess' ? 'Assessment' : 'Level ' + level })),
        el('ul', null, def.howTo.map(line => el('li', { text: line }))),
        el('button', {
          class: 'btn primary big', text: 'Start',
          onclick: () => { BT.unlockAudio(); startCountdown(); },
        })));
    }

    /* ----- countdown ----- */
    function startCountdown() {
      phase = 'countdown';
      veil.innerHTML = '';
      const num = el('div', { class: 'countdown', text: '3' });
      veil.appendChild(num);
      let n = 3;
      BT.beep('tick');
      countdownIv = setInterval(() => {
        n--;
        if (n > 0) { num.textContent = String(n); BT.beep('tick'); return; }
        clearInterval(countdownIv);
        countdownIv = null;
        veil.style.display = 'none';
        BT.beep('go');
        begin();
      }, 800);
    }

    /* ----- ctx + run ----- */
    function begin() {
      phase = 'running';
      stage.innerHTML = '';
      ctx = makeCtx();
      try {
        def.run(ctx);
      } catch (e) {
        console.error('[Cortex] task crashed:', def.id, e);
        ctx._abort();
        teardownLayer();
        if (opts.onDone) opts.onDone(null);
      }
    }

    function makeCtx() {
      const cleanups = [];
      const timers = new Set();
      let finished = false;

      function teardown() {
        timers.forEach(id => { clearTimeout(id); clearInterval(id); });
        timers.clear();
        for (const fn of cleanups) { try { fn(); } catch (e) {} }
        cleanups.length = 0;
      }

      const c = {
        mode, level, durationMs,
        container: stage,
        rng: Math.random,
        now: () => performance.now(),

        timeout(fn, ms) {
          const id = setTimeout(() => { timers.delete(id); fn(); }, ms);
          timers.add(id); return id;
        },
        interval(fn, ms) {
          const id = setInterval(fn, ms);
          timers.add(id); return id;
        },
        clearTimer(id) { clearTimeout(id); clearInterval(id); timers.delete(id); },

        listen(target, type, fn, o) {
          target.addEventListener(type, fn, o);
          cleanups.push(() => target.removeEventListener(type, fn, o));
        },
        keys(map) {
          c.listen(window, 'keydown', e => {
            if (e.repeat) return;
            const fn = map[e.key] != null ? map[e.key] : map[e.code];
            if (fn) { e.preventDefault(); fn(e); }
          });
        },
        onCleanup(fn) { cleanups.push(fn); },

        hud: {
          progress(f) { bar.style.width = (BT.clamp(f, 0, 1) * 100) + '%'; },
          stat(t) { statEl.textContent = t; },
        },
        beep: BT.beep,
        flash(kind) {
          stage.classList.remove('flash-good', 'flash-bad');
          void stage.offsetWidth; // restart animation
          stage.classList.add(kind === 'good' ? 'flash-good' : 'flash-bad');
        },

        get running() { return !finished; },

        finish(summary) {
          if (finished) return;
          finished = true;
          teardown();
          complete(summary || {});
        },
        _abort() {
          if (finished) return;
          finished = true;
          teardown();
        },
      };
      return c;
    }

    /* ----- scoring, recording, splash ----- */
    function complete(summary) {
      phase = 'done';
      if (quitDlg) { quitDlg.close(); quitDlg = null; }
      const score = BT.stats.scoreFromNorms(summary.primary, def.norms);
      const prevScore = BT.lastScore(def.id);

      const rec = {
        ts: Date.now(), taskId: def.id, mode, level,
        score, primary: summary.primary,
        metrics: summary.metrics || {},
      };

      let leveledUp = false, leveledDown = false;
      if (mode !== 'assess') {
        const cur = BT.taskLevel(def.id);
        // Only adapt when the round was played AT the current training level —
        // free-playing an easy level must not grind the real level up.
        if (level === cur) {
          let next = cur;
          if (summary.advance === 'up' && cur < def.maxLevel) { next = cur + 1; leveledUp = true; }
          else if (summary.advance === 'down' && cur > 1) { next = cur - 1; leveledDown = true; }
          BT.state.levels[def.id] = next;
        }
      }
      BT.recordSession(rec);
      // A full day's games may have just been completed via any mode (incl. free play)
      if (mode !== 'assess' && BT.maybeMarkDayDone) BT.maybeMarkDayDone();
      BT.beep('end');

      const result = { taskId: def.id, mode, level, score, primary: summary.primary, summary, leveledUp };
      showSplash(score, prevScore, summary, leveledUp, leveledDown, result);
    }

    function showSplash(score, prevScore, summary, leveledUp, leveledDown, result) {
      const s = score == null ? 0 : score;
      const deg = Math.round(s * 3.6);
      const ring = el('div', {
        class: 'score-ring',
        style: 'background: conic-gradient(var(--accent) 0deg, var(--accent-2) ' + deg + 'deg, var(--panel-2) ' + deg + 'deg 360deg);',
      }, el('div', { class: 'inner' },
        el('div', { class: 's', text: score == null ? '—' : String(score) }),
        el('div', { class: 'of', text: 'SCORE / 100' })));

      let deltaEl = null;
      if (score != null && prevScore != null) {
        const d = score - prevScore;
        deltaEl = el('div', { class: 'r-delta ' + (d > 0 ? 'up' : d < 0 ? 'down' : '') },
          d > 0 ? '▲ +' + d + ' vs last time' : d < 0 ? '▼ ' + d + ' vs last time' : '— same as last time');
      }

      const primaryText = def.fmtPrimary ? def.fmtPrimary(summary) : null;

      veil.innerHTML = '';
      veil.style.display = 'flex';
      veil.appendChild(el('div', { class: 'result-box' },
        ring,
        primaryText ? el('div', { class: 'r-primary', text: primaryText }) : null,
        deltaEl,
        leveledUp ? el('div', { class: 'r-level', text: '⬆ Level up! Next: level ' + BT.state.levels[def.id] }) : null,
        leveledDown ? el('div', { class: 'r-level', text: '⬇ Dropping to level ' + BT.state.levels[def.id] + ' to rebuild' }) : null,
        el('button', {
          class: 'btn primary big',
          text: opts.seq && opts.seq.index < opts.seq.total ? 'Next task →' : 'Continue',
          onclick: () => { teardownLayer(); if (opts.onDone) opts.onDone(result); },
        })));
    }

    showIntro();
  };
})();
