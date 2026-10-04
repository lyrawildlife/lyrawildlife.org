/* ==========================================================================
   LYRA WILDLIFE · sitio.js
   1. Formularios de Mirada Natural: pegá acá la URL de cada Google Form.
      Mientras una URL esté vacía, el botón abre un correo a contacto@.
   2. Selector de idioma (español / inglés), compartido por todas las páginas.
   ========================================================================== */

var FORMULARIOS = {
  aliados:  "",   // Postulación de organizaciones aliadas
  sponsors: ""    // Contacto de sponsors
};

(function () {
  var root = document.documentElement;
  var buttons = document.querySelectorAll('.langs button');
  var CORREO = 'contacto@lyrawildlife.org';

  function setLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.set === lang ? 'true' : 'false');
    });
    try { localStorage.setItem('lw-lang', lang); } catch (e) {}
    enlazarFormularios(lang);
  }

  // Cada botón con data-form apunta al Google Form si hay URL; si no, a un correo.
  function enlazarFormularios(lang) {
    document.querySelectorAll('[data-form]').forEach(function (a) {
      var url = FORMULARIOS[a.dataset.form];
      if (url) {
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener';
      } else {
        var asunto = a.getAttribute('data-asunto-' + lang) || a.getAttribute('data-asunto-es') || '';
        a.href = 'mailto:' + CORREO + (asunto ? '?subject=' + encodeURIComponent(asunto) : '');
        a.removeAttribute('target');
      }
    });
  }

  var saved = null;
  try { saved = localStorage.getItem('lw-lang'); } catch (e) {}
  var guess = (navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en';
  setLang(saved === 'es' || saved === 'en' ? saved : guess);

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.set); });
  });
})();

/* 3. Colecciones de Mirada Natural: pestañas de categoría y flechas para recorrer
      las colecciones de la categoría activa. */
(function () {
  var tabs = document.querySelectorAll('.categorias button');
  var carruseles = document.querySelectorAll('.carrusel');
  if (!tabs.length) return;

  function mostrar(carrusel, indice) {
    var items = carrusel.querySelectorAll('.coleccion');
    items.forEach(function (it, i) {
      if (i === indice) it.setAttribute('data-activa', ''); else it.removeAttribute('data-activa');
    });
  }

  carruseles.forEach(function (c) {
    var items = c.querySelectorAll('.coleccion');
    if (items.length <= 1) c.setAttribute('data-unica', '');
    c.querySelectorAll('.flechas button').forEach(function (b) {
      b.addEventListener('click', function () {
        var actual = Array.prototype.indexOf.call(items, c.querySelector('.coleccion[data-activa]'));
        var n = items.length;
        var siguiente = b.classList.contains('sig') ? (actual + 1) % n : (actual - 1 + n) % n;
        mostrar(c, siguiente);
      });
    });
  });

  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', 'false'); });
      b.setAttribute('aria-selected', 'true');
      carruseles.forEach(function (c) {
        if (c.dataset.cat === b.dataset.cat) { c.setAttribute('data-activa', ''); mostrar(c, 0); }
        else c.removeAttribute('data-activa');
      });
    });
  });
})();
