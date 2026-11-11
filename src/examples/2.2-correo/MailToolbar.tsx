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

/** Correo web: barra de acciones con iconos y su ayuda contextual. */
export function MailToolbar({ fixed }: ExamplePageProps) {
  const id = useId()
  const [message, setMessage] = useState('')
  const [hintOpen, setHintOpen] = useState(false)
  const helpId = `${id}-trash-help`

  return (
    <div className={`mail${fixed ? '' : ' mail--barrier'}`}>
      <header className="mail__header">
        <p className="mail__brand">Buzón Brisa</p>
        <nav aria-label="Carpetas" className="mail__nav">
          <a href={`#${id}-main`} aria-current="page">
            Bandeja de entrada
          </a>
          <a href={`#${id}-main`}>Archivo</a>
          <a href={`#${id}-main`}>Papelera</a>
        </nav>
      </header>
      <main id={`${id}-main`} className="mail__main">
        <h1>Reserva confirmada: casa en Ribadesella</h1>
        <p className="mail__from">De: Alojamientos Cantábrico · hoy, 9:42</p>
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
                    Los mensajes de la papelera se borran para siempre a los 30
                    días.
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
            Tu reserva del 12 al 15 de diciembre está confirmada. Te esperamos a
            partir de las 16:00. Si necesitas cambiar las fechas, responde a
            este correo.
          </p>
          <p>Un saludo, Alojamientos Cantábrico.</p>
        </article>
      </main>
      <footer className="mail__footer">
        <p>Buzón Brisa · Información de demostración</p>
      </footer>
    </div>
  )
}
