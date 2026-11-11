import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { exampleRegistry } from '../examples/registry'
import { App } from './App'
import { parseRoute, sheetUrl, viewUrl } from './routes'

const [first] = exampleRegistry

describe('Rutas', () => {
  it('distingue portada, ficha y versiones', () => {
    expect(parseRoute('/')).toEqual({ extra: false })
    expect(parseRoute('/cine')).toMatchObject({ slug: 'cine', extra: false })
    expect(parseRoute('/cine/arreglo/')).toEqual({
      slug: 'cine',
      version: 'arreglo',
      extra: false,
    })
    expect(parseRoute('/cine/otra')).toMatchObject({ extra: true })
    expect(sheetUrl('cine')).toBe('/cine/')
    expect(viewUrl('cine', 'barrera')).toBe('/cine/barrera/')
  })
})

describe('Portada', () => {
  it('enlaza la ficha de todos los ejemplos, en orden y sin barreras', async () => {
    const { container } = render(<App pathname="/" />)
    const links = within(screen.getByRole('main'))
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(links).toEqual(exampleRegistry.map(({ slug }) => sheetUrl(slug)))
    expect(await axe(container)).toHaveNoViolations()
  })

  it('avisa de una dirección inexistente sin perder la lista', () => {
    render(<App pathname="/no-existe/" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Esa página no existe')
    expect(within(screen.getByRole('main')).getAllByRole('link')).toHaveLength(
      exampleRegistry.length,
    )
  })
})

describe('Ficha de un ejemplo', () => {
  it('enlaza las dos versiones y explica cada cambio', async () => {
    const { container } = render(<App pathname={sheetUrl(first.slug)} />)
    expect(
      screen.getByRole('heading', { level: 1, name: first.name }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Con barrera' })).toHaveAttribute(
      'href',
      viewUrl(first.slug, 'barrera'),
    )
    expect(screen.getByRole('link', { name: 'Con arreglo' })).toHaveAttribute(
      'href',
      viewUrl(first.slug, 'arreglo'),
    )
    for (const fix of first.fixes)
      expect(screen.getByText(fix.title)).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Página de ejemplo', () => {
  it.each(exampleRegistry.map((example) => [example.slug, example] as const))(
    '%s se muestra sola, sin elementos del curso',
    (slug, example) => {
      for (const version of ['barrera', 'arreglo'] as const) {
        const { container, unmount } = render(
          <App pathname={viewUrl(slug, version)} />,
        )
        expect(container.querySelector('.course')).toBeNull()
        expect(document.title).toBe(example.title)
        unmount()
      }
    },
  )
})
