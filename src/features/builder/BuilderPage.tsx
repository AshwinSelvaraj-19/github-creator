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
      className="mx-auto max-w-7xl px-6 py-10"
    >
      <motion.div variants={fadeUp} className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">README Builder</h1>
          <p className="text-[var(--color-ink-secondary)]">
            {loading ? 'Loading Python engine…' : ready ? 'Engine ready' : 'Initializing…'}
          </p>
        </div>
        <div className="flex gap-2">
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
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form panel */}
        <motion.div variants={fadeUp}>
          <GlassCard interactive={false}>
            {/* Step tabs */}
            <div className="mb-6 flex flex-wrap gap-2">
              {BUILDER_FORM_SCHEMA.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveStep(section.id)}
                  className={
                    'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ' +
                    (activeStep === section.id
                      ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white'
                      : 'glass text-[var(--color-ink-secondary)] hover:text-[var(--color-ink-primary)]')
                  }
                >
                  <Icon name={section.icon as never} size={13} />
                  {section.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <FormRenderer
                  section={activeSection}
                  data={data}
                  onChange={handleFieldChange}
                />
              </motion.div>
            </AnimatePresence>
          </GlassCard>
        </motion.div>

        {/* Preview panel */}
        <motion.div variants={fadeUp} className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-3 flex justify-end gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(currentMarkdown)}
              className="inline-flex items-center gap-1.5 rounded-lg glass px-3 py-1.5 text-xs font-medium text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink-primary)]"
            >
              <Icon name="copy" size={14} /> Copy
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
              className="inline-flex items-center gap-1.5 rounded-lg glass px-3 py-1.5 text-xs font-medium text-[var(--color-ink-secondary)] transition-colors hover:text-[var(--color-ink-primary)]"
            >
              <Icon name="download" size={14} /> Download
            </button>
          </div>
          <GlassPreview isEmpty={!currentMarkdown}>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentMarkdown}
              </ReactMarkdown>
            </div>
          </GlassPreview>
        </motion.div>
      </div>
    </motion.div>
  )
}
