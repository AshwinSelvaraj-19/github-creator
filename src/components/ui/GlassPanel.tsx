/**
 * GlassPanel — the base glassmorphism container.
 *
 * A motion.div with configurable blur, opacity, and glow. All other glass
 * components compose this. Use it directly for custom layouts.
 * Now with premium glow variants and enhanced effects.
 */

import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type GlassVariant = 'default' | 'strong' | 'subtle' | 'premium' | 'premium-glow'
type GlowColor = 'none' | 'purple' | 'cyan' | 'pink' | 'orange' | 'blue' | 'multi'

export interface GlassPanelProps extends HTMLMotionProps<'div'> {
  variant?: GlassVariant
  glow?: GlowColor
}

const variantClass: Record<GlassVariant, string> = {
  default: 'glass',
  strong: 'glass-strong',
  subtle: 'bg-white/40 backdrop-blur-xl border border-white/30',
  premium: 'glass-premium',
  'premium-glow': 'glass-premium-glow',
}

const glowClass: Record<GlowColor, string> = {
  none: '',
  purple: 'shadow-[var(--shadow-glow-purple)]',
  cyan: 'shadow-[var(--shadow-glow-cyan)]',
  pink: 'shadow-[var(--shadow-glow-pink)]',
  orange: 'shadow-[var(--shadow-glow-orange)]',
  blue: 'shadow-[var(--shadow-glow-blue)]',
  multi: 'shadow-[var(--shadow-glow-multi)]',
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'default', glow = 'none', ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-lg)]',
        variantClass[variant],
        glowClass[glow],
        className,
      )}
      {...props}
    />
  ),
)
GlassPanel.displayName = 'GlassPanel'
