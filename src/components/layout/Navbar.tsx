import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Menu, X, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui'
import { navItems } from '@/data'
import { useScrolled, useActiveSection } from '@/hooks'
import { useRecruiterMode } from '@/context/RecruiterModeContext'

const ease = [0.16, 1, 0.3, 1] as const

function openCVModal() {
  window.dispatchEvent(new Event('open-cv-modal'))
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname }  = useLocation()
  const scrolled      = useScrolled(24)
  const sectionIds    = navItems.map(n => n.sectionId)
  const activeSection = useActiveSection(sectionIds)
  const { isRecruiterMode, toggle } = useRecruiterMode()

  if (pathname) { /* consumed */ }

  function closeMobile() { setMobileOpen(false) }

  return (
    <>
      {/* ── Fixed header ── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: 'var(--navbar-h)',
          background: isRecruiterMode
            ? 'rgba(9,9,11,0.97)'
            : scrolled ? 'rgba(9,9,11,0.92)' : 'transparent',
          backdropFilter: scrolled || isRecruiterMode ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled || isRecruiterMode ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: isRecruiterMode
            ? '1px solid rgba(59,130,246,0.2)'
            : scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background 250ms ease, border-color 250ms ease',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {/* Blue top accent line — only in recruiter mode */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent 0%, #3b82f6 20%, #93c5fd 50%, #3b82f6 80%, transparent 100%)',
          opacity: isRecruiterMode ? 1 : 0,
          transition: 'opacity 500ms ease',
          pointerEvents: 'none',
        }} />
        <div
          className="container"
          style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* ── Brand — text only ── */}
          <Link
            to="/"
            aria-label="Muhammad Faizan Khan — home"
            style={{
              display: 'flex', alignItems: 'center',
              flexShrink: 0, textDecoration: 'none', minWidth: 0,
            }}
          >
            <span className="nav-brand" style={{
              fontSize: 'var(--text-sm)', fontWeight: 600,
              letterSpacing: '-0.025em', color: 'var(--color-text)',
              lineHeight: 1,
            }}>
              <span className="nav-brand-full">Muhammad Faizan Khan</span>
              <span className="nav-brand-short">M. Faizan</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav aria-label="Main navigation" className="desktop-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
              {navItems.map(item => {
                const isActive = activeSection === item.sectionId
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      padding: '0.4rem 0.875rem',
                      fontSize: 'var(--text-sm)', fontWeight: 500,
                      color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                      transition: 'color 150ms ease, background 150ms ease',
                      letterSpacing: '-0.01em',
                      position: 'relative',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--color-text)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = isActive ? 'var(--color-text)' : 'var(--color-muted)'
                      e.currentTarget.style.background = isActive ? 'rgba(255,255,255,0.06)' : 'transparent'
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span style={{
                        position: 'absolute', bottom: 2, left: '50%',
                        transform: 'translateX(-50%)',
                        width: 4, height: 4, borderRadius: '50%',
                        background: 'var(--color-accent)',
                        display: 'block',
                      }} />
                    )}
                  </a>
                )
              })}
            </div>
          </nav>

          {/* ── Desktop right — Recruiter toggle + Resume button ── */}
          <div className="desktop-nav" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={toggle}
              title={isRecruiterMode ? 'Back to normal view' : 'Switch to Recruiter Mode'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                height: 32, padding: '0 0.875rem',
                fontSize: 12, fontWeight: 700,
                color: isRecruiterMode ? '#93c5fd' : 'rgba(255,255,255,0.7)',
                background: isRecruiterMode
                  ? 'rgba(59,130,246,0.15)'
                  : 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)',
                border: `1px solid ${isRecruiterMode ? 'rgba(59,130,246,0.55)' : 'rgba(59,130,246,0.25)'}`,
                borderRadius: 8, cursor: 'pointer',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
                transition: 'all 200ms ease',
                whiteSpace: 'nowrap',
                boxShadow: isRecruiterMode
                  ? '0 0 16px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.06)'
                  : '0 0 8px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.04)',
                textTransform: 'uppercase',
              }}
              onMouseEnter={e => {
                if (isRecruiterMode) {
                  e.currentTarget.style.color = '#fff'
                  e.currentTarget.style.background = 'rgba(59,130,246,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'
                  e.currentTarget.style.boxShadow = 'none'
                } else {
                  e.currentTarget.style.color = '#93c5fd'
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'
                  e.currentTarget.style.background = 'rgba(59,130,246,0.12)'
                  e.currentTarget.style.boxShadow = '0 0 14px rgba(59,130,246,0.25)'
                }
              }}
              onMouseLeave={e => {
                if (isRecruiterMode) {
                  e.currentTarget.style.color = '#93c5fd'
                  e.currentTarget.style.background = 'rgba(59,130,246,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.55)'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(59,130,246,0.3), inset 0 1px 0 rgba(255,255,255,0.06)'
                } else {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.08) 100%)'
                  e.currentTarget.style.boxShadow = '0 0 8px rgba(59,130,246,0.1), inset 0 1px 0 rgba(255,255,255,0.04)'
                }
              }}
            >
              <Briefcase size={11} strokeWidth={2.5} />
              {isRecruiterMode ? '← EXIT' : '[ RECRUITER ]'}
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={openCVModal}
              aria-label="View Resume"
            >
              <FileText size={13} strokeWidth={2} />
              View Resume
            </Button>
          </div>

          {/* ── Mobile right — recruiter + resume + burger ── */}
          <div className="mobile-right" style={{ display: 'none', alignItems: 'center', gap: '0.4rem' }}>
            {/* Recruiter Mode pill */}
            <button
              onClick={toggle}
              title={isRecruiterMode ? 'Back to normal view' : 'Switch to Recruiter Mode'}
              className="mobile-recruiter-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                height: 30, padding: '0 0.6rem',
                fontSize: 11, fontWeight: 700,
                color: isRecruiterMode ? '#93c5fd' : 'rgba(255,255,255,0.5)',
                background: isRecruiterMode ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isRecruiterMode ? 'rgba(59,130,246,0.55)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 8, cursor: 'pointer',
                fontFamily: 'inherit', letterSpacing: '0.01em',
                transition: 'all 200ms ease',
                whiteSpace: 'nowrap',
                boxShadow: isRecruiterMode ? '0 0 10px rgba(59,130,246,0.25)' : 'none',
              }}
            >
              <Briefcase size={10} strokeWidth={2.5} />
              {isRecruiterMode ? '← Exit' : 'Recruiter'}
            </button>
            {/* View Resume */}
            <button
              onClick={openCVModal}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                height: 30, padding: '0 0.6rem',
                fontSize: 11, fontWeight: 500,
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              <FileText size={10} strokeWidth={2} /> Resume
            </button>
            {/* Burger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{
                width: 34, height: 34,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-muted)',
                background: 'transparent',
                border: 'none', cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -12, scaleY: 0.96 }}
            transition={{ duration: 0.22, ease }}
            style={{
              position: 'fixed',
              top: 'var(--navbar-h)', left: 0, right: 0,
              zIndex: 49,
              background: 'rgba(9,9,11,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '0.75rem 0 1.5rem',
              transformOrigin: 'top',
            }}
          >
            <div className="container">
              <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column' }}>
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.sectionId
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18, ease }}
                      aria-current={isActive ? 'page' : undefined}
                      style={{
                        padding: '0.875rem 0',
                        fontSize: 'var(--text-lg)', fontWeight: 500,
                        color: isActive ? 'var(--color-text)' : 'var(--color-muted)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        transition: 'color 150ms ease',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                      onMouseLeave={e => (e.currentTarget.style.color = isActive ? 'var(--color-text)' : 'var(--color-muted)')}
                    >
                      {item.label}
                      {isActive && (
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                      )}
                    </motion.a>
                  )
                })}
                <div style={{ marginTop: '1.25rem' }}>
                  <Button
                    variant="secondary"
                    onClick={() => { openCVModal(); closeMobile() }}
                  >
                    <FileText size={14} strokeWidth={2} />
                    View Resume
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav   { display: none !important; }
          .mobile-right  { display: flex !important; }
        }
        .nav-brand-short { display: none; }
        @media (max-width: 400px) {
          .nav-brand-full  { display: none; }
          .nav-brand-short { display: inline; }
        }
        @media (max-width: 360px) {
          .mobile-recruiter-btn { display: none !important; }
        }
      `}</style>
    </>
  )
}
