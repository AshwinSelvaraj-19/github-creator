/**
 * Combined type for the entire store — the union of all slice interfaces.
 *
 * Each slice module imports `StoreState` so it can reference sibling slices
 * without circular imports. The root store in `index.ts` composes them.
 */

import type { BuilderSlice } from './slices/builder.slice'
import type { TemplatesSlice } from './slices/templates.slice'
import type { HistorySlice } from './slices/history.slice'
import type { PreviewSlice } from './slices/preview.slice'
import type { ThemeSlice } from './slices/theme.slice'
import type { SettingsSlice } from './slices/settings.slice'
import type { AISlice } from './slices/ai.slice'

export type StoreState = BuilderSlice &
  TemplatesSlice &
  HistorySlice &
  PreviewSlice &
  ThemeSlice &
  SettingsSlice &
  AISlice
