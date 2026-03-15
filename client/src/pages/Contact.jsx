import { Github, Linkedin, Mail, Instagram, MessageCircle } from 'lucide-react'
import { SEO, ContactForm, RevealOnScroll } from '@/components'
import { PERSONAL } from '@/data/content'
import { buildWhatsAppLink } from '@/lib'

// ── Info card ─────────────────────────────────────────────────
function InfoCard({ icon: Icon, label, value, href, color }) {
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:-translate-y-1"
      style={{
        background:  'var(--bg-card)',
        border:      '1px solid var(--border)',
        textDecoration: 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = color || 'var(--accent)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <span
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'var(--accent-dim)' }}
      >
        <Icon size={18} style={{ color: color || 'var(--accent)' }} />
      </span>
      <div>
        <p className="font-mono text-xs mb-0.5" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>
          {value}
        </p>
      </div>
    </a>
  )
}

// ── WhatsApp button ───────────────────────────────────────────
function WhatsAppButton() {
  const link = buildWhatsAppLink(
    PERSONAL.whatsapp,
    'Hello! I saw your portfolio and wanted to connect.'
  )

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-mono text-sm font-semibold transition-all duration-200 hover:-translate-y-1"
      style={{
        background:  'rgba(37,211,102,0.1)',
        border:      '1px solid rgba(37,211,102,0.3)',
        color:       '#25D366',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background   = 'rgba(37,211,102,0.18)'
        e.currentTarget.style.borderColor  = '#25D366'
        e.currentTarget.style.boxShadow    = '0 0 20px rgba(37,211,102,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background   = 'rgba(37,211,102,0.1)'
        e.currentTarget.style.borderColor  = 'rgba(37,211,102,0.3)'
        e.currentTarget.style.boxShadow    = 'none'
      }}
    >
      {/* WhatsApp icon */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      Chat on WhatsApp
    </a>
  )
}

// ── Contact Page ──────────────────────────────────────────────
export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Alok Abhinandan — for collaborations, teaching inquiries, or project discussions."
        path="/contact"
      />

      <main className="page-top">
        <section className="section-pad">
          <div className="container-main">

            {/* Header */}
            <RevealOnScroll>
              <p className="section-tag">08. Contact</p>
              <h1
                className="font-display font-extrabold mb-4"
                style={{
                  fontSize:      'clamp(2rem, 4vw, 3rem)',
                  color:         'var(--text-heading)',
                  letterSpacing: '-0.02em',
                }}
              >
                Let&apos;s{' '}
                <span style={{ color: 'var(--accent)' }}>connect</span>
              </h1>
              <p
                className="text-base max-w-xl mb-14"
                style={{ color: 'var(--text-secondary)' }}
              >
                Whether you want to collaborate, learn programming, or
                discuss a project — feel free to reach out. I usually
                respond within 24 hours.
              </p>
            </RevealOnScroll>

            {/* 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — Contact form */}
              <RevealOnScroll direction="left">
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    background: 'var(--bg-card)',
                    border:     '1px solid var(--border)',
                  }}
                >
                  <h2
                    className="font-display font-bold mb-6 text-lg"
                    style={{ color: 'var(--text-heading)' }}
                  >
                    Send a message
                  </h2>
                  <ContactForm />
                </div>
              </RevealOnScroll>

              {/* Right — Info cards + WhatsApp */}
              <RevealOnScroll direction="right" delay={0.15}>
                <div className="flex flex-col gap-4">

                  <h2
                    className="font-display font-bold mb-2 text-lg"
                    style={{ color: 'var(--text-heading)' }}
                  >
                    Or reach me directly
                  </h2>

                  <InfoCard
                    icon={Mail}
                    label="Email"
                    value={PERSONAL.email}
                    href={`mailto:${PERSONAL.email}`}
                  />
                  <InfoCard
                    icon={Github}
                    label="GitHub"
                    value={PERSONAL.github.replace('https://', '')}
                    href={PERSONAL.github}
                  />
                  <InfoCard
                    icon={Linkedin}
                    label="LinkedIn"
                    value={PERSONAL.linkedin.replace('https://', '')}
                    href={PERSONAL.linkedin}
                  />
                  <InfoCard
                    icon={Instagram}
                    label="Instagram"
                    value={PERSONAL.instagram.replace('https://', '')}
                    href={PERSONAL.instagram}
                    color="#E1306C"
                  />

                  {/* Divider */}
                  <div
                    className="my-2"
                    style={{ borderTop: '1px solid var(--border)' }}
                  />

                  {/* WhatsApp button */}
                  <WhatsAppButton />

                  {/* Response time note */}
                  <p
                    className="font-mono text-xs text-center mt-2"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Avg response time: within 12 hours
                  </p>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}