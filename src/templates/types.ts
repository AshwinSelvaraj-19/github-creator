/**
 * Template definition types.
 *
 * Each template is a self-contained module exporting a `TemplateDefinition`.
 * The engine loads these dynamically — no switch statements in the builder.
 */

import type { ComponentType } from 'react'
import type { BuilderData } from '@/types'

export type TemplateCategory =
  | 'soft'
  | 'glass'
  | 'real'
  | 'playful'
  | 'dark'
  | 'icy'
  | 'vibrant'
  | 'depth'
  | 'geo'
  | 'dynamic'

export interface TemplateTheme {
  pageBg: string
  cardBg: string
  primaryText: string
  secondaryText: string
  headingColor: string
  accent: string
  border: string
  progressFill: string
  iconColor: string
}

export interface TemplateWidgetTypes {
  stats: string
  langs: string
  activity: string
  skills: string
}

export interface TemplateMetadata {
  author?: string
  version: string
  tags: string[]
  rating?: number
  downloads?: number
}

/**
 * Preview renderer — a React component that renders a visual thumbnail
 * of the template (used in the gallery). Receives the theme + widget config.
 */
export type TemplatePreviewRenderer = ComponentType<{
  theme: TemplateTheme
  widgets: TemplateWidgetTypes
}>

/**
 * Markdown renderer — transforms BuilderData into a README markdown string.
 *
 * Most templates delegate to the Python `generate_readme` function (via the
 * pyodide service) by omitting this field. Templates that want a custom
 * renderer (e.g. a future AI-generated template) can provide one here.
 */
export type TemplateMarkdownRenderer = (data: BuilderData) => Promise<string>

export interface TemplateDefinition {
  id: string
  name: string
  description: string
  thumbnail: string
  emoji: string
  category: TemplateCategory
  theme: TemplateTheme
  widgets: TemplateWidgetTypes
  metadata: TemplateMetadata
  /** Optional custom preview component (defaults to DefaultTemplatePreview) */
  Preview?: TemplatePreviewRenderer
  /** Optional custom markdown renderer (defaults to pyodide generate_readme) */
  renderMarkdown?: TemplateMarkdownRenderer
}
