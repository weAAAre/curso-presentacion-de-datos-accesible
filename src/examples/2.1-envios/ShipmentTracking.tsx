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
        <p className="shipments__brand">
          <span aria-hidden="true" className="shipments__logo" />
          Mensajería Rayo
        </p>
        <nav aria-label="Principal" className="shipments__nav">
          <a href={`#${id}-main`}>Enviar un paquete</a>
          <a href={`#${id}-main`}>Mis envíos</a>
          <a href={`#${id}-help`}>Ayuda</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="shipments__main">
        <div className="shipments__hero">
          <h1>Mis envíos</h1>
          <p className="shipments__intro">
            Consulta el estado de tus paquetes y descarga la etiqueta para
            pegarla en la caja.
          </p>
        </div>
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
      </main>
      <footer id={`${id}-help`} className="shipments__footer">
        <p>Mensajería Rayo · Información de demostración</p>
      </footer>
    </div>
  )
}
