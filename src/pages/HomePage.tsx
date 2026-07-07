import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero, Projects, Experience, AboutSkills, Contact } from '@/components/sections'
import { meta } from '@/data'

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    document.title = `${meta.name} — ${meta.role}`
  }, [])

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    if (state?.scrollTo) {
      const el = document.getElementById(state.scrollTo)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.state])

  return (
    <main id="main-content" tabIndex={-1} style={{ paddingTop: 'var(--navbar-h)' }}>
      <Hero />
      <Projects />
      <Experience />
      <AboutSkills />
      <Contact />
    </main>
  )
}
