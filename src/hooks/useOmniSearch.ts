/**
 * useOmniSearch
 *
 * Unified search hook that queries across all knowledge domains:
 * - User's loaded glazes (by name)
 * - Digitalfire reference library (materials, oxides, glossary, articles, troubles, tests)
 * - App pages (quick nav)
 *
 * Triggered by Ctrl+K / Cmd+K.
 */

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { useGlazeStore } from '@/stores'
import { formatCone } from '@/calculator/parseCone'
import type { GlazeRecipe } from '@/types'

// Lazy-loaded to keep ~700 KB of digitalfire JSON out of the initial bundle.
// The data is only needed when the user actually types a search query.
let dfModule: typeof import('@/domain/digitalfire') | null = null
async function getDf() {
  if (!dfModule) dfModule = await import('@/domain/digitalfire')
  return dfModule
}

// ─── Result types ───────────────────────────────────────────────

export type ResultCategory = 'glaze' | 'knowledge' | 'page'

export interface OmniResult {
  id: string
  title: string
  subtitle: string
  category: ResultCategory
  /** For glazes: glaze id. For knowledge: digitalfire URL. For pages: route path. */
  action: string
  /** Badge text (e.g. 'oxide', 'glossary', 'material') */
  badge?: string
  /** Score for internal ranking */
  score: number
}

// ─── App pages ──────────────────────────────────────────────────

const APP_PAGES: { title: string; path: string; keywords: string }[] = [
  { title: 'Explorer (Stull Plot)', path: '/', keywords: 'stull plot atlas explorer chart scatter umf' },
  { title: 'AI Recipe Suggestions', path: '/suggest', keywords: 'suggest ai recipe generate glaze idea' },
  { title: 'UMF Calculator', path: '/calc/umf', keywords: 'calculator umf unity molecular formula recipe' },
  { title: 'Line Blend', path: '/calc/line-blend', keywords: 'line blend two recipes steps' },
  { title: 'Triaxial Blend', path: '/calc/triaxial', keywords: 'triaxial blend three triangle simplex' },
  { title: 'Quadaxial Blend', path: '/calc/quadaxial', keywords: 'quadaxial blend four recipes' },
  { title: 'Biaxial Blend', path: '/calc/biaxial', keywords: 'biaxial grid blend two axis' },
  { title: 'Radial Blend', path: '/calc/radial', keywords: 'radial blend center variations' },
  { title: 'Space-Filling Design', path: '/calc/space-filling', keywords: 'space filling design coverage tiles' },
  { title: 'Recipe Optimizer', path: '/calc/optimizer', keywords: 'optimizer target gradient descent genetic algorithm' },
  { title: 'Materials Database', path: '/materials', keywords: 'materials database feldspar kaolin silica' },
  { title: 'Import / Export', path: '/import-export', keywords: 'import export csv json download upload' },
  { title: 'Guide', path: '/guide', keywords: 'guide tutorial help how to get started' },
  { title: 'Timeline', path: '/timeline', keywords: 'timeline history ceramics pottery' },
  { title: 'About', path: '/about', keywords: 'about credits tony hansen digitalfire' },
  { title: 'What\'s New', path: '/updates', keywords: 'updates changelog release notes version' },
]

// ─── Search engine ──────────────────────────────────────────────

function searchGlazes(query: string, glazes: GlazeRecipe[], limit = 8): OmniResult[] {
  const q = query.toLowerCase()
  const words = q.split(/\s+/).filter(w => w.length > 1)
  const results: OmniResult[] = []

  for (const g of glazes) {
    const nameLower = g.name.toLowerCase()
    let score = 0

    if (nameLower === q) score = 100
    else if (nameLower.startsWith(q)) score = 80
    else if (nameLower.includes(q)) score = 60
    else {
      // Word-level matching
      for (const w of words) {
        if (nameLower.includes(w)) score += 20
      }
    }

    if (score > 0) {
      const coneStr = g.coneRange?.[0] !== undefined ? `Cone ${formatCone(Number(g.coneRange[0]))}` : ''
      const atmo = g.atmosphere !== 'unknown' ? g.atmosphere : ''
      const surface = g.surfaceType !== 'unknown' ? g.surfaceType : ''
      const parts = [coneStr, atmo, surface].filter(Boolean)

      results.push({
        id: `glaze-${g.id}`,
        title: g.name,
        subtitle: parts.join(' · ') || g.source,
        category: 'glaze',
        action: g.id,
        score,
      })
    }

    if (results.length >= limit * 3) break // Early exit for large datasets
  }

  results.sort((a, b) => b.score - a.score)
  return results.slice(0, limit)
}

