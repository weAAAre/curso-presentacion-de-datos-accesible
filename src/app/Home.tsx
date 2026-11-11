import { course } from '../course'
import { exampleRegistry } from '../examples/registry'
import { CourseFrame } from './CourseFrame'
import { sheetUrl } from './routes'

/** Portada: los ejemplos del curso agrupados por módulo. */
export function Home({ missing = false }: { missing?: boolean }) {
  const groups = course.modules
    .map((module) => ({
      module,
      examples: exampleRegistry.filter((example) =>
        example.lesson.startsWith(`${module.number}.`),
      ),
    }))
    .filter((group) => group.examples.length > 0)

  return (
    <CourseFrame title={`${course.title} · weAAAre`}>
      {missing && (
        <p className="course__notice" role="alert">
          Esa página no existe. Elige un ejemplo de la lista.
        </p>
      )}
      <p className="course__eyebrow">Ejemplos del curso</p>
      <h1>{course.title}</h1>
      <p className="course__lead">{course.description}</p>
      <p>
        Cada ejemplo es una página pequeña con una barrera de accesibilidad y la
        misma página con el arreglo. Ábrelas, pruébalas con teclado o con lector
        de pantalla y compara el código.
      </p>
      {groups.map(({ module, examples }) => (
        <section
          key={module.number}
          aria-labelledby={`modulo-${module.number}`}
        >
          <h2 id={`modulo-${module.number}`}>
            Módulo {module.number}. {module.title}
          </h2>
          <ul className="course__cards">
            {examples.map((example) => (
              <li key={example.slug}>
                <a className="course__card" href={sheetUrl(example.slug)}>
                  <span className="course__tag">Lección {example.lesson}</span>
                  <span className="course__card-title">{example.name}</span>
                  <span className="course__card-text">
                    {example.lessonTitle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </CourseFrame>
  )
}
