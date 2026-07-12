#!/usr/bin/env node
'use strict';
// Audits the phonetic transliterator over every Latin token in the course:
//   1. segmental patterns an Italian voice would misread,
//   2. a nucleus-count invariant (no syllables merged or invented),
//   3. no accent on the final syllable of 3+-syllable words (Latin never stresses the ultima),
//   4. a hand-verified gold list of stress placements.
// Usage: node phoncheck.js [--all]

const fs = require('fs');
const path = require('path');
const P = require(path.join(__dirname, '..', 'js', 'phonetics.js'));

let cur = null;
global.registerUnit = u => { cur = u; };

const LETTERS = /[A-Za-zĀĒĪŌŪȲāēīōūȳ]+/g;
const tokens = new Set();
for (let i = 1; i <= 30; i++) {
  cur = null;
  require(path.join(__dirname, '..', 'data', 'units', 'unit' + String(i).padStart(2, '0') + '.js'));
  if (!cur) continue;
  const texts = [];
  for (const r of cur.readings || []) texts.push(...(r.paragraphs || []));
  for (const v of cur.vocab || []) texts.push(v.latin || '', v.example || '');
  for (const t of texts) for (const m of t.match(LETTERS) || []) tokens.add(m);
}

const BAD = [
  [/(^|[^s])c[eiìèé]/, 'soft c: Italian reads ce/ci as "che"'],
  [/sc[eiìèé]/, 'sc before e/i: Italian reads /ʃ/'],
  [/(^|[^g])g[eiìèé]/, 'soft g: Italian reads ge/gi as "je"'],
  [/gl[iì]/, 'gli: Italian reads /ʎ/'],
  [/ck/, 'ck: not an Italian grapheme sequence'],
  [/v/, 'v survived: voice says /v/, classical is /w/'],
  [/[jy]/, 'j/y survived: unpredictable in Italian'],
  [/[āēīōūȳ]/, 'macron survived'],
  [/ph|th|ch(?![aeiouàèìòùéó])/, 'digraph survived unhandled'],
];

const ACCENTS = /[àèìòùéó]/;
const DEACCENT = { 'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u', 'é': 'e', 'ó': 'o' };
const deAccent = s => s.replace(/[àèìòùéó]/g, c => DEACCENT[c]);

// documented approximations: intervocalic consonantal i in these names isn't modeled;
// the Italian reading (glide either side of the syllable break) is audibly identical
const APPROX_OK = new Set(['gāius', 'trāiānus']);

function check(tok) {
  const out = P.transliterate(tok);
  if (APPROX_OK.has(tok.toLowerCase())) return { out, problems: [] };
  const problems = BAD.filter(([re]) => re.test(out)).map(([, why]) => why);

  // invariant: same number of syllable nuclei in and out. Count the output de-accented
  // (accent marks are 1:1 char swaps) with Italian reading rules: surviving ae/oe are
  // hiatus, ai/oi/au are diphthongs.
  const plain = deAccent(out.toLowerCase());
  const ns = P.nuclei(plain, P.OUTPUT_DIPHTHONGS);
  const nIn = P.nuclei(tok.toLowerCase()).length;
  if (nIn !== ns.length) problems.push(`nucleus count changed ${nIn} -> ${ns.length}`);

  // Latin never stresses the last syllable of a 3+-syllable word
  const m = out.match(ACCENTS);
  if (m && ns.length >= 3) {
    const lastN = ns[ns.length - 1];
    if (m.index >= lastN.i) problems.push('accent on the final syllable');
  }
  return { out, problems };
}

// hand-verified stress + respelling regressions
const GOLD = [
  ['poēta', 'poéta'], ['poētae', 'poétai'], ['poētārum', 'poetàrum'],
  ['cēna', 'chéna'], ['cibus', 'chìbus'], ['cīvis', 'chìwis'], ['caelum', 'chàilum'],
  ['ecce', 'ècche'], ['scīs', 'schis'], ['agit', 'àghit'], ['genū', 'ghènu'],
  ['vīnum', 'wìnum'], ['via', 'wìa'], ['pulcher', 'pùlker'], ['bracchium', 'bràkkium'],
  ['quīnque', 'quìnque'], ['dominus', 'dòminus'], ['philosophus', 'filòsofus'],
  ['stomachus', 'stòmakus'], ['coniugis', 'còniughis'], ['adiuvat', 'àdiuwat'],
  ['perīculum', 'perìculum'], ['sapientia', 'sapièntia'], ['imperātor', 'imperàtor'],
  ['legiōnēs', 'leghiónes'], ['fīliōrum', 'filiórum'], ['cōnstituērunt', 'constituérunt'],
  ['tenebrae', 'tènebrai'], ['paulaeque', 'paulàique'], ['deinde', 'dèinde'],
  ['māter', 'màter'], ['laudat', 'làudat'], ['deus', 'dèus'], ['amīcus', 'amìcus'],
  ['dormit', 'dòrmit'], ['Julia', 'Iùlia'], ['Quinn', 'Quinn'], ['Lupo', 'Lùpo'],
];

let flagged = 0, goldFail = 0;
for (const [latin, want] of GOLD) {
  const got = P.transliterate(latin);
  if (got !== want) { goldFail++; console.log(`GOLD FAIL ${latin} -> ${got} (want ${want})`); }
}

const all = process.argv.includes('--all');
for (const tok of [...tokens].sort()) {
  const { out, problems } = check(tok);
  if (problems.length) {
    flagged++;
    console.log(`FLAG ${tok} -> ${out}   [${problems.join(' | ')}]`);
  } else if (all) {
    console.log(`  ok ${tok} -> ${out}`);
  }
}
console.log(`\n${tokens.size} unique tokens, ${flagged} flagged; gold list: ${GOLD.length - goldFail}/${GOLD.length} passed.`);
process.exit(flagged || goldFail ? 1 : 0);
