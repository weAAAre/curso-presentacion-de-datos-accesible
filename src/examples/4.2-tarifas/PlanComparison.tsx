import { useId } from 'react'
import type { ExamplePageProps } from '../types'
import './plan-comparison.css'

const plans = ['Básica', 'Plus', 'Total']

type Value = string | boolean

const features: [string, Value, Value, Value][] = [
  ['Velocidad de fibra', '300 Mb', '600 Mb', '1 Gb'],
  ['Precio al mes', '25 €', '35 €', '49 €'],
  ['Líneas móviles', '1', '2', '4'],
  ['Datos por línea', '20 GB', '50 GB', 'Ilimitados'],
  ['Televisión', false, true, true],
  ['Router wifi 6', true, true, true],
  ['Permanencia', 'Sin permanencia', '12 meses', '12 meses'],
]

function Included({ value, fixed }: { value: boolean; fixed: boolean }) {
  return (
    <span className="plans__mark" data-fix="included">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        focusable="false"
        className={`plans__icon plans__icon--${value ? 'yes' : 'no'}`}
      >
        {value ? (
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        ) : (
          <path d="M6 6l12 12M18 6 6 18" />
        )}
      </svg>
      {fixed && (
        <span className="visually-hidden">
          {value ? 'Incluida' : 'No incluida'}
        </span>
      )}
    </span>
  )
}

const perks = [
  {
    title: 'Instalación en 48 horas',
    text: 'Un técnico de Onda va a tu casa, pasa la fibra y deja el wifi funcionando. Sin coste.',
    icon: (
      <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17l3 3 5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5Z" />
    ),
  },
  {
    title: 'Conservas tu número',
    text: 'Hacemos la portabilidad por ti. Solo te quedas sin línea unos minutos de madrugada.',
    icon: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: 'Atención en Valladolid',
    text: 'Te atiende una persona de nuestro equipo, de 8:00 a 22:00, todos los días del año.',
    icon: (
      <>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" />
      </>
    ),
  },
  {
    title: 'El precio no sube',
    text: 'Lo que pagas el primer mes es lo que pagas siempre, mientras no cambies de tarifa.',
    icon: (
      <>
        <path d="M5 11V8a7 7 0 0 1 14 0v3" />
        <rect x="4" y="11" width="16" height="10" rx="2" />
      </>
    ),
  },
]

const questions = [
  {
    q: '¿Puedo cambiar de tarifa más adelante?',
    a: 'Sí. Puedes subir de tarifa cuando quieras desde el área de clientes. Para bajar, espera a que termine la permanencia si la tienes.',
  },
  {
    q: '¿Qué pasa si me mudo?',
    a: 'Llevamos la fibra a tu nueva casa sin coste si hay cobertura. Si no la hay, puedes darte de baja sin penalización.',
  },
  {
    q: '¿Las líneas adicionales tienen los mismos datos?',
    a: 'Sí. Cada línea de la tarifa tiene sus propios datos y llamadas ilimitadas, y puedes compartirlos entre ellas desde la aplicación.',
  },
  {
    q: '¿Qué canales incluye la televisión?',
    a: 'Más de 80 canales, con los partidos de Liga y Champions incluidos, y siete días de programación para ver cuando quieras.',
  },
]

