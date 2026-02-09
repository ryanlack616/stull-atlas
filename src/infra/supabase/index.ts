/**
 * Supabase infrastructure — client, types, auth utilities, and recipe sync
 */

export { supabase, isSupabaseConfigured } from './client'
export type { Database, Profile, TrialCode, SavedRecipeRow, Tier, TrialStatus, CodeStatus } from './types'
export {
  fetchCloudRecipes,
  upsertCloudRecipe,
  deleteCloudRecipe,
  pushAllToCloud,
  clearCloudRecipes,
  mergeRecipes,
} from './recipeSync'
