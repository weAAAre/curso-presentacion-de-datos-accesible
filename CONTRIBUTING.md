# Cómo contribuir

Este repositorio contiene las webs de ejemplo de un curso de [weAAAre](https://weaaare.com). Si encuentras un error o quieres proponer una mejora, abre una incidencia o una pull request.

## Antes de empezar

Necesitas Node.js 22.12 o posterior y pnpm 10.

```bash
pnpm install
pnpm dev
```

## Reglas de los ejemplos

- **Las barreras son a propósito.** No las arregles en la versión con barrera: cada una está descrita en el `*.example.ts` de su carpeta, con el paso para notarla y su arreglo.
- **Fuera de esas barreras, todo es accesible.** La versión arreglada cumple WCAG 2.2 AA: contraste, foco visible, teclado, reflow a 320 px y nada que se mueva solo.
- **Cada ejemplo es una web verosímil** de una empresa ficticia, con su propia marca. Sin datos reales, sin dependencias nuevas y sin recursos externos.
- **Nada del curso en pantalla.** La web de ejemplo no lleva avisos ni controles ajenos: lo que se inspecciona es solo suyo.
- Si cambias una barrera o un arreglo, actualiza su `*.example.ts` y sus pruebas en el mismo cambio.

## Añadir un ejemplo

1. Crea la carpeta `src/examples/<lección>-<slug>/` con el componente, su CSS, su `*.example.ts` y sus pruebas. Lo más rápido es copiar un ejemplo parecido.
2. Añádelo a `src/examples/registry.ts`, en el orden del curso, y a la tabla del README.
3. Ejecuta `pnpm thumbnails` para capturar su portada del índice (la primera vez, `pnpm exec playwright install chromium`).
4. Ejecuta `pnpm check`.

## Antes de subir

```bash
pnpm check
```

Ejecuta las pruebas, el lint y la compilación; es lo mismo que comprueba la integración continua. Los mensajes de commit siguen [Conventional Commits](https://www.conventionalcommits.org/es/) (`feat:`, `fix:`, `docs:`…).

Al llegar a `main`, GitHub Actions publica la web en GitHub Pages.
