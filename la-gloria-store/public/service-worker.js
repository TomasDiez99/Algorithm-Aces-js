/* eslint-disable no-restricted-globals */

const CACHE_NAME = "la-gloria-store-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/logo.png",
  "/HomeCarrouselBanners/banner2.png",
  "/HomeCarrouselBanners//banner5.png",
  "/error",
  "/errorPWA"
];

// Install event - Caches necessary files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (
    event.request.url.includes("/rest/products") ||
    event.request.url.includes("/rest/brands") ||
    event.request.url.includes("/rest/categories") ||
    event.request.url.includes("/rest/shopping-carts/history/") ||
    event.request.url.includes("/rest/order-details/shopping-cart/") 
  ) {
    event.respondWith(
      caches.open("api-cache").then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // Si la respuesta es válida, almacenamos en caché
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response; // Regresamos la respuesta
          })
          .catch((error) => {
            // Si la red falla, se intenta obtener desde la caché
            console.log('Network error or resource not available:', error);
            return caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse; // Regresamos lo que esté en la caché
              } else {
                console.log("no hay nada en cache")
                // Si no hay nada en la caché, puedes mostrar una página de error o algo por defecto
                return caches.match('/errorPWA'); // Página de error personalizada
              }
            });
          });
      })
    );
  }
});



/*static fetch cache
// Fetch event - Serve files from cache first, then network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
*/

/*
// Activate event - Clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
*/

// Activate event - Clean up old caches, without deleting api fetch
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== "api-cache") {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});




/*const CACHE_WEBCINES = "webCines-cache-v1"
const INSTALL_CACHE = [
  '/',
  '/funciones',
  '/peliculas',
  '/generos',
  '/paginaErrorPWA',
  '../app/background.jpg',
  './icons/webCinesIcon.png'
];

//Cuando se activa se borran los SW viejos
self.addEventListener("activate", (event) => {
  const CACHE = [CACHE_WEBCINES];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_WEBCINES).then((cache) => {
      return cache.addAll(INSTALL_CACHE)
      .catch(error => {
        console.log("Error install PWA: ", error);
      });
    })
  );
});

const deNetwork = (request, timeout) => 
  new Promise((fulfill, reject) => {
    if (!navigator.onLine) {
      return reject();
    }

    const timeoutId = setTimeout(reject, timeout);
    fetch(request).then(response => {
      clearTimeout(timeoutId);
      fulfill(response);
      actualizar(request);
    }, reject);
  });

const deCache = request =>
  caches
    .open(CACHE_WEBCINES)
    .then(cache =>
      cache
        .match(request)
        .then(matching => matching || cache.match("/paginaErrorPWA"))
    );

const actualizar = request =>
  caches
    .open(CACHE_WEBCINES)
    .then(cache =>
      fetch(request)
        .then(response => cache.put(request,response))
        .catch(error => console.log("Error actualizar PWA: ",error))
    );

self.addEventListener('fetch', event => {
  event.respondWith(
    deNetwork(event.request,5000).catch(() => deCache(event.request))
  );
  event.waitUntil(actualizar(event.request));
}); 
*/