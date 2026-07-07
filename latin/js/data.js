'use strict';
// Legō — unit registry. Unit data files call registerUnit({...}); everything else lives on window.Lego.

window.Lego = window.Lego || {};

Lego.TOTAL_UNITS = 30;
Lego.units = {};

window.registerUnit = function (u) {
  if (u && Number.isInteger(u.id)) Lego.units[u.id] = u;
};

Lego.STAGES = [
  { n: 1, title: 'Fundāmenta', sub: 'Foundations · the sentence, the cases, the present tense', range: [1, 10] },
  { n: 2, title: 'Via', sub: 'The road · every tense, every declension, the journey to Rome', range: [11, 20] },
  { n: 3, title: 'Ad Auctōrēs', sub: 'To the authors · participles, subjunctive, and real Latin texts', range: [21, 30] },
];

Lego.roman = function (n) {
  const vals = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let out = '';
  if (n >= 30) { out = 'XXX'; n -= 30; }
  else if (n >= 20) { out = 'XX'; n -= 20; }
  else if (n >= 10) { out = 'X'; n -= 10; }
  for (const [v, s] of vals) while (n >= v) { out += s; n -= v; }
  return out;
};
