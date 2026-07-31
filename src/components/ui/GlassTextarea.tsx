/**
 * GlassTextarea — multi-line input matching GlassInput styling.
 */

import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface GlassTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const textareaId = id || props.name
    return (
      <label htmlFor={textareaId} className="block">
        {label && (
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink-secondary)]">
            {label}
          </span>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            'w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/60 px-4 py-2.5 text-sm text-[var(--color-ink-primary)] outline-none transition-all duration-300 placeholder:text-[var(--color-ink-muted)] resize-none',
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
GlassTextarea.displayName = 'GlassTextarea'
