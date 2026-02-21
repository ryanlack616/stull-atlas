# Glaze Recipe Standard — Design Decisions

**Version:** 1.0.0  
**Date:** 2025-02-26  
**Schema:** `docs/glaze-recipe-schema.json`  
**Types:** `src/types/recipe.ts`

---

## 1. Why Two Files

| File | Purpose | Audience |
|------|---------|----------|
| `glaze-recipe-schema.json` | Machine-readable JSON Schema (draft 2020-12) | External tools, import/export, validation, API contracts |
| `recipe.ts` | TypeScript interfaces the app actually imports | Internal codebase, compile-time checks |

The JSON Schema is the **canonical definition**. The TypeScript types mirror it structurally. If they diverge, the JSON Schema wins.

---

## 2. GlazeRecipeV2 vs GlazeRecipe

The existing `GlazeRecipe` in `glaze.ts` is a **plotting interface** — flat, ~25 fields, optimized for rendering on the Stull chart. It stays as-is during migration. `GlazeRecipeV2` in `recipe.ts` is the full representation. 

**Migration strategy:** existing data arrives as `GlazeRecipe`, gets adapted into `GlazeRecipeV2` via an adapter function (not yet built). The app progressively upgrades — new features consume V2, old features continue with the plotting projection.

---

## 3. Chemistry in Three Representations

```
Weight % ──(÷ molar weights)──▶ Mole % ──(normalize fluxes to 1.0)──▶ UMF
```

All three are stored because:

- **Weight %** is the raw/source-of-truth representation. If you have ingredients + material analyses, this is what you calculate first.
- **Mole %** is useful for comparing recipes of different totals (eliminates scale).
- **UMF** is the Stull chart coordinate system. Fluxes summed to 1.0. This is what we plot.

Storing all three avoids recalculation on every render and lets us track which representation was the *original* source (some databases provide UMF directly; some provide wt%).

---

## 4. Extended OxideSymbol List

The original `umf.ts` has 26 oxides. The schema adds: **FeO, V₂O₅, WO₃, Bi₂O₃, CeO₂, La₂O₃**.

Why:
- **FeO** (ferrous iron) vs Fe₂O₃ (ferric): reduction atmospheres convert some Fe₂O₃ → FeO. Celadon chemistry depends on this ratio.
- **V₂O₅**: used in specialty yellows (vanadium stains).
- **WO₃**: rare but used in crystalline glazes.
- **Bi₂O₃, CeO₂, La₂O₃**: specialty fluxes in low-temperature and art glazes.

The existing `umf.ts` OxideSymbol should eventually be expanded to match, but only when the calculator is ready to handle the new oxides.

---

## 5. TrackedNumber (Epistemic Provenance)

Every numeric value in the schema *can* be either a plain `number` or a `TrackedNumber`:

```json
{ "value": 3.14, "confidence": "declared", "precision": 2, "source": "Glazy" }
```

This maps directly from the epistemic system already in the codebase (`OxideValue` in `epistemic.ts`). In practice, most data arrives as plain numbers and gets wrapped with `"confidence": "imported"` on ingestion.

The 5-level confidence scale: **unknown → assumed → inferred → declared → verified**.

---

## 6. Firing Schedule as Segments

Instead of a single temperature, the schema supports full firing schedules:

```json
"schedule": [
  { "ratePerHour": 80,  "targetTempC": 600,  "holdMinutes": 0,   "label": "slow through quartz inversion" },
  { "ratePerHour": 150, "targetTempC": 1060, "holdMinutes": 0 },
  { "ratePerHour": 60,  "targetTempC": 1260, "holdMinutes": 30,  "label": "soak" }
]
```

Most imported recipes won't have this data — it'll be null. But user-created recipes and imported kiln controller data can populate it. The **heatwork** field captures the time-temperature integral when schedule is available.

---

## 7. Outcomes ≠ Inputs

The schema separates what went *in* (ingredients, firing, chemistry) from what came *out* (outcomes). This is important because:

- The same recipe can produce different outcomes at different cones, on different clay bodies, in different atmospheres.
- A single recipe should eventually support *multiple* outcome records (one per firing trial). The current schema puts outcomes at the recipe level; a future version may move to an array of `FiringTrial` objects.

---

## 8. Calculated Properties Are Derived, Not Authored

