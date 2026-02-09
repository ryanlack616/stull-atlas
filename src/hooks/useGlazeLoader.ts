/**
 * Hook: useGlazeLoader
 *
 * Encapsulates loading the Glazy dataset into the glaze store.
 * Prevents duplicate loads, exposes loading state, and provides
 * a `retry()` callback for manual re-attempts after failure.
 */

import { useEffect, useCallback } from 'react'
import { useGlazeStore } from '@/stores'

export function useGlazeLoader() {
  const { loadGlazes, setLoading, setError, isLoading, loadError } = useGlazeStore()

  const doLoad = useCallback(async (cancelled = { current: false }) => {
    setLoading(true)
    setError(null)
    try {
      const { loadGlazyDataset } = await import('@/domain/glaze')
      const glazes = await loadGlazyDataset()
      if (!cancelled.current) loadGlazes(glazes)
    } catch (err: any) {
      if (!cancelled.current) setError(err.message || 'Failed to load dataset')
    } finally {
      if (!cancelled.current) setLoading(false)
    }
  }, [loadGlazes, setLoading, setError])

  useEffect(() => {
    if (useGlazeStore.getState().stats.total > 0) return

    const cancelled = { current: false }
    doLoad(cancelled)
    return () => { cancelled.current = true }
  }, [doLoad])

  /** Manual retry — clears error and re-fetches */
  const retry = useCallback(() => {
    doLoad()
  }, [doLoad])

  return { isLoading, loadError, retry }
}
