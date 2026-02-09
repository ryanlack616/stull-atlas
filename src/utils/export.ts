/**
 * Export Utilities
 * 
 * CSV export and printable label generation for calculator results.
 */

import { UMF, OxideSymbol, GlazeRecipe } from '@/types'
import { getOxideValue } from '@/calculator/umf'

const UMF_COLUMNS: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O', 'CaO', 'MgO',
  'ZnO', 'BaO', 'SrO', 'Li2O', 'Fe2O3', 'TiO2',
]

/**
 * Build blend CSV string (pure helper for tests)
 */
export function buildBlendCSV(
  rows: Array<{ label: string; umf: UMF; meta?: Record<string, string | number> }>
): string {
  const metaKeys = rows.length > 0 && rows[0].meta
    ? Object.keys(rows[0].meta)
    : []

  const header = ['Label', ...metaKeys, ...UMF_COLUMNS].join(',')

  const csvRows = rows.map(row => {
    const metaVals = metaKeys.map(k => row.meta?.[k] ?? '')
    const oxideVals = UMF_COLUMNS.map(o => getOxideValue(row.umf, o).toFixed(4))
    return [
      `"${row.label.replace(/"/g, '""')}"`,
      ...metaVals,
      ...oxideVals,
    ].join(',')
  })

  return [header, ...csvRows].join('\n')
}

/**
 * Export blend results to CSV
 */
export function exportBlendCSV(
  rows: Array<{ label: string; umf: UMF; meta?: Record<string, string | number> }>,
  filename: string = 'stull-atlas-export.csv'
) {
  const csv = buildBlendCSV(rows)
  downloadFile(csv, filename, 'text/csv')
}

/**
 * Export a single recipe to CSV
 */
export function exportRecipeCSV(recipe: GlazeRecipe, umf: UMF, filename?: string) {
  const lines: string[] = []
  
  // Recipe
  lines.push('Recipe')
  lines.push('Material,Amount')
  for (const ing of recipe.ingredients) {
    lines.push(`"${ing.material}",${ing.amount}`)
  }
  lines.push('')
  
  // UMF
  lines.push('Unity Molecular Formula')
  lines.push('Oxide,Value')
  for (const oxide of UMF_COLUMNS) {
    const val = getOxideValue(umf, oxide)
    if (val > 0.001) {
      lines.push(`${oxide},${val.toFixed(4)}`)
    }
  }

  const csv = lines.join('\n')
  downloadFile(csv, filename || `${recipe.name || 'recipe'}.csv`, 'text/csv')
}

/**
 * Generate printable labels HTML for a blend grid
 */
export function generateLabelsHTML(
  rows: Array<{ label: string; umf: UMF; recipe?: GlazeRecipe }>
): string {
  const labels = rows.map(row => {
    const oxides = UMF_COLUMNS
      .map(o => ({ oxide: o, val: getOxideValue(row.umf, o) }))
      .filter(o => o.val > 0.001)

    const recipeLines = row.recipe
      ? row.recipe.ingredients.map(i => `${i.material}: ${i.amount}`).join('<br/>')
      : ''

    return `
      <div class="label">
        <div class="label-name">${row.label}</div>
        <div class="label-umf">
          ${oxides.map(o => `<span>${o.oxide}: ${o.val.toFixed(2)}</span>`).join(' · ')}
        </div>
        ${recipeLines ? `<div class="label-recipe">${recipeLines}</div>` : ''}
      </div>
    `
  }).join('')

  return `<!DOCTYPE html>
<html>
<head>
<title>Stull Atlas — Test Tile Labels</title>
<style>
  @page { margin: 10mm; }
  body { font-family: -apple-system, sans-serif; color: #111; }
  .label {
    border: 1px solid #ccc;
    padding: 8px 12px;
    margin: 4px 0;
    break-inside: avoid;
    font-size: 11px;
  }
  .label-name { font-weight: 700; font-size: 13px; margin-bottom: 4px; }
  .label-umf { color: #555; }
  .label-recipe { margin-top: 4px; color: #888; font-size: 10px; }
  @media print {
    .label { border: 1px solid #999; }
  }
</style>
</head>
<body>
${labels}
</body>
</html>`
}

