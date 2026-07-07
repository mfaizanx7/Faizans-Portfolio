import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui'

const EXPERIENCES = [
  {
    company: 'Creative IT Park',
    role: 'Web Developer Intern',
    period: 'Apr 2026 – Jul 2026',
    location: 'Islamabad, Pakistan',
    summary: 'Worked across three production applications for real clients — CMS development, Laravel to React.js migration, backend modules, and live deployments.',
    projects: [
      { label: 'Creative IT Website', slug: 'creative-it-park-website' },
      { label: 'OD Sports',      slug: 'odsports-cms'          },
      { label: 'Perfect Doors',  slug: 'perfect-doors-cms'     },
    ],
    highlights: [
      'Laravel to React + Node.js migration',
      'CMS modules for content, media & products',
      'Production deployments — cPanel, SSL, DNS',
      'Client-requested feature development',
    ],
  },
  {
    company: 'NIBAF Pakistan',
    role: 'Web Developer Intern',
    period: 'Jan 2026 – Feb 2026',
    location: 'Islamabad, Pakistan',
    summary: 'Supported backend development on the PomPak financial literacy platform.',
    projects: [
      { label: 'PomPak Financial Literacy Platform', slug: 'pompak-financial-literacy' },
    ],
    highlights: [
      'Laravel + SQL Server backend support',
      'Bug fixes and feature enhancements',
      'Collaborative workflow with senior developers',
    ],
  },
]

// Dot size & line offset — single source of truth
const DOT   = 10   // px
const TRACK = 20   // px — total left column width (line sits at center = 10px)

function TimelineDot({ index: _index }: { index: number }) {
  return (
    <div style={{
      width: TRACK, flexShrink: 0,
      display: 'flex', justifyContent: 'center',
      paddingTop: 6,
    }}>
      <div style={{ position: 'relative', width: DOT, height: DOT }}>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: -4,
            borderRadius: '50%',
            border: '1.5px solid rgba(59,130,246,0.6)',
            willChange: 'transform, opacity',
            transform: 'translate3d(0,0,0)',
          }}
        />
        <div style={{
          width: DOT, height: DOT, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #93c5fd, #3b82f6)',
          boxShadow: '0 0 8px rgba(59,130,246,0.7)',
          border: '1.5px solid rgba(147,197,253,0.35)',
          position: 'relative', zIndex: 1,
        }} />
      </div>
    </div>
  )
}

export function Experience() {

  return (
    <section
      id="experience"
      aria-labelledby="exp-heading"
      style={{ paddingBlock: '5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="container">

        {/* ── Header ── */}
        <FadeIn>
          <div style={{ marginBottom: '3rem' }}>
            <h2 id="exp-heading" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700, letterSpacing: '-0.04em',
              color: 'var(--color-text)', lineHeight: 1.1,
            }}>
              Where I've worked
            </h2>
          </div>
        </FadeIn>

        {/* ── Timeline ── */}
        <div style={{ position: 'relative' }}>

          {/* Vertical line — sits at center of TRACK column */}
          <div aria-hidden style={{
            position: 'absolute',
            left: TRACK / 2 - 0.5, // perfectly centered under dots
            top: 16,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, #3b82f6 0%, rgba(59,130,246,0.2) 70%, transparent 100%)',
            boxShadow: '0 0 6px rgba(59,130,246,0.3)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={exp.company} delay={i * 0.1} direction="up">
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  {/* ── Left: dot track ── */}
                  <TimelineDot index={i} />

                  {/* ── Right: content ── */}
                  <div style={{ flex: 1, minWidth: 0, paddingBottom: '0.5rem' }}>

                    {/* Company + date row */}
                    <div className="exp-top-row">
                      <div>
                        <h3 style={{
                          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                          fontWeight: 700,
                          color: 'var(--color-text)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.2,
                          marginBottom: '0.2rem',
                        }}>
                          {exp.company}
                        </h3>
                        <p style={{
                          fontSize: 'var(--text-sm)',
                          color: 'rgba(255,255,255,0.55)',
                          letterSpacing: '-0.01em',
                          fontWeight: 500,
                        }}>
                          {exp.role}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{
                          fontSize: 'var(--text-xs)',
                          fontFamily: 'var(--font-mono)',
                          color: '#60a5fa',
                          letterSpacing: '0.03em',
                          fontWeight: 600,
                          marginBottom: '0.15rem',
                        }}>
                          {exp.period}
                        </p>
                        <p style={{
                          fontSize: '11px',
                          color: 'rgba(255,255,255,0.28)',
                          letterSpacing: '0.01em',
                        }}>
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    {/* Summary */}
                    <p style={{
                      marginTop: '0.875rem',
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1.7,
                      color: 'var(--color-muted)',
                      letterSpacing: '-0.01em',
                      maxWidth: 560,
                    }}>
                      {exp.summary}
                    </p>

                    {/* Projects + Highlights */}
                    <div className="exp-detail-row" style={{ marginTop: '1.25rem' }}>

                      <div>
                        <p style={{
                          fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.07em', textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.22)', marginBottom: '0.5rem',
                        }}>
                          Projects
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {exp.projects.map(p => (
                            <Link
                              key={p.label}
                              to={`/work/${p.slug}`}
                              style={{
                                fontSize: 'var(--text-sm)',
                                color: 'rgba(255,255,255,0.5)',
                                textDecoration: 'none',
                                letterSpacing: '-0.01em',
                                transition: 'color 150ms',
                                display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                              }}
                              onMouseEnter={e => (e.currentTarget.style.color = '#93c5fd')}
                              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                            >
                              <span style={{ opacity: 0.4, fontSize: 10 }}>↗</span>
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p style={{
                          fontSize: '10px', fontWeight: 600,
                          letterSpacing: '0.07em', textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.22)', marginBottom: '0.5rem',
                        }}>
                          Highlights
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {exp.highlights.map((h, j) => (
                            <li key={j} style={{
                              fontSize: 'var(--text-sm)',
                              color: 'rgba(255,255,255,0.45)',
                              letterSpacing: '-0.01em',
                              display: 'flex', gap: '0.5rem', alignItems: 'baseline',
                            }}>
                              <span style={{ color: 'rgba(59,130,246,0.6)', flexShrink: 0, fontSize: 10 }}>•</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .exp-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }
        .exp-detail-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 540px) {
          .exp-top-row { flex-direction: column; gap: 0.25rem; }
          .exp-top-row > div:last-child { text-align: left; }
          .exp-detail-row { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>
    </section>
  )
}
