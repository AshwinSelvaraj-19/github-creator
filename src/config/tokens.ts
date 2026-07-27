/**
 * Centralized design tokens — the single source of truth for all visual values.
 *
 * These tokens are mirrored into Tailwind v4's `@theme` block in `src/styles/index.css`
 * so utility classes like `bg-[var(--color-purple)]` resolve to the same values.
 * Components should NEVER hardcode colors, radii, shadows, or durations — always
 * reference a token here or its CSS variable counterpart.
 *
 * Why: a single token table lets us re-theme the entire app (e.g. a dark variant or
 * a white-label reskin) by changing values in one place, and keeps component code
 * free of magic numbers.
 */

export const colors = {
  canvas: '#f7f8fc',
  surface: 'rgba(255, 255, 255, 0.65)',
  surfaceStrong: 'rgba(255, 255, 255, 0.85)',
  surfaceInput: 'rgba(255, 255, 255, 0.6)',
  surfaceInputFocus: 'rgba(255, 255, 255, 0.8)',

  borderSubtle: 'rgba(255, 255, 255, 0.6)',
  borderStrong: 'rgba(15, 23, 42, 0.08)',
  borderFocus: '#8b5cf6',

  inkPrimary: '#0f172a',
  inkSecondary: '#475569',
  inkMuted: '#94a3b8',

  purple: '#8b5cf6',
  blue: '#3b82f6',
  cyan: '#06b6d4',
  pink: '#ec4899',
  orange: '#f97316',

  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
} as const

export const gradients = {
  primary: 'linear-gradient(135deg, #8b5cf6, #06b6d4 50%, #ec4899)',
  warm: 'linear-gradient(135deg, #f97316, #ec4899)',
  cool: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  brand: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const

export const radius = {
  xs: '6px',
  sm: '10px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  full: '9999px',
} as const

export const blur = {
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  '2xl': '60px',
  blob: '100px',
} as const

export const glassOpacity = {
  subtle: 0.5,
  default: 0.65,
  strong: 0.85,
  input: 0.6,
  inputFocus: 0.8,
} as const

export const shadows = {
  glassSm: '0 2px 12px rgba(15, 23, 42, 0.06)',
  glass: '0 8px 32px rgba(15, 23, 42, 0.08)',
  glassLg: '0 20px 60px rgba(15, 23, 42, 0.12)',
  glowPurple: '0 8px 32px rgba(139, 92, 246, 0.25)',
  glowCyan: '0 8px 32px rgba(6, 182, 212, 0.25)',
  glowPink: '0 8px 32px rgba(236, 72, 153, 0.25)',
} as const

export const duration = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
} as const

export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  spring: { type: 'spring', stiffness: 380, damping: 30 } as const,
}

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const tokens = {
  colors,
  gradients,
  spacing,
  radius,
  blur,
  glassOpacity,
  shadows,
  duration,
  ease,
  breakpoints,
} as const
