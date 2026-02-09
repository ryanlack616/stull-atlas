/**
 * Infra: Glazy CSV Import
 *
 * Parses the raw Glazy glaze CSV export format
 * (glazy-data-glazes-20211130.csv) directly.
 *
 * Fields include: id, name, from_orton_cone, to_orton_cone,
 * surface_type, SiO2_umf, Al2O3_umf, etc.
 * This differs from the generic CSV parser in serialization.ts
 * which treats unknown columns as materials.
 */

import { GlazeRecipe, UMF, Atmosphere, SurfaceType, EpistemicState } from '@/types'
import { classifyGlazeByName } from '@/domain/glaze'

const GLAZY_UMF_FIELDS = [
  'SiO2', 'Al2O3', 'B2O3', 'Li2O', 'Na2O', 'K2O',
  'CaO', 'MgO', 'BaO', 'SrO', 'ZnO', 'MnO',
  'Fe2O3', 'TiO2', 'ZrO2', 'P2O5', 'V2O5', 'Cr2O3',
  'NiO', 'CuO', 'CoO', 'SnO2',
] as const

const SURFACE_MAP: Record<number, SurfaceType> = {
  1: 'gloss',
  2: 'satin',
  3: 'matte',
  4: 'unknown',  // dry
  5: 'crystalline',
  6: 'crawl',
}

/**
 * Parse the lines of a split CSV, handling quoted fields.
 */
function parseCSVRow(line: string): string[] {
  const fields: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim())
      current = ''
    } else {
      current += ch
    }
  }
  fields.push(current.trim())
  return fields
}

/**
 * Detect if a CSV is in Glazy's native format by checking header columns.
 */
export function isGlazyCSV(headerLine: string): boolean {
  const lower = headerLine.toLowerCase()
  return (
    lower.includes('sio2_umf') ||
    lower.includes('from_orton_cone') ||
    lower.includes('material_type_concatenated')
  )
}

/**
 * Parse a raw Glazy CSV string into GlazeRecipe[].
 * Expects the standard glazy-data-glazes-*.csv column layout.
 */
export function deserializeGlazyCSV(csv: string): GlazeRecipe[] {
  const lines = csv.split('\n').filter((l) => l.trim().length > 0)
  if (lines.length < 2) return []

  const headers = parseCSVRow(lines[0])
  const colIndex: Record<string, number> = {}
  headers.forEach((h, i) => {
    colIndex[h.trim().toLowerCase()] = i
  })

  // Build lookup helpers
  const col = (row: string[], name: string): string => {
    const idx = colIndex[name.toLowerCase()]
    return idx !== undefined ? (row[idx] ?? '') : ''
  }

  const recipes: GlazeRecipe[] = []

  for (let i = 1; i < lines.length; i++) {
    try {
      const row = parseCSVRow(lines[i])
      if (row.length < 5) continue

      const id = col(row, 'id') || `glazy_csv_${i}`
      const name = col(row, 'name') || `Glazy #${id}`

      // UMF
      const umf: UMF = {}
      let hasUMF = false
      for (const oxide of GLAZY_UMF_FIELDS) {
        const val = parseFloat(col(row, `${oxide}_umf`))
        if (!isNaN(val) && val > 0) {
          ;(umf as any)[oxide] = {
            value: val,
            precision: 4,
            state: 'inferred' as EpistemicState,
            source: 'glazy_csv',
          }
          hasUMF = true
        }
      }
      if (!hasUMF) continue // skip rows without UMF data

      // Compute ratios
      const siVal = (umf as any).SiO2?.value ?? 0
      const alVal = (umf as any).Al2O3?.value ?? 0
      const r2oTotal = ['Li2O', 'Na2O', 'K2O'].reduce(
        (s, ox) => s + ((umf as any)[ox]?.value ?? 0), 0
      )
      const roTotal = ['CaO', 'MgO', 'BaO', 'SrO', 'ZnO', 'MnO'].reduce(
        (s, ox) => s + ((umf as any)[ox]?.value ?? 0), 0
      )
      ;(umf as any)._meta = {
        SiO2_Al2O3_ratio: alVal > 0.001 ? siVal / alVal : 0,
        R2O_RO_ratio: roTotal > 0.001 ? r2oTotal / roTotal : 0,
        fluxTotal: r2oTotal + roTotal,
      }

      // Cone
      const fromCone = col(row, 'from_orton_cone')
      const toCone = col(row, 'to_orton_cone')
      const coneRange: [number | string, number | string] = [
        fromCone || '?',
        toCone || fromCone || '?',
      ]

      // Surface
      const surfaceNum = parseInt(col(row, 'surface_type'), 10)
      const surfaceType: SurfaceType = SURFACE_MAP[surfaceNum] || 'unknown'

      recipes.push({
        id: `glazy_${id}`,
        name,
        source: 'glazy',
        sourceUrl: `https://glazy.org/recipes/${id}`,
        ingredients: [], // Glazy CSV doesn't include ingredient lists
        umf,
        coneRange,
        atmosphere: 'unknown' as Atmosphere,
        surfaceType,
        glazeTypeId: classifyGlazeByName(name),
        umfConfidence: 'inferred' as EpistemicState,
        verified: false,
      })
    } catch {
      // Skip malformed rows
    }
  }

  return recipes
}
