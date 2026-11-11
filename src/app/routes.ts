const base = import.meta.env.BASE_URL

/** Portada: todas las webs de ejemplo del curso. */
export const homeUrl = base

/** La web de ejemplo: con sus barreras o, en `/arreglo/`, ya arreglada. */
export const siteUrl = (slug: string, fixed = false) =>
  `${base}${slug}/${fixed ? 'arreglo/' : ''}`

export interface Route {
  slug?: string
  fixed: boolean
  /** Hay más segmentos de los que la ruta conoce. */
  extra: boolean
}

export function parseRoute(pathname: string): Route {
  const path = decodeURIComponent(pathname)
  const inside = path.startsWith(base) ? path.slice(base.length) : path
  const [slug, version, ...rest] = inside.split('/').filter(Boolean)
  // `/barrera/` es la dirección antigua de la web con barreras.
  const known = [undefined, 'barrera', 'arreglo'].includes(version)
  return {
    slug,
    fixed: version === 'arreglo',
    extra: rest.length > 0 || !known,
  }
}