/**
 * Open labels in a new print window
 */
export function printLabels(
  rows: Array<{ label: string; umf: UMF; recipe?: GlazeRecipe }>
) {
  const html = generateLabelsHTML(rows)
  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
    // Auto-trigger print after rendering
    setTimeout(() => win.print(), 500)
  }
}

/**
 * Download a string as a file
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Download binary data as a file
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// ── Image / PDF Export ──────────────────────────────────────

/**
 * Export a Plotly chart as an image.
 * Finds the .js-plotly-plot element and uses Plotly's toImage API.
 * Returns true if successful.
 */
export async function exportPlotAsImage(
  format: 'png' | 'svg' | 'jpeg' = 'png',
  filename: string = 'stull-atlas-chart',
  width: number = 1920,
  height: number = 1080,
): Promise<boolean> {
  try {
    // Dynamically import Plotly to avoid bundling it in the export utils
    const Plotly = await import('plotly.js-gl2d-dist-min')
    
    // Find the plotly chart in the DOM
    const plotEl = document.querySelector('.js-plotly-plot') as any
    if (!plotEl) {
      console.warn('[Export] No Plotly chart found in DOM')
      return false
    }
    
    const dataURL = await Plotly.toImage(plotEl, {
      format,
      width,
      height,
      scale: 2, // 2x for retina quality
    })
    
    // Convert data URL to blob and download
    const response = await fetch(dataURL)
    const blob = await response.blob()
    downloadBlob(blob, `${filename}.${format}`)
    
    return true
  } catch (err) {
    console.error('[Export] Failed to export chart image:', err)
    return false
  }
}

/**
 * Export the current view as a printable PDF via browser print dialog.
 * Creates a clean, print-optimized view in a new window.
 */
export function exportAsPrintPDF(title: string = 'Stull Atlas Export') {
  // Trigger the browser's native print with print-friendly styles
  const style = document.createElement('style')
  style.id = 'print-export-styles'
  style.textContent = `
    @media print {
      /* Hide navigation, controls */
      .layout-nav, .layout-header, .calc-sidebar,
      .explorer-controls, .filter-panel, .whatif-panel,
      button, .tabs, .tab-bar { display: none !important; }
      
      /* Make content fill the page */
      .calc-main, .calc-page, .explorer-main,
      .about-page, .about-content { 
        width: 100% !important;
        max-width: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      
      /* Ensure chart is visible */
      .js-plotly-plot {
        width: 100% !important;
        height: auto !important;
      }
      
      /* Print header */
      body::before {
        content: '${title} — stullatlas.app';
        display: block;
        text-align: center;
        font-size: 12pt;
        color: #666;
        padding: 8px 0 16px;
        border-bottom: 1px solid #ccc;
        margin-bottom: 16px;
      }
      
      /* Ensure tables print well */
      .results-table { font-size: 10pt; }
      .results-panel { break-inside: avoid; }
    }
  `
  document.head.appendChild(style)
  window.print()
  // Clean up after print dialog closes
  setTimeout(() => {
    const el = document.getElementById('print-export-styles')
    if (el) el.remove()
  }, 1000)
}

/**
 * Export blend results as a printable sheet with Stull chart position.
 * Generates a complete HTML document optimized for printing.
 */
