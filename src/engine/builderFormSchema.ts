/**
 * Builder form schema — the complete field configuration for the README builder.
 *
 * This is the single source of truth for the builder form. Adding or reordering
 * fields is done here, not in JSX. The FormRenderer reads this schema and
 * renders the entire form dynamically.
 */

import type { FormSection } from './form.types'

export const BUILDER_FORM_SCHEMA: FormSection[] = [
  {
    id: 'profile',
    title: 'Profile',
    icon: 'briefcase',
    description: 'Your basic identity and role.',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Surya K', required: true },
      { name: 'username', label: 'GitHub Username', type: 'text', placeholder: 'Suryakumar45', required: true },
      { name: 'title', label: 'Title / Role', type: 'text', placeholder: 'Full-Stack Developer' },
      { name: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell people about yourself…', fullWidth: true },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Coimbatore, India' },
      { name: 'email', label: 'Email', type: 'text', placeholder: 'you@example.com' },
      { name: 'portfolio', label: 'Portfolio URL', type: 'text', placeholder: 'https://your-site.dev' },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    icon: 'graduation',
    description: 'Academic background.',
    fields: [
      { name: 'education', label: 'Degree', type: 'text', placeholder: 'Bachelor of Computer Applications' },
      { name: 'college', label: 'College / University', type: 'text', placeholder: 'PSG College of Arts and Science' },
    ],
  },
  {
    id: 'about',
    title: 'About Me',
    icon: 'info',
    description: 'Long-form sections that appear in the README body.',
    fields: [
      { name: 'aboutMe', label: 'About Me', type: 'textarea', fullWidth: true },
      { name: 'currentProject', label: 'Currently Working On', type: 'textarea', fullWidth: true },
      { name: 'learning', label: 'Currently Learning', type: 'textarea', fullWidth: true },
      { name: 'collab', label: 'Open to Collaborate On', type: 'textarea', fullWidth: true },
      { name: 'expertise', label: 'Expertise', type: 'textarea', fullWidth: true },
      { name: 'goal', label: 'Goal', type: 'textarea', fullWidth: true },
      { name: 'funFact', label: 'Fun Fact', type: 'text', placeholder: 'I debug better with chai!' },
    ],
  },
  {
    id: 'typing',
    title: 'Typing Animation',
    icon: 'type',
    description: 'Animated typing text in the README header.',
    fields: [
      { name: 'typingFont', label: 'Font', type: 'text', placeholder: 'Inter' },
      { name: 'typingSpeed', label: 'Speed (ms)', type: 'text', placeholder: '3000' },
      { name: 'typingLines', label: 'Typing Lines', type: 'tags', placeholder: 'Type a line and press Enter', fullWidth: true },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: 'palette',
    description: 'Accent color and status.',
    fields: [
      { name: 'accentColor', label: 'Accent Color', type: 'color' },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: '', label: '—' },
        { value: 'online', label: 'Online' },
        { value: 'busy', label: 'Busy' },
        { value: 'away', label: 'Away' },
      ] },
    ],
  },
  {
    id: 'sections',
    title: 'Section Toggles',
    icon: 'layout',
    description: 'Control which README sections are included.',
    fields: [
      { name: 'showAbout', label: 'About Me', type: 'checkbox' },
      { name: 'showLearning', label: 'Learning', type: 'checkbox' },
      { name: 'showSkills', label: 'Skills', type: 'checkbox' },
      { name: 'showGithubStats', label: 'GitHub Stats', type: 'checkbox' },
      { name: 'showStreak', label: 'Streak', type: 'checkbox' },
      { name: 'showTopLangs', label: 'Top Languages', type: 'checkbox' },
      { name: 'showTrophy', label: 'Trophies', type: 'checkbox' },
      { name: 'showActivityGraph', label: 'Activity Graph', type: 'checkbox' },
      { name: 'showSnake', label: 'Snake Animation', type: 'checkbox' },
      { name: 'showVisitorCounter', label: 'Visitor Counter', type: 'checkbox' },
      { name: 'showFooter', label: 'Footer', type: 'checkbox' },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: 'code',
    description: 'Featured projects to showcase.',
    fields: [
      {
        name: 'projects',
        label: 'Projects',
        type: 'array',
        itemLabel: 'Project',
        fullWidth: true,
        itemFields: [
          { name: 'name', label: 'Name', type: 'text', placeholder: 'My Project' },
          { name: 'desc', label: 'Description', type: 'text' },
          { name: 'repo', label: 'Repo URL', type: 'text' },
          { name: 'demo', label: 'Demo URL', type: 'text' },
        ],
      },
    ],
  },
  {
    id: 'social',
    title: 'Social Links',
    icon: 'link',
    description: 'Links to your social profiles.',
    fields: [
      {
        name: 'socialLinks',
        label: 'Social Links',
        type: 'social',
        fullWidth: true,
        platforms: ['github', 'linkedin', 'twitter', 'youtube', 'instagram', 'website'],
      },
    ],
  },
]
