import { FadeIn } from '@/components/ui'

const STATS = [
  {
    value: '5',
    label: 'Projects Built',
    detail: 'CMS platforms, REST APIs, portals, web apps',
    color: '#3B82F6',
  },
  {
    value: '2',
    label: 'Professional Internships',
    detail: 'Creative IT Park · NIBAF Pakistan',
    color: '#A78BFA',
  },
  {
    value: 'Laravel',
    label: 'Primary Stack',
    detail: 'PHP · MySQL · REST APIs · React.js',
    color: '#34D399',
  },
  {
    value: 'Open',
    label: 'to Full-Time Roles',
    detail: 'Available immediately · Islamabad, PK',
    color: '#F59E0B',
  },
]

export function Stats() {
  return (
    <section
      aria-labelledby="stats-heading"
      style={{
        paddingBlock: '5rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Visually hidden heading for accessibility */}
      <h2 id="stats-heading" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        At a glance
      </h2>

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
          gap: '1rem',
          alignItems: 'stretch',
        }}>
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.07} direction="up">
              <div
                style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '1.75rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  transition: 'border-color 200ms ease, background 200ms ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${stat.color}30`
                  el.style.background  = `${stat.color}08`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.07)'
                  el.style.background  = 'rgba(255,255,255,0.025)'
                }}
              >
                {/* Value */}
                <div style={{
                  fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: stat.color,
                }}>
                  {stat.value}
                </div>

                {/* Label */}
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.3,
                }}>
                  {stat.label}
                </div>

                {/* Detail */}
                <div style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-subtle)',
                  lineHeight: 1.5,
                  marginTop: '0.125rem',
                }}>
                  {stat.detail}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
