# Golden Tests — Next Steps (Actionable)

You now have:
- COMPUTE_SPEC.md (normative pipeline)
- golden_tests.template.filled.v0.json (10 recipes with common material IDs)
- material_catalog.template.v0.json (materials + blank analyses)
- compute_expected.py (reference generator)

## To complete the golden expected outputs (real numbers)
1) Copy `material_catalog.template.v0.json` to `material_catalog.json`.
2) Fill in `analyses[].oxides_wt_pct` (oxide wt% + optional LOI) for every material used by the recipes.
   - Leave `m_unknown` out of analyses on purpose; it should trigger MATERIAL_UNKNOWN / MATERIAL_NO_ANALYSIS.
3) Pick and lock a **unity flux set** for your profiles (put it in your compatibility profile docs).
4) Run generator for each profile:

### Glazy v1
python compute_expected.py \
  --golden-template golden_tests.template.filled.v0.json \
  --catalog material_catalog.json \
  --profile molar_masses.glazy_v1.json \
  --unity-set Na2O,K2O,CaO,MgO,ZnO,Li2O,SrO,BaO,PbO,FeO \
  --out golden_tests.expected.glazy_v1.json

### Digitalfire legacy
python compute_expected.py \
  --golden-template golden_tests.template.filled.v0.json \
  --catalog material_catalog.json \
  --profile molar_masses.digitalfire.json \
  --unity-set Na2O,K2O,CaO,MgO,ZnO,Li2O,SrO,BaO,PbO,FeO \
  --out golden_tests.expected.digitalfire_legacy.json

## Notes
- If you want LOI correction, decide it in the profile and run with `--apply-loi-correction`.
- Golden tests should assert:
  - status
  - diagnostic codes
  - UMF values
  - stull_point
  - ratio

Once your catalog analyses exist, the expected files become deterministic and auditable.
