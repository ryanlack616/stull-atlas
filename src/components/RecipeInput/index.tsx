/**
 * RecipeInput Component
 * 
 * Reusable ingredient entry form for glaze recipes.
 * Used across all calculator pages.
 */

import React, { useState, useCallback, useRef, useId } from 'react'
import { GlazeRecipe, Ingredient, Atmosphere, SurfaceType } from '@/types'
import { materialDatabase } from '@/domain/material'

/** Monotonic counter for stable ingredient keys */
let _nextIngredientKey = 1

interface RecipeInputProps {
  label: string              // "Glaze A", "Corner B", etc.
  color?: string             // accent color for this corner
  recipe: GlazeRecipe | null
  onChange: (recipe: GlazeRecipe) => void
  compact?: boolean
  datalistId?: string        // unique datalist ID to avoid duplicates
}

const COMMON_MATERIALS = [
  'Custer Feldspar', 'Nepheline Syenite', 'Wollastonite',
  'EPK Kaolin', 'Silica', 'Dolomite', 'Talc', 'Whiting',
  'Gerstley Borate', 'Frit 3134', 'Frit 3110', 'Frit 3124',
  'Spodumene', 'Bone Ash', 'Zinc Oxide', 'Barium Carbonate',
  'Ball Clay', 'Red Iron Oxide', 'Tin Oxide', 'Titanium Dioxide',
  'Rutile', 'Cobalt Carbonate', 'Copper Carbonate', 'Manganese Dioxide',
]

function createEmptyRecipe(label: string): GlazeRecipe {
  return {
    id: `input_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name: label,
    source: 'user',
    ingredients: [
      { material: '', amount: 0, unit: 'weight' },
    ],
    umf: new Map(),
    coneRange: [6, 6],
    atmosphere: 'oxidation',
    surfaceType: 'unknown',
    umfConfidence: 'unknown',
    verified: false,
  }
}

// Build material names from full database (cached once)
const ALL_MATERIAL_NAMES = (() => {
  try {
    return materialDatabase.getAllMaterials().map(m => m.primaryName).sort()
  } catch {
    return COMMON_MATERIALS
  }
})()

export function RecipeInput({ label, color, recipe, onChange, compact, datalistId }: RecipeInputProps) {
  const generatedId = useId()
  const listId = datalistId || `materials-${generatedId}`
  // Stable keys for each ingredient row — survives reorder/delete
  const ingredientKeysRef = useRef<Map<number, number>>(new Map())
  const nextKeyRef = useRef(0)
  
  const getStableKey = useCallback((index: number, ingredientCount: number) => {
    const keyMap = ingredientKeysRef.current
    // Rebuild map when list changes (new items get new keys, existing keep theirs)
    if (!keyMap.has(index)) {
      keyMap.set(index, _nextIngredientKey++)
    }
    return keyMap.get(index)!
  }, [])
  
  // Stable empty recipe — only create once per component instance
  const emptyRecipeRef = useRef<GlazeRecipe | null>(null)
  if (!emptyRecipeRef.current) {
    emptyRecipeRef.current = createEmptyRecipe(label)
  }
  const current = recipe || emptyRecipeRef.current

  const updateIngredient = useCallback((index: number, field: 'material' | 'amount', value: string | number) => {
    const updated = { ...current }
    updated.ingredients = [...current.ingredients]
    updated.ingredients[index] = { ...updated.ingredients[index], [field]: value }
    onChange(updated)
  }, [current, onChange])

  const addIngredient = useCallback(() => {
    const updated = { ...current }
    updated.ingredients = [...current.ingredients, { material: '', amount: 0, unit: 'weight' as const }]
    // Assign a new stable key for the added ingredient
    ingredientKeysRef.current.set(updated.ingredients.length - 1, _nextIngredientKey++)
    onChange(updated)
  }, [current, onChange])

  const removeIngredient = useCallback((index: number) => {
    if (current.ingredients.length <= 1) return
    const updated = { ...current }
    updated.ingredients = current.ingredients.filter((_, i) => i !== index)
    // Rebuild key map: shift keys for items after the removed one
    const oldKeys = ingredientKeysRef.current
    const newKeys = new Map<number, number>()
    let newIdx = 0
    for (let i = 0; i < current.ingredients.length; i++) {
      if (i === index) continue
      newKeys.set(newIdx, oldKeys.get(i) ?? _nextIngredientKey++)
      newIdx++
    }
    ingredientKeysRef.current = newKeys
    onChange(updated)
  }, [current, onChange])

  const updateName = useCallback((name: string) => {
    onChange({ ...current, name })
  }, [current, onChange])

  const updateCone = useCallback((cone: string) => {
    const num = parseInt(cone, 10) || 6
    onChange({ ...current, coneRange: [num, num] })
  }, [current, onChange])

  const updateAtmosphere = useCallback((atmosphere: Atmosphere) => {
    onChange({ ...current, atmosphere })
  }, [current, onChange])

  const totalAmount = current.ingredients.reduce((sum, ing) => sum + (ing.amount || 0), 0)

  return (
    <div className="recipe-input" style={{ '--accent': color || '#3498db' } as React.CSSProperties}>
      <div className="recipe-header">
        <div className="recipe-label" style={{ borderLeftColor: color || '#3498db' }}>
          <input
            type="text"
            value={current.name}
            onChange={e => updateName(e.target.value)}
            placeholder={label}
            className="name-input"
          />
        </div>
        {!compact && (
          <div className="recipe-meta">
            <label>
              Cone
              <select value={String(current.coneRange[0])} onChange={e => updateCone(e.target.value)}>
                {['04','03','02','01','0','1','2','3','4','5','6','7','8','9','10'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Atm
              <select 
                value={current.atmosphere} 
                onChange={e => updateAtmosphere(e.target.value as Atmosphere)}
              >
                <option value="oxidation">Ox</option>
                <option value="reduction">Red</option>
                <option value="neutral">Neut</option>
              </select>
            </label>
          </div>
        )}
      </div>

      <div className="ingredients-list">
        {current.ingredients.map((ing, i) => (
          <div key={getStableKey(i, current.ingredients.length)} className="ingredient-row">
            <input
              type="text"
              value={ing.material}
              onChange={e => updateIngredient(i, 'material', e.target.value)}
              placeholder="Material..."
              className="material-input"
              list={listId}
            />
            <input
              type="number"
              value={ing.amount || ''}
              onChange={e => updateIngredient(i, 'amount', parseFloat(e.target.value) || 0)}
              placeholder="0"
              min="0"
              step="0.1"
              className="amount-input"
            />
            <button
              className="remove-btn"
              onClick={() => removeIngredient(i)}
              title="Remove ingredient"
              disabled={current.ingredients.length <= 1}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="recipe-footer">
        <button className="add-btn" onClick={addIngredient}>+ Add Material</button>
        <span className="total" style={{ color: Math.abs(totalAmount - 100) < 0.5 ? '#4caf50' : '#888' }}>
          Σ {totalAmount.toFixed(1)}
        </span>
      </div>

      <datalist id={listId}>
        {ALL_MATERIAL_NAMES.map(m => <option key={m} value={m} />)}
      </datalist>
    </div>
  )
}

export default RecipeInput
