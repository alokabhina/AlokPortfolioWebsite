import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Star } from 'lucide-react'
import { SEO, SideScrollTracker, RevealOnScroll, LazyImage } from '@/components'
import { useScrollSpy, useFetch } from '@/hooks'
import { scrollToSection } from '@/lib'
import { PROJECTS } from '@/data/content'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'MERN', value: 'mern' },
  { label: 'Python', value: 'python' },
  { label: 'Frontend', value: 'frontend' },
]
const TRACKER_ITEMS = [
  { id: 'featured-project', label: 'Featured' },
  { id: 'all-projects', label: 'All Projects' },
]

function TechBadge({ label }) {
  return (
    <span style={{
      fontFamily: 'DM Mono, monospace', fontSize: '11px',
      color: 'var(--accent)', background: 'var(--accent-dim)',
      padding: '3px 10px', borderRadius: '4px', display: 'inline-block',
    }}>{label}</span>
  )
}

function FeaturedCard({ project }) {
  return (
    <RevealOnScroll>
      <div style={{
        borderRadius: '16px', overflow: 'hidden',
        border: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        background: 'var(--bg-card)',
        transition: 'border-color 0.3s',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <div style={{ position: 'relative', minHeight: '250px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
          <LazyImage
            src={project.imageUrl || '/images/aspirantarena.jpg'}
            alt={project.title}
            wrapClass="absolute inset-0 w-full h-full"
            className="w-full h-full object-cover object-top"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(6,10,16,0.3),transparent)' }}/>
          <div style={{
            position: 'absolute', top: '14px', left: '14px',
            fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 600,
            background: 'var(--accent)', color: 'var(--bg-primary)',
            padding: '4px 12px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            ★ Featured Project
          </div>
        </div>
        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>
            {project.title}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
            {project.description}
          </p>
          {project.features && (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {project.features.map(f => (
                <li key={f} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0 }}>▸</span>{f}
                </li>
              ))}
            </ul>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.techStack.map(t => <TechBadge key={t} label={t}/>)}
          </div>
          <div style={{ display: 'flex', gap: '20px', paddingTop: '12px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <Github size={15}/> GitHub
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                <ExternalLink size={15}/> Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

function ProjectCard({ project, delay = 0 }) {
  return (
    <RevealOnScroll delay={delay}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: '14px', overflow: 'hidden',
        height: '100%', display: 'flex', flexDirection: 'column',
        transition: 'transform 0.25s ease, border-color 0.25s, box-shadow 0.25s',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px)'
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {project.imageUrl && (
          <div style={{ height: '160px', overflow: 'hidden', background: 'var(--bg-secondary)', flexShrink: 0 }}>
            <LazyImage src={project.imageUrl} alt={project.title} wrapClass="w-full h-full" className="w-full h-full object-cover object-top"/>
          </div>
        )}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {project.techStack.slice(0, 4).map(t => <TechBadge key={t} label={t}/>)}
          </div>
          <div style={{ display: 'flex', gap: '14px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <Github size={13}/> Source
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <ExternalLink size={13}/> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')
  const activeId = useScrollSpy(['featured-project', 'all-projects'], 100)
  const { data: allProjects } = useFetch('/api/projects', PROJECTS)

  const featured      = allProjects.find?.(p => p.featured) || allProjects[0]
  const otherProjects = allProjects.filter?.(p => !p.featured) || []

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return otherProjects
    return otherProjects.filter(p => p.category === activeFilter)
  }, [activeFilter, otherProjects])

  return (
    <>
      <SEO title="Projects" description="Projects by Alok Abhinandan — AspirantArena, SaarthiLearn LMS, Spendyfy." path="/projects"/>

      <SideScrollTracker items={TRACKER_ITEMS} activeId={activeId} onDotClick={scrollToSection}/>

      <main className="page-top">
        <div style={{ paddingTop: '32px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

          <RevealOnScroll>
            <p className="section-tag">03. Projects</p>
            <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Things I&apos;ve <span style={{ color: 'var(--accent)' }}>built</span>
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '480px' }}>
              Full-stack web apps, educational platforms, and tools.
            </p>
          </RevealOnScroll>

          <div id="featured-project" style={{ marginBottom: '48px' }}>
            {featured && <FeaturedCard project={featured}/>}
          </div>

          <div id="all-projects">
            <RevealOnScroll>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                  Other Projects
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {FILTERS.map(f => (
                    <button key={f.value} onClick={() => setActiveFilter(f.value)} style={{
                      fontFamily: 'DM Mono, monospace', fontSize: '11px',
                      padding: '5px 14px', borderRadius: '20px', cursor: 'pointer',
                      border: `1px solid ${activeFilter === f.value ? 'var(--accent)' : 'var(--border)'}`,
                      background: activeFilter === f.value ? 'var(--accent)' : 'transparent',
                      color: activeFilter === f.value ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}>{f.label}</button>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <AnimatePresence mode="wait">
              <motion.div key={activeFilter}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}
              >
                {filtered.length > 0 ? (
                  filtered.map((p, i) => <ProjectCard key={p._id} project={p} delay={i * 0.06}/>)
                ) : (
                  <div style={{ gridColumn: '1/-1', padding: '48px 0', textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    No projects here yet.{' '}
                    <button onClick={() => setActiveFilter('all')} style={{ color: 'var(--accent)', cursor: 'pointer', background: 'none', border: 'none' }}>View all →</button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </main>
    </>
  )
}