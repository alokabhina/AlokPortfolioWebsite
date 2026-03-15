import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, fallback to dark
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio-theme') || 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.add('light')
      root.classList.remove('dark')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

// useTheme hook lives in src/hooks/useTheme.js — import from there