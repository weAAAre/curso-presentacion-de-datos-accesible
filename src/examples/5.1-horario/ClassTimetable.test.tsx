import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { ClassTimetable } from './ClassTimetable'

describe('Horario: una tabla de solo lectura no es un grid', () => {
  it('con la barrera, se anuncia como grid y cada celda es una parada de Tab', async () => {
    const user = userEvent.setup()
    render(<ClassTimetable fixed={false} />)
    const grid = screen.getByRole('grid', { name: 'Clases de esta semana' })
    expect(grid.querySelectorAll('tbody [tabindex="0"]')).toHaveLength(16)

    screen.getByRole('link', { name: 'Contacto' }).focus()
    await user.tab()
    expect(within(grid).getByRole('rowheader', { name: 'Yoga' })).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(within(grid).getByRole('rowheader', { name: 'Yoga' })).toHaveFocus()
  })

  it('con el arreglo, es una tabla sin paradas de foco y Tab llega al enlace', async () => {
    const user = userEvent.setup()
    const { container } = render(<ClassTimetable fixed />)
    expect(screen.queryByRole('grid')).toBeNull()
    const table = screen.getByRole('table', { name: 'Clases de esta semana' })
    expect(table.querySelectorAll('[tabindex]')).toHaveLength(0)
    expect(within(table).getAllByRole('columnheader')).toHaveLength(4)
    expect(within(table).getAllByRole('rowheader')).toHaveLength(4)

    screen.getByRole('link', { name: 'Contacto' }).focus()
    await user.tab()
    expect(
      screen.getByRole('link', { name: 'Reservar una clase' }),
    ).toHaveFocus()
    expect(await axe(container)).toHaveNoViolations()
  })
})
