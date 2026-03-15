import { useState, useEffect, useRef } from 'react'

/**
 * useScrollSpy
 * Watches multiple section IDs and returns the one currently in view.
 * Used for Navbar active link highlighting.
 *
 * @param {string[]} sectionIds  - Array of section element IDs e.g. ['about','skills']
 * @param {number}   offset      - Top offset in px (navbar height). Default 80.
 */
export function useScrollSpy(sectionIds, offset = 80) {
  const [activeId, setActiveId] = useState('')
  const observer = useRef(null)

  useEffect(() => {
    // Cleanup previous observer
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: 0,
      }
    )

    const obs = observer.current
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [sectionIds, offset])

  return activeId
}