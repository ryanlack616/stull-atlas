/**
 * Infra: Glaze Data Loaders
 *
 * Low-level data access — loads raw glaze data from bundled assets.
 * This layer knows about file formats and JSON shapes;
 * the domain layer consumes the results without caring how they arrived.
 */

import { GlazeRecipe, UMF, Atmosphere, SurfaceType, Transparency, EpistemicState, BASE_TYPE_IDS } from '@/types'
import { classifyGlazeByName } from '@/domain/glaze'

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
    id?: number
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
  // Glazy taxonomy fields (may be present in richer exports)
  base_type_id?: number
  type_id?: number
  subtype_id?: number
  country?: string
  status?: string
  description?: string
  specific_gravity?: number
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
    let data: RawGlazyGlaze[]

    if (import.meta.env.VITE_OFFLINE_DATA === 'true') {
      // Studio: bundled JSON — no network needed
      // Dynamic path prevents Rollup from emitting a phantom chunk in web builds
      const p = '@/data/glazes/' + 'glazy-processed.json'
      const mod = await import(/* @vite-ignore */ p)
      data = (mod.default ?? mod) as RawGlazyGlaze[]
    } else {
      // Web: fetch from public directory
      const base = import.meta.env.BASE_URL || '/'
      const response = await fetchWithRetry(`${base}glazy-processed.json`)
      data = await response.json()
    }

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

      // Use Glazy's type_id if present, otherwise fall back to name-based classification
      const glazeTypeId = g.type_id ?? g.subtype_id ?? classifyGlazeByName(g.name)

      // Map transparency string
      const transparency: Transparency | undefined =
        g.transparency === 'opaque' || g.transparency === 'translucent' || g.transparency === 'transparent'
          ? g.transparency
          : g.transparency ? 'unknown' : undefined

      return {
        id: g.id,
        name: g.name,
        source: 'glazy',
        sourceUrl: `https://glazy.org/recipes/${g.id.replace('glazy_', '')}`,
        ingredients: g.ingredients.map((ing) => ({
          material: ing.name,
          glazyMaterialId: ing.id,
          amount: ing.percentage,
          unit: 'weight' as const,
          isAdditional: ing.isAdditional ?? ing.isAddition ?? false,
        })),
        umf,
        coneRange: g.cone !== null ? [g.cone, g.cone] : ['?', '?'],
        atmosphere: (g.atmosphere || 'unknown') as Atmosphere,
        surfaceType: g.surface as SurfaceType,
        transparency,
        baseType: g.base_type_id ? (BASE_TYPE_IDS[g.base_type_id] ?? 'glaze') : 'glaze',
        baseTypeId: g.base_type_id ?? 460,
        glazeTypeId,
        subtypeId: g.subtype_id ?? null,
        country: g.country,
        description: g.description,
        status: g.status === 'Production' ? 'production'
              : g.status === 'Testing' ? 'testing'
              : g.status === 'Discontinued' ? 'discontinued'
              : g.status === 'Draft' ? 'draft'
              : undefined,
        specificGravity: g.specific_gravity,
        images: images.length > 0 ? images : undefined,
        notes: !transparency && g.transparency ? g.transparency : undefined,
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
