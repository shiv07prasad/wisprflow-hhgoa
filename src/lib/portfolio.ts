import type { Experience, Portfolio, Project } from '../types'

export const DEFAULT_ACCENT = '#4f46e5'

export const emptyPortfolio: Portfolio = {
  name: '',
  title: '',
  location: '',
  photo: '',
  bio: '',
  skills: [],
  projects: [],
  experience: [],
  links: { email: '', website: '', github: '', linkedin: '', twitter: '' },
  template: 'minimal',
  accent: DEFAULT_ACCENT,
}

export function newProject(): Project {
  return { id: crypto.randomUUID(), name: '', description: '', tech: '', url: '' }
}

export function newExperience(): Experience {
  return { id: crypto.randomUUID(), role: '', company: '', period: '', description: '' }
}
