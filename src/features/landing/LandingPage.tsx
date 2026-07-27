import { motion } from 'framer-motion'
import { GlassCard, GlassButton, GlassBadge } from '@/components/ui/glass'
import { fadeUp, staggerContainer, hoverLift } from '@/features/animations/variants'
import { TEMPLATES } from '@/features/templates/templates.config'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, Code as Code2, Eye } from 'lucide-react'

export default function LandingPage() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
    >
      {/* Hero */}
      <section className="mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.div variants={fadeUp} className="mb-6 flex flex-wrap justify-center gap-2">
          <GlassBadge color="purple"><Sparkles size={13} /> 10 Templates</GlassBadge>
          <GlassBadge color="cyan"><Zap size={13} /> Live Preview</GlassBadge>
          <GlassBadge color="pink"><Code2 size={13} /> Python Powered</GlassBadge>
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
            <GlassButton size="lg" {...hoverLift}>
              <Sparkles size={18} /> Start Building
            </GlassButton>
          </Link>
          <Link to="/templates">
            <GlassButton variant="secondary" size="lg" {...hoverLift}>
              <Eye size={18} /> Explore Templates
            </GlassButton>
          </Link>
        </motion.div>
      </section>

      {/* Template preview strip */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <motion.h2 variants={fadeUp} className="mb-10 text-center text-3xl font-bold">
          Ten unique designs
        </motion.h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {TEMPLATES.map((t, i) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              custom={i}
              {...hoverLift}
            >
              <GlassCard className="flex h-32 flex-col items-center justify-center p-4 text-center">
                <span className="text-3xl">{t.emoji}</span>
                <span className="mt-2 text-sm font-semibold">{t.name}</span>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
