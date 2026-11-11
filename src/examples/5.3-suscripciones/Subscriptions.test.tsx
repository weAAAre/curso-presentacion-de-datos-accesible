import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { Subscriptions } from './Subscriptions'

const cancel = (name: string) =>
  screen.getByRole('button', { name: `Dar de baja ${name}` })

describe('Suscripciones: acciones dentro de las celdas', () => {
  it('con la barrera, el foco llega a la celda y no al botón, y se pierde al dar de baja', async () => {
    const user = userEvent.setup()
    render(<Subscriptions fixed={false} />)
    const grid = screen.getByRole('grid', { name: 'Suscripciones activas' })
    within(grid).getByRole('rowheader', { name: 'Cocina fácil' }).focus()
    await user.keyboard('{End}')
    const actionCell = cancel('Cocina fácil').closest('td')
    expect(actionCell).toHaveFocus()
    expect(cancel('Cocina fácil')).not.toHaveAttribute('tabindex')

    await user.keyboard('{Enter}')
    expect(within(grid).getAllByRole('row')).toHaveLength(7)

    await user.tab()
    expect(cancel('Cocina fácil')).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(within(grid).getAllByRole('row')).toHaveLength(6)
    expect(document.body).toHaveFocus()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('con el arreglo, el foco va al botón, pasa a la fila siguiente y la baja se anuncia', async () => {
    const user = userEvent.setup()
    const { container } = render(<Subscriptions fixed />)
    const grid = screen.getByRole('grid', { name: 'Suscripciones activas' })
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1)

    screen.getByRole('link', { name: 'Ayuda' }).focus()
    await user.tab()
    expect(
      within(grid).getByRole('rowheader', { name: 'Cocina fácil' }),
    ).toHaveFocus()
    await user.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')
    expect(cancel('Cocina fácil')).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(cancel('Rutas en bici')).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Has dado de baja «Cocina fácil». Quedan 5 suscripciones.',
    )
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1)

    await user.keyboard('{Control>}{End}{/Control}')
    expect(cancel('Viajar despacio')).toHaveFocus()
    await user.keyboard(' ')
    expect(cancel('Cine club')).toHaveFocus()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByText('15 de diciembre')).toHaveFocus()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('con el arreglo, al quitar la última fila el foco va al mensaje', async () => {
    const user = userEvent.setup()
    const { container } = render(<Subscriptions fixed />)
    cancel('Cocina fácil').focus()
    for (let index = 0; index < 6; index++) await user.keyboard('{Enter}')
    expect(screen.queryByRole('grid')).toBeNull()
    expect(screen.getByText(/No tienes suscripciones activas/)).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Quedan 0 suscripciones.',
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
