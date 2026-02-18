/**
 * Stull Atlas — Service Worker v5
 *
 * Strategies:
 *   Shell + critical JS/CSS → precache on install, cache-first at runtime
 *   Glaze dataset            → cache-first (large, rarely changes)
 *   Plotly / analysis chunks  → runtime cache-first (lazy-loaded, content-hashed)
 *   HTML / navigation         → network-first with cache fallback (offline shell)
 *   Fonts                     → cache-first (immutable)
 *
 * Precache manifest is injected by scripts/postbuild.mjs at build time.
 */

const CACHE_VERSION = 'v5'
const SHELL_CACHE   = `stull-shell-${CACHE_VERSION}`
const DATA_CACHE    = `stull-data-${CACHE_VERSION}`
const RUNTIME_CACHE = `stull-runtime-${CACHE_VERSION}`

// ── Precache manifest (injected at build time) ──────────
const PRECACHE_ASSETS = [
  "assets/AuthModal-D41oo1oQ.js",
  "assets/ExplorerPage-Cmri80q5.js",
  "assets/OxideLink-DfHeNf4K.js",
  "assets/OxideRadar-BRo5lEwo.js",
  "assets/blend-xGiHwjeo.js",
  "assets/calc-styles-u5C4IXOP.js",
  "assets/factory-BqgISpRP.js",
  "assets/featureFlags-DeKxyuZW.js",
  "assets/geneticOptimizer-BVGHxN4j.js",
  "assets/glazeService-07J2DCzw.js",
  "assets/index-8HUN2i8f.js",
  "assets/simplex-D8GIy9GC.js",
  "assets/umf-Bjrc84p_.js",
  "assets/usePageTitle-DBGH44HI.js",
  "assets/validation-CfzxZFBo.js",
  "assets/vendor-react-D380Hx73.js",
  "assets/vendor-router-1trnvaIQ.js",
  "assets/vendor-state-CUnBHQ16.js",
  "assets/index-CShX2zP3.js",
  "assets/index-JM3wRy89.css",
  "assets/index-CE_NHNbc.js",
  "assets/index-DNJCmhuO.js",
  "assets/index-Bw1eZ4fy.js",
  "assets/ComparePanel-CYxR2KXm.js",
  "assets/index-DXmMg_gb.js",
  "assets/glazySearch-CBQEdmqG.js",
  "assets/02-explorer-main-voTuCKib.png",
  "assets/03-explorer-detail-CBknkUhR.png",
  "assets/05-calculators-xaXyk8Vb.png",
  "assets/AboutPage-TUJKdaD0.js",
  "assets/BiaxialBlendPage-DvuFSOgB.js",
  "assets/CalculatorsPage-BP-oudZ1.js",
  "assets/FluxTriaxialPage-Cg9ntQBl.js",
  "assets/GuidePage-C8C9u4Sa.js",
  "assets/HenryPage-BkBNyXmZ.js",
  "assets/ImportExportPage-kaUOl6ID.js",
  "assets/LineBlendPage-a2-G0fNU.js",
  "assets/MaterialsPage-BjbRGsmX.js",
  "assets/NCECAPage-CDuepXL7.js",
  "assets/NotFoundPage-DROGwMMV.js",
  "assets/OptimizerPage-CaSsmXDU.js",
  "assets/PricingPage-BruFTI1L.js",
  "assets/QuadaxialBlendPage-DqIQIB96.js",
  "assets/RadialBlendPage-Cgmxh7Xg.js",
  "assets/SpaceFillingPage-jNYbLzmm.js",
  "assets/SuggestionPage-B19Ihwmc.js",
  "assets/TimelinePage-CMwUryLx.js",
  "assets/TriaxialBlendPage-BJ0_e7zn.js",
  "assets/UMFCalculatorPage-OF2QynqX.js",
  "assets/UpdatesPage-kJE7eYCM.js",
  "assets/VariabilityPage-Bgk98E9y.js",
  "assets/export-CZymxRhW.js"
]
const LAZY_ASSETS     = '__LAZY_ASSETS__'

// App shell — always precached
const SHELL_FILES = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/fonts/source-serif-4-latin.woff2',
  '/fonts/source-serif-4-latin-italic.woff2',
]

// ── Install ─────────────────────────────────────────────
self.addEventListener('install', (event) => {
  const urls = [...SHELL_FILES]

  // Add build-injected critical assets
  if (Array.isArray(PRECACHE_ASSETS)) {
    urls.push(...PRECACHE_ASSETS.map(f => '/' + f))
  }

  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(cache => cache.addAll(urls))
      .then(() => self.skipWaiting())
  )
})

// ── Activate: clean old caches, claim clients ───────────
self.addEventListener('activate', (event) => {
  const KEEP = [SHELL_CACHE, DATA_CACHE, RUNTIME_CACHE]
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names.filter(n => !KEEP.includes(n)).map(n => caches.delete(n))
      ))
      .then(() => self.clients.claim())
      .then(() => {
        // Notify all clients that a new version activated
        self.clients.matchAll({ type: 'window' }).then(clients => {
          clients.forEach(client => client.postMessage({ type: 'SW_UPDATED' }))
        })
      })
  )
})

// ── Fetch strategies ────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and cross-origin
  if (request.method !== 'GET') return
  if (url.origin !== self.location.origin) return

  // 1. Glaze dataset — cache-first (large, rarely changes)
  if (url.pathname.includes('glazy-processed')) {
    event.respondWith(cacheFirst(request, DATA_CACHE))
    return
  }

  // 2. Content-hashed assets (JS/CSS) — cache-first
  if (url.pathname.startsWith('/assets/') && /\.(js|css)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE))
    return
  }

  // 3. Fonts — cache-first (immutable)
  if (url.pathname.startsWith('/fonts/')) {
    event.respondWith(cacheFirst(request, SHELL_CACHE))
    return
  }

  // 4. Images in public — cache-first
  if (/\.(png|jpg|svg|webp|ico)$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, RUNTIME_CACHE))
    return
  }

  // 5. HTML / navigation — network-first with offline fallback
  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(networkFirstDocument(request))
    return
  }

  // 6. Everything else — network-first
  event.respondWith(networkFirst(request))
})

// ── Strategy helpers ────────────────────────────────────

/** Cache-first: return cached response, falling back to network (and cache the result) */
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Offline' })
  }
}

/** Network-first for documents: try network, cache result, fall back to cache or shell */
async function networkFirstDocument(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(SHELL_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    // Fall back to cached index.html (SPA — all routes share the shell)
    return caches.match('/') || caches.match('/index.html')
  }
}

/** Network-first for other requests */
async function networkFirst(request) {
  try {
    return await fetch(request)
  } catch {
    const cached = await caches.match(request)
    return cached || new Response('Offline', { status: 503, statusText: 'Offline' })
  }
}

// ── Background sync: opportunistically cache lazy assets ─
self.addEventListener('message', (event) => {
  if (event.data?.type === 'CACHE_LAZY') {
    if (Array.isArray(LAZY_ASSETS)) {
      caches.open(RUNTIME_CACHE).then(cache => {
        LAZY_ASSETS.forEach(file => {
          cache.match('/' + file).then(existing => {
            if (!existing) {
              fetch('/' + file)
                .then(r => { if (r.ok) cache.put('/' + file, r) })
                .catch(() => {}) // Silently skip if offline
            }
          })
        })
      })
    }
  }
})
