/**
 * Supabase Client
 * 
 * Single instance used across the app.
 * Credentials come from Vite env vars (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).
 * 
 * To configure:
 *   1. Create a Supabase project at https://supabase.com
 *   2. Copy the project URL and anon key from Settings > API
 *   3. Create a .env.local file in the project root:
 *        VITE_SUPABASE_URL=https://your-project.supabase.co
 *        VITE_SUPABASE_ANON_KEY=eyJ...
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'Auth features will be unavailable. See src/infra/supabase/client.ts for setup instructions.'
  )
}

/**
 * Supabase client instance.
 * Safe to import even when env vars are missing — auth calls will simply fail gracefully.
 */
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
)

/** Whether Supabase is properly configured */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
