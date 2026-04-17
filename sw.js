const CACHE_NAME = "ist-mad-mob-v2";

// Arquivos locais para cachear (o shell do PWA)
const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// Template HTML para falha de conexão no Iframe
const OFFLINE_PAGE_HTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f4f4f4; color: #333; text-align: center; }
        .card { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); max-width: 400px; }
        h2 { color: #005aa5; margin-top: 0; }
        p { line-height: 1.5; color: #666; }
        .btn { background: #005aa5; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 20px; transition: background 0.2s; }
        .btn:hover { background: #004480; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Ops! Sem Conexão</h2>
        <p>Não conseguimos carregar o sistema. Verifique sua internet para continuar enviando suas amostras.</p>
        <button class="btn" onclick="window.location.reload()">Tentar Novamente</button>
    </div>
</body>
</html>`;

// Instala e cacheia o shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS))
  );
  self.skipWaiting();
});

// Limpa caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Estratégia de Fetch
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Requisições para o Google Apps Script (Conteúdo dinâmico)
  if (url.hostname === "script.google.com") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(OFFLINE_PAGE_HTML, {
          headers: { "Content-Type": "text/html" },
        });
      })
    );
    return;
  }

  // Shell local: Network First, falling back to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

