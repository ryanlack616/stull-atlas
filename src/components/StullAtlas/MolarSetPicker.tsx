/**
 * MolarSetPicker Component
 *
 * UI for selecting which molar weight set the calculator uses,
 * and for running the "molar wiggle" — animating between sets
 * so users can see how their glazes shift on the Stull chart.
 *
 * Mirrors the DatasetSwitcher pattern for consistency.
 */

import React, { useMemo } from 'react'
import { useMolarWeightStore } from '@/stores'
import type { MolarWeightSetId } from '@/domain/molarWeights'

export function MolarSetPicker() {
  const {
    currentSetId,
    availableSets,
    wiggle,
    setMolarWeightSet,
    startWiggle,
    stopWiggle,
    stepWiggle,
    setWiggleSpeed,
    setWiggleSets,
  } = useMolarWeightStore()

  const { isAnimating, animationSpeed, setsToCompare, currentIndex } = wiggle

  /** Track which sets are included in wiggle comparison */
  const toggleWiggleSet = (id: MolarWeightSetId) => {
    const current = new Set(setsToCompare)
    if (current.has(id)) {
      if (current.size > 2) {
        current.delete(id)
      }
      // Don't allow fewer than 2
    } else {
      current.add(id)
    }
    setWiggleSets([...current])
  }

  const currentSetInfo = useMemo(
    () => availableSets.find((s) => s.id === currentSetId),
    [availableSets, currentSetId],
  )

  return (
    <div className="molar-set-picker">
      <div className="molar-header">
        <h3>Molar Weights</h3>
        <span className="molar-count">{availableSets.length} sets</span>
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

      {availableSets.length > 1 && (
        <div className="molar-wiggle-section">
          <h4>Molar Wiggle</h4>
          <p className="molar-wiggle-description">
            Animate between weight sets to see how molecular weight
            differences shift glaze positions on the Stull chart.
          </p>

          {/* Checkboxes for which sets to include */}
          <div className="molar-wiggle-sets">
            {availableSets.map((setInfo) => (
              <label key={setInfo.id} className="molar-wiggle-set-label">
                <input
                  type="checkbox"
                  checked={setsToCompare.includes(setInfo.id)}
                  onChange={() => toggleWiggleSet(setInfo.id)}
                  disabled={
                    isAnimating ||
                    (setsToCompare.includes(setInfo.id) &&
                      setsToCompare.length <= 2)
                  }
                />
                <span>{setInfo.name}</span>
              </label>
            ))}
          </div>

          <div className="molar-wiggle-controls">
            <button
              className={`molar-wiggle-button ${isAnimating ? 'active' : ''}`}
              onClick={isAnimating ? stopWiggle : () => startWiggle()}
            >
              {isAnimating ? '⏹ Stop' : '▶ Start Wiggle'}
            </button>

            <button
              className="molar-step-button"
              onClick={stepWiggle}
              disabled={isAnimating}
            >
              ⏭ Step
            </button>
          </div>

          <div className="molar-speed-control">
            <label>Speed: {animationSpeed}ms</label>
            <input
              type="range"
              min="200"
              max="3000"
              step="100"
              value={animationSpeed}
              onChange={(e) => setWiggleSpeed(Number(e.target.value))}
            />
          </div>

          {isAnimating && currentSetInfo && (
            <div className="molar-wiggle-status">
              <span className="molar-current-set">{currentSetInfo.name}</span>
              <span className="molar-step-indicator">
                {currentIndex + 1} / {setsToCompare.length}
              </span>
            </div>
          )}
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

        .molar-count {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .molar-set-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
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

        .molar-wiggle-section {
          border-top: 1px solid var(--border-secondary);
          padding-top: 16px;
        }

        .molar-wiggle-section h4 {
          margin: 0 0 8px 0;
          font-size: 13px;
          color: var(--text-bright);
        }

        .molar-wiggle-description {
          font-size: 12px;
          color: var(--text-secondary);
          margin: 0 0 12px 0;
          line-height: 1.4;
        }

        .molar-wiggle-sets {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 12px;
          padding: 8px;
          background: var(--bg-input);
          border-radius: 6px;
        }

        .molar-wiggle-set-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-label);
          cursor: pointer;
        }

        .molar-wiggle-set-label input[type="checkbox"] {
          accent-color: var(--accent);
        }

        .molar-wiggle-controls {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .molar-wiggle-button,
        .molar-step-button {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .molar-wiggle-button {
          background: var(--accent);
          color: var(--text-bright);
        }

        .molar-wiggle-button:hover {
          background: var(--accent-hover);
        }

        .molar-wiggle-button.active {
          background: var(--danger);
        }

        .molar-step-button {
          background: var(--border-secondary);
          color: var(--text-label);
        }

        .molar-step-button:hover:not(:disabled) {
          background: var(--text-dim);
        }

        .molar-step-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .molar-speed-control {
          margin-bottom: 12px;
        }

        .molar-speed-control label {
          display: block;
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .molar-speed-control input {
          width: 100%;
        }

        .molar-wiggle-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: var(--accent-bg);
          border-radius: 6px;
          animation: molar-pulse 0.3s ease-in-out;
        }

        @keyframes molar-pulse {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }

        .molar-current-set {
          font-weight: 500;
          color: var(--text-bright);
          font-size: 13px;
        }

        .molar-step-indicator {
          font-size: 12px;
          color: var(--text-label);
        }
      `}</style>
    </div>
  )
}

export default MolarSetPicker
