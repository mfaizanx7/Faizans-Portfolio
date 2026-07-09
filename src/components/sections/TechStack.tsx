import { FadeIn } from '@/components/ui'
import { stackGroups } from '@/data'

export function TechStack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      style={{
        paddingBlock: '6rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="container">

        {/* ── Section header ── */}
        <FadeIn>
          <div style={{ marginBottom: '3.5rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: '1rem',
              }}>
                Skills
              </p>
              <h2
                id="stack-heading"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  color: 'var(--color-text)',
                  lineHeight: 1.1,
                }}
              >
                Technical Skills
              </h2>
            </div>

          </div>
        </FadeIn>

        {/* ── Skill group cards ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
          gap: '1rem',
          alignItems: 'stretch',
        }}>
          {stackGroups.map((group, i) => (
            <FadeIn key={group.label} delay={i * 0.08} direction="up" style={{ height: '100%' }}>
              <div
                style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '1.5rem',
                  transition: 'border-color 200ms ease, background 200ms ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${group.color}30`
                  el.style.background  = `${group.color}06`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.background  = 'rgba(255,255,255,0.025)'
                }}
              >
                {/* Group label */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.25rem',
                }}>
                  <span
                    aria-hidden
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: group.color,
                      flexShrink: 0,
                      boxShadow: `0 0 8px ${group.color}55`,
                    }}
                  />
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    letterSpacing: '-0.02em',
                  }}>
                    {group.label}
                  </span>
                </div>

                {/* Skill chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                  {group.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        padding: '0.25rem 0.625rem',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.45)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.09)',
                        borderRadius: 'var(--radius-md)',
                        letterSpacing: '0.01em',
                        transition: 'color 150ms ease, border-color 150ms ease, background 150ms ease',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--color-text)'
                        e.currentTarget.style.borderColor = `${group.color}50`
                        e.currentTarget.style.background = `${group.color}0d`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'
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
    </section>
  )
}
