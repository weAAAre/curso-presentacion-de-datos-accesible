import type { ReactNode } from 'react'
import './timetable-site.css'

/*
 * El resto de la web del polideportivo. Nada de esto forma parte de la
 * lección; el horario está en ClassTimetable.tsx.
 *
 * Antes de la tabla solo hay contenido que no recibe el foco: la lección
 * cuenta las pulsaciones de Tab desde «Contacto» hasta «Reservar una clase».
 * Los enlaces nuevos están después, en las secciones y en el pie.
 */

/** Datos prácticos de la cabecera, como texto. */
export function TimetableFacts() {
  return (
    <ul className="timetable-site__facts">
      <li>
        <Glyph name="clock" />
        Clases de 50 minutos
      </li>
      <li>
        <Glyph name="people" />
        Hasta 20 personas por clase
      </li>
      <li>
        <Glyph name="ticket" />
        Incluidas en el abono
      </li>
    </ul>
  )
}

type GlyphName =
  | 'clock'
  | 'people'
  | 'ticket'
  | 'cap'
  | 'shoe'
  | 'bell'
  | 'phone'
  | 'pin'
  | 'bus'
  | 'access'

function Glyph({ name }: { name: GlyphName }) {
  const paths: Record<GlyphName, ReactNode> = {
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19c.5-3.5 2.6-5.5 5.5-5.5s5 2 5.5 5.5" />
        <circle cx="16.5" cy="9" r="2.4" />
        <path d="M16 13.6c2.6 0 4.2 1.9 4.6 5" />
      </>
    ),
    ticket: (
      <>
        <path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4Z" />
        <path d="M14 7v10" strokeDasharray="2 2" />
      </>
    ),
    cap: (
      <>
        <path d="M4 15c0-5 3.6-8.5 8-8.5s8 3.5 8 8.5Z" />
        <path d="M4 15h16M9 9.5c1 1.5 1 3.5 0 5.5" />
      </>
    ),
    shoe: (
      <>
        <path d="M3 16.5V9l5 1.5 3 3 7.5 1.5c1.5.3 2.5 1.3 2.5 2.5H3Z" />
        <path d="M3 19.5h18" />
      </>
    ),
    bell: (
      <>
        <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z" />
        <path d="M10 20.5a2 2 0 0 0 4 0" />
      </>
    ),
    phone: (
      <path d="M6.5 4h3l1.5 4-2 1.5a10 10 0 0 0 5.5 5.5l1.5-2 4 1.5v3A2 2 0 0 1 18 20 14 14 0 0 1 4 6a2 2 0 0 1 2.5-2Z" />
    ),
    pin: (
      <>
        <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.3" />
      </>
    ),
    bus: (
      <>
        <rect x="5" y="4" width="14" height="13" rx="2.5" />
        <path d="M5 11h14M8 20v-3M16 20v-3" />
        <circle cx="8.5" cy="14" r="0.6" />
        <circle cx="15.5" cy="14" r="0.6" />
      </>
    ),
    access: (
      <>
        <circle cx="11" cy="4.5" r="1.8" />
        <path d="M11 8v6h5l2 5" />
        <path d="M8 11a5 5 0 1 0 6.5 6.5" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="timetable-site__glyph"
    >
      {paths[name]}
    </svg>
  )
}

