/**
 * Infra: Glaze Data Loaders
 *
 * Low-level data access — loads raw glaze data from bundled assets.
 * This layer knows about file formats and JSON shapes;
 * the domain layer consumes the results without caring how they arrived.
 */

import { GlazeRecipe, UMF, Atmosphere, SurfaceType, EpistemicState } from '@/types'
import sampleGlazes from '@/data/glazes/sample-glazes.json'

// ── Raw types for the processed Glazy JSON ──────────────────────

export interface RawGlazyGlaze {
  id: string
  name: string
  source: string
  cone: number | null
  surface: string
  transparency: string | null
  ingredients: Array<{
    name: string
    percentage: number
    isAddition: boolean
  }>
  umf: Record<string, number>
  x: number
  y: number
  imageUrl: string | null
}

// ── Loaders ─────────────────────────────────────────────────────

/**
 * Load the small bundled sample-glazes.json (synchronous — it's tree-shaken in)
 */
export function loadSampleGlazes(): GlazeRecipe[] {
  const data = sampleGlazes as any
  const recipes: GlazeRecipe[] = []

  for (const glaze of data.glazes) {
    const recipe: GlazeRecipe = {
      id: glaze.id,
      name: glaze.name,
      source: glaze.source as any,
      coneRange: glaze.coneRange,
      atmosphere: (glaze.atmosphere || 'unknown') as Atmosphere,
      surfaceType: (glaze.surfaceType || 'unknown') as SurfaceType,
      ingredients: glaze.ingredients.map((ing: any) => ({
        material: ing.material,
        amount: ing.amount,
        unit: 'weight' as const,
      })),
      umf: new Map(),
      notes: glaze.notes,
      umfConfidence: 'inferred',
      verified: false,
    }
    recipes.push(recipe)
  }

  return recipes
}

/**
 * Load the full Glazy dataset via dynamic import (code-split).
 * Returns domain-ready GlazeRecipe objects.
 */
export async function loadGlazyDataset(): Promise<GlazeRecipe[]> {
  try {
    const response = await import('@/data/glazes/glazy-processed.json')
    const data = response.default as RawGlazyGlaze[]

    return data.map((g): GlazeRecipe => {
      const umf: UMF = {}
      for (const [oxide, value] of Object.entries(g.umf)) {
        if (typeof value === 'number' && value > 0) {
          ;(umf as any)[oxide] = {
            value,
            precision: 4,
            state: 'inferred' as EpistemicState,
            source: 'glazy_import',
          }
        }
      }

      return {
        id: g.id,
        name: g.name,
        source: 'glazy',
        sourceUrl: `https://glazy.org/recipes/${g.id.replace('glazy_', '')}`,
        ingredients: g.ingredients.map((ing) => ({
          material: ing.name,
          amount: ing.percentage,
          unit: 'weight' as const,
        })),
        umf: new Map([['glazy_default', umf]]),
        coneRange: g.cone !== null ? [g.cone, g.cone] : ['?', '?'],
        atmosphere: 'unknown' as Atmosphere,
        surfaceType: g.surface as SurfaceType,
        notes: g.transparency || undefined,
        umfConfidence: 'inferred' as EpistemicState,
        verified: false,
        _plotX: g.x,
        _plotY: g.y,
        _imageUrl: g.imageUrl,
      } as GlazeRecipe & { _plotX: number; _plotY: number; _imageUrl: string | null }
    })
  } catch (e) {
    console.error('Failed to load Glazy dataset:', e)
    return []
  }
}
