import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * LazyImage
 * Loads image only when in viewport.
 * Shows blur placeholder until loaded, then transitions to sharp.
 *
 * @param {string} src        - Real image URL
 * @param {string} alt        - Alt text
 * @param {string} className  - Additional classes for the img
 * @param {string} wrapClass  - Additional classes for the wrapper div
 */
export default function LazyImage({ src, alt = '', className = '', wrapClass = '', style = {} }) {
  const [loaded, setLoaded] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const el = imgRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' } // start loading 300px before entering viewport
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={cn('lazy-image-wrapper', wrapClass)} style={style}>
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={cn(className, loaded ? 'loaded' : '')}
          loading="lazy"
          decoding="async"
        />
      )}
      {/* Skeleton while not loaded */}
      {!loaded && (
        <div className="absolute inset-0 bg-navy-mid animate-pulse" />
      )}
    </div>
  )
}