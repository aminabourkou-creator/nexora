// Nexora Studio — service worker
// Purpose: makes the app installable (required by Chrome/Android for the
// "Add to Home Screen" / APK-wrapping flow) and caches the static app shell
// so the UI still loads if the network drops. Firebase/Firestore calls are
// left untouched — they always go to the network since they need to be live.

const CACHE = 'nexora-shell-v1';
const SHELL_FILES = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL_FILES)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  // Never intercept Firebase/Firestore/Google API calls — always live network.
  if (url.includes('googleapis.com') || url.includes('gstatic.com') || url.includes('firebaseio.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
