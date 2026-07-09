/* Presto service worker — cache-first so the app works fully offline. */
var CACHE = 'presto-v1';
var ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.webmanifest',
  './icon.svg',
  './icon-180.png',
  './icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      // bypass the HTTP cache so a new version never precaches stale files
      return c.addAll(ASSETS.map(function (u) { return new Request(u, { cache: 'reload' }); }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      return hit || fetch(e.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        return res;
      });
    })
  );
});
