import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}
