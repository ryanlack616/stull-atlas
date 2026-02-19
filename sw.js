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
  "assets/AuthModal-qEl_HyOq.js",
  "assets/ExplorerPage-SgKBRTkw.js",
  "assets/OxideLink-DfHeNf4K.js",
  "assets/OxideRadar-BRo5lEwo.js",
  "assets/blend-xGiHwjeo.js",
  "assets/calc-styles-u5C4IXOP.js",
  "assets/factory-BqgISpRP.js",
  "assets/featureFlags-DeKxyuZW.js",
  "assets/geneticOptimizer-Cjw2kpfY.js",
  "assets/glazeService-vFHoEM6o.js",
  "assets/index-CKJkX_Fm.js",
  "assets/simplex-fPJ5sx54.js",
  "assets/umf-Bpe2KrgL.js",
  "assets/usePageTitle-DBGH44HI.js",
  "assets/validation-B6d6hXn8.js",
  "assets/vendor-react-D380Hx73.js",
  "assets/vendor-router-1trnvaIQ.js",
  "assets/vendor-state-CUnBHQ16.js",
  "assets/index-Beyst0Xe.js",
  "assets/index-JM3wRy89.css",
  "assets/index-4a_lvNVI.js",
  "assets/index-DNJCmhuO.js",
  "assets/index-9s3zo9QC.js",
  "assets/ComparePanel-D0QpnKE_.js",
  "assets/index-DJZPmoXp.js",
  "assets/glazySearch-CBQEdmqG.js",
  "assets/02-explorer-main-voTuCKib.png",
  "assets/03-explorer-detail-CBknkUhR.png",
  "assets/05-calculators-xaXyk8Vb.png",
  "assets/AboutPage-i0NZU33q.js",
  "assets/BiaxialBlendPage-BfU85ztX.js",
  "assets/CalculatorsPage-DHUuBI1c.js",
  "assets/FluxTriaxialPage-BtP0037x.js",
  "assets/GuidePage-Edap5I_S.js",
  "assets/HenryPage-Cky_aV3w.js",
  "assets/ImportExportPage-DOj8ijPa.js",
  "assets/LineBlendPage-DIE0y1tL.js",
  "assets/MaterialsPage-CYmcdgtB.js",
  "assets/NCECAPage-C_dkyUif.js",
  "assets/NotFoundPage-wR9HN5g_.js",
  "assets/OptimizerPage-NSlMNmv4.js",
  "assets/PricingPage-8lW7luHo.js",
  "assets/QuadaxialBlendPage-BcpxjInk.js",
  "assets/RadialBlendPage-BAY8PU2E.js",
  "assets/SpaceFillingPage-Bb8RLjfA.js",
  "assets/SuggestionPage-CMEUC2gl.js",
  "assets/TimelinePage-Bj5U3yYH.js",
  "assets/TriaxialBlendPage-CKN71JaG.js",
  "assets/UMFCalculatorPage-CiwezK-9.js",
  "assets/UpdatesPage-P3zJd7Qr.js",
  "assets/VariabilityPage-DmAA31wj.js",
  "assets/export-CUxvy3P4.js"
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
