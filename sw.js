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
  "assets/AuthModal-CkmXedy_.js",
  "assets/ExplorerPage-CVvnvK-5.js",
  "assets/OxideLink-Ckb8-Aqr.js",
  "assets/OxideRadar-CqX15nAb.js",
  "assets/blend-xGiHwjeo.js",
  "assets/calc-styles-u5C4IXOP.js",
  "assets/factory-BujE-kDv.js",
  "assets/featureFlags-DeKxyuZW.js",
  "assets/find_empties-CuCRB34y.css",
  "assets/find_empties-DRiZhjAu.js",
  "assets/geneticOptimizer-D0tKq7l0.js",
  "assets/glazeService-D-m3Bc_x.js",
  "assets/index-C6l8ZLGi.js",
  "assets/simplex-I_iDn5AG.js",
  "assets/umf-Bef8OHIG.js",
  "assets/usePageTitle-Dfez-EUD.js",
  "assets/validation-D1rEx81t.js",
  "assets/vendor-react-D0vdeqNS.js",
  "assets/vendor-router-DjLFn5nj.js",
  "assets/vendor-state-DTYbmM1J.js",
  "assets/index-DFhyK2mv.js",
  "assets/index-JM3wRy89.css",
  "assets/index-D1CIjMd7.js",
  "assets/index-CwEbS-AQ.js",
  "assets/index-BaEZnZPS.js",
  "assets/index-BuGgJ8RX.js",
  "assets/BlendLauncher-CSKusudG.js",
  "assets/ComparePanel-DLiKCIWG.js",
  "assets/index-ciw763aw.js",
  "assets/glazySearch-CBQEdmqG.js",
  "assets/plotly-custom-2d-Dssw1fWg.js",
  "assets/plotly-custom-3d-D_mflqVN.js",
  "assets/02-explorer-main-voTuCKib.png",
  "assets/03-explorer-detail-CBknkUhR.png",
  "assets/05-calculators-xaXyk8Vb.png",
  "assets/AboutPage-CZvBZv16.js",
  "assets/BiaxialBlendPage-CTcHMG94.js",
  "assets/CalculatorsPage-U5uPHD_d.js",
  "assets/FluxTriaxialPage-BllPN59K.js",
  "assets/GuidePage-CpllZBbi.js",
  "assets/HenryPage-DNZbwaRE.js",
  "assets/ImportExportPage-C4yCmJHF.js",
  "assets/LineBlendPage-CwVTmu9x.js",
  "assets/MarksPage-BFwyGYqX.js",
  "assets/MaterialsPage-Cr-BVHmU.js",
  "assets/NCECAPage-E8FdKgdH.js",
  "assets/NotFoundPage-BH3INFa1.js",
  "assets/OptimizerPage-CSztBC1D.js",
  "assets/PricingPage-BjlPSKJm.js",
  "assets/QuadaxialBlendPage-b_gHUVnZ.js",
  "assets/RadialBlendPage-CmTW1DAJ.js",
  "assets/SpaceFillingPage-BJyrKzuk.js",
  "assets/SuggestionPage-3PotdOhr.js",
  "assets/TriaxialBlendPage-BPxNLYCN.js",
  "assets/UMFCalculatorPage-DrY3OWiy.js",
  "assets/UpdatesPage-0FJ3HTBm.js",
  "assets/VariabilityPage-633p4FGM.js",
  "assets/export-BXZ-GFcd.js"
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
