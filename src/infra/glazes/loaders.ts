/**
 * Infra: Glaze Data Loaders
 *
 * Low-level data access — loads raw glaze data from bundled assets.
 * This layer knows about file formats and JSON shapes;
 * the domain layer consumes the results without caring how they arrived.
 */

import { GlazeRecipe, UMF, Atmosphere, SurfaceType, EpistemicState } from '@/types'
import { classifyGlazeByName } from '@/domain/glaze/glazeTypes'

// ── Raw types for the processed Glazy JSON ──────────────────────

export interface RawGlazyGlaze {
  id: string
  name: string
  source: string
  cone: number | null
  surface: string
  transparency: string | null
  atmosphere?: string
  ingredients: Array<{
    name: string
    percentage: number
    isAddition?: boolean
    isAdditional?: boolean
  }>
  umf: Record<string, number>
  x: number
  y: number
  imageUrl: string | null
  thumbnailUrl?: string | null
  imageUrls?: string[]
}

// ── Loaders ─────────────────────────────────────────────────────

/**
 * Load the small bundled sample-glazes.json (lazy — only loaded when needed)
 */
export async function loadSampleGlazes(): Promise<GlazeRecipe[]> {
  const sampleGlazes = (await import('@/data/glazes/sample-glazes.json')).default as any
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
      umf: null,
      notes: glaze.notes,
      umfConfidence: 'inferred',
      verified: false,
    }
    recipes.push(recipe)
  }

  return recipes
}

/**
 * Fetch with retry and timeout.
 * Exponential back-off: 0 → 1s → 2s (3 attempts total).
 */
async function fetchWithRetry(
  url: string,
  maxAttempts = 3,
  timeoutMs = 15_000,
): Promise<Response> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt - 1)))
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const res = await fetch(url, { signal: controller.signal })
      clearTimeout(timer)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res
    } catch (err: any) {
      clearTimeout(timer)
      lastError = err
      console.warn(`Fetch attempt ${attempt + 1}/${maxAttempts} failed:`, err.message)
    }
  }

  throw lastError ?? new Error('Fetch failed after retries')
}

/**
 * Load the full Glazy dataset via fetch from public directory.
 * Using fetch + JSON.parse is ~2x faster than JS module evaluation
 * for large data files (1.2MB+ JSON parsed natively vs interpreted JS).
 * Returns domain-ready GlazeRecipe objects.
 *
 * Retries up to 3 times with exponential back-off and a 15 s timeout
 * per attempt — resilient to flaky conference WiFi.
 */
export async function loadGlazyDataset(): Promise<GlazeRecipe[]> {
  try {
    const base = import.meta.env.BASE_URL || '/'
    const response = await fetchWithRetry(`${base}glazy-processed.json`)
    const data: RawGlazyGlaze[] = await response.json()

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

      // Collect image URLs
      const images: string[] = []
      if (g.imageUrls && g.imageUrls.length > 0) {
        images.push(...g.imageUrls)
      } else if (g.imageUrl) {
        images.push(g.imageUrl)
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
        umf,
        coneRange: g.cone !== null ? [g.cone, g.cone] : ['?', '?'],
        atmosphere: (g.atmosphere || 'unknown') as Atmosphere,
        surfaceType: g.surface as SurfaceType,
        glazeTypeId: classifyGlazeByName(g.name),
        images: images.length > 0 ? images : undefined,
        notes: g.transparency || undefined,
        umfConfidence: 'inferred' as EpistemicState,
        verified: false,
        _plotX: g.x,
        _plotY: g.y,
        _imageUrl: g.thumbnailUrl || g.imageUrl,
      } as GlazeRecipe & { _plotX: number; _plotY: number; _imageUrl: string | null }
    })
  } catch (e) {
    console.error('Failed to load Glazy dataset:', e)
    throw e  // let callers handle retry / error UI
  }
}
