import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout }      from '@/components/layout/Layout'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { SkipLink, CVModal } from '@/components/ui'
import { meta } from '@/data'

const HomePage      = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const CaseStudyPage = lazy(() => import('@/pages/CaseStudyPage').then(m => ({ default: m.CaseStudyPage })))
const NotFoundPage  = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 32, height: 32,
        border: '2px solid rgba(255,255,255,0.08)',
        borderTopColor: 'var(--color-accent)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function App() {
  const [cvOpen, setCvOpen] = useState(false)

  useEffect(() => {
    const handler = () => setCvOpen(true)
    window.addEventListener('open-cv-modal', handler)
    return () => window.removeEventListener('open-cv-modal', handler)
  }, [])

  return (
    <BrowserRouter>
      <SkipLink />
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"           element={<HomePage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/404"        element={<NotFoundPage />} />
            <Route path="*"           element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} pdfUrl={meta.resumeUrl} />
    </BrowserRouter>
  )
}
