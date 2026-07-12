'use strict';
// Legō — classical-Latin phonetic transliterator for Italian TTS voices.
//
// A speech voice applies ITS language's orthography to whatever text it gets. An Italian
// voice reading raw Latin says ce/ci soft ("che"), ge/gi soft, sce/sci as "sh", and v as
// /v/ — all wrong for restored classical Latin. This module respells each word in Italian
// orthography that FORCES the classical sounds (che/chi = hard k, ghe/ghi = hard g,
// sch = /sk/, w = /w/, ai = the "eye" diphthong) and marks the classically-stressed
// syllable with a written accent, which Italian voices honor. Accent quality is chosen
// classically: stressed short e/o get open è/ò, stressed long ē/ō get close é/ó.
//
// Respelling runs on the MACRON-AWARE word, so hiatus like «poēta» (o + ē, two syllables)
// is never merged into a fake "oi" diphthong; genuine diphthongs (ae, oe, au) are.
//
// Known, documented approximations (no offline voice can do better):
//   gn stays /ɲ/ ("ny", the church value; the classical value is debated),
//   vowel length outside the stressed syllable is not conveyed,
//   h is near-silent, ti+vowel may soften slightly on some voices,
//   s between vowels may soften toward /z/ (Italian habit; classical s is always /s/),
//   «ait» is treated as one syllable; uterque-family stress follows the regular rule.

(function (root) {
  const LONGV = 'āēīōūȳ';
  const VOWELS = 'aeiouyāēīōūȳàèìòùéó';
  const ACCENT_SHORT = { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù' };
  const ACCENT_LONG = { a: 'à', e: 'é', i: 'ì', o: 'ó', u: 'ù' };
  const LATIN_DIPHTHONGS = ['ae', 'oe', 'au', 'ai', 'oi'];
  // in the RESPELLED output, ae/oe survive only as true hiatus — Italian reads them as two vowels
  const OUTPUT_DIPHTHONGS = ['ai', 'oi', 'au'];
  // consonant-final prefixes after which i-before-vowel is a glide (con-iugis, ad-iuvat).
  // 'trans' is deliberately absent: trāns + īre compounds (trānsiit) keep a vocalic i.
  const PREFIXES = ['ab', 'ad', 'con', 'dis', 'in', 'inter', 'ob', 'per', 'sub', 'circum'];
  // lexicalized contractions the regular rule can't see
  const EXCEPTIONS = { deinde: 'dèinde', proinde: 'pròinde' };

  const isVowel = c => !!c && VOWELS.includes(c);
  const stripMacrons = s => s.normalize('NFD').replace(/̄/g, '').normalize('NFC');

  // Vowel nuclei. Handles diphthongs; u after q/g before a vowel is a glide; i/j before a
  // vowel is consonantal word-initially and after a consonant-final prefix.
  function nuclei(word, diphthongs) {
    const dset = diphthongs || LATIN_DIPHTHONGS;
    const out = [];
    let i = 0;
    while (i < word.length) {
      const two = word.slice(i, i + 2);
      if (dset.includes(two)) { out.push({ i, len: 2, text: two }); i += 2; continue; }
      const c = word[i];
      if (isVowel(c)) {
        const prev = word[i - 1];
        const glideU = (c === 'u' || c === 'ū') && (prev === 'q' || prev === 'g') && isVowel(word[i + 1]);
        const consI = (c === 'i' || c === 'j') && isVowel(word[i + 1]) &&
          (i === 0 || (prev && !isVowel(prev) && PREFIXES.indexOf(word.slice(0, i)) !== -1));
        if (!glideU && !consI) out.push({ i, len: 1, text: c });
      }
      i++;
    }
    return out;
  }

  // Classical stress: penult if heavy (long vowel, diphthong, or closed syllable), else
  // antepenult. qu and the aspirates ph/th/ch weigh as single consonants; muta cum liquida
  // leaves the penult light. Returns the 0-based nucleus index to stress, or -1.
  function stressIndex(word) {
    const ns = nuclei(word);
    if (ns.length <= 1) return -1;
    if (ns.length === 2) return 0;
    const pen = ns[ns.length - 2], last = ns[ns.length - 1];
    let heavy = pen.len === 2 || LONGV.includes(pen.text);
    if (!heavy) {
      const cluster = word.slice(pen.i + pen.len, last.i)
        .replace(/qu/g, 'q').replace(/[pt]h/g, m => m[0]).replace(/ch/g, 'c');
      if (cluster.length >= 2 && !/^[bcdfgpt][rl]$/.test(cluster)) heavy = true;
      if (cluster === 'x' || cluster === 'z') heavy = true;
    }
    return heavy ? ns.length - 2 : ns.length - 3;
  }

  // Macron-aware respelling in "phonetic Italian". Front-vowel classes include ē/ī so
  // «cīvis» hardens correctly; bare ae/oe here are genuine diphthongs (hiatus aē/oē can't match).
  function respell(w) {
    return w
      .replace(/cch/g, 'kk')
      .replace(/ph/g, 'f')
      .replace(/th/g, 't')
      .replace(/ch/g, 'k')
      .replace(/rh/g, 'r')
      .replace(/[jy]/g, 'i')
      .replace(/ȳ/g, 'ī')
      .replace(/sc(?=[eiēī]|ae|oe)/g, 'sch')
      .replace(/cc(?=[eiēī]|ae|oe)/g, 'cch')
      .replace(/c(?=[eiēī]|ae|oe)/g, 'ch')
      .replace(/gg(?=[eiēī]|ae|oe)/g, 'ggh')
      .replace(/g(?=[eiēī]|ae|oe)/g, 'gh')
      .replace(/v/g, 'w')
      .replace(/ae/g, 'ai')
      .replace(/oe/g, 'oi');
  }

  function transliterateWord(original) {
    const lower = original.toLowerCase();
    let out = EXCEPTIONS[stripMacrons(lower)];
    if (!out) {
      const idx = stressIndex(lower);
      out = respell(lower); // still macron-aware — nucleus count matches the original
      if (idx >= 0) {
        const target = nuclei(out)[idx];
        if (target) {
          const ch = out[target.i];
          const accented = (LONGV.includes(ch) ? ACCENT_LONG : ACCENT_SHORT)[stripMacrons(ch)];
          if (accented) out = out.slice(0, target.i) + accented + out.slice(target.i + 1);
        }
      }
      out = stripMacrons(out);
    }
    // keep initial capitals (sentence starts, names) — single-pass only; do not re-feed output
    if (original[0] !== original[0].toLowerCase()) out = out[0].toUpperCase() + out.slice(1);
    return out;
  }

  function transliterate(text) {
    return String(text).replace(/[A-Za-zĀĒĪŌŪȲāēīōūȳ]+/g, m => transliterateWord(m));
  }

  const api = { transliterate, transliterateWord, stressIndex, nuclei, OUTPUT_DIPHTHONGS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) (root.Lego = root.Lego || {}).phon = api;
})(typeof window !== 'undefined' ? window : globalThis);
