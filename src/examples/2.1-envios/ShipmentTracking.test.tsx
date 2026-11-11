import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { ShipmentTracking } from './ShipmentTracking'

describe('Envíos: iconos con significado y nombre', () => {
  it('con la barrera, el estado no tiene texto y los controles con icono no tienen nombre', () => {
    render(<ShipmentTracking fixed={false} />)
    expect(screen.queryByText('Entregado')).not.toBeInTheDocument()
    for (const button of screen.getAllByRole('button'))
      expect(button).not.toHaveAccessibleName()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Icono de una caja de cartón Envío a Lugo',
      }),
    ).toBeInTheDocument()
  })

  it('con el arreglo, cada estado se lee, la caja es decorativa y cada control dice su acción', async () => {
    const { container } = render(<ShipmentTracking fixed />)
    const items = screen.getAllByRole('listitem')
    expect(within(items[2]).getByText(/Incidencia/)).toBeVisible()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Envío a Lugo' }),
    ).toBeInTheDocument()
    expect(screen.queryAllByRole('img')).toHaveLength(0)

    const copy = screen.getByRole('button', {
      name: 'Copiar número de seguimiento RY5307',
    })
    await userEvent.click(copy)
    expect(screen.getByRole('status')).toHaveTextContent('RY5307 copiado')
    expect(
      screen.getByRole('link', {
        name: 'Descargar etiqueta del envío RY4821 (PDF)',
      }),
    ).toBeInTheDocument()
    expect(await axe(container)).toHaveNoViolations()
  })
})
