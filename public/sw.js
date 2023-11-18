const cacheData = "chat-app";
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            return cache.addAll([
                'static/js/bundle.js',
                '/index.html',
                '/',
            ]);
        })
    );
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse && !navigator.onLine) {
                return cachedResponse;
            }

            if (event.request.url.includes('get_messages')) {
                return fetchAndCacheChatMessages(event.request);
            }

            return fetch(event.request).catch((error) => {
                console.error('Fetch error:', error);
            });
        })
    );
})


function fetchAndCacheChatMessages(request) {
    return fetch(request).then((response) => {
            const clone = response.clone();
            caches.open('chat-cache').then((cache) => {
                cache.put(request, clone);
            });
        return response;
    }).catch((error) => {
        console.error('Chat messages fetch error:', error);
    });
}
