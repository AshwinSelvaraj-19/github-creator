/**
 * Centralized animation library.
 *
 * Why: Framer Motion variants defined inline in components are impossible to audit,
 * reuse, or keep consistent across the app. This module exports every animation
 * variant the app uses, grouped by category. Components reference these by import
 * — never define `transition`, `variants`, or `whileHover` objects inline.
 *
 * Categories:
 *   - hover:    micro-interactions for buttons, cards, icons
 *   - fade:     opacity-based entrance/exit
 *   - slide:    directional movement
 *   - page:     route-level transitions (used with AnimatePresence)
 *   - card:     staggered card grids
 *   - modal:    overlay + dialog spring
 *   - button:   press / ripple / lift
 *   - sidebar:  drawer open/close
 *   - blur:     blur-in entrance
 */

import type { Variants, Transition } from 'framer-motion'
import { duration, ease } from '@/config/tokens'

const EASE_OUT = ease.out
const EASE_INOUT = ease.inOut

/* -------------------------------------------------------------------------- */
/* Hover                                                                      */
/* -------------------------------------------------------------------------- */

export const hoverLift = {
  whileHover: { y: -6, transition: { duration: duration.fast, ease: EASE_OUT } },
  whileTap: { y: -2, scale: 0.98 },
}

export const hoverLiftSm = {
  whileHover: { y: -3, transition: { duration: duration.fast, ease: EASE_OUT } },
  whileTap: { scale: 0.97 },
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 20px 60px rgba(139, 92, 246, 0.25)',
    transition: { duration: duration.normal, ease: EASE_OUT },
  },
}

export const hoverScale = {
  whileHover: { scale: 1.05, transition: { duration: duration.fast, ease: EASE_OUT } },
  whileTap: { scale: 0.95 },
}

/* -------------------------------------------------------------------------- */
/* Fade                                                                       */
/* -------------------------------------------------------------------------- */

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: duration.fast, ease: EASE_INOUT } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: EASE_OUT } },
  exit: { opacity: 0, y: 12, transition: { duration: duration.fast, ease: EASE_INOUT } },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: EASE_OUT } },
}

/* -------------------------------------------------------------------------- */
/* Slide                                                                      */
/* -------------------------------------------------------------------------- */

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: EASE_OUT } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.slow, ease: EASE_OUT } },
}

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: EASE_OUT } },
}

/* -------------------------------------------------------------------------- */
/* Blur                                                                       */
/* -------------------------------------------------------------------------- */

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: duration.slow, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    transition: { duration: duration.fast, ease: EASE_INOUT },
  },
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: EASE_OUT } },
  exit: { opacity: 0, y: -12, transition: { duration: duration.fast, ease: EASE_INOUT } },
}

export const pageSlide: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.normal, ease: EASE_OUT } },
  exit: { opacity: 0, x: -30, transition: { duration: duration.fast, ease: EASE_INOUT } },
}

/* -------------------------------------------------------------------------- */
/* Card (staggered grids)                                                     */
/* -------------------------------------------------------------------------- */

export const staggerContainer = (stagger = 0.08, delay = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

export const staggerFast: Variants = staggerContainer(0.05, 0.05)
export const staggerDefault: Variants = staggerContainer(0.08, 0.1)
export const staggerSlow: Variants = staggerContainer(0.12, 0.15)

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.slow, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: duration.fast, ease: EASE_INOUT },
  },
}

/* -------------------------------------------------------------------------- */
/* Modal                                                                      */
/* -------------------------------------------------------------------------- */

export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
}

export const modalDialog: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 30 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: duration.fast, ease: EASE_INOUT },
  },
}

/* -------------------------------------------------------------------------- */
/* Button                                                                     */
/* -------------------------------------------------------------------------- */

export const buttonPress: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: duration.fast, ease: EASE_OUT } },
  pressed: { scale: 0.96, transition: { duration: duration.instant } },
}

export const buttonShimmer: Transition = {
  repeat: Infinity,
  repeatType: 'reverse',
  duration: 2,
  ease: 'easeInOut',
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

export const sidebarSlide: Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: duration.normal, ease: EASE_OUT },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: duration.normal, ease: EASE_INOUT },
  },
}

export const sidebarItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: duration.fast, ease: EASE_OUT } },
}

/* -------------------------------------------------------------------------- */
/* Toast                                                                      */
/* -------------------------------------------------------------------------- */

export const toastSlide: Variants = {
  hidden: { opacity: 0, x: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 28 },
  },
  exit: {
    opacity: 0,
    x: 40,
    scale: 0.9,
    transition: { duration: duration.fast, ease: EASE_INOUT },
  },
}

/* -------------------------------------------------------------------------- */
/* Accordion                                                                  */
/* -------------------------------------------------------------------------- */

export const accordionContent: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: duration.normal, ease: EASE_OUT },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: duration.fast, ease: EASE_INOUT },
  },
}

/* -------------------------------------------------------------------------- */
/* Shared layout (active nav indicator etc.)                                  */
/* -------------------------------------------------------------------------- */

export const layoutId = (id: string) => ({
  layoutId: id,
  transition: { type: 'spring' as const, stiffness: 380, damping: 30 },
})

/* -------------------------------------------------------------------------- */
/* Barrel export                                                              */
/* -------------------------------------------------------------------------- */

export const animations = {
  hoverLift,
  hoverLiftSm,
  hoverGlow,
  hoverScale,
  fadeIn,
  fadeUp,
  fadeDown,
  slideInLeft,
  slideInRight,
  slideInUp,
  blurIn,
  pageTransition,
  pageSlide,
  staggerContainer,
  staggerFast,
  staggerDefault,
  staggerSlow,
  cardItem,
  modalOverlay,
  modalDialog,
  buttonPress,
  buttonShimmer,
  sidebarSlide,
  sidebarItem,
  toastSlide,
  accordionContent,
} as const
