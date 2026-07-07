/* Cortex service worker — network-first with full-shell cache fallback.
   Fresh files whenever the server is reachable; complete offline play when not.
   Bump CACHE on any release so old caches get purged. */
const CACHE = 'cortex-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/core.js',
  './js/charts.js',
  './js/engine.js',
  './js/tasks/reaction.js',
  './js/tasks/symbols.js',
  './js/tasks/gonogo.js',
  './js/tasks/search.js',
  './js/tasks/nback.js',
  './js/tasks/digitspan.js',
  './js/tasks/spatialspan.js',
  './js/tasks/rotation.js',
  './js/tasks/stroop.js',
  './js/tasks/switching.js',
  './js/tasks/matrix.js',
  './js/tasks/math.js',
  './js/tasks/wordpairs.js',
  './js/tasks/flanker.js',
  './js/tasks/trails.js',
  './js/tasks/mot.js',
  './js/tasks/flicker.js',
  './js/tasks/tempo.js',
  './js/tasks/flashcount.js',
  './js/tasks/dualnback.js',
  './js/tasks/tower.js',
  './js/assessment.js',
  './js/training.js',
  './js/achievements.js',
  './js/report.js',
  './js/sync.js',
  './js/main.js',
  './js/gamedetail.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // keep the cache fresh on every successful same-origin fetch
        if (res.ok && new URL(e.request.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(e.request).then(hit =>
          hit || (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())
        )
      )
  );
});
