import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle, User, Star } from 'lucide-react'
import { SEO, RevealOnScroll } from '@/components'
import { TEACHING } from '@/data/content'
import { api } from '@/lib'

// ─── Teaching Hero ────────────────────────────────────────────
function TeachingHero() {
  return (
    <section style={{ padding:'40px 0 0', background:'var(--bg-secondary)' }}>
      <div className="container-main">
        <RevealOnScroll>
          <p className="section-tag" style={{ justifyContent:'center' }}>04. Teaching</p>
          <h1 style={{
            fontFamily:'Syne, sans-serif', fontSize:'clamp(2rem, 5vw, 3.5rem)',
            fontWeight:800, color:'var(--text-heading)', letterSpacing:'-0.03em',
            lineHeight:1.1, textAlign:'center', paddingBottom:'16px',
          }}>
            I make programming{" "}
            <span style={{ color:'var(--accent)', position:'relative', display:'inline-block' }}>
              simple.
              <motion.span
                style={{ position:'absolute', bottom:'-4px', left:0, height:'3px', background:'var(--accent)', borderRadius:'2px' }}
                initial={{ width:0 }} whileInView={{ width:'100%' }}
                viewport={{ once:true }} transition={{ duration:0.6, delay:0.3 }}
              />
            </span>
          </h1>
          <p style={{ color:'var(--text-secondary)', fontSize:'14px', textAlign:'center', maxWidth:'520px', margin:'0 auto', paddingBottom:'32px', lineHeight:1.75 }}>
            Teaching MERN Stack, Python, Web Fundamentals, O Level and ADCA — practical, project-based approach.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  )
}

