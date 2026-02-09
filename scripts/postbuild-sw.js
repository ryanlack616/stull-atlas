/**
 * Post-build: inject hashed asset URLs into sw.js for pre-caching.
 * 
 * Reads .vite/manifest.json from the build output and replaces the
 * '__PRECACHE_ASSETS__' placeholder in sw.js with an array of critical
 * asset paths (vendor chunks, main CSS, index JS).
 * 
 * Usage: node scripts/postbuild-sw.js [dist-dir]
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const distDir = process.argv[2] || 'dist'
const manifestPath = join(distDir, '.vite', 'manifest.json')
const swPath = join(distDir, 'sw.js')

if (!existsSync(manifestPath)) {
  console.warn('⚠ No .vite/manifest.json found — skipping SW asset injection')
  process.exit(0)
}

if (!existsSync(swPath)) {
  console.warn('⚠ No sw.js found in dist — skipping')
  process.exit(0)
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))

// Collect critical assets to pre-cache:
// - All CSS files (small, needed for first paint)
// - Vendor chunks (react, router, state — needed for any page)
// - Main index JS (the entry point)
// - NOT lazy-loaded page chunks (they'll be cached on-demand)
// - NOT Plotly bundles (2MB each — too large for install-time pre-cache)
const criticalAssets = new Set()

for (const [key, entry] of Object.entries(manifest)) {
  const file = entry.file
  if (!file) continue

  // Always include CSS
  if (file.endsWith('.css')) {
    criticalAssets.add(file)
    continue
  }

  // Include vendor chunks and main entry
  if (
    file.includes('vendor-react') ||
    file.includes('vendor-router') ||
    file.includes('vendor-state') ||
    key === 'src/main.tsx' ||
    key === 'index.html'
  ) {
    criticalAssets.add(file)
    // Also include CSS imports for this entry
    if (entry.css) entry.css.forEach(c => criticalAssets.add(c))
  }
}

// Read sw.js and replace placeholder
let sw = readFileSync(swPath, 'utf-8')
const assetsArray = JSON.stringify([...criticalAssets])
sw = sw.replace("'__PRECACHE_ASSETS__'", assetsArray)

writeFileSync(swPath, sw, 'utf-8')
console.log(`✓ Injected ${criticalAssets.size} critical assets into sw.js:`)
for (const a of criticalAssets) {
  console.log(`  ${a}`)
}
