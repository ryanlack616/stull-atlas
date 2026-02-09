/**
 * Domain / Tier Gating
 *
 * Feature-access rules based on the user’s subscription tier.
 * Pure logic — no UI, no Supabase calls.
 *
 *   canAccess(feature, tier)  – boolean gate
 *   requiredTier(feature)     – minimum tier for a feature
 *   tierDisplayName(tier)     – human-readable tier label
 *   featuresForTier(tier)     – list all accessible features
 */

export {
  canAccess,
  requiredTier,
  tierDisplayName,
  featuresForTier,
} from './tierGating'

export type { Feature } from './tierGating'
