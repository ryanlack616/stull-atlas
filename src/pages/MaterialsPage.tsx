/**
 * Materials Page
 * 
 * Browse the Digitalfire material database: search, filter by category,
 * view oxide analyses.
 */

import React, { useState, useMemo } from 'react'
import { materialDatabase } from '@/domain/material'
import { Material, MaterialCategory, OxideSymbol } from '@/types'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

const OXIDE_ORDER: OxideSymbol[] = [
  'SiO2', 'Al2O3', 'B2O3', 'Na2O', 'K2O', 'CaO', 'MgO',
  'ZnO', 'BaO', 'SrO', 'Li2O', 'Fe2O3', 'TiO2', 'MnO', 'MnO2',
  'P2O5', 'SnO2', 'ZrO2', 'CoO', 'CuO', 'Cr2O3', 'NiO', 'PbO'
]

const CATEGORY_LABELS: Record<MaterialCategory, string> = {
  feldspar: 'Feldspars',
  clay: 'Clays',
  silica: 'Silica',
  calcium: 'Calcium Sources',
  magnesium: 'Magnesium Sources',
  frit: 'Frits',
  colorant: 'Colorants',
  opacifier: 'Opacifiers',
  flux: 'Fluxes',
  ash: 'Ash',
  other: 'Other',
}

