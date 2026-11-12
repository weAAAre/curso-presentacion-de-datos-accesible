import { useId, useState } from 'react'
import type { ExamplePageProps } from '../types'
import boxUrl from './box.svg'
import './shipment-tracking.css'

const shipments = [
  {
    code: 'RY4821',
    city: 'Lugo',
    date: 'Salió el 3 de noviembre',
    state: 'delivered',
    label: 'Entregado',
  },
  {
    code: 'RY5307',
    city: 'Cáceres',
    date: 'Salió el 6 de noviembre',
    state: 'transit',
    label: 'En reparto',
  },
  {
    code: 'RY5590',
    city: 'Huesca',
    date: 'Salió el 7 de noviembre',
    state: 'issue',
    label: 'Incidencia: dirección incompleta',
  },
] as const

type State = (typeof shipments)[number]['state']

/** Forma distinta por estado: el color nunca va solo. */
function StatusIcon({ state }: { state: State }) {
  return (
    <svg
      aria-hidden="true"
      className="shipments__status-icon"
      viewBox="0 0 24 24"
      focusable="false"
    >
      <circle cx="12" cy="12" r="11" />
      {state === 'delivered' && <path d="m7 12.5 3.5 3.5L17 9" />}
      {state === 'transit' && <path d="M6 12h9m-3-4 4 4-4 4" />}
      {state === 'issue' && <path d="M12 6.5v7m0 3.5v.5" />}
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />
    </svg>
  )
}

