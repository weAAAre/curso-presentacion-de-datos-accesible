import type { ExampleDefinition } from '../types'
import { OrderHistory } from './OrderHistory'

export const orderHistoryExample: ExampleDefinition = {
  slug: 'pedidos',
  name: 'Historial de pedidos de una papelería',
  lesson: '4.1',
  lessonTitle: 'Tabla simple: título, encabezados y celdas',
  title: 'Mis pedidos · Papelería Trazo',
  tryIt: [
    'Con un lector de pantalla, entra en la tabla y muévete por las celdas (NVDA: Ctrl+Alt+flechas; VoiceOver: Ctrl+Opción+flechas).',
    'Llega hasta «7,50 €». ¿Sabes qué dato es?',
    'Estrecha la ventana o amplía la página al 400 % e intenta ver el estado del último pedido.',
  ],
  fixes: [
    {
      id: 'caption',
      title: 'La tabla no tiene título',
      where: 'Encima de la tabla.',
      problem:
        'El título es un párrafo suelto. El lector anuncia «tabla, 6 filas, 5 columnas», sin decir de qué.',
      solution:
        '<caption> es el título de la tabla. El lector lo anuncia al entrar en ella.',
      before: '<p class="titulo">Tus pedidos de 2026</p>\n<table>…</table>',
      after: '<table>\n  <caption>Tus pedidos de 2026</caption>\n  …\n</table>',
    },
    {
      id: 'headers',
      title: 'La primera fila no son encabezados',
      where: 'Fila «Pedido, Fecha, Artículos, Importe, Estado».',
      problem:
        'Son celdas normales en negrita. Al moverse por la tabla solo se oye «7,50 €», sin saber que es el importe.',
      solution:
        'Cada celda de la primera fila es un encabezado de columna (<th scope="col">). Ahora se oye «Importe, 7,50 €».',
      before:
        '<tr class="cabecera">\n  <td>Pedido</td>\n  <td>Fecha</td>\n  …\n</tr>',
      after:
        '<thead>\n  <tr>\n    <th scope="col">Pedido</th>\n    <th scope="col">Fecha</th>\n    …\n  </tr>\n</thead>',
    },
    {
      id: 'scroll',
      title: 'La tabla se recorta en pantallas estrechas',
      where: 'Contenedor de la tabla.',
      problem:
        'Con zoom o en un móvil, las últimas columnas quedan fuera (overflow: hidden) y no hay forma de verlas.',
      solution:
        'La tabla se desplaza dentro de su contenedor (overflow-x: auto). tabindex="0" permite moverla con las flechas, y role="region" con un nombre dice qué es.',
      before:
        '<div class="tabla-contenedor">\n  <table>…</table>\n</div>\n\n.tabla-contenedor { overflow: hidden; }',
      after:
        '<div class="tabla-contenedor" role="region"\n  aria-labelledby="titulo-pedidos" tabindex="0">\n  <table>…</table>\n</div>\n\n.tabla-contenedor { overflow-x: auto; }',
    },
  ],
  Page: OrderHistory,
}
