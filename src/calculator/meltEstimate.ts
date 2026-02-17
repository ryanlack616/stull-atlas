/**
 * Melt-Temperature Estimator
 *
 * Empirical approximation of the temperature (°C) at which a glaze
 * reaches full melt, given its Unity Molecular Formula.
 *
 * The model is a simple linear combination calibrated against the
 * Stull chart's temperature contour bands (Derek Philipau) and
 * standard Orton cone-to-temperature data for mid-fire / high-fire:
 *
 *   T ≈ 1060 + 35·SiO₂ + 150·Al₂O₃ − 100·B₂O₃
 *
 * Higher silica and alumina raise melting point; boron lowers it.
 * Fluxes (R₂O + RO) are already normalized to 1.0 in UMF so their
 * contribution is baked into the intercept.
 *
 * This is a *rough* estimate — good enough for comparative
 * exploration, not kiln-schedule planning.
 */

import { UMF } from '@/types'
import { getOxideValue } from './umf'
import { OXIDE_CLASSES } from '@/types/umf'

/**
 * Estimate melting temperature (°C) from a UMF.
 *
 * @returns temperature in °C (typically 1000–1350 for cone 06–10)
 */
export function estimateMeltTemp(umf: UMF): number {
  const SiO2 = getOxideValue(umf, 'SiO2')
  const Al2O3 = getOxideValue(umf, 'Al2O3')
  const B2O3 = getOxideValue(umf, 'B2O3')

  return 1060 + SiO2 * 35 + Al2O3 * 150 - B2O3 * 100
}

/**
 * Compute the flux ratio (R₂O / RO) from a UMF.
 * Returns 0 when RO ≈ 0 to avoid division by zero.
 */
export function computeFluxRatio(umf: UMF): number {
  const R2O = OXIDE_CLASSES.R2O.reduce((s, o) => s + getOxideValue(umf, o), 0)
  const RO = OXIDE_CLASSES.RO.reduce((s, o) => s + getOxideValue(umf, o), 0)
  return RO > 0.001 ? R2O / RO : 0
}

/**
 * Apply a flux-ratio shift to a UMF.
 *
 * Shifts the partition between R₂O and RO while keeping their
 * total constant (≈ 1.0 in a properly normalized UMF).
 *
 * @param umf  The original UMF (not mutated)
 * @param delta  Fraction to move from RO → R₂O (negative = reverse)
 *               Clamped so neither group goes below 0.
 * @returns A new UMF with adjusted flux oxides
 */
export function applyFluxShift(umf: UMF, delta: number): UMF {
  if (delta === 0) return umf

  const R2O_total = OXIDE_CLASSES.R2O.reduce((s, o) => s + getOxideValue(umf, o), 0)
  const RO_total = OXIDE_CLASSES.RO.reduce((s, o) => s + getOxideValue(umf, o), 0)

  if (R2O_total + RO_total < 0.001) return umf

  // Clamp delta so neither group goes negative
  const clampedDelta = Math.max(-R2O_total, Math.min(RO_total, delta))

  // Scale factors for each group
  const r2oScale = R2O_total > 0.001 ? (R2O_total + clampedDelta) / R2O_total : 1
  const roScale = RO_total > 0.001 ? (RO_total - clampedDelta) / RO_total : 1

  const shifted: UMF = { ...umf }

  for (const oxide of OXIDE_CLASSES.R2O) {
    const entry = umf[oxide]
    if (entry && entry.value > 0) {
      shifted[oxide] = { ...entry, value: entry.value * r2oScale }
    }
  }
  for (const oxide of OXIDE_CLASSES.RO) {
    const entry = umf[oxide]
    if (entry && entry.value > 0) {
      shifted[oxide] = { ...entry, value: entry.value * roScale }
    }
  }

  return shifted
}
