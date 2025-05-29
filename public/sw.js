// Service Worker for LINK.BASSSE PWA
const CACHE_NAME = 'link-bassse-v1.1.0';
const urlsToCache = [
  '/',
  '/index.tsx',
  '/images/pwa-192x192.png',
  '/images/pwa-512x512.png',
  '/images/apple-touch-icon.png',
  '/images/favicon.svg',
  '/images/imagen principal.webp',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache abierto');
        return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
      })
      .catch(error => {
        console.log('❌ Error cacheando recursos:', error);
      })
  );
  // Forzar activación inmediata
  self.skipWaiting();
});

// Fetch event with network-first strategy for dynamic content
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonar y guardar en cache
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar servir desde cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // Si no está en cache, devolver página offline
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
            return new Response('Recurso no disponible offline', {
              status: 404,
              statusText: 'Not Found'
            });
          });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker activado');
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Reclamar control de todas las pestañas
      self.clients.claim()
    ])
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync activado');
    // Aquí podrías sincronizar datos cuando vuelva la conexión
  }
});

// Push notifications (para futuras implementaciones)
self.addEventListener('push', (event) => {
  if (event.data) {
    console.log('📱 Push notification recibida');
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/images/pwa-192x192.png',
      badge: '/images/pwa-192x192.png',
      data: data.data || {}
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notification click recibido');
  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://link.bassse.com/')
  );
}); 