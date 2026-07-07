import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink, FileText, AlertCircle } from 'lucide-react'

interface CVModalProps {
  open: boolean
  onClose: () => void
  pdfUrl: string
}

const EASE = [0.16, 1, 0.3, 1] as const

export function CVModal({ open, onClose, pdfUrl }: CVModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  // Encode spaces for URL use
  const encodedUrl = pdfUrl.split('/').map(encodeURIComponent).join('/')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) setStatus('loading')
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (open) setTimeout(() => closeRef.current?.focus(), 80)
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume Viewer"
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.75rem',
          }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="cv-modal-inner"
          >
            {/* ── Toolbar ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.625rem 0.875rem',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.02)',
              flexShrink: 0,
              gap: '0.5rem',
              flexWrap: 'wrap',
            }}>
              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0, flex: '1 1 auto' }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FileText size={14} color="#60A5FA" strokeWidth={2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    Muhammad Faizan Khan
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>
                    Backend Developer · Resume
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open resume in new tab"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 34, height: 34,
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    textDecoration: 'none',
                    transition: 'color 150ms, background 150ms',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#FAFAFA'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                >
                  <ExternalLink size={14} strokeWidth={2} />
                </a>

                <a
                  href={pdfUrl}
                  download="M-Faizan-Khan-Resume.pdf"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0 0.875rem',
                    height: 34,
                    fontSize: 12, fontWeight: 600,
                    color: '#fff',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                    border: '1px solid transparent',
                    borderRadius: 8,
                    textDecoration: 'none',
                    transition: 'filter 150ms',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 12px rgba(59,130,246,0.35)',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.filter = '' }}
                >
                  <Download size={13} strokeWidth={2.5} />
                  <span className="cv-download-label">Download</span>
                </a>

                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Close CV viewer"
                  style={{
                    width: 34, height: 34,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    cursor: 'pointer', color: 'rgba(255,255,255,0.4)',
                    transition: 'background 150ms, color 150ms',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(239,68,68,0.12)'
                    e.currentTarget.style.color = '#F87171'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                  }}
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* ── PDF viewer area ── */}
            <div style={{ flex: 1, position: 'relative', minHeight: 0, background: '#1c1c1f' }}>

              {/* Loading state */}
              {status === 'loading' && (
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '0.875rem', pointerEvents: 'none',
                }}>
                  <motion.div
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: 'rgba(59,130,246,0.12)',
                      border: '1px solid rgba(59,130,246,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <FileText size={22} color="#60A5FA" strokeWidth={1.5} />
                  </motion.div>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Loading CV…</p>
                </div>
              )}

              {/* Error / fallback state */}
              {status === 'error' && (
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '1rem', padding: '2rem', textAlign: 'center',
                }}>
                  <AlertCircle size={36} color="rgba(255,255,255,0.2)" strokeWidth={1.5} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '0.375rem' }}>
                      PDF preview unavailable in this browser
                    </p>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                      Use the buttons below to open or download the CV directly.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.55rem 1.25rem', fontSize: 13, fontWeight: 500,
                        color: 'rgba(255,255,255,0.6)',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, textDecoration: 'none',
                      }}
                    >
                      <ExternalLink size={13} /> Open in New Tab
                    </a>
                    <a
                      href={pdfUrl}
                      download="M-Faizan-Khan-Resume.pdf"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        padding: '0.55rem 1.25rem', fontSize: 13, fontWeight: 600,
                        color: '#fff',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                        borderRadius: 8, textDecoration: 'none',
                        boxShadow: '0 2px 12px rgba(59,130,246,0.35)',
                      }}
                    >
                      <Download size={13} /> Download PDF
                    </a>
                  </div>
                </div>
              )}

              {/* Native PDF embed — most reliable cross-browser approach */}
              <object
                data={`${encodedUrl}#toolbar=1&navpanes=0&view=FitH`}
                type="application/pdf"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                  opacity: status === 'loaded' ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
                onLoad={() => setStatus('loaded')}
                onError={() => setStatus('error')}
              >
                {/* Fallback for browsers that don't support object/PDF */}
                <embed
                  src={encodedUrl}
                  type="application/pdf"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  onLoad={() => setStatus('loaded')}
                  onError={() => setStatus('error')}
                />
              </object>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// Injected once — responsive styles for CVModal
const _style = document.createElement('style')
_style.textContent = `
  .cv-modal-inner {
    width: 100%;
    max-width: 920px;
    height: min(92vh, 900px);
    display: flex;
    flex-direction: column;
    background: #111113;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
  }
  @media (max-width: 480px) {
    .cv-modal-inner {
      height: 96vh;
      border-radius: 14px;
    }
    .cv-download-label { display: none; }
  }
`
if (!document.head.querySelector('[data-cv-modal]')) {
  _style.setAttribute('data-cv-modal', '1')
  document.head.appendChild(_style)
}