/** Foto de la piscina cubierta: ventanales, luz de tarde y calles. */
export function PoolArt() {
  const floats = Array.from({ length: 22 }, (_, index) => index)
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 480 300"
      className="timetable-site__pool"
    >
      <defs>
        <linearGradient id="horario-pared" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9f3f1" />
          <stop offset="1" stopColor="#cfe3e1" />
        </linearGradient>
        <linearGradient id="horario-agua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#58c0c6" />
          <stop offset="1" stopColor="#1f8a93" />
        </linearGradient>
        <linearGradient id="horario-luz" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff6dc" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff6dc" stopOpacity="0" />
        </linearGradient>
        <pattern
          id="horario-azulejo"
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <rect width="14" height="14" fill="#f4faf9" />
          <path d="M14 0v14H0" fill="none" stroke="#d6e7e5" />
        </pattern>
      </defs>
      {/* Pared con ventanales */}
      <rect width="480" height="150" fill="url(#horario-pared)" />
      {[24, 132, 240, 348].map((x) => (
        <g key={x}>
          <rect x={x} y="18" width="96" height="96" rx="4" fill="#9fd4e8" />
          <rect x={x} y="18" width="96" height="40" rx="4" fill="#bfe4f1" />
          <path
            d={`M${x + 48} 18v96M${x} 66h96`}
            stroke="#f4faf9"
            strokeWidth="5"
          />
          <circle
            cx={x + 74}
            cy="44"
            r="12"
            fill="#f6b740"
            opacity={x === 348 ? 1 : 0}
          />
        </g>
      ))}
      <rect y="114" width="480" height="36" fill="url(#horario-azulejo)" />
      {/* Haces de luz */}
      <path d="M120 18 260 300H140L40 18Z" fill="url(#horario-luz)" />
      <path d="M336 18 470 300H360L250 18Z" fill="url(#horario-luz)" />
      {/* Playa y borde */}
      <rect y="150" width="480" height="16" fill="#e2efed" />
      <rect y="164" width="480" height="6" fill="#0a6c74" />
      {/* Agua */}
      <rect y="170" width="480" height="130" fill="url(#horario-agua)" />
      <g
        fill="none"
        stroke="#bff0ef"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      >
        <path d="M20 200c12-6 24-6 36 0s24 6 36 0M150 230c12-6 24-6 36 0s24 6 36 0M300 196c12-6 24-6 36 0s24 6 36 0M80 270c12-6 24-6 36 0s24 6 36 0M340 262c12-6 24-6 36 0" />
      </g>
      {/* Líneas del fondo y reflejos de los ventanales */}
      <path
        d="M30 220h420M30 260h420M30 182h420"
        stroke="#17707a"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.45"
      />
      <g fill="#e9fbfa" opacity="0.18">
        {[24, 132, 240, 348].map((x) => (
          <path key={x} d={`M${x + 6} 174h84l10 120H${x - 4}Z`} />
        ))}
      </g>
      {/* Corcheras */}
      {[200, 240, 280].map((y) => (
        <g key={y}>
          {floats.map((index) => (
            <circle
              key={index}
              cx={index * 23 + 6}
              cy={y}
              r="5"
              fill={index % 4 < 2 ? '#ec7a5c' : '#fff'}
            />
          ))}
        </g>
      ))}
      {/* Poyetes de salida */}
      {[60, 180, 300, 420].map((x, index) => (
        <g key={x}>
          <path d={`M${x - 18} 142h36l-4 22h-28Z`} fill="#fff" />
          <path d={`M${x - 18} 142h36v5h-36Z`} fill="#0a6c74" />
          <text
            x={x}
            y="160"
            textAnchor="middle"
            className="timetable-site__pool-number"
          >
            {index + 1}
          </text>
        </g>
      ))}
      {/* Escalerilla */}
      <path
        d="M452 140v40M470 140v40M452 152h18M452 166h18"
        stroke="#9aa9aa"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function RoomArt({ kind }: { kind: 'studio' | 'court' | 'gym' }) {
  const scenes: Record<typeof kind, ReactNode> = {
    studio: (
      <>
        <rect width="320" height="200" fill="#f6efe6" />
        <rect y="140" width="320" height="60" fill="#d9b88f" />
        <path
          d="M0 152h320M0 168h320M0 186h320"
          stroke="#c9a57a"
          strokeWidth="1.5"
        />
        <rect x="24" y="24" width="112" height="96" rx="4" fill="#bfe4f1" />
        <path d="M80 24v96M24 72h112" stroke="#f6efe6" strokeWidth="5" />
        <path d="M24 24h112L180 200H70Z" fill="#fff6dc" opacity="0.4" />
        <rect
          x="170"
          y="30"
          width="126"
          height="88"
          rx="3"
          fill="#dfe9ea"
          stroke="#b8c7c8"
          strokeWidth="3"
        />
        <path
          d="M176 112l40-30 30 20 44-40"
          stroke="#fff"
          strokeWidth="3"
          fill="none"
          opacity="0.7"
        />
        <rect
          x="60"
          y="150"
          width="88"
          height="22"
          rx="4"
          fill="#0a6c74"
          transform="skewX(-25)"
        />
        <rect
          x="190"
          y="150"
          width="88"
          height="22"
          rx="4"
          fill="#ec7a5c"
          transform="skewX(-25)"
        />
        <circle cx="286" cy="132" r="16" fill="#f6b740" />
        <path
          d="M274 124c8 4 16 4 24 0"
          stroke="#d99a1e"
          strokeWidth="2"
          fill="none"
        />
      </>
    ),
    court: (
      <>
        <rect width="320" height="200" fill="#dfe9ea" />
        <path d="M0 70h320v130H0Z" fill="#3aa6ae" />
        <path d="M30 82h260l26 106H4Z" fill="#2a8f97" />
        <path
          d="M30 82h260l26 106H4ZM160 82v106M17 135h286"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
        />
        <ellipse
          cx="160"
          cy="135"
          rx="30"
          ry="12"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
        />
        <path d="M30 20h4v62h-4ZM286 20h4v62h-4Z" fill="#485d5f" />
        <rect
          x="18"
          y="20"
          width="28"
          height="20"
          rx="2"
          fill="#fff"
          stroke="#485d5f"
          strokeWidth="2"
        />
        <rect
          x="274"
          y="20"
          width="28"
          height="20"
          rx="2"
          fill="#fff"
          stroke="#485d5f"
          strokeWidth="2"
        />
        <circle
          cx="32"
          cy="46"
          r="7"
          fill="none"
          stroke="#ec7a5c"
          strokeWidth="2.5"
        />
        <circle
          cx="288"
          cy="46"
          r="7"
          fill="none"
          stroke="#ec7a5c"
          strokeWidth="2.5"
        />
        <circle cx="206" cy="150" r="9" fill="#ec7a5c" />
        <path d="M197 150h18M206 141v18" stroke="#b24f33" strokeWidth="1.5" />
        <ellipse cx="206" cy="166" rx="10" ry="3" fill="#000" opacity="0.15" />
      </>
    ),
    gym: (
      <>
        <rect width="320" height="200" fill="#e9f3f1" />
        <rect y="150" width="320" height="50" fill="#485d5f" />
        <path d="M0 150h320" stroke="#3a4b4d" strokeWidth="3" />
        <rect x="20" y="20" width="280" height="10" rx="5" fill="#cfe3e1" />
        <rect x="40" y="70" width="10" height="80" fill="#102426" />
        <rect x="100" y="70" width="10" height="80" fill="#102426" />
        <rect x="30" y="76" width="90" height="6" rx="3" fill="#9aa9aa" />
        <rect x="24" y="68" width="10" height="22" rx="2" fill="#0a6c74" />
        <rect x="116" y="68" width="10" height="22" rx="2" fill="#0a6c74" />
        <path d="M170 150l14-60h56l14 60Z" fill="#06474d" />
        <rect x="180" y="96" width="64" height="10" rx="5" fill="#3aa6ae" />
        <path
          d="M232 90l10-30"
          stroke="#102426"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <rect x="232" y="50" width="30" height="16" rx="4" fill="#f6b740" />
        <circle cx="276" cy="136" r="14" fill="#ec7a5c" />
        <circle cx="146" cy="140" r="10" fill="#f6b740" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 320 200"
      className="timetable-site__room-art"
    >
      {scenes[kind]}
    </svg>
  )
}

const prices = [
  {
    name: 'Abono deportivo',
    price: '24 €',
    unit: 'al mes',
    note: '32 € si no estás empadronado',
    perks: [
      'Todas las clases dirigidas',
      'Piscina y gimnasio sin límite',
      'Reserva con 48 horas de antelación',
    ],
    link: 'Hacerme el abono',
    featured: true,
  },
  {
    name: 'Bono de 10 clases',
    price: '38 €',
    unit: 'el bono',
    note: 'Caduca a los cuatro meses',
    perks: ['Cualquier clase dirigida', 'Compartible en la familia'],
    link: 'Comprar el bono',
    featured: false,
  },
  {
    name: 'Entrada a la piscina',
    price: '4,50 €',
    unit: 'la sesión',
    note: '3 € para menores de 16 y mayores de 65',
    perks: ['Nado libre en calles 4 a 6', 'Taquilla incluida'],
    link: 'Ver horarios de nado libre',
    featured: false,
  },
]

const rooms = [
  {
    kind: 'studio',
    title: 'Salas 1 y 2',
    text: 'Suelo de tarima, luz natural y material para yoga y pilates. Esterillas para todo el grupo.',
  },
  {
    kind: 'court',
    title: 'Pabellón cubierto',
    text: 'Pista de 40 × 20 metros para fútbol sala, baloncesto y balonmano. Gradas para 300 personas.',
  },
  {
    kind: 'gym',
    title: 'Sala 3 y gimnasio',
    text: 'Treinta bicicletas de ciclo indoor y una zona de musculación con monitor de 8:00 a 22:00.',
  },
] as const

const rules: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: 'cap',
    title: 'Gorro en la piscina',
    text: 'Es obligatorio en el agua, también en nado libre.',
  },
  {
    icon: 'shoe',
    title: 'Calzado limpio en las salas',
    text: 'Trae unas zapatillas solo para dentro, o descalzo en yoga.',
  },
  {
    icon: 'clock',
    title: 'Llega cinco minutos antes',
    text: 'Pasados diez minutos del inicio, la plaza se libera.',
  },
  {
    icon: 'bell',
    title: 'Si no puedes venir, avisa',
    text: 'Cancela hasta dos horas antes para que otra persona la aproveche.',
  },
]

