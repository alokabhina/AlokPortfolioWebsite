import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * useAnalytics
 * Tracks page visits by sending a POST request to the backend
 * analytics endpoint on every route change.
 *
 * - Fires once per unique pathname
 * - Sends: page path, referrer, basic device info
 * - Gracefully fails — analytics should never break the UI
 *
 * Use this hook ONCE in App.jsx or AppLayout.
 */
export function useAnalytics() {
  const location = useLocation()

  useEffect(() => {
    const controller = new AbortController()

    const track = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'

        await fetch(`${apiUrl}/api/analytics/track`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          signal:  controller.signal,
          body: JSON.stringify({
            page:      location.pathname,
            referrer:  document.referrer || 'direct',
            userAgent: navigator.userAgent,
            device:    window.innerWidth < 768 ? 'mobile'
                     : window.innerWidth < 1024 ? 'tablet'
                     : 'desktop',
          }),
        })
      } catch (err) {
        // Ignore AbortError (component unmounted) and network errors
        // Analytics should never crash the app
        if (err.name !== 'AbortError') {
          console.debug('[Analytics] Track failed silently:', err.message)
        }
      }
    }

    // Small delay so it doesn't block page render
    const timer = setTimeout(track, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [location.pathname])
}