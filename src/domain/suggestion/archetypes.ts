/**
 * Glaze Archetype Knowledge Base
 *
 * Maps glaze names / styles / traditions to their characteristic oxide chemistry.
 * Compiled from Digitalfire, Hamer & Hamer, John Britt, Matt Katz, ceramic literature.
 *
 * Each archetype defines:
 *   - UMF target ranges (the chemistry that defines the look)
 *   - Cone range (where it works)
 *   - Atmosphere (oxidation, reduction, or both)
 *   - Key ingredients that create the effect
 *   - Description for the user
 *
 * Philosophy: This is NOT an AI model — it's a curated lookup table backed by
 * decades of ceramic chemistry knowledge. The "intelligence" is in the matching
 * and optimization, not in a neural network.
 */

import { OxideSymbol, Atmosphere, SurfaceType } from '@/types'
import type { OxideTarget } from '@/calculator/optimizer'

// ─── Types ─────────────────────────────────────────────────────

export interface GlazeArchetype {
  /** Unique key */
  id: string
  /** Human-readable name */
  name: string
  /** Alternative names for matching */
  aliases: string[]
  /** What family this belongs to */
  family: GlazeFamily
  /** Description shown to user */
  description: string
  /** UMF targets that define this glaze */
  targets: OxideTarget[]
  /** Cone range where this glaze works */
  coneRange: [number, number]
  /** Preferred atmosphere */
  atmosphere: Atmosphere | 'either'
  /** Expected surface */
  surface: SurfaceType
  /** Material categories / specific materials that create this effect */
  keyMaterials: string[]
  /** Colorant additions (material-id → typical %) */
  colorants?: Record<string, { min: number; max: number }>
  /** Additional notes for the suggestion */
  notes?: string
  /** Tags for search matching */
  tags: string[]
}

export type GlazeFamily =
  | 'celadon'
  | 'tenmoku'
  | 'shino'
  | 'ash'
  | 'crystalline'
  | 'majolica'
  | 'raku'
  | 'salt'
  | 'reduction'
  | 'clear'
  | 'matte'
  | 'satin'
  | 'gloss'
  | 'rutile'
  | 'copper'
  | 'iron'
  | 'wood'
  | 'slip'
  | 'functional'
  | 'specialty'

// ─── Knowledge Base ─────────────────────────────────────────────

