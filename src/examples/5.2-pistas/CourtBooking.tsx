import { type KeyboardEvent, useId, useRef, useState } from 'react'
import { type GridPosition, nextGridPosition } from '../gridKeys'
import type { ExamplePageProps } from '../types'
import './court-booking.css'

const courts = ['Pista 1', 'Pista 2', 'Pista 3', 'Pista 4']
const hours = ['09:00', '10:00', '11:00', '12:00', '17:00']
/** Horas ya reservadas, como `fila-columna`. */
const taken = new Set(['0-1', '1-0', '1-3', '3-2', '4-0'])

/** Reserva de pistas: un grid con una sola parada de Tab y flechas. */
export function CourtBooking({ fixed }: ExamplePageProps) {
  const id = useId()
  const grid = useRef<HTMLTableElement>(null)
  const [active, setActive] = useState<GridPosition>({ row: 0, column: 0 })
  const [chosen, setChosen] = useState<string>()

  const onKeyDown = (event: KeyboardEvent<HTMLTableElement>) => {
    // Barrera: nadie ha programado las teclas que promete role="grid".
    if (!fixed) return
    const cell = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-row]',
    )
    if (!cell) return
    const next = nextGridPosition(
      event.key,
      event.ctrlKey || event.metaKey,
      { row: Number(cell.dataset.row), column: Number(cell.dataset.column) },
      hours.length,
      courts.length,
    )
    if (!next) return
    event.preventDefault()
    setActive(next)
    grid.current
      ?.querySelector<HTMLElement>(
        `[data-row="${next.row}"][data-column="${next.column}"]`,
      )
      ?.focus()
  }

  const [chosenRow, chosenColumn] = chosen?.split('-').map(Number) ?? []

  return (
    <div className={`courts${fixed ? '' : ' courts--barrier'}`}>
      <header className="courts__header">
        <p className="courts__brand">
          <span aria-hidden="true" className="courts__logo" />
          Pádel La Red
        </p>
        <nav aria-label="Principal" className="courts__nav">
          <a href={`#${id}-main`}>Reservar</a>
          <a href={`#${id}-main`}>Clases</a>
          <a href={`#${id}-main`}>Torneos</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="courts__main">
        <div className="courts__top">
          <div>
            <h1>Reservar una pista</h1>
            <p className="courts__intro">Sábado 14 de noviembre de 2026.</p>
          </div>
          <p className="courts__club">
            <span>Club La Red · Pistas cubiertas</span>
            <span>90 minutos · 32 € la pista</span>
          </p>
        </div>
        <div className="courts__card">
          <p id={`${id}-hint`} className="courts__hint" data-fix="hint">
            Elige una hora libre.
            {fixed &&
              ' Dentro de la tabla, muévete con las flechas y pulsa Enter para elegir.'}
          </p>
          <p className="courts__legend">
            <span className="courts__key courts__key--free">Libre</span>
            <span className="courts__key courts__key--taken">Ocupada</span>
            <span className="courts__key courts__key--chosen">Elegida</span>
          </p>
          <div className="courts__frame">
            <table
              ref={grid}
              className="courts__table"
              role="grid"
              aria-describedby={fixed ? `${id}-hint` : undefined}
              data-fix="arrows"
              onKeyDown={onKeyDown}
            >
              <caption>Pistas disponibles</caption>
              <thead>
                <tr>
                  <th scope="col">Hora</th>
                  {courts.map((court) => (
                    <th key={court} scope="col">
                      {court}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody data-fix="one-stop">
                {hours.map((hour, row) => (
                  <tr key={hour}>
                    <th scope="row">{hour}</th>
                    {courts.map((court, column) => {
                      const key = `${row}-${column}`
                      const isTaken = taken.has(key)
                      const state = isTaken
                        ? 'Ocupada'
                        : chosen === key
                          ? 'Elegida'
                          : 'Libre'
                      const isActive =
                        active.row === row && active.column === column
                      return (
                        <td key={court}>
                          <button
                            type="button"
                            className={`courts__slot courts__slot--${isTaken ? 'taken' : chosen === key ? 'chosen' : 'free'}`}
                            aria-label={`${hour}, ${court}: ${state}`}
                            aria-disabled={isTaken || undefined}
                            // Arreglo: solo la celda activa está en el orden de Tab.
                            tabIndex={fixed ? (isActive ? 0 : -1) : undefined}
                            data-row={row}
                            data-column={column}
                            onFocus={() => setActive({ row, column })}
                            onClick={() => {
                              if (!isTaken)
                                setChosen(chosen === key ? undefined : key)
                            }}
                          >
                            {state}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="courts__status" role="status">
            {chosen
              ? `Has elegido la ${courts[chosenColumn].toLowerCase()} a las ${hours[chosenRow]}.`
              : ''}
          </p>
        </div>
        <p className="courts__more">
          <a href={`#${id}-main`}>Ver mis reservas</a>
        </p>
      </main>
      <footer className="courts__footer">
        <p>Pádel La Red · Información de demostración</p>
      </footer>
    </div>
  )
}
