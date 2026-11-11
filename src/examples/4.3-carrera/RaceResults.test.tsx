import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { RaceResults } from './RaceResults'

const firstNames = () =>
  within(screen.getByRole('table'))
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[2].textContent)

describe('Carrera: ordenar con teclado y exponer el orden', () => {
  it('con la barrera, los encabezados ordenan con el ratón, pero no son controles ni exponen el orden', () => {
    render(<RaceResults fixed={false} />)
    expect(
      within(screen.getByRole('table')).queryAllByRole('button'),
    ).toHaveLength(0)
    const name = screen.getByRole('columnheader', { name: /Nombre/ })
    expect(name).not.toHaveAttribute('tabindex')
    fireEvent.click(name)
    expect(firstNames()[0]).toBe('Aitana Ruiz')
    expect(document.querySelector('th[aria-sort]')).toBeNull()
  })

  it('con el arreglo, se ordena con Enter, el foco se queda y solo un encabezado tiene aria-sort', async () => {
    const user = userEvent.setup()
    const { container } = render(<RaceResults fixed />)
    expect(
      screen.getByRole('columnheader', { name: 'Tiempo' }),
    ).toHaveAttribute('aria-sort', 'ascending')

    const name = screen.getByRole('button', { name: 'Nombre' })
    name.focus()
    await user.keyboard('{Enter}')
    expect(name).toHaveFocus()
    expect(firstNames()[0]).toBe('Aitana Ruiz')
    expect(
      screen.getByRole('columnheader', { name: 'Nombre' }),
    ).toHaveAttribute('aria-sort', 'ascending')
    expect(container.querySelectorAll('th[aria-sort]')).toHaveLength(1)
    expect(screen.getByRole('status')).toHaveTextContent(
      'Ordenada por nombre, de la A a la Z.',
    )

    await user.keyboard(' ')
    expect(firstNames()[0]).toBe('Pedro Alonso')
    expect(
      screen.getByRole('columnheader', { name: 'Nombre' }),
    ).toHaveAttribute('aria-sort', 'descending')
    expect(screen.getByRole('status')).toHaveTextContent('de la Z a la A')
    expect(await axe(container)).toHaveNoViolations()
  })
})
