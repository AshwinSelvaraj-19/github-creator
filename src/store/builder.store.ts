import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BuilderData, TemplateId, HistoryRecord } from '@/types'

const DEFAULT_SECTION_TOGGLES = {
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
}

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
  ...DEFAULT_SECTION_TOGGLES,
}

interface BuilderState {
  data: BuilderData
  currentMarkdown: string
  isGenerating: boolean
  history: HistoryRecord[]
  setField: <K extends keyof BuilderData>(key: K, value: BuilderData[K]) => void
  setTemplate: (id: TemplateId) => void
  setData: (partial: Partial<BuilderData>) => void
  resetData: () => void
  setMarkdown: (md: string) => void
  setGenerating: (v: boolean) => void
  saveHistory: (record: HistoryRecord) => void
  deleteHistory: (id: string) => void
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      data: DEFAULT_DATA,
      currentMarkdown: '',
      isGenerating: false,
      history: [],
      setField: (key, value) =>
        set((s) => ({ data: { ...s.data, [key]: value } })),
      setTemplate: (id) =>
        set((s) => ({ data: { ...s.data, template: id } })),
      setData: (partial) =>
        set((s) => ({ data: { ...s.data, ...partial } })),
      resetData: () => set({ data: DEFAULT_DATA, currentMarkdown: '' }),
      setMarkdown: (md) => set({ currentMarkdown: md }),
      setGenerating: (v) => set({ isGenerating: v }),
      saveHistory: (record) =>
        set((s) => {
          const history = [record, ...s.history].slice(0, 50)
          return { history }
        }),
      deleteHistory: (id) =>
        set((s) => ({ history: s.history.filter((h) => h.id !== id) })),
    }),
    {
      name: 'readme-forge-builder',
      partialize: (s) => ({ data: s.data, history: s.history }),
    },
  ),
)
