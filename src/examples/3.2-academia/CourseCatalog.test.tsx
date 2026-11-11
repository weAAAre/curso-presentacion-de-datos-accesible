import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { CourseCatalog } from './CourseCatalog'

const cards = () =>
  within(screen.getAllByRole('list').at(-1) as HTMLElement).getAllByRole(
    'listitem',
  )

describe('Academia: cards con encabezado, acciones separadas y orden coherente', () => {
  it('con la barrera, la card entera es un enlace que contiene el botón y el destacado está al final', () => {
    const { container } = render(<CourseCatalog fixed={false} />)
    expect(container.querySelector('a button')).not.toBeNull()
    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0)
    expect(cards().at(-1)).toHaveTextContent('Destacado')
    expect(
      screen.getByRole('link', { name: /^Excel desde cero.*Guardar$/ }),
    ).toBeInTheDocument()
  })

  it('con el arreglo, cada card tiene encabezado y enlace propio, y el orden del DOM empieza por el destacado', async () => {
    const { container } = render(<CourseCatalog fixed />)
    expect(container.querySelector('a button')).toBeNull()
    expect(
      screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent),
    ).toEqual([
      'Excel desde cero',
      'Fotografía con el móvil',
      'Inglés para viajar',
      'Huerto urbano',
    ])
    expect(cards()[0]).toHaveTextContent('Destacado')
    expect(
      screen.getByRole('link', { name: 'Excel desde cero' }),
    ).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('con el arreglo, el teclado recorre enlace y acción de cada card en orden y «Guardar» dice qué guarda', async () => {
    const user = userEvent.setup()
    render(<CourseCatalog fixed />)
    const save = screen.getByRole('button', {
      name: 'Guardar Excel desde cero',
    })
    screen.getByRole('link', { name: 'Excel desde cero' }).focus()
    await user.tab()
    expect(save).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(save).toHaveAttribute('aria-pressed', 'true')
    await user.tab()
    expect(
      screen.getByRole('link', { name: 'Fotografía con el móvil' }),
    ).toHaveFocus()
  })
})
