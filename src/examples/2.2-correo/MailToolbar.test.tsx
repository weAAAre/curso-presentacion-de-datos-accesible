import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { MailToolbar } from './MailToolbar'

describe('Correo: tooltip con foco, descartable y ayuda esencial visible', () => {
  it('con la barrera, el foco no muestra el tooltip y la ayuda esencial solo existe al pasar el puntero', async () => {
    const user = userEvent.setup()
    render(<MailToolbar fixed={false} />)
    const archive = screen.getByRole('button', { name: 'Archivar' })
    archive.focus()
    expect(screen.queryByText('Archivar')).not.toBeInTheDocument()
    await user.hover(archive)
    expect(screen.getByText('Archivar')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.getByText('Archivar')).toBeInTheDocument()
    expect(screen.queryByText(/30 días/)).not.toBeInTheDocument()
  })

  it('con el arreglo, el tooltip es el nombre, aparece con el foco y Escape lo cierra sin mover el foco', async () => {
    const user = userEvent.setup()
    const { container } = render(<MailToolbar fixed />)
    await user.tab()
    await user.tab()
    await user.tab()
    await user.tab()
    const archive = screen.getByRole('button', { name: 'Archivar' })
    expect(archive).toHaveFocus()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Archivar')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    expect(archive).toHaveFocus()
    expect(await axe(container)).toHaveNoViolations()
  })

  it('con el arreglo, el tooltip sigue abierto al pasar el puntero sobre él', () => {
    render(<MailToolbar fixed />)
    const wrapper = screen
      .getByRole('button', { name: 'Marcar como no leído' })
      .closest('.mail__tip') as HTMLElement
    fireEvent.mouseEnter(wrapper)
    expect(screen.getByRole('tooltip')).toHaveTextContent(
      'Marcar como no leído',
    )
  })

  it('con el arreglo, el botón de la papelera tiene nombre y una descripción visible', () => {
    render(<MailToolbar fixed />)
    const trash = screen.getByRole('button', { name: 'Mover a la papelera' })
    expect(trash).toHaveAccessibleDescription(
      'Los mensajes de la papelera se borran para siempre a los 30 días.',
    )
    expect(screen.getByText(/30 días/)).toBeVisible()
  })
})
