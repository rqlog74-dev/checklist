// Define um nome e versão para o cache
const CACHE_NAME = 'rio-quality-checklist-v1';

// Lista de arquivos que serão armazenados em cache para funcionamento offline
const urlsToCache = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-firestore.js',
  'https://www.rioquality.com.br/images/logo.webp'
];

// Evento de 'install': é disparado quando o Service Worker é instalado
self.addEventListener('install', event => {
  // Aguarda até que o cache seja aberto e todos os arquivos sejam armazenados
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de 'fetch': é disparado para cada requisição que a página faz (ex: CSS, JS, imagens)
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar a requisição no cache primeiro
    caches.match(event.request)
      .then(response => {
        // Se a resposta for encontrada no cache, a retorna
        if (response) {
          return response;
        }
        // Se não, faz a requisição à rede
        return fetch(event.request);
      }
    )
  );
});
