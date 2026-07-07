import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  projectTitle: string
  /** When provided, renders as a standalone fullscreen modal immediately */
  initialIndex?: number
  /** Called when the standalone modal is closed */
  onClose?: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

export function ImageGallery({ images, projectTitle, initialIndex, onClose }: ImageGalleryProps) {
  const standalone = initialIndex !== undefined && onClose !== undefined

  const [active, setActive]     = useState(0)
  const [modal, setModal]       = useState(false)
  const [modalIdx, setModalIdx] = useState(0)
  const [dir, setDir]           = useState(1)
  const closeRef                = useRef<HTMLButtonElement>(null)

  const count = images.length

  // Standalone mode: open immediately at initialIndex
  useEffect(() => {
    if (standalone) {
      setModalIdx(initialIndex!)
      setModal(true)
    }
  }, [standalone, initialIndex])

  const go = useCallback((next: number, direction: number) => {
    setDir(direction)
    setActive(((next % count) + count) % count)
  }, [count])

  const openModal = (idx: number) => {
    setModalIdx(idx)
    setModal(true)
  }

  const closeModal = useCallback(() => {
    setModal(false)
    if (standalone && onClose) {
      onClose()
    } else {
      setTimeout(() => closeRef.current?.focus(), 50)
    }
  }, [standalone, onClose])

  const modalGo = useCallback((next: number, direction: number) => {
    setDir(direction)
    setModalIdx(((next % count) + count) % count)
  }, [count])

  useEffect(() => {
    if (!modal) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') modalGo(modalIdx + 1, 1)
      if (e.key === 'ArrowLeft')  modalGo(modalIdx - 1, -1)
      if (e.key === 'Escape')     closeModal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modal, modalIdx, modalGo, closeModal])

  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modal])

  if (count === 0) return null

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -40 }),
  }

  return (
    <>
      {/* ── Inline strip (only shown when not standalone) ── */}
      {!standalone && (
        <div>
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              aspectRatio: '16/9',
              cursor: 'zoom-in',
            }}
            onClick={() => openModal(active)}
            role="button"
            tabIndex={0}
            aria-label={`Enlarge screenshot ${active + 1} of ${count}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openModal(active) }}
          >
            <AnimatePresence custom={dir} mode="wait">
              <motion.img
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: EASE }}
                src={images[active]}
                alt={`${projectTitle} screenshot ${active + 1}`}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </AnimatePresence>

            <div style={{
              position: 'absolute', bottom: '0.75rem', right: '0.75rem',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-md)', padding: '0.3rem 0.5rem',
              display: 'flex', alignItems: 'center', gap: '0.3rem', pointerEvents: 'none',
            }}>
              <ZoomIn size={12} color="rgba(255,255,255,0.6)" />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                {active + 1} / {count}
              </span>
            </div>

            {count > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); go(active - 1, -1) }}
                  aria-label="Previous screenshot"
                  style={{
                    position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    width: 32, height: 32, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.8)', transition: 'background 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); go(active + 1, 1) }}
                  aria-label="Next screenshot"
                  style={{
                    position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    width: 32, height: 32, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.8)', transition: 'background 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > active ? 1 : -1); setActive(i) }}
                  aria-label={`View screenshot ${i + 1}`}
                  aria-pressed={i === active}
                  style={{
                    flexShrink: 0, width: 72, height: 48,
                    borderRadius: 'var(--radius-md)', overflow: 'hidden',
                    border: i === active ? '2px solid var(--color-accent)' : '2px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer', padding: 0, transition: 'border-color 150ms',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <img
                    src={src}
                    alt={`${projectTitle} thumbnail ${i + 1}`}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`${projectTitle} screenshot viewer`}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <button
              ref={closeRef}
              onClick={closeModal}
              aria-label="Close image viewer"
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                width: 40, height: 40,
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.7)', zIndex: 101,
                transition: 'background 150ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <X size={18} strokeWidth={2} />
            </button>

            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.22, ease: EASE }}
              style={{
                position: 'relative', maxWidth: '90vw', maxHeight: '85vh',
                borderRadius: 'var(--radius-xl)', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <AnimatePresence custom={dir} mode="wait">
                <motion.img
                  key={modalIdx}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: EASE }}
                  src={images[modalIdx]}
                  alt={`${projectTitle} screenshot ${modalIdx + 1}`}
                  style={{ display: 'block', maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }}
                />
              </AnimatePresence>
            </motion.div>

            {count > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); modalGo(modalIdx - 1, -1) }}
                  aria-label="Previous image"
                  style={{
                    position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
                    width: 44, height: 44,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.8)', transition: 'background 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  <ChevronLeft size={20} strokeWidth={2} />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); modalGo(modalIdx + 1, 1) }}
                  aria-label="Next image"
                  style={{
                    position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                    width: 44, height: 44,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'rgba(255,255,255,0.8)', transition: 'background 150ms',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  <ChevronRight size={20} strokeWidth={2} />
                </button>
              </>
            )}

            <div style={{
              position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-full)', padding: '0.3rem 0.875rem',
              fontSize: '12px', color: 'rgba(255,255,255,0.6)',
            }}>
              {modalIdx + 1} / {count}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
