import '../examples/example-base.css'
import { exampleRegistry } from '../examples/registry'
import { Home } from './Home'
import { parseRoute } from './routes'
import { View } from './View'

/** Elige la pantalla por la ruta: la portada o una web de ejemplo. */
export function App({ pathname }: { pathname: string }) {
  const route = parseRoute(pathname)
  const example = exampleRegistry.find((item) => item.slug === route.slug)
  if (example && !route.extra)
    return <View example={example} fixed={route.fixed} />
  return <Home missing={route.slug !== undefined} />
}
