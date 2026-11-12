import { useId } from 'react'
import type { ExamplePageProps } from '../types'
import './order-history.css'

const columns = ['Pedido', 'Fecha', 'Artículos', 'Importe', 'Estado']

const orders = [
  ['T-1042', '3 nov 2026', 'Cuaderno A5, rotuladores', '18,40 €', 'Entregado'],
  ['T-1037', '21 oct 2026', 'Agenda 2027', '24,90 €', 'Entregado'],
  ['T-1029', '9 oct 2026', 'Pack de 10 bolígrafos', '7,50 €', 'Devuelto'],
  ['T-1018', '30 sep 2026', 'Papel de acuarela', '12,00 €', 'Entregado'],
  ['T-1011', '14 sep 2026', 'Estuche, gomas, regla', '9,95 €', 'Entregado'],
]

/** Clases de cada columna: número de pedido, importe y estado. */
const cellClasses = [
  'orders__code',
  undefined,
  undefined,
  'orders__amount',
  undefined,
]

/** Historial de pedidos: título, encabezados de columna y desplazamiento. */
export function OrderHistory({ fixed }: ExamplePageProps) {
  const id = useId()
  const captionId = `${id}-caption`
  const title = 'Tus pedidos de 2026'

  const table = (
    <table className="orders__table">
      {fixed ? (
        <caption id={captionId} className="orders__caption" data-fix="caption">
          {title}
        </caption>
      ) : null}
      {fixed ? (
        <thead data-fix="headers">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {!fixed && (
          <tr className="orders__head" data-fix="headers">
            {columns.map((column) => (
              <td key={column}>{column}</td>
            ))}
          </tr>
        )}
        {orders.map((order) => (
          <tr key={order[0]}>
            {order.map((value, index) => (
              <td key={columns[index]} className={cellClasses[index]}>
                {index === 4 ? (
                  <span
                    className={`orders__state orders__state--${value === 'Devuelto' ? 'returned' : 'delivered'}`}
                  >
                    {value}
                  </span>
                ) : (
                  value
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )

  return (
    <div className={`orders${fixed ? '' : ' orders--barrier'}`}>
      <header className="orders__header">
        <p className="orders__brand">
          <span aria-hidden="true" className="orders__logo" />
          Papelería Trazo
        </p>
        <nav aria-label="Mi cuenta" className="orders__nav">
          <a href={`#${id}-main`} aria-current="page">
            Pedidos
          </a>
          <a href={`#${id}-main`}>Direcciones</a>
          <a href={`#${id}-main`}>Datos personales</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="orders__main">
        <h1>Mis pedidos</h1>
        <p className="orders__intro">
          Puedes devolver cualquier artículo en los 30 días siguientes a la
          entrega.
        </p>
        {!fixed && (
          <p className="orders__caption" data-fix="caption">
            {title}
          </p>
        )}
        {fixed ? (
          <div
            className="orders__scroll"
            role="region"
            aria-labelledby={captionId}
            tabIndex={0}
            data-fix="scroll"
          >
            {table}
          </div>
        ) : (
          <div className="orders__scroll" data-fix="scroll">
            {table}
          </div>
        )}
      </main>
      <footer className="orders__footer">
        <p>Papelería Trazo · Información de demostración</p>
      </footer>
    </div>
  )
}
