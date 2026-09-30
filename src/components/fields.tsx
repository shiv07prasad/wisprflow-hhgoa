import { useId, type ReactNode } from 'react'

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  hint?: string
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  type = 'text',
  inputMode,
  autoComplete,
}: FieldProps & {
  type?: 'text' | 'email'
  inputMode?: 'text' | 'url' | 'email'
  autoComplete?: string
}) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

export function TextArea({ label, value, onChange, placeholder, hint, rows = 4 }: FieldProps & { rows?: number }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="input resize-y"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

export function StepLayout({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  )
}
