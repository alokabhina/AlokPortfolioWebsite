import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Instagram, Download, ArrowRight, ExternalLink } from 'lucide-react'
import { SEO, Marquee, RevealOnScroll, LazyImage } from '@/components'
import { useFetch } from '@/hooks'
import { PERSONAL, STATS, PROJECTS } from '@/data/content'

// ─── Hero Section ─────────────────────────────────────────────
function HeroSection() {
  const [text] = useTypewriter({
    words:        PERSONAL.typingTitles,
    loop:         true,
    delaySpeed:   2000,
    deleteSpeed:  40,
    typeSpeed:    80,
  })

  // Hero entrance animation variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  }
  const imgVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    show:   { opacity: 1, scale: 1, transition: { duration: 0.55, delay: 0.3, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center page-top"
    >
      <div className="container-main w-full">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:"3rem", alignItems:"center" }} className="max-md:grid-cols-1">

          {/* ── Left: Text Content ─────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5 order-2 md:order-1 min-w-0"
          >
            {/* Available badge */}
            <motion.div variants={item}>
              <span className="available-badge">
                <span
                  className="block w-[7px] h-[7px] rounded-full"
                  style={{
                    background: '#4ade80',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                  }}
                />
                Open to collaborations
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="font-display font-extrabold leading-none"
              style={{
                fontSize:      'clamp(2rem, 4.5vw, 3.5rem)',
                letterSpacing: '-0.03em',
                color:         'var(--text-heading)',
                lineHeight:    1.05,
                wordBreak:     'keep-all',
              }}
            >
              {PERSONAL.name}
            </motion.h1>

            {/* Typing subtitle */}
            <motion.h2
              variants={item}
              className="font-display font-bold"
              style={{
                fontSize:      'clamp(1.1rem, 2.5vw, 1.8rem)',
                letterSpacing: '-0.02em',
                color:         'var(--accent)',
                minHeight:     '2.2rem',
              }}
            >
              {text}
              <Cursor cursorStyle="|" cursorColor="var(--accent)" />
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-base leading-relaxed max-w-[520px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {PERSONAL.heroBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
              <Link to="/projects" className="btn-primary">
                View My Work
                <ArrowRight size={16} />
              </Link>
              <a
                href={PERSONAL.resumeUrl}
                download
                className="btn-ghost"
              >
                <Download size={16} />
                Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} className="flex items-center gap-4 pt-2">
              {[
                { icon: Github,    href: PERSONAL.github,    label: 'GitHub'    },
                { icon: Linkedin,  href: PERSONAL.linkedin,  label: 'LinkedIn'  },
                { icon: Instagram, href: PERSONAL.instagram, label: 'Instagram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 font-mono text-xs transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile Photo ───────────────────────── */}
          <motion.div
            variants={imgVariant}
            initial="hidden"
            animate="show"
            className="flex justify-center md:justify-end order-1 md:order-2"
          >
            <div className="relative w-[260px] h-[320px] sm:w-[300px] sm:h-[370px] lg:w-[340px] lg:h-[420px]">

              {/* Teal offset border decoration */}
              <div
                className="absolute top-4 right-4 w-full h-full rounded-2xl"
                style={{ border: '2px solid var(--accent)', opacity: 0.3, zIndex: 0 }}
              />

              {/* Photo frame */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden z-10 animate-float"
                style={{
                  border:    '1px solid var(--border)',
                  boxShadow: '0 0 40px rgba(0,212,170,0.15)',
                }}
              >
                <LazyImage
                  src="/images/alok-hero.jpg"
                  alt="Alok Abhinandan"
                  wrapClass="w-full h-full"
                  className="w-full h-full object-cover object-top"
                />

                {/* Teal gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(6,10,16,0.6), transparent)',
                  }}
                />
              </div>

              {/* Floating label badge on photo */}
              <div
                className="absolute -bottom-4 -left-4 z-20 px-4 py-2 rounded-xl font-mono text-xs font-medium"
                style={{
                  background:  'var(--bg-card)',
                  border:      '1px solid var(--border)',
                  color:       'var(--accent)',
                  boxShadow:   'var(--shadow-card)',
                }}
              >
                {'<'} Full-Stack Dev {' />'}
              </div>
            </div>
          </motion.div>

        </div>
        </div>
    </section>
  )
}

// ─── Stats Section ────────────────────────────────────────────
function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div
                  className="font-display font-extrabold mb-2"
                  style={{
                    fontSize:  'clamp(2.4rem, 5vw, 3.5rem)',
                    color:     'var(--accent)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.2}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <p
                  className="font-mono text-sm uppercase tracking-wider"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {stat.label}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Featured Project Teaser ──────────────────────────────────
function FeaturedProjectSection() {
  const { data: projects } = useFetch('/api/projects', PROJECTS)
  const featured = projects.find?.(p => p.featured) || projects[0] || PROJECTS[0]
  if (!featured) return null

  return (
    <section className="section-pad">
      <div className="container-main">
        <RevealOnScroll>
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="section-tag">Featured Project</p>
              <h2
                className="font-display font-extrabold"
                style={{
                  fontSize:      'clamp(1.8rem, 3.5vw, 2.6rem)',
                  color:         'var(--text-heading)',
                  letterSpacing: '-0.02em',
                }}
              >
                Something I built
              </h2>
            </div>
            <Link
              to="/projects"
              className="font-mono text-sm flex items-center gap-2 transition-colors duration-200"
              style={{ color: 'var(--accent)' }}
            >
              View all projects <ArrowRight size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        {/* Featured card - clicking card goes to projects page */}
        <RevealOnScroll>
          <Link
            to="/projects"
            className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              border:         '1px solid var(--border)',
              boxShadow:      'var(--shadow-card)',
              textDecoration: 'none',
              display:        'grid',
              cursor:         'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.boxShadow   = 'var(--shadow-hover), 0 0 40px rgba(0,212,170,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.boxShadow   = 'var(--shadow-card)'
            }}
          >
            {/* Screenshot */}
            <div className="relative overflow-hidden" style={{ minHeight: '260px' }}>
              <LazyImage
                src={featured.imageUrl || '/images/aspirantarena.jpg'}
                alt={featured.title}
                wrapClass="w-full h-full absolute inset-0"
                className="w-full h-full object-cover object-top" style={{ transition: 'transform 0.5s ease' }}
              />
              {/* Overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(6,10,16,0.4), rgba(0,212,170,0.05))' }}
              />
              {/* Featured badge */}
              <div
                className="absolute top-4 left-4 font-mono text-[11px] px-3 py-1 rounded-full"
                style={{
                  background: 'var(--accent)',
                  color:      'var(--bg-primary)',
                  fontWeight: 600,
                }}
              >
                Featured
              </div>
            </div>

            {/* Content */}
            <div
              className="flex flex-col gap-5 p-8"
              style={{ background: 'var(--bg-card)' }}
            >
              <div>
                <h3
                  className="font-display font-bold mb-3"
                  style={{
                    fontSize:      '1.7rem',
                    color:         'var(--text-heading)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {featured.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {featured.description}
                </p>
              </div>

              {/* Feature bullets */}
              {featured.features && (
                <ul className="flex flex-col gap-2">
                  {featured.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {featured.techStack.map(t => (
                  <span key={t} className="tech-badge">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-2 font-mono text-sm transition-all duration-200 hover:-translate-y-[2px]"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-2 font-mono text-sm font-semibold transition-all duration-200"
                    style={{ color: 'var(--accent)' }}
                  >
                    <ExternalLink size={16} /> Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─── Home Page Export ─────────────────────────────────────────
export default function Home() {
  return (
    <>
      <SEO
        title="Alok Abhinandan | Full-Stack Developer & Educator"
        description="Full-Stack Developer and Educator specializing in MERN Stack and Python. Building AspirantArena and teaching web development."
        path="/"
      />

      <main>
        <HeroSection />
        <Marquee />
        <StatsSection />
        <FeaturedProjectSection />
      </main>
    </>
  )
}