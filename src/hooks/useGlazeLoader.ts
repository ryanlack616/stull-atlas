/**
 * Hook: useGlazeLoader
 *
 * Encapsulates loading the Glazy dataset into the glaze store.
 * Prevents duplicate loads and exposes loading state.
 */

import { useEffect } from 'react'
import { useGlazeStore } from '@/stores'

export function useGlazeLoader() {
  const { loadGlazes, setLoading, setError, isLoading, loadError } = useGlazeStore()

  useEffect(() => {
    // Skip if already loaded
    if (useGlazeStore.getState().stats.total > 0) return

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        // Dynamic import → code-split chunk
        const { loadGlazyDataset } = await import('@/domain/glaze')
        const glazes = await loadGlazyDataset()
        if (!cancelled) loadGlazes(glazes)
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to load dataset')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [loadGlazes, setLoading, setError])

  return { isLoading, loadError }
}
