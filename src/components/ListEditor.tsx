import type { ReactNode } from 'react'

interface ListEditorProps<T extends { id: string }> {
  items: T[]
  onChange: (items: T[]) => void
  create: () => T
  addLabel: string
  emptyText: string
  itemTitle: (item: T, index: number) => string
  renderItem: (item: T, set: (patch: Partial<T>) => void) => ReactNode
}

export function ListEditor<T extends { id: string }>({
  items,
  onChange,
  create,
  addLabel,
  emptyText,
  itemTitle,
  renderItem,
}: ListEditorProps<T>) {
  const set = (id: string, patch: Partial<T>) =>
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)))

  const move = (index: number, delta: number) => {
    const next = [...items]
    const [item] = next.splice(index, 1)
    next.splice(index + delta, 0, item)
    onChange(next)
  }

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-500">
          {emptyText}
        </p>
      )}
      {items.map((item, index) => (
        <fieldset key={item.id} aria-label={itemTitle(item, index)} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="truncate text-sm font-semibold text-slate-800">{itemTitle(item, index)}</h3>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                className="btn btn-ghost px-2 py-1"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                aria-label="Move up"
                title="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                className="btn btn-ghost px-2 py-1"
                disabled={index === items.length - 1}
                onClick={() => move(index, 1)}
                aria-label="Move down"
                title="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                className="btn btn-ghost px-2 py-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => onChange(items.filter((i) => i.id !== item.id))}
              >
                Remove
              </button>
            </div>
          </div>
          <div className="space-y-4">{renderItem(item, (patch) => set(item.id, patch))}</div>
        </fieldset>
      ))}
      <button type="button" className="btn btn-secondary w-full" onClick={() => onChange([...items, create()])}>
        + {addLabel}
      </button>
    </div>
  )
}
