/**
 * GlassTabs — animated tab switcher with shared-layout active indicator.
 *
 * Uses Framer Motion layoutId for the sliding active pill.
 */

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { layoutId } from '@/animations/variants'

export interface TabItem {
  id: string
  label: string
  icon?: string
}

export interface GlassTabsProps {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export function GlassTabs({ tabs, active, onChange, className }: GlassTabsProps) {
  return (
    <div
      className={cn(
        'inline-flex gap-1 rounded-[var(--radius-sm)] glass p-1',
        className,
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative rounded-[var(--radius-xs)] px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'text-[var(--color-ink-primary)]'
                : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]',
            )}
          >
            {isActive && (
              <motion.span
                {...layoutId('glass-tab')}
                className="absolute inset-0 rounded-[var(--radius-xs)] bg-white/70"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        )
      })}
    </div>
  )
}
