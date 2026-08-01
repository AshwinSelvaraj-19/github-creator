/**
 * GlassPreview — wrapper for the live markdown preview pane.
 *
 * Provides the glass frame, scroll container, and empty state. The actual
 * markdown rendering is done by the preview feature using ReactMarkdown.
 */

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Icon } from '@/shared/iconRegistry'

export interface GlassPreviewProps {
  children: ReactNode
  isEmpty?: boolean
  className?: string
}

export function GlassPreview({ children, isEmpty = false, className }: GlassPreviewProps) {
  return (
    <motion.div
      layout
      className={cn(
        'glass-premium glow-border-cyan rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-glow-cyan)] transition-shadow duration-300',
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-[var(--color-ink-primary)]">Live Preview</h3>
      </div>
      <div className="max-h-[70vh] overflow-y-auto rounded-[var(--radius-md)] bg-white/60 backdrop-blur-sm p-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-[var(--color-ink-muted)]">
            <Icon name="sparkles" size={32} className="mb-3 opacity-40" />
            <p>Generate to see preview</p>
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  )
}