export function exportBlendSheet(
  title: string,
  rows: Array<{ label: string; umf: UMF; recipe?: GlazeRecipe }>,
  chartImageDataURL?: string,
): void {
  const labels = rows.map(row => {
    const oxides = UMF_COLUMNS
      .map(o => ({ oxide: o, val: getOxideValue(row.umf, o) }))
      .filter(o => o.val > 0.001)

    const recipeLines = row.recipe
      ? row.recipe.ingredients
          .filter(i => i.material.trim() && i.amount > 0)
          .map(i => `<tr><td>${i.material}</td><td style="text-align:right">${i.amount}</td></tr>`)
          .join('')
      : ''

    return `
      <div class="blend-card">
        <div class="card-name">${row.label}</div>
        <table class="card-umf">
          <tr>${oxides.map(o => `<th>${o.oxide}</th>`).join('')}</tr>
          <tr>${oxides.map(o => `<td>${o.val.toFixed(3)}</td>`).join('')}</tr>
        </table>
        ${recipeLines ? `
          <table class="card-recipe">
            <tr><th>Material</th><th>Amount</th></tr>
            ${recipeLines}
          </table>
        ` : ''}
      </div>
    `
  }).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
<title>${title} — Stull Atlas</title>
<style>
  @page { margin: 12mm; size: portrait; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: #111; font-size: 10pt; }
  
  .header { text-align: center; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid #333; }
  .header h1 { font-size: 16pt; margin: 0 0 4px; }
  .header .meta { font-size: 9pt; color: #666; }
  
  ${chartImageDataURL ? `
  .chart-section { text-align: center; margin: 16px 0; break-inside: avoid; }
  .chart-section img { max-width: 100%; height: auto; border: 1px solid #ddd; }
  ` : ''}
  
  .blend-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 8px; 
    margin-top: 16px; 
  }
  
  .blend-card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    break-inside: avoid;
    font-size: 9pt;
  }
  
  .card-name { font-weight: 700; font-size: 11pt; margin-bottom: 6px; }
  
  .card-umf { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
  .card-umf th, .card-umf td { 
    padding: 2px 4px; text-align: center; font-size: 8pt;
    border-bottom: 1px solid #eee;
  }
  .card-umf th { color: #666; font-weight: 500; }
  .card-umf td { font-family: 'SF Mono', Menlo, monospace; }
  
  .card-recipe { width: 100%; border-collapse: collapse; }
  .card-recipe th, .card-recipe td { 
    padding: 2px 6px; font-size: 8pt;
    border-bottom: 1px solid #f0f0f0;
  }
  .card-recipe th { text-align: left; color: #666; font-weight: 500; }
  .card-recipe td:last-child { text-align: right; font-family: monospace; }
  
  @media print {
    .no-print { display: none; }
  }
</style>
</head>
<body>
<div class="header">
  <h1>${title}</h1>
  <div class="meta">Generated by Stull Atlas — stullatlas.app — ${new Date().toLocaleDateString()}</div>
</div>

${chartImageDataURL ? `
<div class="chart-section">
  <img src="${chartImageDataURL}" alt="Stull Atlas Chart" />
</div>
` : ''}

<div class="blend-grid">
${labels}
</div>

<script class="no-print">
  // Auto-print, then user can save as PDF
  window.onload = () => setTimeout(() => window.print(), 600);
</script>
</body>
</html>`

  const win = window.open('', '_blank')
  if (win) {
    win.document.write(html)
    win.document.close()
  }
}


// ── Glazy-Compatible Export ─────────────────────────────────────

const GLAZY_CSV_OXIDE_COLUMNS: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'Li2O', 'Na2O', 'K2O',
  'CaO', 'MgO', 'BaO', 'SrO', 'ZnO', 'MnO',
  'Fe2O3', 'TiO2', 'ZrO2', 'P2O5', 'Cr2O3', 'NiO', 'CuO', 'CoO', 'SnO2',
]

const SURFACE_TYPE_TO_GLAZY: Record<string, number> = {
  gloss: 1, satin: 2, matte: 3, unknown: 4, crystalline: 5, crawl: 6,
}

const TRANSPARENCY_TO_GLAZY: Record<string, number> = {
  transparent: 1, translucent: 2, opaque: 3,
}

const ATMOSPHERE_TO_GLAZY: Record<string, number> = {
  oxidation: 1, reduction: 2, neutral: 3,
}

/**
 * Convert a GlazeRecipe to a plain JSON object in Glazy-compatible format.
 * Preserves Glazy IDs where available and uses the same field naming conventions.
 */
export function recipeToGlazyJSON(recipe: GlazeRecipe): Record<string, unknown> {
  const umfFlat: Record<string, number> = {}
  if (recipe.umf) {
    for (const oxide of GLAZY_CSV_OXIDE_COLUMNS) {
      const val = getOxideValue(recipe.umf, oxide)
      if (val > 0) umfFlat[oxide] = parseFloat(val.toFixed(4))
    }
  }

  return {
    id: recipe.id.replace(/^glazy_/, ''),
    name: recipe.name,
    source: recipe.source,
    base_type_id: recipe.baseTypeId ?? 460,
    type_id: recipe.glazeTypeId ?? null,
    subtype_id: recipe.subtypeId ?? null,
    from_orton_cone: recipe.coneRange[0] !== '?' ? recipe.coneRange[0] : null,
    to_orton_cone: recipe.coneRange[1] !== '?' ? recipe.coneRange[1] : null,
    surface_type: SURFACE_TYPE_TO_GLAZY[recipe.surfaceType] ?? 4,
    transparency_type: recipe.transparency ? (TRANSPARENCY_TO_GLAZY[recipe.transparency] ?? null) : null,
    atmosphere: ATMOSPHERE_TO_GLAZY[recipe.atmosphere] ?? null,
    country: recipe.country ?? null,
    status: recipe.status ?? 'draft',
    description: recipe.description ?? recipe.notes ?? '',
    specific_gravity: recipe.specificGravity ?? null,
    material_components: recipe.ingredients.map((ing, idx) => ({
      material_id: ing.glazyMaterialId ?? null,
      material_name: ing.material,
      percentage_amount: ing.amount,
      is_additional: ing.isAdditional ?? false,
      sort_order: idx,
    })),
    umf: umfFlat,
    images: recipe.images ?? [],
    source_url: recipe.sourceUrl ?? null,
    created_at: recipe.createdAt ?? null,
    updated_at: recipe.updatedAt ?? null,
  }
}

/**
 * Export recipes in Glazy-compatible CSV format.
 * Columns match the Glazy CSV export: id, name, from_orton_cone, to_orton_cone,
 * surface_type, transparency_type, atmosphere, base_type_id, type_id, subtype_id,
 * country, SiO2_umf, Al2O3_umf, ...
 */
export function exportGlazyCSV(recipes: GlazeRecipe[], filename = 'stull-atlas-glazy-export.csv') {
  const oxideCols = GLAZY_CSV_OXIDE_COLUMNS.map(o => `${o}_umf`)
  const header = [
    'id', 'name', 'from_orton_cone', 'to_orton_cone',
    'surface_type', 'transparency_type', 'atmosphere',
    'base_type_id', 'type_id', 'subtype_id', 'country',
    ...oxideCols,
  ].join(',')

  const rows = recipes.map(r => {
    const oxideVals = GLAZY_CSV_OXIDE_COLUMNS.map(o =>
      r.umf ? getOxideValue(r.umf, o).toFixed(4) : ''
    )
    return [
      r.id.replace(/^glazy_/, ''),
      `"${(r.name || '').replace(/"/g, '""')}"`,
      r.coneRange[0] !== '?' ? r.coneRange[0] : '',
      r.coneRange[1] !== '?' ? r.coneRange[1] : '',
      SURFACE_TYPE_TO_GLAZY[r.surfaceType] ?? '',
      r.transparency ? (TRANSPARENCY_TO_GLAZY[r.transparency] ?? '') : '',
      ATMOSPHERE_TO_GLAZY[r.atmosphere] ?? '',
      r.baseTypeId ?? 460,
      r.glazeTypeId ?? '',
      r.subtypeId ?? '',
      r.country ?? '',
      ...oxideVals,
    ].join(',')
  })

  const csv = [header, ...rows].join('\n')
  downloadBlob(new Blob([csv], { type: 'text/csv' }), filename)
}

