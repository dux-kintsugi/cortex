# 🧠 Cortex — Brain Training

**Live app:** https://dux-kintsugi.github.io/cortex/ — open it on any device,
Add to Home Screen on iPhone, and it works fully offline after the first load.

A self-contained cognitive performance trainer: **assess** your baseline across 7
cognitive domains, get a **personalized daily training plan**, and play **12 adaptive
games** that target your weakest areas. Progress is tracked with charts, streaks and
periodic re-assessment.

## Run it

No build, no install, no network:

- **Double-click `index.html`** — everything runs locally in your browser, or
- serve it: `python3 -m http.server 8642` then open http://localhost:8642

**On your iPhone**: double-click **`Serve to iPhone.command`** on the Mac, open the
URL it prints in Safari (same Wi-Fi), then Share → **Add to Home Screen** — Cortex
installs as a full-screen app with its own icon. The Mac must be awake and serving
while you play. Hosting the folder on any HTTPS static host (Netlify, GitHub Pages)
additionally unlocks full offline play via the bundled service worker.

All data stays in that browser's localStorage (phone and Mac track separately).
Export/import backups from **Settings** to move progress between devices.

## How it works

1. **Baseline assessment** (~18 min): 9 short tasks measure Processing Speed, Attention,
   Working Memory, Visual Memory, Visuospatial ability, Executive Control, Number Fluency
   and Verbal Memory. Every task starts with a short **unscored warm-up** (practice effects
   are the biggest artifact in cognitive testing), and your first-ever battery is marked
   *provisional* — a confirmation baseline a few days later becomes the real anchor.
2. **Training plan**: domains are weighted by weakness. Each day you get a 4-game session
   (~8 min) — your weakest domain is always included, the rest rotate with weighted variety.
   No time? A **Quick session** (1 game, ~2 min) still keeps your streak alive.
3. **Adaptive difficulty**: every game has 10 levels with a per-game staircase. Training
   trends use an **ability index** (level + progress within level) so charts don't dip as
   a "reward" for leveling up; percentile scores are reserved for fixed-difficulty assessments.
4. **Honest numbers**: every round reports a split-half noise band ("±4 typical wobble"),
   and ▲/▼ deltas only appear when a change beats measurement noise (reliable-change gating).
   Rounds interrupted by calls or backgrounding are **voided, never recorded**.
5. **Streaks that forgive**: two-tier days (full/lite), streak shields earned weekly that
   auto-repair one missed day, a comeback flow after lapses — and a session-end ceremony
   with day tags (sleep/caffeine/exercise/stress).
6. **Insights** (Progress tab): 16-week heatmap; practice-adjusted day-of-week and
   time-of-day patterns (only claimed when the signal beats its standard error);
   "what moves your scores" correlations from your day tags; weekly report card;
   30-day trend slopes; per-game deep-dives with sub-metrics (Stroop interference,
   switch cost, hit/false-alarm rates…). Plus honest achievements and a seeded daily challenge.
7. **Device sync without a server**: compressed sync codes (Settings) merge progress
   between phone and Mac — never overwriting either side.
8. **Accessibility**: color-vision assist mode re-codes the color-dependent games with
   shapes and a CVD-safe palette; wake-lock keeps the screen alive during watch-only games.

## The games

| Game | Domain | Task paradigm |
|---|---|---|
| ⚡ Reaction Time | Speed | Simple RT + inhibition decoys |
| 🔣 Symbol Match | Speed | Digit-symbol coding (DSST) |
| 🚦 Go / No-Go | Attention | Response inhibition |
| 🔎 Spot It | Attention | Feature/conjunction visual search |
| 🧮 N-Back | Working Memory | Spatial n-back (1/2/3-back) |
| 🔢 Digit Span | Working Memory | Forward + backward span |
| 🧊 Tile Trail | Visuospatial | Corsi block sequence |
| 🌀 Mind Spin | Visuospatial | Mental rotation (mirror judgement) |
| 🎨 Color Clash | Executive | Stroop interference |
| 🔀 Rule Flip | Executive | Task switching (color/shape) |
| 🖼️ Memory Matrix | Visual Memory | Pattern recall staircase |
| ➗ Number Sprint | Number Fluency | Mental arithmetic |
| 📖 Word Pairs | Verbal Memory | Paired-associate recognition |

## Honest fine print

Scores are estimates for tracking **your own change over time** — not clinical,
medical or IQ measurements. Improvements primarily reflect growing skill on these
specific tasks; how far "brain training" transfers to everyday cognition is genuinely
debated in the research. Sleep, exercise and learning hard new things remain the
best-supported cognitive enhancers — use Cortex alongside them, as a fun, honest
scoreboard.

## Code layout

```
index.html          shell + script order
css/style.css       theme + shared task components
js/core.js          state, storage, stats, utils, audio
js/engine.js        task registry + full-screen runner (ctx API)
js/charts.js        canvas radar + line charts
js/tasks/*.js       one game per file (see docs/ARCHITECTURE.md for the contract)
js/assessment.js    baseline battery → domain scores
js/training.js      plan generation, daily sessions, streaks
js/main.js          screens, router, debug seeding (?debug=1)
```
