# Lyra Wildlife · sitio web (lyrawildlife.org)

Hosting: Netlify, plan gratuito. DNS en Namecheap. Online desde el 05/09/2026.

## Estructura

- `sitio/`: exactamente lo que se publica en Netlify. Acá no van borradores ni originales.
- `versiones/`: una copia de cada versión publicada, en una carpeta con fecha (AAAA-MM-DD).
- `material/`: insumos para trabajar.
  - `marca/`: logotipo en SVG (kit v2), favicon e íconos provisorios, PNG para la firma de email, guía de identidad y `colores.txt`.
  - `fotos/`: fotos candidatas y originales para la web.
  - `textos/`: borradores de contenido.
  - `mirada-natural/`: documentos del programa (convenio de aliado).
  - `aliados-logos/`: logos de las organizaciones aliadas.

## Reglas

1. Las páginas son bilingües: cada texto está dos veces, con `class="es"` y `class="en"`. Se editan las dos.
   Páginas: `index.html` (inicio), `orca-explorer/index.html` y `mirada-natural/index.html` (programas). Estilos en `estilos.css`; idioma y enlaces a formularios en `sitio.js`.
2. El historial de versiones lo lleva GitHub (cada publicación es un commit). La carpeta `versiones/` queda solo como registro de lo anterior y no se sube.
3. La copia de referencia en el proyecto de Claude (`claude/lyrawildlife_org_index.html`) se actualiza con cada publicación.
4. Nada se publica sin revisar antes una vista previa.
5. Armonía. Antes de cada commit: (a) todo título y párrafo arranca en la columna de texto (`--col`); solo fotos, portadas y bandas usan el bloque ancho (`--ancho`); (b) correr `material/herramientas/revisar.py` (alineación y desbordes en 4 páginas × 3 anchos); (c) releer los textos nuevos contra los existentes: mismo tono, mismos términos (aliados, impulsores, Banco de Imágenes de la Naturaleza) y sin contradecir reglas ya publicadas (acceso al banco solo con convenio, convenio no público, sin cifras no verificadas).

## Cómo publicar

- Claude edita en `sitio/` y deja el commit preparado. Kevin abre GitHub Desktop y aprieta "Push origin". Netlify, vinculado al repositorio, publica la rama `main` en un minuto.
- Cada push cuesta 15 de los 300 créditos mensuales del plan gratuito de Netlify (más el tráfico). Regla: acumular los cambios y publicar una vez por sesión de trabajo, no un push por cambio.
- Alternativa manual: app.netlify.com → Deploys → arrastrar la carpeta `sitio/`.

## Nota sobre Netlify

El plan gratuito bloquea los deploys de repositorios privados cuando quien hace el push (la cuenta de GitHub lyrawildlife) no es miembro del equipo de Netlify. Por eso el repositorio es público (03/10/2026). No volver a hacerlo privado sin cambiar el plan.

## Pendiente

- Vincular el sitio de Netlify al repositorio de GitHub (publish directory: `sitio`).
- Versión en preparación (01/10/2026, sin publicar): identidad v2 (paleta azul, wordmark, favicon) + sección Programas + página de Mirada Natural.
- Formulario de pedido de imágenes: lo procesa Netlify Forms. Activar una vez "Form detection" en el panel de Netlify (Forms) y agregar ahí la notificación por email a contacto@lyrawildlife.org. Los otros dos formularios (aliados, impulsores) siguen como Google Forms pendientes: pegar las URL en `sitio.js`.
- Colecciones de Mirada Natural: cargada la real "Fauna de la Patagonia argentina" (124 fotos; se ven 7, por eso el "+ 117"). Queda provisoria "Costa patagónica" (Paisajes) con miniaturas de `_provisorias/`; reemplazarla y borrar esa carpeta. Para cada colección nueva: nombre, categoría, descripción, línea de impulsor (si lo tiene), siete fotos 2,35:1 (2560 × 1089, `g-*.jpg`) con sus miniaturas 400 × 400 (`m-*.jpg`) en `sitio/mirada-natural/colecciones/<coleccion>/`, y el total de fotos para el "+N" (total menos 7). Al tocar una miniatura se intercambia con la portada, así las siete quedan siempre a la vista.
- Fotos de las portadas de programas en la home: `sitio/programas/orca-explorer.jpg` y `sitio/programas/mirada-natural.jpg` (ver `sitio/programas/LEEME.txt`).
- Fotos para las páginas de programas: `sitio/orca-explorer/portada.jpg` y `sitio/mirada-natural/portada.jpg` (horizontal, 2.35:1).
- Logos de aliados: bloque comentado en `mirada-natural/index.html`, listo para activar.
