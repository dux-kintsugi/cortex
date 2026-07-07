/* ============================================================
   Cortex — assessment.js
   The baseline battery: 8 short tasks covering all 7 domains.
   Runs tasks sequentially in 'assess' mode at fixed difficulty,
   converts task scores → domain scores, saves the assessment,
   and regenerates the training plan.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  // Order matters: starts light (reaction), alternates load types.
  BT.BATTERY = ['reaction', 'symbols', 'gonogo', 'nback', 'matrix', 'spatialspan', 'wordpairs', 'stroop', 'math'];

  /* The comparison anchor: first assessment is 'provisional' (novelty deflates it);
     once a second exists, compare against that instead. */
  BT.anchorAssessment = function () {
    const list = BT.state.assessments;
    if (!list.length) return null;
    return list.length > 1 && list[0].provisional ? list[1] : list[0];
  };

  BT.timeBlockOfHour = function (hour) {
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  };

  BT.computeDomainScores = function (taskScores) {
    const out = {};
    for (const dk of BT.DOMAIN_KEYS) {
      const vals = [];
      for (const tid of Object.keys(taskScores)) {
        const def = BT.tasks[tid];
        if (def && def.domain === dk && taskScores[tid] != null) vals.push(taskScores[tid]);
      }
      out[dk] = vals.length ? Math.round(BT.mean(vals)) : null;
    }
    return out;
  };

  /* Run the whole battery. onDone(assessment|null) — null if abandoned. */
  BT.runAssessment = function (onDone) {
    const battery = BT.BATTERY.filter(id => BT.tasks[id]);
    if (!battery.length) { console.error('[Cortex] no battery tasks registered'); return; }

    const mins = Math.round(battery.length * 2);
    // circadian fairness: nudge re-assessments toward the baseline's time of day
    let todNote = null;
    const prev = BT.latestAssessment();
    if (prev) {
      const baseBlock = BT.timeBlockOfHour(new Date(prev.ts).getHours());
      const nowBlock = BT.timeBlockOfHour(new Date().getHours());
      if (baseBlock !== nowBlock) {
        todNote = el('div', { class: 'notice', style: 'margin-bottom:12px;', text:
          '⏰ Your last assessment was taken in the ' + baseBlock + ' — for a fair comparison, ' +
          'consider re-assessing in the ' + baseBlock + ' too. Time of day genuinely moves these scores.' });
      }
    }
    const body = el('div', null,
      el('h3', { text: prev ? 'Re-assessment' : 'Baseline assessment' }),
      el('p', { class: 'muted', style: 'margin-bottom:12px;', text:
        battery.length + ' short games, about ' + mins + ' minutes total (each starts with a short unscored warm-up). ' +
        'It maps your performance across all ' + BT.DOMAIN_KEYS.length + ' cognitive domains and builds your training plan.' }),
      todNote,
      el('div', { style: 'margin-bottom:14px;' },
        battery.map((id, i) => {
          const t = BT.tasks[id];
          return el('div', { class: 'today-item' },
            el('span', { class: 't-icon', text: t.icon }),
            el('span', { class: 't-name', text: t.name }),
            el('span', { class: 'pill', text: BT.DOMAINS[t.domain].name }));
        })),
      el('div', { class: 'notice', text:
        'Tip: find a quiet spot, sit comfortably, and give it your honest best — the plan is only as good as the baseline.' }),
      el('div', { class: 'btn-row' },
        el('button', { class: 'btn ghost', text: 'Not now', onclick: () => { ov.close(); if (onDone) onDone(null); } }),
        el('button', { class: 'btn primary', text: "Let's go", onclick: () => { ov.close(); runFrom(0); } })));
    const ov = BT.overlay(body, { dismissible: false });

    const taskScores = {};

    function runFrom(i) {
      if (i >= battery.length) return finish();
      BT.runTask({
        taskId: battery[i],
        mode: 'assess',
        seq: { index: i + 1, total: battery.length },
        onDone: res => {
          if (!res) { // user quit mid-battery — offer resume or stop
            const dlg = el('div', null,
              el('h3', { text: 'Stop the assessment?' }),
              el('p', { class: 'muted', text: 'Completed tasks are kept as practice, but no baseline will be saved.' }),
              el('div', { class: 'btn-row' },
                el('button', { class: 'btn ghost', text: 'Resume', onclick: () => { dov.close(); runFrom(i); } }),
                el('button', { class: 'btn danger', text: 'Stop', onclick: () => { dov.close(); if (onDone) onDone(null); } })));
            const dov = BT.overlay(dlg, { dismissible: false });
            return;
          }
          taskScores[battery[i]] = res.score;
          runFrom(i + 1);
        },
      });
    }

    function finish() {
      const domainScores = BT.computeDomainScores(taskScores);
      const assessment = { ts: Date.now(), taskScores, domainScores };
      // First-ever battery reads low (task novelty) — mark it provisional so
      // later comparisons anchor on the confirmation baseline instead.
      if (!BT.state.assessments.length) assessment.provisional = true;
      BT.state.assessments.push(assessment);
      BT.generatePlan(domainScores);
      BT.save();
      if (onDone) onDone(assessment);
    }
  };

  /* Days since last assessment (null if never) */
  BT.daysSinceAssessment = function () {
    const a = BT.latestAssessment();
    if (!a) return null;
    return BT.daysBetween(BT.dayKey(a.ts), BT.dayKey());
  };
})();
