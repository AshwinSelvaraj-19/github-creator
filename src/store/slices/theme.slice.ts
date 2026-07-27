/**
 * Theme slice — light/dark mode.
 *
 * Why isolated: theme is read by every component (via CSS variables) but changed
 * rarely. Keeping it in its own slice means theme toggling doesn't trigger
 * re-renders in form/preview/history subscribers.
 */

import type { StateCreator } from 'zustand'
import type { StoreState } from '@/store/types'

export type ThemeMode = 'light' | 'dark'

export interface ThemeSlice {
  themeMode: ThemeMode
  toggleTheme: () => void
  setThemeMode: (m: ThemeMode) => void
}

export const createThemeSlice: StateCreator<
  StoreState,
  [],
  [],
  ThemeSlice
> = (set) => ({
  themeMode: 'light',
  toggleTheme: () =>
    set((s) => ({ themeMode: s.themeMode === 'light' ? 'dark' : 'light' })),
  setThemeMode: (m) => set({ themeMode: m }),
})
