import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { meta, navItems } from '@/data'

const socialLinks = [
  { label: 'GitHub',   href: meta.github,                  icon: <FiGithub size={13} />,   external: true  },
  { label: 'LinkedIn', href: meta.linkedin,                icon: <FiLinkedin size={13} />, external: true  },
  { label: 'WhatsApp', href: 'https://wa.me/923430559742', icon: <FaWhatsapp size={13} />, external: true  },
  { label: 'Email',    href: `mailto:${meta.email}`,       icon: <FiMail size={13} />,     external: false },
]

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingBlock: '4rem 2.5rem' }}>
      <div className="container">

        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* Identity */}
          <div>
            <p style={{
              fontSize: 'var(--text-base)', fontWeight: 700,
              color: 'var(--color-text)', letterSpacing: '-0.03em',
              marginBottom: '0.3rem',
            }}>
              {meta.name}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>
              Full-Stack Web Developer
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.28)', marginTop: '0.25rem' }}>
              Islamabad, Pakistan
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)', marginBottom: '0.75rem',
            }}>
              Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{
                    fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.45)',
                    transition: 'color 150ms ease', letterSpacing: '-0.01em',
                    minHeight: 'unset', display: 'inline',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)', marginBottom: '0.75rem',
            }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {socialLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.45)',
                    transition: 'color 150ms ease', letterSpacing: '-0.01em',
                    display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                    minHeight: 'unset',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  <span style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '0.375rem',
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.01em' }}>
            Open to full-time roles · Available now
          </p>
          <a
            href={`mailto:${meta.email}`}
            style={{
              fontSize: 12, color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.01em', transition: 'color 150ms',
              minHeight: 'unset',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            {meta.email}
          </a>
        </div>

      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr;
          gap: 2rem;
          align-items: flex-start;
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.75rem 1.25rem;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
      `}</style>
    </footer>
  )
}
