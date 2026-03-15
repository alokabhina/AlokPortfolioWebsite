import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Send, Loader } from 'lucide-react'
import { api } from '@/lib'

/**
 * ContactForm
 * Fields: name, email, subject, message
 * Floating labels — label sits inside input, moves up on focus/fill
 * Teal focus ring on all inputs
 * Submits to POST /api/contact via axios
 * react-hot-toast for success/error feedback
 */
export default function ContactForm() {
  const [sending, setSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setSending(true)
    try {
      await api.post('/api/contact', data)
      toast.success('Message sent! I\'ll get back to you soon.', {
        style: {
          background: 'var(--bg-card)',
          color:      'var(--text-heading)',
          border:     '1px solid var(--accent)',
        },
        iconTheme: { primary: '#00D4AA', secondary: '#060A10' },
      })
      reset()
    } catch (err) {
      const msg = err?.response?.status === 429
        ? 'Too many messages. Please try again later.'
        : 'Something went wrong. Please try again.'
      toast.error(msg, {
        style: {
          background: 'var(--bg-card)',
          color:      'var(--text-heading)',
          border:     '1px solid #EF4444',
        },
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FloatingField
          id="name"
          label="Your Name"
          type="text"
          error={errors.name?.message}
          registration={register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'At least 2 characters' },
          })}
        />
        <FloatingField
          id="email"
          label="Your Email"
          type="email"
          error={errors.email?.message}
          registration={register('email', {
            required: 'Email is required',
            pattern: {
              value:   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
      </div>

      {/* Subject */}
      <FloatingField
        id="subject"
        label="Subject"
        type="text"
        error={errors.subject?.message}
        registration={register('subject', {
          required: 'Subject is required',
        })}
      />

      {/* Message */}
      <FloatingField
        id="message"
        label="Message"
        type="textarea"
        rows={5}
        error={errors.message?.message}
        registration={register('message', {
          required: 'Message is required',
          minLength: { value: 10, message: 'At least 10 characters' },
        })}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={sending}
        className="btn-primary self-start"
        style={{
          opacity:       sending ? 0.7 : 1,
          cursor:        sending ? 'not-allowed' : 'pointer',
          pointerEvents: sending ? 'none' : 'auto',
        }}
      >
        {sending ? (
          <>
            <Loader size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}

// ── Floating label field ──────────────────────────────────────
function FloatingField({ id, label, type, rows, error, registration }) {
  const isTextarea = type === 'textarea'

  const baseStyle = {
    width:        '100%',
    padding:      '18px 16px 8px',
    background:   'var(--bg-card)',
    border:       `1px solid ${error ? '#EF4444' : 'var(--border)'}`,
    borderRadius: '8px',
    color:        'var(--text-heading)',
    fontFamily:   'DM Sans, sans-serif',
    fontSize:     '0.9rem',
    outline:      'none',
    transition:   'border-color 0.2s, box-shadow 0.2s',
    resize:       isTextarea ? 'vertical' : undefined,
    minHeight:    isTextarea ? `${(rows || 4) * 28}px` : undefined,
  }

  const focusStyle = (e) => {
    e.target.style.borderColor = error ? '#EF4444' : 'var(--accent)'
    e.target.style.boxShadow   = `0 0 0 3px ${error ? 'rgba(239,68,68,0.15)' : 'rgba(0,212,170,0.12)'}`
  }
  const blurStyle = (e) => {
    e.target.style.borderColor = error ? '#EF4444' : 'var(--border)'
    e.target.style.boxShadow   = 'none'
  }

  return (
    <div className="relative">
      {/* Floating label */}
      <label
        htmlFor={id}
        className="absolute left-4 font-mono text-xs pointer-events-none transition-all duration-200"
        style={{
          top:   '8px',
          color: error ? '#EF4444' : 'var(--text-secondary)',
        }}
      >
        {label}
      </label>

      {/* Input or Textarea */}
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows || 4}
          style={baseStyle}
          onFocus={focusStyle}
          onBlur={blurStyle}
          {...registration}
        />
      ) : (
        <input
          id={id}
          type={type}
          style={baseStyle}
          onFocus={focusStyle}
          onBlur={blurStyle}
          {...registration}
        />
      )}

      {/* Error message */}
      {error && (
        <p
          className="mt-1 font-mono text-xs"
          style={{ color: '#EF4444' }}
        >
          {error}
        </p>
      )}
    </div>
  )
}