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
    <div className={cn('glass rounded-[var(--radius-md)] overflow-hidden', className)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-[var(--color-ink-primary)]"
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
