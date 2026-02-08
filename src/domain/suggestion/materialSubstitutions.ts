/**
 * Material Substitutions
 *
 * When a user doesn't have a specific material, suggest alternatives
 * that fill a similar role in the recipe. Grouped by material function
 * (flux, glass-former, alumina source, etc.).
 */

export interface MaterialSubstitution {
  /** Original material name */
  original: string
  /** Suggested replacement */
  substitute: string
  /** How to adjust the amount (e.g., "use 95% of the original amount") */
  adjustment: string
  /** Brief explanation of why this works */
  reason: string
  /** How close the substitution is (1 = nearly identical, 3 = rough approximation) */
  quality: 1 | 2 | 3
}

interface SubGroup {
  /** Human-readable category */
  category: string
  /** Materials in this equivalence group, with relative substitution ratios */
  members: Array<{
    name: string
    /** Array of alternate common names */
    aliases: string[]
    /** Substitution multiplier relative to the first member of the group */
    ratio: number
    /** Notes on chemistry differences */
    notes?: string
  }>
}

// ── Substitution groups ────────────────────────────────────────

const SUBSTITUTION_GROUPS: SubGroup[] = [
  // ─ Potash Feldspars ─
  {
    category: 'Potash Feldspar',
    members: [
      { name: 'Custer Feldspar', aliases: ['Custer'], ratio: 1.0 },
      { name: 'G-200 Feldspar', aliases: ['G200', 'G-200'], ratio: 1.0, notes: 'Slightly higher K₂O' },
      { name: 'G-200 HP', aliases: ['G200HP', 'G-200 HP'], ratio: 1.0 },
      { name: 'Minspar 200', aliases: ['Minspar'], ratio: 1.0, notes: 'Slightly more Na₂O than Custer' },
      { name: 'Mahavir Feldspar', aliases: ['Mahavir'], ratio: 1.0 },
    ],
  },
  // ─ Soda Feldspars ─
  {
    category: 'Soda Feldspar',
    members: [
      { name: 'Nepheline Syenite', aliases: ['Neph Sy', 'Nepheline'], ratio: 0.75, notes: 'Much higher in Na₂O, melts more aggressively — reduce by ~25%' },
      { name: 'F-4 Feldspar', aliases: ['F4'], ratio: 1.0 },
      { name: 'Kona F-4', aliases: ['Kona'], ratio: 1.0 },
    ],
  },
  // ─ China Clays / Kaolins ─
  {
    category: 'Kaolin / China Clay',
    members: [
      { name: 'EPK Kaolin', aliases: ['EPK', 'Edgar Plastic Kaolin'], ratio: 1.0 },
      { name: 'Grolleg Kaolin', aliases: ['Grolleg'], ratio: 1.0, notes: 'Whiter, less plastic. Preferred for porcelain.' },
      { name: 'Tile #6', aliases: ['Tile 6'], ratio: 1.0, notes: 'More plastic. May shrink slightly more.' },
      { name: 'Helmer Kaolin', aliases: ['Helmer'], ratio: 1.0 },
      { name: 'Calcined Kaolin', aliases: ['Glomax'], ratio: 1.0, notes: 'No plasticity. Used when shrinkage must be minimized.' },
    ],
  },
  // ─ Ball Clays ─
  {
    category: 'Ball Clay',
    members: [
      { name: 'OM-4 Ball Clay', aliases: ['OM4', 'OM-4'], ratio: 1.0 },
      { name: 'Old Hickory #5', aliases: ['Old Hickory'], ratio: 1.0 },
      { name: 'XX Sagger', aliases: ['XX Sagger Ball Clay'], ratio: 1.0 },
      { name: 'Foundry Hill Creme', aliases: ['FHC'], ratio: 1.0, notes: 'Lower iron than OM-4' },
    ],
  },
  // ─ Silica ─
  {
    category: 'Silica',
    members: [
      { name: 'Silica', aliases: ['Flint', 'Quartz', 'SiO₂'], ratio: 1.0 },
      { name: 'Fine Silica', aliases: ['200 mesh silica'], ratio: 1.0, notes: 'Finer grind dissolves faster into the melt' },
    ],
  },
  // ─ Whiting / Calcium Sources ─
  {
    category: 'Calcium Source',
    members: [
      { name: 'Whiting', aliases: ['Calcium Carbonate', 'CaCO₃'], ratio: 1.0 },
      { name: 'Wollastonite', aliases: ['CaSiO₃'], ratio: 1.4, notes: 'Also adds SiO₂ — adjust silica down. No LOI (no gas release).' },
      { name: 'Dolomite', aliases: [], ratio: 1.0, notes: 'Also brings MgO — adds a different quality to the melt.' },
    ],
  },
  // ─ Talc / MgO Sources ─
  {
    category: 'Magnesium Source',
    members: [
      { name: 'Talc', aliases: ['Magnesium Silicate'], ratio: 1.0 },
      { name: 'Dolomite', aliases: [], ratio: 0.8, notes: 'Also brings CaO.' },
      { name: 'Magnesium Carbonate', aliases: ['MgCO₃', 'Mag Carb'], ratio: 0.45, notes: 'Pure MgO source. Higher LOI.' },
    ],
  },
  // ─ Frits ─
  {
    category: 'Boron Frit',
    members: [
      { name: 'Ferro Frit 3134', aliases: ['Frit 3134', 'FF3134'], ratio: 1.0, notes: 'High boron, no alumina. Major low/mid-fire flux.' },
      { name: 'Ferro Frit 3124', aliases: ['Frit 3124', 'FF3124'], ratio: 1.0, notes: 'Contains alumina. Less fluid than 3134.' },
      { name: 'Ferro Frit 3195', aliases: ['Frit 3195', 'FF3195'], ratio: 0.95, notes: 'Similar to 3124 but slightly different soda/boron balance.' },
    ],
  },
  // ─ Alumina Hydrate / Calcined Alumina ─
  {
    category: 'Alumina Source',
    members: [
      { name: 'Alumina Hydrate', aliases: ['Al(OH)₃'], ratio: 1.0 },
      { name: 'Calcined Alumina', aliases: ['Al₂O₃'], ratio: 0.65, notes: 'No LOI — use about 65% of the alumina hydrate amount.' },
    ],
  },
  // ─ Spodumene / Lithium Sources ─
  {
    category: 'Lithium Source',
    members: [
      { name: 'Spodumene', aliases: [], ratio: 1.0 },
      { name: 'Petalite', aliases: [], ratio: 1.3, notes: 'Lower Li₂O, higher SiO₂. Adjust silica down.' },
      { name: 'Lithium Carbonate', aliases: ['Li₂CO₃'], ratio: 0.25, notes: 'Concentrated lithium — use much less. Very active flux.' },
    ],
  },
  // ─ Barium ─
  {
    category: 'Barium Source',
    members: [
      { name: 'Barium Carbonate', aliases: ['BaCO₃'], ratio: 1.0, notes: 'Toxic — handle with care. Creates satin/matte surfaces.' },
    ],
  },
  // ─ Zinc ─
  {
    category: 'Zinc Source',
    members: [
      { name: 'Zinc Oxide', aliases: ['ZnO'], ratio: 1.0 },
    ],
  },
  // ─ Strontium ─
  {
    category: 'Strontium Source',
    members: [
      { name: 'Strontium Carbonate', aliases: ['SrCO₃'], ratio: 1.0, notes: 'Safe barium substitute for some matte effects.' },
    ],
  },
  // ─ Wood Ash ─
  {
    category: 'Ash',
    members: [
      { name: 'Mixed Hardwood Ash', aliases: ['Wood Ash', 'Hardwood Ash'], ratio: 1.0 },
      { name: 'Softwood Ash', aliases: ['Pine Ash'], ratio: 1.1, notes: 'Higher in K₂O, lower in CaO. Slightly more flux.' },
      { name: 'Synthetic Ash', aliases: [], ratio: 1.0, notes: 'Mix of whiting, silica, and feldspar. More consistent than real ash.' },
    ],
  },
]

