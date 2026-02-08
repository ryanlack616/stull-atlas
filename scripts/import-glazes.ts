/**
 * Import Glaze Recipes from scraped JSON
 * 
 * Converts the scraped glaze data to Stull Atlas format.
 * The percent_analysis values appear to be UMF (molar ratios normalized to fluxes=1)
 * 
 * Usage: npx ts-node scripts/import-glazes.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Types for the scraped data
interface ScrapedIngredient {
  name: string
  percentage: number
  isAdditional: boolean
}

interface ScrapedGlaze {
  id: number
  name: string
  description: string | null
  subtype: string | null
  cone: string | null
  surface: string | null
  transparency: string | null
  atmospheres: string | null
  created_by_name: string | null
  ingredients: ScrapedIngredient[]
  percent_analysis: Record<string, number>
  scraped_at: string
  data_source: string
  image_url: string | null
  thumbnail_url: string | null
  images_count: number | null
  image_urls: string[] | null
}

// Output types (simplified for data file)
interface ProcessedGlaze {
  id: string
  name: string
  source: string
  
  // Firing info
  cone: number | null
  coneRaw: string | null
  surface: string
  transparency: string | null
  atmosphere: string
  
  // Ingredients (for display/export)
  ingredients: {
    name: string
    percentage: number
    isAddition: boolean
  }[]
  
  // UMF values (already normalized in source)
  umf: {
    // Fluxes - R2O
    Li2O?: number
    Na2O?: number
    K2O?: number
    // Fluxes - RO
    MgO?: number
    CaO?: number
    SrO?: number
    BaO?: number
    ZnO?: number
    PbO?: number
    // Stabilizers
    Al2O3?: number
    B2O3?: number
    Fe2O3?: number
    // Glass formers
    SiO2?: number
    TiO2?: number
    ZrO2?: number
    SnO2?: number
    // Other
    P2O5?: number
    MnO?: number
    CuO?: number
    CoO?: number
    Cr2O3?: number
  }
  
  // Derived values
  SiO2_Al2O3_ratio: number
  R2O_RO_ratio: number
  fluxSum: number
  
  // For plotting
  x: number  // SiO2
  y: number  // Al2O3
  
  // Images
  imageUrl: string | null
  thumbnailUrl: string | null
  
  // Metadata
  scrapedAt: string
}

// Oxide classifications
const R2O_OXIDES = ['Li2O', 'Na2O', 'K2O']
const RO_OXIDES = ['MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO']
const FLUX_OXIDES = [...R2O_OXIDES, ...RO_OXIDES]

// Molecular weights for converting weight % to moles
const MOLECULAR_WEIGHTS: Record<string, number> = {
  Li2O: 29.88,
  Na2O: 61.98,
  K2O: 94.20,
  MgO: 40.30,
  CaO: 56.08,
  SrO: 103.62,
  BaO: 153.33,
  ZnO: 81.38,
  PbO: 223.20,
  Al2O3: 101.96,
  B2O3: 69.62,
  Fe2O3: 159.69,
  SiO2: 60.08,
  TiO2: 79.87,
  ZrO2: 123.22,
  SnO2: 150.71,
  MnO: 70.94,
  P2O5: 141.94,
}

/**
 * Detect data format and return format type
 * Returns: 'umf' | 'weight_percent' | 'unknown'
 */
function detectDataFormat(analysis: Record<string, number>): 'umf' | 'weight_percent' | 'unknown' {
  const SiO2 = analysis.SiO2 || 0
  const Al2O3 = analysis.Al2O3 || 0
  const fluxSum = FLUX_OXIDES.reduce((sum, o) => sum + (analysis[o] || 0), 0)
  
  // UMF: SiO2 typically 1.5-6, Al2O3 0.1-0.8, fluxes sum to ~1
  if (SiO2 >= 1 && SiO2 <= 8 && Al2O3 >= 0.05 && Al2O3 <= 1.2 && fluxSum >= 0.8 && fluxSum <= 1.5) {
    return 'umf'
  }
  
  // Weight percent: values sum closer to 100, SiO2 often >10
  const total = Object.values(analysis).reduce((sum, v) => sum + (v || 0), 0)
  if (total > 20 && SiO2 > 10) {
    return 'weight_percent'
  }
  
  // Some glazes only have partial UMF data (no SiO2 but valid flux sum)
  if (fluxSum >= 0.8 && fluxSum <= 1.5 && Al2O3 >= 0.05 && Al2O3 <= 1.2) {
    return 'umf'
  }
  
  return 'unknown'
}

