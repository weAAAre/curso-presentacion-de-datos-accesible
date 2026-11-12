import './race-site.css'

/*
 * El resto de la web de la carrera: cabecera, recorrido, servicios,
 * patrocinadores, próxima edición y pie. Nada de esto forma parte de la
 * lección; la tabla ordenable está en RaceResults.tsx.
 */

interface Anchors {
  /** Destino de los enlaces de la demostración. */
  main: string
  route: string
  next: string
}

function Logo({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      className={className}
    >
      <circle cx="16" cy="16" r="16" className="race-site__logo-disc" />
      <path
        d="M7 22c4-1 5-6 9-6s4 4 9-1M21 9l4 6"
        className="race-site__logo-line"
      />
    </svg>
  )
}

export function RaceHeader({ main, route, next }: Anchors) {
  return (
    <header className="race-site__header">
      <div className="race-site__topbar">
        <p>XXIV Carrera Popular de Villaverde · Domingo 8 de noviembre</p>
        <p className="race-site__topbar-side">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
            <circle cx="12" cy="12" r="3.5" />
          </svg>
          12 °C y nublado en la salida
        </p>
      </div>
      <div className="race-site__bar">
        <p className="race-site__brand">
          <Logo className="race-site__logo" />
          <span>
            Carrera popular
            <span className="race-site__brand-place">de Villaverde</span>
          </span>
        </p>
        <nav aria-label="Principal" className="race-site__nav">
          <a href={main}>La carrera</a>
          <a href={route}>Recorrido</a>
          <a href={main} aria-current="page">
            Clasificación
          </a>
          <a href={main}>Fotos</a>
          <a href={main}>Voluntariado</a>
        </nav>
        <a className="race-site__cta" href={next}>
          Inscripciones 2027
        </a>
      </div>
    </header>
  )
}

export function RaceCrumbs({ main }: Pick<Anchors, 'main'>) {
  return (
    <nav aria-label="Migas de pan" className="race-site__crumbs">
      <ol>
        <li>
          <a href={main}>Inicio</a>
        </li>
        <li>
          <a href={main}>Edición 2026</a>
        </li>
        <li aria-current="page">Clasificación</li>
      </ol>
    </nav>
  )
}

const podium = [
  {
    place: 1,
    name: 'Luis Ferrer',
    detail: 'Sénior · Dorsal 15',
    time: '35:58',
  },
  {
    place: 2,
    name: 'Jorge Benítez',
    detail: 'Sénior · Dorsal 87',
    time: '36:47',
  },
  {
    place: 3,
    name: 'Begoña Saiz',
    detail: 'Veterana · Dorsal 56',
    time: '37:33',
  },
]

