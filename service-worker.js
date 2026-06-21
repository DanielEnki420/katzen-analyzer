// KatzenVokal-Analyzer — Service Worker
// Copyright (c) 2026 Daniel Enki (DanielEnki420). Alle Rechte vorbehalten / All Rights Reserved.
// Echtes Offline-PWA: cacht die App-Shell. API-Calls werden nie gecacht.

const CACHE = 'katzen-v3.13.0';
// Relative URLs → funktionieren unter beiden Scopes (GitHub /katzen-analyzer/ und Pi5 /)
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'kater.jpg'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(() => {})) // einzelne Fehlschläge nicht fatal
      .then(() => self.skipWaiting())
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
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // KI-Proxy niemals cachen (immer frisch)
  if (url.pathname.includes('/api/anthropic/')) return;

  // Navigationsanfragen: Netzwerk zuerst, offline → gecachte index.html
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        caches.open(CACHE).then(c => c.put('index.html', res.clone())).catch(() => {});
        return res;
      }).catch(() => caches.match('index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Statische Assets: Cache zuerst, im Hintergrund aktualisieren
  e.respondWith(
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && res.status === 200) {
          caches.open(CACHE).then(c => c.put(req, res.clone())).catch(() => {});
        }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
