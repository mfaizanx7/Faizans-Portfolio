import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui'

const EASE = [0.16, 1, 0.3, 1] as const

const STEPS = [
  {
    number: '01',
    title: 'Understand',
    color: '#3B82F6',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
    items: ['Business requirements', 'User flow', 'Problem analysis', 'Planning'],
  },
  {
    number: '02',
    title: 'Design',
    color: '#A78BFA',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    items: ['Database modeling', 'REST API planning', 'Architecture', 'Authentication'],
  },
  {
    number: '03',
    title: 'Build',
    color: '#34D399',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    items: ['Laravel backend', 'Clean code', 'Reusable components', 'Testing', 'Code quality'],
  },
  {
    number: '04',
    title: 'Deploy',
    color: '#F59E0B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    items: ['Production deployment', 'SSL', 'DNS', 'cPanel', 'Monitoring'],
  },
]

export function HowIBuild() {
  return (
    <section
      aria-labelledby="how-heading"
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
              Process
            </p>
            <h2 id="how-heading" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700, letterSpacing: '-0.04em',
              color: 'var(--color-text)', lineHeight: 1.1,
            }}>
              How I build software
            </h2>
            <p style={{
              fontSize: 'var(--text-base)', color: 'var(--color-muted)',
              letterSpacing: '-0.01em', lineHeight: 1.6,
              maxWidth: 520,
            }}>
              Every production-ready application starts long before writing the first line of code.
            </p>
          </div>
        </FadeIn>

        {/* ── Cards grid ── */}
        <div className="how-grid">
          {STEPS.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08} direction="up">
              <motion.div
                whileHover={{ y: -4, borderColor: `${step.color}28` }}
                transition={{ duration: 0.22, ease: EASE }}
                style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  cursor: 'default',
                }}
              >
                {/* Top row — icon + number */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--radius-lg)',
                    background: `${step.color}12`,
                    border: `1px solid ${step.color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: step.color, flexShrink: 0,
                  }}>
                    {step.icon}
                  </div>
                  {/* Step number */}
                  <span style={{
                    fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
                    fontWeight: 600, color: 'rgba(255,255,255,0.12)',
                    letterSpacing: '0.06em',
                  }}>
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 style={{
                    fontSize: 'var(--text-xl)', fontWeight: 700,
                    color: 'var(--color-text)', letterSpacing: '-0.03em',
                    lineHeight: 1.2,
                  }}>
                    {step.title}
                  </h3>
                  {/* Accent underline */}
                  <div style={{
                    width: 24, height: 2, borderRadius: 2,
                    background: step.color, marginTop: '0.5rem',
                    opacity: 0.7,
                  }} />
                </div>

                {/* Items */}
                <ul style={{
                  display: 'flex', flexDirection: 'column', gap: '0.5rem',
                  paddingLeft: 0, listStyle: 'none', flex: 1,
                }}>
                  {step.items.map(item => (
                    <li key={item} style={{
                      display: 'flex', alignItems: 'center', gap: '0.625rem',
                    }}>
                      <span aria-hidden style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: step.color, opacity: 0.5, flexShrink: 0,
                      }} />
                      <span style={{
                        fontSize: 'var(--text-sm)', color: 'var(--color-muted)',
                        letterSpacing: '-0.01em', lineHeight: 1.4,
                      }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

              </motion.div>
            </FadeIn>
          ))}
        </div>

      </div>

      <style>{`
        .how-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .how-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 480px) {
          .how-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
