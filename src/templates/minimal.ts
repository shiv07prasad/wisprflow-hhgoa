import type { Portfolio } from '../types'
import { buildSections, documentShell, safeColor } from './shared'

export function renderMinimal(p: Portfolio): string {
  const accent = safeColor(p.accent)
  const s = buildSections(p)

  const css = `body{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#1f2937;background:#fff;line-height:1.65}
.wrap{max-width:720px;margin:0 auto;padding:72px 24px 16px}
.hero{display:flex;gap:28px;align-items:center}
.avatar{width:112px;height:112px;border-radius:50%;object-fit:cover;flex:none}
h1{font-family:Georgia,"Times New Roman",serif;font-size:2.6rem;line-height:1.15;margin:0;color:#111827;font-weight:700}
.title{margin:6px 0 0;font-size:1.15rem;color:#4b5563}
.location{margin:2px 0 0;color:#6b7280;font-size:.95rem}
.links{display:flex;flex-wrap:wrap;gap:6px 18px;list-style:none;padding:0;margin:14px 0 0}
.links a{color:${accent};text-decoration:none;font-weight:500}
.links a:hover{text-decoration:underline}
.section{margin-top:52px}
h2{font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:${accent};margin:0 0 16px}
h3{font-size:1.05rem;margin:0;color:#111827}
.section p{margin:0 0 12px}
.skills{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0}
.skills li{border:1px solid #e5e7eb;border-radius:999px;padding:4px 14px;font-size:.9rem}
.projects{display:grid;gap:16px}
.card{border:1px solid #e5e7eb;border-radius:12px;padding:18px 20px}
.card p{margin:8px 0 0}
.card h3 a{text-decoration:none}
.card h3 a:hover{color:${accent}}
.tech{font-size:.85rem;color:#6b7280}
.timeline{list-style:none;padding:0;margin:0;display:grid;gap:24px}
.timeline li{display:grid;grid-template-columns:140px 1fr;gap:16px}
.timeline p{margin:6px 0 0}
.period{color:#6b7280;font-size:.9rem;padding-top:2px}
.company{font-weight:400;color:#6b7280}
@media (max-width:560px){.wrap{padding-top:48px}.hero{flex-direction:column;align-items:flex-start;gap:20px}h1{font-size:2.1rem}.timeline li{grid-template-columns:1fr;gap:2px}}`

  const body = `<main class="wrap">
<header class="hero">
${s.photo ? `<img class="avatar" src="${s.photo}" alt="${s.name}">` : ''}
<div>
<h1>${s.name}</h1>
${s.title ? `<p class="title">${s.title}</p>` : ''}
${s.location ? `<p class="location">${s.location}</p>` : ''}
${s.links}
</div>
</header>
${s.about}${s.skills}${s.projects}${s.experience}
</main>`

  return documentShell(p, css, body)
}
