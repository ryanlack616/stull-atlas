/**
 * Domain: Glaze Suggestion
 *
 * AI-assisted recipe suggestions — from natural language to optimized recipes.
 */

export { suggestRecipes } from './suggestionEngine'
export type {
  SuggestionRequest,
  SuggestionResult,
  RecipeSuggestion,
  ColorantSuggestion,
} from './suggestionEngine'

export { parseGlazeQuery } from './queryParser'
export type { ParsedGlazeQuery } from './queryParser'

export { findArchetypes, archetypesForCone, GLAZE_ARCHETYPES } from './archetypes'
export type { GlazeArchetype, GlazeFamily } from './archetypes'
