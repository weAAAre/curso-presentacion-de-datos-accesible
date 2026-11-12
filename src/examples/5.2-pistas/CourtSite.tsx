import type { ReactNode } from 'react'
import './court-site.css'

/*
 * El resto de la app del club. Nada de esto forma parte de la lección; el
 * grid de reservas está en CourtBooking.tsx.
 *
 * Antes del grid solo hay contenido que no recibe el foco: la lección cuenta
 * que Tab va de «Torneos» al grid y del grid a «Ver mis reservas». Los
 * enlaces nuevos están después de «Ver mis reservas».
 */

type IconName =
  | 'wallet'
  | 'check'
  | 'clock'
  | 'racket'
  | 'shoe'
  | 'bulb'
  | 'calendar'
  | 'trophy'
  | 'pin'
  | 'phone'

function Icon({ name, className }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    wallet: (
      <>
        <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
        <rect x="4" y="8" width="16" height="11" rx="2" />
        <circle cx="16" cy="13.5" r="1.2" />
      </>
    ),
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
    racket: (
      <>
        <ellipse cx="10" cy="9" rx="5.5" ry="6" />
        <path d="M13.5 13.5 19 20" />
        <circle cx="8.5" cy="7.5" r="0.7" />
        <circle cx="11.5" cy="7.5" r="0.7" />
        <circle cx="10" cy="10.5" r="0.7" />
      </>
    ),
    shoe: (
      <>
        <path d="M3 16.5V9l5 1.5 3 3 7.5 1.5c1.5.3 2.5 1.3 2.5 2.5H3Z" />
        <path d="M6 19.5h1M10 19.5h1M14 19.5h1M18 19.5h1" />
      </>
    ),
    bulb: (
      <>
        <path d="M9 17h6M10 20h4" />
        <path d="M8.5 14a5.5 5.5 0 1 1 7 0c-.8.7-1 1.5-1 3h-5c0-1.5-.2-2.3-1-3Z" />
      </>
    ),
    calendar: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M9 3v4M15 3v4" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
        <path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.3" />
      </>
    ),
    phone: (
      <path d="M6.5 4h3l1.5 4-2 1.5a10 10 0 0 0 5.5 5.5l1.5-2 4 1.5v3A2 2 0 0 1 18 20 14 14 0 0 1 4 6a2 2 0 0 1 2.5-2Z" />
    ),
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className={`courts-site__icon${className ? ` ${className}` : ''}`}
    >
      {paths[name]}
    </svg>
  )
}

/** Zona de la persona usuaria en la barra: solo texto, sin foco. */
export function CourtAccount() {
  return (
    <div className="courts-site__account">
      <p className="courts-site__wallet">
        <Icon name="wallet" />
        <span>
          <span className="courts-site__wallet-label">Monedero</span> 18,50 €
        </span>
      </p>
      <p className="courts-site__user">
        <span aria-hidden="true" className="courts-site__avatar">
          DS
        </span>
        <span className="courts-site__user-text">
          Diego Serrano
          <span>Socio nº 0412</span>
        </span>
      </p>
    </div>
  )
}

/** Pasos de la reserva, ya resueltos como texto. */
export function CourtSteps() {
  return (
    <ol className="courts-site__steps">
      <li className="courts-site__step courts-site__step--done">
        <span aria-hidden="true" className="courts-site__step-mark">
          <Icon name="check" />
        </span>
        <span>
          Día <span className="visually-hidden">(hecho)</span>
          <strong>Sábado 14 de noviembre</strong>
        </span>
      </li>
      <li
        className="courts-site__step courts-site__step--now"
        aria-current="step"
      >
        <span aria-hidden="true" className="courts-site__step-mark">
          2
        </span>
        <span>
          Hora y pista
          <strong>Elige en la tabla</strong>
        </span>
      </li>
      <li className="courts-site__step">
        <span aria-hidden="true" className="courts-site__step-mark">
          3
        </span>
        <span>
          Pago
          <strong>Bono o monedero</strong>
        </span>
      </li>
    </ol>
  )
}

