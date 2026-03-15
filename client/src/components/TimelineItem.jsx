import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib'

/**
 * TimelineItem
 * Single event card in the About page journey timeline.
 * Animates in from left or right depending on `side` prop.
 * Connected by a dot on the center vertical line.
 *
 * @param {string} year   - Year label e.g. "2023"
 * @param {string} title  - Event title
 * @param {string} desc   - Short description
 * @param {string} side   - 'left' | 'right'
 * @param {number} index  - Used for stagger delay
 */
export default function TimelineItem({ year, title, desc, side = 'left', index = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const variants = {
    hidden: {
      opacity: 0,
      x: side === 'left' ? -50 : 50,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center gap-0 w-full',
        // On desktop: alternate sides. On mobile: all left-aligned
        'flex-col md:flex-row',
        side === 'right' && 'md:flex-row-reverse'
      )}
    >
      {/* Card — takes up roughly half the width */}
      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className={cn(
          'w-full md:w-[calc(50%-32px)]',
          side === 'left'  ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
        )}
      >
        <div
          className="inline-block w-full rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
          style={{
            background:  'var(--bg-card)',
            border:      '1px solid var(--border)',
            boxShadow:   'var(--shadow-card)',
            textAlign:   'left',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          {/* Year badge */}
          <span
            className="inline-block font-mono text-xs px-3 py-1 rounded-full mb-3"
            style={{
              background: 'var(--accent-dim)',
              color:      'var(--accent)',
              border:     '1px solid rgba(0,212,170,0.2)',
            }}
          >
            {year}
          </span>

          {/* Title */}
          <h3
            className="font-display font-bold mb-2"
            style={{
              fontSize:      '1.05rem',
              color:         'var(--text-heading)',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {desc}
          </p>
        </div>
      </motion.div>

      {/* Center dot — hidden on mobile */}
      <div className="hidden md:flex w-16 items-center justify-center shrink-0 relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="w-4 h-4 rounded-full"
          style={{
            background:  'var(--accent)',
            border:      '3px solid var(--bg-primary)',
            boxShadow:   '0 0 12px rgba(0,212,170,0.5)',
          }}
        />
      </div>

      {/* Empty spacer for opposite side */}
      <div className="hidden md:block w-[calc(50%-32px)]" />
    </div>
  )
}