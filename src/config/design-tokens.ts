/**
 * Premium Design Tokens
 *
 * Centralized design system for the premium SaaS redesign.
 * Defines colors, gradients, shadows, spacing, and typography scales.
 */

/* ============================================================================ */
/* Color Palette                                                               */
/* ============================================================================ */

export const colors = {
  // Aurora background palette
  aurora: {
    primary: 'rgba(139, 92, 246, 0.08)',
    secondary: 'rgba(6, 182, 212, 0.08)',
    accent: 'rgba(236, 72, 153, 0.06)',
    tertiary: 'rgba(249, 115, 22, 0.06)',
  },

  // Multi-color gradients
  gradients: {
    purpleToCyan: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
    pinkToOrange: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
    blueToCyan: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    cyanToViolet: 'linear-gradient(135deg, #06b6d4 0%, #a78bfa 100%)',
    orangeToPink: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
    purplePink: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
  },

  // Glow effects for cards and buttons
  glows: {
    purple: 'rgba(139, 92, 246, 0.3)',
    cyan: 'rgba(6, 182, 212, 0.3)',
    pink: 'rgba(236, 72, 153, 0.3)',
    orange: 'rgba(249, 115, 22, 0.2)',
    blue: 'rgba(59, 130, 246, 0.25)',
  },
} as const

/* ============================================================================ */
/* Shadow System                                                               */
/* ============================================================================ */

export const shadows = {
  // Glass shadows
  glass: {
    sm: '0 2px 12px rgba(15, 23, 42, 0.06)',
    md: '0 8px 32px rgba(15, 23, 42, 0.08)',
    lg: '0 20px 60px rgba(15, 23, 42, 0.12)',
    xl: '0 30px 80px rgba(15, 23, 42, 0.16)',
  },

  // Glow shadows for premium feel
  glow: {
    purple: '0 0 40px rgba(139, 92, 246, 0.25), 0 8px 32px rgba(139, 92, 246, 0.15)',
    cyan: '0 0 40px rgba(6, 182, 212, 0.25), 0 8px 32px rgba(6, 182, 212, 0.15)',
    pink: '0 0 40px rgba(236, 72, 153, 0.25), 0 8px 32px rgba(236, 72, 153, 0.15)',
    orange: '0 0 40px rgba(249, 115, 22, 0.2), 0 8px 32px rgba(249, 115, 22, 0.12)',
    blue: '0 0 40px rgba(59, 130, 246, 0.2), 0 8px 32px rgba(59, 130, 246, 0.12)',
    multi:
      '0 0 40px rgba(139, 92, 246, 0.2), 0 0 30px rgba(6, 182, 212, 0.15), 0 8px 32px rgba(139, 92, 246, 0.1)',
  },

  // Depth shadows for layering
  depth: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.05)',
    md: '0 4px 12px rgba(0, 0, 0, 0.08)',
    lg: '0 12px 32px rgba(0, 0, 0, 0.12)',
  },
} as const

/* ============================================================================ */
/* Border Styles                                                               */
/* ============================================================================ */

export const borders = {
  // Gradient borders
  gradients: {
    purpleCyan:
      'linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.3))',
    pinkOrange:
      'linear-gradient(135deg, rgba(236, 72, 153, 0.5), rgba(249, 115, 22, 0.4), rgba(236, 72, 153, 0.3))',
    blueCyan:
      'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.2))',
  },

  // Opacity values
  opacity: {
    subtle: 'rgba(255, 255, 255, 0.3)',
    normal: 'rgba(255, 255, 255, 0.5)',
    strong: 'rgba(255, 255, 255, 0.7)',
  },

  // Border radius
  radius: {
    sm: '10px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
} as const

/* ============================================================================ */
/* Typography Scale                                                            */
/* ============================================================================ */

export const typography = {
  // Font families
  fontFamily: {
    sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
    mono: '"Fira Code", ui-monospace, monospace',
  },

  // Line heights for premium spacing
  lineHeight: {
    tight: 1.3,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Letter spacing for premium typography
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.04em',
  },

  // Font sizes
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const

/* ============================================================================ */
/* Spacing System (8px base)                                                   */
/* ============================================================================ */

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
} as const

/* ============================================================================ */
/* Animation Easing                                                            */
/* ============================================================================ */

export const easing = {
  // Premium easing curves
  smooth: [0.16, 1, 0.3, 1],
  spring: [0.175, 0.885, 0.32, 1.275],
  out: [0.33, 1, 0.68, 1],
  in: [0.32, 0, 0.67, 0],
  inOut: [0.64, 0, 0.78, 0],
} as const

/* ============================================================================ */
/* Backdrop Blur Levels                                                        */
/* ============================================================================ */

export const blur = {
  sm: 'blur(12px)',
  md: 'blur(24px)',
  lg: 'blur(40px)',
  xl: 'blur(64px)',
} as const

/* ============================================================================ */
/* Z-Index Stack                                                               */
/* ============================================================================ */

export const zIndex = {
  dropdown: 40,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  notification: 80,
} as const

/* ============================================================================ */
/* Transition Durations (milliseconds)                                         */
/* ============================================================================ */

export const duration = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slowest: 0.8,
} as const

/* ============================================================================ */
/* Export all tokens as a single object                                        */
/* ============================================================================ */

export const designTokens = {
  colors,
  shadows,
  borders,
  typography,
  spacing,
  easing,
  blur,
  zIndex,
  duration,
} as const

export default designTokens
