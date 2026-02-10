/**
 * Supabase Database Types
 * 
 * Defines the shape of the Supabase tables used by Stull Atlas Studio.
 * Keep in sync with the actual Supabase schema (see /docs/supabase-schema.sql).
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
