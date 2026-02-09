/**
 * MolarSetPicker Component
 *
 * UI for selecting which molar weight set the calculator uses,
 * with full transparency on data sources and exact values.
 */

import React, { useMemo, useState } from 'react'
import { useMolarWeightStore } from '@/stores'
import type { MolarWeightSetId } from '@/domain/molarWeights'
import { getMolarWeights } from '@/domain/molarWeights'
import { OxideSymbol } from '@/types'

/** IUPAC 2023 source references */
const IUPAC_SOURCE_URL = 'https://iupac.org/what-we-do/periodic-table-of-elements/'
const CIAAW_URL = 'https://www.ciaaw.org/atomic-weights.htm'

/** All oxides the app tracks, grouped for the table */
const OXIDE_GROUPS: { label: string; oxides: OxideSymbol[] }[] = [
  { label: 'Fluxes (R\u2082O)', oxides: ['Li2O', 'Na2O', 'K2O'] },
  { label: 'Fluxes (RO)', oxides: ['MgO', 'CaO', 'SrO', 'BaO', 'ZnO', 'PbO'] },
  { label: 'Stabilizers (R\u2082O\u2083)', oxides: ['Al2O3', 'B2O3', 'Fe2O3'] },
  { label: 'Glass Formers (RO\u2082)', oxides: ['SiO2', 'TiO2', 'ZrO2', 'SnO2'] },
  { label: 'Colorants / Other', oxides: ['MnO', 'MnO2', 'NiO', 'CuO', 'Cu2O', 'CoO', 'Cr2O3', 'P2O5', 'F'] },
]

/** Unicode subscript digits */
const SUB = ['\u2080','\u2081','\u2082','\u2083','\u2084','\u2085','\u2086','\u2087','\u2088','\u2089']

function oxideLabel(oxide: string): string {
  return oxide.replace(/\d/g, d => SUB[parseInt(d)])
}

