/**
 * Pure helper functions for ImageCarousel boundary logic.
 *
 * Extracted so they can be unit-tested without jsdom.
 * The carousel, lightbox, and keyboard handler delegate to these.
 */

/** Wrap an index forward or backward within [0 .. length-1]. */
export function wrapIndex(current: number, delta: number, length: number): number {
  if (length <= 0) return 0
  return ((current + delta) % length + length) % length
}

/** Clamp carousel index when images array shrinks below current index. */
export function safeIndex(index: number, length: number): number {
  if (length <= 0) return 0
  return Math.min(index, length - 1)
}

/** Step zoom by `step`, clamped to [min, max]. */
export function stepZoom(
  current: number,
  step: number,
  min: number = 0.5,
  max: number = 4,
): number {
  const next = current + step
  if (next > max) return max
  if (next < min) return min
  return next
}

/** True when a keyboard event targets an interactive form element. */
export function isFormElement(el: EventTarget | null): boolean {
  if (!el || typeof el !== 'object') return false
  const node = el as { tagName?: string; isContentEditable?: boolean }
  if (!node.tagName) return false
  const tag = node.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true
  if (node.isContentEditable) return true
  return false
}
