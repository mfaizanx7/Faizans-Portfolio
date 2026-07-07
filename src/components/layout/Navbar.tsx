import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui'
import { navItems } from '@/data'
import { useScrolled, useActiveSection } from '@/hooks'

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

  if (pathname) { /* consumed */ }

  function closeMobile() { setMobileOpen(false) }

  return (
    <>
      {/* ── Fixed header ── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: 'var(--navbar-h)',
          background: scrolled ? 'rgba(9,9,11,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background 250ms ease, border-color 250ms ease',
        }}
      >
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

          {/* ── Desktop right — Resume button ── */}
          <div className="desktop-nav" style={{ flexShrink: 0 }}>
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

          {/* ── Mobile toggle ── */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              display: 'none',
              width: 36, height: 36,
              alignItems: 'center', justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-muted)',
              background: 'transparent',
              border: 'none', cursor: 'pointer',
              transition: 'color 150ms ease, background 150ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--color-text)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--color-muted)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {mobileOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
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
          .mobile-toggle { display: flex !important; }
        }
        .nav-brand-short { display: none; }
        @media (max-width: 400px) {
          .nav-brand-full  { display: none; }
          .nav-brand-short { display: inline; }
        }
      `}</style>
    </>
  )
}
