import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO, RevealOnScroll } from '@/components'
import { PERSONAL } from '@/data/content'
import { buildWhatsAppLink } from '@/lib'

const SERVICES = [
  {
    id:    'frontend',
    icon:  '⬡',
    title: 'Frontend Development',
    short: 'Pixel-perfect, responsive UIs',
    desc:  'Building fast, modern web interfaces using React.js, Tailwind CSS, and best practices. Mobile-first, SEO-optimized, accessible.',
    tags:  ['React.js', 'Tailwind CSS', 'Responsive', 'SEO', 'Vite'],
  },
  {
    id:    'backend',
    icon:  '⬢',
    title: 'Backend Development',
    short: 'Robust APIs & server logic',
    desc:  'Designing and building RESTful APIs, authentication systems, database architecture, and cloud integrations using Node.js, Express, and MongoDB.',
    tags:  ['Node.js', 'Express', 'MongoDB', 'REST API', 'JWT'],
  },
  {
    id:    'fullstack',
    icon:  '◈',
    title: 'Full-Stack MERN Project',
    short: 'End-to-end web applications',
    desc:  'Complete full-stack web applications from design to deployment. Database to UI, authentication to payment — everything handled.',
    tags:  ['MERN Stack', 'Cloudinary', 'Vercel', 'Render', 'MongoDB Atlas'],
    featured: true,
  },
  {
    id:    'landing',
    icon:  '◇',
    title: 'Landing Page / Portfolio',
    short: 'High-converting web presence',
    desc:  'Clean, professional landing pages and portfolio websites. Fast loading, well-designed, optimized for conversions.',
    tags:  ['HTML/CSS', 'React', 'Animation', 'Performance'],
  },
  {
    id:    'services-page',
    icon:  '◆',
    title: 'Service / Business Website',
    short: 'Complete business web presence',
    desc:  'Multi-page business or service websites with admin control, contact forms, galleries, and SEO optimization.',
    tags:  ['React', 'Node.js', 'Admin Panel', 'SEO', 'Forms'],
  },
  {
    id:    'college',
    icon:  '○',
    title: 'College Project / Thesis Writing',
    short: 'Academic projects & documentation',
    desc:  'Final year projects, mini projects, and thesis writing support. Complete working project with documentation, README, and deployment.',
    tags:  ['MERN / Python', 'Documentation', 'Deployment', 'Report Writing'],
  },
]

function ServiceCard({ service, onContact }) {
  return (
    <RevealOnScroll>
      <div
        style={{
          background:   'var(--bg-card)',
          border:       service.featured ? '1px solid var(--accent)' : '1px solid var(--border)',
          borderRadius: '16px',
          padding:      '28px',
          height:       '100%',
          display:      'flex',
          flexDirection:'column',
          gap:          '14px',
          position:     'relative',
          transition:   'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform    = 'translateY(-5px)'
          e.currentTarget.style.boxShadow    = '0 16px 48px rgba(0,0,0,0.4)'
          e.currentTarget.style.borderColor  = 'var(--accent)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform    = 'translateY(0)'
          e.currentTarget.style.boxShadow    = 'none'
          e.currentTarget.style.borderColor  = service.featured ? 'var(--accent)' : 'var(--border)'
        }}
      >
        {/* Featured badge */}
        {service.featured && (
          <span style={{
            position:   'absolute', top: '-12px', left: '20px',
            fontFamily: 'DM Mono, monospace', fontSize: '10px', fontWeight: 600,
            background: 'var(--accent)', color: 'var(--bg-primary)',
            padding:    '3px 12px', borderRadius: '20px',
          }}>
            Most Popular
          </span>
        )}

        {/* Icon */}
        <div style={{
          width: '44px', height: '44px',
          background:   'var(--accent-dim)',
          border:       '1px solid rgba(0,212,170,0.2)',
          borderRadius: '12px',
          display:      'flex', alignItems: 'center', justifyContent: 'center',
          fontSize:     '1.3rem', color: 'var(--accent)',
        }}>
          {service.icon}
        </div>

        {/* Title */}
        <div>
          <h3 style={{
            fontFamily: 'Syne, sans-serif', fontSize: '1.05rem',
            fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px',
          }}>
            {service.title}
          </h3>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--accent)' }}>
            {service.short}
          </p>
        </div>

        {/* Description */}
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.75, flex: 1 }}>
          {service.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {service.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'DM Mono, monospace', fontSize: '10px',
              color: 'var(--accent)', background: 'var(--accent-dim)',
              padding: '3px 9px', borderRadius: '4px',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
          {/* Price note */}
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            💬 Price discussed on requirements
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <a
              href={buildWhatsAppLink(PERSONAL.whatsapp, `Hi Alok! I'm interested in your ${service.title} service.`)}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '6px', padding: '9px',
                background: '#25D366', color: '#fff',
                borderRadius: '8px', textDecoration: 'none',
                fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 600,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              {/* WhatsApp icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <Link
              to="/contact"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '9px',
                background: 'transparent', color: 'var(--accent)',
                border: '1px solid var(--accent)',
                borderRadius: '8px', textDecoration: 'none',
                fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 600,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-dim)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Contact Form
            </Link>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  )
}

export default function Services() {
  return (
    <>
      <SEO
        title="Services"
        description="Freelance web development services by Alok Abhinandan — Frontend, Backend, MERN Stack, Landing Pages, College Projects."
        path="/services"
      />
      <main className="page-top">
        <div style={{ paddingTop: '32px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>

          {/* Header */}
          <RevealOnScroll>
            <p className="section-tag">Services</p>
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em', marginBottom: '8px',
            }}>
              What I can <span style={{ color: 'var(--accent)' }}>build for you</span>
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px', maxWidth: '520px', lineHeight: 1.75 }}>
              Freelance web development services — from simple landing pages to full-stack applications.
              Price is always discussed based on your requirements.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--green)', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', padding: '5px 14px', borderRadius: '20px', marginBottom: '40px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
              Available for freelance work
            </div>
          </RevealOnScroll>

          {/* Services grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {SERVICES.map(s => (
              <ServiceCard key={s.id} service={s}/>
            ))}
          </div>

          {/* Bottom CTA */}
          <RevealOnScroll>
            <div style={{
              marginTop: '56px', textAlign: 'center', padding: '40px',
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '20px',
            }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '8px' }}>
                Have a project in mind?
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Let&apos;s discuss your requirements and build something great together.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={buildWhatsAppLink(PERSONAL.whatsapp, "Hi Alok! I have a project to discuss.")}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'var(--accent)', color: 'var(--bg-primary)', borderRadius: '10px', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 600 }}
                >
                  💬 Chat on WhatsApp
                </a>
                <Link to="/contact"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'transparent', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: '10px', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 600 }}
                >
                  ✉ Send a Message
                </Link>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </main>
    </>
  )
}