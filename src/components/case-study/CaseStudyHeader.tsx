import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import type { Project } from '@/types'

const ease = [0.16, 1, 0.3, 1] as const

interface CaseStudyHeaderProps {
  project: Project
}

export function CaseStudyHeader({ project }: CaseStudyHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      style={{ marginBottom: '3.5rem' }}
    >
      {/* Number */}
      <p style={{
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--color-subtle)',
        marginBottom: '1rem',
        fontFamily: 'var(--font-mono)',
      }}>
        Case Study · {project.number}
      </p>

      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
        {project.logoUrl && (
          <img
            src={project.logoUrl}
            alt=""
            aria-hidden
            style={{ height: 28, width: 'auto', objectFit: 'contain', flexShrink: 0, opacity: 0.9 }}
          />
        )}
        <h1 style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 2.75rem)',
          fontWeight: 700,
          color: 'var(--color-text)',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
        }}>
          {project.title}
        </h1>
      </div>

      {/* Tagline */}
      <p style={{
        fontSize: 'var(--text-base)',
        color: 'var(--color-muted)',
        marginBottom: '0.625rem',
        maxWidth: 580,
        lineHeight: 1.7,
        letterSpacing: '-0.01em',
      }}>
        {project.tagline}
      </p>

      {/* Context */}
      <p style={{
        fontSize: 'var(--text-xs)',
        color: 'var(--color-subtle)',
        marginBottom: '1.75rem',
        letterSpacing: '0.01em',
      }}>
        {project.context}
      </p>

      {/* Links */}
      {(project.githubUrl || project.liveUrl) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.625rem', marginBottom: '1.75rem' }}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.45rem 1rem',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-muted)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 'var(--radius-md)',
                transition: 'color 150ms ease, border-color 150ms ease, background 150ms ease',
                background: 'rgba(255,255,255,0.03)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-text)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--color-muted)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              GitHub <FiArrowUpRight size={12} aria-hidden="true" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.45rem 1rem',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-muted)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 'var(--radius-md)',
                transition: 'color 150ms ease, border-color 150ms ease, background 150ms ease',
                background: 'rgba(255,255,255,0.03)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--color-text)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--color-muted)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              Live Site <FiArrowUpRight size={12} aria-hidden="true" />
            </a>
          )}
        </div>
      )}

      {/* Stack */}
      <div style={{
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-subtle)',
          letterSpacing: '0.02em',
        }}>
          {project.stack.join(' · ')}
        </p>
      </div>
    </motion.div>
  )
}
