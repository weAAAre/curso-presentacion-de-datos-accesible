import type { ReactNode } from 'react'
import headerGradient from '../brand/header-gradient.svg'

/** Cabecera de página de weAAAre: título sobre el degradado y franja de datos. */
export function Hero({
  label,
  title,
  facts,
}: {
  label: string
  title: string
  facts: { label: string; value: ReactNode }[]
}) {
  return (
    <div className="course__hero">
      <div className="course__hero-top">
        <img className="course__hero-gradient" src={headerGradient} alt="" />
        <p className="course__hero-label">{label}</p>
        <h1>{title}</h1>
      </div>
      <dl className="course__facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
