'use strict';
// Legō — lightweight spaced-repetition scheduler (SM-2-inspired).
// Cards live in Lego.state.srs keyed "u<unitId>:<latin headword>" as {ivl (days), reps, due (ms)}.

(function () {
  const L = window.Lego;
  const MIN = 60 * 1000, DAY = 24 * 60 * 60 * 1000;

  L.SRS = {
    // grade: 0 = again, 1 = good, 2 = easy
    grade(card, grade) {
      card = card || { ivl: 0, reps: 0, due: 0 };
      const now = Date.now();
      if (grade === 0) {
        card.reps = 0;
        card.ivl = 0;
        card.due = now + 10 * MIN;
      } else if (grade === 1) {
        card.reps += 1;
        card.ivl = card.ivl ? Math.min(card.ivl * 2.3, 180) : 1;
        card.due = now + card.ivl * DAY;
      } else {
        card.reps += 1;
        card.ivl = card.ivl ? Math.min(card.ivl * 3.2, 240) : 3;
        card.due = now + card.ivl * DAY;
      }
      return card;
    },
  };

  L.parseCardKey = function (key) {
    const m = key.match(/^u(\d+):(.*)$/);
    if (!m) return null;
    const unit = L.units[+m[1]];
    const v = unit && (unit.vocab || []).find(v => v.latin === m[2]);
    return v ? { unitId: +m[1], v } : null;
  };

  L.dueCards = function () {
    const now = Date.now(), out = [];
    for (const [key, card] of Object.entries(L.state.srs)) {
      if (card.due <= now) {
        const parsed = L.parseCardKey(key);
        if (parsed) out.push({ key, card, ...parsed });
      }
    }
    return out;
  };

  L.dueCount = function () { return L.dueCards().length; };

  L.nextDueAt = function () {
    let min = null;
    for (const card of Object.values(L.state.srs)) {
      if (min === null || card.due < min) min = card.due;
    }
    return min;
  };
})();
