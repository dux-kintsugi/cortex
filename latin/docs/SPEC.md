# Legō — Unit Data Specification

Legō is a static, offline-capable web app that teaches **reading** Latin (recognition only —
the learner never produces Latin). Each of the 30 units is a single JavaScript data file.
This document is the exact contract for those files. Follow it precisely: a Node validator
(`tools/validate.js`) enforces the mechanical rules, and the app engine assumes this shape.

## File

- Path: `latin/data/units/unitNN.js` where `NN` is the zero-padded unit number (`unit01.js` … `unit30.js`).
- Contents: **exactly one** top-level call to `registerUnit({...})` with a plain object literal. No other
  statements, no imports, no comments outside the call. UTF-8.
- Inside strings, avoid unescaped double quotes: use «guillemets» or typographic ’ for quoting Latin
  inside English text.

## Schema

```js
registerUnit({
  id: 7,                 // integer, must match filename
  stage: 1,              // 1 (units 1–10), 2 (11–20), 3 (21–30)
  title: "Per Viās Ostiae",       // short title (Latin or English, per CURRICULUM.md)
  tagline: "Prepositions and the ablative case",  // one-line English subtitle

  grammar: [             // 2–5 sections teaching this unit's NEW grammar (see CURRICULUM.md)
    {
      heading: "Little words, big signals",
      body: "<p>…</p><p>…</p>",   // HTML. Allowed tags ONLY: <p> <strong> <em> <br> <span class=\"la\">
                                   // Wrap every Latin word/phrase inside body in <span class=\"la\">…</span>.
      table: {             // OPTIONAL paradigm/reference table (omit if not needed)
        caption: "Prepositions with the ablative",
        headers: ["Preposition", "Meaning", "Example"],
        rows: [["in + abl.", "in, on", "in viā"], ["cum + abl.", "with", "cum amīcō"]]
      },
      tip: "Reading tip: spot the preposition first — it tells you what the next noun's ending will be."  // OPTIONAL
    }
  ],

  vocab: [               // 22–28 entries; the validator accepts 20–32
    {
      latin: "via",                  // headword with macrons
      forms: "viae, f.",             // nouns: genitive + gender; verbs: remaining principal parts,
                                     // e.g. "amāre, amāvī, amātum"; adjectives: "‑a, ‑um" or "‑e";
                                     // indeclinables: "(indēcl.)" or e.g. "(+ abl.)" for prepositions
      pos: "noun (1st decl.)",       // short part-of-speech label
      gloss: "road, way, street",    // concise English meaning(s)
      example: "In viā ambulāmus.",  // ONE short example sentence using only grammar allowed at this unit
      exampleGloss: "We are walking in the street."
    }
  ],

  readings: [            // EXACTLY 2 connected story passages (see CURRICULUM.md for the story beat)
    {
      title: "Ad portum",
      intro: "Quintus and his father walk down to the harbor.",   // one English line of context
      paragraphs: [       // 2–5 paragraphs of continuous Latin prose
        "Mārcus et Quīntus per viās Ostiae ambulant. …",
        "…"
      ],
      glosses: {          // EVERY word token that appears in paragraphs MUST have an entry.
                          // Key = the surface form as it appears, lowercased, macrons preserved.
                          // Gloss the exact form; add a parse hint in parentheses where useful.
        "mārcus": "Marcus (the father)",
        "viās": "streets (acc. pl. — object of «per»)",
        "ambulant": "(they) walk"
      },
      translation: [      // natural English translation, one string per paragraph, same array length
        "Marcus and Quintus walk through the streets of Ostia. …"
      ],
      questions: [        // EXACTLY 4 comprehension/parsing questions, in English
        {
          q: "Where are Marcus and Quintus going?",
          options: ["To the forum", "To the harbor", "To school", "Back home"],  // exactly 4
          answer: 1,                                     // index 0–3 of the CORRECT option
          explain: "«ad portum» — ad + accusative expresses motion toward."
        }
      ]
    },
    { /* second reading — the longer of the two */ }
  ],

  quiz: [                // EXACTLY 8 items. Recognition only — never ask the learner to produce Latin.
    {
      prompt: "In «Puella rosam videt», which word is the direct object?",
      options: ["Puella", "rosam", "videt", "there is no object"],
      answer: 1,
      explain: "«rosam» ends in ‑am — accusative singular, the direct-object case."
    }
  ]
});
```

## Content rules

1. **Grammar scope.** A unit may use ONLY the grammar introduced in units 1…N per
   `CURRICULUM.md`. Exceptions always allowed if glossed: predicate adjectives with «est/sunt»,
   «inquit» for dialogue, and set phrases explicitly glossed as chunks.
2. **Vocabulary scope.** Readings should draw on this unit's vocab + the cumulative vocab of earlier
   units (provided in your task prompt) + glossed proper names. A handful of extra story words is
   acceptable **only if glossed** — every token must be in `glosses` regardless.
3. **Gloss coverage.** The validator tokenizes paragraphs on letters (including macron vowels
   āēīōūȳ) and requires every token, lowercased, to be a key in `glosses`. Enclitics stay attached:
   gloss «puellaque» as one key ("and the girl"). Gloss proper names too ("ostia": "Ostia, the port
   of Rome").
4. **Latin quality.** Natural, idiomatic classical Latin — not English calques. Correct macrons
   everywhere (vocab, examples, readings, quiz prompts). Orthography: use «v» for consonantal u
   (via, vīta) and «i» for consonantal i (iam, iubet); use -que/-ne enclitics naturally.
5. **Answer keys.** `answer` must index the genuinely correct option; distractors must be plausible
   but definitely wrong. No "all of the above". Triple-check every answer index — this is the most
   common authoring error.
6. **Reading length.** Stage 1: reading 1 ≈ 50–90 Latin words, reading 2 ≈ 80–130. Stage 2:
   ≈ 70–110 / 110–170. Stage 3: ≈ 90–140 / 140–220. Reading 2 is always the longer, richer one.
7. **Tone.** Warm, occasionally funny (the dog Ferōx is a menace), never condescending. Grammar
   explanations talk to an adult beginner and always angle toward *reading strategy* — "when you see
   X, expect Y" — not composition rules.
8. **Repetition is pedagogy.** Recycle earlier vocabulary and constructions constantly. A reader
   should meet this unit's new grammar many times across both readings.

## Validation

```
node "/Users/dux64/Brain Training/latin/tools/validate.js" 7      # one unit
node "/Users/dux64/Brain Training/latin/tools/validate.js" --all  # whole course
```

A unit file is not done until the validator reports **0 errors** for it. Fix warnings too when
reasonable (word counts, etc.).
