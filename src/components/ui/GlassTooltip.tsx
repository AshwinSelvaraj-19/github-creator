/**
 * GlassTooltip — lightweight hover tooltip.
 *
 * Wraps children and shows a small glass pill on hover. Pure CSS-driven
 * (no JS positioning library) — suitable for top/bottom placement.
 */

import { type ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { fadeIn } from '@/animations/variants'
import { cn } from '@/utils/cn'

export interface GlassTooltipProps {
  content: ReactNode
  children: ReactNode
  side?: 'top' | 'bottom'
  className?: string
}

export function GlassTooltip({
  content,
  children,
  side = 'top',
  className,
}: GlassTooltipProps) {
  const [show, setShow] = useState(false)
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'glass-strong absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-xs)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink-primary)] pointer-events-none',
              side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
              className,
            )}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
