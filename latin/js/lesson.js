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
  function tokenizeParagraph(p, glosses, stripped) {
    return p.replace(LETTERS, m => {
      const key = m.toLowerCase();
      const g = glosses[key] !== undefined ? glosses[key] : stripped[L.stripMacrons(key)];
      return `<span class="w" data-g="${L.esc(g || '(no gloss)')}">${L.esc(m)}</span>`;
    });
  }

  function renderRead(body, u, us, which) {
    which = which || 0;
    const r = u.readings[which];
    const strippedMap = {};
    for (const [k, v] of Object.entries(r.glosses || {})) strippedMap[L.stripMacrons(k)] = v;

    body.innerHTML = `
      <div class="readpick">
        ${u.readings.map((rd, i) => `
          <button class="pill ${i === which ? 'on' : ''} ${us.reads[i] ? 'pdone' : ''}" data-read="${i}">
            Lēctiō ${['I', 'II'][i]} · ${L.esc(rd.title)}${us.reads[i] ? ' ✓' : ''}</button>`).join('')}
      </div>
      <article class="reading">
        <h2 class="la">${L.esc(r.title)}</h2>
        <p class="rintro">${L.esc(r.intro)} <em>Tap any word for its meaning.</em></p>
        <div class="rtext">
          ${r.paragraphs.map((p, i) => `
            <div class="rpar">
              <button class="speakbtn sm parspeak" data-action="speak" data-text="${L.esc(p)}">🔊</button>
              <p class="la rp">${tokenizeParagraph(p, r.glosses, strippedMap)}</p>
            </div>`).join('')}
        </div>
        <button class="btn ghost" id="transbtn">Show translation</button>
        <div class="trans" id="transbox" hidden>
          ${r.translation.map(t => `<p>${L.esc(t)}</p>`).join('')}
        </div>
        <div class="orn">❦</div>
        <h3 class="qhead">Quaestiōnēs — did you follow?</h3>
        <div id="rqs"></div>
      </article>`;

    body.querySelectorAll('[data-read]').forEach(b =>
      b.addEventListener('click', () => renderRead(body, u, us, +b.dataset.read)));
    body.querySelector('#transbtn').addEventListener('click', e => {
      const box = body.querySelector('#transbox');
      box.hidden = !box.hidden;
      e.target.textContent = box.hidden ? 'Show translation' : 'Hide translation';
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
          L.save();
          const banner = document.createElement('div');
          banner.className = 'doneCard';
          const other = which === 0 ? 1 : 0;
          banner.innerHTML = us.reads[other]
            ? `<h3>Both readings done — +8 XP</h3><button class="btn big" data-go="unit|${u.id}|quiz">Continue → Quiz</button>`
            : `<h3>Lēctiō ${['I', 'II'][which]} done — +8 XP</h3><button class="btn big" data-read2="${other}">On to Lēctiō ${['I', 'II'][other]} →</button>`;
          qwrap.appendChild(banner);
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
    if (w) {
      document.querySelectorAll('.w.hl').forEach(x => x.classList.remove('hl'));
      w.classList.add('hl');
      tip.innerHTML = `<b class="la">${L.esc(w.textContent)}</b> — ${L.esc(w.dataset.g)}`;
      tip.classList.add('show');
      const rect = w.getBoundingClientRect();
      tip.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 300)) + 'px';
      tip.style.top = (rect.bottom + 8) + 'px';
    } else if (!e.target.closest('#glosstip')) {
      tip.classList.remove('show');
      document.querySelectorAll('.w.hl').forEach(x => x.classList.remove('hl'));
    }
  });

  // =================== quiz ===================
  function buildQuiz(u) {
    const qs = u.quiz.map(q => ({ prompt: q.prompt || q.q, options: q.options, answer: q.answer, explain: q.explain }));
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
      });
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

  function runQuiz(body, u, us) {
    const qs = buildQuiz(u);
    let i = 0, score = 0;

    function endScreen() {
      const pct = Math.round(100 * score / qs.length);
      const passed = pct >= 80;
      if (passed) {
        us.done = true;
        us.quizBest = Math.max(us.quizBest || 0, pct);
        L.addXP(30);
      } else {
        us.quizBest = Math.max(us.quizBest || 0, pct);
        L.addXP(5);
      }
      L.touchStreak();
      L.save();
      const nextId = u.id + 1;
      body.innerHTML = `
        <div class="doneCard big ${passed ? 'pass' : 'fail'}">
          <div class="orn">❦</div>
          <h2>${passed ? 'Probātum est! 🏛️' : 'Nōndum — not yet.'}</h2>
          <p class="scoreline">${score} / ${qs.length} · <b>${pct}%</b></p>
          <p>${passed
            ? (nextId <= L.TOTAL_UNITS ? `Unit ${L.roman(nextId)} is unlocked. +30 XP` : 'You have finished the course. Legis Latīnē — you read Latin.')
            : 'You need 80%. Revisit the reading and the vocab deck, then try again — the quiz reshuffles each time.'}</p>
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
    }

    function showQ() {
      if (i >= qs.length) { endScreen(); return; }
      const q = qs[i];
      body.innerHTML = `
        <div class="quizprog">Question ${i + 1} of ${qs.length}</div>
        <div class="qcard solo">
          <p class="qtext">${L.esc(q.prompt)}</p>
          <div class="qopts">${q.options.map((o, oi) => `<button class="qopt" data-oi="${oi}">${L.esc(o)}</button>`).join('')}</div>
          <p class="qexplain" hidden>${L.esc(q.explain)}</p>
          <div class="stepnext"><button class="btn" id="nextq" hidden>Next →</button></div>
        </div>`;
      let doneQ = false;
      body.querySelectorAll('.qopt').forEach(btn => btn.addEventListener('click', () => {
        if (doneQ) return;
        doneQ = true;
        const oi = +btn.dataset.oi;
        body.querySelectorAll('.qopt')[q.answer].classList.add('correct');
        if (oi === q.answer) score++;
        else btn.classList.add('wrong');
        body.querySelector('.qexplain').hidden = false;
        const nb = body.querySelector('#nextq');
        nb.hidden = false;
        nb.focus();
        nb.addEventListener('click', () => { i++; showQ(); window.scrollTo(0, 0); });
      }));
    }
    showQ();
  }
})();
