/**
 * GlassInput — labeled text input with glass styling and focus ring.
 */

import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id || props.name
    return (
      <label htmlFor={inputId} className="block">
        {label && (
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink-secondary)]">
            {label}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/60 px-4 py-2.5 text-sm text-[var(--color-ink-primary)] outline-none transition-all duration-300 placeholder:text-[var(--color-ink-muted)]',
            'focus:border-[#8b5cf6]/50 focus:bg-white/80 focus:ring-2 focus:ring-[#8b5cf6]/30 focus:shadow-[0_0_20px_rgba(139,92,246,0.2)]',
            className,
          )}
          {...props}
        />
        {hint && (
          <span className="mt-1 block text-xs text-[var(--color-ink-muted)]">{hint}</span>
        )}
      </label>
    )
  },
)
GlassInput.displayName = 'GlassInput'
