import { type ReactNode, useEffect, useId, useState } from 'react'
import type { ExamplePageProps } from '../types'
import './mail-toolbar.css'

interface ActionProps {
  fixed: boolean
  label: string
  icon: ReactNode
  describedBy?: string
  onActivate: () => void
}

/**
 * Botón de icono con tooltip. Sin arreglo, la ayuda solo aparece al pasar el
 * puntero por el botón, se cierra al intentar leerla y no responde a Escape.
 */
function IconAction({
  fixed,
  label,
  icon,
  describedBy,
  onActivate,
}: ActionProps) {
  const tipId = useId()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!fixed || !open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [fixed, open])

  if (!fixed)
    return (
      <span className="mail__tip mail__tip--detached" data-fix="dismiss">
        <button
          type="button"
          className="mail__action"
          aria-label={label}
          data-fix="focus"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={onActivate}
        >
          {icon}
        </button>
        {open && <span className="mail__tooltip">{label}</span>}
      </span>
    )

  return (
    <span
      className="mail__tip"
      data-fix="dismiss"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="mail__action"
        aria-labelledby={tipId}
        aria-describedby={describedBy}
        data-fix="focus"
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={onActivate}
      >
        {icon}
      </button>
      <span role="tooltip" id={tipId} className="mail__tooltip" hidden={!open}>
        {label}
      </span>
    </span>
  )
}

const ArchiveIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <rect x="3" y="4" width="18" height="5" rx="1" />
    <path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4" />
  </svg>
)

const TrashIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
  </svg>
)

const UnreadIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const inbox = [
  {
    initials: 'AC',
    from: 'Alojamientos Cantábrico',
    time: '9:42',
    subject: 'Reserva confirmada: casa en Ribadesella',
    snippet: 'Tu reserva del 12 al 15 de diciembre está confirmada…',
    current: true,
    unread: false,
  },
  {
    initials: 'MP',
    from: 'Marta Pando',
    time: '8:15',
    subject: 'Cena del viernes',
    snippet: '¿Os viene bien a las nueve en la sidrería de siempre?',
    current: false,
    unread: true,
  },
  {
    initials: 'BN',
    from: 'Biblioteca de Noreña',
    time: 'Ayer',
    subject: 'Tu préstamo vence el lunes',
    snippet: 'Puedes renovar «Nada» de Carmen Laforet desde tu cuenta…',
    current: false,
    unread: true,
  },
  {
    initials: 'EA',
    from: 'Eléctrica Astur',
    time: '10 nov',
    subject: 'Tu factura de octubre',
    snippet: 'Importe: 48,12 €. Se cargará en tu cuenta el día 20.',
    current: false,
    unread: false,
  },
  {
    initials: 'LR',
    from: 'Lucía Rubio',
    time: '9 nov',
    subject: 'Fotos de la ruta del Cares',
    snippet: 'Te mando las que salieron bien, que fueron pocas.',
    current: false,
    unread: false,
  },
]

const ReplyIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path d="M10 8 5 12.5l5 4.5" />
    <path d="M5 12.5h9a5 5 0 0 1 5 5V19" />
  </svg>
)

const ForwardIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path d="m14 8 5 4.5-5 4.5" />
    <path d="M19 12.5h-9a5 5 0 0 0-5 5V19" />
  </svg>
)

