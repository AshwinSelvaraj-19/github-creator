import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { GlassCard, GlassButton, GlassInput } from '@/components/ui/glass'
import { fadeUp, staggerContainer } from '@/features/animations/variants'
import { useBuilderStore } from '@/store/builder.store'
import { usePyodide } from '@/hooks/usePyodide'
import { DEMO_DATA, TEMPLATES } from '@/features/templates/templates.config'
import { Sparkles, Play, FileDown, Copy } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function BuilderPage() {
  const { data, setField, setData, setMarkdown, currentMarkdown, isGenerating, setGenerating } =
    useBuilderStore()
  const { ready, loading, init, generate } = usePyodide()

  useEffect(() => {
    init()
  }, [init])

  const handleGenerate = async () => {
    if (!ready) {
      await init()
    }
    setGenerating(true)
    try {
      const md = await generate(data)
      setMarkdown(md)
    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  const loadDemo = () => setData(DEMO_DATA)

  return (
    <motion.div
      variants={staggerContainer}
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
          <GlassButton variant="ghost" size="sm" onClick={loadDemo}>Demo</GlassButton>
          <GlassButton size="sm" onClick={handleGenerate} disabled={isGenerating}>
            <Play size={15} /> {isGenerating ? 'Generating…' : 'Generate'}
          </GlassButton>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Form panel */}
        <motion.div variants={fadeUp}>
          <GlassCard className="p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setField('template', t.id)}
                  className={
                    'rounded-lg px-3 py-1.5 text-sm font-medium transition-all ' +
                    (data.template === t.id
                      ? 'bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] text-white'
                      : 'glass text-[var(--color-ink-secondary)]')
                  }
                >
                  {t.emoji} {t.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <GlassInput
                label="Full Name"
                value={data.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="Surya K"
              />
              <GlassInput
                label="GitHub Username"
                value={data.username}
                onChange={(e) => setField('username', e.target.value)}
                placeholder="Suryakumar45"
              />
              <GlassInput
                label="Title"
                value={data.title}
                onChange={(e) => setField('title', e.target.value)}
                placeholder="Full-Stack Developer"
              />
              <GlassInput
                label="Bio"
                value={data.bio}
                onChange={(e) => setField('bio', e.target.value)}
                placeholder="Tell people about yourself…"
              />
              <GlassInput
                label="Location"
                value={data.location}
                onChange={(e) => setField('location', e.target.value)}
                placeholder="Coimbatore, India"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Preview panel */}
        <motion.div variants={fadeUp} className="lg:sticky lg:top-24 lg:self-start">
          <GlassCard variant="strong" className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Live Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(currentMarkdown)}
                  className="rounded-lg p-2 text-[var(--color-ink-secondary)] hover:bg-white/40"
                >
                  <Copy size={16} />
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
                  className="rounded-lg p-2 text-[var(--color-ink-secondary)] hover:bg-white/40"
                >
                  <FileDown size={16} />
                </button>
              </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto rounded-[var(--radius-md)] bg-white/50 p-6">
              {currentMarkdown ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {currentMarkdown}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-[var(--color-ink-muted)]">
                  <Sparkles size={32} className="mb-3 opacity-40" />
                  <p>Fill in your details and click Generate.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </motion.div>
  )
}
