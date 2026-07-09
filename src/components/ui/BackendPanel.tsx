import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useRecruiterMode } from '@/context/RecruiterModeContext'
import { meta } from '@/data'
import { FileText } from 'lucide-react'

const EASE = [0.16, 1, 0.3, 1] as const

// ── Pulse dot ─────────────────────────────────────────────────────────────────
function PulseDot({ color = '#34D399' }: { color?: string }) {
  const reduced = useReducedMotion()
  return (
    <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7, flexShrink: 0 }}>
      {!reduced && (
        <motion.span
          animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }}
        />
      )}
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, position: 'relative', zIndex: 1 }} />
    </span>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children, live }: { children: string; live?: boolean }) {
  const reduced = useReducedMotion()
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0.5rem 1rem 0.15rem',
    }}>
      <span style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {children}
      </span>
      {live && (
        <motion.span
          animate={reduced ? {} : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: '#34D399', letterSpacing: '0.06em' }}
        >
          LIVE
        </motion.span>
      )}
    </div>
  )
}

// ── Recruiter metrics ─────────────────────────────────────────────────────────
const RECRUITER_METRICS = [
  { label: 'Notice Period',    value: '0 Days',                   color: '#34D399' },
  { label: 'Projects Shipped', value: '4 Live',                   color: '#60A5FA' },
  { label: 'Preferred Role',   value: 'Full-Stack / Backend',     color: '#A78BFA' },
  { label: 'Work Type',        value: 'Remote / Onsite / Hybrid', color: '#F97316' },
  { label: 'Core Stack',       value: 'Laravel · React · MySQL',  color: '#34D399' },
]

function RecruiterMetrics() {
  return (
    <div style={{ padding: '0.25rem 0' }}>
      {RECRUITER_METRICS.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.07, ease: EASE }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.32rem 1rem',
            borderBottom: i < RECRUITER_METRICS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
          }}
        >
          <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.01em' }}>
            {row.label}
          </span>
          <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: row.color, letterSpacing: '0.02em', fontWeight: 600, flexShrink: 0 }}>
            {row.value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

// ── Experience indicators — real data ─────────────────────────────────────────
const EXP_ROWS = [
  { label: 'Production Applications',  value: '3 Shipped',      color: '#34D399' },
  { label: 'CMS Platforms Built',      value: '2 Platforms',    color: '#60A5FA' },
  { label: 'REST APIs Developed',      value: '5+ Endpoints',   color: '#A78BFA' },
  { label: 'Production Deployments',   value: 'cPanel · SSL',   color: '#F97316' },
  { label: 'Database Systems',         value: 'MySQL · MSSQL',  color: '#34D399' },
]

function ExperienceRows() {
  return (
    <div style={{ padding: '0.25rem 0' }}>
      {EXP_ROWS.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.32rem 1rem',
            borderBottom: i < EXP_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
          }}
        >
          <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.01em' }}>
            {row.label}
          </span>
          <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: row.color, letterSpacing: '0.02em', fontWeight: 600, flexShrink: 0 }}>
            {row.value}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

// ── Live API request stream ───────────────────────────────────────────────────
const ENDPOINTS = [
  { method: 'GET',    path: '/api/products',        status: 200 },
  { method: 'POST',   path: '/api/auth/login',      status: 200 },
  { method: 'GET',    path: '/api/cms/pages',       status: 200 },
  { method: 'PUT',    path: '/api/users/42',        status: 200 },
  { method: 'POST',   path: '/api/orders/store',    status: 201 },
  { method: 'GET',    path: '/api/reports/monthly', status: 200 },
  { method: 'DELETE', path: '/api/sessions/expire', status: 204 },
  { method: 'POST',   path: '/api/queue/dispatch',  status: 202 },
  { method: 'GET',    path: '/api/media/gallery',   status: 200 },
  { method: 'PUT',    path: '/api/cms/content/7',   status: 200 },
]

const METHOD_COLOR: Record<string, string> = {
  GET:    '#60A5FA',
  POST:   '#34D399',
  PUT:    '#A78BFA',
  DELETE: '#F87171',
}

interface LogEntry { id: number; method: string; path: string; status: number; ms: number }