/** Correo web: barra de acciones con iconos y su ayuda contextual. */
export function MailToolbar({ fixed }: ExamplePageProps) {
  const id = useId()
  const [message, setMessage] = useState('')
  const [hintOpen, setHintOpen] = useState(false)
  const helpId = `${id}-trash-help`

  return (
    <div className={`mail${fixed ? '' : ' mail--barrier'}`}>
      <header className="mail__header">
        <p className="mail__brand">
          <span aria-hidden="true" className="mail__logo" />
          Buzón Brisa
        </p>
        <p className="mail__user">
          <span className="mail__user-text">
            <span className="mail__user-name">Andrés Fernández</span>
            <span className="mail__user-address">
              andres.fernandez@brisa.es
            </span>
          </span>
          <span aria-hidden="true" className="mail__user-avatar">
            AF
          </span>
        </p>
      </header>
      <div className="mail__layout">
        <div className="mail__sidebar">
          <nav aria-label="Carpetas" className="mail__nav">
            <ul>
              <li>
                <a href={`#${id}-main`} aria-current="page">
                  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                    <path d="M3 13h5l1.5 3h5L16 13h5" />
                    <path d="M5.5 5h13L21 13v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5Z" />
                  </svg>
                  Bandeja de entrada
                  <span className="mail__count">
                    2<span className="visually-hidden"> sin leer</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`#${id}-main`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                    <rect x="3" y="4" width="18" height="5" rx="1" />
                    <path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M10 13h4" />
                  </svg>
                  Archivo
                </a>
              </li>
              <li>
                <a href={`#${id}-main`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
                    <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                  </svg>
                  Papelera
                </a>
              </li>
            </ul>
          </nav>
          <p className="mail__storage">
            <span className="mail__storage-bar" aria-hidden="true">
              <span />
            </span>
            Usas 2,1 GB de tus 15 GB
          </p>
        </div>

        <section className="mail__inbox" aria-labelledby={`${id}-inbox`}>
          <h2 id={`${id}-inbox`} className="mail__inbox-title">
            Bandeja de entrada
            <span className="mail__inbox-count">5 de 214 mensajes</span>
          </h2>
          <ul className="mail__messages">
            {inbox.map((item) => (
              <li
                key={item.subject}
                className={`mail__message${item.current ? ' mail__message--current' : ''}${item.unread ? ' mail__message--unread' : ''}`}
                aria-current={item.current ? 'true' : undefined}
              >
                <span aria-hidden="true" className="mail__message-avatar">
                  {item.initials}
                </span>
                <span className="mail__message-text">
                  <span className="mail__message-top">
                    <span className="mail__message-from">
                      {item.unread && (
                        <span className="visually-hidden">No leído. </span>
                      )}
                      {item.from}
                    </span>
                    <span className="mail__message-time">{item.time}</span>
                  </span>
                  <span className="mail__message-subject">{item.subject}</span>
                  <span className="mail__message-snippet">{item.snippet}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <main id={`${id}-main`} className="mail__main">
          <h1>Reserva confirmada: casa en Ribadesella</h1>
          <p className="mail__from">
            <span aria-hidden="true" className="mail__avatar">
              AC
            </span>
            <span className="mail__from-text">
              <span>
                <strong>Alojamientos Cantábrico</strong>{' '}
                &lt;reservas@alojamientoscantabrico.es&gt;
              </span>
              <span>Para: mí · hoy, 9:42</span>
            </span>
            <span className="mail__label">Viajes</span>
          </p>
          <div className="mail__actions">
            <IconAction
              fixed={fixed}
              label="Archivar"
              icon={ArchiveIcon}
              onActivate={() => setMessage('Mensaje archivado.')}
            />
            <IconAction
              fixed={fixed}
              label="Mover a la papelera"
              icon={TrashIcon}
              describedBy={fixed ? helpId : undefined}
              onActivate={() => setMessage('Mensaje movido a la papelera.')}
            />
            <IconAction
              fixed={fixed}
              label="Marcar como no leído"
              icon={UnreadIcon}
              onActivate={() => setMessage('Mensaje marcado como no leído.')}
            />
            <span className="mail__help" data-fix="essential">
              {fixed ? (
                <span id={helpId} className="mail__help-text">
                  Los mensajes de la papelera se borran para siempre a los 30
                  días.
                </span>
              ) : (
                <span
                  className="mail__hint"
                  onMouseEnter={() => setHintOpen(true)}
                  onMouseLeave={() => setHintOpen(false)}
                >
                  <span aria-hidden="true">?</span>
                  {hintOpen && (
                    <span className="mail__tooltip">
                      Los mensajes de la papelera se borran para siempre a los
                      30 días.
                    </span>
                  )}
                </span>
              )}
            </span>
          </div>
          <p className="mail__status" role="status">
            {message}
          </p>
          <article className="mail__body" aria-label="Mensaje">
            <p>Hola, Andrés:</p>
            <p>
              Tu reserva del 12 al 15 de diciembre está confirmada. Te esperamos
              a partir de las 16:00. Si necesitas cambiar las fechas, responde a
              este correo.
            </p>
            <p>Un saludo, Alojamientos Cantábrico.</p>
          </article>
          <div className="mail__attachment">
            <svg aria-hidden="true" viewBox="0 0 32 40" focusable="false">
              <path d="M3 1h18l8 8v29a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" />
              <path d="M21 1v8h8" />
              <rect x="6" y="24" width="20" height="9" rx="1.5" />
            </svg>
            <p>
              <a href={`#${id}-main`}>Bono-reserva-CR48213.pdf</a>
              <span>PDF · 212 KB</span>
            </p>
          </div>
          <div className="mail__reply">
            <button
              type="button"
              className="mail__reply-button"
              onClick={() =>
                setMessage('Respuesta abierta en una ventana nueva.')
              }
            >
              {ReplyIcon}
              Responder
            </button>
            <button
              type="button"
              className="mail__reply-button"
              onClick={() =>
                setMessage('Reenvío abierto en una ventana nueva.')
              }
            >
              {ForwardIcon}
              Reenviar
            </button>
          </div>
        </main>
      </div>
      <footer className="mail__footer">
        <p>
          Buzón Brisa · Información de demostración ·{' '}
          <a href={`#${id}-main`}>Privacidad</a> ·{' '}
          <a href={`#${id}-main`}>Condiciones</a> ·{' '}
          <a href={`#${id}-main`}>Ayuda</a>
        </p>
      </footer>
    </div>
  )
}
