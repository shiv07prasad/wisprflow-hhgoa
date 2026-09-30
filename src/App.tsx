import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { Preview } from './components/Preview'
import { AboutStep } from './components/steps/AboutStep'
import { BasicsStep } from './components/steps/BasicsStep'
import { ExperienceStep } from './components/steps/ExperienceStep'
import { FinishStep } from './components/steps/FinishStep'
import { LinksStep } from './components/steps/LinksStep'
import { ProjectsStep } from './components/steps/ProjectsStep'
import { downloadHtml, openHtmlInNewTab, portfolioFilename } from './lib/download'
import { emptyPortfolio } from './lib/portfolio'
import { samplePortfolio } from './lib/sample'
import { loadDraft, saveDraft } from './lib/storage'
import { renderPortfolio } from './templates'
import type { Portfolio } from './types'

const FORM_STEPS = [
  { label: 'Basics', Step: BasicsStep },
  { label: 'About', Step: AboutStep },
  { label: 'Projects', Step: ProjectsStep },
  { label: 'Experience', Step: ExperienceStep },
  { label: 'Links', Step: LinksStep },
]
const STEP_LABELS = [...FORM_STEPS.map((s) => s.label), 'Finish']
const FINISH = FORM_STEPS.length

function App() {
  const [portfolio, setPortfolio] = useState<Portfolio>(loadDraft)
  const [step, setStep] = useState(0)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    saveDraft(portfolio)
  }, [portfolio])
  useEffect(() => {
    formRef.current?.scrollTo({ top: 0 })
  }, [step])

  const update = useCallback((patch: Partial<Portfolio>) => setPortfolio((p) => ({ ...p, ...patch })), [])

  // Keep typing snappy: the preview can lag a frame behind the form.
  const deferred = useDeferredValue(portfolio)
  const previewHtml = useMemo(() => renderPortfolio(deferred), [deferred])

  const download = () => downloadHtml(renderPortfolio(portfolio), portfolioFilename(portfolio.name))
  const open = () => openHtmlInNewTab(renderPortfolio(portfolio))

  function startOver() {
    if (window.confirm('Clear everything and start over?')) {
      setPortfolio(emptyPortfolio)
      setStep(0)
    }
  }

  function loadSample() {
    const hasContent = portfolio.name.trim() || portfolio.bio.trim() || portfolio.projects.length
    if (!hasContent || window.confirm('Replace your current details with sample data?')) {
      setPortfolio({ ...samplePortfolio, template: portfolio.template, accent: portfolio.accent })
    }
  }

  const CurrentStep = step < FINISH ? FORM_STEPS[step].Step : null

  return (
    <div className="flex min-h-dvh flex-col bg-slate-50 text-slate-900 lg:h-dvh">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
        <div className="grid size-8 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white">P</div>
        <h1 className="truncate font-semibold">Portfolio Generator</h1>
        <div className="ml-auto flex shrink-0 gap-1">
          <button type="button" className="btn btn-ghost px-2.5 whitespace-nowrap" onClick={loadSample}>
            <span className="hidden sm:inline">Try sample data</span>
            <span className="sm:hidden">Sample</span>
          </button>
          <button type="button" className="btn btn-ghost px-2.5 whitespace-nowrap" onClick={startOver}>
            Start over
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(380px,460px)_1fr]">
        <div className="flex min-h-0 flex-col border-slate-200 bg-slate-50 lg:border-r">
          <nav aria-label="Steps" className="shrink-0 border-b border-slate-200 bg-white px-2 py-2.5">
            <ol className="grid grid-cols-6">
              {STEP_LABELS.map((label, i) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={i === step ? 'step' : undefined}
                    className={`flex w-full flex-col items-center gap-1 rounded-lg px-1 py-1 text-xs transition-colors hover:bg-slate-50 ${
                      i === step ? 'font-semibold text-indigo-700' : i < step ? 'text-indigo-700' : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`grid size-6 place-items-center rounded-full text-xs ${
                        i === step
                          ? 'bg-indigo-600 text-white'
                          : i < step
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {i < step ? '✓' : i + 1}
                    </span>
                    {label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div ref={formRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
            {CurrentStep ? (
              <CurrentStep portfolio={portfolio} update={update} />
            ) : (
              <FinishStep portfolio={portfolio} update={update} onDownload={download} onOpen={open} />
            )}
          </div>

          <div className="flex shrink-0 justify-between border-t border-slate-200 bg-white px-5 py-3">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </button>
            {step < FINISH && (
              <button type="button" className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>
                {step === FINISH - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        </div>

        <div className="h-[80vh] min-h-0 lg:h-auto">
          <Preview
            html={previewHtml}
            template={portfolio.template}
            update={update}
            onDownload={download}
            onOpen={open}
          />
        </div>
      </div>
    </div>
  )
}

export default App
