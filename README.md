# Stull Atlas

**A Computational Ceramic Glaze Explorer**

*113 years after R.T. Stull's original map (1912)*

---

## Vision

An interactive visualization of over 9,000 ceramic glaze recipes plotted in UMF (Unity Molecular Formula) space, allowing:

- Real-time pan/zoom exploration of glaze chemistry landscape
- Dataset switching to reveal uncertainty (the "wiggle test")
- Structure discovery in human-curated glaze knowledge
- Blend calculation tools (simplex, grid, space-filling, optimization)

## The Core Insight

Stull drew his map in 1912 with ~50 glazes at cone 11. We have 113 years of accumulated potter knowledge—9,000+ recipes that survived because they *worked*. The density, clustering, and voids in this data encode human knowledge about what's useful in glaze space.

## Key Discoveries

| Discovery | Implication |
|-----------|-------------|
| Human curation is a filter | Dense regions = reliably useful glazes |
| Voids aren't random | Failures, instability, or unexplored |
| Material datasets disagree | UMF positions have uncertainty |
| Wiggle test separates signal from artifact | Structure that persists across datasets is chemistry |
| Stull chart is a 2D slice | Full UMF space is higher dimensional |

---

## First Principle: Useful for Potters

**Non-negotiable.** If it's not useful to a working potter, it doesn't ship.

This is not a visualization toy. It's not a tech demo. It's a tool for people who mix glazes from raw materials, load kilns, and need to understand what's happening in their chemistry. Every feature, every interface decision, every version must pass one test: *does this help someone in the studio?*

This principle comes from Henry Crissman (Ceramics School, Hamtramck) and is held in place by a network of potters who will tell us the truth — Ken Shenstone (Albion Anagama), Steven Johnson (Rovin Ceramics), Brett Gray and Kevin Kwiatkowski (Pewabic Pottery). If they wouldn't use it, we don't build it.

---

## Philosophy: Smart, Not Intelligent

The calculator must be:

```
DETERMINISTIC     Same inputs → same outputs, always
TRANSPARENT       Show your work (trace)
TRACEABLE         Every value knows its origin
BOUNDED           Refuse to calculate with bad data
EXPLICIT          No silent defaults or assumptions
```

### What This Means

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

## Five Blend Paradigms

Everything in blend calculation fits into five categories:

### 1. SIMPLEX
Materials sum to 100% (line blend, triaxial, quadaxial, n-axial)

### 2. GRID
Independent variables, unconstrained (biaxial, factorial, radial)

### 3. SPACE-FILLING
Systematic coverage (Latin Hypercube, Sobol, Halton, Stull chart itself)

### 4. OPTIMIZATION
Directed search toward a goal (Bayesian, genetic algorithms)

### 5. COORDINATE SYSTEM
How you represent the space (weight %, molar %, UMF, limit formulas)

---

## Epistemic States

Every value in the system carries a confidence state:

```typescript
type EpistemicState =
  | 'unknown'    // No data
  | 'assumed'    // Default/fallback used
  | 'inferred'   // Calculated from other data
  | 'declared'   // User or source provided
  | 'verified'   // Cross-referenced or lab tested
```

---

## Project Structure

```
stull-atlas/
├── src/
│   ├── calculator/           # Core calculation engine
│   │   ├── constants.ts      # Molecular weights, precision rules
│   │   ├── umf.ts           # UMF calculation algorithm
│   │   ├── validation.ts    # Cone limits, recipe validation
│   │   └── blends/          # Blend calculators
│   │       ├── simplex.ts   # Line, triaxial, quadaxial, n-axial
│   │       ├── grid.ts      # Biaxial, factorial, radial
│   │       └── spacefilling.ts  # LHS, Sobol, Halton
│   │
│   ├── components/
│   │   └── StullAtlas/      # Main visualization
│   │       ├── index.tsx    # Container component
│   │       ├── StullPlot.tsx      # Plotly WebGL scatter
│   │       └── DatasetSwitcher.tsx  # Wiggle test controls
│   │
│   ├── stores/              # Zustand state management
│   │   ├── glazeStore.ts    # Glaze data
│   │   ├── datasetStore.ts  # Material datasets
│   │   └── selectionStore.ts  # UI selection state
│   │
│   ├── types/               # TypeScript definitions
│   │   ├── epistemic.ts     # Confidence tracking
│   │   ├── umf.ts          # UMF and oxide types
│   │   ├── glaze.ts        # Recipe types
│   │   ├── material.ts     # Material database types
│   │   └── blend.ts        # Blend calculation types
│   │
│   └── data/               # Data loading (to implement)
│       ├── materials/      # Material analyses
│       └── glazes/         # Glaze recipes
│
├── docs/                   # Documentation
└── public/                 # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd stull-atlas

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

---

## Floating Point Rules

```typescript
// COMPARISON: Use epsilon, never ===
const EPSILON = 0.0001
const equal = (a: number, b: number) => Math.abs(a - b) < EPSILON

// DISPLAY: Fixed precision per context
const PRECISION = {
  umfOxide: 2,      // 0.35 Al2O3
  umfRatio: 2,      // SiO2:Al2O3 = 8.50
  weight: 1,        // 45.5g
  percentage: 2,    // 65.32%
}

// STORAGE: Use scale factor for critical calculations
const SCALE = 10000  // 4 decimal places
```

---

## The Wiggle Test

### What It Is

When you switch between material analysis datasets (Digitalfire vs Glazy vs Insight), each glaze's UMF position shifts slightly because different sources report different oxide analyses for the same materials.

### What It Reveals

- **Points that barely move**: Recipe uses well-characterized materials
- **Points that jump significantly**: Sensitive to material assumptions
- **Clusters that stay tight**: Real chemical phenomenon
- **Clusters that disperse**: Artifact of shared assumptions
- **Gaps that stay empty across all datasets**: True terra incognita
- **Gaps that fill in with different data**: We just *thought* it was empty

### How To Use It

1. Load glaze data
2. Click "Start Wiggle" in the Dataset Switcher
3. Watch for points that shimmer vs points that stay stable
4. Most uncertain glazes = highest sensitivity to assumptions

---

## Data Sources

### Currently Planned

- **Glazy**: ~15k recipes, community contributed
- **Digitalfire**: ~7k pages, professional reference
- **User uploads**: CSV, JSON, Insight XML

### Future Possibilities

- Ceramic Arts Daily archives
- Published books (digitized)
- University research databases
- Personal collections

---

## Roadmap

### Phase 1: Foundation ✓
- Project setup
- Core types
- Calculator module
- Basic UMF calculation

### Phase 2: Data Pipeline
- Material database
- Glazy import
- Digitalfire import
- Material name resolution

### Phase 3: Visualization MVP
- Plotly WebGL scatter
- Pan/zoom
- Color by property
- Glaze detail sidebar

### Phase 4: Wiggle Test
- Multiple datasets
- Animation
- Uncertainty highlighting

### Phase 5: Analysis Tools
- Density mapping
- Void detection
- Clustering

### Phase 6: Blend Calculators
- Line blend
- Triaxial
- Biaxial grid
- n-simplex

### Phase 7: Polish & Ship
- Responsive layout
- Export
- Documentation
- Deploy

---

## Contributing

This project is in active development. Contributions welcome!

---

## Credits

- **R.T. Stull** (1875-1944): Original Stull chart, 1912
- **Glazy.org**: Community glaze database
- **Digitalfire**: Professional ceramic reference
- **Tony Hansen**: Decades of ceramic chemistry work

---

## License

MIT

---

*"You're treating a century of collective pottery knowledge as a dataset and asking what it knows that we don't. That's not wild. That's science."*
