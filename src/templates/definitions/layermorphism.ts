import type { TemplateDefinition } from '../types'

export const layermorphism: TemplateDefinition = {
  id: 'layermorphism',
  name: 'Layermorphism',
  description: 'Three stacked cards at different depths with offset shadows.',
  thumbnail: '🗂️',
  emoji: '🗂️',
  category: 'depth',
  theme: {
    pageBg: '#1a1a2e',
    cardBg: '#222240',
    primaryText: '#e0e0f0',
    secondaryText: '#6b6b80',
    headingColor: '#a78bfa',
    accent: '#a78bfa',
    border: '#2a2a4e',
    progressFill: '#a78bfa',
    iconColor: '#a78bfa',
  },
  widgets: { stats: 'stackedLayers', langs: 'depthBars', activity: 'timelineGraph', skills: 'layerTags' },
  metadata: { version: '1.0.0', tags: ['depth', 'stacked', 'layered'] },
}
