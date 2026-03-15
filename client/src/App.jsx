import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'

// ── Global layout components (NOT lazy — always needed) ──────
import Navbar          from '@/components/Navbar'
import Footer          from '@/components/Footer'
import ScrollProgress  from '@/components/ScrollProgress'
import ProtectedRoute  from '@/components/ProtectedRoute'
import { useAnalytics } from '@/hooks'
import LeadPopup from '@/components/Leadpopup'

// ── Lazy loaded pages — each becomes a separate JS chunk ─────
const Home           = lazy(() => import('@/pages/Home'))
const About          = lazy(() => import('@/pages/About'))
const Skills         = lazy(() => import('@/pages/Skills'))
const Projects       = lazy(() => import('@/pages/Projects'))
const Teaching       = lazy(() => import('@/pages/Teaching'))
const Experience     = lazy(() => import('@/pages/Experience'))
const Gallery        = lazy(() => import('@/pages/Gallery'))
const Contact        = lazy(() => import('@/pages/Contact'))
const Blog           = lazy(() => import('@/pages/Blog'))
const AdminLogin     = lazy(() => import('@/pages/AdminLogin'))
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
const Services       = lazy(() => import('@/pages/Services'))

// ── Minimal page-level loading fallback ─────────────────────
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '2px solid var(--border)',
          borderTop: '2px solid var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}
      />
    </div>
  )
}

// ── Scroll to top on every route change ─────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}


// ── Dark mode animated lines (vertical + horizontal = square feel) ─
function GridLines() {
  return (
    <>
      <div className="grid-vline-1"/>
      <div className="grid-vline-2"/>
      <div className="grid-hline-1"/>
      <div className="grid-hline-2"/>
    </>
  )
}

// ── WhatsApp floating button (global, all pages) ─────────────
function WhatsAppFloat() {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER || '91XXXXXXXXXX'
  const msg   = encodeURIComponent('Hello! I saw your portfolio and wanted to connect.')
  const href  = `https://wa.me/${phone}?text=${msg}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float"
    >
      {/* WhatsApp SVG icon */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}

// ── Main App layout wrapper ──────────────────────────────────
function AppLayout() {
  useAnalytics() // tracks page visits on every route change
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <WhatsAppFloat />
      <LeadPopup />
      <GridLines />

      <Suspense fallback={<PageLoader />}>

          <Routes>
            <Route path="/"                  element={<Home />} />
            <Route path="/about"             element={<About />} />
            <Route path="/services"          element={<Services />} />
            <Route path="/skills"            element={<Skills />} />
            <Route path="/projects"          element={<Projects />} />
            <Route path="/teaching"          element={<Teaching />} />
            <Route path="/experience"        element={<Experience />} />
            <Route path="/gallery"           element={<Gallery />} />
            <Route path="/contact"           element={<Contact />} />
            <Route path="/blog"              element={<Blog />} />
            <Route path="/admin-login"       element={<AdminLogin />} />
            <Route path="/admin-dashboard"   element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
            {/* 404 fallback */}
            <Route path="*" element={
              <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'16px', background:'var(--bg-primary)' }}>
                <h1 style={{ fontFamily:'Syne', fontSize:'4rem', color:'var(--accent)', fontWeight:800 }}>404</h1>
                <p style={{ color:'var(--text-secondary)', fontFamily:'DM Mono', fontSize:'0.9rem' }}>Page not found</p>
                <a href="/" style={{ color:'var(--accent)', fontFamily:'DM Mono', fontSize:'0.85rem', border:'1px solid var(--accent)', padding:'10px 24px', borderRadius:'6px' }}>
                  Go Home
                </a>
              </div>
            } />
          </Routes>

      </Suspense>

      <Footer />
    </>
  )
}

// ── Root export ──────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}