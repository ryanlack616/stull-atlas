/**
 * Dataset Switcher Component
 * 
 * Controls for switching material datasets and running the wiggle test
 */

import React from 'react'
import { useDatasetStore } from '@/stores'

export function DatasetSwitcher() {
  const {
    datasets,
    currentDataset,
    wiggleTest,
    setCurrentDataset,
    startWiggleTest,
    stopWiggleTest,
    stepWiggleTest,
    setWiggleSpeed
  } = useDatasetStore()
  
  const { isAnimating, animationSpeed, datasetsToCompare, currentIndex } = wiggleTest
  
  return (
    <div className="dataset-switcher">
      <div className="dataset-header">
        <h3>Material Dataset</h3>
        <span className="dataset-count">{datasets.length} available</span>
      </div>
      
      <div className="dataset-buttons">
        {datasets.map((ds, i) => (
          <button
            key={ds.id}
            className={`dataset-button ${currentDataset === ds.id ? 'active' : ''}`}
            onClick={() => setCurrentDataset(ds.id)}
            title={ds.description}
          >
            <span className="dataset-name">{ds.name}</span>
            {ds.materialCount > 0 && (
              <span className="dataset-materials">{ds.materialCount}</span>
            )}
          </button>
        ))}
      </div>
      
      <div className="wiggle-section">
        <h4>Wiggle Test</h4>
        <p className="wiggle-description">
          Toggle between datasets to reveal uncertainty in UMF positions.
          Points that move significantly have less reliable chemistry.
        </p>
        
        <div className="wiggle-controls">
          <button
            className={`wiggle-button ${isAnimating ? 'active' : ''}`}
            onClick={isAnimating ? stopWiggleTest : () => startWiggleTest()}
          >
            {isAnimating ? '⏹ Stop' : '▶ Start Wiggle'}
          </button>
          
          <button
            className="step-button"
            onClick={stepWiggleTest}
            disabled={isAnimating}
          >
            ⏭ Step
          </button>
        </div>
        
        <div className="speed-control">
          <label>Speed: {animationSpeed}ms</label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={animationSpeed}
            onChange={(e) => setWiggleSpeed(Number(e.target.value))}
          />
        </div>
        
        {isAnimating && (
          <div className="wiggle-status">
            <span className="current-dataset">
              {datasets.find(d => d.id === currentDataset)?.name || currentDataset}
            </span>
            <span className="step-indicator">
              {currentIndex + 1} / {datasetsToCompare.length}
            </span>
          </div>
        )}
      </div>
      
      <style>{`
        .dataset-switcher {
          padding: 16px;
          background: #2a2a2a;
          border-radius: 8px;
        }
        
        .dataset-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .dataset-header h3 {
          margin: 0;
          font-size: 14px;
          color: #fff;
        }
        
        .dataset-count {
          font-size: 12px;
          color: #888;
        }
        
        .dataset-buttons {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .dataset-button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: #333;
          border: 1px solid #444;
          border-radius: 6px;
          color: #ccc;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .dataset-button:hover {
          background: #3a3a3a;
          border-color: #555;
        }
        
        .dataset-button.active {
          background: #1a4a6e;
          border-color: #2980b9;
          color: #fff;
        }
        
        .dataset-name {
          font-weight: 500;
        }
        
        .dataset-materials {
          font-size: 11px;
          background: #444;
          padding: 2px 6px;
          border-radius: 10px;
        }
        
        .wiggle-section {
          border-top: 1px solid #444;
          padding-top: 16px;
        }
        
        .wiggle-section h4 {
          margin: 0 0 8px 0;
          font-size: 13px;
          color: #fff;
        }
        
        .wiggle-description {
          font-size: 12px;
          color: #888;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }
        
        .wiggle-controls {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .wiggle-button, .step-button {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .wiggle-button {
          background: #2980b9;
          color: #fff;
        }
        
        .wiggle-button:hover {
          background: #3498db;
        }
        
        .wiggle-button.active {
          background: #c0392b;
        }
        
        .step-button {
          background: #444;
          color: #ccc;
        }
        
        .step-button:hover:not(:disabled) {
          background: #555;
        }
        
        .step-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .speed-control {
          margin-bottom: 12px;
        }
        
        .speed-control label {
          display: block;
          font-size: 12px;
          color: #888;
          margin-bottom: 4px;
        }
        
        .speed-control input {
          width: 100%;
        }
        
        .wiggle-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #1a4a6e;
          border-radius: 6px;
        }
        
        .current-dataset {
          font-weight: 500;
          color: #fff;
        }
        
        .step-indicator {
          font-size: 12px;
          color: #aaa;
        }
      `}</style>
    </div>
  )
}

export default DatasetSwitcher
