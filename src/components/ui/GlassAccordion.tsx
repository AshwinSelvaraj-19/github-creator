/**
 * GlassAccordion — collapsible section with animated height.
 *
 * Use in the builder form to group related fields (profile, skills, projects)
 * and reduce visual overload.
 */

import { type ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { accordionContent } from '@/animations/variants'
import { Icon } from '@/shared/iconRegistry'
import { cn } from '@/utils/cn'

export interface GlassAccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  className?: string
}

export function GlassAccordion({
  title,
  children,
  defaultOpen = true,
  className,
}: GlassAccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={cn('glass-premium rounded-[var(--radius-md)] overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.05)] transition-shadow duration-300', className)}>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'flex w-full items-center justify-between rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium transition-all duration-300',
            open
              ? 'bg-gradient-to-r from-[#8b5cf6]/10 to-[#06b6d4]/10 text-[var(--color-ink-primary)] shadow-[0_0_15px_rgba(139,92,246,0.1)]'
              : 'text-[var(--color-ink-secondary)] hover:bg-white/40 hover:text-[var(--color-ink-primary)]',
          )}
        >
        {title}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <Icon name="chevronDown" size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            variants={accordionContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="px-5 pb-5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
