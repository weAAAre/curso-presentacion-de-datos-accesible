import { useEffect } from 'react'
import type { ExampleDefinition } from '../examples/types'

/**
 * La web de ejemplo y nada más: sin barras ni avisos del curso, para que el
 * DOM, el árbol de accesibilidad y el orden de foco sean solo los suyos.
 */
export function View({
  example,
  fixed,
}: {
  example: ExampleDefinition
  fixed: boolean
}) {
  const { Page, title } = example

  useEffect(() => {
    document.title = title
  }, [title])

  return <Page fixed={fixed} />
}
