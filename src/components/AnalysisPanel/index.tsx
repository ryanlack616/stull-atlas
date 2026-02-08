/**
 * Analysis Panel
 * 
 * Sidebar tab content for the Explorer — runs DBSCAN clustering,
 * density estimation, and void detection on visible glazes.
 */

import React, { useState, useMemo, useCallback } from 'react'
import { useGlazeStore, useDatasetStore } from '@/stores'
import { dbscan, type Cluster, type ClusteringResult, type DBSCANConfig } from '@/analysis/clustering'
import { calculateDensity, type DensityMap } from '@/analysis/density'
import { findVoids, type Void } from '@/analysis/voids'

interface AnalysisPanelProps {
  onHighlightCluster?: (pointIds: string[]) => void
  onHighlightVoid?: (center: { x: number; y: number }, radius: number) => void
  onDensityMap?: (map: DensityMap | null) => void
}

export function AnalysisPanel({ onHighlightCluster, onHighlightVoid, onDensityMap }: AnalysisPanelProps) {
  const { currentDataset } = useDatasetStore()
  const { getPlotPoints } = useGlazeStore()
  
  const [epsilon, setEpsilon] = useState(0.15)
  const [minPoints, setMinPoints] = useState(5)
  const [clusterResult, setClusterResult] = useState<ClusteringResult | null>(null)
  const [densityMap, setDensityMap] = useState<DensityMap | null>(null)
  const [voids, setVoids] = useState<Void[]>([])
  const [activeSection, setActiveSection] = useState<'clusters' | 'density' | 'voids'>('clusters')
  const [computing, setComputing] = useState(false)

  const plotPoints = useMemo(() => getPlotPoints(currentDataset), [getPlotPoints, currentDataset])
  const validPoints = useMemo(() => 
    plotPoints.filter(p => p.x > 0 && p.y > 0 && !isNaN(p.x) && !isNaN(p.y)),
    [plotPoints]
  )

  const runClustering = useCallback(() => {
    setComputing(true)
    // Use setTimeout to allow UI update
    setTimeout(() => {
      const result = dbscan(validPoints, { epsilon, minPoints })
      setClusterResult(result)
      setComputing(false)
    }, 10)
  }, [validPoints, epsilon, minPoints])

  const runDensity = useCallback(() => {
    setComputing(true)
    setTimeout(() => {
      const map = calculateDensity(validPoints, { resolution: 80, bandwidth: 0.1 })
      setDensityMap(map)
      onDensityMap?.(map)
      setComputing(false)
    }, 10)
  }, [validPoints, onDensityMap])

  const runVoids = useCallback(() => {
    setComputing(true)
    setTimeout(() => {
      const v = findVoids(validPoints, { densityThreshold: 0.1, minVoidSize: 10 })
      setVoids(v)
      setComputing(false)
    }, 10)
  }, [validPoints])

  return (
    <div className="analysis-panel">
      <h3 style={{ margin: '0 0 12px', fontSize: 14 }}>Analysis</h3>
      <p style={{ margin: '0 0 16px', fontSize: 12, color: 'var(--text-secondary)' }}>
        {validPoints.length.toLocaleString()} points loaded
      </p>

      {/* Section tabs */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 16 }} role="tablist" aria-label="Analysis tools">
        {(['clusters', 'density', 'voids'] as const).map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            role="tab"
            aria-selected={activeSection === section}
            style={{
              flex: 1, padding: '6px 8px',
              background: activeSection === section ? 'var(--accent-bg)' : 'var(--bg-input)',
              border: `1px solid ${activeSection === section ? 'var(--accent)' : 'var(--border-secondary)'}`,
              borderRadius: 4, color: activeSection === section ? 'var(--text-bright)' : 'var(--text-secondary)',
              fontSize: 11, cursor: 'pointer', textTransform: 'capitalize',
            }}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Clusters */}
      {activeSection === 'clusters' && (
        <div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>
              Epsilon (neighborhood size)
              <input type="range" min={0.05} max={0.5} step={0.01} value={epsilon}
                onChange={e => setEpsilon(Number(e.target.value))}
                style={{ width: '100%' }} />
              <span style={valueStyle}>{epsilon.toFixed(2)}</span>
            </label>
            <label style={labelStyle}>
              Min points per cluster
              <input type="range" min={3} max={20} step={1} value={minPoints}
                onChange={e => setMinPoints(Number(e.target.value))}
                style={{ width: '100%' }} />
              <span style={valueStyle}>{minPoints}</span>
            </label>
          </div>

          <button onClick={runClustering} disabled={computing} style={runBtnStyle}>
            {computing ? 'Computing...' : 'Run DBSCAN'}
          </button>

          {clusterResult && (
            <div style={{ marginTop: 12 }}>
              <div style={statRow}>
                <span>Clusters found</span>
                <strong>{clusterResult.stats.clusterCount}</strong>
              </div>
              <div style={statRow}>
                <span>Clustered points</span>
                <strong>{clusterResult.stats.clusteredPoints}</strong>
              </div>
              <div style={statRow}>
                <span>Noise points</span>
                <strong>{clusterResult.stats.noisePoints}</strong>
              </div>

              <div style={{ marginTop: 12 }}>
                {clusterResult.clusters.map(cluster => (
                  <div
                    key={cluster.id}
                    onClick={() => onHighlightCluster?.(cluster.pointIds)}
                    style={{
                      padding: '8px 10px', marginBottom: 4,
                      background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
                      borderRadius: 4, cursor: 'pointer', fontSize: 12,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-bright)' }}>Cluster {cluster.id}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{cluster.stats.count} pts</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                      center: ({cluster.centroid.x.toFixed(2)}, {cluster.centroid.y.toFixed(2)})
                      · {cluster.stats.dominantSurface}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Density */}
      {activeSection === 'density' && (
        <div>
          <button onClick={runDensity} disabled={computing} style={runBtnStyle}>
            {computing ? 'Computing...' : 'Calculate Density'}
          </button>

          {densityMap && (
            <div style={{ marginTop: 12 }}>
              <div style={statRow}>
                <span>Resolution</span>
                <strong>{densityMap.resolution}×{densityMap.resolution}</strong>
              </div>
              <div style={statRow}>
                <span>Max density</span>
                <strong>{densityMap.maxDensity.toFixed(1)}</strong>
              </div>
              <div style={statRow}>
                <span>Total points</span>
                <strong>{densityMap.totalPoints}</strong>
              </div>
              <div style={statRow}>
                <span>Bounds</span>
                <strong style={{ fontSize: 10 }}>
                  x:[{densityMap.bounds.xMin.toFixed(1)}, {densityMap.bounds.xMax.toFixed(1)}]
                  y:[{densityMap.bounds.yMin.toFixed(1)}, {densityMap.bounds.yMax.toFixed(1)}]
                </strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Voids */}
      {activeSection === 'voids' && (
        <div>
          <button onClick={runVoids} disabled={computing} style={runBtnStyle}>
            {computing ? 'Computing...' : 'Find Voids'}
          </button>

          {voids.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={statRow}>
                <span>Voids found</span>
                <strong>{voids.length}</strong>
              </div>

              {voids.map(v => (
                <div
                  key={v.id}
                  onClick={() => onHighlightVoid?.(v.center, v.radius)}
                  style={{
                    padding: '8px 10px', marginBottom: 4,
                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)',
                    borderRadius: 4, cursor: 'pointer', fontSize: 12,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-bright)' }}>
                      ({v.center.x.toFixed(2)}, {v.center.y.toFixed(2)})
                    </span>
                    <span style={{
                      color: v.significance === 'high' ? '#e74c3c' : v.significance === 'medium' ? '#e67e22' : 'var(--text-secondary)',
                    }}>
                      {v.significance}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', marginTop: 2 }}>
                    radius: {v.radius.toFixed(2)} · area: {v.area.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        .analysis-panel {
          padding: 0;
        }
      `}</style>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8,
}
const valueStyle: React.CSSProperties = {
  float: 'right', fontFamily: "'SF Mono', monospace", fontSize: 11, color: 'var(--text-label)',
}
const runBtnStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', background: 'var(--accent-bg)',
  border: '1px solid var(--accent)', borderRadius: 6, color: 'var(--text-bright)',
  fontSize: 12, cursor: 'pointer',
}
const statRow: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between',
  padding: '4px 0', fontSize: 12, color: 'var(--text-label)',
  borderBottom: '1px solid var(--border-subtle)',
}

export default AnalysisPanel
