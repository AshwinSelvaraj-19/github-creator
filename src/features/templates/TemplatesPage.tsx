/**
 * TemplatesPage — filterable template gallery.
 *
 * Reads from the template registry (no hardcoded templates) and uses the
 * templates slice for filter state.
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GlassCard, GlassBadge } from '@/components/ui'
import { fadeUp, staggerContainer, staggerDefault, cardItem, hoverLift } from '@/animations/variants'
import { getTemplatesByCategory, getTemplateCategories } from '@/templates/registry'
import { useTemplates, useBuilder } from '@/store/selectors'
import { cn } from '@/utils/cn'

export default function TemplatesPage() {
  const { templateFilter, setTemplateFilter, setSelectedTemplate } = useTemplates()
  const { setTemplate } = useBuilder()

  const categories = getTemplateCategories()
  const filtered = getTemplatesByCategory(templateFilter)

  const handleSelect = (id: string) => {
    setSelectedTemplate(id as never)
    setTemplate(id as never)
  }

  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-auto max-w-7xl px-6 py-16"
    >
      <motion.h1 variants={fadeUp} className="mb-3 text-4xl font-bold text-gradient">
        Choose your template
      </motion.h1>
      <motion.p variants={fadeUp} className="mb-8 text-[var(--color-ink-secondary)]">
        Each design has a distinct visual identity. Pick one to start building.
      </motion.p>

      <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setTemplateFilter(cat)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium capitalize transition-all',
              templateFilter === cat
                ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white'
                : 'glass text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]',
            )}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerDefault}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((t) => (
          <motion.div key={t.id} variants={cardItem} {...hoverLift}>
            <GlassCard className="overflow-hidden">
              <div
                className="mb-4 flex h-40 items-center justify-center rounded-[var(--radius-md)] text-5xl"
                style={{ background: `linear-gradient(135deg, ${t.theme.accent}22, ${t.theme.accent}08)` }}
              >
                {t.emoji}
              </div>
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-[var(--color-ink-secondary)]">{t.description}</p>
              <div className="mt-3">
                <GlassBadge color="purple">{t.category}</GlassBadge>
              </div>
              <Link
                to="/builder"
                onClick={() => handleSelect(t.id)}
                className="mt-5 block w-full rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] py-2.5 text-center text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Use this template
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
