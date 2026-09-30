export type TemplateId = 'minimal' | 'midnight' | 'bold'

export interface Project {
  id: string
  name: string
  description: string
  tech: string
  url: string
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string
}

export interface Links {
  email: string
  website: string
  github: string
  linkedin: string
  twitter: string
}

export interface Portfolio {
  name: string
  title: string
  location: string
  /** Resized JPEG data URL so the exported file stays self-contained. */
  photo: string
  bio: string
  skills: string[]
  projects: Project[]
  experience: Experience[]
  links: Links
  template: TemplateId
  accent: string
}
