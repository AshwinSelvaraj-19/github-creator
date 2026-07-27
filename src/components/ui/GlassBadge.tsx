/**
 * GlassBadge — small pill label for tags, statuses, and metadata.
 */

import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type BadgeColor = 'purple' | 'blue' | 'cyan' | 'pink' | 'orange' | 'success' | 'warning' | 'error'

export interface GlassBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor
}

const colorClass: Record<BadgeColor, string> = {
  purple: 'bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20',
  blue: 'bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20',
  cyan: 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/20',
  pink: 'bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]/20',
  orange: 'bg-[#f97316]/10 text-[#f97316] border-[#f97316]/20',
  success: 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20',
  warning: 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20',
  error: 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20',
}

export function GlassBadge({ className, color = 'purple', ...props }: GlassBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md',
        colorClass[color],
        className,
      )}
      {...props}
    />
  )
}
