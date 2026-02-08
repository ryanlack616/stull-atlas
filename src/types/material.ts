/**
 * Material and Oxide Analysis Types
 */

import { MaterialDatasetId } from './glaze'

/**
 * A ceramic material with analyses from multiple datasets.
 * Oxide analyses are stored on MaterialDatabase, not on the Material object.
 */
export interface Material {
  id: string
  primaryName: string
  aliases: string[]  // all known names
  category: MaterialCategory
  
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


