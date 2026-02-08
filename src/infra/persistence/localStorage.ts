/**
 * Infra: LocalStorage Helpers
 *
 * Generic read/write helpers for browser localStorage.
 * Centralises error handling and serialization.
 */

/**
 * Safely read a JSON value from localStorage.
 * Returns `fallback` on any error.
 */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/**
 * Safely write a JSON value to localStorage.
 */
export function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(`Failed to write ${key} to localStorage:`, e)
  }
}

/**
 * Remove a key from localStorage.
 */
export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
