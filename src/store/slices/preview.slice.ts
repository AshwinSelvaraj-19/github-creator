/**
 * Preview slice — controls the live-preview pane state.
 *
 * Why isolated: preview state (mobile/desktop, fullscreen, scroll position)
 * changes frequently and independently of form data. Isolating it prevents
 * the heavy preview component from re-rendering on every keystroke in the form.
 */

import type { StateCreator } from 'zustand'
import type { StoreState } from '@/store/types'

export type PreviewMode = 'desktop' | 'mobile'

export interface PreviewSlice {
  previewMode: PreviewMode
  previewFullscreen: boolean
  currentMarkdown: string
  setPreviewMode: (mode: PreviewMode) => void
  setPreviewFullscreen: (v: boolean) => void
  setMarkdown: (md: string) => void
}

export const createPreviewSlice: StateCreator<
  StoreState,
  [],
  [],
  PreviewSlice
> = (set) => ({
  previewMode: 'desktop',
  previewFullscreen: false,
  currentMarkdown: '',
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setPreviewFullscreen: (v) => set({ previewFullscreen: v }),
  setMarkdown: (md) => set({ currentMarkdown: md }),
})