/**
 * Export recipes as Glazy-compatible JSON (array of objects).
 * Useful for data interchange or import into tools that accept JSON.
 */
export function exportGlazyJSON(recipes: GlazeRecipe[], filename = 'stull-atlas-glazy-export.json') {
  const data = recipes.map(recipeToGlazyJSON)
  const json = JSON.stringify(data, null, 2)
  downloadBlob(new Blob([json], { type: 'application/json' }), filename)
}


// ── 3D Mesh Export (OBJ / STL) ──────────────────────────────────

/**
 * Surface grid data for 3D export.
 * Matches the SurfaceGrid interface from analysis/surfaceFit.
 */
interface ExportSurfaceGrid {
  xCoords: number[]
  yCoords: number[]
  z: (number | null)[][]
}

/**
 * Scatter point for 3D export.
 */
export interface Export3DPoint {
  x: number
  y: number
  z: number
  name?: string
}

/**
 * Triangulate a regular surface grid into vertices + triangle faces.
 * Skips quads where any corner has a null/NaN z value.
 * Returns vertices as [x, y, z][] and faces as [v1, v2, v3][] (1-indexed for OBJ).
 */
export function triangulateSurfaceGrid(grid: ExportSurfaceGrid): {
  vertices: [number, number, number][]
  faces: [number, number, number][]
} {
  const { xCoords, yCoords, z } = grid
  const nx = xCoords.length
  const ny = yCoords.length

  // Build vertex array — z[yi][xi]
  const vertices: [number, number, number][] = []
  const vertexIndex = new Map<string, number>() // "yi,xi" → 1-based index

  for (let yi = 0; yi < ny; yi++) {
    for (let xi = 0; xi < nx; xi++) {
      const zVal = z[yi]?.[xi]
      if (zVal == null || !isFinite(zVal)) continue
      vertices.push([xCoords[xi], yCoords[yi], zVal])
      vertexIndex.set(`${yi},${xi}`, vertices.length) // 1-based
    }
  }

  // Build triangle faces from adjacent grid quads
  const faces: [number, number, number][] = []
  for (let yi = 0; yi < ny - 1; yi++) {
    for (let xi = 0; xi < nx - 1; xi++) {
      const tl = vertexIndex.get(`${yi},${xi}`)
      const tr = vertexIndex.get(`${yi},${xi + 1}`)
      const bl = vertexIndex.get(`${yi + 1},${xi}`)
      const br = vertexIndex.get(`${yi + 1},${xi + 1}`)

      // Need all 4 corners to make 2 triangles
      if (tl && tr && bl && br) {
        faces.push([tl, bl, tr])   // lower-left triangle
        faces.push([tr, bl, br])   // upper-right triangle
      }
    }
  }

  return { vertices, faces }
}

