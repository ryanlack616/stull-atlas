# Stull Atlas Data Sources

## Overview

This document catalogs the available data sources for ceramic glaze chemistry research and visualization.

---

## PRIMARY SOURCES

### 1. Glazy Database (Derek Philipau)
**Repository:** https://github.com/derekphilipau/glazy-data

**Contents:**
- ~16,000+ ceramic recipes
- Materials database with oxide analyses
- UMF calculations (multiple analysis types)

**Formats:**
- `glazy-20230827.yaml.gz` - Comprehensive YAML export
- `glazy-data-all-20211130.csv` - All materials and recipes
- `glazy-data-glazes-20211130.csv` - Glazes only
- `glazy-data-composites-20211130.csv` - Composite materials

**License:** CC BY-NC-SA 4.0 (Attribution-NonCommercial-ShareAlike)

**Data Fields:**
- Recipe ID, name, creator
- Material type/subtype tree
- Cone range, atmosphere, surface type
- Full percent analysis (SiO2_percent, Al2O3_percent, etc.)
- UMF analysis (SiO2_umf, Al2O3_umf, etc.)
- Extended UMF (_xumf variants)
- Mol and %Mol analysis
- LOI (Loss on Ignition)
- SiO2:Al2O3 ratio
- R2O and RO totals

**Heritage Data:**
- Linda Arbuckle's GlazeChem database
- John Sankey's glaze database (based on Alisa Clausen's work)
- Louis Katz's Hyperglaze database

**Notes:**
- Contains duplicates and near-duplicates
- See Pieter Mostert's analysis: https://github.com/PieterMostert/glazy-data-analysis

---

### 2. Digitalfire (Tony Hansen)
**Website:** https://digitalfire.com

**Available via:**
- Your existing scraper (digitalfire_manager.py, 7,730 pages)
- Material analyses in Insight software format

**Contents:**
- ~7,000+ pages of ceramic chemistry content
- Comprehensive material database with analyses
- Technical articles and reference

**Unique Value:**
- Professional-grade material analyses
- Historical analyses (materials change over time)
- Extensive educational content

---

### 3. SciGlass Database
**Repository:** https://github.com/derekphilipau/SciGlass (fork with plain text conversion)
**Original:** https://github.com/drcassar/SciGlass

**Contents:**
- 420,000+ glass compositions
- 18,000+ halide glasses
- 38,000+ chalcogenide glasses
- Property predictions and calculations

**Format:** Plain text converted from original format

**License:** MIT

**Unique Value:**
- Vast scientific glass data (not just pottery glazes)
- Property predictions based on composition
- Industrial glass research data

**Integration Notes:**
- Much broader compositional space than ceramic glazes
- Could reveal "forbidden zones" where glazes don't exist but glass science does
- Requires filtering for ceramic-relevant compositions

---

### 4. Ian Currie's Glazes.org Archive
**Repository:** https://github.com/derekphilipau/glazes.org
**Live mirror:** https://derekphilipau.github.io/glazes.org/

**Contents:**
- Complete mirror of Ian Currie's methodology
- Understanding glazes series
- Grid testing documentation
- Gallery of systematic test results

**Unique Value:**
- Systematic grid testing methodology
- "Currie Grid" approach documentation
- Educational content on glaze chemistry

---

## VISUALIZATION REFERENCES

### Vue-Plotly-UMF-Charts
**Repository:** https://github.com/derekphilipau/vue-plotly-umf-charts
**Live demo:** https://derekphilipau.github.io/vue-plotly-umf-charts/

**Technology:** Vue.js + Plotly

**Features:**
- 2D and 3D UMF scatter plots
- Glazy data visualization

**Reference for:** Plotly configuration, UMF axis handling

---

### Ceramic Chemistry Visualization
**Repository:** https://github.com/derekphilipau/ceramic-chemistry-visualization
**Live demo:** https://derekphilipau.github.io/ceramic-chemistry-visualization/

