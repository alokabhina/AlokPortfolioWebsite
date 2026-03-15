import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PenLine, Bell } from 'lucide-react'
import { SEO, RevealOnScroll } from '@/components'

export default function Blog() {
  const [email,    setEmail]    = useState('')
  const [notified, setNotified] = useState(false)

  const handleNotify = (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email.', {
        style: { background: 'var(--bg-card)', color: 'var(--text-heading)', border: '1px solid #EF4444' },
      })
      return
    }
    // In production: POST to /api/notify or a mailing list
    setNotified(true)
    toast.success('You\'ll be notified when articles go live!', {
      style: { background: 'var(--bg-card)', color: 'var(--text-heading)', border: '1px solid var(--accent)' },
      iconTheme: { primary: '#00D4AA', secondary: '#060A10' },
    })
    setEmail('')
  }

  return (
    <>
      <SEO
        title="Blog — Coming Soon"
        description="Alok Abhinandan's writing on MERN Stack, Python, web development tips, and teaching resources — coming soon."
        path="/blog"
      />

      <main className="page-top min-h-screen flex items-center">
        <section className="section-pad w-full">
          <div className="container-main">
            <div
              className="max-w-2xl mx-auto text-center py-20 px-8 rounded-2xl"
              style={{
                background: 'var(--bg-card)',
                border:     '1px dashed var(--border)',
              }}
            >
              <RevealOnScroll>
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'var(--accent-dim)' }}
                >
                  <PenLine size={28} style={{ color: 'var(--accent)' }} />
                </div>

                {/* Section tag */}
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  Coming Soon
                </p>

                {/* Headline */}
                <h1
                  className="font-display font-extrabold mb-4"
                  style={{
                    fontSize:      'clamp(1.8rem, 4vw, 2.8rem)',
                    color:         'var(--text-heading)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Writing &amp; Tutorials
                </h1>

                {/* Description */}
                <p
                  className="text-base leading-relaxed mb-8 max-w-md mx-auto"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  I&apos;ll be sharing MERN Stack tips, Python guides,
                  teaching resources, and developer deep-dives here soon.
                  Drop your email to get notified when the first article goes live.
                </p>

                {/* Topics preview chips */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {['MERN Stack', 'Python', 'React Tips', 'Node.js', 'Teaching', 'Web Dev'].map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>

                {/* Notify form */}
                {!notified ? (
                  <form
                    onSubmit={handleNotify}
                    className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 px-4 py-3 rounded-lg font-mono text-sm"
                      style={{
                        background:   'var(--bg-secondary)',
                        border:       '1px solid var(--border)',
                        color:        'var(--text-heading)',
                        outline:      'none',
                      }}
                      onFocus={e  => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e   => e.target.style.borderColor = 'var(--border)'}
                    />
                    <button type="submit" className="btn-primary shrink-0">
                      <Bell size={15} />
                      Notify me
                    </button>
                  </form>
                ) : (
                  <p
                    className="font-mono text-sm"
                    style={{ color: 'var(--accent)' }}
                  >
                    ✓ You&apos;re on the list!
                  </p>
                )}
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}