/** Foto del club: cuatro pistas cubiertas vistas desde la grada. */
function ClubArt() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 400 240"
      className="courts-site__club-art"
    >
      <defs>
        <linearGradient id="pistas-techo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1b33" />
          <stop offset="1" stopColor="#1b3560" />
        </linearGradient>
        <linearGradient id="pistas-suelo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a6fcc" />
          <stop offset="1" stopColor="#1a4f9a" />
        </linearGradient>
        <radialGradient id="pistas-foco" cx="0.5" cy="0" r="0.8">
          <stop offset="0" stopColor="#fffbe0" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fffbe0" stopOpacity="0" />
        </radialGradient>
        <pattern
          id="pistas-cesped"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <rect width="4" height="4" fill="url(#pistas-suelo)" />
          <path d="M0 4 4 0" stroke="#3a7fdc" strokeWidth="0.6" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="240" fill="url(#pistas-techo)" />
      {/* Cerchas del techo */}
      <path
        d="M0 30 200 6l200 24M40 26v-8M120 16V9M200 6v0M280 16V9M360 26v-8"
        stroke="#2c4a7a"
        strokeWidth="3"
        fill="none"
      />
      {[70, 160, 240, 330].map((x) => (
        <g key={x}>
          <rect x={x - 18} y="34" width="36" height="6" rx="2" fill="#fffbe0" />
          <path
            d={`M${x - 70} 40h140l60 200H${x - 130}Z`}
            fill="url(#pistas-foco)"
          />
        </g>
      ))}
      {/* Pista en perspectiva */}
      <path d="M90 92h220l80 148H10Z" fill="url(#pistas-cesped)" />
      <path
        d="M90 92h220l80 148H10ZM200 92v148M58 150h284M48 170h304"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        opacity="0.9"
      />
      {/* Red */}
      <path d="M38 164h324" stroke="#0e2340" strokeWidth="2" />
      <path d="M38 152h324v12H38Z" fill="#0e2340" opacity="0.35" />
      <path d="M38 152h324" stroke="#fff" strokeWidth="2.5" />
      <path d="M38 150v16M362 150v16" stroke="#0e2340" strokeWidth="4" />
      {/* Cristales del fondo y laterales */}
      <path d="M90 92h220V58H90Z" fill="#cfe2ff" opacity="0.22" />
      <path
        d="M90 58h220M150 58v34M250 58v34"
        stroke="#cfe2ff"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path d="M90 92 10 240V150L90 58Z" fill="#cfe2ff" opacity="0.12" />
      <path d="M310 92l80 148V150L310 58Z" fill="#cfe2ff" opacity="0.12" />
      <path
        d="M90 58 10 150M310 58l80 92"
        stroke="#cfe2ff"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Bola */}
      <ellipse cx="262" cy="206" rx="9" ry="3" fill="#000" opacity="0.25" />
      <circle cx="258" cy="180" r="7" fill="#d7f04b" />
      <path
        d="M252 176c4 2 8 2 12 0"
        stroke="#fff"
        strokeWidth="1.3"
        fill="none"
      />
      {/* Logotipo en el cristal */}
      <circle cx="200" cy="74" r="10" fill="#d7f04b" opacity="0.9" />
    </svg>
  )
}

/** Resumen lateral: va después de «Ver mis reservas» en el orden del DOM. */
export function CourtAside({ main }: { main: string }) {
  return (
    <aside className="courts-site__aside" aria-labelledby="pistas-resumen">
      <figure className="courts-site__club">
        <ClubArt />
        <figcaption>
          Pistas 1 a 4 · cubiertas, con césped de última generación
        </figcaption>
      </figure>
      <div className="courts-site__summary">
        <h2 id="pistas-resumen">Tu partido</h2>
        <dl>
          <div>
            <dt>Duración</dt>
            <dd>90 minutos</dd>
          </div>
          <div>
            <dt>Precio</dt>
            <dd>32 € la pista · 8 € por persona</dd>
          </div>
          <div>
            <dt>Tu bono</dt>
            <dd>
              Te quedan <strong>3 de 10</strong> partidos
            </dd>
          </div>
        </dl>
        <p className="courts-site__meter" aria-hidden="true">
          <span />
        </p>
        <p className="courts-site__notice">
          <Icon name="clock" />
          Cancelación gratis hasta 24 horas antes.
        </p>
        <a href={main}>Recargar el monedero</a>
      </div>
    </aside>
  )
}

const rules: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'calendar',
    title: 'Hasta dos reservas activas',
    text: 'Puedes reservar con siete días de antelación. Los socios, con nueve.',
  },
  {
    icon: 'clock',
    title: 'Llega diez minutos antes',
    text: 'La pista se entrega a la hora en punto y se deja libre a los 90 minutos.',
  },
  {
    icon: 'shoe',
    title: 'Zapatillas de pádel',
    text: 'Con suela de espiga o mixta. Las de running estropean el césped.',
  },
  {
    icon: 'bulb',
    title: 'Luz incluida',
    text: 'A partir de las 18:00 las luces se encienden solas con tu reserva.',
  },
]

