import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { Button, BackendPanel } from '@/components/ui'
import { meta } from '@/data'

const EASE = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
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
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div aria-hidden className="glow-orb" style={{
          top: '-15%', right: '-8%',
          width: '50vw', height: '50vw',
          maxWidth: 640, maxHeight: 640,
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)',
        }} />
        <div aria-hidden className="glow-orb" style={{
          bottom: '5%', left: '-10%',
          width: '35vw', height: '35vw',
          maxWidth: 480, maxHeight: 480,
          background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 65%)',
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
              {/* ── Name ── */}
              <motion.h1
                variants={reduced ? itemReduced : item}
                style={{
                  fontSize: 'clamp(3.25rem, 8.5vw, 6rem)',
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: '-0.045em',
                  marginBottom: '1.25rem',
                  background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 45%, #93c5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Muhammad<br />Faizan Khan
              </motion.h1>

              {/* ── Role ── */}
              <motion.p
                variants={reduced ? itemReduced : item}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: 400,
                  color: 'var(--color-muted)',
                  letterSpacing: '-0.01em',
                  marginBottom: '2.25rem',
                }}
              >
                Full-Stack Web Developer
                <span style={{
                  display: 'inline-block',
                  width: 3, height: 3, borderRadius: '50%',
                  background: 'var(--color-accent)',
                  margin: '0 0.5rem 0.15rem',
                  opacity: 0.6,
                }} />
                Laravel · React · PHP · MySQL
              </motion.p>

              {/* ── Brand statement ── */}
              <motion.p
                variants={reduced ? itemReduced : item}
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  letterSpacing: '-0.015em',
                  color: 'var(--color-text)',
                  maxWidth: 520,
                  marginBottom: '0.875rem',
                }}
              >
                Building reliable web applications from database to deployment.
              </motion.p>

              {/* ── Subheadline ── */}
              <motion.p
                variants={reduced ? itemReduced : item}
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: 'var(--color-muted)',
                  maxWidth: 500,
                  marginBottom: '3rem',
                }}
              >
                I build CMS platforms, REST APIs, admin panels, and business applications using Laravel, React, PHP, MySQL, Node.js, and modern web technologies.
              </motion.p>

              {/* ── CTAs ── */}
              <motion.div
                variants={reduced ? itemReduced : item}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', maxWidth: '100%' }}
              >
                {/* Primary */}
                <Button variant="primary" href="#work">
                  View Projects <ArrowRight size={14} strokeWidth={2} />
                </Button>

                {/* Secondary — GitHub */}
                <a
                  href={meta.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="hero-btn-secondary"
                >
                  <FiGithub size={14} />
                  GitHub
                </a>

                {/* Secondary — LinkedIn */}
                <a
                  href={meta.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="hero-btn-secondary"
                >
                  <FiLinkedin size={14} />
                  LinkedIn
                </a>

                {/* Divider */}
                <span aria-hidden className="hero-cta-divider" style={{
                  width: 1, height: 20,
                  background: 'rgba(255,255,255,0.08)',
                  flexShrink: 0,
                }} />

                {/* Ghost — View Resume */}
                <button
                  onClick={openCVModal}
                  className="hero-btn-ghost"
                >
                  <FileText size={13} strokeWidth={1.75} />
                  View Resume
                </button>
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

        /* Secondary outline button */
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 40px;
          padding: 0 1rem;
          font-size: var(--text-sm);
          font-weight: 500;
          font-family: inherit;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: var(--radius-md);
          text-decoration: none;
          cursor: pointer;
          transition: color 150ms ease, border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-btn-secondary:hover {
          color: var(--color-text);
          border-color: rgba(255,255,255,0.32);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06);
        }

        /* Ghost button */
        .hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 40px;
          padding: 0 0.875rem;
          font-size: var(--text-sm);
          font-weight: 400;
          font-family: inherit;
          letter-spacing: -0.01em;
          color: rgba(255,255,255,0.32);
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: color 150ms ease, background 150ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .hero-btn-ghost:hover {
          color: rgba(255,255,255,0.65);
          background: rgba(255,255,255,0.04);
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

        /* Tablet: tighten vertical padding */
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
          .hero-btn-secondary,
          .hero-btn-ghost {
            flex: 1 1 auto;
            justify-content: center;
            min-width: 0;
          }
        }

        @media (max-width: 380px) {
          .hero-btn-secondary,
          .hero-btn-ghost {
            width: 100%;
          }
        }
      `}</style>
    </>
  )
}
