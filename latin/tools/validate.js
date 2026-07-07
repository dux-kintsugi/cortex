#!/usr/bin/env node
'use strict';
// Validates Legō unit data files against docs/SPEC.md.
// Usage: node validate.js <unitNumber> | node validate.js --all

const fs = require('fs');
const path = require('path');

const UNITS_DIR = path.join(__dirname, '..', 'data', 'units');
const TOTAL_UNITS = 30;
const LETTERS = /[A-Za-zĀĒĪŌŪȲāēīōūȳ]+/g;

let registered = null;
global.registerUnit = u => { registered = u; };

function isStr(x) { return typeof x === 'string' && x.trim().length > 0; }

function loadUnit(id) {
  registered = null;
  const file = path.join(UNITS_DIR, 'unit' + String(id).padStart(2, '0') + '.js');
  if (!fs.existsSync(file)) return { errors: ['file not found: ' + file] };
  try {
    delete require.cache[require.resolve(file)];
    require(file);
  } catch (e) {
    return { errors: ['JS parse/exec error: ' + e.message] };
  }
  if (!registered || typeof registered !== 'object') return { errors: ['registerUnit({...}) was not called'] };
  return { unit: registered, errors: [] };
}

function checkQuestions(list, where, count, errors) {
  if (!Array.isArray(list) || list.length !== count) {
    errors.push(`${where}: must have exactly ${count} items (has ${Array.isArray(list) ? list.length : 'none'})`);
    return;
  }
  list.forEach((q, i) => {
    const w = `${where}[${i}]`;
    if (!isStr(q.q) && !isStr(q.prompt)) errors.push(`${w}: missing q/prompt text`);
    if (!Array.isArray(q.options) || q.options.length !== 4) errors.push(`${w}: options must be exactly 4`);
    else q.options.forEach((o, j) => { if (!isStr(o)) errors.push(`${w}: option ${j} empty`); });
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errors.push(`${w}: answer must be an integer 0-3`);
    if (!isStr(q.explain)) errors.push(`${w}: missing explain`);
  });
}

