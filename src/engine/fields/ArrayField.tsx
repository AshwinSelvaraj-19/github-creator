import { Icon } from '@/shared/iconRegistry'
import { GlassInput } from '@/components/ui/GlassInput'
import type { FieldRendererProps } from '../fieldRegistry'
import type { ArrayFieldConfig, FieldValue, ArrayItemField } from '../form.types'

export function ArrayField({ config, value, onChange }: FieldRendererProps<ArrayFieldConfig>) {
  const items = (value as Record<string, unknown>[]) ?? []

  const addItem = () => {
    const empty = Object.fromEntries(
      config.itemFields.map((f: ArrayItemField) => [f.name, '']),
    ) as Record<string, unknown>
    onChange([...items, empty] as FieldValue)
  }

  const updateItem = (index: number, fieldName: string, fieldValue: unknown) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [fieldName]: fieldValue } : item
    )
    onChange(updated as FieldValue)
  }

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index) as FieldValue)
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-ink-secondary)]">
          {config.label}
        </span>
        <button
          onClick={addItem}
          className="inline-flex items-center gap-1 rounded-lg bg-white/40 px-3 py-1.5 text-xs font-medium text-[var(--color-ink-secondary)] transition-colors hover:bg-white/60 hover:text-[var(--color-ink-primary)]"
        >
          <Icon name="plus" size={14} /> Add {config.itemLabel}
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={index} className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/40 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--color-ink-muted)]">
                {config.itemLabel} {index + 1}
              </span>
              <button
                onClick={() => removeItem(index)}
                className="rounded p-1 text-[var(--color-ink-muted)] transition-colors hover:bg-[#ef4444]/10 hover:text-[#ef4444]"
              >
                <Icon name="trash" size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {config.itemFields.map((field: ArrayItemField) => (
                <GlassInput
                  key={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={(item[field.name] as string) ?? ''}
                  onChange={(e) => updateItem(index, field.name, e.target.value)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
