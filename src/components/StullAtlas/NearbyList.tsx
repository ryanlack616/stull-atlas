/**
 * NearbyList — Gallery/list of proximity neighbors
 *
 * Extracted from index.tsx to keep the main component manageable.
 * Owns: filter pills, sort buttons, view mode toggle, gallery grid,
 * list view, breadcrumb trail, hover preview with UMF fingerprint.
 */

import React, { useState, useMemo, useRef, useCallback } from 'react'
import type { ProximityNeighbor, ProximityStats } from './StullPlot3D'
import { zAxisLabel } from './StullPlot3D'
import type { GlazeRecipe } from '@/types'
import { UMFFingerprint, FluxDonut } from '@/components/UMFVisuals'
import type { ZAxisOption } from './StullPlot3D'

// ── Surface label helper ──────────────────────────────────────
const surfaceLabel = (st: string) =>
  st === 'gloss' ? 'G' : st === 'matte' ? 'M' : st === 'satin' ? 'S'
    : st === 'crystalline' ? 'X' : st === 'crawl' ? 'C' : '?'

const SURFACE_PILLS: { key: string; label: string }[] = [
  { key: 'gloss', label: 'G' },
  { key: 'matte', label: 'M' },
  { key: 'satin', label: 'S' },
  { key: 'crystalline', label: 'X' },
  { key: 'crawl', label: 'C' },
  { key: 'unknown', label: '?' },
]

// ── Props ─────────────────────────────────────────────────────
export interface NearbyListProps {
  proximityStats: ProximityStats
  glazes: Map<string, GlazeRecipe>
  selectedGlaze: GlazeRecipe | null
  pinnedCenterId: string | null
  hoveredNeighborId: string | null
  explorationPath: { id: string; name: string }[]
  zAxis: ZAxisOption

  // Callbacks back to parent
  onSelectGlaze: (glaze: GlazeRecipe) => void
  onCompareGlaze: (glaze: GlazeRecipe) => void
  onHoverNeighbor: (id: string | null) => void
  onPinCenter: (id: string | null) => void
  onExplorationPathChange: (path: { id: string; name: string }[]) => void
}