Everything under `calculated` is **recomputable** from the recipe data. It's included in the schema for:

- **Caching** — avoid recalculating 9,712 UMF distances on every load.
- **Data exchange** — exported recipes carry their calculations for consumers who don't have the Stull Atlas calculator.
- **Auditability** — the `trace` object captures which molar weight set was used, when, and the step-by-step calculation log.

On import, calculated fields are either regenerated or accepted with `confidence: "imported"`.

---

## 9. Batch Calculations

The schema supports batch scaling:

```json
"batch": {
  "batchSizeGrams": 5000,
  "batchIngredients": [
    { "materialName": "Custer Feldspar", "grams": 2000 },
    { "materialName": "Silica",          "grams": 1500 },
    { "materialName": "Whiting",         "grams": 1000 },
    { "materialName": "EPK",             "grams": 500 }
  ],
  "waterGrams": 3500,
  "specificGravity": 1.45
}
```

Batch data is per-recipe (one batch size at a time). The app UI should let users adjust batch size and recalculate dynamically — the stored batch is just the most recent calculation.

---

## 10. Lineage & Blend Origin

When a recipe is generated via the blend system (line blend, triaxial, etc.), its parentage is recorded:

```json
"lineage": {
  "blendOrigin": {
    "type": "triaxial",
    "parents": [
      { "recipeId": "glazy_1234", "proportion": 0.5 },
      { "recipeId": "glazy_5678", "proportion": 0.3 },
      { "recipeId": "user_abc",   "proportion": 0.2 }
    ],
    "gridPosition": { "row": 2, "col": 3, "label": "B3" }
  }
}
```

This connects directly to the existing `BlendParadigm` / `BlendType` system in `blend.ts`.

---

## 11. What the Existing Data Shape Looks Like

Current records in `glazy-processed.json` have this flat shape:

```json
{
  "id": "glazy_12345",
  "name": "Leach 4321",
  "source": "glazy",
  "cone": 10,
  "surface": "satin",
  "atmosphere": "reduction",
  "ingredients": [
    { "material": "Custer Feldspar", "percentage": 40, "isAdditional": false }
  ],
  "umf": { "SiO2": 3.5, "Al2O3": 0.4, "CaO": 0.6, "KNaO": 0.3 },
  "SiO2_Al2O3_ratio": 8.75,
  "R2O_RO_ratio": 0.33,
  "fluxSum": 1.0,
  "x": 3.5,
  "y": 0.4,
  "imageUrl": "..."
}
```

An **adapter function** will be needed to convert this to `GlazeRecipeV2`:
- `cone` → `firing.cone`
- `surface` → `outcomes.surfaceType`
- `atmosphere` → `firing.atmosphere`
- `ingredients[].material` → `ingredients[].materialName`, `.percentage` → `.amount`
- `umf` → `chemistry.umf`
- `SiO2_Al2O3_ratio` → `chemistry.umfMeta.SiO2_Al2O3_ratio`
- Unpopulated sections get `null` / omitted
- Everything arrives with `confidence: "imported"`

---

## 12. What's NOT in v1.0.0 (Deferred)

| Feature | Why deferred |
|---------|-------------|
| Multiple firing trials per recipe | Need UI for trial management first |
| Glaze interaction (layering two glazes) | Combinatorial explosion, needs separate schema |
| Cost calculation per material | Need material pricing database |
| Chemical durability / leaching model | Complex, regulatory, not enough data |
| Kiln loading position | Too kiln-specific |
| Volumetric shrinkage | Clay body concern, not glaze |
| AI-generated descriptions | Generated at runtime, not stored |

---

## 13. Integration Path

### Short-term
1. ✅ JSON Schema + TypeScript types (done)
2. Build `adaptLegacyRecipe(old: GlazeRecipe): GlazeRecipeV2` adapter
3. Calculator outputs `Chemistry` object instead of raw `UMF`
4. UMF metadata populated from existing `recipeToUMF()` output

### Medium-term
5. COE calculator (oxide contribution factors × UMF moles)
6. Batch calculator (recipe amounts × batch weight / 100)
7. Firing schedule editor in UI
8. Recipe creation / editing form using V2 types

### Long-term
9. Multiple firing trials per recipe
10. Material lot tracking with supplier analyses
11. Full epistemic tracking on every field
12. Export to GlazeChem, DigitalFire, INSIGHT formats
