import { useId } from 'react'
import type { ExamplePageProps } from '../types'
import './class-timetable.css'
import {
  PoolArt,
  TimetableExtras,
  TimetableFacts,
  TimetableFooter,
} from './TimetableSite'

const classes = [
  { name: 'Yoga', day: 'Lunes y miércoles', time: '09:30', room: 'Sala 2' },
  { name: 'Pilates', day: 'Martes y jueves', time: '10:30', room: 'Sala 1' },
  {
    name: 'Ciclo indoor',
    day: 'Lunes a viernes',
    time: '18:00',
    room: 'Sala 3',
  },
  { name: 'Natación', day: 'Sábados', time: '11:00', room: 'Piscina' },
]

/** Horario de un polideportivo: una tabla de solo lectura no es un grid. */
export function ClassTimetable({ fixed }: ExamplePageProps) {
  const id = useId()
  // Barrera: cada celda es una parada de Tab aunque no se pueda hacer nada en ella.
  const stop = fixed ? undefined : 0

  return (
    <div className={`timetable${fixed ? '' : ' timetable--barrier'}`}>
      <header className="timetable__header">
        <div className="timetable__council">
          <p>Ayuntamiento de Las Eras · Concejalía de Deportes</p>
          <p className="timetable__open">
            <span aria-hidden="true" className="timetable__open-dot" />
            Abierto hoy de 7:00 a 23:00
          </p>
        </div>
        <p className="timetable__brand">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 32 32"
            className="timetable__logo"
          >
            <rect width="32" height="32" rx="9" />
            <path d="M6 13c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 5-2M6 20c2.5-2 5-2 7.5 0s5 2 7.5 0 5-2 5-2" />
          </svg>
          Polideportivo Las Eras
        </p>
        <nav aria-label="Principal" className="timetable__nav">
          <a href={`#${id}-main`} aria-current="page">
            Horario
          </a>
          <a href={`#${id}-main`}>Tarifas</a>
          <a href={`#${id}-main`}>Contacto</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="timetable__main">
        <div className="timetable__hero">
          <div className="timetable__hero-text">
            <p className="timetable__kicker">Temporada 2026–2027</p>
            <h1>Horario de clases</h1>
            <p className="timetable__intro">
              Todas las clases duran 50 minutos. Las plazas se reservan con un
              día de antelación.
            </p>
            <TimetableFacts />
          </div>
          <PoolArt />
        </div>
        <div className="timetable__content">
          <div className="timetable__frame">
            <table
              className="timetable__table"
              role={fixed ? undefined : 'grid'}
              data-fix="grid-role"
            >
              <caption>Clases de esta semana</caption>
              <thead>
                <tr>
                  <th scope="col">Clase</th>
                  <th scope="col">Días</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Sala</th>
                </tr>
              </thead>
              <tbody data-fix="tab-stops">
                {classes.map((item) => (
                  <tr key={item.name}>
                    <th scope="row" tabIndex={stop}>
                      {item.name}
                    </th>
                    <td tabIndex={stop}>{item.day}</td>
                    <td tabIndex={stop}>{item.time}</td>
                    <td tabIndex={stop}>{item.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="timetable__book">
            <p className="timetable__book-text">
              Plazas limitadas a 20 personas por clase. Con el abono deportivo,
              las clases están incluidas.
            </p>
            <p>
              <a className="timetable__cta" href={`#${id}-main`}>
                Reservar una clase
              </a>
            </p>
          </div>
        </div>
        <TimetableExtras main={`#${id}-main`} />
      </main>
      <TimetableFooter main={`#${id}-main`} />
    </div>
  )
}
