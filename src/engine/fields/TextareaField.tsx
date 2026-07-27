import { GlassTextarea } from '@/components/ui/GlassTextarea'
import type { FieldRendererProps } from '../fieldRegistry'
import type { TextareaFieldConfig, FieldValue } from '../form.types'

export function TextareaField({ config, value, onChange }: FieldRendererProps<TextareaFieldConfig>) {
  return (
    <GlassTextarea
      label={config.label}
      hint={config.hint}
      name={config.name}
      placeholder={config.placeholder}
      rows={config.rows ?? 4}
      value={(value as string) ?? ''}
      onChange={(e) => onChange(e.target.value as FieldValue)}
    />
  )
}
