# Presto — RSVP Speed Reader

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
**Services → Read in Presto**, and Presto opens already playing that text.
It prefers the local server on port 8642 when running (same saved settings as
usual) and falls back to opening `index.html` directly. You can also give it a
keyboard shortcut in System Settings → Keyboard → Shortcuts → Services.

Under the hood the service opens `index.html#t=<url-encoded text>` — anything
that can open a URL (bookmarklets, Shortcuts, scripts) can hand Presto text the
same way.

## Scan a page (OCR)

**📷 Scan** opens the camera (on the phone) or a file picker (on the Mac),
runs OCR on the photo **entirely on-device** — the vendored Tesseract engine in
`vendor/`, ~11 MB, no cloud, nothing uploaded — and starts reading the result.
Photos are scaled to 2200px and **adaptively binarized** (Bradley–Roth local
thresholding, which cancels out the shadows and lighting gradients that ruin
camera OCR); if the engine's confidence is low it retries on the unfiltered
photo and keeps the better read. Hard line breaks / end-of-line hyphenation
in the OCR output are repaired automatically. Needs the app served
over http (workers don't run from `file://`); the engine loads lazily on first
scan and is cached after that.

Scans strip **page furniture** automatically: running heads, chapter headers
and page numbers are cut when both their position (top/bottom of the page) and
content (short, ALL-CAPS, numeric…) say so — deliberately conservative, so
body text is never eaten.

On iPhone, Apple's own Live Text is a great alternative: point the Camera app
at a page, tap the text icon, copy — then paste into Presto.

## Books (PDF / EPUB / TXT) & Library

**📄 Import** takes a whole book:

- **EPUB** (Project Gutenberg, Standard Ebooks, Humble Bundle, any DRM-free
  ebook) — instant and exact: chapters extracted in spine order, cover and
  table-of-contents pages skipped, unzipped natively in the browser (no
  dependencies). DRM-locked books (Kindle, Libby) cannot be imported.
- **PDF** — text-layer PDFs read instantly; image-only scans fall back to
  page-by-page OCR (slow — progress shown, **✕ Stop** keeps what's done).
  Page furniture is stripped per page, hyphenated words split across page
  turns are rejoined, and a page ending mid-sentence flows into the next.
- **Plain text** (.txt) — loaded as-is.

Imported books land in the **Library** (IndexedDB, on-device): tap to continue
exactly where you left off — the position saves on every pause and when the
app closes. 🗑 removes a book.

## Find books

The **Find books** panel searches 60,000+ public-domain classics (Project
Gutenberg's catalog, served via the Internet Archive — Gutenberg's own
servers don't send CORS headers, but IA's search, metadata, and `.txt`
downloads all do). Tap a result and it downloads Gutenberg's clean
hand-proofed text, strips the license boilerplate and credits, and lands in
the library playing — and syncs to your other devices like any import.

## Cross-device sync

The **Sync** panel mirrors the library into a **private GitHub gist** — import
a book on the Mac, continue on the phone at the same word. Everything is
**encrypted on-device** before upload (AES-256-GCM, key derived from your
passphrase with PBKDF2) — GitHub only ever stores ciphertext.

Setup on the **first device only**: create a classic token at
github.com/settings/tokens with **only the `gist` scope**, make up a sync
passphrase, enter both, Connect. Every other device pairs without touching
GitHub: hit **Pair device** on the connected device and either scan the QR
with the new device's camera or copy the pairing code and paste it into the
new device's **Pairing code** box (for the installed iPhone app use the
paste route — iOS gives installed apps separate storage from Safari; Mac →
iPhone paste works via Universal Clipboard). The pairing code contains your
credentials, so treat it like a password. Everything lives only in each
device's localStorage (never in this repo). Lose the passphrase and the gist
copy is unreadable — books on your devices are unaffected (Disconnect →
Connect with a new passphrase re-encrypts on the next push).

Positions push a few seconds after you pause and pull on every app open;
merge is per-book newest-wins; deletions propagate via tombstones and always
win, so a deleted book never resurrects (re-importing it later is fine).
Offline is handled: sync retries automatically when the connection returns.

## Use it

- Paste any text, hit **Read this** (or **📋 Paste** straight from the clipboard).
- Play takes over the full screen with the word centered and counts down
  **● ● ●** (~1.5 s) before starting, so you have time to settle in — seeking
  and sentence-jumps resume instantly without the countdown. **✕** or Esc
  leaves reading mode; pausing stays in it and shows the surrounding sentence.
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
`presto.*` — all data stays in the browser.
