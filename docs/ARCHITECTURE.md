# Cortex — Architecture & Task Module Contract

Plain HTML/CSS/JS, **no build step, no dependencies**. Classic `<script>` tags in
`index.html` (order matters). Everything hangs off the global `window.BT`.
Works from `file://` — never use ES modules, `import`, `fetch`, or external URLs.

## Load order

```
js/core.js        BT namespace, DOMAINS, state/localStorage, el(), rng, stats, beep
js/charts.js      BT.drawRadar / BT.drawLine (canvas)
js/engine.js      BT.registerTask + BT.runTask (full-screen task runner)
js/tasks/*.js     one file per game — REGISTERS ITSELF, touches nothing else
js/assessment.js  baseline battery
js/training.js    plan generation, daily sessions, streaks
js/main.js        screens/router, boots app
```

## Task module contract

Each `js/tasks/<id>.js` is an IIFE that calls `BT.registerTask(def)` exactly once.
See `js/tasks/reaction.js` — it is the canonical exemplar; match its style.

### Definition fields (all required unless noted)

| field | type | meaning |
|---|---|---|
| `id` | string | matches filename |
| `name` | string | display name |
| `icon` | string | one emoji |
| `domain` | string | one of `speed attention workingMemory memory visuospatial executive math` |
| `tagline` | string | one-line hook shown in the library |
| `howTo` | string[] | 3–5 short instruction lines shown pre-game |
| `maxLevel` | int | default 10 |
| `assessLevel` | int | fixed level used during assessment (default 3) |
| `startLevel` | int | initial training level (default = assessLevel) |
| `assessDurationMs` | int | soft budget for assess mode (default 75000) |
| `trainDurationMs` | int | soft budget for train/free mode (default 90000) |
| `norms` | `{metric, mean, sd, higherIsBetter}` | maps `primary` → 1–99 score via normal CDF |
| `fmtPrimary` | `(summary)=>string` (optional) | human caption for the result splash |
| `run(ctx)` | function | plays one full round, MUST eventually call `ctx.finish(...)` |

### ctx API (the ONLY way to touch timers/listeners)

```js
ctx.mode          // 'assess' | 'train' | 'free'
ctx.level         // int >= 1  — derive ALL difficulty knobs from this
ctx.durationMs    // soft time budget for this round
ctx.container     // cleared .task-stage div — build your DOM inside it
ctx.rng()         // 0..1 random (currently Math.random)
ctx.now()         // performance.now()

ctx.timeout(fn, ms)   ctx.interval(fn, ms)   ctx.clearTimer(id)   // auto-cleaned
ctx.listen(target, type, fn, opts)                                 // auto-removed
ctx.keys({' ': fn, ArrowLeft: fn2, 'a': fn3})   // keydown map, auto preventDefault, ignores repeats
ctx.onCleanup(fn)                               // custom cleanup hook

ctx.hud.progress(0..1)   // top progress bar — keep it moving
ctx.hud.stat('Trial 3/20 · 95%')  // one-line live stat
ctx.beep('good'|'bad'|'go'|'tick'|'end')
ctx.flash('good'|'bad')  // brief stage border flash
ctx.running              // false after finish/abort — check in async callbacks

ctx.finish({ primary, metrics, advance })  // exactly once; ends the round
```

**Hard rules**
1. NEVER use bare `setTimeout`/`setInterval`/`addEventListener` — engine can't clean them up. Use ctx.
2. `ctx.finish` must be reachable in ALL paths (time up, trials done). Guard async callbacks with `if (!ctx.running) return;`.
3. `primary` must be a finite number (the metric named in `norms.metric`).
4. `advance`: `'up'` | `'down'` | `'hold'` — per-task thresholds (see specs below).
5. Support BOTH pointer and keyboard where feasible. Use `pointerdown` (not `click`) for anything reaction-timed; `click` is fine for menus/keypads. Pointer-only is acceptable for inherently spatial games (search, matrix, spatialspan) — still fine.
6. No globals besides reading `BT`. Never write to `BT.state` — the engine records everything.
7. Style: IIFE + `'use strict'`, `const BT = window.BT, el = BT.el;`, build DOM with `el()`, ES2019-safe (no optional chaining needed but allowed — target modern evergreen browsers).
8. No console.log in final code. Comments only where the code can't speak.

