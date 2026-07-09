import { useState, useId } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiCopy, FiCheck, FiSend, FiExternalLink, FiDownload, FiChevronDown, FiMail } from 'react-icons/fi'
import { SiGmail } from 'react-icons/si'
import emailjs from '@emailjs/browser'
import { FadeIn } from '@/components/ui'
import { meta } from '@/data'
import { useCopyToClipboard } from '@/hooks'
import { useRecruiterMode } from '@/context/RecruiterModeContext'

const EJS_SERVICE  = 'service_8bb52ds'
const EJS_TEMPLATE = 'template_ivnyi7n'
const EJS_PUBLIC   = 'WqYniDkLpQ3wTANCB'

const WHY_BULLETS = [
  'Production-ready development',
  'Clean & maintainable code',
  'CMS & business applications',
  'REST API development',
  'Reliable communication',
]

const SEEKING = [
  'Full-Stack Web Developer',
  'Laravel / PHP Developer',
  'Backend Developer',
  'Software Engineer',
]

const TRUST_ITEMS = [
  'Usually replies within 24 hours',
  'Open to remote, onsite & hybrid roles',
  'Available for full-time opportunities',
]

interface FormState  { name: string; email: string; subject: string; message: string }
interface FormErrors { email?: string; name?: string; subject?: string; message?: string }

function validate(v: FormState): FormErrors {
  const e: FormErrors = {}
  if (!v.email.trim())   e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email.'
  return e
}

function Field({ id, label, error, children }: {
  id: string; label: string; error?: string; children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label htmlFor={id} style={{
        fontSize: 'var(--text-xs)', fontWeight: 600,
        letterSpacing: '0.07em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
      }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="alert"
            style={{ fontSize: 'var(--text-xs)', color: '#F87171', marginTop: '0.1rem' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: '100%',
    padding: '0.875rem 1.1rem',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text)',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${hasError ? 'rgba(248,113,113,0.45)' : 'rgba(255,255,255,0.09)'}`,
    borderRadius: 'var(--radius-lg)',
    outline: 'none',
    transition: 'border-color 150ms ease, background 150ms ease, box-shadow 150ms ease',
    fontFamily: 'inherit',
    lineHeight: 1.5,
  }
}

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.55)'
  e.currentTarget.style.background  = 'rgba(255,255,255,0.05)'
  e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(59,130,246,0.09)'
}
function onBlurInput(hasError: boolean) {
  return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = hasError ? 'rgba(248,113,113,0.45)' : 'rgba(255,255,255,0.09)'
    e.currentTarget.style.background  = 'rgba(255,255,255,0.03)'
    e.currentTarget.style.boxShadow   = 'none'
  }
}

