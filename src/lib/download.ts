export function portfolioFilename(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${slug || 'my'}-portfolio.html`
}

function htmlBlobUrl(html: string): string {
  return URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' }))
}

export function downloadHtml(html: string, filename: string): void {
  const url = htmlBlobUrl(html)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1_000)
}

export function openHtmlInNewTab(html: string): void {
  const url = htmlBlobUrl(html)
  window.open(url, '_blank', 'noopener')
  setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
