/**
 * GlassModal — accessible overlay dialog with spring entrance.
 *
 * Renders a backdrop + centered panel. Close on overlay click or Escape.
 */

import { type ReactNode, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { modalOverlay, modalDialog } from '@/animations/variants'
import { Icon } from '@/shared/iconRegistry'
import { cn } from '@/utils/cn'

export interface GlassModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
}

export function GlassModal({
  open,
  onClose,
  title,
  children,
  className,
  size = 'md',
}: GlassModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalDialog}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'glass-strong w-full rounded-[var(--radius-lg)] p-6',
              sizeClass[size],
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-[var(--color-ink-muted)] transition-colors hover:bg-white/40 hover:text-[var(--color-ink-primary)]"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
