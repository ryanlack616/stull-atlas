/**
 * Natural Language Query Parser
 *
 * Parses free-text glaze requests into structured parameters.
 * No external AI needed — uses keyword extraction and pattern matching
 * against ceramic vocabulary.
 *
 * Examples:
 *   "celadon at cone 10"              → { type: 'celadon', cone: 10 }
 *   "matte white cone 6 oxidation"    → { type: 'matte', color: 'white', cone: 6, atmosphere: 'oxidation' }
 *   "food safe clear for dinnerware"  → { type: 'clear', tags: ['food safe', 'dinnerware'] }
 *   "I want something like copper red" → { type: 'copper red' }
 */

import type { Atmosphere, SurfaceType } from '@/types'

// ─── Parsed Query ──────────────────────────────────────────────

export interface ParsedGlazeQuery {
  /** Raw user input */
  raw: string
  /** Extracted glaze type / style keywords */
  glazeTerms: string[]
  /** Cone number if found */
  cone: number | null
  /** Atmosphere if specified */
  atmosphere: Atmosphere | null
  /** Surface type if specified */
  surface: SurfaceType | null
  /** Color keywords */
  colors: string[]
  /** Additional tags extracted */
  tags: string[]
  /** Parser confidence 0-1 */
  confidence: number
}

// ─── Vocabulary ────────────────────────────────────────────────

const CONE_PATTERNS = [
  /cone\s*(\d+)/i,
  /c\/?\s*(\d+)/i,
  /\^(\d+)/,
  /(\d+)\s*cone/i,
  /at\s+(\d+)/i,
  /cone\s*0+(\d+)/i, // cone 06 → -6 handled specially
]

const NEGATIVE_CONE_PATTERNS = [
  /cone\s*0(\d+)/i,   // "cone 06" → -6
  /low\s*fire/i,       // → -6 default
  /earthenware/i,      // → -4 default
]

const ATMOSPHERE_KEYWORDS: Record<string, Atmosphere> = {
  'reduction': 'reduction',
  'reducing': 'reduction',
  'reduced': 'reduction',
  'redux': 'reduction',
  'oxidation': 'oxidation',
  'oxidizing': 'oxidation',
  'electric': 'oxidation',
  'electric kiln': 'oxidation',
  'neutral': 'neutral',
}

const SURFACE_KEYWORDS: Record<string, SurfaceType> = {
  'gloss': 'gloss',
  'glossy': 'gloss',
  'shiny': 'gloss',
  'brilliant': 'gloss',
  'satin': 'satin',
  'semi-matte': 'satin',
  'semi matte': 'satin',
  'eggshell': 'satin',
  'silky': 'satin',
  'matte': 'matte',
  'matt': 'matte',
  'mat': 'matte',
  'dry': 'matte',
  'flat': 'matte',
  'crystalline': 'crystalline',
  'crystal': 'crystalline',
  'crawl': 'crawl',
  'crawling': 'crawl',
  'lichen': 'crawl',
  'volcanic': 'crawl',
}

const COLOR_KEYWORDS = [
  'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'brown',
  'black', 'white', 'cream', 'amber', 'honey', 'jade', 'teal',
  'turquoise', 'lavender', 'pink', 'rust', 'tan', 'ivory',
  'celadon green', 'oxblood', 'sang de boeuf', 'opalescent',
]

/** Words to strip that don't carry meaning */
const STOP_WORDS = new Set([
  'i', 'want', 'need', 'make', 'a', 'an', 'the', 'for', 'to', 'at',
  'in', 'on', 'with', 'something', 'like', 'similar', 'give', 'me',
  'can', 'you', 'please', 'would', 'looking', 'look', 'try', 'find',
  'suggest', 'recommend', 'that', 'is', 'it', 'of', 'my', 'some',
  'glaze', 'recipe', 'about', 'around', 'how',
])

