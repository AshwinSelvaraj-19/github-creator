/**
 * Centralized type definitions for the entire app.
 *
 * All shared types are exported from here so components import from '@/types'
 * rather than reaching into feature folders.
 */

export type TemplateId =
  | 'neumorphism'
  | 'glassmorphism'
  | 'skeuomorphism'
  | 'claymorphism'
  | 'auroraism'
  | 'frostedmorphism'
  | 'gradientmorphism'
  | 'layermorphism'
  | 'polymorphism'
  | 'metamorphism'

export type SkillCategory =
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'cloud'
  | 'tools'

export interface SkillMap {
  languages?: string[]
  frontend?: string[]
  backend?: string[]
  databases?: string[]
  cloud?: string[]
  tools?: string[]
}

export interface SocialLink {
  platform: string
  url: string
}

export interface ProjectEntry {
  name: string
  desc: string
  repo: string
  demo: string
  techs: string[]
}

export interface CertificationEntry {
  name: string
  org: string
  url: string
}

export interface AchievementEntry {
  title: string
  desc: string
}

export interface SectionToggles {
  showAbout: boolean
  showLearning: boolean
  showSkills: boolean
  showGithubStats: boolean
  showStreak: boolean
  showTopLangs: boolean
  showTrophy: boolean
  showActivityGraph: boolean
  showSnake: boolean
  showVisitorCounter: boolean
  showFooter: boolean
}

export interface ReadmeFormData {
  template: TemplateId
  name: string
  username: string
  title: string
  bio: string
  location: string
  email: string
  education: string
  college: string
  portfolio: string
  aboutMe: string
  currentProject: string
  learning: string
  collab: string
  expertise: string
  goal: string
  funFact: string
  status: string
  accentColor: string
  typingFont: string
  typingSpeed: number
  typingLines: string[]
  skills: SkillMap
  socialLinks: SocialLink[]
  projects: ProjectEntry[]
  certifications: CertificationEntry[]
  achievements: AchievementEntry[]
  useExternalCapsules: boolean
}

export type BuilderData = ReadmeFormData & SectionToggles

export interface HistoryRecord {
  id: string
  name: string
  username: string
  template: TemplateId
  date: string
  markdown: string
  config: string
}
