/**
 * Edition Configuration
 *
 * Single source of truth for behavioral differences between
 * the Web edition (stullatlas.app) and the Studio desktop edition (Tauri .exe/.dmg).
 *
 * Web edition  — freemium tiers, Stripe payments, Supabase auth, cloud data.
 * Studio edition — everything unlocked, no auth, offline data, extra skins.
 *
 * The edition is resolved once at startup from the Tauri runtime check.
 * Vite tree-shakes unreachable branches in production builds.
 *
 * Usage:
 *   import { edition } from '@/edition'
 *   if (edition.allUnlocked) { ... }
 */

import { isTauri } from '@/utils/platform'

export type EditionId = 'web' | 'studio'

export interface Edition {
  /** Which build this is */
  readonly id: EditionId
  /** Display name shown in header / about page */
  readonly name: string
  /** Everything unlocked — skip tier gating entirely */
  readonly allUnlocked: boolean
  /** Show sign-in / sign-up UI and Supabase auth */
  readonly showAuth: boolean
  /** Show the Pricing page and nav link */
  readonly showPricing: boolean
  /** Show Stripe / payment links */
  readonly showPayments: boolean
  /** Load data from bundled JSON instead of fetching over network */
  readonly offlineData: boolean
  /** Extra theme skins beyond dark/light */
  readonly extraSkins: boolean
}

const WEB_EDITION: Edition = {
  id: 'web',
  name: 'Stull Atlas',
  allUnlocked: false,
  showAuth: true,
  showPricing: true,
  showPayments: true,
  offlineData: false,
  extraSkins: false,
}

const STUDIO_EDITION: Edition = {
  id: 'studio',
  name: 'Stull Atlas Studio',
  allUnlocked: true,
  showAuth: false,
  showPricing: false,
  showPayments: false,
  offlineData: true,
  extraSkins: true,
}

/** The active edition for this build */
export const edition: Edition = isTauri ? STUDIO_EDITION : WEB_EDITION
