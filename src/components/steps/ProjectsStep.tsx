import { newProject } from '../../lib/portfolio'
import { StepLayout, TextArea, TextField } from '../fields'
import { ListEditor } from '../ListEditor'
import type { StepProps } from './types'

export function ProjectsStep({ portfolio, update }: StepProps) {
  return (
    <StepLayout title="Projects" description="Show off things you've built. Add as many as you like, or skip this step.">
      <ListEditor
        items={portfolio.projects}
        onChange={(projects) => update({ projects })}
        create={newProject}
        addLabel="Add project"
        emptyText="No projects yet."
        itemTitle={(p, i) => p.name.trim() || `Project ${i + 1}`}
        renderItem={(p, set) => (
          <>
            <TextField label="Name" value={p.name} onChange={(name) => set({ name })} placeholder="Pulse Dashboard" />
            <TextArea
              label="Description"
              rows={3}
              value={p.description}
              onChange={(description) => set({ description })}
              placeholder="What it does and what you did."
            />
            <TextField
              label="Tech used"
              value={p.tech}
              onChange={(tech) => set({ tech })}
              placeholder="React, D3, WebSockets"
              hint="Comma separated."
            />
            <TextField
              label="Link"
              inputMode="url"
              value={p.url}
              onChange={(url) => set({ url })}
              placeholder="github.com/you/project"
            />
          </>
        )}
      />
    </StepLayout>
  )
}
