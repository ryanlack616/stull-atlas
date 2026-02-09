/**
 * Digitalfire Reference Library — Data Index
 *
 * Static JSON data extracted from Tony Hansen's Digitalfire Reference Library
 * (digitalfire.com). All content belongs to Tony Hansen / Digitalfire Corp.
 *
 * This data is used to provide contextual knowledge with full attribution
 * and links back to the original source pages at digitalfire.com.
 */

import oxidesData from './oxides.json'
import materialsData from './materials.json'
import glossaryData from './glossary.json'
import troublesData from './troubles.json'
import articlesData from './articles.json'
import testsData from './tests.json'

// ─── Types ──────────────────────────────────────────────────────

export interface DigitalfireOxide {
  formula: string
  title: string
  description: string
  excerpt: string
  url: string
}

export interface DigitalfireMaterial {
  name: string
  altNames: string
  description: string
  excerpt: string
  url: string
}

export interface DigitalfireGlossary {
  term: string
  keywords: string
  description: string
  excerpt: string
  url: string
}

export interface DigitalfireTrouble {
  term: string
  description: string
  excerpt: string
  url: string
}

export interface DigitalfireArticle {
  title: string
  description: string
  excerpt: string
  url: string
}

export interface DigitalfireTest {
  title: string
  description: string
  excerpt: string
  url: string
}

/** A reference link back to digitalfire.com with attribution */
export interface DigitalfireRef {
  title: string
  excerpt: string
  url: string
  category: 'oxide' | 'material' | 'glossary' | 'trouble' | 'article' | 'test'
}

// ─── Data ───────────────────────────────────────────────────────

export const oxides = oxidesData as DigitalfireOxide[]
export const materials = materialsData as DigitalfireMaterial[]
export const glossary = glossaryData as DigitalfireGlossary[]
export const troubles = troublesData as DigitalfireTrouble[]
export const articles = articlesData as DigitalfireArticle[]
export const tests = testsData as DigitalfireTest[]

// ─── Attribution (re-export from isolated module) ──────────────

export { DIGITALFIRE_ATTRIBUTION } from './attribution'
