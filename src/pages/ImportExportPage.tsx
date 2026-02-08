/**
 * Import/Export Page
 * 
 * File picker for importing glazes from JSON/CSV,
 * export buttons for saved recipes, and glaze collection management.
 */

import React, { useState, useCallback } from 'react'
import { useRecipeStore } from '@/stores'
import { useImportExport } from '@/hooks'
import { usePageTitle } from '@/hooks/usePageTitle'
import { calcStyles } from './calc-styles'

export function ImportExportPage() {
  usePageTitle('Import / Export')
  const {
    importResult,
    importFromFile,
    importFromJSON,
    exportAllGlazes,
    exportSavedRecipes,
    fileInputRef,
    stats,
    recipes,
  } = useImportExport()
  const { clearAll } = useRecipeStore()
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'saved'>('import')

  const handleFileImport = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      await importFromFile(file)
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [importFromFile, fileInputRef],
  )

  const handlePasteJSON = useCallback(
    async (text: string) => {
      await importFromJSON(text)
    },
    [importFromJSON],
  )

  return (
    <div className="calc-page">
      <div className="calc-sidebar">
        <div className="calc-section">
          <h2>Import / Export</h2>
          <p className="subtitle">
            Load your own glazes or save your work
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
          {(['import', 'export', 'saved'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '8px 12px',
                background: activeTab === tab ? 'var(--accent-bg)' : 'var(--bg-input)',
                border: `1px solid ${activeTab === tab ? 'var(--accent)' : 'var(--border-secondary)'}`,
                borderRadius: 4, color: activeTab === tab ? 'var(--text-bright)' : 'var(--text-secondary)',
                fontSize: 12, cursor: 'pointer', textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Import Tab */}
        {activeTab === 'import' && (
          <>
            <div className="calc-section">
              <h3>Import from File</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                Accepts JSON, CSV, or Insight XML files with glaze recipes.
                Glazy CSV format is auto-detected.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv,.xml"
                onChange={handleFileImport}
                style={{ display: 'none' }}
              />
              <button
                className="calc-button"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File...
              </button>
            </div>

            <div className="calc-section">
              <h3>Paste JSON</h3>
              <textarea
                placeholder='{"glazes": [{"name": "...", "ingredients": [...]}]}'
                style={{
                  width: '100%', height: 120, padding: 10,
                  background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)',
                  borderRadius: 6, color: 'var(--text-label)', fontSize: 12,
                  fontFamily: "'SF Mono', monospace", resize: 'vertical',
                  boxSizing: 'border-box',
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handlePasteJSON((e.target as HTMLTextAreaElement).value)
                  }
                }}
              />
              <p style={{ fontSize: 11, color: 'var(--text-dim)', margin: '4px 0 0' }}>
                Ctrl+Enter to import
              </p>
            </div>

            {importResult && (
              <div className="calc-section" style={{
                padding: '12px 16px',
                background: importResult.errors.length > 0 ? '#2a1515' : '#152a15',
                border: `1px solid ${importResult.errors.length > 0 ? '#551515' : '#155515'}`,
                borderRadius: 8,
              }}>
                {importResult.count > 0 && (
                  <p style={{ color: '#4caf50', fontSize: 13, margin: '0 0 4px' }}>
                    ✓ Imported {importResult.count} glazes
                  </p>
                )}
                {importResult.errors.map((err, i) => (
                  <p key={i} style={{ color: '#e74c3c', fontSize: 13, margin: '2px 0' }}>⛔ {err}</p>
                ))}
              </div>
            )}
          </>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <>
            <div className="calc-section">
              <h3>Export All Glazes</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                {stats.total.toLocaleString()} glazes currently loaded
              </p>
              <button className="calc-button" onClick={exportAllGlazes} disabled={stats.total === 0}>
                Export as JSON
              </button>
            </div>
          </>
        )}

        {/* Saved Recipes Tab */}
        {activeTab === 'saved' && (
          <>
            <div className="calc-section">
              <h3>Saved Recipes</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                {recipes.length} recipes saved locally
              </p>
              <button
                className="calc-button"
                onClick={exportSavedRecipes}
                disabled={recipes.length === 0}
              >
                Export Saved Recipes
              </button>
              {recipes.length > 0 && (
                <button
                  className="calc-button"
                  onClick={() => { if (confirm('Delete all saved recipes?')) clearAll() }}
                  style={{ marginTop: 4, background: '#2a1515', borderColor: '#551515' }}
                >
                  Clear All Saved
                </button>
              )}
            </div>

            {recipes.length > 0 && (
              <div className="calc-section">
                {recipes.map(r => (
                  <div key={r.id} style={{
                    padding: '8px 10px', marginBottom: 4,
                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
                    borderRadius: 4, fontSize: 12,
                  }}>
                    <div style={{ color: 'var(--text-bright)', fontWeight: 600 }}>{r.name}</div>
                    <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                      {r.ingredients.length} materials · {r.atmosphere}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="calc-main">
        <div className="empty-state">
          <div className="icon">📦</div>
          <p>Import your glazes or export your work</p>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 12, textAlign: 'left', maxWidth: 500 }}>
            <p><strong>JSON format:</strong></p>
            <pre style={{
              background: 'var(--bg-secondary)', padding: 12, borderRadius: 6,
              fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
            }}>{`{
  "glazes": [{
    "name": "Celadon",
    "coneRange": [10, 10],
    "atmosphere": "reduction",
    "ingredients": [
      { "material": "Custer Feldspar", "amount": 40 },
      { "material": "Silica", "amount": 30 },
      { "material": "Whiting", "amount": 15 },
      { "material": "EPK Kaolin", "amount": 15 }
    ]
  }]
}`}</pre>
            <p style={{ marginTop: 12 }}><strong>CSV format:</strong></p>
            <pre style={{
              background: 'var(--bg-secondary)', padding: 12, borderRadius: 6,
              fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
            }}>{`name,cone,Custer Feldspar,Silica,Whiting,EPK Kaolin
Celadon,10,40,30,15,15`}</pre>
            <p style={{ marginTop: 12 }}><strong>Glazy CSV:</strong></p>
            <pre style={{
              background: 'var(--bg-secondary)', padding: 12, borderRadius: 6,
              fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
            }}>{`Directly import glazy-data-glazes-*.csv files.
Auto-detected by column headers (SiO2_umf, etc).`}</pre>
            <p style={{ marginTop: 12 }}><strong>Insight XML:</strong></p>
            <pre style={{
              background: 'var(--bg-secondary)', padding: 12, borderRadius: 6,
              fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
            }}>{`<recipe>
  <name>Celadon</name>
  <cone>10</cone>
  <ingredient>
    <name>Custer Feldspar</name>
    <amount>40</amount>
  </ingredient>
  ...
</recipe>`}</pre>
          </div>
        </div>
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

export default ImportExportPage
