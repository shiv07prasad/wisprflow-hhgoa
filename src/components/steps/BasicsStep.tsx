import { useId, useState, type ChangeEvent } from 'react'
import { fileToResizedDataUrl } from '../../lib/image'
import { StepLayout, TextField } from '../fields'
import type { StepProps } from './types'

export function BasicsStep({ portfolio, update }: StepProps) {
  const photoId = useId()
  const [photoError, setPhotoError] = useState('')

  async function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please choose an image file.')
      return
    }
    try {
      update({ photo: await fileToResizedDataUrl(file) })
      setPhotoError('')
    } catch {
      setPhotoError("Couldn't read that image. Try a JPG or PNG.")
    }
  }

  return (
    <StepLayout title="The basics" description="Who you are and what you do. This goes at the top of your portfolio.">
      <TextField
        label="Full name"
        value={portfolio.name}
        onChange={(name) => update({ name })}
        placeholder="Alex Rivera"
        autoComplete="name"
      />
      <TextField
        label="Headline"
        value={portfolio.title}
        onChange={(title) => update({ title })}
        placeholder="Frontend Developer"
        hint="Your role or a one-line description."
      />
      <TextField
        label="Location"
        value={portfolio.location}
        onChange={(location) => update({ location })}
        placeholder="Bengaluru, India"
      />

      <div>
        <span className="label">Photo</span>
        <div className="flex items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100 text-xl text-slate-400">
            {portfolio.photo ? (
              <img src={portfolio.photo} alt="" className="size-full object-cover" />
            ) : (
              <span aria-hidden>👤</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <label htmlFor={photoId} className="btn btn-secondary cursor-pointer">
              {portfolio.photo ? 'Change photo' : 'Upload photo'}
            </label>
            <input id={photoId} type="file" accept="image/*" className="sr-only" onChange={handlePhoto} />
            {portfolio.photo && (
              <button type="button" className="btn btn-ghost" onClick={() => update({ photo: '' })}>
                Remove
              </button>
            )}
          </div>
        </div>
        {photoError ? (
          <p className="mt-2 text-xs text-red-600">{photoError}</p>
        ) : (
          <p className="mt-2 text-xs text-slate-500">Optional. It's resized and embedded in your HTML file.</p>
        )}
      </div>
    </StepLayout>
  )
}
