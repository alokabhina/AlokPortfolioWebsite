import { useContext } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

/**
 * useTheme
 * Thin wrapper around ThemeContext.
 * Use anywhere in the app to get/toggle theme.
 *
 * @returns {{ theme: string, isDark: boolean, toggleTheme: function }}
 *
 * @example
 * const { isDark, toggleTheme } = useTheme()
 */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used inside <ThemeProvider>')
  }
  return ctx
}