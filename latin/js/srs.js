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
      // re-studying a card well before it is due (e.g. redoing a unit deck) must not inflate its schedule
      if (grade > 0 && card.ivl >= 1 && now < card.due - 12 * 3600 * 1000) return card;
      // ±6% fuzz keeps cards learned together from staying clumped on the same day forever
      const fuzz = 0.94 + Math.random() * 0.12;
      const ease = card.ease || 2.3;
      if (grade === 0) {
        if (card.reps > 0) {
          // a lapse costs part of the interval and some ease — not the whole investment
          card.lapses = (card.lapses || 0) + 1;
          card.ease = Math.max(1.3, ease - 0.2);
          card.ivl = Math.max(1, Math.round(card.ivl * 0.4));
        } else {
          card.ivl = 0;
        }
        card.reps = 0;
        card.due = now + 10 * MIN;
      } else if (grade === 1) {
        const relearning = card.reps === 0 && card.ivl >= 1;
        card.reps += 1;
        card.ivl = relearning ? card.ivl : (card.ivl ? Math.min(card.ivl * ease * fuzz, 180) : 1);
        card.due = now + card.ivl * DAY;
      } else {
        card.reps += 1;
        card.ease = ease + 0.15;
        card.ivl = card.ivl ? Math.min(card.ivl * (ease + 0.7) * fuzz, 240) : 3;
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
    // most fragile first: overdueness relative to the card's interval
    out.sort((a, b) =>
      (now - b.card.due) / ((b.card.ivl || 0.02) * 864e5) -
      (now - a.card.due) / ((a.card.ivl || 0.02) * 864e5));
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

  // words the learner keeps forgetting — their personal leeches
  L.trickyWords = function () {
    const out = [];
    for (const [key, card] of Object.entries(L.state.srs)) {
      if ((card.lapses || 0) >= 2) {
        const parsed = L.parseCardKey(key);
        if (parsed) out.push({ key, lapses: card.lapses, ...parsed });
      }
    }
    return out.sort((a, b) => b.lapses - a.lapses);
  };

  // cards that will be due by the end of tomorrow (for the forecast)
  L.dueTomorrow = function () {
    const end = new Date();
    end.setDate(end.getDate() + 2);
    end.setHours(0, 0, 0, 0);
    let n = 0;
    for (const card of Object.values(L.state.srs)) if (card.due < end.getTime()) n++;
    return n;
  };
})();
