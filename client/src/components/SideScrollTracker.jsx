import { useEffect, useState } from 'react'
import { cn } from '@/lib'

/**
 * SideScrollTracker
 * Fixed left sidebar with dots + vertical fill line.
 * Shows which section/item is currently in view as user scrolls.
 * Only visible on lg+ screens.
 *
 * @param {Array}  items        - [{ id: 'sectionId', label: 'Label' }]
 * @param {string} activeId     - Currently active section id
 * @param {function} onDotClick - Scroll to section on dot click
 *
 * Used on: Skills page (categories), Projects page (project numbers)
 */
export default function SideScrollTracker({ items = [], activeId = '', onDotClick }) {
  const [fillPercent, setFillPercent] = useState(0)

  // Calculate fill percentage based on active item index
  useEffect(() => {
    const idx = items.findIndex(item => item.id === activeId)
    if (idx === -1 || items.length <= 1) {
      setFillPercent(0)
      return
    }
    setFillPercent((idx / (items.length - 1)) * 100)
  }, [activeId, items])

  if (items.length === 0) return null

  return (
    <div
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center"
      style={{ gap: 0 }}
    >
      {items.map((item, idx) => {
        const isActive = item.id === activeId
        const isPast   = items.findIndex(i => i.id === activeId) > idx

        return (
          <div key={item.id} className="flex flex-col items-center" style={{ gap: 0 }}>

            {/* Dot */}
            <button
              onClick={() => onDotClick?.(item.id)}
              aria-label={`Go to ${item.label}`}
              className="relative flex items-center justify-center group"
              style={{ width: '24px', height: '24px' }}
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-300',
                  isActive
                    ? 'w-[10px] h-[10px] scale-110'
                    : 'w-[7px] h-[7px]'
                )}
                style={{
                  background: isActive
                    ? 'var(--accent)'
                    : isPast
                    ? 'var(--accent-mid)'
                    : 'var(--border)',
                  boxShadow: isActive ? '0 0 8px var(--accent)' : 'none',
                  border: isActive ? 'none' : '1.5px solid var(--border)',
                }}
              />

              {/* Label — shows on active or hover */}
              <span
                className={cn(
                  'absolute left-5 whitespace-nowrap font-mono text-[11px]',
                  'transition-all duration-200 pointer-events-none',
                  'opacity-0 group-hover:opacity-100',
                  isActive && 'opacity-100'
                )}
                style={{ color: 'var(--accent)' }}
              >
                {item.label}
              </span>
            </button>

            {/* Connecting line between dots (not after last dot) */}
            {idx < items.length - 1 && (
              <div
                className="relative overflow-hidden"
                style={{
                  width:      '1px',
                  height:     '40px',
                  background: 'var(--border)',
                }}
              >
                {/* Fill line — animates down as user scrolls */}
                <div
                  className="absolute top-0 left-0 w-full transition-all duration-500 ease-out"
                  style={{
                    background: 'var(--accent)',
                    height: isPast ? '100%' : isActive ? '50%' : '0%',
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}