**Contents:**
- `/charts` - Various chart implementations
- `/glazecolors` - Color visualization experiments
- `/umf` - UMF-specific visualizations

**Technology:** Plain JavaScript + Plotly

**Reference for:** Visualization approaches, color mapping

---

## SUPPLEMENTARY SOURCES

### Legacy Databases (via Glazy)

| Database | Creator | Notes |
|----------|---------|-------|
| GlazeChem | Linda Arbuckle | University of Florida, majolica specialist |
| Glaze Data | John Sankey / Alisa Clausen | Extensive historical collection |
| Hyperglaze | Louis Katz | Texas A&M Corpus Christi |

### Academic/Research

| Source | Type | Notes |
|--------|------|-------|
| R.T. Stull (1912) | Original research | Transactions of the American Ceramic Society |
| Phase diagrams | Reference | SiO2-Al2O3-CaO ternary systems |
| University archives | Varies | Ceramic engineering thesis databases |

---

## DATA QUALITY CONSIDERATIONS

### Known Issues

1. **Duplicates:** Glazy contains many duplicate and near-duplicate recipes
2. **Material variations:** Same material name → different analyses over time
3. **Transcription errors:** Legacy data from manual entry
4. **Incomplete data:** Missing cone, atmosphere, or surface info
5. **UMF calculation differences:** Different software calculates UMF differently

### Data Cleaning Strategy

```
1. De-duplication
   - Fuzzy match on recipe name
   - Exact match on ingredient proportions
   - Flag but don't delete (user choice)

2. Material Resolution
   - Canonical material mapping
   - Multiple analysis sources per material
   - Confidence scoring

3. UMF Recalculation
   - Recalculate from ingredients
   - Compare to source-provided UMF
   - Flag significant discrepancies

4. Validation
   - Cone-appropriate limits
   - Flux sum verification
   - Outlier detection
```

---

## IMPORT PIPELINE

### Priority Order

1. **Phase 1:** Glazy CSV (quick, comprehensive)
2. **Phase 2:** Digitalfire (your scraper output)
3. **Phase 3:** User uploads (CSV, JSON, Insight XML)
4. **Phase 4:** SciGlass (subset, filtered for ceramics)

### Glazy Import

```typescript
// Expected columns from glazy-data-glazes-20211130.csv
interface GlazyCSVRow {
  id: number
  name: string
  created_by_user_id: number
  material_type_id: number
  material_type: string
  material_type_concatenated: string
  from_orton_cone: string
  to_orton_cone: string
  surface_type: number
  transparency_type: number
  
  // Percent analysis
  SiO2_percent: number
  Al2O3_percent: number
  B2O3_percent: number
  // ... etc
  
  // UMF analysis
  SiO2_umf: number
  Al2O3_umf: number
  // ... etc
  
  // Derived
  SiO2_Al2O3_ratio_umf: number
  R2O_umf: number
  RO_umf: number
  loi: number
}
```

---

## LICENSE SUMMARY

| Source | License | Commercial Use |
|--------|---------|----------------|
| Glazy | CC BY-NC-SA 4.0 | No |
| SciGlass | MIT | Yes |
| Digitalfire | Proprietary | Contact required |
| Ian Currie archive | Unknown | Educational |

**Stull Atlas recommendation:** CC BY-NC-SA 4.0 for compatibility with Glazy data

---

## CONTACTS

- **Derek Philipau** - Glazy creator, ceramic software developer
- **Tony Hansen** - Digitalfire, ceramic chemistry expert
- **Pieter Mostert** - Glazy data analysis
- **Ceramic Arts Network** - Publishing, historical archives

---

## NEXT STEPS

1. Download `glazy-data-glazes-20211130.csv` from GitHub
2. Build Glazy import parser
3. Integrate with your Digitalfire scraper output
4. Create material cross-reference between sources
5. Implement wiggle test with multiple datasets
