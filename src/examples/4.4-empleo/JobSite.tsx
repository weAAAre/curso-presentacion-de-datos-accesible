import type { ReactNode } from 'react'
import './job-site.css'

/*
 * El resto del portal: cabecera, empresas, consejos, alerta y pie. Nada de
 * esto forma parte de la lección; los filtros y la tabla están en
 * JobBoard.tsx. Aquí solo hay enlaces: ningún botón ni otro campo.
 */

function Logo() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 32 32"
      className="jobs-site__logo"
    >
      <path className="jobs-site__logo-stem" d="M16 29V15" />
      <path
        className="jobs-site__logo-leaf"
        d="M16 17C16 10 11 6 4 6c0 7 5 11 12 11Z"
      />
      <path
        className="jobs-site__logo-leaf jobs-site__logo-leaf--new"
        d="M16 14c0-6 4-10 12-10 0 6-5 10-12 10Z"
      />
    </svg>
  )
}

export function JobHeader({ main }: { main: string }) {
  return (
    <header className="jobs-site__header">
      <div className="jobs-site__bar">
        <p className="jobs-site__brand">
          <Logo />
          Brote Empleo
        </p>
        <nav aria-label="Principal" className="jobs-site__nav">
          <a href={main} aria-current="page">
            Ofertas
          </a>
          <a href={main}>Empresas</a>
          <a href={main}>Salarios</a>
          <a href={main}>Consejos</a>
        </nav>
        <div className="jobs-site__account">
          <a className="jobs-site__publish" href={main}>
            Publicar una oferta
          </a>
          <p className="jobs-site__user">
            <span aria-hidden="true" className="jobs-site__avatar">
              LM
            </span>
            <span className="jobs-site__user-text">
              Lucía Márquez
              <a href={main}>Mi currículum</a>
            </span>
          </p>
        </div>
      </div>
    </header>
  )
}

export function JobCrumbs({ main }: { main: string }) {
  return (
    <nav aria-label="Migas de pan" className="jobs-site__crumbs">
      <ol>
        <li>
          <a href={main}>Inicio</a>
        </li>
        <li aria-current="page">Ofertas de empleo</li>
      </ol>
    </nav>
  )
}

/** Datos de cabecera: texto, no otra tabla. */
export function JobHighlights() {
  return (
    <ul className="jobs-site__highlights">
      <li>
        <strong>8</strong> ofertas activas esta semana
      </li>
      <li>
        <strong>36.875 €</strong> de salario medio publicado
      </li>
      <li>
        <strong>5</strong> empresas verificadas
      </li>
    </ul>
  )
}

/** Ilustración de la cabecera: un brote que crece junto al portátil. */
export function JobHeroArt() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 360 260"
      className="jobs-site__hero-art"
    >
      <defs>
        <linearGradient id="empleo-pantalla" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6fbf7" />
          <stop offset="1" stopColor="#dcefe2" />
        </linearGradient>
        <linearGradient id="empleo-maceta" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9784a" />
          <stop offset="1" stopColor="#b55a32" />
        </linearGradient>
      </defs>
      <ellipse cx="190" cy="236" rx="160" ry="12" fill="#000" opacity="0.2" />
      {/* Portátil */}
      <rect x="70" y="70" width="190" height="128" rx="10" fill="#0a2e1a" />
      <rect
        x="80"
        y="80"
        width="170"
        height="108"
        rx="4"
        fill="url(#empleo-pantalla)"
      />
      <rect x="92" y="94" width="70" height="8" rx="4" fill="#17693c" />
      <rect x="92" y="110" width="146" height="6" rx="3" fill="#b9d8c3" />
      <rect x="92" y="122" width="120" height="6" rx="3" fill="#b9d8c3" />
      <rect
        x="92"
        y="140"
        width="66"
        height="34"
        rx="6"
        fill="#fff"
        stroke="#b9d8c3"
      />
      <rect
        x="166"
        y="140"
        width="72"
        height="34"
        rx="6"
        fill="#fff"
        stroke="#b9d8c3"
      />
      <circle cx="104" cy="157" r="6" fill="#c3ec6a" />
      <rect x="114" y="153" width="36" height="4" rx="2" fill="#4b5a51" />
      <rect x="114" y="160" width="24" height="4" rx="2" fill="#b9d8c3" />
      <circle cx="178" cy="157" r="6" fill="#e3f0fb" />
      <rect x="188" y="153" width="40" height="4" rx="2" fill="#4b5a51" />
      <rect x="188" y="160" width="28" height="4" rx="2" fill="#b9d8c3" />
      <path d="M50 198h230l-14 22H64Z" fill="#c8d6cc" />
      <path d="M50 198h230v4H50Z" fill="#e8f0ea" />
      <rect x="146" y="200" width="38" height="5" rx="2.5" fill="#9fb3a5" />
      {/* Taza */}
      <path d="M38 196h26l-3 24H41Z" fill="#fff" />
      <path
        d="M64 202c10 0 10 12 0 12"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
      />
      <path
        d="M44 186c2-6-2-8 0-14M54 186c2-6-2-8 0-14"
        stroke="#dcefe2"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* Maceta con el brote */}
      <path d="M282 178h48l-6 46h-36Z" fill="url(#empleo-maceta)" />
      <rect x="278" y="170" width="56" height="12" rx="3" fill="#c86a3e" />
      <path
        d="M306 172C306 130 300 100 304 64"
        stroke="#2f7d4a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M305 120c-4-26-26-38-50-34 2 24 24 38 50 34Z" fill="#17693c" />
      <path
        d="M305 120c-12-14-30-24-50-34"
        stroke="#0c3d23"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path d="M304 94c6-26 28-36 50-30-4 24-26 34-50 30Z" fill="#7cc242" />
      <path
        d="M304 94c14-12 30-22 50-30"
        stroke="#3f7f1f"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path d="M304 66c-6-16 0-30 14-38 6 16 0 30-14 38Z" fill="#c3ec6a" />
      {/* Brillos */}
      <path
        d="M40 60l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"
        fill="#c3ec6a"
        opacity="0.9"
      />
      <circle cx="250" cy="40" r="4" fill="#c3ec6a" opacity="0.8" />
    </svg>
  )
}

