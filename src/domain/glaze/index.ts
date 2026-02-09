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
  importGlazesFromXML,
  importGlazesFromFile,
  // UMF
  calculateAllUMF,
  // similarity
  findSimilarGlazes,
} from './glazeService'

export type { SimilarityResult, SimilarityOptions } from './glazeService'

// Glaze type taxonomy
export {
  GLAZE_TYPE_CATALOG,
  GLAZE_TYPE_BY_ID,
  getGlazeTypeGroups,
  classifyGlazeByName,
  glazeTypeName,
  glazeTypeColor,
  glazeTypeRoot,
} from './glazeTypes'

export type { GlazeTypeInfo, GlazeTypeGroup } from './glazeTypes'
