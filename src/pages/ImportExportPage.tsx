/**
 * Import/Export Page
 * 
 * File picker for importing glazes from JSON/CSV,
 * export buttons for saved recipes, and glaze collection management.
 */

import React, { useState, useCallback } from 'react'
import { useRecipeStore, useGlazeStore } from '@/stores'
import { useImportExport } from '@/hooks'
import { usePageTitle } from '@/hooks'
import { calcStyles } from './calc-styles'
import type { ImportResult } from '@/hooks/useImportExport'

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
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'saved' | 'glazy'>('import')

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
          {(['import', 'glazy', 'export', 'saved'] as const).map(tab => (
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
              {tab === 'glazy' ? 'Glazy' : tab}
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

        {/* Glazy Tab */}
        {activeTab === 'glazy' && (
          <GlazyTab
            fileInputRef={fileInputRef}
            handleFileImport={handleFileImport}
            importResult={importResult}
          />
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
            <div className="calc-section">
              <h3>Glazy-Compatible Export</h3>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
                Export in Glazy-compatible format for use in other tools
              </p>
              <button
                className="calc-button"
                disabled={stats.total === 0}
                onClick={async () => {
                  const { exportGlazyCSV } = await import('@/utils/export')
                  const glazes = useGlazeStore.getState().getGlazesArray()
                  exportGlazyCSV(glazes, 'stull-atlas-glazes-glazy.csv')
                }}
              >
                Export Glazy CSV
              </button>
              <button
                className="calc-button"
                style={{ marginTop: 4 }}
                disabled={stats.total === 0}
                onClick={async () => {
                  const { exportGlazyJSON } = await import('@/utils/export')
                  const glazes = useGlazeStore.getState().getGlazesArray()
                  exportGlazyJSON(glazes, 'stull-atlas-glazes-glazy.json')
                }}
              >
                Export Glazy JSON
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
        {activeTab === 'glazy' ? (
          <div className="empty-state">
            <div className="icon">🏺</div>
            <p>Import from Glazy — the open ceramic recipe database</p>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 16, textAlign: 'left', maxWidth: 560 }}>
              <h3 style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8 }}>Two ways to import Glazy data</h3>
              
              <div style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <h4 style={{ color: 'var(--text-bright)', margin: '0 0 8px', fontSize: 13 }}>Option 1: Paste a Glazy Search URL</h4>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 8px', lineHeight: 1.6 }}>
                  Go to <a href="https://glazy.org/search?base_type=460" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>glazy.org/search</a>,
                  filter by cone, atmosphere, surface, or glaze type — then copy the URL from your browser's 
                  address bar and paste it here. We'll match those filters against our {stats.total.toLocaleString()} loaded glazes.
                </p>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: 11 }}>
                  Example: <code style={{ color: 'var(--accent)', fontSize: 11 }}>https://glazy.org/search?base_type=460&type=500&cone=10&atmosphere=2</code>
                </p>
              </div>
              
              <div style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <h4 style={{ color: 'var(--text-bright)', margin: '0 0 8px', fontSize: 13 }}>Option 2: Upload Glazy CSV</h4>
                <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 2, color: 'var(--text-secondary)' }}>
                  <li>Sign in to <a href="https://glazy.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>glazy.org</a></li>
                  <li>Go to your collection or search results</li>
                  <li>Click <strong>Export → CSV</strong></li>
                  <li>Upload the downloaded CSV file</li>
                </ol>
              </div>
              
              <h3 style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 8 }}>What gets imported</h3>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <li>Recipe name, cone range, atmosphere, surface type</li>
                <li>Full UMF (SiO₂, Al₂O₃, and all flux oxides)</li>
                <li>Glaze type classification (Celadon, Shino, Tenmoku, etc.)</li>
                <li>Transparency, country, and status metadata</li>
                <li>All recipes appear immediately on the Stull chart</li>
              </ul>
              
              <div style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 6, marginTop: 16, borderLeft: '3px solid var(--accent)' }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 12 }}>
                  <strong>Tip:</strong> You can also use the Export tab to save your glazes in Glazy-compatible 
                  CSV or JSON format — perfect for sharing or re-importing elsewhere.
                </p>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>

      <style>{calcStyles}</style>
    </div>
  )
}

// ── Glazy Tab component ──────────────────────────────────────

interface GlazyTabProps {
  fileInputRef: React.RefObject<HTMLInputElement>
  handleFileImport: (e: React.ChangeEvent<HTMLInputElement>) => void
  importResult: ImportResult | null
}