/**
 * Convert weight percentages to UMF
 */
function weightPercentToUMF(analysis: Record<string, number>): Record<string, number> {
  const moles: Record<string, number> = {}
  
  // Convert each oxide from weight % to moles
  for (const [oxide, weightPct] of Object.entries(analysis)) {
    const mw = MOLECULAR_WEIGHTS[oxide]
    if (mw && weightPct > 0) {
      moles[oxide] = weightPct / mw
    }
  }
  
  // Calculate flux sum
  const fluxMoles = FLUX_OXIDES.reduce((sum, o) => sum + (moles[o] || 0), 0)
  
  if (fluxMoles < 0.0001) {
    return analysis // Can't normalize without fluxes
  }
  
  // Normalize to unity
  const umf: Record<string, number> = {}
  for (const [oxide, mol] of Object.entries(moles)) {
    umf[oxide] = Math.round((mol / fluxMoles) * 10000) / 10000
  }
  
  return umf
}

/**
 * Parse cone string to number
 * Handles: "6", "06", "10", "7-8", "8-10", null
 */
function parseCone(coneStr: string | null): number | null {
  if (!coneStr) return null
  
  // Handle ranges like "7-8" - take the middle or first
  if (coneStr.includes('-')) {
    const parts = coneStr.split('-')
    const first = parseCone(parts[0])
    const second = parseCone(parts[1])
    if (first !== null && second !== null) {
      return (first + second) / 2
    }
    return first
  }
  
  // Remove any spaces
  const cleaned = coneStr.trim()
  
  // Handle "06", "04" etc (negative cones)
  if (cleaned.startsWith('0') && cleaned.length > 1) {
    return -parseInt(cleaned, 10)
  }
  
  const parsed = parseInt(cleaned, 10)
  return isNaN(parsed) ? null : parsed
}

/**
 * Normalize surface type to our enum
 */
function normalizeSurface(surface: string | null): string {
  if (!surface) return 'unknown'
  const lower = surface.toLowerCase()
  if (lower.includes('gloss')) return 'gloss'
  if (lower.includes('satin')) return 'satin'
  if (lower.includes('matte') || lower.includes('matt')) return 'matte'
  if (lower.includes('semi-matte')) return 'satin'
  if (lower.includes('crystalline')) return 'crystalline'
  return 'unknown'
}

/**
 * Process a single glaze
 */
function processGlaze(glaze: ScrapedGlaze): ProcessedGlaze | null {
  const rawAnalysis = glaze.percent_analysis
  
  // Skip if no analysis
  if (!rawAnalysis || Object.keys(rawAnalysis).length === 0) {
    return null
  }
  
  // Detect format and convert if needed
  const format = detectDataFormat(rawAnalysis)
  let analysis: Record<string, number>
  
  if (format === 'weight_percent') {
    analysis = weightPercentToUMF(rawAnalysis)
  } else if (format === 'umf') {
    analysis = rawAnalysis
  } else {
    // Unknown format - skip
    return null
  }
  
  // Extract UMF values
  const umf: ProcessedGlaze['umf'] = {}
  
  for (const [oxide, value] of Object.entries(analysis)) {
    if (typeof value === 'number' && value > 0) {
      (umf as any)[oxide] = Math.round(value * 10000) / 10000
    }
  }
  
  // Calculate flux sums
  const R2O = R2O_OXIDES.reduce((sum, o) => sum + (analysis[o] || 0), 0)
  const RO = RO_OXIDES.reduce((sum, o) => sum + (analysis[o] || 0), 0)
  const fluxSum = R2O + RO
  
  // Get key values
  const SiO2 = analysis.SiO2 || 0
  const Al2O3 = analysis.Al2O3 || 0
  
  // Skip glazes with unreasonable UMF values
  // Typical glazes: SiO2 1.5-6, Al2O3 0.1-0.8, fluxSum ~1.0
  if (SiO2 < 0.5 || SiO2 > 12) return null  // Too low means broken data
  if (Al2O3 > 2) return null                 // Way too high
  if (fluxSum < 0.3 || fluxSum > 2) return null  // Flux should be ~1.0
  
  return {
    id: `glazy_${glaze.id}`,
    name: glaze.name || `Glaze ${glaze.id}`,
    source: 'glazy',
    
    cone: parseCone(glaze.cone),
    coneRaw: glaze.cone,
    surface: normalizeSurface(glaze.surface),
    transparency: glaze.transparency,
    atmosphere: 'unknown',
    
    ingredients: glaze.ingredients.map(ing => ({
      name: ing.name,
      percentage: ing.percentage,
      isAddition: ing.isAdditional
    })),
    
    umf,
    
    // Derived values
    SiO2_Al2O3_ratio: Al2O3 > 0.001 ? Math.round((SiO2 / Al2O3) * 100) / 100 : 0,
    R2O_RO_ratio: RO > 0.001 ? Math.round((R2O / RO) * 100) / 100 : 0,
    fluxSum: Math.round(fluxSum * 1000) / 1000,
    
    // For plotting - use SiO2 and Al2O3 directly
    x: Math.round(SiO2 * 10000) / 10000,
    y: Math.round(Al2O3 * 10000) / 10000,
    
    imageUrl: glaze.image_url,
    thumbnailUrl: glaze.thumbnail_url,
    scrapedAt: glaze.scraped_at
  }
}

