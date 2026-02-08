/**
 * Material and Oxide Analysis Types
 */

import { OxideSymbol } from './umf'
import { MaterialDatasetId } from './glaze'
import { EpistemicState } from './epistemic'

/**
 * Oxide analysis for a material from a specific dataset
 */
export interface OxideAnalysis {
  datasetId: MaterialDatasetId
  datasetName: string
  oxides: Partial<Record<OxideSymbol, number>>  // weight %
  loi: number  // loss on ignition %
  date?: string
  source: string
  confidence: EpistemicState
}

/**
 * A ceramic material with analyses from multiple datasets
 */
export interface Material {
  id: string
  primaryName: string
  aliases: string[]  // all known names
  category: MaterialCategory
  
  // Oxide analyses from different sources
  analyses: Map<MaterialDatasetId, OxideAnalysis>
  
  // Default/preferred analysis to use
  defaultDataset: MaterialDatasetId
  
  // Metadata
  description?: string
  supplier?: string
  discontinued?: boolean
  
  // For material resolution
  searchPatterns?: RegExp[]
}

/**
 * Material categories
 */
export type MaterialCategory =
  | 'feldspar'
  | 'clay'
  | 'silica'
  | 'calcium'
  | 'magnesium'
  | 'frit'
  | 'colorant'
  | 'opacifier'
  | 'flux'
  | 'ash'
  | 'other'

/**
 * Material resolution result
 */
export interface MaterialResolution {
  materialId: string
  material: Material
  confidence: number  // 0-1
  matchedOn: 'exact' | 'alias' | 'pattern' | 'fuzzy'
}

/**
 * Material alias entry for resolution
 */
export interface MaterialAlias {
  canonical: string
  aliases: string[]
  patterns: RegExp[]
}

/**
 * Unresolved material (for import reporting)
 */
export interface UnresolvedMaterial {
  name: string
  occurrences: number
  suggestedMatches: MaterialResolution[]
}
