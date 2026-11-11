import type { ExampleDefinition } from '../types'
import { CourtBooking } from './CourtBooking'

export const courtBookingExample: ExampleDefinition = {
  slug: 'pistas',
  name: 'Reserva de pistas de pádel',
  lesson: '5.2',
  lessonTitle: 'Navegación por celdas y gestión del foco',
  title: 'Reservar una pista · Pádel La Red',
  tryIt: [
    'Usando solo el teclado, elige la pista 3 a las 12:00.',
    'Dentro de la tabla, pulsa las flechas, Inicio y Fin.',
    'Sal de la tabla hasta «Ver mis reservas» y vuelve con Mayús+Tab. ¿Dónde está el foco?',
  ],
  fixes: [
    {
      id: 'one-stop',
      title: 'Veinte paradas de Tab',
      where: 'Los veinte botones de la tabla.',
      problem:
        'Cada botón está en el orden de Tab. Para llegar a las 12:00 hay que pulsar Tab más de doce veces, y hasta veinte para salir de la tabla.',
      solution:
        'Solo la celda activa tiene tabindex="0"; el resto, tabindex="-1". Tab entra en el grid y el siguiente Tab sale. Al volver, el foco está donde se dejó.',
      before:
        '<td><button>Libre</button></td>\n<td><button>Ocupada</button></td>\n<td><button>Libre</button></td>',
      after:
        '<td><button tabindex="0">Libre</button></td>\n<td><button tabindex="-1">Ocupada</button></td>\n<td><button tabindex="-1">Libre</button></td>',
    },
    {
      id: 'arrows',
      title: 'Las flechas no hacen nada',
      where: 'La tabla «Pistas disponibles».',
      problem:
        'La tabla tiene role="grid", pero nadie ha programado las teclas. Al pulsar una flecha, la página se desplaza y el foco no se mueve.',
      solution:
        'Las flechas mueven el foco una celda. Inicio y Fin van a los extremos de la fila; con Ctrl, a la primera y a la última celda. En los bordes, el foco se queda.',
      before:
        '<table role="grid">\n  …\n</table>\n\n// Sin código para el teclado',
      after:
        'tabla.addEventListener("keydown", (e) => {\n  const destino = celdaDestino(e.key, fila, columna)\n  if (!destino) return\n  e.preventDefault()\n  destino.focus()\n})',
    },
    {
      id: 'hint',
      title: 'Nada dice que se usa con flechas',
      where: 'Texto encima de la tabla.',
      problem:
        'La tabla parece una rejilla de botones normal. Quien usa el teclado no sabe que puede moverse con las flechas.',
      solution:
        'Una frase visible lo explica. aria-describedby la une al grid, y el lector la anuncia al entrar.',
      before: '<p>Elige una hora libre.</p>\n<table role="grid">…</table>',
      after:
        '<p id="ayuda">Elige una hora libre. Dentro de la tabla,\n  muévete con las flechas y pulsa Enter para elegir.</p>\n<table role="grid" aria-describedby="ayuda">…</table>',
    },
  ],
  Page: CourtBooking,
}
