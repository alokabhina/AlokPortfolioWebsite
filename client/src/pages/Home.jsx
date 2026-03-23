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

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES injected once
   ───────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  /* ── tokens ── */
  :root {
    --font-display : 'Syne', sans-serif;
    --font-body    : 'Outfit', sans-serif;
    --font-mono    : 'JetBrains Mono', monospace;
  }

  /* ── hero grid: responsive via media query ── */
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
  }
  @media (min-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr 300px;
    }
  }
  @media (min-width: 1024px) {
    .hero-grid {
      grid-template-columns: 1fr 360px;
      gap: 4rem;
    }
  }

  /* ── image always on top on mobile, right on desktop ── */
  .hero-img-col  { order: 1; }
  .hero-text-col { order: 2; }
  @media (min-width: 768px) {
    .hero-img-col  { order: 2; }
    .hero-text-col { order: 1; }
  }

  /* ── photo frame ── */
  .photo-frame {
    position: relative;
    width: 220px; height: 270px;
    margin: 0 auto;
  }
  @media (min-width: 480px) { .photo-frame { width: 260px; height: 320px; } }
  @media (min-width: 768px) { .photo-frame { width: 290px; height: 360px; } }
  @media (min-width: 1024px){ .photo-frame { width: 340px; height: 420px; } }

  /* ── floating animation ── */
  @keyframes float {
    0%,100% { transform: translateY(0);   }
    50%      { transform: translateY(-9px); }
  }
  .animate-float { animation: float 5s ease-in-out infinite; }

  /* ── pulse dot ── */
  @keyframes pulse-dot {
    0%,100% { opacity:1; box-shadow: 0 0 0 0 rgba(74,222,128,.5); }
    50%      { opacity:.7; box-shadow: 0 0 0 6px rgba(74,222,128,0); }
  }
  .pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }

  /* ── available badge ── */
  .avail-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px;
    border-radius: 99px;
    border: 1px solid rgba(0,212,170,.35);
    background: rgba(0,212,170,.07);
    font-family: var(--font-mono);
    font-size: .72rem;
    font-weight: 500;
    color: var(--accent);
    letter-spacing: .03em;
  }

  /* ── btn primary ── */
  .btn-prim {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 12px 24px;
    border-radius: 12px;
    background: var(--accent);
    color: var(--bg-primary);
    font-family: var(--font-body);
    font-size: .88rem;
    font-weight: 600;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: all .2s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 4px 18px rgba(0,212,170,.28);
  }
  .btn-prim:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,212,170,.38);
    filter: brightness(1.06);
  }

  /* ── btn ghost ── */
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 11px 22px;
    border-radius: 12px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: .88rem;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all .2s;
  }
  .btn-ghost:hover {
    border-color: var(--accent);
    color: var(--accent);
    transform: translateY(-2px);
  }

  /* ── tech badge ── */
  .tech-tag {
    display: inline-block;
    padding: 4px 11px;
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: .7rem;
    font-weight: 500;
    background: rgba(0,212,170,.08);
    border: 1px solid rgba(0,212,170,.2);
    color: var(--accent);
    transition: all .18s;
  }
  .tech-tag:hover {
    background: rgba(0,212,170,.15);
    transform: translateY(-1px);
  }

  /* ── section tag ── */
  .sec-tag {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: .7rem;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: .1em;
    margin-bottom: 8px;
  }

  /* ── stat card ── */
  .stat-card {
    text-align: center;
    padding: 28px 16px;
    border-radius: 16px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    transition: all .25s;
  }
  .stat-card:hover {
    border-color: rgba(0,212,170,.4);
    box-shadow: 0 0 30px rgba(0,212,170,.08);
    transform: translateY(-3px);
  }

  /* ── featured project card ── */
  .feat-card {
    display: grid;
    grid-template-columns: 1fr;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-card);
    text-decoration: none;
    transition: border-color .25s, box-shadow .25s;
  }
  @media (min-width: 1024px) {
    .feat-card { grid-template-columns: 1fr 1fr; }
  }
  .feat-card:hover {
    border-color: var(--accent);
    box-shadow: 0 0 50px rgba(0,212,170,.12);
  }
  .feat-card:hover .feat-img { transform: scale(1.04); }

  /* ── feat image ── */
  .feat-img {
    transition: transform .5s cubic-bezier(.4,0,.2,1);
    width: 100%; height: 100%;
    object-fit: cover; object-position: top;
  }

  /* ── social link ── */
  .social-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--font-mono);
    font-size: .74rem;
    color: var(--text-secondary);
    text-decoration: none;
    padding: 7px 13px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all .18s;
  }
  .social-link:hover {
    color: var(--accent);
    border-color: rgba(0,212,170,.3);
    background: rgba(0,212,170,.06);
    transform: translateY(-2px);
  }

  /* ── corner decoration ── */
  .corner-accent {
    position: absolute;
    width: 100%; height: 100%;
    border-radius: 20px;
    border: 1.5px solid var(--accent);
    opacity: .22;
    top: 12px; left: -12px;
    z-index: 0;
    pointer-events: none;
  }

  /* ── glow ring ── */
  .glow-ring {
    position: absolute;
    inset: -1px;
    border-radius: 20px;
    background: transparent;
    box-shadow: 0 0 50px rgba(0,212,170,.18);
    pointer-events: none;
    z-index: 5;
  }

  /* ── code badge ── */
  .code-badge {
    position: absolute;
    bottom: -16px; right: -16px;
    z-index: 20;
    padding: 9px 16px;
    border-radius: 12px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: .72rem;
    font-weight: 500;
    box-shadow: var(--shadow-card);
    white-space: nowrap;
  }

  /* ── exp badge ── */
  .exp-badge {
    position: absolute;
    top: -16px; left: -20px;
    z-index: 20;
    padding: 9px 14px;
    border-radius: 12px;
    background: var(--accent);
    color: var(--bg-primary);
    font-family: var(--font-body);
    font-size: .72rem;
    font-weight: 700;
    box-shadow: 0 4px 18px rgba(0,212,170,.35);
    white-space: nowrap;
    display: flex; align-items: center; gap: 5px;
  }

  /* ── noise overlay ── */
  .noise-bg::before {
    content: '';
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: .4;
  }

  /* ── hero bg mesh ── */
  .hero-mesh {
    position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0;
  }
  .mesh-blob {
    position: absolute; border-radius: 50%;
    filter: blur(90px); opacity: .07;
    background: var(--accent);
  }
