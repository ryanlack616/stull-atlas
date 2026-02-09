/**
 * Preset Glaze Recipes
 * 
 * Iconic, well-documented recipes for immediate exploration.
 * These give new users something to calculate on first visit,
 * and serve as reference points for experienced potters.
 * 
 * All recipes normalized to 100 parts by weight.
 */

import { GlazeRecipe, Ingredient } from '@/types'

function ing(material: string, amount: number): Ingredient {
  return { material, amount, unit: 'weight' }
}

function preset(
  id: string,
  name: string,
  ingredients: Ingredient[],
  cone: number | string,
  atmosphere: 'oxidation' | 'reduction' | 'neutral',
  surfaceType: 'gloss' | 'satin' | 'matte' | 'unknown',
  notes: string,
): GlazeRecipe {
  return {
    id: `preset_${id}`,
    name,
    source: 'calculated',
    ingredients,
    umf: null,
    coneRange: [cone, cone],
    atmosphere,
    surfaceType,
    umfConfidence: 'declared',
    verified: true,
    notes,
  }
}

// ── Classic Recipes ──────────────────────────────────────────

export const PRESET_RECIPES: GlazeRecipe[] = [

  preset('leach_4321', 'Leach 4321', [
    ing('Custer Feldspar', 40),
    ing('Silica', 30),
    ing('Whiting', 20),
    ing('EPK Kaolin', 10),
  ], 10, 'reduction', 'gloss',
    'Bernard Leach\'s classic proportional glaze. 4 parts feldspar, 3 silica, 2 whiting, 1 kaolin. ' +
    'A reliable glossy base at cone 10 reduction. Simple, transparent, forgiving.'
  ),

  preset('tenmoku', 'Tenmoku (Iron Saturate)', [
    ing('Custer Feldspar', 44),
    ing('Silica', 27),
    ing('Whiting', 17),
    ing('EPK Kaolin', 12),
    // Colorant addition — modeled as part of the base
  ], 10, 'reduction', 'gloss',
    'Classic tenmoku base — black to dark brown iron saturate glaze. ' +
    'Add 8-12% Red Iron Oxide for the classic break-to-amber effect on edges. ' +
    'The base is slightly more alumina-rich than Leach 4321 for better suspension.'
  ),

  preset('shino', 'Carbon Trap Shino', [
    ing('Nepheline Syenite', 80),
    ing('EPK Kaolin', 12),
    ing('Ball Clay', 8),
  ], 10, 'reduction', 'satin',
    'Malcolm Davis-style carbon trap shino. Very high soda content from nepheline syenite ' +
    'creates the characteristic orange peel + carbon trapping in reduction. ' +
    'Apply thick. Fire cone 10 with heavy reduction between 1100-1200°C.'
  ),

  preset('celadon', 'Celadon (Cone 10)', [
    ing('Custer Feldspar', 41),
    ing('Silica', 30),
    ing('Whiting', 19),
    ing('EPK Kaolin', 10),
  ], 10, 'reduction', 'gloss',
    'Classic celadon base — very close to Leach 4321 proportions. ' +
    'Add 1-2% Red Iron Oxide for the characteristic blue-green color in reduction. ' +
    'Thickness-sensitive: thin = pale blue, thick = deeper green.'
  ),

  preset('cone6_clear', 'Cone 6 Clear Base', [
    ing('Nepheline Syenite', 47),
    ing('Silica', 21),
    ing('Whiting', 12),
    ing('Frit 3134', 10),
    ing('EPK Kaolin', 10),
  ], 6, 'oxidation', 'gloss',
    'Reliable cone 6 oxidation clear glaze. Nepheline syenite reduces melting temperature ' +
    'while Frit 3134 provides boron flux. Good for layering and colorant testing. ' +
    'Adapt for colors by adding stains, oxides, or mason stains.'
  ),

  preset('matte_base_6', 'Matte Base (Cone 6)', [
    ing('Custer Feldspar', 35),
    ing('Silica', 25),
    ing('Whiting', 20),
    ing('EPK Kaolin', 15),
    ing('Talc', 5),
  ], 6, 'oxidation', 'matte',
    'High-alumina matte base for cone 6 oxidation. The elevated Al₂O₃ from kaolin ' +
    'produces a true alumina matte (not underfired). Talc adds MgO for surface quality. ' +
    'Smooth, buttery matte when properly fired.'
  ),

  preset('majolica', 'Majolica (Cone 04)', [
    ing('Frit 3124', 67),
    ing('EPK Kaolin', 18),
    ing('Silica', 10),
    ing('Tin Oxide', 5),
  ], '04', 'oxidation', 'gloss',
    'Classic white opaque majolica base for earthenware. Frit 3124 provides an early melt ' +
    'with good clarity, tin oxide gives opaque white coverage for overglaze decoration. ' +
    'Fire cone 04. Good brushing consistency.'
  ),

  preset('floating_blue', 'Floating Blue (Cone 6)', [
    ing('Nepheline Syenite', 46),
    ing('Silica', 18),
    ing('Dolomite', 12),
    ing('Gerstley Borate', 14),
    ing('EPK Kaolin', 10),
  ], 6, 'oxidation', 'gloss',
    'A cone 6 fluid blue glaze — rutile and cobalt cause the characteristic floating ' +
    'quality with blue pools in thicker areas and tan-to-brown where thin. ' +
    'Add 2% Rutile + 0.5% Cobalt Carbonate. Apply thick. Best on textured surfaces.'
  ),

  preset('ash_glaze', 'Wood Ash Glaze (Cone 10)', [
    ing('Custer Feldspar', 40),
    ing('Silica', 20),
    // Note: Ash isn't in our materials DB, so we model it as its constituent oxides
    // In practice, potters use actual wood ash (washed or unwashed)
    ing('Whiting', 15),
    ing('Dolomite', 10),
    ing('EPK Kaolin', 15),
  ], 10, 'reduction', 'satin',
    'Simulated wood ash glaze using conventional materials to approximate the UMF of a ' +
    '50/50 feldspar/ash recipe. Real ash glazes vary enormously — the charm is the unpredictability. ' +
    'Substitute 40 parts of actual washed wood ash for the whiting + dolomite + extra kaolin.'
  ),

  preset('crystalline', 'Crystalline Base (Cone 10)', [
    ing('Frit 3110', 52),
    ing('Silica', 25),
    ing('Zinc Oxide', 23),
  ], 10, 'oxidation', 'gloss',
    'Crystalline glaze base. Very high zinc + silica with no alumina — this is intentionally ' +
    'unstable (no kaolin = extreme fluidity). Requires a catch tray. ' +
    'Add 1-3% colorant oxides (cobalt, iron, manganese, copper, nickel). ' +
    'Slow cool through 1050-1100°C to grow crystals. Kiln control is everything.'
  ),

]

/** Recipe categories for UI grouping */
export const PRESET_CATEGORIES = {
  'High Fire (Cone 10)': ['leach_4321', 'tenmoku', 'shino', 'celadon', 'ash_glaze', 'crystalline'],
  'Mid Fire (Cone 6)': ['cone6_clear', 'matte_base_6', 'floating_blue'],
  'Low Fire (Cone 04)': ['majolica'],
} as const

/** Find a preset by ID (without the "preset_" prefix) */
export function getPresetById(id: string): GlazeRecipe | undefined {
  return PRESET_RECIPES.find(r => r.id === `preset_${id}`)
}
