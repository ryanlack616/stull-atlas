/**
 * Infra: Glaze Serialization
 *
 * Converts between external formats (JSON / CSV strings)
 * and internal GlazeRecipe objects.
 * No side-effects, no DOM — pure data transforms.
 */

import { GlazeRecipe, Ingredient, Atmosphere, SurfaceType } from '@/types'

// ── JSON ────────────────────────────────────────────────────────

/**
 * Parse a JSON string into GlazeRecipe[].
 * Accepts `{ "glazes": [...] }` or a bare array.
 */
export function deserializeGlazesJSON(json: string): GlazeRecipe[] {
  try {
    const data = JSON.parse(json)
    const glazes = data.glazes || data

    if (!Array.isArray(glazes)) {
      throw new Error('Expected array of glazes')
    }

    return glazes.map((g: any, i: number) => ({
      id: g.id || `imported_${Date.now()}_${i}`,
      name: g.name || `Imported Glaze ${i + 1}`,
      source: g.source || 'user',
      sourceUrl: g.sourceUrl,
      coneRange: g.coneRange || [6, 6],
      atmosphere: g.atmosphere || 'oxidation',
      surfaceType: g.surfaceType || 'unknown',
      ingredients: (g.ingredients || []).map((ing: any) => ({
        material: ing.material || ing.name,
        amount: ing.amount || ing.quantity || 0,
        unit: 'weight' as const,
      })),
      umf: new Map(),
      notes: g.notes,
      umfConfidence: 'unknown' as const,
      verified: false,
    }))
  } catch (e) {
    console.error('Failed to deserialize glazes JSON:', e)
    return []
  }
}

/**
 * Serialize GlazeRecipe[] to a JSON string
 */
export function serializeGlazesJSON(recipes: GlazeRecipe[]): string {
  const exportData = {
    exportedAt: new Date().toISOString(),
    count: recipes.length,
    glazes: recipes.map((r) => ({
      id: r.id,
      name: r.name,
      source: r.source,
      sourceUrl: r.sourceUrl,
      coneRange: r.coneRange,
      atmosphere: r.atmosphere,
      surfaceType: r.surfaceType,
      ingredients: r.ingredients,
      notes: r.notes,
    })),
  }

  return JSON.stringify(exportData, null, 2)
}

// ── CSV ─────────────────────────────────────────────────────────

/**
 * Parse a CSV string into GlazeRecipe[]
 */
export function deserializeGlazesCSV(csv: string): GlazeRecipe[] {
  const lines = csv.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
  const recipes: GlazeRecipe[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim())
    const row: Record<string, string> = {}
    headers.forEach((h, j) => {
      row[h] = values[j] || ''
    })

    const ingredients: Ingredient[] = []
    for (const [key, value] of Object.entries(row)) {
      if (['name', 'cone', 'atmosphere', 'surface', 'notes', 'source'].includes(key)) continue
      const amount = parseFloat(value)
      if (!isNaN(amount) && amount > 0) {
        ingredients.push({ material: key, amount, unit: 'weight' })
      }
    }

    if (ingredients.length > 0) {
      recipes.push({
        id: `csv_${Date.now()}_${i}`,
        name: row.name || `CSV Import ${i}`,
        source: 'user',
        coneRange: [row.cone || '6', row.cone || '6'],
        atmosphere: (row.atmosphere || 'oxidation') as Atmosphere,
        surfaceType: (row.surface || 'unknown') as SurfaceType,
        ingredients,
        umf: new Map(),
        notes: row.notes,
        umfConfidence: 'unknown',
        verified: false,
      })
    }
  }

  return recipes
}
