import type { ReactNode } from 'react'
import './subs-site.css'

/*
 * El resto del quiosco: cuenta, resumen, pago, facturas, recomendaciones y
 * pie. Nada de esto forma parte de la lección; el grid de suscripciones está
 * en Subscriptions.tsx.
 *
 * Antes del grid solo hay contenido que no recibe el foco: la lección entra
 * en la tabla con Tab desde «Ayuda». Los enlaces nuevos están después de
 * «Ver todas las revistas».
 */

/** Zona de la cuenta en la cabecera: solo texto, sin foco. */
export function SubsUser() {
  return (
    <p className="subs-site__user">
      <span aria-hidden="true" className="subs-site__avatar">
        ML
      </span>
      <span className="subs-site__user-text">
        Marta Llorente
        <span>Plan lector</span>
      </span>
    </p>
  )
}

const euros = (value: number) =>
  value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })

/** Resumen de la cuenta: se recalcula con las filas, pero no se anuncia. */
export function SubsSummary({
  items,
}: {
  items: { name: string; price: string; renews: string }[]
}) {
  const total = items.reduce(
    (sum, item) => sum + Number.parseFloat(item.price.replace(',', '.')),
    0,
  )
  const next = items[0]
  return (
    <ul className="subs-site__summary">
      <li>
        <span className="subs-site__summary-label">Revistas</span>
        <span className="subs-site__summary-value">
          {items.length === 1 ? '1 activa' : `${items.length} activas`}
        </span>
      </li>
      <li>
        <span className="subs-site__summary-label">Pagas al mes</span>
        <span className="subs-site__summary-value">{euros(total)}</span>
      </li>
      <li>
        <span className="subs-site__summary-label">Próximo cobro</span>
        <span className="subs-site__summary-value">
          {next ? `El ${next.renews}` : 'Ninguno'}
        </span>
      </li>
    </ul>
  )
}

function Icon({ name }: { name: 'card' | 'file' | 'gift' | 'mail' }) {
  const paths: Record<typeof name, ReactNode> = {
    card: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18M7 15h4" />
      </>
    ),
    file: (
      <>
        <path d="M6 3h8l4 4v14H6Z" />
        <path d="M14 3v4h4M9 13h6M9 17h4" />
      </>
    ),
    gift: (
      <>
        <rect x="4" y="9" width="16" height="11" rx="1.5" />
        <path d="M3 9h18v-3H3ZM12 6v14M12 6c-2-4-6-3-5 0M12 6c2-4 6-3 5 0" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      className="subs-site__icon"
    >
      {paths[name]}
    </svg>
  )
}

type CoverKind = 'garden' | 'sea' | 'history' | 'craft'

