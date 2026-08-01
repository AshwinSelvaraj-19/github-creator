/**
 * BuilderPage — Professional workspace (Figma + Canva + Notion).
 *
 * Features:
 * - Top toolbar: Template switcher, search, undo/redo, theme, export
 * - Left sidebar: Section navigation with drag-drop and collapsibility
 * - Center panel: Dynamic form editor with real-time validation
 * - Right panel: Live GitHub-styled README preview
 * - Bottom toolbar: Copy, download, reset, fullscreen preview
 * - Widget system: Toggle and configure GitHub widgets
 * - Template switching preserves all user data
 */

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useCallback, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { GlassCard, GlassButton, GlassModal } from '@/components/ui'
import { Icon } from '@/shared/iconRegistry'
import { fadeUp, pageTransition } from '@/animations/variants'
import { useBuilder, usePreview, useHistory, useTemplates } from '@/store/selectors'
import { usePyodide } from '@/hooks/usePyodide'
import { useToast } from '@/providers/ToastProvider'
import { generateReadme } from '@/templates/engine'
import { FormRenderer } from '@/engine/FormRenderer'
import { BUILDER_FORM_SCHEMA } from '@/engine/builderFormSchema'
import { templateRegistry } from '@/templates/registry'
import type { FieldValue } from '@/engine/form.types'
import type { HistoryRecord } from '@/types'
import { cn } from '@/utils/cn'

