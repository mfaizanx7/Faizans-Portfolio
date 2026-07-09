import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { BackendPanel } from '@/components/ui'
import { meta } from '@/data'
import { useRecruiterMode } from '@/context/RecruiterModeContext'
import { useEffect, useState } from 'react'

const RECRUITER_BULLETS = [
  { icon: '⚡', label: 'Role',         text: 'Full-Stack Developer',      sub: 'Laravel · React · Node.js · MySQL' },
  { icon: '🚀', label: 'Shipped',      text: '4 Production Projects',     sub: 'Live · Client-facing · Real users' },
  { icon: '🔧', label: 'Builds',       text: 'APIs · CMS · Admin Panels', sub: 'REST · Blade · React frontends'   },
  { icon: '🎓', label: 'Education',    text: 'BS Computer Science',       sub: 'In progress · Islamabad'          },
  { icon: '✅', label: 'Availability', text: 'Available Immediately',     sub: 'Remote · Onsite · Hybrid'         },
]

const STATUS_TEXT = '> RECRUITER_VIEW.exe — initializing...'

function TypewriterStatus() {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const t = setInterval(() => {
      i++
      setDisplayed(STATUS_TEXT.slice(0, i))
      if (i >= STATUS_TEXT.length) clearInterval(t)
    }, 28)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.3rem 0.75rem',
        background: 'rgba(59,130,246,0.07)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: 6,
        marginBottom: '1rem',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', flexShrink: 0, boxShadow: '0 0 8px rgba(59,130,246,0.8)', animation: 'rm-blink 1s step-end infinite' }} />
      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#60a5fa', letterSpacing: '0.04em' }}>
        {displayed}<span style={{ animation: 'rm-blink 0.8s step-end infinite', opacity: displayed.length < STATUS_TEXT.length ? 1 : 0 }}>▋</span>
      </span>
    </motion.div>
  )
}

const EASE = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

const itemReduced = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.2 } },
}

function openCVModal() {
  window.dispatchEvent(new Event('open-cv-modal'))
}

