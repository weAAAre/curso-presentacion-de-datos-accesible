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

/** Comparativa de tarifas: planes por columna y características por fila. */
export function PlanComparison({ fixed }: ExamplePageProps) {
  const id = useId()
  return (
    <div className={`plans${fixed ? '' : ' plans--barrier'}`}>
      <header className="plans__header">
        <p className="plans__brand">Onda Fibra</p>
        <nav aria-label="Principal" className="plans__nav">
          <a href={`#${id}-main`}>Tarifas</a>
          <a href={`#${id}-main`}>Cobertura</a>
          <a href={`#${id}-main`}>Ayuda</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="plans__main">
        <h1>Compara nuestras tarifas</h1>
        <p className="plans__intro">
          Fibra y móvil en una sola factura. Precios con IVA incluido.
        </p>
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
        <a className="plans__cta" href={`#${id}-main`}>
          Comprobar la cobertura en mi dirección
        </a>
      </main>
      <footer className="plans__footer">
        <p>Onda Fibra · Información de demostración</p>
      </footer>
    </div>
  )
}