/** Glaze-type keywords that map to archetype searches */
const GLAZE_TYPE_TERMS = [
  'celadon', 'tenmoku', 'temmoku', 'temoku',
  'shino', 'ash', 'crystalline', 'crystal',
  'majolica', 'maiolica', 'tin', 'faience', 'delft',
  'raku', 'salt', 'soda',
  'copper red', 'sang de boeuf', 'oxblood', 'flambe',
  'copper green', 'verdigris',
  'rutile', 'floating blue',
  'chun', 'jun', 'opalescent',
  'cobalt', 'cobalt blue',
  'iron', 'iron red', 'iron saturate',
  'clear', 'transparent', 'liner',
  'matte', 'matt', 'satin', 'gloss',
  'white', 'black',
  'food safe', 'food-safe', 'functional', 'dinnerware', 'tableware',
  'crawl', 'lichen', 'texture', 'volcanic',
  'porcelain', 'stoneware', 'earthenware',
  'hares fur', "hare's fur", 'oil spot',
  'carbon trap',
  'wood fire', 'wood fired',
  'nuka',
]

// ─── Parser ────────────────────────────────────────────────────

export function parseGlazeQuery(input: string): ParsedGlazeQuery {
  const raw = input.trim()
  const lower = raw.toLowerCase()
  let confidence = 0

  // 1. Extract cone
  let cone: number | null = null

  // Check negative cones first
  for (const pat of NEGATIVE_CONE_PATTERNS) {
    const m = lower.match(pat)
    if (m) {
      if (m[1]) {
        cone = -parseInt(m[1], 10)
      } else if (/low\s*fire/i.test(lower)) {
        cone = -6
      } else if (/earthenware/i.test(lower)) {
        cone = -4
      }
      break
    }
  }

  // Standard cone patterns
  if (cone === null) {
    for (const pat of CONE_PATTERNS) {
      const m = lower.match(pat)
      if (m) {
        cone = parseInt(m[1], 10)
        break
      }
    }
  }

  // Infer cone from common terms
  if (cone === null) {
    if (/high\s*fire|stoneware|porcelain/i.test(lower) && !/cone/i.test(lower)) {
      cone = 10
    } else if (/mid[\s-]*fire/i.test(lower)) {
      cone = 6
    }
  }

  if (cone !== null) confidence += 0.3

  // 2. Extract atmosphere
  let atmosphere: Atmosphere | null = null
  for (const [keyword, atm] of Object.entries(ATMOSPHERE_KEYWORDS)) {
    if (lower.includes(keyword)) {
      atmosphere = atm
      confidence += 0.1
      break
    }
  }

  // 3. Extract surface type
  let surface: SurfaceType | null = null
  for (const [keyword, srf] of Object.entries(SURFACE_KEYWORDS)) {
    if (lower.includes(keyword)) {
      surface = srf
      confidence += 0.1
      break
    }
  }

  // 4. Extract colors
  const colors: string[] = []
  for (const c of COLOR_KEYWORDS) {
    if (lower.includes(c)) {
      colors.push(c)
      confidence += 0.05
    }
  }

  // 5. Extract glaze type terms
  const glazeTerms: string[] = []
  // Sort by length descending so "copper red" matches before "copper" or "red"
  const sortedTypes = [...GLAZE_TYPE_TERMS].sort((a, b) => b.length - a.length)
  let remaining = lower
  for (const term of sortedTypes) {
    if (remaining.includes(term)) {
      glazeTerms.push(term)
      // Remove matched term to avoid double-counting
      remaining = remaining.replace(term, ' ')
      confidence += 0.2
    }
  }

  // 6. Extract remaining meaningful words as tags
  const words = remaining.split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w))
  const tags = [...new Set(words.filter(w => !glazeTerms.includes(w) && !colors.includes(w)))]

  // Cap confidence at 1.0
  confidence = Math.min(confidence, 1.0)

  // If we got nothing useful, set low confidence
  if (glazeTerms.length === 0 && cone === null && colors.length === 0) {
    confidence = Math.max(confidence, 0.05) // at least tried
  }

  return {
    raw,
    glazeTerms,
    cone,
    atmosphere,
    surface,
    colors,
    tags,
    confidence,
  }
}
