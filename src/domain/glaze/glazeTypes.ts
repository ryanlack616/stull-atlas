/**
 * Glaze Type Taxonomy
 *
 * Standardized glaze type classification based on Derek Philipau's
 * ceramic-chemistry-visualization project (GPL-3.0).
 * https://github.com/derekphilipau/ceramic-chemistry-visualization
 *
 * Each type has:
 *  - Numeric ID (from Glazy's internal system)
 *  - Display name
 *  - Hex color for plot visualization
 *  - Parent ID for hierarchical grouping
 *  - Keywords for name-based classification
 */

// ── Type Definition ────────────────────────────────────────────

export interface GlazeTypeInfo {
  id: number
  name: string
  color: string
  parentId: number | null
  keywords: string[]     // lowercase patterns matched against glaze name
}

// ── Full Taxonomy ──────────────────────────────────────────────
// Colors from derekphilipau/ceramic-chemistry-visualization/glazecolors

export const GLAZE_TYPE_CATALOG: GlazeTypeInfo[] = [
  // ── Clear / White ──
  { id: 470, name: 'Clear',            color: '#e0e0e0', parentId: null,
    keywords: ['clear', 'transparent glaze', 'clear base'] },
  { id: 480, name: 'White',            color: '#fefef0', parentId: null,
    keywords: ['white', 'off-white', 'porcelain glaze'] },

  // ── Iron ──
  { id: 490, name: 'Iron',             color: '#b22222', parentId: null,
    keywords: ['iron'] },
  { id: 500, name: 'Celadon',          color: '#ace1af', parentId: 490,
    keywords: ['celadon'] },
  { id: 510, name: 'Celadon Blue',     color: '#c4d1e1', parentId: 500,
    keywords: ['blue celadon', 'celadon blue'] },
  { id: 520, name: 'Celadon Green',    color: '#4b945e', parentId: 500,
    keywords: ['green celadon', 'celadon green'] },
  { id: 530, name: 'Celadon Yellow',   color: '#ffdb58', parentId: 500,
    keywords: ['yellow celadon', 'celadon yellow'] },
  { id: 533, name: 'Chun / Jun',       color: '#91a2a3', parentId: 500,
    keywords: ['chun', 'jun'] },
  { id: 535, name: 'Amber',            color: '#ffbf00', parentId: 490,
    keywords: ['amber'] },
  { id: 540, name: 'Tenmoku',          color: '#654321', parentId: 490,
    keywords: ['tenmoku', 'temmoku', 'tianmu', 'temoku'] },
  { id: 550, name: 'Tea Dust',         color: '#6c6517', parentId: 490,
    keywords: ['tea dust'] },
  { id: 560, name: "Hare's Fur",       color: '#63382f', parentId: 490,
    keywords: ["hare's fur", 'hares fur', 'tessha'] },
  { id: 570, name: 'Kaki / Tomato Red',color: '#9b391c', parentId: 490,
    keywords: ['kaki', 'tomato red', 'persimmon'] },
  { id: 580, name: 'Oil Spot',         color: '#3d3b32', parentId: 490,
    keywords: ['oil spot', 'oilspot'] },
  { id: 585, name: 'Iron Slip',        color: '#8e2222', parentId: 490,
    keywords: ['iron slip', 'slip-based iron'] },

  // ── Shino ──
  { id: 590, name: 'Shino',            color: '#efeee7', parentId: null,
    keywords: ['shino'] },
  { id: 600, name: 'Traditional Shino',color: '#e0d7c5', parentId: 590,
    keywords: ['traditional shino'] },
  { id: 610, name: 'Carbon Trap Shino',color: '#de815b', parentId: 590,
    keywords: ['carbon trap'] },
  { id: 620, name: 'High-Alumina Shino', color: '#f4e8d0', parentId: 590,
    keywords: ['high-alumina shino', 'hi alumina shino'] },
  { id: 630, name: 'White Shino',      color: '#f7f3eb', parentId: 590,
    keywords: ['white shino'] },

  // ── Red ──
  { id: 635, name: 'Red',              color: '#ee0000', parentId: null,
    keywords: [] },  // too generic — match via sub-types
  { id: 640, name: 'Copper Red',       color: '#a52927', parentId: 635,
    keywords: ['copper red', 'sang de boeuf'] },
  { id: 650, name: 'Oxblood',          color: '#9d1624', parentId: 640,
    keywords: ['oxblood'] },
  { id: 660, name: 'Flambé',           color: '#ca211f', parentId: 640,
    keywords: ['flambe', 'flambé'] },
  { id: 670, name: 'Peach Bloom',      color: '#c7a09a', parentId: 640,
    keywords: ['peach bloom', 'peachbloom'] },
  { id: 673, name: 'Pink',             color: '#ffc0cb', parentId: 635,
    keywords: ['pink'] },
  { id: 675, name: 'Red Stain',        color: '#ff1515', parentId: 635,
    keywords: ['red stain'] },

  // ── Green ──
  { id: 680, name: 'Green',            color: '#00cc00', parentId: null,
    keywords: [] },  // too generic
  { id: 690, name: 'Copper Green',     color: '#2c7649', parentId: 680,
    keywords: ['copper green'] },
  { id: 700, name: 'Oribe',            color: '#457640', parentId: 680,
    keywords: ['oribe'] },
  { id: 710, name: 'Chrome Green',     color: '#437f3f', parentId: 680,
    keywords: ['chrome green'] },
  { id: 720, name: 'Titanium Green',   color: '#529777', parentId: 680,
    keywords: ['titanium green'] },
  { id: 730, name: 'Nickel Green',     color: '#749686', parentId: 680,
    keywords: ['nickel green'] },
  { id: 740, name: 'Green Stain',      color: '#00ff00', parentId: 680,
    keywords: ['green stain'] },

  // ── Turquoise ──
  { id: 745, name: 'Turquoise',        color: '#40e0d0', parentId: null,
    keywords: ['turquoise', 'egyptian blue', 'alkaline blue'] },

  // ── Blue ──
  { id: 750, name: 'Blue',             color: '#0000ff', parentId: null,
    keywords: [] },  // too generic
  { id: 760, name: 'Cobalt Blue',      color: '#0047ab', parentId: 750,
    keywords: ['cobalt'] },
  { id: 770, name: 'Rutile Blue',      color: '#6c94b6', parentId: 750,
    keywords: ['rutile blue', 'rutile'] },
  { id: 780, name: 'Barium Blue',      color: '#29499c', parentId: 750,
    keywords: ['barium blue'] },
  { id: 790, name: 'Strontium Blue',   color: '#33a8b9', parentId: 750,
    keywords: ['strontium blue'] },
  { id: 800, name: 'Nickel Blue',      color: '#436a92', parentId: 750,
    keywords: ['nickel blue'] },
  { id: 810, name: 'Blue Stain',       color: '#0000cc', parentId: 750,
    keywords: ['blue stain'] },

  // ── Purple ──
  { id: 820, name: 'Purple',           color: '#800080', parentId: null,
    keywords: ['purple', 'violet', 'plum'] },
  { id: 830, name: 'Mag Matte Purple', color: '#a41ca4', parentId: 820,
    keywords: ['magnesium matte purple', 'mag purple'] },
  { id: 840, name: 'Nickel Purple',    color: '#8a0a95', parentId: 820,
    keywords: ['nickel purple'] },
  { id: 850, name: 'Manganese Purple', color: '#5d015d', parentId: 820,
    keywords: ['manganese purple'] },

  // ── Matte ──
  { id: 860, name: 'Matte',            color: '#cccccc', parentId: null,
    keywords: [] },  // handled by surfaceType
  { id: 870, name: 'Magnesium Matte',  color: '#bfbfbf', parentId: 860,
    keywords: ['magnesium matte', 'mag matte', 'dolomite matte'] },

  // ── Black ──
  { id: 880, name: 'Black',            color: '#333333', parentId: null,
    keywords: ['black'] },
  { id: 890, name: 'Black Slip',       color: '#2a1c0e', parentId: 880,
    keywords: ['black slip'] },
  { id: 900, name: 'Black Glossy',     color: '#222222', parentId: 880,
    keywords: ['black gloss', 'glossy black'] },
  { id: 910, name: 'Black Satin',      color: '#111111', parentId: 880,
    keywords: ['black satin'] },

  // ── Yellow ──
  { id: 920, name: 'Yellow',           color: '#ffff00', parentId: null,
    keywords: ['yellow'] },
  { id: 930, name: 'Iron Yellow',      color: '#ffe484', parentId: 920,
    keywords: ['iron yellow'] },
  { id: 940, name: 'Barium Yellow',    color: '#e8d04c', parentId: 920,
    keywords: ['barium yellow'] },
  { id: 950, name: 'Manganese Yellow', color: '#f5ee25', parentId: 920,
    keywords: ['manganese yellow'] },
  { id: 960, name: 'Yellow Stain',     color: '#ffff00', parentId: 920,
    keywords: ['yellow stain'] },
  { id: 970, name: 'Nickel Yellow',    color: '#fff700', parentId: 920,
    keywords: ['nickel yellow'] },

  // ── Crystalline ──
  { id: 980, name: 'Crystalline',      color: '#88ccee', parentId: null,
    keywords: ['crystalline', 'crystal'] },
  { id: 990, name: 'Micro Crystalline',color: '#aaddff', parentId: 980,
    keywords: ['micro crystal'] },
  { id: 1000, name: 'Aventurine',      color: '#cc8844', parentId: 980,
    keywords: ['aventurine'] },
  { id: 1010, name: 'Manganese Crystal', color: '#9955cc', parentId: 980,
    keywords: ['manganese crystal'] },
  { id: 1020, name: 'Macro Crystalline', color: '#77bbdd', parentId: 980,
    keywords: ['macro crystal'] },

  // ── Firing / Process ──
  { id: 1030, name: 'Single-Fire',     color: '#dddddd', parentId: null,
    keywords: ['single fire', 'single-fire', 'raw glaze'] },
  { id: 1040, name: 'Wood',            color: '#8b7355', parentId: null,
    keywords: ['wood fire', 'wood-fire', 'woodfire', 'anagama', 'noborigama'] },
  { id: 1050, name: 'Salt & Soda',     color: '#d4a574', parentId: null,
    keywords: ['salt', 'soda fire', 'soda glaze', 'salt glaze', 'salt & soda'] },
  { id: 1055, name: 'Raku',            color: '#cc6644', parentId: null,
    keywords: ['raku'] },
  { id: 1060, name: 'Ash',             color: '#a0926b', parentId: null,
    keywords: ['ash'] },
  { id: 1070, name: 'Nuka',            color: '#e8e0cc', parentId: 1060,
    keywords: ['nuka'] },
  { id: 1080, name: 'Synthetic Ash',   color: '#bbb49c', parentId: 1060,
    keywords: ['synthetic ash', 'fake ash'] },
  { id: 1090, name: 'Ash Slip',        color: '#8a7e60', parentId: 1060,
    keywords: ['ash slip'] },

  // ── Majolica ──
  { id: 1100, name: 'Majolica',        color: '#ffcc33', parentId: null,
    keywords: ['majolica', 'maiolica'] },

  // ── Specialty ──
  { id: 1130, name: 'Specialty',       color: '#999999', parentId: null,
    keywords: [] },
  { id: 1140, name: 'Crackle',         color: '#ccccdd', parentId: 1130,
    keywords: ['crackle', 'crazing'] },
  { id: 1150, name: 'Crawling',        color: '#bbaa99', parentId: 1130,
    keywords: ['crawl', 'crawling'] },
  { id: 1160, name: 'Crater',          color: '#aa8877', parentId: 1130,
    keywords: ['crater', 'volcanic'] },
  { id: 1170, name: 'Metallic',        color: '#888888', parentId: 1130,
    keywords: ['metallic', 'lustrous', 'lustre', 'luster'] },
]

