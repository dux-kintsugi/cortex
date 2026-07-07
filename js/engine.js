/* ============================================================
   Cortex — engine.js (v2)
   Task registry + full-screen task runner. Lifecycle:
   intro → countdown → [practice → rest →] run(ctx) → score →
   record → splash. v2 adds: interruption voiding, wake lock,
   assessment practice rounds, combo feedback, animated splash
   with PB moments and reliable-change gating, ability index,
   seeded rng (daily challenge), veteran fast-start intros.
   Contract: docs/ARCHITECTURE.md (v2 addendum).
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  /* ---------------- Registry ---------------- */
  BT.tasks = {};
  BT.taskOrder = [];

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

  const PRACTICE_MS = 18000;

  /* ---------------- Task runner ----------------
     BT.runTask({
       taskId, mode: 'assess'|'train'|'free'|'challenge',
       level, rngSeed,               // rngSeed => deterministic stimuli
       seq: {index, total} | null,
       onDone(result|null)           // null => quit or voided round
     })
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
    const practiceBanner = el('div', { class: 'practice-banner', text: 'PRACTICE — not scored', style: 'display:none;' });
    const stage = el('div', { class: 'task-stage' });
    const veil = el('div', { class: 'task-veil' });
    const layer = el('div', { class: 'task-layer' },
      el('div', { class: 'task-top' },
        quitBtn,
        el('div', { class: 't-title' }, el('span', { text: def.icon }), el('span', { text: def.name })),
        opts.seq ? el('div', { class: 't-seq', text: 'Task ' + opts.seq.index + ' of ' + opts.seq.total }) : null),
      el('div', { class: 'task-progress' }, bar),
      practiceBanner, statEl, stage, veil);

    document.body.appendChild(layer);
    document.body.classList.add('task-open');

    let ctx = null;
    let countdownIv = null;
    let autoStartId = null;
    let quitDlg = null;
    let wakeLock = null;
    let demoStop = null; // stops a def.introDemo animation
    let practiceDone = mode !== 'assess'; // only assessments get a warm-up
    let beganAtWall = 0;
    let phase = 'intro'; // intro | countdown | running | practice-rest | interrupted | done

    /* ----- wake lock (screen must not dim during watch-only stretches) ----- */
    function acquireWake() {
      if (!navigator.wakeLock || wakeLock) return;
      try {
        navigator.wakeLock.request('screen')
          .then(l => { wakeLock = l; l.addEventListener('release', () => { wakeLock = null; }); })
          .catch(() => {});
      } catch (e) {}
    }
    function releaseWake() {
      if (wakeLock) { try { wakeLock.release(); } catch (e) {} wakeLock = null; }
    }

    /* ----- interruption voiding ----- */
    function onVisChange() {
      if (document.hidden) {
        if (phase === 'running') interruptRound();
      } else if (phase === 'running') {
        acquireWake(); // iOS releases the sentinel on background; re-arm
      }
    }
    document.addEventListener('visibilitychange', onVisChange);

    function interruptRound(reason) {
      if (ctx) { ctx._abort(); ctx = null; }
      releaseWake();
      phase = 'interrupted';
      practiceBanner.style.display = 'none';
      veil.innerHTML = '';
      veil.style.display = 'flex';
      veil.appendChild(el('div', { class: 'task-intro' },
        el('div', { class: 'ti-icon', text: '⏸️' }),
        el('h2', { text: 'Round interrupted' }),
        el('p', { class: 'muted', style: 'margin-bottom:18px;', text:
          (reason || 'The app went to the background mid-round.') +
          ' Nothing was saved — interrupted rounds would corrupt your scores.' }),
        el('div', { class: 'btn-row', style: 'justify-content:center;' },
          el('button', { class: 'btn ghost', text: 'Quit', onclick: () => { teardownLayer(); if (opts.onDone) opts.onDone(null); } }),
          el('button', { class: 'btn primary', text: 'Restart round', onclick: () => startCountdown() }))));
    }

    function stopDemo() {
      if (demoStop) { try { demoStop(); } catch (e) {} demoStop = null; }
    }

    function teardownLayer() {
      document.removeEventListener('visibilitychange', onVisChange);
      stopDemo();
      if (autoStartId) { clearTimeout(autoStartId); autoStartId = null; }
      if (countdownIv) { clearInterval(countdownIv); countdownIv = null; }
      if (quitDlg) { quitDlg.close(); quitDlg = null; }
      releaseWake();
      if (ctx) ctx._abort();
      layer.remove();
      document.body.classList.remove('task-open');
    }

    quitBtn.addEventListener('click', () => {
      if (phase === 'done' || quitDlg) return;
      // Nothing to lose outside a live round — quit immediately.
      if (phase !== 'running') {
        teardownLayer();
        if (opts.onDone) opts.onDone(null);
        return;
      }
      quitDlg = BT.confirmDialog('Quit this game?', 'This round won’t be saved.', 'Quit', () => {
        quitDlg = null;
        if (phase === 'done') return; // round finished behind the dialog
        teardownLayer();
        if (opts.onDone) opts.onDone(null);
      });
      quitDlg.el.addEventListener('pointerdown', e => {
        if (e.target === quitDlg.el) quitDlg = null;
      });
      const cancelBtn = quitDlg.el.querySelector('.btn.ghost');
      if (cancelBtn) cancelBtn.addEventListener('click', () => { quitDlg = null; });
    });

    /* ----- instructions (full for newcomers, fast-start for veterans) ----- */
    function showIntro() {
      const domain = BT.DOMAINS[def.domain];
      const plays = BT.sessionsFor(def.id).length;
      const veteran = plays >= 3;
      veil.innerHTML = '';
      veil.style.display = 'flex';

      const pills = el('div', { class: 'ti-domain' },
        el('span', { class: 'pill', text: domain.icon + ' ' + domain.name }),
        ' ',
        el('span', { class: 'pill', text: mode === 'assess' ? 'Assessment' : mode === 'challenge' ? 'Challenge' : 'Level ' + level }));
      const howList = el('ul', null, def.howTo.map(line => el('li', { text: line })));
      const startBtn = el('button', {
        class: 'btn primary big', text: 'Start',
        onclick: () => {
          if (autoStartId) { clearTimeout(autoStartId); autoStartId = null; }
          BT.unlockAudio(); startCountdown();
        },
      });

      // Optional live demo (def.introDemo(container, level) -> stop fn)
      function mountDemo(parent, before) {
        if (!def.introDemo) return;
        const box = el('div', { class: 'intro-demo' });
        parent.insertBefore(box, before || null);
        try { demoStop = def.introDemo(box, level) || null; } catch (e) { box.remove(); }
      }

      if (!veteran) {
        const intro = el('div', { class: 'task-intro' },
          el('div', { class: 'ti-icon', text: def.icon }),
          el('h2', { text: def.name }), pills, howList);
        mountDemo(intro);
        intro.appendChild(startBtn);
        veil.appendChild(intro);
        return;
      }

      // Veteran fast-start: compact card, auto-advances; "How to play" pauses it.
      howList.style.display = 'none';
      const autoNote = el('div', { class: 'small muted', style: 'margin-top:12px;', text: 'Starting…' });
      const howLink = el('button', {
        class: 'btn ghost', text: 'How to play', style: 'margin-right:10px;',
        onclick: () => {
          if (autoStartId) { clearTimeout(autoStartId); autoStartId = null; }
          autoNote.style.display = 'none';
          howList.style.display = 'block';
          howLink.style.display = 'none';
          mountDemo(howList.parentNode, howList.nextSibling);
        },
      });
      veil.appendChild(el('div', { class: 'task-intro' },
        el('div', { class: 'ti-icon', text: def.icon }),
        el('h2', { text: def.name }), pills,
        el('p', { class: 'muted', style: 'margin-bottom:16px;', text: def.tagline }),
        howList,
        el('div', null, howLink, startBtn),
        autoNote));
      autoStartId = setTimeout(() => {
        autoStartId = null;
        if (phase === 'intro') { BT.unlockAudio(); startCountdown(); }
      }, 1400);
    }

    /* ----- countdown ----- */
    function startCountdown() {
      phase = 'countdown';
      stopDemo();
      veil.innerHTML = '';
      veil.style.display = 'flex';
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

    /* ----- run (practice first during assessments) ----- */
    function begin() {
      phase = 'running';
      stage.innerHTML = '';
      acquireWake();
      const isPractice = !practiceDone;
      practiceBanner.style.display = isPractice ? 'block' : 'none';
      if (!isPractice) beganAtWall = Date.now();
      ctx = makeCtx(isPractice);
      try {
        def.run(ctx);
      } catch (e) {
        console.error('[Cortex] task crashed:', def.id, e);
        ctx._abort();
        teardownLayer();
        if (opts.onDone) opts.onDone(null);
      }
    }

    function practiceComplete() {
      phase = 'practice-rest';
      practiceBanner.style.display = 'none';
      releaseWake();
      veil.innerHTML = '';
      veil.style.display = 'flex';
      veil.appendChild(el('div', { class: 'task-intro' },
        el('div', { class: 'ti-icon', text: '✓' }),
        el('h2', { text: 'Warm-up done' }),
        el('p', { class: 'muted', style: 'margin-bottom:18px;', text:
          'That one didn’t count — it was just to get your hands on the controls. The real round starts now.' }),
        el('button', {
          class: 'btn primary big', text: 'Start the real round',
          onclick: () => { practiceDone = true; startCountdown(); },
        })));
    }

    /* ----- ctx ----- */
    function makeCtx(isPractice) {
      const cleanups = [];
      const timers = new Set();
      let finished = false;
      let combo = 0;

      function teardown() {
        timers.forEach(id => { clearTimeout(id); clearInterval(id); });
        timers.clear();
        for (const fn of cleanups) { try { fn(); } catch (e) {} }
        cleanups.length = 0;
      }

      function comboFloat(text) {
        const f = el('div', { class: 'combo-float', text });
        stage.appendChild(f);
        setTimeout(() => f.remove(), 1100); // element removal is safe post-teardown
      }

      const c = {
        mode, level,
        durationMs: isPractice ? Math.min(PRACTICE_MS, durationMs) : durationMs,
        practice: isPractice,
        container: stage,
        rng: opts.rngSeed != null ? BT.rng((opts.rngSeed >>> 0) + (isPractice ? 999 : 0)) : Math.random,
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
          void stage.offsetWidth;
          stage.classList.add(kind === 'good' ? 'flash-good' : 'flash-bad');
        },
        // Combo-aware feedback: rising pitch per consecutive correct, floaters at milestones.
        feedback(correct) {
          if (correct) {
            combo++;
            BT.beep('good', combo - 1);
            c.flash('good');
            if (combo === 5 || combo === 10 || combo === 15 || combo === 20) comboFloat('×' + combo + ' streak');
          } else {
            combo = 0;
            BT.beep('bad');
            c.flash('bad');
          }
        },

        get running() { return !finished; },

        finish(summary) {
          if (finished) return;
          finished = true;
          teardown();
          if (isPractice) practiceComplete();
          else complete(summary || {});
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
      // Wall-clock overrun = the round straddled an interruption that the
      // visibility events missed. Deliberately lenient (+3 min): span games
      // played slowly and carefully must never be voided as "interrupted".
      if (Date.now() - beganAtWall > durationMs + 180000) {
        interruptRound('This round took far longer than the game allows — it was probably interrupted.');
        return;
      }
      phase = 'done';
      if (quitDlg) { quitDlg.close(); quitDlg = null; }
      releaseWake();

      const score = BT.stats.scoreFromNorms(summary.primary, def.norms);
      const prevScore = BT.lastScore(def.id);
      const prevBest = BT.bestScore(def.id);
      const history = BT.state.sessions
        .filter(s => s.taskId === def.id && s.score != null &&
          (mode === 'assess' ? s.mode === 'assess' : s.mode !== 'assess'))
        .slice(-5).map(s => s.score);

      // Split-half noise band (SEM in score points)
      let sem = null, band = null;
      const m = summary.metrics || {};
      if (m.half1 != null && m.half2 != null) {
        const s1 = BT.stats.scoreFromNorms(m.half1, def.norms);
        const s2 = BT.stats.scoreFromNorms(m.half2, def.norms);
        if (s1 != null && s2 != null) {
          sem = Math.abs(s1 - s2) / 2;
          if (score != null) band = [BT.clamp(Math.round(score - sem), 1, 99), BT.clamp(Math.round(score + sem), 1, 99)];
        }
      }

      const ability = level + BT.clamp(summary.levelProgress != null ? summary.levelProgress : 0.5, 0, 1);

      const rec = {
        ts: Date.now(), taskId: def.id, mode, level,
        score, primary: summary.primary, ability: Math.round(ability * 10) / 10,
        band, sem: sem == null ? null : Math.round(sem * 10) / 10,
        metrics: m,
      };

      let leveledUp = false, leveledDown = false;
      if (mode === 'train' || mode === 'free') {
        const cur = BT.taskLevel(def.id);
        if (level === cur) { // free play at a mismatched level must not grind the real level
          let next = cur;
          if (summary.advance === 'up' && cur < def.maxLevel) { next = cur + 1; leveledUp = true; }
          else if (summary.advance === 'down' && cur > 1) { next = cur - 1; leveledDown = true; }
          BT.state.levels[def.id] = next;
        }
      }
      BT.recordSession(rec);
      if (mode !== 'assess' && BT.maybeMarkDayDone) BT.maybeMarkDayDone();
      const earned = BT.checkAchievements ? BT.checkAchievements() : [];
      BT.beep('end');

      const result = { taskId: def.id, mode, level, score, primary: summary.primary, ability, summary, leveledUp };
      showSplash({ score, prevScore, prevBest, history, sem, summary, leveledUp, leveledDown, earned, ability, result });
    }

    function showSplash(o) {
      const score = o.score, s = score == null ? 0 : score;
      const isPB = score != null && o.prevBest != null && score > o.prevBest;

      const ringInner = el('div', { class: 's', text: '0' });
      const ring = el('div', { class: 'score-ring' },
        el('div', { class: 'inner' }, ringInner, el('div', { class: 'of', text: 'SCORE / 100' })));

      // Reliable-change gating: only claim ▲/▼ when the move beats measurement noise.
      let deltaEl = null;
      if (score != null && o.prevScore != null && o.history.length >= 2) {
        const med = BT.median(o.history);
        const gate = o.sem != null ? 2.33 * o.sem : 8; // 90% RCI, or a cautious default
        if (Math.abs(score - med) < gate) {
          deltaEl = el('div', { class: 'r-delta', style: 'color:var(--muted);', text: '— steady: within your typical range' });
        } else {
          const d = score - o.prevScore;
          deltaEl = el('div', { class: 'r-delta ' + (d > 0 ? 'up' : d < 0 ? 'down' : '') },
            d > 0 ? '▲ +' + d + ' vs last time' : d < 0 ? '▼ ' + d + ' vs last time' : '— same as last time');
        }
      } else if (score != null && o.prevScore != null) {
        const d = score - o.prevScore;
        deltaEl = el('div', { class: 'r-delta ' + (d > 0 ? 'up' : d < 0 ? 'down' : '') },
          d > 0 ? '▲ +' + d + ' vs last time' : d < 0 ? '▼ ' + d + ' vs last time' : '— same as last time');
      }

      const primaryText = def.fmtPrimary ? def.fmtPrimary(o.summary) : null;
      const pbBanner = isPB ? el('div', { class: 'pb-banner', text: '🏆 New personal best!' }) : null;

      veil.innerHTML = '';
      veil.style.display = 'flex';
      veil.appendChild(el('div', { class: 'result-box' },
        pbBanner,
        ring,
        primaryText ? el('div', { class: 'r-primary', text: primaryText }) : null,
        o.sem != null && score != null
          ? el('div', { class: 'small muted', style: 'margin-bottom:6px;', text: '±' + Math.ceil(o.sem) + ' typical wobble on one round' })
          : null,
        deltaEl,
        mode !== 'assess'
          ? el('div', { class: 'small muted', style: 'margin-bottom:10px;', text: 'Ability ' + o.ability.toFixed(1) + ' / ' + (def.maxLevel + 1) })
          : null,
        o.leveledUp ? el('div', { class: 'r-level', text: '⬆ Level up! Next: level ' + BT.state.levels[def.id] }) : null,
        o.leveledDown ? el('div', { class: 'r-level', text: '⬇ Dropping to level ' + BT.state.levels[def.id] + ' to rebuild' }) : null,
        o.earned.length
          ? el('div', { style: 'margin-bottom:12px;' },
              o.earned.map(a => el('div', { class: 'pill focus', style: 'margin:2px;', text: (a.icon || '🏅') + ' ' + a.name })))
          : null,
        el('button', {
          class: 'btn primary big',
          text: opts.seq && opts.seq.index < opts.seq.total ? 'Next task →' : 'Continue',
          onclick: () => { teardownLayer(); if (opts.onDone) opts.onDone(o.result); },
        })));

      // Animate: ring sweep + count-up over ~900ms with rising ticks.
      const t0 = performance.now();
      let lastTick = 0;
      (function anim(now) {
        if (!ring.isConnected) return;
        const t = Math.min((now - t0) / 900, 1);
        const e = 1 - Math.pow(1 - t, 3);
        const deg = Math.round(s * 3.6 * e);
        ring.style.background = 'conic-gradient(var(--accent) 0deg, var(--accent-2) ' + deg + 'deg, var(--panel-2) ' + deg + 'deg 360deg)';
        ringInner.textContent = score == null ? '—' : String(Math.round(s * e));
        if (e - lastTick > 0.25 && t < 1) { lastTick = e; BT.beep('tick'); }
        if (t < 1) requestAnimationFrame(anim);
        else {
          ringInner.textContent = score == null ? '—' : String(score);
          if (isPB) { BT.beep('best'); ring.classList.add('pb-pulse'); }
        }
      })(t0);
    }

    showIntro();
  };
})();
