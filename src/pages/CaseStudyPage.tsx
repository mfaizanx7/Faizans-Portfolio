import { useEffect, useState, useCallback } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, GitBranch, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { GalleryModal } from '@/components/ui/ImageGallery'
import { allProjects, meta } from '@/data'
import { useReducedMotion } from '@/hooks'

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Inline gallery with thumbnails ─────────────────────────── */
function CaseGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive]       = useState(0)
  const [dir, setDir]             = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const count = images.length

  const go = useCallback((next: number, d: number) => {
    setDir(d)
    setActive(((next % count) + count) % count)
  }, [count])

  const slideVariants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 14 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -14 }),
  }

  if (count === 0) return null

  return (
    <>
      <div style={{ marginBottom: '0.75rem' }}>
        {/* Main image */}
        <div
          role="button"
          tabIndex={0}
          aria-label={`Enlarge screenshot ${active + 1}`}
          onClick={() => setModalOpen(true)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setModalOpen(true) }}
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            background: '#0a0a0c',
            border: '1px solid rgba(255,255,255,0.07)',
            aspectRatio: '16/9',
            cursor: 'zoom-in',
          }}
        >
          <AnimatePresence custom={dir} mode="wait">
            <motion.img
              key={active}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.26, ease: EASE }}
              src={images[active]}
              alt={`${title} screenshot ${active + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </AnimatePresence>

          {/* Zoom hint */}
          <div style={{
            position: 'absolute', bottom: '0.75rem', right: '0.75rem',
            background: 'rgba(0,0,0,0.65)',
            borderRadius: 'var(--radius-md)', padding: '0.3rem 0.55rem',
            display: 'flex', alignItems: 'center', gap: '0.3rem', pointerEvents: 'none',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <ZoomIn size={11} color="rgba(255,255,255,0.55)" />
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{active + 1} / {count}</span>
          </div>

          {/* Prev / Next */}
          {count > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); go(active - 1, -1) }}
                aria-label="Previous screenshot"
                style={{
                  position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  width: 34, height: 34,
                  background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
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
                  width: 34, height: 34,
                  background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
                }}
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {count > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.625rem', overflowX: 'auto', paddingBottom: '2px' }}>
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > active ? 1 : -1); setActive(i) }}
                aria-label={`View screenshot ${i + 1}`}
                aria-pressed={i === active}
                style={{
                  flexShrink: 0, width: 80, height: 52,
                  borderRadius: 'var(--radius-md)', overflow: 'hidden',
                  border: i === active ? '2px solid var(--color-accent)' : '2px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer', padding: 0,
                  transition: 'border-color 150ms, opacity 150ms',
                  background: 'rgba(255,255,255,0.03)',
                  opacity: i === active ? 1 : 0.55,
                }}
              >
                <img
                  src={src}
                  alt={`${title} thumbnail ${i + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <GalleryModal
            images={images}
            projectTitle={title}
            startIdx={active}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Section ─────────────────────────────────────────────────── */
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="cs-section-grid" style={{
      paddingBlock: '2.5rem',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="cs-label">
        <p style={{
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: 'var(--color-accent)',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          {label}
        </p>
      </div>
      <div className="cs-content">{children}</div>
    </div>
  )
}

/* ── Prose ───────────────────────────────────────────────────── */
function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: 'var(--text-base)', lineHeight: 1.8,
      color: 'var(--color-muted)', letterSpacing: '-0.01em',
    }}>
      {children}
    </p>
  )
}

/* ── Bullet list ─────────────────────────────────────────────── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', gap: '0.75rem', alignItems: 'baseline',
          fontSize: 'var(--text-base)', lineHeight: 1.7,
          color: 'var(--color-muted)', letterSpacing: '-0.01em',
        }}>
          <span style={{ color: 'var(--color-accent)', flexShrink: 0, fontSize: 10, marginTop: 2 }}>▸</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

/* ── Quick fact card ─────────────────────────────────────────── */
function FactCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem 1.125rem',
      display: 'flex', flexDirection: 'column', gap: '0.3rem',
    }}>
      <span style={{
        fontSize: 'var(--text-xs)', fontWeight: 600,
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.07em', textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 'var(--text-sm)', fontWeight: 500,
        color: 'var(--color-text)', letterSpacing: '-0.01em',
        lineHeight: 1.4,
      }}>
        {value}
      </span>
    </div>
  )
}

