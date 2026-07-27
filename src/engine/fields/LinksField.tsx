import { Icon } from '@/shared/iconRegistry'
import type { FieldRendererProps } from '../fieldRegistry'
import type { LinksFieldConfig, FieldValue } from '../form.types'

interface LinkItem {
  platform: string
  url: string
}

export function LinksField({ config, value, onChange }: FieldRendererProps<LinksFieldConfig>) {
  const links = (value as LinkItem[]) ?? []
  const platforms = config.platforms ?? ['github', 'linkedin', 'twitter', 'website']

  const updateLink = (index: number, field: 'platform' | 'url', val: string) => {
    const updated = links.map((l, i) => (i === index ? { ...l, [field]: val } : l))
    onChange(updated as FieldValue)
  }

  const addLink = () => {
    onChange([...links, { platform: platforms[0], url: '' }] as FieldValue)
  }

  const removeLink = (index: number) => {
    onChange(links.filter((_, i) => i !== index) as FieldValue)
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-ink-secondary)]">
          {config.label}
        </span>
        <button
          onClick={addLink}
          className="inline-flex items-center gap-1 rounded-lg bg-white/40 px-3 py-1.5 text-xs font-medium text-[var(--color-ink-secondary)] transition-colors hover:bg-white/60 hover:text-[var(--color-ink-primary)]"
        >
          <Icon name="plus" size={14} /> Add Link
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center gap-2">
            <select
              value={link.platform}
              onChange={(e) => updateLink(index, 'platform', e.target.value)}
              className="rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/60 px-3 py-2.5 text-sm outline-none"
            >
              {platforms.map((p: string) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <input
              value={link.url}
              onChange={(e) => updateLink(index, 'url', e.target.value)}
              placeholder="https://…"
              className="flex-1 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/60 px-4 py-2.5 text-sm outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
            />
            <button
              onClick={() => removeLink(index)}
              className="rounded p-2 text-[var(--color-ink-muted)] transition-colors hover:bg-[#ef4444]/10 hover:text-[#ef4444]"
            >
              <Icon name="trash" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
