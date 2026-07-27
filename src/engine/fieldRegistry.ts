/**
 * Field renderer registry.
 *
 * Maps each `FieldType` to the React component that renders it. The
 * `FormRenderer` looks up the component by type — adding a new field type
 * only requires creating a component and registering it here.
 */

import type { ComponentType } from 'react'
import type { FieldConfig, FieldValue } from './form.types'
import type { BuilderData } from '@/types'
import { TextField } from './fields/TextField'
import { TextareaField } from './fields/TextareaField'
import { SelectField } from './fields/SelectField'
import { CheckboxField } from './fields/CheckboxField'
import { ColorField } from './fields/ColorField'
import { TagsField } from './fields/TagsField'
import { ArrayField } from './fields/ArrayField'
import { LinksField } from './fields/LinksField'

export interface FieldRendererProps<T extends FieldConfig = FieldConfig> {
  config: T
  value: FieldValue
  onChange: (value: FieldValue) => void
  data: BuilderData
}

export type FieldRenderer = ComponentType<FieldRendererProps>

export const fieldRegistry: Record<string, FieldRenderer> = {
  text: TextField as FieldRenderer,
  textarea: TextareaField as FieldRenderer,
  markdown: TextareaField as FieldRenderer,
  select: SelectField as FieldRenderer,
  checkbox: CheckboxField as FieldRenderer,
  color: ColorField as FieldRenderer,
  tags: TagsField as FieldRenderer,
  array: ArrayField as FieldRenderer,
  links: LinksField as FieldRenderer,
  social: LinksField as FieldRenderer,
}

export type {
  TextFieldConfig,
  TextareaFieldConfig,
  SelectFieldConfig,
  CheckboxFieldConfig,
  ColorFieldConfig,
  TagsFieldConfig,
  ArrayFieldConfig,
  LinksFieldConfig,
  IconFieldConfig,
} from './form.types'
