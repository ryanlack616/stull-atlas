/**
 * Theme Store
 * 
 * Manages light/dark mode with localStorage persistence.
 * Applies data-theme attribute to document root.
 * 
 * Studio edition adds three skins inspired by the ceramics community:
 *   normal     – clean neutral slate, no personality
 *   digitalfire – Tony Hansen's blue/navy academic aesthetic
 *   glazy      – Derek Au's modern teal open-source vibe
 */

import { create } from 'zustand'

/** Base themes available in all editions */
type BaseTheme = 'dark' | 'light'

/** Studio-exclusive skins */
type Skin = 'normal' | 'digitalfire' | 'glazy'

/** All theme options */
export type Theme = BaseTheme | Skin

/** The three Studio-only skins */
export const STUDIO_SKINS: { id: Skin; label: string; preview: string }[] = [
  { id: 'normal',      label: 'Normal',      preview: '#708090' },
  { id: 'digitalfire', label: 'Digitalfire', preview: '#2B5797' },
  { id: 'glazy',       label: 'Glazy',       preview: '#26A69A' },
]

interface ThemeState {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('stull-theme')
    if (stored === 'light' || stored === 'dark' ||
        stored === 'normal' || stored === 'digitalfire' || stored === 'glazy') {
      return stored
    }
  } catch { /* ignore */ }
  return 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem('stull-theme', theme)
  } catch { /* ignore */ }
}

// Apply on load
applyTheme(getInitialTheme())

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getInitialTheme(),

  toggle: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    set({ theme: next })
  },

  setTheme: (theme: Theme) => {
    applyTheme(theme)
    set({ theme })
  },
}))
