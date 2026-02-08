# API Surface Sketch (Local-first)

This is a minimal internal API (not public) for the app.

## Storage
- list_recipes()
- get_recipe(id)
- save_recipe(recipeDoc)
- save_variant(baseId, patch, name)
- import_project(zip)
- export_project(ids)

## Catalog
- list_materials(query)
- get_material(id)
- upsert_custom_material(material)

## Compute
- compute_recipe(recipeId, profileId)
- validate_recipe(recipeId)

## Blends
- make_line_blend(recipeA, recipeB, steps)
- make_triaxial_blend(cornerA, cornerB, cornerC, gridSize)
- export_test_plan(blendId, format="csv|pdf")

## Guidance
- get_suggestions(recipeId, goal, constraints)

