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
  BT.BATTERY = ['reaction', 'symbols', 'gonogo', 'nback', 'matrix', 'spatialspan', 'stroop', 'math'];

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

    const mins = Math.round(battery.length * 1.6);
    const body = el('div', null,
      el('h3', { text: 'Baseline assessment' }),
      el('p', { class: 'muted', style: 'margin-bottom:12px;', text:
        battery.length + ' short games, about ' + mins + ' minutes total. ' +
        'It maps your performance across all 7 cognitive domains and builds your training plan.' }),
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
