# Legō — Learn to Read Latin

A self-contained web app that teaches you to **read** Latin from absolute zero to lightly-adapted
real authors (Caesar, Phaedrus, Martial, the Vulgate) across 30 units. Reading only — no exercise
ever asks you to produce Latin.

## Run it

No build step, no dependencies. Either:

- open `index.html` directly in a browser, or
- serve the folder: `python3 -m http.server 8377` and visit `http://localhost:8377/latin/`
  (from the repo root) — or deploy with the rest of this repo to GitHub Pages.

Progress (unit completion, spaced-repetition deck, streak) is stored in `localStorage` in the
browser you use.

## What's inside

- **30 units** in three stages (Fundāmenta → Via → Ad Auctōrēs), each with a grammar briefing,
  ~25 vocabulary flashcards, two tap-to-gloss story readings with comprehension questions, and a
  gated quiz (80% unlocks the next unit).
- **A continuing story** — a merchant family in Ostia, a journey to Rome, a storm at sea — that
  hands off into adapted authentic texts in the final units.
- **Spaced-repetition review** of every word you learn (Review tab).
- **A full reference** — pronunciation, all five declensions, the complete verb system,
  pronouns, participles, the subjunctive for readers, and a sentence-attack strategy.

## Structure

```
index.html          app shell
css/style.css       theme
js/                 engine (state, SRS, lesson views, reference)
data/units/         unit01.js … unit30.js — course content (registerUnit format)
docs/SPEC.md        content format contract
docs/CURRICULUM.md  scope & sequence
tools/validate.js   content validator: node tools/validate.js --all
```
