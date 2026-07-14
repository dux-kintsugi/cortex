'use strict';
// Legō — Magister: an in-app Latin tutor / advanced dictionary, powered by the Claude API.
// Bring-your-own-key: the key is stored ONLY in this browser's localStorage and sent ONLY
// to api.anthropic.com. The tutor is told which units the learner has completed, so its
// explanations match what has actually been taught.

(function () {
  const L = window.Lego;
  const KEY_STORE = 'lego-magister-key';
  const CHAT_STORE = 'lego-magister-chat';
  const MODEL = 'claude-opus-4-8';
  const MAX_HISTORY = 24;        // turns kept for context (cost control)
  const STALL_MS = 60000;        // abort if no bytes arrive for this long

  const getKey = () => { try { return localStorage.getItem(KEY_STORE) || ''; } catch (e) { return ''; } };
  const setKey = k => { try { k ? localStorage.setItem(KEY_STORE, k) : localStorage.removeItem(KEY_STORE); } catch (e) {} };

  let chat = (() => {
    try { return JSON.parse(localStorage.getItem(CHAT_STORE) || '[]'); } catch (e) { return []; }
  })();
  const saveChat = () => { try { localStorage.setItem(CHAT_STORE, JSON.stringify(chat.slice(-MAX_HISTORY))); } catch (e) {} };

  // one in-flight request for the whole module — survives re-renders
  let inflight = null;
  const abortInflight = () => { if (inflight) { inflight.abort(); inflight = null; } };

  // ---------- system prompt: ground the tutor in the learner's actual progress ----------
  function systemPrompt() {
    const done = [];
    for (let i = 1; i <= L.TOTAL_UNITS; i++) if (L.isDone(i) && L.units[i]) done.push(i);
    const step = L.nextStep ? L.nextStep() : null;
    const curId = step ? step.id : (done.length ? Math.min(done[done.length - 1] + 1, L.TOTAL_UNITS) : 1);
    const curU = L.units[curId];
    const covered = done.map(i => `${i}. ${L.units[i].title} — ${L.units[i].tagline}`).join('\n');

    return `You are Magister, the in-app Latin tutor for "Legō", a 30-unit course teaching one adult learner to READ classical Latin. Recognition only — the learner never composes Latin, and you never ask them to.

THE LEARNER RIGHT NOW
- Completed units: ${done.length ? done.join(', ') : 'none yet — an absolute beginner'}
- Currently working on unit ${curId}${curU ? `: ${curU.title} — ${curU.tagline}` : ''}
- Grammar and themes covered so far:
${covered || '(nothing yet — assume zero prior knowledge)'}

HOW TO ANSWER
- Act as an advanced dictionary and reading coach. For a word: dictionary headword with macrons, principal parts or genitive + gender, declension/conjugation family, core meanings, one short etymology or English-cognate hook, and 1-2 example sentences with macrons, each glossed in English.
- For a sentence or construction: identify the form the learner is looking at, explain what signals it (the ending, the word order), then translate.
- Prefer grammar the learner has covered. When an answer needs later material, give the simple version first and add "(you'll meet this properly in unit N)".
- Always write Latin with macrons. Restored classical values; orthography with v for consonantal u and i for consonantal i.
- The course cast are proper names, not vocabulary: Mark, Quinn, Ted, Phil, and Lupo the dog never change form (indeclinable); Julia and Paula decline normally. «Lupo» is the dog's name — distinct from «lupus», wolf.
- Be concise. A tight, layered answer beats an essay. Plain text only: short paragraphs and simple dashes — no markdown headers or tables. Use «guillemets» around Latin.
- Questions unrelated to Latin, Rome, or the course: answer in one line and steer back.`;
  }

  // ---------- API call (streaming SSE) ----------
  // Returns { stopReason }. Calls onDelta(text) for each text chunk.
  async function stream(messages, onDelta, ctrl) {
    let watchdog;
    const arm = () => {
      clearTimeout(watchdog);
      watchdog = setTimeout(() => ctrl.abort(), STALL_MS);
    };
    arm();

    let res;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: ctrl.signal,
        headers: {
          'content-type': 'application/json',
          'x-api-key': getKey(),
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 12000,
          thinking: { type: 'adaptive' },
          stream: true,
          system: systemPrompt(),
          messages,
        }),
      });
    } catch (e) {
      clearTimeout(watchdog);
      throw e;
    }

    if (!res.ok) {
      clearTimeout(watchdog);
      let msg = `Request failed (${res.status}).`;
      try {
        const err = await res.json();
        if (err && err.error && err.error.message) msg = err.error.message;
      } catch (e) {}
      if (res.status === 401) msg = 'Anthropic rejected the API key. Check it in the setup below (key starts with sk-ant-).';
      else if (res.status === 429) msg = 'Rate limit reached — wait a moment and try again.';
      else if (res.status === 529) msg = 'The API is briefly overloaded — try again in a few seconds.';
      const e = new Error(msg);
      e.status = res.status;
      throw e;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let stopReason = null;

    const handleLine = line => {
      if (!line.startsWith('data: ')) return;
      let ev;
      try { ev = JSON.parse(line.slice(6)); } catch (e) { return; }
      if (ev.type === 'content_block_delta' && ev.delta && ev.delta.type === 'text_delta') {
        onDelta(ev.delta.text);
      } else if (ev.type === 'message_delta' && ev.delta && ev.delta.stop_reason) {
        stopReason = ev.delta.stop_reason;
      } else if (ev.type === 'error' && ev.error) {
        throw new Error(ev.error.message || 'The stream reported an error.');
      }
    };

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        arm();
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) handleLine(line);
      }
      buffer += decoder.decode(); // flush a trailing multibyte char
      if (buffer) handleLine(buffer);
    } finally {
      clearTimeout(watchdog);
      reader.cancel().catch(() => {});
    }
    return { stopReason };
  }

  // ---------- rendering ----------
  // escape, then allow only line breaks, **bold**, and «Latin» styling
  function fmt(text) {
    return L.esc(text)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/«([^»]+)»/g, '«<span class="la">$1</span>»')
      .replace(/\n/g, '<br>');
  }

  function bubbleHTML(m) {
    return `<div class="mag-msg ${m.role === 'user' ? 'mine' : 'theirs'}">${fmt(m.content)}</div>`;
  }

  L.renderMagister = function (app) {
    abortInflight(); // a re-entered view must not fight a stream from the previous render

    if (!getKey()) { renderSetup(app); return; }

    app.innerHTML = `
      <div class="magwrap">
        <header class="maghead">
          <h1>Magister</h1>
          <p>Your Latin tutor and advanced dictionary. It knows which unit you're on. Ask about any
          word, form, or sentence — <em>quid significat «ferre»?</em></p>
          <p class="mini">Runs on your own Anthropic API key (${MODEL}); a typical question costs a cent or two.
            <button class="linkbtn" data-mag="clear">clear conversation</button> ·
            <button class="linkbtn" data-mag="forget">forget my key</button></p>
        </header>
        <div class="mag-msgs" id="magmsgs">
          ${chat.length ? chat.map(bubbleHTML).join('') : '<div class="mag-msg theirs">Salvē! I\'m Magister. Ask me about any Latin word, ending, or sentence — from the course or beyond. Try: <em>why does «puella» become «puellam»?</em></div>'}
        </div>
        <div class="mag-inputrow">
          <textarea id="maginput" rows="2" placeholder="Ask about a word, a form, a sentence…"></textarea>
          <button class="btn big" id="magsend">Ask</button>
        </div>
      </div>`;

    const input = app.querySelector('#maginput');
    const msgs = app.querySelector('#magmsgs');
    const sendBtn = app.querySelector('#magsend');

    if (L._magisterSeed) {
      input.value = L._magisterSeed;
      delete L._magisterSeed;
      input.focus();
    }
    msgs.scrollTop = msgs.scrollHeight;

    app.querySelectorAll('[data-mag]').forEach(b => b.addEventListener('click', () => {
      if (b.dataset.mag === 'clear') {
        abortInflight();
        chat = [];
        saveChat();
        L.render();
      } else if (b.dataset.mag === 'forget') {
        if (confirm('Remove your API key from this browser? (Your conversation stays.)')) {
          abortInflight();
          setKey('');
          L.render();
        }
      }
    }));

    async function send() {
      const text = input.value.trim();
      if (!text || inflight) return;

      const ctrl = new AbortController();
      inflight = ctrl;
      const chatRef = chat; // detect clear/reset that happens mid-stream
      sendBtn.textContent = 'Stop';
      input.value = '';

      const userMsg = { role: 'user', content: text };
      chat.push(userMsg);
      msgs.insertAdjacentHTML('beforeend', bubbleHTML(userMsg));
      const holder = document.createElement('div');
      holder.className = 'mag-msg theirs pending';
      holder.textContent = '…';
      msgs.appendChild(holder);
      msgs.scrollTop = msgs.scrollHeight;

      const dropUserMsg = () => {
        const idx = chat.lastIndexOf(userMsg);
        if (idx !== -1) chat.splice(idx, 1);
      };

      let answer = '';
      try {
        const { stopReason } = await stream(
          chat.slice(-MAX_HISTORY).map(m => ({ role: m.role, content: m.content })),
          delta => {
            answer += delta;
            holder.classList.remove('pending');
            holder.innerHTML = fmt(answer);
            msgs.scrollTop = msgs.scrollHeight;
          },
          ctrl,
        );
        if (chatRef !== chat) return; // conversation was cleared mid-stream — discard silently
        if (!answer) {
          // never store a synthetic assistant turn — make it retryable instead
          dropUserMsg();
          saveChat();
          input.value = text;
          holder.classList.remove('pending');
          holder.classList.add('mag-error');
          holder.textContent = 'No text came back (the model may have spent the budget thinking) — press Ask to retry.';
          return;
        }
        chat.push({ role: 'assistant', content: answer });
        saveChat();
        if (stopReason === 'max_tokens') {
          holder.insertAdjacentHTML('beforeend', '<div class="mag-note">[answer truncated — ask to continue]</div>');
        } else if (stopReason === 'refusal') {
          holder.insertAdjacentHTML('beforeend', '<div class="mag-note">[Magister declined to finish that one]</div>');
        }
      } catch (e) {
        if (chatRef !== chat) return; // cleared mid-stream
        const stopped = e && e.name === 'AbortError';
        if (answer) {
          // keep the partial (already paid for); the exchange stays in history
          chat.push({ role: 'assistant', content: answer });
          saveChat();
          holder.classList.remove('pending');
          holder.innerHTML = fmt(answer) +
            `<div class="mag-note">${stopped ? '[stopped]' : '[connection lost — answer may be incomplete]'}</div>`;
        } else {
          dropUserMsg();
          saveChat();
          input.value = text; // retry is one keypress
          holder.classList.remove('pending');
          holder.classList.add('mag-error');
          holder.textContent = stopped ? 'Stopped.' : (e.message || 'Something went wrong — try again.');
        }
      } finally {
        if (inflight === ctrl) inflight = null;
        if (document.contains(sendBtn)) {
          sendBtn.textContent = 'Ask';
          input.focus();
        }
      }
    }

    sendBtn.addEventListener('click', () => {
      if (inflight) { abortInflight(); return; } // Stop button
      send();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!inflight) send(); }
    });
  };

  function renderSetup(app) {
    app.innerHTML = `
      <div class="magwrap">
        <div class="doneCard big">
          <div class="orn">❦</div>
          <h2>Magister — your Latin tutor</h2>
          <p>An AI tutor and advanced dictionary built into the app: ask about any word, ending, or
          sentence, and it answers using the grammar <em>you've actually covered</em> — including a
          one-tap "Ask Magister" on every word in every reading.</p>
          <p>It runs on your own Anthropic API key. The key is stored only in this browser and sent
          only to Anthropic — never to this site's server (there isn't one). A typical question costs
          a cent or two.</p>
          <div class="mag-keyrow">
            <input type="password" id="magkey" placeholder="sk-ant-…" autocomplete="off">
            <button class="btn big" id="magkeysave">Save key</button>
          </div>
          <p class="mini">No key yet? Create one at <strong>console.anthropic.com</strong> → API keys.
          You can remove it from this browser at any time.</p>
        </div>
      </div>`;
    const doSave = () => {
      const k = app.querySelector('#magkey').value.trim();
      if (!k) return;
      setKey(k);
      L.render();
    };
    app.querySelector('#magkeysave').addEventListener('click', doSave);
    app.querySelector('#magkey').addEventListener('keydown', e => { if (e.key === 'Enter') doSave(); });
  }

  // ---------- "Ask Magister" from the reading tooltip ----------
  L.askAboutWord = function (word, sentence) {
    L._magisterSeed = sentence
      ? `In the sentence «${sentence.trim()}» — tell me everything useful about «${word}»: what form it is, its dictionary entry, and how to recognize it next time.`
      : `Tell me everything useful about the Latin word «${word}».`;
    L.go('magister');
  };
})();