export function Hero() {
  const reduced = useReducedMotion()
  const { isRecruiterMode } = useRecruiterMode()

  return (
    <>
      <section
        id="hero"
        aria-label="Introduction"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Decorative orbs */}
        <div aria-hidden className="glow-orb" style={{
          top: '-15%', right: '-8%',
          width: '50vw', height: '50vw',
          maxWidth: 640, maxHeight: 640,
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)',
          willChange: 'auto',
        }} />
        <div aria-hidden className="glow-orb" style={{
          bottom: '5%', left: '-10%',
          width: '35vw', height: '35vw',
          maxWidth: 480, maxHeight: 480,
          background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 65%)',
          willChange: 'auto',
        }} />

        <div className="container hero-container">
          <div className="hero-grid">

            {/* ── Left — text ── */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="hero-left"
            >
              {/* ── Availability badge / Recruiter status ── */}
              <motion.div variants={reduced ? itemReduced : item} style={{ marginBottom: '1.75rem' }}>
                <AnimatePresence mode="wait">
                  {isRecruiterMode ? (
                    <TypewriterStatus key="recruiter" />
                  ) : (
                    <motion.span
                      key="normal"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="avail-badge"
                    >
                      <span className="avail-dot" />
                      Available for Full-Time Opportunities
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── Name ── */}
              <motion.h1
                variants={reduced ? itemReduced : item}
                style={{
                  fontSize: 'clamp(3.25rem, 8.5vw, 6rem)',
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: '-0.045em',
                  marginBottom: '1rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  isolation: 'isolate',
                  transform: 'translate3d(0,0,0)',
                }}
              >
                Muhammad<br />Faizan Khan
              </motion.h1>

              {/* ── Role ── */}
              <motion.div
                variants={reduced ? itemReduced : item}
                style={{ marginBottom: '2rem' }}
              >
                <span style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.01em',
                }}>
                  Full-Stack Web Developer
                </span>
              </motion.div>

              {/* ── Brand statement ── */}
              <motion.p
                variants={reduced ? itemReduced : item}
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                  fontWeight: 500,
                  lineHeight: 1.55,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-text)',
                  maxWidth: 500,
                  marginBottom: '0.75rem',
                }}
              >
                Building reliable web applications from database to deployment.
              </motion.p>

              {/* ── Stack line / Recruiter bullets ── */}
              <motion.div
                variants={reduced ? itemReduced : item}
                style={{ marginBottom: '2.75rem' }}
              >
                {isRecruiterMode ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {RECRUITER_BULLETS.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: i * 0.07, ease: EASE }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.45rem 0.75rem',
                          background: 'rgba(59,130,246,0.04)',
                          border: '1px solid rgba(59,130,246,0.1)',
                          borderRadius: 8,
                        }}
                      >
                        <span style={{ fontSize: 14, flexShrink: 0, lineHeight: 1 }}>{b.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'rgba(59,130,246,0.85)', flexShrink: 0, letterSpacing: '-0.01em' }}>{b.label}</span>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 400, color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>·</span>
                            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.01em' }}>{b.text}</span>
                          </div>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.01em', marginTop: 2 }}>{b.sub}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p style={{
                    fontSize: 'var(--text-sm)', fontWeight: 400,
                    color: 'var(--color-muted)', letterSpacing: '-0.01em', opacity: 0.75,
                  }}>
                    Laravel · React · PHP · Node.js · MySQL
                  </p>
                )}
              </motion.div>

              {/* ── CTAs ── */}
              <motion.div
                variants={reduced ? itemReduced : item}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}
              >
                {/* Primary — View Projects */}
                <a
                  href="#work"
                  className="hero-btn-primary"
                >
                  View Projects <ArrowRight size={13} strokeWidth={2.5} />
                </a>

                {/* Secondary — View Resume */}
                <button
                  onClick={openCVModal}
                  className="hero-btn-resume"
                >
                  <FileText size={13} strokeWidth={2} />
                  View Resume
                </button>

                {/* Divider */}
                <span aria-hidden className="hero-cta-divider" />

                {/* Outline — GitHub */}
                <a
                  href={meta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="hero-btn-github"
                >
                  <FaGithub size={14} />
                  GitHub
                </a>

                {/* Outline — LinkedIn */}
                <a
                  href={meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="hero-btn-linkedin"
                >
                  <FaLinkedin size={14} />
                  LinkedIn
                </a>
              </motion.div>
            </motion.div>

            {/* ── Right — backend panel ── */}
            <div className="hero-panel">
              <BackendPanel />
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .hero-container {
          padding-top: 6rem;
          padding-bottom: 6rem;
          width: 100%;
        }

        .hero-grid {
          display: flex;
          align-items: center;
          gap: 4rem;
        }

        .hero-left {
          flex: 1 1 0;
          min-width: 0;
          text-align: left;
          align-self: flex-start;
        }

        /* Availability badge */
        .avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.3rem 0.75rem;
          font-size: var(--text-xs);
          font-weight: 500;
          letter-spacing: 0.01em;
          color: rgba(52,211,153,0.85);
          background: rgba(52,211,153,0.06);
          border: 1px solid rgba(52,211,153,0.18);
          border-radius: var(--radius-full);
        }
        .avail-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 6px rgba(52,211,153,0.7);
          flex-shrink: 0;
          animation: avail-pulse 2.4s ease-in-out infinite;
        }
        @keyframes avail-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes rm-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .avail-dot { animation: none; }
        }

        /* Primary CTA */
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 42px;
          padding: 0 1.25rem;
          font-size: var(--text-sm);
          font-weight: 600;
          font-family: inherit;
          letter-spacing: -0.01em;
          color: #fff;
          background: var(--color-accent);
          border-radius: var(--radius-md);
          text-decoration: none;
          cursor: pointer;
          transition: filter 150ms ease, box-shadow 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: 0 2px 16px rgba(59,130,246,0.3);
        }
        .hero-btn-primary:hover {
          filter: brightness(1.1);
          box-shadow: 0 4px 24px rgba(59,130,246,0.45);
        }

        /* Resume CTA */
        .hero-btn-resume {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 42px;
          padding: 0 1.125rem;
          font-size: var(--text-sm);
          font-weight: 500;
          font-family: inherit;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.75);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease, background 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-btn-resume:hover {
          color: var(--color-text);
          border-color: rgba(255,255,255,0.28);
          background: rgba(255,255,255,0.09);
        }

        /* GitHub button */
        .hero-btn-github {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          height: 38px;
          padding: 0 0.875rem;
          font-size: var(--text-sm);
          font-weight: 500;
          font-family: inherit;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: var(--radius-md);
          text-decoration: none;
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease, background 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-btn-github:hover {
          color: #e6edf3;
          border-color: rgba(230,237,243,0.35);
          background: rgba(230,237,243,0.07);
        }

        /* LinkedIn button */
        .hero-btn-linkedin {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          height: 38px;
          padding: 0 0.875rem;
          font-size: var(--text-sm);
          font-weight: 500;
          font-family: inherit;
          letter-spacing: -0.01em;
          color: rgba(10,102,194,0.8);
          background: rgba(10,102,194,0.07);
          border: 1px solid rgba(10,102,194,0.25);
          border-radius: var(--radius-md);
          text-decoration: none;
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease, background 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-btn-linkedin:hover {
          color: #0A66C2;
          border-color: rgba(10,102,194,0.5);
          background: rgba(10,102,194,0.12);
        }

        /* Outline buttons — GitHub / LinkedIn */
        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          height: 38px;
          padding: 0 0.875rem;
          font-size: var(--text-sm);
          font-weight: 400;
          font-family: inherit;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.35);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-md);
          text-decoration: none;
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease, background 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-btn-outline:hover {
          color: rgba(255,255,255,0.65);
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.04);
        }

        /* Divider */
        .hero-cta-divider {
          display: block;
          width: 1px; height: 20px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        /* Panel hidden on mobile/tablet */
        .hero-panel { display: none; }

        @media (min-width: 1024px) {
          .hero-panel {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            flex-shrink: 0;
          }
          .hero-grid { align-items: center; }
        }

        @media (max-width: 1023px) {
          .hero-container {
            padding-top: 5.5rem;
            padding-bottom: 4.5rem;
          }
        }

        @media (max-width: 640px) {
          .hero-container {
            padding-top: 5rem;
            padding-bottom: 3.5rem;
          }
          .hero-cta-divider { display: none; }
          .hero-btn-primary,
          .hero-btn-resume {
            flex: 1 1 auto;
            justify-content: center;
            min-width: 0;
          }
          .hero-btn-github,
          .hero-btn-linkedin {
            flex: 1 1 auto;
            justify-content: center;
            min-width: 0;
          }
        }

        @media (max-width: 380px) {
          .hero-btn-primary,
          .hero-btn-resume,
          .hero-btn-github,
          .hero-btn-linkedin {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}
