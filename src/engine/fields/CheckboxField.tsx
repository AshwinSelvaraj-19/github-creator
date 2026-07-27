import { cn } from '@/utils/cn'
import type { FieldRendererProps } from '../fieldRegistry'
import type { CheckboxFieldConfig, FieldValue } from '../form.types'

export function CheckboxField({ config, value, onChange }: FieldRendererProps<CheckboxFieldConfig>) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={(value as boolean) ?? false}
        onChange={(e) => onChange(e.target.checked as FieldValue)}
        className="h-4 w-4 rounded border-[var(--color-border-strong)] accent-[#8b5cf6]"
      />
      <span className={cn('text-sm font-medium text-[var(--color-ink-primary)]')}>
        {config.label}
      </span>
    </label>
  )
}
