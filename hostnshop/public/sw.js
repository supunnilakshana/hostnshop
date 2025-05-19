
// eslint-disable-next-line @typescript-eslint/no-unused-vars
self.addEventListener('install', (event) => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
  });
  
  // Basic offline caching
  const CACHE_NAME = 'app-v1';
  const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/main.js',
    // Add other assets you want to cache
  ];
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached response if found
          if (response) {
            return response;
          }
          
          // Otherwise try to fetch from network
          return fetch(event.request)
            .then((response) => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clone the response
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
                
              return response;
            });
        })
        .catch(() => {
          // Fallback for when both cache and network fail
          return caches.match('/offline.html');
        })
    );
  });