function checkUnit(id) {
  const errors = [], warnings = [];
  const { unit, errors: loadErrors } = loadUnit(id);
  if (loadErrors.length) return { id, errors: loadErrors, warnings };

  if (unit.id !== id) errors.push(`id is ${unit.id}, expected ${id}`);
  if (![1, 2, 3].includes(unit.stage)) errors.push('stage must be 1, 2, or 3');
  if (!isStr(unit.title)) errors.push('missing title');
  if (!isStr(unit.tagline)) errors.push('missing tagline');

  if (!Array.isArray(unit.grammar) || unit.grammar.length < 2 || unit.grammar.length > 5) {
    errors.push('grammar must be an array of 2-5 sections');
  } else {
    unit.grammar.forEach((g, i) => {
      if (!isStr(g.heading)) errors.push(`grammar[${i}]: missing heading`);
      if (!isStr(g.body)) errors.push(`grammar[${i}]: missing body`);
      const bad = (g.body || '').match(/<(?!\/?(p|strong|em|br|span)\b)[a-z]+/gi);
      if (bad) warnings.push(`grammar[${i}]: unexpected HTML tags: ${[...new Set(bad)].join(' ')}`);
      if (g.table) {
        if (!Array.isArray(g.table.headers) || !Array.isArray(g.table.rows)) {
          errors.push(`grammar[${i}].table: needs headers[] and rows[][]`);
        } else {
          g.table.rows.forEach((r, j) => {
            if (!Array.isArray(r) || r.length !== g.table.headers.length)
              errors.push(`grammar[${i}].table row ${j}: length must equal headers length (${g.table.headers.length})`);
          });
        }
      }
    });
  }

  if (!Array.isArray(unit.vocab) || unit.vocab.length < 20 || unit.vocab.length > 32) {
    errors.push(`vocab must have 20-32 entries (has ${Array.isArray(unit.vocab) ? unit.vocab.length : 'none'})`);
  }
  const seen = new Set();
  (unit.vocab || []).forEach((v, i) => {
    for (const k of ['latin', 'forms', 'pos', 'gloss', 'example', 'exampleGloss'])
      if (!isStr(v[k])) errors.push(`vocab[${i}] (${v.latin || '?'}): missing ${k}`);
    const key = (v.latin || '').toLowerCase();
    if (seen.has(key)) errors.push(`vocab: duplicate headword within unit: ${v.latin}`);
    seen.add(key);
  });

  let totalWords = 0;
  if (!Array.isArray(unit.readings) || unit.readings.length !== 2) {
    errors.push('readings must be an array of exactly 2');
  } else {
    unit.readings.forEach((r, ri) => {
      const w = `readings[${ri}]`;
      if (!isStr(r.title)) errors.push(`${w}: missing title`);
      if (!isStr(r.intro)) errors.push(`${w}: missing intro`);
      if (!Array.isArray(r.paragraphs) || r.paragraphs.length < 1 || r.paragraphs.length > 6) {
        errors.push(`${w}: paragraphs must be an array of 1-6 strings`);
      } else if (!Array.isArray(r.translation) || r.translation.length !== r.paragraphs.length) {
        errors.push(`${w}: translation must parallel paragraphs (${r.paragraphs.length} items)`);
      }
      if (!r.glosses || typeof r.glosses !== 'object') {
        errors.push(`${w}: missing glosses object`);
      } else {
        const missing = new Set();
        (r.paragraphs || []).forEach(p => {
          if (!isStr(p)) return;
          for (const tok of p.match(LETTERS) || []) {
            totalWords++;
            if (!(tok.toLowerCase() in r.glosses)) missing.add(tok);
          }
        });
        if (missing.size) errors.push(`${w}: tokens missing from glosses: ${[...missing].join(', ')}`);
        for (const [k, v] of Object.entries(r.glosses)) {
          if (k !== k.toLowerCase()) errors.push(`${w}: gloss key not lowercase: ${k}`);
          if (!isStr(v)) errors.push(`${w}: empty gloss for key: ${k}`);
        }
      }
      checkQuestions(r.questions, `${w}.questions`, 4, errors);
    });
  }
  if (totalWords > 0 && totalWords < 100) warnings.push(`readings total only ${totalWords} Latin words — thinner than spec`);

  checkQuestions(unit.quiz, 'quiz', 8, errors);
  return { id, errors, warnings, unit };
}

function report(res) {
  const tag = `unit${String(res.id).padStart(2, '0')}`;
  if (res.errors.length === 0 && res.warnings.length === 0) {
    console.log(`${tag}: OK`);
  } else {
    for (const e of res.errors) console.log(`${tag} ERROR: ${e}`);
    for (const w of res.warnings) console.log(`${tag} warning: ${w}`);
  }
  return res.errors.length;
}

const arg = process.argv[2];
if (!arg) {
  console.log('usage: node validate.js <unitNumber> | node validate.js --all');
  process.exit(2);
}

let errorCount = 0;
if (arg === '--all') {
  const headwords = new Map();
  for (let i = 1; i <= TOTAL_UNITS; i++) {
    const res = checkUnit(i);
    errorCount += report(res);
    (res.unit?.vocab || []).forEach(v => {
      const key = (v.latin || '').toLowerCase();
      if (headwords.has(key)) console.log(`cross-unit warning: «${v.latin}» in unit ${headwords.get(key)} and unit ${i}`);
      else headwords.set(key, i);
    });
  }
  console.log(errorCount === 0 ? `\nAll ${TOTAL_UNITS} units passed (0 errors).` : `\n${errorCount} error(s) across the course.`);
} else {
  errorCount = report(checkUnit(parseInt(arg, 10)));
}
process.exit(errorCount ? 1 : 0);
