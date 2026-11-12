import { useId, useState } from 'react'
import type { ExamplePageProps } from '../types'
import './course-catalog.css'

interface Course {
  slug: string
  title: string
  meta: string
  summary: string
  featured?: boolean
}

/** En el código, el destacado va primero; la barrera lo pone el último. */
const courses: Course[] = [
  {
    slug: 'excel',
    title: 'Excel desde cero',
    meta: '12 horas · En línea',
    summary: 'Fórmulas, tablas dinámicas y gráficos para el día a día.',
    featured: true,
  },
  {
    slug: 'fotografia',
    title: 'Fotografía con el móvil',
    meta: '8 horas · Presencial',
    summary: 'Luz, encuadre y edición básica sin cámara profesional.',
  },
  {
    slug: 'ingles',
    title: 'Inglés para viajar',
    meta: '20 horas · En línea',
    summary: 'Frases útiles para el aeropuerto, el hotel y el restaurante.',
  },
  {
    slug: 'huerto',
    title: 'Huerto urbano',
    meta: '6 horas · Presencial',
    summary: 'Cultivar en el balcón: semilleros, riego y temporadas.',
  },
]

/** Sin arreglo, el destacado se escribe al final y el CSS lo sube con `order`. */
const barrierOrder = [...courses.slice(1), courses[0]]

/** Portadas decorativas de cada curso, dibujadas como fotos de la clase. */
function Cover({ slug }: { slug: string }) {
  const common = {
    'aria-hidden': true,
    focusable: 'false' as const,
    viewBox: '0 0 320 140',
    preserveAspectRatio: 'xMidYMid slice',
    className: `card__cover card__cover--${slug}`,
  }
  if (slug === 'excel')
    return (
      <svg {...common}>
        <rect width="320" height="140" fill="#e3f2e8" />
        <path
          d="M0 28h320M0 56h320M0 84h320M0 112h320M64 0v140M128 0v140M192 0v140M256 0v140"
          stroke="#b9dcc4"
        />
        <rect x="150" y="18" width="150" height="104" rx="8" fill="#fff" />
        <rect
          x="150"
          y="18"
          width="150"
          height="104"
          rx="8"
          fill="none"
          stroke="#2f7d4f"
          strokeWidth="2"
        />
        <path d="M166 106h120" stroke="#9cc2a8" strokeWidth="2" />
        <rect x="174" y="72" width="18" height="34" rx="2" fill="#7fb592" />
        <rect x="202" y="54" width="18" height="52" rx="2" fill="#4f9a6a" />
        <rect x="230" y="62" width="18" height="44" rx="2" fill="#7fb592" />
        <rect x="258" y="36" width="18" height="70" rx="2" fill="#2f7d4f" />
        <path
          d="m176 66 28-18 28 8 30-24"
          fill="none"
          stroke="#c4323f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="24"
          y="36"
          width="104"
          height="22"
          rx="4"
          fill="#fff"
          stroke="#2f7d4f"
          strokeWidth="2"
        />
        <text x="34" y="52" fontFamily="monospace" fontSize="13" fill="#1d5a36">
          =SUMA(B2:B9)
        </text>
        <rect x="24" y="70" width="70" height="12" rx="3" fill="#b9dcc4" />
        <rect x="24" y="90" width="90" height="12" rx="3" fill="#b9dcc4" />
      </svg>
    )
  if (slug === 'fotografia')
    return (
      <svg {...common}>
        <defs>
          <linearGradient id="cover-dusk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8c98b" />
            <stop offset="1" stopColor="#f19a6b" />
          </linearGradient>
        </defs>
        <rect width="320" height="140" fill="url(#cover-dusk)" />
        <circle cx="96" cy="98" r="30" fill="#ffe6b0" />
        <path d="M0 108c50-14 110-16 160-6s110 10 160-4v42H0Z" fill="#9c4f3b" />
        <path d="M0 122c60-8 140-8 320 0v18H0Z" fill="#6e3428" />
        <rect x="170" y="10" width="86" height="150" rx="14" fill="#1b2a41" />
        <rect x="177" y="24" width="72" height="104" rx="4" fill="#f8c98b" />
        <circle cx="200" cy="96" r="14" fill="#ffe6b0" />
        <path d="M177 102c18-6 36-6 72-2v28h-72Z" fill="#9c4f3b" />
        <path
          d="M201 44h24M213 32v24M189 60h48"
          stroke="#fff"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="213" cy="17" r="3" fill="#3a4b66" />
      </svg>
    )
  if (slug === 'ingles')
    return (
      <svg {...common}>
        <rect width="320" height="140" fill="#cfe0f8" />
        <circle cx="70" cy="40" r="18" fill="#fff" />
        <circle cx="90" cy="34" r="22" fill="#fff" />
        <circle cx="112" cy="42" r="16" fill="#fff" />
        <path d="M40 120h250" stroke="#8fb0de" strokeWidth="2" />
        <rect x="150" y="62" width="92" height="58" rx="10" fill="#c4323f" />
        <rect x="150" y="62" width="92" height="12" rx="6" fill="#9c2330" />
        <path
          d="M180 62V50a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v12"
          fill="none"
          stroke="#1b2a41"
          strokeWidth="5"
        />
        <path d="M150 90h92" stroke="#fde9e4" strokeWidth="4" />
        <circle cx="166" cy="124" r="6" fill="#1b2a41" />
        <circle cx="226" cy="124" r="6" fill="#1b2a41" />
        <path d="m210 34 70-14-30 24 12 4-10 6-8-8Z" fill="#1b4e9b" />
        <rect x="40" y="76" width="80" height="40" rx="6" fill="#fff" />
        <path
          d="M52 90h56M52 102h36"
          stroke="#1b4e9b"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    )
  return (
    <svg {...common}>
      <rect width="320" height="140" fill="#eef4e0" />
      <rect x="0" y="0" width="120" height="140" fill="#dcead0" />
      <path d="M8 40h104M8 80h104M8 120h104" stroke="#b8cfa4" strokeWidth="3" />
      <path d="M40 0v140" stroke="#b8cfa4" strokeWidth="3" />
      <rect x="140" y="96" width="160" height="34" rx="4" fill="#8a5a3b" />
      <rect x="134" y="90" width="172" height="10" rx="3" fill="#a06d49" />
      <path d="M170 92c-10-30-30-40-38-44 18 0 34 14 38 44Z" fill="#4f8a3c" />
      <path d="M172 92c4-34 22-52 34-56-6 18-20 34-34 56Z" fill="#6aa84f" />
      <path d="M226 92c-6-22-2-42 8-54 6 20 4 38-8 54Z" fill="#4f8a3c" />
      <circle cx="244" cy="58" r="8" fill="#c4323f" />
      <circle cx="258" cy="70" r="7" fill="#d94b55" />
      <path
        d="M262 92c-4-18 0-30 6-36M268 92c0-14 8-24 14-28"
        stroke="#4f8a3c"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M40 120c10-24 30-30 44-24-8 10-24 20-44 24Z" fill="#6aa84f" />
    </svg>
  )
}