### Shared CSS components (css/style.css — use these, avoid custom CSS)

- `.stage-center` — flex column, centered content, fills stage
- `.task-msg` — muted centered helper line
- `.stim-box` > `.stim` — big central stimulus area (5.5rem text)
- `.board` (display:grid; set `style="grid-template-columns:repeat(N,1fr); width:min(420px,90vw);"`) with `.tile` cells; state classes: `.lit .good .bad .reveal .hollow`
- `.choice-row` > `.choice` — large answer buttons; `<span class="key-hint">` inside for key labels
- `.keypad` (3-col) or `.keypad.wide` (5-col) > `.key` (`.key.action` for ⌫/OK)
- `.answer-line` — big typed-answer display
- `.legend-row` > `.legend-cell` > `.sym` + `.dig` — symbol-coding legend
- `.tap-pad` > `.big-shape` — full-stage tap target
- Ink colors: `.ink-red .ink-blue .ink-green .ink-yellow`; tile fills: `.fill-red` etc.
- CSS vars: `--good --bad --warn --accent --accent-2 --muted --panel --panel-2`

Inline `style=` for geometry (grid columns, widths) is fine; don't add `<style>` blocks.

### Scoring philosophy

`norms` values are rough reference points for web/touch testing (NOT clinical norms) —
chosen so a typical adult lands ~40–60 at assessLevel. Throughput metrics are
per-minute and error-penalized so button-mashing never pays:
`net/min = (correct − wrong) / minutesElapsed` (floor at 0 is NOT applied; negative is possible and fine).
Duration-based games: track elapsed from first trial, finish when `ctx.durationMs` is exceeded
(check between trials) — and ALSO show progress via `ctx.hud.progress(elapsed/durationMs)`.
Trial-based games (spans): progress = trials done / max trials.

---

## Per-task specs (remaining 11 modules)

Common: `advance` thresholds use round accuracy `acc = correct/(correct+wrong)` unless stated.

### symbols.js — “Symbol Match” (speed)
DSST-style coding. Legend of N distinct glyphs (from `◆ ▲ ● ★ ✚ ☾ ♠ ⬢ ✦`) → digits 1..N,
shown as `.legend-row` at top. Big central `.stim` shows a glyph; respond with digit
(keyboard `1`..`9` AND an on-screen `.keypad.wide` of digit keys). Immediate ✓/✗ feedback
(flash+beep), next glyph (no repeat of previous glyph). N by level: 4,5,6,6,7,7,8,8,9,9.
At level ≥ 6 the legend reshuffles at half time (announce with a stat message).
Duration-based. `primary` = net correct/min. norms: mean 26, sd 8, higherIsBetter.
assessLevel 3, assess 75s, train 90s. advance: acc ≥ .92 → up; acc < .75 → down.
fmtPrimary: `X correct/min`.

### gonogo.js — “Go / No-Go” (attention)
Central shape stream on a `.tap-pad`: GO = green shapes (respond: tap pad or SPACE),
NO-GO = red/orange shape (withhold). goRatio = min(.70 + .02·level, .85).
Stimulus visible 650ms; response window = onset+950ms; ISI = max(1400 − 65·level, 750)ms with ±20% jitter.
Feedback flashes. Duration-based. metrics: hitRate, faRate, meanRT (hits only).
`primary` = (hitRate − faRate) × 100. norms: mean 70, sd 15, higherIsBetter.
assessLevel 3, assess 75s, train 90s. advance: primary ≥ 88 → up; < 50 → down.
fmtPrimary: `hits X% · false alarms Y%`.

### search.js — “Spot It” (attention)
Visual search boards: find and tap the one target among distractors in a `.board` grid.
Levels 1–4: feature search — target `T` among `L`s (letters as tile text, each tile’s letter
randomly rotated via inline `style="transform:rotate(90deg)"` etc. — 0/90/180/270).
Levels 5+: conjunction — blue `T` among blue `L`s AND red `T`s (use `.ink-blue`/`.ink-red`).
Set size = 9 + 3·level tiles (grid cols ≈ ceil(sqrt(setSize))). Tap target → good flash, new board.
Tap wrong tile → bad flash, error++, SAME board continues. Duration-based.
`primary` = net boards/min = (solved − errors)/min. norms: mean 9, sd 3.5, higherIsBetter.
assessLevel 3, assess 75s, train 90s. advance: errors=0 AND solved ≥ 8 → up; acc < .75 → down.
fmtPrimary: `X boards/min`.

