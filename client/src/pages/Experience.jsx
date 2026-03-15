import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SEO, RevealOnScroll, LazyImage } from '@/components'
import { useFetch } from '@/hooks'
import { EXPERIENCE, CERTIFICATIONS } from '@/data/content'
import { formatDate } from '@/lib'

// ─── Single Experience Card ───────────────────────────────────
function ExperienceCard({ exp, index }) {
  const typeColors = {
    work:      { bg: 'rgba(0,212,170,0.1)',  text: 'var(--accent)'  },
    teaching:  { bg: 'rgba(59,130,246,0.1)', text: '#60a5fa'        },
    freelance: { bg: 'rgba(249,115,22,0.1)', text: '#fb923c'        },
  }
  const tc = typeColors[exp.type] || typeColors.work

  return (
    <RevealOnScroll delay={index * 0.1} direction="up">
      <div
        style={{
          background:   'var(--bg-card)',
          border:       '1px solid var(--border)',
          borderLeft:   '3px solid var(--accent)',
          borderRadius: '0 14px 14px 0',
          padding:      '24px',
          height:       '100%',
          display:      'flex',
          flexDirection:'column',
          gap:          '12px',
          transition:   'transform 0.25s, box-shadow 0.25s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform   = 'translateX(4px)'
          e.currentTarget.style.boxShadow   = '-4px 0 20px rgba(0,212,170,0.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform   = 'translateX(0)'
          e.currentTarget.style.boxShadow   = 'none'
        }}
      >
        {/* Type badge */}
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '10px',
          padding: '3px 10px', borderRadius: '20px', alignSelf: 'flex-start',
          background: tc.bg, color: tc.text, textTransform: 'capitalize',
        }}>
          {exp.type}
        </span>

        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>
          {exp.title}
        </h3>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--accent)' }}>
          {exp.organization}
        </p>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
          {exp.current && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4ade80' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}/>
              Current
            </span>
          )}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
          {exp.description}
        </p>
        {exp.techUsed?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            {exp.techUsed.map(t => (
              <span key={t} style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: '3px' }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </RevealOnScroll>
  )
}

// ─── Experience Timeline ──────────────────────────────────────
function ExperienceSection({ experience }) {
  return (
    <div>
      <RevealOnScroll>
        <p className="section-tag">05. Experience</p>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.02em', marginBottom: '32px' }}>
          Where I've <span style={{ color: 'var(--accent)' }}>worked &amp; taught</span>
        </h1>
      </RevealOnScroll>

      {/* Responsive grid - auto-fill so cards are equal height */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {experience.map((exp, i) => (
          <ExperienceCard key={exp._id} exp={exp} index={i}/>
        ))}
      </div>
    </div>
  )
}

// ─── Certifications ───────────────────────────────────────────
function CertificationsSection({ certifications }) {
  if (!certifications?.length) return null

  const openFile = (url) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{ marginTop: '56px' }}>
      <RevealOnScroll>
        <p className="section-tag">Certifications</p>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
          Certificates &amp; Achievements
        </h2>
      </RevealOnScroll>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {certifications.map((cert, i) => (
          <RevealOnScroll key={cert._id} delay={i * 0.1}>
            <div
              onClick={() => openFile(cert.imageUrl || cert.credentialUrl)}
              style={{
                background:   'var(--bg-card)',
                border:       '1px solid var(--border)',
                borderRadius: '14px',
                overflow:     'hidden',
                cursor:       cert.imageUrl || cert.credentialUrl ? 'pointer' : 'default',
                transition:   'border-color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.transform   = 'translateY(-4px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.transform   = 'translateY(0)'
              }}
            >
              {/* Certificate image/PDF preview */}
              {cert.imageUrl && (
                <div style={{ height: '180px', overflow: 'hidden', background: 'var(--bg-secondary)', position: 'relative' }}>
                  {cert.imageUrl.match(/\.pdf$/i) ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '2.5rem' }}>📄</span>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--accent)' }}>Click to view PDF</span>
                    </div>
                  ) : (
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  )}
                  {/* Click hint overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,212,170,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: 0, transition: 'opacity 0.2s',
                  }}
                    className="cert-overlay"
                  >
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'var(--accent)', background: 'var(--bg-card)', padding: '6px 14px', borderRadius: '6px' }}>
                      View ↗
                    </span>
                  </div>
                </div>
              )}
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
                  {cert.title}
                </h3>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--accent)', marginBottom: '4px' }}>{cert.issuer}</p>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--text-secondary)' }}>{formatDate(cert.date)}</p>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'var(--accent)', textDecoration: 'none', display: 'inline-block', marginTop: '6px' }}>
                    Verify →
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}

// ─── Experience Page ──────────────────────────────────────────
export default function Experience() {
  const { data: experience }     = useFetch('/api/experience',     EXPERIENCE)
  const { data: certifications } = useFetch('/api/certifications', CERTIFICATIONS)

  return (
    <>
      <SEO title="Experience" description="Alok Abhinandan experience, teaching roles, and certifications." path="/experience"/>
      <main className="page-top">
        <div style={{ paddingTop: '32px', paddingBottom: '80px', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <ExperienceSection experience={experience}/>
          <CertificationsSection certifications={certifications}/>
        </div>
      </main>
    </>
  )
}