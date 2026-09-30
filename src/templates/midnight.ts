import type { Portfolio } from '../types'
import { buildSections, documentShell, safeColor } from './shared'

const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

export function renderMidnight(p: Portfolio): string {
  const accent = safeColor(p.accent)
  const s = buildSections(p)

  const css = `body{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#cbd5e1;background:#0b1120;line-height:1.65}
.wrap{max-width:760px;margin:0 auto;padding:88px 24px 16px}
.hero{display:flex;gap:32px;align-items:center;justify-content:space-between}
.hello{margin:0 0 8px;color:${accent};font-size:.95rem;font-family:${MONO};filter:brightness(1.4)}
h1{font-size:3rem;line-height:1.1;margin:0;color:#f8fafc;font-weight:800;letter-spacing:-.02em}
.title{margin:10px 0 0;font-size:1.25rem;color:#94a3b8}
.location{margin:4px 0 0;color:#64748b;font-size:.95rem}
.avatar{width:136px;height:136px;border-radius:20px;object-fit:cover;flex:none;box-shadow:0 0 0 2px #0b1120,0 0 0 4px ${accent}}
.links{display:flex;flex-wrap:wrap;gap:10px;list-style:none;padding:0;margin:24px 0 0}
.links a{display:inline-block;padding:6px 14px;border:1px solid #1e293b;border-radius:8px;text-decoration:none;color:#e2e8f0;font-size:.9rem;transition:border-color .15s}
.links a:hover{border-color:${accent}}
.section{margin-top:64px}
h2{font-family:${MONO};font-size:.95rem;color:#f8fafc;margin:0 0 20px;font-weight:600}
h2::before{content:"# ";color:${accent}}
h3{font-size:1.05rem;margin:0;color:#f1f5f9}
.section p{margin:0 0 12px}
.skills{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:0}
.skills li{background:#111a2e;border:1px solid #1e293b;border-radius:6px;padding:4px 12px;font-size:.88rem;font-family:${MONO};color:#e2e8f0}
.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
.card{background:#111a2e;border:1px solid #1e293b;border-radius:14px;padding:20px 22px;transition:border-color .15s}
.card:hover{border-color:${accent}}
.card p{margin:8px 0 0}
.card h3 a{text-decoration:none}
.tech{font-family:${MONO};font-size:.8rem;color:#94a3b8}
.timeline{list-style:none;padding:0 0 0 20px;margin:0;display:grid;gap:28px;border-left:1px solid #1e293b}
.timeline li{position:relative}
.timeline li::before{content:"";position:absolute;left:-26px;top:8px;width:11px;height:11px;border-radius:50%;background:${accent}}
.timeline p{margin:6px 0 0}
.period{font-family:${MONO};font-size:.8rem;color:#64748b;margin-bottom:2px}
.company{font-weight:400;color:#94a3b8}
.footer{color:#64748b}
@media (max-width:600px){.wrap{padding-top:56px}.hero{flex-direction:column-reverse;align-items:flex-start}h1{font-size:2.3rem}}`

  const body = `<main class="wrap">
<header class="hero">
<div>
<p class="hello">Hi, my name is</p>
<h1>${s.name}</h1>
${s.title ? `<p class="title">${s.title}</p>` : ''}
${s.location ? `<p class="location">${s.location}</p>` : ''}
${s.links}
</div>
${s.photo ? `<img class="avatar" src="${s.photo}" alt="${s.name}">` : ''}
</header>
${s.about}${s.skills}${s.projects}${s.experience}
</main>`

  return documentShell(p, css, body)
}
