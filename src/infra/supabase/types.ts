/**
 * Supabase Database Types
 * 
 * Defines the shape of the Supabase tables used by Stull Atlas Studio.
 * Keep in sync with the actual Supabase schema (see src/docs/supabase-schema.sql).
 */

/** Product tiers */
export type Tier = 'free' | 'solo' | 'pro' | 'atlas_3d' | 'edu_individual' | 'edu_classroom'

/** Trial status */
export type TrialStatus = 'none' | 'active' | 'expired'

/** Trial code status */
export type CodeStatus = 'unused' | 'redeemed' | 'disabled'

/** User profile stored in Supabase */
export interface Profile {
  id: string
  email: string
  display_name: string | null
  tier: Tier
  trial_start: string | null
  trial_end: string | null
  stripe_customer_id: string | null
  // Phase 3 — community identity + onboarding
  avatar_url: string | null
  bio: string | null
  studio_name: string | null
  website: string | null
  location: string | null
  is_public: boolean
  social_links: Record<string, string>  // { instagram, youtube, etsy, ... }
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

/** Trial code record */
export interface TrialCode {
  code: string
  batch_id: string
  status: CodeStatus
  issued_at: string
  redeemed_at: string | null
  redeemed_by: string | null
}

/** Cloud-saved recipe record */
export interface SavedRecipeRow {
  id: string
  user_id: string
  name: string
  source: string
  recipe_data: Record<string, unknown>
  // Phase 3 — denormalized query columns + sharing
  cone: string | null
  atmosphere: string | null
  surface_type: string | null
  status: 'active' | 'archived' | 'testing'
  is_public: boolean
  share_token: string | null
  forked_from_id: string | null
  forked_from_user_id: string | null
  base_type: 'glaze' | 'slip' | 'engobe' | 'wash' | 'underglaze'
  created_at: string
  updated_at: string
}

/** Named collection of items (recipes, snapshots, journals) */
export interface CollectionRow {
  id: string
  user_id: string
  name: string
  description: string | null
  color: string | null
  icon: string | null
  item_type: 'recipe' | 'snapshot' | 'journal' | 'mixed'
  item_ids: string[]
  is_smart: boolean
  smart_query: Record<string, unknown> | null
  sort_order: number
  created_at: string
  updated_at: string
}

/** What-If Machine snapshot — frozen exploration state */
export interface SnapshotRow {
  id: string
  user_id: string
  name: string | null
  parent_recipe_id: string | null
  umf_state: Record<string, number>
  properties: Record<string, number>
  stull_position: { x: number; y: number; z: number } | null
  surface: string | null
  forecast: Record<string, unknown> | null
  mode: 'studio' | 'science'
  tags: string[]
  is_favorite: boolean
  // Phase 3 — perturbation + inverse
  perturbation_data: Record<string, unknown> | null
  inverse_constraints: Record<string, unknown> | null
  created_at: string
}

/** Journal entry — annotated exploration record */
export interface JournalEntryRow {
  id: string
  user_id: string
  snapshot_id: string | null
  narration: string | null
  notes: string | null
  tags: string[]
  forecast: Record<string, unknown> | null
  created_at: string
}

/** Recipe card — generated printable artifact */
export interface RecipeCardRow {
  id: string
  user_id: string
  snapshot_id: string | null
  recipe_id: string | null
  card_data: Record<string, unknown>
  photo_url: string | null
  created_at: string
}

/** Firing schedule — multi-segment kiln program */
export interface FiringScheduleRow {
  id: string
  user_id: string
  name: string
  cone: string | null
  atmosphere: string | null
  segments: Array<{ rate_per_hr: number; target_temp: number; hold_minutes: number }>
  total_hours: number | null
  notes: string | null
  tags: string[]
  kiln_id: string | null  // Phase 3 — link to kiln_profiles
  created_at: string
  updated_at: string
}

/** Test tile — physical test record */
export interface TestTileRow {
  id: string
  user_id: string
  recipe_id: string | null
  firing_schedule_id: string | null
  clay_body: string | null
  cone_actual: string | null
  surface_result: string | null
  color_result: string | null
  photo_urls: string[]
  notes: string | null
  tags: string[]
  fired_date: string | null
  // Phase 3 — FK links
  clay_body_id: string | null
  firing_log_id: string | null
  batch_id: string | null
  defects: string[]
  layer_experiment_id: string | null
  created_at: string
  updated_at: string
}

/** Region annotation — user-drawn area on the Stull chart */
export interface AnnotationRow {
  id: string
  user_id: string
  name: string
  color: string | null
  polygon: Array<{ x: number; y: number }>
  notes: string | null
  visible: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

/** User preferences — roaming settings */
export interface UserPrefsRow {
  user_id: string
  theme: 'light' | 'dark' | 'system'
  mode: 'studio' | 'science'
  default_cone: string
  default_atmosphere: string
  prefs: Record<string, unknown>
  updated_at: string
}

/** Exploration stats — aggregated patterns for blindspot analysis */
export interface ExplorationStatsRow {
  user_id: string
  total_sessions: number
  total_snapshots: number
  oxide_heatmap: Record<string, number[]>
  region_visits: Record<string, number>
  blindspots: string[]
  last_session_at: string | null
  updated_at: string
}

/** Blend result — persisted blend calculation */
export interface BlendResultRow {
  id: string
  user_id: string
  name: string | null
  blend_type: 'simplex' | 'grid' | 'space_filling' | 'line'
  config: Record<string, unknown>
  points: Record<string, unknown>[]
  source_recipe_ids: string[]  // Phase 3 — recipe IDs used as blend corners
  created_at: string
}

// ════════════════════════════════════════════════════════════════════
// Phase 2 — Studio, Laboratory, Kiln, Bench, Map, Community types
// ════════════════════════════════════════════════════════════════════

/** User material — custom, annotated, or per-lot COA override */
export interface MaterialRow {
  id: string
  user_id: string
  name: string
  alternate_names: string[]
  category: string | null         // 'feldspar' | 'clay' | 'frit' | 'oxide' | 'colorant' | 'flux' | 'other'
  oxide_analysis: Record<string, number>  // { SiO2: 68.7, Al2O3: 18.2, ... } wt%
  loi: number | null
  formula_weight: number | null
  specific_gravity: number | null
  mesh_size: string | null
  supplier: string | null
  cost_per_unit: number | null
  cost_unit: string              // 'lb' | 'kg'
  lot_number: string | null
  is_custom: boolean
  base_material_id: string | null
  notes: string | null
  tags: string[]
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Clay body recipe */
export interface ClayBodyRow {
  id: string
  user_id: string
  name: string
  cone: string | null
  firing_range: string | null
  ingredients: Array<{ material: string; percent: number }>
  oxide_analysis: Record<string, number>
  coe_estimate: number | null
  absorption: number | null
  shrinkage_wet_to_dry: number | null
  shrinkage_dry_to_fired: number | null
  shrinkage_total: number | null
  plasticity_notes: string | null
  color_oxidation: string | null
  color_reduction: string | null
  notes: string | null
  tags: string[]
  is_favorite: boolean
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Kiln profile — user's physical kiln */
export interface KilnProfileRow {
  id: string
  user_id: string
  name: string
  kiln_type: string | null        // 'electric' | 'gas' | 'wood' | 'soda' | 'salt' | 'raku' | 'other'
  max_temp_c: number | null
  max_cone: string | null
  interior_dims: { width_in: number; depth_in: number; height_in: number } | null
  cubic_feet: number | null
  element_count: number | null
  element_age_firings: number | null
  thermocouple_count: number | null
  controller: string | null
  power_kw: number | null
  fuel_type: string | null        // 'electricity' | 'natural_gas' | 'propane' | 'wood'
  location: string | null
  notes: string | null
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Firing log — actual kiln firing event */
export interface FiringLogRow {
  id: string
  user_id: string
  kiln_id: string | null
  schedule_id: string | null
  name: string | null
  fired_date: string | null
  started_at: string | null
  finished_at: string | null
  cone_target: string | null
  cone_actual: string | null
  atmosphere: string | null
  heat_work_actual: number | null
  thermocouple_data: Array<{ time_min: number; temp_c: number }> | null
  tile_ids: string[]
  kiln_load_notes: string | null
  kiln_map: Record<string, unknown> | null
  fuel_used: number | null
  fuel_unit: string | null
  cost_estimate: number | null
  notes: string | null
  tags: string[]
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Material inventory — what's on the shelf */
export interface MaterialInventoryRow {
  id: string
  user_id: string
  material_id: string | null
  material_name: string
  quantity: number
  unit: string                    // 'lb' | 'kg' | 'oz' | 'g'
  reorder_at: number | null
  cost_per_unit: number | null
  supplier: string | null
  lot_number: string | null
  purchase_date: string | null
  expiry_date: string | null
  location: string | null
  notes: string | null
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Batch log — production mixing record */
export interface BatchLogRow {
  id: string
  user_id: string
  recipe_id: string | null
  recipe_name: string | null
  batch_size: number
  batch_unit: string              // 'g' | 'kg' | 'lb' | 'oz'
  multiplier: number
  target_sg: number | null
  water_added: number | null
  deflocculant: string | null
  deflocculant_amount: number | null
  actual_sg: number | null
  material_weights: Array<{ material: string; weight: number; unit: string }> | null
  mixed_date: string | null
  mixed_by: string | null
  status: 'active' | 'depleted' | 'discarded'
  notes: string | null
  tags: string[]
  firing_log_id: string | null  // Phase 3 — link to firing_logs
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Recipe version — git-for-recipes */
export interface RecipeVersionRow {
  id: string
  user_id: string
  recipe_id: string
  version_number: number
  parent_version_id: string | null
  fork_source_id: string | null
  recipe_data: Record<string, unknown>
  umf_snapshot: Record<string, number> | null
  change_summary: string | null
  change_diff: Array<{ field: string; old: unknown; new: unknown }> | null
  notes: string | null
  tags: string[]
  created_at: string
}

/** Limit preset — user-defined UMF target envelope */
export interface LimitPresetRow {
  id: string
  user_id: string
  name: string
  cone: string | null
  surface_target: string | null   // 'matte' | 'satin' | 'gloss' | 'any'
  oxide_ranges: Record<string, [number, number]>  // { SiO2: [2.5, 4.5], ... }
  property_ranges: Record<string, [number, number]>
  notes: string | null
  is_default: boolean
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Layer experiment — glaze-over-glaze record */
export interface LayerExperimentRow {
  id: string
  user_id: string
  name: string | null
  inner_recipe_id: string | null
  outer_recipe_id: string | null
  inner_name: string | null
  outer_name: string | null
  clay_body_id: string | null
  firing_log_id: string | null
  cone: string | null
  atmosphere: string | null
  application_method: string | null
  inner_thickness: string | null
  outer_thickness: string | null
  estimated_combined_umf: Record<string, number> | null
  surface_result: string | null
  color_result: string | null
  interaction_notes: string | null
  photo_urls: string[]
  risk_flags: string[]
  rating: number | null
  notes: string | null
  tags: string[]
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

// ════════════════════════════════════════════════════════════════════
// Extensibility Layer
// ════════════════════════════════════════════════════════════════════

/** Universal entity — the escape hatch for any future data type */
export interface UserEntityRow {
  id: string
  user_id: string
  entity_type: string             // discriminator: 'comparison', 'exploration_path', 'exercise', etc.
  parent_id: string | null
  name: string | null
  data: Record<string, unknown>   // shape varies by entity_type
  tags: string[]
  is_archived: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

/** Reference data — system constants / physics lookup tables */
export interface ReferenceDataRow {
  key: string                     // unique identifier
  category: string                // 'physical_constants' | 'cone_charts' | 'coefficients' | etc.
  label: string | null
  data: Record<string, unknown>   // the payload
  source: string | null           // citation
  version: number
  notes: string | null
  updated_at: string
}

/** Computed cache — expensive calculation results */
export interface ComputedCacheRow {
  id: string
  user_id: string
  cache_type: string              // 'property_suite' | 'viscosity_curve' | 'phase_lookup' | etc.
  input_hash: string
  result: Record<string, unknown>
  computation_ms: number | null
  computed_at: string
  expires_at: string | null
}

// ════════════════════════════════════════════════════════════════════
// Phase 3 — Community, Classroom, Physical, Infrastructure
// ════════════════════════════════════════════════════════════════════

/** Follow relationship — user-to-user */
export interface FollowRow {
  follower_id: string
  following_id: string
  created_at: string
}

/** Shared item — recipe/tile/experiment shared to the community */
export interface SharedItemRow {
  id: string
  user_id: string
  item_type: 'recipe' | 'test_tile' | 'layer_experiment' | 'blend' | 'piece'
  item_id: string
  title: string
  description: string | null
  photo_url: string | null
  visibility: 'public' | 'link_only'
  share_token: string | null
  license: 'cc-by-sa' | 'cc-by-nc' | 'all-rights-reserved'
  is_featured: boolean
  is_pinned: boolean
  fork_count: number
  view_count: number
  tags: string[]
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Comment — threaded comments on shared items */
export interface CommentRow {
  id: string
  user_id: string
  shared_item_id: string
  parent_id: string | null        // null = top-level; set = reply
  body: string
  is_edited: boolean
  created_at: string
  updated_at: string
}

/** Reaction — like, tried-it, bookmark on shared items */
export interface ReactionRow {
  id: string
  user_id: string
  shared_item_id: string
  reaction_type: 'like' | 'tried_it' | 'bookmark' | 'helpful'
  notes: string | null
  photo_url: string | null
  created_at: string
}

/** Community feed event — materialized activity stream */
export interface CommunityFeedRow {
  id: string
  actor_id: string
  event_type: 'shared' | 'commented' | 'reacted' | 'forked' | 'tried_it'
  shared_item_id: string | null
  target_user_id: string | null
  summary: string | null
  detail: Record<string, unknown>
  created_at: string
}

/** Piece — the actual physical pottery artifact */
export interface PieceRow {
  id: string
  user_id: string
  name: string | null
  form: string | null             // 'bowl' | 'mug' | 'vase' | 'plate' | 'sculpture' | 'tile' | 'other'
  clay_body_id: string | null
  clay_body_name: string | null
  glaze_recipe_ids: string[]
  glaze_names: string[]
  firing_log_id: string | null
  firing_schedule_id: string | null
  cone: string | null
  atmosphere: string | null
  bisque_cone: string | null
  shelf_position: string | null
  application_notes: string | null
  surface_result: string | null
  color_result: string | null
  photo_urls: string[]
  dimensions: { height_in?: number; width_in?: number; weight_oz?: number } | null
  status: 'greenware' | 'bisqued' | 'glazed' | 'fired' | 'finished' | 'sold' | 'gifted' | 'broken' | 'in_progress'
  rating: number | null
  notes: string | null
  tags: string[]
  is_favorite: boolean
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Glaze-body pairing — compatibility matrix entry */
export interface GlazeBodyPairingRow {
  id: string
  user_id: string
  recipe_id: string | null
  recipe_name: string | null
  clay_body_id: string | null
  clay_body_name: string | null
  cone: string | null
  atmosphere: string | null
  fit_rating: number | null       // 1-5
  surface_result: string | null
  color_result: string | null
  coe_glaze: number | null
  coe_body: number | null
  coe_diff: number | null
  defects: string[]
  photo_urls: string[]
  notes: string | null
  tags: string[]
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Course — classroom v4.2 teacher-created course */
export interface CourseRow {
  id: string
  teacher_id: string
  title: string
  description: string | null
  course_code: string | null
  max_students: number
  status: 'draft' | 'active' | 'archived'
  settings: Record<string, unknown>
  tags: string[]
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Enrollment — student enrollment in a course */
export interface EnrollmentRow {
  id: string
  course_id: string
  user_id: string
  role: 'student' | 'ta' | 'auditor'
  status: 'pending' | 'active' | 'dropped' | 'completed'
  enrolled_at: string
  completed_at: string | null
  detail: Record<string, unknown>
}

/** Exercise — course assignment */
export interface ExerciseRow {
  id: string
  course_id: string
  teacher_id: string
  title: string
  description: string | null
  exercise_type: 'recipe_match' | 'limit_challenge' | 'blend_design' | 'open'
  target_data: Record<string, unknown> | null
  due_date: string | null
  sort_order: number
  is_published: boolean
  settings: Record<string, unknown>
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Submission — student exercise submission */
export interface SubmissionRow {
  id: string
  exercise_id: string
  user_id: string
  recipe_id: string | null
  snapshot_id: string | null
  submission_data: Record<string, unknown>
  score: number | null
  feedback: string | null
  status: 'draft' | 'submitted' | 'graded' | 'returned'
  attempt_number: number
  submitted_at: string
  graded_at: string | null
  detail: Record<string, unknown>
  created_at: string
  updated_at: string
}

/** Notification — in-app notification */
export interface NotificationRow {
  id: string
  user_id: string
  type: 'comment' | 'reaction' | 'follow' | 'fork' | 'grade' | 'assignment' | 'system'
  title: string
  body: string | null
  source_user_id: string | null
  link: string | null
  ref_id: string | null
  is_read: boolean
  created_at: string
}

/** Import job — v4.3 Bridge provenance tracking */
export interface ImportJobRow {
  id: string
  user_id: string
  source: string                  // 'glazy' | 'digitalfire' | 'csv' | 'json' | 'hyperglaze' | 'matrix'
  source_url: string | null
  file_name: string | null
  status: 'pending' | 'processing' | 'completed' | 'failed'
  items_total: number
  items_imported: number
  items_skipped: number
  items_failed: number
  imported_ids: string[]
  error_log: Array<{ row?: number; field?: string; error: string }>
  options: Record<string, unknown>
  detail: Record<string, unknown>
  started_at: string | null
  completed_at: string | null
  created_at: string
}

/** Exploration path — persisted walk-through-glaze-space trail */
export interface ExplorationPathRow {
  id: string
  user_id: string
  name: string | null
  description: string | null
  snapshot_ids: string[]            // ordered list of snapshot UUIDs visited
  edges: Record<string, unknown>[]  // [{ from_idx, to_idx, delta_umf, distance, note }]
  camera_states: Record<string, unknown>[]  // [{ position, rotation, zoom }] per step
  axis_config: Record<string, unknown> | null  // { x, y, z, colorBy }
  session_id: string | null
  total_distance: number | null
  step_count: number
  tags: string[]
  is_favorite: boolean
  is_public: boolean
  share_token: string | null
  detail: Record<string, unknown>
  started_at: string | null
  finished_at: string | null
  created_at: string
  updated_at: string
}

/** Activity log — append-only user activity timeline */
export interface ActivityLogRow {
  id: string
  user_id: string
  action: string                  // 'created_recipe' | 'ran_blend' | 'saved_snapshot' | 'fired_kiln' | 'mixed_batch' | 'shared' | 'imported'
  entity_type: string | null
  entity_id: string | null
  summary: string | null
  detail: Record<string, unknown>
  created_at: string
}

/**
 * Supabase Database schema definition.
 * Used for typed client queries.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
        Relationships: []
      }
      trial_codes: {
        Row: TrialCode
        Insert: Omit<TrialCode, 'redeemed_at' | 'redeemed_by'>
        Update: Partial<TrialCode>
        Relationships: []
      }
      saved_recipes: {
        Row: SavedRecipeRow
        Insert: Omit<SavedRecipeRow, 'created_at' | 'updated_at'>
        Update: Partial<Omit<SavedRecipeRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      collections: {
        Row: CollectionRow
        Insert: Omit<CollectionRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<CollectionRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      snapshots: {
        Row: SnapshotRow
        Insert: Omit<SnapshotRow, 'id' | 'created_at'>
        Update: Partial<Omit<SnapshotRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      journal_entries: {
        Row: JournalEntryRow
        Insert: Omit<JournalEntryRow, 'id' | 'created_at'>
        Update: Partial<Omit<JournalEntryRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      recipe_cards: {
        Row: RecipeCardRow
        Insert: Omit<RecipeCardRow, 'id' | 'created_at'>
        Update: Partial<Omit<RecipeCardRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      firing_schedules: {
        Row: FiringScheduleRow
        Insert: Omit<FiringScheduleRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<FiringScheduleRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      test_tiles: {
        Row: TestTileRow
        Insert: Omit<TestTileRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<TestTileRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      annotations: {
        Row: AnnotationRow
        Insert: Omit<AnnotationRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<AnnotationRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      user_prefs: {
        Row: UserPrefsRow
        Insert: UserPrefsRow
        Update: Partial<Omit<UserPrefsRow, 'user_id'>>
        Relationships: []
      }
      exploration_stats: {
        Row: ExplorationStatsRow
        Insert: ExplorationStatsRow
        Update: Partial<Omit<ExplorationStatsRow, 'user_id'>>
        Relationships: []
      }
      blend_results: {
        Row: BlendResultRow
        Insert: Omit<BlendResultRow, 'id' | 'created_at'>
        Update: never
        Relationships: []
      }
      materials: {
        Row: MaterialRow
        Insert: Omit<MaterialRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MaterialRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      clay_bodies: {
        Row: ClayBodyRow
        Insert: Omit<ClayBodyRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ClayBodyRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      kiln_profiles: {
        Row: KilnProfileRow
        Insert: Omit<KilnProfileRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<KilnProfileRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      firing_logs: {
        Row: FiringLogRow
        Insert: Omit<FiringLogRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<FiringLogRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      material_inventory: {
        Row: MaterialInventoryRow
        Insert: Omit<MaterialInventoryRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MaterialInventoryRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      batch_logs: {
        Row: BatchLogRow
        Insert: Omit<BatchLogRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BatchLogRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      recipe_versions: {
        Row: RecipeVersionRow
        Insert: Omit<RecipeVersionRow, 'id' | 'created_at'>
        Update: never
        Relationships: []
      }
      limit_presets: {
        Row: LimitPresetRow
        Insert: Omit<LimitPresetRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<LimitPresetRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      layer_experiments: {
        Row: LayerExperimentRow
        Insert: Omit<LayerExperimentRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<LayerExperimentRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      user_entities: {
        Row: UserEntityRow
        Insert: Omit<UserEntityRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<UserEntityRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      reference_data: {
        Row: ReferenceDataRow
        Insert: ReferenceDataRow
        Update: Partial<Omit<ReferenceDataRow, 'key'>>
        Relationships: []
      }
      computed_cache: {
        Row: ComputedCacheRow
        Insert: Omit<ComputedCacheRow, 'id' | 'computed_at'>
        Update: never
        Relationships: []
      }
      // Phase 3 — Community
      follows: {
        Row: FollowRow
        Insert: FollowRow
        Update: never
        Relationships: []
      }
      shared_items: {
        Row: SharedItemRow
        Insert: Omit<SharedItemRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<SharedItemRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      comments: {
        Row: CommentRow
        Insert: Omit<CommentRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<CommentRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      reactions: {
        Row: ReactionRow
        Insert: Omit<ReactionRow, 'id' | 'created_at'>
        Update: never
        Relationships: []
      }
      community_feed: {
        Row: CommunityFeedRow
        Insert: Omit<CommunityFeedRow, 'id' | 'created_at'>
        Update: never
        Relationships: []
      }
      // Phase 3 — Physical world
      pieces: {
        Row: PieceRow
        Insert: Omit<PieceRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<PieceRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      glaze_body_pairings: {
        Row: GlazeBodyPairingRow
        Insert: Omit<GlazeBodyPairingRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<GlazeBodyPairingRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      // Phase 3 — Classroom v4.2
      courses: {
        Row: CourseRow
        Insert: Omit<CourseRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<CourseRow, 'id' | 'teacher_id' | 'created_at'>>
        Relationships: []
      }
      enrollments: {
        Row: EnrollmentRow
        Insert: Omit<EnrollmentRow, 'id' | 'enrolled_at'>
        Update: Partial<Omit<EnrollmentRow, 'id' | 'course_id' | 'user_id'>>
        Relationships: []
      }
      exercises: {
        Row: ExerciseRow
        Insert: Omit<ExerciseRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ExerciseRow, 'id' | 'course_id' | 'teacher_id' | 'created_at'>>
        Relationships: []
      }
      submissions: {
        Row: SubmissionRow
        Insert: Omit<SubmissionRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<SubmissionRow, 'id' | 'exercise_id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      // Phase 3 — Infrastructure
      notifications: {
        Row: NotificationRow
        Insert: Omit<NotificationRow, 'id' | 'created_at'>
        Update: Partial<Pick<NotificationRow, 'is_read'>>
        Relationships: []
      }
      import_jobs: {
        Row: ImportJobRow
        Insert: Omit<ImportJobRow, 'id' | 'created_at'>
        Update: Partial<Omit<ImportJobRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      exploration_paths: {
        Row: ExplorationPathRow
        Insert: Omit<ExplorationPathRow, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<ExplorationPathRow, 'id' | 'user_id' | 'created_at'>>
        Relationships: []
      }
      activity_log: {
        Row: ActivityLogRow
        Insert: Omit<ActivityLogRow, 'id' | 'created_at'>
        Update: never
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      tier: Tier
      code_status: CodeStatus
    }
    CompositeTypes: Record<string, never>
  }
}
