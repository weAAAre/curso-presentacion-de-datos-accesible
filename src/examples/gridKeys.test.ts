import { describe, expect, it } from 'vitest'
import { nextGridPosition } from './gridKeys'

const from = (row: number, column: number) => ({ row, column })
const move = (key: string, row: number, column: number, ctrl = false) =>
  nextGridPosition(key, ctrl, from(row, column), 3, 4)

describe('Teclas del patrón grid', () => {
  it('las flechas mueven una celda y se detienen en los bordes', () => {
    expect(move('ArrowRight', 0, 0)).toEqual(from(0, 1))
    expect(move('ArrowRight', 0, 3)).toEqual(from(0, 3))
    expect(move('ArrowLeft', 1, 0)).toEqual(from(1, 0))
    expect(move('ArrowDown', 2, 2)).toEqual(from(2, 2))
    expect(move('ArrowUp', 1, 2)).toEqual(from(0, 2))
  })

  it('Inicio y Fin van a los extremos de la fila; con Ctrl, del grid', () => {
    expect(move('Home', 1, 2)).toEqual(from(1, 0))
    expect(move('End', 1, 2)).toEqual(from(1, 3))
    expect(move('Home', 1, 2, true)).toEqual(from(0, 0))
    expect(move('End', 1, 2, true)).toEqual(from(2, 3))
  })

  it('ignora el resto de teclas', () => {
    expect(move('Tab', 0, 0)).toBeUndefined()
    expect(move('Enter', 0, 0)).toBeUndefined()
  })
})
