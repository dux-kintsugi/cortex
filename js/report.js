/* ============================================================
   Cortex — report.js
   Weekly report card (the just-ended Mon–Sun week vs the week
   before) and a long-range 30-day trends card. Plain DOM via
   BT.el + existing CSS classes; no canvas.
   ============================================================ */
(function () {
  'use strict';
  const BT = window.BT, el = BT.el;

  const DAY_MS = 86400000;
  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  /* ---------------- Helpers ---------------- */

  // Least-squares slope over points [{x, y}] (x in days) — null if degenerate.
  function lsqSlope(pts) {
    const n = pts.length;
    if (n < 2) return null;
    const x0 = pts[0].x; // center x for numeric stability
    let sx = 0, sy = 0, sxx = 0, sxy = 0;
    for (let i = 0; i < n; i++) {
      const x = pts[i].x - x0, y = pts[i].y;
      sx += x; sy += y; sxx += x * x; sxy += x * y;
    }
    const d = n * sxx - sx * sx;
    if (Math.abs(d) < 1e-9) return null;
    return (n * sxy - sx * sy) / d;
  }

  function slopeText(perWeek) {
    const v = Math.round(perWeek * 10) / 10;
    return (v > 0 ? '+' : '') + v.toFixed(1) + ' pts/wk';
  }
  function slopeArrow(perWeek) {
    return perWeek >= 0.5 ? '↗' : perWeek <= -0.5 ? '↘' : '→';
  }
  function slopeColor(perWeek) {
    return perWeek >= 0.5 ? 'var(--good)' : perWeek <= -0.5 ? 'var(--bad)' : 'var(--muted)';
  }

  // The 7 dayKeys of the week starting at a Monday Date.
  function weekDayKeys(monday) {
    const keys = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday.getTime());
      d.setDate(d.getDate() + i);
      keys.push(BT.dayKey(d.getTime()));
    }
    return keys;
  }

  function toSet(arr) {
    const s = {};
    for (const k of arr) s[k] = true;
    return s;
  }

  // Mean score per domain over a list of session records.
  function domainAvgs(list) {
    const by = {};
    for (const s of list) {
      const def = BT.tasks[s.taskId];
      if (!def || s.score == null) continue;
      (by[def.domain] = by[def.domain] || []).push(s.score);
    }
    const out = {};
    for (const k of Object.keys(by)) out[k] = BT.mean(by[k]);
    return out;
  }

  function shareButton(title, digest) {
    if (!navigator.share) return null;
    return el('button', {
      class: 'btn', text: '📤 Share',
      onclick: () => {
        try { navigator.share({ title: title, text: digest }).catch(function () {}); }
        catch (e) { /* share cancelled or unavailable — nothing to do */ }
      },
    });
  }

  /* ================= Weekly report =================
     Shown Mon–Wed, once per week, on the home screen. */
  BT.buildWeeklyReportCard = function () {
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const dow = (today.getDay() + 6) % 7; // 0 = Monday
    if (dow > 2) return null; // only Mon/Tue/Wed

    const thisMon = new Date(today.getTime()); thisMon.setDate(today.getDate() - dow);
    const lastMon = new Date(thisMon.getTime()); lastMon.setDate(thisMon.getDate() - 7);
    const weekKey = BT.dayKey(lastMon.getTime());
    if (BT.state.lastReportWeek === weekKey) return null; // already dismissed

    const weekKeys = weekDayKeys(lastMon);
    const weekSet = toSet(weekKeys);
    const prevMon = new Date(thisMon.getTime()); prevMon.setDate(thisMon.getDate() - 14);
    const prevSet = toSet(weekDayKeys(prevMon));

    const weekSessions = [], prevSessions = [];
    for (const s of BT.state.sessions) {
      if (s.mode === 'assess') continue;
      const day = BT.dayKey(s.ts);
      if (weekSet[day]) weekSessions.push(s);
      else if (prevSet[day]) prevSessions.push(s);
    }
    if (!weekSessions.length) return null; // nothing trained that week

    /* --- days trained + chips --- */
    let daysTrained = 0;
    const chips = el('div', { class: 'tag-row', style: 'margin:10px 0 4px;' });
    weekKeys.forEach((key, i) => {
      let tier = BT.state.doneDays[key];
      if (tier === true) tier = 'full'; // v1 migration
      if (tier) daysTrained++;
      const sym = tier === 'full' ? '✓' : tier === 'lite' ? '⚡' : tier === 'shield' ? '🛡' : '·';
      chips.appendChild(el('span', {
        class: 'pill' + (tier ? ' focus' : ''),
        text: WEEKDAYS[i] + ' ' + sym,
      }));
    });

    /* --- rounds + best single score --- */
    const rounds = weekSessions.length;
    let best = null;
    for (const s of weekSessions) {
      if (s.score != null && (!best || s.score > best.score)) best = s;
    }
    const bestTask = best ? BT.tasks[best.taskId] : null;

    /* --- per-domain deltas vs the week before --- */
    const avgW = domainAvgs(weekSessions);
    const avgP = domainAvgs(prevSessions);
    const deltaRows = [];
    const deltaDigest = [];
    for (const dk of BT.DOMAIN_KEYS) {
      if (avgW[dk] == null || avgP[dk] == null) continue; // need data both weeks
      const d = BT.DOMAINS[dk];
      const delta = Math.round(avgW[dk] - avgP[dk]);
      deltaRows.push(el('div', { class: 'today-item' },
        el('span', { class: 't-icon', text: d.icon }),
        el('span', { class: 't-name', text: d.name }),
        el('span', { class: 'pill', text: 'avg ' + Math.round(avgW[dk]) }),
        delta !== 0
          ? el('span', { class: 'small', style: 'color:var(--' + (delta > 0 ? 'good' : 'bad') + ');font-weight:700;', text: (delta > 0 ? '▲+' : '▼') + delta })
          : el('span', { class: 'small muted', text: '=' })));
      if (delta !== 0) deltaDigest.push(d.name + ' ' + (delta > 0 ? '+' : '') + delta);
    }

    /* --- biggest level gain (from rec.level per task) ---
       Only 'train' sessions reflect the tracked level progression;
       free play at a user-picked level would fabricate or mask climbs. */
    const lv = {};
    for (const s of weekSessions) {
      if (s.mode !== 'train' || s.level == null) continue;
      if (!lv[s.taskId]) lv[s.taskId] = { first: s.level, last: s.level };
      else lv[s.taskId].last = s.level;
    }
    let climb = null;
    for (const id of Object.keys(lv)) {
      const gain = lv[id].last - lv[id].first;
      if (gain > 0 && (!climb || gain > climb.gain)) {
        climb = { id, gain, from: lv[id].first, to: lv[id].last };
      }
    }
    const climbTask = climb ? BT.tasks[climb.id] : null;

    /* --- assemble card --- */
    const rangeText = BT.fmtDate(lastMon.getTime()) + ' – ' + BT.fmtDate(lastMon.getTime() + 6 * DAY_MS);
    const card = el('div', { class: 'card' },
      el('h2', { text: 'Your week in review 📬' }),
      el('div', { class: 'sub', text: rangeText }),
      el('div', { class: 'stat-strip', style: 'margin-top:12px;' },
        el('div', { class: 'stat-box' },
          el('div', { class: 'v', text: daysTrained + '/7' }),
          el('div', { class: 'l', text: 'days trained' })),
        el('div', { class: 'stat-box' },
          el('div', { class: 'v', text: String(rounds) }),
          el('div', { class: 'l', text: 'rounds played' })),
        el('div', { class: 'stat-box' },
          el('div', { class: 'v', text: best ? String(best.score) : '—' }),
          el('div', { class: 'l', text: bestTask ? 'best · ' + bestTask.name : 'best score' }))),
      chips,
      el('div', { class: 'center small muted', style: 'margin-bottom:6px;', text: '✓ full session · ⚡ lite day · 🛡 shield' }));

    if (deltaRows.length) {
      card.appendChild(el('div', { class: 'pattern-h', text: 'Domains vs the week before' }));
      deltaRows.forEach(r => card.appendChild(r));
    } else {
      card.appendChild(el('div', { class: 'sub small', style: 'margin-top:8px;', text:
        'Train two weeks in a row to unlock domain-by-domain comparisons.' }));
    }

    if (climbTask) {
      card.appendChild(el('div', { class: 'notice', style: 'margin-top:12px;', text:
        '🧗 Biggest climb: ' + climbTask.icon + ' ' + climbTask.name +
        ' — level ' + climb.from + ' → ' + climb.to }));
    }

    /* --- share digest + buttons --- */
    let digest = 'Cortex weekly report (' + rangeText + ')\n' +
      '• Trained ' + daysTrained + '/7 days · ' + rounds + ' rounds';
    if (best && bestTask) digest += '\n• Best score: ' + best.score + ' (' + bestTask.name + ')';
    if (deltaDigest.length) digest += '\n• vs prior week: ' + deltaDigest.join(' · ');
    if (climbTask) digest += '\n• Biggest climb: ' + climbTask.name + ' Lv ' + climb.from + ' → ' + climb.to;

    card.appendChild(el('div', { class: 'btn-row' },
      shareButton('Cortex — weekly report', digest),
      el('button', {
        class: 'btn ghost', text: 'Dismiss',
        onclick: () => {
          BT.state.lastReportWeek = weekKey;
          BT.save();
          card.remove();
        },
      })));

    return card;
  };

  /* ================= Long-range report =================
     30-day trends; needs 14+ distinct training days overall. */
  BT.buildLongReportCard = function () {
    const daySet = {};
    for (const s of BT.state.sessions) daySet[BT.dayKey(s.ts)] = true;
    if (Object.keys(daySet).length < 14) return null;

    const since = Date.now() - 30 * DAY_MS;
    const recent = BT.state.sessions.filter(s =>
      s.mode !== 'assess' && s.score != null && s.ts >= since);

    const card = el('div', { class: 'card' },
      el('h2', { text: 'Long-range report 🔭' }),
      el('div', { class: 'sub', text: 'Trends over your last 30 days of training.' }));

    const digestLines = ['Cortex long-range report (last 30 days)'];

    /* --- per-domain slope on daily mean scores --- */
    const byDomainDay = {}; // domain -> dayKey -> [scores]
    for (const s of recent) {
      const def = BT.tasks[s.taskId];
      if (!def) continue;
      const day = BT.dayKey(s.ts);
      ((byDomainDay[def.domain] = byDomainDay[def.domain] || {})[day] =
        byDomainDay[def.domain][day] || []).push(s.score);
    }
    let anyDomain = false;
    const domainBox = el('div');
    const trendDigest = [];
    for (const dk of BT.DOMAIN_KEYS) {
      const days = byDomainDay[dk];
      if (!days) continue;
      const keys = Object.keys(days).sort();
      if (keys.length < 3) continue; // too sparse for a slope
      const pts = keys.map(day => ({
        x: new Date(day + 'T12:00').getTime() / DAY_MS,
        y: BT.mean(days[day]),
      }));
      const m = lsqSlope(pts);
      if (m == null) continue;
      const wk = m * 7;
      anyDomain = true;
      const d = BT.DOMAINS[dk];
      domainBox.appendChild(el('div', { class: 'domain-row', style: 'padding:8px 0;' },
        el('div', { class: 'd-icon', text: d.icon }),
        el('div', { class: 'd-name' }, el('div', { class: 'nm', text: d.name })),
        el('div', {
          class: 'd-score',
          style: 'width:auto;font-size:0.95rem;color:' + slopeColor(wk) + ';',
          text: slopeArrow(wk) + ' ' + slopeText(wk),
        })));
      trendDigest.push(d.name + ' ' + slopeArrow(wk) + ' ' + slopeText(wk));
    }
    if (trendDigest.length) digestLines.push('• Trends: ' + trendDigest.join(' · '));
    card.appendChild(el('div', { class: 'pattern-h', text: 'Domain trends (30 days)' }));
    card.appendChild(anyDomain ? domainBox :
      el('div', { class: 'sub small', text: 'Not enough recent play per domain yet — trends need 3+ days of data.' }));

    /* --- most-improved & flattest game (5+ plays) --- */
    const byTask = {};
    for (const s of recent) (byTask[s.taskId] = byTask[s.taskId] || []).push(s);
    const gameSlopes = [];
    for (const id of Object.keys(byTask)) {
      const t = BT.tasks[id];
      const list = byTask[id];
      if (!t || list.length < 5) continue;
      const m = lsqSlope(list.map(s => ({ x: s.ts / DAY_MS, y: s.score })));
      if (m == null) continue;
      gameSlopes.push({ id, wk: m * 7 });
    }
    if (gameSlopes.length) {
      card.appendChild(el('div', { class: 'pattern-h', text: 'Games' }));
      const most = gameSlopes.slice().sort((a, b) => b.wk - a.wk)[0];
      const flat = gameSlopes.slice().sort((a, b) => Math.abs(a.wk) - Math.abs(b.wk))[0];
      function gameRow(o, label) {
        const t = BT.tasks[o.id];
        return el('div', { class: 'today-item' },
          el('span', { class: 't-icon', text: t.icon }),
          el('span', { class: 't-name' }, t.name, ' ',
            el('span', { class: 'small muted', text: label })),
          el('span', { class: 'pill', text: slopeArrow(o.wk) + ' ' + slopeText(o.wk) }));
      }
      card.appendChild(gameRow(most, 'most improved'));
      digestLines.push('• Most improved: ' + BT.tasks[most.id].name + ' (' + slopeText(most.wk) + ')');
      if (gameSlopes.length > 1 && flat.id !== most.id) {
        card.appendChild(gameRow(flat, 'flattest'));
        digestLines.push('• Flattest: ' + BT.tasks[flat.id].name + ' (' + slopeText(flat.wk) + ')');
      }
    }

    /* --- personal bests in the last 30 days --- */
    const bests = {};
    let pbCount = 0;
    for (const s of BT.state.sessions) {
      if (s.mode === 'assess' || s.score == null) continue;
      const b = bests[s.taskId];
      if (b != null && s.score > b && s.ts >= since) pbCount++;
      if (b == null || s.score > b) bests[s.taskId] = s.score;
    }
    card.appendChild(el('div', { class: 'sub', style: 'margin-top:12px;', text:
      pbCount > 0
        ? '🏅 ' + pbCount + ' personal best' + (pbCount === 1 ? '' : 's') + ' set in the last 30 days.'
        : '🏅 No new personal bests in the last 30 days — a re-assessment or a level push could shake things loose.' }));
    digestLines.push(pbCount > 0
      ? '• ' + pbCount + ' personal best' + (pbCount === 1 ? '' : 's') + ' set'
      : '• No new personal bests');

    /* --- plateau note for games at the level cap --- */
    const maxed = BT.taskOrder.filter(id => {
      const t = BT.tasks[id];
      return t && (byTask[id] || BT.sessionsFor(id).length) && BT.taskLevel(id) >= t.maxLevel;
    });
    if (maxed.length) {
      card.appendChild(el('div', { class: 'notice', style: 'margin-top:12px;', text:
        '🏔 At the level cap: ' + maxed.map(id => BT.tasks[id].icon + ' ' + BT.tasks[id].name).join(', ') +
        '. Levels can’t climb further — from here progress shows in score and ability, and a re-assessment makes it official.' }));
      digestLines.push('• At the level cap: ' + maxed.map(id => BT.tasks[id].name).join(', '));
    }

    const share = shareButton('Cortex — long-range report', digestLines.join('\n'));
    if (share) card.appendChild(el('div', { class: 'btn-row' }, share));

    return card;
  };
})();
