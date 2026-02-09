/**
 * Tier Gating Tests
 */

import { describe, it, expect } from 'vitest'
import { canAccess, requiredTier, tierDisplayName, featuresForTier } from '../tierGating'
import type { Feature } from '../tierGating'

describe('canAccess', () => {
  it('free tier can access free features', () => {
    expect(canAccess('free', 'explorer_2d')).toBe(true)
    expect(canAccess('free', 'umf_calculator')).toBe(true)
    expect(canAccess('free', 'guide')).toBe(true)
    expect(canAccess('free', 'materials_browse')).toBe(true)
  })

  it('free tier cannot access solo features', () => {
    expect(canAccess('free', 'explorer_3d')).toBe(false)
    expect(canAccess('free', 'similarity_search')).toBe(false)
    expect(canAccess('free', 'recipe_save')).toBe(false)
    expect(canAccess('free', 'import_export')).toBe(false)
  })

  it('free tier cannot access pro features', () => {
    expect(canAccess('free', 'optimizer')).toBe(false)
    expect(canAccess('free', 'suggestion_engine')).toBe(false)
    expect(canAccess('free', 'triaxial_blend')).toBe(false)
  })

  it('solo tier can access free and solo features', () => {
    expect(canAccess('solo', 'explorer_2d')).toBe(true)
    expect(canAccess('solo', 'explorer_3d')).toBe(true)
    expect(canAccess('solo', 'similarity_search')).toBe(true)
    expect(canAccess('solo', 'recipe_save')).toBe(true)
  })

  it('solo tier cannot access pro features', () => {
    expect(canAccess('solo', 'optimizer')).toBe(false)
    expect(canAccess('solo', 'genetic_optimizer')).toBe(false)
    expect(canAccess('solo', 'analysis_clustering')).toBe(false)
  })

  it('pro tier can access everything', () => {
    expect(canAccess('pro', 'explorer_2d')).toBe(true)
    expect(canAccess('pro', 'explorer_3d')).toBe(true)
    expect(canAccess('pro', 'optimizer')).toBe(true)
    expect(canAccess('pro', 'suggestion_engine')).toBe(true)
    expect(canAccess('pro', 'analysis_voids')).toBe(true)
    expect(canAccess('pro', 'surface_fit_3d')).toBe(true)
  })

  it('edu_individual has solo-level access', () => {
    expect(canAccess('edu_individual', 'explorer_3d')).toBe(true)
    expect(canAccess('edu_individual', 'recipe_save')).toBe(true)
    expect(canAccess('edu_individual', 'optimizer')).toBe(false)
  })

  it('edu_classroom has pro-level access', () => {
    expect(canAccess('edu_classroom', 'optimizer')).toBe(true)
    expect(canAccess('edu_classroom', 'analysis_density')).toBe(true)
    expect(canAccess('edu_classroom', 'space_filling')).toBe(true)
  })
})

describe('requiredTier', () => {
  it('returns correct tier for free features', () => {
    expect(requiredTier('explorer_2d')).toBe('free')
    expect(requiredTier('guide')).toBe('free')
  })

  it('returns correct tier for solo features', () => {
    expect(requiredTier('explorer_3d')).toBe('solo')
    expect(requiredTier('line_blend')).toBe('solo')
  })

  it('returns correct tier for pro features', () => {
    expect(requiredTier('optimizer')).toBe('pro')
    expect(requiredTier('triaxial_blend')).toBe('pro')
  })
})

describe('tierDisplayName', () => {
  it('returns human-readable names', () => {
    expect(tierDisplayName('free')).toBe('Free')
    expect(tierDisplayName('solo')).toBe('Studio Solo')
    expect(tierDisplayName('pro')).toBe('Studio Pro')
    expect(tierDisplayName('edu_individual')).toBe('Studio Edu')
    expect(tierDisplayName('edu_classroom')).toBe('Studio Edu (Classroom)')
  })
})

describe('featuresForTier', () => {
  it('free tier gets only free features', () => {
    const features = featuresForTier('free')
    expect(features).toContain('explorer_2d')
    expect(features).toContain('umf_calculator')
    expect(features).not.toContain('explorer_3d')
    expect(features).not.toContain('optimizer')
  })

  it('solo tier gets free + solo features', () => {
    const features = featuresForTier('solo')
    expect(features).toContain('explorer_2d')
    expect(features).toContain('explorer_3d')
    expect(features).toContain('recipe_save')
    expect(features).not.toContain('optimizer')
  })

  it('pro tier gets all features', () => {
    const features = featuresForTier('pro')
    expect(features).toContain('explorer_2d')
    expect(features).toContain('explorer_3d')
    expect(features).toContain('optimizer')
    expect(features).toContain('surface_fit_3d')
  })

  it('higher tiers have strictly more features', () => {
    const free = featuresForTier('free')
    const solo = featuresForTier('solo')
    const pro = featuresForTier('pro')
    expect(solo.length).toBeGreaterThan(free.length)
    expect(pro.length).toBeGreaterThan(solo.length)
    // All free features should be in solo
    for (const f of free) {
      expect(solo).toContain(f)
    }
    // All solo features should be in pro
    for (const f of solo) {
      expect(pro).toContain(f)
    }
  })
})
