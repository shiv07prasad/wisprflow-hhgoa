import type { Portfolio } from '../types'
import { buildSections, documentShell, readableTextOn, safeColor } from './shared'

export function renderBold(p: Portfolio): string {
  const accent = safeColor(p.accent)
  const onAccent = readableTextOn(accent)
  // Accent used as text on white needs to be dark enough to read.
  const accentText = onAccent === '#ffffff' ? accent : '#0f172a'
  const s = buildSections(p)

  const css = `body{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1e293b;background:#f1f5f9;line-height:1.65}
.hero{background:${accent};color:${onAccent};text-align:center;padding:80px 24px 104px}
.avatar{width:144px;height:144px;border-radius:50%;object-fit:cover;margin:0 auto 24px;border:5px solid ${onAccent}}
h1{font-size:3.2rem;line-height:1.08;margin:0;font-weight:900;letter-spacing:-.03em}
.title{margin:12px 0 0;font-size:1.3rem;opacity:.9}
.location{margin:4px 0 0;opacity:.75}
.links{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;list-style:none;padding:0;margin:28px 0 0}
.links a{display:inline-block;padding:8px 18px;border-radius:999px;background:${onAccent};color:${accent};text-decoration:none;font-weight:600;font-size:.9rem}
.links a:hover{opacity:.9}
.wrap{max-width:880px;margin:-56px auto 0;padding:0 20px;display:grid;gap:20px}
.section{background:#fff;border-radius:18px;padding:32px;box-shadow:0 1px 2px rgba(15,23,42,.06),0 8px 24px rgba(15,23,42,.06)}
h2{font-size:1.5rem;margin:0 0 18px;font-weight:800;color:#0f172a}
h2::after{content:"";display:block;width:40px;height:4px;border-radius:2px;background:${accent};margin-top:8px}
h3{font-size:1.1rem;margin:0;color:#0f172a}
.section p{margin:0 0 12px}
.skills{display:flex;flex-wrap:wrap;gap:10px;list-style:none;padding:0;margin:0}
.skills li{background:#f1f5f9;border-radius:10px;padding:6px 14px;font-weight:600;font-size:.9rem}
.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.card{border:2px solid #e2e8f0;border-radius:14px;padding:20px}
.card p{margin:8px 0 0}
.card h3 a{color:${accentText}}
.tech{font-size:.85rem;color:#64748b;font-weight:600}
.timeline{list-style:none;padding:0;margin:0;display:grid;gap:22px}
.timeline li{display:grid;grid-template-columns:150px 1fr;gap:18px}
.timeline p{margin:6px 0 0}
.period{font-weight:700;color:${accentText};font-size:.9rem;padding-top:2px}
.company{font-weight:500;color:#64748b}
.wrap:empty{display:none}
@media (max-width:600px){.hero{padding:56px 20px 96px}h1{font-size:2.4rem}.section{padding:24px 20px}.timeline li{grid-template-columns:1fr;gap:2px}}`

  const content = `${s.about}${s.skills}${s.projects}${s.experience}`
  const body = `<header class="hero">
${s.photo ? `<img class="avatar" src="${s.photo}" alt="${s.name}">` : ''}
<h1>${s.name}</h1>
${s.title ? `<p class="title">${s.title}</p>` : ''}
${s.location ? `<p class="location">${s.location}</p>` : ''}
${s.links}
</header>
${content ? `<main class="wrap">${content}</main>` : ''}`

  return documentShell(p, css, body)
}
