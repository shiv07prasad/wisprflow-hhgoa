import type { Portfolio } from '../../types'

export interface StepProps {
  portfolio: Portfolio
  update: (patch: Partial<Portfolio>) => void
}
