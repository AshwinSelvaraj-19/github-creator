/**
 * GlassToast — ephemeral notification toast.
 *
 * Managed by the ToastProvider (see src/providers/ToastProvider.tsx).
 * Not intended to be rendered directly — use `useToast().show()`.
 */

import { motion } from 'framer-motion'
import { toastSlide } from '@/animations/variants'
import { Icon, type IconName } from '@/shared/iconRegistry'
import { cn } from '@/utils/cn'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

export interface ToastData {
  id: string
  message: string
  type: ToastType
}

const toastConfig: Record<ToastType, { icon: IconName; color: string }> = {
  info: { icon: 'info', color: 'text-[#3b82f6]' },
  success: { icon: 'checkCircle', color: 'text-[#10b981]' },
  warning: { icon: 'alert', color: 'text-[#f59e0b]' },
  error: { icon: 'alert', color: 'text-[#ef4444]' },
}

export function GlassToast({ toast }: { toast: ToastData }) {
  const cfg = toastConfig[toast.type]
  return (
    <motion.div
      layout
      variants={toastSlide}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn(
        'glass-strong flex items-center gap-3 rounded-[var(--radius-sm)] px-4 py-3 shadow-[var(--shadow-glass-lg)]',
      )}
    >
      <Icon name={cfg.icon} size={18} className={cfg.color} />
      <span className="text-sm font-medium text-[var(--color-ink-primary)]">
        {toast.message}
      </span>
    </motion.div>
  )
}
