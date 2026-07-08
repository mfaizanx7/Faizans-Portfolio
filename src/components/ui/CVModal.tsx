import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ExternalLink, FileText } from 'lucide-react'

interface CVModalProps {
  open: boolean
  onClose: () => void
  pdfUrl: string
}

const EASE = [0.16, 1, 0.3, 1] as const

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

async function forceDownload(url: string, filename: string) {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
    a.click()
    URL.revokeObjectURL(a.href)
  } catch {
    // fallback: direct link
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.target = '_blank'
    a.click()
  }
}

export function CVModal({ open, onClose, pdfUrl }: CVModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [loaded, setLoaded] = useState(false)
  const isMobile = useIsMobile()
  const encodedUrl = pdfUrl.split('/').map(encodeURIComponent).join('/')

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) setLoaded(false)
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
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '0' : '1rem',
          }}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{
              width: '100%',
              maxWidth: isMobile ? '100%' : 920,
              height: isMobile ? '100%' : 'min(92vh, 900px)',
              display: 'flex',
              flexDirection: 'column',
              background: '#111113',
              border: isMobile ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: isMobile ? 0 : 20,
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
            }}
          >
            {/* ── Toolbar ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.02)',
              flexShrink: 0,
              gap: '0.5rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 0 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: 'rgba(59,130,246,0.12)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FileText size={15} color="#60A5FA" strokeWidth={2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#FAFAFA', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    Muhammad Faizan Khan
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>
                    Full-Stack Developer · Resume
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                {!isMobile && (
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open in new tab"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 34, height: 34,
                      color: 'rgba(255,255,255,0.5)',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 8, textDecoration: 'none',
                      transition: 'color 150ms, background 150ms',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#FAFAFA'; e.currentTarget.style.background = 'rgba(255,255,255,0.09)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  >
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                )}

                <button
                  onClick={() => forceDownload(pdfUrl, 'M-Faizan-Khan-Resume.pdf')}
                  aria-label="Download PDF"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0 0.875rem', height: 34,
                    fontSize: 12, fontWeight: 600, color: '#fff',
                    background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                    borderRadius: 8, border: 'none', cursor: 'pointer',
                    transition: 'filter 150ms',
                    boxShadow: '0 2px 12px rgba(59,130,246,0.35)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.filter = '' }}
                >
                  <Download size={13} strokeWidth={2.5} />
                  PDF
                </button>

                <button
                  onClick={() => forceDownload('/resume/M Faizan Khan.docx', 'M-Faizan-Khan-Resume.docx')}
                  aria-label="Download DOCX"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    padding: '0 0.875rem', height: 34,
                    fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 8, cursor: 'pointer',
                    transition: 'background 150ms, color 150ms',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                >
                  <Download size={13} strokeWidth={2.5} />
                  DOCX
                </button>

                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Close CV viewer"
                  style={{
                    width: 34, height: 34,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8, cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)',
                    transition: 'background 150ms, color 150ms',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#F87171' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                >
                  <X size={15} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* ── Content area ── */}
            {isMobile ? (
              /* Mobile: no PDF embed — just clean action screen */
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '2rem', padding: '2rem',
                background: '#111113',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 18,
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FileText size={32} color="#60A5FA" strokeWidth={1.5} />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#FAFAFA', letterSpacing: '-0.03em', marginBottom: '0.5rem' }}>
                    Muhammad Faizan Khan
                  </p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>
                    Full-Stack Web Developer · Resume
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: 280 }}>
                  <button
                    onClick={() => forceDownload(pdfUrl, 'M-Faizan-Khan-Resume.pdf')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.875rem 1.5rem', width: '100%',
                      fontSize: 15, fontWeight: 600, color: '#fff',
                      background: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
                      borderRadius: 12, border: 'none', cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
                    }}
                  >
                    <Download size={16} strokeWidth={2.5} />
                    Download PDF
                  </button>

                  <button
                    onClick={() => forceDownload('/resume/M Faizan Khan.docx', 'M-Faizan-Khan-Resume.docx')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.875rem 1.5rem', width: '100%',
                      fontSize: 15, fontWeight: 600,
                      color: 'rgba(255,255,255,0.7)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 12, cursor: 'pointer',
                    }}
                  >
                    <Download size={16} strokeWidth={2.5} />
                    Download DOCX
                  </button>

                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.875rem 1.5rem',
                      fontSize: 15, fontWeight: 500,
                      color: 'rgba(255,255,255,0.6)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: 12, textDecoration: 'none',
                    }}
                  >
                    <ExternalLink size={16} strokeWidth={2} />
                    Open in Browser
                  </a>
                </div>

                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                  PDF viewers work best on desktop
                </p>
              </div>
            ) : (
              /* Desktop: PDF embed */
              <div style={{ flex: 1, position: 'relative', minHeight: 0, background: '#1c1c1f' }}>
                {!loaded && (
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
                <iframe
                  src={`${encodedUrl}#toolbar=1&navpanes=0&view=FitH`}
                  title="Resume PDF"
                  style={{
                    width: '100%', height: '100%',
                    border: 'none', display: 'block',
                    opacity: loaded ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  onLoad={() => setLoaded(true)}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
