/**
 * AnalysisSetPicker Component
 *
 * UI for selecting which material analysis data set is active.
 * Mirrors MolarSetPicker: button bank with info panel.
 *
 * When a set is selected, the MaterialDatabase singleton gets
 * updated with overridden oxide analyses for materials in that set.
 * All downstream consumers (Stull map, UMF calc, materials page)
 * automatically pick up the new values.
 */

import React, { useState } from 'react'
import { useMaterialAnalysisStore } from '@/stores'
import type { MaterialAnalysisSetId } from '@/domain/materialAnalysis'

export function AnalysisSetPicker() {
  const {
    currentSetId,
    availableSets,
    setAnalysisSet,
  } = useMaterialAnalysisStore()

  const [showDetails, setShowDetails] = useState(false)

  const currentSetInfo = availableSets.find((s) => s.id === currentSetId)

  // Only show populated sets (not stubs)
  const displaySets = availableSets.filter(
    (s) => s.status === 'populated' || s.id === 'app_default'
  )

  // If there's only one populated set, don't render the picker at all
  if (displaySets.length <= 1) return null

  return (
    <div className="analysis-set-picker">
      <div className="analysis-header">
        <h3>Material Analyses</h3>
        <button
          className="analysis-info-toggle"
          onClick={() => setShowDetails(!showDetails)}
          title={showDetails ? 'Hide details' : 'Show source details'}
        >
          {showDetails ? '\u25BE' : '\u24D8'}
        </button>
      </div>

      <div className="analysis-set-buttons">
        {displaySets.map((setInfo) => (
          <button
            key={setInfo.id}
            className={`analysis-set-button ${
              currentSetId === setInfo.id ? 'active' : ''
            }`}
            onClick={() => setAnalysisSet(setInfo.id as MaterialAnalysisSetId)}
            title={setInfo.notes}
          >
            <span className="analysis-set-name">{setInfo.name}</span>
            <span className="analysis-set-meta">
              {setInfo.year && (
                <span className="analysis-set-year">{setInfo.year}</span>
              )}
              {setInfo.materialCount > 0 && (
                <span className="analysis-set-count">
                  {setInfo.materialCount} mat{setInfo.materialCount !== 1 ? 's' : ''}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Source info */}
      <div className="analysis-source-info">
        <p className="analysis-source-text">
          {currentSetInfo?.id === 'app_default' ? (
            <>
              Default: <strong>Stull Atlas built-in</strong> analyses from{' '}
              <a href="https://digitalfire.com" target="_blank" rel="noopener noreferrer">
                Digitalfire
              </a>
              , verified Feb 2026.
            </>
          ) : (
            <>
              Active: <strong>{currentSetInfo?.name}</strong>
              {currentSetInfo?.authority && <> — {currentSetInfo.authority}</>}
            </>
          )}
        </p>
        {currentSetInfo && currentSetInfo.materialCount > 0 && currentSetInfo.id !== 'app_default' && (
          <p className="analysis-override-note">
            {currentSetInfo.materialCount} material{currentSetInfo.materialCount !== 1 ? 's' : ''} overridden
            — all others use default values.
          </p>
        )}
      </div>

      {/* Expandable details */}
      {showDetails && (
        <div className="analysis-details">
          {displaySets.map(setInfo => (
            <div key={setInfo.id} className="analysis-detail-row">
              <div className="analysis-detail-header">
                <strong>{setInfo.name}</strong>
                <span className="analysis-detail-year">{setInfo.year}</span>
              </div>
              <div className="analysis-detail-meta">
                {setInfo.source}
                {setInfo.authority && <> — {setInfo.authority}</>}
              </div>
              {setInfo.notes && (
                <div className="analysis-detail-notes">{setInfo.notes}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="analysis-thanks">Thanks, Tony.</p>

      <style>{`
        .analysis-set-picker {
          padding: 16px;
          background: var(--bg-elevated);
          border-radius: 8px;
        }
        .analysis-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .analysis-header h3 {
          margin: 0;
          font-size: 14px;
          color: var(--text-bright);
        }
        .analysis-info-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 16px;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .analysis-info-toggle:hover {
          background: var(--bg-input);
          color: var(--accent);
        }
        .analysis-set-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .analysis-set-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: var(--bg-input);
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          color: var(--text-label);
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .analysis-set-button:hover {
          background: var(--border-input);
          border-color: var(--text-dim);
        }
        .analysis-set-button.active {
          background: var(--accent-bg);
          border-color: var(--accent);
          color: var(--text-bright);
        }
        .analysis-set-name {
          font-weight: 500;
          font-size: 13px;
        }
        .analysis-set-meta {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .analysis-set-year {
          font-size: 11px;
          background: var(--border-secondary);
          padding: 2px 6px;
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .analysis-set-count {
          font-size: 10px;
          color: var(--text-tertiary);
        }
        .analysis-source-info {
          padding: 10px 12px;
          background: var(--bg-input);
          border-radius: 6px;
          border-left: 3px solid var(--accent);
        }
        .analysis-source-text {
          margin: 0;
          font-size: 12px;
          color: var(--text-label);
          line-height: 1.4;
        }
        .analysis-source-text a {
          color: var(--accent);
          text-decoration: none;
        }
        .analysis-source-text a:hover {
          text-decoration: underline;
        }
        .analysis-override-note {
          margin: 6px 0 0 0;
          font-size: 11px;
          color: var(--text-tertiary);
          font-style: italic;
        }
        .analysis-details {
          margin-top: 12px;
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          overflow: hidden;
        }
        .analysis-detail-row {
          padding: 10px 12px;
          border-bottom: 1px solid var(--border-secondary);
        }
        .analysis-detail-row:last-child {
          border-bottom: none;
        }
        .analysis-detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
          font-size: 13px;
          color: var(--text-bright);
        }
        .analysis-detail-year {
          font-size: 11px;
          background: var(--border-secondary);
          padding: 2px 6px;
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .analysis-detail-meta {
          font-size: 11px;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }
        .analysis-detail-notes {
          font-size: 10px;
          color: var(--text-tertiary);
          line-height: 1.3;
          margin-top: 4px;
        }
        .analysis-thanks {
          margin: 8px 0 0 0;
          font-size: 10px;
          color: color-mix(in srgb, currentColor 25%, transparent);
          text-align: right;
        }
      `}</style>
    </div>
  )
}

export default AnalysisSetPicker
