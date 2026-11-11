import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { RuralHouse } from './RuralHouse'

const section = (name: string) => screen.getByRole('region', { name })

describe('Casa rural: lista, secuencia y pares nombre–valor', () => {
  it('con la barrera, no hay listas y los datos se leen separados de sus etiquetas', () => {
    render(<RuralHouse fixed={false} />)
    expect(screen.queryAllByRole('list')).toHaveLength(0)
    expect(within(section('Servicios')).queryByRole('list')).toBeNull()
    expect(within(section('Cómo llegar')).queryByRole('list')).toBeNull()
    const facts = section('Datos del alojamiento')
    expect(within(facts).queryAllByRole('term')).toHaveLength(0)
    expect(facts.textContent).toMatch(
      /Entrada.*Salida.*Capacidad.*Mascotas.*16:00/,
    )
  })

  it('con el arreglo, cada relación tiene su estructura', async () => {
    const { container } = render(<RuralHouse fixed />)
    expect(
      within(within(section('Servicios')).getByRole('list')).getAllByRole(
        'listitem',
      ),
    ).toHaveLength(5)
    const route = within(section('Cómo llegar')).getByRole('list')
    expect(route.tagName).toBe('OL')
    expect(within(route).getAllByRole('listitem')).toHaveLength(4)
    const facts = section('Datos del alojamiento')
    const terms = within(facts).getAllByRole('term')
    expect(terms.map((term) => term.textContent)).toEqual([
      'Entrada',
      'Salida',
      'Capacidad',
      'Mascotas',
    ])
    expect(terms[1].nextElementSibling).toHaveTextContent('Antes de las 12:00')
    expect(await axe(container)).toHaveNoViolations()
  })
})
