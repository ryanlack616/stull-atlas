/**
 * Stull Atlas Type Definitions
 *
 * Shared TypeScript interfaces and types used across all layers.
 * No runtime code — only type declarations.
 *
 *   epistemic   – EpistemicState for data provenance tracking
 *   umf         – UMF, OxideSymbol, OxideEntry, oxide categories
 *   glaze       – GlazeRecipe, GlazePlotPoint, Atmosphere, SurfaceType
 *   material    – Material, MaterialAnalysis
 *   blend       – BlendPoint, BlendResult, BlendMode types
 *   recipe      – GlazeRecipeV2 (canonical recipe standard v1.0.0)
 */

export * from './epistemic'
export * from './umf'
export * from './glaze'
export * from './material'
export * from './blend'
// Re-export recipe types explicitly — Atmosphere, BaseType, Transparency,
// RecipeStatus, and UMFMeta are already exported by glaze.ts / umf.ts.
// Import directly from '@/types/recipe' when you need the V2 expanded variants.
export {
  type GlazeRecipeV2,
  type SurfaceTypeV2,
  type KilnType,
  type ApplicationMethod,
  type CoolingRate,
  type ChemistrySource,
  type DefectType,
  type StullRegion,
} from './recipe'
