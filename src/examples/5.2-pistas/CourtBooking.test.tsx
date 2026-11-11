import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { CourtBooking } from './CourtBooking'

const slot = (name: string) => screen.getByRole('button', { name })

describe('Pistas: navegación por celdas y gestión del foco', () => {
  it('con la barrera, los veinte botones son paradas de Tab y las flechas no mueven el foco', async () => {
    const user = userEvent.setup()
    render(<CourtBooking fixed={false} />)
    const grid = screen.getByRole('grid', { name: 'Pistas disponibles' })
    const buttons = within(grid).getAllByRole('button')
    expect(buttons).toHaveLength(20)
    for (const button of buttons) expect(button).not.toHaveAttribute('tabindex')
    expect(grid).not.toHaveAttribute('aria-describedby')

    buttons[0].focus()
    await user.keyboard('{ArrowRight}')
    expect(buttons[0]).toHaveFocus()
    await user.tab()
    expect(buttons[1]).toHaveFocus()
  })

  it('con el arreglo, hay una sola parada de Tab y las teclas del grid mueven el foco', async () => {
    const user = userEvent.setup()
    const { container } = render(<CourtBooking fixed />)
    const grid = screen.getByRole('grid', { name: 'Pistas disponibles' })
    expect(grid).toHaveAccessibleDescription(/muévete con las flechas/)
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1)

    screen.getByRole('link', { name: 'Torneos' }).focus()
    await user.tab()
    expect(slot('09:00, Pista 1: Libre')).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(slot('09:00, Pista 2: Ocupada')).toHaveFocus()
    await user.keyboard('{ArrowDown}{ArrowDown}')
    expect(slot('11:00, Pista 2: Libre')).toHaveFocus()
    await user.keyboard('{End}')
    expect(slot('11:00, Pista 4: Libre')).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(slot('11:00, Pista 4: Libre')).toHaveFocus()
    await user.keyboard('{Home}')
    expect(slot('11:00, Pista 1: Libre')).toHaveFocus()
    await user.keyboard('{Control>}{End}{/Control}')
    expect(slot('17:00, Pista 4: Libre')).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(slot('17:00, Pista 4: Libre')).toHaveFocus()
    await user.keyboard('{Control>}{Home}{/Control}')
    expect(slot('09:00, Pista 1: Libre')).toHaveFocus()
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('con el arreglo, Tab sale del grid y al volver el foco está donde se dejó', async () => {
    const user = userEvent.setup()
    render(<CourtBooking fixed />)
    slot('09:00, Pista 1: Libre').focus()
    await user.keyboard(
      '{ArrowDown}{ArrowDown}{ArrowDown}{ArrowRight}{ArrowRight}',
    )
    expect(slot('12:00, Pista 3: Ocupada')).toHaveFocus()
    await user.keyboard('{ArrowRight}{Enter}')
    expect(slot('12:00, Pista 4: Elegida')).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Has elegido la pista 4 a las 12:00.',
    )

    await user.tab()
    expect(screen.getByRole('link', { name: 'Ver mis reservas' })).toHaveFocus()
    await user.tab({ shift: true })
    expect(slot('12:00, Pista 4: Elegida')).toHaveFocus()
  })

  it('una hora ocupada recibe el foco, pero no se puede elegir', async () => {
    const user = userEvent.setup()
    render(<CourtBooking fixed />)
    const takenSlot = slot('09:00, Pista 2: Ocupada')
    expect(takenSlot).toHaveAttribute('aria-disabled', 'true')
    await user.click(takenSlot)
    expect(screen.getByRole('status')).toBeEmptyDOMElement()
  })
})