### nback.js — “N-Back” (workingMemory)
3×3 `.board`; a tile lights (`.lit`) for 500ms every ISI. Press MATCH (big `.choice` button
AND SPACE) when the lit position equals the position N steps back. N: level 1–2 → 1-back;
3–6 → 2-back; 7+ → 3-back. ISI = max(2400 − 80·level, 1700)ms. Trials = 24 + N.
~30% targets; generated so no accidental extra matches at lag N (lures at other lags OK).
Feedback: subtle flash on response (good/bad). MISSED targets: bad beep only.
`primary` = (hits − falseAlarms) / targets × 100, floor −100. norms: mean 55, sd 22, higherIsBetter.
assessLevel 3 (=2-back), trial-based (~60s). advance: primary ≥ 80 → up; < 40 → down.
fmtPrimary: `N-back · X% target accuracy` (use the actual N).

### digitspan.js — “Digit Span” (workingMemory)
Digits appear one at a time in `.stim` (750ms on, 250ms gap). Then recall via `.keypad`
(digits, ⌫, OK) + keyboard, typed into `.answer-line`. Phase 1 FORWARD from length 4;
correct → length+1 (new trial), wrong → one retry at same length, second miss → phase ends,
best = last passed length. Phase 2 BACKWARD (enter digits in reverse) from length 3, same rules.
Level knob: presentation speeds up (on-time = max(750 − 30·level, 450)ms).
`primary` = (bestForward + bestBackward) / 2. norms: mean 5.6, sd 1.0, higherIsBetter.
Trial-based. advance: primary ≥ 6.5 → up; ≤ 4 → down.
fmtPrimary: `forward X · backward Y`.

### spatialspan.js — “Tile Trail” (visuospatial)
Corsi blocks: `.board` grid (3×3 below level 5, else 4×4). Sequence of tiles flashes
(`.lit`, 600ms on, 200ms gap), then reproduce by tapping IN ORDER (level ≥ 7: in REVERSE).
Start length 3; correct → +1; wrong → retry once at same length; 2 misses → end.
Tapping shows `.good`/`.bad` on the tapped tile; a wrong tap ends the attempt (reveal correct via `.reveal`).
`primary` = best completed length. norms: mean 5.4, sd 1.1, higherIsBetter.
Trial-based. advance: primary ≥ 6 → up; ≤ 4 → down. fmtPrimary: `span of X`.

### rotation.js — “Mind Spin” (visuospatial)
A polyomino (connected cells, count = 4 + floor(level/3)) drawn twice as small tile-grids
side by side: left = original, right = rotated by 90/180/270° AND 50% of the time mirrored.
Answer: SAME (rotated only) vs MIRRORED — two `.choice` buttons + ArrowLeft/ArrowRight.
Generate polyomino as a cell set; compute rotation/mirror mathematically on the cell
coordinates, then render each as its own small `.board` (NO CSS transforms — render the
transformed cells directly; avoid shapes with rotational symmetry: reject a generated shape
if any rotation of it equals its mirror). Immediate feedback, next pair. Duration-based.
`primary` = net correct/min. norms: mean 8, sd 3.5, higherIsBetter.
assessLevel 3, assess 75s, train 90s. advance: acc ≥ .85 → up; < .60 → down.
fmtPrimary: `X pairs/min`.

### stroop.js — “Color Clash” (executive)
Color word (RED/BLUE/GREEN/YELLOW) shown in `.stim` with a random INK color
(`.ink-*`). Respond with the INK color: 4 `.choice` buttons in fixed order
(Red/Blue/Green/Yellow, neutral text) + keys 1–4 (show `.key-hint`).
Incongruent ratio = min(.4 + .04·level, .8); never repeat the same word+ink combo twice in a row.
Level ≥ 5: response deadline max(2600 − 150·level, 1100)ms — timeout counts as wrong (bad beep).
Duration-based. metrics include interference = medianRT(incongruent) − medianRT(congruent).
`primary` = net correct/min. norms: mean 32, sd 9, higherIsBetter.
assessLevel 3, assess 75s, train 90s. advance: acc ≥ .90 → up; < .70 → down.
fmtPrimary: `X/min · interference Yms`.

