# Loader de Links ElaBela

Fecha: 2026-10-08.

## Resultado y dirección

Presentación breve de marca antes del selector de país de `links.elabela.com.py`.
Referencias inspeccionadas: `https://influencers.elabela.com.py/` y
`https://www.elabela.com.py/`. Reutiliza la identidad cacao/marfil y luz cálida.
La firma propia de Links son dos trazos elípticos que se enlazan alrededor del
logo, seguidos por “Tu mundo de belleza / a un toque.” y Tienda · Redes · Contacto.

- Cacao `#1b100c`, marfil `#fcebdc`, champagne `#d7ad81`, rosa dorado `#dfb893`.
- Playfair Display para el titular y Poppins para las etiquetas, con fuentes de reserva.
- CSS propio y React 18. Sin nuevas dependencias ni cambios de lockfile.
- Se reutiliza el SVG de la misma marca presente en el proyecto de Influencers.
  El dibujo se conserva; solo se normalizó el salto de línea final.
- GSAP/Motion, componentes headless, React Bits, Uiverse y WebGL no son necesarios
  para una secuencia predeterminada con un botón nativo. No se incorporó código de esas bibliotecas.

## Comportamiento

- 2.600 ms de presentación + 650 ms de salida. No representa progreso de descarga.
- Entrada manual inmediata mediante Entrar o Escape; Tab y Shift+Tab permanecen
  en el control de entrada. El selector recupera el foco después de retirar `inert`.
- El fondo se desvanece antes que la composición; el selector aparece debajo.
- No se repite por cambiar de país o idioma. Se reproduce al cargar un documento nuevo.
- Con movimiento reducido, presentación estática y salida a los 350 ms. Se suspenden
  las partículas y el movimiento de la página. Cambios del ajuste del sistema se escuchan en vivo.
- Los temporizadores no esperan al logo, Google Fonts, banderas ni red.
  Un fallo del SVG muestra el nombre de marca como texto.
- Precarga del logo; fondo inicial incluido en HTML. Google Fonts usa una sola hoja
  no bloqueante. El selector y los enlaces mantienen los contactos existentes.
- La apertura de país respeta movimiento reducido y limpia su temporizador.

## Verificación local

- `npm run build`: correcto. El proyecto no tiene scripts de lint, typecheck o tests;
  no se añadió una suite para comprobar cadenas literales.
- `git diff --check`: correcto.
- Chromium del navegador integrado, compilación de producción servida con Vite preview.
- Capturas inspeccionadas en 1280 × 720, 390 × 844, 320 × 568 y 844 × 390.
  Sin desbordamiento horizontal; Entrar tiene 44 px de altura. Evidencia local en
  `.qa/loader/`, excluida de Git.
- Salida automática medida: 3.258 ms desde el comienzo de la observación; loader retirado,
  scroll restituido, `inert` retirado y foco en Paraguay.
- Entrar, Escape, Tab y Shift+Tab comprobados. La prueba detectó una pérdida de foco
  por heredar `visibility` durante la salida anticipada; se corrigió usando opacidad
  para ocultar la escena y se verificó de nuevo el foco real.
- `prefers-reduced-motion: reduce`: sin animaciones en ejecución al terminar,
  acceso al selector y partículas ocultas; entrada a Brasil con documento en portugués.
- Logo y Google Fonts bloqueados deliberadamente: texto de reserva visible, salida
  automática y acceso a tienda comprobados.
- Paraguay, Brasil, volver al selector, Instagram, Facebook y URL de WhatsApp de
  Vendedora comprobados. No se enviaron mensajes externos.
- No se verificaron dispositivos físicos, Safari/WebKit ni Firefox.

## Peso

| Recurso | Antes | Después |
| --- | ---: | ---: |
| JS, gzip | 51,16 kB | 52,22 kB |
| CSS, gzip | 4,38 kB | 6,04 kB |
| SVG de marca nuevo, sin comprimir | — | 10.291 bytes |

El loader añade aproximadamente 2,72 kB gzip al JS/CSS de la aplicación.
No se añadió un motor de animación ni un renderizador. Las partículas se detienen
durante la intro y el selector.

## Mantenimiento y recuperación

`BrandLoader.jsx` contiene los tiempos y la salida; `BrandLoader.css`, la composición.
Las animaciones nuevas solo desplazan/escalan capas o cambian su opacidad.
Para retirar esta entrega, revertir su commit con Git y volver a desplegar; el commit
base anterior es `8dfc671`. Las notas locales previas de influencers se mantienen
fuera del commit de esta tarea.
