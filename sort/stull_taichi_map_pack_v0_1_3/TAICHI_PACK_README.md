# Taichi Stull Map Prototype Pack (v0.1)

## Files
- `TAICHI_STULL_MAP_SPEC.md` — what this prototype does and how it maps to Stull Atlas.
- `export_stull_points.py` — converts golden expected outputs to `stull_points.json`.
- `stull_map_taichi.py` — interactive Taichi viewer.

## Quick start (with your synthetic demo expected outputs)
1) Export points:
```bash
python export_stull_points.py --expected golden_tests.expected.glazy_v1.synthetic_demo.v0.json --out stull_points.json
```

2) Run viewer:
```bash
python stull_map_taichi.py --points stull_points.json --guides stull_guides.v1.json
```

## Next step
Swap synthetic demo expected outputs for real golden expected outputs once your catalog analyses are real.


## Controls
- G: toggle guides
- L: toggle LOD density mode


## Compare (v0.1.2)
- Click: select nearest point
- P: pin/unpin selected
- C: clear pins
- Vectors are drawn from selected → pinned

## Metric presets
- 1: color=ratio, height=b2o3
- 2: color=b2o3, height=total_flux
- 3: color=severity, height=0


## v0.1.3 additions
- H: toggle height stems (vertical encoding)
- F: cycle severity filter (all / warn+error / error)
- S: save screenshot (stull_map.png)
