/**
 * Typed selector hooks for each slice.
 *
 * Why: Zustand's `useStore((s) => s.foo)` is fine but verbose and error-prone
 * when many components need the same slice. These thin hooks give each slice
 * a named entry point and make call sites self-documenting.
 *
 * Usage: `const { data, setField } = useBuilder()`
 */

import { useStore } from './index'
import type { BuilderSlice } from './slices/builder.slice'
import type { TemplatesSlice } from './slices/templates.slice'
import type { HistorySlice } from './slices/history.slice'
import type { PreviewSlice } from './slices/preview.slice'
import type { ThemeSlice } from './slices/theme.slice'
import type { SettingsSlice } from './slices/settings.slice'
import type { AISlice } from './slices/ai.slice'

export const useBuilder = (): BuilderSlice => {
  const data = useStore((s) => s.data)
  const isGenerating = useStore((s) => s.isGenerating)
  const setField = useStore((s) => s.setField)
  const setTemplate = useStore((s) => s.setTemplate)
  const setData = useStore((s) => s.setData)
  const resetData = useStore((s) => s.resetData)
  const setGenerating = useStore((s) => s.setGenerating)
  return { data, isGenerating, setField, setTemplate, setData, resetData, setGenerating }
}

export const useTemplates = (): TemplatesSlice => {
  const selectedTemplate = useStore((s) => s.selectedTemplate)
  const templateFilter = useStore((s) => s.templateFilter)
  const setSelectedTemplate = useStore((s) => s.setSelectedTemplate)
  const setTemplateFilter = useStore((s) => s.setTemplateFilter)
  return { selectedTemplate, templateFilter, setSelectedTemplate, setTemplateFilter }
}

export const useHistory = (): HistorySlice => {
  const history = useStore((s) => s.history)
  const saveHistory = useStore((s) => s.saveHistory)
  const deleteHistory = useStore((s) => s.deleteHistory)
  const clearHistory = useStore((s) => s.clearHistory)
  return { history, saveHistory, deleteHistory, clearHistory }
}

export const usePreview = (): PreviewSlice => {
  const previewMode = useStore((s) => s.previewMode)
  const previewFullscreen = useStore((s) => s.previewFullscreen)
  const currentMarkdown = useStore((s) => s.currentMarkdown)
  const setPreviewMode = useStore((s) => s.setPreviewMode)
  const setPreviewFullscreen = useStore((s) => s.setPreviewFullscreen)
  const setMarkdown = useStore((s) => s.setMarkdown)
  return { previewMode, previewFullscreen, currentMarkdown, setPreviewMode, setPreviewFullscreen, setMarkdown }
}

export const useTheme = (): ThemeSlice => {
  const themeMode = useStore((s) => s.themeMode)
  const toggleTheme = useStore((s) => s.toggleTheme)
  const setThemeMode = useStore((s) => s.setThemeMode)
  return { themeMode, toggleTheme, setThemeMode }
}

export const useSettings = (): SettingsSlice => {
  const autosave = useStore((s) => s.autosave)
  const showLineNumbers = useStore((s) => s.showLineNumbers)
  const compactMode = useStore((s) => s.compactMode)
  const setAutosave = useStore((s) => s.setAutosave)
  const setShowLineNumbers = useStore((s) => s.setShowLineNumbers)
  const setCompactMode = useStore((s) => s.setCompactMode)
  return { autosave, showLineNumbers, compactMode, setAutosave, setShowLineNumbers, setCompactMode }
}

export const useAI = (): AISlice => {
  const aiStatus = useStore((s) => s.aiStatus)
  const aiError = useStore((s) => s.aiError)
  const setAIStatus = useStore((s) => s.setAIStatus)
  const setAIError = useStore((s) => s.setAIError)
  return { aiStatus, aiError, setAIStatus, setAIError }
}
