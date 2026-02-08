/**
 * Domain / Glaze
 *
 * High-level glaze operations for the app:
 *   - loading datasets
 *   - import / export
 *   - UMF calculation
 *   - similarity search
 */

export {
  // data loading
  loadSampleGlazes,
  loadGlazyDataset,
  // import/export
  importGlazesFromJSON,
  exportGlazesToJSON,
  importGlazesFromCSV,
  // UMF
  calculateAllUMF,
  // similarity
  findSimilarGlazes,
} from './glazeService'

export type { SimilarityResult, SimilarityOptions } from './glazeService'