export function Contact() {
  const uid = useId()
  const { copied, copy } = useCopyToClipboard(2000)
  const { isRecruiterMode } = useRecruiterMode()

  const [form, setForm]       = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors]   = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)
  const [resumeOpen, setResumeOpen] = useState(false)

  function handleChange(field: keyof FormState, value: string) {
    const next = { ...form, [field]: value }
    setForm(next)
    if (touched[field]) setErrors(p => ({ ...p, [field]: validate(next)[field] }))
  }

  function handleBlur(field: keyof FormState) {
    setTouched(p => ({ ...p, [field]: true }))
    setErrors(p => ({ ...p, [field]: validate(form)[field] }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSending(true)
    try {
      await emailjs.send(
        EJS_SERVICE,
        EJS_TEMPLATE,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject || 'Full-Stack Web Developer Opportunity',
          message:    form.message,
        },
        EJS_PUBLIC
      )
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTouched({})
    } catch {
      alert('Something went wrong. Please email me directly at ' + meta.email)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section" style={{ paddingTop: '6rem' }}>
      <div className="container">

        {/* ── Header ── */}
        <FadeIn>
          <div style={{ marginBottom: '3rem', maxWidth: 600 }}>
            <h2 id="contact-heading" style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 700,
              letterSpacing: '-0.04em', color: 'var(--color-text)',
              lineHeight: 1.15, marginBottom: '0.875rem',
            }}>
              Let's Build Reliable<br />Web Applications
            </h2>
            <p style={{
              fontSize: 'var(--text-base)', lineHeight: 1.75,
              color: 'var(--color-muted)', maxWidth: 540,
            }}>
              I'm open to Full-Stack Web Developer, Laravel Developer, PHP Developer, and Backend Developer opportunities. If you're hiring for clean web applications, CMS platforms, REST APIs, or business systems, let's connect.
            </p>

            {/* Recruiter mode — quick action banner */}
            <AnimatePresence>
              {isRecruiterMode && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    flexWrap: 'wrap',
                    padding: '0.875rem 1.25rem',
                    background: 'rgba(59,130,246,0.06)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: 'var(--radius-lg)',
                  }}
                >
                  <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em', flex: 1 }}>
                    Interested in hiring? Reach out directly:
                  </span>
                  <a
                    href={`mailto:${meta.email}?subject=Hiring%20Inquiry%20%E2%80%94%20Full-Stack%20Developer&body=Hi%20Faizan%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20an%20opportunity.`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.5rem 1.1rem',
                      fontSize: 'var(--text-sm)', fontWeight: 600,
                      color: '#fff',
                      background: 'var(--color-accent)',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      boxShadow: '0 0 16px rgba(59,130,246,0.35)',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}
                  >
                    <FiMail size={13} /> I’m Interested
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* ── Two-column ── */}
        <div className="contact-grid">

          {/* ── LEFT — Hiring summary card ── */}
          <FadeIn direction="up" style={{ height: '100%' }}>
            <div style={{
              height: '100%',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                height: 3,
                background: 'linear-gradient(90deg, #3B82F6 0%, rgba(59,130,246,0.3) 100%)',
              }} />

              <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>

                {/* Identity */}
                <div>
                  <p style={{
                    fontSize: 'var(--text-lg)', fontWeight: 700,
                    color: 'var(--color-text)', letterSpacing: '-0.03em',
                    marginBottom: '0.2rem',
                  }}>
                    {meta.name}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent-light)', marginBottom: '0.4rem' }}>
                    Full-Stack Web Developer
                  </p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.01em' }}>
                    Islamabad, Pakistan
                  </p>
                </div>

                {/* Availability badge */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 0.875rem',
                  background: 'rgba(52,211,153,0.07)',
                  border: '1px solid rgba(52,211,153,0.18)',
                  borderRadius: 'var(--radius-full)',
                  alignSelf: 'flex-start',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: '#34D399', letterSpacing: '0.01em' }}>
                    Available for Full-Time Opportunities
                  </span>
                </div>

                {/* Summary paragraph */}
                <p style={{
                  fontSize: 'var(--text-sm)', lineHeight: 1.75,
                  color: 'var(--color-muted)', letterSpacing: '-0.01em',
                }}>
                  I build reliable web applications using Laravel, React, Node.js, PHP, and MySQL. My experience includes CMS platforms, REST APIs, business systems, live deployments, and backend engineering for real client projects.
                </p>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {/* Why Work With Me */}
                <div>
                  <p style={{
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.22)', marginBottom: '0.6rem',
                  }}>
                    Why Work With Me
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {WHY_BULLETS.map(item => (
                      <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ color: 'rgba(59,130,246,0.6)', fontSize: 10, flexShrink: 0 }}>•</span>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.01em' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {/* Contact links */}
                <div>
                  <p style={{
                    fontSize: '10px', fontWeight: 600,
                    letterSpacing: '0.07em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.22)', marginBottom: '0.6rem',
                  }}>
                    Contact
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {[
                      { label: 'Gmail',     href: `mailto:${meta.email}`, icon: <SiGmail size={12} />, external: false },
                      { label: 'GitHub',    href: meta.github,            icon: <FiGithub size={12} />,    external: true  },
                      { label: 'LinkedIn',  href: meta.linkedin,          icon: <FiLinkedin size={12} />,  external: true  },
                      { label: 'Resume',    href: meta.resumeUrl,         icon: <FiExternalLink size={12}/>,external: true  },
                    ].map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                          fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.4)',
                          transition: 'color 150ms ease', width: 'fit-content',
                          letterSpacing: '-0.01em',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                      >
                        {link.icon && <span style={{ flexShrink: 0 }}>{link.icon}</span>}
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

                {/* Action buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button
                    onClick={() => copy(meta.email)}
                    aria-label={copied ? 'Email copied' : 'Copy email address'}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.65rem 1rem',
                      fontSize: 'var(--text-sm)', fontWeight: 500,
                      color: copied ? '#34D399' : 'var(--color-text)',
                      background: copied ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.06)',
                      border: `1px solid ${copied ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.14)'}`,
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 200ms ease', width: '100%',
                    }}
                  >
                    {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                    {copied ? 'Email Copied!' : 'Copy Gmail'}
                  </button>

                  <div>
                    <button
                      onClick={() => setResumeOpen(p => !p)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        padding: '0.65rem 1rem',
                        fontSize: 'var(--text-sm)', fontWeight: 500,
                        color: 'rgba(255,255,255,0.45)',
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'color 150ms ease, border-color 150ms ease, background 150ms ease',
                        width: '100%',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--color-text)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <FiDownload size={13} />
                      <span style={{ flex: 1, textAlign: 'center' }}>Download Resume</span>
                      <FiChevronDown size={13} style={{ marginLeft: 'auto', transition: 'transform 200ms', transform: resumeOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                    </button>

                    <AnimatePresence>
                      {resumeOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ overflow: 'hidden', marginTop: '0.375rem' }}
                        >
                          <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.09)',
                            borderRadius: 'var(--radius-lg)',
                            overflow: 'hidden',
                          }}>
                            {[
                              { label: 'Download PDF',  href: meta.resumeUrl,                filename: 'M-Faizan-Khan-Resume.pdf'  },
                              { label: 'Download DOCX', href: '/resume/M Faizan Khan.docx',  filename: 'M-Faizan-Khan-Resume.docx' },
                            ].map((opt, i) => (
                              <a
                                key={opt.label}
                                href={opt.href}
                                download={opt.filename}
                                onClick={() => setResumeOpen(false)}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                                  padding: '0.6rem 1rem',
                                  fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)',
                                  textDecoration: 'none',
                                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                  transition: 'background 150ms, color 150ms',
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                                  e.currentTarget.style.color = 'var(--color-text)'
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.background = 'transparent'
                                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                                }}
                              >
                                <FiDownload size={12} />
                                {opt.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>
          </FadeIn>

          {/* ── RIGHT — Contact form ── */}
          <FadeIn direction="up" delay={0.1} style={{ height: '100%' }}>
            <div style={{
              height: '100%',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 'var(--radius-2xl)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              justifyContent: 'center',
            }}>

              {/* Form heading */}
              <div>
                <p style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', fontWeight: 700,
                  color: 'var(--color-text)', letterSpacing: '-0.03em',
                  lineHeight: 1.2, marginBottom: '0.5rem',
                }}>
                  Let's build something great.
                </p>
                <p style={{
                  fontSize: 'var(--text-sm)', lineHeight: 1.7,
                  color: 'var(--color-muted)', letterSpacing: '-0.01em',
                }}>
                  Whether you're hiring a full-time developer, discussing a project, or simply want to connect, I'd love to hear from you.
                </p>
              </div>

              {/* Currently Seeking */}
              <div style={{
                padding: '1rem 1.25rem',
                background: 'rgba(59,130,246,0.04)',
                border: '1px solid rgba(59,130,246,0.12)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <p style={{
                  fontSize: '10px', fontWeight: 600,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', marginBottom: '0.6rem',
                }}>
                  Currently Seeking
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem 1.25rem' }}>
                  {SEEKING.map(role => (
                    <div key={role} style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{ color: '#60a5fa', fontSize: 10, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.5)', letterSpacing: '-0.01em' }}>
                        {role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}
                aria-label="Contact form"
              >
                <div className="contact-name-email">
                  <Field id={`${uid}-name`} label="Name">
                    <input
                      id={`${uid}-name`} type="text"
                      value={form.name} placeholder="Your name"
                      autoComplete="name"
                      onChange={e => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      style={inputStyle(false)}
                      onFocus={onFocus}
                      onBlurCapture={onBlurInput(false)}
                    />
                  </Field>
                  <Field id={`${uid}-email`} label="Email" error={errors.email}>
                    <input
                      id={`${uid}-email`} type="email"
                      value={form.email} placeholder="your@email.com"
                      autoComplete="email" aria-invalid={!!errors.email}
                      onChange={e => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      style={inputStyle(!!errors.email)}
                      onFocus={onFocus}
                      onBlurCapture={onBlurInput(!!errors.email)}
                    />
                  </Field>
                </div>

                <Field id={`${uid}-subject`} label="Subject">
                  <input
                    id={`${uid}-subject`} type="text"
                    value={form.subject} placeholder="Job opportunity / Project discussion"
                    onChange={e => handleChange('subject', e.target.value)}
                    onBlur={() => handleBlur('subject')}
                    style={inputStyle(false)}
                    onFocus={onFocus}
                    onBlurCapture={onBlurInput(false)}
                  />
                </Field>

                <Field id={`${uid}-message`} label="Message">
                  <textarea
                    id={`${uid}-message`}
                    value={form.message} placeholder="Tell me about your project, opportunity, or idea..."
                    rows={5}
                    onChange={e => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    style={{ ...inputStyle(false), resize: 'vertical', minHeight: 120 }}
                    onFocus={onFocus}
                    onBlurCapture={onBlurInput(false)}
                  />
                </Field>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.85rem 1.75rem',
                      fontSize: 'var(--text-sm)', fontWeight: 600,
                      color: '#fff',
                      background: sending ? 'rgba(59,130,246,0.6)' : 'var(--color-accent)',
                      border: '1px solid transparent',
                      borderRadius: 'var(--radius-lg)',
                      cursor: sending ? 'not-allowed' : 'pointer',
                      transition: 'filter 150ms ease, transform 150ms ease, background 150ms ease',
                      fontFamily: 'inherit',
                      width: '100%',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => {
                      if (!sending) {
                        e.currentTarget.style.filter = 'brightness(1.12)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.filter = ''
                      e.currentTarget.style.transform = ''
                    }}
                  >
                    {sending ? (
                      <>
                        <span style={{
                          width: 13, height: 13,
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: '#fff', borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                          display: 'inline-block', flexShrink: 0,
                        }} />
                        Sending…
                      </>
                    ) : (
                      <><FiSend size={13} /> Send Message</>
                    )}
                  </button>

                  <AnimatePresence>
                    {sent && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                          padding: '0.5rem',
                        }}
                      >
                        <FiCheck size={13} color="#34D399" />
                        <p style={{ fontSize: 'var(--text-xs)', color: '#34D399', fontWeight: 500 }}>
                          Message sent successfully.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>

              {/* Trust strip */}
              <div style={{
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', flexDirection: 'column', gap: '0.35rem',
              }}>
                {TRUST_ITEMS.map(item => (
                  <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ color: '#34D399', fontSize: 10, flexShrink: 0 }}>✔</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', letterSpacing: '-0.01em' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </FadeIn>

        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          align-items: start;
        }
        @media (min-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr 1.35fr;
            gap: 1.5rem;
            align-items: stretch;
          }
        }
        .contact-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 480px) {
          .contact-name-email {
            grid-template-columns: 1fr;
          }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