const lessons = [
  {
    title: 'Iniciación',
    when: 'Martes y jueves, 19:00',
    coach: 'Con Irene Prados',
    price: '45 € al mes',
    state: 'free',
    stateText: '4 plazas libres',
    link: 'Apuntarme a Iniciación',
  },
  {
    title: 'Perfeccionamiento',
    when: 'Lunes y miércoles, 20:30',
    coach: 'Con Marcos Vidal',
    price: '50 € al mes',
    state: 'few',
    stateText: 'Queda 1 plaza',
    link: 'Apuntarme a Perfeccionamiento',
  },
  {
    title: 'Escuela infantil',
    when: 'Sábados, 10:00',
    coach: 'De 6 a 12 años',
    price: '35 € al mes',
    state: 'full',
    stateText: 'Completa',
    link: 'Avisarme si queda una plaza',
  },
] as const

export function CourtExtras({ main }: { main: string }) {
  return (
    <div className="courts-site__more">
      <section className="courts-site__rules" aria-labelledby="pistas-normas">
        <h2 id="pistas-normas">Normas de reserva</h2>
        <ul>
          {rules.map((rule) => (
            <li key={rule.title}>
              <Icon name={rule.icon} className="courts-site__icon--tile" />
              <span>
                <strong>{rule.title}</strong>
                {rule.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pistas-clases">
        <h2 id="pistas-clases">Clases de esta temporada</h2>
        <ul className="courts-site__lessons">
          {lessons.map((lesson) => (
            <li key={lesson.title} className="courts-site__lesson">
              <p
                className={`courts-site__state courts-site__state--${lesson.state}`}
              >
                {lesson.stateText}
              </p>
              <h3>{lesson.title}</h3>
              <p className="courts-site__lesson-when">
                <Icon name="racket" />
                {lesson.when}
              </p>
              <p>{lesson.coach}</p>
              <p className="courts-site__lesson-price">{lesson.price}</p>
              <a href={main}>{lesson.link}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="courts-site__cup" aria-labelledby="pistas-torneo">
        <Icon name="trophy" className="courts-site__cup-icon" />
        <div className="courts-site__cup-text">
          <p className="courts-site__eyebrow">19 y 20 de diciembre</p>
          <h2 id="pistas-torneo">Torneo de Navidad de La Red</h2>
          <p>
            Parejas mixtas en tres categorías, con cuadro de consolación para
            que nadie juegue un solo partido. 40 € por pareja, con camiseta y
            chocolate con churros el domingo.
          </p>
        </div>
        <a className="courts-site__cup-link" href={main}>
          Inscribir a mi pareja
        </a>
      </section>
    </div>
  )
}

export function CourtFooter({ main }: { main: string }) {
  return (
    <footer className="courts-site__footer">
      <div className="courts-site__footer-top">
        <div>
          <p className="courts-site__footer-brand">
            <span aria-hidden="true" className="courts__logo" />
            Pádel La Red
          </p>
          <p className="courts-site__footer-line">
            <Icon name="pin" />
            Camino del Soto, 3 · Polígono La Vega
          </p>
          <p className="courts-site__footer-line">
            <Icon name="clock" />
            Todos los días de 8:00 a 23:30
          </p>
          <p className="courts-site__footer-line">
            <Icon name="phone" />
            611 000 000 · también por WhatsApp
          </p>
        </div>
        <nav aria-label="Pie de página" className="courts-site__footer-nav">
          <div>
            <h2>Tu cuenta</h2>
            <ul>
              <li>
                <a href={main}>Mi perfil</a>
              </li>
              <li>
                <a href={main}>Bonos y monedero</a>
              </li>
              <li>
                <a href={main}>Historial de partidos</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>El club</h2>
            <ul>
              <li>
                <a href={main}>Hazte socio</a>
              </li>
              <li>
                <a href={main}>Normas del club</a>
              </li>
              <li>
                <a href={main}>Preguntas frecuentes</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="courts-site__footer-legal">
        <p>
          © 2026 Pádel La Red · Web de demostración: el club, las pistas y las
          reservas son ficticios.
        </p>
        <nav aria-label="Legal">
          <a href={main}>Condiciones</a>
          <a href={main}>Privacidad</a>
          <a href={main}>Accesibilidad</a>
        </nav>
      </div>
    </footer>
  )
}
