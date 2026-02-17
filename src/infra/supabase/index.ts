/**
 * Supabase infrastructure — client, types, auth utilities, and recipe sync
 */

export { supabase, isSupabaseConfigured } from './client'
export type {
  Database,
  Profile,
  TrialCode,
  SavedRecipeRow,
  CollectionRow,
  SnapshotRow,
  JournalEntryRow,
  RecipeCardRow,
  FiringScheduleRow,
  TestTileRow,
  AnnotationRow,
  UserPrefsRow,
  ExplorationStatsRow,
  BlendResultRow,
  Tier,
  TrialStatus,
  CodeStatus,
} from './types'
export {
  fetchCloudRecipes,
  upsertCloudRecipe,
  deleteCloudRecipe,
  pushAllToCloud,
  clearCloudRecipes,
  mergeRecipes,
} from './recipeSync'
