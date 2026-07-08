import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

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

// ── Live API request stream — real Laravel-style endpoints ────────────────────
const ENDPOINTS = [
  { method: 'GET',    path: '/api/products',           status: 200 },
  { method: 'POST',   path: '/api/auth/login',         status: 200 },
  { method: 'GET',    path: '/api/cms/pages',          status: 200 },
  { method: 'PUT',    path: '/api/users/42',           status: 200 },
  { method: 'POST',   path: '/api/orders/store',       status: 201 },
  { method: 'GET',    path: '/api/reports/monthly',    status: 200 },
  { method: 'DELETE', path: '/api/sessions/expire',    status: 204 },
  { method: 'POST',   path: '/api/queue/dispatch',     status: 202 },
  { method: 'GET',    path: '/api/media/gallery',      status: 200 },
  { method: 'PUT',    path: '/api/cms/content/7',      status: 200 },
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
  { label: 'Laravel 11',  color: 'rgba(249,115,22,0.7)'  },
  { label: 'PHP 8.2',     color: 'rgba(129,140,248,0.6)' },
  { label: 'MySQL 8',     color: 'rgba(52,211,153,0.6)'  },
  { label: 'React 18',    color: 'rgba(96,165,250,0.6)'  },
  { label: 'Node 20',     color: 'rgba(255,255,255,0.28)' },
]

// ── Deployment status row ─────────────────────────────────────────────────────
const DEPLOY_ROWS = [
  { label: 'Git Version',        value: 'v2.x · main',   dot: '#34D399' },
  { label: 'SSL / DNS',          value: 'Configured',    dot: '#34D399' },
  { label: 'Deployment Target',  value: 'cPanel · VPS',  dot: '#60A5FA' },
  { label: 'Environment',        value: 'Production',    dot: '#F97316' },
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

// ── Main component ────────────────────────────────────────────────────────────
export function BackendPanel() {
  const reduced = useReducedMotion()

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
            background: 'radial-gradient(ellipse at 60% 0%, rgba(59,130,246,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            background: 'rgba(10,10,13,0.94)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.03)',
              '0 24px 64px rgba(0,0,0,0.65)',
              '0 0 60px rgba(59,130,246,0.05)',
            ].join(', '),
          }}>

            {/* ── Header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 1rem',
              height: 44,
              background: 'rgba(255,255,255,0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <PulseDot color="#34D399" />
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    Production Console
                  </div>
                  <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                    Laravel · React · MySQL · REST API
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{
                  fontSize: 9, fontFamily: 'var(--font-mono)',
                  color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em',
                }}>
                  env:prod
                </span>
                <span style={{
                  fontSize: 9.5, fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: '#34D399',
                  background: 'rgba(52,211,153,0.1)',
                  border: '1px solid rgba(52,211,153,0.2)',
                  borderRadius: 5,
                  padding: '2px 7px',
                  letterSpacing: '0.05em',
                }}>
                  LIVE
                </span>
              </div>
            </div>

            {/* ── Experience indicators ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SectionLabel>Engineering Experience</SectionLabel>
              <ExperienceRows />
            </div>

            {/* ── Live request stream ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SectionLabel live>API Request Stream</SectionLabel>
              <RequestStream />
            </div>

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
