/**
 * Recipe Sync Service
 *
 * Provides CRUD operations for cloud-persisted recipes via Supabase.
 * Used by the recipeStore to sync localStorage ↔ Supabase when authenticated.
 *
 * All methods are no-ops when Supabase is not configured—the app
 * falls back to localStorage-only persistence.
 */

import { supabase, isSupabaseConfigured } from './client'
import type { GlazeRecipe } from '@/types'

// ── Helpers ─────────────────────────────────────────────────────────

function recipeToRow(recipe: GlazeRecipe, userId: string) {
  return {
    id: recipe.id,
    user_id: userId,
    name: recipe.name ?? '',
    source: recipe.source ?? 'user',
    recipe_data: recipe as unknown as Record<string, unknown>,
  }
}

function rowToRecipe(row: { recipe_data: Record<string, unknown> }): GlazeRecipe {
  return row.recipe_data as unknown as GlazeRecipe
}

// ── Cloud CRUD ──────────────────────────────────────────────────────

/** Fetch all recipes for the current user */
export async function fetchCloudRecipes(userId: string): Promise<GlazeRecipe[]> {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('saved_recipes')
    .select('recipe_data')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.warn('[RecipeSync] Failed to fetch recipes:', error.message)
    return []
  }

  return (data ?? []).map(rowToRecipe)
}

/** Upsert a single recipe to the cloud */
export async function upsertCloudRecipe(recipe: GlazeRecipe, userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false

  const row = recipeToRow(recipe, userId)
  const { error } = await supabase
    .from('saved_recipes')
    .upsert(row as any, { onConflict: 'id,user_id' })

  if (error) {
    console.warn('[RecipeSync] Failed to upsert recipe:', error.message)
    return false
  }
  return true
}

/** Delete a single recipe from the cloud */
export async function deleteCloudRecipe(recipeId: string, userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false

  const { error } = await supabase
    .from('saved_recipes')
    .delete()
    .eq('id', recipeId)
    .eq('user_id', userId)

  if (error) {
    console.warn('[RecipeSync] Failed to delete recipe:', error.message)
    return false
  }
  return true
}

/** Push all local recipes to the cloud (used on first sign-in) */
export async function pushAllToCloud(recipes: GlazeRecipe[], userId: string): Promise<boolean> {
  if (!isSupabaseConfigured || recipes.length === 0) return false

  const rows = recipes.map(r => recipeToRow(r, userId))

  const { error } = await supabase
    .from('saved_recipes')
    .upsert(rows as any, { onConflict: 'id,user_id' })

  if (error) {
    console.warn('[RecipeSync] Failed to push recipes:', error.message)
    return false
  }
  return true
}

/** Clear all cloud recipes for a user */
export async function clearCloudRecipes(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return false

  const { error } = await supabase
    .from('saved_recipes')
    .delete()
    .eq('user_id', userId)

  if (error) {
    console.warn('[RecipeSync] Failed to clear cloud recipes:', error.message)
    return false
  }
  return true
}

/**
 * Merge cloud and local recipes.
 * Strategy: cloud wins on conflict (same id), local-only recipes are preserved.
 */
export function mergeRecipes(local: GlazeRecipe[], cloud: GlazeRecipe[]): GlazeRecipe[] {
  const merged = new Map<string, GlazeRecipe>()

  // Local first (lower priority)
  for (const r of local) {
    merged.set(r.id, r)
  }

  // Cloud overwrites (higher priority — it's the source of truth when signed in)
  for (const r of cloud) {
    merged.set(r.id, r)
  }

  return Array.from(merged.values())
}
