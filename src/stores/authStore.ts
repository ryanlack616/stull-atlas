/**
 * Auth Store
 * 
 * Manages authentication state, user profile, and trial status.
 * Integrates with Supabase Auth for session management.
 * Falls back gracefully when Supabase is not configured (dev mode).
 */

import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/infra/supabase'
import type { Profile, Tier, TrialStatus } from '@/infra/supabase'
import { canAccess, type Feature } from '@/domain/tier'
import { edition } from '@/edition'
import type { Session, User } from '@supabase/supabase-js'
import { useRecipeStore } from './recipeStore'

/**
 * Demo mode — unlocks all features without auth.
 * Activated by VITE_DEMO_MODE=true env var OR ?demo=1 URL parameter.
 * Designed for NCECA booth demo on unreliable conference wifi.
 */
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true' ||
  (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === '1')

const DEMO_PROFILE: Profile = {
  id: 'demo-user',
  email: 'demo@stullatlas.com',
  display_name: 'NCECA Demo',
  tier: 'pro',
  trial_start: new Date().toISOString(),
  trial_end: new Date(Date.now() + 365 * 86400000).toISOString(),
  stripe_customer_id: null,
  avatar_url: null,
  bio: null,
  studio_name: null,
  website: null,
  location: null,
  is_public: false,
  social_links: {},
  onboarding_completed: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

interface AuthState {
  /** Supabase session (null when logged out) */
  session: Session | null
  /** Supabase auth user */
  user: User | null
  /** User profile from profiles table */
  profile: Profile | null
  /** Whether initial auth check has completed */
  initialized: boolean
  /** Whether an auth operation is in progress */
  loading: boolean
  /** Last auth error message */
  error: string | null
}

interface AuthActions {
  /** Initialize auth — call once on app mount */
  initialize: () => Promise<void>
  /** Sign up with email + password */
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  /** Sign in with email + password */
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  /** Sign out */
  signOut: () => Promise<void>
  /** Fetch or create profile for current user */
  fetchProfile: () => Promise<void>
  /** Redeem a trial code */
  redeemCode: (code: string) => Promise<{ error: string | null }>
  /** Clear error state */
  clearError: () => void
}

/** Derive trial status from profile dates */
export function getTrialStatus(profile: Profile | null): TrialStatus {
  if (!profile?.trial_start || !profile?.trial_end) return 'none'
  const now = new Date()
  const end = new Date(profile.trial_end)
  return now <= end ? 'active' : 'expired'
}

/**
 * Free access window — all verified (signed-in) users get Pro.
 * NCECA 2026 promotion: free through end of April.
 * Set to null to disable.
 */
const FREE_UNTIL: Date | null = new Date('2026-04-30T23:59:59-04:00')

/** Whether the free access window is currently active */
export function isFreePeriodActive(): boolean {
  return FREE_UNTIL !== null && new Date() <= FREE_UNTIL
}

/** Whether running in demo mode (all features unlocked, no auth needed) */
export const isDemoMode = DEMO_MODE

/** Check if user has access to a given feature */
export function hasTierAccess(profile: Profile | null, feature: Feature): boolean {
  if (edition.allUnlocked || DEMO_MODE) return true
  // Free period: any signed-in user gets full access
  if (isFreePeriodActive() && profile) return true
  const effectiveTier: Tier = getTrialStatus(profile) === 'active' ? 'pro' : (profile?.tier ?? 'free')
  return canAccess(effectiveTier, feature)
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  initialized: false,
  loading: false,
  error: null,

  initialize: async () => {
    // Guard: only run once
    if (get().initialized) return

    // Studio edition: skip auth entirely, all features unlocked
    if (edition.allUnlocked) {
      set({ initialized: true })
      return
    }

    // Demo mode: skip auth entirely, provide fake Pro profile
    if (DEMO_MODE) {
      set({ profile: DEMO_PROFILE, initialized: true })
      return
    }

    if (!isSupabaseConfigured) {
      set({ initialized: true })
      return
    }

    try {
      // Get existing session
      const { data: { session } } = await supabase.auth.getSession()
      set({ session, user: session?.user ?? null })

      if (session?.user) {
        await get().fetchProfile()
        // Sync recipes from cloud on initial load
        useRecipeStore.getState().syncFromCloud(session.user.id)
      }

      // Listen for auth changes (store subscription for potential cleanup)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        set({ session, user: session?.user ?? null })
        if (session?.user) {
          await get().fetchProfile()
          // Sync recipes when auth state changes (sign in)
          useRecipeStore.getState().syncFromCloud(session.user.id)
        } else {
          set({ profile: null })
          // Clear sync user when signed out
          useRecipeStore.getState().setSyncUserId(null)
        }
      })
      // Store ref so we could unsubscribe later if needed
      ;(window as any).__stullAuthSub = subscription
    } catch (err) {
      console.error('[Auth] Failed to initialize:', err)
    } finally {
      set({ initialized: true })
    }
  },

  signUp: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        set({ error: error.message })
        return { error: error.message }
      }
      return { error: null }
    } catch (err: any) {
      const msg = err?.message || 'Sign up failed'
      set({ error: msg })
      return { error: msg }
    } finally {
      set({ loading: false })
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        set({ error: error.message })
        return { error: error.message }
      }
      return { error: null }
    } catch (err: any) {
      const msg = err?.message || 'Sign in failed'
      set({ error: msg })
      return { error: msg }
    } finally {
      set({ loading: false })
    }
  },

  signOut: async () => {
    set({ loading: true })
    await supabase.auth.signOut()
    set({ session: null, user: null, profile: null, loading: false })
  },

  fetchProfile: async () => {
    const user = get().user
    if (!user) return

    const { data, error } = await (supabase
      .from('profiles') as any)
      .select('*')
      .eq('id', user.id)
      .single() as { data: Profile | null; error: any }

    if (error && error.code === 'PGRST116') {
      // Profile doesn't exist yet — create it
      const newProfile: any = {
        id: user.id,
        email: user.email ?? '',
        display_name: null,
        tier: 'free' as Tier,
        trial_start: null,
        trial_end: null,
        stripe_customer_id: null,
      }
      const { data: created } = await (supabase
        .from('profiles') as any)
        .insert(newProfile)
        .select()
        .single() as { data: Profile | null }

      set({ profile: created ?? null })
    } else {
      set({ profile: data ?? null })
    }
  },

  redeemCode: async (code: string) => {
    const user = get().user
    if (!user) return { error: 'You must be signed in to redeem a code.' }

    set({ loading: true, error: null })
    try {
      const normalizedCode = code.trim().toUpperCase()

      // Look up the code
      const { data: codeRow, error: lookupErr } = await (supabase
        .from('trial_codes') as any)
        .select('*')
        .eq('code', normalizedCode)
        .single() as { data: import('@/infra/supabase').TrialCode | null; error: any }

      if (lookupErr || !codeRow) {
        const msg = 'Invalid code. Please check and try again.'
        set({ error: msg })
        return { error: msg }
      }

      if (codeRow.status !== 'unused') {
        const msg = 'This code has already been used.'
        set({ error: msg })
        return { error: msg }
      }

      // Check if user already has an active trial
      const profile = get().profile
      if (profile && getTrialStatus(profile) === 'active') {
        const msg = 'You already have an active trial.'
        set({ error: msg })
        return { error: msg }
      }

      // Redeem: update code + update profile
      const now = new Date()
      const trialEnd = new Date(now)
      trialEnd.setDate(trialEnd.getDate() + 30)

      const { error: codeUpdateErr } = await (supabase
        .from('trial_codes') as any)
        .update({
          status: 'redeemed' as const,
          redeemed_at: now.toISOString(),
          redeemed_by: user.id,
        })
        .eq('code', normalizedCode)
        .eq('status', 'unused') as { error: any } // Prevent race condition

      if (codeUpdateErr) {
        const msg = 'Failed to redeem code. Please try again.'
        set({ error: msg })
        return { error: msg }
      }

      const { error: profileUpdateErr } = await (supabase
        .from('profiles') as any)
        .update({
          trial_start: now.toISOString(),
          trial_end: trialEnd.toISOString(),
        })
        .eq('id', user.id) as { error: any }

      if (profileUpdateErr) {
        const msg = 'Code redeemed but failed to activate trial. Contact support.'
        set({ error: msg })
        return { error: msg }
      }

      // Refresh profile
      await get().fetchProfile()
      return { error: null }
    } catch (err: any) {
      const msg = err?.message || 'Code redemption failed'
      set({ error: msg })
      return { error: msg }
    } finally {
      set({ loading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
