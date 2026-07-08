import { FadeIn } from '@/components/ui'
import { stackGroups } from '@/data'

const CAPABILITY_BULLETS = [
  { icon: '⚙', text: 'Backend-first architecture' },
  { icon: '🖥', text: 'Frontend integration' },
  { icon: '🚀', text: 'Production deployment' },
]

export function AboutSkills() {
  return (
    <section id="stack" aria-labelledby="about-heading" className="section">
      <div className="container">

        {/* ── Header ── */}
        <FadeIn>
          <div style={{ marginBottom: '3rem' }}>
            <h2
              id="about-heading"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700,
                letterSpacing: '-0.04em', color: 'var(--color-text)',
                lineHeight: 1.1, marginBottom: '0.75rem',
              }}
            >
              Technical Capabilities
            </h2>
            <p style={{
              fontSize: 'var(--text-base)', lineHeight: 1.75,
              color: 'var(--color-muted)', maxWidth: 540,
            }}>
              Core tools and technologies I use to build full-stack web applications, CMS platforms, REST APIs, and production-ready systems.
            </p>
          </div>
        </FadeIn>

        {/* ── Capability summary — full width ── */}
        <FadeIn direction="up">
          <div style={{ marginBottom: '2.5rem', maxWidth: 680 }}>
            <p style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)', fontWeight: 600,
              color: 'var(--color-text)', letterSpacing: '-0.03em',
              lineHeight: 1.3, marginBottom: '0.75rem',
            }}>
              Engineering full-stack applications with a backend-first mindset.
            </p>
            <p style={{
              fontSize: 'var(--text-base)', lineHeight: 1.8,
              color: 'var(--color-muted)', letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}>
              I design and build web applications using Laravel, React, PHP, MySQL, Node.js, and REST APIs — from database design and backend engineering to frontend integration and production deployment.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 1.5rem' }}>
              {CAPABILITY_BULLETS.map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', letterSpacing: '-0.01em' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Cards grid ── */}
        <div className="as-cards">
          {stackGroups.map((group, i) => (
            <FadeIn key={group.label} delay={i * 0.08} direction="up">
              <div
                style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.25rem',
                  transition: 'border-color 220ms ease, background 220ms ease, box-shadow 220ms ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${group.color}35`
                  el.style.background  = `${group.color}07`
                  el.style.boxShadow   = `0 0 28px ${group.color}14`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.background  = 'rgba(255,255,255,0.02)'
                  el.style.boxShadow   = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span aria-hidden style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: group.color, flexShrink: 0,
                    boxShadow: `0 0 6px ${group.color}80`,
                  }} />
                  <span style={{
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    color: 'var(--color-text)', letterSpacing: '-0.02em',
                  }}>
                    {group.label}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {group.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        padding: '0.2rem 0.55rem',
                        fontSize: 'var(--text-xs)', fontWeight: 500,
                        color: 'rgba(255,255,255,0.5)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 'var(--radius-md)',
                        letterSpacing: '0.01em',
                        transition: 'color 150ms ease, border-color 150ms ease, background 150ms ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--color-text)'
                        e.currentTarget.style.borderColor = `${group.color}45`
                        e.currentTarget.style.background = `${group.color}0d`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        .as-cards {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          align-items: stretch;
        }
        @media (min-width: 540px) {
          .as-cards { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 900px) {
          .as-cards { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </section>
  )
}
