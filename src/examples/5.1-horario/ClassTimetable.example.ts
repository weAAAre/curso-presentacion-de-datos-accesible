import type { ExampleDefinition } from '../types'
import { ClassTimetable } from './ClassTimetable'

export const classTimetableExample: ExampleDefinition = {
  slug: 'horario',
  name: 'Horario de clases de un polideportivo',
  lesson: '5.1',
  lessonTitle: 'Cuándo elegir una tabla y cuándo un grid',
  title: 'Horario de clases · Polideportivo Las Eras',
  tryIt: [
    'Pulsa Tab desde el menú hasta el enlace «Reservar una clase». Cuenta las pulsaciones.',
    'En una celda de la tabla, pulsa las flechas. ¿Se mueve el foco?',
    'Con un lector de pantalla, entra en la tabla y escucha cómo la anuncia.',
  ],
  fixes: [
    {
      id: 'tab-stops',
      title: 'Cada celda es una parada de Tab',
      where: 'Las dieciséis celdas de la tabla.',
      problem:
        'Cada celda tiene tabindex="0". Hay que pulsar Tab dieciséis veces para cruzar la tabla, y en ninguna celda se puede hacer nada.',
      solution:
        'Se quita tabindex. Las celdas son texto y no necesitan foco: Tab pasa del menú al enlace «Reservar una clase».',
      before:
        '<tr>\n  <th scope="row" tabindex="0">Yoga</th>\n  <td tabindex="0">Lunes y miércoles</td>\n  …\n</tr>',
      after:
        '<tr>\n  <th scope="row">Yoga</th>\n  <td>Lunes y miércoles</td>\n  …\n</tr>',
    },
    {
      id: 'grid-role',
      title: 'Una tabla que dice ser un grid',
      where: 'La tabla «Clases de esta semana».',
      problem:
        'Tiene role="grid", que promete moverse con las flechas. Nadie lo ha programado: el lector anuncia una cuadrícula interactiva y las flechas no hacen nada.',
      solution:
        'Se quita el rol. Es una tabla de solo lectura, y el lector la recorre con sus atajos de tabla.',
      before:
        '<table role="grid">\n  <caption>Clases de esta semana</caption>\n  …\n</table>',
      after:
        '<table>\n  <caption>Clases de esta semana</caption>\n  …\n</table>',
    },
  ],
  Page: ClassTimetable,
}
