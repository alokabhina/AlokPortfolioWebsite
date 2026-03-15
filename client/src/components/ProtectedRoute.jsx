import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { api } from '@/lib'

// Cache auth result for the session - prevents repeated calls
let authCache = null

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState(authCache || 'loading')

  useEffect(() => {
    // If already checked this session, skip API call
    if (authCache === 'ok') {
      setStatus('ok')
      return
    }
    if (authCache === 'fail') {
      setStatus('fail')
      return
    }

    api.get('/api/auth/me')
      .then(() => {
        authCache = 'ok'
        setStatus('ok')
      })
      .catch(() => {
        authCache = 'fail'
        setStatus('fail')
      })
  }, [])

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-primary)',
      }}>
        <div style={{
          width: '36px', height: '36px',
          border: '2px solid var(--border)',
          borderTop: '2px solid var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }}/>
      </div>
    )
  }

  if (status === 'fail') return <Navigate to="/admin-login" replace />
  return children
}

// Export cache reset for logout
export function clearAuthCache() { authCache = null }