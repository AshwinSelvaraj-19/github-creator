/**
 * Settings slice — user preferences that aren't form data.
 *
 * Why isolated: settings like autosave, default template, and editor options
 * are orthogonal to the README content. Separating them makes it easy to add
 * a settings panel later without touching builder logic.
 */

import type { StateCreator } from 'zustand'
import type { StoreState } from '@/store/types'

export interface SettingsSlice {
  autosave: boolean
  showLineNumbers: boolean
  compactMode: boolean
  setAutosave: (v: boolean) => void
  setShowLineNumbers: (v: boolean) => void
  setCompactMode: (v: boolean) => void
}

export const createSettingsSlice: StateCreator<
  StoreState,
  [],
  [],
  SettingsSlice
> = (set) => ({
  autosave: true,
  showLineNumbers: false,
  compactMode: false,
  setAutosave: (v) => set({ autosave: v }),
  setShowLineNumbers: (v) => set({ showLineNumbers: v }),
  setCompactMode: (v) => set({ compactMode: v }),
})
