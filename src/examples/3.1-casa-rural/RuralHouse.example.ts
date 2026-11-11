import type { ExampleDefinition } from '../types'
import { RuralHouse } from './RuralHouse'

export const ruralHouseExample: ExampleDefinition = {
  slug: 'casa-rural',
  name: 'Ficha de una casa rural',
  lesson: '3.1',
  lessonTitle: 'Listas: expresar relaciones entre elementos',
  title: 'Casa El Roble, en Collera · Casa rural El Roble',
  tryIt: [
    'Con un lector de pantalla, busca las listas de la página (NVDA: tecla L; VoiceOver: rotor).',
    'Lee «Cómo llegar». ¿Sabes cuántos pasos hay?',
    'Lee «Datos del alojamiento» de arriba abajo. ¿Qué valor corresponde a «Salida»?',
  ],
  fixes: [
    {
      id: 'ul',
      title: 'Los servicios son párrafos sueltos',
      where: 'Sección «Servicios».',
      problem:
        'Parecen una lista, pero son cinco párrafos. El lector no dice que van juntos ni cuántos son.',
      solution:
        'Una lista no ordenada (<ul>). El lector anuncia «lista, 5 elementos» y permite saltar a ella o pasarla de largo.',
      before:
        '<div class="servicios">\n  <p>• Wifi en toda la casa</p>\n  <p>• Chimenea de leña</p>\n</div>',
      after:
        '<ul class="servicios">\n  <li>Wifi en toda la casa</li>\n  <li>Chimenea de leña</li>\n</ul>',
    },
    {
      id: 'ol',
      title: 'Los pasos no forman una secuencia',
      where: 'Sección «Cómo llegar».',
      problem:
        'El número de cada paso es un dibujo de CSS. El lector no dice en qué paso estás ni cuántos faltan.',
      solution:
        'Una lista ordenada (<ol>). El número forma parte del contenido y el lector anuncia la posición: «2 de 4».',
      before:
        '<div class="pasos">\n  <div class="paso">Toma la salida 334…</div>\n  <div class="paso">En la rotonda…</div>\n</div>',
      after:
        '<ol class="pasos">\n  <li>Toma la salida 334…</li>\n  <li>En la rotonda…</li>\n</ol>',
    },
    {
      id: 'dl',
      title: 'Los nombres y sus valores se leen por separado',
      where: 'Sección «Datos del alojamiento».',
      problem:
        'En el código van primero todos los nombres y después todos los valores. Se oye «Entrada, Salida, Capacidad, Mascotas» y luego cuatro datos sin dueño.',
      solution:
        'Una lista de descripciones (<dl>). Cada nombre (<dt>) va seguido de su valor (<dd>).',
      before:
        '<div class="datos">\n  <div><p>Entrada</p><p>Salida</p>…</div>\n  <div><p>A partir de las 16:00</p>…</div>\n</div>',
      after:
        '<dl class="datos">\n  <div>\n    <dt>Entrada</dt>\n    <dd>A partir de las 16:00</dd>\n  </div>\n  …\n</dl>',
    },
  ],
  Page: RuralHouse,
}