/**
 * Build Wavefront OBJ content string from a surface grid.
 * Universal 3D format — works in Blender, MeshLab, 3D slicers, etc.
 * Optionally includes scatter points as a second object group.
 */
export function buildOBJContent(
  grid: ExportSurfaceGrid,
  options: {
    zLabel?: string
    scatterPoints?: Export3DPoint[]
  } = {},
): string {
  const { zLabel = 'Z', scatterPoints } = options
  const { vertices, faces } = triangulateSurfaceGrid(grid)

  const lines: string[] = [
    `# Stull Atlas 3D Surface Export`,
    `# Axes: X = SiO2 (UMF), Y = Al2O3 (UMF), Z = ${zLabel}`,
    `# Generated by stullatlas.app`,
    `# Vertices: ${vertices.length}, Faces: ${faces.length}`,
    ``,
    `o FittedSurface`,
  ]

  // Vertices
  for (const [x, y, z] of vertices) {
    lines.push(`v ${x.toFixed(6)} ${y.toFixed(6)} ${z.toFixed(6)}`)
  }

  // Faces (1-indexed)
  lines.push('')
  for (const [a, b, c] of faces) {
    lines.push(`f ${a} ${b} ${c}`)
  }

  // Optional scatter points as a second group
  if (scatterPoints && scatterPoints.length > 0) {
    lines.push('')
    lines.push(`o GlazePoints`)
    const offset = vertices.length
    for (const pt of scatterPoints) {
      lines.push(`v ${pt.x.toFixed(6)} ${pt.y.toFixed(6)} ${pt.z.toFixed(6)}`)
    }
    // Points as degenerate faces (point primitives) — use 'p' element
    for (let i = 0; i < scatterPoints.length; i++) {
      lines.push(`p ${offset + i + 1}`)
    }
  }

  lines.push('')
  return lines.join('\n')
}

