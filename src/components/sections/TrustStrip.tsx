import { motion } from 'framer-motion'

const ORGS = [
  {
    name: 'Creative IT Park',
    type: 'Internship',
    period: 'Jun – Sep 2024',
    detail: 'Company website · ODSports CMS · Perfect Doors CMS',
    initials: 'CIT',
    color: '#3B82F6',
  },
  {
    name: 'NIBAF Pakistan',
    type: 'Internship',
    period: 'Oct 2024 – Jan 2025',
    detail: 'Thrive Portal · Reachfy API · PomPak Platform',
    initials: 'NB',
    color: '#34D399',
  },
  {
    name: 'Air University',
    type: 'Education',
    period: '2022 – Present',
    detail: 'BS Computer Science',
    initials: 'AU',
    color: '#A78BFA',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

export function TrustStrip() {
  return (
    <section
      aria-label="Background"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingBlock: '3rem',
      }}
    >
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease }}
          style={{
            fontSize: 'var(--text-xs)', fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--color-subtle)', marginBottom: '1.5rem',
          }}
        >
          Experience & Education
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
          gap: '0.75rem',
        }}>
          {ORGS.map((org, i) => (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 'var(--radius-xl)',
                transition: 'border-color 200ms ease, background 200ms ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `${org.color}25`
                el.style.background = `${org.color}06`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.background = 'rgba(255,255,255,0.025)'
              }}
            >
              {/* Logo mark */}
              <div style={{
                width: 40, height: 40, borderRadius: 'var(--radius-md)',
                background: `${org.color}15`,
                border: `1px solid ${org.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                fontSize: 'var(--text-xs)', fontWeight: 700,
                color: org.color, letterSpacing: '0.04em',
              }}>
                {org.initials}
              </div>

              {/* Info */}
              <div style={{ minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                  <span style={{
                    fontSize: 'var(--text-sm)', fontWeight: 600,
                    color: 'var(--color-text)', letterSpacing: '-0.02em',
                    whiteSpace: 'nowrap',
                  }}>
                    {org.name}
                  </span>
                  <span style={{
                    padding: '0.1rem 0.4rem', fontSize: '10px', fontWeight: 500,
                    color: org.color,
                    background: `${org.color}12`,
                    border: `1px solid ${org.color}20`,
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                  }}>
                    {org.type}
                  </span>
                </div>
                <p style={{
                  fontSize: 'var(--text-xs)', color: 'var(--color-subtle)',
                  letterSpacing: '-0.01em', lineHeight: 1.4,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {org.detail}
                </p>
              </div>

              {/* Period */}
              <span style={{
                marginLeft: 'auto', flexShrink: 0,
                fontSize: '10px', fontFamily: 'var(--font-mono)',
                color: 'var(--color-subtle)', letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}>
                {org.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