export function MaterialsPage() {
  usePageTitle('Materials')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<MaterialCategory | 'all'>('all')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name')

  const allMaterials = useMemo(() => materialDatabase.getAllMaterials(), [])
  
  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allMaterials.length }
    for (const mat of allMaterials) {
      counts[mat.category] = (counts[mat.category] || 0) + 1
    }
    return counts
  }, [allMaterials])

  const filtered = useMemo(() => {
    let list = allMaterials

    if (categoryFilter !== 'all') {
      list = list.filter(m => m.category === categoryFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(m =>
        m.primaryName.toLowerCase().includes(q) ||
        m.aliases.some(a => a.toLowerCase().includes(q)) ||
        m.category.toLowerCase().includes(q)
      )
    }

    if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.primaryName.localeCompare(b.primaryName))
    } else {
      list = [...list].sort((a, b) =>
        a.category.localeCompare(b.category) || a.primaryName.localeCompare(b.primaryName)
      )
    }

    return list
  }, [allMaterials, search, categoryFilter, sortBy])

  const getAnalysis = (mat: Material): Record<string, number> | null => {
    return materialDatabase.getAnalysis(mat.id, 'digitalfire_2024')
  }

  return (
    <div className="calc-page">
      <div className="calc-sidebar">
        <div className="calc-section">
          <h2>Materials</h2>
          <p className="subtitle">
            {allMaterials.length} materials from Digitalfire database
          </p>
        </div>

        <div className="calc-section">
          <input
            type="text"
            placeholder="Search materials..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px', background: 'var(--bg-input)',
              border: '1px solid var(--border-secondary)', borderRadius: 6, color: 'var(--text-bright)',
              fontSize: 14, boxSizing: 'border-box',
            }}
          />
        </div>

        <div className="calc-section">
          <h3>Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <button
              onClick={() => setCategoryFilter('all')}
              style={catBtnStyle(categoryFilter === 'all')}
            >
              All <span style={{ color: 'var(--text-muted)' }}>({categoryCounts.all})</span>
            </button>
            {(Object.keys(CATEGORY_LABELS) as MaterialCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={catBtnStyle(categoryFilter === cat)}
              >
                {CATEGORY_LABELS[cat]} <span style={{ color: 'var(--text-muted)' }}>({categoryCounts[cat] || 0})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="calc-section">
          <h3>Sort</h3>
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => setSortBy('name')} style={catBtnStyle(sortBy === 'name')}>Name</button>
            <button onClick={() => setSortBy('category')} style={catBtnStyle(sortBy === 'category')}>Category</button>
          </div>
        </div>
      </div>

      <div className="calc-main">
        {selectedMaterial ? (
          <MaterialDetail material={selectedMaterial} onClose={() => setSelectedMaterial(null)} />
        ) : (
          <>
            <div className="results-panel">
              <div className="results-header">
                <h3>{filtered.length} materials</h3>
              </div>
              <div className="results-scroll" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Category</th>
                      <th>SiO₂</th>
                      <th>Al₂O₃</th>
                      <th>CaO</th>
                      <th>Na₂O</th>
                      <th>K₂O</th>
                      <th>MgO</th>
                      <th>LOI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(mat => {
                      const analysis = getAnalysis(mat)
                      const loi = materialDatabase.getLoi(mat.id)
                      return (
                        <tr
                          key={mat.id}
                          onClick={() => setSelectedMaterial(mat)}
                          style={{ cursor: 'pointer', opacity: mat.discontinued ? 0.6 : 1 }}
                        >
                          <td style={{ color: 'var(--text-bright)', fontFamily: 'inherit', fontWeight: 500 }}>
                            {mat.primaryName}
                            {mat.discontinued && <span style={{ marginLeft: 6, padding: '1px 5px', background: 'var(--accent-bg)', borderRadius: 3, fontSize: 10, color: 'var(--text-muted)' }}>discontinued</span>}
                          </td>
                          <td style={{ color: 'var(--text-secondary)', fontFamily: 'inherit' }}>{CATEGORY_LABELS[mat.category] || mat.category}</td>
                          <td>{fmtOxide(analysis, 'SiO2')}</td>
                          <td>{fmtOxide(analysis, 'Al2O3')}</td>
                          <td>{fmtOxide(analysis, 'CaO')}</td>
                          <td>{fmtOxide(analysis, 'Na2O')}</td>
                          <td>{fmtOxide(analysis, 'K2O')}</td>
                          <td>{fmtOxide(analysis, 'MgO')}</td>
                          <td style={{ color: 'var(--text-muted)' }}>{loi !== null ? loi.toFixed(1) : '—'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

/* Material Detail Panel */
function MaterialDetail({ material, onClose }: { material: Material; onClose: () => void }) {
  const analysis = materialDatabase.getAnalysis(material.id, 'digitalfire_2024')
  const loi = materialDatabase.getLoi(material.id)

  return (
    <div>
      <button
        onClick={onClose}
        style={{ background: 'var(--bg-input)', border: '1px solid var(--border-secondary)', borderRadius: 6, color: 'var(--text-label)', padding: '6px 14px', cursor: 'pointer', marginBottom: 16 }}
      >
        ← Back to list
      </button>

      <div className="results-panel" style={{ marginBottom: 16 }}>
        <div className="results-header">
          <h3>
            {material.primaryName}
            {material.discontinued && <span style={{ marginLeft: 8, padding: '2px 8px', background: '#7f1d1d', borderRadius: 4, fontSize: 11, color: '#fca5a5' }}>Discontinued</span>}
          </h3>
          <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{material.category}</span>
        </div>
        <div style={{ padding: 16 }}>
          {material.aliases.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: 6 }}>Also known as</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {material.aliases.map(a => (
                  <span key={a} style={{ padding: '3px 8px', background: 'var(--bg-input)', borderRadius: 4, fontSize: 12, color: 'var(--text-label)' }}>{a}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {analysis && (
        <div className="results-panel">
          <div className="results-header">
            <h3>Oxide Analysis (wt%)</h3>
          </div>
          <div style={{ padding: '0 16px 16px' }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Oxide</th>
                  <th>Weight %</th>
                  <th>Bar</th>
                </tr>
              </thead>
              <tbody>
                {OXIDE_ORDER.map(oxide => {
                  const val = (analysis as any)[oxide]
                  if (!val || val < 0.01) return null
                  return (
                    <tr key={oxide}>
                      <td style={{ fontFamily: 'inherit' }}>{oxide}</td>
                      <td>{val.toFixed(2)}</td>
                      <td style={{ width: '50%' }}>
                        <div style={{
                          width: `${Math.min(val, 100)}%`,
                          height: 8,
                          background: oxideColor(oxide),
                          borderRadius: 4,
                          minWidth: 2,
                        }} />
                      </td>
                    </tr>
                  )
                })}
                {loi !== null && loi > 0 && (
                  <tr style={{ borderTop: '1px solid var(--border-secondary)' }}>
                    <td style={{ fontFamily: 'inherit', color: 'var(--text-muted)' }}>LOI</td>
                    <td style={{ color: 'var(--text-muted)' }}>{loi.toFixed(2)}</td>
                    <td style={{ width: '50%' }}>
                      <div style={{
                        width: `${Math.min(loi, 100)}%`,
                        height: 8,
                        background: '#555',
                        borderRadius: 4,
                        minWidth: 2,
                      }} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

function fmtOxide(analysis: Record<string, number> | null, oxide: string): string {
  if (!analysis) return '—'
  const val = (analysis as any)[oxide]
  if (!val || val < 0.01) return '—'
  return val.toFixed(1)
}

function oxideColor(oxide: string): string {
  const colors: Record<string, string> = {
    SiO2: '#3498db', Al2O3: '#2ecc71', B2O3: '#9b59b6',
    Na2O: '#e74c3c', K2O: '#e67e22', CaO: '#f1c40f',
    MgO: '#1abc9c', ZnO: '#95a5a6', BaO: '#e91e63',
    Fe2O3: '#795548', TiO2: '#607d8b', Li2O: '#ff9800',
    SrO: '#00bcd4', MnO: '#8bc34a', MnO2: '#689f38', P2O5: '#ff5722',
    SnO2: '#cddc39', ZrO2: '#009688', CoO: '#3f51b5',
    CuO: '#00897b', Cu2O: '#26a69a', Cr2O3: '#43a047',
    NiO: '#78909c', PbO: '#8d6e63',
  }
  return colors[oxide] || '#666'
}

function catBtnStyle(active: boolean): React.CSSProperties {
  return {
    padding: '6px 10px',
    background: active ? 'var(--accent-bg)' : 'transparent',
    border: active ? '1px solid var(--accent)' : '1px solid transparent',
    borderRadius: 4,
    color: active ? 'var(--text-bright)' : 'var(--text-secondary)',
    fontSize: 12,
    cursor: 'pointer',
    textAlign: 'left',
  }
}

export default MaterialsPage
