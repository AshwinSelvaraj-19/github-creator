import { forwardRef } from 'react'
import type { InputHTMLAttributes, HTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type GlassCardProps = HTMLMotionProps<'div'> & {
  variant?: 'default' | 'strong'
  glow?: 'none' | 'purple' | 'cyan'
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', glow = 'none', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          variant === 'strong' ? 'glass-strong' : 'glass',
          'rounded-[var(--radius-lg)]',
          glow === 'purple' && 'shadow-[var(--shadow-glow-purple)]',
          glow === 'cyan' && 'shadow-[var(--shadow-glow-cyan)]',
          className,
        )}
        {...props}
      />
    )
  },
)
GlassCard.displayName = 'GlassCard'

interface GlassButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants: Record<string, string> = {
      primary:
        'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white shadow-[var(--shadow-glow-purple)]',
      secondary: 'glass text-[var(--color-ink-primary)]',
      ghost: 'bg-transparent text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]',
      danger: 'bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20',
    }
    const sizes: Record<string, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold transition-colors duration-300',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    )
  },
)
GlassButton.displayName = 'GlassButton'

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="block">
        {label && (
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink-secondary)]">
            {label}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/60 px-4 py-2.5 text-sm text-[var(--color-ink-primary)] outline-none transition-all duration-300 placeholder:text-[var(--color-ink-muted)]',
            'focus:border-[#8b5cf6] focus:bg-white/80 focus:ring-2 focus:ring-[#8b5cf6]/20',
            className,
          )}
          {...props}
        />
      </label>
    )
  },
)
GlassInput.displayName = 'GlassInput'

interface GlassBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: 'purple' | 'blue' | 'cyan' | 'pink' | 'orange'
}

export function GlassBadge({
  className,
  color = 'purple',
  ...props
}: GlassBadgeProps) {
  const colors: Record<string, string> = {
    purple: 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20',
    blue: 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20',
    cyan: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20',
    pink: 'bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/20',
    orange: 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md',
        colors[color],
        className,
      )}
      {...props}
    />
  )
}
