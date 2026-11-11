import { useId } from 'react'
import type { ExamplePageProps } from '../types'
import './rural-house.css'

const services = [
  'Wifi en toda la casa',
  'Chimenea de leña',
  'Cocina equipada',
  'Jardín con barbacoa',
  'Aparcamiento gratuito',
]

const steps = [
  'Toma la salida 334 de la autovía A-8, dirección Ribadesella.',
  'En la rotonda, sigue las indicaciones hacia Collera.',
  'Pasada la iglesia, gira a la derecha en el cruce del hórreo.',
  'La casa es la tercera a la izquierda, con la puerta verde.',
]

const facts = [
  ['Entrada', 'A partir de las 16:00'],
  ['Salida', 'Antes de las 12:00'],
  ['Capacidad', '6 personas'],
  ['Mascotas', 'Admitidas con aviso previo'],
] as const

/** Ficha de alojamiento: conjunto, secuencia y pares nombre–valor. */
export function RuralHouse({ fixed }: ExamplePageProps) {
  const id = useId()
  return (
    <div className={`rural-house${fixed ? '' : ' rural-house--barrier'}`}>
      <header className="rural-house__header">
        <p className="rural-house__brand">Casa rural El Roble</p>
        <nav aria-label="Principal" className="rural-house__nav">
          <a href={`#${id}-services`}>La casa</a>
          <a href={`#${id}-route`}>Cómo llegar</a>
          <a href={`#${id}-facts`}>Reservar</a>
        </nav>
      </header>
      <main className="rural-house__main">
        <h1>Casa El Roble, en Collera (Asturias)</h1>
        <p className="rural-house__intro">
          Una casa de piedra a diez minutos de la playa de Ribadesella, con
          vistas a los Picos de Europa.
        </p>

        <section
          id={`${id}-services`}
          aria-labelledby={`${id}-services-title`}
          className="rural-house__section"
        >
          <h2 id={`${id}-services-title`}>Servicios</h2>
          {fixed ? (
            <ul className="rural-house__services" data-fix="ul">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          ) : (
            <div className="rural-house__services" data-fix="ul">
              {services.map((service) => (
                <p key={service}>
                  <span aria-hidden="true">• </span>
                  {service}
                </p>
              ))}
            </div>
          )}
        </section>

        <section
          id={`${id}-route`}
          aria-labelledby={`${id}-route-title`}
          className="rural-house__section"
        >
          <h2 id={`${id}-route-title`}>Cómo llegar</h2>
          {fixed ? (
            <ol className="rural-house__steps" data-fix="ol">
              {steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          ) : (
            <div className="rural-house__steps" data-fix="ol">
              {steps.map((step) => (
                <div key={step} className="rural-house__step">
                  {step}
                </div>
              ))}
            </div>
          )}
        </section>

        <section
          id={`${id}-facts`}
          aria-labelledby={`${id}-facts-title`}
          className="rural-house__section"
        >
          <h2 id={`${id}-facts-title`}>Datos del alojamiento</h2>
          {fixed ? (
            <dl className="rural-house__facts" data-fix="dl">
              {facts.map(([term, value]) => (
                <div key={term} className="rural-house__fact">
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="rural-house__facts" data-fix="dl">
              <div className="rural-house__fact-column">
                {facts.map(([term]) => (
                  <p key={term} className="rural-house__term">
                    {term}
                  </p>
                ))}
              </div>
              <div className="rural-house__fact-column">
                {facts.map(([term, value]) => (
                  <p key={term}>{value}</p>
                ))}
              </div>
            </div>
          )}
          <a className="rural-house__book" href={`#${id}-facts`}>
            Consultar disponibilidad
          </a>
        </section>
      </main>
      <footer className="rural-house__footer">
        <p>Casa rural El Roble · Información de demostración</p>
      </footer>
    </div>
  )
}
