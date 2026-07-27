/**
 * ThemeProvider — applies the current theme mode to the document root.
 *
 * Reads/writes the `themeMode` slice of the store and toggles a `data-theme`
 * attribute on <html> so CSS variables can switch between light/dark.
 */

import { useEffect, type ReactNode } from 'react'
import { useTheme } from '@/store/selectors'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { themeMode } = useTheme()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode)
  }, [themeMode])

  return <>{children}</>
}
