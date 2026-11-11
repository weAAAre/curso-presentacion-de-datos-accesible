import type { ExampleDefinition } from '../types'
import { MailToolbar } from './MailToolbar'

export const mailToolbarExample: ExampleDefinition = {
  slug: 'correo',
  name: 'Barra de acciones de un correo web',
  lesson: '2.2',
  lessonTitle: 'Tooltip: ayuda contextual y límites',
  title: 'Reserva confirmada · Buzón Brisa',
  tryIt: [
    'Recorre los tres botones con Tab. ¿Sabes qué hace cada uno?',
    'Pasa el puntero por un botón e intenta llevarlo hasta el texto de ayuda.',
    'Con la ayuda abierta, pulsa Escape.',
    'Sin usar el ratón, averigua cuándo se borran los mensajes de la papelera.',
  ],
  fixes: [
    {
      id: 'focus',
      title: 'La ayuda solo aparece con el ratón',
      where: 'Los tres botones de la barra.',
      problem:
        'El tooltip solo se abre al pasar el puntero. Quien usa el teclado ve tres iconos y no sabe qué hacen.',
      solution:
        'El tooltip se abre también al enfocar el botón. Además es su nombre (aria-labelledby): se ve y se anuncia el mismo texto.',
      before:
        '<button aria-label="Archivar"\n  onmouseenter="mostrar()">…</button>\n<span class="tooltip">Archivar</span>',
      after:
        '<button aria-labelledby="tip-archivar"\n  onfocus="mostrar()" onblur="ocultar()">…</button>\n<span role="tooltip" id="tip-archivar">Archivar</span>',
    },
    {
      id: 'dismiss',
      title: 'El tooltip se cierra antes de poder leerlo',
      where: 'El tooltip de cada botón.',
      problem:
        'Hay un hueco entre el botón y el tooltip: al mover el puntero hacia el texto, desaparece. Y Escape no lo cierra.',
      solution:
        'El puntero puede pasar del botón al tooltip sin que se cierre, y Escape lo cierra sin mover el foco (WCAG 1.4.13).',
      before:
        '<span class="tip">\n  <button onmouseleave="ocultar()">…</button>\n  <span class="tooltip tooltip--separado">…</span>\n</span>',
      after:
        '<span class="tip" onmouseenter="mostrar()"\n  onmouseleave="ocultar()">\n  <button>…</button>\n  <span role="tooltip">…</span>\n</span>\n/* Escape cierra el tooltip */',
    },
    {
      id: 'essential',
      title: 'Un dato importante está escondido en un «?»',
      where: 'Junto a la barra de botones.',
      problem:
        'Que la papelera se vacía a los 30 días solo aparece al pasar el puntero por el «?». Con teclado o en un móvil no se puede leer.',
      solution:
        'El aviso es un texto siempre visible. aria-describedby lo une al botón de la papelera como descripción.',
      before: '<span class="pista" onmouseenter="mostrar()">?</span>',
      after:
        '<button aria-labelledby="tip-papelera"\n  aria-describedby="ayuda-papelera">…</button>\n<p id="ayuda-papelera">Los mensajes de la papelera\n  se borran para siempre a los 30 días.</p>',
    },
  ],
  Page: MailToolbar,
}
