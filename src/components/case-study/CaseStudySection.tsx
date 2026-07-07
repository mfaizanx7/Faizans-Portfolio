import { motion } from 'framer-motion'

interface CaseStudySectionProps {
  title: string
  children: React.ReactNode
}

const ease = [0.16, 1, 0.3, 1] as const

export function CaseStudySection({ title, children }: CaseStudySectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, ease }}
      style={{
        paddingBlock: '2.5rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="case-study-grid">
        {/* Sticky label */}
        <div className="case-study-label">
          <h2 style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-subtle)',
            lineHeight: 1.4,
          }}>
            {title}
          </h2>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 640 }}>
          {children}
        </div>
      </div>
    </motion.section>
  )
}
