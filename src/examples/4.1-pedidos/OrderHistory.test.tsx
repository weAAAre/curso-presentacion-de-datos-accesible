import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { OrderHistory } from './OrderHistory'

describe('Pedidos: tabla con título, encabezados y desplazamiento', () => {
  it('con la barrera, la tabla no tiene nombre ni encabezados', () => {
    render(<OrderHistory fixed={false} />)
    const table = screen.getByRole('table')
    expect(table).not.toHaveAccessibleName()
    expect(within(table).queryAllByRole('columnheader')).toHaveLength(0)
    expect(screen.queryByRole('region')).not.toBeInTheDocument()
  })

  it('con el arreglo, la tabla se nombra por su caption y cada columna tiene encabezado', async () => {
    const { container } = render(<OrderHistory fixed />)
    const table = screen.getByRole('table', { name: 'Tus pedidos de 2026' })
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((header) => header.textContent),
    ).toEqual(['Pedido', 'Fecha', 'Artículos', 'Importe', 'Estado'])
    expect(within(table).getAllByRole('row')).toHaveLength(6)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('con el arreglo, la zona desplazable tiene nombre y recibe el foco con Tab', async () => {
    const user = userEvent.setup()
    render(<OrderHistory fixed />)
    const region = screen.getByRole('region', { name: 'Tus pedidos de 2026' })
    for (let i = 0; i < 4; i++) await user.tab()
    expect(region).toHaveFocus()
  })
})
