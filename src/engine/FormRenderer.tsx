/**
 * FormRenderer — renders a form section from its schema.
 *
 * Looks up each field's renderer in the field registry and passes the current
 * value + change handler. Fields with `visibleWhen` are hidden conditionally.
 * This component is generic — it works with any schema, not just the builder.
 */

import { GlassAccordion } from '@/components/ui/GlassAccordion'
import { fieldRegistry, type FieldRendererProps } from './fieldRegistry'
import type { FormSection, FieldConfig, FieldValue } from './form.types'
import type { BuilderData } from '@/types'
import { cn } from '@/utils/cn'

export interface FormRendererProps {
  section: FormSection
  data: BuilderData
  onChange: (field: keyof BuilderData, value: FieldValue) => void
  defaultOpen?: boolean
}

export function FormRenderer({ section, data, onChange, defaultOpen = true }: FormRendererProps) {
  return (
    <GlassAccordion title={section.title} defaultOpen={defaultOpen}>
      {section.description && (
        <p className="mb-4 text-sm text-[var(--color-ink-muted)]">{section.description}</p>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {section.fields.map((field) => (
          <FieldRow
            key={field.name}
            field={field}
            data={data}
            onChange={onChange}
          />
        ))}
      </div>
    </GlassAccordion>
  )
}

function FieldRow({
  field,
  data,
  onChange,
}: {
  field: FieldConfig
  data: BuilderData
  onChange: (field: keyof BuilderData, value: FieldValue) => void
}) {
  if (field.visibleWhen && !field.visibleWhen(data)) return null

  const Renderer = fieldRegistry[field.type]
  if (!Renderer) return null

  const props: FieldRendererProps = {
    config: field,
    value: data[field.name] as FieldValue,
    onChange: (value) => onChange(field.name, value),
    data,
  }

  return (
    <div className={cn(field.fullWidth && 'sm:col-span-2')}>
      <Renderer {...props} />
    </div>
  )
}
