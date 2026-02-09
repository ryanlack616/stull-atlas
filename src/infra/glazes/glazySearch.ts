/**
 * Infra: Glazy Search URL Parser & Filter
 *
 * Parses Glazy search URLs (e.g. glazy.org/search?base_type=460&type=590&cone=10)
 * and filters our loaded dataset to match those criteria.
 *
 * This lets users "import a whole Glazy chart" by pasting the URL of
 * whatever they were viewing on Glazy, and we'll show them the matching
 * subset from our ~8,900 pre-loaded Glazy glazes.
 */

import { GlazeRecipe, Atmosphere, SurfaceType, Transparency } from '@/types'

// ── Glazy URL query params → typed filter ────────────────────

export interface GlazySearchParams {
  baseType?: number            // base_type or base_type_id (460 = Glaze, 110 = Clay, etc.)
  type?: number                // type or type_id (470 = Clear, 590 = Shino, etc.)
  subtype?: number             // subtype (rarely used)
  cone?: string                // single cone like "6" or range "5,10"
  coneFrom?: number | string
  coneTo?: number | string
  atmosphere?: number          // 1 = oxidation, 2 = reduction, 3 = neutral
  surfaceType?: number         // 1 = gloss, 2 = satin, 3 = matte, etc.
  transparency?: number        // 1 = transparent, 2 = translucent, 3 = opaque
  keywords?: string            // free-text search
  photo?: boolean              // only with photos
}

const ATMOSPHERE_MAP: Record<number, Atmosphere> = {
  1: 'oxidation',
  2: 'reduction',
  3: 'neutral',
}

const SURFACE_MAP: Record<number, SurfaceType> = {
  1: 'gloss',
  2: 'satin',
  3: 'matte',
  4: 'unknown',
  5: 'crystalline',
  6: 'crawl',
}

const TRANSPARENCY_MAP: Record<number, Transparency> = {
  1: 'transparent',
  2: 'translucent',
  3: 'opaque',
}

/**
 * Parse a Glazy search URL into structured filter params.
 *
 * Handles URLs like:
 *   https://glazy.org/search?base_type=460&type=590&cone=10&atmosphere=2
 *   https://glazy.org/search?base_type=460&photo=true&state=1,2
 */
export function parseGlazySearchURL(input: string): GlazySearchParams | null {
  try {
    // Normalize — handle partial URLs, URL-encoded chars, etc.
    let url: URL
    if (input.startsWith('http://') || input.startsWith('https://')) {
      url = new URL(input)
    } else if (input.includes('glazy.org')) {
      url = new URL('https://' + input)
    } else {
      // Not a Glazy URL — could be just query params
      url = new URL('https://glazy.org/search?' + input)
    }

    if (!url.hostname.includes('glazy.org')) return null

    const p = url.searchParams

    const params: GlazySearchParams = {}

    // base_type / base_type_id
    const bt = p.get('base_type') || p.get('base_type_id')
    if (bt) params.baseType = parseInt(bt, 10)

    // type / type_id
    const t = p.get('type') || p.get('type_id')
    if (t) params.type = parseInt(t, 10)

    // subtype
    const st = p.get('subtype') || p.get('subtype_id')
    if (st) params.subtype = parseInt(st, 10)

    // cone — can be "6", "5,10", or separate from/to
    const cone = p.get('cone')
    if (cone) params.cone = cone

    const coneFrom = p.get('cone_from') || p.get('from_orton_cone')
    if (coneFrom) params.coneFrom = coneFrom

    const coneTo = p.get('cone_to') || p.get('to_orton_cone')
    if (coneTo) params.coneTo = coneTo

    // atmosphere
    const atm = p.get('atmosphere')
    if (atm) params.atmosphere = parseInt(atm, 10)

    // surface
    const surf = p.get('surface') || p.get('surface_type')
    if (surf) params.surfaceType = parseInt(surf, 10)

    // transparency
    const trans = p.get('transparency') || p.get('transparency_type')
    if (trans) params.transparency = parseInt(trans, 10)

    // keywords
    const kw = p.get('search_words') || p.get('keywords') || p.get('q')
    if (kw) params.keywords = kw

    // photo
    const photo = p.get('photo')
    if (photo === 'true' || photo === '1') params.photo = true

    return params
  } catch {
    return null
  }
}

/**
 * Check if a string looks like a Glazy search URL.
 */
export function isGlazySearchURL(input: string): boolean {
  const lower = input.toLowerCase().trim()
  return lower.includes('glazy.org/search') || lower.includes('glazy.org/?')
}

/**
 * Generate a display-friendly description of the search params.
 */
