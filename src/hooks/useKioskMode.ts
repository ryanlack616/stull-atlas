/**
 * Kiosk Mode Hook
 *
 * Detects `?kiosk=1` in the URL and provides state for booth/demo display.
 *
 * In kiosk mode:
 *   - Header nav is hidden
 *   - Explorer sidebars are hidden
 *   - 3D view is forced on with auto-rotate
 *   - Branded overlay is shown
 *   - Plotly modebar is hidden
 *   - Press ESC to exit kiosk mode
 *
 * Usage:
 *   Navigate to /#/?kiosk=1          — default kiosk
 *   Navigate to /#/?kiosk=1&z=CaO    — kiosk with specific Z axis
 */

import { useState, useEffect, useCallback } from 'react'

export interface KioskState {
  /** Whether kiosk mode is currently active */
  active: boolean
  /** Exit kiosk mode (removes URL param, restores UI) */
  exit: () => void
}

export function useKioskMode(): KioskState {
  const [active, setActive] = useState(() => {
    const params = new URLSearchParams(window.location.search || window.location.hash.split('?')[1] || '')
    return params.get('kiosk') === '1'
  })

  // ESC key exits kiosk mode
  useEffect(() => {
    if (!active) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActive(false)
        // Clean the URL param
        const url = new URL(window.location.href)
        url.searchParams.delete('kiosk')
        // Also clean from hash if using HashRouter
        if (url.hash.includes('kiosk')) {
          url.hash = url.hash.replace(/[?&]kiosk=1/, '').replace(/\?$/, '')
        }
        window.history.replaceState({}, '', url.toString())
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [active])

  // Hide cursor after 3 seconds of no movement in kiosk mode
  useEffect(() => {
    if (!active) {
      document.body.classList.remove('kiosk-mode')
      document.body.style.cursor = ''
      return
    }

    document.body.classList.add('kiosk-mode')
    let timeout: ReturnType<typeof setTimeout>

    const resetCursor = () => {
      document.body.style.cursor = ''
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        document.body.style.cursor = 'none'
      }, 3000)
    }

    resetCursor()
    window.addEventListener('mousemove', resetCursor)

    return () => {
      clearTimeout(timeout)
      document.body.style.cursor = ''
      document.body.classList.remove('kiosk-mode')
      window.removeEventListener('mousemove', resetCursor)
    }
  }, [active])

  const exit = useCallback(() => setActive(false), [])

  return { active, exit }
}
