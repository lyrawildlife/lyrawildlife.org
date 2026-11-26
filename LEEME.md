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
   Diseño de una sola página (desde el 26/11/2026): el inicio (`index.html`) tiene Quiénes somos, Programas y Contacto, y el menú baja a esas secciones (`#quienes-somos`, `#programas`, `#contacto`). Aparte quedan las páginas de programas (`mirada-natural/`, con colecciones y postulación, y `orca-explorer/`, oculta por ahora) e `institucional/` (datos registrales, autoridades y documentación), que no está en el menú: se llega desde el pie. `quienes-somos/`, `programas/` y `contacto/` son páginas mínimas que redirigen a su sección del inicio, para que no se rompan enlaces viejos. Estilos en `estilos.css`; idioma, formularios y menú de celular en `sitio.js`. El menú (`<nav class="menu">` y el panel de celular) y el pie (`<nav class="pie-nav">`) se repiten en todas las páginas: un cambio se hace en todas.
2. El historial de versiones lo lleva GitHub (cada publicación es un commit). La carpeta `versiones/` queda solo como registro de lo anterior y no se sube.
3. El documento de referencia en el proyecto de Claude (`claude/Lyra_Wildlife_Sitio_Web.md`) se actualiza con cada publicación.
4. Nada se publica sin revisar antes una vista previa.
5. Armonía. Antes de cada commit: (a) todo título y párrafo arranca en la columna de texto (`--col`); solo fotos, portadas y bandas usan el bloque ancho (`--ancho`); (b) correr `material/herramientas/revisar.py` (alineación, desbordes y errores de JS en todas las páginas × 3 anchos); (c) releer los textos nuevos contra los existentes: mismo tono, mismos términos (Red Mirada Natural y organizaciones de la red, impulsores, Banco de Imágenes de la Naturaleza; desde el 22/11/2026 no se usa "aliados") y sin contradecir reglas ya publicadas (acceso al banco solo con convenio, convenio no público, sin cifras no verificadas).
6. Imágenes. Cada imagen que Claude escribe en la Mac llega con un manifiesto C2PA ("Content Credentials") firmado por Anthropic que dice que Claude pudo haber creado o modificado el archivo. Son fotos reales, así que se quita antes del commit: `python3 material/herramientas/quitar-c2pa.py sitio` (deja el archivo byte a byte como el original). Si una imagen no pasó por Claude (la copió Kevin), no trae nada.

## Cómo ver los cambios sin publicar

Después de cada cambio, Claude regenera `vista-previa/` (no se sube a GitHub). Para ver el sitio tal como quedaría: abrir `vista-previa/index.html` con doble clic. Se navega entero, con todas las páginas, sin servidor. El formulario de pedido no envía nada en la vista previa (eso lo hace Netlify). Para regenerarla a mano: `python3 material/herramientas/vista-previa.py`.

Los commits quedan en la Mac y no cuestan nada; solo el push (GitHub Desktop → Push origin) publica y gasta créditos de Netlify. Regla desde el 31/10/2026: acumular cambios, revisarlos en la vista previa y hacer pocos pushes.

## Cómo publicar

- Claude edita en `sitio/` y deja el commit preparado. Kevin abre GitHub Desktop y aprieta "Push origin". Netlify, vinculado al repositorio, publica la rama `main` en un minuto.
- Cada push cuesta 15 de los 300 créditos mensuales del plan gratuito de Netlify (más el tráfico). Regla: acumular los cambios y publicar una vez por sesión de trabajo, no un push por cambio.
- Alternativa manual: app.netlify.com → Deploys → arrastrar la carpeta `sitio/`.

## Nota sobre Netlify

El plan gratuito bloquea los deploys de repositorios privados cuando quien hace el push (la cuenta de GitHub lyrawildlife) no es miembro del equipo de Netlify. Por eso el repositorio es público (03/10/2026). No volver a hacerlo privado sin cambiar el plan.

## Pendiente

- Vincular el sitio de Netlify al repositorio de GitHub (publish directory: `sitio`).
- Versión en preparación (01/10/2026, sin publicar): identidad v2 (paleta azul, wordmark, favicon) + sección Programas + página de Mirada Natural.
- Formularios (Netlify Forms, envíos gratis e ilimitados en los planes por créditos desde abril de 2026): "contacto" (sección Contacto del inicio; gracias en `gracias/`), "pedido-imagenes" (en mirada-natural/colecciones/, plegado) y "postulacion-red" (mirada-natural/postulacion/). En Netlify ya está activa la detección de formularios y un aviso por correo a contacto@lyrawildlife.org para cualquier formulario (confirmado el 26/11/2026): un formulario nuevo queda detectado con el siguiente deploy y sus envíos llegan solos. El asunto del aviso lleva el nombre de la organización y el campo "email" queda como dirección de respuesta. El formulario de impulsores sigue como enlace de correo.
- Colecciones de Mirada Natural: grilla de seis tarjetas verticales (9:16, tres por fila; en celular se deslizan de costado), sin enlace: a las colecciones se accede con el convenio. Cada tarjeta es un `<article class="tarjeta">` en `sitio/mirada-natural/index.html` con una foto en `sitio/mirada-natural/colecciones/<nombre>.jpg` (900 × 1600), rótulo con el país, título y subtítulo (hasta 80 letras). El subtítulo va en dos frases: primero los paisajes y después dos o tres animales característicos de la región que Kevin confirmó tener en la colección, sin unirlos con "con": "Glaciares, lagos y bosques de la cordillera austral. Cóndores y pumas." Lo mismo en `colecciones/index.html`, donde están las ocho. Las seis: Costa Patagónica, Patagonia Submarina, Andes Patagónicos, Altiplano, Selva Misionera, Esteros y Bañados. Con más de seis, descomentar el botón "Ver todas las colecciones". Las fotos procesadas de la antigua colección "Fauna de la Patagonia argentina" quedaron en `material/fotos/colecciones/fauna-patagonia/`.
- Fotos de las portadas de programas en la home: `sitio/programas/orca-explorer.jpg` y `sitio/programas/mirada-natural.jpg` (ver `sitio/programas/LEEME.txt`).
- Portadas de las páginas de programas: `orca-explorer/portada.jpg` (orcas desde el aire) y `mirada-natural/portada.jpg` (espátulas rosadas en vuelo; foto clara, por eso lleva la clase `titulo-oscuro`: sin velo y título en azul profundo), a 2560 de ancho, en una portada de un tercio de pantalla (`section.hero.hero-programa`) con la misma cabecera del inicio. La de orcas lleva `object-position` en línea para que las orcas queden bajo el menú.
- Portada de inicio: `sitio/portada.jpg` es el buzo en el bosque de macroalgas a 1920 × 1280. Reemplazarla por una exportación de 3840 × 2560 (JPG, calidad 75) de la misma foto. Si se cambia por una foto oscura arriba, sacar la clase `cabecera-oscura` de la `<section class="hero">` para que la cabecera pase a pérola.
- Logos de aliados: bloque comentado en `mirada-natural/index.html`, listo para activar.