// ── Lookup Maps ────────────────────────────────────────────────

/** Map from type ID → info */
export const GLAZE_TYPE_BY_ID = new Map<number, GlazeTypeInfo>(
  GLAZE_TYPE_CATALOG.map(t => [t.id, t])
)

/** Map from type name (lowercase) → info */
const TYPE_BY_NAME = new Map<string, GlazeTypeInfo>(
  GLAZE_TYPE_CATALOG.map(t => [t.name.toLowerCase(), t])
)

// ── Top-level categories for UI grouping ──────────────────────

export interface GlazeTypeGroup {
  id: number
  name: string
  color: string
  children: GlazeTypeInfo[]
}

export function getGlazeTypeGroups(): GlazeTypeGroup[] {
  const roots = GLAZE_TYPE_CATALOG.filter(t => t.parentId === null)
  return roots.map(root => ({
    id: root.id,
    name: root.name,
    color: root.color,
    children: GLAZE_TYPE_CATALOG.filter(t => t.parentId === root.id),
  }))
}

// ── Name-Based Classifier ──────────────────────────────────────

// Pre-sorted: longest keywords first so "copper red" matches before "red"
const KEYWORD_INDEX: { keyword: string; typeId: number }[] = GLAZE_TYPE_CATALOG
  .flatMap(t => t.keywords.map(k => ({ keyword: k, typeId: t.id })))
  .sort((a, b) => b.keyword.length - a.keyword.length)

