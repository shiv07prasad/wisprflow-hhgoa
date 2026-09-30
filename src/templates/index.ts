import type { Portfolio, TemplateId } from '../types'
import { renderBold } from './bold'
import { renderMidnight } from './midnight'
import { renderMinimal } from './minimal'

export interface TemplateInfo {
  id: TemplateId
  name: string
  description: string
  /** Picker thumbnail colours: [background, foreground]. */
  swatch: [string, string]
  render: (p: Portfolio) => string
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Light, calm and typographic.',
    swatch: ['#ffffff', '#1f2937'],
    render: renderMinimal,
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Dark and developer-flavoured.',
    swatch: ['#0b1120', '#e2e8f0'],
    render: renderMidnight,
  },
  {
    id: 'bold',
    name: 'Bold',
    description: 'Big colour hero with cards.',
    swatch: ['#f1f5f9', '#0f172a'],
    render: renderBold,
  },
]

export function renderPortfolio(p: Portfolio): string {
  const template = TEMPLATES.find((t) => t.id === p.template) ?? TEMPLATES[0]
  return template.render(p)
}
