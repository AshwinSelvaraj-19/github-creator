import type { TemplateDefinition } from '../types'

export const metamorphism: TemplateDefinition = {
  id: 'metamorphism',
  name: 'Metamorphism',
  description: 'Transforming border animations, shape-morphing decorations.',
  thumbnail: '🦋',
  emoji: '🦋',
  category: 'dynamic',
  theme: {
    pageBg: '#0d0d1a',
    cardBg: 'rgba(192,132,252,0.04)',
    primaryText: '#f0e8ff',
    secondaryText: '#8890a8',
    headingColor: '#c084fc',
    accent: '#c084fc',
    border: 'rgba(192,132,252,0.12)',
    progressFill: '#c084fc',
    iconColor: '#c084fc',
  },
  widgets: { stats: 'morphCards', langs: 'fluidBars', activity: 'morphingGraph', skills: 'phaseTags' },
  metadata: { version: '1.0.0', tags: ['morph', 'animated', 'dynamic'] },
}
