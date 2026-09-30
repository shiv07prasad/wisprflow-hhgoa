import { newExperience } from '../../lib/portfolio'
import { StepLayout, TextArea, TextField } from '../fields'
import { ListEditor } from '../ListEditor'
import type { StepProps } from './types'

export function ExperienceStep({ portfolio, update }: StepProps) {
  return (
    <StepLayout title="Experience" description="Jobs, internships, freelance work or volunteering. Most recent first.">
      <ListEditor
        items={portfolio.experience}
        onChange={(experience) => update({ experience })}
        create={newExperience}
        addLabel="Add experience"
        emptyText="No experience added yet."
        itemTitle={(e, i) => [e.role.trim(), e.company.trim()].filter(Boolean).join(' · ') || `Role ${i + 1}`}
        renderItem={(e, set) => (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Role" value={e.role} onChange={(role) => set({ role })} placeholder="Frontend Engineer" />
              <TextField
                label="Company"
                value={e.company}
                onChange={(company) => set({ company })}
                placeholder="Brightloop"
              />
            </div>
            <TextField
              label="Period"
              value={e.period}
              onChange={(period) => set({ period })}
              placeholder="2023 — Present"
            />
            <TextArea
              label="What you did"
              rows={3}
              value={e.description}
              onChange={(description) => set({ description })}
              placeholder="Key responsibilities and wins."
            />
          </>
        )}
      />
    </StepLayout>
  )
}
