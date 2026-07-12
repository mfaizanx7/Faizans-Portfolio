import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { meta, navItems } from '@/data'

const connectLinks = [
  { label: 'GitHub',   href: meta.github,                   icon: <FaGithub size={13} style={{ color: '#e6edf3' }} />,   external: true  },
  { label: 'LinkedIn', href: meta.linkedin,                 icon: <FaLinkedin size={13} style={{ color: '#0A66C2' }} />, external: true  },
  { label: 'WhatsApp', href: 'https://wa.me/923430559742?text=Hi%20Faizan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.',  icon: <FaWhatsapp size={13} style={{ color: '#25D366' }} />, external: true  },
  { label: 'Gmail',    href: `mailto:${meta.email}`,        icon: <SiGmail size={13} style={{ color: '#EA4335' }} />,    external: false },
]

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingBlock: '4rem 2rem' }}>
      <div className="container">

        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* Left — Identity */}
          <div>
            <p style={{
              fontSize: 'var(--text-base)', fontWeight: 700,
              color: 'var(--color-text)', letterSpacing: '-0.03em',
              marginBottom: '0.25rem',
            }}>
              {meta.name}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em', marginBottom: '0.35rem' }}>
              Full-Stack Web Developer
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.28)', letterSpacing: '-0.01em' }}>
              Building production-ready web applications.
            </p>
          </div>

          {/* Center — Nav */}
          <div>
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)', marginBottom: '0.875rem',
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

          {/* Right — Connect */}
          <div>
            <p style={{
              fontSize: 'var(--text-xs)', fontWeight: 600,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.22)', marginBottom: '0.875rem',
            }}>
              Connect
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {connectLinks.map(l => (
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
                  <span style={{ flexShrink: 0 }}>{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
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