export const GLAZE_ARCHETYPES: GlazeArchetype[] = [
  // ── Celadons ──────────────────────────────────────────────

  {
    id: 'celadon-cone10-reduction',
    name: 'Celadon (Cone 10 Reduction)',
    aliases: ['celadon', 'green celadon', 'jade', 'qingci', 'chinese celadon', 'korean celadon'],
    family: 'celadon',
    description:
      'Classic Asian celadon — pale jade-green from 1-3% iron oxide in a high-silica, high-alumina base fired in reduction. The iron reduces to FeO, giving the characteristic blue-green.',
    targets: [
      { oxide: 'SiO2', min: 3.5, max: 4.5, weight: 3 },
      { oxide: 'Al2O3', min: 0.35, max: 0.55, weight: 3 },
      { oxide: 'CaO', min: 0.4, max: 0.65, weight: 2 },
      { oxide: 'K2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'Na2O', min: 0.05, max: 0.15, weight: 1 },
      { oxide: 'MgO', min: 0.0, max: 0.1, weight: 1 },
    ],
    coneRange: [9, 12],
    atmosphere: 'reduction',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'ball-clay'],
    colorants: {
      'red-iron-oxide': { min: 1.0, max: 3.0 },
    },
    notes: 'Must fire in reduction for blue-green color. Oxidation gives amber/olive.',
    tags: ['celadon', 'green', 'jade', 'blue-green', 'asian', 'traditional', 'iron', 'reduction', 'stoneware', 'porcelain'],
  },

  {
    id: 'celadon-cone6-oxidation',
    name: 'Celadon (Cone 6 Oxidation)',
    aliases: ['cone 6 celadon', 'fake celadon', 'faux celadon', 'oxidation celadon'],
    family: 'celadon',
    description:
      'Cone 6 oxidation celadon approximation — uses small amounts of chrome or copper for green tones instead of traditional iron reduction. Or iron with calcium borate flux.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 4.0, weight: 3 },
      { oxide: 'Al2O3', min: 0.25, max: 0.4, weight: 3 },
      { oxide: 'CaO', min: 0.3, max: 0.5, weight: 2 },
      { oxide: 'Na2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'B2O3', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'oxidation',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'ferro-frit-3134'],
    colorants: {
      'chrome-oxide': { min: 0.1, max: 0.5 },
    },
    notes: 'Won\'t look exactly like a cone 10 reduction celadon but can be close with the right colorants.',
    tags: ['celadon', 'green', 'cone 6', 'oxidation', 'mid-fire'],
  },

  // ── Tenmoku / Iron Glazes ──────────────────────────────────

  {
    id: 'tenmoku-classic',
    name: 'Tenmoku (Classic)',
    aliases: ['tenmoku', 'temmoku', 'temoku', 'jian', 'hare\'s fur', 'oil spot'],
    family: 'tenmoku',
    description:
      'Classic tenmoku — saturated iron glaze (8-12% iron) producing deep brown-black with possible hare\'s fur or oil spot effects. High calcium, moderate silica.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 4.0, weight: 2 },
      { oxide: 'Al2O3', min: 0.3, max: 0.45, weight: 2 },
      { oxide: 'CaO', min: 0.5, max: 0.7, weight: 3 },
      { oxide: 'K2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'MgO', min: 0.0, max: 0.15, weight: 1 },
    ],
    coneRange: [9, 11],
    atmosphere: 'reduction',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'ball-clay'],
    colorants: {
      'red-iron-oxide': { min: 8.0, max: 13.0 },
    },
    notes: 'Oil spot effect requires 10-12% iron and specific firing schedule. Hare\'s fur at 8-10%.',
    tags: ['tenmoku', 'temmoku', 'iron', 'brown', 'black', 'hares fur', 'oil spot', 'jian', 'japanese', 'chinese'],
  },

  {
    id: 'iron-saturate-cone6',
    name: 'Iron Saturate (Cone 6)',
    aliases: ['iron red', 'iron saturate', 'cone 6 tenmoku', 'amber', 'honey'],
    family: 'iron',
    description:
      'Mid-fire iron-saturated glaze producing amber, honey, or red-brown depending on thickness and iron amount.',
    targets: [
      { oxide: 'SiO2', min: 2.8, max: 3.8, weight: 2 },
      { oxide: 'Al2O3', min: 0.25, max: 0.4, weight: 2 },
      { oxide: 'CaO', min: 0.3, max: 0.5, weight: 2 },
      { oxide: 'Na2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'B2O3', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'oxidation',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'ferro-frit-3134'],
    colorants: {
      'red-iron-oxide': { min: 4.0, max: 10.0 },
    },
    tags: ['iron', 'amber', 'honey', 'brown', 'red', 'cone 6', 'saturate'],
  },

  // ── Shino ──────────────────────────────────────────────────

  {
    id: 'shino-traditional',
    name: 'Shino (Traditional)',
    aliases: ['shino', 'american shino', 'carbon trap shino', 'white shino'],
    family: 'shino',
    description:
      'High soda feldspar glaze with thick, crawling white surface. Characteristic orange flash from carbon trapping. Very high Na2O, low alumina typical.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 4.5, weight: 2 },
      { oxide: 'Al2O3', min: 0.2, max: 0.5, weight: 2 },
      { oxide: 'Na2O', min: 0.4, max: 0.8, weight: 3 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'CaO', min: 0.0, max: 0.15, weight: 1 },
    ],
    coneRange: [9, 12],
    atmosphere: 'reduction',
    surface: 'satin',
    keyMaterials: ['nepheline-syenite', 'spodumene', 'soda-ash', 'epk', 'ball-clay', 'silica'],
    notes: 'Apply thick. Carbon trapping requires heavy reduction early in the firing.',
    tags: ['shino', 'white', 'orange', 'carbon trap', 'crawl', 'japanese', 'soda', 'alkali'],
  },

  // ── Ash Glazes ─────────────────────────────────────────────

  {
    id: 'ash-glaze-natural',
    name: 'Natural Ash Glaze',
    aliases: ['ash glaze', 'wood ash', 'natural ash', 'nuka'],
    family: 'ash',
    description:
      'Wood ash provides calcium, potassium, phosphorus, and silica. Produces warm, varied surfaces with subtle greens/browns. Typically 40-50% ash + feldspar + clay.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 4.5, weight: 2 },
      { oxide: 'Al2O3', min: 0.25, max: 0.45, weight: 2 },
      { oxide: 'CaO', min: 0.4, max: 0.7, weight: 3 },
      { oxide: 'K2O', min: 0.1, max: 0.3, weight: 1 },
      { oxide: 'MgO', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'P2O5', min: 0.01, max: 0.1, weight: 1 },
    ],
    coneRange: [9, 13],
    atmosphere: 'either',
    surface: 'satin',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'dolomite'],
    notes: 'Natural ash is variable — washing helps consistency. Bone ash can substitute for P2O5.',
    tags: ['ash', 'wood', 'natural', 'nuka', 'warm', 'earth', 'green', 'brown', 'phosphorus'],
  },

  // ── Crystalline ────────────────────────────────────────────

  {
    id: 'crystalline-zinc',
    name: 'Crystalline (Zinc)',
    aliases: ['crystalline', 'crystal glaze', 'macro crystalline', 'zinc crystal'],
    family: 'crystalline',
    description:
      'Zinc silicate crystals grown during controlled cooling. Very high ZnO (0.3-0.5), high SiO2, near-zero alumina (Al2O3 < 0.1 prevents crystal nucleation).',
    targets: [
      { oxide: 'SiO2', min: 3.5, max: 5.0, weight: 2 },
      { oxide: 'Al2O3', min: 0.0, max: 0.08, weight: 5 },
      { oxide: 'ZnO', min: 0.3, max: 0.55, weight: 4 },
      { oxide: 'CaO', min: 0.1, max: 0.3, weight: 1 },
      { oxide: 'Na2O', min: 0.1, max: 0.3, weight: 1 },
      { oxide: 'B2O3', min: 0.0, max: 0.15, weight: 1 },
    ],
    coneRange: [8, 11],
    atmosphere: 'oxidation',
    surface: 'crystalline',
    keyMaterials: ['zinc-oxide', 'silica', 'ferro-frit-3110', 'lithium-carbonate'],
    colorants: {
      'nickel-oxide': { min: 1.0, max: 3.0 },
      'copper-carbonate': { min: 1.0, max: 3.0 },
      'cobalt-carbonate': { min: 0.5, max: 2.0 },
      'manganese-dioxide': { min: 2.0, max: 5.0 },
      'titanium-dioxide': { min: 2.0, max: 5.0 },
    },
    notes: 'Requires controlled cooling schedule — hold at 1040°C for 2-4 hours for crystal growth. Extremely runny — use a catch basin. Very low or zero alumina is critical.',
    tags: ['crystalline', 'crystal', 'zinc', 'macro', 'large', 'flowers', 'science', 'technical'],
  },

  // ── Majolica / Tin Glazes ──────────────────────────────────

  {
    id: 'majolica-traditional',
    name: 'Majolica (Tin Glaze)',
    aliases: ['majolica', 'maiolica', 'tin glaze', 'faience', 'delft'],
    family: 'majolica',
    description:
      'Low-fire white opaque glaze using tin oxide as opacifier. Classic base for overglaze decoration. High alkali, moderate boron.',
    targets: [
      { oxide: 'SiO2', min: 1.5, max: 2.8, weight: 2 },
      { oxide: 'Al2O3', min: 0.05, max: 0.2, weight: 2 },
      { oxide: 'B2O3', min: 0.3, max: 0.6, weight: 2 },
      { oxide: 'Na2O', min: 0.3, max: 0.5, weight: 2 },
      { oxide: 'CaO', min: 0.1, max: 0.3, weight: 1 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [-6, 2],
    atmosphere: 'oxidation',
    surface: 'gloss',
    keyMaterials: ['ferro-frit-3124', 'ferro-frit-3134', 'silica', 'epk'],
    colorants: {
      'tin-oxide': { min: 5.0, max: 10.0 },
    },
    notes: 'Tin oxide at 5-10% gives opacity. Can substitute zircopax (10-15%) for tin.',
    tags: ['majolica', 'maiolica', 'tin', 'white', 'opaque', 'low fire', 'earthenware', 'decorative', 'faience', 'delft'],
  },

  // ── Clear / Transparent ────────────────────────────────────

  {
    id: 'clear-cone6',
    name: 'Clear Gloss (Cone 6)',
    aliases: ['clear', 'transparent', 'clear gloss', 'liner', 'cone 6 clear'],
    family: 'clear',
    description:
      'Workhorse clear glaze for mid-fire. Balanced flux, medium-high silica. Reliable base for stains and oxides.',
    targets: [
      { oxide: 'SiO2', min: 3.2, max: 4.0, weight: 3 },
      { oxide: 'Al2O3', min: 0.3, max: 0.4, weight: 3 },
      { oxide: 'CaO', min: 0.3, max: 0.5, weight: 2 },
      { oxide: 'Na2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'B2O3', min: 0.05, max: 0.15, weight: 1 },
      { oxide: 'MgO', min: 0.0, max: 0.15, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'either',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'talc', 'ferro-frit-3134'],
    tags: ['clear', 'transparent', 'gloss', 'functional', 'liner', 'cone 6', 'base'],
  },

  {
    id: 'clear-cone10',
    name: 'Clear Gloss (Cone 10)',
    aliases: ['cone 10 clear', 'high fire clear', 'porcelain clear'],
    family: 'clear',
    description:
      'High-fire clear — fewer fluxes needed since the temperature does the work. Feldspar-heavy with silica and whiting.',
    targets: [
      { oxide: 'SiO2', min: 3.5, max: 4.5, weight: 3 },
      { oxide: 'Al2O3', min: 0.35, max: 0.5, weight: 3 },
      { oxide: 'CaO', min: 0.4, max: 0.6, weight: 2 },
      { oxide: 'K2O', min: 0.15, max: 0.3, weight: 2 },
      { oxide: 'Na2O', min: 0.05, max: 0.15, weight: 1 },
    ],
    coneRange: [9, 11],
    atmosphere: 'either',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk'],
    tags: ['clear', 'transparent', 'gloss', 'cone 10', 'high fire', 'porcelain'],
  },

  {
    id: 'clear-lowfire',
    name: 'Clear Gloss (Low Fire)',
    aliases: ['low fire clear', 'earthenware clear', 'cone 06 clear'],
    family: 'clear',
    description:
      'Low-fire clear — relies on boron frits for melting. Standard earthenware liner glaze.',
    targets: [
      { oxide: 'SiO2', min: 1.8, max: 2.8, weight: 2 },
      { oxide: 'Al2O3', min: 0.1, max: 0.25, weight: 2 },
      { oxide: 'B2O3', min: 0.3, max: 0.6, weight: 3 },
      { oxide: 'Na2O', min: 0.25, max: 0.45, weight: 2 },
      { oxide: 'CaO', min: 0.1, max: 0.4, weight: 1 },
    ],
    coneRange: [-6, 1],
    atmosphere: 'oxidation',
    surface: 'gloss',
    keyMaterials: ['ferro-frit-3134', 'ferro-frit-3124', 'silica', 'epk'],
    tags: ['clear', 'transparent', 'gloss', 'low fire', 'earthenware', 'frit', 'boron'],
  },

  // ── Matte Glazes ───────────────────────────────────────────

  {
    id: 'matte-cone6-magnesia',
    name: 'Magnesia Matte (Cone 6)',
    aliases: ['magnesia matte', 'dolomite matte', 'buttery matte', 'satin matte'],
    family: 'matte',
    description:
      'Smooth, buttery matte from high MgO. Dolomite or talc provide the magnesia. Silky surface, excellent for layering.',
    targets: [
      { oxide: 'SiO2', min: 2.8, max: 3.5, weight: 2 },
      { oxide: 'Al2O3', min: 0.35, max: 0.55, weight: 2 },
      { oxide: 'MgO', min: 0.2, max: 0.4, weight: 3 },
      { oxide: 'CaO', min: 0.2, max: 0.4, weight: 2 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'Na2O', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'either',
    surface: 'matte',
    keyMaterials: ['custer-feldspar', 'silica', 'dolomite', 'talc', 'epk', 'whiting'],
    tags: ['matte', 'magnesia', 'dolomite', 'talc', 'buttery', 'smooth', 'cone 6', 'satin'],
  },

  {
    id: 'matte-cone6-calcium',
    name: 'Calcium Matte (Cone 6)',
    aliases: ['calcium matte', 'lime matte', 'whiting matte'],
    family: 'matte',
    description:
      'Higher alumina, higher calcium produces a dry matte from devitrification. More textured than magnesia mattes.',
    targets: [
      { oxide: 'SiO2', min: 2.5, max: 3.2, weight: 2 },
      { oxide: 'Al2O3', min: 0.4, max: 0.6, weight: 3 },
      { oxide: 'CaO', min: 0.5, max: 0.7, weight: 3 },
      { oxide: 'K2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'MgO', min: 0.0, max: 0.1, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'either',
    surface: 'matte',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'wollastonite'],
    tags: ['matte', 'calcium', 'lime', 'dry', 'textured', 'cone 6'],
  },

  {
    id: 'matte-cone10',
    name: 'Matte (Cone 10)',
    aliases: ['cone 10 matte', 'high fire matte', 'stoneware matte'],
    family: 'matte',
    description:
      'High-fire matte — excess alumina relative to silica creates a dry, velvety surface. Classic stoneware look.',
    targets: [
      { oxide: 'SiO2', min: 2.8, max: 3.8, weight: 2 },
      { oxide: 'Al2O3', min: 0.5, max: 0.75, weight: 3 },
      { oxide: 'CaO', min: 0.4, max: 0.6, weight: 2 },
      { oxide: 'K2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'MgO', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [9, 11],
    atmosphere: 'either',
    surface: 'matte',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'dolomite'],
    tags: ['matte', 'cone 10', 'high fire', 'stoneware', 'dry', 'velvety'],
  },

  // ── Copper Glazes ──────────────────────────────────────────

  {
    id: 'copper-red',
    name: 'Copper Red (Sang de Boeuf)',
    aliases: ['copper red', 'sang de boeuf', 'oxblood', 'flambe', 'jun', 'lang'],
    family: 'copper',
    description:
      'Blood red from colloidal copper in heavy reduction. Very finicky — needs low alumina, alkaline flux, and precise reduction timing.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 4.0, weight: 2 },
      { oxide: 'Al2O3', min: 0.2, max: 0.35, weight: 3 },
      { oxide: 'CaO', min: 0.3, max: 0.5, weight: 2 },
      { oxide: 'Na2O', min: 0.15, max: 0.35, weight: 2 },
      { oxide: 'K2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'B2O3', min: 0.1, max: 0.3, weight: 2 },
    ],
    coneRange: [9, 11],
    atmosphere: 'reduction',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'ferro-frit-3134', 'bone-ash'],
    colorants: {
      'copper-carbonate': { min: 0.5, max: 2.0 },
      'tin-oxide': { min: 1.0, max: 3.0 },
    },
    notes: 'Tin oxide helps develop red. 1% copper typical. Boron flux helps. Heavy reduction between 1000-1100°C crucial.',
    tags: ['copper', 'red', 'sang de boeuf', 'oxblood', 'flambe', 'reduction', 'technical', 'chinese'],
  },

  {
    id: 'copper-green-cone6',
    name: 'Copper Green (Cone 6)',
    aliases: ['copper green', 'verdigris', 'patina green'],
    family: 'copper',
    description:
      'Bright copper green in oxidation. Works well at cone 6 with alkaline flux.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 3.8, weight: 2 },
      { oxide: 'Al2O3', min: 0.25, max: 0.4, weight: 2 },
      { oxide: 'CaO', min: 0.25, max: 0.45, weight: 2 },
      { oxide: 'Na2O', min: 0.15, max: 0.3, weight: 2 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'B2O3', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'oxidation',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'ferro-frit-3134'],
    colorants: {
      'copper-carbonate': { min: 2.0, max: 5.0 },
    },
    tags: ['copper', 'green', 'cone 6', 'oxidation', 'bright'],
  },

  // ── Rutile Glazes ──────────────────────────────────────────

  {
    id: 'rutile-blue',
    name: 'Rutile Blue',
    aliases: ['rutile blue', 'floating blue', 'blue rutile'],
    family: 'rutile',
    description:
      'Striking blue/tan variegation from rutile (TiO2) in a magnesia-flux base. The rutile causes phase separation and light scatter.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 3.8, weight: 2 },
      { oxide: 'Al2O3', min: 0.3, max: 0.45, weight: 2 },
      { oxide: 'MgO', min: 0.15, max: 0.35, weight: 3 },
      { oxide: 'CaO', min: 0.25, max: 0.45, weight: 2 },
      { oxide: 'Na2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'either',
    surface: 'satin',
    keyMaterials: ['custer-feldspar', 'silica', 'dolomite', 'talc', 'epk', 'whiting'],
    colorants: {
      'rutile': { min: 3.0, max: 6.0 },
      'cobalt-carbonate': { min: 0.5, max: 2.0 },
    },
    notes: 'The blue comes from cobalt + rutile interaction. Without cobalt, rutile alone gives tan/amber.',
    tags: ['rutile', 'blue', 'floating', 'variegated', 'magnesia', 'cone 6'],
  },

  // ── Specialty Glazes ───────────────────────────────────────

  {
    id: 'chun-jun',
    name: 'Chun / Jun Blue',
    aliases: ['chun', 'jun', 'opalescent', 'phosphorus blue', 'blue chun'],
    family: 'specialty',
    description:
      'Opalescent blue from phosphorus-induced phase separation. High P2O5 (from bone ash) creates milky blue opalescence in a high-fire base.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 4.5, weight: 2 },
      { oxide: 'Al2O3', min: 0.25, max: 0.45, weight: 2 },
      { oxide: 'CaO', min: 0.4, max: 0.65, weight: 2 },
      { oxide: 'K2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'P2O5', min: 0.05, max: 0.15, weight: 3 },
    ],
    coneRange: [9, 11],
    atmosphere: 'reduction',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'bone-ash'],
    colorants: {
      'copper-carbonate': { min: 0.3, max: 1.0 },
    },
    notes: 'Bone ash at 5-10% provides the P2O5. Very sensitive to thickness — thin areas clear, thick areas opalescent.',
    tags: ['chun', 'jun', 'blue', 'opalescent', 'phosphorus', 'bone ash', 'chinese', 'song'],
  },

  {
    id: 'cobalt-blue',
    name: 'Cobalt Blue',
    aliases: ['cobalt blue', 'blue', 'cobalt', 'traditional blue'],
    family: 'specialty',
    description:
      'Classic cobalt blue — works at any temperature. 0.5-2% cobalt gives reliable blue in almost any base glaze.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 4.0, weight: 2 },
      { oxide: 'Al2O3', min: 0.3, max: 0.45, weight: 2 },
      { oxide: 'CaO', min: 0.3, max: 0.55, weight: 2 },
      { oxide: 'K2O', min: 0.1, max: 0.25, weight: 1 },
      { oxide: 'Na2O', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 11],
    atmosphere: 'either',
    surface: 'gloss',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk'],
    colorants: {
      'cobalt-carbonate': { min: 0.5, max: 2.0 },
    },
    notes: 'Cobalt is very strong — start with 0.5%. Zinc or magnesia can shift the shade.',
    tags: ['cobalt', 'blue', 'reliable', 'any temperature', 'classic'],
  },

  {
    id: 'white-satin-cone6',
    name: 'White Satin (Cone 6)',
    aliases: ['white satin', 'satin white', 'silky white', 'porcelain white'],
    family: 'satin',
    description:
      'Soft, silky white with a gentle satin sheen. Balanced between matte and gloss — the modern functional pottery favorite.',
    targets: [
      { oxide: 'SiO2', min: 3.0, max: 3.8, weight: 2 },
      { oxide: 'Al2O3', min: 0.35, max: 0.5, weight: 3 },
      { oxide: 'CaO', min: 0.25, max: 0.45, weight: 2 },
      { oxide: 'MgO', min: 0.1, max: 0.25, weight: 2 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
      { oxide: 'Na2O', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 7],
    atmosphere: 'either',
    surface: 'satin',
    keyMaterials: ['custer-feldspar', 'silica', 'whiting', 'epk', 'talc', 'zinc-oxide'],
    colorants: {
      'zircopax': { min: 5.0, max: 12.0 },
    },
    notes: 'Add 5-10% zircopax for extra whiteness, but it can work without.',
    tags: ['white', 'satin', 'smooth', 'functional', 'cone 6', 'pottery'],
  },

  {
    id: 'crawl-texture',
    name: 'Crawl / Lichen Texture',
    aliases: ['crawl', 'lichen', 'texture', 'volcanic', 'crater'],
    family: 'specialty',
    description:
      'Intentional crawling/beading for decorative texture. High magnesia + high alumina + thick application promotes crawl.',
    targets: [
      { oxide: 'SiO2', min: 2.2, max: 3.0, weight: 2 },
      { oxide: 'Al2O3', min: 0.5, max: 0.8, weight: 3 },
      { oxide: 'MgO', min: 0.3, max: 0.5, weight: 3 },
      { oxide: 'CaO', min: 0.1, max: 0.3, weight: 1 },
      { oxide: 'K2O', min: 0.05, max: 0.2, weight: 1 },
    ],
    coneRange: [5, 10],
    atmosphere: 'either',
    surface: 'crawl',
    keyMaterials: ['epk', 'ball-clay', 'magnesium-carbonate', 'talc', 'custer-feldspar', 'silica'],
    notes: 'Apply very thick (double or triple normal thickness). Magnesium carbonate in raw form promotes maximum crawl.',
    tags: ['crawl', 'lichen', 'texture', 'volcanic', 'crater', 'decorative', 'thick'],
  },


]

// ─── Lookup Helpers ─────────────────────────────────────────────

/**
 * Find archetypes matching a text query.
 * Searches name, aliases, tags, and description.
 */
export function findArchetypes(query: string): GlazeArchetype[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  const scored = GLAZE_ARCHETYPES.map(arch => {
    let score = 0

    for (const term of terms) {
      // Exact name match — strongest signal
      if (arch.name.toLowerCase().includes(term)) score += 10
      // Alias match
      if (arch.aliases.some(a => a.includes(term))) score += 8
      // Tag match
      if (arch.tags.some(t => t.includes(term))) score += 5
      // Family match
      if (arch.family.includes(term)) score += 6
      // Description match
      if (arch.description.toLowerCase().includes(term)) score += 2
    }

    return { archetype: arch, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.archetype)
}

/**
 * Get all archetypes for a given cone range.
 */
export function archetypesForCone(cone: number): GlazeArchetype[] {
  return GLAZE_ARCHETYPES.filter(a => cone >= a.coneRange[0] && cone <= a.coneRange[1])
}
