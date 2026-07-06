# 🧠 Cortex — Brain Training

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

1. **Baseline assessment** (~13 min): 8 short tasks measure Processing Speed, Attention,
   Working Memory, Visual Memory, Visuospatial ability, Executive Control and Number Fluency.
   Raw metrics are mapped to 1–99 percentile-style scores against rough reference ranges
   for web-based testing.
2. **Training plan**: domains are weighted by weakness. Each day you get a 4-game session
   (~8 min) — your weakest domain is always included, the rest rotate with weighted variety.
3. **Adaptive difficulty**: every game has 10 levels; finish a round strongly and you level
   up, struggle and it eases off (per-game staircase).
4. **Re-assessment** every ~2 weeks re-runs the battery and refreshes the plan, so you can
   see genuine movement against your baseline.
5. **Performance patterns** (Progress tab): a 16-week calendar heatmap of daily average
   scores, plus day-of-week and time-of-day breakdowns with automatic "you're sharpest
   on…" insights once enough data accumulates.

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