`

/* ─────────────────────────────────────────────────────────────
   INJECT STYLES ONCE
   ───────────────────────────────────────────────────────────── */
function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────────────────────── */
function HeroSection() {
  const [text] = useTypewriter({
    words: PERSONAL.typingTitles,
    loop: true,
    delaySpeed: 2000,
    deleteSpeed: 40,
    typeSpeed: 80,
  })

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
  }
  const imgVar = {
    hidden: { opacity: 0, scale: 0.93, x: 20 },
    show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.65, delay: 0.25, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center page-top"
      style={{ overflow: 'hidden' }}
    >
      {/* Background mesh blobs */}
      <div className="hero-mesh">
        <div className="mesh-blob" style={{ width: 500, height: 500, top: '10%', right: '-10%' }} />
        <div className="mesh-blob" style={{ width: 300, height: 300, bottom: '15%', left: '-5%', opacity: .04 }} />
      </div>

      <div className="container-main w-full" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">

          {/* ── TEXT COLUMN ── */}
          <motion.div
            className="hero-text-col flex flex-col gap-5 min-w-0"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Available badge */}
            <motion.div variants={item}>
              <span className="avail-badge">
                <span
                  className="pulse-dot"
                  style={{
                    display: 'block', width: 7, height: 7,
                    borderRadius: '50%', background: '#4ade80', flexShrink: 0,
                  }}
                />
                Open to collaborations
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                letterSpacing: '-0.035em',
                color: 'var(--text-heading)',
                lineHeight: 1.02,
                margin: 0,
              }}
            >
              {PERSONAL.name}
            </motion.h1>

            {/* Typing subtitle */}
            <motion.h2
              variants={item}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2.6vw, 1.75rem)',
                letterSpacing: '-0.02em',
                color: 'var(--accent)',
                minHeight: '2.4rem',
                margin: 0,
              }}
            >
              {text}
              <Cursor cursorStyle="|" cursorColor="var(--accent)" />
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={item}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '.95rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                maxWidth: 500,
                margin: 0,
              }}
            >
              {PERSONAL.heroBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, paddingTop: 4 }}>
              <Link to="/projects" className="btn-prim">
                View My Work <ArrowRight size={15} />
              </Link>
              <a href={PERSONAL.resumeUrl} download className="btn-ghost">
                <Download size={15} /> Download Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
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
                  className="social-link"
                >
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  {label}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── IMAGE COLUMN ── */}
          <motion.div
            className="hero-img-col"
            variants={imgVar}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            {/* FIXED: photo-frame uses CSS class with proper responsive sizing,
                no inline style conflict. Position: relative is set on .photo-frame */}
            <div className="photo-frame">

              {/* Corner offset decoration */}
              <div className="corner-accent" />

              {/* Glow ring */}
              <div className="glow-ring" />

              {/* Photo */}
              <div
                className="animate-float"
                style={{
                  position: 'relative',
                  width: '100%', height: '100%',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  zIndex: 10,
                }}
              >
                <LazyImage
                  src="/images/alok-hero.jpg"
                  alt="Alok Abhinandan"
                  wrapClass="w-full h-full"
                  className="w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                />

                {/* Bottom gradient overlay */}
                <div
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '40%', pointerEvents: 'none',
                    background: 'linear-gradient(to top, rgba(6,10,16,.65), transparent)',
                    zIndex: 2,
                  }}
                />
              </div>

              {/* Code badge — bottom right */}
              <div className="code-badge">
                {'< Full-Stack Dev />'}
              </div>

              {/* Experience badge — top left */}
              <div className="exp-badge">
                🚀 2+ yrs exp
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   STATS SECTION
   ───────────────────────────────────────────────────────────── */
function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <section
      ref={ref}
      className="section-pad"
      style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle top divider line */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '60%', height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        opacity: .3,
      }} />

      <div className="container-main">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}
          className="lg:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1}>
              <div className="stat-card">
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
                    color: 'var(--accent)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {inView ? (
                    <CountUp start={0} end={stat.value} duration={2.2} suffix={stat.suffix} />
                  ) : `0${stat.suffix}`}
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.1em',
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
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

/* ─────────────────────────────────────────────────────────────
   FEATURED PROJECT SECTION
   ───────────────────────────────────────────────────────────── */
function FeaturedProjectSection() {
  const { data: projects } = useFetch('/api/projects', PROJECTS)
  const featured = projects.find?.(p => p.featured) || projects[0] || PROJECTS[0]
  if (!featured) return null

  return (
    <section className="section-pad">
      <div className="container-main">
        <RevealOnScroll>
          <div
            style={{
              display: 'flex', alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 36, flexWrap: 'wrap', gap: 16,
            }}
          >
            <div>
              <span className="sec-tag">Featured Project</span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  color: 'var(--text-heading)',
                  letterSpacing: '-0.025em',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Something I built
              </h2>
            </div>
            <Link
              to="/projects"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '.78rem',
                color: 'var(--accent)',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 9,
                border: '1px solid rgba(0,212,170,.25)',
                transition: 'all .18s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(0,212,170,.07)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'none'
              }}
            >
              All projects <ArrowRight size={13} />
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <Link to="/projects" className="feat-card" style={{ display: 'grid' }}>
            {/* Screenshot column */}
            <div style={{ position: 'relative', overflow: 'hidden', minHeight: 280 }}>
              <LazyImage
                src={featured.imageUrl || '/images/aspirantarena.jpg'}
                alt={featured.title}
                wrapClass="w-full h-full absolute inset-0"
                className="feat-img"
              />
              {/* Overlay */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(6,10,16,.45) 0%, rgba(0,212,170,.04) 100%)',
                  zIndex: 1,
                }}
              />
              {/* Featured badge */}
              <div
                style={{
                  position: 'absolute', top: 16, left: 16, zIndex: 2,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '.65rem', fontWeight: 700,
                  padding: '5px 12px', borderRadius: 99,
                  background: 'var(--accent)', color: 'var(--bg-primary)',
                  letterSpacing: '.06em', textTransform: 'uppercase',
                }}
              >
                ★ Featured
              </div>
            </div>

            {/* Content column */}
            <div
              style={{
                display: 'flex', flexDirection: 'column', gap: 20,
                padding: '32px 32px',
                background: 'var(--bg-card)',
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.65rem',
                    letterSpacing: '-0.02em',
                    color: 'var(--text-heading)',
                    margin: '0 0 10px',
                  }}
                >
                  {featured.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '.88rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {featured.description}
                </p>
              </div>

              {/* Feature bullets */}
              {featured.features && (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {featured.features.map(f => (
                    <li
                      key={f}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 9,
                        fontFamily: 'var(--font-body)',
                        fontSize: '.83rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', marginTop: 1, fontSize: '.8rem' }}>▸</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech stack */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {featured.techStack.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  paddingTop: 16, borderTop: '1px solid var(--border)',
                  marginTop: 'auto',
                }}
              >
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontFamily: 'var(--font-mono)', fontSize: '.75rem',
                      color: 'var(--text-secondary)', textDecoration: 'none',
                      transition: 'color .18s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Github size={15} /> GitHub
                  </a>
                )}
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontFamily: 'var(--font-mono)', fontSize: '.75rem', fontWeight: 600,
                      color: 'var(--accent)', textDecoration: 'none',
                    }}
                  >
                    <ExternalLink size={15} /> Live Demo ↗
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

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <GlobalStyles />
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