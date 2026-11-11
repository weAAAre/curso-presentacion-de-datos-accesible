import type { ExampleDefinition } from '../types'
import { CourseCatalog } from './CourseCatalog'

export const courseCatalogExample: ExampleDefinition = {
  slug: 'academia',
  name: 'Catálogo de cursos en cards',
  lesson: '3.2',
  lessonTitle: 'Cards: estructura, acciones y orden de lectura',
  title: 'Cursos de otoño · Academia Faro',
  tryIt: [
    'Recorre las cards con Tab. ¿El foco sigue el orden que ves?',
    'Con un lector de pantalla, salta de título en título (tecla H).',
    'Escucha el nombre de cada enlace y de cada botón «Guardar».',
    'Cambia a la vista «Lista» y repite.',
  ],
  fixes: [
    {
      id: 'heading',
      title: 'El título de cada card solo parece un título',
      where: 'Título de cada curso.',
      problem:
        'Es un texto grande dentro de un <span>. Con un lector de pantalla no se puede saltar de curso en curso: hay que escuchar cada card entera.',
      solution:
        'El título es un encabezado (<h2>) con el enlace al curso dentro.',
      before: '<span class="card__titulo">Excel desde cero</span>',
      after:
        '<h2 class="card__titulo">\n  <a href="/cursos/excel">Excel desde cero</a>\n</h2>',
    },
    {
      id: 'nested',
      title: 'Hay un botón dentro de un enlace',
      where: 'Cada card y su botón «Guardar».',
      problem:
        'Toda la card es un enlace y el botón está dentro. El enlace se anuncia con todo el texto de la card, y los cuatro botones se llaman igual: «Guardar».',
      solution:
        'El enlace va solo en el título y el botón queda al lado, con el nombre del curso. Un pseudoelemento hace que toda la card siga respondiendo al clic.',
      before:
        '<a href="/cursos/excel" class="card">\n  <span>Excel desde cero</span>\n  <p>12 horas · En línea</p>\n  <button>Guardar</button>\n</a>',
      after:
        '<li class="card">\n  <h2><a href="/cursos/excel">Excel desde cero</a></h2>\n  <p>12 horas · En línea</p>\n  <button>Guardar\n    <span class="visually-hidden">Excel desde cero</span>\n  </button>\n</li>\n\n.card__link::after { position: absolute; inset: 0; }',
    },
    {
      id: 'order',
      title: 'El curso destacado se ve primero, pero se alcanza el último',
      where: 'Lista de cursos, en la vista de cuadrícula.',
      problem:
        'En el código es el último; el CSS lo coloca el primero (order: -1). El foco empieza en la segunda card y vuelve atrás al final.',
      solution:
        'El curso destacado se escribe el primero en el HTML. Lo que se ve, lo que se lee y el foco siguen el mismo orden.',
      before:
        '<ul class="catalogo">\n  <li>Fotografía…</li>\n  <li>Inglés…</li>\n  <li>Huerto…</li>\n  <li class="card--destacada">Excel…</li>\n</ul>\n\n.card--destacada { order: -1; }',
      after:
        '<ul class="catalogo">\n  <li class="card--destacada">Excel…</li>\n  <li>Fotografía…</li>\n  <li>Inglés…</li>\n  <li>Huerto…</li>\n</ul>',
    },
  ],
  Page: CourseCatalog,
}
