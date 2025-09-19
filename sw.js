// Define um nome e versão para o cache para forçar a atualização
const CACHE_NAME = 'rio-quality-checklist-v2';
const REPO_PREFIX = '/checklist/';

// Lista de arquivos que serão armazenados em cache para funcionamento offline
// Caminhos corrigidos para o subdiretório do GitHub Pages
const urlsToCache = [
  REPO_PREFIX,
  REPO_PREFIX + 'index.html',
  REPO_PREFIX + 'manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js',
  'https://www.rioquality.com.br/images/logo.webp',
  'https://placehold.co/192x192/3b82f6/FFFFFF?text=RQ',
  'https://placehold.co/512x512/3b82f6/FFFFFF?text=RQ'
];

// Evento de 'install': armazena os arquivos essenciais em cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de 'activate': limpa caches antigos para evitar conflitos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Evento de 'fetch': serve os arquivos do cache primeiro (estratégia Cache-First)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna a resposta do cache se existir, senão busca na rede
        return response || fetch(event.request);
      })
  );
});

