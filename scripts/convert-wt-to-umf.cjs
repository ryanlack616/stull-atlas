#!/usr/bin/env node
/**
 * Convert glazy-processed.json from oxide weight-percent to Unity Molecular Formula (UMF).
 *
 * UMF convention (Seger formula):
 *   - All oxide amounts expressed in moles
 *   - Flux oxides (R₂O + RO) are normalized to sum to 1.0
 *   - SiO₂, Al₂O₃, B₂O₃ etc. scale proportionally
 *
 * Steps per recipe:
 *   1. wt% → moles  (divide each oxide by its molar weight)
 *   2. Sum flux moles (R₂O + RO)
 *   3. Divide all moles by flux sum → UMF
 *   4. Update x, y to new UMF SiO₂, Al₂O₃
 *   5. Filter out recipes where conversion fails or produces outliers
 *
 * Usage:
 *   node scripts/convert-wt-to-umf.js
 *
 * Output:
 *   public/glazy-processed.json (overwritten)
 *   Also writes a backup to public/glazy-processed-wtpct-backup.json
 */

const fs = require('fs')
const path = require('path')

// ── IUPAC 2023 Molar Weights (g/mol) ──
// Matches src/calculator/constants.ts DEFAULT_MOLECULAR_WEIGHTS
const MOLAR_WEIGHTS = {
  // Fluxes - R2O
  Li2O:   29.879,
  Na2O:   61.9785,
  K2O:    94.1956,
  // Fluxes - RO
  MgO:    40.304,
  CaO:    56.077,
  SrO:   103.619,
  BaO:   153.326,
  ZnO:    81.379,
  PbO:   223.199,
  // Stabilizers - R2O3
  Al2O3: 101.9601,
  B2O3:   69.617,
  Fe2O3: 159.687,
  // Glass formers - RO2
  SiO2:   60.083,
  TiO2:   79.865,
  ZrO2:  123.22,
  SnO2:  150.708,
  // Colorants / misc
  MnO:    70.937,
  MnO2:   86.936,
  NiO:    74.6924,
  CuO:    79.545,
  Cu2O:  143.091,
  CoO:    74.9322,
  Cr2O3: 151.9892,
  P2O5:  141.9425,
  F:      18.998,
  // Less common (present in Glazy data)
  FeO:    71.844,   // correct value (not DigitalFire's 81.8)
  V2O5:  181.88,
  MoO3:  143.94,
  Bi2O3: 465.96,
  CdO:   128.41,
  CeO2:  172.115,
  Er2O3: 382.52,
  Ho2O3: 377.86,
  Nd2O3: 336.48,
  Pr2O3: 329.81,
  Sb2O3: 291.518,
  ZrO:   107.22,    // unusual form, treat as ZrO
}

const FLUX_OXIDES = ['Li2O', 'Na2O', 'K2O', 'MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO']

// ── Stull chart sanity bounds ──
// After UMF conversion, reject recipes outside these generous limits
const BOUNDS = {
  SiO2_max: 10,     // typical Stull range 0–8; 10 catches high-silica glazes
  Al2O3_max: 1.5,   // typical 0–0.8; 1.5 catches shinos
  SiO2_min: 0,
  Al2O3_min: 0,
  fluxSum_min: 0.001, // avoid division by zero
}

// ── Main ──

const outputPath = path.join(__dirname, '..', 'public', 'glazy-processed.json')
const backupPath = path.join(__dirname, '..', 'public', 'glazy-processed-wtpct-backup.json')
const srcDataPath = path.join(__dirname, '..', 'src', 'data', 'glazes', 'glazy-processed.json')

// Load from backup (original wt% data) if it exists, otherwise from output
const inputPath = fs.existsSync(backupPath) ? backupPath : outputPath
console.log('Loading', inputPath)
const raw = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
console.log(`Loaded ${raw.length} recipes`)

// Backup the original if not already backed up
if (!fs.existsSync(backupPath)) {
  fs.writeFileSync(backupPath, JSON.stringify(raw))
  console.log(`Backup written to ${backupPath}`)
} else {
  console.log(`Backup already exists at ${backupPath}`)
}

// Detect whether each recipe is already UMF or wt%
function isAlreadyUMF(recipe) {
  let fluxSum = 0
  for (const oxide of FLUX_OXIDES) {
    if (recipe.umf[oxide]) fluxSum += recipe.umf[oxide]
  }
  return fluxSum >= 0.85 && fluxSum <= 1.15
}

let converted = 0
let alreadyUmf = 0
let dropped = 0
let noFlux = 0
const results = []

