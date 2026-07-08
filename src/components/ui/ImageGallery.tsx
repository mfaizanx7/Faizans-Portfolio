import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  projectTitle: string
  initialIndex?: number
  onClose?: () => void
}

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Fullscreen modal — used both standalone and inline ── */
export function GalleryModal({ images, projectTitle, startIdx, onClose }: {
  images: string[]
  projectTitle: string
  startIdx: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(startIdx)
  const [dir, setDir] = useState(1)
  const count = images.length
  const closeRef = useRef<HTMLButtonElement>(null)

  const go = useCallback((next: number, d: number) => {
    setDir(d)
    setIdx(((next % count) + count) % count)
  }, [count])

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(idx + 1, 1)
      if (e.key === 'ArrowLeft')  go(idx - 1, -1)
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [idx, go, onClose])

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 50 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -50 }),
  }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} screenshot viewer`}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Close */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close image viewer"
        style={{
          position: 'absolute', top: '1rem', right: '1rem',
          width: 44, height: 44,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.14)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'rgba(255,255,255,0.75)',
          zIndex: 1, flexShrink: 0,
        }}
      >
        <X size={18} strokeWidth={2} />
      </button>

      {/* Image */}
      <motion.div
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: EASE }}
        style={{
          maxWidth: '90vw',
          maxHeight: '84vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence custom={dir} mode="wait">
          <motion.img
            key={idx}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: EASE }}
            src={images[idx]}
            alt={`${projectTitle} screenshot ${idx + 1}`}
            style={{
              display: 'block',
              maxWidth: '90vw',
              maxHeight: '84vh',
              width: 'auto',
              height: 'auto',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
            }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Prev / Next */}
      {count > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); go(idx - 1, -1) }}
            aria-label="Previous image"
            style={{
              position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, flexShrink: 0,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
            }}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); go(idx + 1, 1) }}
            aria-label="Next image"
            style={{
              position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
              width: 44, height: 44, flexShrink: 0,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
            }}
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </>
      )}

      {/* Counter */}
      <div style={{
        position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
        borderRadius: 999, padding: '0.3rem 0.875rem',
        fontSize: 12, color: 'rgba(255,255,255,0.55)',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        {idx + 1} / {count}
      </div>
    </motion.div>,
    document.body
  )
}

/* ── Main export ── */
export function ImageGallery({ images, projectTitle, initialIndex, onClose }: ImageGalleryProps) {
  const standalone = initialIndex !== undefined && onClose !== undefined

  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalStart, setModalStart] = useState(0)
  const count = images.length

  const go = useCallback((next: number, d: number) => {
    setDir(d)
    setActive(((next % count) + count) % count)
  }, [count])

  function openModal(idx: number) { setModalStart(idx); setModalOpen(true) }
  function closeModal() { setModalOpen(false) }

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 16 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -16 }),
  }

  if (count === 0) return null

  /* Standalone mode — just render the modal directly */
  if (standalone) {
    return (
      <AnimatePresence>
        <GalleryModal
          images={images}
          projectTitle={projectTitle}
          startIdx={initialIndex}
          onClose={onClose}
        />
      </AnimatePresence>
    )
  }

  return (
    <>
      {/* Inline strip */}
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
              variants={slideVariants}
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
                  width: 32, height: 32,
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
                }}
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                onClick={e => { e.stopPropagation(); go(active + 1, 1) }}
                aria-label="Next screenshot"
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  width: 32, height: 32,
                  background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
                }}
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

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <GalleryModal
            images={images}
            projectTitle={projectTitle}
            startIdx={modalStart}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </>
  )
}
