/**
 * ImageCarousel — Sidebar photo carousel + fullscreen lightbox
 *
 * Extracted from index.tsx. Owns carousel index, lightbox state,
 * keyboard shortcuts for image navigation and zoom.
 */

import { useState, useEffect, useCallback } from 'react'
import { wrapIndex, safeIndex, stepZoom, isFormElement } from './carouselUtils'

export interface ImageCarouselProps {
  images: string[]
  glazeName: string
  /** If true, suppress keyboard shortcuts (e.g. when an input is focused) */
  sidebarTab?: string
}

export function ImageCarousel({ images, glazeName, sidebarTab }: ImageCarouselProps) {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxZoom, setLightboxZoom] = useState(1)

  // Reset when images change (new glaze selected)
  useEffect(() => {
    setCarouselIndex(0)
    setLightboxOpen(false)
    setLightboxZoom(1)
  }, [images])

  // ── Keyboard shortcuts ──────────────────────────────────────
  useEffect(() => {
    if (!images || images.length === 0) return

    const handler = (e: KeyboardEvent) => {
      if (isFormElement(e.target)) return

      if (lightboxOpen) {
        if (e.key === 'Escape') {
          setLightboxOpen(false)
          setLightboxZoom(1)
          e.preventDefault()
        } else if (e.key === 'ArrowLeft') {
          setCarouselIndex(i => wrapIndex(i, -1, images.length))
          e.preventDefault()
        } else if (e.key === 'ArrowRight') {
          setCarouselIndex(i => wrapIndex(i, 1, images.length))
          e.preventDefault()
        } else if (e.key === '+' || e.key === '=') {
          setLightboxZoom(z => stepZoom(z, 0.5))
          e.preventDefault()
        } else if (e.key === '-') {
          setLightboxZoom(z => stepZoom(z, -0.5))
          e.preventDefault()
        } else if (e.key === '0') {
          setLightboxZoom(1)
          e.preventDefault()
        }
      } else if (sidebarTab === 'detail') {
        if (e.key === 'ArrowLeft' && images.length > 1) {
          setCarouselIndex(i => wrapIndex(i, -1, images.length))
          e.preventDefault()
        } else if (e.key === 'ArrowRight' && images.length > 1) {
          setCarouselIndex(i => wrapIndex(i, 1, images.length))
          e.preventDefault()
        }
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [images, lightboxOpen, sidebarTab])

  const idx = safeIndex(carouselIndex, images.length)

  return (
    <>
      <div className="detail-section">
        <h4>Photo{images.length > 1 ? `s (${idx + 1}/${images.length})` : ''}</h4>
        <div className="carousel-container">
          <img
            src={images[idx]}
            alt={`${glazeName} — photo ${idx + 1}`}
            loading="lazy"
            className="carousel-img"
            onClick={() => { setLightboxOpen(true); setLightboxZoom(1) }}
            style={{ cursor: 'zoom-in' }}
            title="Click to enlarge (← → to cycle, Esc to close)"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (fallback?.classList.contains('carousel-img-fallback')) fallback.style.display = 'flex';
            }}
          />
          <div className="carousel-img-fallback" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', height: 200, color: 'var(--text-secondary, #888)', fontSize: 13 }}>Image unavailable</div>
          {images.length > 1 && (
            <>
              <button
                className="carousel-btn carousel-prev"
                onClick={() => setCarouselIndex(i => wrapIndex(i, -1, images.length))}
                title="Previous photo"
              >{'\u2039'}</button>
              <button
                className="carousel-btn carousel-next"
                onClick={() => setCarouselIndex(i => wrapIndex(i, 1, images.length))}
                title="Next photo"
              >{'\u203A'}</button>
              <div className="carousel-dots">
                {images.map((_, di) => (
                  <button
                    key={di}
                    className={`carousel-dot${di === idx ? ' active' : ''}`}
                    onClick={() => setCarouselIndex(di)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) { setLightboxOpen(false); setLightboxZoom(1) } }}
          role="dialog"
          aria-label="Image lightbox"
        >
          <div className="lightbox-content">
            <img
              src={images[idx]}
              alt={`${glazeName} — photo ${idx + 1}`}
              className="lightbox-img"
              style={{ transform: `scale(${lightboxZoom})` }}
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback?.classList.contains('lightbox-img-fallback')) fallback.style.display = 'flex';
              }}
            />
            <div className="lightbox-img-fallback" style={{ display: 'none', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 16 }}>Image unavailable</div>
            {images.length > 1 && (
              <>
                <button
                  className="lightbox-nav lightbox-prev"
                  onClick={() => setCarouselIndex(i => wrapIndex(i, -1, images.length))}
                  title="Previous (←)"
                >{'\u2039'}</button>
                <button
                  className="lightbox-nav lightbox-next"
                  onClick={() => setCarouselIndex(i => wrapIndex(i, 1, images.length))}
                  title="Next (→)"
                >{'\u203A'}</button>
              </>
            )}
            <div className="lightbox-toolbar">
              <span className="lightbox-caption">
                {glazeName}{images.length > 1 ? ` (${idx + 1}/${images.length})` : ''}
              </span>
              <div className="lightbox-zoom-controls">
                <button onClick={() => setLightboxZoom(z => stepZoom(z, -0.5))} title="Zoom out (−)">{'\u2212'}</button>
                <span>{(lightboxZoom * 100).toFixed(0)}%</span>
                <button onClick={() => setLightboxZoom(z => stepZoom(z, 0.5))} title="Zoom in (+)">+</button>
                {lightboxZoom !== 1 && (
                  <button onClick={() => setLightboxZoom(1)} title="Reset zoom (0)">1:1</button>
                )}
              </div>
              <button className="lightbox-close" onClick={() => { setLightboxOpen(false); setLightboxZoom(1) }} title="Close (Esc)">{'\u2715'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