export function TimetableExtras({ main }: { main: string }) {
  return (
    <div className="timetable-site__more">
      <section aria-labelledby="horario-tarifas">
        <h2 id="horario-tarifas">Tarifas de la temporada</h2>
        <p className="timetable-site__lead">
          Precios públicos aprobados por el Ayuntamiento para 2026–2027.
        </p>
        <ul className="timetable-site__prices">
          {prices.map((item) => (
            <li
              key={item.name}
              className={`timetable-site__price${item.featured ? ' timetable-site__price--featured' : ''}`}
            >
              {item.featured && (
                <p className="timetable-site__badge">El más elegido</p>
              )}
              <h3>{item.name}</h3>
              <p className="timetable-site__amount">
                <strong>{item.price}</strong> {item.unit}
              </p>
              <p className="timetable-site__price-note">{item.note}</p>
              <ul className="timetable-site__perks">
                {item.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
              <a href={main}>{item.link}</a>
            </li>
          ))}
        </ul>
        <p className="timetable-site__small">
          Familias numerosas y personas con una discapacidad igual o superior al
          33 % tienen un 50 % de descuento en todas las tarifas.
        </p>
      </section>

      <section aria-labelledby="horario-instalaciones">
        <h2 id="horario-instalaciones">Las instalaciones</h2>
        <p className="timetable-site__lead">
          Además de la piscina climatizada de 25 metros, con seis calles y el
          agua a 28 °C.
        </p>
        <ul className="timetable-site__rooms">
          {rooms.map((room) => (
            <li key={room.title} className="timetable-site__room">
              <RoomArt kind={room.kind} />
              <h3>{room.title}</h3>
              <p>{room.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="timetable-site__split">
        <section
          aria-labelledby="horario-normas"
          className="timetable-site__rules"
        >
          <h2 id="horario-normas">Normas de uso</h2>
          <ul>
            {rules.map((rule) => (
              <li key={rule.title}>
                <Glyph name={rule.icon} />
                <span>
                  <strong>{rule.title}</strong>
                  {rule.text}
                </span>
              </li>
            ))}
          </ul>
          <a href={main}>Leer el reglamento completo</a>
        </section>

        <section
          aria-labelledby="horario-llegar"
          className="timetable-site__visit"
        >
          <h2 id="horario-llegar">Cómo llegar</h2>
          <ul>
            <li>
              <Glyph name="pin" />
              <span>
                <strong>Avenida de la Constitución, 48</strong>
                Las Eras · junto al instituto
              </span>
            </li>
            <li>
              <Glyph name="clock" />
              <span>
                <strong>De lunes a viernes, de 7:00 a 23:00</strong>
                Sábados de 9:00 a 21:00 y domingos de 9:00 a 14:00
              </span>
            </li>
            <li>
              <Glyph name="bus" />
              <span>
                <strong>Autobuses 3 y 7</strong>
                Parada Polideportivo, a 50 metros de la entrada
              </span>
            </li>
            <li>
              <Glyph name="access" />
              <span>
                <strong>Accesible</strong>
                Entrada sin escalones, vestuario adaptado y grúa en la piscina
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export function TimetableFooter({ main }: { main: string }) {
  return (
    <footer className="timetable-site__footer">
      <div className="timetable-site__footer-top">
        <div>
          <p className="timetable-site__footer-brand">Polideportivo Las Eras</p>
          <p>
            Instalación deportiva municipal del Ayuntamiento de Las Eras,
            gestionada por la Concejalía de Deportes.
          </p>
        </div>
        <nav aria-label="Pie de página" className="timetable-site__footer-nav">
          <div>
            <h2>Actividades</h2>
            <ul>
              <li>
                <a href={main}>Clases dirigidas</a>
              </li>
              <li>
                <a href={main}>Escuelas deportivas</a>
              </li>
              <li>
                <a href={main}>Cursos de natación</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Ayuntamiento</h2>
            <ul>
              <li>
                <a href={main}>Sede electrónica</a>
              </li>
              <li>
                <a href={main}>Otras instalaciones</a>
              </li>
              <li>
                <a href={main}>Quejas y sugerencias</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="timetable-site__footer-contact">
          <h2>Atención al público</h2>
          <p>
            <Glyph name="phone" />
            924 000 000
          </p>
          <p>
            <Glyph name="pin" />
            Avenida de la Constitución, 48
          </p>
        </div>
      </div>
      <div className="timetable-site__footer-legal">
        <p>
          © 2026 Ayuntamiento de Las Eras · Web de demostración: el
          polideportivo y sus datos son ficticios.
        </p>
        <nav aria-label="Legal">
          <a href={main}>Aviso legal</a>
          <a href={main}>Privacidad</a>
          <a href={main}>Declaración de accesibilidad</a>
        </nav>
      </div>
    </footer>
  )
}
