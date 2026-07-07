import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

// ── Pulse dot ────────────────────────────────────────────────────────────────
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

// ── Architecture flow ─────────────────────────────────────────────────────────
const FLOW_NODES = ['React UI', 'REST API', 'Laravel', 'MySQL']
const FLOW_COLORS = ['#60A5FA', '#A78BFA', '#F97316', '#34D399']

function ArchFlow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '0.75rem 1rem' }}>
      {FLOW_NODES.map((node, i) => (
        <div key={node} style={{ display: 'flex', alignItems: 'center', flex: i < FLOW_NODES.length - 1 ? 1 : 0 }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, flexShrink: 0,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: FLOW_COLORS[i],
              boxShadow: `0 0 6px ${FLOW_COLORS[i]}55`,
            }} />
            <span style={{
              fontSize: 9.5, fontFamily: 'var(--font-mono)',
              color: FLOW_COLORS[i], letterSpacing: '0.02em',
              whiteSpace: 'nowrap',
            }}>{node}</span>
          </div>
          {i < FLOW_NODES.length - 1 && (
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 4px', marginBottom: 14 }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── System health ─────────────────────────────────────────────────────────────
const HEALTH_ROWS = [
  { label: 'API Gateway',     status: 'Online'    },
  { label: 'Authentication',  status: 'Secured'   },
  { label: 'Database',        status: 'Connected' },
  { label: 'Deployment',      status: 'Stable'    },
]

function HealthRows() {
  return (
    <div style={{ padding: '0.25rem 0' }}>
      {HEALTH_ROWS.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: EASE }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.35rem 1rem',
            borderBottom: i < HEALTH_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
          }}
        >
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.01em' }}>
            {row.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <PulseDot color="#34D399" />
            <span style={{ fontSize: 10.5, fontFamily: 'var(--font-mono)', color: '#34D399', letterSpacing: '0.03em' }}>
              {row.status}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ── Live request stream ───────────────────────────────────────────────────────
const ENDPOINTS = [
  { method: 'GET',    path: '/api/products',      status: 200 },
  { method: 'POST',   path: '/api/orders',         status: 201 },
  { method: 'GET',    path: '/api/users',          status: 200 },
  { method: 'POST',   path: '/api/auth/login',     status: 200 },
  { method: 'DELETE', path: '/api/sessions',       status: 204 },
  { method: 'GET',    path: '/api/reports',        status: 200 },
  { method: 'PUT',    path: '/api/users/12',       status: 200 },
  { method: 'POST',   path: '/api/queue/dispatch', status: 202 },
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
      // populate static snapshot
      const entries = ENDPOINTS.slice(0, 4).map((ep, i) => ({
        id: i, method: ep.method, path: ep.path, status: ep.status, ms: 45,
      }))
      setLogs(entries)
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
        ms: Math.floor(Math.random() * 70) + 18,
      }, ...prev].slice(0, 5))
      setTimeout(tick, 1600 + Math.random() * 900)
    }
    const t = setTimeout(tick, 500)
    return () => clearTimeout(t)
  }, [reduced])

  return (
    <div style={{ padding: '0.25rem 0', minHeight: 100 }}>
      <AnimatePresence initial={false}>
        {logs.map(log => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.3rem 1rem',
              fontFamily: 'var(--font-mono)', fontSize: 10.5,
            }}
          >
            <span style={{
              color: METHOD_COLOR[log.method] ?? '#fff',
              fontWeight: 700, width: 44, flexShrink: 0, letterSpacing: '0.02em',
            }}>{log.method}</span>
            <span style={{
              color: 'rgba(255,255,255,0.4)', flex: 1,
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

// ── Metric mini cards ─────────────────────────────────────────────────────────
const MINI_METRICS = [
  { label: 'Uptime',   value: '99.9%',   color: '#34D399' },
  { label: 'Response', value: '90ms',    color: '#60A5FA' },
  { label: 'Stack',    value: 'Laravel', color: '#F97316' },
]

function MiniMetrics() {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem' }}>
      {MINI_METRICS.map(m => (
        <div key={m.label} style={{
          flex: 1,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 8,
          padding: '0.5rem 0.625rem',
          display: 'flex', flexDirection: 'column', gap: 3,
        }}>
          <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {m.label}
          </span>
          <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 600, color: m.color, letterSpacing: '-0.01em' }}>
            {m.value}
          </span>
        </div>
      ))}
    </div>
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

// ── Main component ────────────────────────────────────────────────────────────
const TECH_STRIP = [
  { label: 'Laravel', color: 'rgba(249,115,22,0.6)'  },
  { label: 'PHP',     color: 'rgba(129,140,248,0.5)' },
  { label: 'MySQL',   color: 'rgba(52,211,153,0.5)'  },
  { label: 'React',   color: 'rgba(96,165,250,0.5)'  },
  { label: 'Node',    color: 'rgba(255,255,255,0.25)' },
]

export function BackendPanel() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      style={{ width: '100%', maxWidth: 440, flexShrink: 0 }}
      aria-hidden
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Outer glow */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', inset: -1,
            borderRadius: 16,
            background: 'radial-gradient(ellipse at 60% 0%, rgba(59,130,246,0.08) 0%, transparent 65%)',
            pointerEvents: 'none',
          }} />

          <div style={{
            background: 'rgba(10,10,13,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: [
              '0 0 0 1px rgba(255,255,255,0.03)',
              '0 24px 64px rgba(0,0,0,0.65)',
              '0 0 80px rgba(59,130,246,0.05)',
              '0 0 40px rgba(52,211,153,0.03)',
            ].join(', '),
          }}>

            {/* ── Header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 1rem',
              height: 42,
              background: 'rgba(255,255,255,0.02)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <PulseDot color="#34D399" />
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                    Production System
                  </div>
                  <div style={{ fontSize: 9.5, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.02em', lineHeight: 1.2 }}>
                    Laravel · React · MySQL · REST APIs
                  </div>
                </div>
              </div>
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

            {/* ── Architecture flow ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SectionLabel>Architecture</SectionLabel>
              <ArchFlow />
            </div>

            {/* ── System health ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SectionLabel>System Health</SectionLabel>
              <HealthRows />
            </div>

            {/* ── Live request stream ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <SectionLabel live>Request Stream</SectionLabel>
              <RequestStream />
            </div>

            {/* ── Mini metrics ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <MiniMetrics />
            </div>

            {/* ── Tech strip ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.01)',
            }}>
              {TECH_STRIP.map(t => (
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