/** Comparativa de tarifas: planes por columna y características por fila. */
export function PlanComparison({ fixed }: ExamplePageProps) {
  const id = useId()
  return (
    <div className={`plans${fixed ? '' : ' plans--barrier'}`}>
      <div className="plans__topbar">
        <nav aria-label="Tipo de cliente" className="plans__segments">
          <a href={`#${id}-main`} aria-current="page">
            Particulares
          </a>
          <a href={`#${id}-main`}>Autónomos y empresas</a>
        </nav>
        <p>
          Contrata por teléfono: <strong>900 800 315</strong>
        </p>
      </div>
      <header className="plans__header">
        <p className="plans__brand">
          <span aria-hidden="true" className="plans__logo" />
          Onda Fibra
        </p>
        <nav aria-label="Principal" className="plans__nav">
          <a href={`#${id}-main`} aria-current="page">
            Tarifas
          </a>
          <a href={`#${id}-main`}>Solo fibra</a>
          <a href={`#${id}-main`}>Solo móvil</a>
          <a href={`#${id}-cta`}>Cobertura</a>
          <a href={`#${id}-faq`}>Ayuda</a>
        </nav>
        <a className="plans__account" href={`#${id}-main`}>
          <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c.6-4.2 3.8-6.5 8-6.5s7.4 2.3 8 6.5" />
          </svg>
          Área de clientes
        </a>
      </header>
      <main id={`${id}-main`} className="plans__main">
        <div className="plans__hero">
          <p className="plans__kicker">Fibra y móvil</p>
          <h1>Compara nuestras tarifas</h1>
          <p className="plans__intro">
            Fibra y móvil en una sola factura. Precios con IVA incluido.
          </p>
        </div>
        <div
          className="plans__scroll"
          role="region"
          aria-labelledby={`${id}-caption`}
          tabIndex={0}
        >
          <table className="plans__table">
            <caption id={`${id}-caption`}>Tarifas de fibra y móvil</caption>
            <thead>
              <tr>
                <td />
                {plans.map((plan) => (
                  <th key={plan} scope="col">
                    {plan}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map(([feature, ...values]) => (
                <tr key={feature}>
                  {fixed ? (
                    <th scope="row" data-fix="row-headers">
                      {feature}
                    </th>
                  ) : (
                    <td className="plans__feature" data-fix="row-headers">
                      {feature}
                    </td>
                  )}
                  {values.map((value, index) => (
                    <td key={plans[index]}>
                      {typeof value === 'boolean' ? (
                        <Included value={value} fixed={fixed} />
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="plans__note">
          Precios con IVA para altas nuevas en la Península y Baleares. La
          permanencia de 12 meses va ligada al router y a la instalación
          gratuitas.
        </p>
        <div id={`${id}-cta`} className="plans__cta-band">
          <p>
            <strong>¿Llega la fibra a tu casa?</strong> Escribe tu dirección y
            lo sabrás en un momento.
          </p>
          <a className="plans__cta" href={`#${id}-cta`}>
            Comprobar la cobertura en mi dirección
          </a>
        </div>

        <section aria-labelledby={`${id}-perks`} className="plans__section">
          <h2 id={`${id}-perks`}>Con cualquier tarifa</h2>
          <ul className="plans__perks">
            {perks.map((perk) => (
              <li key={perk.title}>
                <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                  {perk.icon}
                </svg>
                <span className="plans__perk-title">{perk.title}</span>
                <span className="plans__perk-text">{perk.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          id={`${id}-faq`}
          aria-labelledby={`${id}-faq-title`}
          className="plans__section plans__section--faq"
        >
          <h2 id={`${id}-faq-title`}>Preguntas frecuentes</h2>
          <div className="plans__faq">
            {questions.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p className="plans__faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="plans__footer">
        <div className="plans__footer-grid">
          <div>
            <p className="plans__brand">
              <span aria-hidden="true" className="plans__logo" />
              Onda Fibra
            </p>
            <p className="plans__footer-text">
              Operadora de fibra y móvil con sede en Valladolid. Más de 60.000
              hogares conectados en Castilla y León y Madrid.
            </p>
          </div>
          <nav aria-labelledby={`${id}-foot-plans`}>
            <p id={`${id}-foot-plans`} className="plans__footer-title">
              Tarifas
            </p>
            <ul>
              <li>
                <a href={`#${id}-main`}>Fibra y móvil</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Solo fibra</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Solo móvil</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Segunda residencia</a>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby={`${id}-foot-help`}>
            <p id={`${id}-foot-help`} className="plans__footer-title">
              Ayuda
            </p>
            <ul>
              <li>
                <a href={`#${id}-faq`}>Preguntas frecuentes</a>
              </li>
              <li>
                <a href={`#${id}-cta`}>Mapa de cobertura</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Estado de la red</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Contacto</a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="plans__footer-title">Atención al cliente</p>
            <p className="plans__footer-text">
              1515 desde tu móvil Onda
              <br />
              900 800 316 desde otros teléfonos
              <br />
              Todos los días, de 8:00 a 22:00
            </p>
          </div>
        </div>
        <div className="plans__legal">
          <p>
            © 2026 Onda Fibra Telecomunicaciones, S. L. · Información de
            demostración
          </p>
          <nav aria-label="Legal" className="plans__legal-links">
            <a href={`#${id}-main`}>Aviso legal</a>
            <a href={`#${id}-main`}>Privacidad</a>
            <a href={`#${id}-main`}>Condiciones de contratación</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
