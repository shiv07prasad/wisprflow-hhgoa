import { DEFAULT_ACCENT } from '../lib/portfolio'
import type { Portfolio } from '../types'

// Everything in here produces raw HTML strings for the exported file, so all
// user input must pass through esc() / safeUrl() / safeEmail() / safeColor() / safePhoto().

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export function esc(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPES[c])
}

/** Returns an http(s) URL, adding https:// when the user left it off, or '' if unsafe. */
export function safeUrl(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''
  const candidate = /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ''
  } catch {
    return ''
  }
}

export function safeEmail(value: string): string {
  const trimmed = value.trim()
  return /^[^\s@<>"'()]+@[^\s@<>"'()]+\.[^\s@<>"'()]+$/.test(trimmed) ? trimmed : ''
}

export function safeColor(value: string): string {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : DEFAULT_ACCENT
}

export function safePhoto(value: string): string {
  return /^data:image\/(jpeg|png|webp);base64,[a-z0-9+/=]+$/i.test(value) ? value : ''
}

/** Near-black or white, whichever reads better on the given background. */
export function readableTextOn(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.18 ? '#111827' : '#ffffff'
}

function paragraphs(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${esc(block).replace(/\n/g, '<br>')}</p>`)
    .join('')
}

function link(href: string, label: string): string {
  return `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`
}

export interface Sections {
  name: string
  title: string
  location: string
  photo: string
  links: string
  about: string
  skills: string
  projects: string
  experience: string
}

export function buildSections(p: Portfolio): Sections {
  const email = safeEmail(p.links.email)
  const website = safeUrl(p.links.website)
  const github = safeUrl(p.links.github)
  const linkedin = safeUrl(p.links.linkedin)
  const twitter = safeUrl(p.links.twitter)
  const linkItems = [
    email && link(`mailto:${email}`, 'Email'),
    website && link(website, 'Website'),
    github && link(github, 'GitHub'),
    linkedin && link(linkedin, 'LinkedIn'),
    twitter && link(twitter, 'X / Twitter'),
  ].filter(Boolean)

  const skills = p.skills.map((s) => s.trim()).filter(Boolean)

  const projects = p.projects
    .filter((pr) => pr.name.trim() || pr.description.trim())
    .map((pr) => {
      const url = safeUrl(pr.url)
      const name = esc(pr.name.trim() || 'Untitled project')
      const tech = pr.tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      return `<article class="card">
<h3>${url ? link(url, name) : name}</h3>
${paragraphs(pr.description)}
${tech.length ? `<p class="tech">${tech.map(esc).join(' · ')}</p>` : ''}
</article>`
    })

  const experience = p.experience
    .filter((ex) => ex.role.trim() || ex.company.trim())
    .map(
      (ex) => `<li>
<div class="period">${esc(ex.period.trim())}</div>
<div>
<h3>${esc(ex.role.trim())}${ex.company.trim() ? ` <span class="company">· ${esc(ex.company.trim())}</span>` : ''}</h3>
${paragraphs(ex.description)}
</div>
</li>`,
    )

  return {
    name: esc(p.name.trim() || 'Your Name'),
    title: esc(p.title.trim()),
    location: esc(p.location.trim()),
    photo: safePhoto(p.photo),
    links: linkItems.length
      ? `<ul class="links">${linkItems.map((l) => `<li>${l}</li>`).join('')}</ul>`
      : '',
    about: p.bio.trim()
      ? `<section class="section"><h2>About</h2>${paragraphs(p.bio)}</section>`
      : '',
    skills: skills.length
      ? `<section class="section"><h2>Skills</h2><ul class="skills">${skills.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></section>`
      : '',
    projects: projects.length
      ? `<section class="section"><h2>Projects</h2><div class="projects">${projects.join('')}</div></section>`
      : '',
    experience: experience.length
      ? `<section class="section"><h2>Experience</h2><ol class="timeline">${experience.join('')}</ol></section>`
      : '',
  }
}

const BASE_CSS = `*,*::before,*::after{box-sizing:border-box}
body{margin:0;-webkit-font-smoothing:antialiased}
img{display:block;max-width:100%}
h1,h2,h3,p{overflow-wrap:break-word}
a{color:inherit}
.footer{text-align:center;font-size:.85rem;padding:32px 24px 48px;opacity:.6}`

export function documentShell(p: Portfolio, css: string, body: string): string {
  const name = p.name.trim()
  const title = [name || 'My Portfolio', p.title.trim()].filter(Boolean).join(' — ')
  const year = new Date().getFullYear()
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(p.bio.trim().replace(/\s+/g, ' ').slice(0, 160))}">
<style>
${BASE_CSS}
${css}
</style>
</head>
<body>
${body}
<footer class="footer">© ${year} ${esc(name || 'Your Name')}</footer>
</body>
</html>
`
}