### switching.js — “Rule Flip” (executive)
Cue above stimulus: “COLOR” or “SHAPE” (`.pill`, colored border). Stimulus in `.stim-box`:
a circle ● or triangle ▲, colored red or blue (unicode glyph + `.ink-*`).
Rule COLOR: red → LEFT, blue → RIGHT. Rule SHAPE: ● → LEFT, ▲ → RIGHT.
Two `.choice` buttons (LEFT: “🔴 / ●”, RIGHT: “🔵 / ▲”) + ArrowLeft/ArrowRight.
Switch probability = min(.25 + .04·level, .65). Deadline 2500ms (timeout = wrong).
Duration-based. metrics include switchCost = meanRT(switch) − meanRT(repeat), correct trials only.
`primary` = net correct/min. norms: mean 30, sd 9, higherIsBetter.
assessLevel 3, assess 75s, train 90s. advance: acc ≥ .90 → up; < .70 → down.
fmtPrimary: `X/min · switch cost Yms`.

### matrix.js — “Memory Matrix” (memory)
Grid flashes a pattern of k tiles (`.lit`) for (900 + 60·k)ms, then hides; reproduce by tapping.
Grid size g from k: k≤4→3×3, k≤7→4×4, k≤10→5×5, else 6×6. Correct tap → `.good`; wrong tap
→ `.bad`, board FAILS (briefly `.reveal` missed tiles). Board complete when k tiles found.
10 boards per round. Staircase: success → k+1, fail → max(2, k−1). Start k = 3 + floor(level/3).
`primary` = best k fully recalled (0 if none). norms: mean 9, sd 2.2, higherIsBetter.
Trial-based. advance: primary ≥ startK + 3 → up; ≤ startK → down. fmtPrimary: `best pattern: X tiles`.

### math.js — “Number Sprint” (math)
Mental arithmetic sprint. Problem in `.stim` (fits, shrink font if long), answer via `.keypad`
(digits, minus at level ≥ 6, ⌫, OK) + keyboard/Enter, into `.answer-line`.
Levels: 1–2 add/sub (operands 2–20, no negative answers); 3–4 adds ×(2–9 × 2–12);
5–6 adds ÷ with exact integer results, sub may go negative; 7+ two-step like `a + b × c`
(respect precedence; keep answers −99..999). Wrong submit → bad flash, SAME problem stays
(retry until correct or skip via new problem after 2 misses). Duration-based (finish check
between problems and on submit). `primary` = net correct/min = (correct − wrong)/min.
norms: mean 12, sd 5, higherIsBetter. assessLevel 3, assess 60s, train 75s.
advance: acc ≥ .90 → up; < .65 → down. fmtPrimary: `X problems/min`.

---

## Assessment & training flow (for reference)

- Battery (`assessment.js`): reaction, symbols, gonogo, nback, matrix, spatialspan, stroop, math
  → task scores → domain scores (mean per domain) → plan.
- Plan (`training.js`): domain weights = 105 − score; daily session = 4 games
  (slot 1 = weakest domain, 2–3 weighted, 4 = variety), deterministic per day.
- Levels: engine applies `advance` after each train/free round (`BT.state.levels`).

## QA checklist for a task module

- [ ] `node --check js/tasks/<id>.js` passes
- [ ] `ctx.finish` reached on every path (duration end, trial end); never called twice
- [ ] All async callbacks guard on `ctx.running`
- [ ] No bare setTimeout/setInterval/addEventListener
- [ ] Keyboard + pointer both work (or pointer-only for spatial games)
- [ ] Rapid double-taps can't double-count a trial
- [ ] `primary` finite in all cases (empty round → finish with primary 0, not NaN)
- [ ] `ctx.hud.progress` moves; `ctx.hud.stat` shows live counts
- [ ] Difficulty genuinely changes with `ctx.level` from 1 to maxLevel

---

# CONTRACT v2 — Honest-measurement & habit update

Engine now provides (tasks may rely on):

