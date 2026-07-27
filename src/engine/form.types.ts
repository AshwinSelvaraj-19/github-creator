/**
 * Form engine types — schema-driven field definitions.
 *
 * Instead of hardcoding forms in JSX, each form section is defined as a list
 * of `FieldConfig` objects. The `FormRenderer` component reads the schema and
 * renders the appropriate input component for each field type.
 *
 * To add a new field type:
 *   1. Add it to `FieldType` union.
 *   2. Create a renderer component in `src/engine/fields/`.
 *   3. Register it in `fieldRegistry.ts`.
 */

import type { BuilderData, SkillMap, SocialLink, ProjectEntry, CertificationEntry, AchievementEntry } from '@/types'

export type FieldType =
  | 'text'
  | 'textarea'
  | 'markdown'
  | 'array'
  | 'tags'
  | 'links'
  | 'social'
  | 'checkbox'
  | 'select'
  | 'color'
  | 'icon'

export type FieldValue =
  | string
  | number
  | boolean
  | string[]
  | SkillMap
  | SocialLink[]
  | ProjectEntry[]
  | CertificationEntry[]
  | AchievementEntry[]
  | undefined

export interface BaseFieldConfig {
  name: keyof BuilderData
  label: string
  type: FieldType
  placeholder?: string
  hint?: string
  required?: boolean
  fullWidth?: boolean
  /** Conditionally show this field based on another field's value */
  visibleWhen?: (data: BuilderData) => boolean
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text'
  maxLength?: number
}

export interface TextareaFieldConfig extends BaseFieldConfig {
  type: 'textarea' | 'markdown'
  rows?: number
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select'
  options: { value: string; label: string }[]
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox'
}

export interface ColorFieldConfig extends BaseFieldConfig {
  type: 'color'
}

export interface TagsFieldConfig extends BaseFieldConfig {
  type: 'tags'
  category?: string
  suggestions?: string[]
}

export interface ArrayItemField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'color'
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface ArrayFieldConfig extends BaseFieldConfig {
  type: 'array'
  itemFields: ArrayItemField[]
  itemLabel: string
}

export interface LinksFieldConfig extends BaseFieldConfig {
  type: 'links' | 'social'
  platforms?: string[]
}

export interface IconFieldConfig extends BaseFieldConfig {
  type: 'icon'
  icons: string[]
}

export type FieldConfig =
  | TextFieldConfig
  | TextareaFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | ColorFieldConfig
  | TagsFieldConfig
  | ArrayFieldConfig
  | LinksFieldConfig
  | IconFieldConfig

export interface FormSection {
  id: string
  title: string
  icon: string
  description?: string
  fields: FieldConfig[]
}
