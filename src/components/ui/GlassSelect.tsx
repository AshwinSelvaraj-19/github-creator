/**
 * GlassSelect — styled native select dropdown.
 */

import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import { Icon } from '@/shared/iconRegistry'

export interface GlassSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ className, label, options, id, ...props }, ref) => {
    const selectId = id || props.name
    return (
      <label htmlFor={selectId} className="block">
        {label && (
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink-secondary)]">
            {label}
          </span>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/60 px-4 py-2.5 pr-10 text-sm text-[var(--color-ink-primary)] outline-none transition-all duration-300',
              'focus:border-[#8b5cf6] focus:bg-white/80 focus:ring-2 focus:ring-[#8b5cf6]/20',
              className,
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <Icon
            name="chevronDown"
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]"
          />
        </div>
      </label>
    )
  },
)
GlassSelect.displayName = 'GlassSelect'
