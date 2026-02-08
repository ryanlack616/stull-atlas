# Golden Tests (Template + Candidate Recipes)

Generated: 2026-01-22

## Why
Golden tests protect your compute engine against regressions and make compatibility profiles provable.

## How to use
For each profile (glazy_v1, digitalfire_legacy), capture expected outputs for each recipe:
- UMF: SiO2, Al2O3, key fluxes (Na2O, K2O, CaO, MgO, ZnO, B2O3 if present)
- Ratio: SiO2:Al2O3
- Stull point: (SiO2, Al2O3)
- Diagnostics: top code(s)

Store results in golden_tests.expected.<profile>.json.

## Candidate set (10)
1) Cone 6 glossy base (balanced feldspar/silica/kaolin/whiting)
2) Cone 6 boron frit glossy (boron present)
3) Cone 6 magnesium matte (high MgO)
4) Cone 6 calcium matte (high CaO)
5) Cone 6 zinc matte (ZnO present)
6) Cone 10 reduction base (higher silica, lower flux)
7) Cone 10 iron saturation base (Fe2O3 contribution)
8) Low-fire cone 04 boron glaze (high frit/boron)
9) High expansion diagnostic (high Na/K; diagnostic-heavy)
10) Unknown material case (should produce MATERIAL_UNKNOWN / MATERIAL_NO_ANALYSIS)

## Notes
- Use real, known recipes once selected; keep ids stable.
- The point is coverage across flux systems and diagnostics.
