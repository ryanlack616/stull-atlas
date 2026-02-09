/**
 * Domain Layer
 *
 * Business logic and knowledge that is independent of UI and infrastructure.
 * Each sub-module has its own barrel export; this top-level barrel provides
 * a single import point for the most commonly used domain services.
 *
 *   domain/glaze        – dataset loading, import/export, UMF calc, similarity
 *   domain/material     – MaterialDatabase facade
 *   domain/suggestion   – natural-language → recipe suggestion pipeline
 *   domain/tier         – subscription tier gating (pure logic)
 *   domain/molarWeights – multi-era molar weight system (CRC, IUPAC, Glazy…)
 *   domain/digitalfire  – Digitalfire reference library lookups
 */

// Glaze operations
export {
  loadGlazyDataset,
  importGlazesFromJSON,
  exportGlazesToJSON,
  importGlazesFromCSV,
  importGlazesFromXML,
  importGlazesFromFile,
  calculateAllUMF,
  findSimilarGlazes,
  GLAZE_TYPE_CATALOG,
  GLAZE_TYPE_BY_ID,
  classifyGlazeByName,
  glazeTypeName,
  glazeTypeColor,
  glazeTypeRoot,
} from './glaze'
export type { SimilarityResult, SimilarityOptions, GlazeTypeInfo, GlazeTypeGroup } from './glaze'

// Material facade
export { materialDatabase, getAllMaterials } from './material'

// Suggestions
export { suggestRecipes, parseGlazeQuery, findArchetypes, archetypesForCone, GLAZE_ARCHETYPES } from './suggestion'
export type {
  SuggestionRequest,
  SuggestionResult,
  RecipeSuggestion,
  ColorantSuggestion,
  ParsedGlazeQuery,
  GlazeArchetype,
  GlazeFamily,
} from './suggestion'

// Tier gating
export { canAccess, requiredTier, tierDisplayName, featuresForTier } from './tier'
export type { Feature } from './tier'

// Molar weights
export {
  getMolarWeightSetInfos,
  getMolarWeights,
  compareWeightSets,
  recomputeUMF,
  getMolarWeightSetIds,
  getDefaultWeights,
} from './molarWeights'
export type { MolarWeightSetId, MolarWeightSetInfo } from './molarWeights'

// Digitalfire reference
export {
  searchKnowledge,
  lookupOxide,
  lookupMaterial,
  DIGITALFIRE_ATTRIBUTION,
} from './digitalfire'
export type { DigitalfireRef, DigitalfireOxide, DigitalfireMaterial } from './digitalfire'
