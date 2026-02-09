/**
 * ComparePanel — Side-by-side glaze comparison
 * 
 * Extracted from StullAtlas/index.tsx for maintainability.
 * Shows up to 3 glazes with UMF values, ratios, recipes,
 * visual bar charts, and delta highlighting.
 */

import React, { useState, useMemo } from 'react'
import { GlazeRecipe, Ingredient } from '@/types'
import { UMFFingerprint, FluxDonut, OxideRadar, GlazeTypeBadge, ConeRangeBar, OxideTd } from '@/components/UMFVisuals'

/** Subscript helper for oxide formulas (kept for backward compat, prefer OxideTd) */
const subscript = (s: string) => s.replace(/([A-Z][a-z]?)(\d+)/g, '$1<sub>$2</sub>')

interface ComparePanelProps {
  glazes: GlazeRecipe[]
  onRemove: (id: string) => void
  onClear: () => void
  onSelect: (g: GlazeRecipe) => void
}

/** Mini inline bar for visual comparison */
function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div style={{
      width: '100%', height: 3, background: 'var(--bg-tertiary)',
      borderRadius: 2, marginTop: 2, overflow: 'hidden',
    }}>
      <div style={{
        width: `${pct}%`, height: '100%',
        background: color, borderRadius: 2,
        transition: 'width 0.3s ease',
      }} />
    </div>
  )
}

