import { useEffect } from 'react'
import { BrandMark } from '../brand/BrandMark'
import { course } from '../course'
import { exampleRegistry } from '../examples/registry'
import { siteUrl } from './routes'
import './app.css'

/** Capturas de cada web, generadas con `pnpm thumbnails`. */
const thumbnails = import.meta.glob<string>('./thumbnails/*.jpg', {
  eager: true,
  import: 'default',
})

const thumbnailOf = (slug: string) => thumbnails[`./thumbnails/${slug}.jpg`]

/** Portada: las webs de ejemplo del curso, con las tarjetas de weaaare.com. */
export function Home({ missing = false }: { missing?: boolean }) {
  useEffect(() => {
    document.title = `${course.title} · weAAAre`
  }, [])

  return (
    <div className="course">
      <header className="course__header">
        <a className="course__brand" href="https://weaaare.com/">
          <BrandMark />
          <span className="visually-hidden">: ir a weaaare.com</span>
        </a>
        <p className="course__tag">Ejemplos del curso</p>
      </header>
      <main className="course__main">
        {missing && (
          <p className="course__notice" role="alert">
            Esa página no existe. Elige una web de la lista.
          </p>
        )}
        <div className="course__intro">
          <h1>{course.title}</h1>
          <p>
            Webs de práctica del curso de {course.author}. Con ratón funcionan
            bien, pero esconden barreras de accesibilidad a propósito. Cada una
            tiene también su versión arreglada.
          </p>
        </div>
        {course.modules.map((module) => {
          const examples = exampleRegistry.filter((example) =>
            example.lesson.startsWith(`${module.number}.`),
          )
          if (examples.length === 0) return null
          return (
            <section
              key={module.number}
              className="course__module"
              aria-labelledby={`module-${module.number}`}
            >
              <h2 id={`module-${module.number}`}>
                <span className="course__module-number">
                  Módulo {module.number}
                </span>
                {module.title}
              </h2>
              <ul className="course__sites">
                {examples.map((example) => {
                  const thumbnail = thumbnailOf(example.slug)
                  return (
                    <li key={example.slug} className="course__site">
                      {thumbnail && (
                        <img
                          className="course__cover"
                          src={thumbnail}
                          alt=""
                          width="800"
                          height="500"
                          loading="lazy"
                        />
                      )}
                      <div className="course__site-body">
                        <p className="course__lesson">
                          Lección {example.lesson} · {example.lessonTitle}
                        </p>
                        <h3>
                          <a
                            className="course__site-link"
                            href={siteUrl(example.slug)}
                          >
                            {example.name}
                          </a>
                        </h3>
                        <p className="course__fixed">
                          <a href={siteUrl(example.slug, true)}>
                            Ver la versión arreglada
                            <span className="visually-hidden">
                              : {example.name}
                            </span>
                          </a>
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </main>
      <footer className="course__footer">
        <p>
          Un curso de <a href="https://weaaare.com/">weAAAre</a>, escuela de
          accesibilidad digital. Las empresas son ficticias: no escribas datos
          reales en los formularios.
        </p>
      </footer>
    </div>
  )
}
