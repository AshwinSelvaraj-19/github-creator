/**
 * LandingPage — the award-winning homepage.
 *
 * Composes all sections in order:
 *   1. Hero (3D scene + headline + typing + CTAs)
 *   2. Workflow timeline
 *   3. Feature cards
 *   4. Templates carousel
 *   5. Footer
 *
 * The immersive background is rendered at the app layout level so it persists
 * across route transitions.
 */

import { motion } from 'framer-motion'
import { pageTransition } from '@/animations/variants'
import { HeroSection } from './sections/HeroSection'
import { WorkflowSection } from './sections/WorkflowSection'
import { FeaturesSection } from './sections/FeaturesSection'
import { TemplatesCarousel } from './sections/TemplatesCarousel'
import { FooterSection } from './sections/FooterSection'

export default function LandingPage() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <HeroSection />
      <WorkflowSection />
      <FeaturesSection />
      <TemplatesCarousel />
      <FooterSection />
    </motion.div>
  )
}
