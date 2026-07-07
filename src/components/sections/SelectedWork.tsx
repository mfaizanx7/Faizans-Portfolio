import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiChevronDown, FiFileText } from 'react-icons/fi'
import { FadeIn } from '@/components/ui'
import { allProjects } from '@/data'
import type { Project } from '@/types'

const INITIAL_SHOW = 3

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeIn delay={index * 0.06} direction="up" style={{ height: '100%' }}>
      <motion.div
        whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(59,130,246,0.16)' }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 'var(--radius-2xl)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'default',
        }}
      >
        {/* Number + Title */}
        <div style={{ marginBottom: '0.75rem' }}>
          <span style={{
            fontSize: '11px', fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)', opacity: 0.5,
            display: 'block', marginBottom: '0.5rem',
            letterSpacing: '0.06em',
          }}>
            {project.number}
          </span>
          <h3 style={{
            fontSize: 'var(--text-lg)', fontWeight: 600,
            color: 'var(--color-text)', letterSpacing: '-0.025em',
            lineHeight: 1.25,
          }}>
            {project.title}
          </h3>
        </div>

        {/* Description — 2-line clamp */}
        <p style={{
          fontSize: 'var(--text-sm)', lineHeight: 1.65,
          color: 'var(--color-muted)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: 'calc(0.875rem * 1.65 * 2)',
          marginBottom: '1.25rem',
        }}>
          {project.tagline}
        </p>

        {/* Stack chips */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.375rem',
          marginBottom: '1.25rem',
          minHeight: '1.625rem',
        }}>
          {project.stack.slice(0, 4).map(tech => (
            <span key={tech} style={{
              padding: '0.2rem 0.625rem',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-subtle)',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius-md)',
              whiteSpace: 'nowrap',
              letterSpacing: '0.01em',
            }}>
              {tech}
            </span>
          ))}
        </div>

        <div style={{ flexGrow: 1 }} />

        {/* Actions */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <CardAction href={`/work/${project.slug}`} internal>
            <FiFileText size={12} /> Case Study
          </CardAction>
          {project.githubUrl && (
            <CardAction href={project.githubUrl} external>
              <FiGithub size={12} /> GitHub
            </CardAction>
          )}
          {project.liveUrl && (
            <CardAction href={project.liveUrl} external>
              <FiExternalLink size={12} /> Live Demo
            </CardAction>
          )}
        </div>
      </motion.div>
    </FadeIn>
  )
}

function CardAction({ href, external, internal, children }: {
  href: string
  external?: boolean
  internal?: boolean
  children: React.ReactNode
}) {
  const shared = {
    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
    padding: '0.35rem 0.75rem',
    fontSize: '11px', fontWeight: 500,
    color: 'var(--color-subtle)' as const,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 'var(--radius-md)',
    transition: 'color 150ms, background 150ms, border-color 150ms',
    textDecoration: 'none' as const,
    letterSpacing: '0.01em',
  }

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.color = 'var(--color-text)'
    el.style.background = 'rgba(255,255,255,0.08)'
    el.style.borderColor = 'rgba(255,255,255,0.14)'
  }
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    el.style.color = 'var(--color-subtle)'
    el.style.background = 'rgba(255,255,255,0.04)'
    el.style.borderColor = 'rgba(255,255,255,0.07)'
  }

  if (internal) {
    return (
      <Link
        to={href}
        style={shared}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {children}
      </Link>
    )
  }

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      style={shared}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  )
}

export function SelectedWork() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? allProjects : allProjects.slice(0, INITIAL_SHOW)
  const hidden  = allProjects.length - INITIAL_SHOW

  return (
    <section id="work" aria-labelledby="work-heading" style={{
      paddingBlock: '6rem',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="container">
        <FadeIn>
          <div style={{ marginBottom: '3rem' }}>
            <p style={{
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-accent)', marginBottom: '1rem',
            }}>
              Projects
            </p>
            <h2 id="work-heading" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700, letterSpacing: '-0.04em',
              color: 'var(--color-text)', lineHeight: 1.1,
            }}>
              Things I've built
            </h2>
          </div>
        </FadeIn>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: '1rem',
          alignItems: 'stretch',
        }}>
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <AnimatePresence>
          {!showAll && hidden > 0 && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}
            >
              <motion.button
                onClick={() => setShowAll(true)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.5rem',
                  fontSize: 'var(--text-sm)', fontWeight: 500,
                  color: 'var(--color-muted)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  transition: 'background 150ms, color 150ms, border-color 150ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = 'var(--color-text)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color = 'var(--color-muted)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                Show {hidden} more projects <FiChevronDown size={14} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
