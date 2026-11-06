/* GoReview service worker (classic script). Built into dist-review/sw.js by packages/goreview/app/vite.config.ts --mode review,
 * which replaces the two tokens below: the build id (a hash of every shell file) and the list of files to precache.
 *
 *   shell        precached at install under "goreview-shell-<build id>": index, hashed assets, fonts, manifest, icons, config.json.
 *                Served cache-first (the cached index and its hashed assets are one consistent version); a new build installs
 *                beside it and WAITS: the page offers "Update ready - reload" and only then sends SKIP_WAITING.
 *   config.json  network-first, the cached copy only when the network fails.
 *   dict/        the dictionary shards are NOT precached (hundreds of MB): cached on demand in "goreview-dict-v1", capped.
 *   lexicon/     Hebrew and Greek indexes are NOT precached: shards and the Koine index are cached on demand in a build-versioned cache, capped.
 *   everything else  untouched: the Repository service (any origin, /sync, /vocabulary, /candidates, /me, /sessions ...) is NEVER
 *                cached, and a request that carries an Authorization header is never answered from a cache.
 */
'use strict';

var BUILD_ID = 'ecclesia-15dc2f8a527b';
var PRECACHE = [
  "./",
  "./EB-Garamond-OFL.txt",
  "./THIRD-PARTY-NOTICES.md",
  "./assets/fonts/EB-Garamond-OFL.txt",
  "./assets/fonts/eb-garamond-latin-400-italic.woff2",
  "./assets/fonts/eb-garamond-latin-400.woff2",
  "./assets/fonts/eb-garamond-latin-600.woff2",
  "./assets/go-globe-frame-D8kaNpyf.png",
  "./assets/go-globe-rim-CzbKbQV5.png",
  "./assets/go-globe-turn-CQuTUSuw.png",
  "./assets/go-logo-D1Qp-DDg.png",
  "./assets/index-JE08N56V.js",
  "./assets/style-CTa3RDaW.css",
  "./config.json",
  "./icons/apple-touch-icon.png",
  "./icons/go-logo.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/icon.svg",
  "./index.html",
  "./manifest.webmanifest"
];

var SHELL_PREFIX = 'goreview-shell-';
var SHELL_CACHE = SHELL_PREFIX + BUILD_ID;
var DICT_CACHE = 'goreview-dict-v1';
var LEXICON_PREFIX = 'goreview-lexicon-';
var LEXICON_CACHE = LEXICON_PREFIX + BUILD_ID;
var DICT_MAX_ENTRIES = 400;
var DICT_MAX_BYTES = 3 * 1024 * 1024; // one shard larger than this is served but not kept

/** Paths of the Repository service. A request whose path from the scope root starts with one is never cached (nor is anything outside the scope). */
var SERVICE_PATH = /^\/?(sync|vocabulary|candidates|me|sessions|events|knowledge|units|enrolments|documents|corrections|reviews|writing|preferences|lookups|health|export)(\/|$)/;

var scopePath = new URL(self.registration.scope).pathname;

function relativePath(url) {
  return url.pathname.indexOf(scopePath) === 0 ? url.pathname.slice(scopePath.length) : null;
}

function isServiceRequest(request, url) {
  if (request.headers && request.headers.get('Authorization')) return true;
  var rel = relativePath(url);
  // outside the scope is never this app's file; inside it, the path from the scope root is what is tested (an app hosted at /me/ is not the service)
  return rel === null || SERVICE_PATH.test(rel);
}

self.addEventListener('install', function (event) {
  // no skipWaiting here: an update waits until the learner taps "Update ready - reload"
  event.waitUntil(
    caches.open(SHELL_CACHE).then(function (cache) {
      return cache.addAll(PRECACHE.map(function (p) { return new Request(p, { cache: 'reload' }); }));
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return (k.indexOf(SHELL_PREFIX) === 0 && k !== SHELL_CACHE) || (k.indexOf(LEXICON_PREFIX) === 0 && k !== LEXICON_CACHE);
      }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

function cachedShell(request) {
  return caches.open(SHELL_CACHE).then(function (cache) { return cache.match(request, { ignoreSearch: true }); });
}

function navigationFallback() {
  return cachedShell('./').then(function (r) { return r && !r.redirected ? r : undefined; });
}

function networkFirstConfig(request) {
  return fetch(request).then(function (response) {
    if (response && response.ok) {
      var copy = response.clone();
      caches.open(SHELL_CACHE).then(function (cache) { return cache.put(request, copy); });
    }
    return response;
  }).catch(function () {
    return cachedShell(request).then(function (r) { return r || Response.error(); });
  });
}

function trim(cache) {
  return cache.keys().then(function (keys) {
    var extra = keys.length - DICT_MAX_ENTRIES;
    return Promise.all(keys.slice(0, Math.max(0, extra)).map(function (k) { return cache.delete(k); }));
  });
}

function dictOnDemand(request, cacheName) {
  return caches.open(cacheName || DICT_CACHE).then(function (cache) {
    return cache.match(request).then(function (hit) {
      if (hit) return hit;
      return fetch(request).then(function (response) {
        var size = Number(response.headers.get('content-length') || 0);
        if (response.ok && response.status === 200 && (!size || size <= DICT_MAX_BYTES)) {
          cache.put(request, response.clone()).then(function () { return trim(cache); });
        }
        return response;
      });
    });
  });
}

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;
  var url = new URL(request.url);
  if (url.origin !== self.location.origin) return;       // another origin (the service, a speech proxy): the network, untouched
  if (isServiceRequest(request, url)) return;            // never cached, never answered from a cache
  var rel = relativePath(url);
  if (rel === null) return;                              // outside this app's scope

  if (request.mode === 'navigate') {
    event.respondWith(navigationFallback().then(function (r) { return r || fetch(request); }));
    return;
  }
  if (rel === 'config.json') { event.respondWith(networkFirstConfig(request)); return; }
  if (rel.indexOf('dict/') === 0) { event.respondWith(dictOnDemand(request)); return; }
  if (rel.indexOf('lexicon/') === 0) { event.respondWith(dictOnDemand(request, LEXICON_CACHE)); return; }
  event.respondWith(cachedShell(request).then(function (r) { return r || fetch(request); }));
});
