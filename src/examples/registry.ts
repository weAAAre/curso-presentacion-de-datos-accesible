import { shipmentTrackingExample } from './2.1-envios/ShipmentTracking.example'
import { mailToolbarExample } from './2.2-correo/MailToolbar.example'
import { ruralHouseExample } from './3.1-casa-rural/RuralHouse.example'
import { courseCatalogExample } from './3.2-academia/CourseCatalog.example'
import { orderHistoryExample } from './4.1-pedidos/OrderHistory.example'
import { planComparisonExample } from './4.2-tarifas/PlanComparison.example'
import { raceResultsExample } from './4.3-carrera/RaceResults.example'
import { jobBoardExample } from './4.4-empleo/JobBoard.example'
import { classTimetableExample } from './5.1-horario/ClassTimetable.example'
import { courtBookingExample } from './5.2-pistas/CourtBooking.example'
import { subscriptionsExample } from './5.3-suscripciones/Subscriptions.example'
import type { ExampleDefinition } from './types'

/** Única fuente de las páginas de ejemplo, en el orden del curso. */
export const exampleRegistry: ExampleDefinition[] = [
  shipmentTrackingExample,
  mailToolbarExample,
  ruralHouseExample,
  courseCatalogExample,
  orderHistoryExample,
  planComparisonExample,
  raceResultsExample,
  jobBoardExample,
  classTimetableExample,
  courtBookingExample,
  subscriptionsExample,
]
