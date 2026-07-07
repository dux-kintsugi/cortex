'use strict';
// Legō — spaced-repetition review view.

(function () {
  const L = window.Lego;

  function fmtWhen(ts) {
    const diff = ts - Date.now();
    if (diff <= 0) return 'now';
    const h = Math.round(diff / 3600000);
    if (h < 1) return 'in under an hour';
    if (h < 24) return `in about ${h} hour${h === 1 ? '' : 's'}`;
    const d = Math.round(h / 24);
    return `in ${d} day${d === 1 ? '' : 's'}`;
  }

  L.renderReview = function (app) {
    const due = L.dueCards();
    const total = Object.keys(L.state.srs).length;

    if (total === 0) {
      app.innerHTML = `
        <div class="empty">
          <h2>Your review deck is empty</h2>
          <p>Words join the deck as you study each unit's vocabulary. Start with Unit I and come back.</p>
          <button class="btn big" data-go="unit|1">Go to Unit I</button>
        </div>`;
      return;
    }

    if (due.length === 0) {
      const next = L.nextDueAt();
      app.innerHTML = `
        <div class="empty">
          <div class="orn">❦</div>
          <h2>Omnia acta — all caught up</h2>
          <p>${total} words in your deck, none due right now. Next review ${next ? fmtWhen(next) : 'soon'}.</p>
          <button class="btn big" data-go="home">Back to the course</button>
        </div>`;
      return;
    }

    const tricky = L.trickyWords().slice(0, 8);
    const trickyHTML = tricky.length ? `
      <div class="doneCard trickybox">
        <h3>Verba difficilia — your stubborn words</h3>
        <p class="mini">These keep slipping away. Meet them with extra attention:</p>
        <div class="trickylist">
          ${tricky.map(t => `<span class="trickyw" title="forgotten ${t.lapses}×"><b class="la">${L.esc(t.v.latin)}</b> ${L.esc(t.v.gloss)}</span>`).join('')}
        </div>
      </div>` : '';

    const SESSION_CAP = 30;
    const capped = due.length > SESSION_CAP;
    app.innerHTML = `
      <div class="doneCard">
        <h2>Review</h2>
        <p><b>${due.length}</b> word${due.length === 1 ? '' : 's'} due of ${total} in your deck.
        ${capped ? `You’ll review the ${SESSION_CAP} most fragile now — the rest can wait.` : ''}
        Tap a card to reveal the meaning, then grade yourself honestly.</p>
        <div class="btnrow">
          <button class="btn big" id="startrev">Review ${Math.min(due.length, SESSION_CAP)}</button>
          ${due.length > 10 ? '<button class="btn ghost" id="startshort">Short on time? Just 10</button>' : ''}
        </div>
      </div>
      ${trickyHTML}
      <div id="revarea"></div>`;

    function startSession(n) {
      app.querySelectorAll('.doneCard').forEach(el => { el.hidden = true; });
      const area = app.querySelector('#revarea');
      const session = due.slice(0, n);
      const items = session.map(({ key, v }) => ({
        front: v.latin,
        frontSub: v.forms + ' · ' + v.pos,
        back: v.gloss,
        backSub: `<span class="la">${L.esc(v.example)}</span><br>${L.esc(v.exampleGloss)}`,
        speak: v.latin,
        onGrade(g) { L.state.srs[key] = L.SRS.grade(L.state.srs[key], g); },
      }));
      L.runDeck(area, items, {
        onDone(stats) {
          L.addXP(session.length);
          L.touchStreak();
          L.save();
          const next = L.nextDueAt();
          const step = L.nextStep ? L.nextStep() : null;
          const remaining = L.dueCount();
          area.innerHTML = `
            <div class="doneCard">
              <div class="orn">❦</div>
              <h2>Review complete</h2>
              <p>${stats.seen} cards reviewed · +${session.length} XP.
              ${remaining ? `${remaining} still due — go again whenever.` : `Next review ${next ? fmtWhen(next) : 'soon'}.`}</p>
              <div class="btnrow">
                ${remaining ? '<button class="btn" id="again">Keep reviewing</button>' : ''}
                ${step ? `<button class="btn big" data-go="unit|${step.id}|${step.tab}">Continue → Unit ${L.roman(step.id)}, ${L.esc(step.label)}</button>` : '<button class="btn big" data-go="home">Back to the course</button>'}
                <button class="btn ghost" id="grefresh">Grammar refresher · 4 questions</button>
              </div>
            </div>`;
          const again = area.querySelector('#again');
          if (again) again.addEventListener('click', () => L.go('review'));
          const gr = area.querySelector('#grefresh');
          if (gr) gr.addEventListener('click', () => grammarRefresher(area));
        },
      });
    }

    app.querySelector('#startrev').addEventListener('click', () => startSession(SESSION_CAP));
    const short = app.querySelector('#startshort');
    if (short) short.addEventListener('click', () => startSession(10));
  };

  // four quick retrieval questions drawn from completed units' quizzes
  function grammarRefresher(area) {
    const doneIds = Object.keys(L.units).map(Number).filter(i => L.isDone(i) && (L.units[i].quiz || []).length);
    if (!doneIds.length) {
      area.innerHTML = '<div class="doneCard"><p>Complete a unit first — then its grammar joins the refresher pool.</p><button class="btn" data-go="home">Back</button></div>';
      return;
    }
    const pool = doneIds.flatMap(i => L.units[i].quiz.map(q => {
      const order = L.shuffle(q.options.map((_, oi) => oi));
      return {
        prompt: `Unit ${L.roman(i)} — ${q.prompt || q.q}`,
        options: order.map(oi => q.options[oi]),
        answer: order.indexOf(q.answer),
        explain: q.explain, type: 'review',
      };
    }));
    L.runQuizSession(area, L.shuffle(pool).slice(0, 4), {
      title: 'Grammar refresher',
      onEnd(score, total) {
        L.addXP(5);
        L.save();
        area.innerHTML = `
          <div class="doneCard">
            <h2>${score}/${total}</h2>
            <p>${score === total ? 'Old grammar, still sharp. +5 XP' : 'Rust spotted — the misses above tell you which unit to skim. +5 XP'}</p>
            <button class="btn big" data-go="home">Back to the course</button>
          </div>`;
      },
    });
  }
})();
