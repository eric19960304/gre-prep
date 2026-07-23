import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const THEME_KEY = 'lexilo:theme'

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])
  return { theme, toggleTheme: () => setTheme((value) => (value === 'light' ? 'dark' : 'light')) }
}
