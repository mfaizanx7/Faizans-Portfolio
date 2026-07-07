import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { meta } from '@/data'

const ease = [0.16, 1, 0.3, 1] as const

export function NotFoundPage() {
  useEffect(() => {
    document.title = `404 — ${meta.name}`
  }, [])

  return (
    <main
      id="main-content"
      tabIndex={-1}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        style={{ textAlign: 'center', maxWidth: 400 }}
      >
        <p style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-subtle)',
          fontFamily: 'var(--font-mono)',
          marginBottom: '1.25rem',
        }}>
          404
        </p>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          color: 'var(--color-text)',
          letterSpacing: '-0.03em',
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}>
          Page not found
        </h1>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-muted)',
          lineHeight: 1.7,
          marginBottom: '2rem',
        }}>
          This page doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.55rem 1.25rem',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            color: 'var(--color-muted)',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 'var(--radius-md)',
            transition: 'color 150ms ease, background 150ms ease, border-color 150ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--color-text)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--color-muted)'
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
          }}
        >
          <FiArrowLeft size={14} aria-hidden="true" />
          Back to home
        </Link>
      </motion.div>
    </main>
  )
}
