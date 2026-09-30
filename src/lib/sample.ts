import type { Portfolio } from '../types'
import { emptyPortfolio } from './portfolio'

export const samplePortfolio: Portfolio = {
  ...emptyPortfolio,
  name: 'Alex Rivera',
  title: 'Frontend Developer',
  location: 'Bengaluru, India',
  bio: "I build fast, accessible web apps with a focus on thoughtful UI.\n\nOver the last four years I've shipped design systems, dashboards and marketing sites for startups. Outside work I contribute to open source and write about CSS.",
  skills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'Figma', 'Accessibility'],
  projects: [
    {
      id: 'sample-p1',
      name: 'Pulse Dashboard',
      description: 'Real-time analytics dashboard for a SaaS product, handling 50k events per minute with smooth charts.',
      tech: 'React, D3, WebSockets',
      url: 'github.com/alexrivera/pulse',
    },
    {
      id: 'sample-p2',
      name: 'Tiny Design System',
      description: 'A themeable component library with 40+ accessible components, used across three products.',
      tech: 'TypeScript, Storybook, CSS variables',
      url: 'tiny-ds.example.com',
    },
  ],
  experience: [
    {
      id: 'sample-e1',
      role: 'Frontend Engineer',
      company: 'Brightloop',
      period: '2023 — Present',
      description: 'Lead the web app rewrite to React, cutting load time by 60%.',
    },
    {
      id: 'sample-e2',
      role: 'Web Developer',
      company: 'Studio North',
      period: '2021 — 2023',
      description: 'Built marketing sites and e-commerce storefronts for 20+ clients.',
    },
  ],
  links: {
    email: 'alex@example.com',
    website: 'alexrivera.dev',
    github: 'github.com/alexrivera',
    linkedin: 'linkedin.com/in/alexrivera',
    twitter: '',
  },
}
