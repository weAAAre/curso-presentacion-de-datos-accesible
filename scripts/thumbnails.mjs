// Captura cada web de ejemplo para las tarjetas de la portada.
// Uso: pnpm thumbnails (la primera vez: pnpm exec playwright install chromium).
import { mkdir, readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { chromium } from 'playwright'
import { createServer } from 'vite'

const examplesDir = 'src/examples'
const outDir = 'src/app/thumbnails'

const slugs = []
for (const file of await readdir(examplesDir, { recursive: true })) {
  if (!file.endsWith('.example.ts')) continue
  const source = await readFile(join(examplesDir, file), 'utf8')
  const slug = source.match(/slug: '([^']+)'/)?.[1]
  if (slug) slugs.push(slug)
}

const server = await createServer({ server: { port: 0 }, logLevel: 'error' })
await server.listen()
const origin = server.resolvedUrls.local[0]

const browser = await chromium.launch()
// 1280 × 800 reducido a 800 × 500.
const page = await browser.newPage({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 0.625,
  reducedMotion: 'reduce',
})
await mkdir(outDir, { recursive: true })
for (const slug of slugs.sort()) {
  // La versión arreglada: es la que respeta «reducir movimiento».
  await page.goto(`${origin}${slug}/arreglo/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({
    path: join(outDir, `${slug}.jpg`),
    type: 'jpeg',
    quality: 72,
  })
  console.log(`✓ ${slug}`)
}
await browser.close()
await server.close()
