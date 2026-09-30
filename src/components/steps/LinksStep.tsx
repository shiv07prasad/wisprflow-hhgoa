import type { Links } from '../../types'
import { StepLayout, TextField } from '../fields'
import type { StepProps } from './types'

const FIELDS: { key: keyof Links; label: string; placeholder: string }[] = [
  { key: 'website', label: 'Website', placeholder: 'yourname.dev' },
  { key: 'github', label: 'GitHub', placeholder: 'github.com/yourname' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/yourname' },
  { key: 'twitter', label: 'X / Twitter', placeholder: 'x.com/yourname' },
]

export function LinksStep({ portfolio, update }: StepProps) {
  const setLink = (key: keyof Links, value: string) => update({ links: { ...portfolio.links, [key]: value } })

  return (
    <StepLayout title="Links" description="Where people can reach you. Empty fields are left out.">
      <TextField
        label="Email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={portfolio.links.email}
        onChange={(v) => setLink('email', v)}
        placeholder="you@example.com"
      />
      {FIELDS.map((f) => (
        <TextField
          key={f.key}
          label={f.label}
          inputMode="url"
          value={portfolio.links[f.key]}
          onChange={(v) => setLink(f.key, v)}
          placeholder={f.placeholder}
        />
      ))}
    </StepLayout>
  )
}
