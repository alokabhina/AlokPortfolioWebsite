import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Instagram } from 'lucide-react'
import { buildWhatsAppLink } from '@/lib'
import { PERSONAL } from '@/data/content'

function WhatsAppIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

const QUICK_COL1 = [
  { label: 'About',      to: '/about'      },
  { label: 'Services',   to: '/services'   },
  { label: 'Projects',   to: '/projects'   },
]
const QUICK_COL2 = [
  { label: 'Teaching',   to: '/teaching'   },
  { label: 'Experience', to: '/experience' },
  { label: 'Contact',    to: '/contact'    },
]

const SOCIAL = [
  { icon: Github,    href: PERSONAL.github,    label: 'GitHub'    },
  { icon: Linkedin,  href: PERSONAL.linkedin,  label: 'LinkedIn'  },
  { icon: Mail,      href: `mailto:${PERSONAL.email}`, label: 'Email' },
  { icon: Instagram, href: PERSONAL.instagram, label: 'Instagram' },
]

const linkStyle = {
  fontSize:       '13px',
  color:          'var(--text-secondary)',
  textDecoration: 'none',
  transition:     'color 0.2s',
  display:        'block',
  marginBottom:   '8px',
}

export default function Footer() {
  return (
    <footer style={{ position:'relative', zIndex:10, marginTop:'5rem', borderTop:'1px solid var(--border)', background:'var(--bg-secondary)' }}>
      <div style={{ height:'2px', background:'linear-gradient(90deg, transparent, var(--accent), transparent)' }}/>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'2.5rem 1.5rem' }}>
        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'2rem', marginBottom:'2rem' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily:'Syne, sans-serif', fontWeight:800, fontSize:'1.2rem', color:'var(--text-heading)', letterSpacing:'-0.03em', marginBottom:'0.75rem' }}>
              {'<'}<span style={{ color:'var(--accent)' }}>Alok</span>{'/>'} 
            </div>
            <p style={{ fontSize:'12px', color:'var(--text-secondary)', lineHeight:1.7 }}>
              Full-Stack Developer &amp; Educator.<br/>Building web apps and<br/>teaching programming.
            </p>
          </div>

          {/* Quick Links Col 1 */}
          <div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--accent)', marginBottom:'1rem' }}>
              Pages
            </div>
            {QUICK_COL1.map(({ label, to }) => (
              <Link key={to} to={to} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                {label}
              </Link>
            ))}
          </div>

          {/* Quick Links Col 2 */}
          <div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--accent)', marginBottom:'1rem' }}>
              More
            </div>
            {QUICK_COL2.map(({ label, to }) => (
              <Link key={to} to={to} style={linkStyle}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                {label}
              </Link>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div style={{ fontFamily:'DM Mono, monospace', fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--accent)', marginBottom:'1rem' }}>
              Connect
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer" aria-label={label}
                  style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%', border:'1px solid var(--border)', color:'var(--text-secondary)', transition:'all 0.2s', textDecoration:'none' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-secondary)' }}>
                  <Icon size={14}/>
                </a>
              ))}
              <a href={buildWhatsAppLink(PERSONAL.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                style={{ width:'34px', height:'34px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'50%', border:'1px solid var(--border)', color:'var(--text-secondary)', transition:'all 0.2s', textDecoration:'none' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='#25D366'; e.currentTarget.style.color='#25D366' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-secondary)' }}>
                <WhatsAppIcon/>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop:'1.25rem', borderTop:'1px solid var(--border)', textAlign:'center' }}>
          <p style={{ fontFamily:'DM Mono, monospace', fontSize:'11px', color:'var(--text-secondary)', marginBottom:'8px' }}>
            © 2025 <span style={{ color:'var(--accent)' }}>Alok Abhinandan</span>. Built with MERN Stack.
          </p>
          {/* Admin link - centered, subtle */}
          <Link to="/admin-login"
            style={{ fontFamily:'DM Mono, monospace', fontSize:'10px', color:'var(--border)', opacity:0.35, textDecoration:'none', transition:'all 0.2s', letterSpacing:'0.15em' }}
            onMouseEnter={e => { e.currentTarget.style.opacity='0.8'; e.currentTarget.style.color='var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity='0.35'; e.currentTarget.style.color='var(--border)' }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}