function searchPages(query: string): OmniResult[] {
  const q = query.toLowerCase()
  const words = q.split(/\s+/).filter(w => w.length > 1)
  const results: OmniResult[] = []

  for (const page of APP_PAGES) {
    const titleLower = page.title.toLowerCase()
    let score = 0

    if (titleLower.includes(q)) score = 60
    else {
      for (const w of words) {
        if (titleLower.includes(w)) score += 20
        if (page.keywords.includes(w)) score += 10
      }
    }

    if (score > 0) {
      results.push({
        id: `page-${page.path}`,
        title: page.title,
        subtitle: page.path,
        category: 'page',
        action: page.path,
        score,
      })
    }
  }

  results.sort((a, b) => b.score - a.score)
  return results.slice(0, 4)
}

async function searchDigitalfire(query: string, limit = 8): Promise<OmniResult[]> {
  try {
    const df = await getDf()
    const refs = df.searchKnowledge(query, limit)
    return refs.map((ref, i) => ({
      id: `df-${ref.category}-${i}`,
      title: ref.title,
      subtitle: ref.excerpt?.slice(0, 120) || '',
      category: 'knowledge' as ResultCategory,
      action: ref.url,
      badge: ref.category,
      score: 50 - i, // preserve searchKnowledge's own ranking
    }))
  } catch {
    return [] // graceful fallback if lazy load fails
  }
}

// ─── Hook ───────────────────────────────────────────────────────

export function useOmniSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const getGlazesArray = useGlazeStore(s => s.getGlazesArray)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  // Debounced query for expensive searches
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [knowledgeResults, setKnowledgeResults] = useState<OmniResult[]>([])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query)
      setSelectedIndex(0)
    }, 120)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query])

  // Async digitalfire search (lazy-loaded)
  useEffect(() => {
    const q = debouncedQuery.trim()
    if (q.length < 2) { setKnowledgeResults([]); return }
    let stale = false
    searchDigitalfire(q).then(r => { if (!stale) setKnowledgeResults(r) })
    return () => { stale = true }
  }, [debouncedQuery])

  // Combined results (glaze + page are sync, knowledge comes from state)
  const results = useMemo(() => {
    const q = debouncedQuery.trim()
    if (q.length < 2) return []

    const glazes = getGlazesArray()
    const glazeResults = searchGlazes(q, glazes)
    const pageResults = searchPages(q)

    return [...pageResults, ...glazeResults, ...knowledgeResults]
  }, [debouncedQuery, getGlazesArray, knowledgeResults])

  // Group results by category for display
  const grouped = useMemo(() => {
    const groups: Record<ResultCategory, OmniResult[]> = {
      page: [],
      glaze: [],
      knowledge: [],
    }
    for (const r of results) {
      groups[r.category].push(r)
    }
    return groups
  }, [results])

  // Flat list for keyboard nav
  const flatResults = useMemo(() => {
    const flat: OmniResult[] = []
    if (grouped.page.length) flat.push(...grouped.page)
    if (grouped.glaze.length) flat.push(...grouped.glaze)
    if (grouped.knowledge.length) flat.push(...grouped.knowledge)
    return flat
  }, [grouped])

  const toggle = useCallback(() => {
    setOpen(v => {
      if (!v) {
        setQuery('')
        setDebouncedQuery('')
        setSelectedIndex(0)
      }
      return !v
    })
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setDebouncedQuery('')
    setSelectedIndex(0)
  }, [])

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle, close, open])

  // Arrow key navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, flatResults.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    }
  }, [flatResults.length])

  return {
    open,
    query,
    setQuery,
    toggle,
    close,
    grouped,
    flatResults,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
    results,
  }
}
