/**
 * Stull Atlas
 * 
 * Main container component for the glaze explorer
 */

import React, { useState } from 'react'
import { StullPlot } from './StullPlot'
import { DatasetSwitcher } from './DatasetSwitcher'
import { useGlazeStore, useSelectionStore } from '@/stores'
import { OxideSymbol } from '@/types'

type ColorByOption = 'cone' | 'surface' | 'source' | 'flux_ratio' | 'confidence' | 'boron'

export function StullAtlas() {
  const [xAxis, setXAxis] = useState<OxideSymbol>('SiO2')
  const [yAxis, setYAxis] = useState<OxideSymbol>('Al2O3')
  const [colorBy, setColorBy] = useState<ColorByOption>('cone')
  
  const { stats, isLoading } = useGlazeStore()
  const { selectedGlaze, showSidebar, toggleSidebar } = useSelectionStore()
  
  const axisOptions: OxideSymbol[] = [
    'SiO2', 'Al2O3', 'B2O3', 
    'Na2O', 'K2O', 'CaO', 'MgO', 'ZnO', 'BaO'
  ]
  
  const colorOptions: { value: ColorByOption; label: string }[] = [
    { value: 'cone', label: 'Cone' },
    { value: 'surface', label: 'Surface' },
    { value: 'source', label: 'Source' },
    { value: 'flux_ratio', label: 'R2O:RO Ratio' },
    { value: 'boron', label: 'Boron' },
    { value: 'confidence', label: 'Confidence' }
  ]
  
  return (
    <div className="stull-atlas">
      <header className="atlas-header">
        <div className="header-left">
          <h1>Stull Atlas</h1>
          <span className="subtitle">
            A Computational Ceramic Glaze Explorer
          </span>
        </div>
        <div className="header-right">
          <span className="stats">
            {isLoading ? 'Loading...' : `${stats.total.toLocaleString()} glazes`}
          </span>
        </div>
      </header>
      
      <div className="atlas-body">
        <aside className="controls-panel">
          <div className="control-group">
            <h3>Axes</h3>
            <div className="axis-controls">
              <label>
                X Axis
                <select 
                  value={xAxis} 
                  onChange={(e) => setXAxis(e.target.value as OxideSymbol)}
                >
                  {axisOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label>
                Y Axis
                <select 
                  value={yAxis} 
                  onChange={(e) => setYAxis(e.target.value as OxideSymbol)}
                >
                  {axisOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          
          <div className="control-group">
            <h3>Color By</h3>
            <select 
              value={colorBy} 
              onChange={(e) => setColorBy(e.target.value as ColorByOption)}
              className="color-select"
            >
              {colorOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          <DatasetSwitcher />
        </aside>
        
        <main className="plot-container">
          <StullPlot 
            xAxis={xAxis}
            yAxis={yAxis}
            colorBy={colorBy}
          />
        </main>
        
        {showSidebar && (
          <aside className="detail-panel">
            <button className="close-sidebar" onClick={toggleSidebar}>×</button>
            
            {selectedGlaze ? (
              <div className="glaze-detail">
                <h2>{selectedGlaze.name}</h2>
                <div className="detail-section">
                  <h4>Source</h4>
                  <p>{selectedGlaze.source}</p>
                  {selectedGlaze.sourceUrl && (
                    <a href={selectedGlaze.sourceUrl} target="_blank" rel="noopener noreferrer">
                      View original →
                    </a>
                  )}
                </div>
                
                <div className="detail-section">
                  <h4>Firing</h4>
                  <p>Cone {selectedGlaze.coneRange[0]} - {selectedGlaze.coneRange[1]}</p>
                  <p>{selectedGlaze.atmosphere}</p>
                </div>
                
                <div className="detail-section">
                  <h4>Recipe</h4>
                  <table className="recipe-table">
                    <tbody>
                      {selectedGlaze.ingredients.map((ing, i) => (
                        <tr key={i}>
                          <td>{ing.material}</td>
                          <td className="amount">{ing.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {selectedGlaze.notes && (
                  <div className="detail-section">
                    <h4>Notes</h4>
                    <p>{selectedGlaze.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="no-selection">
                <p>Click a point to see glaze details</p>
              </div>
            )}
          </aside>
        )}
      </div>
      
      <style>{`
        .stull-atlas {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: #121212;
          color: #e0e0e0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .atlas-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #1a1a1a;
          border-bottom: 1px solid #333;
        }
        
        .header-left h1 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
        
        .subtitle {
          font-size: 12px;
          color: #888;
          margin-left: 12px;
        }
        
        .stats {
          font-size: 14px;
          color: #888;
        }
        
        .atlas-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .controls-panel {
          width: 280px;
          padding: 16px;
          background: #1a1a1a;
          border-right: 1px solid #333;
          overflow-y: auto;
        }
        
        .control-group {
          margin-bottom: 20px;
        }
        
        .control-group h3 {
          margin: 0 0 12px 0;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          color: #888;
        }
        
        .axis-controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .axis-controls label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
          color: #aaa;
        }
        
        .axis-controls select,
        .color-select {
          padding: 8px 10px;
          background: #333;
          border: 1px solid #444;
          border-radius: 6px;
          color: #fff;
          font-size: 14px;
        }
        
        .plot-container {
          flex: 1;
          min-width: 0;
        }
        
        .detail-panel {
          width: 320px;
          padding: 16px;
          background: #1a1a1a;
          border-left: 1px solid #333;
          overflow-y: auto;
          position: relative;
        }
        
        .close-sidebar {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 28px;
          height: 28px;
          background: #333;
          border: none;
          border-radius: 4px;
          color: #888;
          font-size: 18px;
          cursor: pointer;
        }
        
        .close-sidebar:hover {
          background: #444;
          color: #fff;
        }
        
        .glaze-detail h2 {
          margin: 0 0 16px 0;
          font-size: 18px;
          padding-right: 32px;
        }
        
        .detail-section {
          margin-bottom: 20px;
        }
        
        .detail-section h4 {
          margin: 0 0 8px 0;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #888;
        }
        
        .detail-section p {
          margin: 0 0 4px 0;
          font-size: 14px;
        }
        
        .detail-section a {
          font-size: 13px;
          color: #3498db;
          text-decoration: none;
        }
        
        .detail-section a:hover {
          text-decoration: underline;
        }
        
        .recipe-table {
          width: 100%;
          font-size: 13px;
          border-collapse: collapse;
        }
        
        .recipe-table td {
          padding: 6px 0;
          border-bottom: 1px solid #333;
        }
        
        .recipe-table .amount {
          text-align: right;
          color: #888;
        }
        
        .no-selection {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}

export default StullAtlas
