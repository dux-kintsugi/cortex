'use strict';
// Legō — unit views: grammar, vocabulary deck, tap-to-gloss reader, quiz.

(function () {
  const L = window.Lego;
  const LETTERS = /[A-Za-zĀĒĪŌŪȲāēīōūȳ]+/g;

  // =================== shared flashcard deck ===================
  // items: [{front, frontSub, back, backSub, speak, onGrade(grade)}]
  L.runDeck = function (container, items, opts) {
    let queue = L.shuffle(items);
    let seen = 0, again = 0;
    const total = items.length;

    function show() {
      if (!queue.length) { opts.onDone({ seen, again }); return; }
      const it = queue[0];
      container.innerHTML = `
        <div class="deckwrap">
          <div class="deckmeta">${Math.min(seen + 1, total)} of ${total}${again ? ` · ${again} to revisit` : ''}</div>
          <div class="fcard" id="fcard">
            <div class="fcard-front">
              <div class="fcard-latin">${L.esc(it.front)}</div>
              ${it.frontSub ? `<div class="fcard-sub">${L.esc(it.frontSub)}</div>` : ''}
              <button class="speakbtn" data-action="speak" data-text="${L.esc(it.speak || it.front)}" title="hear it">🔊</button>
              <div class="fcard-hint">tap to reveal</div>
            </div>
            <div class="fcard-back" hidden>
              <div class="fcard-gloss">${L.esc(it.back)}</div>
              ${it.backSub ? `<div class="fcard-ex">${it.backSub}</div>` : ''}
            </div>
          </div>
          <div class="gradebar" id="gradebar" hidden>
            <button class="btn grade again">Again</button>
            <button class="btn grade good">Good</button>
            <button class="btn grade easy">Easy</button>
          </div>
          <div class="kbdhint">space — flip · 1 again · 2 good · 3 easy</div>
        </div>`;

      const card = container.querySelector('#fcard');
      const bar = container.querySelector('#gradebar');
      card.addEventListener('click', e => {
        if (e.target.closest('.speakbtn')) return;
        card.querySelector('.fcard-front .fcard-hint').hidden = true;
        card.querySelector('.fcard-back').hidden = false;
        card.classList.add('flipped');
        bar.hidden = false;
      });
      bar.querySelector('.again').addEventListener('click', () => grade(0));
      bar.querySelector('.good').addEventListener('click', () => grade(1));
      bar.querySelector('.easy').addEventListener('click', () => grade(2));

      function grade(g) {
        it.onGrade && it.onGrade(g);
        queue.shift();
        if (g === 0) {
          again++;
          queue.splice(Math.min(3, queue.length), 0, it); // come back a few cards later
        } else {
          seen++;
        }
        show();
      }
    }
    show();
  };

  // =================== unit shell ===================
  L.renderUnit = function (app, id, tab) {
    const u = L.units[id];
    if (!u) {
      app.innerHTML = `<div class="empty"><h2>Unit ${L.roman(id)}</h2><p>This unit's content isn't available yet.</p><button class="btn" data-go="home">Back to the course</button></div>`;
      return;
    }
    if (!L.isUnlocked(id)) {
      app.innerHTML = `<div class="empty"><h2>🔒 Unit ${L.roman(id)} — ${L.esc(u.title)}</h2><p>Pass the Unit ${L.roman(id - 1)} quiz to unlock this unit.</p><button class="btn" data-go="unit|${id - 1}">Go to Unit ${L.roman(id - 1)}</button></div>`;
      return;
    }
    const us = L.unitState(id);
    tab = tab || 'grammar';
    const readsDone = us.reads[0] && us.reads[1];
    const tabs = [
      ['grammar', '1 · Grammar', us.grammar],
      ['vocab', '2 · Vocabulary', us.vocab],
      ['read', '3 · Reading', readsDone],
      ['quiz', '4 · Quiz', us.done],
    ];

    app.innerHTML = `
      <header class="uhead">
        <button class="crumb" data-go="home">← Course</button>
        <div class="uhead-main">
          <span class="uhead-num">${L.roman(id)}</span>
          <div>
            <h1>${L.esc(u.title)}</h1>
            <p>${L.esc(u.tagline)}</p>
          </div>
        </div>
        <nav class="utabs">
          ${tabs.map(([key, label, done]) =>
            `<button class="utab ${tab === key ? 'on' : ''} ${done ? 'tdone' : ''}" data-go="unit|${id}|${key}">${label}${done ? ' ✓' : ''}</button>`).join('')}
        </nav>
      </header>
      <div id="unitbody"></div>`;

    const body = app.querySelector('#unitbody');
    if (tab === 'grammar') renderGrammar(body, u, us);
    else if (tab === 'vocab') renderVocab(body, u, us);
    else if (tab === 'read') renderRead(body, u, us);
    else renderQuiz(body, u, us);
  };

  // =================== grammar ===================
  function renderGrammar(body, u, us) {
    if (!us.grammar) { us.grammar = true; L.save(); }
    body.innerHTML = `
      <article class="prose gsections">
        ${u.grammar.map(g => `
          <section class="gsection">
            <h2>${L.esc(g.heading)}</h2>
            ${g.body}
            ${g.table ? L.tableHTML(g.table) : ''}
            ${g.tip ? `<p class="tip">💡 ${L.esc(g.tip)}</p>` : ''}
          </section>`).join('<div class="orn">❦</div>')}
        <div class="stepnext">
          <button class="btn big" data-go="unit|${u.id}|vocab">Continue → Vocabulary</button>
        </div>
      </article>`;
  }

  // =================== vocabulary ===================
  function renderVocab(body, u, us) {
    body.innerHTML = `
      <div class="vhead">
        <p class="vintro">${u.vocab.length} new words. Skim the list, then study the deck —
        be honest with yourself and these words will follow you through the course at the right moments.</p>
        <button class="btn big" id="startdeck">${us.vocab ? 'Study the deck again' : 'Study the deck'}</button>
        ${us.vocab ? `<button class="btn ghost" data-go="unit|${u.id}|read">Skip to Reading →</button>` : ''}
      </div>
      <details class="vhelp" ${u.id <= 5 ? 'open' : ''}>
        <summary>How to read these entries</summary>
        <p>Entries follow dictionary convention. You never have to <em>produce</em> any of this — here is
        what the shorthand means, so nothing looks like secret code:</p>
        <p><strong>Nouns</strong> show a second form (marked <em>gen.</em> in early units) — the word's
        dictionary <em>fingerprint</em>, which tells you its family. Just learn the first form and the
        meaning; the fingerprint becomes useful from Unit V on. The letters <strong>m. / f. / n.</strong>
        mark grammatical gender: masculine, feminine, or neuter ("neither"). Bookkeeping, not biology —
        a table is feminine, a garden masculine.</p>
        <p><strong>Verbs</strong> list up to four <em>principal parts</em> (<span class="la">amō, amāre,
        amāvī, amātum</span>) — the raw material for every tense you will ever meet. Ignore all but the
        first until the course starts using the others in Stage II.</p>
        <p><strong>(never changes shape)</strong> means exactly that — some lucky words wear one form
        forever.</p>
      </details>
      <div class="tablewrap"><table class="vtable">
        <thead><tr><th>Latin</th><th>Part of speech</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          ${u.vocab.map(v => `
            <tr>
              <td class="la"><strong>${L.esc(v.latin)}</strong>, ${L.esc(v.forms)}
                <button class="speakbtn sm" data-action="speak" data-text="${L.esc(v.latin)}">🔊</button></td>
              <td class="pos">${L.esc(v.pos)}</td>
              <td>${L.esc(v.gloss)}</td>
              <td class="ex"><span class="la">${L.esc(v.example)}</span><br><span class="exg">${L.esc(v.exampleGloss)}</span></td>
            </tr>`).join('')}
        </tbody>
      </table></div>
      <div id="deckarea"></div>`;

    body.querySelector('#startdeck').addEventListener('click', () => {
      const area = body.querySelector('#deckarea');
      body.querySelector('.vhead').hidden = true;
      body.querySelector('.tablewrap').hidden = true;
      const items = u.vocab.map(v => ({
        front: v.latin,
        frontSub: v.forms + ' · ' + v.pos,
        back: v.gloss,
        backSub: `<span class="la">${L.esc(v.example)}</span><br>${L.esc(v.exampleGloss)}`,
        speak: v.latin,
        onGrade(g) {
          const key = `u${u.id}:${v.latin}`;
          L.state.srs[key] = L.SRS.grade(L.state.srs[key], g);
        },
      }));
      L.runDeck(area, items, {
        onDone(stats) {
          us.vocab = true;
          L.addXP(15);
          L.touchStreak();
          L.save();
          area.innerHTML = `
            <div class="doneCard">
              <div class="orn">❦</div>
              <h2>Deck complete</h2>
              <p>${u.vocab.length} words added to your review deck${stats.again ? ` — ${stats.again} marked for an early return` : ''}. +15 XP</p>
              <button class="btn big" data-go="unit|${u.id}|read">Continue → Reading</button>
            </div>`;
        },
      });
    });
  }

  // =================== reader ===================
  // rough stems of this unit's vocab, to visually flag new words in the text
  function vocabStems(u) {
    const stems = new Set();
    for (const v of u.vocab || []) {
      const w = L.stripMacrons((v.latin.split(/[ ,(]/)[0] || '').toLowerCase());
      if (w.length < 2) continue;
      const cut = w.length >= 8 ? 3 : w.length >= 5 ? 2 : w.length >= 4 ? 1 : 0;
      stems.add(w.slice(0, w.length - cut));
      if (w.endsWith('o') && w.length >= 3) stems.add(w.slice(0, -1)); // amō → am-
    }
    return [...stems].filter(s => s.length >= 2);
  }

  function tokenizeParagraph(p, glosses, stripped, stems) {
    return p.replace(LETTERS, m => {
      const key = m.toLowerCase();
      const g = glosses[key] !== undefined ? glosses[key] : stripped[L.stripMacrons(key)];
      const bare = L.stripMacrons(key);
      const isNew = stems && stems.some(s => bare.startsWith(s));
      return `<span class="w${isNew ? ' nw' : ''}" data-g="${L.esc(g || '(no gloss)')}">${L.esc(m)}</span>`;
    });
  }

  function renderRead(body, u, us, which) {
    if (L._openRead !== undefined) { which = L._openRead; delete L._openRead; }
    which = which || 0;
    L._sessionTaps = 0;
    L._tapSet = new Set();
    const r = u.readings[which];
    const strippedMap = {};
    for (const [k, v] of Object.entries(r.glosses || {})) strippedMap[L.stripMacrons(k)] = v;
    const stems = vocabStems(u);

    body.innerHTML = `
      <div class="readpick">
        ${u.readings.map((rd, i) => `
          <button class="pill ${i === which ? 'on' : ''} ${us.reads[i] ? 'pdone' : ''}" data-read="${i}">
            Lēctiō ${['I', 'II'][i]} · ${L.esc(rd.title)}${us.reads[i] ? ' ✓' : ''}</button>`).join('')}
      </div>
      <article class="reading">
        <h2 class="la">${L.esc(r.title)}</h2>
        <p class="rintro">${L.esc(r.intro)} <em>Tap any word for its meaning — <span class="nw-demo">gold-marked</span> words are new this unit.</em></p>
        <div class="rtext">
          ${r.paragraphs.map((p, i) => `
            <div class="rpar">
              <button class="speakbtn sm parspeak" data-action="speak" data-text="${L.esc(p)}">🔊</button>
              <p class="la rp">${tokenizeParagraph(p, r.glosses, strippedMap, stems)}</p>
              <button class="ptransbtn" data-pi="${i}">anglicē ▾</button>
              <p class="ptrans trans" hidden>${L.esc(r.translation[i] || '')}</p>
            </div>`).join('')}
        </div>
        <button class="btn ghost" id="transbtn">Show full translation</button>
        <button class="btn ghost" id="barebtn" title="The real test: no help, just Latin. Re-read bare until it feels like plain sentences.">Hide glosses · read bare</button>
        <div class="orn">❦</div>
        <h3 class="qhead">Quaestiōnēs — did you follow?</h3>
        <div id="rqs"></div>
      </article>`;

    body.querySelectorAll('[data-read]').forEach(b =>
      b.addEventListener('click', () => renderRead(body, u, us, +b.dataset.read)));
    body.querySelectorAll('.ptransbtn').forEach(b => b.addEventListener('click', () => {
      const box = b.nextElementSibling;
      box.hidden = !box.hidden;
    }));
    body.querySelector('#transbtn').addEventListener('click', e => {
      const boxes = [...body.querySelectorAll('.ptrans')];
      const anyHidden = boxes.some(b => b.hidden);
      boxes.forEach(b => { b.hidden = !anyHidden; });
      e.target.textContent = anyHidden ? 'Hide full translation' : 'Show full translation';
    });
    body.querySelector('#barebtn').addEventListener('click', e => {
      const rt = body.querySelector('.rtext');
      rt.classList.toggle('bare');
      const bare = rt.classList.contains('bare');
      e.target.textContent = bare ? 'Show glosses again' : 'Hide glosses · read bare';
      const tip = document.getElementById('glosstip');
      if (bare && tip) tip.classList.remove('show');
    });

    // comprehension questions
    const qwrap = body.querySelector('#rqs');
    let answered = 0;
    r.questions.forEach((q, qi) => {
      const div = document.createElement('div');
      div.className = 'qcard';
      div.innerHTML = `
        <p class="qtext">${qi + 1}. ${L.esc(q.q || q.prompt)}</p>
        <div class="qopts">${q.options.map((o, oi) => `<button class="qopt" data-oi="${oi}">${L.esc(o)}</button>`).join('')}</div>
        <p class="qexplain" hidden>${L.esc(q.explain)}</p>`;
      qwrap.appendChild(div);
      let doneQ = false;
      div.querySelectorAll('.qopt').forEach(btn => btn.addEventListener('click', () => {
        if (doneQ) return;
        doneQ = true;
        const oi = +btn.dataset.oi;
        div.querySelectorAll('.qopt')[q.answer].classList.add('correct');
        if (oi !== q.answer) btn.classList.add('wrong');
        div.querySelector('.qexplain').hidden = false;
        answered++;
        if (answered === r.questions.length && !us.reads[which]) {
          us.reads[which] = true;
          L.addXP(8);
          L.touchStreak();
          // lifetime input counter — the number that actually builds fluency
          const wordCount = (r.paragraphs.join(' ').match(LETTERS) || []).length;
          L.state.wordsRead = (L.state.wordsRead || 0) + wordCount;
          // looked-up words that are unit vocabulary come due today
          let pulled = 0;
          if (L._tapSet && L._tapSet.size) {
            const now = Date.now();
            for (const v of u.vocab) {
              const head = L.stripMacrons(v.latin.split(/[ ,(]/)[0].toLowerCase());
              if (head.length < 3) continue;
              const hit = [...L._tapSet].some(t => t === head || (head.length >= 4 && t.startsWith(head.slice(0, 4))));
              const card = hit && L.state.srs[`u${u.id}:${v.latin}`];
              if (card) { card.due = Math.min(card.due, now); card.ivl = Math.min(card.ivl, 1); pulled++; }
            }
          }
          L.save();
          const banner = document.createElement('div');
          banner.className = 'doneCard';
          const other = which === 0 ? 1 : 0;
          const key = `u${u.id}r${which}`;
          const tapNote = (L._sessionTaps || 0) >= 10
            ? `<p class="mini">You tapped ${L._sessionTaps} glosses in this passage${pulled ? ` — ${pulled} of those words were pulled into today’s review` : ''}.
               A quick pass through the deck would make the next reading feel smoother.</p>
               <p><button class="btn ghost" data-go="unit|${u.id}|vocab">Revisit the deck</button></p>`
            : (pulled ? `<p class="mini">${pulled} looked-up word${pulled === 1 ? '' : 's'} pulled into today’s review queue.</p>` : '');
          const rating = `
            <div class="raterow" data-key="${key}">
              <span class="mini">How did that feel?</span>
              <button class="ratebtn" data-rate="1">😶 shaky</button>
              <button class="ratebtn" data-rate="2">🙂 fine</button>
              <button class="ratebtn" data-rate="3">😎 easy</button>
            </div>`;
          banner.innerHTML = us.reads[other]
            ? `<h3>Both readings done — +8 XP</h3>${tapNote}${rating}<button class="btn big" data-go="unit|${u.id}|quiz">Continue → Quiz</button>`
            : `<h3>Lēctiō ${['I', 'II'][which]} done — +8 XP</h3>${tapNote}${rating}<button class="btn big" data-read2="${other}">On to Lēctiō ${['I', 'II'][other]} →</button>`;
          qwrap.appendChild(banner);
          banner.querySelectorAll('.ratebtn').forEach(rb => rb.addEventListener('click', () => {
            L.state.ratings = L.state.ratings || {};
            L.state.ratings[key] = +rb.dataset.rate;
            L.save();
            banner.querySelectorAll('.ratebtn').forEach(x => x.classList.remove('on'));
            rb.classList.add('on');
            if (rb.dataset.rate === '1') {
              const row = banner.querySelector('.raterow');
              if (!row.querySelector('.rateadvice')) {
                const p = document.createElement('p');
                p.className = 'mini rateadvice';
                p.textContent = 'Honest answer — re-read this one from the Library tomorrow; it will feel completely different.';
                row.appendChild(p);
              }
            }
          }));
          const nxt = banner.querySelector('[data-read2]');
          if (nxt) nxt.addEventListener('click', () => { renderRead(body, u, us, other); window.scrollTo(0, 0); });
        }
      }));
    });
  }

  // gloss tooltip (one global handler)
  document.addEventListener('click', e => {
    const tip = document.getElementById('glosstip');
    if (!tip) return;
    const w = e.target.closest('.w');
    if (w && w.closest('.bare')) return; // challenge mode: no help, no tap-signal noise
    if (w) {
      // every tap is a signal: this word wasn't known on sight
      L._sessionTaps = (L._sessionTaps || 0) + 1;
      if (L._tapSet) L._tapSet.add(L.stripMacrons(w.textContent.toLowerCase()));
      if (L.current.view === 'unit' && typeof L.current.a === 'number') {
        L.state.taps = L.state.taps || {};
        L.state.taps[L.current.a] = (L.state.taps[L.current.a] || 0) + 1;
      }
      document.querySelectorAll('.w.hl').forEach(x => x.classList.remove('hl'));
      w.classList.add('hl');
      // sentence context for "Ask Magister": the sentence containing THIS occurrence
      // (located by character offset, so tapping «est» in sentence 3 doesn't send sentence 1)
      const word = w.textContent;
      const par = w.closest('.rp');
      let sentence = '';
      if (par) {
        let offset = 0;
        const walker = document.createTreeWalker(par, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (w.contains(node)) break;
          offset += node.textContent.length;
        }
        const parts = par.textContent.match(/[^.!?]*[.!?]*/g) || [];
        let acc = 0;
        sentence = par.textContent;
        for (const s of parts) {
          if (offset < acc + s.length) { sentence = s; break; }
          acc += s.length;
        }
        sentence = sentence.slice(0, 220);
      }
      L._tipContext = { word, sentence };
      tip.innerHTML = `<b class="la">${L.esc(word)}</b> — ${L.esc(w.dataset.g)}
        <button class="tipask">Ask Magister ›</button>`;
      tip.classList.add('show');
      const rect = w.getBoundingClientRect();
      tip.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 300)) + 'px';
      tip.style.top = (rect.bottom + 8) + 'px';
    } else if (e.target.closest('.tipask')) {
      tip.classList.remove('show');
      const ctx = L._tipContext || {};
      if (L.askAboutWord) L.askAboutWord(ctx.word || '', ctx.sentence || '');
    } else if (!e.target.closest('#glosstip')) {
      tip.classList.remove('show');
      document.querySelectorAll('.w.hl').forEach(x => x.classList.remove('hl'));
    }
  });

  // =================== quiz ===================
  // reshuffle an authored item's options so retakes can't be passed on position memory
  function reshuffled(q) {
    const order = L.shuffle(q.options.map((_, i) => i));
    return { options: order.map(i => q.options[i]), answer: order.indexOf(q.answer) };
  }

  function buildQuiz(u) {
    const qs = u.quiz.map(q => ({ prompt: q.prompt || q.q, ...reshuffled(q), explain: q.explain, type: 'grammar' }));
    const picks = L.shuffle(u.vocab).slice(0, 6);
    for (const v of picks) {
      const wrong = L.shuffle(u.vocab.filter(x => x !== v && x.gloss !== v.gloss)).slice(0, 3).map(x => x.gloss);
      if (wrong.length < 3) continue;
      const options = L.shuffle([v.gloss, ...wrong]);
      qs.push({
        prompt: `What does «${v.latin}» mean?`,
        options,
        answer: options.indexOf(v.gloss),
        explain: `${v.latin}, ${v.forms} (${v.pos}) — ${v.gloss}`,
        type: 'vocab',
        vkey: `u${u.id}:${v.latin}`,
      });
    }
    // interleaving: resurface material from completed earlier units (spaced retrieval)
    const prevIds = Object.keys(L.units).map(Number).filter(i => i < u.id && L.isDone(i));
    if (prevIds.length) {
      const pool = prevIds.flatMap(i => (L.units[i].quiz || []).map(q => ({
        prompt: `Review · Unit ${L.roman(i)} — ${q.prompt || q.q}`,
        ...reshuffled(q), explain: q.explain, type: 'review',
      })));
      qs.push(...L.shuffle(pool).slice(0, 2));
    }
    return L.shuffle(qs);
  }

  function renderQuiz(body, u, us) {
    body.innerHTML = `
      <div class="quizintro doneCard">
        <h2>Unit ${L.roman(u.id)} Quiz</h2>
        <p>${us.done ? `Passed — best score ${us.quizBest}%. Retake it any time.` : 'About 14 questions on this unit’s grammar, reading, and vocabulary. Score 80% to unlock the next unit.'}</p>
        <button class="btn big" id="startquiz">${us.done ? 'Retake quiz' : 'Begin'}</button>
      </div>`;
    body.querySelector('#startquiz').addEventListener('click', () => runQuiz(body, u, us));
  }

  // generic one-question-at-a-time session; calls onEnd(score, total, misses)
  L.runQuizSession = function (container, qs, opts) {
    let i = 0, score = 0;
    const misses = [];
    function showQ() {
      if (i >= qs.length) { opts.onEnd(score, qs.length, misses); return; }
      const q = qs[i];
      container.innerHTML = `
        <div class="quizprog">${opts.title ? L.esc(opts.title) + ' · ' : ''}Question ${i + 1} of ${qs.length}</div>
        <div class="qcard solo">
          <p class="qtext">${L.esc(q.prompt)}</p>
          <div class="qopts">${q.options.map((o, oi) => `<button class="qopt" data-oi="${oi}">${L.esc(o)}</button>`).join('')}</div>
          <p class="qexplain" hidden>${L.esc(q.explain)}</p>
          <div class="stepnext"><button class="btn" id="nextq" hidden>Next →</button></div>
          <div class="kbdhint">1–4 — answer · ↵ — next</div>
        </div>`;
      let doneQ = false;
      container.querySelectorAll('.qopt').forEach(btn => btn.addEventListener('click', () => {
        if (doneQ) return;
        doneQ = true;
        const oi = +btn.dataset.oi;
        container.querySelectorAll('.qopt')[q.answer].classList.add('correct');
        if (oi === q.answer) score++;
        else { btn.classList.add('wrong'); misses.push(q); }
        container.querySelector('.qexplain').hidden = false;
        const nb = container.querySelector('#nextq');
        nb.hidden = false;
        nb.focus();
        nb.addEventListener('click', () => { i++; showQ(); window.scrollTo(0, 0); });
      }));
    }
    showQ();
  };

  function missAdvice(u, misses) {
    if (!misses.length) return '';
    const counts = { vocab: 0, grammar: 0, review: 0 };
    misses.forEach(m => { counts[m.type] = (counts[m.type] || 0) + 1; });
    let advice;
    if (counts.vocab > counts.grammar) advice = 'Most of your misses were vocabulary — run the deck once more before retrying.';
    else if (counts.review > 0 && counts.grammar === 0 && counts.vocab === 0) advice = 'Only the review questions caught you — a quick visit to the Review tab will patch that.';
    else advice = 'Most of your misses were grammar and comprehension — reread the grammar briefing, then the stories with fewer gloss taps.';
    return `
      <div class="missbox">
        <p><strong>${L.esc(advice)}</strong></p>
        <ul class="misslist">
          ${misses.slice(0, 6).map(m => `<li>${L.esc(m.prompt)}<br><span class="exg">${L.esc(m.explain)}</span></li>`).join('')}
        </ul>
      </div>`;
  }

  function runQuiz(body, u, us) {
    const qs = buildQuiz(u);
    L.runQuizSession(body, qs, {
      onEnd(score, total, misses) {
        const pct = Math.round(100 * score / total);
        const passed = pct >= 80;
        us.quizBest = Math.max(us.quizBest || 0, pct);
        if (passed) { us.done = true; L.addXP(30); } else { L.addXP(5); }
        // missed vocabulary comes due immediately — the quiz feeds the review queue
        let pulled = 0;
        const now = Date.now();
        for (const m of misses) {
          if (m.vkey && L.state.srs[m.vkey]) {
            const c = L.state.srs[m.vkey];
            c.due = now;
            c.ivl = Math.min(c.ivl, 1);
            c.ease = Math.max(1.3, (c.ease || 2.3) - 0.2);
            pulled++;
          }
        }
        L.touchStreak();
        L.save();
        const nextId = u.id + 1;
        body.innerHTML = `
          <div class="doneCard big ${passed ? 'pass' : 'fail'}">
            <div class="orn">❦</div>
            <h2>${passed ? 'Probātum est! 🏛️' : 'Nōndum — not yet.'}</h2>
            <p class="scoreline">${score} / ${total} · <b>${pct}%</b></p>
            <p>${passed
              ? (nextId <= L.TOTAL_UNITS ? `Unit ${L.roman(nextId)} is unlocked. +30 XP` : 'You have finished the course. Legis Latīnē — you read Latin.')
              : 'You need 80% — the quiz reshuffles each time you take it.'}</p>
            ${pulled ? `<p class="mini">${pulled} missed word${pulled === 1 ? '' : 's'} pulled into today’s review queue.</p>` : ''}
            ${missAdvice(u, misses)}
            <div class="btnrow">
              ${passed && nextId <= L.TOTAL_UNITS ? `<button class="btn big" data-go="unit|${nextId}">Begin Unit ${L.roman(nextId)} →</button>` : ''}
              ${passed ? `<button class="btn ghost" data-go="home">Back to the course</button>` : `
                <button class="btn big" id="retry">Try again</button>
                <button class="btn ghost" data-go="unit|${u.id}|vocab">Review vocabulary</button>
                <button class="btn ghost" data-go="unit|${u.id}|read">Re-read the stories</button>`}
            </div>
          </div>`;
        const retry = body.querySelector('#retry');
        if (retry) retry.addEventListener('click', () => runQuiz(body, u, us));
      },
    });
  }

  // =================== placement exam ===================
  function buildStageExam(stage) {
    const qs = [];
    for (let i = stage.range[0]; i <= stage.range[1]; i++) {
      const u = L.units[i];
      if (!u) continue;
      qs.push(...L.shuffle(u.quiz || []).slice(0, 2).map(q => ({
        prompt: q.prompt || q.q, options: q.options, answer: q.answer, explain: q.explain, type: 'grammar',
      })));
    }
    return L.shuffle(qs);
  }

  L.renderPlacement = function (app) {
    const next = L.STAGES.find(s => !L.isDone(s.range[1]));
    if (!next) {
      app.innerHTML = `<div class="empty"><h2>Nothing left to place out of</h2><p>Every stage is already complete.</p><button class="btn" data-go="home">Back to the course</button></div>`;
      return;
    }
    const available = (() => { let n = 0; for (let i = next.range[0]; i <= next.range[1]; i++) if (L.units[i]) n++; return n; })();
    app.innerHTML = `
      <div class="doneCard big">
        <div class="orn">❦</div>
        <h2>Placement — Probātiō</h2>
        <p>Already know some Latin? Each stage has an exam drawn from all ten of its units.
        Score <strong>80%</strong> and the whole stage is certified complete — you start where you actually are,
        not at page one.</p>
        <p class="mini">Next up: <strong>Stage ${['I', 'II', 'III'][next.n - 1]} · ${L.esc(next.title)}</strong> — ${L.esc(next.sub)}</p>
        <div class="btnrow">
          ${available >= 8 ? `<button class="btn big" id="startexam">Take the Stage ${['I', 'II', 'III'][next.n - 1]} exam</button>` : '<p class="mini">This stage’s content is still loading — try again shortly.</p>'}
          <button class="btn ghost" data-go="home">Never mind — start in order</button>
        </div>
      </div>
      <div id="examarea"></div>`;
    const start = app.querySelector('#startexam');
    if (start) start.addEventListener('click', () => {
      app.querySelector('.doneCard').hidden = true;
      const qs = buildStageExam(next);
      L.runQuizSession(app.querySelector('#examarea'), qs, {
        title: `Stage ${['I', 'II', 'III'][next.n - 1]} exam`,
        onEnd(score, total, misses) {
          const pct = Math.round(100 * score / total);
          const passed = pct >= 80;
          if (passed) {
            for (let i = next.range[0]; i <= next.range[1]; i++) {
              const us = L.unitState(i);
              us.done = true;
              us.quizBest = Math.max(us.quizBest || 0, pct);
            }
            L.addXP(50);
            L.touchStreak();
          }
          L.save();
          const area = app.querySelector('#examarea');
          area.innerHTML = `
            <div class="doneCard big ${passed ? 'pass' : 'fail'}">
              <h2>${passed ? `Stage ${['I', 'II', 'III'][next.n - 1]} certified 🏛️` : 'Not quite — and that’s useful to know.'}</h2>
              <p class="scoreline">${score} / ${total} · <b>${pct}%</b></p>
              <p>${passed
                ? 'All ten units are marked complete. Take the next stage exam, or start reading where you now stand.'
                : `Start at Unit ${L.roman(next.range[0])} — with what you already know, you will move quickly.`}</p>
              ${missAdvice(null, misses)}
              <div class="btnrow">
                ${passed ? `<button class="btn big" data-go="placement">Next stage exam →</button>` : ''}
                <button class="btn ${passed ? 'ghost' : 'big'}" data-go="home">Go to the course</button>
              </div>
            </div>`;
        },
      });
    });
  };
})();
