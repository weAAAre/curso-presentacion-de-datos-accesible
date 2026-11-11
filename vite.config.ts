import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const examplesDir = 'src/examples'

/** Rutas que deben abrirse directamente en un hosting estático. */
async function staticRoutes() {
  const routes: string[] = []
  const files = await readdir(examplesDir, { recursive: true })
  for (const file of files) {
    if (!file.endsWith('.example.ts')) continue
    const source = await readFile(join(examplesDir, file), 'utf8')
    const slug = source.match(/slug: '([^']+)'/)?.[1]
    if (slug) routes.push(slug, `${slug}/barrera`, `${slug}/arreglo`)
  }
  return routes
}

/**
 * La aplicación elige la pantalla por la ruta. Copia `index.html` en cada
 * ruta conocida y en `404.html` para que las recargas y los enlaces directos
 * funcionen en un hosting estático.
 */
function staticRouteCopies(): Plugin {
  let outDir = 'dist'
  return {
    name: 'static-route-copies',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    async closeBundle() {
      const html = await readFile(join(outDir, 'index.html'), 'utf8')
      const targets = [
        '404.html',
        ...(await staticRoutes()).map((route) => join(route, 'index.html')),
      ]
      for (const target of targets) {
        const path = join(outDir, target)
        await mkdir(dirname(path), { recursive: true })
        await writeFile(path, html)
      }
    },
  }
}

export default defineConfig({
  // En GitHub Pages el sitio vive en una subcarpeta: /<repositorio>/.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), staticRouteCopies()],
})
