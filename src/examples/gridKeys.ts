export interface GridPosition {
  row: number
  column: number
}

/**
 * Celda de destino para una tecla del patrón grid de WAI-ARIA APG, o
 * `undefined` si la tecla no mueve el foco. En los bordes el foco no salta de
 * línea: se queda en la última celda alcanzable. Compartido por las páginas de
 * ejemplo del módulo 5.
 */
export function nextGridPosition(
  key: string,
  ctrlKey: boolean,
  { row, column }: GridPosition,
  rows: number,
  columns: number,
): GridPosition | undefined {
  const lastRow = rows - 1
  const lastColumn = columns - 1
  switch (key) {
    case 'ArrowRight':
      return { row, column: Math.min(column + 1, lastColumn) }
    case 'ArrowLeft':
      return { row, column: Math.max(column - 1, 0) }
    case 'ArrowDown':
      return { row: Math.min(row + 1, lastRow), column }
    case 'ArrowUp':
      return { row: Math.max(row - 1, 0), column }
    case 'Home':
      return { row: ctrlKey ? 0 : row, column: 0 }
    case 'End':
      return { row: ctrlKey ? lastRow : row, column: lastColumn }
    default:
      return undefined
  }
}
