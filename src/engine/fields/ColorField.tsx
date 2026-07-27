import { cn } from '@/utils/cn'
import type { FieldRendererProps } from '../fieldRegistry'
import type { ColorFieldConfig, FieldValue } from '../form.types'

export function ColorField({ config, value, onChange }: FieldRendererProps<ColorFieldConfig>) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink-secondary)]">
        {config.label}
      </span>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={`#${(value as string) ?? '8B5CF6'}`}
          onChange={(e) => onChange(e.target.value.replace('#', '') as FieldValue)}
          className={cn('h-10 w-14 cursor-pointer rounded-lg border border-[var(--color-border-strong)] bg-transparent')}
        />
        <span className="font-mono text-sm text-[var(--color-ink-secondary)]">
          #{(value as string) ?? '8B5CF6'}
        </span>
      </div>
    </div>
  )
}