// ── Lookup helpers ────────────────────────────────────────────

function normalise(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function findGroup(materialName: string): { group: SubGroup; memberIndex: number } | null {
  const norm = normalise(materialName)
  for (const group of SUBSTITUTION_GROUPS) {
    for (let i = 0; i < group.members.length; i++) {
      const m = group.members[i]
      if (normalise(m.name) === norm) return { group, memberIndex: i }
      for (const alias of m.aliases) {
        if (normalise(alias) === norm) return { group, memberIndex: i }
      }
    }
  }
  return null
}

// ── Public API ─────────────────────────────────────────────────

/**
 * Find substitutes for a given material.
 * Returns an empty array if the material is not in our substitution database.
 */
export function findSubstitutions(materialName: string): MaterialSubstitution[] {
  const found = findGroup(materialName)
  if (!found) return []

  const { group, memberIndex } = found
  const original = group.members[memberIndex]
  const results: MaterialSubstitution[] = []

  for (let i = 0; i < group.members.length; i++) {
    if (i === memberIndex) continue
    const sub = group.members[i]
    const ratio = sub.ratio / original.ratio
    const pct = Math.round(ratio * 100)

    let adjustment: string
    if (Math.abs(ratio - 1.0) < 0.02) {
      adjustment = 'Use the same amount'
    } else if (ratio < 1) {
      adjustment = `Use ${pct}% of the original amount`
    } else {
      adjustment = `Use ${pct}% of the original amount (more needed)`
    }

    const quality: 1 | 2 | 3 =
      Math.abs(ratio - 1.0) < 0.05 ? 1 :
      Math.abs(ratio - 1.0) < 0.3 ? 2 : 3

    results.push({
      original: original.name,
      substitute: sub.name,
      adjustment,
      reason: sub.notes ?? `Both are ${group.category.toLowerCase()} materials with similar chemistry.`,
      quality,
    })
  }

  // Sort by quality (best first)
  results.sort((a, b) => a.quality - b.quality)
  return results
}

/**
 * For a full recipe (array of material names), find all possible substitutions.
 * Returns a map from material name → substitutions.
 */
export function findRecipeSubstitutions(
  materialNames: string[],
): Map<string, MaterialSubstitution[]> {
  const result = new Map<string, MaterialSubstitution[]>()
  for (const name of materialNames) {
    const subs = findSubstitutions(name)
    if (subs.length > 0) {
      result.set(name, subs)
    }
  }
  return result
}

/**
 * Get all substitution categories for display purposes.
 */
export function getSubstitutionCategories(): Array<{ category: string; materials: string[] }> {
  return SUBSTITUTION_GROUPS.map(g => ({
    category: g.category,
    materials: g.members.map(m => m.name),
  }))
}