/** Mis envíos: estado con icono, iconos decorativos y controles con icono. */
export function ShipmentTracking({ fixed }: ExamplePageProps) {
  const id = useId()
  const [copied, setCopied] = useState('')

  const copy = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {})
    setCopied(code)
  }

  return (
    <div className={`shipments${fixed ? '' : ' shipments--barrier'}`}>
      <header className="shipments__header">
        <div className="shipments__bar">
          <p className="shipments__brand">
            <span aria-hidden="true" className="shipments__logo" />
            Mensajería Rayo
            <span className="shipments__brand-tag">Empresas</span>
          </p>
          <nav aria-label="Principal" className="shipments__nav">
            <a href={`#${id}-main`}>Enviar un paquete</a>
            <a href={`#${id}-main`} aria-current="page">
              Mis envíos
            </a>
            <a href={`#${id}-pickups`}>Recogidas</a>
            <a href={`#${id}-billing`}>Facturas</a>
            <a href={`#${id}-help`}>Ayuda</a>
          </nav>
          <p className="shipments__user">
            <span aria-hidden="true" className="shipments__avatar">
              LM
            </span>
            <span className="shipments__user-text">
              <span className="shipments__user-name">Lucía Méndez</span>
              <span className="shipments__user-company">Cerámica Lúa</span>
            </span>
          </p>
        </div>
      </header>
      <main id={`${id}-main`} className="shipments__main">
        <nav aria-label="Migas de pan" className="shipments__crumbs">
          <a href={`#${id}-main`}>Área de cliente</a>
          <span aria-hidden="true">/</span>
          <span>Mis envíos</span>
        </nav>
        <div className="shipments__hero">
          <div>
            <h1>Mis envíos</h1>
            <p className="shipments__intro">
              Consulta el estado de tus paquetes y descarga la etiqueta para
              pegarla en la caja.
            </p>
          </div>
          <a className="shipments__primary" href={`#${id}-main`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Preparar un envío
          </a>
        </div>
        <div className="shipments__summary">
          <div className="shipments__tile">
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <path d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5Z" />
              <path d="m4 8.5 8 4.5 8-4.5M12 13v7" />
            </svg>
            <p>
              <span className="shipments__tile-label">Envíos de noviembre</span>
              <span className="shipments__tile-value">3 paquetes</span>
              <span className="shipments__tile-note">
                12 en octubre, tu mejor mes
              </span>
            </p>
          </div>
          <div className="shipments__tile" id={`${id}-pickups`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <rect x="3.5" y="5" width="17" height="15" rx="2" />
              <path d="M3.5 10h17M8 3v4m8-4v4" />
            </svg>
            <p>
              <span className="shipments__tile-label">Próxima recogida</span>
              <span className="shipments__tile-value">
                Jueves 13, de 9:00 a 14:00
              </span>
              <span className="shipments__tile-note">
                En el taller, rúa da Oliveira 8, Pontevedra
              </span>
            </p>
          </div>
          <div className="shipments__tile">
            <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <path d="M3 10h18M7 15h4" />
            </svg>
            <p>
              <span className="shipments__tile-label">Saldo prepago</span>
              <span className="shipments__tile-value">42,60 €</span>
              <span className="shipments__tile-note">
                Te llega para unos 6 envíos nacionales
              </span>
            </p>
          </div>
        </div>
        <p className="shipments__count">
          Envíos de los últimos 30 días, del más antiguo al más reciente
        </p>
        <ul className="shipments__list">
          {shipments.map((shipment) => (
            <li key={shipment.code} className="shipments__item">
              <h2 className="shipments__title">
                <img
                  className="shipments__box"
                  src={boxUrl}
                  alt={fixed ? '' : 'Icono de una caja de cartón'}
                  data-fix="decorative"
                  width="40"
                  height="40"
                />
                Envío a {shipment.city}
              </h2>
              <p className="shipments__date">{shipment.date}</p>
              <p
                className={`shipments__status shipments__status--${shipment.state}`}
                data-fix="status"
              >
                {fixed ? (
                  <StatusIcon state={shipment.state} />
                ) : (
                  <svg
                    className="shipments__status-icon"
                    viewBox="0 0 24 24"
                    focusable="false"
                  >
                    <circle cx="12" cy="12" r="11" />
                  </svg>
                )}
                {fixed && (
                  <span className="shipments__status-text">
                    {shipment.label}
                  </span>
                )}
              </p>
              <p className="shipments__code">
                Seguimiento: <strong>{shipment.code}</strong>
              </p>
              <div className="shipments__actions">
                <button
                  type="button"
                  className="shipments__icon-button"
                  aria-label={
                    fixed
                      ? `Copiar número de seguimiento ${shipment.code}`
                      : undefined
                  }
                  data-fix="icon-name"
                  onClick={() => copy(shipment.code)}
                >
                  <CopyIcon />
                </button>
                <a
                  className="shipments__icon-button"
                  href={`#${id}-main`}
                  aria-label={
                    fixed
                      ? `Descargar etiqueta del envío ${shipment.code} (PDF)`
                      : undefined
                  }
                  data-fix="icon-name"
                >
                  <DownloadIcon />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="shipments__copied" role="status">
          {copied && `Número ${copied} copiado.`}
        </p>

        <div className="shipments__more">
          <section
            aria-labelledby={`${id}-addresses`}
            className="shipments__panel"
          >
            <div className="shipments__panel-head">
              <h2 id={`${id}-addresses`}>Direcciones guardadas</h2>
              <a href={`#${id}-main`}>Añadir dirección</a>
            </div>
            <ul className="shipments__addresses">
              <li className="shipments__address">
                <p className="shipments__address-name">
                  Taller de Cerámica Lúa
                  <span className="shipments__tag">Recogida habitual</span>
                </p>
                <p>
                  Rúa da Oliveira, 8, bajo
                  <br />
                  36002 Pontevedra
                </p>
                <p className="shipments__address-meta">
                  De lunes a viernes, de 9:00 a 14:00 · 986 000 214
                </p>
                <a href={`#${id}-main`}>
                  Editar
                  <span className="visually-hidden">
                    {' '}
                    la dirección del Taller de Cerámica Lúa
                  </span>
                </a>
              </li>
              <li className="shipments__address">
                <p className="shipments__address-name">Almacén del puerto</p>
                <p>
                  Avenida de Marín, 41, nave 3
                  <br />
                  36940 Cangas
                </p>
                <p className="shipments__address-meta">
                  Solo jueves por la mañana · Pregunta por Xoán
                </p>
                <a href={`#${id}-main`}>
                  Editar
                  <span className="visually-hidden">
                    {' '}
                    la dirección del Almacén del puerto
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <section
            id={`${id}-billing`}
            aria-labelledby={`${id}-billing-title`}
            className="shipments__panel"
          >
            <div className="shipments__panel-head">
              <h2 id={`${id}-billing-title`}>Facturas</h2>
              <a href={`#${id}-billing`}>Ver todas</a>
            </div>
            <p className="shipments__invoice-lead">
              Te enviamos la factura el día 1 de cada mes a
              pedidos@ceramicalua.es.
            </p>
            <div className="shipments__invoice">
              <p>
                <span className="shipments__invoice-month">
                  Octubre de 2026
                </span>
                <span className="shipments__invoice-detail">
                  12 envíos · Factura R-2026-1087
                </span>
              </p>
              <p className="shipments__invoice-amount">68,35 €</p>
              <a href={`#${id}-billing`}>
                Descargar factura de octubre (PDF, 84 KB)
              </a>
            </div>
            <div className="shipments__invoice">
              <p>
                <span className="shipments__invoice-month">
                  Septiembre de 2026
                </span>
                <span className="shipments__invoice-detail">
                  9 envíos · Factura R-2026-0952
                </span>
              </p>
              <p className="shipments__invoice-amount">51,20 €</p>
              <a href={`#${id}-billing`}>
                Descargar factura de septiembre (PDF, 81 KB)
              </a>
            </div>
          </section>
        </div>

        <aside className="shipments__help" aria-labelledby={`${id}-help-title`}>
          <h2 id={`${id}-help-title`}>¿Un paquete no llega como esperabas?</h2>
          <p>
            Escríbenos con el número de seguimiento y lo miramos con la
            delegación de destino. Respondemos en menos de 4 horas en días
            laborables.
          </p>
          <p className="shipments__help-actions">
            <a href={`#${id}-help`}>Abrir una consulta</a>
            <span>
              o llama al <strong>900 100 720</strong>, de 8:00 a 20:00
            </span>
          </p>
        </aside>
      </main>
      <footer id={`${id}-help`} className="shipments__footer">
        <div className="shipments__footer-grid">
          <div className="shipments__footer-brand">
            <p className="shipments__brand">
              <span aria-hidden="true" className="shipments__logo" />
              Mensajería Rayo
            </p>
            <p>
              Paquetería para pequeños negocios: recogemos en tu taller y
              entregamos en 24 o 48 horas en toda la Península.
            </p>
          </div>
          <nav
            aria-labelledby={`${id}-foot-send`}
            className="shipments__footer-col"
          >
            <p id={`${id}-foot-send`} className="shipments__footer-title">
              Envíos
            </p>
            <ul>
              <li>
                <a href={`#${id}-main`}>Tarifas para empresas</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Puntos Rayo cerca de ti</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Cómo embalar un paquete</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Envíos a Baleares y Canarias</a>
              </li>
            </ul>
          </nav>
          <nav
            aria-labelledby={`${id}-foot-help`}
            className="shipments__footer-col"
          >
            <p id={`${id}-foot-help`} className="shipments__footer-title">
              Ayuda
            </p>
            <ul>
              <li>
                <a href={`#${id}-main`}>Preguntas frecuentes</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Reclamaciones</a>
              </li>
              <li>
                <a href={`#${id}-main`}>Contacto</a>
              </li>
            </ul>
          </nav>
          <div className="shipments__footer-col">
            <p className="shipments__footer-title">Atención a empresas</p>
            <p>
              900 100 720
              <br />
              Lunes a viernes, de 8:00 a 20:00
              <br />
              Sábados, de 9:00 a 14:00
            </p>
          </div>
        </div>
        <div className="shipments__legal">
          <p>© 2026 Mensajería Rayo, S. L. · Información de demostración</p>
          <nav aria-label="Legal" className="shipments__legal-links">
            <a href={`#${id}-main`}>Aviso legal</a>
            <a href={`#${id}-main`}>Privacidad</a>
            <a href={`#${id}-main`}>Cookies</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
