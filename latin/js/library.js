'use strict';
// Legō — Bibliothēca: every unlocked story, collected for free re-reading.

(function () {
  const L = window.Lego;
  const LETTERS = /[A-Za-zĀĒĪŌŪȲāēīōūȳ]+/g;
  const RATE = { 1: '😶', 2: '🙂', 3: '😎' };

  L.renderLibrary = function (app) {
    const rows = [];
    for (let id = 1; id <= L.TOTAL_UNITS; id++) {
      const u = L.units[id];
      if (!u || !L.isUnlocked(id)) continue;
      const us = L.state.units[id] || { reads: {} };
      (u.readings || []).forEach((r, ri) => {
        const key = `u${id}r${ri}`;
        rows.push({
          id, ri,
          title: r.title,
          words: (r.paragraphs.join(' ').match(LETTERS) || []).length,
          done: !!(us.reads && us.reads[ri]),
          reads: (L.state.rereads || {})[key] || 0,
          rating: (L.state.ratings || {})[key],
        });
      });
    }

    if (!rows.length) {
      app.innerHTML = `<div class="empty"><h2>Bibliothēca</h2><p>Your library fills as you unlock units — every story you meet lives here afterward, ready for re-reading.</p><button class="btn big" data-go="unit|1">Start Unit I</button></div>`;
      return;
    }

    const totalWords = rows.reduce((s, r) => s + r.words, 0);
    const lifetime = L.state.wordsRead || 0;
    app.innerHTML = `
      <div class="libhead">
        <h1>Bibliothēca</h1>
        <p>${rows.length} passages · ${totalWords.toLocaleString()} words of Latin at your level.
        Re-reading a story you already know is the fastest fluency work there is — aim to re-read
        yesterday's passages faster than yesterday.</p>
        ${lifetime ? `<p class="mini">Lifetime Latin read: <strong>${lifetime.toLocaleString()}</strong> words and counting.</p>` : ''}
      </div>
      <div class="libgrid">
        ${rows.map(r => `
          <button class="libcard" data-lib="${r.id}|${r.ri}">
            <span class="libtitle la">${L.esc(r.title)}</span>
            <span class="libmeta">Unit ${L.roman(r.id)} · Lēctiō ${['I', 'II'][r.ri]} · ${r.words} words</span>
            <span class="libstat">
              ${r.done ? '✓ questions' : '· unread'}
              ${r.reads ? ` · re-read ×${r.reads}` : ''}
              ${r.rating ? ` · ${RATE[r.rating]}` : ''}
            </span>
          </button>`).join('')}
      </div>`;

    app.querySelectorAll('[data-lib]').forEach(btn => btn.addEventListener('click', () => {
      const [id, ri] = btn.dataset.lib.split('|').map(Number);
      L.state.rereads = L.state.rereads || {};
      const key = `u${id}r${ri}`;
      L.state.rereads[key] = (L.state.rereads[key] || 0) + 1;
      const row = rows.find(r => r.id === id && r.ri === ri);
      // a completed story (or repeat visit) counts as re-read input; a first read is counted at question-completion
      if (row && (row.done || row.reads > 0)) L.state.wordsRead = (L.state.wordsRead || 0) + row.words;
      L.save();
      L._openRead = ri;
      L.go('unit', id, 'read');
    }));
  };
})();
