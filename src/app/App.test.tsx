import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { exampleRegistry } from '../examples/registry'
import { App } from './App'
import { parseRoute, siteUrl } from './routes'

describe('Rutas', () => {
  it('distingue la portada, la web con barreras y la arreglada', () => {
    expect(parseRoute('/')).toEqual({ fixed: false, extra: false })
    expect(parseRoute('/cine')).toEqual({
      slug: 'cine',
      fixed: false,
      extra: false,
    })
    expect(parseRoute('/cine/barrera/')).toMatchObject({ fixed: false })
    expect(parseRoute('/cine/arreglo/')).toMatchObject({
      fixed: true,
      extra: false,
    })
    expect(parseRoute('/cine/otra')).toMatchObject({ extra: true })
    expect(siteUrl('cine')).toBe('/cine/')
    expect(siteUrl('cine', true)).toBe('/cine/arreglo/')
  })
})

describe('Portada', () => {
  it('enlaza las dos versiones de cada web, en orden y sin barreras', async () => {
    const { container } = render(<App pathname="/" />)
    const links = within(screen.getByRole('list'))
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(links).toEqual(
      exampleRegistry.flatMap(({ slug }) => [
        siteUrl(slug),
        siteUrl(slug, true),
      ]),
    )
    expect(await axe(container)).toHaveNoViolations()
  })

  it('avisa de una dirección inexistente sin perder la lista', () => {
    render(<App pathname="/no-existe/" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Esa página no existe')
    expect(screen.getAllByRole('listitem')).toHaveLength(exampleRegistry.length)
  })
})

describe('Web de ejemplo', () => {
  it.each(exampleRegistry.map((example) => [example.slug, example] as const))(
    '%s se muestra sola, sin elementos del curso',
    (slug, example) => {
      for (const fixed of [false, true]) {
        const { container, unmount } = render(
          <App pathname={siteUrl(slug, fixed)} />,
        )
        expect(container.querySelector('.course')).toBeNull()
        expect(document.title).toBe(example.title)
        unmount()
      }
    },
  )
})
