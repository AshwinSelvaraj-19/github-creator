import { GlassSelect } from '@/components/ui/GlassSelect'
import type { FieldRendererProps } from '../fieldRegistry'
import type { SelectFieldConfig, FieldValue } from '../form.types'

export function SelectField({ config, value, onChange }: FieldRendererProps<SelectFieldConfig>) {
  return (
    <GlassSelect
      label={config.label}
      name={config.name}
      options={config.options}
      value={(value as string) ?? ''}
      onChange={(e) => onChange(e.target.value as FieldValue)}
    />
  )
}
