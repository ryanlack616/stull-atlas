# STULL ATLAS - Project Specification

## Core Philosophy

### Smart, Not Intelligent

The calculator must be:

| Principle | Meaning |
|-----------|---------|
| **DETERMINISTIC** | Same inputs → same outputs, always |
| **TRANSPARENT** | Show your work (calculation trace) |
| **TRACEABLE** | Every value knows its origin |
| **BOUNDED** | Refuse to calculate with bad data |
| **EXPLICIT** | No silent defaults or assumptions |

### What This Means in Practice

```
NO:  Guessing missing values
NO:  Silent fallbacks
NO:  Averaged "close enough" results
NO:  Hidden corrections

YES: Explicit error states
YES: Confidence flags on every value
YES: Source tracking
YES: Validation before calculation
```

---

## Data Architecture

### Epistemic States (from Synapt)

Every value carries a confidence state:

```typescript
type EpistemicState =
  | 'unknown'   // No data
  | 'assumed'   // Default/fallback used
  | 'inferred'  // Calculated from other data
  | 'declared'  // User or source provided
  | 'verified'  // Cross-referenced or lab tested
```

### Floating Point Rules

```typescript
// STORAGE: Scale factor for precision
const SCALE = 10000  // 4 decimal places
const stored = Math.round(value * SCALE)
const display = stored / SCALE

// COMPARISON: Never use ===
const EPSILON = 0.0001
const equal = (a, b) => Math.abs(a - b) < EPSILON

// DISPLAY: Fixed precision per context
const PRECISION = {
  umfOxide: 2,      // 0.35 Al2O3
  umfRatio: 2,      // SiO2:Al2O3 = 8.50
  weight: 1,        // 45.5g
  percentage: 2,    // 65.32%
  temperature: 0,   // 1220°C
}
```

---

## Five Blend Paradigms

### 1. SIMPLEX
Materials sum to 100%

| Type | Formula | Example |
|------|---------|---------|
| Line blend | n+1 points | 11 tests for 10 divisions |
| Triaxial | (n+1)(n+2)/2 | 66 tests for n=10 |
| Quadaxial | (n+1)(n+2)(n+3)/6 | 286 tests for n=10 |
| N-simplex | C(n+k-1, k-1) | General formula |

### 2. GRID
Independent variables, unconstrained

- Biaxial: (n+1) × (m+1) points
- Full factorial: product of all steps
- Additions to base glazes

### 3. SPACE-FILLING
Systematic coverage

- Latin Hypercube Sampling (LHS)
- Sobol/Halton sequences
- Stull chart mapping

### 4. OPTIMIZATION
Directed search

- Bayesian optimization
- Response surface methodology
- Genetic algorithms

### 5. COORDINATE SYSTEM
Representation framework

- Weight %, Molar %, UMF
- Limit formulas, flux ratios
- Any blend can use any coordinate system

---

## Stull Chart Context

### Original Research (1912)

R.T. Stull at University of Illinois:
- ~50 test glazes at cone 11
- Fixed flux ratio: 0.3 KNaO : 0.7 CaO
- Systematic Si:Al variation
- Created foundational map

### Stull Atlas (113 years later)

- 9,000+ data points vs ~50
- Multiple temperatures vs cone 11 only
- Variable flux ratios vs fixed
- Multiple material datasets for uncertainty
- Real-time interactive exploration
- Century of accumulated potter knowledge

---

## The Wiggle Test

### What It Is

Toggle between material analysis datasets to reveal uncertainty in UMF positions.

### What It Reveals

| Observation | Interpretation |
|-------------|----------------|
| Points barely move | Well-characterized materials |
| Points jump significantly | Sensitive to assumptions |
| Clusters stay tight | Real chemical phenomenon |
| Clusters disperse | Artifact of shared assumptions |
| Gaps persist | True unexplored territory |
| Gaps fill in | False void from assumptions |

### Datasets to Compare

1. **Digitalfire 2024** - Current professional analyses
2. **Glazy Default** - Community-contributed data
3. **Insight Legacy** - Historical software data
4. **Supplier Specs** - Manufacturer data

