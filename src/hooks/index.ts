import { useEffect, useRef, useState, useCallback } from 'react'

/* ── useReducedMotion ─────────────────────────────────────── */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

/* ── useInView ────────────────────────────────────────────── */
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

/* ── useScrollProgress ────────────────────────────────────── */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? scrollTop / total : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}

/* ── useActiveSection ─────────────────────────────────────── */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')])

  return active
}

/* ── useScrolled ──────────────────────────────────────────── */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}

/* ── useCopyToClipboard ───────────────────────────────────── */
export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), resetDelay)
    })
  }, [resetDelay])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  return { copied, copy }
}

/* ── useMobileMenu ────────────────────────────────────────── */
export function useMobileMenu() {
  const [open, setOpen] = useState(false)
  const firstItemRef = useRef<HTMLAnchorElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const openMenu = useCallback(() => {
    setOpen(true)
    requestAnimationFrame(() => firstItemRef.current?.focus())
  }, [])

  const closeMenu = useCallback(() => {
    setOpen(false)
    requestAnimationFrame(() => toggleRef.current?.focus())
  }, [])

  const toggle = useCallback(() => {
    if (open) closeMenu()
    else openMenu()
  }, [open, openMenu, closeMenu])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, closeMenu])

  return { open, toggle, closeMenu, firstItemRef, toggleRef }
}
