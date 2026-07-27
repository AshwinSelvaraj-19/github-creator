/**
 * Root store — composes all slices into a single Zustand store with persistence.
 *
 * Why slices: a single monolithic store becomes unmaintainable as the app grows.
 * Slices keep each domain's logic in its own file while sharing a single store
 * instance, so cross-slice access (e.g. builder reading the selected template)
 * works naturally.
 *
 * Persistence: builder data, history, theme, and settings are persisted to
 * localStorage so users don't lose work on refresh. Transient state (preview,
 * AI status) is not persisted.
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StoreState } from './types'
import { createBuilderSlice } from './slices/builder.slice'
import { createTemplatesSlice } from './slices/templates.slice'
import { createHistorySlice } from './slices/history.slice'
import { createPreviewSlice } from './slices/preview.slice'
import { createThemeSlice } from './slices/theme.slice'
import { createSettingsSlice } from './slices/settings.slice'
import { createAISlice } from './slices/ai.slice'

export const useStore = create<StoreState>()(
  persist(
    (set, get, store) => ({
      ...createBuilderSlice(set, get, store),
      ...createTemplatesSlice(set, get, store),
      ...createHistorySlice(set, get, store),
      ...createPreviewSlice(set, get, store),
      ...createThemeSlice(set, get, store),
      ...createSettingsSlice(set, get, store),
      ...createAISlice(set, get, store),
    }),
    {
      name: 'readme-forge-store',
      partialize: (s) => ({
        data: s.data,
        history: s.history,
        themeMode: s.themeMode,
        autosave: s.autosave,
        showLineNumbers: s.showLineNumbers,
        compactMode: s.compactMode,
        selectedTemplate: s.selectedTemplate,
      }),
    },
  ),
)
