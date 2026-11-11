const base = import.meta.env.BASE_URL

export type Version = 'barrera' | 'arreglo'

export const versions: { version: Version; fixed: boolean; label: string }[] = [
  { version: 'barrera', fixed: false, label: 'Con barrera' },
  { version: 'arreglo', fixed: true, label: 'Con arreglo' },
]

/** Portada: todos los ejemplos del curso. */
export const homeUrl = base

/** Ficha de un ejemplo: qué probar y qué cambia. */
export const sheetUrl = (slug: string) => `${base}${slug}/`

/** La página de ejemplo sola, con la barrera o con el arreglo. */
export const viewUrl = (slug: string, version: Version) =>
  `${base}${slug}/${version}/`

export interface Route {
  slug?: string
  version?: Version
  /** Hay más segmentos de los que la ruta conoce. */
  extra: boolean
}

export function parseRoute(pathname: string): Route {
  const path = decodeURIComponent(pathname)
  const inside = path.startsWith(base) ? path.slice(base.length) : path
  const [slug, version, ...rest] = inside.split('/').filter(Boolean)
  const known = versions.some((item) => item.version === version)
  return {
    slug,
    version: known ? (version as Version) : undefined,
    extra: rest.length > 0 || (version !== undefined && !known),
  }
}
