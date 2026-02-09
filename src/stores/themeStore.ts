/**
 * Theme Store
 * 
 * Manages light/dark mode with localStorage persistence.
 * Applies data-theme attribute to document root.
 * 
 * Studio edition adds pottery-inspired skins:
 *   earthen  – warm terracotta/clay tones
 *   celadon  – cool jade/celadon green
 *   shino    – warm cream/rust/carbon
 */

import { create } from 'zustand'

/** Base themes available in all editions */
type BaseTheme = 'dark' | 'light'

/** Studio-exclusive skins */
type Skin = 'earthen' | 'celadon' | 'shino'

/** All theme options */
export type Theme = BaseTheme | Skin

/** The three Studio-only skins */
export const STUDIO_SKINS: { id: Skin; label: string; preview: string }[] = [
  { id: 'earthen', label: 'Earthen', preview: '#8B4513' },
  { id: 'celadon', label: 'Celadon', preview: '#6B8E6B' },
  { id: 'shino',   label: 'Shino',   preview: '#D2691E' },
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
        stored === 'earthen' || stored === 'celadon' || stored === 'shino') {
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
