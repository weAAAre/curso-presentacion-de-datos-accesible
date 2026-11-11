import type { ExampleDefinition } from '../types'
import { Subscriptions } from './Subscriptions'

export const subscriptionsExample: ExampleDefinition = {
  slug: 'suscripciones',
  name: 'Suscripciones de un quiosco digital',
  lesson: '5.3',
  lessonTitle: 'Acciones dentro de las celdas y revisión del recorrido',
  title: 'Mis suscripciones · Quiosco Papel',
  tryIt: [
    'Entra en la tabla con Tab y ve con las flechas hasta «Dar de baja» de la primera revista.',
    'Pulsa Enter. ¿Se ha dado de baja?',
    'Da de baja una revista y pulsa una flecha. ¿Dónde está el foco?',
    'Con un lector de pantalla, comprueba si algo confirma la baja.',
  ],
  fixes: [
    {
      id: 'cell-focus',
      title: 'La celda y su botón son dos paradas',
      where: 'Columna «Acción».',
      problem:
        'Las flechas llevan el foco a la celda, no al botón. Enter no hace nada: hay que pulsar Tab otra vez para llegar a «Dar de baja».',
      solution:
        'Cuando una celda solo tiene un control, el foco va directo al control. Enter o Espacio lo activan y las flechas siguen moviendo el foco.',
      before: '<td tabindex="-1">\n  <button>Dar de baja …</button>\n</td>',
      after: '<td>\n  <button tabindex="-1">Dar de baja …</button>\n</td>',
    },
    {
      id: 'focus-lost',
      title: 'Al quitar la fila, el foco se pierde',
      where: 'Filas de la tabla.',
      problem:
        'El botón pulsado desaparece con su fila y el foco se queda sin sitio. El siguiente Tab empieza desde arriba de la página.',
      solution:
        'El foco pasa al botón de la fila siguiente, o al de la anterior si era la última. Si no quedan filas, va al mensaje «No tienes suscripciones activas».',
      before: 'fila.remove()\n// El botón enfocado ya no existe',
      after:
        'fila.remove()\nconst destino = filaSiguiente ?? filaAnterior\ndestino.querySelector("button").focus()',
    },
    {
      id: 'announce',
      title: 'La baja no se confirma',
      where: 'Mensaje encima de la tabla.',
      problem:
        'La fila desaparece y nada lo dice. Con un lector de pantalla no se sabe si la baja se ha hecho.',
      solution:
        'Un mensaje visible dentro de role="status" dice qué se ha dado de baja y cuántas suscripciones quedan.',
      before: '<p class="aviso"></p>',
      after:
        '<p class="aviso" role="status">\n  Has dado de baja «Cocina fácil».\n  Quedan 5 suscripciones.\n</p>',
    },
  ],
  Page: Subscriptions,
}
