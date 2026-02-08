/**
 * Glaze Data (façade)
 *
 * Re-exports everything from the new infra + domain layers
 * so existing `@/data/glazes` imports keep working during migration.
 *
 * New code should import from `@/domain/glaze` or `@/infra/glazes` directly.
 *
 * @deprecated Import from `@/domain/glaze` instead
 */

// Infra (raw loaders + serialization)
export { loadSampleGlazes, loadGlazyDataset } from '@/infra/glazes'
export { deserializeGlazesJSON, serializeGlazesJSON, deserializeGlazesCSV } from '@/infra/glazes'

// Domain (high-level operations)
export {
  importGlazesFromJSON,
  exportGlazesToJSON,
  importGlazesFromCSV,
  calculateAllUMF,
  findSimilarGlazes,
} from '@/domain/glaze'

// Legacy re-exports (match old function names exactly for backward compat)
export type { SimilarityResult, SimilarityOptions } from '@/domain/glaze'
