import { FadeIn } from '@/components/ui'
import { stackGroups } from '@/data'

const ABOUT_PARAGRAPHS = [
  'I build web applications that connect reliable backend logic with usable interfaces. My work focuses on CMS platforms, REST APIs, admin panels, business applications, and full-stack web systems.',
  'I work mainly with Laravel, PHP, MySQL, React.js, Node.js, and modern web development practices. I care about writing clean, maintainable code that is easy to understand, extend, and hand over.',
]

const INFO_ROWS = [
  { label: 'Based in',  value: 'Islamabad, Pakistan' },
  { label: 'Focus',     value: 'Laravel · React · REST APIs' },
  { label: 'Available', value: 'Open to full-time roles' },
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
              Craft & Stack
            </h2>
            <p style={{
              fontSize: 'var(--text-base)', lineHeight: 1.75,
              color: 'var(--color-muted)', maxWidth: 540,
            }}>
              A full-stack web developer focused on building practical, maintainable, and production-ready web applications.
            </p>
          </div>
        </FadeIn>

        {/* ── 50 / 50 layout ── */}
        <div className="as-grid">

          {/* ── Left — About ── */}
          <FadeIn direction="up">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {ABOUT_PARAGRAPHS.map((text, i) => (
                <p key={i} style={{
                  fontSize: 'var(--text-base)', lineHeight: 1.85,
                  color: i === 0 ? 'var(--color-text)' : 'var(--color-muted)',
                  fontWeight: i === 0 ? 500 : 400,
                  letterSpacing: '-0.01em',
                }}>
                  {text}
                </p>
              ))}

              <div style={{
                marginTop: '0.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
              }}>
                {INFO_ROWS.map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
                    <span style={{
                      fontSize: 'var(--text-xs)', fontWeight: 600,
                      letterSpacing: '0.07em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.22)', flexShrink: 0, width: 76,
                    }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-muted)', letterSpacing: '-0.01em' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── Right — Cards ── */}
          <FadeIn direction="up" delay={0.1} style={{ marginTop: '-2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {stackGroups.map((group, i) => (
                  <FadeIn key={group.label} delay={i * 0.06} direction="up">
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
          </FadeIn>

        </div>
      </div>

      <style>{`
        .as-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }
        @media (min-width: 860px) {
          .as-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            align-items: start;
          }
        }
      `}</style>
    </section>
  )
}
