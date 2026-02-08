/**
 * Theme Store
 * 
 * Manages light/dark mode with localStorage persistence.
 * Applies data-theme attribute to document root.
 */

import { create } from 'zustand'

type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggle: () => void
  setTheme: (theme: Theme) => void
}

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem('stull-theme')
    if (stored === 'light' || stored === 'dark') return stored
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
