// Name of the cache
const CACHE_NAME = 'quest-cache-v1';

// Listen for the install event, which fires when the service worker is installing
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                // Add all URLs of resources we want to cache
                return cache.addAll([
                    '/',
                    '/index.html',
                    // Add more URLs as needed
                ]);
            })
    );
});

// Listen for fetch events, which occur when the browser tries to access any network resource
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return the response from the cached version
                if (response) {
                    return response;
                }

                // Not in cache - return the result from the live server
                // `fetch` is essentially a "fallback"
                return fetch(event.request);
            }
        )
    );
});