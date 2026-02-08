/**
 * Glaze Suggestion Engine
 *
 * The "AI" in "AI-assisted recipe suggestions."
 *
 * Takes a natural language query → parses it → matches archetypes →
 * selects appropriate materials → runs the optimizer → returns ranked
 * recipe suggestions with explanations.
 *
 * No neural networks needed. Just ceramic chemistry knowledge + a good optimizer.
 */

import { OxideSymbol, MaterialDatasetId } from '@/types'
import { materialDatabase } from '@/infra/materials'
import { optimizeRecipe, type OxideTarget, type OptimizerResult } from '@/calculator/optimizer'
import { optimizeRecipeGA, type GAResult } from '@/calculator/geneticOptimizer'
import { parseGlazeQuery, type ParsedGlazeQuery } from './queryParser'
import { findArchetypes, archetypesForCone, GLAZE_ARCHETYPES, type GlazeArchetype } from './archetypes'

// ─── Types ─────────────────────────────────────────────────────

export interface SuggestionRequest {
  /** Natural language query, e.g. "celadon at cone 10" */
  query: string
  /** Materials the user has available (if they've specified) */
  availableMaterials?: string[]
  /** Max suggestions to return */
  maxSuggestions?: number
  /** Which optimizer to use */
  method?: 'gradient' | 'genetic'
}

export interface RecipeSuggestion {
  /** Which archetype this suggestion is based on */
  archetype: GlazeArchetype
  /** The optimized recipe result */
  recipe: OptimizerResult
  /** Materials used (ids) */
  materialIds: string[]
  /** Recommended colorant additions (on top of the base recipe) */
  colorants: ColorantSuggestion[]
  /** How well this matches the query (0-1) */
  relevance: number
  /** Human-readable explanation of why this was suggested */
  explanation: string
  /** Warnings or caveats */
  warnings: string[]
}

export interface ColorantSuggestion {
  materialId: string
  materialName: string
  /** Weight % of the total batch */
  minPercent: number
  maxPercent: number
  /** What effect this colorant produces */
  effect: string
}

export interface SuggestionResult {
  /** The parsed query */
  query: ParsedGlazeQuery
  /** Ranked suggestions */
  suggestions: RecipeSuggestion[]
  /** Overall status */
  status: 'success' | 'partial' | 'no-match'
  /** Message for the user */
  message: string
  /** Processing time in ms */
  durationMs: number
}

// ─── Material Palettes ────────────────────────────────────────

/** Default material sets by firing range */
const MATERIAL_PALETTES: Record<string, string[]> = {
  'high-fire': [
    'custer-feldspar', 'silica', 'epk', 'whiting', 'dolomite',
    'talc', 'ball-clay', 'nepheline-syenite', 'wollastonite',
  ],
  'mid-fire': [
    'custer-feldspar', 'silica', 'epk', 'whiting', 'talc',
    'zinc-oxide', 'ferro-frit-3134', 'ferro-frit-3124', 'dolomite',
    'nepheline-syenite', 'wollastonite',
  ],
  'low-fire': [
    'ferro-frit-3134', 'ferro-frit-3124', 'ferro-frit-3110',
    'silica', 'epk', 'whiting', 'ball-clay',
  ],
  'crystalline': [
    'zinc-oxide', 'silica', 'ferro-frit-3110', 'lithium-carbonate',
    'custer-feldspar', 'bone-ash',
  ],
}

/** Material categories to include based on archetype */
const ARCHETYPE_MATERIAL_HINTS: Record<string, string[]> = {
  'celadon': ['custer-feldspar', 'silica', 'whiting', 'epk'],
  'shino': ['nepheline-syenite', 'spodumene', 'epk', 'silica', 'ball-clay'],
  'ash': ['custer-feldspar', 'silica', 'whiting', 'epk', 'dolomite', 'bone-ash'],
  'crystalline': ['zinc-oxide', 'silica', 'ferro-frit-3110', 'lithium-carbonate'],
  'majolica': ['ferro-frit-3124', 'ferro-frit-3134', 'silica', 'epk'],
  'copper': ['custer-feldspar', 'silica', 'whiting', 'epk', 'ferro-frit-3134', 'bone-ash'],
}

// ─── Colorant Database ─────────────────────────────────────────

