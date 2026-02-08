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
