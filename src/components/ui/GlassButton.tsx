/**
 * GlassButton — primary interactive button with gradient / glass / ghost / danger variants.
 *
 * Includes ripple-ready press animation and hover lift. Use `as` via `motion`
 * props for link buttons (wrap in a Link and render GlassButton inside).
 * Now with premium gradients and enhanced glow effects.
 */

import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Icon, type IconName } from '@/shared/iconRegistry'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'secondary-glow'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface GlassButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#06b6d4] text-white shadow-[var(--shadow-glow-purple)] hover:shadow-[var(--shadow-glow-multi)]',
  secondary: 'glass-premium text-[var(--color-ink-primary)] hover:shadow-[var(--shadow-glass-lg)]',
  'secondary-glow':
    'glass-premium-glow text-[var(--color-ink-primary)] glow-border-purple hover:shadow-[var(--shadow-glow-purple)]',
  ghost:
    'bg-transparent text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:bg-white/40',
  danger: 'bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 hover:bg-[#ef4444]/20',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-sm gap-2',
  lg: 'px-8 py-4 text-base gap-2.5',
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      icon,
      iconPosition = 'left',
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => (
    <motion.button
      ref={ref}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center rounded-[var(--radius-sm)] font-semibold transition-colors duration-300',
        variantClass[variant],
        sizeClass[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && <Icon name={icon} size={16} />}
      <>{children}</>
      {icon && iconPosition === 'right' && <Icon name={icon} size={16} />}
    </motion.button>
  ),
)
GlassButton.displayName = 'GlassButton'