const COLORANT_EFFECTS: Record<string, string> = {
  'red-iron-oxide': 'warm amber to dark brown (light → heavy amounts)',
  'copper-carbonate': 'green in oxidation, red in reduction',
  'cobalt-carbonate': 'strong blue (small amounts go a long way)',
  'cobalt-oxide': 'intense blue (half the amount of carbonate)',
  'manganese-dioxide': 'purple-brown, metallic in reduction',
  'chrome-oxide': 'green; pink with tin in low-temperature zinc glazes',
  'nickel-oxide': 'gray-green to brown; blue with zinc',
  'rutile': 'tan/amber crystalline streaks; blue with cobalt',
  'titanium-dioxide': 'opacifier; crystalline effects in higher amounts',
  'tin-oxide': 'white opacifier; promotes copper red development',
  'zircopax': 'white opacifier; softer than tin',
  'iron-chromate': 'gray-brown muted tones',
}

// ─── Engine ────────────────────────────────────────────────────

/**
 * Main entry point: take a natural language query, return recipe suggestions.
 */
export function suggestRecipes(request: SuggestionRequest): SuggestionResult {
  const startTime = performance.now()
  const { query, maxSuggestions = 3, method = 'gradient' } = request

  // 1. Parse the query
  const parsed = parseGlazeQuery(query)

  // 2. Find matching archetypes
  let archetypes = findMatchingArchetypes(parsed)

  if (archetypes.length === 0) {
    return {
      query: parsed,
      suggestions: [],
      status: 'no-match',
      message: noMatchMessage(parsed),
      durationMs: performance.now() - startTime,
    }
  }

  // 3. Filter by cone if specified
  if (parsed.cone !== null) {
    const coneFiltered = archetypes.filter(
      a => parsed.cone! >= a.coneRange[0] && parsed.cone! <= a.coneRange[1],
    )
    // Keep some even if cone doesn't match perfectly, but deprioritize
    if (coneFiltered.length > 0) {
      archetypes = coneFiltered
    }
  }

  // 4. Filter by atmosphere if specified
  if (parsed.atmosphere) {
    const atmFiltered = archetypes.filter(
      a => a.atmosphere === parsed.atmosphere || a.atmosphere === 'either',
    )
    if (atmFiltered.length > 0) {
      archetypes = atmFiltered
    }
  }

  // Limit to top candidates
  archetypes = archetypes.slice(0, maxSuggestions + 2)

  // 5. Generate a recipe for each archetype
  const suggestions: RecipeSuggestion[] = []

  for (const archetype of archetypes) {
    const suggestion = generateSuggestion(archetype, parsed, request, method)
    if (suggestion) {
      suggestions.push(suggestion)
    }
  }

  // 6. Sort by relevance, take top N
  suggestions.sort((a, b) => b.relevance - a.relevance)
  const topSuggestions = suggestions.slice(0, maxSuggestions)

  const durationMs = performance.now() - startTime

  return {
    query: parsed,
    suggestions: topSuggestions,
    status: topSuggestions.length > 0 ? 'success' : 'partial',
    message: topSuggestions.length > 0
      ? `Found ${topSuggestions.length} recipe suggestion${topSuggestions.length > 1 ? 's' : ''} for "${query}"`
      : `Could generate partial results for "${query}" — try being more specific.`,
    durationMs,
  }
}

// ─── Helpers ───────────────────────────────────────────────────

function findMatchingArchetypes(parsed: ParsedGlazeQuery): GlazeArchetype[] {
  // Build search query from all parsed components
  const searchTerms = [
    ...parsed.glazeTerms,
    ...parsed.colors,
    ...parsed.tags,
  ].join(' ')

  let results = findArchetypes(searchTerms)

  // If no results from term search, try cone-based fallback
  if (results.length === 0 && parsed.cone !== null) {
    results = archetypesForCone(parsed.cone)
  }

  // If surface specified but no specific type, filter by surface
  if (parsed.surface && results.length === 0) {
    results = GLAZE_ARCHETYPES.filter(
      (a: GlazeArchetype) => a.surface === parsed.surface,
    )
  }

  return results
}

