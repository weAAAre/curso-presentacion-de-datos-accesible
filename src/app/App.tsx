import '../examples/example-base.css'
import { exampleRegistry } from '../examples/registry'
import { Home } from './Home'
import { parseRoute } from './routes'
import { Sheet } from './Sheet'
import { View } from './View'

/** Elige la pantalla por la ruta: portada, ficha del ejemplo o el ejemplo solo. */
export function App({ pathname }: { pathname: string }) {
  const route = parseRoute(pathname)
  const example = exampleRegistry.find((item) => item.slug === route.slug)
  if (example && route.version && !route.extra)
    return <View example={example} version={route.version} />
  if (example && !route.extra) return <Sheet example={example} />
  return <Home missing={route.slug !== undefined} />
}
