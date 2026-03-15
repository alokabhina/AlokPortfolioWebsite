import { RevealOnScroll } from '@/components'

/**
 * SkillCard
 * Single skill category card.
 * Shows category name, icon, and all skill chips with devicon logos.
 *
 * @param {object}   category        - { category, icon, items: [{name, iconUrl}] }
 * @param {number}   delay           - Stagger animation delay in seconds
 */
export default function SkillCard({ category, delay = 0 }) {
  const { category: name, icon, items = [] } = category

  return (
    <RevealOnScroll delay={delay} direction="up">
      <div
        className="group h-full rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
        style={{
          background: 'var(--bg-card)',
          border:     '1px solid var(--border)',
          boxShadow:  'var(--shadow-card)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.boxShadow   = 'var(--shadow-hover)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow   = 'var(--shadow-card)'
        }}
      >
        {/* Category label */}
        <div className="flex items-center gap-3 mb-5">
          {/* Icon dot */}
          <span
            className="flex items-center justify-center w-9 h-9 rounded-lg font-mono text-base shrink-0"
            style={{
              background: 'var(--accent-dim)',
              color:      'var(--accent)',
              border:     '1px solid rgba(0,212,170,0.2)',
            }}
          >
            {icon}
          </span>
          <h3
            className="font-display font-bold text-base"
            style={{ color: 'var(--text-heading)', letterSpacing: '-0.01em' }}
          >
            {name}
          </h3>
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap gap-2">
          {items.map((skill) => (
            <SkillChip key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </RevealOnScroll>
  )
}

// ── Single skill chip with optional devicon ──────────────────
function SkillChip({ skill }) {
  const { name, iconUrl } = skill

  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default"
      style={{
        background: 'var(--bg-secondary)',
        border:     '1px solid var(--border)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.background  = 'var(--accent-dim)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background  = 'var(--bg-secondary)'
      }}
    >
      {/* Devicon logo */}
      {iconUrl && (
        <img
          src={iconUrl}
          alt={name}
          width={16}
          height={16}
          loading="lazy"
          decoding="async"
          className="shrink-0"
          style={{ objectFit: 'contain' }}
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
      )}

      {/* Fallback dot when no icon */}
      {!iconUrl && (
        <span
          className="block w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: 'var(--accent)' }}
        />
      )}

      <span
        className="font-mono text-xs whitespace-nowrap"
        style={{ color: 'var(--text-primary)' }}
      >
        {name}
      </span>
    </div>
  )
}