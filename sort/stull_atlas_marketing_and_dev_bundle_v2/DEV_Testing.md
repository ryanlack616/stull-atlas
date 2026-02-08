# Testing & Compatibility Strategy

## Golden tests
Maintain a fixed set of recipes and expected outputs per profile:
- glazy_v1
- digitalfire_legacy
(optional later: crc84/pubchem)

Test outputs:
- unity SiO2/Al2O3
- selected fluxes
- stull point
- a few ratios

## Property-based tests
- normalization preserves proportions
- zero/negative inputs rejected
- totals near 100 behave predictably

## UI sync tests
- open two views → apply event → verify both re-render
- conflict last-write-wins behavior

