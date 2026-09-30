import { useRef, useState } from 'react'
import type { Portfolio, TemplateId } from '../types'
import { TEMPLATES } from '../templates'

type Device = 'desktop' | 'mobile'

interface PreviewProps {
  html: string
  template: TemplateId
  update: (patch: Partial<Portfolio>) => void
  onDownload: () => void
  onOpen: () => void
}

export function Preview({ html, template, update, onDownload, onOpen }: PreviewProps) {
  const [device, setDevice] = useState<Device>('desktop')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  // srcDoc reloads the frame on every edit; remember scroll so it doesn't jump to the top.
  const scrollY = useRef(0)

  function handleLoad() {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.scrollTo(0, scrollY.current)
    win.addEventListener(
      'scroll',
      () => {
        scrollY.current = win.scrollY
      },
      { passive: true },
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
        <label className="sr-only" htmlFor="preview-template">
          Template
        </label>
        <select
          id="preview-template"
          className="input w-auto py-1.5"
          value={template}
          onChange={(e) => update({ template: e.target.value as TemplateId })}
        >
          {TEMPLATES.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="flex rounded-lg border border-slate-300 p-0.5" role="group" aria-label="Preview size">
          {(['desktop', 'mobile'] as const).map((d) => (
            <button
              key={d}
              type="button"
              aria-pressed={device === d}
              onClick={() => setDevice(d)}
              className={`rounded-md px-3 py-1 text-sm capitalize transition-colors ${
                device === d ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          <button type="button" className="btn btn-secondary py-1.5" onClick={onOpen}>
            Open in new tab
          </button>
          <button type="button" className="btn btn-primary py-1.5" onClick={onDownload}>
            Download HTML
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 justify-center overflow-hidden bg-slate-200/70 p-4">
        <iframe
          ref={iframeRef}
          title="Portfolio preview"
          srcDoc={html}
          onLoad={handleLoad}
          // Same-origin (no scripts) so we can restore scroll; generated HTML contains no scripts.
          sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          className={`h-full rounded-lg bg-white shadow-lg transition-[width] duration-300 ${
            device === 'mobile' ? 'w-[390px] max-w-full' : 'w-full'
          }`}
        />
      </div>
    </div>
  )
}
