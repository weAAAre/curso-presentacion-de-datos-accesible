import { useId, useRef, useState } from 'react'
import type { ExamplePageProps } from '../types'
import './job-board.css'

const jobs = [
  [
    'Diseñadora de producto',
    'Lumen Estudio',
    'Valencia',
    'Híbrido',
    '38.000 €',
  ],
  ['Desarrollador front-end', 'Cobalto', 'Madrid', 'Remoto', '42.000 €'],
  ['Técnica de soporte', 'Nimbo', 'Sevilla', 'Presencial', '24.000 €'],
  ['Redactor técnico', 'Papiro', 'Bilbao', 'Remoto', '31.000 €'],
  ['Analista de datos', 'Cobalto', 'Madrid', 'Híbrido', '40.000 €'],
  ['Diseñador gráfico', 'Tinta Verde', 'Zaragoza', 'Presencial', '27.000 €'],
  ['Desarrolladora back-end', 'Nimbo', 'Málaga', 'Remoto', '45.000 €'],
  [
    'Responsable de accesibilidad',
    'Lumen Estudio',
    'Valencia',
    'Híbrido',
    '48.000 €',
  ],
] as const

const columns = ['Puesto', 'Empresa', 'Ciudad', 'Modalidad', 'Salario']
const modes = ['Presencial', 'Híbrido', 'Remoto']

/** Ofertas de empleo: filtros con etiqueta, resultados anunciados y vuelta atrás. */
export function JobBoard({ fixed }: ExamplePageProps) {
  const id = useId()
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('')
  const resultsRef = useRef<HTMLHeadingElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const term = query.trim().toLocaleLowerCase('es')
  const results = jobs.filter(
    ([title, company, , jobMode]) =>
      (!term ||
        title.toLocaleLowerCase('es').includes(term) ||
        company.toLocaleLowerCase('es').includes(term)) &&
      (!mode || jobMode === mode),
  )

  // Barrera: tras cada cambio, el foco salta al título de resultados.
  const afterChange = () => {
    if (!fixed) resultsRef.current?.focus()
  }

  const clear = () => {
    setQuery('')
    setMode('')
    searchRef.current?.focus()
  }

  const filters = [term && `«${query.trim()}»`, mode?.toLocaleLowerCase('es')]
    .filter(Boolean)
    .join(' en modalidad ')

  return (
    <div className={`jobs${fixed ? '' : ' jobs--barrier'}`}>
      <header className="jobs__header">
        <p className="jobs__brand">Brote Empleo</p>
        <nav aria-label="Principal" className="jobs__nav">
          <a href={`#${id}-main`}>Ofertas</a>
          <a href={`#${id}-main`}>Empresas</a>
          <a href={`#${id}-main`}>Mi currículum</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="jobs__main">
        <h1>Ofertas de empleo</h1>
        <search className="jobs__filters" data-fix="labels">
          <div className="jobs__field">
            {fixed && <label htmlFor={`${id}-q`}>Puesto o empresa</label>}
            <input
              ref={searchRef}
              id={`${id}-q`}
              type="search"
              placeholder={fixed ? undefined : 'Buscar…'}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                afterChange()
              }}
            />
          </div>
          <div className="jobs__field">
            {fixed && <label htmlFor={`${id}-mode`}>Modalidad</label>}
            <select
              id={`${id}-mode`}
              value={mode}
              onChange={(event) => {
                setMode(event.target.value)
                afterChange()
              }}
            >
              <option value="">{fixed ? 'Todas' : 'Modalidad'}</option>
              {modes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </search>

        <h2
          id={`${id}-results`}
          ref={resultsRef}
          tabIndex={-1}
          className="jobs__results-title"
          data-fix="focus"
        >
          Resultados
        </h2>
        <p
          className="jobs__count"
          role={fixed ? 'status' : undefined}
          data-fix="status"
        >
          {fixed &&
            (results.length > 0
              ? `Mostrando ${results.length} de ${jobs.length} ofertas.`
              : `No hay ofertas para ${filters}.`)}
        </p>

        <div className="jobs__results" data-fix="empty">
          {fixed && results.length === 0 ? (
            <div className="jobs__empty">
              <p>Prueba con otra palabra o con otra modalidad.</p>
              <button type="button" className="jobs__clear" onClick={clear}>
                Quitar los filtros
              </button>
            </div>
          ) : (
            <div
              className="jobs__scroll"
              role="region"
              aria-labelledby={`${id}-results`}
              tabIndex={0}
            >
              <table className="jobs__table">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((job) => (
                    <tr key={job[0]}>
                      {job.map((value, index) => (
                        <td key={columns[index]}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <footer className="jobs__footer">
        <p>Brote Empleo · Información de demostración</p>
      </footer>
    </div>
  )
}
