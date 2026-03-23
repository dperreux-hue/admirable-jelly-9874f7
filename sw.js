/* ═══════════════════════════════════════════════════════
   Service Worker – ACI France PWA
   Stratégie : Cache-First (100 % hors-ligne après 1ère visite)
   ═══════════════════════════════════════════════════════ */

const CACHE_NAME  = 'aci-france-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './logo-cgt.png'
];

/* ── Installation : mise en cache de tous les fichiers ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

/* ── Activation : suppression des anciens caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch : cache en priorité, réseau en secours ── */
self.addEventListener('fetch', event => {
  /* Ignorer les requêtes non-GET et les extensions Chrome */
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      /* Pas en cache → tenter le réseau et mettre en cache */
      return fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => {
          /* Hors-ligne et pas en cache : page de secours */
          if (event.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});

/* ── Message : forcer la mise à jour depuis l'interface ── */
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