- `ctx.practice` (bool) — true during the unscored assessment warm-up. Duration tasks
  need NO changes (engine shortens `ctx.durationMs` to ~18s). Trial-based tasks
  (digitspan, spatialspan, matrix, nback, wordpairs) must early-exit via normal
  `ctx.finish` after ~2 trials/boards when `ctx.practice` is true.
- `ctx.feedback(correct)` — combo-aware feedback helper (rising-pitch beep + flash +
  streak floaters). Throughput games (symbols, stroop, switching, math, search,
  rotation, gonogo) should call this INSTEAD of separate beep+flash pairs for
  per-trial right/wrong feedback. Span games keep their existing feedback.
- `ctx.rng` may be a SEEDED generator (daily challenge replays). Tasks must use
  `ctx.rng()` for ALL stimulus randomness — never `Math.random()` directly.

Tasks must now also provide:

- `summary.levelProgress` (0..1) in `ctx.finish`: how far through the CURRENT level's
  mastery band the round landed, using the task's own advance thresholds:
  `clamp((metric − downThreshold) / (upThreshold − downThreshold), 0, 1)` where
  `metric` is whatever the task's advance rule tests (accuracy or primary).
  Engine computes ability = level + levelProgress for honest cross-level trends.
- `summary.metrics.half1` / `half2`: the primary metric computed separately over
  odd-indexed vs even-indexed scored trials (split-half reliability → noise bands).
  If a half has no trials, report null for both.
- CVD assist (`BT.state.settings.cvdAssist`, read at run() time):
  - gonogo: GO stimuli use FILLED glyphs (● ■ ▲), NO-GO use HOLLOW (○ □ △) — color stays as secondary cue.
  - reaction: go = filled ●, decoy = hollow ○ (colors stay).
  - stroop: palette/words become BLUE, YELLOW, WHITE, GRAY (CVD-safe) with matching
    ink classes `.ink-blue .ink-yellow .ink-white .ink-gray`.
  - Other tasks: no change required.

### wordpairs.js — “Word Pairs” (NEW task, domain: verbal)
`BT.DOMAINS.verbal` exists. Paired-associate recognition, fully offline: embed ~300
concrete common nouns in the file. Study phase: k = 4 + floor(level/2) pairs, each
shown 2.5s (`.stim` at reduced size, "APPLE — RIVER"). Test phase (order shuffled):
left word shown, pick its partner from 4 `.choice` buttons: correct, 2 unstudied
foils, 1 studied-but-mismatched lure. Feedback per answer. primary = correct − 0.5·lureErrors,
normalized per k: primary = 100·(correct − 0.5·lureErrors)/k. norms mean 62 sd 18 higherIsBetter.
Trial-based (one study+test cycle per round = 1 "trial"; practice = k=3 single cycle).
assessLevel 3, maxLevel 10. advance: primary ≥ 85 up, < 45 down. keys 1–4 + taps.
fmtPrimary: `X of k pairs`. levelProgress from those thresholds. half1/half2 over odd/even test items.

### New standalone modules (each self-contained IIFE, loaded before main.js unless noted)

**js/achievements.js** — defines ~14 HONEST milestones (streaks 3/7/14/30 incl. lite
days; baseline mapped; first re-assessment; any domain +10 vs baseline at re-assessment;
all 13 games played; any game to level 5 / 10; 50/100/250 rounds; first shield used;
challenge completed). Exposes `BT.checkAchievements()` → array of newly-earned
{id, name, icon, blurb} (idempotent; persists earned in `BT.state.badges = {id: ts}`),
and `BT.buildAchievementsCard()` → DOM card showing earned + locked. No other globals.

**js/report.js** — exposes `BT.buildWeeklyReportCard()` (Mon–Sun just ended vs prior
week: days trained full/lite/shield, rounds, per-domain deltas, best score, biggest
level-up; null unless today is Mon–Wed and there's data; dismiss persists
`state.lastReportWeek`) and `BT.buildLongReportCard()` (30-day per-domain trend slopes
pts/week via least squares on daily means, most-improved + flattest game, PR count,
plateau flags for maxLevel games; null if < 14 days of data). Web Share button when
`navigator.share` exists (text digest only).

