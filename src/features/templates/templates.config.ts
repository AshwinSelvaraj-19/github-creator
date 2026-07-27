import type { TemplateId, TemplateMeta } from '@/types'

export const TEMPLATES: TemplateMeta[] = [
  { id: 'neumorphism', emoji: '⚪', name: 'Neumorphism', filter: 'soft', accent: '#6c5ce7', description: 'Soft light gray UI with raised/pressed shadow effects.' },
  { id: 'glassmorphism', emoji: '💎', name: 'Glassmorphism', filter: 'glass', accent: '#a78bfa', description: 'Frosted glass cards with backdrop blur and floating orbs.' },
  { id: 'skeuomorphism', emoji: '📒', name: 'Skeuomorphism', filter: 'real', accent: '#8b4513', description: 'Notebook paper texture, leather warm brown accents.' },
  { id: 'claymorphism', emoji: '🧸', name: 'Claymorphism', filter: 'playful', accent: '#e91e63', description: 'Thick rounded pastel clay shapes, puffy soft shadows.' },
  { id: 'auroraism', emoji: '🌌', name: 'Auroraism', filter: 'dark', accent: '#00ff88', description: 'Deep space dark background with animated aurora waves.' },
  { id: 'frostedmorphism', emoji: '❄️', name: 'Frostedmorphism', filter: 'icy', accent: '#1565c0', description: 'Icy blue gradient backdrop, frosted white translucent cards.' },
  { id: 'gradientmorphism', emoji: '🌈', name: 'Gradientmorphism', filter: 'vibrant', accent: '#f472b6', description: 'Animated gradient backgrounds, vibrant purple-to-cyan palette.' },
  { id: 'layermorphism', emoji: '🗂️', name: 'Layermorphism', filter: 'depth', accent: '#a78bfa', description: 'Three stacked cards at different depths with offset shadows.' },
  { id: 'polymorphism', emoji: '🔷', name: 'Polymorphism', filter: 'geo', accent: '#f472b6', description: 'Geometric polygon shapes, asymmetric bold layout.' },
  { id: 'metamorphism', emoji: '🦋', name: 'Metamorphism', filter: 'dynamic', accent: '#c084fc', description: 'Transforming border animations, shape-morphing decorations.' },
]

export const TEMPLATE_FILTERS = [
  'all', 'soft', 'glass', 'real', 'playful', 'dark', 'icy', 'vibrant', 'depth', 'geo', 'dynamic',
] as const

export const TYPING_LINES: Record<TemplateId, string[]> = {
  neumorphism: ['Hi there 👋', 'Soft shadows, clean code', 'Minimal by design'],
  glassmorphism: ['💎 Ruby Frost', 'UI/UX Designer', 'Frosted elegance'],
  skeuomorphism: ['📒 Ada Lovelace', 'Code Poet', 'Real and tangible'],
  claymorphism: ['🧸 Molly Clay', 'Creative Coder', 'Soft and playful'],
  auroraism: ['🌌 Nova Star', 'Space Engineer', 'Northern lights glow'],
  frostedmorphism: ['❄️ Winter Dev', 'Frost Engineer', 'Crisp and icy'],
  gradientmorphism: ['🌈 Chroma Dev', 'Full-Stack Artist', 'Colors in motion'],
  layermorphism: ['🗂️ Layered One', 'Depth Architect', 'Stacked dimensions'],
  polymorphism: ['🔷 Geo Coder', 'Algorithm Artist', 'Shapes and logic'],
  metamorphism: ['🦋 Morph Dev', 'Shape Shifter', 'Ever evolving'],
}

export const DEMO_DATA = {
  name: 'Surya K',
  username: 'Suryakumar45',
  title: 'BCA Student & Aspiring Full-Stack Developer',
  bio: 'Passionate BCA student who enjoys building modern web applications, learning new technologies and solving real-world problems.',
  location: 'Coimbatore, India',
  email: 'suryakumar45@example.com',
  education: 'Bachelor of Computer Applications',
  college: 'PSG College of Arts and Science',
  aboutMe: 'I am a dedicated BCA student with a strong passion for full-stack web development.',
  learning: 'Full-Stack Web Development with React, Python, FastAPI',
  funFact: 'I debug better with chai than with console.log!',
}
