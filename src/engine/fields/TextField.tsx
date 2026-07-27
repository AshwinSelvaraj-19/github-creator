import { GlassInput } from '@/components/ui/GlassInput'
import type { FieldRendererProps } from '../fieldRegistry'
import type { TextFieldConfig, FieldValue } from '../form.types'

export function TextField({ config, value, onChange }: FieldRendererProps<TextFieldConfig>) {
  return (
    <GlassInput
      label={config.label}
      hint={config.hint}
      name={config.name}
      placeholder={config.placeholder}
      maxLength={config.maxLength}
      value={(value as string) ?? ''}
      onChange={(e) => onChange(e.target.value as FieldValue)}
    />
  )
}
