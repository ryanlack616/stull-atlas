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