**js/gamedetail.js** — loaded AFTER main.js. Calls `BT.registerScreen('game', fn)`;
screen params {id}. Shows: score-over-time (assess sessions as separate series),
level/ability timeline (rec.level + rec.ability), and per-task sub-metric trends
(stroop: interference; switching: switchCost; gonogo: hitRate/faRate; digitspan:
fwd/bwd; nback: n level; reaction: medianRT) — pick from rec.metrics keys defensively.
Uses BT.drawLine. Back button → BT.go('progress').

**js/sync.js** — serverless device sync. `BT.sync.exportCode()` → Promise<string>:
state → compact columnar payload (sessions as parallel arrays with ts deltas; drop
per-session metrics except half-free essentials; keep levels/assessments/doneDays/
streak/badges/dayTags/settings) → deflate-raw via CompressionStream (fallback: plain
JSON) → base64url with 'CX2.' prefix. `BT.sync.importCode(code)` → Promise<{merged
summary}>: decode + MERGE (never overwrite): union sessions by (ts,taskId), max levels,
union doneDays/badges/dayTags (existing wins per key), union assessments by ts, latest
plan, then RECOMPUTE streak from merged doneDays. `BT.buildSyncCard()` → Settings card
UI: big "Copy sync code" (navigator.clipboard, Web Share fallback) + paste-textarea →
"Merge" with confirmation summary. Round-trip MUST be lossless for scores/levels.

### Engine v2 internals (for reviewers)
- Interrupted rounds (visibilitychange or wall-clock overrun) are VOIDED, never recorded.
- Wake lock held during rounds; re-acquired on visibility return.
- mode 'challenge': seeded ctx.rng, NO level adaptation, records sessions normally.
- rec gains: `ability`, `band` [lo,hi] from half1/half2, `sem`.
- Splash delta is Reliable-Change gated: shown only when |score − median(last 5 same-task
  scores)| > 2.33·SEM (else "steady — within your typical range").

### introDemo (optional task field, v2.1)
`introDemo(box, level) -> stopFn` — renders a small looping animated walkthrough
inside the instructions screen (`box` is an empty `.intro-demo` div). Return a
function that stops all animation timers; the engine calls it when the round
starts or the layer closes. Use plain setInterval here (pre-ctx phase). Keep it
under ~160px tall. Best for paradigms that text can't explain (n-back).

---

# CONTRACT v3 — Variety expansion

Engine additions tasks may rely on:
- `ctx.survival` (bool): survival mode — IGNORE the normal duration end; play until
  3 total errors (wrong answers + timeouts) OR elapsed > ctx.durationMs (300s cap).
  `primary` = count of correct answers achieved. Engine records score/ability as null,
  never adapts levels. Tasks that support it set `survival: true` in the def and may
  provide `fmtSurvival(summary) -> string`. levelProgress/advance are ignored in
  survival — still return them (any value) so the shape is uniform.
- `BT.runTask` accepts `levelOffset` / `durationScale` (challenge modifiers) — no task
  changes needed; ctx.level/ctx.durationMs arrive pre-adjusted.
- Existing v2 rules all apply (levelProgress, half1/half2, ctx.feedback for throughput
  games, ctx.practice early-exit for trial-based games, ctx.rng for ALL randomness,
  optional introDemo).

## New game specs (8 modules)

### flanker.js — “Flanker” (executive) · survival: yes
Row of 5 arrows in `.stim` (e.g. ← ← → ← ←). Respond to the CENTER arrow only:
LEFT/RIGHT `.choice` buttons + ArrowLeft/ArrowRight. Incongruent ratio = min(.35+.04·level, .75);
level ≥ 5 adds response deadline max(2400−150·level, 1100)ms (timeout = error, feedback(false)).
Never same center direction more than 3 in a row. Duration 75s/90s. primary = net correct/min.
norms mean 28 sd 9 higher. assessLevel 3. advance acc ≥.92 up / <.72 down.
metrics.flankerEffect = medianRT(incongruent) − medianRT(congruent), correct trials.
fmtPrimary `X/min · interference Yms`. introDemo optional but welcome (static 2-frame).

