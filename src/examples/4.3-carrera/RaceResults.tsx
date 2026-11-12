import { useId, useState } from 'react'
import type { ExamplePageProps } from '../types'
import './race-results.css'

interface Runner {
  bib: number
  name: string
  category: string
  time: string
}

const runners: Runner[] = [
  { bib: 214, name: 'Carmen Oliva', category: 'Veterana', time: '00:38:12' },
  { bib: 87, name: 'Jorge Benítez', category: 'Sénior', time: '00:36:47' },
  { bib: 342, name: 'Aitana Ruiz', category: 'Júnior', time: '00:41:05' },
  { bib: 15, name: 'Luis Ferrer', category: 'Sénior', time: '00:35:58' },
  { bib: 128, name: 'Nuria Gil', category: 'Sénior', time: '00:39:30' },
  { bib: 403, name: 'Pedro Alonso', category: 'Veterano', time: '00:44:21' },
  { bib: 56, name: 'Begoña Saiz', category: 'Veterana', time: '00:37:33' },
]

type Key = 'name' | 'category' | 'time'
type Direction = 'ascending' | 'descending'

const columns: { key: Key; label: string; describe: [string, string] }[] = [
  {
    key: 'name',
    label: 'Nombre',
    describe: ['de la A a la Z', 'de la Z a la A'],
  },
  {
    key: 'category',
    label: 'Categoría',
    describe: ['de la A a la Z', 'de la Z a la A'],
  },
  {
    key: 'time',
    label: 'Tiempo',
    describe: ['de menor a mayor', 'de mayor a menor'],
  },
]

const position = new Map(
  [...runners]
    .sort((a, b) => a.time.localeCompare(b.time))
    .map((runner, index) => [runner.bib, index + 1]),
)

/** Clasificación de una carrera: encabezados que ordenan, estado y resultado. */
export function RaceResults({ fixed }: ExamplePageProps) {
  const id = useId()
  const [sort, setSort] = useState<{ key: Key; direction: Direction }>({
    key: 'time',
    direction: 'ascending',
  })

  const sortBy = (key: Key) =>
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }))

  const rows = [...runners].sort((a, b) => {
    const order = a[sort.key].localeCompare(b[sort.key], 'es')
    return sort.direction === 'ascending' ? order : -order
  })

  const active = columns.find((column) => column.key === sort.key)
  const summary = active
    ? `Ordenada por ${active.label.toLowerCase()}, ${
        active.describe[sort.direction === 'ascending' ? 0 : 1]
      }.`
    : ''

  return (
    <div className={`race${fixed ? '' : ' race--barrier'}`}>
      <header className="race__header">
        <p className="race__brand">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 32 32"
            className="race__logo"
          >
            <circle cx="16" cy="16" r="16" />
            <path d="M7 22c4-1 5-6 9-6s4 4 9-1M21 9l4 6" />
          </svg>
          Carrera popular de Villaverde
        </p>
        <nav aria-label="Principal" className="race__nav">
          <a href={`#${id}-main`}>Clasificación</a>
          <a href={`#${id}-main`}>Fotos</a>
          <a href={`#${id}-main`}>Inscripciones 2027</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="race__main">
        <div className="race__hero">
          <p className="race__kicker">XXIV edición · Resultados oficiales</p>
          <h1>Clasificación de los 10 km</h1>
          <p className="race__intro">Domingo 8 de noviembre de 2026.</p>
          <p className="race__facts">
            <span>
              <strong>10 km</strong> urbanos
            </span>
            <span>
              <strong>Salida</strong> a las 9:30
            </span>
            <span>
              <strong>Meta</strong> en el parque de la Dehesa
            </span>
          </p>
        </div>
        <div className="race__board">
          <p
            className="race__summary"
            data-fix="announce"
            role={fixed ? 'status' : undefined}
          >
            {fixed ? summary : ''}
          </p>
          <div
            className="race__scroll"
            role="region"
            aria-labelledby={`${id}-caption`}
            tabIndex={0}
          >
            <table className="race__table">
              <caption id={`${id}-caption`}>
                Resultados de los 10 km
                {fixed && (
                  <span className="visually-hidden">
                    . Los encabezados con botón permiten ordenar.
                  </span>
                )}
              </caption>
              <thead>
                <tr>
                  <th scope="col">Puesto</th>
                  <th scope="col">Dorsal</th>
                  {columns.map((column) => {
                    const isActive = sort.key === column.key
                    const arrow = isActive
                      ? sort.direction === 'ascending'
                        ? '▲'
                        : '▼'
                      : '♢'
                    return fixed ? (
                      <th
                        key={column.key}
                        scope="col"
                        aria-sort={isActive ? sort.direction : undefined}
                        data-fix="aria-sort"
                      >
                        <button
                          type="button"
                          className="race__sort"
                          data-fix="sort-button"
                          onClick={() => sortBy(column.key)}
                        >
                          {column.label}
                          <span aria-hidden="true" className="race__arrow">
                            {arrow}
                          </span>
                        </button>
                      </th>
                    ) : (
                      <th
                        key={column.key}
                        scope="col"
                        className="race__sort race__sort--cell"
                        data-fix="aria-sort"
                        onClick={() => sortBy(column.key)}
                      >
                        <span data-fix="sort-button">{column.label}</span>
                        <span className="race__arrow">{arrow}</span>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((runner) => (
                  <tr key={runner.bib}>
                    <td>
                      <span
                        className={`race__pos race__pos--${position.get(runner.bib)}`}
                      >
                        {position.get(runner.bib)}
                      </span>
                    </td>
                    <td>
                      <span className="race__bib">{runner.bib}</span>
                    </td>
                    <td>{runner.name}</td>
                    <td>{runner.category}</td>
                    <td className="race__time">{runner.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="race__note">
            Tiempos oficiales de chip. Las reclamaciones se atienden hasta el
            viernes 13 de noviembre.
          </p>
        </div>
      </main>
      <footer className="race__footer">
        <p>Club Atletismo Villaverde · Información de demostración</p>
      </footer>
    </div>
  )
}
