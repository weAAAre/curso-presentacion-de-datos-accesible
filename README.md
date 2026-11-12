# Presentación de datos accesible

[![CI](https://github.com/weAAAre/curso-presentacion-de-datos-accesible/actions/workflows/ci.yml/badge.svg)](https://github.com/weAAAre/curso-presentacion-de-datos-accesible/actions/workflows/ci.yml) [![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-informational.svg)](./LICENSE)

Ejemplos del curso **Presentación de datos accesible** de [weAAAre](https://weaaare.com), con Jesús González Álvarez.

Cómo presentar datos para que cualquier persona pueda entenderlos y usarlos: iconos, tooltips, listas, cards, tablas y grids.

**Ábrelos en <https://weaaare.github.io/curso-presentacion-de-datos-accesible/>.**

Cada ejemplo es la web de una empresa ficticia que con ratón funciona bien y esconde barreras de accesibilidad a propósito, más la misma web ya arreglada. Puedes abrirlas, probarlas con teclado o con lector de pantalla y comparar el código de las dos versiones.

## Ejemplos

| Lección | Página                                         | Código                                                               | Dirección         |
| ------- | ---------------------------------------------- | -------------------------------------------------------------------- | ----------------- |
| 2.1     | Seguimiento de envíos de una mensajería        | [`src/examples/2.1-envios`](./src/examples/2.1-envios)               | `/envios/`        |
| 2.2     | Barra de acciones de un correo web             | [`src/examples/2.2-correo`](./src/examples/2.2-correo)               | `/correo/`        |
| 3.1     | Ficha de una casa rural                        | [`src/examples/3.1-casa-rural`](./src/examples/3.1-casa-rural)       | `/casa-rural/`    |
| 3.2     | Catálogo de cursos en cards                    | [`src/examples/3.2-academia`](./src/examples/3.2-academia)           | `/academia/`      |
| 4.1     | Historial de pedidos de una papelería          | [`src/examples/4.1-pedidos`](./src/examples/4.1-pedidos)             | `/pedidos/`       |
| 4.2     | Comparativa de tarifas de fibra y móvil        | [`src/examples/4.2-tarifas`](./src/examples/4.2-tarifas)             | `/tarifas/`       |
| 4.3     | Clasificación ordenable de una carrera popular | [`src/examples/4.3-carrera`](./src/examples/4.3-carrera)             | `/carrera/`       |
| 4.4     | Ofertas de empleo con filtros                  | [`src/examples/4.4-empleo`](./src/examples/4.4-empleo)               | `/empleo/`        |
| 5.1     | Horario de clases de un polideportivo          | [`src/examples/5.1-horario`](./src/examples/5.1-horario)             | `/horario/`       |
| 5.2     | Reserva de pistas de pádel                     | [`src/examples/5.2-pistas`](./src/examples/5.2-pistas)               | `/pistas/`        |
| 5.3     | Suscripciones de un quiosco digital            | [`src/examples/5.3-suscripciones`](./src/examples/5.3-suscripciones) | `/suscripciones/` |

## Cómo usarlo

Necesitas Node.js 22.12 o posterior y pnpm 10.

```bash
pnpm install
pnpm dev
```

| Dirección             | Qué ves                                           |
| --------------------- | ------------------------------------------------- |
| `/`                   | La lista de webs de ejemplo                       |
| `/<ejemplo>/`         | La web con sus barreras, sin nada más en pantalla |
| `/<ejemplo>/arreglo/` | La misma web ya arreglada                         |

Las webs no llevan ningún elemento del curso: lo que inspecciones en el DOM, en el árbol de accesibilidad o con el tabulador es solo de la web.

## Cómo está hecho cada ejemplo

Cada carpeta de `src/examples/` contiene:

- `Página.tsx`: el componente. Recibe `fixed`: con `false` dibuja la barrera y con `true`, el arreglo.
- `página.css`: sus estilos. Las barreras que dependen del CSS están al final, bajo la clase `--barrier`.
- `Página.example.ts`: la clave (lección, pasos para probarlo y cada cambio con su código antes y después). No se muestra en la web.
- `Página.test.tsx`: las pruebas de las dos versiones.

`src/examples/registry.ts` registra los ejemplos en el orden del curso.

## Estilo de los ejemplos

Cada ejemplo es la web de una empresa ficticia, con su marca, sus colores y contenido verosímil, como las webs de práctica de [retos.weaaare.com](https://retos.weaaare.com). Con ratón todo funciona; fuera de las barreras que enseña la lección, todo es accesible. No llevan dependencias ni recursos externos y nada se mueve solo.

La portada (`src/app/`) usa el lenguaje visual de weaaare.com (tokens en `src/brand/tokens.css`) y enseña una captura de cada web, que se regenera con `pnpm thumbnails`. La web no se indexa en buscadores, porque contiene barreras a propósito.

## Comprobaciones

```bash
pnpm check
```

Ejecuta las pruebas (Vitest, Testing Library y axe), el lint (Biome) y la compilación. Las pruebas automáticas no sustituyen la revisión con teclado, lector de pantalla y zoom.

## Contribuir

Las reglas de los ejemplos y los pasos para añadir uno están en [CONTRIBUTING.md](./CONTRIBUTING.md).

## Licencia

El código se publica con licencia [MIT](./LICENSE). El nombre y el logotipo de weAAAre son marca de weAAAre y no forman parte de esa licencia. Las tipografías (Fraunces y Atkinson Hyperlegible) se distribuyen con la SIL Open Font License.