---

## UMF Calculation Algorithm

```typescript
function recipeToUMF(recipe, materials, dataset) {
  // Step 1: Resolve all materials
  for each ingredient:
    material = resolve(ingredient.name)
    analysis = getAnalysis(material, dataset)
    
  // Step 2: Calculate moles of each oxide
  for each ingredient:
    for each oxide in analysis:
      grams = amount × (weightPercent / 100)
      moles = grams / molecularWeight
      oxideMoles[oxide] += moles
      
  // Step 3: Sum flux moles (R2O + RO)
  fluxMoles = sum of all flux oxides
  
  // Step 4: Normalize to unity
  for each oxide:
    umf[oxide] = oxideMoles[oxide] / fluxMoles
    
  // Step 5: Calculate derived values
  umf._meta.SiO2_Al2O3_ratio = SiO2 / Al2O3
  umf._meta.R2O_RO_ratio = R2O / RO
  
  return umf
}
```

---

## Cone Limits (Typical)

| Oxide | Cone 06 | Cone 6 | Cone 10 |
|-------|---------|--------|---------|
| SiO2 | 1.5-3.0 | 2.5-4.5 | 3.0-5.5 |
| Al2O3 | 0.05-0.25 | 0.2-0.5 | 0.3-0.7 |
| B2O3 | 0.3-0.8 | 0.1-0.4 | 0-0.2 |
| K2O+Na2O | 0.3-0.7 | 0.2-0.5 | 0.2-0.4 |
| CaO | 0.1-0.5 | 0.2-0.6 | 0.3-0.7 |
| MgO | 0-0.2 | 0-0.3 | 0-0.35 |
| ZnO | 0-0.25 | 0-0.3 | 0-0.3 |

---

## Technology Stack

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | React | Familiar, fast shipping |
| Build | Vite | Fast, modern |
| State | Zustand | Simple, performant |
| Charts | Plotly (scattergl) | WebGL, handles 9k+ points |
| Styling | CSS-in-JS | Component-scoped |
| Types | TypeScript | Type safety |
| Testing | Vitest | Vite native |

---

## Directory Structure

```
stull-atlas/
├── src/
│   ├── calculator/       # Core calculation engine
│   │   ├── constants.ts  # Molecular weights, precision
│   │   ├── umf.ts       # UMF calculation
│   │   ├── validation.ts # Cone limits
│   │   └── blends/      # Blend calculators
│   ├── components/      # React components
│   ├── stores/          # Zustand state
│   ├── types/           # TypeScript definitions
│   ├── analysis/        # Density, voids, clustering
│   └── data/            # Data loading
├── docs/                # Documentation
└── public/              # Static assets
```

---

## Naming Conventions

```
Files:       kebab-case.ts
Components:  PascalCase.tsx
Hooks:       useCamelCase.ts
Types:       PascalCase
Constants:   SCREAMING_SNAKE_CASE
Functions:   camelCase
Variables:   camelCase
Oxides:      Chemical notation (SiO2, Al2O3)
```

---

## Key Insights from Derek Philipau's Work

### Available Data
- **Glazy:** 16k+ recipes, CC BY-NC-SA 4.0
- **SciGlass:** 420k+ glass compositions, MIT
- **Legacy:** Linda Arbuckle, John Sankey, Louis Katz

### Existing Visualizations
- Vue + Plotly UMF charts
- D3 ceramic chemistry visualizations

### Challenges Noted
- Duplicates in Glazy data
- Material name variations
- UMF calculation differences between software

---

## Development Phases

### Phase 1: Foundation ✓
Core types, calculator, basic UMF

### Phase 2: Data Pipeline
Import Glazy, Digitalfire, material resolution

### Phase 3: Visualization MVP
Plotly scatter, pan/zoom, color by property

### Phase 4: Wiggle Test
Multiple datasets, animation, uncertainty

### Phase 5: Analysis
Density, voids, clustering

### Phase 6: Blend Tools
Line, triaxial, grid blends

### Phase 7: Polish
Export, sharing, documentation

---

*"Not replacing Stull's work—finishing the experiment he couldn't run."*
