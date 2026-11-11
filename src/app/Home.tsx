import { course } from '../course'
import { exampleRegistry } from '../examples/registry'
import { CourseFrame } from './CourseFrame'
import { Hero } from './Hero'
import { sheetUrl } from './routes'

/** Portada: los ejemplos del curso agrupados por módulo. */
export function Home({ missing = false }: { missing?: boolean }) {
  return (
    <CourseFrame title={`${course.title} · weAAAre`}>
      {missing && (
        <p className="course__notice" role="alert">
          Esa página no existe. Elige un ejemplo.
        </p>
      )}
      <Hero
        label="Ejemplos del curso"
        title={course.title}
        facts={[
          { label: 'Profesorado', value: course.author },
          { label: 'Contenido', value: `${exampleRegistry.length} ejemplos` },
          { label: 'Cada ejemplo', value: 'Con barrera y con arreglo' },
        ]}
      />
      <ul className="course__cards" aria-label="Ejemplos">
        {exampleRegistry.map((example) => (
          <li key={example.slug}>
            <a className="course__card" href={sheetUrl(example.slug)}>
              <span className="course__card-strip">
                Lección {example.lesson}
              </span>
              <span className="course__card-body">
                <span className="course__card-title">{example.name}</span>
                <span className="course__card-text">{example.lessonTitle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </CourseFrame>
  )
}
