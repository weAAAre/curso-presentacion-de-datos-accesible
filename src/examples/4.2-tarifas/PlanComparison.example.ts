import type { ExampleDefinition } from '../types'
import { PlanComparison } from './PlanComparison'

export const planComparisonExample: ExampleDefinition = {
  slug: 'tarifas',
  name: 'Comparativa de tarifas de fibra y móvil',
  lesson: '4.2',
  lessonTitle: 'Tabla con doble eje: encabezados de fila y columna',
  title: 'Compara nuestras tarifas · Onda Fibra',
  tryIt: [
    'Con un lector de pantalla, colócate en «12 meses», en la columna Plus.',
    'Sube y baja por la columna (NVDA: Ctrl+Alt+flechas; VoiceOver: Ctrl+Opción+flechas). ¿Sabes qué es cada valor?',
    'Escucha las celdas que solo tienen un icono.',
  ],
  fixes: [
    {
      id: 'row-headers',
      title: 'La primera columna no son encabezados',
      where: 'Columna «Velocidad de fibra», «Precio al mes»…',
      problem:
        'Al bajar por la columna Plus se oye «35 €», «2», «12 meses». Se sabe la tarifa, pero no qué es cada valor.',
      solution:
        'Cada celda de la primera columna es un encabezado de fila (<th scope="row">). Ahora se oye «Permanencia, 12 meses».',
      before:
        '<tr>\n  <td class="caracteristica">Permanencia</td>\n  <td>Sin permanencia</td>\n  <td>12 meses</td>\n  …\n</tr>',
      after:
        '<tr>\n  <th scope="row">Permanencia</th>\n  <td>Sin permanencia</td>\n  <td>12 meses</td>\n  …\n</tr>',
    },
    {
      id: 'included',
      title: 'Las celdas con icono se anuncian vacías',
      where: 'Filas «Televisión» y «Router wifi 6».',
      problem:
        'La marca y la cruz son dibujos ocultos al lector. En la fila «Televisión» se oyen tres celdas en blanco.',
      solution:
        'Cada celda añade un texto oculto a la vista: «Incluida» o «No incluida». La marca y la cruz tienen formas distintas, no solo colores.',
      before: '<td>\n  <svg aria-hidden="true">…</svg>\n</td>',
      after:
        '<td>\n  <svg aria-hidden="true">…</svg>\n  <span class="visually-hidden">Incluida</span>\n</td>',
    },
  ],
  Page: PlanComparison,
}
