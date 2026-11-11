import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { PlanComparison } from './PlanComparison'

describe('Tarifas: encabezados de fila y de columna', () => {
  it('con la barrera, solo hay encabezados de columna y las marcas no tienen texto', () => {
    render(<PlanComparison fixed={false} />)
    const table = screen.getByRole('table', {
      name: 'Tarifas de fibra y móvil',
    })
    expect(within(table).getAllByRole('columnheader')).toHaveLength(3)
    expect(within(table).queryAllByRole('rowheader')).toHaveLength(0)
    const tv = within(table)
      .getByText('Televisión')
      .closest('tr') as HTMLElement
    expect(within(tv).getAllByRole('cell')[1]).toHaveTextContent(/^$/)
  })

  it('con el arreglo, cada fila tiene encabezado y cada marca dice si está incluida', async () => {
    const { container } = render(<PlanComparison fixed />)
    const table = screen.getByRole('table', {
      name: 'Tarifas de fibra y móvil',
    })
    expect(
      within(table)
        .getAllByRole('rowheader')
        .map((header) => header.textContent),
    ).toEqual([
      'Velocidad de fibra',
      'Precio al mes',
      'Líneas móviles',
      'Datos por línea',
      'Televisión',
      'Router wifi 6',
      'Permanencia',
    ])
    const tv = within(table).getByRole('row', { name: /^Televisión/ })
    expect(
      within(tv)
        .getAllByRole('cell')
        .map((cell) => cell.textContent),
    ).toEqual(['No incluida', 'Incluida', 'Incluida'])
    expect(await axe(container)).toHaveNoViolations()
  })
})