function RequestStream() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const counter = useRef(0)
  const epIdx   = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setLogs(ENDPOINTS.slice(0, 4).map((ep, i) => ({
        id: i, method: ep.method, path: ep.path, status: ep.status, ms: 42,
      })))
      return
    }
    function tick() {
      const ep = ENDPOINTS[epIdx.current % ENDPOINTS.length]
      epIdx.current++
      setLogs(prev => [{
        id: counter.current++,
        method: ep.method,
        path: ep.path,
        status: ep.status,
        ms: Math.floor(Math.random() * 65) + 18,
      }, ...prev].slice(0, 5))
      setTimeout(tick, 1600 + Math.random() * 900)
    }
    const t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [reduced])

  return (
    <div style={{ padding: '0.25rem 0', minHeight: 96 }}>
      <AnimatePresence initial={false}>
        {logs.map(log => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.28rem 1rem',
              fontFamily: 'var(--font-mono)', fontSize: 10.5,
            }}
          >
            <span style={{
              color: METHOD_COLOR[log.method] ?? '#fff',
              fontWeight: 700, width: 44, flexShrink: 0, letterSpacing: '0.02em',
            }}>{log.method}</span>
            <span style={{
              color: 'rgba(255,255,255,0.38)', flex: 1,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{log.path}</span>
            <span style={{ color: '#34D399', flexShrink: 0, width: 28, textAlign: 'right' }}>{log.status}</span>
            <span style={{ color: 'rgba(255,255,255,0.18)', flexShrink: 0, width: 36, textAlign: 'right' }}>{log.ms}ms</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── Stack / environment strip ─────────────────────────────────────────────────
const ENV_ITEMS = [
  { label: 'Laravel 11',  color: 'rgba(249,115,22,0.7)'   },
  { label: 'PHP 8.2',     color: 'rgba(129,140,248,0.6)'  },
  { label: 'MySQL 8',     color: 'rgba(52,211,153,0.6)'   },
  { label: 'React 18',    color: 'rgba(96,165,250,0.6)'   },
  { label: 'Node 20',     color: 'rgba(255,255,255,0.28)' },
]

// ── Deployment status row ─────────────────────────────────────────────────────
const DEPLOY_ROWS = [
  { label: 'Git Version',       value: 'v2.x · main',  dot: '#34D399' },
  { label: 'SSL / DNS',         value: 'Configured',   dot: '#34D399' },
  { label: 'Deployment Target', value: 'cPanel · VPS', dot: '#60A5FA' },
  { label: 'Environment',       value: 'Production',   dot: '#F97316' },
]

function DeployRows() {
  return (
    <div style={{ padding: '0.25rem 0' }}>
      {DEPLOY_ROWS.map((row, i) => (
        <div
          key={row.label}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.3rem 1rem',
            borderBottom: i < DEPLOY_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
          }}
        >
          <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.01em' }}>
            {row.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <PulseDot color={row.dot} />
            <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: row.dot, letterSpacing: '0.02em', fontWeight: 600 }}>
              {row.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Recruiter Status Bar ─────────────────────────────────────────────────────
export function RecruiterStatusBar() {
  const { isRecruiterMode, toggle } = useRecruiterMode()

  function openCVModal() { window.dispatchEvent(new Event('open-cv-modal')) }

  return (
    <AnimatePresence>
      {isRecruiterMode && (
        <motion.div
          initial={{ y: 56, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 56, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9000,
            background: 'rgba(9,9,11,0.97)',
            borderTop: '1px solid rgba(59,130,246,0.2)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* glow line */}
          <div style={{
            position: 'absolute', top: -1, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, #3b82f6 30%, #93c5fd 50%, #3b82f6 70%, transparent)',
            opacity: 0.8, pointerEvents: 'none',
          }} />

          <div style={{
            maxWidth: 'var(--container-max)', margin: '0 auto',
            padding: '0.45rem 1.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '1rem', flexWrap: 'wrap',
          }}>

            {/* Left — pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', flexShrink: 0,
                  boxShadow: '0 0 8px rgba(59,130,246,0.9)',
                  animation: 'rsb-pulse 1.4s ease-in-out infinite',
                }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Recruiter Mode
                </span>
              </div>
              <span style={{ color: 'rgba(255,255,255,0.12)', fontSize: 12 }}>|</span>
              {[
                { label: 'Notice Period', value: '0 Days',              color: '#34D399' },
                { label: 'Available',     value: 'Immediately',         color: '#34D399' },
                { label: 'Stack',         value: 'Laravel · React · MySQL', color: '#60a5fa' },
                { label: 'Work Type',     value: 'Remote · Onsite',     color: '#a78bfa' },
              ].map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-mono)' }}>{item.label}:</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'var(--font-mono)' }}>{item.value}</span>
                  {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.1)', marginLeft: '0.2rem' }}>·</span>}
                </div>
              ))}
            </div>

            {/* Right — actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
              <a
                href={`mailto:${meta.email}?subject=Hiring%20Inquiry%20%E2%80%94%20Full-Stack%20Developer&body=Hi%20Faizan%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20an%20opportunity.`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  height: 28, padding: '0 0.75rem',
                  fontSize: 11, fontWeight: 600, color: '#fff',
                  background: 'var(--color-accent)',
                  borderRadius: 6, textDecoration: 'none',
                  boxShadow: '0 0 12px rgba(59,130,246,0.4)',
                  whiteSpace: 'nowrap',
                }}
              >
                ✉ I'm Interested
              </a>
              <button
                onClick={openCVModal}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  height: 28, padding: '0 0.7rem',
                  fontSize: 11, fontWeight: 500,
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                }}
              >
                <FileText size={10} strokeWidth={2} /> Resume
              </button>
              <button
                onClick={toggle}
                title="Exit Recruiter Mode"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28,
                  fontSize: 16, lineHeight: 1,
                  color: 'rgba(255,255,255,0.25)',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 6, cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                ×
              </button>
            </div>
          </div>

          <style>{`
            @keyframes rsb-pulse {
              0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(59,130,246,0.9); }
              50%       { opacity: 0.4; box-shadow: none; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export function BackendPanel() {
  const reduced = useReducedMotion()
  const { isRecruiterMode } = useRecruiterMode()

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
      style={{ width: '100%', maxWidth: 440, flexShrink: 0 }}
      aria-hidden
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ position: 'relative' }}>
          {/* Outer glow */}
          <div style={{
            position: 'absolute', inset: -1,
            borderRadius: 16,
            background: isRecruiterMode
              ? 'radial-gradient(ellipse at 60% 0%, rgba(59,130,246,0.12) 0%, transparent 65%)'
              : 'radial-gradient(ellipse at 60% 0%, rgba(59,130,246,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
            transition: 'background 400ms ease',
          }} />

          <div style={{
            background: 'rgba(10,10,13,0.94)',
            border: `1px solid ${isRecruiterMode ? 'rgba(59,130,246,0.18)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.03)',
              '0 24px 64px rgba(0,0,0,0.65)',
              isRecruiterMode ? '0 0 60px rgba(59,130,246,0.1)' : '0 0 60px rgba(59,130,246,0.05)',
            ].join(', '),
            transition: 'border-color 400ms ease, box-shadow 400ms ease',
          }}>

            {/* ── Header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 1rem', height: 44,
              background: 'rgba(255,255,255,0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <PulseDot color={isRecruiterMode ? '#60A5FA' : '#34D399'} />
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    {isRecruiterMode ? 'Recruiter Summary' : 'Production Console'}
                  </div>
                  <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                    {isRecruiterMode ? 'M. Faizan Khan · Full-Stack Developer' : 'Laravel · React · MySQL · REST API'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
                  {isRecruiterMode ? 'mode:recruiter' : 'env:prod'}
                </span>
                <span style={{
                  fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: isRecruiterMode ? '#60A5FA' : '#34D399',
                  background: isRecruiterMode ? 'rgba(96,165,250,0.1)' : 'rgba(52,211,153,0.1)',
                  border: `1px solid ${isRecruiterMode ? 'rgba(96,165,250,0.2)' : 'rgba(52,211,153,0.2)'}`,
                  borderRadius: 5, padding: '2px 7px', letterSpacing: '0.05em',
                  transition: 'all 300ms ease',
                }}>
                  {isRecruiterMode ? 'HIRE' : 'LIVE'}
                </span>
              </div>
            </div>

            {/* ── Top section: swap between recruiter metrics and experience rows ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isRecruiterMode ? 'recruiter' : 'normal'}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <SectionLabel live={!isRecruiterMode}>
                  {isRecruiterMode ? 'Recruiter Metrics' : 'Engineering Experience'}
                </SectionLabel>
                {isRecruiterMode ? <RecruiterMetrics /> : <ExperienceRows />}
              </motion.div>
            </AnimatePresence>

            {/* ── API stream — hidden in recruiter mode ── */}
            <AnimatePresence>
              {!isRecruiterMode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}
                >
                  <SectionLabel live>API Request Stream</SectionLabel>
                  <RequestStream />
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Deployment status ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SectionLabel>Deployment Status</SectionLabel>
              <DeployRows />
            </div>

            {/* ── Stack strip ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.55rem 1rem',
              background: 'rgba(255,255,255,0.01)',
              flexWrap: 'wrap',
            }}>
              {ENV_ITEMS.map(t => (
                <span key={t.label} style={{
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  color: t.color, letterSpacing: '0.02em',
                }}>
                  {t.label}
                </span>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
