import { useFetch } from '@/hooks'
import { SEO, RevealOnScroll } from '@/components'
import { SKILLS } from '@/data/content'

// Devicon image component with fallback letter
function SkillIcon({ name, iconUrl }) {
  if (!iconUrl) return (
    <span style={{
      width:'18px', height:'18px', borderRadius:'4px',
      background:'var(--accent-dim)', border:'1px solid rgba(0,212,170,0.3)',
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      flexShrink:0, fontSize:'9px', fontWeight:700,
      color:'var(--accent)', fontFamily:'DM Mono, monospace',
    }}>
      {name.charAt(0).toUpperCase()}
    </span>
  )
  return (
    <img src={iconUrl} alt={name} width={16} height={16}
      style={{ objectFit:'contain', flexShrink:0 }}
      onError={e => {
        e.target.style.display='none'
        // show letter fallback
        const fallback = document.createElement('span')
        fallback.textContent = name.charAt(0).toUpperCase()
        fallback.style.cssText = 'width:18px;height:18px;border-radius:4px;background:var(--accent-dim);border:1px solid rgba(0,212,170,0.3);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;font-weight:700;color:var(--accent);font-family:DM Mono,monospace;'
        e.target.parentNode.insertBefore(fallback, e.target)
      }}
    />
  )
}

// Single skill chip
function SkillChip({ skill }) {
  return (
    <div style={{
      display:     'flex',
      alignItems:  'center',
      gap:         '7px',
      padding:     '7px 12px',
      borderRadius:'8px',
      background:  'var(--bg-secondary)',
      border:      '1px solid var(--border)',
      transition:  'all 0.2s',
      cursor:      'default',
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
      <SkillIcon name={skill.name} iconUrl={skill.iconUrl}/>
      <span style={{ fontFamily:'DM Mono, monospace', fontSize:'11px', color:'var(--text-primary)', whiteSpace:'nowrap' }}>
        {skill.name}
      </span>
    </div>
  )
}

// Category card - unique layout per category
function CategoryCard({ category, index, delay }) {
  const accents = ['var(--accent)', '#60a5fa', '#a78bfa', '#f472b6', '#34d399', '#fb923c']
  const color = accents[index % accents.length]

  return (
    <RevealOnScroll delay={delay} direction="up">
      <div style={{
        background:   'var(--bg-card)',
        border:       '1px solid var(--border)',
        borderTop:    `3px solid ${color}`,
        borderRadius: '14px',
        padding:      '22px',
        height:       '100%',
        display:      'flex',
        flexDirection:'column',
        gap:          '16px',
        transition:   'box-shadow 0.25s',
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <span style={{
            fontFamily:  'DM Mono, monospace',
            fontSize:    '1.1rem',
            width:       '38px', height:'38px',
            display:     'flex', alignItems:'center', justifyContent:'center',
            borderRadius:'10px',
            background:  `rgba(${color === 'var(--accent)' ? '0,212,170' : '96,165,250'}, 0.12)`,
            color,
          }}>
            {category.icon}
          </span>
          <h3 style={{ fontFamily:'Syne, sans-serif', fontSize:'0.95rem', fontWeight:700, color:'var(--text-heading)' }}>
            {category.category}
          </h3>
          <span style={{ marginLeft:'auto', fontFamily:'DM Mono, monospace', fontSize:'10px', color:'var(--text-secondary)' }}>
            {category.items.length} skills
          </span>
        </div>

        {/* Skills */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:'7px' }}>
          {category.items.map(skill => (
            <SkillChip key={skill.name} skill={skill}/>
          ))}
        </div>
      </div>
    </RevealOnScroll>
  )
}

export default function Skills() {
  const { data: rawSkills } = useFetch('/api/skills', null)

  const categories = rawSkills?.grouped && Object.keys(rawSkills.grouped).length > 0
    ? Object.entries(rawSkills.grouped).map(([cat, items]) => ({ category: cat, icon: '⚙', items }))
    : SKILLS

  return (
    <>
      <SEO title="Skills" description="Alok Abhinandan skills — JavaScript, Python, React, Node.js, MongoDB and more." path="/skills"/>
      <main className="page-top">
        <div style={{ paddingTop:'32px', paddingBottom:'80px', maxWidth:'1200px', margin:'0 auto', paddingLeft:'1.5rem', paddingRight:'1.5rem' }}>

          <RevealOnScroll>
            <p className="section-tag">02. Skills</p>
            <h1 style={{ fontFamily:'Syne, sans-serif', fontSize:'clamp(1.8rem, 4vw, 2.8rem)', fontWeight:800, color:'var(--text-heading)', letterSpacing:'-0.02em', marginBottom:'8px' }}>
              What I <span style={{ color:'var(--accent)' }}>work with</span>
            </h1>
            <p style={{ fontSize:'13px', color:'var(--text-secondary)', marginBottom:'32px', maxWidth:'480px' }}>
              Technologies and tools I use to build full-stack apps and teach programming.
            </p>
          </RevealOnScroll>

          {/* Masonry-like grid - 2 cols on md, fill remaining space */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px' }}>
            {categories.map((cat, i) => (
              <CategoryCard key={cat.category} category={cat} index={i} delay={i * 0.08}/>
            ))}
          </div>

          <RevealOnScroll delay={0.3}>
            <div style={{ textAlign:'center', marginTop:'40px', padding:'20px', background:'var(--bg-card)', border:'1px solid var(--border)', borderRadius:'12px' }}>
              <p style={{ fontFamily:'DM Mono, monospace', fontSize:'12px', color:'var(--text-secondary)' }}>
                🚀 Always learning — currently exploring{" "}
                <span style={{ color:'var(--accent)', fontWeight:600 }}>TypeScript</span>,{" "}
                <span style={{ color:'var(--accent)', fontWeight:600 }}>Next.js</span>, and{" "}
                <span style={{ color:'var(--accent)', fontWeight:600 }}>Advanced AI Tools</span>
              </p>
            </div>
          </RevealOnScroll>

        </div>
      </main>
    </>
  )
}