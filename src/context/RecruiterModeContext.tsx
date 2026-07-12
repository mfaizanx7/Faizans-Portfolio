import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'

interface RecruiterModeCtx {
  isRecruiterMode: boolean
  isScanning: boolean
  toggle: () => void
}

const RecruiterModeContext = createContext<RecruiterModeCtx>({
  isRecruiterMode: false,
  isScanning: false,
  toggle: () => {},
})

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false)
  const [isScanning, setIsScanning]           = useState(false)
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const toggle = useCallback(() => {
    setIsScanning(true)
    if (scanTimer.current) clearTimeout(scanTimer.current)
    scanTimer.current = setTimeout(() => {
      setIsRecruiterMode(p => !p)
      setIsScanning(false)
    }, 520)
  }, [])

  useEffect(() => () => { if (scanTimer.current) clearTimeout(scanTimer.current) }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'r' || e.key === 'R') toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])

  useEffect(() => {
    document.title = isRecruiterMode
      ? 'Muhammad Faizan Khan — Hiring'
      : 'Muhammad Faizan Khan — Full-Stack Developer'
  }, [isRecruiterMode])

  return (
    <RecruiterModeContext.Provider value={{ isRecruiterMode, isScanning, toggle }}>

      {/* ── Global page tint when recruiter mode is ON ── */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.055) 0%, transparent 65%)',
        opacity: isRecruiterMode ? 1 : 0,
        transition: 'opacity 600ms ease',
      }} />

      {children}

      {/* ── Scan animation overlay ── */}
      {isScanning && (
        <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 3,
            background: 'linear-gradient(90deg, transparent 0%, #1d4ed8 10%, #3b82f6 30%, #93c5fd 50%, #3b82f6 70%, #1d4ed8 90%, transparent 100%)',
            boxShadow: '0 0 32px 8px rgba(59,130,246,0.9), 0 0 80px 20px rgba(59,130,246,0.3)',
            animation: 'rm-scan 0.52s cubic-bezier(0.4,0,0.2,1) forwards',
          }} />
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 180,
            background: 'linear-gradient(to bottom, rgba(59,130,246,0.09) 0%, transparent 100%)',
            animation: 'rm-scan-trail 0.52s cubic-bezier(0.4,0,0.2,1) forwards',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: isRecruiterMode
              ? 'rgba(59,130,246,0.0)'
              : 'rgba(59,130,246,0.05)',
            animation: 'rm-flash 0.52s ease forwards',
          }} />
          <style>{`
            @keyframes rm-scan {
              from { top: -3px; opacity: 1; }
              to   { top: 100%; opacity: 0.2; }
            }
            @keyframes rm-scan-trail {
              from { top: -180px; opacity: 1; }
              to   { top: 100%;   opacity: 0; }
            }
            @keyframes rm-flash {
              0%   { opacity: 0; }
              15%  { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </RecruiterModeContext.Provider>
  )
}

export const useRecruiterMode = () => useContext(RecruiterModeContext)
