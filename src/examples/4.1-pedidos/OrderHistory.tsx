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
      <p className="orders__promo">
        Envío gratis desde 25 € · Pide antes de las 13:00 y sale hoy
      </p>
      <header className="orders__header">
        <p className="orders__brand">
          <span aria-hidden="true" className="orders__logo" />
          Papelería Trazo
        </p>
        <p className="orders__service">
          Atención al cliente: <strong>910 000 482</strong>
          <span>De lunes a viernes, de 9:00 a 18:00</span>
        </p>
        <p className="orders__user">
          <span aria-hidden="true" className="orders__avatar">
            CS
          </span>
          <span>
            Hola, <strong>Clara</strong>
          </span>
        </p>
      </header>
      <div className="orders__layout">
        <aside className="orders__sidebar" aria-label="Tu cuenta">
          <div className="orders__profile">
            <span
              aria-hidden="true"
              className="orders__avatar orders__avatar--large"
            >
              CS
            </span>
            <p>
              <strong>Clara Sanz Ortega</strong>
              <span>Clienta desde marzo de 2021</span>
            </p>
          </div>
          <nav aria-label="Mi cuenta" className="orders__nav">
            <a href={`#${id}-main`} aria-current="page">
              Pedidos
            </a>
            <a href={`#${id}-addresses`}>Direcciones</a>
            <a href={`#${id}-main`}>Datos personales</a>
          </nav>
          <p className="orders__points">
            <span className="orders__points-value">652 puntos Trazo</span>
            Equivalen a 6,52 € de descuento en tu próxima compra.
          </p>
        </aside>
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
          <div className="orders__extra">
            <section className="orders__panel">
              <h2>Tu año en Trazo</h2>
              <dl className="orders__stats">
                <div>
                  <dt>Pedidos</dt>
                  <dd>5</dd>
                </div>
                <div>
                  <dt>Artículos favoritos</dt>
                  <dd>Cuadernos A5</dd>
                </div>
                <div>
                  <dt>Próximo regalo</dt>
                  <dd>A los 1.000 puntos</dd>
                </div>
              </dl>
            </section>

            <section id={`${id}-addresses`} className="orders__panel">
              <h2>Dirección de entrega</h2>
              <address className="orders__address">
                <strong>Clara Sanz Ortega</strong>
                <br />
                Calle de la Fe, 21, 3.º izquierda
                <br />
                28012 Madrid
                <br />
                611 000 254
              </address>
              <p className="orders__address-note">
                Si no estás, dejamos el paquete en la portería.
              </p>
              <a href={`#${id}-addresses`}>Cambiar la dirección de entrega</a>
            </section>

            <section className="orders__panel orders__panel--help">
              <h2>¿Quieres devolver algo?</h2>
              <p>
                Prepara el artículo en su envoltorio y pide la recogida: pasamos
                a por él sin coste y te devolvemos el dinero en 5 días.
              </p>
              <a href={`#${id}-main`}>Solicitar una devolución</a>
            </section>
          </div>
        </main>
      </div>
      <footer className="orders__footer">
        <div className="orders__footer-grid">
          <div>
            <p className="orders__brand">
              <span aria-hidden="true" className="orders__logo" />
              Papelería Trazo
            </p>
            <p className="orders__footer-text">
              Papelería de barrio en Lavapiés desde 1978, ahora también en
              internet. Cuadernos, plumas y papel de dibujo elegidos uno a uno.
            </p>
          </div>
          <nav aria-labelledby={`${id}-foot-shop`}>
            <p id={`${id}-foot-shop`} className="orders__footer-title">
              Tienda
            </p>
            <ul>
              <li>
                <a href={`#${id}-main`}>Cuadernos y agendas</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Escritura</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Bellas artes</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Vuelta al cole</a>
              </li>
            </ul>
          </nav>
          <nav aria-labelledby={`${id}-foot-help`}>
            <p id={`${id}-foot-help`} className="orders__footer-title">
              Ayuda
            </p>
            <ul>
              <li>
                <a href={`#${id}-main`}>Envíos y plazos</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Cambios y devoluciones</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Contacto</a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="orders__footer-title">La tienda</p>
            <address className="orders__footer-text">
              Calle del Ave María, 30
              <br />
              28012 Madrid
              <br />
              Lunes a sábado, de 10:00 a 20:30
            </address>
          </div>
        </div>
        <div className="orders__legal">
          <p>© 2026 Papelería Trazo · Información de demostración</p>
          <nav aria-label="Legal" className="orders__legal-links">
            <a href={`#${id}-main`}>Aviso legal</a>
            <a href={`#${id}-main`}>Privacidad</a>
            <a href={`#${id}-main`}>Cookies</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
