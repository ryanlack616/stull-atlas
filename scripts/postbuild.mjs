#!/usr/bin/env node
/**
 * postbuild.mjs — Runs after `vite build`
 *
 * 1. Copies index.html → 404.html (SPA routing fallback)
 * 2. Reads the Vite manifest to discover hashed asset filenames
 * 3. Injects the precache list into sw.js so the service worker
 *    can cache the exact assets produced by this build
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'

const dist = resolve('dist')

// ── 1. SPA fallback ──────────────────────────────────────
copyFileSync(join(dist, 'index.html'), join(dist, '404.html'))
console.log('  ✓ Copied index.html → 404.html')

// ── 2. Discover hashed assets ────────────────────────────
// Vite writes .vite/manifest.json when build.manifest = true
const manifestPath = join(dist, '.vite', 'manifest.json')
let assetFiles = []

if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
  const seen = new Set()
  for (const entry of Object.values(manifest)) {
    if (entry.file && !seen.has(entry.file)) {
      seen.add(entry.file)
      assetFiles.push(entry.file)
    }
    // Also include CSS imports
    if (entry.css) {
      for (const css of entry.css) {
        if (!seen.has(css)) {
          seen.add(css)
          assetFiles.push(css)
        }
      }
    }
  }
} else {
  // Fallback: scan dist/assets directly
  const assetsDir = join(dist, 'assets')
  if (existsSync(assetsDir)) {
    assetFiles = readdirSync(assetsDir)
      .filter(f => /\.(js|css)$/.test(f))
      .map(f => `assets/${f}`)
  }
}

// Separate critical (initial load) from lazy (code-split pages, plotly)
const LAZY_PATTERNS = [
  'plotly-gl2d', 'plotly-gl3d',       // Huge GL bundles — load on demand
  'vendor-analysis', 'vendor-math',    // Analysis tab only
  'data-digitalfire', 'domain-digitalfire', // OmniSearch only
]

const criticalAssets = []
const lazyAssets = []

for (const file of assetFiles) {
  if (LAZY_PATTERNS.some(p => file.includes(p))) {
    lazyAssets.push(file)
  } else {
    criticalAssets.push(file)
  }
}

console.log(`  ✓ Found ${criticalAssets.length} critical + ${lazyAssets.length} lazy assets`)

// ── 3. Inject into sw.js ─────────────────────────────────
const swPath = join(dist, 'sw.js')
if (existsSync(swPath)) {
  let sw = readFileSync(swPath, 'utf-8')

  // Replace the placeholder string with actual asset array
  sw = sw.replace(
    `const PRECACHE_ASSETS = '__PRECACHE_ASSETS__'`,
    `const PRECACHE_ASSETS = ${JSON.stringify(criticalAssets, null, 2)}`
  )

  // Also inject lazy assets for opportunistic caching
  sw = sw.replace(
    `const LAZY_ASSETS = '__LAZY_ASSETS__'`,
    `const LAZY_ASSETS = ${JSON.stringify(lazyAssets, null, 2)}`
  )

  writeFileSync(swPath, sw)
  console.log('  ✓ Injected precache manifest into sw.js')
} else {
  console.warn('  ⚠ sw.js not found in dist — skipping precache injection')
}

console.log('  ✓ Postbuild complete')
