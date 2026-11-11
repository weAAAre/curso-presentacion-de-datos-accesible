import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { exampleRegistry } from './registry'

describe('Registro de páginas de ejemplo', () => {
  it('usa direcciones únicas en el orden de las lecciones', () => {
    const slugs = exampleRegistry.map(({ slug }) => slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    const lessons = exampleRegistry.map(({ lesson }) => lesson)
    expect(lessons).toEqual([...lessons].sort())
  })

  it.each(exampleRegistry.map((example) => [example.slug, example] as const))(
    '%s marca en la página cada arreglo, con y sin aplicar',
    (_, { fixes, Page }) => {
      for (const fixed of [false, true]) {
        const { unmount } = render(<Page fixed={fixed} />)
        for (const fix of fixes)
          expect(
            document.querySelector(`[data-fix="${fix.id}"]`),
            `${fix.id} con fixed=${fixed}`,
          ).not.toBeNull()
        expect(
          screen.queryAllByRole('heading', { level: 1 }).length,
        ).toBeLessThanOrEqual(1)
        unmount()
      }
    },
  )
})
