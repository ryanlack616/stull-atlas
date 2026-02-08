/**
 * usePageTitle Hook
 * 
 * Sets document.title on mount, restores on unmount.
 */

import { useEffect } from 'react'

const BASE_TITLE = 'Stull Atlas'

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : BASE_TITLE
    return () => { document.title = BASE_TITLE }
  }, [title])
}
