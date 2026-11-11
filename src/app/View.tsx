import { useEffect } from 'react'
import type { ExampleDefinition } from '../examples/types'
import type { Version } from './routes'

/**
 * La página de ejemplo y nada más: sin barras ni avisos del curso, para que
 * el DOM, el árbol de accesibilidad y el orden de foco sean solo los suyos.
 */
export function View({
  example,
  version,
}: {
  example: ExampleDefinition
  version: Version
}) {
  const { Page, title } = example

  useEffect(() => {
    document.title = title
  }, [title])

  return <Page fixed={version === 'arreglo'} />
}
