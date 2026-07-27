import type { Variants } from 'framer-motion'

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOutCubic = [0.65, 0, 0.35, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOutExpo } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOutExpo } },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutExpo } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutExpo } },
}

export const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.3, ease: easeOutExpo } },
  whileTap: { y: -2, scale: 0.98 },
}

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 20px 60px rgba(139, 92, 246, 0.25)',
    transition: { duration: 0.4, ease: easeOutExpo },
  },
}

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: easeInOutCubic } },
}
