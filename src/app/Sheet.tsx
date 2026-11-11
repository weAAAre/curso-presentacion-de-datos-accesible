import { course } from '../course'
import { exampleRegistry } from '../examples/registry'
import type { ExampleDefinition } from '../examples/types'
import { CourseFrame } from './CourseFrame'
import { Hero } from './Hero'
import { homeUrl, sheetUrl, versions, viewUrl } from './routes'

function Chevron() {
  return (
    <svg
      className="course__chevron"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

/**
 * Ficha de un ejemplo: abre las dos versiones de la página y guarda, plegado,
 * qué probar y qué cambia en el código.
 */
export function Sheet({ example }: { example: ExampleDefinition }) {
  const index = exampleRegistry.indexOf(example)
  const previous = exampleRegistry[index - 1]
  const next = exampleRegistry[index + 1]
  const module = course.modules.find(({ number }) =>
    example.lesson.startsWith(`${number}.`),
  )

  return (
    <CourseFrame title={`${example.name} · Lección ${example.lesson}`}>
      <nav className="course__crumbs" aria-label="Migas de pan">
        <ol>
          <li>
            <a href={homeUrl}>Ejemplos</a>
          </li>
          <li aria-current="page">{example.name}</li>
        </ol>
      </nav>
      <Hero
        label={`Lección ${example.lesson}`}
        title={example.name}
        facts={[
          { label: 'Módulo', value: module?.title },
          { label: 'Lección', value: example.lessonTitle },
          { label: 'Cambios', value: example.fixes.length },
        ]}
      />

      <div className="course__columns">
        <section className="course__panel" aria-labelledby="que-cambia">
          <h2 id="que-cambia">Qué cambia</h2>
          <div className="course__accordion">
            {example.fixes.map((fix) => (
              <details key={fix.id} name="cambio">
                <summary>
                  <span>{fix.title}</span>
                  <Chevron />
                </summary>
                <div className="course__fix">
                  <p>{fix.problem}</p>
                  <p>{fix.solution}</p>
                  <div className="course__code-pair">
                    {versions.map(({ version, fixed, label }) => (
                      <figure key={version} className="course__code">
                        <figcaption>{label}</figcaption>
                        <pre>
                          <code>{fixed ? fix.after : fix.before}</code>
                        </pre>
                      </figure>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <aside className="course__side" aria-labelledby="abrir">
          <div className="course__side-block">
            <h2 id="abrir">Abrir la página</h2>
            <ul className="course__actions">
              {versions.map(({ version, fixed, label }) => (
                <li key={version}>
                  <a
                    className={`course__button${fixed ? ' course__button--cta' : ''}`}
                    href={viewUrl(example.slug, version)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="course__side-block">
            <h2>Pruébalo</h2>
            <ol className="course__steps">
              {example.tryIt.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      {(previous || next) && (
        <nav className="course__pager" aria-label="Otros ejemplos">
          {previous && (
            <a href={sheetUrl(previous.slug)} rel="prev">
              <span>Anterior</span>
              {previous.name}
            </a>
          )}
          {next && (
            <a
              className="course__pager-next"
              href={sheetUrl(next.slug)}
              rel="next"
            >
              <span>Siguiente</span>
              {next.name}
            </a>
          )}
        </nav>
      )}
    </CourseFrame>
  )
}
