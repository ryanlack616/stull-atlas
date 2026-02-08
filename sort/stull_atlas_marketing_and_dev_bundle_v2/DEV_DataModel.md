# Data Model (Draft)

## RecipeDoc (canonical)
```json
{
  "id": "r_123",
  "name": "My Liner",
  "cone": "6",
  "atmosphere": "ox",
  "items": [
    {"materialId": "m_custer", "percent": 40.0},
    {"materialId": "m_silica", "percent": 25.0}
  ],
  "notes": "",
  "tags": ["liner"]
}
```

## MaterialCatalog
```json
{
  "materials": [
    {
      "id": "m_custer",
      "name": "Custer Feldspar",
      "aliases": ["Custer"],
      "analysis": {
        "oxides_wt_pct": {"SiO2": 68.5, "Al2O3": 18.4, "K2O": 10.2, "Na2O": 2.9},
        "loi": 0.5,
        "source": "vendor|lab|community",
        "version": "2026-01-22"
      }
    }
  ]
}
```

## ComputeResult
```json
{
  "status": "OK|WARN|ERROR",
  "diagnostics": [{"code":"MATERIAL_NO_ANALYSIS","severity":"ERROR","message":"...","primary_action":"..."}],
  "views": {
    "formula": {"SiO2": 0.45, "Al2O3": 0.12, "...": 0.03},
    "unity": {"SiO2": 3.12, "Al2O3": 0.32, "...": 0.10},
    "mole_pct": {"SiO2": 56.1, "Al2O3": 11.2},
    "analysis_wt_pct": {"SiO2": 65.2, "Al2O3": 18.1}
  },
  "stull_point": {"sio2": 3.12, "al2o3": 0.32}
}
```