export function describeGlazySearch(params: GlazySearchParams): string {
  const parts: string[] = []

  if (params.baseType) {
    const names: Record<number, string> = {
      110: 'Clay Bodies', 400: 'Slips', 440: 'Overglazes',
      450: 'Underglazes', 460: 'Glazes', 1180: 'Refractory',
    }
    parts.push(names[params.baseType] || `Base type ${params.baseType}`)
  }

  if (params.type) {
    // Common Glazy type names
    const typeNames: Record<number, string> = {
      470: 'Clear', 480: 'White', 490: 'Iron/White',
      500: 'Celadon', 510: 'Blue-Green', 520: 'Chun/Jun',
      530: 'Tenmoku', 540: 'Tenmoku', 550: 'Saturated Iron',
      560: 'Kaki/Tomato Red', 570: 'Amber/Honey',
      580: 'Tea Dust', 590: 'Shino', 620: 'Red/Copper',
      635: 'Red', 680: 'Green', 750: 'Blue',
      820: 'Purple', 860: 'Matte', 880: 'Black',
      900: 'Yellow', 920: 'Yellow', 980: 'Crystalline',
      1030: 'Single-Fire', 1040: 'Wood', 1050: 'Salt/Soda',
      1060: 'Ash', 1080: 'Slip', 1100: 'Majolica',
      1130: 'Specialty', 1170: 'Metallic',
    }
    parts.push(typeNames[params.type] || `Type ${params.type}`)
  }

  if (params.cone) {
    const cones = params.cone.split(',')
    if (cones.length === 1) parts.push(`Cone ${cones[0]}`)
    else parts.push(`Cone ${cones[0]}–${cones[cones.length - 1]}`)
  }

  if (params.atmosphere) {
    const a = ATMOSPHERE_MAP[params.atmosphere]
    if (a) parts.push(a.charAt(0).toUpperCase() + a.slice(1))
  }

  if (params.surfaceType) {
    const s = SURFACE_MAP[params.surfaceType]
    if (s && s !== 'unknown') parts.push(s.charAt(0).toUpperCase() + s.slice(1))
  }

  if (params.transparency) {
    const t = TRANSPARENCY_MAP[params.transparency]
    if (t) parts.push(t.charAt(0).toUpperCase() + t.slice(1))
  }

  if (params.keywords) parts.push(`"${params.keywords}"`)

  return parts.length > 0 ? parts.join(' · ') : 'All glazes'
}

// ── Cone parsing helpers ─────────────────────────────────────

/**
 * Glazy cone ranges: parse cone param "6" or "5,10" or "06"
 * into a numeric range for comparison.
 */
function parseConeNumeric(raw: number | string): number {
  const s = String(raw).trim()
  // Handle Orton cone notation: "06" = -6, "010" = -10
  if (/^0\d+$/.test(s)) return -parseInt(s.slice(1), 10)
  const n = parseFloat(s)
  return isNaN(n) ? 0 : n
}

function recipeConeRange(r: GlazeRecipe): [number, number] {
  const lo = parseConeNumeric(r.coneRange[0])
  const hi = parseConeNumeric(r.coneRange[1])
  return [Math.min(lo, hi), Math.max(lo, hi)]
}

// ── Main filter function ─────────────────────────────────────

/**
 * Filter an array of GlazeRecipe by Glazy search params.
 * Returns only the recipes that match ALL specified criteria.
 */
export function filterByGlazyParams(
  glazes: GlazeRecipe[],
  params: GlazySearchParams,
): GlazeRecipe[] {
  return glazes.filter(g => {
    // base_type filter
    if (params.baseType != null) {
      const gbt = g.baseTypeId ?? 460 // default to glaze
      if (gbt !== params.baseType) return false
    }

    // type filter — match either glazeTypeId or subtypeId
    if (params.type != null) {
      const gType = g.glazeTypeId
      if (gType == null || gType !== params.type) {
        // Also check if it's a parent type — a recipe with subtypeId 510
        // (Blue-Green: Celadon) should match a search for type 500 (Celadon parent)
        // In Glazy taxonomy, child type_ids are close to parents
        if (g.subtypeId != null && g.subtypeId !== params.type) {
          // Check if the recipe's type matches as a parent
          if (g.glazeTypeId !== params.type) return false
        } else if (g.subtypeId == null) {
          return false
        }
      }
    }

    // subtype filter (rare, exact match)
    if (params.subtype != null) {
      if (g.subtypeId !== params.subtype) return false
    }

    // cone filter — recipe's range must overlap search range
    if (params.cone != null) {
      const cones = params.cone.split(',').map(parseConeNumeric)
      const searchLo = Math.min(...cones)
      const searchHi = Math.max(...cones)
      const [rLo, rHi] = recipeConeRange(g)
      // Ranges overlap?
      if (rHi < searchLo || rLo > searchHi) return false
    }

    if (params.coneFrom != null || params.coneTo != null) {
      const searchLo = params.coneFrom != null ? parseConeNumeric(params.coneFrom) : -Infinity
      const searchHi = params.coneTo != null ? parseConeNumeric(params.coneTo) : Infinity
      const [rLo, rHi] = recipeConeRange(g)
      if (rHi < searchLo || rLo > searchHi) return false
    }

    // atmosphere filter
    if (params.atmosphere != null) {
      const target = ATMOSPHERE_MAP[params.atmosphere]
      if (target && g.atmosphere !== target && g.atmosphere !== 'unknown') return false
    }

    // surface type filter
    if (params.surfaceType != null) {
      const target = SURFACE_MAP[params.surfaceType]
      if (target && target !== 'unknown' && g.surfaceType !== target) return false
    }

    // transparency filter
    if (params.transparency != null) {
      const target = TRANSPARENCY_MAP[params.transparency]
      if (target && g.transparency && g.transparency !== target && g.transparency !== 'unknown') return false
    }

    // keyword filter — simple substring match on name + notes + description
    if (params.keywords) {
      const lower = params.keywords.toLowerCase()
      const text = [g.name, g.notes, g.description].filter(Boolean).join(' ').toLowerCase()
      if (!text.includes(lower)) return false
    }

    // photo filter — we check if images exist
    if (params.photo) {
      if (!g.images || g.images.length === 0) return false
    }

    return true
  })
}
