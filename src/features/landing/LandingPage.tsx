/**
 * LandingPage — hero + template preview strip.
 *
 * Uses the centralized animation variants, icon registry, and template
 * registry. This is a scaffold; the full landing page will be built next.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GlassCard, GlassBadge, GlassButton } from '@/components/ui'
import { Icon } from '@/shared/iconRegistry'
import { fadeUp, staggerContainer, staggerDefault, cardItem, hoverLift } from '@/animations/variants'
import { templateRegistry } from '@/templates/registry'

export default function LandingPage() {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
    >
      <section className="mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-2">
          <GlassBadge color="purple"><Icon name="sparkles" size={13} /> {templateRegistry.length} Templates</GlassBadge>
          <GlassBadge color="cyan"><Icon name="zap" size={13} /> Live Preview</GlassBadge>
          <GlassBadge color="pink"><Icon name="code" size={13} /> Python Powered</GlassBadge>
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-5xl font-extrabold leading-[1.05] md:text-7xl">
          <span className="text-gradient">Craft stunning</span>
          <br />
          <span className="text-gradient-warm">GitHub READMEs</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg text-[var(--color-ink-secondary)]">
          A premium README builder with real-time preview, animated templates, and a
          guided workflow — powered by Python in your browser.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/builder">
            <GlassButton size="lg" icon="sparkles" {...hoverLift}>
              Start Building
            </GlassButton>
          </Link>
          <Link to="/templates">
            <GlassButton variant="secondary" size="lg" icon="eye" iconPosition="right" {...hoverLift}>
              Explore Templates
            </GlassButton>
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <motion.h2 variants={fadeUp} className="mb-10 text-center text-3xl font-bold">
          {templateRegistry.length} unique designs
        </motion.h2>
        <motion.div
          variants={staggerDefault}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4 md:grid-cols-5"
        >
          {templateRegistry.map((t) => (
            <motion.div key={t.id} variants={cardItem} {...hoverLift}>
              <GlassCard className="flex h-32 flex-col items-center justify-center text-center">
                <span className="text-3xl">{t.emoji}</span>
                <span className="mt-2 text-sm font-semibold">{t.name}</span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
