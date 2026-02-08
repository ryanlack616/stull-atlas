# Events (Single Edit Vocabulary)

All shells emit the same events:

- ADD_MATERIAL(recipeId, materialId)
- REMOVE_MATERIAL(recipeId, materialId)
- SET_MATERIAL_PERCENT(recipeId, materialId, percent)
- SET_CONE(recipeId, cone)
- SET_ATMOS(recipeId, atmosphere)
- NORMALIZE_TO_100(recipeId)

Reducer:
- nextState = reduce(state, event)

Compute:
- result = compute(state.recipeDocs[recipeId], state.catalog, state.prefs)
