import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

const STEPS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    label: 'Requirements',
    desc: 'Business goals, user flows, scope definition',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    label: 'Planning',
    desc: 'Architecture decisions, tech stack, milestones',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    label: 'Database Design',
    desc: 'Schema modeling, relations, indexing strategy',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: 'Laravel Backend',
    desc: 'Models, services, middleware, business logic',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
    label: 'REST APIs',
    desc: 'Endpoints, auth, validation, versioning',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
      </svg>
    ),
    label: 'Frontend Integration',
    desc: 'API consumption, state, UI components',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    label: 'Testing',
    desc: 'Feature tests, edge cases, code quality',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    label: 'Deployment',
    desc: 'cPanel, SSL, DNS, environment config',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Production',
    desc: 'Monitoring, uptime, queue workers, support',
  },
]

export function EngineeringProcess() {
  return (
    <section
      aria-labelledby="process-heading"
      className="section"
    >
      <div className="container">

        {/* ── Header ── */}
        <FadeIn>
          <div style={{ marginBottom: '3.5rem' }}>
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--color-accent)', marginBottom: '0.875rem',
            }}>
              Engineering Process
            </p>
            <h2 id="process-heading" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700, letterSpacing: '-0.04em',
              color: 'var(--color-text)', lineHeight: 1.1,
            }}>
              Inside my engineering process
            </h2>
          </div>
        </FadeIn>

        <div className="process-scroll">
          <div className="process-track">
            {STEPS.map((step, i) => (
              <>
                <FadeIn key={step.label} delay={i * 0.06} direction="up" style={{ flexShrink: 0 }}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="process-card"
                  >
                    {/* Step number */}
                    <span style={{
                      fontSize: 10, fontFamily: 'var(--font-mono)',
                      fontWeight: 600, color: 'rgba(255,255,255,0.12)',
                      letterSpacing: '0.06em', marginBottom: '0.875rem',
                      display: 'block',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Icon */}
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: 'rgba(59,130,246,0.08)',
                      border: '1px solid rgba(59,130,246,0.14)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(96,165,250,0.8)',
                      marginBottom: '1rem',
                    }}>
                      {step.icon}
                    </div>

                    {/* Label */}
                    <p style={{
                      fontSize: 'var(--text-sm)', fontWeight: 600,
                      color: 'var(--color-text)', letterSpacing: '-0.02em',
                      lineHeight: 1.3, marginBottom: '0.5rem',
                    }}>
                      {step.label}
                    </p>

                    {/* Description */}
                    <p style={{
                      fontSize: 11.5, color: 'rgba(255,255,255,0.3)',
                      lineHeight: 1.55, letterSpacing: '-0.005em',
                    }}>
                      {step.desc}
                    </p>
                  </motion.div>
                </FadeIn>

                {/* Connector — not after last step */}
                {i < STEPS.length - 1 && (
                  <div key={`c-${i}`} aria-hidden style={{
                    display: 'flex', alignItems: 'center',
                    flexShrink: 0, alignSelf: 'center',
                    padding: '0 0.125rem',
                  }}>
                    <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                      <path d="M0 6h16M12 1l5 5-5 5" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .process-scroll {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 0.5rem;
          /* Hint to user that it's scrollable */
          -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
          mask-image: linear-gradient(to right, black 85%, transparent 100%);
        }
        .process-scroll::-webkit-scrollbar { display: none; }

        .process-track {
          display: flex;
          align-items: flex-start;
          gap: 0;
          min-width: max-content;
          padding: 0.25rem 0.125rem;
        }

        .process-card {
          width: 148px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 1.25rem 1rem;
          cursor: default;
          transition: border-color 200ms;
        }
        .process-card:hover {
          border-color: rgba(59,130,246,0.2);
        }

        @media (max-width: 768px) {
          .process-card { width: 136px; }
        }
      `}</style>
    </section>
  )
}
