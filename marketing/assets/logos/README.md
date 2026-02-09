# Stull Atlas — Visual Identity

## Brand Direction
**"Data tool that respects the craft and its history."**

Three layers, blended:
1. **Dark / Technical / Data-Viz** — The foundation. Precision, density, serious tool. This is the working app.
2. **Heritage / Archival** — R.T. Stull published the chart in 1912. Serif accents, academic authority, sepia warmth. We carry forward 100+ years of ceramic science.
3. **Craft-Forward / Warm** — It's for potters, not quants. Earthy touches keep it grounded — clay, kiln, glaze, hand.

The app should feel like opening an antique chemistry reference that somehow has live data in it.

---

## Color Palette

### Primary (App — Current)
| Role | Hex | RGB | Notes |
|------|-----|-----|-------|
| Accent Blue | `#3498db` | 52, 152, 219 | Data points, links, active states |
| Accent Hover | `#2980b9` | 41, 128, 185 | Deeper blue for interaction |
| Dark BG | `#121212` | 18, 18, 18 | Primary background |
| Surface | `#1a1a1a` | 26, 26, 26 | Cards, panels |
| Elevated | `#2a2a2a` | 42, 42, 42 | Modals, popovers |
| Text Primary | `#e0e0e0` | 224, 224, 224 | Body text |
| Text Muted | `#888` | 136, 136, 136 | Secondary labels |
| Border | `#333` | 51, 51, 51 | Dividers |
| Danger | `#e74c3c` | 231, 76, 60 | Errors, warnings |

### Heritage Accents (Marketing / Headings)
| Role | Hex | Notes |
|------|-----|-------|
| Warm Sepia | `#c9a96e` | Gold/ochre — headings, highlights, premium feel |
| Parchment | `#f5f0e8` | Light backgrounds on marketing pages |
| Kiln Ember | `#d4663a` | Warm red-orange — CTAs, energy |
| Ash Gray | `#8a8578` | Muted text on light backgrounds |
| Stoneware | `#3d3832` | Rich dark for print backgrounds |

### Data Visualization
| Role | Hex | Notes |
|------|-----|-------|
| Cone 6 Cluster | `#3498db` | Blue — most common |
| Cone 10 Cluster | `#e67e22` | Orange |
| Matte Region | `#e74c3c` | Red tone |
| Gloss Region | `#2ecc71` | Green |
| High Alumina | `#9b59b6` | Purple |
| Boron Ring | `#f1c40f` | Yellow-gold |

---

## Typography

### App (Current)
- **Body**: System stack — `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif`
- **Rationale**: Fast load, native feel, zero FOUT

### Marketing / Heritage Layer
- **Display headings**: Source Serif 4 (same as app) — ties to academic papers and the original 1912 Stull publication
- **Body copy**: System sans or Inter — clean, readable
- **Chemical formulas**: Monospace or proper subscript rendering — `SiO₂`, `Al₂O₃`
- **Pull quotes / testimonials**: Italic serif — handwritten-adjacent warmth

### App Display Font (Implemented)
- **Display headings (h1, h2, logo)**: `Source Serif 4` via Google Fonts — the heritage serif layer, ties to 1912 academic roots
- **CSS variable**: `--font-display: 'Source Serif 4', Georgia, 'Times New Roman', serif`
- **Weights loaded**: 400, 600, 700 + 400 italic (optical size 8–60)
- **Body text**: Stays system sans — performance matters with 10K+ data points rendering

---

## Logo

### Current
- Blue gradient circle with axis lines and scatter dots
- Faint "S" watermark
- Simple, recognizable at small sizes
- Works well as favicon

### Evolution Ideas (Not Committed)
- Add a subtle nod to the original 1912 chart boundary lines inside the circle
- Warm the gradient slightly — blue → blue-with-a-touch-of-teal
- Consider a logotype version: "STULL ATLAS" in spaced caps, serif, with a small chart icon
- Heritage variant: The logo on a cream/parchment ground, like a bookplate

### Required Files
- `stull-atlas-logo.svg` — Primary logo (vector)
- `stull-atlas-logo-dark.svg` — For dark backgrounds
- `stull-atlas-logo-light.svg` — For light/print backgrounds
- `stull-atlas-icon.svg` — Icon-only mark (no text)
- `stull-atlas-logotype.svg` — Text + icon horizontal lockup
- `stull-atlas-logo-256.png` — 256×256 raster
- `stull-atlas-logo-512.png` — 512×512 raster
- `stull-atlas-logo-1024.png` — 1024×1024 raster

---

## Photography Direction

### Do
- Actual glaze test tiles and fired pieces (not stock pottery photos)
- Close-up macro shots showing surface texture — matte vs gloss, crystal structure, color breaks
- Studio workbench with materials, scales, sieves — the real process
- Dark backgrounds, directional lighting — match the app's dark theme
- The original Stull paper, old kiln photos, archival material

### Don't
- Overly stylized lifestyle/Instagram pottery
- Stock photos of generic ceramics
- Bright, airy, "Etsy shop" aesthetic
- Anything that looks like a cooking blog

### Tone
Like a beautifully lit documentary about craft — Richard Serra's studio, not a Pinterest board.

---

## Print & Marketing Surfaces

### Business Cards (NCECA)
- **Front**: Dark (`#121212` or Stoneware `#3d3832`), logo, tagline, QR
- **Back**: Parchment (`#f5f0e8`), feature list in Ash Gray, accent checks in Kiln Ember
- **Typography**: Display serif for "STULL ATLAS", sans for details

### Banner
- Dark gradient background
- Screenshot of the app (the Stull chart IS the hero image)
- Georgia/serif for headline
- Warm sepia accents for dividers

### Social Media
- Dark cards with blue data visualization as the visual hook
- Serif headline overlaid on chart screenshots
- Heritage touches: thin gold rule lines, small-caps labels

---

## Usage Rules
- Minimum clear space: 1× icon height on all sides
- Minimum display size: 32px height
- Do not stretch, rotate, or recolor the icon outside approved palette
- Heritage colors (sepia, parchment, ember) are for marketing/print — not the working app UI
- The app stays dark and blue; the marketing wraps it in warmth
