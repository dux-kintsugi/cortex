'use strict';
// Legō — core: persistent state, navigation, dashboard, guide.

(function () {
  const L = window.Lego;
  const KEY = 'lego-latin-v1';

  const DEFAULT_STATE = { unlockAll: false, units: {}, srs: {}, xp: 0, streak: 0, lastDay: null };

  L.state = (function load() {
    try { return Object.assign({}, DEFAULT_STATE, JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { return Object.assign({}, DEFAULT_STATE); }
  })();

  L.save = () => { try { localStorage.setItem(KEY, JSON.stringify(L.state)); } catch (e) {} };

  L.unitState = id => (L.state.units[id] = L.state.units[id] || { grammar: false, vocab: false, reads: {}, quizBest: 0, done: false });
  L.isDone = id => !!(L.state.units[id] && L.state.units[id].done);
  L.isUnlocked = id => id === 1 || L.state.unlockAll || L.isDone(id - 1);
  L.addXP = n => {
    L.state.xp += n;
    const today = dayStampPublic();
    if (!L.state.xpDay || L.state.xpDay.day !== today) L.state.xpDay = { day: today, n: 0 };
    L.state.xpDay.n += n;
  };
  L.xpToday = () => {
    return (L.state.xpDay && L.state.xpDay.day === dayStampPublic()) ? L.state.xpDay.n : 0;
  };
  function dayStampPublic() {
    const d = new Date();
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  }

  function dayStamp(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  }
  L.touchStreak = () => {
    const today = dayStamp();
    if (L.state.lastDay === today) return;
    L.state.streak = (L.state.lastDay === dayStamp(-1)) ? L.state.streak + 1 : 1;
    L.state.lastDay = today;
  };

  // ---------- utilities ----------
  L.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  L.shuffle = arr => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  L.stripMacrons = s => s.normalize('NFD').replace(/\u0304/g, '').normalize('NFC');

  // Best-effort audio: an Italian voice reading restored-pronunciation Latin is surprisingly close.
  // Voices are ranked (enhanced/premium Italian first); the learner can override in Guide → Audio.
  function voiceScore(v) {
    let s = 0;
    const lang = (v.lang || '').toLowerCase();
    if (lang.startsWith('it')) s += 100;
    else if (lang.startsWith('es')) s += 60;
    else if (lang.startsWith('pt')) s += 40;
    else if (lang.startsWith('ro')) s += 30;
    else return 0;
    if (/premium|enhanced|natural|neural/i.test(v.name)) s += 30;
    if (/alice|federica|luca|emma|elsa|paola|isabela|serena/i.test(v.name)) s += 10;
    if (v.localService) s += 5;
    return s;
  }
  L.voiceList = () => {
    try {
      return speechSynthesis.getVoices()
        .filter(v => voiceScore(v) > 0)
        .sort((a, b) => voiceScore(b) - voiceScore(a));
    } catch (e) { return []; }
  };
  L.allVoices = () => {
    try { return speechSynthesis.getVoices(); } catch (e) { return []; }
  };
  L.pickVoice = () => {
    const wanted = L.state.settings && L.state.settings.voice;
    // honor an explicit choice from ANY voice on the system, not just the ranked list
    return L.allVoices().find(v => v.voiceURI === wanted) || L.voiceList()[0] || null;
  };
  L.speak = text => {
    try {
      if (!window.speechSynthesis) return;
      speechSynthesis.cancel();
      const voice = L.pickVoice();
      const rate = (L.state.settings && L.state.settings.rate) || 0.85;
      // classical-pronunciation engine: respell so the Italian voice produces the classical
      // sounds (hard c/g, sc = sk, v = w, ae = eye) with the classically-stressed syllable marked
      const usePhon = !(L.state.settings && L.state.settings.phonetics === false) && L.phon;
      const prepared = usePhon ? L.phon.transliterate(text) : L.stripMacrons(text);
      // speak sentence by sentence — natural pauses instead of one robotic run-on
      const chunks = prepared.match(/[^.!?;:]+[.!?;:]*\s*/g) || [prepared];
      for (const chunk of chunks) {
        if (!chunk.trim()) continue;
        const u = new SpeechSynthesisUtterance(chunk.trim());
        if (voice) { u.voice = voice; u.lang = voice.lang; }
        u.rate = rate;
        u.pitch = 1;
        speechSynthesis.speak(u);
      }
    } catch (e) {}
  };

  L.tableHTML = t => {
    if (!t || !Array.isArray(t.headers)) return '';
    const head = t.headers.map(h => `<th>${L.esc(h)}</th>`).join('');
    const body = (t.rows || []).map(r =>
      `<tr>${r.map((c, i) => i === 0 ? `<th>${L.esc(c)}</th>` : `<td>${L.esc(c)}</td>`).join('')}</tr>`
    ).join('');
    return `<div class="tablewrap"><table class="ptable">${t.caption ? `<caption>${L.esc(t.caption)}</caption>` : ''}<thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  };

  // ---------- navigation ----------
  L.current = { view: 'home' };
  L.go = (view, a, b) => {
    L.current = { view, a, b };
    L.render();
    window.scrollTo(0, 0);
  };

  document.addEventListener('click', e => {
    const go = e.target.closest('[data-go]');
    if (go && !go.disabled) {
      const [view, a, b] = go.dataset.go.split('|');
      L.go(view, a !== undefined && a !== '' ? (isNaN(+a) ? a : +a) : undefined, b);
      return;
    }
    const act = e.target.closest('[data-action]');
    if (act) handleAction(act.dataset.action, act);
  });

  function handleAction(action, el) {
    if (action === 'unlock-all') {
      if (confirm('Unlock all 30 units? The course is designed to be taken in order — use this only if you already know some Latin.')) {
        L.state.unlockAll = true; L.save(); L.render();
      }
    } else if (action === 'reset-progress') {
      if (confirm('Erase ALL progress (completed units, review deck, streak)? This cannot be undone.')) {
        localStorage.removeItem(KEY);
        location.reload();
      }
    } else if (action === 'speak') {
      L.speak(el.dataset.text || '');
    } else if (action === 'rescan-voices') {
      refreshVoiceUI();
    }
  }

  // audio settings controls (rendered in Guide)
  document.addEventListener('change', e => {
    if (e.target.id === 'voicesel') {
      L.state.settings = L.state.settings || {};
      L.state.settings.voice = e.target.value;
      L.save();
    } else if (e.target.id === 'ratesel') {
      L.state.settings = L.state.settings || {};
      L.state.settings.rate = +e.target.value;
      L.save();
      const label = document.getElementById('ratelabel');
      if (label) label.textContent = e.target.value + '×';
    } else if (e.target.id === 'phonsel') {
      L.state.settings = L.state.settings || {};
      L.state.settings.phonetics = e.target.checked;
      L.save();
    }
  });

  function voiceOptionsHTML() {
    const ranked = L.voiceList();
    const all = L.allVoices();
    if (!all.length) return '<option value="">(no voices found — see the tips below)</option>';
    const chosen = L.pickVoice();
    const opt = (v, tag) =>
      `<option value="${L.esc(v.voiceURI)}" ${chosen && v.voiceURI === chosen.voiceURI ? 'selected' : ''}>${L.esc(v.name)} — ${L.esc(v.lang)}${tag || ''}</option>`;
    const rankedSet = new Set(ranked.map(v => v.voiceURI));
    const others = all.filter(v => !rankedSet.has(v.voiceURI))
      .sort((a, b) => (a.lang + a.name).localeCompare(b.lang + b.name));
    return `<optgroup label="Best for Latin — Italian, ranked">${ranked.map((v, i) => opt(v, i === 0 ? ' (recommended)' : '')).join('')}</optgroup>` +
      (others.length ? `<optgroup label="All other voices — selectable, but the classical engine is tuned for Italian">${others.map(v => opt(v)).join('')}</optgroup>` : '');
  }

  function refreshVoiceUI() {
    const sel = document.getElementById('voicesel');
    if (sel) sel.innerHTML = voiceOptionsHTML();
    const meta = document.getElementById('voicemeta');
    if (meta) meta.textContent = L.allVoices().length + ' voices detected';
  }

  try {
    if (window.speechSynthesis) {
      speechSynthesis.onvoiceschanged = refreshVoiceUI;
    }
  } catch (e) {}

  // ---------- chrome ----------
  function renderNav() {
    const c = L.current.view;
    const due = L.dueCount ? L.dueCount() : 0;
    document.getElementById('nav').innerHTML = `
      <div class="navin">
        <button class="brand" data-go="home"><span class="brand-main">LEGŌ</span><span class="brand-sub">learn to read Latin</span></button>
        <nav class="navlinks">
          <button class="navbtn ${c === 'home' ? 'on' : ''}" data-go="home">Course</button>
          <button class="navbtn ${c === 'review' ? 'on' : ''}" data-go="review">Review${due ? ` <span class="badge">${due}</span>` : ''}</button>
          <button class="navbtn ${c === 'library' ? 'on' : ''}" data-go="library">Library</button>
          <button class="navbtn ${c === 'magister' ? 'on' : ''}" data-go="magister">Magister</button>
          <button class="navbtn ${c === 'reference' ? 'on' : ''}" data-go="reference">Reference</button>
          <button class="navbtn ${c === 'guide' ? 'on' : ''}" data-go="guide">Guide</button>
        </nav>
        <div class="navstats" title="daily streak · words in your review deck">
          <span>🔥 ${L.state.streak}</span>
          <span>📜 ${Object.keys(L.state.srs).length}</span>
        </div>
      </div>`;
  }

  L.render = () => {
    renderNav();
    const app = document.getElementById('app');
    const c = L.current;
    if (c.view === 'home') app.innerHTML = renderHome();
    else if (c.view === 'unit') L.renderUnit(app, c.a, c.b);
    else if (c.view === 'review') L.renderReview(app);
    else if (c.view === 'reference') L.renderReference(app, c.a);
    else if (c.view === 'library') L.renderLibrary(app);
    else if (c.view === 'magister') L.renderMagister(app);
    else if (c.view === 'placement') L.renderPlacement(app);
    else if (c.view === 'guide') { app.innerHTML = renderGuide(); refreshVoiceUI(); }
    else app.innerHTML = renderHome();
  };

  // ---------- dashboard ----------
  function renderHome() {
    const doneCount = Object.values(L.state.units).filter(u => u.done).length;
    const words = Object.keys(L.state.srs).length;
    const fresh = doneCount === 0 && words === 0;
    const nextId = (() => {
      for (let i = 1; i <= L.TOTAL_UNITS; i++) if (!L.isDone(i)) return i;
      return L.TOTAL_UNITS;
    })();

    const hero = fresh ? `
      <section class="hero">
        <div class="orn">❦</div>
        <h1>Salvē.</h1>
        <p>You are thirty units away from reading Latin — real stories from the first page,
        every word one tap from its meaning, and never a single exercise that asks you to
        <em>write</em> Latin. You only learn to read it.</p>
        <button class="btn big" data-go="unit|1">Begin · Unit I</button>
        <p class="mini"><button class="linkbtn" data-go="guide">How the course works</button></p>
      </section>` : renderHodie(doneCount, words, nextId);

    const stages = renderStages();
    return `${hero}${stages}
      <p class="homefoot">Already know some Latin? <button class="linkbtn" data-go="placement">Take the placement exam</button>
      — or simply <button class="linkbtn" data-action="unlock-all">unlock every unit</button>.</p>`;
  }

  // the very next thing to do inside the current unit
  function nextStep() {
    for (let i = 1; i <= L.TOTAL_UNITS; i++) {
      if (!L.isUnlocked(i)) break;
      if (L.isDone(i)) continue;
      if (!L.units[i]) break;
      const us = L.state.units[i] || {};
      const readsDone = us.reads && us.reads[0] && us.reads[1];
      if (!us.grammar) return { id: i, tab: 'grammar', label: 'read the grammar briefing' };
      if (!us.vocab) return { id: i, tab: 'vocab', label: 'study the vocabulary deck' };
      if (!readsDone) return { id: i, tab: 'read', label: 'read the stories' };
      return { id: i, tab: 'quiz', label: 'take the quiz' };
    }
    return null;
  }
  L.nextStep = nextStep;

  const XP_GOAL = 40;

  function renderHodie(doneCount, words, nextId) {
    const due = L.dueCount ? L.dueCount() : 0;
    const step = nextStep();
    const xpNow = L.xpToday();
    const pct = Math.min(100, Math.round(100 * xpNow / XP_GOAL));
    const tomorrow = L.dueTomorrow ? L.dueTomorrow() : 0;
    return `
      <section class="hodie">
        <div class="hodie-head">
          <h2>Hodiē — today</h2>
          <div class="goal" title="daily goal: ${XP_GOAL} XP">
            <span>🔥 ${L.state.streak} · ${xpNow}/${XP_GOAL} XP</span>
            <div class="goalbar"><div class="goalfill${pct >= 100 ? ' full' : ''}" style="width:${pct}%"></div></div>
          </div>
        </div>
        <div class="hodie-row">
          <button class="hodie-tile ${due ? 'urgent' : 'quiet'}" data-go="review">
            <b>${due}</b><span>${due === 1 ? 'word' : 'words'} to review</span>
            <em>${due ? 'start here — 5 minutes' : 'all caught up ✓'}</em>
          </button>
          ${step ? `
          <button class="hodie-tile" data-go="unit|${step.id}|${step.tab}">
            <b>${L.roman(step.id)}</b><span>Unit ${L.roman(step.id)} · next step</span>
            <em>${L.esc(step.label)}</em>
          </button>` : `
          <button class="hodie-tile" data-go="unit|${nextId}">
            <b>${L.roman(nextId)}</b><span>continue the course</span><em>Unit ${L.roman(nextId)}</em>
          </button>`}
          <button class="hodie-tile quiet" data-go="library">
            <b>${doneCount}<i>/30</i></b><span>units · ${words} words known</span>
            <em>re-read a story you love</em>
          </button>
        </div>
        ${tomorrow ? `<p class="mini hodie-cras">Crās — tomorrow: ${tomorrow} word${tomorrow === 1 ? '' : 's'} will be ripe for review. Come back for them.</p>` : ''}
      </section>`;
  }

  function renderStages() {
    return L.STAGES.map(s => {
      const cards = [];
      for (let id = s.range[0]; id <= s.range[1]; id++) {
        const u = L.units[id];
        const us = L.state.units[id];
        const unlocked = L.isUnlocked(id);
        const done = !!(us && us.done);
        const cls = done ? 'done' : unlocked ? 'open' : 'locked';
        cards.push(`
          <button class="ucard ${cls}" data-go="unit|${id}" ${unlocked ? '' : 'disabled'}>
            <span class="unum">${L.roman(id)}</span>
            <span class="utitle">${L.esc(u ? u.title : '…')}</span>
            <span class="usub">${L.esc(u ? u.tagline : 'content loading')}</span>
            <span class="ustat">${done ? `✓ ${us.quizBest}%` : unlocked ? 'open' : '🔒'}</span>
          </button>`);
      }
      return `
        <section class="stage">
          <header class="stagehead">
            <h2><span class="stagenum">${['I', 'II', 'III'][s.n - 1]}</span> ${L.esc(s.title)}</h2>
            <p>${L.esc(s.sub)}</p>
          </header>
          <div class="ugrid">${cards.join('')}</div>
        </section>`;
    }).join('');
  }

  // ---------- keyboard shortcuts ----------
  document.addEventListener('keydown', e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const card = document.getElementById('fcard');
    if (card) {
      const back = card.querySelector('.fcard-back');
      const bar = document.getElementById('gradebar');
      if ((e.key === ' ' || e.key === 'Enter') && back && back.hidden) { e.preventDefault(); card.click(); return; }
      if (bar && !bar.hidden) {
        if (e.key === '1') bar.querySelector('.again').click();
        else if (e.key === '2' || e.key === 'Enter') bar.querySelector('.good').click();
        else if (e.key === '3') bar.querySelector('.easy').click();
      }
      return;
    }
    const solo = document.querySelector('.qcard.solo');
    if (solo) {
      const nb = document.querySelector('#nextq');
      if (e.key === 'Enter' && nb && !nb.hidden) { nb.click(); return; }
      if (['1', '2', '3', '4'].includes(e.key) && !solo.querySelector('.qopt.correct, .qopt.wrong')) {
        const opt = solo.querySelectorAll('.qopt')[+e.key - 1];
        if (opt) opt.click();
      }
    }
  });

  // ---------- guide ----------
  function renderGuide() {
    return `
      <article class="prose">
        <h1>How Legō works</h1>
        <p><strong>Legō</strong> is Latin for <em>I read</em> — and reading is the only skill this course
        teaches. You will never be asked to compose or type a word of Latin. Every exercise is
        recognition: read, tap, choose.</p>

        <h2>The shape of a unit</h2>
        <p>Each of the 30 units has four steps, in order:</p>
        <p><strong>1 · Grammar</strong> — a short, plain-English briefing on one new pattern, always angled
        at reading: <em>when you see this ending, expect that meaning</em>.<br>
        <strong>2 · Vocabulary</strong> — ~25 new words as flashcards. Grading yourself honestly feeds the
        spaced-repetition deck that follows you through the course.<br>
        <strong>3 · Reading</strong> — two connected story passages. Tap any word for its meaning; reveal
        the full translation when you want to check yourself; answer four comprehension questions.<br>
        <strong>4 · Quiz</strong> — 14 questions on the unit. Score 80% and the next unit unlocks.</p>

        <h2>The story</h2>
        <p>The course follows one family — Mark the grain merchant, Julia, their children Quinn and
        Paula, the dog Lupo, and Uncle Ted the sea captain — from their house in Ostia, to Rome, through
        a storm at sea, and finally into the pages of real Roman authors (with Phil the Greek tutor
        arriving in Stage III). Names keep the same shape in every sentence — like foreign names in the
        Latin Bible — so you can always tell a person from a vocabulary word. By the last units you are
        reading lightly-adapted Caesar, Phaedrus's fables, Martial, and the Vulgate.</p>

        <h2>The Review deck</h2>
        <p>Every word you learn joins a spaced-repetition deck. Words you know keep quiet; words you fumble
        come back sooner. Visit <strong>Review</strong> whenever the badge shows a number — five minutes a
        day is worth more than an hour on Sunday.</p>

        <h2>Pronunciation in one minute</h2>
        <p>You are learning to read, but Latin is meant to be heard. The restored classical pronunciation:
        every letter is pronounced; <span class="la">c</span> is always hard (<em>k</em>),
        <span class="la">g</span> always as in <em>go</em>, <span class="la">v</span> sounds like <em>w</em>,
        <span class="la">ae</span> like the <em>i</em> in <em>high</em>. A macron (<span class="la">ā ē ī ō ū</span>)
        marks a long vowel — hold it about twice as long. Full details are in the Reference tab.</p>

        <h2>Audio &amp; voice</h2>
        <p>The 🔊 buttons speak Latin with the best Italian voice on your device — Italian is the closest
        living relative of the classical sound. Pick a different voice or speed here:</p>
        <p class="audiorow">
          <select id="voicesel">${voiceOptionsHTML()}</select>
          <label class="ratewrap">Speed
            <input type="range" id="ratesel" min="0.6" max="1.1" step="0.05"
              value="${(L.state.settings && L.state.settings.rate) || 0.85}">
            <span id="ratelabel">${(L.state.settings && L.state.settings.rate) || 0.85}×</span>
          </label>
          <button class="btn ghost" data-action="speak"
            data-text="Salvē! Ecce familia. Mark pater est, Julia māter est, et Lupo — canis optimus — semper dormit.">🔊 Test the voice</button>
        </p>
        <p class="mini"><span id="voicemeta"></span> · <button class="linkbtn" data-action="rescan-voices">rescan</button></p>
        <p class="mini"><strong>Downloaded a voice but it isn't listed?</strong> Two usual causes.
        ① Browsers scan system voices only at launch — quit the browser completely (⌘Q on a Mac, swipe the
        app away on iPhone) and reopen; then hit <em>rescan</em>. ② <em>Siri</em> voices never appear —
        Apple doesn't share them with web apps. Download from the <em>Spoken Content</em> voice list
        instead (System Settings → Accessibility → Spoken Content → Manage Voices → Italian →
        Alice / Federica / Emma, marked Enhanced or Premium).</p>
        <p class="phonrow"><label><input type="checkbox" id="phonsel"
          ${!(L.state.settings && L.state.settings.phonetics === false) ? 'checked' : ''}>
          <strong>Classical pronunciation engine</strong> — before anything is spoken, the app respells each
          word so the Italian voice is forced to produce the classical sounds: hard <span class="la">c</span>
          and <span class="la">g</span> everywhere, <span class="la">sc</span> as <em>sk</em>,
          <span class="la">v</span> as <em>w</em>, <span class="la">ae</span> as in <em>eye</em> — and marks the
          classically correct stressed syllable on every word. Leave it on; turn it off only to compare.</label></p>
        <p class="mini">Honest fine print: even with the engine, <span class="la">gn</span> comes out "ny"
        (the church value — the classical one is debated anyway), vowel length off the stressed syllable
        isn't conveyed, <span class="la">h</span> is nearly silent, and an <span class="la">s</span> between
        vowels may soften toward <em>z</em> on some voices. Everything else the Reference tab teaches is
        what you'll hear.</p>
        <p class="mini"><strong>Make it sound much better:</strong> your device likely has far nicer voices
        than the default, just not downloaded. On a Mac: System Settings → Accessibility → Spoken Content →
        System Voice → Manage Voices… → download an Italian voice marked <em>Enhanced</em> or
        <em>Premium</em> (Alice, Federica, or Emma). On iPhone: Settings → Accessibility → Spoken Content →
        Voices → Italian. New voices appear in the menu above automatically — pick one and hit Test.</p>

        <h2>Honest expectations</h2>
        <p>Finishing all 30 units gives you the complete grammar of Latin (for recognition), roughly 750
        core words, and the strategies for real texts — enough to read adapted authors comfortably and
        attack authentic ones with a dictionary. From there, proficiency is simply mileage: the final unit
        tells you exactly what to read next.</p>

        <h2>Housekeeping</h2>
        <p>Progress lives in this browser (nothing leaves your machine). You can
        <button class="linkbtn" data-action="unlock-all">unlock all units</button> if you already know some
        Latin, or <button class="linkbtn danger" data-action="reset-progress">reset all progress</button> to
        start fresh.</p>
      </article>`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    try { window.speechSynthesis && speechSynthesis.getVoices(); } catch (e) {}
    L.render();
  });
})();
