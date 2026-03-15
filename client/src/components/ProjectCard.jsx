import { ExternalLink, Github } from 'lucide-react'
import { LazyImage, RevealOnScroll } from '@/components'
import { cn } from '@/lib'

/**
 * ProjectCard
 * Used in Projects page grid (other projects section).
 * Props match MongoDB Project model fields.
 *
 * @param {object}   project
 * @param {string}   project._id
 * @param {string}   project.title
 * @param {string}   project.description
 * @param {string[]} project.techStack
 * @param {string}   project.githubUrl
 * @param {string}   project.liveUrl
 * @param {string}   project.imageUrl
 * @param {string}   project.category
 * @param {number}   delay   - stagger animation delay in seconds
 */
export default function ProjectCard({ project, delay = 0 }) {
  const { title, description, techStack = [], githubUrl, liveUrl, imageUrl } = project

  return (
    <RevealOnScroll delay={delay} direction="up">
      <div
        className={cn(
          'group relative flex flex-col h-full rounded-xl overflow-hidden',
          'transition-all duration-300 ease-out',
          'hover:-translate-y-[6px]'
        )}
        style={{
          background:  'var(--bg-card)',
          border:      '1px solid var(--border)',
          boxShadow:   'var(--shadow-card)',
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
        {/* Top teal line — visible on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          }}
        />

        {/* Project image */}
        {imageUrl && (
          <div className="relative overflow-hidden" style={{ height: '180px' }}>
            <LazyImage
              src={imageUrl}
              alt={title}
              wrapClass="w-full h-full"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-3 p-6 flex-1">

          {/* Title */}
          <h3
            className="font-display font-bold text-lg leading-tight transition-colors duration-200 group-hover:text-[var(--accent)]"
            style={{ color: 'var(--text-heading)', letterSpacing: '-0.02em' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed flex-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            {description}
          </p>

          {/* Tech stack badges */}
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-3" style={{ borderTop: '1px solid var(--border)' }}>
              {techStack.map(tech => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-4 pt-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Github size={14} />
                Source
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}