/* ── Challenge card ──────────────────────────────────────────── */
function ChallengeCard({ title, description, solution }: {
  title: string; description: string; solution: string
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '1.75rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <p style={{
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: 'rgba(239,68,68,0.7)',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          The Challenge
        </p>
        <h3 style={{
          fontSize: 'var(--text-base)', fontWeight: 600,
          color: 'var(--color-text)', letterSpacing: '-0.02em',
          lineHeight: 1.35, marginBottom: '0.75rem',
        }}>
          {title}
        </h3>
        <p style={{
          fontSize: 'var(--text-sm)', lineHeight: 1.75,
          color: 'var(--color-muted)',
        }}>
          {description}
        </p>
      </div>
      <div style={{ padding: '1.75rem 1.75rem', background: 'rgba(59,130,246,0.03)' }}>
        <p style={{
          fontSize: 'var(--text-xs)', fontWeight: 600,
          color: 'var(--color-accent)',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          How I Solved It
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

/* ── Engineering highlights ─────────────────────────────────── */
function EngineeringHighlights({ items }: { items: { label: string; detail: string }[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: 'rgba(59,130,246,0.06)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: 'var(--radius-lg)',
          padding: '0.875rem 1.125rem',
          minWidth: 140, flex: '1 1 140px',
        }}>
          <p style={{
            fontSize: 'var(--text-xs)', fontWeight: 600,
            color: 'var(--color-accent)', letterSpacing: '0.06em',
            textTransform: 'uppercase', marginBottom: '0.3rem',
          }}>
            {item.label}
          </p>
          <p style={{
            fontSize: 'var(--text-sm)', fontWeight: 500,
            color: 'var(--color-text)', letterSpacing: '-0.01em',
          }}>
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ── Architecture flow ───────────────────────────────────────── */
function ArchFlow({ layers }: { layers: string[] }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 0,
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
    }}>
      {layers.map((layer, i) => (
        <div key={i}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.75rem 1.25rem',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
              background: 'var(--color-accent)',
              boxShadow: '0 0 6px rgba(59,130,246,0.5)',
            }} />
            <span style={{
              fontSize: 'var(--text-sm)', fontFamily: 'var(--font-mono)',
              color: 'var(--color-muted)', letterSpacing: '0.01em',
            }}>
              {layer}
            </span>
          </div>
          {i < layers.length - 1 && (
            <div style={{
              marginLeft: '1.25rem', paddingLeft: 'calc(0.75rem + 3px)',
              borderLeft: '1px dashed rgba(59,130,246,0.2)',
              height: 16,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Stack chip ──────────────────────────────────────────────── */
function StackChip({ label }: { label: string }) {
  return (
    <span style={{
      padding: '0.3rem 0.75rem',
      fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
      color: 'var(--color-muted)',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.09)',
      borderRadius: 'var(--radius-md)',
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
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

  const quickFacts = [
    { label: 'Project Type',  value: project.category },
    { label: 'My Role',       value: 'Full-Stack Developer' },
    { label: 'Stack',         value: project.stack.slice(0, 3).join(' · ') },
    { label: 'Status',        value: project.status },
  ]

  return (
    <motion.main
      id="main-content"
      tabIndex={-1}
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.01 : 0.38, ease: EASE }}
      style={{ paddingTop: '5rem', paddingBottom: '6rem' }}
    >
      <div className="container" style={{ maxWidth: 860 }}>

        {/* ── Back ── */}
        <button
          onClick={() => navigate('/', { state: { scrollTo: 'work' } })}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            fontSize: 'var(--text-sm)', color: 'var(--color-subtle)',
            marginBottom: '2.75rem', paddingBlock: '0.375rem',
            transition: 'color 150ms',
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-muted)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-subtle)')}
        >
          <ArrowLeft size={14} aria-hidden /> Back to Projects
        </button>

        {/* ── Hero ── */}
        <div style={{ marginBottom: '2.75rem' }}>

          {/* Category + badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              color: 'var(--color-accent)', letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              {project.category}
            </p>
            {project.slug === 'pompak-financial-literacy' && (
              <span style={{
                fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: '#34D399',
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.2)',
                borderRadius: 4, padding: '2px 7px',
              }}>
                National Platform
              </span>
            )}
            {project.status === 'Production' && (
              <span style={{
                fontSize: '9px', fontWeight: 600,
                letterSpacing: '0.07em', textTransform: 'uppercase',
                color: '#60A5FA',
                background: 'rgba(96,165,250,0.08)',
                border: '1px solid rgba(96,165,250,0.2)',
                borderRadius: 4, padding: '2px 7px',
              }}>
                Live
              </span>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 700, letterSpacing: '-0.04em',
            color: 'var(--color-text)', lineHeight: 1.08,
            marginBottom: '1.125rem',
          }}>
            {project.title}
          </h1>

          {/* Summary */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            lineHeight: 1.7, color: 'var(--color-muted)',
            maxWidth: 640, marginBottom: '1.75rem',
            letterSpacing: '-0.01em',
          }}>
            {project.tagline}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '2rem' }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.5rem 1.125rem',
                  fontSize: 'var(--text-sm)', fontWeight: 600,
                  color: '#fff', background: 'var(--color-accent)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'filter 150ms',
                  boxShadow: '0 2px 12px rgba(59,130,246,0.3)',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = '')}
              >
                <ExternalLink size={13} strokeWidth={2} /> Live Site
              </a>
            )}
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
                <GitBranch size={13} strokeWidth={2} /> View on GitHub
              </a>
            )}
          </div>

          {/* Stack chips */}
          <div style={{
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          }}>
            {project.stack.map(tech => <StackChip key={tech} label={tech} />)}
          </div>
        </div>

        {/* ── Gallery ── */}
        {project.images.length > 0 && (
          <div style={{ marginBottom: '0.5rem', marginTop: '-0.75rem' }}>
            <CaseGallery images={project.images} title={project.title} />
          </div>
        )}

        {/* ── Quick Facts ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.75rem',
          paddingBlock: '2.5rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }} className="cs-facts-grid">
          {quickFacts.map(f => <FactCard key={f.label} label={f.label} value={f.value} />)}
        </div>

        {/* ── Overview ── */}
        <Section label="Overview">
          <Prose>{project.problem}</Prose>
        </Section>

        {/* ── My Role ── */}
        <Section label="My Role">
          <Prose>{project.myRole}</Prose>
        </Section>

        {/* ── What I Built ── */}
        {project.whatIBuilt && project.whatIBuilt.length > 0 && (
          <Section label="What I Built">
            <BulletList items={project.whatIBuilt} />
          </Section>
        )}

        {/* ── Key Challenge ── */}
        {project.challenges.length > 0 && (
          <Section label="Key Challenge">
            <ChallengeCard
              title={project.challenges[0].title}
              description={project.challenges[0].description}
              solution={project.challenges[0].solution}
            />
          </Section>
        )}

        {/* ── Engineering Highlights ── */}
        {project.engineeringHighlights && project.engineeringHighlights.length > 0 && (
          <Section label="Engineering Highlights">
            <EngineeringHighlights items={project.engineeringHighlights} />
          </Section>
        )}

        {/* ── Tech & Architecture ── */}
        <Section label="Tech & Architecture">
          <ArchFlow layers={[
            ...project.stack,
            ...(project.slug === 'creative-it-park-website' ? ['SMTP · Laravel Mail', 'cPanel · SSL · DNS'] : []),
            ...(project.slug === 'odsports-cms' ? ['Intervention Image · Media Pipeline', 'Laravel Scheduler · Artisan'] : []),
            ...(project.slug === 'perfect-doors-cms' ? ['Product Variants Schema', 'Many-to-Many Categories'] : []),
            ...(project.slug === 'pompak-financial-literacy' ? ['SQL Server · sqlsrv Driver', 'DB::statement() · Stored Procedures'] : []),
          ]} />
        </Section>

        {/* ── Outcome & Learning ── */}
        {project.takeaways && (
          <Section label="Outcome & Learning">
            <div style={{
              borderLeft: '2px solid rgba(59,130,246,0.3)',
              paddingLeft: '1.25rem',
            }}>
              <Prose>{project.takeaways}</Prose>
            </div>
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
                  <ArrowLeft size={12} /> Previous Project
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
                  Next Project <ArrowRight size={12} />
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
        .cs-section-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .cs-facts-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
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
          .cs-facts-grid {
            grid-template-columns: repeat(4, 1fr) !important;
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
