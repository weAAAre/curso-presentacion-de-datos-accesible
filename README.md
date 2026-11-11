# Presentación de datos accesible

Ejemplos del curso **Presentación de datos accesible** de [weAAAre](https://weaaare.com), con Jesús González Álvarez.

Cómo presentar datos para que cualquier persona pueda entenderlos y usarlos: iconos, tooltips, listas, cards, tablas y grids.

Cada ejemplo es una página pequeña con una barrera de accesibilidad y la misma página con el arreglo. Puedes abrirlas, probarlas con teclado o con lector de pantalla y comparar el código de las dos versiones.

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

| Dirección             | Qué ves                                                    |
| --------------------- | ---------------------------------------------------------- |
| `/`                   | Todos los ejemplos, por módulo                             |
| `/<ejemplo>/`         | La ficha del ejemplo: qué probar y qué cambia en el código |
| `/<ejemplo>/barrera/` | La página con la barrera, sin nada más en pantalla         |
| `/<ejemplo>/arreglo/` | La página con el arreglo, sin nada más en pantalla         |

Las páginas con la barrera y con el arreglo no llevan ningún elemento del curso: lo que inspecciones en el DOM, en el árbol de accesibilidad o con el tabulador es solo de la página.

## Cómo está hecho cada ejemplo

Cada carpeta de `src/examples/` contiene:

- `Página.tsx`: el componente. Recibe `fixed`: con `false` dibuja la barrera y con `true`, el arreglo.
- `página.css`: sus estilos. Las barreras que dependen del CSS están al final, bajo la clase `--barrier`.
- `Página.example.ts`: la ficha (lección, pasos para probarlo y cada cambio con su código antes y después).
- `Página.test.tsx`: las pruebas de las dos versiones.

`src/examples/registry.ts` registra los ejemplos en el orden del curso.

## Estilo de los ejemplos

Todos los ejemplos comparten el lenguaje visual de weAAAre para que nada distraiga de lo que enseñan:

- Papel blanco, tinta negra y bordes de 2 px. Sin colores de marca propios en cada página.
- La tipografía de titulares solo en el título principal; el resto de encabezados, en Atkinson negrita.
- Sombra desplazada solo en lo que se puede pulsar (botones y tarjetas enlazables).
- Ámbar solo al pasar el puntero y en el foco.
- Hay color únicamente cuando la lección trata de él (estados, contraste) y en las ilustraciones que hacen de foto.
- Nada se mueve solo, salvo en la lección de movimiento.

Los tokens están en `src/brand/tokens.css` y la base común en `src/examples/example-base.css`. La portada y las fichas (`src/app/`) copian la composición de weaaare.com: barra con el logotipo, cabecera con degradado y franja de datos, tarjetas y acordeón.

## Comprobaciones

```bash
pnpm check
```

Ejecuta las pruebas (Vitest, Testing Library y axe), el lint (Biome) y la compilación. Las pruebas automáticas no sustituyen la revisión con teclado, lector de pantalla y zoom.
