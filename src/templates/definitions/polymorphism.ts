import type { TemplateDefinition } from '../types'

export const polymorphism: TemplateDefinition = {
  id: 'polymorphism',
  name: 'Polymorphism',
  description: 'Geometric polygon shapes, asymmetric bold layout.',
  thumbnail: '🔷',
  emoji: '🔷',
  category: 'geo',
  theme: {
    pageBg: '#0f0a1e',
    cardBg: 'rgba(244,114,182,0.04)',
    primaryText: '#e8e0f0',
    secondaryText: '#a088b0',
    headingColor: '#f472b6',
    accent: '#f472b6',
    border: 'rgba(244,114,182,0.12)',
    progressFill: '#f472b6',
    iconColor: '#f472b6',
  },
  widgets: { stats: 'hexTiles', langs: 'angularBars', activity: 'geometricGrid', skills: 'diamondTags' },
  metadata: { version: '1.0.0', tags: ['geometric', 'bold', 'polygon'] },
}
