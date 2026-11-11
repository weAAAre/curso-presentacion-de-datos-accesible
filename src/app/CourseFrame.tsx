import { type ReactNode, useEffect } from 'react'
import { BrandMark } from '../brand/BrandMark'
import logoGradient from '../brand/logo-gradient.svg'
import { course } from '../course'
import { homeUrl } from './routes'
import './app.css'

/** Marco de las pantallas del curso: la barra de weAAAre y el contenido. */
export function CourseFrame({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className="course">
      <header className="course__bar">
        <a className="course__logo" href={homeUrl}>
          <img src={logoGradient} alt="" />
          <BrandMark />
          <span className="visually-hidden">: ejemplos del curso</span>
        </a>
        <p className="course__bar-title">{course.title}</p>
      </header>
      <main className="course__main">{children}</main>
    </div>
  )
}