### trails.js — “Trail Blazer” (speed) · survival: yes
Scattered tappable nodes (absolutely-positioned round divs ≥48px inside a relatively-
positioned board div sized to the stage; rejection-sample non-overlapping positions with
ctx.rng, ≥8px gaps; read container.clientWidth/Height AFTER appending, then place).
Levels 1–4: numbers 1..(6+level) in order (Trails A). Level ≥5: alternate 1-A-2-B-…,
total nodes = 8 + level (Trails B). Tap correct next node → it dims + shows ✓ (stays
visible); wrong node → error, bad feedback, board continues. Board done → new board.
Duration 75/90s. primary = net correct taps/min = (correctTaps − errors)/min.
norms mean 40 sd 12 higher. advance acc ≥.93/<.75. fmtPrimary `X taps/min`.

### mot.js — “Orbit Tracker” (attention) · survival: yes (3 wrong picks total)
Canvas (square, min(container width, container height − 40px)). Round: T = 2+ceil(level/3)
targets flash accent for 1.5s among D total dots (D = 7 + level, cap 16, radius ~12px);
then all identical (muted) and drift for 6+level·0.3 s: constant speed (55+9·level px/s),
wall bounce, small per-frame heading jitter from ctx.rng. Dots MUST softly repel each other (positional push-apart + heading bounce when centers < 2R+4) and a relaxation pass before the pick phase MUST guarantee all pairs >= 2R+8 apart — overlapping dots make the nearest-center hit test a coin flip on a fair tap.
Freeze → user taps T dots (nearest-dot hit test ≤ 28px, tapped dots highlight; no re-tap).
Reveal correct/incorrect, score round = correct picks. Rounds until duration (75/90s).
primary = 100 · totalCorrectPicks / totalTargets. norms mean 75 sd 15 higher.
advance primary ≥92/<60. Animation: requestAnimationFrame loop with the id kept and
cancelled via ctx.onCleanup AND guarded by ctx.running (rAF is allowed here — the loop
must self-terminate when !ctx.running). halves by round parity. fmtPrimary `X% tracked`.

### flicker.js — “Flicker” (memory) · survival: yes
Change-blindness board: grid g×g (g = 4 below level 5, 5 below 8, else 6) of glyph tiles
(glyphs from ◆▲●★✚☾♠⬢✦, each tinted one of 4 ink classes). Cycle: version A 700ms →
all-hidden blank 250ms → version B 700ms → blank … A and B differ in EXACTLY one tile
(different glyph OR different ink). Tapping any tile at any time = answer: the changing
tile → solved (good feedback), new board; else error (bad feedback), same board continues.
Duration 75/90s. primary = net boards/min = (solved − errors)/min. norms mean 4.5 sd 2
higher. advance acc ≥.9/<.65. halves by board parity. fmtPrimary `X boards/min`.

### tempo.js — “Tempo” (speed) · survival: no
Sensorimotor synchronization. A round = 3 cycles. Cycle: metronome beats at IOI =
60000/(70+6·level) ms — 8 audible beats (tone + big visual pulse dot), user taps along
(tap-pad or SPACE) from beat 3; then SILENT continuation: user keeps tapping 10 more
intervals with no cues (pulse dot freezes). Asynchrony per continuation tap =
|tapTime − (lastBeatTime + k·IOI)|, capped at IOI/2. primary = mean asynchrony ms across
all continuation taps (LOWER better). norms mean 85 sd 35 higherIsBetter:false.
advance primary ≤50 up / >120 down. Missing taps (gap > 1.6·IOI) count as one 'skipped'
interval, asynchrony IOI/2, and advance k accordingly — resync so one miss doesn't cascade.
Trial-based (~70s). If sound is OFF (BT.state.settings.sound false) show a visible
countdown-style pulse for audible phase — the game stays playable silently.
halves odd/even continuation taps. levelProgress from advance thresholds (inverted).
fmtPrimary `±X ms timing drift`.

