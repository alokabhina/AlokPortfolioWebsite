import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/** Smooth scroll to element by ID */
export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) {
    const navHeight = 72
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/** Format date to readable string */
export function formatDate(dateStr) {
  if (!dateStr) return 'Present'
  // Parse as local date to avoid timezone offset issues
  const parts = String(dateStr).split('-')
  if (parts.length < 2) return 'Present'
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2] || 1))
  if (isNaN(d.getTime())) return 'Present'
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

/** Truncate text */
export function truncate(str, n = 120) {
  return str.length > n ? str.slice(0, n) + '...' : str
}

/** WhatsApp link builder */
export function buildWhatsAppLink(phone, message = '') {
  const encoded = encodeURIComponent(message || 'Hello! I saw your portfolio and wanted to connect.')
  return `https://wa.me/${phone}?text=${encoded}`
}