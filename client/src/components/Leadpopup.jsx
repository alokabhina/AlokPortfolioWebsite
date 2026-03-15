import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { api } from '@/lib'

/**
 * LeadPopup — slides in from top-right after 10 seconds
 * Asks for name, phone (optional), email (optional)
 * Saves to /api/analytics/lead endpoint
 * Shown once per session
 */
export default function Leadpopup() {
  const [show,     setShow]     = useState(false)
  const [step,     setStep]     = useState('form') // 'form' | 'thanks'
  const [name,     setName]     = useState('')
  const [phone,    setPhone]    = useState('')
  const [email,    setEmail]    = useState('')
  const [saving,   setSaving]   = useState(false)
  const [mounted,  setMounted]  = useState(false)

  useEffect(() => {
    // Don't show on admin pages
    if (window.location.pathname.startsWith('/admin')) return

    // Show only once per session
    if (sessionStorage.getItem('popup_seen')) return

    const timer = setTimeout(() => {
      setMounted(true)
      // Small delay for animation
      setTimeout(() => setShow(true), 50)
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setShow(false)
    sessionStorage.setItem('popup_seen', '1')
    setTimeout(() => setMounted(false), 400)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return

    setSaving(true)
    try {
      await api.post('/api/analytics/lead', {
        name:  name.trim(),
        phone: phone.trim() || null,
        email: email.trim() || null,
        page:  window.location.pathname,
      })
    } catch { /* silent fail */ }

    setSaving(false)
    setStep('thanks')
    sessionStorage.setItem('popup_seen', '1')
    setTimeout(() => handleClose(), 2500)
  }

  const handleSkip = () => {
    sessionStorage.setItem('popup_seen', '1')
    handleClose()
  }

  if (!mounted) return null

  return (
    <div
      style={{
        position:     'fixed',
        top:          '80px',
        right:        '20px',
        zIndex:       9999,
        width:        'min(340px, calc(100vw - 40px))',
        background:   'var(--bg-card)',
        border:       '1px solid var(--border)',
        borderRadius: '16px',
        boxShadow:    '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,212,170,0.1)',
        padding:      '24px',
        transition:   'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
        transform:    show ? 'translateX(0) scale(1)' : 'translateX(120%) scale(0.95)',
        opacity:      show ? 1 : 0,
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position:   'absolute', top: '14px', right: '14px',
          background: 'none', border: 'none', cursor: 'pointer',
          color:      'var(--text-secondary)', padding: '4px',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text-heading)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <X size={16}/>
      </button>

      {step === 'form' ? (
        <>
          {/* Header */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: '6px' }}>👋</div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)', letterSpacing: '-0.01em', marginBottom: '4px' }}>
              Let&apos;s stay connected!
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Leave your details and I&apos;ll reach out. Everything is optional.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Name - required */}
            <div>
              <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Your Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alok Abhinandan"
                required
                style={{
                  width: '100%', padding: '9px 12px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px', color: 'var(--text-heading)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  outline: 'none', transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Phone - optional */}
            <div>
              <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Phone <span style={{ opacity: 0.5 }}>(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                style={{
                  width: '100%', padding: '9px 12px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px', color: 'var(--text-heading)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  outline: 'none', transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Email - optional */}
            <div>
              <label style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Email <span style={{ opacity: 0.5 }}>(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@gmail.com"
                style={{
                  width: '100%', padding: '9px 12px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px', color: 'var(--text-heading)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '13px',
                  outline: 'none', transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e  => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <button
                type="submit"
                disabled={saving || !name.trim()}
                style={{
                  flex: 1, padding: '9px',
                  background: name.trim() ? 'var(--accent)' : 'var(--border)',
                  color:      name.trim() ? 'var(--bg-primary)' : 'var(--text-secondary)',
                  border: 'none', borderRadius: '8px',
                  fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 600,
                  cursor: name.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
              >
                {saving ? 'Saving...' : 'Submit →'}
              </button>
              <button
                type="button"
                onClick={handleSkip}
                style={{
                  padding: '9px 14px',
                  background: 'transparent', border: '1px solid var(--border)',
                  borderRadius: '8px', color: 'var(--text-secondary)',
                  fontFamily: 'DM Mono, monospace', fontSize: '11px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                Skip
              </button>
            </div>
          </form>
        </>
      ) : (
        /* Thank you step */
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎉</div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-heading)', marginBottom: '6px' }}>
            Thanks, {name}!
          </h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>
            I&apos;ll be in touch soon. 👋
          </p>
        </div>
      )}
    </div>
  )
}