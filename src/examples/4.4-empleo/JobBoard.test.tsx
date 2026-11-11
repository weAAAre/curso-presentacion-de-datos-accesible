import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { JobBoard } from './JobBoard'

const dataRows = () =>
  within(screen.getByRole('table')).getAllByRole('row').slice(1)

describe('Empleo: filtros con etiqueta, foco estable y resultados comunicados', () => {
  it('con la barrera, el buscador no tiene etiqueta y el foco abandona el campo al escribir', async () => {
    const user = userEvent.setup()
    render(<JobBoard fixed={false} />)
    const search = screen.getByRole('searchbox')
    expect((search as HTMLInputElement).labels).toHaveLength(0)
    await user.type(search, 'di')
    expect(screen.getByRole('heading', { name: 'Resultados' })).toHaveFocus()
    expect(search).toHaveValue('d')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('con la barrera, sin coincidencias solo queda la cabecera de la tabla', async () => {
    const user = userEvent.setup()
    render(<JobBoard fixed={false} />)
    await user.selectOptions(screen.getByRole('combobox'), 'Remoto')
    screen.getByRole('searchbox').focus()
    await user.keyboard('z')
    expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(
      1,
    )
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('con el arreglo, el foco se queda en el campo y el número de resultados se anuncia', async () => {
    const user = userEvent.setup()
    const { container } = render(<JobBoard fixed />)
    const search = screen.getByRole('searchbox', { name: 'Puesto o empresa' })
    await user.type(search, 'diseñadora')
    expect(search).toHaveFocus()
    expect(search).toHaveValue('diseñadora')
    expect(dataRows()).toHaveLength(1)
    expect(screen.getByRole('status')).toHaveTextContent(
      'Mostrando 1 de 8 ofertas.',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Modalidad' }),
      'Remoto',
    )
    expect(screen.getByRole('combobox', { name: 'Modalidad' })).toHaveFocus()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('con el arreglo, sin coincidencias se explica, y «Quitar los filtros» recupera la lista y devuelve el foco', async () => {
    const user = userEvent.setup()
    const { container } = render(<JobBoard fixed />)
    await user.type(
      screen.getByRole('searchbox', { name: 'Puesto o empresa' }),
      'chef',
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: 'Modalidad' }),
      'Remoto',
    )
    expect(screen.getByRole('status')).toHaveTextContent(
      'No hay ofertas para «chef» en modalidad remoto.',
    )
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()

    await user.click(screen.getByRole('button', { name: 'Quitar los filtros' }))
    expect(dataRows()).toHaveLength(8)
    expect(
      screen.getByRole('searchbox', { name: 'Puesto o empresa' }),
    ).toHaveFocus()
    expect(screen.getByRole('status')).toHaveTextContent(
      'Mostrando 8 de 8 ofertas.',
    )
  })
})