/**
 * Generate statistics about the dataset
 */
function generateStats(glazes: ProcessedGlaze[]) {
  const coneDistribution: Record<string, number> = {}
  const surfaceDistribution: Record<string, number> = {}
  
  let minSiO2 = Infinity, maxSiO2 = 0
  let minAl2O3 = Infinity, maxAl2O3 = 0
  let withImages = 0
  let withCone = 0
  
  for (const g of glazes) {
    // Cone distribution
    if (g.cone !== null) {
      const coneKey = g.cone.toString()
      coneDistribution[coneKey] = (coneDistribution[coneKey] || 0) + 1
      withCone++
    }
    
    // Surface distribution
    surfaceDistribution[g.surface] = (surfaceDistribution[g.surface] || 0) + 1
    
    // Bounds
    if (g.x > 0) {
      minSiO2 = Math.min(minSiO2, g.x)
      maxSiO2 = Math.max(maxSiO2, g.x)
    }
    if (g.y > 0) {
      minAl2O3 = Math.min(minAl2O3, g.y)
      maxAl2O3 = Math.max(maxAl2O3, g.y)
    }
    
    if (g.imageUrl) withImages++
  }
  
  return {
    total: glazes.length,
    withCone,
    withImages,
    bounds: {
      SiO2: { min: minSiO2, max: maxSiO2 },
      Al2O3: { min: minAl2O3, max: maxAl2O3 }
    },
    coneDistribution,
    surfaceDistribution
  }
}

// Main execution
async function main() {
  const inputPath = path.resolve('C:/Users/PC/Downloads/glaze_recipes.json')
  const outputPath = path.resolve(__dirname, '../src/data/glazes/glazy-processed.json')
  const statsPath = path.resolve(__dirname, '../src/data/glazes/glazy-stats.json')
  
  console.log('Reading input file...')
  const raw = fs.readFileSync(inputPath, 'utf-8')
  const scraped: ScrapedGlaze[] = JSON.parse(raw)
  
  console.log(`Found ${scraped.length} raw glazes`)
  
  console.log('Processing glazes...')
  const processed: ProcessedGlaze[] = []
  let skipped = 0
  
  for (const glaze of scraped) {
    try {
      const result = processGlaze(glaze)
      if (result) {
        processed.push(result)
      } else {
        skipped++
      }
    } catch (err) {
      console.error(`Error processing glaze ${glaze.id}:`, err)
      skipped++
    }
  }
  
  console.log(`Processed ${processed.length} glazes, skipped ${skipped}`)
  
  // Generate stats
  const stats = generateStats(processed)
  console.log('\nDataset Statistics:')
  console.log(`  Total glazes: ${stats.total}`)
  console.log(`  With cone info: ${stats.withCone}`)
  console.log(`  With images: ${stats.withImages}`)
  console.log(`  SiO2 range: ${stats.bounds.SiO2.min.toFixed(2)} - ${stats.bounds.SiO2.max.toFixed(2)}`)
  console.log(`  Al2O3 range: ${stats.bounds.Al2O3.min.toFixed(2)} - ${stats.bounds.Al2O3.max.toFixed(2)}`)
  console.log('\nSurface distribution:')
  for (const [surface, count] of Object.entries(stats.surfaceDistribution)) {
    console.log(`  ${surface}: ${count}`)
  }
  
  // Write output
  console.log('\nWriting output files...')
  
  fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2))
  console.log(`  ${outputPath}`)
  
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2))
  console.log(`  ${statsPath}`)
  
  console.log('\nDone!')
}

main().catch(console.error)
