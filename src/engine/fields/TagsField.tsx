import { useState } from 'react'
import { GlassBadge } from '@/components/ui/GlassBadge'
import { Icon } from '@/shared/iconRegistry'
import { cn } from '@/utils/cn'
import type { FieldRendererProps } from '../fieldRegistry'
import type { TagsFieldConfig, FieldValue } from '../form.types'

export function TagsField({ config, value, onChange }: FieldRendererProps<TagsFieldConfig>) {
  const [input, setInput] = useState('')
  const tags = (value as string[]) ?? []

  const addTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed] as FieldValue)
    }
    setInput('')
  }

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag) as FieldValue)
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-ink-secondary)]">
        {config.label}
      </span>
      <div className="flex flex-wrap gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-white/60 p-3">
        {tags.map((tag) => (
          <GlassBadge key={tag} color="purple">
            {tag}
            <button onClick={() => removeTag(tag)} className="ml-1 hover:opacity-70">
              <Icon name="close" size={12} />
            </button>
          </GlassBadge>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag(input)
            }
          }}
          placeholder={config.placeholder ?? 'Type and press Enter…'}
          className={cn('flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-[var(--color-ink-muted)]')}
        />
      </div>
      {config.suggestions && config.suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {config.suggestions
            .filter((s: string) => !tags.includes(s))
            .slice(0, 8)
            .map((s: string) => (
              <button
                key={s}
                onClick={() => addTag(s)}
                className="rounded-full border border-[var(--color-border-strong)] px-2.5 py-1 text-xs text-[var(--color-ink-muted)] transition-colors hover:bg-white/40 hover:text-[var(--color-ink-primary)]"
              >
                + {s}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
