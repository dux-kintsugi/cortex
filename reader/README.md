# Fovea — RSVP Speed Reader

One word at a time, Spritz-style. Each word's **optimal recognition point** (ORP)
letter is shown in red and pinned to a fixed spot between two tick marks, so your
eyes never move — whole words register in a single glance and the usual eye-jump
overhead of reading disappears.

The ORP is proportional: the red letter is the one whose optical center sits
nearest **35%** of the way through the word (word recognition is fastest when
fixating left of center). The **pivot** slider tunes this from 25% to 50% —
it re-renders live, so pause on a long word and drag it to feel the difference.

## Run it

No build, no dependencies: **double-click `index.html`**, or serve the folder
(`python3 -m http.server`) — served over HTTP it also registers a service worker
and installs as an offline PWA (Share → Add to Home Screen on iPhone).

## Right-click → read (macOS)

Double-click **`macos/Install Right-Click Service.command`** once. From then on,
select text in any app (browser, Mail, PDFs, Notes…), right-click →
**Services → Read in Fovea**, and Fovea opens already playing that text.
It prefers the local server on port 8642 when running (same saved settings as
usual) and falls back to opening `index.html` directly. You can also give it a
keyboard shortcut in System Settings → Keyboard → Shortcuts → Services.

Under the hood the service opens `index.html#t=<url-encoded text>` — anything
that can open a URL (bookmarklets, Shortcuts, scripts) can hand Fovea text the
same way.

## Scan a page (OCR)

**📷 Scan** opens the camera (on the phone) or a file picker (on the Mac),
runs OCR on the photo **entirely on-device** — the vendored Tesseract engine in
`vendor/`, ~16 MB, no cloud, nothing uploaded — and starts reading the result.
Photos are downscaled before recognition and hard line breaks / end-of-line
hyphenation in the OCR output are repaired automatically. Needs the app served
over http (workers don't run from `file://`); the engine loads lazily on first
scan and is cached after that.

On iPhone, Apple's own Live Text is a great alternative: point the Camera app
at a page, tap the text icon, copy — then paste into Fovea.

## Use it

- Paste any text, hit **Read this** (or **📋 Paste** straight from the clipboard).
- **Space** / tap the word area — play & pause
- **↑ ↓** or slider — speed, 100–900 wpm in 25 wpm steps
- **← →** — jump a sentence back / forward
- **R** — restart; drag the progress bar to scrub

## What it does for you

- **Smart pacing**: sentence ends, commas, paragraph breaks, digits and long
  words all hold slightly longer, so comprehension survives at high wpm.
- **Ramp-up**: after every start or seek the first few words run slower and
  ease up to full speed, so you never lose the thread.
- **Re-orientation**: pausing shows the full sentence around the current word.
- **Never loses your place**: position, speed and text persist in localStorage;
  backgrounding the tab auto-pauses.

Speed, position and the current text are stored in `localStorage` under
`fovea.*` — all data stays in the browser.
