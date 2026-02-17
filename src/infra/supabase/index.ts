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
  // Phase 2 — Studio, Lab, Kiln, Bench, Map
  MaterialRow,
  ClayBodyRow,
  KilnProfileRow,
  FiringLogRow,
  MaterialInventoryRow,
  BatchLogRow,
  RecipeVersionRow,
  LimitPresetRow,
  LayerExperimentRow,
  // Extensibility layer
  UserEntityRow,
  ReferenceDataRow,
  ComputedCacheRow,
  // Phase 3 — Community
  FollowRow,
  SharedItemRow,
  CommentRow,
  ReactionRow,
  CommunityFeedRow,
  // Phase 3 — Physical world
  PieceRow,
  GlazeBodyPairingRow,
  // Phase 3 — Classroom v4.2
  CourseRow,
  EnrollmentRow,
  ExerciseRow,
  SubmissionRow,
  // Phase 3 — Infrastructure
  NotificationRow,
  ImportJobRow,
  ActivityLogRow,
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
