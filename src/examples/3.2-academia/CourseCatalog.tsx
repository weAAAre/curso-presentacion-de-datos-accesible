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
      <header className="catalog__header">
        <p className="catalog__brand">Academia Faro</p>
        <nav aria-label="Principal" className="catalog__nav">
          <a href={`#${id}-list`}>Cursos</a>
          <a href={`#${id}-list`}>Profesorado</a>
          <a href={`#${id}-list`}>Mi cuenta</a>
        </nav>
      </header>
      <main className="catalog__main">
        <h1>Cursos de otoño</h1>
        <p className="catalog__intro">
          Inscripción abierta hasta el 30 de noviembre. Guarda los que te
          interesen para decidir más tarde.
        </p>
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
      </main>
      <footer className="catalog__footer">
        <p>Academia Faro · Información de demostración</p>
      </footer>
    </div>
  )
}
