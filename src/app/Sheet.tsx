import { exampleRegistry } from '../examples/registry'
import type { ExampleDefinition } from '../examples/types'
import { CourseFrame } from './CourseFrame'
import { homeUrl, sheetUrl, versions, viewUrl } from './routes'

/**
 * Ficha de un ejemplo: enlaza las dos versiones de la página y explica, fuera
 * de ella, qué probar y qué cambia en el código.
 */
export function Sheet({ example }: { example: ExampleDefinition }) {
  const index = exampleRegistry.indexOf(example)
  const previous = exampleRegistry[index - 1]
  const next = exampleRegistry[index + 1]

  return (
    <CourseFrame title={`${example.name} · Lección ${example.lesson}`}>
      <p className="course__back">
        <a href={homeUrl}>Todos los ejemplos</a>
      </p>
      <p className="course__eyebrow">
        Lección {example.lesson} · {example.lessonTitle}
      </p>
      <h1>{example.name}</h1>
      <ul className="course__actions">
        {versions.map(({ version, label }) => (
          <li key={version}>
            <a className="course__button" href={viewUrl(example.slug, version)}>
              Abrir la página {label.toLowerCase()}
            </a>
          </li>
        ))}
      </ul>

      <section aria-labelledby="pruebalo">
        <h2 id="pruebalo">Pruébalo</h2>
        <ol className="course__steps">
          {example.tryIt.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="que-cambia">
        <h2 id="que-cambia">Qué cambia</h2>
        <ol className="course__fixes">
          {example.fixes.map((fix, position) => (
            <li key={fix.id} className="course__fix">
              <h3>
                <span className="course__number" aria-hidden="true">
                  {position + 1}
                </span>
                {fix.title}
              </h3>
              <dl className="course__details">
                <dt>Dónde</dt>
                <dd>{fix.where}</dd>
                <dt>Problema</dt>
                <dd>{fix.problem}</dd>
                <dt>Solución</dt>
                <dd>{fix.solution}</dd>
              </dl>
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
            </li>
          ))}
        </ol>
      </section>

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
