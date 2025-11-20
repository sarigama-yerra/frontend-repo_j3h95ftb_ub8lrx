import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext({ mode: 'system', setMode: () => {} })

function getSystemPrefersDark() {
  if (typeof window === 'undefined') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => localStorage.getItem('somdev-theme') || 'system')

  useEffect(() => {
    const root = document.documentElement
    const isDark = mode === 'dark' || (mode === 'system' && getSystemPrefersDark())
    root.classList.toggle('dark', isDark)
    document.body.style.transition = 'background-color 300ms ease, color 300ms ease'
    localStorage.setItem('somdev-theme', mode)
  }, [mode])

  // Update on system change if mode is system
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const root = document.documentElement
      root.classList.toggle('dark', mq.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  const value = useMemo(() => ({ mode, setMode }), [mode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