/** Portadas: hacen de foto; el nombre de la revista está escrito debajo. */
function Cover({ kind }: { kind: CoverKind }) {
  const covers: Record<CoverKind, ReactNode> = {
    garden: (
      <>
        <rect width="150" height="200" fill="#e8efd9" />
        <circle cx="112" cy="70" r="40" fill="#f6c518" opacity="0.55" />
        <path
          d="M44 200c0-40 6-70 26-96"
          stroke="#3b6b2c"
          strokeWidth="4"
          fill="none"
        />
        <path d="M70 104c-24-6-40 4-44 26 22 4 38-4 44-26Z" fill="#5d9b3a" />
        <path d="M66 128c22-14 44-8 54 10-22 10-42 6-54-10Z" fill="#7aa33a" />
        <path d="M70 104c4-24 22-34 40-30-2 22-18 32-40 30Z" fill="#3b6b2c" />
        <path d="M58 160h56l-6 40H64Z" fill="#c8673e" />
        <rect x="54" y="152" width="64" height="12" rx="3" fill="#b0552f" />
        <text x="12" y="30" className="subs-site__cover-title">
          Jardín
        </text>
        <text x="12" y="46" className="subs-site__cover-sub">
          de bolsillo
        </text>
        <rect x="12" y="176" width="40" height="5" rx="2" fill="#2d4a1f" />
        <rect
          x="12"
          y="186"
          width="28"
          height="4"
          rx="2"
          fill="#2d4a1f"
          opacity="0.6"
        />
      </>
    ),
    sea: (
      <>
        <rect width="150" height="200" fill="#163a5f" />
        <rect y="120" width="150" height="80" fill="#1f5b8a" />
        <circle cx="104" cy="84" r="20" fill="#f6c518" />
        <path
          d="M0 132c20-8 40-8 60 0s40 8 60 0 30-6 30-6v74H0Z"
          fill="#2b74ab"
        />
        <path
          d="M0 152c20-8 40-8 60 0s40 8 60 0 30-6 30-6"
          stroke="#9ed1f0"
          strokeWidth="2"
          fill="none"
        />
        <path d="M58 70v54" stroke="#f6f3ec" strokeWidth="2.5" />
        <path d="M60 72c18 14 22 32 20 48H60Z" fill="#f6f3ec" />
        <path d="M56 80c-12 12-16 26-14 40h14Z" fill="#e3ddd0" />
        <path d="M34 124h56l-8 10H42Z" fill="#a8261c" />
        <text
          x="12"
          y="34"
          className="subs-site__cover-title subs-site__cover-title--light"
        >
          Mar abierto
        </text>
        <rect x="12" y="46" width="52" height="4" rx="2" fill="#9ed1f0" />
      </>
    ),
    history: (
      <>
        <rect width="150" height="200" fill="#f1e3c4" />
        <rect
          x="10"
          y="10"
          width="130"
          height="180"
          fill="none"
          stroke="#8a6a2a"
          strokeWidth="1.5"
        />
        <path d="M30 196V118h90v78" fill="#d9c49a" />
        <path d="M24 118h102l-51-30Z" fill="#c7ad7a" />
        {[40, 58, 76, 94, 112].map((x) => (
          <rect
            key={x}
            x={x - 4}
            y="124"
            width="8"
            height="66"
            fill="#efe1c0"
          />
        ))}
        <rect x="26" y="190" width="98" height="6" fill="#a88b54" />
        <text
          x="75"
          y="40"
          textAnchor="middle"
          className="subs-site__cover-title subs-site__cover-title--serif"
        >
          Historia
        </text>
        <text
          x="75"
          y="58"
          textAnchor="middle"
          className="subs-site__cover-sub subs-site__cover-sub--dark"
        >
          viva
        </text>
        <rect x="45" y="68" width="60" height="3" fill="#8a6a2a" />
      </>
    ),
    craft: (
      <>
        <rect width="150" height="200" fill="#a8261c" />
        <circle cx="75" cy="128" r="46" fill="#e0533d" />
        <path d="M44 150c4-30 20-48 31-48s27 18 31 48Z" fill="#f6efe2" />
        <path
          d="M48 150c6-18 16-28 27-28s21 10 27 28"
          fill="none"
          stroke="#d98b1e"
          strokeWidth="3"
        />
        <path
          d="M30 150h90"
          stroke="#3a1410"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M100 82l20-24M116 56l8 6"
          stroke="#f6c518"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text
          x="12"
          y="32"
          className="subs-site__cover-title subs-site__cover-title--light"
        >
          Arte
        </text>
        <text
          x="12"
          y="50"
          className="subs-site__cover-sub subs-site__cover-sub--light"
        >
          y oficio
        </text>
        <rect x="12" y="178" width="60" height="5" rx="2" fill="#f6efe2" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 150 200"
      className="subs-site__cover"
    >
      {covers[kind]}
      <path d="M0 0h6v200H0Z" fill="#000" opacity="0.12" />
    </svg>
  )
}

const picks: {
  kind: CoverKind
  name: string
  blurb: string
  price: string
}[] = [
  {
    kind: 'garden',
    name: 'Jardín de bolsillo',
    blurb: 'Plantas para balcones y ventanas, mes a mes.',
    price: '3,20 € al mes',
  },
  {
    kind: 'sea',
    name: 'Mar abierto',
    blurb: 'Vela, travesías y la vida en los puertos.',
    price: '4,80 € al mes',
  },
  {
    kind: 'history',
    name: 'Historia viva',
    blurb: 'Grandes reportajes de historia, con mapas.',
    price: '5,50 € al mes',
  },
  {
    kind: 'craft',
    name: 'Arte y oficio',
    blurb: 'Talleres de cerámica, madera y encuadernación.',
    price: '4,20 € al mes',
  },
]

const invoices = [
  { month: 'Noviembre de 2026', amount: '24,00 €' },
  { month: 'Octubre de 2026', amount: '24,00 €' },
  { month: 'Septiembre de 2026', amount: '20,10 €' },
]

export function SubsExtras({ main }: { main: string }) {
  return (
    <div className="subs-site__more">
      <div className="subs-site__account-grid">
        <section className="subs-site__panel" aria-labelledby="quiosco-pago">
          <h2 id="quiosco-pago">Forma de pago</h2>
          <div className="subs-site__card">
            <span aria-hidden="true" className="subs-site__card-chip" />
            <p className="subs-site__card-number">
              <span className="visually-hidden">Tarjeta terminada en </span>
              <span aria-hidden="true">•••• •••• •••• </span>4821
            </p>
            <p className="subs-site__card-meta">
              <span>Marta Llorente</span>
              <span>Caduca en 08/28</span>
            </p>
          </div>
          <p className="subs-site__panel-note">
            Cobramos cada revista el día de su renovación. Te avisamos por
            correo tres días antes.
          </p>
          <a href={main}>Cambiar la forma de pago</a>
        </section>

        <section
          className="subs-site__panel"
          aria-labelledby="quiosco-facturas"
        >
          <h2 id="quiosco-facturas">Facturas</h2>
          <ul className="subs-site__invoices">
            {invoices.map((invoice) => (
              <li key={invoice.month}>
                <Icon name="file" />
                <a href={main}>
                  {invoice.month}
                  <span className="visually-hidden">, factura en PDF</span>
                </a>
                <span className="subs-site__invoice-amount">
                  {invoice.amount}
                </span>
              </li>
            ))}
          </ul>
          <a href={main}>Ver todas las facturas</a>
        </section>

        <section
          className="subs-site__panel subs-site__panel--plan"
          aria-labelledby="quiosco-plan"
        >
          <h2 id="quiosco-plan">Tu Plan lector</h2>
          <p>
            Con cinco revistas o más, cada una te sale un 10 % más barata.
            Además, lees los números atrasados de todo el quiosco.
          </p>
          <ul className="subs-site__plan-list">
            <li>
              <Icon name="gift" />
              Regala un mes a quien quieras
            </li>
            <li>
              <Icon name="mail" />
              Avisos antes de cada cobro
            </li>
          </ul>
          <a href={main}>Ver las ventajas del plan</a>
        </section>
      </div>

      <section aria-labelledby="quiosco-recomendadas">
        <div className="subs-site__section-head">
          <h2 id="quiosco-recomendadas">Te pueden gustar</h2>
          <p>Elegidas por lo que ya lees.</p>
        </div>
        <ul className="subs-site__picks">
          {picks.map((pick) => (
            <li key={pick.name} className="subs-site__pick">
              <Cover kind={pick.kind} />
              <h3>
                <a href={main}>{pick.name}</a>
              </h3>
              <p>{pick.blurb}</p>
              <p className="subs-site__pick-price">{pick.price}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function SubsFooter({ main }: { main: string }) {
  const columns = [
    {
      title: 'Quiosco',
      links: ['Todas las revistas', 'Novedades', 'Regalar una suscripción'],
    },
    {
      title: 'Tu cuenta',
      links: ['Datos personales', 'Avisos por correo', 'Cómo darse de baja'],
    },
    {
      title: 'Atención',
      links: ['Centro de ayuda', 'Escríbenos', 'Para editoriales'],
    },
  ]
  return (
    <footer className="subs-site__footer">
      <div className="subs-site__footer-top">
        <div>
          <p className="subs-site__footer-brand">
            <span aria-hidden="true" className="subs__logo" />
            Quiosco Papel
          </p>
          <p>
            Más de 200 revistas en tu pantalla, con la misma calma que el papel.
            Sin permanencia: te das de baja cuando quieras.
          </p>
        </div>
        <nav aria-label="Pie de página" className="subs-site__footer-nav">
          {columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link}>
                    <a href={main}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="subs-site__footer-legal">
        <p>
          © 2026 Quiosco Papel · Web de demostración: las revistas, la cuenta y
          los cobros son ficticios.
        </p>
        <nav aria-label="Legal">
          <a href={main}>Condiciones</a>
          <a href={main}>Privacidad</a>
          <a href={main}>Cookies</a>
          <a href={main}>Accesibilidad</a>
        </nav>
      </div>
    </footer>
  )
}