export function MolarSetPicker() {
  const {
    currentSetId,
    availableSets,
    setMolarWeightSet,
  } = useMolarWeightStore()

  const [showWeightTable, setShowWeightTable] = useState(false)

  const currentSetInfo = useMemo(
    () => availableSets.find((s) => s.id === currentSetId),
    [availableSets, currentSetId],
  )

  const currentWeights = useMemo(
    () => getMolarWeights(currentSetId),
    [currentSetId],
  )

  return (
    <div className="molar-set-picker">
      <div className="molar-header">
        <h3>Molar Weights</h3>
        <button
          className="molar-info-toggle"
          onClick={() => setShowWeightTable(!showWeightTable)}
          title={showWeightTable ? 'Hide weight table' : 'Show all molecular weights'}
        >
          {showWeightTable ? '\u25BE' : '\u24D8'}
        </button>
      </div>

      <div className="molar-set-buttons">
        {availableSets.map((setInfo) => (
          <button
            key={setInfo.id}
            className={`molar-set-button ${
              currentSetId === setInfo.id ? 'active' : ''
            }`}
            onClick={() => setMolarWeightSet(setInfo.id)}
            title={setInfo.notes}
          >
            <span className="molar-set-name">{setInfo.name}</span>
            {setInfo.year && (
              <span className="molar-set-year">{setInfo.year}</span>
            )}
          </button>
        ))}
      </div>

      {/* Data Source & Transparency */}
      <div className="molar-source-info">
        <p className="molar-source-text">
          Default: <strong>IUPAC 2023</strong> Standard Atomic Weights
          with 2024 revisions (Gd, Lu, Zr).
        </p>
        <div className="molar-source-links">
          <a href={IUPAC_SOURCE_URL} target="_blank" rel="noopener noreferrer">
            IUPAC Periodic Table
          </a>
          <span className="molar-link-sep">{'\u00B7'}</span>
          <a href={CIAAW_URL} target="_blank" rel="noopener noreferrer">
            CIAAW Atomic Weights
          </a>
        </div>
      </div>

      {/* Expandable weight table */}
      {showWeightTable && (
        <div className="molar-weight-table">
          <table>
            <thead>
              <tr>
                <th>Oxide</th>
                <th>g/mol</th>
              </tr>
            </thead>
            <tbody>
              {OXIDE_GROUPS.map(group => (
                <React.Fragment key={group.label}>
                  <tr className="molar-group-header">
                    <td colSpan={2}>{group.label}</td>
                  </tr>
                  {group.oxides.map(oxide => (
                    <tr key={oxide}>
                      <td className="molar-oxide-name">{oxideLabel(oxide)}</td>
                      <td className="molar-oxide-value">
                        {currentWeights[oxide]?.toFixed(4) ?? '\u2014'}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <p className="molar-table-note">
            Active set: {currentSetInfo?.name ?? currentSetId}
            {currentSetInfo?.notes && <><br />{currentSetInfo.notes}</>}
          </p>
        </div>
      )}

      <style>{`
        .molar-set-picker {
          padding: 16px;
          background: var(--bg-elevated);
          border-radius: 8px;
        }
        .molar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .molar-header h3 {
          margin: 0;
          font-size: 14px;
          color: var(--text-bright);
        }
        .molar-info-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 16px;
          padding: 2px 6px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .molar-info-toggle:hover {
          background: var(--bg-input);
          color: var(--accent);
        }
        .molar-set-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 12px;
        }
        .molar-set-button {
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
        .molar-set-button:hover {
          background: var(--border-input);
          border-color: var(--text-dim);
        }
        .molar-set-button.active {
          background: var(--accent-bg);
          border-color: var(--accent);
          color: var(--text-bright);
        }
        .molar-set-name {
          font-weight: 500;
          font-size: 13px;
        }
        .molar-set-year {
          font-size: 11px;
          background: var(--border-secondary);
          padding: 2px 6px;
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .molar-source-info {
          padding: 10px 12px;
          background: var(--bg-input);
          border-radius: 6px;
          border-left: 3px solid var(--accent);
        }
        .molar-source-text {
          margin: 0 0 6px 0;
          font-size: 12px;
          color: var(--text-label);
          line-height: 1.4;
        }
        .molar-source-links {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .molar-source-links a {
          font-size: 11px;
          color: var(--accent);
          text-decoration: none;
        }
        .molar-source-links a:hover {
          text-decoration: underline;
        }
        .molar-link-sep {
          color: var(--text-dim);
          font-size: 11px;
        }
        .molar-weight-table {
          margin-top: 12px;
          border: 1px solid var(--border-secondary);
          border-radius: 6px;
          overflow: hidden;
        }
        .molar-weight-table table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
        }
        .molar-weight-table thead th {
          text-align: left;
          padding: 6px 10px;
          background: var(--bg-input);
          color: var(--text-secondary);
          font-weight: 600;
          border-bottom: 1px solid var(--border-secondary);
        }
        .molar-weight-table thead th:last-child {
          text-align: right;
        }
        .molar-group-header td {
          padding: 6px 10px;
          font-size: 11px;
          font-weight: 600;
          color: var(--accent);
          background: var(--bg-input);
          letter-spacing: 0.3px;
        }
        .molar-oxide-name {
          padding: 4px 10px;
          color: var(--text-label);
          font-family: 'SF Mono', 'Fira Code', monospace;
        }
        .molar-oxide-value {
          padding: 4px 10px;
          text-align: right;
          color: var(--text-bright);
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-variant-numeric: tabular-nums;
        }
        .molar-weight-table tbody tr:hover {
          background: var(--bg-input);
        }
        .molar-table-note {
          margin: 0;
          padding: 8px 10px;
          font-size: 10px;
          color: var(--text-tertiary);
          border-top: 1px solid var(--border-secondary);
          line-height: 1.3;
        }
      `}</style>
    </div>
  )
}

export default MolarSetPicker