function GlazyTab({ fileInputRef, handleFileImport, importResult }: GlazyTabProps) {
  const [searchUrl, setSearchUrl] = useState('')
  const [searchResult, setSearchResult] = useState<{
    count: number
    description: string
    loaded: boolean
  } | null>(null)
  const [searching, setSearching] = useState(false)
  const loadGlazes = useGlazeStore(s => s.loadGlazes)

  const handleSearchURL = useCallback(async () => {
    if (!searchUrl.trim()) return
    setSearching(true)
    setSearchResult(null)

    try {
      const {
        parseGlazySearchURL,
        filterByGlazyParams,
        describeGlazySearch,
      } = await import('@/infra/glazes/glazySearch')

      const params = parseGlazySearchURL(searchUrl)
      if (!params) {
        setSearchResult({ count: 0, description: 'Not a valid Glazy search URL', loaded: false })
        setSearching(false)
        return
      }

      const description = describeGlazySearch(params)

      // Get all currently loaded glazes and filter
      const allGlazes = useGlazeStore.getState().getGlazesArray()
      const matched = filterByGlazyParams(allGlazes, params)

      setSearchResult({
        count: matched.length,
        description,
        loaded: false,
      })

      if (matched.length > 0) {
        // Load the filtered subset — replaces current dataset  
        loadGlazes(matched)
        setSearchResult({
          count: matched.length,
          description,
          loaded: true,
        })
      }
    } catch (err) {
      setSearchResult({ count: 0, description: 'Failed to parse URL', loaded: false })
    }
    setSearching(false)
  }, [searchUrl, loadGlazes])

  return (
    <>
      <div className="calc-section">
        <h3>Import from Glazy</h3>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 12px' }}>
          Import a Glazy Stull chart view or your own collection.
        </p>
      </div>

      <div className="calc-section">
        <h3>Option 1: Paste Search URL</h3>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 8px' }}>
          Copy a Glazy search URL to filter matching glazes:
        </p>
        <input
          type="text"
          value={searchUrl}
          onChange={e => setSearchUrl(e.target.value)}
          placeholder="https://glazy.org/search?base_type=460&cone=6"
          style={{
            width: '100%', padding: '8px 10px',
            background: 'var(--bg-input)', border: '1px solid var(--border-secondary)',
            borderRadius: 6, color: 'var(--text-bright)', fontSize: 13, boxSizing: 'border-box',
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleSearchURL() }}
        />
        <button
          className="calc-button"
          style={{ marginTop: 8 }}
          disabled={!searchUrl.trim() || searching}
          onClick={handleSearchURL}
        >
          {searching ? 'Searching...' : 'Filter Glazes'}
        </button>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
          Supported params: base_type, type, cone, atmosphere, surface, transparency
        </div>
      </div>

      {searchResult && (
        <div className="calc-section" style={{
          padding: '12px 16px',
          background: searchResult.count === 0 ? '#2a1515' : searchResult.loaded ? '#152a15' : 'var(--bg-tertiary)',
          border: `1px solid ${searchResult.count === 0 ? '#551515' : searchResult.loaded ? '#155515' : 'var(--border-secondary)'}`,
          borderRadius: 8,
        }}>
          <p style={{
            color: 'var(--text-bright)', fontSize: 13, margin: '0 0 4px', fontWeight: 600,
          }}>
            {searchResult.description}
          </p>
          <p style={{
            color: searchResult.count === 0 ? '#e74c3c' : '#4caf50',
            fontSize: 13, margin: 0,
          }}>
            {searchResult.count === 0
              ? 'No matching glazes found. Try broadening your search.'
              : searchResult.loaded
                ? `✓ Loaded ${searchResult.count.toLocaleString()} matching glazes on the Stull chart`
                : `Found ${searchResult.count.toLocaleString()} matches`
            }
          </p>
        </div>
      )}

      <div className="calc-section" style={{ borderTop: '1px solid var(--border-secondary)', paddingTop: 16, marginTop: 16 }}>
        <h3>Option 2: Upload Glazy CSV</h3>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 8px' }}>
          Upload a CSV exported from Glazy (auto-detected):
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json"
          onChange={handleFileImport}
          style={{ display: 'none' }}
        />
        <button
          className="calc-button"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Glazy CSV / JSON
        </button>
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
              ✓ Imported {importResult.count} glazes from Glazy
            </p>
          )}
          {importResult.errors.map((err, i) => (
            <p key={i} style={{ color: '#e74c3c', fontSize: 13, margin: '2px 0' }}>⛔ {err}</p>
          ))}
        </div>
      )}

      <div className="calc-section" style={{ borderTop: '1px solid var(--border-secondary)', paddingTop: 16, marginTop: 16 }}>
        <h3>Example URLs to try</h3>
        <div style={{ fontSize: 12, lineHeight: 2 }}>
          {[
            { label: 'Cone 6 Oxidation Glazes', url: 'https://glazy.org/search?base_type=460&cone=6&atmosphere=1' },
            { label: 'Cone 10 Reduction Celadons', url: 'https://glazy.org/search?base_type=460&type=500&cone=10&atmosphere=2' },
            { label: 'All Shino Glazes', url: 'https://glazy.org/search?base_type=460&type=590' },
            { label: 'Cone 6 Matte Glazes', url: 'https://glazy.org/search?base_type=460&cone=6&surface=3' },
            { label: 'All Tenmoku', url: 'https://glazy.org/search?base_type=460&type=540' },
          ].map(ex => (
            <div key={ex.url}>
              <button
                onClick={() => { setSearchUrl(ex.url); setSearchResult(null) }}
                style={{
                  background: 'none', border: 'none', color: 'var(--accent)',
                  cursor: 'pointer', padding: 0, fontSize: 12, textAlign: 'left',
                }}
              >
                {ex.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ImportExportPage
