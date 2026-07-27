/**
 * GlassSidebar — collapsible navigation drawer.
 *
 * Renders a list of items with icons; supports active highlighting via
 * shared-layout indicator. Used in the builder layout for step navigation.
 */

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import { Icon, type IconName } from '@/shared/iconRegistry'
import { sidebarItem, layoutId } from '@/animations/variants'

export interface SidebarItem {
  id: string
  label: string
  icon: IconName
}

export interface GlassSidebarProps {
  items: SidebarItem[]
  active: string
  onSelect: (id: string) => void
  className?: string
}

export function GlassSidebar({
  items,
  active,
  onSelect,
  className,
}: GlassSidebarProps) {
  return (
    <nav className={cn('flex flex-col gap-1', className)}>
      {items.map((item, i) => {
        const isActive = item.id === active
        return (
          <motion.button
            key={item.id}
            variants={sidebarItem}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(item.id)}
            className={cn(
              'relative flex items-center gap-3 rounded-[var(--radius-sm)] px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'text-[var(--color-ink-primary)]'
                : 'text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:bg-white/40',
            )}
          >
            {isActive && (
              <motion.span
                {...layoutId('sidebar-active')}
                className="absolute inset-0 rounded-[var(--radius-sm)] glass"
              />
            )}
            <span className="relative z-10">
              <Icon name={item.icon} size={18} />
            </span>
            <span className="relative z-10">{item.label}</span>
          </motion.button>
        )
      })}
    </nav>
  )
}
