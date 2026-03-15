import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative w-9 h-9 rounded-full flex items-center justify-center',
        'border transition-all duration-300',
        'hover:scale-110 active:scale-95',
        isDark
          ? 'border-navy-light text-content-primary hover:border-teal-primary hover:text-teal-primary'
          : 'border-light-border text-light-text hover:border-teal-dark hover:text-teal-dark',
        className
      )}
    >
      {isDark ? (
        <Sun size={16} className="transition-transform duration-300 rotate-0" />
      ) : (
        <Moon size={16} className="transition-transform duration-300 rotate-0" />
      )}
    </button>
  )
}