/**
 * Platform Detection
 *
 * Detects whether the app is running inside a Tauri desktop
 * shell or as a normal web browser session.
 *
 * Usage:
 *   import { isTauri } from '@/utils/platform'
 *   if (isTauri) { /* desktop-only behaviour * / }
 */

/**
 * `true` when the app is running inside the Tauri WebView
 * (i.e. the standalone desktop build), `false` in a browser.
 *
 * Tauri 2 injects `window.__TAURI_INTERNALS__` at startup.
 */
export const isTauri: boolean =
  typeof window !== 'undefined' &&
  '__TAURI_INTERNALS__' in window