### flashcount.js — “Flash Count” (math) · survival: yes (3 out-of-tolerance)
Numerosity: canvas flashes N dots for 450ms (N drawn per trial: min 3+level, max 8+3·level,
cap 45; non-overlapping rejection sampling; dot radius jittered ±30% via ctx.rng so area
isn't a reliable cue). Then `.keypad` estimate + OK. Tolerance: exact for N ≤ 6, else
|est−N|/N ≤ 0.15 = correct. Feedback shows true N briefly. Duration 60/75s.
primary = mean per-trial accuracy ×100 where per-trial accuracy = max(0, 1 − |est−N|/N).
norms mean 82 sd 8 higher. advance: correctRate ≥.9 up / <.7 down (correctRate = tolerance
hits / trials). halves trial parity. fmtPrimary `X% estimation accuracy`.

### dualnback.js — “Dual N-Back” (workingMemory) · survival: no
Two simultaneous streams: 3×3 grid position (as nback.js) + spoken letter
(speechSynthesis, letters C H K L Q R S T, utterance rate 1.1, cancel() in ctx.onCleanup).
N: level 1–2→1, 3–6→2, 7+→3. ISI = max(2800 − 70·level, 2100)ms, stim 500ms.
Trials = 20 + N. Independent target streams: each forced to round(0.25·(T−N)) matches at
lag N exactly (reuse nback's sequence trick per stream). Buttons: POSITION (key A) and
SOUND (key L) — both may be pressed in one trial window; per-stream latches.
Scoring per stream: (hits − FA)/targets ×100 floor −100; primary = mean of the two.
norms mean 45 sd 22 higher. advance ≥75/<35. If speechSynthesis is unavailable OR sound
is off, ALSO render the letter as text under the grid (visual-visual fallback — note it
in hud.stat once). practice: N+2 trials. halves trial parity (pooled streams).
fmtPrimary `N-back ×2 · X%`. introDemo strongly recommended (copy nback's pattern, add
a letter row).

### tower.js — “Tower” (executive) · survival: no
Tower of London. 3 pegs with capacities 3/2/1 rendered as tap targets (columns of disc
slots built from tiles); 3 discs (ink-red/blue/yellow). State space is tiny (36 states) —
embed a BFS solver. Per puzzle: pick a random goal + start (ctx.rng) whose BFS distance
d matches the level band: d = 2 + floor(level/2) (cap 7). Show goal as a mini readonly
diagram above the interactive pegs. Interaction: tap source peg (top disc lifts/highlights)
→ tap destination peg (respects capacity; illegal → shake/bad beep, not an error count).
Move counter vs minimum shown live. Puzzle solved → good feedback; solved in d moves =
'perfect'. New puzzle until duration (75/90s) or 8 puzzles. primary = perfect solves/min.
norms mean 2.2 sd 1.1 higher. advance: perfect/solved ≥.75 up / <.4 down (0 solved → down).
practice: one d=2 puzzle. halves puzzle parity. fmtPrimary `X perfect/min`.

## Twist updates (4 existing modules — new HIGH-LEVEL behavior, maxLevel 10→12)

- **stroop.js**: maxLevel 12. Levels 11–12 = REVERSE Stroop blocks: instruction line and
  hud.stat flip to “answer the WORD, ignore the ink”; alternate normal/reverse every ~10
  trials at L12. All existing level behavior below 11 unchanged.
- **gonogo.js**: maxLevel 12. Levels 11–12 = Stop-Signal: on 25% of GO trials a loud
  'bad'-style stop tone + red border fires 150–400ms (ctx.rng) after onset — responding
  after the stop signal = error. hud.stat explains once. Below 11 unchanged.
- **digitspan.js**: maxLevel 12. Levels 11–12 = sequencing span: recall digits in
  ASCENDING order (duplicates avoided in generation); instruction + answer-line hint
  update accordingly. Below 11 unchanged.
- **search.js**: maxLevel 12. Levels 11–12 = drifting tiles: the whole board's tiles
  slowly translate (CSS transform updated via ctx.interval ~50ms, ±14px sinusoidal,
  phase-offset per tile) so pop-out never settles. Tap targets stay ≥44px. Below 11 unchanged.

## Survival support (7 existing throughput modules)

symbols, gonogo, search, rotation, stroop, switching, math: when `ctx.survival` is true —
ignore the normal duration cutoff; end the round when (errors + timeouts) reaches 3 OR
elapsed > ctx.durationMs (the 300s cap). `primary` = correct answers achieved.
Set `survival: true` and add `fmtSurvival` (e.g. `s => 'Solved ' + s.metrics.correct + ' before 3 strikes'`).
Normal modes must behave EXACTLY as before — survival is a pure addition.
