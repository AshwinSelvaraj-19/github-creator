/**
 * Centralized icon registry.
 *
 * Why: importing `lucide-react` icons directly in every component creates scattered
 * dependencies and makes it hard to swap icon sets or tree-shake. Instead, every
 * icon used in the app is registered here with a stable string key. Components
 * import the `Icon` component and pass a `name` prop, keeping icon usage declarative
 * and making it trivial to audit or replace the entire icon set.
 *
 * To add a new icon: import it from lucide-react, add it to the `registry` map,
 * and use `<Icon name="your-icon" />` anywhere in the app.
 */

import {
  Github,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Code2,
  Eye,
  Play,
  FileDown,
  Copy,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Edit3,
  Settings,
  Search,
  Menu,
  Link2,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Trophy,
  Target,
  Heart,
  Star,
  Upload,
  RefreshCw,
  Loader2,
  AlertCircle,
  Info,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Minimize2,
  Smartphone,
  Monitor,
  Wand2,
  Palette,
  Type,
  Layout,
  Image,
  Save,
  History,
  Filter,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Globe,
  Linkedin,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Github as GithubIcon,
  type LucideIcon,
} from 'lucide-react'

export const iconRegistry = {
  github: Github,
  sun: Sun,
  moon: Moon,
  sparkles: Sparkles,
  zap: Zap,
  code: Code2,
  eye: Eye,
  play: Play,
  download: FileDown,
  copy: Copy,
  check: Check,
  close: X,
  chevronDown: ChevronDown,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  plus: Plus,
  trash: Trash2,
  edit: Edit3,
  settings: Settings,
  search: Search,
  menu: Menu,
  link: Link2,
  mail: Mail,
  mapPin: MapPin,
  briefcase: Briefcase,
  graduation: GraduationCap,
  award: Award,
  trophy: Trophy,
  target: Target,
  heart: Heart,
  star: Star,
  upload: Upload,
  refresh: RefreshCw,
  loader: Loader2,
  alert: AlertCircle,
  info: Info,
  checkCircle: CheckCircle2,
  externalLink: ExternalLink,
  maximize: Maximize2,
  minimize: Minimize2,
  smartphone: Smartphone,
  monitor: Monitor,
  wand: Wand2,
  palette: Palette,
  type: Type,
  layout: Layout,
  image: Image,
  save: Save,
  history: History,
  filter: Filter,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  globe: Globe,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  facebook: Facebook,
  instagram: Instagram,
  githubIcon: GithubIcon,
} as const

export type IconName = keyof typeof iconRegistry

export interface IconProps {
  name: IconName
  size?: number
  className?: string
  strokeWidth?: number
}

export function Icon({ name, size = 18, className, strokeWidth = 2 }: IconProps) {
  const Cmp = iconRegistry[name] as LucideIcon
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />
}
