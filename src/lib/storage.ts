import type { Portfolio } from '../types'
import { emptyPortfolio } from './portfolio'

const KEY = 'portfolio-generator:draft'

export function loadDraft(): Portfolio {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyPortfolio
    const saved = JSON.parse(raw) as Partial<Portfolio>
    return { ...emptyPortfolio, ...saved, links: { ...emptyPortfolio.links, ...saved.links } }
  } catch {
    return emptyPortfolio
  }
}

export function saveDraft(portfolio: Portfolio): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(portfolio))
  } catch {
    // Storage full or blocked (private mode): drafts just won't persist.
  }
}
