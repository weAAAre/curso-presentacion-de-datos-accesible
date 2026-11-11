import { useEffect } from 'react'
import { BrandMark } from '../brand/BrandMark'
import { course } from '../course'
import { exampleRegistry } from '../examples/registry'
import { siteUrl } from './routes'
import './app.css'

/** Portada: las webs de ejemplo del curso, como en retos.weaaare.com. */
export function Home({ missing = false }: { missing?: boolean }) {
  useEffect(() => {
    document.title = `${course.title} · weAAAre`
  }, [])

  return (
    <div className="course">
      <header className="course__header">
        <a className="course__brand" href="https://weaaare.com/">
          <BrandMark />
          weAAAre
        </a>
      </header>
      <main className="course__main">
        {missing && (
          <p className="course__notice" role="alert">
            Esa página no existe. Elige una web de la lista.
          </p>
        )}
        <h1>{course.title}</h1>
        <p className="course__lead">
          Las webs de ejemplo del curso. Con ratón funcionan bien, pero esconden
          barreras de accesibilidad a propósito. Cada una tiene también su
          versión arreglada.
        </p>
        <ul className="course__sites">
          {exampleRegistry.map((example) => (
            <li key={example.slug} className="course__site">
              <p className="course__lesson">
                Lección {example.lesson} · {example.lessonTitle}
              </p>
              <h2>
                <a href={siteUrl(example.slug)}>{example.name}</a>
              </h2>
              <p>
                <a href={siteUrl(example.slug, true)}>
                  Versión arreglada
                  <span className="visually-hidden">: {example.name}</span>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </main>
      <footer className="course__footer">
        <p>
          Un curso de <a href="https://weaaare.com/">weAAAre</a>, escuela de
          accesibilidad digital, con {course.author}.
        </p>
      </footer>
    </div>
  )
}
