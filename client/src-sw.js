// Caching js and css requires workbox-strategies to be installed
// To actually respond to requests with a cached response, we need to use a strategy called StaleWhileRevalidate
// This strategy will first check the cache for a response, and if it finds one, it will return it.

const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// DONE: Implement asset caching
registerRoute(
    // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
({ request }) => ['style', 'script', 'worker'].includes(request.destination),
new StaleWhileRevalidate({
    // name of cache storage
  cacheName: 'asset-cache',
  plugins: [
        // this plugin will cache responses with these headers to a maximum age of 30 days
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
})
)



