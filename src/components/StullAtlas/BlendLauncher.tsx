/**
 * BlendLauncher — Sidebar panel for blend selection
 * 
 * Shows glazes selected for blending (shift+click on plot).
 * Lets users remove individual glazes, clear all, or launch
 * the appropriate blend calculator (line/triaxial/quadaxial).
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GlazeRecipe } from '@/types'
import { useSelectionStore, useRecipeStore } from '@/stores'
import { formatCone } from '@/calculator/parseCone'
import { UMFFingerprint, GlazeTypeBadge } from '@/components/UMFVisuals'

/** Route + label for each blend count */
const BLEND_ROUTES: Record<number, { path: string; label: string }> = {
  2: { path: '/calc/line-blend', label: 'Line Blend' },
  3: { path: '/calc/triaxial', label: 'Triaxial Blend' },
  4: { path: '/calc/quadaxial', label: 'Quadaxial Blend' },
}

const BLEND_COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']

interface BlendLauncherProps {
  glazes: GlazeRecipe[]
  onRemove: (id: string) => void
  onClear: () => void
  onSelect: (g: GlazeRecipe) => void
}

export function BlendLauncher({ glazes, onRemove, onClear, onSelect }: BlendLauncherProps) {
  const navigate = useNavigate()
  const { setBlendRecipes } = useRecipeStore()

  const route = BLEND_ROUTES[glazes.length]

  const handleLaunch = () => {
    if (!route) return
    // Stash selected glazes in recipeStore so the blend page can pick them up
    setBlendRecipes(glazes)
    navigate(route.path)
  }

  if (glazes.length === 0) {
    return (
      <div className="blend-empty">
        <p style={{ fontWeight: 600, marginBottom: 8 }}>Blend Glazes</p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          <strong>Shift+click</strong> points on the chart to select 2–4 glazes,
          then launch a blend calculator to explore the space between them.
        </p>
        <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-muted)' }}>
          <div>2 glazes → Line Blend</div>
          <div>3 glazes → Triaxial Blend</div>
          <div>4 glazes → Quadaxial Blend</div>
        </div>
      </div>
    )
  }

  return (
    <div className="blend-launcher" role="tabpanel" aria-label="Blend selection">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>
          Blend Selection ({glazes.length})
        </span>
        <button
          onClick={onClear}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', fontSize: 11, textDecoration: 'underline',
          }}
        >
          Clear all
        </button>
      </div>

      {/* Selected glazes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        {glazes.map((g, i) => (
          <div
            key={g.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 8px', borderRadius: 6,
              background: 'var(--bg-secondary)',
              border: `2px solid ${BLEND_COLORS[i]}`,
              cursor: 'pointer',
            }}
            onClick={() => onSelect(g)}
            title="Click to view details"
          >
            <span style={{
              width: 12, height: 12, borderRadius: '50%',
              background: BLEND_COLORS[i], flexShrink: 0,
            }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12, fontWeight: 500,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {g.name}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                Cone {formatCone(Number(g.coneRange[0]))}–{formatCone(Number(g.coneRange[1]))} · {g.surfaceType}
              </div>
            </div>
            {g.umf && (
              <div style={{ flexShrink: 0 }}>
                <UMFFingerprint umf={g.umf} />
              </div>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onRemove(g.id) }}
              style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', fontSize: 14, padding: '0 2px', lineHeight: 1,
              }}
              title="Remove from blend"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Hint for more */}
      {glazes.length === 1 && (
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>
          Shift+click one more point to enable Line Blend.
        </p>
      )}
      {glazes.length >= 2 && glazes.length < 4 && (
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>
          Shift+click more points to unlock higher-order blends, or launch now.
        </p>
      )}

      {/* Launch button */}
      {route && (
        <button
          onClick={handleLaunch}
          style={{
            width: '100%', padding: '10px 16px',
            background: 'var(--accent)', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer',
            fontWeight: 600, fontSize: 13,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <span>{route.label}</span>
          <span style={{ fontSize: 16 }}>→</span>
        </button>
      )}

      {glazes.length > 4 && (
        <p style={{ fontSize: 11, color: 'var(--accent-warn, orange)', marginTop: 8 }}>
          Max 4 glazes for blend calculators. Remove some to continue.
        </p>
      )}
    </div>
  )
}
