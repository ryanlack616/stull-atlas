/**
 * Stull Atlas — Service Worker
 * 
 * Network-first with cache fallback for the app shell.
 * Caches the glaze dataset aggressively (it rarely changes).
 * Plotly GL bundles get a long cache since they're content-hashed.
 */

const CACHE_NAME = 'stull-atlas-v3'
const DATASET_CACHE = 'stull-dataset-v1'

// App shell — cache on install
const SHELL_FILES = [
  '/stullv2/',
  '/stullv2/index.html',
  '/stullv2/favicon.svg',
  '/stullv2/manifest.json',
]

// Install: pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  )
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names
          .filter(name => name !== CACHE_NAME && name !== DATASET_CACHE)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  )
})

// Fetch: network-first for HTML/API, cache-first for assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // Skip non-GET and cross-origin
  if (event.request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // Glaze dataset — cache-first (large, rarely changes)
  if (url.pathname.includes('glazy-processed')) {
    event.respondWith(
      caches.open(DATASET_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone())
            return response
          })
        })
      )
    )
    return
  }

  // Content-hashed assets (JS/CSS) — cache-first
  if (url.pathname.match(/\.(js|css)$/) && url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached
          return fetch(event.request).then(response => {
            if (response.ok) cache.put(event.request, response.clone())
            return response
          })
        })
      )
    )
    return
  }

  // Everything else — network-first with cache fallback (for offline)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful HTML/navigation responses
        if (response.ok && event.request.destination === 'document') {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone))
        }
        return response
      })
      .catch(() => caches.match(event.request).then(cached => cached || caches.match('/stullv2/')))
  )
})
