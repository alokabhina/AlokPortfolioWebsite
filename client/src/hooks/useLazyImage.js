import { useState, useEffect, useRef } from 'react'

/**
 * useLazyImage
 * Returns a ref to attach to an img element.
 * Image starts blurred and transitions to sharp when loaded + in viewport.
 */
export function useLazyImage() {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    // If already cached/complete
    if (el.complete && el.naturalWidth > 0) {
      setLoaded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Set the real src from data-src
          if (el.dataset.src) {
            el.src = el.dataset.src
          }
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    const handleLoad = () => setLoaded(true)
    el.addEventListener('load', handleLoad)
    observer.observe(el)

    return () => {
      observer.disconnect()
      el.removeEventListener('load', handleLoad)
    }
  }, [])

  return { imgRef, loaded }
}