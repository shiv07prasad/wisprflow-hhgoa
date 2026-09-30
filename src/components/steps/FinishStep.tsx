import { useId } from 'react'
import { portfolioFilename } from '../../lib/download'
import { TEMPLATES } from '../../templates'
import { StepLayout } from '../fields'
import type { StepProps } from './types'

const ACCENTS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#0f172a']

export function FinishStep({
  portfolio,
  update,
  onDownload,
  onOpen,
}: StepProps & { onDownload: () => void; onOpen: () => void }) {
  const colorId = useId()

  return (
    <StepLayout title="Pick a look and download" description="Choose a template and colour. The preview updates as you go.">
      <div>
        <span className="label">Template</span>
        <div className="grid grid-cols-3 gap-3">
          {TEMPLATES.map((t) => {
            const selected = portfolio.template === t.id
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={selected}
                onClick={() => update({ template: t.id })}
                className={`rounded-xl border-2 p-2 text-left transition-colors ${
                  selected ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className="mb-2 flex h-14 flex-col justify-center gap-1 rounded-lg px-2.5"
                  style={{ background: t.id === 'bold' ? portfolio.accent : t.swatch[0], border: '1px solid #e2e8f0' }}
                  aria-hidden
                >
                  <div className="h-1.5 w-3/4 rounded" style={{ background: t.id === 'bold' ? '#fff' : t.swatch[1] }} />
                  <div className="h-1.5 w-1/2 rounded" style={{ background: portfolio.accent }} />
                </div>
                <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                <div className="text-xs leading-snug text-slate-500">{t.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <span className="label">Accent colour</span>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => update({ accent: c })}
              aria-label={`Accent ${c}`}
              aria-pressed={portfolio.accent === c}
              className={`size-8 rounded-full ring-offset-2 transition ${
                portfolio.accent === c ? 'ring-2 ring-slate-900' : 'hover:scale-110'
              }`}
              style={{ background: c }}
            />
          ))}
          <label
            htmlFor={colorId}
            className="relative ml-1 flex cursor-pointer items-center gap-2 text-sm text-slate-600"
            title="Custom colour"
          >
            <input
              id={colorId}
              type="color"
              value={portfolio.accent}
              onChange={(e) => update({ accent: e.target.value })}
              className="size-8 cursor-pointer rounded-full border border-slate-300 bg-white p-0.5"
            />
            Custom
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-5">
        <h3 className="font-semibold text-slate-900">Your portfolio is ready</h3>
        <p className="mt-1 text-sm text-slate-600">
          You'll get one self-contained HTML file with everything inside it. Open it in any browser, or upload it to
          GitHub Pages, Netlify or Vercel to put it online.
        </p>
        {!portfolio.name.trim() && (
          <p className="mt-2 text-sm text-amber-700">Tip: add your name in the Basics step first.</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={onDownload}>
            Download {portfolioFilename(portfolio.name)}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onOpen}>
            Open in new tab
          </button>
        </div>
      </div>
    </StepLayout>
  )
}
