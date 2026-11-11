import type { ExampleDefinition } from '../types'
import { ShipmentTracking } from './ShipmentTracking'

export const shipmentTrackingExample: ExampleDefinition = {
  slug: 'envios',
  name: 'Seguimiento de envíos de una mensajería',
  lesson: '2.1',
  lessonTitle: 'Iconografía: significado y nombre accesible',
  title: 'Mis envíos · Mensajería Rayo',
  tryIt: [
    'Sin fijarte en los colores, busca el envío que tiene un problema.',
    'Con un lector de pantalla, salta de título en título (tecla H).',
    'Pulsa Tab y escucha cómo se anuncia cada botón con icono.',
  ],
  fixes: [
    {
      id: 'status',
      title: 'El estado es solo un círculo de color',
      where: 'Debajo de la fecha de cada envío.',
      problem:
        'El círculo solo cambia de color y no tiene texto. El lector de pantalla no anuncia nada, y quien no distingue el rojo del verde tampoco sabe qué envío falla.',
      solution:
        'El estado se escribe con palabras. El icono cambia de forma según el estado y se oculta al lector para no repetir lo mismo.',
      before:
        '<p class="status status--issue">\n  <svg viewBox="0 0 24 24">…</svg>\n</p>',
      after:
        '<p class="status status--issue">\n  <svg aria-hidden="true" …>…</svg>\n  <span>Incidencia: dirección incompleta</span>\n</p>',
    },
    {
      id: 'decorative',
      title: 'La ilustración de la caja se anuncia en cada envío',
      where: 'Junto al título de cada envío.',
      problem:
        'La caja es un adorno, pero tiene texto alternativo. El lector lee «Icono de una caja de cartón» antes de cada título.',
      solution:
        'Un texto alternativo vacío (alt="") indica que la imagen es decorativa. El lector se la salta.',
      before:
        '<h2>\n  <img src="caja.svg" alt="Icono de una caja de cartón">\n  Envío a Lugo\n</h2>',
      after: '<h2>\n  <img src="caja.svg" alt="">\n  Envío a Lugo\n</h2>',
    },
    {
      id: 'icon-name',
      title: 'Los botones con icono no tienen nombre',
      where: 'Botón de copiar y enlace de descarga de cada envío.',
      problem:
        'Solo contienen un dibujo. El lector anuncia «botón» o «enlace», sin decir qué hacen ni a qué envío afectan.',
      solution:
        'aria-label da a cada uno un nombre con la acción y el envío: «Copiar número de seguimiento RY4821».',
      before:
        '<button type="button">\n  <svg aria-hidden="true">…</svg>\n</button>',
      after:
        '<button type="button"\n  aria-label="Copiar número de seguimiento RY4821">\n  <svg aria-hidden="true">…</svg>\n</button>',
    },
  ],
  Page: ShipmentTracking,
}