// ─── Topic Cards ──────────────────────────────────────────────
function TopicCards() {
  return (
    <section style={{ padding:'40px 0' }}>
      <div className="container-main">
        <RevealOnScroll>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight:700, color:'var(--text-heading)', letterSpacing:'-0.02em', marginBottom:'20px' }}>
            What I teach
          </h2>
        </RevealOnScroll>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'16px' }}>
          {TEACHING.map((subject, i) => (
            <RevealOnScroll key={subject._id} delay={i * 0.06} direction="up">
              <div style={{
                background:    'var(--bg-card)',
                border:        '1px solid var(--border)',
                borderRadius:  '14px',
                padding:       '22px',
                height:        '100%',
                display:       'flex',
                flexDirection: 'column',
                gap:           '12px',
                transition:    'transform 0.25s, border-color 0.25s, box-shadow 0.25s',
                cursor:        'default',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform   = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.boxShadow   = '0 10px 32px rgba(0,0,0,0.35)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform   = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow   = 'none'
                }}
              >
                {/* Icon + Title row */}
                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <span style={{
                    fontSize:'1.2rem', width:'40px', height:'40px', flexShrink:0,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    background:'var(--accent-dim)', border:'1px solid rgba(0,212,170,0.2)',
                    borderRadius:'10px',
                  }}>
                    {subject.icon}
                  </span>
                  <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'0.92rem', fontWeight:700, color:'var(--text-heading)', lineHeight:1.3 }}>
                    {subject.subject}
                  </h3>
                </div>

                {/* Description */}
                <p style={{ fontSize:'12px', color:'var(--text-secondary)', lineHeight:1.7 }}>
                  {subject.description}
                </p>

                {/* Topic list */}
                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'5px', marginTop:'auto' }}>
                  {subject.topics.slice(0,3).map(t => (
                    <li key={t} style={{ fontSize:'11px', color:'var(--text-secondary)', display:'flex', gap:'7px', alignItems:'flex-start' }}>
                      <span style={{ color:'var(--accent)', flexShrink:0, marginTop:'1px' }}>▸</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Curriculum Accordion ─────────────────────────────────────
function CurriculumAccordion() {
  const [openId, setOpenId] = useState(null)
  const toggle = (id) => setOpenId(p => p === id ? null : id)
  return (
    <section style={{ padding:'0 0 40px', background:'var(--bg-secondary)' }}>
      <div className="container-main" style={{ paddingTop:'32px' }}>
        <RevealOnScroll>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(1.3rem, 2.5vw, 1.7rem)', fontWeight:700, color:'var(--text-heading)', marginBottom:'16px', letterSpacing:'-0.02em' }}>
            Curriculum
          </h2>
        </RevealOnScroll>
        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          {TEACHING.map((subject, si) => (
            <RevealOnScroll key={subject._id} delay={si * 0.05}>
              <div style={{ borderRadius:'10px', overflow:'hidden', border:'1px solid var(--border)', background:'var(--bg-card)' }}>
                {subject.accordionContent?.map((item, i) => {
                  const id = `${subject._id}-${i}`
                  const isOpen = openId === id
                  return (
                    <div key={id} style={{ borderBottom: i < subject.accordionContent.length-1 ? '1px solid var(--border)' : 'none' }}>
                      <button onClick={() => toggle(id)} style={{
                        width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                        padding:'12px 16px', background: isOpen ? 'var(--accent-dim)' : 'transparent',
                        border:'none', cursor:'pointer', textAlign:'left', transition:'background 0.2s',
                      }}>
                        <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                          <span style={{ fontFamily:'DM Mono, monospace', fontSize:'9px', background:'var(--accent-dim)', color:'var(--accent)', padding:'2px 7px', borderRadius:'4px' }}>
                            {subject.icon} {subject.subject}
                          </span>
                          <span style={{ fontFamily:'Syne, sans-serif', fontSize:'12px', fontWeight:600, color: isOpen ? 'var(--accent)' : 'var(--text-heading)' }}>
                            {item.title}
                          </span>
                        </span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration:0.22 }} style={{ color:'var(--text-secondary)', flexShrink:0 }}>
                          <ChevronDown size={14}/>
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="body" initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} style={{ overflow:'hidden' }}>
                            <div style={{ padding:'10px 16px', display:'flex', flexWrap:'wrap', gap:'5px' }}>
                              {item.items.map(t => (
                                <span key={t} style={{ fontFamily:'DM Mono, monospace', fontSize:'10px', color:'var(--accent)', background:'var(--accent-dim)', padding:'2px 8px', borderRadius:'20px' }}>{t}</span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Star Rating (readonly) ───────────────────────────────────
function StarRating({ value = 5 }) {
  return (
    <div style={{ display:'flex', gap:'2px' }}>
      {[1,2,3,4,5].map(n => (
        <Star key={n} size={13} fill={n <= value ? '#f59e0b' : 'none'} style={{ color: n <= value ? '#f59e0b' : 'var(--border)' }}/>
      ))}
    </div>
  )
}

// ─── Testimonials Marquee ─────────────────────────────────────
function TestimonialsMarquee() {
  const [testimonials, setTestimonials] = useState([])
  const [loading,      setLoading]      = useState(true)
  const trackRef = useRef(null)

  useEffect(() => {
    api.get('/api/testimonials')
      .then(r => setTestimonials(r.data || []))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null
  if (testimonials.length === 0) return (
    <section style={{ padding:'40px 0 60px' }}>
      <div className="container-main">
        <div style={{ textAlign:'center', padding:'40px', background:'var(--bg-card)', border:'1px dashed var(--border)', borderRadius:'16px' }}>
          <MessageCircle size={28} style={{ color:'var(--text-secondary)', margin:'0 auto 10px' }}/>
          <p style={{ fontFamily:'DM Mono, monospace', fontSize:'12px', color:'var(--text-secondary)' }}>
            Student feedback coming soon.
          </p>
        </div>
      </div>
    </section>
  )

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials]

  return (
    <section style={{ padding:'40px 0 60px' }}>
      <div className="container-main">
        <RevealOnScroll>
          <p className="section-tag">Student Feedback</p>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight:700, color:'var(--text-heading)', letterSpacing:'-0.02em', marginBottom:'28px' }}>
            What students say
          </h2>
        </RevealOnScroll>
      </div>

      {/* Full-width marquee */}
      <div style={{ overflow:'hidden', position:'relative' }}>
        {/* Left fade */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right, var(--bg-primary), transparent)', zIndex:1, pointerEvents:'none' }}/>
        {/* Right fade */}
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left, var(--bg-primary), transparent)', zIndex:1, pointerEvents:'none' }}/>

        <div
          ref={trackRef}
          style={{
            display:'flex',
            gap:'16px',
            width:'max-content',
            animation:'testimonial-scroll 40s linear infinite',
            paddingBottom:'8px',
          }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState='paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState='running'}
        >
          {doubled.map((t, i) => (
            <div key={`${t._id}-${i}`} style={{
              background:'var(--bg-card)',
              border:'1px solid var(--border)',
              borderTop:'2px solid var(--accent)',
              borderRadius:'14px',
              padding:'18px 20px',
              width:'280px',
              flexShrink:0,
              display:'flex',
              flexDirection:'column',
              gap:'10px',
            }}>
              <MessageCircle size={18} style={{ color:'var(--accent)', opacity:0.6 }}/>
              <p style={{ fontSize:'12px', color:'var(--text-secondary)', lineHeight:1.75, fontStyle:'italic', flex:1 }}>
                "{t.content.length > 120 ? t.content.slice(0,120) + '...' : t.content}"
              </p>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'var(--accent-dim)', border:'1px solid rgba(0,212,170,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <User size={14} style={{ color:'var(--accent)' }}/>
                  </div>
                  <div>
                    <p style={{ fontFamily:'Syne, sans-serif', fontSize:'12px', fontWeight:600, color:'var(--text-heading)' }}>{t.name}</p>
                    {t.role && <p style={{ fontFamily:'DM Mono, monospace', fontSize:'9px', color:'var(--text-secondary)' }}>{t.role}</p>}
                  </div>
                </div>
                <StarRating value={t.rating||5}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Teaching Page ────────────────────────────────────────────
export default function Teaching() {
  return (
    <>
      <SEO title="Teaching" description="Alok Abhinandan teaches MERN Stack, Python, Web Development, O Level and ADCA. Practical, project-based learning." path="/teaching"/>
      <main className="page-top">
        <TeachingHero/>
        <TopicCards/>
        <CurriculumAccordion/>
        <TestimonialsMarquee/>
      </main>
    </>
  )
}