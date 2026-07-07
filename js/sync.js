/* ============================================================
   Cortex — sync.js
   Serverless device sync. Your progress becomes a copy-paste
   code: 'CX2.' + base64url(deflate-raw(JSON payload)), or
   'CX2R.' + base64url(raw JSON) on browsers without
   CompressionStream. Importing MERGES — it adds what's missing
   and never deletes or downgrades anything on this device.
   Exposes BT.sync.exportCode / BT.sync.importCode / BT.buildSyncCard.
   ============================================================ */
(function () {
  'use strict';

  const BT = window.BT, el = BT.el;

  const MAX_SESSIONS = 5000; // mirrors the cap in core.js

  const MODE_CHAR = { assess: 'a', train: 't', free: 'f', challenge: 'c' };
  const CHAR_MODE = { a: 'assess', t: 'train', f: 'free', c: 'challenge' };

  /* ---------------- base64url <-> bytes ---------------- */
  // Chunked btoa: fromCharCode.apply on the whole array would blow the
  // argument limit / call stack once histories get big.
  function bytesToB64url(bytes) {
    let bin = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
    }
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function b64urlToBytes(s) {
    s = s.replace(/-/g, '+').replace(/_/g, '/');
    while (s.length % 4) s += '=';
    let bin;
    try { bin = atob(s); }
    catch (e) { throw new Error('Code is damaged — copy the whole code and try again'); }
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function strToBytes(s) {
    if (typeof TextEncoder !== 'undefined') return new TextEncoder().encode(s);
    const u = unescape(encodeURIComponent(s)); // ancient-browser UTF-8 shim
    const b = new Uint8Array(u.length);
    for (let i = 0; i < u.length; i++) b[i] = u.charCodeAt(i);
    return b;
  }

  function bytesToStr(bytes) {
    if (typeof TextDecoder !== 'undefined') return new TextDecoder().decode(bytes);
    let bin = '';
    const CHUNK = 0x8000;
    for (let i = 0; i < bytes.length; i += CHUNK) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
    }
    return decodeURIComponent(escape(bin));
  }

  /* ---------------- deflate-raw via Compression Streams ---------------- */
  function deflate(str) {
    const stream = new Blob([strToBytes(str)]).stream()
      .pipeThrough(new CompressionStream('deflate-raw'));
    return new Response(stream).arrayBuffer().then(buf => new Uint8Array(buf));
  }

  function inflate(bytes) {
    const stream = new Blob([bytes]).stream()
      .pipeThrough(new DecompressionStream('deflate-raw'));
    return new Response(stream).text();
  }

  /* ---------------- payload (compact, columnar sessions) ---------------- */
  // Per-session `metrics` (incl. half1/half2), `band` and `sem` are DROPPED
  // in transfer — they only feed the detail charts and would triple the code
  // size. Scores, primaries, levels, abilities and streak survive losslessly.
  function buildPayload() {
    const st = BT.state;
    const recs = st.sessions.slice().sort((x, y) => x.ts - y.ts);

    // Task-id table: BT.taskOrder plus any stray ids from old sessions,
    // embedded in the code so the importing device decodes indexes correctly
    // even if its registration order ever differs from ours.
    const ids = (BT.taskOrder || []).slice();
    const idIndex = {};
    ids.forEach((id, i) => { idIndex[id] = i; });

    const t0 = recs.length ? recs[0].ts : 0;
    const col = { t0: t0, ids: ids, t: [], id: [], m: [], l: [], s: [], p: [], a: [] };
    for (const r of recs) {
      if (idIndex[r.taskId] == null) { idIndex[r.taskId] = ids.length; ids.push(r.taskId); }
      col.t.push(r.ts - t0);              // ts delta from first session
      col.id.push(idIndex[r.taskId]);
      col.m.push(MODE_CHAR[r.mode] || 'f');
      col.l.push(r.level == null ? null : r.level);
      col.s.push(r.score == null ? null : r.score);
      col.p.push(r.primary == null ? null : r.primary);
      col.a.push(r.ability == null ? null : r.ability);
    }

    return {
      v: 2,
      levels: st.levels,
      assessments: st.assessments,
      doneDays: st.doneDays,
      badges: st.badges,
      dayTags: st.dayTags,
      challengeDays: st.challengeDays,
      streak: st.streak,
      settings: st.settings,
      plan: st.plan, // carried so "newer generatedAt wins" can compare
      sessions: col,
    };
  }

  function decodeSessions(col) {
    if (!col || !Array.isArray(col.t)) return [];
    const ids = Array.isArray(col.ids) && col.ids.length ? col.ids : (BT.taskOrder || []);
    const t0 = typeof col.t0 === 'number' ? col.t0 : 0;
    const out = [];
    for (let i = 0; i < col.t.length; i++) {
      const taskId = ids[col.id[i]];
      if (!taskId || typeof col.t[i] !== 'number') continue;
      out.push({
        ts: t0 + col.t[i],
        taskId: taskId,
        mode: CHAR_MODE[col.m[i]] || 'free',
        level: col.l[i] == null ? null : col.l[i],
        score: col.s[i] == null ? null : col.s[i],
        primary: col.p[i] == null ? null : col.p[i],
        ability: col.a[i] == null ? null : col.a[i],
        band: null, sem: null, metrics: {}, // not transferred (see buildPayload)
      });
    }
    return out;
  }

  /* ---------------- merge (never overwrite) ---------------- */
  function eachKey(obj, fn) {
    if (!obj || typeof obj !== 'object') return;
    Object.keys(obj).forEach(k => fn(k, obj[k]));
  }

  function shiftDay(key, delta) {
    const d = new Date(key + 'T12:00'); // noon — immune to DST edges
    d.setDate(d.getDate() + delta);
    return BT.dayKey(d.getTime());
  }

  // Rebuild streak from the MERGED doneDays: count = length of the consecutive
  // run ending at the LATEST done day — the count/lastDay pairing the rest of
  // the app maintains (BT.currentStreak() zeroes stale runs at read time, and
  // reconcileStreak's shield bridge extends count from the run's true length);
  // best = longest consecutive run anywhere in history (stored bests kept as
  // a floor — merging must never shrink a record); shields = max of devices.
  function recomputeStreak(incoming) {
    const st = BT.state.streak;
    const days = BT.state.doneDays;
    const keys = Object.keys(days).sort(); // YYYY-MM-DD sorts chronologically

    let count = 0;
    let k = keys.length ? keys[keys.length - 1] : null;
    while (k && days[k]) { count += 1; k = shiftDay(k, -1); }

    let best = count, run = 0;
    for (let i = 0; i < keys.length; i++) {
      run = (i > 0 && BT.daysBetween(keys[i - 1], keys[i]) === 1) ? run + 1 : 1;
      if (run > best) best = run;
    }

    st.count = count;
    st.lastDay = keys.length ? keys[keys.length - 1] : null;
    st.best = Math.max(best, st.best || 0, (incoming && incoming.best) || 0);
    st.shields = Math.max(st.shields || 0, (incoming && incoming.shields) || 0);
  }

  function mergeState(p) {
    const st = BT.state;
    st.levels = st.levels || {};
    st.doneDays = st.doneDays || {};
    st.badges = st.badges || {};
    st.dayTags = st.dayTags || {};
    st.challengeDays = st.challengeDays || {};
    st.assessments = st.assessments || [];

    // sessions: union keyed by ts+taskId — replays of the same round dedupe
    const seen = {};
    st.sessions.forEach(r => { seen[r.ts + '|' + r.taskId] = true; });
    let addedSessions = 0;
    for (const r of decodeSessions(p.sessions)) {
      const key = r.ts + '|' + r.taskId;
      if (seen[key]) continue;
      seen[key] = true;
      st.sessions.push(r);
      addedSessions += 1;
    }
    st.sessions.sort((x, y) => x.ts - y.ts);
    if (st.sessions.length > MAX_SESSIONS) {
      st.sessions.splice(0, st.sessions.length - MAX_SESSIONS);
    }

    // levels: max per task
    eachKey(p.levels, (id, lv) => {
      if (typeof lv !== 'number' || !isFinite(lv)) return;
      st.levels[id] = Math.max(st.levels[id] || 0, lv);
    });

    // day-keyed maps + badges: union, existing key wins
    let addedDays = 0;
    eachKey(p.doneDays, (k, v) => { if (!(k in st.doneDays)) { st.doneDays[k] = v; addedDays += 1; } });
    eachKey(p.badges, (k, v) => { if (!(k in st.badges)) st.badges[k] = v; });
    eachKey(p.dayTags, (k, v) => { if (!(k in st.dayTags)) st.dayTags[k] = v; });
    eachKey(p.challengeDays, (k, v) => { if (!(k in st.challengeDays)) st.challengeDays[k] = v; });

    // assessments: union by ts, kept sorted
    if (Array.isArray(p.assessments)) {
      const have = {};
      st.assessments.forEach(a => { have[a.ts] = true; });
      for (const a of p.assessments) {
        if (a && a.ts != null && !have[a.ts]) { have[a.ts] = true; st.assessments.push(a); }
      }
      st.assessments.sort((x, y) => x.ts - y.ts);
    }

    // plan: newer generatedAt wins
    if (p.plan && p.plan.generatedAt != null &&
        (!st.plan || p.plan.generatedAt > (st.plan.generatedAt || 0))) {
      st.plan = p.plan;
    }

    // settings: deliberately NOT merged — sound/CVD are per-device preferences.

    recomputeStreak(p.streak);
    BT.save();
    return { addedSessions: addedSessions, totalSessions: st.sessions.length, addedDays: addedDays };
  }

  /* ---------------- public API ---------------- */
  BT.sync = {
    exportCode: function () {
      let json;
      try { json = JSON.stringify(buildPayload()); }
      catch (e) { return Promise.reject(e); }
      if (typeof CompressionStream === 'undefined') {
        // Older browser: raw JSON code — longer, but still merges everywhere.
        return Promise.resolve('CX2R.' + bytesToB64url(strToBytes(json)));
      }
      return deflate(json).then(bytes => 'CX2.' + bytesToB64url(bytes));
    },

    importCode: function (code) {
      return Promise.resolve().then(() => {
        if (typeof code !== 'string' || !code.trim()) throw new Error('No sync code given');
        const c = code.replace(/\s+/g, ''); // tolerate messenger line-wraps
        if (c.indexOf('CX2R.') === 0) return bytesToStr(b64urlToBytes(c.slice(5)));
        if (c.indexOf('CX2.') === 0) {
          if (typeof DecompressionStream === 'undefined') {
            throw new Error('This browser can’t read compressed codes — update it and retry');
          }
          return inflate(b64urlToBytes(c.slice(4))).catch(() => {
            throw new Error('Code is damaged — copy the whole code and try again');
          });
        }
        throw new Error('Not a Cortex sync code');
      }).then(json => {
        let p;
        try { p = JSON.parse(json); }
        catch (e) { throw new Error('Code is damaged — copy the whole code and try again'); }
        if (!p || typeof p !== 'object' || p.v !== 2) {
          throw new Error('Unrecognized sync code version');
        }
        return mergeState(p);
      });
    },
  };

  /* ---------------- Settings card ---------------- */
  BT.buildSyncCard = function () {
    const copyStatus = el('div', { class: 'small muted', style: 'margin-top:10px;min-height:18px;' });
    const mergeStatus = el('div', { class: 'small', style: 'margin-top:10px;min-height:18px;' });

    const ta = el('textarea', {
      placeholder: 'Paste a sync code from your other device (CX2…)',
      spellcheck: 'false', autocomplete: 'off', autocapitalize: 'off', rows: '3',
      style: 'width:100%;min-height:74px;background:var(--panel-2);border:1px solid var(--line);' +
        'color:var(--text);border-radius:10px;padding:10px 12px;font-size:0.8rem;' +
        'font-family:inherit;resize:vertical;word-break:break-all;',
    });

    function onCopy() {
      copyBtn.disabled = true;
      copyStatus.style.color = '';
      copyStatus.textContent = 'Building code…';
      BT.sync.exportCode().then(code => {
        const size = code.length + ' characters';
        const done = how => {
          copyStatus.textContent = how + ' — ' + size + '. Paste it into “Merge” on your other device.';
          copyBtn.disabled = false;
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(code)
            .then(() => done('Copied to clipboard'))
            .catch(() => shareOrPrompt(code, done));
        } else {
          shareOrPrompt(code, done);
        }
      }).catch(e => {
        copyStatus.style.color = 'var(--bad)';
        copyStatus.textContent = 'Export failed: ' + (e && e.message ? e.message : e);
        copyBtn.disabled = false;
      });
    }

    function shareOrPrompt(code, done) {
      if (navigator.share) {
        navigator.share({ text: code })
          .then(() => done('Shared'))
          .catch(() => { window.prompt('Copy your sync code:', code); done('Code shown'); });
      } else {
        window.prompt('Copy your sync code:', code);
        done('Code shown');
      }
    }

    function onMerge() {
      const raw = ta.value.trim();
      mergeStatus.style.color = '';
      if (!raw) {
        mergeStatus.style.color = 'var(--bad)';
        mergeStatus.textContent = 'Paste a sync code first.';
        return;
      }
      mergeBtn.disabled = true;
      mergeStatus.textContent = 'Merging…';
      BT.sync.importCode(raw).then(sum => {
        mergeStatus.style.color = 'var(--good)';
        mergeStatus.textContent = 'Merged ✓ +' + sum.addedSessions + ' sessions (' +
          sum.totalSessions + ' total), +' + sum.addedDays +
          ' training day' + (sum.addedDays === 1 ? '' : 's') + '.';
        ta.value = '';
        mergeBtn.disabled = false;
      }).catch(e => {
        mergeStatus.style.color = 'var(--bad)';
        mergeStatus.textContent = 'Merge failed: ' + (e && e.message ? e.message : 'invalid code');
        mergeBtn.disabled = false;
      });
    }

    const copyBtn = el('button', { class: 'btn primary', text: '📦 Copy sync code', onclick: onCopy });
    const mergeBtn = el('button', { class: 'btn', text: '⇣ Merge code', onclick: onMerge });

    return el('div', { class: 'card' },
      el('h2', { text: 'Device sync' }),
      el('p', { class: 'sub', style: 'margin-bottom:12px;', text:
        'Move progress between devices with a copy-paste code — no account, no server. Merging only adds what’s missing; nothing here gets deleted.' }),
      el('div', { class: 'btn-row', style: 'justify-content:flex-start;margin-top:0;' }, copyBtn),
      copyStatus,
      el('div', { class: 'divider' }),
      ta,
      el('div', { class: 'btn-row', style: 'justify-content:flex-start;margin-top:10px;' }, mergeBtn),
      mergeStatus);
  };
})();