/** Podio de la general: una lista, no otra tabla. */
export function RacePodium() {
  return (
    <section className="race-site__podium" aria-labelledby="carrera-podio">
      <h2 id="carrera-podio">Podio de la general</h2>
      <ol>
        {podium.map((runner) => (
          <li key={runner.place}>
            <span
              aria-hidden="true"
              className={`race-site__medal race-site__medal--${runner.place}`}
            >
              {runner.place}
            </span>
            <span className="race-site__podium-who">
              <span className="visually-hidden">Puesto {runner.place}: </span>
              <strong>{runner.name}</strong>
              <span>{runner.detail}</span>
            </span>
            <span className="race-site__podium-time">{runner.time}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Mapa del recorrido: hace de foto; su contenido está en el texto de al lado. */
function RouteMap() {
  return (
    <svg
      role="img"
      aria-label="Mapa del recorrido: sale de la plaza Mayor, cruza el barrio hacia el arroyo, pasa por el avituallamiento del kilómetro 5, sube la calle del Molino y termina en el parque de la Dehesa."
      viewBox="0 0 640 420"
      className="race-site__map"
    >
      <defs>
        <pattern
          id="carrera-mapa-trama"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect width="12" height="12" fill="#f1e9e1" />
          <circle cx="3" cy="3" r="0.9" fill="#e2d6ca" />
          <circle cx="9" cy="9" r="0.9" fill="#e2d6ca" />
        </pattern>
        <pattern
          id="carrera-mapa-cesped"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect width="10" height="10" fill="#cfe3b8" />
          <path d="M2 7l1-2 1 2M6 4l1-2 1 2" stroke="#b6d29a" fill="none" />
        </pattern>
        <filter
          id="carrera-mapa-sombra"
          x="-10%"
          y="-10%"
          width="120%"
          height="130%"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="3"
            floodColor="#3a1d1b"
            floodOpacity="0.28"
          />
        </filter>
        <linearGradient id="carrera-mapa-agua" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9fd0e6" />
          <stop offset="1" stopColor="#6fb3d2" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" fill="url(#carrera-mapa-trama)" />
      {/* Manzanas del barrio */}
      <g fill="#e6dace">
        <rect x="24" y="24" width="120" height="78" rx="6" />
        <rect x="164" y="24" width="96" height="78" rx="6" />
        <rect x="24" y="122" width="120" height="96" rx="6" />
        <rect x="164" y="122" width="96" height="96" rx="6" />
        <rect x="280" y="24" width="110" height="78" rx="6" />
        <rect x="280" y="122" width="110" height="60" rx="6" />
        <rect x="24" y="238" width="236" height="62" rx="6" />
        <rect x="24" y="320" width="150" height="76" rx="6" />
        <rect x="194" y="320" width="120" height="76" rx="6" />
      </g>
      {/* Parque de la Dehesa */}
      <path
        d="M420 210c40-18 120-22 196-6v192H404c-14-60-20-150 16-186Z"
        fill="url(#carrera-mapa-cesped)"
      />
      <g fill="#8fbf6a">
        <circle cx="470" cy="262" r="14" />
        <circle cx="498" cy="250" r="10" />
        <circle cx="560" cy="246" r="13" />
        <circle cx="588" cy="300" r="11" />
        <circle cx="452" cy="350" r="15" />
        <circle cx="540" cy="372" r="12" />
      </g>
      <g fill="#6a9f4c">
        <circle cx="474" cy="266" r="7" />
        <circle cx="564" cy="250" r="6" />
        <circle cx="456" cy="354" r="7" />
      </g>
      {/* Arroyo */}
      <path
        d="M410 0c-20 50 30 80 10 130s-60 70-40 120 30 100 10 170"
        fill="none"
        stroke="url(#carrera-mapa-agua)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M410 0c-20 50 30 80 10 130s-60 70-40 120 30 100 10 170"
        fill="none"
        stroke="#d6eef8"
        strokeWidth="2"
        strokeDasharray="8 14"
        opacity="0.8"
      />
      {/* Calles */}
      <g fill="none" strokeLinecap="round">
        <path
          d="M14 112h400M14 228h420M154 14v396M270 14v396M14 310h330M400 112h230"
          stroke="#d8c8b8"
          strokeWidth="14"
        />
        <path
          d="M14 112h400M14 228h420M154 14v396M270 14v396M14 310h330M400 112h230"
          stroke="#fffaf5"
          strokeWidth="10"
        />
      </g>
      {/* Recorrido */}
      <g filter="url(#carrera-mapa-sombra)">
        <path
          d="M84 168 154 168 154 112 270 112 340 112 414 112 520 112 600 150 590 200 520 214 440 228 270 228 270 310 360 330 430 330 470 300 512 296"
          fill="none"
          stroke="#fff"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M84 168 154 168 154 112 270 112 340 112 414 112 520 112 600 150 590 200 520 214 440 228 270 228 270 310 360 330 430 330 470 300 512 296"
          fill="none"
          stroke="#c4262e"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* Kilómetros */}
      <g className="race-site__map-km">
        {[
          [154, 140, '1'],
          [232, 112, '2'],
          [340, 112, '3'],
          [470, 112, '4'],
          [598, 176, '5'],
          [500, 218, '6'],
          [360, 228, '7'],
          [270, 272, '8'],
          [400, 330, '9'],
        ].map(([x, y, label]) => (
          <g key={label} transform={`translate(${x} ${y})`}>
            <circle r="10" fill="#fff" stroke="#8f1c22" strokeWidth="2" />
            <text y="4" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
      </g>
      {/* Avituallamiento */}
      <g transform="translate(612 196)">
        <circle r="13" fill="#1f6fa8" stroke="#fff" strokeWidth="3" />
        <path d="M0-7c4 5 6 8 6 10a6 6 0 0 1-12 0c0-2 2-5 6-10Z" fill="#fff" />
      </g>
      {/* Salida */}
      <g transform="translate(84 168)">
        <circle r="9" fill="#221a1b" stroke="#fff" strokeWidth="3" />
        <path d="M-2-6v-28" stroke="#221a1b" strokeWidth="3" />
        <path d="M-2-34h22l-5 7 5 7H-2Z" fill="#2f8a4a" />
      </g>
      {/* Meta */}
      <g transform="translate(512 296)">
        <circle r="9" fill="#221a1b" stroke="#fff" strokeWidth="3" />
        <path d="M0-6v-30" stroke="#221a1b" strokeWidth="3" />
        <g transform="translate(0 -36)">
          <rect
            width="24"
            height="16"
            fill="#fff"
            stroke="#221a1b"
            strokeWidth="1.5"
          />
          <path
            d="M0 0h6v4H0zM12 0h6v4h-6zM6 4h6v4H6zM18 4h6v4h-6zM0 8h6v4H0zM12 8h6v4h-6zM6 12h6v4H6zM18 12h6v4h-6z"
            fill="#221a1b"
          />
        </g>
      </g>
      {/* Nombres */}
      <g className="race-site__map-label">
        <text x="40" y="200">
          Plaza Mayor
        </text>
        <text x="476" y="388">
          Parque de la Dehesa
        </text>
        <text x="296" y="160">
          Calle del Molino
        </text>
      </g>
      {/* Norte y escala */}
      <g transform="translate(596 52)" className="race-site__map-north">
        <circle r="20" fill="#fff" opacity="0.92" />
        <path d="M0-14 6 6 0 2-6 6Z" fill="#221a1b" />
        <text y="16" textAnchor="middle">
          N
        </text>
      </g>
      <g transform="translate(24 404)" className="race-site__map-scale">
        <path d="M0 0h80" stroke="#221a1b" strokeWidth="3" />
        <path d="M0-5v10M80-5v10" stroke="#221a1b" strokeWidth="2" />
        <text x="90" y="5">
          500 m
        </text>
      </g>
    </svg>
  )
}

function Icon({ name }: { name: 'diploma' | 'camera' | 'flag' }) {
  const paths = {
    diploma: (
      <>
        <rect x="4" y="3" width="16" height="14" rx="2" />
        <path d="M8 8h8M8 12h5" />
        <circle cx="16" cy="17" r="3" />
        <path d="m14.5 19.5-1 3 2.5-1 2.5 1-1-3" />
      </>
    ),
    camera: (
      <>
        <path d="M4 8h3l2-3h6l2 3h3v11H4Z" />
        <circle cx="12" cy="13" r="3.5" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 4h12l-3 4 3 4H5" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="race-site__icon"
    >
      {paths[name]}
    </svg>
  )
}

const services = [
  {
    icon: 'diploma',
    title: 'Tu diploma',
    text: 'Con tu nombre, tu tiempo de chip y tu puesto en la general y en tu categoría. Se descarga en PDF con el número de dorsal.',
    link: 'Descargar mi diploma',
  },
  {
    icon: 'camera',
    title: 'Fotos de la carrera',
    text: 'Más de 2.000 fotos de la salida, del kilómetro 5 y de la meta, hechas por el equipo de voluntariado del club. Son gratis.',
    link: 'Buscar mis fotos',
  },
  {
    icon: 'flag',
    title: 'Reclamaciones',
    text: 'Si tu tiempo no aparece o no es correcto, escríbenos con tu dorsal antes del viernes 13 de noviembre a las 20:00.',
    link: 'Enviar una reclamación',
  },
] as const

const sponsors = [
  { name: 'Panadería Hermanos Lozano', mark: 'HL', tone: 'wheat' },
  { name: 'Fisioterapia Movimiento', mark: 'FM', tone: 'teal' },
  { name: 'Ferretería El Clavo', mark: 'EC', tone: 'steel' },
  { name: 'Farmacia de la Plaza', mark: 'FP', tone: 'green' },
  { name: 'Frutas Mari Carmen', mark: 'MC', tone: 'orange' },
  { name: 'Deportes Zancada', mark: 'DZ', tone: 'red' },
] as const

export function RaceExtras({ main, route, next }: Anchors) {
  return (
    <div className="race-site__more">
      <section
        id={route.slice(1)}
        className="race-site__route"
        aria-labelledby="carrera-recorrido"
      >
        <div className="race-site__route-text">
          <p className="race-site__eyebrow">El recorrido</p>
          <h2 id="carrera-recorrido">Diez kilómetros llanos por el barrio</h2>
          <p>
            Una sola vuelta por calles cerradas al tráfico, sin adoquines y con
            un único repecho en el kilómetro 8. Es un circuito rápido: la mitad
            de quienes terminan hacen su mejor marca aquí.
          </p>
          <dl className="race-site__points">
            <div>
              <dt>Salida · 9:30</dt>
              <dd>Plaza Mayor, con cajones por ritmo cada 5 minutos.</dd>
            </div>
            <div>
              <dt>Kilómetro 5</dt>
              <dd>Avituallamiento de agua e isotónica junto al arroyo.</dd>
            </div>
            <div>
              <dt>Kilómetro 8</dt>
              <dd>Subida de la calle del Molino: 300 metros al 3 %.</dd>
            </div>
            <div>
              <dt>Meta</dt>
              <dd>
                Parque de la Dehesa, con fruta, guardarropa y fisioterapia.
              </dd>
            </div>
          </dl>
          <p className="race-site__chips">
            <span>
              <strong>38 m</strong> de desnivel
            </span>
            <span>
              <strong>1 h 30 min</strong> de tiempo máximo
            </span>
            <span>
              <strong>Chip</strong> en el dorsal
            </span>
          </p>
        </div>
        <figure className="race-site__route-map">
          <RouteMap />
          <figcaption>
            Circuito urbano de una vuelta, medido y homologado.
          </figcaption>
        </figure>
      </section>

      <section className="race-site__after" aria-labelledby="carrera-despues">
        <h2 id="carrera-despues">Después de la carrera</h2>
        <ul className="race-site__cards">
          {services.map((service) => (
            <li key={service.title} className="race-site__card">
              <Icon name={service.icon} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href={main}>{service.link}</a>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="race-site__sponsors"
        aria-labelledby="carrera-patrocinio"
      >
        <h2 id="carrera-patrocinio">Gracias a quienes la hacen posible</h2>
        <p>
          La carrera la organiza el club con 140 personas voluntarias y el apoyo
          de los comercios del barrio.
        </p>
        <ul>
          {sponsors.map((sponsor) => (
            <li key={sponsor.name}>
              <span
                aria-hidden="true"
                className={`race-site__sponsor-mark race-site__sponsor-mark--${sponsor.tone}`}
              >
                {sponsor.mark}
              </span>
              {sponsor.name}
            </li>
          ))}
        </ul>
      </section>

      <section
        id={next.slice(1)}
        className="race-site__next"
        aria-labelledby="carrera-proxima"
      >
        <div className="race-site__next-text">
          <p className="race-site__eyebrow">XXV edición</p>
          <h2 id="carrera-proxima">Nos vemos el 14 de noviembre de 2027</h2>
          <p>
            Cumplimos veinticinco años y lo celebramos con una carrera infantil
            de 1 km, medalla conmemorativa para todo el mundo y un recorrido que
            vuelve a pasar por la plaza Mayor.
          </p>
          <p>
            Las inscripciones abren el 1 de septiembre: 12 € hasta el 31 de
            octubre y 15 € después. Socias y socios del club, gratis.
          </p>
          <a className="race-site__next-link" href={main}>
            Avisadme cuando abran
          </a>
        </div>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 220 240"
          className="race-site__medal-art"
        >
          <defs>
            <radialGradient id="carrera-medalla" cx="0.38" cy="0.35" r="0.75">
              <stop offset="0" stopColor="#ffe69a" />
              <stop offset="0.55" stopColor="#f2b705" />
              <stop offset="1" stopColor="#b9850a" />
            </radialGradient>
          </defs>
          <path d="M62 0h40l18 78H86Z" fill="#c4262e" />
          <path d="M118 0h40l-24 78h-34Z" fill="#8f1c22" />
          <path
            d="M70 0h10l20 78h-8ZM140 0h10l-24 78h-8Z"
            fill="#fff"
            opacity="0.85"
          />
          <ellipse
            cx="110"
            cy="232"
            rx="58"
            ry="6"
            fill="#000"
            opacity="0.25"
          />
          <circle cx="110" cy="152" r="74" fill="url(#carrera-medalla)" />
          <circle
            cx="110"
            cy="152"
            r="60"
            fill="none"
            stroke="#b9850a"
            strokeWidth="3"
            strokeDasharray="2 5"
          />
          <path
            d="M70 170c14-4 18-24 34-24s14 16 40-4"
            fill="none"
            stroke="#8f5d05"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text
            x="110"
            y="136"
            textAnchor="middle"
            className="race-site__medal-text"
          >
            XXV
          </text>
          <path
            d="M66 110a50 50 0 0 1 40-30"
            stroke="#fff6d6"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </section>
    </div>
  )
}

export function RaceFooter({ main, route, next }: Anchors) {
  return (
    <footer className="race-site__footer">
      <div className="race-site__footer-top">
        <div className="race-site__footer-about">
          <p className="race-site__brand race-site__brand--footer">
            <Logo className="race-site__logo" />
            Club Atletismo Villaverde
          </p>
          <p>
            Corremos juntos desde 1999. Entrenamos martes y jueves a las 19:30
            en la pista municipal, con grupos para todos los ritmos.
          </p>
        </div>
        <nav aria-label="Pie de página" className="race-site__footer-nav">
          <div>
            <h2>La carrera</h2>
            <ul>
              <li>
                <a href={route}>Recorrido</a>
              </li>
              <li>
                <a href={main}>Reglamento</a>
              </li>
              <li>
                <a href={main}>Clasificaciones anteriores</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Participa</h2>
            <ul>
              <li>
                <a href={next}>Inscripciones 2027</a>
              </li>
              <li>
                <a href={main}>Hazte voluntaria o voluntario</a>
              </li>
              <li>
                <a href={main}>Hazte socio del club</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="race-site__footer-contact">
          <h2>Contacto</h2>
          <p>
            Pista municipal de atletismo
            <br />
            Calle del Pinar, 12 · Villaverde
          </p>
          <p>carrera@atletismovillaverde.example</p>
        </div>
      </div>
      <div className="race-site__footer-legal">
        <p>
          © 2026 Club Atletismo Villaverde · Web de demostración: la carrera,
          las personas y los resultados son ficticios.
        </p>
        <nav aria-label="Legal">
          <a href={main}>Aviso legal</a>
          <a href={main}>Privacidad</a>
          <a href={main}>Accesibilidad</a>
        </nav>
      </div>
    </footer>
  )
}
