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

/** Ilustración decorativa de la casa: piedra, puerta verde y montes al atardecer. */
function HouseIllustration() {
  return (
    <svg
      aria-hidden="true"
      className="rural-house__art"
      viewBox="0 0 480 320"
      focusable="false"
    >
      <defs>
        <linearGradient id="rh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcd3e0" />
          <stop offset="0.65" stopColor="#f2e3c6" />
          <stop offset="1" stopColor="#f6d7a7" />
        </linearGradient>
        <linearGradient id="rh-peak" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fa6ad" />
          <stop offset="1" stopColor="#a9b9a6" />
        </linearGradient>
        <linearGradient id="rh-meadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7aa05f" />
          <stop offset="1" stopColor="#4f7a43" />
        </linearGradient>
        <linearGradient id="rh-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d8cab0" />
          <stop offset="1" stopColor="#bfae90" />
        </linearGradient>
        <radialGradient id="rh-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff4d6" />
          <stop offset="0.45" stopColor="#f8dc9c" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f8dc9c" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="rh-stone"
          width="34"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 9h34M17 0v9M5 9v9M28 9v9"
            stroke="#a8977a"
            strokeWidth="1.4"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="480" height="320" fill="url(#rh-sky)" />
      <circle cx="378" cy="92" r="70" fill="url(#rh-sun)" />
      <circle cx="378" cy="92" r="22" fill="#fff6e0" />
      <path
        d="M0 196 62 122l34 30 52-74 40 44 30-36 66 82 46-40 56 52 46-34 48 40v154H0Z"
        fill="url(#rh-peak)"
      />
      <path
        d="m148 78 18 22-9-3-9 10-10-9-9 5Zm118 48 14 17-8-2-7 7-6-6-7 3Z"
        fill="#f4f7f5"
      />
      <path
        d="M0 214c50-22 110-30 180-20s170 10 300-24v150H0Z"
        fill="#86a876"
        opacity="0.75"
      />
      <path
        d="M0 238c60-25 120-30 200-18s170 8 280-22v122H0Z"
        fill="url(#rh-meadow)"
      />
      <path d="M0 278c90-20 200-22 300-10s130 4 180-6v58H0Z" fill="#3f6638" />
      <ellipse
        cx="196"
        cy="270"
        rx="118"
        ry="9"
        fill="#2e4d2a"
        opacity="0.35"
      />
      <rect x="318" y="196" width="9" height="66" rx="2" fill="#5b3d22" />
      <ellipse cx="322" cy="264" rx="34" ry="6" fill="#2e4d2a" opacity="0.4" />
      <circle cx="323" cy="176" r="36" fill="#2f5a34" />
      <circle cx="300" cy="196" r="24" fill="#2a5130" />
      <circle cx="346" cy="194" r="25" fill="#3b6b40" />
      <circle cx="334" cy="164" r="16" fill="#4c7d4a" />
      <path d="M118 184h150v84H118Z" fill="url(#rh-wall)" />
      <path d="M118 184h150v84H118Z" fill="url(#rh-stone)" opacity="0.8" />
      <path d="M118 184h150v10H118Z" fill="#6c5a40" opacity="0.25" />
      <rect x="234" y="132" width="16" height="34" fill="#8d7b5e" />
      <rect x="231" y="128" width="22" height="7" rx="1.5" fill="#6f5f45" />
      <path d="M100 188 193 126l93 62Z" fill="#a8452f" />
      <path d="M193 126l93 62h-24l-69-46Z" fill="#8c3825" />
      <path
        d="M100 188 193 126l93 62"
        fill="none"
        stroke="#6e2a1b"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M128 180h132M140 172h108M152 164h84"
        stroke="#7d2f1f"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <rect x="178" y="220" width="30" height="48" rx="4" fill="#2f6b3a" />
      <path d="M182 226h22v18h-22Z" fill="#285c32" />
      <circle cx="202" cy="246" r="2.5" fill="#f3d79a" />
      <rect x="174" y="266" width="38" height="5" rx="1" fill="#8d7b5e" />
      <rect x="134" y="212" width="28" height="26" rx="3" fill="#f7d58c" />
      <rect x="226" y="212" width="28" height="26" rx="3" fill="#f7d58c" />
      <path
        d="M134 225h28M148 212v26M226 225h28M240 212v26"
        stroke="#7a5a2e"
        strokeWidth="2.5"
      />
      <path
        d="M130 210h36M222 210h36"
        stroke="#6f5f45"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M131 240h34M223 240h34"
        stroke="#5b3d22"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M134 240c4-7 9-7 12 0 3-7 9-7 12 0m68 0c4-7 9-7 12 0 3-7 9-7 12 0"
        fill="#c84a6a"
      />
      <path
        d="M150 268c18-10 46-12 60 0"
        fill="none"
        stroke="#c9b48e"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M40 300c6-14 12-14 16 0m340-6c5-12 10-12 14 0m-300 14c4-10 8-10 11 0"
        stroke="#2c4a28"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Escenas decorativas de la galería: salón, dormitorio y hórreo. */
function LivingRoomArt() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 220"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <rect width="320" height="220" fill="#e9dcc4" />
      <rect y="150" width="320" height="70" fill="#a9825a" />
      <path
        d="M0 162h320M0 180h320M0 200h320"
        stroke="#946f4a"
        strokeWidth="2"
      />
      <path d="M0 22h320" stroke="#6b4a2b" strokeWidth="12" />
      <path
        d="M60 22v128M260 22v128"
        stroke="#7a5634"
        strokeWidth="8"
        opacity="0.5"
      />
      <path d="M118 150V70h84v80Z" fill="#b9a789" />
      <path d="M110 70h100v10H110Z" fill="#6b4a2b" />
      <path d="M134 150v-48a26 26 0 0 1 52 0v48Z" fill="#2b231b" />
      <path d="M146 150c0-16 6-24 14-36 6 12 14 20 14 36Z" fill="#f2a541" />
      <path d="M152 150c0-10 4-14 8-22 4 8 8 12 8 22Z" fill="#fde3a0" />
      <ellipse cx="160" cy="158" rx="70" ry="6" fill="#f2a541" opacity="0.25" />
      <path d="M220 150v-36h56v36" fill="#7a3e2a" />
      <rect x="214" y="104" width="68" height="16" rx="8" fill="#93503a" />
      <rect x="226" y="122" width="22" height="12" rx="4" fill="#e9d6b5" />
      <path d="M30 150v-46h40v46" fill="#5d7a5a" />
      <circle cx="50" cy="84" r="16" fill="#4a7146" />
      <rect
        x="236"
        y="40"
        width="44"
        height="34"
        rx="2"
        fill="#bcd3e0"
        stroke="#6b4a2b"
        strokeWidth="4"
      />
    </svg>
  )
}

function BedroomArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 220" focusable="false">
      <rect width="320" height="220" fill="#eef0e6" />
      <path d="M0 0h320L250 60H70Z" fill="#d7d2c2" />
      <path
        d="M70 60h180M110 60 70 0m140 60 40-60"
        stroke="#8a6a46"
        strokeWidth="6"
      />
      <rect y="160" width="320" height="60" fill="#b58e62" />
      <rect
        x="196"
        y="78"
        width="60"
        height="50"
        rx="3"
        fill="#bcd3e0"
        stroke="#fff"
        strokeWidth="5"
      />
      <path d="M196 103h60M226 78v50" stroke="#fff" strokeWidth="3" />
      <path d="M200 128c10-20 30-26 52-10v10Z" fill="#7da36a" />
      <rect x="44" y="96" width="140" height="22" rx="4" fill="#6b4a2b" />
      <rect x="40" y="128" width="170" height="40" rx="6" fill="#f7f3ea" />
      <rect x="40" y="140" width="170" height="28" rx="4" fill="#2c4a32" />
      <path
        d="M48 148h154M48 158h154"
        stroke="#c98a1b"
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <rect x="54" y="116" width="44" height="18" rx="8" fill="#fff" />
      <rect x="106" y="116" width="44" height="18" rx="8" fill="#fff" />
      <rect x="220" y="140" width="34" height="30" rx="3" fill="#8a6a46" />
      <path d="M230 140v-14h14v14" fill="#f3d79a" />
      <path d="M226 126h22l-4-14h-14Z" fill="#f6edd5" />
    </svg>
  )
}

function GranaryArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 220" focusable="false">
      <rect width="320" height="220" fill="#cfe0e3" />
      <path d="M0 120 70 70l40 26 60-44 70 52 80-34v150H0Z" fill="#9fb8a8" />
      <path d="M0 150c80-20 180-22 320-6v76H0Z" fill="#6f9a5c" />
      <path d="M0 186c90-12 200-12 320 0v34H0Z" fill="#4a7146" />
      <path
        d="M118 182v-38m84 38v-38m-84 0h84"
        stroke="#8d7b5e"
        strokeWidth="10"
      />
      <rect x="110" y="128" width="100" height="10" rx="2" fill="#b3a387" />
      <rect x="96" y="80" width="128" height="50" fill="#8a5a33" />
      <path
        d="M96 92h128M96 104h128M96 116h128"
        stroke="#6b4426"
        strokeWidth="2"
      />
      <path d="M80 82 160 40l80 42Z" fill="#a8452f" />
      <path
        d="M80 82 160 40l80 42"
        fill="none"
        stroke="#7d2f1f"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <rect x="148" y="96" width="24" height="34" fill="#5b3d22" />
      <path d="M250 186c4-30 10-40 18-46 8 6 14 16 18 46Z" fill="#2f5a34" />
      <path d="M30 196c6-18 18-18 24 0" fill="#3b6b40" />
    </svg>
  )
}

