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

/** Ilustración decorativa de la casa: piedra, puerta verde y montes. */
function HouseIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="rural-house__art"
      viewBox="0 0 480 320"
      focusable="false"
    >
      <rect width="480" height="320" fill="#dfe9e4" />
      <circle cx="388" cy="70" r="30" fill="#f3d79a" />
      <path
        d="M0 210 70 120l50 50 70-95 90 110 60-60 70 70 70-50v175H0Z"
        fill="#9fb8a8"
      />
      <path d="m190 75 25 30-12-4-13 14-14-13-10 6Z" fill="#f4f7f5" />
      <path d="M0 235c60-25 120-30 200-18s170 8 280-22v125H0Z" fill="#5f8a5a" />
      <path d="M0 270c90-20 200-22 300-10s130 4 180-6v66H0Z" fill="#4a7146" />
      <rect x="292" y="196" width="10" height="62" fill="#6b4a2b" />
      <circle cx="297" cy="176" r="38" fill="#2f5a34" />
      <circle cx="272" cy="196" r="24" fill="#3b6b40" />
      <circle cx="322" cy="194" r="26" fill="#3b6b40" />
      <path d="M118 182h150v86H118Z" fill="#c9bba4" />
      <path
        d="M128 196h22v12h-22zm40 0h26v12h-26zm44 0h22v12h-22zm28 18h20v12h-20zm-112 22h26v12h-26zm72 8h22v12h-22zm34 12h24v10h-24zm-92 6h18v10h-18z"
        fill="#b3a387"
      />
      <rect x="236" y="138" width="16" height="30" fill="#8d7b5e" />
      <path d="M104 186 193 128l89 58Z" fill="#a8452f" />
      <path
        d="M104 186 193 128l89 58"
        fill="none"
        stroke="#7d2f1f"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <rect x="180" y="222" width="28" height="46" rx="4" fill="#2f6b3a" />
      <circle cx="202" cy="246" r="2.5" fill="#f3d79a" />
      <rect x="136" y="214" width="26" height="24" rx="3" fill="#f6edd5" />
      <rect x="226" y="214" width="26" height="24" rx="3" fill="#f6edd5" />
      <path
        d="M149 214v24m-13-12h26m77-12v24m-13-12h26"
        stroke="#8d7b5e"
        strokeWidth="2.5"
      />
    </svg>
  )
}

/** Ficha de alojamiento: conjunto, secuencia y pares nombre–valor. */
export function RuralHouse({ fixed }: ExamplePageProps) {
  const id = useId()
  return (
    <div className={`rural-house${fixed ? '' : ' rural-house--barrier'}`}>
      <header className="rural-house__header">
        <p className="rural-house__brand">
          <svg
            aria-hidden="true"
            className="rural-house__logo"
            viewBox="0 0 32 32"
            focusable="false"
          >
            <path d="M16 3c-5 0-8.5 3.4-8.5 7.6-2.6 1-4.5 3.4-4.5 6.3C3 20.8 6.2 24 10.2 24H21.8c4 0 7.2-3.2 7.2-7.1 0-2.9-1.9-5.3-4.5-6.3C24.5 6.4 21 3 16 3Z" />
            <path className="rural-house__logo-trunk" d="M14.5 18h3v11h-3z" />
          </svg>
          Casa rural El Roble
        </p>
        <nav aria-label="Principal" className="rural-house__nav">
          <a href={`#${id}-services`}>La casa</a>
          <a href={`#${id}-route`}>Cómo llegar</a>
          <a href={`#${id}-facts`}>Reservar</a>
        </nav>
      </header>
      <main className="rural-house__main">
        <div className="rural-house__hero">
          <div className="rural-house__hero-text">
            <p className="rural-house__kicker">Casa rural · Asturias</p>
            <h1>Casa El Roble, en Collera (Asturias)</h1>
            <p className="rural-house__intro">
              Una casa de piedra a diez minutos de la playa de Ribadesella, con
              vistas a los Picos de Europa.
            </p>
            <p className="rural-house__price">
              Desde <strong>140 €</strong> la noche · casa completa
            </p>
          </div>
          <HouseIllustration />
        </div>

        <div className="rural-house__body">
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
            className="rural-house__section rural-house__section--facts"
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
        </div>
      </main>
      <footer className="rural-house__footer">
        <p>Casa rural El Roble · Información de demostración</p>
      </footer>
    </div>
  )
}