export function ComparePanel({ glazes, onRemove, onClear, onSelect }: ComparePanelProps) {
  const [copied, setCopied] = useState(false)
  const [showBars, setShowBars] = useState(true)

  if (glazes.length === 0) {
    return (
      <div className="compare-empty">
        <p>No glazes selected for comparison.</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Click a glaze in the Detail tab and press "Add to Compare" to start comparing up to 3 glazes side-by-side.
        </p>
      </div>
    )
  }

  const oxideGroups = [
    { label: 'Fluxes (R₂O)', oxides: ['Li2O', 'Na2O', 'K2O'] as const },
    { label: 'Fluxes (RO)', oxides: ['CaO', 'MgO', 'ZnO', 'BaO', 'SrO'] as const },
    { label: 'Stabilizers', oxides: ['Al2O3', 'B2O3', 'Fe2O3'] as const },
    { label: 'Glass Formers', oxides: ['SiO2', 'TiO2', 'ZrO2'] as const },
  ]

  // Collect all oxides that appear in any glaze
  const allOxides = new Set<string>()
  glazes.forEach(g => {
    const umf = g.umf
    if (!umf) return
    oxideGroups.forEach(group => {
      group.oxides.forEach(ox => {
        if ((umf[ox]?.value ?? 0) > 0.001) allOxides.add(ox)
      })
    })
  })
  
  // Build plain-text table for clipboard
  const buildTextTable = () => {
    const cols = ['', ...glazes.map(g => g.name)]
    const rows: string[][] = []
    rows.push(['Cone', ...glazes.map(g => `${g.coneRange[0]}–${g.coneRange[1]}`)])
    rows.push(['Surface', ...glazes.map(g => g.surfaceType)])
    rows.push(['Atmosphere', ...glazes.map(g => g.atmosphere)])
    oxideGroups.forEach(group => {
      const active = group.oxides.filter(ox => allOxides.has(ox))
      if (active.length === 0) return
      rows.push([`— ${group.label} —`])
      active.forEach(ox => {
        rows.push([ox, ...glazes.map(g => (g.umf?.[ox]?.value ?? 0).toFixed(3))])
      })
    })
    const metas = glazes.map(g => g.umf?._meta)
    if (metas.some(m => m)) {
      rows.push(['— Ratios —'])
      rows.push(['Si:Al', ...metas.map(m => m?.SiO2_Al2O3_ratio?.toFixed(2) ?? '—')])
      rows.push(['R₂O:RO', ...metas.map(m => m?.R2O_RO_ratio?.toFixed(2) ?? '—')])
    }
    const allMats = new Set<string>()
    glazes.forEach(g => g.ingredients.forEach(ing => allMats.add(ing.material)))
    rows.push(['— Recipe —'])
    allMats.forEach(mat => {
      rows.push([mat, ...glazes.map(g => {
        const ing = g.ingredients.find(i => i.material === mat)
        return ing ? ing.amount.toFixed(1) : '—'
      })])
    })
    // Pad columns
    const widths = cols.map((_, ci) => Math.max(cols[ci]?.length ?? 0, ...rows.map(r => (r[ci] ?? '').length)))
    const header = cols.map((c, i) => c.padEnd(widths[i])).join('  ')
    const body = rows.map(r => cols.map((_, i) => (r[i] ?? '').padEnd(widths[i])).join('  ')).join('\n')
    return header + '\n' + body
  }

  const buildCSV = () => {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`
    const cols = ['', ...glazes.map(g => esc(g.name))]
    const rows: string[][] = []
    rows.push(['Cone', ...glazes.map(g => `${g.coneRange[0]}-${g.coneRange[1]}`)])
    rows.push(['Surface', ...glazes.map(g => esc(g.surfaceType))])
    rows.push(['Atmosphere', ...glazes.map(g => esc(g.atmosphere))])
    oxideGroups.forEach(group => {
      group.oxides.filter(ox => allOxides.has(ox)).forEach(ox => {
        rows.push([ox, ...glazes.map(g => (g.umf?.[ox]?.value ?? 0).toFixed(3))])
      })
    })
    const metas = glazes.map(g => g.umf?._meta)
    rows.push(['Si:Al', ...metas.map(m => m?.SiO2_Al2O3_ratio?.toFixed(2) ?? '')])
    rows.push(['R2O:RO', ...metas.map(m => m?.R2O_RO_ratio?.toFixed(2) ?? '')])
    const allMats = new Set<string>()
    glazes.forEach(g => g.ingredients.forEach(ing => allMats.add(ing.material)))
    allMats.forEach(mat => {
      rows.push([esc(mat), ...glazes.map(g => {
        const ing = g.ingredients.find(i => i.material === mat)
        return ing ? ing.amount.toFixed(1) : ''
      })])
    })
    return [cols.join(','), ...rows.map(r => r.join(','))].join('\n')
  }

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(buildTextTable())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportCSV = () => {
    const blob = new Blob([buildCSV()], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `stull-compare-${glazes.length}-glazes.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="comparison-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h4 style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          Comparing {glazes.length} Glaze{glazes.length > 1 ? 's' : ''}
        </h4>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={() => setShowBars(!showBars)} className="compare-clear-btn" title="Toggle visual bars">
            {showBars ? '▮ Bars' : '▯ Bars'}
          </button>
          <button onClick={handleCopyText} className="compare-clear-btn" title="Copy comparison as text">
            {copied ? '✓ Copied' : '📋 Copy'}
          </button>
          <button onClick={handleExportCSV} className="compare-clear-btn" title="Download as CSV">
            📥 CSV
          </button>
          <button onClick={onClear} className="compare-clear-btn">Clear All</button>
        </div>
      </div>

      {/* Names & metadata row */}
      <table className="compare-table">
        <thead>
          <tr>
            <th></th>
            {glazes.map(g => (
              <th key={g.id}>
                <button className="compare-name-btn" onClick={() => onSelect(g)} title="View details">
                  {g.name}
                </button>
                <button className="compare-remove" onClick={() => onRemove(g.id)} title="Remove">×</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="compare-meta-row">
            <td>Type</td>
            {glazes.map(g => <td key={g.id}><GlazeTypeBadge glazeTypeId={g.glazeTypeId} size="sm" /></td>)}
          </tr>
          <tr className="compare-meta-row">
            <td>Cone</td>
            {glazes.map(g => <td key={g.id}><ConeRangeBar coneRange={g.coneRange} width={100} height={16} /></td>)}
          </tr>
          <tr className="compare-meta-row">
            <td>Surface</td>
            {glazes.map(g => <td key={g.id}>{g.surfaceType}</td>)}
          </tr>
          <tr className="compare-meta-row">
            <td>Atmosphere</td>
            {glazes.map(g => <td key={g.id}>{g.atmosphere}</td>)}
          </tr>

          {/* UMF Fingerprint bars */}
          <tr className="compare-meta-row">
            <td>UMF</td>
            {glazes.map(g => {
              const umf = g.umf
              return <td key={g.id}>{umf ? <UMFFingerprint umf={umf} width={100} compact /> : '—'}</td>
            })}
          </tr>

          {/* Flux Donut + Oxide Radar */}
          <tr className="compare-meta-row">
            <td>Fluxes</td>
            {glazes.map(g => {
              const umf = g.umf
              return <td key={g.id}>{umf ? <FluxDonut umf={umf} size={64} /> : '—'}</td>
            })}
          </tr>
          <tr className="compare-meta-row">
            <td>Profile</td>
            {glazes.map((g, i) => {
              const umf = g.umf
              const compareUmf = i > 0 ? glazes[0].umf : undefined
              return <td key={g.id}>{umf ? <OxideRadar umf={umf} compareUmf={compareUmf} size={100} /> : '—'}</td>
            })}
          </tr>

          {/* UMF comparison by oxide group */}
          {oxideGroups.map(group => {
            const activeOxides = group.oxides.filter(ox => allOxides.has(ox))
            if (activeOxides.length === 0) return null
            return (
              <React.Fragment key={group.label}>
                <tr className="compare-group-row">
                  <td colSpan={glazes.length + 1}>{group.label}</td>
                </tr>
                {activeOxides.map(ox => {
                  const values = glazes.map(g => g.umf?.[ox]?.value ?? 0)
                  const max = Math.max(...values)
                  const min = Math.min(...values)
                  const range = max - min
                  const barColors = ['#3498db', '#e67e22', '#2ecc71']
                  return (
                    <tr key={ox}>
                      <OxideTd oxide={ox} />
                      {values.map((val, i) => (
                        <td key={glazes[i].id} className="compare-value" style={{
                          fontWeight: glazes.length > 1 && val === max && max !== min ? 600 : 400,
                          color: glazes.length > 1 && val === max && max !== min ? 'var(--accent)' : 'var(--text-primary)',
                        }}>
                          {val.toFixed(3)}
                          {glazes.length > 1 && range > 0.01 && (
                            <span style={{
                              fontSize: 9, marginLeft: 3,
                              color: val === max ? 'rgba(76,175,80,0.7)' : val === min ? 'rgba(244,67,54,0.6)' : 'var(--text-dim)',
                            }}>
                              {val === max ? '▲' : val === min ? '▼' : ''}
                            </span>
                          )}
                          {showBars && <MiniBar value={val} max={max || 1} color={barColors[i % barColors.length]} />}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </React.Fragment>
            )
          })}

          {/* Ratios */}
          {(() => {
            const metas = glazes.map(g => g.umf?._meta)
            if (metas.every(m => !m)) return null
            return (
              <>
                <tr className="compare-group-row"><td colSpan={glazes.length + 1}>Ratios</td></tr>
                <tr>
                  <td>Si:Al</td>
                  {metas.map((m, i) => <td key={glazes[i].id} className="compare-value">{m?.SiO2_Al2O3_ratio?.toFixed(2) ?? '—'}</td>)}
                </tr>
                <tr>
                  <td>R₂O:RO</td>
                  {metas.map((m, i) => <td key={glazes[i].id} className="compare-value">{m?.R2O_RO_ratio?.toFixed(2) ?? '—'}</td>)}
                </tr>
              </>
            )
          })()}

          {/* Recipe ingredients */}
          <tr className="compare-group-row"><td colSpan={glazes.length + 1}>Recipe</td></tr>
          {(() => {
            // Collect all unique materials
            const allMats = new Set<string>()
            glazes.forEach(g => g.ingredients.forEach(ing => allMats.add(ing.material)))
            return Array.from(allMats).map(mat => (
              <tr key={mat}>
                <td style={{ fontSize: 11 }}>{mat}</td>
                {glazes.map(g => {
                  const ing = g.ingredients.find(i => i.material === mat)
                  return <td key={g.id} className="compare-value">{ing ? ing.amount.toFixed(1) : '—'}</td>
                })}
              </tr>
            ))
          })()}
        </tbody>
      </table>
    </div>
  )
}
