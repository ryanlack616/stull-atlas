/**
 * Tier Gating
 * 
 * Maps features to minimum required tier.
 * Used to show upgrade prompts or lock features for free users.
 * 
 * Philosophy: free tier is useful (explore, basic UMF calc).
 * Paid tiers unlock time-saving workflows and advanced analysis.
 */

import type { Tier } from '@/infra/supabase'

/** Feature identifiers for tier gating */
export type Feature =
  // Free features
  | 'explorer_2d'
  | 'explorer_detail'
  | 'umf_calculator'
  | 'guide'
  | 'materials_browse'
  // Solo features
  | 'similarity_search'
  | 'compare_glazes'
  | 'recipe_save'
  | 'import_export'
  | 'line_blend'
  | 'validation_warnings'
  // Pro features
  | 'optimizer'
  | 'genetic_optimizer'
  | 'suggestion_engine'
  | 'triaxial_blend'
  | 'quadaxial_blend'
  | 'biaxial_blend'
  | 'radial_blend'
  | 'space_filling'
  | 'analysis_clustering'
  | 'analysis_density'
  | 'analysis_voids'
  // Atlas 3D features
  | 'explorer_3d'
  | 'surface_fit_3d'
  | 'proximity_3d'
  | 'export_3d'
  | 'lighting_3d'
  | 'camera_presets_3d'

/** Minimum tier required for each feature */
const FEATURE_TIERS: Record<Feature, Tier> = {
  // Free — enough to be useful and build goodwill
  explorer_2d: 'free',
  explorer_detail: 'free',
  umf_calculator: 'free',
  guide: 'free',
  materials_browse: 'free',

  // Solo — core workflows for individual potters
  similarity_search: 'solo',
  compare_glazes: 'solo',
  recipe_save: 'solo',
  import_export: 'solo',
  line_blend: 'solo',
  validation_warnings: 'solo',

  // Pro — advanced analysis and optimization
  optimizer: 'pro',
  genetic_optimizer: 'pro',
  suggestion_engine: 'pro',
  triaxial_blend: 'pro',
  quadaxial_blend: 'pro',
  biaxial_blend: 'pro',
  radial_blend: 'pro',
  space_filling: 'pro',
  analysis_clustering: 'pro',
  analysis_density: 'pro',
  analysis_voids: 'pro',

  // Atlas 3D — premium 3D visualization and exploration
  explorer_3d: 'atlas_3d',
  surface_fit_3d: 'atlas_3d',
  proximity_3d: 'atlas_3d',
  export_3d: 'atlas_3d',
  lighting_3d: 'atlas_3d',
  camera_presets_3d: 'atlas_3d',
}

/** Tier hierarchy for comparison */
const TIER_RANK: Record<Tier, number> = {
  free: 0,
  solo: 1,
  edu_individual: 1,
  pro: 2,
  edu_classroom: 2,
  atlas_3d: 3,
}

/** Check if a tier has access to a feature */
export function canAccess(userTier: Tier, feature: Feature): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[FEATURE_TIERS[feature]]
}

/** Get the minimum tier required for a feature */
export function requiredTier(feature: Feature): Tier {
  return FEATURE_TIERS[feature]
}

/** Get display name for a tier */
export function tierDisplayName(tier: Tier): string {
  const names: Record<Tier, string> = {
    free: 'Free',
    solo: 'Studio Solo',
    pro: 'Studio Pro',
    atlas_3d: 'Atlas 3D',
    edu_individual: 'Studio Edu',
    edu_classroom: 'Studio Edu (Classroom)',
  }
  return names[tier]
}

/** Get all features available at a given tier */
export function featuresForTier(tier: Tier): Feature[] {
  return (Object.entries(FEATURE_TIERS) as [Feature, Tier][])
    .filter(([, required]) => TIER_RANK[tier] >= TIER_RANK[required])
    .map(([feature]) => feature)
}
