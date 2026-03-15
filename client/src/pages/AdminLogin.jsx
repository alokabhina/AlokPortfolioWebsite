import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SEO } from '@/components'
import { api } from '@/lib'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )
}

export default function AdminLogin() {
  const navigate  = useNavigate()
  const apiBase   = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const hasError  = new URLSearchParams(window.location.search).get('error')
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    api.get('/api/auth/me')
      .then(() => navigate('/admin-dashboard', { replace: true }))
      .catch(() => setChecked(true))
  }, [])

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--bg-primary)' }}>
        <div style={{
          width: '32px', height: '32px',
          border: '2px solid var(--border)',
          borderTop: '2px solid var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}/>
      </div>
    )
  }

  return (
    <>
      <SEO title="Admin Login" path="/admin-login" />
      <main className="min-h-screen flex items-center justify-center page-top px-4"
        style={{ background: 'var(--bg-primary)' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-sm"
        >
          <div className="p-8 rounded-2xl"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>

            <div className="text-center mb-8">
              <div className="font-display font-extrabold text-2xl mb-2"
                style={{ color: 'var(--text-heading)', letterSpacing: '-0.03em' }}>
                {'<'}<span style={{ color: 'var(--accent)' }}>AA</span>{' />'}
              </div>
              <p className="font-mono text-xs uppercase tracking-widest"
                style={{ color: 'var(--accent)' }}>Admin Access</p>
            </div>

            <h1 className="font-display font-bold text-xl text-center mb-2"
              style={{ color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
              Sign in to Dashboard
            </h1>
            <p className="text-sm text-center mb-8" style={{ color: 'var(--text-secondary)' }}>
              Only authorized Gmail can access this panel.
            </p>

            {hasError && (
              <div className="mb-6 px-4 py-3 rounded-lg text-sm font-mono text-center"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}>
                Unauthorized email. Only admin Gmail allowed.
              </div>
            )}

            <button
              onClick={() => { window.location.href = `${apiBase}/api/auth/google` }}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-heading)', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <GoogleIcon />
              Continue with Google
            </button>

            <p className="mt-6 text-xs text-center font-mono" style={{ color: 'var(--text-secondary)' }}>
              This page is not publicly linked.
            </p>
          </div>

          <div className="text-center mt-5">
            <a href="/" className="font-mono text-xs"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              ← Back to portfolio
            </a>
          </div>
        </motion.div>
      </main>
    </>
  )
}