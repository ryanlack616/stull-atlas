/**
 * Post-build: inject hashed asset URLs into sw.js for pre-caching.
 * 
 * Reads .vite/manifest.json from the build output and replaces the
 * '__PRECACHE_ASSETS__' placeholder in sw.js with an array of critical
 * asset paths (vendor chunks, main CSS, index JS).
 * 
 * In gift/offline mode (--all flag), injects ALL assets for full
 * offline capability on micro SD card distribution.
 * 
 * Usage:
 *   node scripts/postbuild-sw.js [dist-dir]
 *   node scripts/postbuild-sw.js [dist-dir] --all   # gift mode: cache everything
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const args = process.argv.slice(2)
const cacheAll = args.includes('--all')
const distDir = args.find(a => !a.startsWith('-')) || 'dist'
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

// Collect assets to pre-cache:
// Normal mode: critical assets only (CSS, vendor chunks, main entry)
// Gift mode (--all): everything for full offline use
const criticalAssets = new Set()

for (const [key, entry] of Object.entries(manifest)) {
  const file = entry.file
  if (!file) continue

  if (cacheAll) {
    // Gift mode: cache ALL assets for complete offline capability
    criticalAssets.add(file)
    if (entry.css) entry.css.forEach(c => criticalAssets.add(c))
    continue
  }

  // Normal mode: only critical assets
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

const mode = cacheAll ? 'GIFT (all assets)' : 'normal (critical only)'
console.log(`✓ Injected ${criticalAssets.size} assets into sw.js [${mode}]:`)
for (const a of criticalAssets) {
  console.log(`  ${a}`)
}
