/**
 * BuilderPage — schema-driven form + live preview.
 *
 * Reads the form schema (BUILDER_FORM_SCHEMA), renders it via FormRenderer,
 * and generates markdown through the template engine. Uses the new store
 * selectors and toast provider.
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { GlassCard, GlassButton, GlassPreview } from '@/components/ui'
import { Icon } from '@/shared/iconRegistry'
import { fadeUp, pageTransition } from '@/animations/variants'
import { useBuilder, usePreview, useHistory } from '@/store/selectors'
import { usePyodide } from '@/hooks/usePyodide'
import { useToast } from '@/providers/ToastProvider'
import { generateReadme } from '@/templates/engine'
import { FormRenderer } from '@/engine/FormRenderer'
import { BUILDER_FORM_SCHEMA } from '@/engine/builderFormSchema'
import { DEMO_DATA } from '@/features/templates/demoData'
import type { FieldValue } from '@/engine/form.types'
import type { HistoryRecord } from '@/types'

export default function BuilderPage() {
  const { data, setField, setData, setGenerating, isGenerating } = useBuilder()
  const { currentMarkdown, setMarkdown } = usePreview()
  const { saveHistory } = useHistory()
  const { ready, loading, init, generate } = usePyodide()
  const toast = useToast()
  const [activeStep, setActiveStep] = useState('profile')

  useEffect(() => {
    init()
  }, [init])

  const handleGenerate = useCallback(async () => {
    if (!ready) {
      toast.show('Loading Python engine…', 'info')
      await init()
    }
    setGenerating(true)
    try {
      const { markdown } = await generateReadme(data.template, data)
      setMarkdown(markdown)
      const record: HistoryRecord = {
        id: crypto.randomUUID(),
        name: data.name || 'Untitled',
        username: data.username || 'user',
        template: data.template,
        date: new Date().toISOString(),
        markdown,
        config: JSON.stringify(data),
      }
      saveHistory(record)
      toast.show('README generated successfully!', 'success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Generation failed'
      toast.show(`Failed to generate: ${msg}`, 'error')
    } finally {
      setGenerating(false)
    }
  }, [ready, init, data, setGenerating, setMarkdown, saveHistory, toast, generate])

  const loadDemo = () => {
    setData(DEMO_DATA)
    toast.show('Demo data loaded', 'info')
  }

  const handleFieldChange = (field: keyof typeof data, value: FieldValue) => {
    setField(field, value as never)
  }

  const activeSection = BUILDER_FORM_SCHEMA.find((s) => s.id === activeStep) ?? BUILDER_FORM_SCHEMA[0]

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100"
    >
      {/* Top bar with controls */}
      <motion.div variants={fadeUp} className="border-b border-[#8b5cf6]/10 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-lg font-bold text-gradient">README Builder</h1>
              <p className="text-xs text-[var(--color-ink-secondary)]">
                {loading ? 'Loading engine…' : ready ? 'Ready' : 'Initializing…'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GlassButton variant="ghost" size="sm" icon="sparkles" onClick={loadDemo}>
              Demo
            </GlassButton>
            <GlassButton
              size="sm"
              icon="play"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating…' : 'Generate'}
            </GlassButton>
            <button
              onClick={() => navigator.clipboard.writeText(currentMarkdown)}
              className="glass-premium glow-border-cyan inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-ink-secondary)] transition-all duration-300 hover:text-[var(--color-ink-primary)] hover:shadow-[var(--shadow-glow-cyan)]"
            >
              <Icon name="copy" size={16} /> Copy
            </button>
            <button
              onClick={() => {
                const blob = new Blob([currentMarkdown], { type: 'text/markdown' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'README.md'
                a.click()
                URL.revokeObjectURL(url)
              }}
              className="glass-premium glow-border-cyan inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-ink-secondary)] transition-all duration-300 hover:text-[var(--color-ink-primary)] hover:shadow-[var(--shadow-glow-cyan)]"
            >
              <Icon name="download" size={16} /> Download
            </button>
          </div>
        </div>
      </motion.div>

      {/* 3-column workspace */}
      <div className="flex h-[calc(100vh-8rem)] overflow-hidden">
        {/* Left sidebar - Form sections */}
        <motion.div variants={fadeUp} className="w-80 border-r border-[#8b5cf6]/10 bg-white/40 backdrop-blur-sm overflow-y-auto">
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)] px-2">Form Sections</h3>
            {BUILDER_FORM_SCHEMA.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveStep(section.id)}
                className={
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ' +
                  (activeStep === section.id
                    ? 'glass-premium-glow glow-border-purple bg-white/70 text-[var(--color-ink-primary)] shadow-[var(--shadow-glow-purple)]'
                    : 'text-[var(--color-ink-secondary)] hover:bg-white/50')
                }
              >
                <Icon name={section.icon as never} size={16} />
                <div className="flex-1 text-left">
                  <div className="font-semibold">{section.title}</div>
                  <div className="text-xs text-[var(--color-ink-muted)]">{section.fields?.length || 0} fields</div>
                </div>
                {activeStep === section.id && <Icon name="checkCircle" size={14} className="text-[#10b981]" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Center - Form editor */}
        <motion.div variants={fadeUp} className="flex-1 border-r border-[#8b5cf6]/10 overflow-y-auto">
          <div className="p-8">
            <GlassCard interactive={false} premium glow="multi">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gradient mb-2">{activeSection.title}</h2>
                    <p className="text-sm text-[var(--color-ink-secondary)]">
                      Configure your {activeSection.title.toLowerCase()} settings
                    </p>
                  </div>
                  <FormRenderer
                    section={activeSection}
                    data={data}
                    onChange={handleFieldChange}
                  />
                </motion.div>
              </AnimatePresence>
            </GlassCard>
          </div>
        </motion.div>

        {/* Right - Live preview */}
        <motion.div variants={fadeUp} className="w-96 bg-white/40 backdrop-blur-sm overflow-y-auto sticky top-0">
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[var(--color-ink-primary)] mb-2">Live Preview</h3>
              <div className="text-xs text-[var(--color-ink-muted)]">
                {currentMarkdown.length > 0 ? `${currentMarkdown.length} characters` : 'Generate to see preview'}
              </div>
            </div>
            <GlassPreview isEmpty={!currentMarkdown} className="max-h-[calc(100vh-12rem)]">
              <div className="prose prose-sm max-w-none text-xs">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentMarkdown}
                </ReactMarkdown>
              </div>
            </GlassPreview>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
