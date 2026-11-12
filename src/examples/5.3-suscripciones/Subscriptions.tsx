import { type KeyboardEvent, useEffect, useId, useRef, useState } from 'react'
import { type GridPosition, nextGridPosition } from '../gridKeys'
import type { ExamplePageProps } from '../types'
import './subscriptions.css'
import { SubsExtras, SubsFooter, SubsSummary, SubsUser } from './SubsSite'

const magazines = [
  { name: 'Cocina fácil', price: '3,50 €', renews: '1 de diciembre' },
  { name: 'Rutas en bici', price: '4,00 €', renews: '3 de diciembre' },
  { name: 'Ciencia hoy', price: '5,20 €', renews: '8 de diciembre' },
  { name: 'Huerto urbano', price: '2,90 €', renews: '12 de diciembre' },
  { name: 'Cine club', price: '4,50 €', renews: '15 de diciembre' },
  { name: 'Viajar despacio', price: '3,90 €', renews: '20 de diciembre' },
]

const columns = 4
const actionColumn = columns - 1

/** Suscripciones: un grid con una acción por fila y el foco bajo control. */
export function Subscriptions({ fixed }: ExamplePageProps) {
  const id = useId()
  const grid = useRef<HTMLTableElement>(null)
  const empty = useRef<HTMLParagraphElement>(null)
  const [items, setItems] = useState(magazines)
  const [active, setActive] = useState<GridPosition>({ row: 0, column: 0 })
  const [message, setMessage] = useState('')
  /** Celda que debe recibir el foco cuando se pinte la tabla sin la fila quitada. */
  const pendingFocus = useRef<GridPosition | 'empty'>(undefined)

  const focusCell = ({ row, column }: GridPosition) =>
    grid.current
      ?.querySelector<HTMLElement>(
        `[data-row="${row}"][data-column="${column}"]`,
      )
      ?.focus()

  // biome-ignore lint/correctness/useExhaustiveDependencies: se ejecuta al cambiar las filas
  useEffect(() => {
    const target = pendingFocus.current
    pendingFocus.current = undefined
    if (target === 'empty') empty.current?.focus()
    else if (target) focusCell(target)
  }, [items])

  const onKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-row]',
    )
    if (!cell) return
    const next = nextGridPosition(
      event.key,
      event.ctrlKey || event.metaKey,
      { row: Number(cell.dataset.row), column: Number(cell.dataset.column) },
      items.length,
      columns,
    )
    if (!next) return
    event.preventDefault()
    setActive(next)
    focusCell(next)
  }

  const cancel = (row: number) => {
    const remaining = items.filter((_, index) => index !== row)
    if (fixed) {
      // Arreglo: el foco pasa a la misma columna de la fila siguiente (o de la anterior).
      const nextRow = Math.min(row, remaining.length - 1)
      pendingFocus.current =
        remaining.length > 0 ? { row: nextRow, column: actionColumn } : 'empty'
      setActive({ row: Math.max(nextRow, 0), column: actionColumn })
      setMessage(
        `Has dado de baja «${items[row].name}». ${
          remaining.length === 1
            ? 'Queda 1 suscripción'
            : `Quedan ${remaining.length} suscripciones`
        }.`,
      )
    } else {
      setActive(({ column }) => ({
        row: Math.max(Math.min(row, remaining.length - 1), 0),
        column,
      }))
    }
    setItems(remaining)
  }

  /** Atributos de una celda del grid: solo la activa está en el orden de Tab. */
  const cell = (row: number, column: number) => ({
    tabIndex: active.row === row && active.column === column ? 0 : -1,
    'data-row': row,
    'data-column': column,
    onFocus: () => setActive({ row, column }),
  })

  return (
    <div className={`subs${fixed ? '' : ' subs--barrier'}`}>
      <header className="subs__header">
        <p className="subs__brand">
          <span aria-hidden="true" className="subs__logo" />
          Quiosco Papel
        </p>
        <nav aria-label="Principal" className="subs__nav">
          <a href={`#${id}-main`}>Revistas</a>
          <a href={`#${id}-main`} aria-current="page">
            Mis suscripciones
          </a>
          <a href={`#${id}-main`}>Ayuda</a>
        </nav>
        <SubsUser />
      </header>
      <main id={`${id}-main`} className="subs__main">
        <p className="subs__account">Mi cuenta › Suscripciones</p>
        <h1>Mis suscripciones</h1>
        <p className="subs__intro">
          Dentro de la tabla, muévete con las flechas. Puedes darte de baja
          cuando quieras.
        </p>
        <SubsSummary items={items} />
        <p
          className="subs__status"
          data-fix="announce"
          role={fixed ? 'status' : undefined}
        >
          {fixed ? message : ''}
        </p>
        {items.length > 0 ? (
          <div className="subs__frame">
            <table
              ref={grid}
              className="subs__table"
              role="grid"
              onKeyDown={onKeyDown}
            >
              <caption>Suscripciones activas</caption>
              <thead>
                <tr>
                  <th scope="col">Revista</th>
                  <th scope="col">Precio al mes</th>
                  <th scope="col">Próximo cobro</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody data-fix="focus-lost">
                {items.map((item, row) => (
                  <tr key={item.name}>
                    <th scope="row" {...cell(row, 0)}>
                      <span
                        aria-hidden="true"
                        className={`subs__cover subs__cover--${magazines.indexOf(item)}`}
                      />
                      {item.name}
                    </th>
                    <td className="subs__price" {...cell(row, 1)}>
                      {item.price}
                    </td>
                    <td {...cell(row, 2)}>{item.renews}</td>
                    {fixed ? (
                      <td data-fix="cell-focus">
                        <button
                          type="button"
                          className="subs__cancel"
                          {...cell(row, actionColumn)}
                          onClick={() => cancel(row)}
                        >
                          Dar de baja
                          <span className="visually-hidden"> {item.name}</span>
                        </button>
                      </td>
                    ) : (
                      // Barrera: la celda recibe el foco y el botón es otra parada.
                      <td data-fix="cell-focus" {...cell(row, actionColumn)}>
                        <button
                          type="button"
                          className="subs__cancel"
                          onClick={() => cancel(row)}
                        >
                          Dar de baja
                          <span className="visually-hidden"> {item.name}</span>
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p
            ref={empty}
            className="subs__empty"
            tabIndex={-1}
            data-fix="focus-lost"
          >
            No tienes suscripciones activas.
          </p>
        )}
        <p className="subs__all">
          <a href={`#${id}-main`}>Ver todas las revistas</a>
        </p>
        <SubsExtras main={`#${id}-main`} />
      </main>
      <SubsFooter main={`#${id}-main`} />
    </div>
  )
}
