# iPad & Mobile Layout Rules (v1)

Generated: 2026-01-22

## Targets
- iPad landscape (primary)
- iPad portrait (secondary)
- Phone (Basic-first)

## Breakpoints (suggested)
- Phone: < 768px
- Tablet: 768–1024px
- Large: > 1024px

## Basic mode (iPad)
Explore (default home)
- Landscape: 3 columns (Search / Map / Inspect)
- Portrait: Map full height; Search + Inspect as bottom sheets (tabbed)

Quick Calc
- Two columns: left inputs/materials, right results/diagnostics/CTA

## Advanced mode (iPad)
- Prefer docked panels over floating windows.
- Landscape: 3 columns (Library / Work area / Inspect-Compare-Diagnostics)
- Instrument cards:
  - Win95/Mac: docked right panel or full-screen modal
  - DOS: modal overlay only

## Touch rules
- Minimum tap target 44px
- Touch rows for tables with expandable details
- Hover-only UI must have a tap equivalent

## Performance
- Map uses LOD: density/cluster zoomed out → points zoomed in.
- Debounce pan/zoom updates to avoid heavy redraw loops.
