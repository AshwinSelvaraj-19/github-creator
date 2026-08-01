/**
 * GlassCard — a GlassPanel with padding and hover-lift pre-applied.
 *
 * Use for content cards in grids, previews, and feature blocks.
 * Now with premium glow variants and gradient borders.
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { hoverLift } from '@/animations/variants'
import { cn } from '@/utils/cn'
import type { GlassPanelProps } from './GlassPanel'

type CardGlow = 'none' | 'purple' | 'cyan' | 'pink' | 'orange' | 'blue' | 'multi'

export type GlassCardProps = GlassPanelProps & {
  interactive?: boolean
  glow?: CardGlow
  premium?: boolean
}

const glowClass: Record<CardGlow, string> = {
  none: '',
  purple: 'glow-border-purple',
  cyan: 'glow-border-cyan',
  pink: 'glow-border-pink',
  orange: 'glow-border-orange',
  blue: 'shadow-[var(--shadow-glow-blue)]',
  multi: 'shadow-[var(--shadow-glow-multi)]',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, interactive = true, glow = 'none', premium = false, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        premium ? 'glass-premium' : 'glass',
        'rounded-[var(--radius-lg)] p-6',
        glowClass[glow],
        className,
      )}
      {...(interactive ? hoverLift : {})}
      {...props}
    />
  ),
)
GlassCard.displayName = 'GlassCard'
