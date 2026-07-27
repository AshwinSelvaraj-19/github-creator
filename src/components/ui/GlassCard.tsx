/**
 * GlassCard — a GlassPanel with padding and hover-lift pre-applied.
 *
 * Use for content cards in grids, previews, and feature blocks.
 */

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { hoverLift } from '@/animations/variants'
import { cn } from '@/utils/cn'
import type { GlassPanelProps } from './GlassPanel'

export type GlassCardProps = GlassPanelProps & {
  interactive?: boolean
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, interactive = true, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'glass rounded-[var(--radius-lg)] p-6',
        className,
      )}
      {...(interactive ? hoverLift : {})}
      {...props}
    />
  ),
)
GlassCard.displayName = 'GlassCard'
