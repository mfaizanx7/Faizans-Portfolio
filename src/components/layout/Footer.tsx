import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { meta, navItems } from '@/data'

const socialLinks = [
  { label: 'GitHub',    href: meta.github,                    icon: <FiGithub size={13} />,    external: true  },
  { label: 'LinkedIn',  href: meta.linkedin,                  icon: <FiLinkedin size={13} />,  external: true  },
  { label: 'WhatsApp',  href: 'https://wa.me/923430559742',   icon: <FaWhatsapp size={13} />,  external: true  },
  { label: 'Email',     href: `mailto:${meta.email}`,         icon: <FiMail size={13} />,      external: false },
]

const linkStyle: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  color: 'rgba(255,255,255,0.4)',
  transition: 'color 150ms ease',
  letterSpacing: '-0.01em',
}

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingBlock: '3.5rem 2.5rem' }}>
      <div className="container">

        <div className="footer-grid">

          {/* Left — identity */}
          <div>
            <p style={{
              fontSize: 'var(--text-base)', fontWeight: 700,
              color: 'var(--color-text)', letterSpacing: '-0.03em',
              marginBottom: '0.375rem',
            }}>
              {meta.shortName}
            </p>
            <p style={{
              fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.35)',
              letterSpacing: '-0.01em',
            }}>
              Full-Stack Web Developer
            </p>
            <p style={{
              fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.2)',
              letterSpacing: '-0.01em', marginTop: '0.2rem',
            }}>
              Islamabad, Pakistan
            </p>
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {navItems.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{ ...linkStyle }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {socialLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <span style={{ color: 'rgba(255,255,255,0.25)' }}>{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '2.5rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: '0.5rem',
        }}>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.01em' }}>
            Open to full-time roles · Available now
          </p>
          <a
            href={`mailto:${meta.email}`}
            style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.01em', transition: 'color 150ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.22)')}
          >
            {meta.email}
          </a>
        </div>

      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 2rem;
          align-items: flex-start;
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 380px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  )
}
