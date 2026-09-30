import { useId, useState, type KeyboardEvent } from 'react'
import { StepLayout, TextArea } from '../fields'
import type { StepProps } from './types'

export function AboutStep({ portfolio, update }: StepProps) {
  return (
    <StepLayout title="About you" description="A short bio and the skills you want people to notice.">
      <TextArea
        label="Bio"
        rows={6}
        value={portfolio.bio}
        onChange={(bio) => update({ bio })}
        placeholder="I build fast, accessible web apps…"
        hint="Leave a blank line between paragraphs."
      />
      <SkillsInput skills={portfolio.skills} onChange={(skills) => update({ skills })} />
    </StepLayout>
  )
}

function SkillsInput({ skills, onChange }: { skills: string[]; onChange: (skills: string[]) => void }) {
  const id = useId()
  const [draft, setDraft] = useState('')

  function add(raw: string) {
    const seen = new Set(skills.map((s) => s.toLowerCase()))
    const added: string[] = []
    for (const part of raw.split(',')) {
      const skill = part.trim()
      if (skill && !seen.has(skill.toLowerCase())) {
        seen.add(skill.toLowerCase())
        added.push(skill)
      }
    }
    if (added.length) onChange([...skills, ...added])
    setDraft('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(draft)
    } else if (e.key === 'Backspace' && !draft && skills.length) {
      onChange(skills.slice(0, -1))
    }
  }

  return (
    <div>
      <label htmlFor={id} className="label">
        Skills
      </label>
      <div className="input flex flex-wrap gap-1.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 rounded-md bg-indigo-50 py-0.5 pr-1 pl-2 text-sm text-indigo-700"
          >
            {skill}
            <button
              type="button"
              className="rounded px-1 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-700"
              onClick={() => onChange(skills.filter((s) => s !== skill))}
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={id}
          className="min-w-32 flex-1 bg-transparent py-0.5 outline-none placeholder:text-slate-400"
          value={draft}
          placeholder={skills.length ? 'Add another…' : 'React, TypeScript, Figma…'}
          onChange={(e) => (e.target.value.includes(',') ? add(e.target.value) : setDraft(e.target.value))}
          onKeyDown={handleKeyDown}
          onBlur={() => draft.trim() && add(draft)}
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">Press Enter or comma to add each skill.</p>
    </div>
  )
}
