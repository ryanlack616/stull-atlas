# Taichi Stull Map Prototype — Spec + Scaffold (v0.1)

Generated: 2026-01-27

This package turns the Stull Atlas compute outputs into an interactive visualization prototype using **Taichi + Python**.

It is designed to align with:
- One-engine / multi-view contract (pure events → shared state → derived compute).  
- iPad-first layout rules (map LOD, debounced pan/zoom).  
- Your “map + vertical + color” idea for expressing additional scalar fields.

---

## 1) Visualization model (what is rendered)

### 1.1 Core 2D plane (Stull map)
- X axis: **UMF SiO₂**
- Y axis: **UMF Al₂O₃**

Points come from `ComputeResult.stull_point`:
```json
{ "sio2": 3.25, "al2o3": 0.32 }
```

### 1.2 Additional channels (optional but scaffolded)
You asked for: “mapped in 2d on the map, and another aspect in vertical, and another in color” (ideas.txt).
We support three orthogonal encodings:

- **2D position**: (SiO₂, Al₂O₃)
- **Color**: a scalar metric (e.g., ratio SiO₂:Al₂O₃, B₂O₃, total flux, diagnostic severity)
- **Height**: another scalar metric rendered as a pseudo-3D “lift” value (optional; can be shown as Z in a 3D view or as size/halo)

Recommended defaults:
- Color = `ratio_sio2_al2o3`
- Height = `B2O3` (if present) else `TotalFlux` or 0

---

## 2) Interaction (Taichi window)

### 2.1 Pan/zoom
- Mouse drag pan
- Wheel zoom
- (Optional) touch mapping later via UI shell

### 2.2 LOD (level-of-detail)
When zoomed out:
- density/cluster rendering (grid binning)

When zoomed in:
- individual points

This matches the performance guidance in your iPad rules: “Map uses LOD… Debounce pan/zoom updates…” (IPAD_LAYOUT_RULES.md).

### 2.3 Picking/inspect
- Hover/nearest-point highlight (desktop)
- Click to select point id
- Selected point id is the canonical `selected_point_id` in shared state (UI shell responsibility).

---

## 3) Data IO

### 3.1 Input points file
The prototype reads a simple JSON file:

```json
{
  "points": [
    {
      "id": "gt_01_cone6_glossy_base",
      "name": "Cone 6 Glossy Base",
      "sio2": 3.2,
      "al2o3": 0.31,
      "color": 10.3,
      "height": 0.12,
      "severity": 0
    }
  ]
}
```

### 3.2 Export helper
`export_stull_points.py` converts one of your expected outputs files into `stull_points.json` suitable for Taichi.

---

## 4) How this connects back to Stull Atlas
This prototype is **not a separate engine**. It is a view over the same computed truth:

- Golden tests → expected UMF / stull_point fixtures
- Export → stull_points.json
- Taichi view → interactive exploration

It’s intentionally compatible with the “multiple instruments” model: this can become an Advanced-only instrument card later.

---

## 5) Next extensions (v0.2+)
- GPU clustering kernel for millions of points
- Multiple guide overlays from `stull_guides.v1.json` (polygons + bands)
- Color mapping presets per cone/atmosphere
- Compare mode: pinned points + delta vectors in map space


## Additions in v0.1.1
- Guide overlays (polygons + bands) from `stull_guides.v1.json`
- LOD density mode (grid binning) when zoomed out


## Additions in v0.1.2
- Picking + pinning
- Compare vectors (selected → pinned)
- Metric mapping presets using exported `metrics`


## Additions in v0.1.3
- Height rendered as on-map stems (a vertical channel)
- Severity filter + screenshot
- Legend + selected metrics readout