/**
 * Export a fitted surface grid as Wavefront OBJ (downloads file).
 */
export function exportSurfaceAsOBJ(
  grid: ExportSurfaceGrid,
  options: {
    filename?: string
    zLabel?: string
    scatterPoints?: Export3DPoint[]
  } = {},
) {
  const { filename = 'stull-atlas-surface.obj', ...rest } = options
  const content = buildOBJContent(grid, rest)
  downloadFile(content, filename, 'model/obj')
}

/**
 * Build a binary STL ArrayBuffer from a surface grid.
 * Suitable for 3D printing or import into CAD tools.
 */
export function buildSTLBuffer(grid: ExportSurfaceGrid): ArrayBuffer {
  const { vertices, faces } = triangulateSurfaceGrid(grid)

  // Binary STL format:
  // 80 bytes header + 4 bytes num triangles + 50 bytes per triangle
  const numTriangles = faces.length
  const bufferSize = 80 + 4 + numTriangles * 50
  const buffer = new ArrayBuffer(bufferSize)
  const view = new DataView(buffer)

  // Header (80 bytes) — pad with description
  const header = 'Stull Atlas Surface Export - stullatlas.app'
  const enc = new TextEncoder()
  const headerBytes = enc.encode(header)
  for (let i = 0; i < Math.min(80, headerBytes.length); i++) {
    view.setUint8(i, headerBytes[i])
  }

  // Number of triangles
  view.setUint32(80, numTriangles, true)

  // Write triangles
  let offset = 84
  for (const [a, b, c] of faces) {
    // vertices are 1-indexed, convert to 0-indexed
    const v0 = vertices[a - 1]
    const v1 = vertices[b - 1]
    const v2 = vertices[c - 1]

    // Compute face normal via cross product
    const u = [v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]]
    const w = [v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]]
    const nx = u[1] * w[2] - u[2] * w[1]
    const ny = u[2] * w[0] - u[0] * w[2]
    const nz = u[0] * w[1] - u[1] * w[0]
    const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1

    // Normal
    view.setFloat32(offset, nx / len, true); offset += 4
    view.setFloat32(offset, ny / len, true); offset += 4
    view.setFloat32(offset, nz / len, true); offset += 4

    // Vertex 1
    view.setFloat32(offset, v0[0], true); offset += 4
    view.setFloat32(offset, v0[1], true); offset += 4
    view.setFloat32(offset, v0[2], true); offset += 4

    // Vertex 2
    view.setFloat32(offset, v1[0], true); offset += 4
    view.setFloat32(offset, v1[1], true); offset += 4
    view.setFloat32(offset, v1[2], true); offset += 4

    // Vertex 3
    view.setFloat32(offset, v2[0], true); offset += 4
    view.setFloat32(offset, v2[1], true); offset += 4
    view.setFloat32(offset, v2[2], true); offset += 4

    // Attribute byte count (unused)
    view.setUint16(offset, 0, true); offset += 2
  }

  return buffer
}

/**
 * Export a fitted surface grid as binary STL (downloads file).
 */
export function exportSurfaceAsSTL(
  grid: ExportSurfaceGrid,
  options: {
    filename?: string
  } = {},
) {
  const { filename = 'stull-atlas-surface.stl' } = options
  const buffer = buildSTLBuffer(grid)
  downloadBlob(new Blob([buffer], { type: 'model/stl' }), filename)
}

/**
 * Export scatter points as CSV with 3D coordinates.
 * Simple format for quick data exploration in spreadsheets or scripts.
 */
export function exportScatterAsCSV(
  points: Export3DPoint[],
  options: {
    filename?: string
    zLabel?: string
  } = {},
) {
  const { filename = 'stull-atlas-3d-points.csv', zLabel = 'Z' } = options
  const header = `SiO2,Al2O3,${zLabel},Name`
  const rows = points.map(p =>
    `${p.x.toFixed(4)},${p.y.toFixed(4)},${p.z.toFixed(4)},"${(p.name || '').replace(/"/g, '""')}"`
  )
  downloadFile([header, ...rows].join('\n'), filename, 'text/csv')
}