function selectMaterials(
  archetype: GlazeArchetype,
  parsed: ParsedGlazeQuery,
  userMaterials?: string[],
): string[] {
  // If user specified materials, use those
  if (userMaterials && userMaterials.length >= 3) {
    return userMaterials
  }

  // Start with archetype's key materials
  const materials = new Set<string>(archetype.keyMaterials)

  // Add family-specific hints
  const hints = ARCHETYPE_MATERIAL_HINTS[archetype.family]
  if (hints) {
    for (const m of hints) materials.add(m)
  }

  // Add palette materials for the firing range
  const cone = parsed.cone ?? (archetype.coneRange[0] + archetype.coneRange[1]) / 2
  let palette: string[]
  if (cone <= 1) palette = MATERIAL_PALETTES['low-fire']
  else if (cone <= 7) palette = MATERIAL_PALETTES['mid-fire']
  else palette = MATERIAL_PALETTES['high-fire']

  if (archetype.family === 'crystalline') {
    palette = MATERIAL_PALETTES['crystalline']
  }

  for (const m of palette) materials.add(m)

  // Validate that each material actually exists in the database
  const validated: string[] = []
  for (const id of materials) {
    const mat = materialDatabase.resolve(id, 'digitalfire_2024') ??
                materialDatabase.getMaterial(id)
    if (mat) validated.push(mat.id)
  }

  return validated
}

function generateSuggestion(
  archetype: GlazeArchetype,
  parsed: ParsedGlazeQuery,
  request: SuggestionRequest,
  method: 'gradient' | 'genetic',
): RecipeSuggestion | null {
  const materialIds = selectMaterials(archetype, parsed, request.availableMaterials)

  if (materialIds.length < 2) return null

  // Adjust targets for cone if the user specified one different from archetype default
  const targets = adjustTargetsForCone(archetype.targets, parsed.cone, archetype.coneRange)

  const dbWrapper = {
    resolve(name: string) {
      return materialDatabase.resolve(name, 'digitalfire_2024') ??
             materialDatabase.getMaterial(name) ?? null
    },
    getAnalysis(id: string) {
      return materialDatabase.getAnalysis(id, 'digitalfire_2024')
    },
  }

  let recipe: OptimizerResult

  try {
    if (method === 'genetic') {
      const ga = optimizeRecipeGA({
        materialIds,
        targets,
        datasetId: 'digitalfire_2024',
        populationSize: 60,
        generations: 150,
        tolerance: 0.03,
      }, dbWrapper as any)
      recipe = ga.best
    } else {
      recipe = optimizeRecipe({
        materialIds,
        targets,
        datasetId: 'digitalfire_2024',
        maxIterations: 2000,
        tolerance: 0.03,
      }, dbWrapper as any)
    }
  } catch (e) {
    console.warn('Optimizer failed for archetype:', archetype.name, e)
    return null
  }

  // Calculate relevance score
  const relevance = calculateRelevance(archetype, parsed, recipe)

  // Build colorant suggestions
  const colorants = buildColorantSuggestions(archetype)

  // Build explanation
  const explanation = buildExplanation(archetype, parsed, recipe, colorants)

  // Build warnings
  const warnings = buildWarnings(archetype, parsed, recipe)

  return {
    archetype,
    recipe,
    materialIds,
    colorants,
    relevance,
    explanation,
    warnings,
  }
}

function adjustTargetsForCone(
  targets: OxideTarget[],
  requestedCone: number | null,
  archetypeConeRange: [number, number],
): OxideTarget[] {
  if (requestedCone === null) return targets

  // If the requested cone is within the archetype range, no adjustment needed
  const midCone = (archetypeConeRange[0] + archetypeConeRange[1]) / 2
  const coneDiff = requestedCone - midCone

  if (Math.abs(coneDiff) < 2) return targets

  // Higher cones → slightly higher SiO2 and Al2O3 (more refractory needed)
  // Lower cones → more flux, lower SiO2
  const scaleFactor = 1 + (coneDiff * 0.02) // 2% per cone

  return targets.map(t => {
    const isSiAl = t.oxide === 'SiO2' || t.oxide === 'Al2O3'
    if (!isSiAl) return t

    return {
      ...t,
      target: t.target ? t.target * scaleFactor : undefined,
      min: t.min ? t.min * scaleFactor : undefined,
      max: t.max ? t.max * scaleFactor : undefined,
    }
  })
}

function calculateRelevance(
  archetype: GlazeArchetype,
  parsed: ParsedGlazeQuery,
  recipe: OptimizerResult,
): number {
  let score = 0.3 // base score for having a match

  // Query confidence
  score += parsed.confidence * 0.2

  // Recipe convergence
  if (recipe.converged) score += 0.3
  else {
    // Partial credit based on how many targets were met
    const metRatio = recipe.targetResults.filter(r => r.satisfied).length / Math.max(recipe.targetResults.length, 1)
    score += metRatio * 0.2
  }

  // Cone match bonus
  if (parsed.cone !== null) {
    const inRange = parsed.cone >= archetype.coneRange[0] && parsed.cone <= archetype.coneRange[1]
    if (inRange) score += 0.1
  }

  // Atmosphere match bonus
  if (parsed.atmosphere && (archetype.atmosphere === parsed.atmosphere || archetype.atmosphere === 'either')) {
    score += 0.1
  }

  return Math.min(score, 1.0)
}