/** Ficha de alojamiento: conjunto, secuencia y pares nombre–valor. */
export function RuralHouse({ fixed }: ExamplePageProps) {
  const id = useId()
  return (
    <div className={`rural-house${fixed ? '' : ' rural-house--barrier'}`}>
      <div className="rural-house__topbar">
        <p>Reservas: 985 000 318 · de 10:00 a 20:00</p>
        <p>Vivienda vacacional VV-1287-AS</p>
      </div>
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
          <a href={`#${id}-gallery`}>Fotos</a>
          <a href={`#${id}-reviews`}>Opiniones</a>
          <a href={`#${id}-route`}>Cómo llegar</a>
          <a className="rural-house__nav-cta" href={`#${id}-facts`}>
            Reservar
          </a>
        </nav>
      </header>
      <main className="rural-house__main">
        <div className="rural-house__hero">
          <div className="rural-house__hero-text">
            <nav aria-label="Migas de pan" className="rural-house__crumbs">
              <a href={`#${id}-services`}>Inicio</a>
              <span aria-hidden="true">›</span>
              <span>La casa</span>
            </nav>
            <p className="rural-house__kicker">Casa rural · Asturias</p>
            <h1>Casa El Roble, en Collera (Asturias)</h1>
            <p className="rural-house__intro">
              Una casa de piedra a diez minutos de la playa de Ribadesella, con
              vistas a los Picos de Europa.
            </p>
            <p className="rural-house__price">
              Desde <strong>140 €</strong> la noche · casa completa
            </p>
            <p className="rural-house__rating">
              <span aria-hidden="true" className="rural-house__stars">
                ★★★★★
              </span>
              4,9 de 5 · 38 opiniones de huéspedes
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

        <section
          id={`${id}-gallery`}
          aria-labelledby={`${id}-gallery-title`}
          className="rural-house__gallery"
        >
          <div className="rural-house__gallery-intro">
            <h2 id={`${id}-gallery-title`}>La casa por dentro</h2>
            <p>
              Fue la cuadra y el pajar de la familia hasta 1990. La
              rehabilitamos con la piedra y las vigas de castaño de siempre, y
              tres dormitorios que miran al prado.
            </p>
          </div>
          <figure className="rural-house__photo rural-house__photo--wide">
            <LivingRoomArt />
            <figcaption>
              El salón, con la chimenea de leña encendida desde octubre.
            </figcaption>
          </figure>
          <figure className="rural-house__photo">
            <BedroomArt />
            <figcaption>Dormitorio principal, bajo la cubierta.</figcaption>
          </figure>
          <figure className="rural-house__photo">
            <GranaryArt />
            <figcaption>El hórreo de 1874, en el prado de la casa.</figcaption>
          </figure>
        </section>

        <div className="rural-house__trust">
          <section
            id={`${id}-reviews`}
            aria-labelledby={`${id}-reviews-title`}
            className="rural-house__review"
          >
            <h2 id={`${id}-reviews-title`}>Opiniones</h2>
            <p className="rural-house__score">
              <strong>4,9</strong> de 5, según 38 estancias verificadas
            </p>
            <figure>
              <blockquote>
                <p className="rural-house__quote-text">
                  Llegamos de noche y con lluvia, y Covadonga nos había dejado
                  la chimenea encendida y una tortilla en la cocina. Los niños
                  no querían salir del hórreo. Volveremos en primavera.
                </p>
              </blockquote>
              <figcaption>
                Irene, de Valladolid · estancia de 4 noches en octubre de 2026
              </figcaption>
            </figure>
          </section>

          <section
            aria-labelledby={`${id}-hosts-title`}
            className="rural-house__hosts"
          >
            <h2 id={`${id}-hosts-title`}>Tus anfitriones</h2>
            <p className="rural-house__host">
              <span aria-hidden="true" className="rural-house__host-avatar">
                CM
              </span>
              <span>
                <strong>Covadonga y Manuel</strong>
                <span>Viven en la casa de al lado desde 1987</span>
              </span>
            </p>
            <p>
              Te recibimos en persona, te contamos qué ruta hacer según el
              tiempo y dónde comer el mejor cachopo de la comarca. Si necesitas
              algo, estamos a un grito por encima del muro.
            </p>
            <p>
              Respondemos en menos de 2 horas, por teléfono o en{' '}
              <a href={`#${id}-facts`}>el formulario de reserva</a>.
            </p>
          </section>
        </div>
      </main>
      <footer className="rural-house__footer">
        <div className="rural-house__footer-grid">
          <div>
            <p className="rural-house__footer-brand">Casa rural El Roble</p>
            <address>
              Barrio de La Llera, 14
              <br />
              33569 Collera, Ribadesella (Asturias)
              <br />
              985 000 318 · hola@casaelroble.es
            </address>
          </div>
          <nav
            aria-labelledby={`${id}-foot-house`}
            className="rural-house__footer-links"
          >
            <p id={`${id}-foot-house`} className="rural-house__footer-title">
              La casa
            </p>
            <a href={`#${id}-gallery`}>Fotos</a>
            <a href={`#${id}-reviews`}>Opiniones</a>
            <a href={`#${id}-route`}>Cómo llegar</a>
            <a href={`#${id}-facts`}>Tarifas y condiciones</a>
          </nav>
          <div>
            <p className="rural-house__footer-title">Temporada</p>
            <p>
              Abierto todo el año. En julio y agosto, estancia mínima de 5
              noches.
            </p>
          </div>
        </div>
        <div className="rural-house__legal">
          <p>© 2026 Casa rural El Roble · Información de demostración</p>
          <nav aria-label="Legal" className="rural-house__footer-legal">
            <a href={`#${id}-facts`}>Aviso legal</a>
            <a href={`#${id}-facts`}>Privacidad</a>
            <a href={`#${id}-facts`}>Cookies</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
