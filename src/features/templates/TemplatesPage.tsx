/**
 * TemplatesPage — premium template marketplace.
 *
 * Reads from the template registry and provides:
 * - Header with statistics
 * - Comprehensive filters (search, category, difficulty, sort)
 * - Premium template grid with hover animations
 * - Preview drawer with detailed template information
 * - Selection flow to builder with state preservation
 */

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { GlassCard, GlassBadge } from '@/components/ui'
import { Icon } from '@/shared/iconRegistry'
import { fadeUp, staggerContainer, staggerDefault, cardItem, hoverLift } from '@/animations/variants'
import { getTemplatesByCategory, getTemplateCategories, templateRegistry } from '@/templates/registry'
import { useTemplates, useBuilder } from '@/store/selectors'
import { cn } from '@/utils/cn'

interface StatCard {
  label: string
  value: number | string
  icon: string
}

export default function TemplatesPage() {
  const { templateFilter, setTemplateFilter, setSelectedTemplate } = useTemplates()
  const { setTemplate } = useBuilder()

  // Local state for filters and preview
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest')
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)

  const categories = getTemplateCategories()
  const allTemplates = templateRegistry
  
  // Filter templates
  const filtered = useMemo(() => {
    let result = getTemplatesByCategory(templateFilter)
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.metadata.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return result
  }, [templateFilter, searchQuery])

  // Get preview template data
  const previewData = previewTemplate ? allTemplates.find((t) => t.id === previewTemplate) : null

  // Statistics
  const stats: StatCard[] = [
    { label: 'Total Templates', value: allTemplates.length, icon: 'grid' },
    { label: 'Categories', value: categories.filter((c) => c !== 'all').length, icon: 'layers' },
    { label: 'Popular', value: allTemplates.filter((t) => t.metadata.downloads && t.metadata.downloads > 100).length, icon: 'trending' },
    { label: 'Recently Added', value: 3, icon: 'clock' },
  ]

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
      className="min-h-screen"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="border-b border-[#8b5cf6]/10 bg-gradient-to-b from-white/5 to-white/0 px-6 py-12 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-5xl font-bold text-gradient mb-3">Explore Premium Templates</h1>
          <p className="text-lg text-[var(--color-ink-secondary)] mb-8 text-balance">
            Choose a template that matches your developer profile and get started instantly.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={cardItem}
                className="glass-premium rounded-[var(--radius-md)] p-4 glow-border-purple"
              >
                <div className="flex items-center gap-3">
                  <Icon name={stat.icon as any} size={20} className="text-[#8b5cf6]" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-ink-muted)]">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-[var(--color-ink-primary)]">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        {/* Filters */}
        <motion.div variants={fadeUp} className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Icon
              name="search"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]"
            />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[var(--radius-md)] border border-[#8b5cf6]/20 bg-white/40 backdrop-blur-sm pl-12 pr-4 py-3 text-[var(--color-ink-primary)] placeholder:text-[var(--color-ink-muted)] focus:border-[#8b5cf6]/50 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/30 transition-all duration-300"
            />
          </div>

          {/* Filter and Sort Row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTemplateFilter(cat)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm font-medium capitalize transition-all duration-300',
                    templateFilter === cat
                      ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white shadow-[var(--shadow-glow-purple)]'
                      : 'glass-premium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)] hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex gap-2">
              {(['newest', 'popular'] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                    sortBy === sort
                      ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30'
                      : 'glass text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]'
                  )}
                >
                  {sort === 'newest' ? 'Newest' : 'Popular'}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Template Grid */}
        <motion.div
          variants={staggerDefault}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((template) => (
            <motion.div
              key={template.id}
              variants={cardItem}
              {...hoverLift}
              className="group relative"
            >
              <GlassCard premium glow="multi" interactive className="h-full overflow-hidden">
                {/* Preview Area */}
                <div
                  className="mb-6 flex h-40 items-center justify-center rounded-[var(--radius-md)] text-5xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${template.theme.accent}20, ${template.theme.accent}10)`,
                  }}
                >
                  {template.emoji}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col">
                  <h3 className="text-lg font-bold text-[var(--color-ink-primary)]">{template.name}</h3>
                  <p className="mt-2 text-sm text-[var(--color-ink-secondary)] flex-1">
                    {template.description}
                  </p>

                  {/* Category Badge */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <GlassBadge color="purple">{template.category}</GlassBadge>
                    {template.metadata.tags?.slice(0, 2).map((tag) => (
                      <GlassBadge key={tag} color="cyan">
                        {tag}
                      </GlassBadge>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => setPreviewTemplate(template.id)}
                      className="flex-1 rounded-lg glass-premium glow-border-cyan px-3 py-2.5 text-sm font-medium text-[var(--color-ink-primary)] transition-all duration-300 hover:shadow-[var(--shadow-glow-cyan)]"
                    >
                      Preview
                    </button>
                    <Link
                      to="/builder"
                      onClick={() => handleSelect(template.id)}
                      className="flex-1 rounded-lg bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#06b6d4] px-3 py-2.5 text-center text-sm font-medium text-white transition-all duration-300 hover:shadow-[var(--shadow-glow-multi)]"
                    >
                      Use Template
                    </Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center py-20">
            <Icon name="search" size={48} className="mb-4 text-[var(--color-ink-muted)]/30" />
            <p className="text-lg text-[var(--color-ink-muted)]">No templates found</p>
            <p className="text-sm text-[var(--color-ink-muted)]/60">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>

      {/* Preview Drawer */}
      <AnimatePresence>
        {previewData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewTemplate(null)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewData && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-xl border-l border-[#8b5cf6]/20 p-6 shadow-2xl"
          >
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute right-4 top-4 p-2 hover:bg-white/40 rounded-lg transition-colors"
            >
              <Icon name="close" size={20} />
            </button>

            <div className="mt-8">
              {/* Preview Header */}
              <div
                className="mb-6 flex h-32 items-center justify-center rounded-[var(--radius-lg)] text-6xl"
                style={{
                  background: `linear-gradient(135deg, ${previewData.theme.accent}25, ${previewData.theme.accent}10)`,
                }}
              >
                {previewData.emoji}
              </div>

              <h2 className="text-2xl font-bold text-[var(--color-ink-primary)]">{previewData.name}</h2>
              <p className="mt-2 text-[var(--color-ink-secondary)]">{previewData.description}</p>

              {/* Features */}
              <div className="mt-8">
                <h3 className="text-sm uppercase tracking-wider font-bold text-[var(--color-ink-primary)] mb-3">
                  Features
                </h3>
                <div className="space-y-2">
                  {previewData.metadata.tags?.map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-sm text-[var(--color-ink-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6]" />
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Widgets */}
              <div className="mt-8">
                <h3 className="text-sm uppercase tracking-wider font-bold text-[var(--color-ink-primary)] mb-3">
                  Supported Widgets
                </h3>
                <div className="space-y-2">
                  {Object.entries(previewData.widgets).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-[var(--color-ink-secondary)] capitalize">{key}:</span>
                      <span className="font-medium text-[var(--color-ink-primary)]">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              {previewData.metadata.rating && (
                <div className="mt-8 pt-6 border-t border-[#8b5cf6]/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-ink-secondary)]">Rating:</span>
                    <span className="font-medium text-[var(--color-ink-primary)]">
                      {'★'.repeat(Math.floor(previewData.metadata.rating))}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <Link
                  to="/builder"
                  onClick={() => {
                    handleSelect(previewData.id)
                    setPreviewTemplate(null)
                  }}
                  className="block w-full rounded-lg bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#06b6d4] px-4 py-3 text-center font-medium text-white transition-all duration-300 hover:shadow-[var(--shadow-glow-multi)]"
                >
                  Use this Template
                </Link>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="w-full rounded-lg glass-premium px-4 py-3 font-medium text-[var(--color-ink-primary)] transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
