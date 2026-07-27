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

export const useBuilder = () =>
  useStore((s): BuilderSlice => ({
    data: s.data,
    isGenerating: s.isGenerating,
    setField: s.setField,
    setTemplate: s.setTemplate,
    setData: s.setData,
    resetData: s.resetData,
    setGenerating: s.setGenerating,
  }))

export const useTemplates = () =>
  useStore((s): TemplatesSlice => ({
    selectedTemplate: s.selectedTemplate,
    templateFilter: s.templateFilter,
    setSelectedTemplate: s.setSelectedTemplate,
    setTemplateFilter: s.setTemplateFilter,
  }))

export const useHistory = () =>
  useStore((s): HistorySlice => ({
    history: s.history,
    saveHistory: s.saveHistory,
    deleteHistory: s.deleteHistory,
    clearHistory: s.clearHistory,
  }))

export const usePreview = () =>
  useStore((s): PreviewSlice => ({
    previewMode: s.previewMode,
    previewFullscreen: s.previewFullscreen,
    currentMarkdown: s.currentMarkdown,
    setPreviewMode: s.setPreviewMode,
    setPreviewFullscreen: s.setPreviewFullscreen,
    setMarkdown: s.setMarkdown,
  }))

export const useTheme = () =>
  useStore((s): ThemeSlice => ({
    themeMode: s.themeMode,
    toggleTheme: s.toggleTheme,
    setThemeMode: s.setThemeMode,
  }))

export const useSettings = () =>
  useStore((s): SettingsSlice => ({
    autosave: s.autosave,
    showLineNumbers: s.showLineNumbers,
    compactMode: s.compactMode,
    setAutosave: s.setAutosave,
    setShowLineNumbers: s.setShowLineNumbers,
    setCompactMode: s.setCompactMode,
  }))

export const useAI = () =>
  useStore((s): AISlice => ({
    aiStatus: s.aiStatus,
    aiError: s.aiError,
    setAIStatus: s.setAIStatus,
    setAIError: s.setAIError,
  }))
