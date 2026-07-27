/**
 * Demo data — pre-filled example for the "Load Demo" button.
 *
 * Kept in the templates feature since it's closely tied to template definitions.
 */

import type { BuilderData } from '@/types'

export const DEMO_DATA: Partial<BuilderData> = {
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
  typingLines: ['Hi there 👋', 'Soft shadows, clean code', 'Minimal by design'],
}
