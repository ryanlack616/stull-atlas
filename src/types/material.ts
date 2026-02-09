/**
 * Material and Oxide Analysis Types
 */

/**
 * A ceramic material.
 * Oxide analyses are stored on MaterialDatabase, not on the Material object.
 */
export interface Material {
  id: string
  primaryName: string
  aliases: string[]  // all known names
  category: MaterialCategory
  
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


