import type { TemplateDefinition } from '../types'

export const skeuomorphism: TemplateDefinition = {
  id: 'skeuomorphism',
  name: 'Skeuomorphism',
  description: 'Notebook paper texture, leather warm brown accents.',
  thumbnail: '📒',
  emoji: '📒',
  category: 'real',
  theme: {
    pageBg: '#f5f0e8',
    cardBg: '#faf6ee',
    primaryText: '#3e2c1a',
    secondaryText: '#6b4c14',
    headingColor: '#8b4513',
    accent: '#8b4513',
    border: '#d4c5a9',
    progressFill: '#8b4513',
    iconColor: '#8b6914',
  },
  widgets: { stats: 'journalCards', langs: 'notebookBars', activity: 'paperGraph', skills: 'retroTags' },
  metadata: { version: '1.0.0', tags: ['paper', 'warm', 'classic'] },
}