/** Catálogo de cursos en cards: encabezado, enlace principal y acción secundaria. */
export function CourseCatalog({ fixed }: ExamplePageProps) {
  const id = useId()
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [saved, setSaved] = useState<string[]>([])
  const toggleSaved = (slug: string) =>
    setSaved((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    )

  return (
    <div className={`catalog${fixed ? '' : ' catalog--barrier'}`}>
      <div className="catalog__topbar">
        <p>Inscripciones y dudas: 944 000 512 · secretaria@academiafaro.es</p>
        <p>Formación bonificable para empresas</p>
      </div>
      <header className="catalog__header">
        <p className="catalog__brand">
          <span aria-hidden="true" className="catalog__logo" />
          Academia Faro
        </p>
        <nav aria-label="Principal" className="catalog__nav">
          <ul>
            <li>
              <a href={`#${id}-list`} aria-current="page">
                Cursos
              </a>
            </li>
            <li>
              <a href={`#${id}-list`}>Calendario</a>
            </li>
            <li>
              <a href={`#${id}-help`}>Profesorado</a>
            </li>
            <li>
              <a href={`#${id}-help`}>Empresas</a>
            </li>
            <li>
              <a href={`#${id}-help`}>Contacto</a>
            </li>
          </ul>
        </nav>
        <a className="catalog__account" href={`#${id}-list`}>
          <span aria-hidden="true" className="catalog__avatar">
            NR
          </span>
          Mi cuenta
        </a>
      </header>
      <main className="catalog__main">
        <nav aria-label="Migas de pan" className="catalog__crumbs">
          <ol>
            <li>
              <a href={`#${id}-list`}>Inicio</a>
            </li>
            <li>
              <a href={`#${id}-list`}>Cursos</a>
            </li>
            <li aria-current="page">Otoño 2026</li>
          </ol>
        </nav>
        <div className="catalog__hero">
          <div>
            <p className="catalog__kicker">
              Bilbao y en línea · Del 1 de diciembre
            </p>
            <h1>Cursos de otoño</h1>
            <p className="catalog__intro">
              Inscripción abierta hasta el 30 de noviembre. Guarda los que te
              interesen para decidir más tarde.
            </p>
          </div>
          <ul className="catalog__perks">
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <circle cx="9" cy="8" r="3.5" />
                <path d="M2.5 20c.5-4 3.2-6 6.5-6s6 2 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .7 3.3 2.7 3.5 6" />
              </svg>
              Grupos de 12 personas como máximo
            </li>
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3.5 2" />
              </svg>
              Clases de tarde, de 18:00 a 20:30
            </li>
            <li>
              <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                <path d="M5 3h14v11l-7 4-7-4Z" />
                <path d="m9 9 2 2 4-4M8 17l-2 4m10-4 2 4" />
              </svg>
              Certificado al terminar
            </li>
          </ul>
        </div>
        <fieldset className="catalog__views">
          <legend>Ver como</legend>
          <button
            type="button"
            aria-pressed={view === 'grid'}
            onClick={() => setView('grid')}
          >
            Cuadrícula
          </button>
          <button
            type="button"
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
          >
            Lista
          </button>
        </fieldset>
        <ul
          id={`${id}-list`}
          className={`catalog__list catalog__list--${view}`}
          data-fix="order"
        >
          {(fixed ? courses : barrierOrder).map((course) => {
            const isSaved = saved.includes(course.slug)
            const href = `#${id}-${course.slug}`
            const saveButton = (
              <button
                type="button"
                className="card__save"
                aria-pressed={isSaved}
                data-fix="nested"
                onClick={(event) => {
                  event.preventDefault()
                  toggleSaved(course.slug)
                }}
              >
                {isSaved ? 'Guardado' : 'Guardar'}
                {fixed && (
                  <span className="visually-hidden"> {course.title}</span>
                )}
              </button>
            )
            const content = (
              <>
                <p className="card__meta">{course.meta}</p>
                <p className="card__summary">{course.summary}</p>
              </>
            )
            return (
              <li
                key={course.slug}
                id={`${id}-${course.slug}`}
                className={`card${course.featured ? ' card--featured' : ''}`}
              >
                <Cover slug={course.slug} />
                {course.featured && <p className="card__badge">Destacado</p>}
                {fixed ? (
                  <>
                    <h2 className="card__title" data-fix="heading">
                      <a className="card__link" href={href}>
                        {course.title}
                      </a>
                    </h2>
                    {content}
                    {saveButton}
                  </>
                ) : (
                  <a className="card__link card__link--wrapper" href={href}>
                    <span className="card__title" data-fix="heading">
                      {course.title}
                    </span>
                    {content}
                    {saveButton}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
        <div id={`${id}-help`} className="catalog__after">
          <figure className="catalog__quote">
            <blockquote>
              <p className="catalog__quote-text">
                Me apunté a Excel por obligación y acabé haciendo yo los cuadros
                de turnos de toda la oficina. Itziar explica despacio y con
                ejemplos de verdad.
              </p>
            </blockquote>
            <figcaption>
              <span aria-hidden="true" className="catalog__avatar">
                JE
              </span>
              <span>
                <strong>Josune Etxebarria</strong>
                <span>Administrativa, alumna de la primavera pasada</span>
              </span>
            </figcaption>
          </figure>
          <div className="catalog__advice">
            <p className="catalog__advice-text">
              <strong className="catalog__advice-lead">
                ¿No sabes por cuál empezar?
              </strong>{' '}
              Cuéntanos qué quieres conseguir y te recomendamos un curso. La
              cita de orientación dura 15 minutos y es gratuita.
            </p>
            <p className="catalog__advice-actions">
              <a className="catalog__button" href={`#${id}-help`}>
                Pedir cita de orientación
              </a>
              <span>
                o llama al <strong>944 000 512</strong>
              </span>
            </p>
          </div>
        </div>
      </main>
      <footer className="catalog__footer">
        <div className="catalog__footer-grid">
          <div>
            <p className="catalog__brand">
              <span aria-hidden="true" className="catalog__logo" />
              Academia Faro
            </p>
            <p className="catalog__footer-text">
              Cursos cortos para personas adultas desde 2009, en la calle
              Iparraguirre de Bilbao y en línea.
            </p>
          </div>
          <nav
            aria-labelledby={`${id}-foot-courses`}
            className="catalog__footer-links"
          >
            <p id={`${id}-foot-courses`} className="catalog__footer-title">
              Formación
            </p>
            <a href={`#${id}-list`}>Cursos de otoño</a>
            <a href={`#${id}-list`}>Calendario completo</a>
            <a href={`#${id}-help`}>Formación para empresas</a>
            <a href={`#${id}-help`}>Becas y descuentos</a>
          </nav>
          <nav
            aria-labelledby={`${id}-foot-academy`}
            className="catalog__footer-links"
          >
            <p id={`${id}-foot-academy`} className="catalog__footer-title">
              La academia
            </p>
            <a href={`#${id}-help`}>Profesorado</a>
            <a href={`#${id}-help`}>Instalaciones</a>
            <a href={`#${id}-help`}>Preguntas frecuentes</a>
            <a href={`#${id}-help`}>Contacto</a>
          </nav>
          <div>
            <p className="catalog__footer-title">Secretaría</p>
            <address>
              Calle Iparraguirre, 27, 1.º
              <br />
              48009 Bilbao
              <br />
              De lunes a jueves, de 10:00 a 20:00
            </address>
          </div>
        </div>
        <div className="catalog__legal">
          <p>© 2026 Academia Faro · Información de demostración</p>
          <nav aria-label="Legal" className="catalog__legal-links">
            <a href={`#${id}-help`}>Aviso legal</a>
            <a href={`#${id}-help`}>Privacidad</a>
            <a href={`#${id}-help`}>Condiciones de inscripción</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
