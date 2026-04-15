const CACHE_NAME = 'meu-app-v1';

// Arquivos locais para cachear (o shell do PWA)
const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instala e cacheia o shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// Limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estratégia: shell local em cache, GAS sempre da rede
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Requisições para o GAS: sempre tenta a rede
  if (url.hostname === 'script.google.com') {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response('<h2 style="font-family:sans-serif;padding:2rem">Você está offline. Conecte-se para usar o app.</h2>', {
          headers: { 'Content-Type': 'text/html' }
        })
      )
    );
    return;
  }

  // Shell local: cache first
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