function buildColorantSuggestions(archetype: GlazeArchetype): ColorantSuggestion[] {
  if (!archetype.colorants) return []

  return Object.entries(archetype.colorants).map(([materialId, range]) => {
    const mat = materialDatabase.resolve(materialId, 'digitalfire_2024') ??
                materialDatabase.getMaterial(materialId)
    return {
      materialId,
      materialName: mat?.primaryName ?? materialId.replace(/-/g, ' '),
      minPercent: range.min,
      maxPercent: range.max,
      effect: COLORANT_EFFECTS[materialId] ?? 'color addition',
    }
  })
}

function buildExplanation(
  archetype: GlazeArchetype,
  parsed: ParsedGlazeQuery,
  recipe: OptimizerResult,
  colorants: ColorantSuggestion[],
): string {
  const parts: string[] = []

  parts.push(archetype.description)

  if (recipe.converged) {
    parts.push(`The optimizer found a recipe that meets all UMF targets.`)
  } else {
    const met = recipe.targetResults.filter(r => r.satisfied).length
    const total = recipe.targetResults.length
    parts.push(`The optimizer met ${met}/${total} oxide targets. Minor adjustments may improve results.`)
  }

  if (colorants.length > 0) {
    const colorantStr = colorants
      .map(c => `${c.minPercent}-${c.maxPercent}% ${c.materialName} (${c.effect})`)
      .join('; ')
    parts.push(`Recommended additions: ${colorantStr}`)
  }

  if (archetype.notes) {
    parts.push(archetype.notes)
  }

  return parts.join('\n\n')
}

function buildWarnings(
  archetype: GlazeArchetype,
  parsed: ParsedGlazeQuery,
  recipe: OptimizerResult,
): string[] {
  const warnings: string[] = []

  // Cone mismatch
  if (parsed.cone !== null) {
    if (parsed.cone < archetype.coneRange[0] || parsed.cone > archetype.coneRange[1]) {
      warnings.push(
        `This glaze type is typically fired at cone ${archetype.coneRange[0]}-${archetype.coneRange[1]}, ` +
        `but you requested cone ${parsed.cone}. Results may vary.`,
      )
    }
  }

  // Atmosphere considerations
  if (archetype.atmosphere === 'reduction' && parsed.atmosphere === 'oxidation') {
    warnings.push(
      `This glaze traditionally requires reduction firing. In oxidation, the color will be different.`,
    )
  }

  // Food safety
  const unsafeOxides: OxideSymbol[] = ['BaO', 'PbO']
  for (const oxide of unsafeOxides) {
    const actual = recipe.umf[oxide]
    if (actual && actual > 0.05) {
      warnings.push(
        `Contains significant ${oxide} (${actual.toFixed(2)} moles). May not be food-safe.`,
      )
    }
  }

  // Non-convergence
  if (!recipe.converged) {
    warnings.push(
      `The optimizer didn't fully converge. Try adding more materials or adjusting targets.`,
    )
  }

  // Crystalline alumina warning
  if (archetype.family === 'crystalline') {
    const al2o3 = recipe.umf['Al2O3'] ?? 0
    if (al2o3 > 0.1) {
      warnings.push(
        `Al2O3 at ${al2o3.toFixed(2)} is too high for crystal growth — target is under 0.08. ` +
        `Remove clay or alumina-bearing materials.`,
      )
    }
  }

  return warnings
}

function noMatchMessage(parsed: ParsedGlazeQuery): string {
  const parts = [`Couldn't find a glaze archetype matching "${parsed.raw}".`]

  parts.push('\nTry describing what you want with terms like:')
  parts.push('  • A glaze type: celadon, tenmoku, shino, majolica, crystalline...')
  parts.push('  • A surface: gloss, satin, matte, crawl...')
  parts.push('  • A color: blue, green, white, copper red...')
  parts.push('  • A cone: "at cone 6", "cone 10", "low fire"...')
  parts.push('  • An atmosphere: oxidation, reduction...')
  parts.push('\nExamples:')
  parts.push('  "celadon at cone 10"')
  parts.push('  "food safe clear gloss cone 6"')
  parts.push('  "floating blue satin"')
  parts.push('  "copper red reduction"')

  return parts.join('\n')
}
