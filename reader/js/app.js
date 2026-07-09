/* ============================================================
   Fovea — RSVP speed reader.
   One word at a time; the ORP (optimal recognition point) letter
   is highlighted and pinned to a fixed screen position so the eye
   never moves. Smart pauses at punctuation, paragraph breaks and
   long words; a short ramp-up after every start so you re-orient.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  var el = {
    word: $('word'), before: $('w-before'), pivot: $('w-pivot'), after: $('w-after'),
    reticle: $('reticle'), context: $('context'), leadin: $('leadin'), exit: $('btn-exit'),
    scrub: $('scrub'), statPos: $('stat-pos'), statLeft: $('stat-left'),
    play: $('btn-play'), back: $('btn-back'), fwd: $('btn-fwd'), restart: $('btn-restart'),
    wpm: $('wpm'), wpmVal: $('wpm-val'), wpmMinus: $('wpm-minus'), wpmPlus: $('wpm-plus'),
    bias: $('bias'), biasVal: $('bias-val'),
    text: $('text'), load: $('btn-load'), paste: $('btn-paste'), sample: $('btn-sample'),
    scan: $('btn-scan'), scanFile: $('scan-file'),
    textStats: $('text-stats')
  };

  var LS = {
    get: function (k, d) {
      try { var v = localStorage.getItem('fovea.' + k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('fovea.' + k, JSON.stringify(v)); } catch (e) {}
    }
  };

  var SAMPLE = 'The Time Machine, by H. G. Wells. ' +
    'The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. ' +
    'His pale grey eyes shone and twinkled, and his usually pale face was flushed and animated. ' +
    'The fire burnt brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses.\n\n' +
    'Our chairs, being his patents, embraced and caressed us rather than submitted to be sat upon, and there was that luxurious after-dinner atmosphere, when thought runs gracefully free of the trammels of precision. ' +
    'And he put it to us in this way — marking the points with a lean forefinger — as we sat and lazily admired his earnestness over this new paradox (as we thought it) and his fecundity.\n\n' +
    '"You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted. ' +
    'The geometry, for instance, they taught you at school is founded on a misconception."';

  var INTRO = 'Welcome to Fovea. This app flashes text one word at a time, always at the same spot on the screen. ' +
    'The red letter marks the optimal recognition point of each word: keep your eyes locked on it and whole words snap into focus with zero eye movement. ' +
    'That is the trick — normal reading spends most of its time on tiny eye jumps between words. Remove the jumps and you read far faster.\n\n' +
    'Press play, or tap the word area. Use the slider or the arrow keys to change speed. ' +
    'Most people are comfortable at 300 words per minute within minutes, and 450 or more with a little practice. ' +
    'If you get lost, pause: the surrounding sentence appears so you can re-orient. The left and right arrows jump by sentence.\n\n' +
    'Ready? Paste your own text below — an article, an email, anything — and press "Read this".';

  /* ---------------- Tokenizer ---------------- */

  // Proportional ORP: the letter whose optical center sits nearest to
  // `bias` (default 35%) of the way through the word — every word then
  // balances at the same relative point, unlike Spritz's length bands.
  function orpIndex(len) {
    return Math.min(len - 1, Math.max(0, Math.round(len * bias - 0.5)));
  }

  var ALNUM = /[A-Za-z0-9À-ɏͰ-ϿЀ-ӿ]/;

  // Split token into [before, pivot, after] around its ORP letter.
  function splitORP(t) {
    var s = t.text, a = 0, b = s.length - 1;
    while (a < b && !ALNUM.test(s[a])) a++;
    while (b > a && !ALNUM.test(s[b])) b--;
    var core = b - a + 1;
    var i = ALNUM.test(s[a]) ? a + orpIndex(core) : Math.floor(s.length / 2);
    return [s.slice(0, i), s[i] || '', s.slice(i + 1)];
  }

  function tokenize(raw) {
    var tokens = [];
    var paras = raw.replace(/\r\n?/g, '\n').split(/\n\s*\n/);
    for (var p = 0; p < paras.length; p++) {
      var words = paras[p].split(/\s+/).filter(Boolean);
      for (var w = 0; w < words.length; w++) {
        var word = words[w];
        // Break very long words into hyphenated chunks that fit the reticle.
        while (word.length > 15) {
          tokens.push({ text: word.slice(0, 12) + '-', sentEnd: false, paraEnd: false });
          word = word.slice(12);
        }
        tokens.push({
          text: word,
          sentEnd: /[.!?…]['")\]’”]*$/.test(word),
          paraEnd: false
        });
      }
      if (tokens.length && p < paras.length - 1) tokens[tokens.length - 1].paraEnd = true;
    }
    // Per-token display-time multiplier (1 = base wpm interval).
    var cum = 0;
    for (var i = 0; i < tokens.length; i++) {
      var t = tokens[i], f = 1, len = t.text.length;
      if (len >= 6) f += 0.15;
      if (len >= 10) f += 0.25;
      if (/\d/.test(t.text)) f += 0.3;
      if (t.sentEnd) f += 1.4;
      else if (/[,;:—–)]['")\]]*$/.test(t.text)) f += 0.6;
      if (t.paraEnd) f += 1.2;
      t.factor = f;
      cum += f;
      t.cum = cum; // prefix sum, for time-remaining estimates
    }
    return tokens;
  }

  /* ---------------- Player state ---------------- */

  var tokens = [];
  var pos = 0;            // index of the word currently displayed
  var playing = false;
  var timer = null;
  var ramp = 0;           // words shown since last (re)start — eases speed in
  var wpm = LS.get('wpm', 300);
  var bias = LS.get('bias', 0.35); // pivot position as a fraction of the word
  var wakeLock = null;

  function baseMs() { return 60000 / wpm; }

  // Ease from ~2.2x slower to full speed over the first 8 words.
  function rampFactor() { return 1 + Math.max(0, 8 - ramp) * 0.15; }

  /* ---------------- Rendering ---------------- */

  function renderWord() {
    var t = tokens[pos];
    if (!t) { el.before.textContent = ''; el.pivot.textContent = ''; el.after.textContent = ''; return; }
    var parts = splitORP(t);
    el.before.textContent = parts[0];
    el.pivot.textContent = parts[1];
    el.after.textContent = parts[2];
    // Long fragments can overflow half the reticle — drop to the small size.
    el.word.classList.toggle('shrink', Math.max(parts[0].length, parts[2].length + 1) > 10);
  }

  function fmtTime(ms) {
    var s = Math.round(ms / 1000);
    if (s < 60) return s + 's';
    return Math.floor(s / 60) + 'm ' + (s % 60) + 's';
  }

  function renderStats() {
    if (!tokens.length) { el.statPos.textContent = '–'; el.statLeft.textContent = '–'; return; }
    var t = tokens[pos];
    var doneCum = pos > 0 ? tokens[pos - 1].cum : 0;
    var leftMs = (tokens[tokens.length - 1].cum - doneCum) * baseMs();
    el.statPos.textContent = 'word ' + (pos + 1) + ' / ' + tokens.length;
    el.statLeft.textContent = fmtTime(leftMs) + ' left';
  }

  function renderScrub() { el.scrub.value = pos; }

  // When paused, show the sentence around the current word for re-orientation.
  function renderContext() {
    if (playing || !tokens.length) { el.context.hidden = true; return; }
    var a = pos, b = pos;
    while (a > 0 && !tokens[a - 1].sentEnd && !tokens[a - 1].paraEnd && pos - a < 18) a--;
    while (b < tokens.length - 1 && !tokens[b].sentEnd && !tokens[b].paraEnd && b - pos < 18) b++;
    var html = '';
    for (var i = a; i <= b; i++) {
      var w = tokens[i].text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      html += (i === pos ? '<mark>' + w + '</mark>' : w) + ' ';
    }
    el.context.innerHTML = html;
    el.context.hidden = false;
  }

  function renderAll() { renderWord(); renderStats(); renderScrub(); renderContext(); }

  /* ---------------- Playback ---------------- */

  function tick() {
    renderWord(); renderStats(); renderScrub();
    var t = tokens[pos];
    var delay = baseMs() * t.factor * rampFactor();
    ramp++;
    timer = setTimeout(function () {
      if (pos >= tokens.length - 1) { finish(); return; }
      pos++;
      tick();
    }, delay);
  }

  // Fullscreen takeover while reading: word centered mid-screen, controls
  // at the bottom. Entered on play, left via ✕ / Esc (pausing stays in it).
  function enterReading() {
    if (document.body.classList.contains('reading')) return;
    document.body.classList.add('reading');
    var de = document.documentElement;
    if (de.requestFullscreen) {
      try { de.requestFullscreen().catch(function () {}); } catch (e) {}
    }
  }

  function exitReading() {
    pause();
    document.body.classList.remove('reading');
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(function () {});
    }
  }

  var leadTimers = [];
  function clearLead() {
    leadTimers.forEach(clearTimeout);
    leadTimers = [];
    el.leadin.textContent = '';
  }

  // lead=false (internal resume after a seek) skips the countdown.
  function play(lead) {
    if (playing || !tokens.length) return;
    if (pos >= tokens.length - 1 && tokens.length > 1) pos = 0; // replay from the top
    playing = true;
    ramp = 0;
    document.body.classList.add('playing');
    el.play.textContent = '❚❚';
    el.context.hidden = true;
    enterReading();
    requestWakeLock();
    if (lead === false) { tick(); return; }
    // ~1.5s lead-in: first word is up, dots count down while you settle in.
    renderWord(); renderStats(); renderScrub();
    ['● ● ●', '● ●', '●'].forEach(function (d, i) {
      leadTimers.push(setTimeout(function () { el.leadin.textContent = d; }, i * 500));
    });
    leadTimers.push(setTimeout(function () { clearLead(); tick(); }, 1500));
  }

  function pause() {
    if (!playing) return;
    playing = false;
    clearTimeout(timer);
    clearLead();
    document.body.classList.remove('playing');
    el.play.textContent = '▶';
    releaseWakeLock();
    renderContext();
    LS.set('pos', pos);
  }

  function finish() {
    pause();
    LS.set('pos', 0);
  }

  function toggle() { playing ? pause() : play(); }

  function seek(i, keepPlaying) {
    var wasPlaying = playing;
    pause();
    pos = Math.max(0, Math.min(tokens.length - 1, i));
    ramp = 0;
    renderAll();
    LS.set('pos', pos);
    if (keepPlaying && wasPlaying) play(false);
  }

  function sentenceStart(i) {
    while (i > 0 && !tokens[i - 1].sentEnd && !tokens[i - 1].paraEnd) i--;
    return i;
  }

  function prevSentence() {
    var start = sentenceStart(pos);
    seek(pos - start < 3 ? sentenceStart(Math.max(0, start - 1)) : start, true);
  }

  function nextSentence() {
    var i = pos;
    while (i < tokens.length - 1 && !tokens[i].sentEnd && !tokens[i].paraEnd) i++;
    seek(Math.min(tokens.length - 1, i + 1), true);
  }

  /* ---------------- Speed ---------------- */

  function setWpm(v) {
    wpm = Math.max(100, Math.min(900, Math.round(v / 25) * 25));
    el.wpm.value = wpm;
    el.wpmVal.innerHTML = wpm + '<small> wpm</small>';
    LS.set('wpm', wpm);
    renderStats();
  }

  // Pivot bias, as a percent (25–50). Re-renders live so the shift is visible.
  function setBias(pct) {
    pct = Math.max(25, Math.min(50, Math.round(pct)));
    bias = pct / 100;
    el.bias.value = pct;
    el.biasVal.textContent = pct + '%';
    LS.set('bias', bias);
    renderWord();
  }

  /* ---------------- Wake lock (keep screen on while reading) ---------------- */

  function requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    navigator.wakeLock.request('screen').then(function (l) { wakeLock = l; }).catch(function () {});
  }
  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release().catch(function () {}); wakeLock = null; }
  }

  /* ---------------- Loading text ---------------- */

  function loadText(raw, startAt) {
    pause();
    tokens = tokenize(raw || '');
    pos = Math.max(0, Math.min(tokens.length - 1, startAt || 0));
    el.scrub.max = Math.max(0, tokens.length - 1);
    var can = tokens.length > 0;
    el.play.disabled = el.back.disabled = el.fwd.disabled = el.restart.disabled = el.scrub.disabled = !can;
    if (can) {
      var mins = tokens[tokens.length - 1].cum * baseMs() / 60000;
      el.textStats.textContent = tokens.length + ' words · ~' + (mins < 1 ? Math.ceil(mins * 60) + 's' : Math.ceil(mins) + ' min') + ' at ' + wpm + ' wpm';
    } else {
      el.textStats.textContent = '';
    }
    LS.set('text', raw);
    LS.set('pos', pos);
    renderAll();
  }

  /* ---------------- Scan (OCR) ---------------- */

  var ocrScript = null; // lazy one-time load of the vendored engine
  var scanning = false;

  function loadOcrEngine() {
    if (window.Tesseract) return Promise.resolve();
    if (!ocrScript) {
      ocrScript = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = 'vendor/tesseract.min.js';
        s.onload = resolve;
        s.onerror = function () { ocrScript = null; reject(new Error('engine failed to load')); };
        document.head.appendChild(s);
      });
    }
    return ocrScript;
  }

  function createOcrWorker(coreFile, status) {
    return window.Tesseract.createWorker('eng', 1, {
      workerPath: 'vendor/worker.min.js',
      corePath: 'vendor/core/' + coreFile,
      langPath: 'vendor/lang',
      logger: function (m) {
        if (m.status === 'recognizing text') status('Reading photo… ' + Math.round(m.progress * 100) + '%');
        else if (m.status === 'loading tesseract core') status('Loading OCR engine…');
        else if (/language|traineddata/.test(m.status)) status('Loading language data…');
      }
    });
  }

  function loadImageFile(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { resolve({ img: img, url: url }); };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error('could not read that image')); };
      img.src = url;
    });
  }

  // Camera photos of pages have shadows and uneven lighting; the engine's
  // internal thresholding is global, so a shadow across the page destroys
  // half the text. Fix: Bradley–Roth adaptive thresholding — each pixel is
  // compared to the mean of its neighbourhood (via an integral image), so
  // lighting gradients cancel out. Returns the plain scaled photo too, as
  // a fallback for images where binarization hurts (screenshots, screens).
  function prepareImages(img) {
    var k = Math.min(1, 2200 / Math.max(img.width, img.height));
    var w = Math.round(img.width * k), h = Math.round(img.height * k);
    var base = document.createElement('canvas');
    base.width = w; base.height = h;
    base.getContext('2d').drawImage(img, 0, 0, w, h);

    var d = base.getContext('2d').getImageData(0, 0, w, h).data;
    var n = w * h;
    var gray = new Uint8ClampedArray(n);
    var sum = 0;
    for (var i = 0, j = 0; j < n; i += 4, j++) {
      gray[j] = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
      sum += gray[j];
    }
    if (sum / n < 110) { // dark background (screens, slides) — invert to dark-on-light
      for (j = 0; j < n; j++) gray[j] = 255 - gray[j];
    }

    // integral image; max total 255*2200*2200 fits in Uint32
    var integ = new Uint32Array(n);
    for (var y = 0; y < h; y++) {
      var rowSum = 0;
      for (var x = 0; x < w; x++) {
        rowSum += gray[y * w + x];
        integ[y * w + x] = rowSum + (y > 0 ? integ[(y - 1) * w + x] : 0);
      }
    }

    var half = Math.max(8, Math.round(Math.max(w, h) / 16)); // window ≈ ⅛ of the page
    var out = document.createElement('canvas');
    out.width = w; out.height = h;
    var octx = out.getContext('2d');
    var oid = octx.createImageData(w, h);
    var od = oid.data;
    for (y = 0; y < h; y++) {
      var y1 = Math.max(0, y - half), y2 = Math.min(h - 1, y + half);
      for (x = 0; x < w; x++) {
        var x1 = Math.max(0, x - half), x2 = Math.min(w - 1, x + half);
        var area = (x2 - x1 + 1) * (y2 - y1 + 1);
        var s = integ[y2 * w + x2]
          - (x1 > 0 ? integ[y2 * w + x1 - 1] : 0)
          - (y1 > 0 ? integ[(y1 - 1) * w + x2] : 0)
          + (x1 > 0 && y1 > 0 ? integ[(y1 - 1) * w + x1 - 1] : 0);
        var v = gray[y * w + x] * area < s * 0.87 ? 0 : 255; // 13% below local mean → ink
        var o = (y * w + x) * 4;
        od[o] = od[o + 1] = od[o + 2] = v;
        od[o + 3] = 255;
      }
    }
    octx.putImageData(oid, 0, 0);
    return { bin: out, base: base };
  }

  // OCR output is hard-wrapped at the photo's line breaks: un-hyphenate
  // words split across lines, then rejoin single newlines into spaces
  // (blank lines stay as paragraph breaks).
  function cleanOcrText(t) {
    return t
      .replace(/-\n(?=[a-z])/g, '')
      .replace(/([^\n])\n(?!\n)/g, '$1 ')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  function runScan(file) {
    if (scanning) return;
    if (location.protocol === 'file:') {
      el.textStats.textContent = 'Scanning needs the app served over http — use Serve to iPhone, then open via the URL it prints.';
      return;
    }
    scanning = true;
    el.scan.disabled = true;
    var status = function (msg) { el.textStats.textContent = msg; };
    var worker = null;
    status('Preparing image…');
    loadOcrEngine()
      .then(function () { return loadImageFile(file); })
      .then(function (loaded) {
        var imgs = prepareImages(loaded.img);
        URL.revokeObjectURL(loaded.url);
        // SIMD build first; retry with the plain build on older devices.
        return createOcrWorker('tesseract-core-simd-lstm.wasm.js', status)
          .catch(function () { return createOcrWorker('tesseract-core-lstm.wasm.js', status); })
          .then(function (w) {
            worker = w;
            return w.setParameters({ user_defined_dpi: '300' }).catch(function () {});
          })
          .then(function () { return worker.recognize(imgs.bin); })
          .then(function (r1) {
            // The engine reports mean word confidence (0–100). If the
            // cleaned-up image scored poorly, try the raw photo and keep
            // whichever read the engine trusted more.
            var c1 = (r1.data && r1.data.confidence) || 0;
            if (c1 >= 70) return r1;
            status('Hard image — trying a second pass…');
            return worker.recognize(imgs.base).then(function (r2) {
              var c2 = (r2.data && r2.data.confidence) || 0;
              return c2 > c1 ? r2 : r1;
            });
          });
      })
      .then(function (ret) {
        var text = cleanOcrText((ret.data && ret.data.text) || '');
        var conf = (ret.data && ret.data.confidence) || 0;
        if (!text || conf < 35) {
          status('Couldn’t read that photo. Best results: fill the frame with the text, shoot square-on, avoid shadows.');
          return;
        }
        el.text.value = text;
        loadText(text, 0);
        play();
      })
      .catch(function (e) {
        status('Scan failed: ' + ((e && e.message) || e));
      })
      .then(function () {
        if (worker) worker.terminate().catch(function () {});
        scanning = false;
        el.scan.disabled = false;
      });
  }

  /* ---------------- Wire up ---------------- */

  el.play.addEventListener('click', toggle);
  el.reticle.addEventListener('click', toggle);
  el.exit.addEventListener('click', exitReading);
  el.restart.addEventListener('click', function () { seek(0, false); });
  el.back.addEventListener('click', prevSentence);
  el.fwd.addEventListener('click', nextSentence);

  el.scrub.addEventListener('input', function () { seek(+el.scrub.value, true); });

  el.wpm.addEventListener('input', function () { setWpm(+el.wpm.value); });
  el.wpmMinus.addEventListener('click', function () { setWpm(wpm - 25); });
  el.wpmPlus.addEventListener('click', function () { setWpm(wpm + 25); });

  el.bias.addEventListener('input', function () { setBias(+el.bias.value); });

  el.load.addEventListener('click', function () {
    loadText(el.text.value.trim(), 0);
    if (tokens.length) play();
  });
  el.sample.addEventListener('click', function () {
    el.text.value = SAMPLE;
    loadText(SAMPLE, 0);
  });
  el.scan.addEventListener('click', function () { el.scanFile.click(); });
  el.scanFile.addEventListener('change', function () {
    var f = el.scanFile.files && el.scanFile.files[0];
    el.scanFile.value = ''; // so re-picking the same photo fires change again
    if (f) runScan(f);
  });

  el.paste.addEventListener('click', function () {
    if (!navigator.clipboard || !navigator.clipboard.readText) {
      el.textStats.textContent = 'Clipboard needs HTTPS or localhost — paste into the box instead.';
      return;
    }
    navigator.clipboard.readText().then(function (t) {
      if (!t.trim()) return;
      el.text.value = t;
      loadText(t.trim(), 0);
      play();
    }).catch(function () {
      el.textStats.textContent = 'Clipboard blocked — paste into the box instead.';
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.target === el.text) return; // typing in the textarea
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setWpm(wpm + 25); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setWpm(wpm - 25); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSentence(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); nextSentence(); }
    else if (e.key === 'r' || e.key === 'R') { seek(0, false); }
    else if (e.key === 'Escape') { exitReading(); }
  });

  // Pause when the tab is hidden — never lose your place mid-flash.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause();
    else if (playing) requestWakeLock();
  });
  window.addEventListener('pagehide', function () { LS.set('pos', pos); });

  /* ---------------- Boot ---------------- */

  // Text can arrive via the URL fragment (#t=<encoded>) — used by the
  // macOS right-click service and bookmarklets. Loads it and autoplays.
  function textFromHash() {
    if (location.hash.indexOf('#t=') !== 0) return null;
    try { return decodeURIComponent(location.hash.slice(3)).trim() || null; }
    catch (e) { return null; }
  }

  function acceptHashText() {
    var t = textFromHash();
    if (!t) return false;
    history.replaceState(null, '', location.pathname + location.search);
    el.text.value = t;
    loadText(t, 0);
    play();
    return true;
  }

  window.addEventListener('hashchange', acceptHashText);

  setWpm(wpm);
  setBias(bias * 100);
  if (!acceptHashText()) {
    var savedText = LS.get('text', null);
    if (savedText) {
      el.text.value = savedText;
      loadText(savedText, LS.get('pos', 0));
    } else {
      el.text.value = '';
      loadText(INTRO, 0);
    }
  }

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