export default function BuilderPage() {
  const { data, setField, setGenerating, isGenerating, resetData } = useBuilder()
  const { currentMarkdown, setMarkdown, previewFullscreen, setPreviewFullscreen } = usePreview()
  const { saveHistory } = useHistory()
  const { setSelectedTemplate } = useTemplates()
  const { ready, loading, init } = usePyodide()
  const toast = useToast()
  
  // Local state for UI
  const [activeStep, setActiveStep] = useState('profile')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showWidgetsModal, setShowWidgetsModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sectionOrder, setSectionOrder] = useState(BUILDER_FORM_SCHEMA.map((s) => s.id))
  const draggedItem = useRef<string | null>(null)

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
  }, [ready, init, data, setGenerating, setMarkdown, saveHistory, toast])

  const handleFieldChange = (field: keyof typeof data, value: FieldValue) => {
    setField(field, value as never)
    // Auto-generate on field change for instant preview
    handleGenerate()
  }

  const handleTemplateSwitch = (templateId: string) => {
    setSelectedTemplate(templateId as never)
    setField('template', templateId as never)
    setShowTemplateModal(false)
    toast.show(`Switched to ${templateRegistry.find((t) => t.id === templateId)?.name}`, 'success')
  }

  const handleReset = () => {
    resetData()
    setMarkdown('')
    setActiveStep('profile')
    toast.show('Reset to default', 'info')
  }

  const handleDragStart = (sectionId: string) => {
    draggedItem.current = sectionId
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetId: string) => {
    if (!draggedItem.current || draggedItem.current === targetId) return
    
    const newOrder = [...sectionOrder]
    const fromIdx = newOrder.indexOf(draggedItem.current)
    const toIdx = newOrder.indexOf(targetId)
    
    if (fromIdx >= 0 && toIdx >= 0) {
      [newOrder[fromIdx], newOrder[toIdx]] = [newOrder[toIdx], newOrder[fromIdx]]
      setSectionOrder(newOrder)
    }
    draggedItem.current = null
  }

  const activeSection = BUILDER_FORM_SCHEMA.find((s) => s.id === activeStep) ?? BUILDER_FORM_SCHEMA[0]
  
  const filteredSections = BUILDER_FORM_SCHEMA.filter(
    (s) => !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.fields.some((f) => f.label.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => sectionOrder.indexOf(a.id) - sectionOrder.indexOf(b.id))

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative h-screen flex flex-col bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100"
    >
      {/* Top Toolbar */}
      <motion.div variants={fadeUp} className="border-b border-[#8b5cf6]/10 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6 gap-4">
          {/* Left: Logo & Status */}
          <div className="flex items-center gap-3 min-w-fit">
            <Icon name="code" size={20} className="text-[#8b5cf6]" />
            <div>
              <h1 className="text-sm font-bold text-[var(--color-ink-primary)]">README Builder</h1>
              <p className="text-xs text-[var(--color-ink-muted)]">
                {loading ? 'Loading…' : ready ? 'Ready' : 'Init…'}
              </p>
            </div>
          </div>

          {/* Center: Template Switcher & Search */}
          <div className="flex-1 flex items-center gap-2 max-w-2xl">
            <button
              onClick={() => setShowTemplateModal(true)}
              className="glass-premium glow-border-purple px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-ink-secondary)] inline-flex items-center gap-2 hover:text-[var(--color-ink-primary)] transition-all"
            >
              <Icon name="layout" size={14} />
              {templateRegistry.find((t) => t.id === data.template)?.name || 'Template'}
            </button>
            <div className="relative flex-1 flex-shrink-0">
              <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-muted)]" />
              <input
                type="text"
                placeholder="Search sections…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-[#8b5cf6]/20 bg-white/40 backdrop-blur-sm pl-9 pr-3 py-2 text-xs text-[var(--color-ink-primary)] placeholder:text-[var(--color-ink-muted)] focus:border-[#8b5cf6]/50 focus:outline-none focus:ring-1 focus:ring-[#8b5cf6]/30 transition-all"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <GlassButton variant="ghost" size="sm" icon="chevronLeft" onClick={() => toast.show('Undo not yet implemented', 'info')} />
            <GlassButton variant="ghost" size="sm" icon="chevronRight" onClick={() => toast.show('Redo not yet implemented', 'info')} />
            <div className="w-px h-6 bg-[#8b5cf6]/20" />
            <GlassButton variant="ghost" size="sm" icon="play" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? 'Gen…' : 'Gen'}
            </GlassButton>
            <GlassButton variant="ghost" size="sm" icon="settings" onClick={() => setShowWidgetsModal(true)} />
          </div>
        </div>
      </motion.div>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Sections */}
        <motion.div
          variants={fadeUp}
          className={cn(
            'border-r border-[#8b5cf6]/10 bg-white/40 backdrop-blur-sm overflow-y-auto transition-all duration-300 flex flex-col',
            sidebarCollapsed ? 'w-16' : 'w-72'
          )}
        >
          <div className="flex items-center justify-between p-3 border-b border-[#8b5cf6]/10">
            {!sidebarCollapsed && <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-muted)]">Sections</h3>}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Icon name={sidebarCollapsed ? 'chevronRight' : 'chevronLeft'} size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 p-2">
            {filteredSections.map((section) => (
              <motion.button
                key={section.id}
                draggable
                onDragStart={() => handleDragStart(section.id)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(section.id)}
                onClick={() => setActiveStep(section.id)}
                className={cn(
                  'w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 group',
                  activeStep === section.id
                    ? 'glass-premium-glow glow-border-purple bg-white/70 text-[var(--color-ink-primary)] shadow-[var(--shadow-glow-purple)]'
                    : 'text-[var(--color-ink-secondary)] hover:bg-white/40 cursor-grab active:cursor-grabbing'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon name={section.icon as any} size={14} />
                {!sidebarCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div>{section.title}</div>
                    </div>
                    {activeStep === section.id && <Icon name="checkCircle" size={12} className="text-[#10b981]" />}
                  </>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Center Panel - Form Editor */}
        <motion.div variants={fadeUp} className="flex-1 border-r border-[#8b5cf6]/10 overflow-y-auto bg-white/20">
          <div className="p-8 max-w-4xl">
            <GlassCard interactive={false} premium glow="multi">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gradient mb-2">{activeSection.title}</h2>
                    <p className="text-sm text-[var(--color-ink-secondary)]">{activeSection.description}</p>
                  </div>
                  <FormRenderer section={activeSection} data={data} onChange={handleFieldChange} />
                </motion.div>
              </AnimatePresence>
            </GlassCard>
          </div>
        </motion.div>

        {/* Right Panel - Live Preview */}
        <motion.div variants={fadeUp} className="w-96 border-l border-[#8b5cf6]/10 bg-white/40 backdrop-blur-sm overflow-y-auto flex flex-col sticky top-0">
          <div className="p-4 border-b border-[#8b5cf6]/10">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-primary)]">Preview</h3>
                <p className="text-xs text-[var(--color-ink-muted)]">
                  {currentMarkdown.length} characters
                </p>
              </div>
              <button
                onClick={() => setPreviewFullscreen(!previewFullscreen)}
                className="p-1 hover:bg-white/40 rounded-lg transition-colors"
              >
                <Icon name="maximize" size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="rounded-lg bg-white/60 backdrop-blur-sm border border-[#8b5cf6]/20 p-4">
              <div className="prose prose-sm max-w-none prose-headings:text-[var(--color-ink-primary)] prose-p:text-[var(--color-ink-secondary)]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentMarkdown || '# Generate to see preview\n\nFill out the form and click Generate to see your README preview.'}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          <div className="border-t border-[#8b5cf6]/10 p-4 space-y-2">
            <button
              onClick={() => navigator.clipboard.writeText(currentMarkdown)}
              className="w-full glass-premium glow-border-cyan px-3 py-2 rounded-lg text-xs font-medium text-[var(--color-ink-secondary)] inline-flex items-center justify-center gap-2 hover:text-[var(--color-ink-primary)] transition-all"
            >
              <Icon name="copy" size={14} /> Copy
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Toolbar */}
      <motion.div className="border-t border-[#8b5cf6]/10 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <GlassButton
            variant="ghost"
            size="sm"
            icon="download"
            onClick={() => {
              const blob = new Blob([currentMarkdown], { type: 'text/markdown' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'README.md'
              a.click()
              URL.revokeObjectURL(url)
            }}
          >
            Download
          </GlassButton>
          <GlassButton variant="ghost" size="sm" icon="refresh" onClick={handleReset}>
            Reset
          </GlassButton>
        </div>
        <div className="text-xs text-[var(--color-ink-muted)]">
          {data.name || 'Untitled'} • {data.template}
        </div>
        <div className="flex items-center gap-2">
          <GlassButton
            variant="ghost"
            size="sm"
            icon="eye"
            onClick={() => setPreviewFullscreen(true)}
          >
            Fullscreen
          </GlassButton>
        </div>
      </motion.div>

      {/* Template Switcher Modal */}
      <AnimatePresence>
        {showTemplateModal && (
          <GlassModal open={showTemplateModal} onClose={() => setShowTemplateModal(false)}>
            <h2 className="text-2xl font-bold mb-6">Switch Template</h2>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {templateRegistry.map((template) => (
                <motion.button
                  key={template.id}
                  onClick={() => handleTemplateSwitch(template.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'p-4 rounded-lg border-2 transition-all text-center',
                    data.template === template.id
                      ? 'border-[#8b5cf6] bg-[#8b5cf6]/10'
                      : 'border-[#8b5cf6]/20 hover:border-[#8b5cf6]/50'
                  )}
                >
                  <div className="text-2xl mb-2">{template.emoji}</div>
                  <div className="font-semibold text-sm">{template.name}</div>
                  <div className="text-xs text-[var(--color-ink-muted)] mt-1">{template.description}</div>
                </motion.button>
              ))}
            </div>
          </GlassModal>
        )}
      </AnimatePresence>

      {/* Widgets Settings Modal */}
      <AnimatePresence>
        {showWidgetsModal && (
          <GlassModal open={showWidgetsModal} onClose={() => setShowWidgetsModal(false)}>
            <h2 className="text-2xl font-bold mb-6">Configure Widgets</h2>
            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {Object.entries(data)
                .filter(([key]) => key.startsWith('show'))
                .map(([key, value]) => (
                  <label key={key} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/30 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={value as boolean}
                      onChange={(e) => setField(key as any, e.target.checked)}
                      className="w-4 h-4 rounded border-[#8b5cf6] accent-[#8b5cf6]"
                    />
                    <span className="text-sm font-medium text-[var(--color-ink-primary)] capitalize">
                      {key.replace(/^show/, '').replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </label>
                ))}
            </div>
            <button
              onClick={() => setShowWidgetsModal(false)}
              className="w-full mt-6 glass-premium glow-border-purple px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Done
            </button>
          </GlassModal>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
