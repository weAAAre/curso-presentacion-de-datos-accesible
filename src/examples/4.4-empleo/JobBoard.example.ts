import type { ExampleDefinition } from '../types'
import { JobBoard } from './JobBoard'

export const jobBoardExample: ExampleDefinition = {
  slug: 'empleo',
  name: 'Ofertas de empleo con filtros',
  lesson: '4.4',
  lessonTitle: 'Tabla con filtros: resultados y continuidad de la tarea',
  title: 'Ofertas de empleo · Brote Empleo',
  tryIt: [
    'Escribe «diseñadora» en el buscador. ¿Dónde acaba lo que escribes?',
    'Elige una modalidad. ¿Sigues viendo qué es ese campo?',
    'Busca «chef» en modalidad remota. ¿Qué ha pasado?',
    'Intenta volver a ver todas las ofertas.',
  ],
  fixes: [
    {
      id: 'labels',
      title: 'Los filtros no tienen etiqueta',
      where: 'Buscador y selector de modalidad.',
      problem:
        'La pista del buscador desaparece al escribir, y «Modalidad» desaparece al elegir una opción. Después no se sabe qué es cada campo.',
      solution:
        'Cada filtro tiene una etiqueta (<label>) siempre visible. El lector la anuncia al enfocar el campo.',
      before:
        '<input type="search" placeholder="Buscar…">\n<select>\n  <option value="">Modalidad</option>…\n</select>',
      after:
        '<label for="q">Puesto o empresa</label>\n<input id="q" type="search">\n<label for="modalidad">Modalidad</label>\n<select id="modalidad">\n  <option value="">Todas</option>…\n</select>',
    },
    {
      id: 'focus',
      title: 'El foco salta a los resultados',
      where: 'Título «Resultados».',
      problem:
        'Con cada letra, el foco se va al título de resultados. La segunda letra ya no entra en el buscador.',
      solution:
        'El foco se queda en el filtro. El resultado se comunica con un mensaje, no moviendo el foco.',
      before:
        'input.addEventListener("input", () => {\n  filtrar()\n  tituloResultados.focus()\n})',
      after:
        'input.addEventListener("input", () => {\n  filtrar()\n  // El foco no se mueve\n})',
    },
    {
      id: 'status',
      title: 'No se sabe cuántos resultados quedan',
      where: 'Debajo del título «Resultados».',
      problem:
        'Nada dice cuántas ofertas hay. Hay que recorrer la tabla para saberlo.',
      solution:
        'Un mensaje visible, «Mostrando 3 de 8 ofertas», dentro de role="status". El lector lo anuncia sin mover el foco.',
      before: '<p class="contador"></p>',
      after:
        '<p class="contador" role="status">\n  Mostrando 3 de 8 ofertas.\n</p>',
    },
    {
      id: 'empty',
      title: 'Sin resultados, la tabla se queda vacía',
      where: 'Zona de la tabla, cuando nada coincide.',
      problem:
        'Solo queda la cabecera. Parece un fallo, y para volver hay que deshacer cada filtro a mano.',
      solution:
        'Un mensaje dice qué filtros no dan resultados, y «Quitar los filtros» recupera todas las ofertas en un paso.',
      before: '<table>\n  <thead>…</thead>\n  <tbody></tbody>\n</table>',
      after:
        '<p role="status">No hay ofertas para «chef»\n  en modalidad remoto.</p>\n<p>Prueba con otra palabra o con otra modalidad.</p>\n<button type="button">Quitar los filtros</button>',
    },
  ],
  Page: JobBoard,
}
