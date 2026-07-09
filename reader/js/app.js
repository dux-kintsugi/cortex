/* ============================================================
   Presto — RSVP speed reader.
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
    pdf: $('btn-pdf'), pdfFile: $('pdf-file'), cancel: $('btn-cancel'),
    library: $('library'), bookList: $('book-list'),
    textStats: $('text-stats')
  };

  var LS = {
    get: function (k, d) {
      try { var v = localStorage.getItem('presto.' + k); return v === null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('presto.' + k, JSON.stringify(v)); } catch (e) {}
    }
  };

  // One-time migration from when the app was called Fovea.
  try {
    var oldKeys = [];
    for (var ki = 0; ki < localStorage.length; ki++) {
      var kk = localStorage.key(ki);
      if (kk && kk.indexOf('fovea.') === 0) oldKeys.push(kk);
    }
    oldKeys.forEach(function (k) {
      var nk = 'presto.' + k.slice(6);
      if (localStorage.getItem(nk) === null) localStorage.setItem(nk, localStorage.getItem(k));
      localStorage.removeItem(k);
    });
  } catch (e) {}

  /* ---------------- Library storage (IndexedDB — books are too big for localStorage) ---------------- */

  var idbPromise = null;
  function db() {
    if (!idbPromise) {
      idbPromise = new Promise(function (resolve, reject) {
        var req = indexedDB.open('presto', 1);
        req.onupgradeneeded = function () { req.result.createObjectStore('books', { keyPath: 'id' }); };
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
      });
    }
    return idbPromise;
  }
  function idbPut(book) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var tx = d.transaction('books', 'readwrite');
        tx.objectStore('books').put(book);
        tx.oncomplete = res;
        tx.onerror = function () { rej(tx.error); };
      });
    });
  }
  function idbGet(id) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var rq = d.transaction('books').objectStore('books').get(id);
        rq.onsuccess = function () { res(rq.result); };
        rq.onerror = function () { rej(rq.error); };
      });
    });
  }
  function idbAll() {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var rq = d.transaction('books').objectStore('books').getAll();
        rq.onsuccess = function () { res(rq.result || []); };
        rq.onerror = function () { rej(rq.error); };
      });
    });
  }
  function idbDelete(id) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var tx = d.transaction('books', 'readwrite');
        tx.objectStore('books').delete(id);
        tx.oncomplete = res;
        tx.onerror = function () { rej(tx.error); };
      });
    });
  }

  var SAMPLE = 'The Time Machine, by H. G. Wells. ' +
    'The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. ' +
    'His pale grey eyes shone and twinkled, and his usually pale face was flushed and animated. ' +
    'The fire burnt brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses.\n\n' +
    'Our chairs, being his patents, embraced and caressed us rather than submitted to be sat upon, and there was that luxurious after-dinner atmosphere, when thought runs gracefully free of the trammels of precision. ' +
    'And he put it to us in this way — marking the points with a lean forefinger — as we sat and lazily admired his earnestness over this new paradox (as we thought it) and his fecundity.\n\n' +
    '"You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted. ' +
    'The geometry, for instance, they taught you at school is founded on a misconception."';

  var INTRO = 'Welcome to Presto. This app flashes text one word at a time, always at the same spot on the screen. ' +
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
  var currentBook = null; // library book being read, if any
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

  // Persist the reading position — and for library books, into the book
  // record too, so "continue where you left off" survives across sessions.
  function savePosition() {
    LS.set('pos', pos);
    if (currentBook) {
      currentBook.pos = pos;
      currentBook.lastReadAt = Date.now();
      idbPut(currentBook).then(renderLibrary).catch(function () {});
    }
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
    savePosition();
  }

  function finish() {
    pause();
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

  function loadText(raw, startAt, book) {
    pause(); // also saves the outgoing book's position
    currentBook = book || null;
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
    if (book) {
      // books live in IndexedDB; localStorage just points at the open one
      LS.set('book', book.id);
      try { localStorage.removeItem('presto.text'); } catch (e) {}
    } else {
      LS.set('book', null);
      LS.set('text', raw);
    }
    LS.set('pos', pos);
    renderAll();
  }

  /* ---------------- Page furniture (headers / footers) ---------------- */

  // Lines are {text, yTop (0=page top, 1=bottom), width, h, para?}, in
  // reading order. Running heads, chapter headers and page numbers get cut
  // only when position AND content agree — never eat real paragraphs.
  function stripFurniture(lines) {
    if (lines.length < 5) return lines;
    var sorted = function (arr) { return arr.slice().sort(function (a, b) { return a - b; }); };
    var medW = sorted(lines.map(function (l) { return l.width; }))[Math.floor(lines.length / 2)];
    var medH = sorted(lines.map(function (l) { return l.h || 0; }))[Math.floor(lines.length / 2)];
    function furniture(l) {
      var t = l.text;
      if (/^[\s\-–—.·[\]()]*\d{1,4}[\s\-–—.·[\]()]*$/.test(t)) return true; // bare page number
      if (/^[ivxlcdm]{1,7}$/i.test(t)) return true;                          // roman-numeral folio
      var words = t.split(/\s+/).length;
      if (words > 7 || l.width > medW * 0.75) return false;                  // real text line
      var caps = t.length > 2 && t === t.toUpperCase() && /[A-Z]/.test(t);   // RUNNING HEAD
      var edgeNum = /^\d{1,4}\s/.test(t) || /\s\d{1,4}$/.test(t);            // "142 THE TIME MACHINE"
      var bigFont = medH > 0 && l.h > medH * 1.35;                           // chapter heading
      return caps || edgeNum || bigFont || words <= 3;
    }
    var out = lines.slice(), cut = 0;
    while (out.length > 2 && cut < 2 && out[0].yTop < 0.18 && furniture(out[0])) { out.shift(); cut++; }
    cut = 0;
    while (out.length > 2 && cut < 2 && out[out.length - 1].yTop > 0.82 && furniture(out[out.length - 1])) { out.pop(); cut++; }
    return out;
  }

  // Rebuild page text from surviving lines: para keys (OCR) or vertical
  // gaps (PDF text layer) decide paragraph breaks; cleanOcrText later
  // merges intra-paragraph line wraps.
  function linesToPageText(lines) {
    var kept = stripFurniture(lines);
    if (!kept.length) return '';
    var parts = [], prev = null;
    var gaps = [];
    for (var i = 1; i < kept.length; i++) gaps.push(kept[i].yTop - kept[i - 1].yTop);
    gaps = gaps.filter(function (g) { return g > 0; }).sort(function (a, b) { return a - b; });
    var medGap = gaps.length ? gaps[Math.floor(gaps.length / 2)] : 0;
    kept.forEach(function (l) {
      var newPara = !prev
        || (l.para !== undefined && l.para !== prev.para)
        || (l.para === undefined && medGap > 0 && (l.yTop - prev.yTop) > medGap * 1.75);
      parts.push(newPara && parts.length ? '\n\n' + l.text : (parts.length ? '\n' + l.text : l.text));
      prev = l;
    });
    return parts.join('');
  }

  // Flatten the OCR engine's blocks→paragraphs→lines tree.
  function ocrToLines(data, imgH) {
    var lines = [];
    (data.blocks || []).forEach(function (b, bi) {
      (b.paragraphs || []).forEach(function (pg, pi) {
        (pg.lines || []).forEach(function (ln) {
          var t = (ln.text || '').replace(/\s+/g, ' ').trim();
          if (!t || !ln.bbox) return;
          lines.push({
            text: t,
            yTop: ln.bbox.y0 / imgH,
            width: ln.bbox.x1 - ln.bbox.x0,
            h: ln.bbox.y1 - ln.bbox.y0,
            para: bi + ':' + pi
          });
        });
      });
    });
    return lines;
  }

  function ocrResultToText(ret, imgH) {
    if (ret.data && ret.data.blocks && ret.data.blocks.length) {
      var t = linesToPageText(ocrToLines(ret.data, imgH));
      if (t) return t;
    }
    return (ret.data && ret.data.text) || '';
  }

  // Join per-page texts: un-split hyphenated words across page turns, and
  // only make a paragraph break when the previous page ended a sentence.
  function joinPages(pages) {
    var out = '';
    pages.forEach(function (p) {
      p = (p || '').trim();
      if (!p) return;
      if (!out) { out = p; return; }
      if (/[A-Za-z]-$/.test(out)) out = out.replace(/-$/, '') + p;
      else if (/[.!?…:'"”)\]]$/.test(out)) out += '\n\n' + p;
      else out += ' ' + p;
    });
    return out;
  }

  /* ---------------- Library ---------------- */

  function renderLibrary() {
    idbAll().then(function (books) {
      if (!books.length) { el.library.hidden = true; return; }
      books.sort(function (a, b) { return (b.lastReadAt || 0) - (a.lastReadAt || 0); });
      el.bookList.innerHTML = '';
      books.forEach(function (b) {
        var row = document.createElement('div');
        row.className = 'book';
        var pct = b.totalWords > 1 ? Math.round(100 * (b.pos || 0) / (b.totalWords - 1)) : 0;
        var title = document.createElement('span');
        title.className = 'b-title';
        title.textContent = b.title;
        var meta = document.createElement('span');
        meta.className = 'b-meta';
        meta.textContent = pct >= 99 ? 'finished' : (pct > 0 ? pct + '%' : 'new') + ' · ' + Math.round(b.totalWords / 100) / 10 + 'k words';
        var del = document.createElement('button');
        del.className = 'b-del';
        del.textContent = '🗑';
        del.title = 'Remove from library';
        del.addEventListener('click', function (ev) {
          ev.stopPropagation();
          if (!confirm('Remove "' + b.title + '" from the library?')) return;
          idbDelete(b.id).then(function () {
            if (currentBook && currentBook.id === b.id) currentBook = null;
            renderLibrary();
          }).catch(function () {});
        });
        row.appendChild(title); row.appendChild(meta); row.appendChild(del);
        row.addEventListener('click', function () { loadBook(b); });
        el.bookList.appendChild(row);
      });
      el.library.hidden = false;
    }).catch(function () { el.library.hidden = true; });
  }

  function loadBook(b) {
    el.text.value = b.text;
    loadText(b.text, b.pos || 0, b);
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

  var OCR_OUTPUT = { text: true, blocks: true }; // blocks carry line positions for furniture removal

  function setBusy(busy) {
    scanning = busy;
    el.scan.disabled = el.pdf.disabled = busy;
    el.cancel.hidden = !busy;
  }

  function makeOcrWorker(status) {
    // SIMD build first; retry with the plain build on older devices.
    return createOcrWorker('tesseract-core-simd-lstm.wasm.js', status)
      .catch(function () { return createOcrWorker('tesseract-core-lstm.wasm.js', status); })
      .then(function (w) {
        return w.setParameters({ user_defined_dpi: '300' })
          .catch(function () {})
          .then(function () { return w; });
      });
  }

  function runScan(file) {
    if (scanning) return;
    if (location.protocol === 'file:') {
      el.textStats.textContent = 'Scanning needs the app served over http — use Serve to iPhone, then open via the URL it prints.';
      return;
    }
    setBusy(true);
    var status = function (msg) { el.textStats.textContent = msg; };
    var worker = null;
    status('Preparing image…');
    loadOcrEngine()
      .then(function () { return loadImageFile(file); })
      .then(function (loaded) {
        var imgs = prepareImages(loaded.img);
        URL.revokeObjectURL(loaded.url);
        return makeOcrWorker(status)
          .then(function (w) { worker = w; return w.recognize(imgs.bin, {}, OCR_OUTPUT); })
          .then(function (r1) {
            // The engine reports mean word confidence (0–100). If the
            // cleaned-up image scored poorly, try the raw photo and keep
            // whichever read the engine trusted more.
            var c1 = (r1.data && r1.data.confidence) || 0;
            if (c1 >= 70) return { ret: r1, imgH: imgs.bin.height };
            status('Hard image — trying a second pass…');
            return worker.recognize(imgs.base, {}, OCR_OUTPUT).then(function (r2) {
              var c2 = (r2.data && r2.data.confidence) || 0;
              return c2 > c1 ? { ret: r2, imgH: imgs.base.height } : { ret: r1, imgH: imgs.bin.height };
            });
          });
      })
      .then(function (best) {
        var text = cleanOcrText(ocrResultToText(best.ret, best.imgH));
        var conf = (best.ret.data && best.ret.data.confidence) || 0;
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
        setBusy(false);
      });
  }

  /* ---------------- PDF import ---------------- */

  var pdfScript = null;
  var cancelRequested = false;

  function loadPdfEngine() {
    if (window.pdfjsLib) return Promise.resolve();
    if (!pdfScript) {
      pdfScript = new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = 'vendor/pdf.min.js';
        s.onload = function () {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';
          resolve();
        };
        s.onerror = function () { pdfScript = null; reject(new Error('PDF engine failed to load')); };
        document.head.appendChild(s);
      });
    }
    return pdfScript;
  }

  // Lines with positions from a PDF's embedded text layer (y origin is the
  // page bottom in PDF space; convert to yTop fractions).
  function pageTextLines(page) {
    return page.getTextContent().then(function (tc) {
      var H = page.view[3] - page.view[1];
      var items = [];
      tc.items.forEach(function (it) {
        if (!it.str || !it.str.trim() || !it.transform) return;
        items.push({ x: it.transform[4], y: it.transform[5], size: Math.abs(it.transform[0]) || 0, w: it.width || 0, str: it.str });
      });
      items.sort(function (a, b) { return b.y - a.y || a.x - b.x; });
      var rows = [];
      items.forEach(function (it) {
        var R = rows[rows.length - 1];
        if (R && Math.abs(R.y - it.y) < 3) R.parts.push(it);
        else rows.push({ y: it.y, parts: [it] });
      });
      return rows.map(function (R) {
        R.parts.sort(function (a, b) { return a.x - b.x; });
        var first = R.parts[0], last = R.parts[R.parts.length - 1];
        return {
          text: R.parts.map(function (p) { return p.str; }).join(' ').replace(/\s+/g, ' ').trim(),
          yTop: 1 - (R.y / H),
          width: (last.x + last.w) - first.x,
          h: Math.max.apply(null, R.parts.map(function (p) { return p.size; }))
        };
      }).filter(function (l) { return l.text; });
    });
  }

  function runPdf(file) {
    if (scanning) return;
    if (location.protocol === 'file:') {
      el.textStats.textContent = 'PDF import needs the app served over http — use Serve to iPhone, then open via the URL it prints.';
      return;
    }
    setBusy(true);
    cancelRequested = false;
    var status = function (msg) { el.textStats.textContent = msg; };
    var worker = null, pdf = null;
    var title = file.name.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ').trim() || 'Untitled';
    status('Opening PDF…');
    loadPdfEngine()
      .then(function () { return file.arrayBuffer(); })
      .then(function (buf) { return window.pdfjsLib.getDocument({ data: buf }).promise; })
      .then(function (doc) {
        pdf = doc;
        return pdf.getMetadata().then(function (m) {
          var t = m && m.info && m.info.Title;
          if (t && String(t).trim() && !/^untitled/i.test(String(t).trim())) title = String(t).trim();
        }).catch(function () {});
      })
      .then(function () {
        // Probe mid-book pages: a real text layer means no OCR needed.
        var probes = [];
        [0.3, 0.5, 0.7].forEach(function (f) {
          var p = Math.max(1, Math.ceil(pdf.numPages * f));
          if (probes.indexOf(p) === -1) probes.push(p);
        });
        return Promise.all(probes.map(function (p) {
          return pdf.getPage(p).then(pageTextLines).then(function (lines) {
            return lines.map(function (l) { return l.text; }).join(' ').length;
          });
        })).then(function (counts) {
          counts.sort(function (a, b) { return a - b; });
          return counts[Math.floor(counts.length / 2)] > 120; // median chars per probed page
        });
      })
      .then(function (hasTextLayer) {
        var pages = [];
        var nums = [];
        for (var i = 1; i <= pdf.numPages; i++) nums.push(i);

        if (hasTextLayer) {
          return nums.reduce(function (chain, p) {
            return chain.then(function () {
              if (cancelRequested) return;
              if (p === 1 || p % 20 === 0) status('Reading text layer… page ' + p + ' / ' + pdf.numPages);
              return pdf.getPage(p).then(pageTextLines).then(function (lines) {
                pages.push(cleanOcrText(linesToPageText(lines)));
              });
            });
          }, Promise.resolve()).then(function () { return pages; });
        }

        // Scanned book: OCR page by page (slow — progress + cancel).
        status('Scanned book — OCR will take a while…');
        return loadOcrEngine()
          .then(function () { return makeOcrWorker(status); })
          .then(function (w) {
            worker = w;
            return nums.reduce(function (chain, p) {
              return chain.then(function () {
                if (cancelRequested) return;
                status('Scanning page ' + p + ' / ' + pdf.numPages + '…');
                return pdf.getPage(p).then(function (page) {
                  var vp = page.getViewport({ scale: 1 });
                  var scale = Math.max(1, Math.min(3, 2000 / vp.width));
                  var v2 = page.getViewport({ scale: scale });
                  var c = document.createElement('canvas');
                  c.width = Math.round(v2.width); c.height = Math.round(v2.height);
                  // print intent: display intent schedules on requestAnimationFrame,
                  // which browsers suppress in hidden/backgrounded tabs — the render
                  // would hang if the user switches away mid-import.
                  return page.render({ canvasContext: c.getContext('2d'), viewport: v2, intent: 'print' }).promise
                    .then(function () {
                      var imgs = prepareImages(c);
                      return worker.recognize(imgs.bin, {}, OCR_OUTPUT).then(function (r) {
                        if (((r.data && r.data.confidence) || 0) < 50) {
                          return worker.recognize(imgs.base, {}, OCR_OUTPUT).then(function (r2) {
                            var better = ((r2.data && r2.data.confidence) || 0) > ((r.data && r.data.confidence) || 0) ? r2 : r;
                            return { ret: better, imgH: imgs.bin.height };
                          });
                        }
                        return { ret: r, imgH: imgs.bin.height };
                      });
                    })
                    .then(function (best) { pages.push(cleanOcrText(ocrResultToText(best.ret, best.imgH))); });
                });
              });
            }, Promise.resolve()).then(function () { return pages; });
          });
      })
      .then(function (pages) {
        var text = joinPages(pages);
        if (!text || text.split(/\s+/).length < 20) {
          status('Couldn’t get readable text out of that PDF.');
          return;
        }
        var book = {
          id: Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
          title: title, text: text, pos: 0, totalWords: 0,
          addedAt: Date.now(), lastReadAt: Date.now()
        };
        el.text.value = text;
        loadText(text, 0, book);
        book.totalWords = tokens.length;
        idbPut(book).then(renderLibrary).catch(function () {});
        if (cancelRequested) status('Stopped early — saved the ' + tokens.length + ' words read so far.');
        play();
      })
      .catch(function (e) {
        status('PDF failed: ' + ((e && e.message) || e));
      })
      .then(function () {
        if (worker) worker.terminate().catch(function () {});
        if (pdf) { try { pdf.destroy(); } catch (e) {} }
        setBusy(false);
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

  el.pdf.addEventListener('click', function () { el.pdfFile.click(); });
  el.pdfFile.addEventListener('change', function () {
    var f = el.pdfFile.files && el.pdfFile.files[0];
    el.pdfFile.value = '';
    if (f) runPdf(f);
  });
  el.cancel.addEventListener('click', function () {
    cancelRequested = true;
    el.cancel.textContent = 'Stopping…';
    setTimeout(function () { el.cancel.textContent = '✕ Stop'; }, 2000);
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
  window.addEventListener('pagehide', function () { savePosition(); });

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

  function bootFromText() {
    var savedText = LS.get('text', null);
    if (savedText) {
      el.text.value = savedText;
      loadText(savedText, LS.get('pos', 0));
    } else {
      el.text.value = '';
      loadText(INTRO, 0);
    }
  }

  setWpm(wpm);
  setBias(bias * 100);
  renderLibrary();
  if (!acceptHashText()) {
    var savedBookId = LS.get('book', null);
    if (savedBookId) {
      idbGet(savedBookId).then(function (b) {
        if (b) { el.text.value = b.text; loadText(b.text, LS.get('pos', b.pos || 0), b); }
        else bootFromText();
      }).catch(bootFromText);
    } else {
      bootFromText();
    }
  }

  if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