export function NearbyList({
  proximityStats,
  glazes,
  selectedGlaze,
  pinnedCenterId,
  hoveredNeighborId,
  explorationPath,
  zAxis,
  onSelectGlaze,
  onCompareGlaze,
  onHoverNeighbor,
  onPinCenter,
  onExplorationPathChange,
}: NearbyListProps) {
  // ── Local state (owned by this component) ───────────────────
  const [nearbyFilter, setNearbyFilter] = useState<Set<string>>(new Set())
  const [nearbyPhotoOnly, setNearbyPhotoOnly] = useState(false)
  const [nearbySortBy, setNearbySortBy] = useState<'distance' | 'cone' | 'name'>('distance')
  const [nearbyViewMode, setNearbyViewMode] = useState<'list' | 'gallery'>('list')

  // Ref for keyboard navigation within the scrollable item list
  const scrollRef = useRef<HTMLDivElement>(null)

  // ── Derived data ────────────────────────────────────────────
  const surfaceTypes = useMemo(
    () => new Set(proximityStats.nearby.map(n => n.surfaceType)),
    [proximityStats.nearby],
  )

  // Pre-compute glaze lookups for all neighbors (single pass)
  const nearbyGlazes = useMemo(() => {
    const m = new Map<string, GlazeRecipe>()
    for (const n of proximityStats.nearby) {
      const g = glazes.get(n.id)
      if (g) m.set(n.id, g)
    }
    return m
  }, [proximityStats.nearby, glazes])

  const photoCount = useMemo(
    () => proximityStats.nearby.filter(n => {
      const g = nearbyGlazes.get(n.id)
      return g?.images && g.images.length > 0
    }).length,
    [proximityStats.nearby, nearbyGlazes],
  )

  const filteredNearby = useMemo(() => {
    let list = nearbyFilter.size === 0
      ? [...proximityStats.nearby]
      : proximityStats.nearby.filter(n => nearbyFilter.has(n.surfaceType))

    if (nearbyPhotoOnly) {
      list = list.filter(n => {
        const g = nearbyGlazes.get(n.id)
        return g?.images && g.images.length > 0
      })
    }

    if (nearbySortBy === 'cone') {
      list.sort((a, b) => (a.cone ?? 99) - (b.cone ?? 99) || a.distance - b.distance)
    } else if (nearbySortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [proximityStats.nearby, nearbyFilter, nearbyPhotoOnly, nearbySortBy, nearbyGlazes])

  // ── Gallery grid keyboard navigation ────────────────────────
  // Arrow keys move focus between items; Enter selects, Shift+Enter compares.
  // In gallery mode, left/right move across columns, up/down move across rows.
  // In list mode, up/down move linearly. Home/End jump to first/last.
  const GALLERY_COLUMNS = 3 // matches CSS grid minmax(80px, 1fr) at typical sidebar width

  const handleGridKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const container = scrollRef.current
    if (!container) return

    const items = Array.from(container.querySelectorAll<HTMLElement>(
      nearbyViewMode === 'gallery' ? '.gallery-card' : '.proximity-nearby-item',
    ))
    if (items.length === 0) return

    const currentIdx = items.findIndex(el => el === document.activeElement)
    let nextIdx = -1

    switch (e.key) {
      case 'ArrowDown':
        if (nearbyViewMode === 'gallery') {
          nextIdx = currentIdx < 0 ? 0 : Math.min(currentIdx + GALLERY_COLUMNS, items.length - 1)
        } else {
          nextIdx = currentIdx < 0 ? 0 : Math.min(currentIdx + 1, items.length - 1)
        }
        break
      case 'ArrowUp':
        if (nearbyViewMode === 'gallery') {
          nextIdx = currentIdx < 0 ? 0 : Math.max(currentIdx - GALLERY_COLUMNS, 0)
        } else {
          nextIdx = currentIdx < 0 ? 0 : Math.max(currentIdx - 1, 0)
        }
        break
      case 'ArrowRight':
        if (nearbyViewMode === 'gallery') {
          nextIdx = currentIdx < 0 ? 0 : Math.min(currentIdx + 1, items.length - 1)
        }
        break
      case 'ArrowLeft':
        if (nearbyViewMode === 'gallery') {
          nextIdx = currentIdx < 0 ? 0 : Math.max(currentIdx - 1, 0)
        }
        break
      case 'Home':
        nextIdx = 0
        break
      case 'End':
        nextIdx = items.length - 1
        break
      case 'Enter':
        if (currentIdx >= 0) {
          items[currentIdx].click()
        }
        return
      default:
        return
    }

    if (nextIdx >= 0 && nextIdx !== currentIdx) {
      e.preventDefault()
      items[nextIdx].focus()
      items[nextIdx].scrollIntoView({ block: 'nearest' })
      // Trigger hover preview for the focused item
      const neighborId = filteredNearby[nextIdx]?.id ?? null
      onHoverNeighbor(neighborId)
    }
  }, [nearbyViewMode, filteredNearby, onHoverNeighbor])

  // Hovered neighbor for mini preview
  const hoveredNeighbor = hoveredNeighborId
    ? proximityStats.nearby.find(n => n.id === hoveredNeighborId) ?? null
    : null
  const hoveredGlaze = hoveredNeighborId ? nearbyGlazes.get(hoveredNeighborId) ?? null : null

  // ── Navigate to a neighbor glaze ────────────────────────────
  const navigateToNeighbor = (e: React.MouseEvent, n: ProximityNeighbor) => {
    const glaze = nearbyGlazes.get(n.id)
    if (!glaze) return
    if (e.shiftKey) {
      onCompareGlaze(glaze)
    } else {
      if (selectedGlaze && !pinnedCenterId) {
        onExplorationPathChange((() => {
          const prev = explorationPath
          if (prev.length > 0 && prev[prev.length - 1].id === selectedGlaze.id) return prev
          const next = [...prev, { id: selectedGlaze.id, name: selectedGlaze.name }]
          return next.slice(-10)
        })())
      }
      onSelectGlaze(glaze)
    }
  }

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="proximity-nearby-list">
      {/* Exploration breadcrumb */}
      {explorationPath.length > 0 && (
        <div className="proximity-breadcrumb">
          {explorationPath.map((crumb, i) => (
            <React.Fragment key={crumb.id}>
              {i > 0 && <span className="breadcrumb-arrow">{'\u203A'}</span>}
              <button
                className="breadcrumb-btn"
                onClick={() => {
                  const glaze = glazes.get(crumb.id)
                  if (glaze) {
                    onSelectGlaze(glaze)
                    onExplorationPathChange(explorationPath.slice(0, i))
                  }
                }}
                title={crumb.name}
              >{crumb.name.length > 12 ? crumb.name.slice(0, 11) + '\u2026' : crumb.name}</button>
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="proximity-nearby-header">
        <span>Nearby ({filteredNearby.length}{nearbyFilter.size > 0 ? `/${proximityStats.nearby.length}` : ''})</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* View mode toggle */}
          <div className="proximity-sort-btns">
            <button
              className={`proximity-sort-btn${nearbyViewMode === 'list' ? ' on' : ''}`}
              onClick={() => setNearbyViewMode('list')}
              title="List view"
            >{'\u2261'}</button>
            <button
              className={`proximity-sort-btn${nearbyViewMode === 'gallery' ? ' on' : ''}`}
              onClick={() => setNearbyViewMode('gallery')}
              title="Gallery view"
            >{'\u25A6'}</button>
          </div>
          {/* Sort mode buttons */}
          <div className="proximity-sort-btns">
            {(['distance', 'cone', 'name'] as const).map(mode => (
              <button
                key={mode}
                className={`proximity-sort-btn${nearbySortBy === mode ? ' on' : ''}`}
                onClick={() => setNearbySortBy(mode)}
                title={`Sort by ${mode}`}
              >{mode === 'distance' ? '\u2194' : mode === 'cone' ? '\u25B3' : 'Az'}</button>
            ))}
          </div>
          <button
            className={`proximity-pin-btn${pinnedCenterId ? ' pinned' : ''}`}
            onClick={() => onPinCenter(pinnedCenterId ? null : selectedGlaze?.id ?? null)}
            title={pinnedCenterId ? 'Unpin center \u2014 proximity follows selection' : 'Pin center \u2014 keep this neighborhood while exploring'}
          >
            {pinnedCenterId ? '\uD83D\uDCCC' : '\uD83D\uDCCCPin'}
          </button>
        </div>
      </div>

      {/* Surface type filter pills */}
      <div className="proximity-filter-pills">
        {SURFACE_PILLS.filter(p => surfaceTypes.has(p.key)).map(p => (
          <button
            key={p.key}
            className={`proximity-pill st-${p.key}${nearbyFilter.has(p.key) ? ' on' : ''}`}
            onClick={() => setNearbyFilter(prev => {
              const next = new Set(prev)
              if (next.has(p.key)) next.delete(p.key)
              else next.add(p.key)
              return next
            })}
            title={p.key}
          >{p.label}</button>
        ))}
        {/* Photo-only filter */}
        <button
          className={`proximity-pill photo-pill${nearbyPhotoOnly ? ' on' : ''}`}
          onClick={() => setNearbyPhotoOnly(prev => !prev)}
          title={`Show only glazes with photos (${photoCount})`}
        >{'\uD83D\uDCF7'}{nearbyPhotoOnly ? ` ${photoCount}` : ''}</button>
        {(nearbyFilter.size > 0 || nearbyPhotoOnly) && (
          <button
            className="proximity-pill clear"
            onClick={() => { setNearbyFilter(new Set()); setNearbyPhotoOnly(false) }}
            title="Clear all filters"
          >{'\u00D7'}</button>
        )}
      </div>

      <div
        ref={scrollRef}
        className={`proximity-nearby-scroll${nearbyViewMode === 'gallery' ? ' gallery-mode' : ''}`}
        onKeyDown={handleGridKeyDown}
        role="listbox"
        aria-label={`Nearby glazes ${nearbyViewMode} view`}
      >
        {nearbyViewMode === 'gallery' ? (
          /* Gallery grid view */
          filteredNearby.map((n, i) => {
            const nGlaze = nearbyGlazes.get(n.id)
            const thumbUrl = nGlaze?.images?.[0] ?? null
            return (
              <button
                key={n.id}
                className={`gallery-card${selectedGlaze?.id === n.id ? ' active' : ''}${hoveredNeighborId === n.id ? ' hovered' : ''}`}
                onClick={(e) => navigateToNeighbor(e, n)}
                onMouseEnter={() => onHoverNeighbor(n.id)}
                onMouseLeave={() => onHoverNeighbor(null)}
                onFocus={() => onHoverNeighbor(n.id)}
                onBlur={() => onHoverNeighbor(null)}
                role="option"
                aria-selected={selectedGlaze?.id === n.id}
                title={`${n.name}\nSiO\u2082: ${n.x.toFixed(2)}, Al\u2082O\u2083: ${n.y.toFixed(2)}\nShift+click to compare`}
              >
                <div className="gallery-thumb">
                  {thumbUrl ? (
                    <img src={thumbUrl} alt={n.name} loading="lazy" onError={(e) => {
                      const el = e.currentTarget; el.style.display = 'none';
                      const fallback = el.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = '';
                    }} />
                  ) : null}
                  <div className="gallery-no-photo" style={thumbUrl ? { display: 'none' } : undefined}>
                    <span className={`proximity-nearby-surface st-${n.surfaceType}`}>{surfaceLabel(n.surfaceType)}</span>
                  </div>
                  <span className="gallery-rank">#{i + 1}</span>
                  {(nGlaze?.images?.length ?? 0) > 1 && (
                    <span className="gallery-photo-count">{'\uD83D\uDCF7'}{nGlaze!.images!.length}</span>
                  )}
                  <span className="gallery-dist">{n.distance.toFixed(2)}</span>
                </div>
                <div className="gallery-info">
                  <span className="gallery-name">{n.name}</span>
                  <div className="gallery-meta">
                    {n.cone != null && <span className="proximity-nearby-cone">{'\u25B3'}{n.cone}</span>}
                    <span className={`proximity-nearby-surface st-${n.surfaceType}`}>{surfaceLabel(n.surfaceType)}</span>
                  </div>
                </div>
              </button>
            )
          })
        ) : (
          /* List view with mini thumbnails */
          filteredNearby.map((n, i) => {
            const nGlaze = nearbyGlazes.get(n.id)
            const thumbUrl = nGlaze?.images?.[0] ?? null
            return (
              <button
                key={n.id}
                className={`proximity-nearby-item${selectedGlaze?.id === n.id ? ' active' : ''}${hoveredNeighborId === n.id ? ' hovered' : ''}`}
                onClick={(e) => navigateToNeighbor(e, n)}
                onMouseEnter={() => onHoverNeighbor(n.id)}
                onMouseLeave={() => onHoverNeighbor(null)}
                onFocus={() => onHoverNeighbor(n.id)}
                onBlur={() => onHoverNeighbor(null)}
                role="option"
                aria-selected={selectedGlaze?.id === n.id}
                title={`SiO\u2082: ${n.x.toFixed(2)}, Al\u2082O\u2083: ${n.y.toFixed(2)}, ${zAxisLabel(zAxis)}: ${n.z.toFixed(3)}\nShift+click to compare`}
              >
                {thumbUrl ? (
                  <img className="list-thumb" src={thumbUrl} alt="" loading="lazy" onError={(e) => {
                    const el = e.currentTarget; el.style.display = 'none';
                    const fallback = el.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = '';
                  }} />
                ) : null}
                <span className="list-thumb-placeholder" style={thumbUrl ? { display: 'none' } : undefined} />
                {(nGlaze?.images?.length ?? 0) > 1 && (
                  <span className="list-photo-count">{nGlaze!.images!.length}</span>
                )}
                <span className="proximity-nearby-rank">{i + 1}</span>
                <span className="proximity-nearby-name">{n.name}</span>
                {n.cone != null && <span className="proximity-nearby-cone">{'\u25B3'}{typeof n.cone === 'number' && n.cone === Math.floor(n.cone) ? n.cone : n.cone}</span>}
                <span className={`proximity-nearby-surface st-${n.surfaceType}`} title={n.surfaceType}>{surfaceLabel(n.surfaceType)}</span>
                {/* Per-axis similarity bars */}
                <span className="proximity-nearby-bars" title={`SiO\u2082: ${(Math.max(0, 1 - n.dx) * 100).toFixed(0)}% | Al\u2082O\u2083: ${(Math.max(0, 1 - n.dy) * 100).toFixed(0)}% | ${zAxisLabel(zAxis)}: ${(Math.max(0, 1 - n.dz) * 100).toFixed(0)}%`}>
                  <span className="sim-bar bar-x" style={{ width: `${Math.max(0, 1 - n.dx) * 100}%` }} />
                  <span className="sim-bar bar-y" style={{ width: `${Math.max(0, 1 - n.dy) * 100}%` }} />
                  <span className="sim-bar bar-z" style={{ width: `${Math.max(0, 1 - n.dz) * 100}%` }} />
                </span>
                <span className="proximity-nearby-dist">{n.distance.toFixed(2)}</span>
              </button>
            )
          })
        )}
      </div>

      {/* Mini UMF preview on hover */}
      {hoveredGlaze?.umf && hoveredNeighbor && (
        <div className="proximity-preview">
          <div className="proximity-preview-top">
            {hoveredGlaze.images?.[0] && (
              <img className="preview-thumb" src={hoveredGlaze.images[0]} alt="" loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="proximity-preview-name">{hoveredGlaze.name}</div>
              <div className="proximity-preview-meta">
                {hoveredGlaze.coneRange?.[0] != null && <span>{'\u25B3'}{hoveredGlaze.coneRange[0]}{hoveredGlaze.coneRange[1] !== hoveredGlaze.coneRange[0] ? `\u2013${hoveredGlaze.coneRange[1]}` : ''}</span>}
                <span>{hoveredGlaze.surfaceType}</span>
                <span>{hoveredGlaze.atmosphere}</span>
                <span>d={hoveredNeighbor.distance.toFixed(3)}</span>
              </div>
            </div>
          </div>
          <div className="proximity-preview-row">
            <UMFFingerprint umf={hoveredGlaze.umf} width={120} height={10} compact />
            <FluxDonut umf={hoveredGlaze.umf} size={32} innerRadius={0.55} />
          </div>
        </div>
      )}

      <div className="proximity-nearby-legend">
        <span className="sim-legend-item"><span className="sim-dot dot-x" />SiO{'\u2082'}</span>
        <span className="sim-legend-item"><span className="sim-dot dot-y" />Al{'\u2082'}O{'\u2083'}</span>
        <span className="sim-legend-item"><span className="sim-dot dot-z" />{zAxisLabel(zAxis)}</span>
      </div>
    </div>
  )
}
