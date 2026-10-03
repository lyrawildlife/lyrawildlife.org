/* ==========================================================================
   LYRA WILDLIFE · sitio.js
   1. Formularios de Mirada Natural: pegá acá la URL de cada Google Form.
      Mientras una URL esté vacía, el botón abre un correo a contacto@.
   2. Selector de idioma (español / inglés), compartido por todas las páginas.
   ========================================================================== */

var FORMULARIOS = {
  aliados:  "",   // Postulación de organizaciones aliadas
  pedido:   "",   // Pedido de imágenes a medida (para aliados)
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
