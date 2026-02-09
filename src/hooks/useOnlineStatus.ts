/**
 * useOnlineStatus — tracks navigator.onLine and listens for online/offline events.
 * Also listens for SW_UPDATED messages from the service worker to show a
 * "new version available" banner.
 */
import { useState, useEffect, useCallback } from 'react'

export interface OnlineStatus {
  /** true when the browser reports a network connection */
  isOnline: boolean
  /** true when the service worker signals a new version was activated */
  hasUpdate: boolean
  /** Call to reload the page (after SW update) */
  applyUpdate: () => void
}

export function useOnlineStatus(): OnlineStatus {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [hasUpdate, setHasUpdate] = useState(false)

  useEffect(() => {
    const goOnline = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    // Listen for service worker update message
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SW_UPDATED') {
        setHasUpdate(true)
      }
    }
    navigator.serviceWorker?.addEventListener('message', onMessage)

    // After initial load, tell the SW to opportunistically cache lazy assets
    if ('serviceWorker' in navigator && navigator.onLine) {
      navigator.serviceWorker.ready.then(reg => {
        reg.active?.postMessage({ type: 'CACHE_LAZY' })
      })
    }

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
      navigator.serviceWorker?.removeEventListener('message', onMessage)
    }
  }, [])

  const applyUpdate = useCallback(() => {
    window.location.reload()
  }, [])

  return { isOnline, hasUpdate, applyUpdate }
}
