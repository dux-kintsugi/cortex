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

    app.innerHTML = `
      <div class="doneCard">
        <h2>Review</h2>
        <p><b>${due.length}</b> word${due.length === 1 ? '' : 's'} due of ${total} in your deck.
        Tap a card to reveal the meaning, then grade yourself honestly.</p>
        <button class="btn big" id="startrev">Start review</button>
      </div>
      <div id="revarea"></div>`;

    app.querySelector('#startrev').addEventListener('click', () => {
      app.querySelector('.doneCard').hidden = true;
      const area = app.querySelector('#revarea');
      const items = due.map(({ key, v }) => ({
        front: v.latin,
        frontSub: v.forms + ' · ' + v.pos,
        back: v.gloss,
        backSub: `<span class="la">${L.esc(v.example)}</span><br>${L.esc(v.exampleGloss)}`,
        speak: v.latin,
        onGrade(g) { L.state.srs[key] = L.SRS.grade(L.state.srs[key], g); },
      }));
      L.runDeck(area, items, {
        onDone(stats) {
          L.addXP(due.length);
          L.touchStreak();
          L.save();
          const next = L.nextDueAt();
          area.innerHTML = `
            <div class="doneCard">
              <div class="orn">❦</div>
              <h2>Review complete</h2>
              <p>${stats.seen} cards reviewed · +${due.length} XP. Next review ${next ? fmtWhen(next) : 'soon'}.</p>
              <button class="btn big" data-go="home">Back to the course</button>
            </div>`;
        },
      });
    });
  };
})();