for (const recipe of raw) {
  // Check if already in UMF format
  if (isAlreadyUMF(recipe)) {
    alreadyUmf++
    // Already UMF — just validate bounds
    const sio2 = recipe.umf.SiO2 || 0
    const al2o3 = recipe.umf.Al2O3 || 0
    if (sio2 <= BOUNDS.SiO2_max && al2o3 <= BOUNDS.Al2O3_max) {
      recipe.x = sio2
      recipe.y = al2o3
      results.push(recipe)
    } else {
      dropped++
    }
    continue
  }

  // Step 1: wt% → moles
  const moles = {}
  let hasAnyOxide = false
  for (const [oxide, wtPct] of Object.entries(recipe.umf)) {
    const mw = MOLAR_WEIGHTS[oxide]
    if (!mw) {
      // Unknown oxide — skip it (rare elements we don't have MW for)
      continue
    }
    if (typeof wtPct === 'number' && wtPct > 0) {
      moles[oxide] = wtPct / mw
      hasAnyOxide = true
    }
  }

  if (!hasAnyOxide) {
    dropped++
    continue
  }

  // Step 2: Sum flux moles
  let fluxSum = 0
  for (const oxide of FLUX_OXIDES) {
    if (moles[oxide]) fluxSum += moles[oxide]
  }

  if (fluxSum < BOUNDS.fluxSum_min) {
    // No flux content — can't normalize to UMF (e.g., pure silica, kiln wash)
    noFlux++
    dropped++
    continue
  }

  // Step 3: Normalize to UMF (divide all moles by flux sum)
  const umf = {}
  for (const [oxide, mol] of Object.entries(moles)) {
    const val = mol / fluxSum
    if (val > 0.0001) { // drop trace amounts below 0.0001
      umf[oxide] = Math.round(val * 10000) / 10000  // 4 decimal places
    }
  }

  // Step 4: Check bounds
  const sio2 = umf.SiO2 || 0
  const al2o3 = umf.Al2O3 || 0

  if (sio2 > BOUNDS.SiO2_max || al2o3 > BOUNDS.Al2O3_max) {
    dropped++
    continue
  }

  // Update recipe
  recipe.umf = umf
  recipe.x = sio2
  recipe.y = al2o3

  // Recompute derived ratios
  recipe.SiO2_Al2O3_ratio = al2o3 > 0 ? Math.round((sio2 / al2o3) * 100) / 100 : null

  const r2o = (umf.Li2O || 0) + (umf.Na2O || 0) + (umf.K2O || 0)
  const ro = (umf.MgO || 0) + (umf.CaO || 0) + (umf.SrO || 0) + (umf.BaO || 0) + (umf.ZnO || 0) + (umf.PbO || 0)
  recipe.R2O_RO_ratio = ro > 0 ? Math.round((r2o / ro) * 100) / 100 : null
  recipe.fluxSum = Math.round((r2o + ro) * 10000) / 10000  // should be ~1.0

  converted++
  results.push(recipe)
}

console.log('')
console.log('=== Conversion Summary ===')
console.log(`  Already UMF (kept):    ${alreadyUmf}`)
console.log(`  Converted wt% → UMF:  ${converted}`)
console.log(`  Dropped (out of bounds): ${dropped - noFlux}`)
console.log(`  Dropped (no flux):       ${noFlux}`)
console.log(`  Total output:          ${results.length}`)
console.log('')

// Validate: check distribution of converted data
const sio2vals = results.map(r => r.umf.SiO2 || 0)
const al2o3vals = results.map(r => r.umf.Al2O3 || 0)
const pct = (arr, p) => { const s = [...arr].sort((a,b) => a-b); return s[Math.floor(s.length * p)] }
console.log('UMF SiO₂ distribution after conversion:')
console.log(`  min=${Math.min(...sio2vals).toFixed(3)}, p5=${pct(sio2vals,0.05).toFixed(3)}, p50=${pct(sio2vals,0.5).toFixed(3)}, p95=${pct(sio2vals,0.95).toFixed(3)}, max=${Math.max(...sio2vals).toFixed(3)}`)
console.log('UMF Al₂O₃ distribution after conversion:')
console.log(`  min=${Math.min(...al2o3vals).toFixed(3)}, p5=${pct(al2o3vals,0.05).toFixed(3)}, p50=${pct(al2o3vals,0.5).toFixed(3)}, p95=${pct(al2o3vals,0.95).toFixed(3)}, max=${Math.max(...al2o3vals).toFixed(3)}`)

// Verify flux sums
const fluxSums = results.map(r => {
  let s = 0
  for (const f of FLUX_OXIDES) if (r.umf[f]) s += r.umf[f]
  return s
})
const nearOne = fluxSums.filter(s => s >= 0.99 && s <= 1.01).length
console.log(`\nFlux sum check: ${nearOne}/${results.length} recipes have flux sum ~1.0 (±0.01)`)

// Write output to both locations
fs.writeFileSync(outputPath, JSON.stringify(results))
console.log(`\nWritten ${results.length} recipes to ${outputPath}`)
console.log(`File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`)

// Also write to src/data/glazes/ for Studio/offline build
fs.writeFileSync(srcDataPath, JSON.stringify(results))
console.log(`Also written to ${srcDataPath}`)
console.log(`File size: ${(fs.statSync(srcDataPath).size / 1024 / 1024).toFixed(2)} MB`)
