import { FadeIn } from '@/components/ui'

const PARAGRAPHS = [
  'Backend Developer with hands-on experience developing production-ready web applications, CMS platforms, and REST APIs using Laravel, PHP, MySQL, React.js, and Node.js.',
  'My focus is building clean, maintainable backend systems that solve real business problems. I enjoy working on production applications, improving backend architecture, and creating scalable solutions that are reliable and easy to maintain.',
  'Currently pursuing a BS in Computer Science while continuously strengthening my backend engineering skills through professional projects and practical experience.',
]

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{
        paddingBlock: '6rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="container">
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'start',
          }}
        >

          {/* ── Left — heading ── */}
          <FadeIn direction="up">
            <h2
              id="about-heading"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                color: 'var(--color-text)',
                lineHeight: 1.1,
                marginBottom: '0.75rem',
              }}
            >
              About Me
            </h2>
            <p style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
            }}>
              Backend Developer · Islamabad, Pakistan
            </p>
          </FadeIn>

          {/* ── Right — paragraphs ── */}
          <FadeIn direction="up" delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {PARAGRAPHS.map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 'var(--text-base)',
                    lineHeight: 1.8,
                    color: i === 0 ? 'var(--color-text)' : 'var(--color-muted)',
                    fontWeight: i === 0 ? 500 : 400,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>

    </section>
  )
}
