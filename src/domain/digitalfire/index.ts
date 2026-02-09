/**
 * Digitalfire Knowledge Service
 *
 * Provides contextual ceramic chemistry knowledge from Tony Hansen's
 * Digitalfire Reference Library (digitalfire.com).
 *
 * Every result includes a URL back to the original page — we use
 * this knowledge to *enhance* the user's understanding, always pointing
 * them to Tony's work as the authoritative source.
 */

import {
  oxides, materials, glossary, troubles, articles, tests,
  type DigitalfireRef, type DigitalfireOxide, type DigitalfireMaterial,
} from '@/data/digitalfire'
import { DIGITALFIRE_ATTRIBUTION } from '@/data/digitalfire/attribution'
import type { OxideSymbol } from '@/types'

export type { DigitalfireRef, DigitalfireOxide, DigitalfireMaterial }
export { DIGITALFIRE_ATTRIBUTION }

// ─── Lookup Indexes (built once, lazily) ────────────────────────

let oxideIndex: Map<string, DigitalfireOxide> | null = null
let materialIndex: Map<string, DigitalfireMaterial> | null = null

function getOxideIndex(): Map<string, DigitalfireOxide> {
  if (!oxideIndex) {
    oxideIndex = new Map()
    for (const ox of oxides) {
      // Index by formula (case-insensitive)
      oxideIndex.set(ox.formula.toLowerCase(), ox)
      // Also index by common name variations
      const titleLower = ox.title.toLowerCase()
      if (titleLower.includes('(')) {
        const names = titleLower.match(/\(([^)]+)\)/g)
        names?.forEach(n => {
          const clean = n.replace(/[()]/g, '').trim()
          oxideIndex!.set(clean.toLowerCase(), ox)
        })
      }
    }
  }
  return oxideIndex
}

