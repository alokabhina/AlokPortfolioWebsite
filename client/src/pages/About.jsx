import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, Rocket, GraduationCap, BookOpen, Lightbulb } from 'lucide-react'
import { SEO, RevealOnScroll, LazyImage, TimelineItem } from '@/components'
import { PERSONAL, TIMELINE } from '@/data/content'

// ─── Bio Section ──────────────────────────────────────────────
function BioSection() {
  return (
    <section style={{ padding: "48px 0 60px" }}>
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Text */}
          <div>
            <RevealOnScroll>
              <p className="section-tag">01. About</p>
              <h1
                className="font-display font-extrabold mb-6"
                style={{
                  fontSize:      'clamp(2rem, 4vw, 3rem)',
                  color:         'var(--text-heading)',
                  letterSpacing: '-0.02em',
                  lineHeight:    1.1,
                }}
              >
                The person{' '}
                <span style={{ color: 'var(--accent)' }}>behind the code</span>
              </h1>
            </RevealOnScroll>

            {/* Bio paragraphs */}
            <div className="flex flex-col gap-4 mb-8">
              {PERSONAL.aboutBio.map((para, i) => (
                <RevealOnScroll key={i} delay={i * 0.1}>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                    dangerouslySetInnerHTML={{
                      __html: para
                        .replace(/MERN Stack/g, `<strong style="color:var(--accent);font-weight:500">MERN Stack</strong>`)
                        .replace(/Python/g,     `<strong style="color:var(--accent);font-weight:500">Python</strong>`)
                        .replace(/AspirantArena/g, `<strong style="color:var(--accent);font-weight:500">AspirantArena</strong>`),
                    }}
                  />
                </RevealOnScroll>
              ))}
            </div>

            {/* Chips */}
            <RevealOnScroll delay={0.2}>
              <div className="flex flex-wrap gap-2 mb-8">
                {PERSONAL.chips.map(chip => (
                  <span key={chip} className="chip">{chip}</span>
                ))}
              </div>
            </RevealOnScroll>

            {/* Resume download */}
            <RevealOnScroll delay={0.3}>
              <a
                href={PERSONAL.resumeUrl}
                download
                className="btn-primary inline-flex"
              >
                <Download size={16} />
                Download Resume
              </a>
            </RevealOnScroll>
          </div>

          {/* Right — Photo */}
          <RevealOnScroll direction="right" delay={0.15}>
            <div className="relative mx-auto md:mx-0" style={{ maxWidth: '380px' }}>
              {/* Teal offset decoration */}
              <div
                className="absolute top-5 right-5 w-full h-full rounded-2xl"
                style={{ border: '2px solid var(--accent)', opacity: 0.25, zIndex: 0 }}
              />
              {/* Photo */}
              <div
                className="relative rounded-2xl overflow-hidden z-10"
                style={{
                  border:    '1px solid var(--border)',
                  boxShadow: '0 0 40px rgba(0,212,170,0.1)',
                  aspectRatio: '3/4',
                }}
              >
                <LazyImage
                  src="/images/alok-about.jpg"
                  alt="Alok Abhinandan"
                  wrapClass="w-full h-full"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

// ─── Fun Facts Section ────────────────────────────────────────
const FACT_CONFIG = [
  { Icon: Rocket,         label: 'Projects'  },
  { Icon: GraduationCap, label: 'Teaching'   },
  { Icon: BookOpen,      label: 'Internship' },
  { Icon: Lightbulb,     label: 'Mission'    },
]

function FunFactsSection() {
  return (
    <section style={{ padding: '48px 0', background: 'var(--bg-secondary)' }}>
      <div className="container-main">
        <RevealOnScroll>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.02em', marginBottom: '24px' }}>
            A bit more about me
          </h2>
        </RevealOnScroll>

        {/* grid + alignItems stretch = equal height rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'stretch' }}>
          {PERSONAL.funFacts.map((fact, i) => {
            const { Icon, label } = FACT_CONFIG[i] || FACT_CONFIG[0]
            return (
              <RevealOnScroll key={i} delay={i * 0.08}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: '14px', padding: '22px',
                  display: 'flex', flexDirection: 'column', gap: '12px',
                  height: '100%',
                  transition: 'transform 0.25s, border-color 0.25s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {/* Lucide Icon */}
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-dim)', border: '1px solid rgba(0,212,170,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} style={{ color: 'var(--accent)' }} strokeWidth={1.8}/>
                  </div>

                  {/* Label */}
                  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {label}
                  </p>

                  {/* Text — flex:1 ensures equal stretch */}
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.75, flex: 1 }}>
                    {fact.text}
                  </p>
                </div>
              </RevealOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Journey Timeline Section ─────────────────────────────────
function TimelineSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target:   ref,
    offset:   ['start center', 'end center'],
  })
  // SVG line draws itself as user scrolls through section
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section-pad" ref={ref}>
      <div className="container-main">
        <RevealOnScroll>
          <p className="section-tag">02. Journey</p>
          <h2
            className="font-display font-extrabold mb-14"
            style={{
              fontSize:      'clamp(1.6rem, 3vw, 2.2rem)',
              color:         'var(--text-heading)',
              letterSpacing: '-0.02em',
            }}
          >
            How I got here
          </h2>
        </RevealOnScroll>

        {/* Timeline wrapper — relative so center line can be positioned */}
        <div className="relative">

          {/* SVG center vertical line — draws on scroll (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px">
            <svg
              className="w-full h-full"
              style={{ position: 'absolute', top: 0, left: 0 }}
              preserveAspectRatio="none"
            >
              {/* Background line */}
              <line
                x1="0" y1="0" x2="0" y2="100%"
                stroke="var(--border)"
                strokeWidth="1"
              />
            </svg>
            {/* Animated fill line using framer motion */}
            <motion.div
              className="absolute top-0 left-0 w-px origin-top"
              style={{
                scaleY:     pathLength,
                background: 'var(--accent)',
                height:     '100%',
                opacity:    0.7,
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="flex flex-col gap-10">
            {TIMELINE.map((event, i) => (
              <TimelineItem
                key={i}
                year={event.year}
                title={event.title}
                desc={event.desc}
                side={event.side}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── About Page Export ────────────────────────────────────────
export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about Alok Abhinandan — CS graduate, Full-Stack Developer, and Programming Educator building education-focused web applications."
        path="/about"
      />
      <main className="page-top" style={{ paddingTop: "0" }}>
        <BioSection />
        <FunFactsSection />
        <TimelineSection />
      </main>
    </>
  )
}