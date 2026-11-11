import { type ReactNode, useEffect } from 'react'
import { BrandMark } from '../brand/BrandMark'
import { course } from '../course'
import { homeUrl } from './routes'
import './app.css'

/** Marco de las pantallas del curso: cabecera con el logotipo y pie. */
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
      <header className="course__header">
        <a className="course__home" href={homeUrl}>
          <BrandMark />
          <span>{course.title}</span>
        </a>
      </header>
      <main className="course__main">{children}</main>
      <footer className="course__footer">
        <p>
          Un curso de <a href="https://weaaare.com">weAAAre</a> con{' '}
          {course.author}.
        </p>
      </footer>
    </div>
  )
}
