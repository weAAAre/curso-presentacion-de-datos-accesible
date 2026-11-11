import type { ExampleDefinition } from '../types'
import { RaceResults } from './RaceResults'

export const raceResultsExample: ExampleDefinition = {
  slug: 'carrera',
  name: 'Clasificación ordenable de una carrera popular',
  lesson: '4.3',
  lessonTitle: 'Tabla ordenable: controles y dirección de ordenación',
  title: 'Clasificación de los 10 km · Carrera popular de Villaverde',
  tryIt: [
    'Usando solo el teclado, ordena la clasificación por nombre.',
    'Con un lector de pantalla, escucha el encabezado de la columna ordenada.',
    'Cambia el orden y fíjate en si algo te confirma el cambio.',
  ],
  fixes: [
    {
      id: 'sort-button',
      title: 'Solo se puede ordenar con el ratón',
      where: 'Encabezados «Nombre», «Categoría» y «Tiempo».',
      problem:
        'El encabezado responde al clic, pero no recibe el foco. Con teclado no hay forma de ordenar.',
      solution:
        'Un <button> dentro del <th>. Se alcanza con Tab y se activa con Enter o Espacio. El foco se queda en el botón.',
      before: '<th onclick="ordenar(\'nombre\')">\n  Nombre ▲\n</th>',
      after:
        '<th>\n  <button type="button" onclick="ordenar(\'nombre\')">\n    Nombre <span aria-hidden="true">▲</span>\n  </button>\n</th>',
    },
    {
      id: 'aria-sort',
      title: 'El orden solo se indica con una flecha',
      where: 'Encabezado de la columna ordenada.',
      problem:
        'La flecha solo se ve. El lector no dice qué columna ordena la tabla ni en qué sentido.',
      solution:
        'aria-sort="ascending" o "descending" en el encabezado ordenado, y solo en ese. La flecha se oculta al lector.',
      before: '<th>Tiempo ▲</th>',
      after:
        '<caption>Resultados de los 10 km\n  <span class="visually-hidden">. Los encabezados\n    con botón permiten ordenar.</span>\n</caption>\n…\n<th aria-sort="ascending">\n  <button>Tiempo <span aria-hidden="true">▲</span></button>\n</th>',
    },
    {
      id: 'announce',
      title: 'Las filas cambian sin avisar',
      where: 'Mensaje encima de la tabla.',
      problem:
        'Al ordenar, el foco sigue en el botón y las filas cambian más abajo. Nada confirma que haya pasado algo.',
      solution:
        'Un mensaje breve y visible (role="status"): «Ordenada por nombre, de la A a la Z». El lector lo anuncia sin mover el foco.',
      before: '<!-- Nada indica el orden actual -->',
      after: '<p role="status">\n  Ordenada por nombre, de la A a la Z.\n</p>',
    },
  ],
  Page: RaceResults,
}
