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
   Páginas: `index.html` (inicio) y `mirada-natural/index.html` (programa). Estilos en `estilos.css`; idioma y enlaces a formularios en `sitio.js`.
2. El historial de versiones lo lleva GitHub (cada publicación es un commit). La carpeta `versiones/` queda solo como registro de lo anterior y no se sube.
3. La copia de referencia en el proyecto de Claude (`claude/lyrawildlife_org_index.html`) se actualiza con cada publicación.
4. Nada se publica sin revisar antes una vista previa.

## Cómo publicar

- Claude edita en `sitio/` y deja el commit preparado. Kevin abre GitHub Desktop y aprieta "Push origin". Netlify, vinculado al repositorio, publica la rama `main` en un minuto.
- Alternativa manual: app.netlify.com → Deploys → arrastrar la carpeta `sitio/`.

## Pendiente

- Vincular el sitio de Netlify al repositorio de GitHub (publish directory: `sitio`).
- Versión en preparación (01/10/2026, sin publicar): identidad v2 (paleta azul, wordmark, favicon) + sección Programas + página de Mirada Natural.
- Formularios de Mirada Natural: crear los tres Google Forms (aliados, pedido de imágenes, sponsors) y pegar las URL en `sitio.js`. Hasta entonces los botones abren un correo a contacto@.
- Fotos de las portadas de programas en la home: `sitio/programas/orca-explorer.jpg` y `sitio/programas/mirada-natural.jpg` (ver `sitio/programas/LEEME.txt`).
- Foto para la página de Mirada Natural: guardar `sitio/mirada-natural/portada.jpg` (horizontal, 2.35:1).
- Logos de aliados: bloque comentado en `mirada-natural/index.html`, listo para activar.