function getMaterialIndex(): Map<string, DigitalfireMaterial> {
  if (!materialIndex) {
    materialIndex = new Map()
    for (const mat of materials) {
      if (!mat.name) continue
      materialIndex.set(mat.name.toLowerCase(), mat)
      // Index alternate names
      if (mat.altNames) {
        for (const alt of mat.altNames.split(',')) {
          materialIndex.set(alt.trim().toLowerCase(), mat)
        }
      }
    }
  }
  return materialIndex
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Look up an oxide by its formula symbol (e.g., 'SiO2', 'Al2O3').
 * Returns the Digitalfire reference page for that oxide.
 */
export function lookupOxide(formula: OxideSymbol | string): DigitalfireRef | null {
  const idx = getOxideIndex()
  const entry = idx.get(formula.toLowerCase())
  if (!entry) return null
  return {
    title: entry.title,
    excerpt: entry.excerpt,
    url: entry.url,
    category: 'oxide',
  }
}

/**
 * Look up a material by name (e.g., 'EPK', 'Nepheline Syenite').
 * Uses exact match first, then fuzzy prefix match.
 */
export function lookupMaterial(name: string): DigitalfireRef | null {
  const idx = getMaterialIndex()
  // Exact match
  const exact = idx.get(name.toLowerCase())
  if (exact) {
    return { title: exact.name, excerpt: exact.excerpt, url: exact.url, category: 'material' }
  }
  // Prefix match
  const lower = name.toLowerCase()
  for (const [key, mat] of idx) {
    if (key.startsWith(lower) || lower.startsWith(key)) {
      return { title: mat.name, excerpt: mat.excerpt, url: mat.url, category: 'material' }
    }
  }
  return null
}

/**
 * Search all knowledge categories for a query string.
 * Returns the most relevant results, ranked by category priority.
 */
export function searchKnowledge(query: string, limit = 8): DigitalfireRef[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const results: (DigitalfireRef & { score: number })[] = []
  const words = q.split(/\s+/)

  // Search glossary (highest value — these are definitions)
  for (const entry of glossary) {
    const score = scoreMatch(q, words, entry.term, entry.keywords, entry.excerpt)
    if (score > 0) {
      results.push({ title: entry.term, excerpt: entry.excerpt, url: entry.url, category: 'glossary', score: score + 10 })
    }
  }

  // Search troubles (high value for problem-solving)
  for (const entry of troubles) {
    const score = scoreMatch(q, words, entry.term, '', entry.excerpt)
    if (score > 0) {
      results.push({ title: entry.term, excerpt: entry.excerpt, url: entry.url, category: 'trouble', score: score + 8 })
    }
  }

  // Search oxides
  for (const entry of oxides) {
    const score = scoreMatch(q, words, entry.formula, entry.title, entry.excerpt)
    if (score > 0) {
      results.push({ title: entry.title, excerpt: entry.excerpt, url: entry.url, category: 'oxide', score: score + 6 })
    }
  }

  // Search materials
  for (const entry of materials) {
    const score = scoreMatch(q, words, entry.name, entry.altNames, entry.excerpt)
    if (score > 0) {
      results.push({ title: entry.name, excerpt: entry.excerpt, url: entry.url, category: 'material', score: score + 4 })
    }
  }

  // Search articles
  for (const entry of articles) {
    const score = scoreMatch(q, words, entry.title, '', entry.excerpt)
    if (score > 0) {
      results.push({ title: entry.title, excerpt: entry.excerpt, url: entry.url, category: 'article', score: score + 2 })
    }
  }

  // Sort by score descending, take top results
  results.sort((a, b) => b.score - a.score)
  return results.slice(0, limit).map(({ score, ...ref }) => ref)
}

/**
 * Get contextual references for a selected glaze based on its properties.
 * This is the main "intelligence" — given a glaze's characteristics,
 * find the most relevant Digitalfire articles.
 */
export function getContextualRefs(context: {
  materialNames?: string[]
  oxideSymbols?: OxideSymbol[]
  surfaceType?: string
  atmosphere?: string
  glazeFamily?: string
  coneRange?: [number, number]
}): DigitalfireRef[] {
  const refs: DigitalfireRef[] = []
  const seen = new Set<string>()

  const addUnique = (ref: DigitalfireRef | null) => {
    if (ref && !seen.has(ref.url)) {
      seen.add(ref.url)
      refs.push(ref)
    }
  }

  // Look up glaze family in glossary
  if (context.glazeFamily) {
    const familyResults = searchKnowledge(context.glazeFamily, 2)
    familyResults.forEach(addUnique)
  }

  // Look up surface type issues
  if (context.surfaceType && context.surfaceType !== 'unknown') {
    const surfaceResults = searchKnowledge(context.surfaceType + ' glaze', 1)
    surfaceResults.forEach(addUnique)
  }

  // Look up key oxides — focus on the interesting ones
  if (context.oxideSymbols) {
    // Only look up "interesting" oxides (not SiO2/Al2O3 which appear everywhere)
    const interesting = context.oxideSymbols.filter(
      ox => !['SiO2', 'Al2O3'].includes(ox)
    )
    for (const ox of interesting.slice(0, 3)) {
      addUnique(lookupOxide(ox))
    }
  }

  // Look up materials
  if (context.materialNames) {
    for (const name of context.materialNames.slice(0, 3)) {
      addUnique(lookupMaterial(name))
    }
  }

  // Look up atmosphere-specific articles
  if (context.atmosphere && context.atmosphere !== 'unknown') {
    const atmoResults = searchKnowledge(context.atmosphere + ' firing', 1)
    atmoResults.forEach(addUnique)
  }

  return refs.slice(0, 8)
}

/**
 * Get trouble-shooting references for common glaze defects.
 * Useful when the suggestion engine generates warnings.
 */
export function getTroubleRef(defect: string): DigitalfireRef | null {
  const lower = defect.toLowerCase()
  for (const entry of troubles) {
    if (entry.term.toLowerCase().includes(lower) || lower.includes(entry.term.toLowerCase())) {
      return { title: entry.term, excerpt: entry.excerpt, url: entry.url, category: 'trouble' }
    }
  }
  // Fallback: search
  const results = searchKnowledge(defect, 1)
  return results[0] || null
}

/**
 * Get all oxide references (for the oxide deep-link feature).
 * Returns a map of formula → URL for quick lookups.
 */
export function getOxideLinks(): Map<string, string> {
  const links = new Map<string, string>()
  for (const ox of oxides) {
    links.set(ox.formula, ox.url)
  }
  return links
}

// ─── Internal Helpers ───────────────────────────────────────────

function scoreMatch(
  query: string,
  words: string[],
  title: string,
  keywords: string,
  excerpt: string,
): number {
  const titleLower = (title ?? '').toLowerCase()
  const keyLower = (keywords ?? '').toLowerCase()
  const excerptLower = (excerpt ?? '').toLowerCase()

  let score = 0

  // Exact title match is strongest
  if (titleLower === query) score += 100
  // Title contains query
  else if (titleLower.includes(query)) score += 50
  // Query contains title
  else if (query.includes(titleLower) && titleLower.length > 3) score += 30
  // Keyword match
  else if (keyLower.includes(query)) score += 25

  // Word-level matching
  for (const word of words) {
    if (word.length < 2) continue
    if (titleLower.includes(word)) score += 15
    if (keyLower.includes(word)) score += 10
    if (excerptLower.includes(word)) score += 3
  }

  return score
}