/**
 * Classify a glaze by its name using keyword matching.
 * Returns the most specific type that matches, or null if unclassified.
 *
 * Strategy:
 *  1. Try longest keywords first (more specific wins)
 *  2. First match wins — "blue celadon" matches before "blue"
 *  3. Returns the type ID for use with GLAZE_TYPE_BY_ID
 */
export function classifyGlazeByName(name: string): number | null {
  const lower = name.toLowerCase()
  for (const { keyword, typeId } of KEYWORD_INDEX) {
    if (lower.includes(keyword)) {
      return typeId
    }
  }
  return null
}

/**
 * Get the display name for a glaze type ID.
 */
export function glazeTypeName(typeId: number | null): string {
  if (typeId === null) return 'Unclassified'
  return GLAZE_TYPE_BY_ID.get(typeId)?.name ?? 'Unclassified'
}

/**
 * Get the hex color for a glaze type ID.
 */
export function glazeTypeColor(typeId: number | null): string {
  if (typeId === null) return '#777777'
  return GLAZE_TYPE_BY_ID.get(typeId)?.color ?? '#777777'
}

/**
 * Get the top-level (root) category for a type.
 * Walks up the parent chain.
 */
export function glazeTypeRoot(typeId: number): GlazeTypeInfo | null {
  let current = GLAZE_TYPE_BY_ID.get(typeId)
  while (current && current.parentId !== null) {
    current = GLAZE_TYPE_BY_ID.get(current.parentId)
  }
  return current ?? null
}
