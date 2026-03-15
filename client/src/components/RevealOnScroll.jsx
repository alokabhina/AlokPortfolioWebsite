import { useEffect, useRef } from 'react'

/**
 * RevealOnScroll - CSS only, no Framer Motion
 * Lightweight IntersectionObserver based reveal
 */
export default function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial hidden state via style
    el.style.opacity = '0'
    el.style.transition = `opacity 0.45s ease ${delay}s, transform 0.45s ease ${delay}s`

    const offsets = {
      up:    'translateY(20px)',
      left:  'translateX(-20px)',
      right: 'translateX(20px)',
      down:  'translateY(-12px)',
    }
    el.style.transform = offsets[direction] || offsets.up

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translate(0,0)'
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}