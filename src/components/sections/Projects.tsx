import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, GitBranch, ArrowRight, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn, ImageGallery } from '@/components/ui'
import { allProjects } from '@/data'
import type { Project } from '@/types'

const EASE = [0.16, 1, 0.3, 1] as const
const ROTATE_MS = 7000

/* ── Image carousel ──────────────────────────────────────────── */
function CardCarousel({ images, title, onOpenGallery }: {
  images: string[]
  title: string
  onOpenGallery: (idx: number) => void
}) {
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)
  const [paused, setPaused] = useState(false)
  const timerRef            = useRef<ReturnType<typeof setInterval> | null>(null)
  const count               = images.length

  const go = useCallback((next: number, d: number) => {
    setDir(d)
    setActive(((next % count) + count) % count)
  }, [count])

  useEffect(() => {
    if (count <= 1 || paused) return
    timerRef.current = setInterval(() => go(active + 1, 1), ROTATE_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [active, paused, count, go])

  if (count === 0) {
    return (
      <div style={{
        aspectRatio: '16/9',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 'var(--radius-xl)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.25rem',
      }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-subtle)' }}>No preview</span>
      </div>
    )
  }

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 16 }),
    center: { opacity: 1, x: 0 },
    exit:   (d: number) => ({ opacity: 0, x: d * -16 }),
  }

  return (
    <div
      style={{ marginBottom: '1.25rem', position: 'relative' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image wrapper */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`View ${title} screenshots`}
        onClick={() => onOpenGallery(active)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onOpenGallery(active) }}
        style={{
          position: 'relative',
          aspectRatio: '16/9',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          background: '#0a0a0c',
          cursor: 'zoom-in',
        }}
      >
        <AnimatePresence custom={dir} mode="wait">
          <motion.img
            key={active}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: EASE }}
            src={images[active]}
            alt={`${title} screenshot ${active + 1}`}
            loading="lazy"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
              transition: 'transform 400ms ease',
            }}
            className="card-img"
          />
        </AnimatePresence>

        {/* Zoom hint */}
        <div style={{
          position: 'absolute', bottom: '0.625rem', right: '0.625rem',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: 6, padding: '0.2rem 0.45rem',
          display: 'flex', alignItems: 'center', gap: '0.25rem',
          pointerEvents: 'none',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <ZoomIn size={10} color="rgba(255,255,255,0.5)" />
        </div>

        {/* Prev / Next */}
        {count > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); go(active - 1, -1) }}
              aria-label="Previous screenshot"
              style={{
                position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                width: 28, height: 28,
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 7,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.75)',
              }}
            >
              <ChevronLeft size={13} strokeWidth={2} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); go(active + 1, 1) }}
              aria-label="Next screenshot"
              style={{
                position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)',
                width: 28, height: 28,
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 7,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,255,255,0.75)',
              }}
            >
              <ChevronRight size={13} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {count > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '0.3rem',
          marginTop: '0.625rem',
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > active ? 1 : -1); setActive(i) }}
              aria-label={`Go to screenshot ${i + 1}`}
              className="dot-btn"
              style={{
                width: i === active ? 18 : 5, height: 5,
                minHeight: 'unset',
                borderRadius: 'var(--radius-full)',
                background: i === active ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 250ms ease, background 250ms ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── ProjectCard ─────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [galleryOpen, setGalleryOpen]   = useState(false)
  const [galleryStart, setGalleryStart] = useState(0)

  function openGallery(idx: number) {
    if (project.images.length === 0) return
    setGalleryStart(idx)
    setGalleryOpen(true)
  }

  return (
    <>
      <FadeIn delay={index * 0.07} direction="up" style={{ height: '100%' }}>
        <article
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(255,255,255,0.028)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 'var(--radius-2xl)',
            padding: '1.25rem',
            cursor: 'default',
            overflow: 'hidden',
          }}
        >
          {/* ── Carousel ── */}
          <CardCarousel
            images={project.images}
            title={project.title}
            onOpenGallery={openGallery}
          />

          {/* ── Category label ── */}
          <p style={{
            fontSize: 'var(--text-xs)', fontWeight: 500,
            color: 'var(--color-accent)', letterSpacing: '0.06em',
            textTransform: 'uppercase', marginBottom: '0.375rem',
          }}>
            {project.category}
          </p>

          {/* ── Title ── */}
          <h3 style={{
            fontSize: 'var(--text-lg)', fontWeight: 700,
            color: 'var(--color-text)', letterSpacing: '-0.03em',
            lineHeight: 1.2, marginBottom: '0.625rem',
          }}>
            {project.title}
          </h3>

          {/* ── Description ── */}
          <p style={{
            fontSize: 'var(--text-sm)', lineHeight: 1.65,
            color: 'var(--color-muted)',
            marginBottom: '1rem', flexShrink: 0,
          }}>
            {project.description}
          </p>

          {/* ── Stack chips ── */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1.125rem' }}>
            {project.stack.map(tech => (
              <span key={tech} style={{
                padding: '0.2rem 0.55rem',
                fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                color: 'var(--color-subtle)',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-md)',
                letterSpacing: '0.01em', whiteSpace: 'nowrap',
              }}>
                {tech}
              </span>
            ))}
          </div>

          <div style={{ flexGrow: 1 }} />

          {/* ── Actions ── */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}>
            {/* Case Study — primary action */}
            <Link
              to={`/work/${project.slug}`}
              aria-label={`Read ${project.title} case study`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                padding: '0.45rem 1rem',
                fontSize: 'var(--text-sm)', fontWeight: 600,
                color: '#fff',
                background: 'var(--color-accent)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'filter 150ms ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.12)')}
              onMouseLeave={e => (e.currentTarget.style.filter = '')}
            >
              Case Study <ArrowRight size={12} strokeWidth={2.5} />
            </Link>

            {/* GitHub — secondary */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.45rem 0.875rem',
                  fontSize: 'var(--text-sm)', fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'color 150ms, background 150ms, border-color 150ms',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                <GitBranch size={12} strokeWidth={2} /> GitHub
              </a>
            )}

            {/* Live — secondary */}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: '0.45rem 0.875rem',
                  fontSize: 'var(--text-sm)', fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'color 150ms, background 150ms, border-color 150ms',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--color-text)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                <ExternalLink size={12} strokeWidth={2} /> Live
              </a>
            )}
          </div>
        </article>
      </FadeIn>

      {galleryOpen && project.images.length > 0 && (
        <ImageGallery
          images={project.images}
          projectTitle={project.title}
          initialIndex={galleryStart}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  )
}

/* ── Projects section ────────────────────────────────────────── */
export function Projects() {
  return (
    <section
      id="work"
      aria-labelledby="projects-heading"
      className="section"
    >
      <div className="container">
        <FadeIn>
          <div style={{ marginBottom: '3.5rem', maxWidth: 600 }}>
            <h2
              id="projects-heading"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700,
                letterSpacing: '-0.04em', color: 'var(--color-text)',
                lineHeight: 1.1, marginBottom: '0.875rem',
              }}
            >
              Selected Engineering Work
            </h2>
            <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.75, color: 'var(--color-muted)' }}>
              Real client work focused on backend engineering, CMS platforms, REST APIs, and production-ready software.
            </p>
          </div>
        </FadeIn>

        <div className="projects-grid">
          {allProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
          align-items: stretch;
        }
        @media (max-width: 767px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
        .card-img:hover { transform: scale(1.03); }
      `}</style>
    </section>
  )
}
