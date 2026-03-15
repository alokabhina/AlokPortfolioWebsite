import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Instagram } from 'lucide-react'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import ThemeToggle from '@/components/ThemeToggle'
import { scrollToSection, cn } from '@/lib/utils'

// Nav links — id matches section IDs on Home page for scroll spy
const NAV_LINKS = [
  { label: 'About',      href: '/about',       sectionId: 'about'      },
  { label: 'Services',   href: '/services',    sectionId: 'services'   },
  { label: 'Skills',     href: '/skills',      sectionId: 'skills'     },
  { label: 'Projects',   href: '/projects',    sectionId: 'projects'   },
  { label: 'Teaching',   href: '/teaching',    sectionId: 'teaching'   },
  { label: 'Experience', href: '/experience',  sectionId: 'experience' },
  { label: 'Gallery',    href: '/gallery',     sectionId: 'gallery'    },
  { label: 'Contact',    href: '/contact',     sectionId: 'contact'    },
]

const SECTION_IDS = NAV_LINKS.map(l => l.sectionId)

const SOCIAL_LINKS = [
  { icon: Github,    href: 'https://github.com/alokabhina',        label: 'GitHub'    },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/alok-abhinandan-866619241/',   label: 'LinkedIn'  },
  { icon: Instagram, href: 'https://www.instagram.com/alok_abhinandan4',     label: 'Instagram' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const location = useLocation()
  const isHome   = location.pathname === '/'

  // Scroll spy — works on Home page where all sections exist
  const activeSection = useScrollSpy(SECTION_IDS, 80)

  // Solid navbar after scrolling 60px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  /** Determine if a nav link is "active" */
  function isActive(link) {
    if (isHome) {
      // On home page — active = current scroll-spied section
      return activeSection === link.sectionId
    }
    // On other pages — active = current route
    return location.pathname === link.href
  }

  /** Handle nav link click */
  function handleNavClick(e, link) {
    // On home page - smooth scroll to section
    if (isHome) {
      e.preventDefault()
      scrollToSection(link.sectionId)
    }
    // On other pages - normal navigation (Link component handles it)
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
          scrolled
            ? 'shadow-[0_1px_0_var(--border)] backdrop-blur-nav'
            : 'backdrop-blur-[10px]'
        )}
        style={{ background: 'var(--nav-bg)', height: '72px' }}
      >
        <div className="container-main h-full flex items-center justify-between gap-6">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            to="/"
            className="font-display font-extrabold text-xl shrink-0 transition-colors duration-200"
            style={{ color: 'var(--text-heading)', letterSpacing: '-0.03em' }}
          >
            {'<'}<span style={{ color: 'var(--accent)' }}>Alok</span>{' />'}
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────── */}
          <ul className="hidden lg:flex items-center gap-5 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn('nav-link', isActive(link) && 'active')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Right: Socials + Theme Toggle ────────────────── */}
          <div className="hidden lg:flex items-center gap-2">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={cn(
                  'w-8 h-8 flex items-center justify-center rounded-full',
                  'transition-all duration-200',
                  'hover:scale-110'
                )}
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <Icon size={17} />
              </a>
            ))}
            <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
            <ThemeToggle />
          </div>

          {/* ── Mobile: Theme + Hamburger ─────────────────────── */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              className={cn(
                'w-9 h-9 flex items-center justify-center rounded-full',
                'border transition-all duration-200',
                'hover:scale-105 active:scale-95'
              )}
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[98]"
              style={{ background: 'rgba(6,10,16,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[99] w-72 flex flex-col"
              style={{
                background: 'var(--bg-card)',
                borderLeft: '1px solid var(--border)',
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 h-[72px]"
                style={{ borderBottom: '1px solid var(--border)' }}
              >
                <span
                  className="font-display font-extrabold text-lg"
                  style={{ color: 'var(--accent)' }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex flex-col gap-1 p-6 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block px-4 py-3 rounded-lg font-mono text-sm',
                        'transition-all duration-200',
                        isActive(link)
                          ? 'text-teal-primary bg-[var(--accent-dim)]'
                          : 'text-content-secondary hover:text-teal-primary hover:bg-[var(--accent-dim)]'
                      )}
                    >
                      <span style={{ color: 'var(--accent)', marginRight: '10px', fontSize: '11px' }}>
                        {String(NAV_LINKS.indexOf(link) + 1).padStart(2, '0')}.
                      </span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer socials */}
              <div
                className="flex items-center gap-4 px-6 py-5"
                style={{ borderTop: '1px solid var(--border)' }}
              >
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}