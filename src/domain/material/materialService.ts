/**
 * Domain: Material Service
 *
 * Thin wrapper around the infra MaterialDatabase for domain consumers.
 * Re-exports the singleton so the rest of the app doesn't import infra/ directly.
 */

import { materialDatabase } from '@/infra/materials'
import type { Material, OxideSymbol } from '@/types'

export { materialDatabase }

/**
 * Resolve a free-text material name to a Material, or null.
 */
export function resolveMaterial(name: string): Material | null {
  return materialDatabase.resolve(name)
}

/**
 * Get the oxide analysis for a material.
 */
export function getMaterialAnalysis(
  materialId: string,
): Record<OxideSymbol, number> | null {
  return materialDatabase.getAnalysis(materialId)
}

/**
 * List every material in the database.
 */
export function getAllMaterials(): Material[] {
  return materialDatabase.getAllMaterials()
}
