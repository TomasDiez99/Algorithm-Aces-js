/* eslint-disable no-restricted-globals */

const CACHE_NAME = "la-gloria-store-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/logo.png",
    "/notfound.png",
    "/HomeCarrouselBanners/banner2.png",
    "/HomeCarrouselBanners/banner5.png",
    "/error"
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
                                // return caches.match('/error');
                            }
                        });
                    });
            })
        );
    }
});

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
