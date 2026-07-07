import { useEffect } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch } from 'lucide-react'
import { ImageGallery } from '@/components/ui'
import { allProjects, meta } from '@/data'
import { useReducedMotion } from '@/hooks'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Section wrapper ─────────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="cs-section-grid" style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
      paddingBlock: '2.5rem',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="cs-label">
        <p style={{
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: 'var(--color-accent)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          {title}
        </p>
      </div>
      <div>{children}</div>
    </div>
  )
}

/* ── Prose ───────────────────────────────────────────────────── */
function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 'var(--text-base)',
      lineHeight: 1.8,
      color: 'var(--color-muted)',
      letterSpacing: '-0.01em',
    }}>
      {children}
    </p>
  )
}

/* ── Challenge card ──────────────────────────────────────────── */
function ChallengeCard({ title, description, solution }: {
  title: string
  description: string
  solution: string
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 'var(--radius-xl)',
      padding: '1.5rem',
    }}>
      <h3 style={{
        fontSize: 'var(--text-base)', fontWeight: 600,
        color: 'var(--color-text)', letterSpacing: '-0.02em',
        lineHeight: 1.35, marginBottom: '0.875rem',
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: 'var(--text-sm)', lineHeight: 1.75,
        color: 'var(--color-muted)', marginBottom: '1.125rem',
      }}>
        {description}
      </p>

      <div style={{
        borderLeft: '2px solid rgba(59,130,246,0.35)',
        paddingLeft: '1rem',
        background: 'rgba(59,130,246,0.03)',
        borderRadius: '0 var(--radius-md) var(--radius-md) 0',
        padding: '0.875rem 1rem',
      }}>
        <p style={{
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: 'var(--color-accent)', marginBottom: '0.4rem',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          How I fixed it
        </p>
        <p style={{
          fontSize: 'var(--text-sm)', lineHeight: 1.75,
          color: 'var(--color-muted)',
        }}>
          {solution}
        </p>
      </div>
    </div>
  )
}

/* ── Main page ───────────────────────────────────────────────── */
export function CaseStudyPage() {
  const { slug }  = useParams<{ slug: string }>()
  const reduced   = useReducedMotion()
  const navigate  = useNavigate()
  const index     = allProjects.findIndex(p => p.slug === slug)
  const project   = allProjects[index]
  const prev      = index > 0 ? allProjects[index - 1] : null
  const next      = index < allProjects.length - 1 ? allProjects[index + 1] : null

  useEffect(() => {
    if (project) document.title = `${project.title} — ${meta.name}`
  }, [project])

  if (!project) return <Navigate to="/404" replace />

  return (
    <motion.main
      id="main-content"
      tabIndex={-1}
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.01 : 0.38, ease: EASE }}
      style={{ paddingTop: '5rem', paddingBottom: '6rem' }}
    >
      <div className="container" style={{ maxWidth: 880 }}>

        {/* ── Back ── */}
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'work' } })}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            fontSize: 'var(--text-sm)', color: 'var(--color-subtle)',
            marginBottom: '2.5rem', paddingBlock: '0.375rem',
            transition: 'color 150ms',
            borderRadius: 'var(--radius-md)',
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-muted)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-subtle)')}
        >
          <ArrowLeft size={14} aria-hidden /> Back to projects
        </button>

        {/* ── Hero ── */}
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{
            fontSize: 'var(--text-xs)', fontWeight: 600,
            color: 'var(--color-accent)', letterSpacing: '0.08em',
            textTransform: 'uppercase', marginBottom: '0.875rem',
          }}>
            {project.category}
          </p>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 700, letterSpacing: '-0.04em',
            color: 'var(--color-text)', lineHeight: 1.08,
            marginBottom: '1rem',
          }}>
            {project.title}
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.7, color: 'var(--color-muted)',
            maxWidth: 660, marginBottom: '0.5rem',
            letterSpacing: '-0.01em',
          }}>
            {project.tagline}
          </p>

          <p style={{
            fontSize: 'var(--text-xs)', color: 'var(--color-subtle)',
            letterSpacing: '0.01em', marginBottom: '1.75rem',
          }}>
            {project.context}
          </p>

          {/* Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '1.75rem' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.5rem 1.125rem',
                  fontSize: 'var(--text-sm)', fontWeight: 500,
                  color: 'var(--color-muted)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'color 150ms, background 150ms, border-color 150ms',
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
                <GitBranch size={14} strokeWidth={2} /> View on GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.5rem 1.125rem',
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: '#fff',
                  background: 'var(--color-accent)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'filter 150ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = '')}
              >
                <ExternalLink size={14} strokeWidth={2} /> Live Site
              </a>
            )}
          </div>

          {/* Stack chips */}
          <div style={{
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          }}>
            {project.stack.map(tech => (
              <span key={tech} style={{
                padding: '0.3rem 0.75rem',
                fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                color: 'var(--color-muted)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: 'var(--radius-md)',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Gallery ── */}
        {project.images.length > 0 && (
          <div style={{ marginBottom: '0.5rem' }}>
            <ImageGallery images={project.images} projectTitle={project.title} />
          </div>
        )}

        {/* ── Overview ── */}
        <Section title="Overview">
          <Prose>{project.description}</Prose>
        </Section>

        {/* ── What I Did ── */}
        <Section title="What I Did">
          <Prose>{project.myRole}</Prose>
        </Section>

        {/* ── Challenge ── */}
        {project.challenges.length > 0 && (
          <Section title="Key Challenge">
            <ChallengeCard
              title={project.challenges[0].title}
              description={project.challenges[0].description}
              solution={project.challenges[0].solution}
            />
          </Section>
        )}

        {/* ── Takeaway ── */}
        {project.takeaways && (
          <Section title="Takeaway">
            <Prose>{project.takeaways}</Prose>
          </Section>
        )}

        {/* ── Prev / Next ── */}
        {(prev || next) && (
          <div className="cs-prevnext" style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '2.5rem',
            marginTop: '0.5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {prev ? (
              <Link
                to={`/work/${prev.slug}`}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-xl)',
                  transition: 'border-color 200ms, background 200ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                }}
              >
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  fontSize: 'var(--text-xs)', color: 'var(--color-subtle)',
                }}>
                  <ArrowLeft size={12} /> Previous
                </span>
                <span style={{
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: 'var(--color-muted)', letterSpacing: '-0.015em',
                }}>
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={`/work/${next.slug}`}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  padding: '1.25rem',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-xl)',
                  textAlign: 'right',
                  transition: 'border-color 200ms, background 200ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                }}
              >
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.375rem',
                  fontSize: 'var(--text-xs)', color: 'var(--color-subtle)',
                }}>
                  Next <ArrowRight size={12} />
                </span>
                <span style={{
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: 'var(--color-muted)', letterSpacing: '-0.015em',
                }}>
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        )}

      </div>

      <style>{`
        @media (min-width: 768px) {
          .cs-section-grid {
            grid-template-columns: 148px 1fr !important;
            gap: 3rem !important;
          }
          .cs-label {
            position: sticky;
            top: calc(var(--navbar-h) + 1.5rem);
            align-self: start;
          }
        }
        @media (max-width: 480px) {
          .cs-prevnext {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.main>
  )
}
