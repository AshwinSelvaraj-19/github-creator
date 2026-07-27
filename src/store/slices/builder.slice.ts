/**
 * Builder slice — holds the README form data and generation status.
 *
 * Why isolated: the builder form is the most frequently updated state in the app.
 * Isolating it prevents re-renders in template/history/preview slices when a
 * single field changes. Persisted so users don't lose work on refresh.
 */

import type { StateCreator } from 'zustand'
import type { BuilderData, TemplateId } from '@/types'
import type { StoreState } from '@/store/types'

const DEFAULT_SECTIONS = {
  showAbout: true,
  showLearning: true,
  showSkills: true,
  showGithubStats: true,
  showStreak: true,
  showTopLangs: true,
  showTrophy: false,
  showActivityGraph: true,
  showSnake: false,
  showVisitorCounter: true,
  showFooter: true,
} as const

const DEFAULT_DATA: BuilderData = {
  template: 'neumorphism',
  name: '',
  username: '',
  title: '',
  bio: '',
  location: '',
  email: '',
  education: '',
  college: '',
  portfolio: '',
  aboutMe: '',
  currentProject: '',
  learning: '',
  collab: '',
  expertise: '',
  goal: '',
  funFact: '',
  status: '',
  accentColor: '8B5CF6',
  typingFont: 'Inter',
  typingSpeed: 3000,
  typingLines: [],
  skills: {},
  socialLinks: [],
  projects: [],
  certifications: [],
  achievements: [],
  useExternalCapsules: false,
  ...DEFAULT_SECTIONS,
}

export interface BuilderSlice {
  data: BuilderData
  isGenerating: boolean
  setField: <K extends keyof BuilderData>(key: K, value: BuilderData[K]) => void
  setTemplate: (id: TemplateId) => void
  setData: (partial: Partial<BuilderData>) => void
  resetData: () => void
  setGenerating: (v: boolean) => void
}

export const createBuilderSlice: StateCreator<
  StoreState,
  [],
  [],
  BuilderSlice
> = (set) => ({
  data: DEFAULT_DATA,
  isGenerating: false,
  setField: (key, value) =>
    set((s) => ({ data: { ...s.data, [key]: value } })),
  setTemplate: (id) =>
    set((s) => ({ data: { ...s.data, template: id } })),
  setData: (partial) =>
    set((s) => ({ data: { ...s.data, ...partial } })),
  resetData: () => set({ data: DEFAULT_DATA }),
  setGenerating: (v) => set({ isGenerating: v }),
})
