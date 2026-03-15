import { useState, useEffect, useRef } from 'react'
import { api } from '@/lib'

// Module-level cache - survives re-renders, cleared on page refresh
const fetchCache = new Map()

export function useFetch(endpoint, staticData = []) {
  const [data,    setData]    = useState(() => fetchCache.get(endpoint) || staticData)
  const [loading, setLoading] = useState(!fetchCache.has(endpoint))
  const [error,   setError]   = useState(null)
  const fetching = useRef(false)

  useEffect(() => {
    // Already cached - skip
    if (fetchCache.has(endpoint)) {
      setData(fetchCache.get(endpoint))
      setLoading(false)
      return
    }

    // Already fetching this endpoint - skip
    if (fetching.current) return
    fetching.current = true

    let cancelled = false
    api.get(endpoint)
      .then(({ data: res }) => {
        if (!cancelled) {
          const result = res?.length > 0 ? res : (Array.isArray(staticData) ? staticData : res)
          fetchCache.set(endpoint, result)
          setData(result)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setData(staticData)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [endpoint])

  return { data, loading, error }
}