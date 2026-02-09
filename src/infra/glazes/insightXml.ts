/**
 * Infra: Insight XML Parser
 *
 * Parses Insight desktop (Tony Hansen) XML recipe format.
 * Converts ingredient lists + optional UMF data into GlazeRecipe objects.
 */

import { GlazeRecipe, Ingredient, Atmosphere, SurfaceType, EpistemicState, UMF } from '@/types'

/**
 * Parse an Insight XML export string into GlazeRecipe[].
 * Handles both single-recipe and multi-recipe exports.
 */
export function deserializeInsightXML(xml: string): GlazeRecipe[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error(`Invalid XML: ${parseError.textContent?.slice(0, 120)}`)
  }

  const recipes: GlazeRecipe[] = []

  // Try multiple possible root structures
  const recipeNodes = doc.querySelectorAll('recipe, Recipe, RECIPE')
  const glazeNodes = doc.querySelectorAll('glaze, Glaze, GLAZE')
  const nodes = recipeNodes.length > 0 ? recipeNodes : glazeNodes

  if (nodes.length > 0) {
    nodes.forEach((node, i) => {
      const recipe = parseRecipeNode(node, i)
      if (recipe) recipes.push(recipe)
    })
  } else {
    // Single recipe with ingredients at root level
    const recipe = parseRecipeNode(doc.documentElement, 0)
    if (recipe) recipes.push(recipe)
  }

  return recipes
}

function textContent(el: Element | null): string {
  return el?.textContent?.trim() ?? ''
}

function parseRecipeNode(node: Element, index: number): GlazeRecipe | null {
  const name =
    textContent(node.querySelector('name, Name, title, Title')) ||
    `Insight Import ${index + 1}`

  // Parse ingredients from various possible structures
  const ingredients: Ingredient[] = []

  // Structure 1: <ingredient> or <material> children
  const ingNodes = node.querySelectorAll(
    'ingredient, Ingredient, material, Material, component, Component'
  )
  ingNodes.forEach((ing) => {
    const mat =
      textContent(ing.querySelector('name, Name, material, Material')) ||
      ing.getAttribute('name') ||
      ing.getAttribute('material') ||
      ''
    const amtStr =
      textContent(ing.querySelector('amount, Amount, quantity, Quantity, percent, Percent')) ||
      ing.getAttribute('amount') ||
      ing.getAttribute('percent') ||
      ''
    const amount = parseFloat(amtStr)
    const isAddition =
      (ing.getAttribute('addition') || textContent(ing.querySelector('addition'))).toLowerCase() === 'true'

    if (mat && !isNaN(amount) && amount > 0) {
      ingredients.push({
        material: mat,
        amount,
        unit: 'weight',
        confidence: 'declared',
      })
    }
  })

  if (ingredients.length === 0) return null

  // Parse optional UMF data if present
  const umfNode = node.querySelector('umf, UMF, analysis, Analysis')
  const umf: UMF = {}
  if (umfNode) {
    const oxideEls = umfNode.children
    for (let i = 0; i < oxideEls.length; i++) {
      const el = oxideEls[i]
      const oxide = el.tagName
      const val = parseFloat(el.textContent ?? '')
      if (!isNaN(val) && val > 0) {
        ;(umf as any)[oxide] = {
          value: val,
          precision: 4,
          state: 'declared' as EpistemicState,
          source: 'insight_xml',
        }
      }
    }
  }

  // Parse firing info
  const coneStr =
    textContent(node.querySelector('cone, Cone, temperature, Temperature')) || ''
  const cone = parseFloat(coneStr)
  const coneRange: [number | string, number | string] = !isNaN(cone)
    ? [cone, cone]
    : coneStr
      ? [coneStr, coneStr]
      : ['?', '?']

  const atmosphere =
    (textContent(node.querySelector('atmosphere, Atmosphere, firing, Firing')) || 'unknown') as Atmosphere

  const surface =
    (textContent(node.querySelector('surface, Surface, finish, Finish')) || 'unknown') as SurfaceType

  const notes = textContent(node.querySelector('notes, Notes, description, Description'))

  return {
    id: `insight_${Date.now()}_${index}`,
    name,
    source: 'user',
    ingredients,
    umf: Object.keys(umf).length > 0 ? umf : null,
    coneRange,
    atmosphere,
    surfaceType: surface,
    notes: notes || undefined,
    umfConfidence: Object.keys(umf).length > 0 ? 'declared' : 'unknown',
    verified: false,
  }
}