const companies = [
  {
    name: 'Lumen Estudio',
    mark: 'L',
    tone: 'violet',
    sector: 'Diseño de producto digital',
    city: 'Valencia',
    jobs: 2,
    perk: 'Jornada de 35 horas',
  },
  {
    name: 'Cobalto',
    mark: 'Co',
    tone: 'blue',
    sector: 'Software para logística',
    city: 'Madrid',
    jobs: 2,
    perk: 'Teletrabajo flexible',
  },
  {
    name: 'Nimbo',
    mark: 'N',
    tone: 'sky',
    sector: 'Servicios en la nube',
    city: 'Sevilla y Málaga',
    jobs: 2,
    perk: 'Formación pagada',
  },
  {
    name: 'Papiro',
    mark: 'P',
    tone: 'sand',
    sector: 'Documentación técnica',
    city: 'Bilbao',
    jobs: 1,
    perk: 'Cuatro días a la semana',
  },
] as const

function TipArt({ kind }: { kind: 'cv' | 'call' | 'salary' }) {
  const scenes: Record<typeof kind, ReactNode> = {
    cv: (
      <>
        <rect width="320" height="160" fill="#eaf6ee" />
        <circle cx="270" cy="30" r="46" fill="#d3ecd9" />
        <rect
          x="104"
          y="22"
          width="112"
          height="146"
          rx="8"
          fill="#fff"
          transform="rotate(-6 160 95)"
        />
        <g transform="rotate(-6 160 95)">
          <circle cx="132" cy="50" r="12" fill="#c3ec6a" />
          <rect x="152" y="42" width="48" height="6" rx="3" fill="#17693c" />
          <rect x="152" y="54" width="32" height="5" rx="2.5" fill="#b9d8c3" />
          <rect x="120" y="76" width="80" height="5" rx="2.5" fill="#b9d8c3" />
          <rect x="120" y="88" width="70" height="5" rx="2.5" fill="#b9d8c3" />
          <rect x="120" y="100" width="76" height="5" rx="2.5" fill="#b9d8c3" />
          <rect x="120" y="118" width="40" height="6" rx="3" fill="#17693c" />
          <rect x="120" y="130" width="74" height="5" rx="2.5" fill="#b9d8c3" />
        </g>
        <path d="M206 112l40-40 12 12-40 40-16 4Z" fill="#0c3d23" />
        <path d="M246 72l6-6 12 12-6 6Z" fill="#d9784a" />
      </>
    ),
    call: (
      <>
        <rect width="320" height="160" fill="#e3f0fb" />
        <rect x="50" y="24" width="220" height="124" rx="12" fill="#164a78" />
        <rect x="60" y="34" width="98" height="104" rx="6" fill="#d7e8f6" />
        <rect x="162" y="34" width="98" height="104" rx="6" fill="#f6efe2" />
        <circle cx="109" cy="74" r="16" fill="#8a5a3c" />
        <path d="M81 138c2-24 14-36 28-36s26 12 28 36Z" fill="#17693c" />
        <circle cx="211" cy="74" r="16" fill="#e2b48c" />
        <path d="M196 70c0-14 30-18 30 0-6-6-22-6-30 0Z" fill="#3d2a1e" />
        <path d="M183 138c2-24 14-36 28-36s26 12 28 36Z" fill="#c3ec6a" />
        <rect
          x="140"
          y="140"
          width="40"
          height="14"
          rx="7"
          fill="#c8102e"
          opacity="0.9"
        />
      </>
    ),
    salary: (
      <>
        <rect width="320" height="160" fill="#fdf1d6" />
        <rect x="70" y="112" width="34" height="34" rx="4" fill="#e9c97a" />
        <rect x="118" y="92" width="34" height="54" rx="4" fill="#d9a93e" />
        <rect x="166" y="70" width="34" height="76" rx="4" fill="#b98317" />
        <rect x="214" y="44" width="34" height="102" rx="4" fill="#17693c" />
        <path
          d="M62 146h196"
          stroke="#6e4708"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M78 96 130 74l48-16 50-26"
          stroke="#0c3d23"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M216 26l14 6-6 14"
          stroke="#0c3d23"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 320 160"
      className="jobs-site__tip-art"
    >
      {scenes[kind]}
    </svg>
  )
}

const tips = [
  {
    kind: 'cv',
    tag: 'Currículum',
    title: 'Un currículum de una página que se lee en un minuto',
    text: 'Qué quitar, qué poner arriba y por qué los logros con cifras pesan más que la lista de tareas.',
    time: '5 min de lectura',
  },
  {
    kind: 'call',
    tag: 'Entrevistas',
    title: 'Cómo preparar una entrevista por videollamada',
    text: 'Luz, sonido y tres preguntas que conviene llevar pensadas para el final de la conversación.',
    time: '7 min de lectura',
  },
  {
    kind: 'salary',
    tag: 'Salario',
    title: 'Hablar de dinero sin miedo: la banda salarial',
    text: 'Todas nuestras ofertas publican el salario. Te contamos cómo usarlo para negociar con datos.',
    time: '6 min de lectura',
  },
] as const

export function JobExtras({ main }: { main: string }) {
  return (
    <div className="jobs-site__more">
      <section aria-labelledby="empleo-empresas">
        <div className="jobs-site__section-head">
          <h2 id="empleo-empresas">Empresas que contratan ahora</h2>
          <a href={main}>Ver todas las empresas</a>
        </div>
        <ul className="jobs-site__companies">
          {companies.map((company) => (
            <li key={company.name} className="jobs-site__company">
              <span
                aria-hidden="true"
                className={`jobs-site__company-mark jobs-site__company-mark--${company.tone}`}
              >
                {company.mark}
              </span>
              <h3>
                <a href={main}>{company.name}</a>
              </h3>
              <p>
                {company.sector}
                <br />
                {company.city}
              </p>
              <p className="jobs-site__company-meta">
                <span className="jobs-site__tag">{company.perk}</span>
                <span>
                  {company.jobs === 1
                    ? '1 oferta abierta'
                    : `${company.jobs} ofertas abiertas`}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="empleo-consejos">
        <div className="jobs-site__section-head">
          <h2 id="empleo-consejos">Consejos para tu candidatura</h2>
          <a href={main}>Ir al blog</a>
        </div>
        <ul className="jobs-site__tips">
          {tips.map((tip) => (
            <li key={tip.title} className="jobs-site__tip">
              <TipArt kind={tip.kind} />
              <div className="jobs-site__tip-body">
                <p className="jobs-site__tip-tag">{tip.tag}</p>
                <h3>
                  <a href={main}>{tip.title}</a>
                </h3>
                <p>{tip.text}</p>
                <p className="jobs-site__tip-time">{tip.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="jobs-site__alert" aria-labelledby="empleo-alerta">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 64 64"
          className="jobs-site__alert-icon"
        >
          <path d="M14 26h36v26H14Z" fill="#fff" />
          <path
            d="M14 26l18 14 18-14"
            fill="none"
            stroke="#17693c"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M32 24c0-8-4-14-12-14 0 8 4 14 12 14Z" fill="#7cc242" />
          <path d="M32 22c0-7 4-12 12-12 0 7-4 12-12 12Z" fill="#c3ec6a" />
        </svg>
        <div>
          <h2 id="empleo-alerta">
            Las ofertas nuevas, cada lunes en tu correo
          </h2>
          <p>
            Guarda tu búsqueda y te escribimos solo cuando haya algo que encaje.
            Un correo a la semana, como mucho.
          </p>
        </div>
        <a className="jobs-site__alert-link" href={main}>
          Crear una alerta de empleo
        </a>
      </section>
    </div>
  )
}

export function JobFooter({ main }: { main: string }) {
  const columns = [
    {
      title: 'Para candidatos',
      links: [
        'Buscar ofertas',
        'Alertas de empleo',
        'Guía de salarios 2026',
        'Consejos',
      ],
    },
    {
      title: 'Para empresas',
      links: ['Publicar una oferta', 'Planes y precios', 'Marca empleadora'],
    },
    {
      title: 'Brote',
      links: ['Quiénes somos', 'Prensa', 'Trabaja con nosotros'],
    },
  ]
  return (
    <footer className="jobs-site__footer">
      <div className="jobs-site__footer-top">
        <div>
          <p className="jobs-site__brand">
            <Logo />
            Brote Empleo
          </p>
          <p>
            El portal de empleo donde todas las ofertas publican salario,
            modalidad y jornada. Sin sorpresas en la entrevista.
          </p>
          <p>hola@brote-empleo.example · Valencia</p>
        </div>
        <nav aria-label="Pie de página" className="jobs-site__footer-nav">
          {columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href={main}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="jobs-site__footer-legal">
        <p>
          © 2026 Brote Empleo · Web de demostración: las ofertas y las empresas
          son ficticias.
        </p>
        <nav aria-label="Legal">
          <a href={main}>Aviso legal</a>
          <a href={main}>Privacidad</a>
          <a href={main}>Cookies</a>
          <a href={main}>Accesibilidad</a>
        </nav>
      </div>
    </footer>
  )
}
