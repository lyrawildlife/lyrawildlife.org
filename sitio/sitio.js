/* ==========================================================================
   LYRA WILDLIFE · sitio.js
   1. Formularios de Mirada Natural: pegá acá la URL de cada Google Form.
      Mientras una URL esté vacía, el botón abre un correo a contacto@.
   2. Selector de idioma (español / inglés), compartido por todas las páginas.
   ========================================================================== */

var FORMULARIOS = {
  aliados:  "",   // Sin uso: "Postularse a la red" lleva a mirada-natural/postulacion/
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

/* 3. Menú en celular: el botón "Menú" abre el panel con las secciones; se cierra
      con "Cerrar", al elegir una sección o con Escape. */
(function () {
  var btn = document.querySelector('.menu-btn');
  var panel = document.getElementById('panel-menu');
  if (!btn || !panel) return;
  function abrir(si) {
    panel.hidden = !si;
    btn.setAttribute('aria-expanded', si ? 'true' : 'false');
    document.documentElement.classList.toggle('menu-abierto', si);
  }
  btn.addEventListener('click', function () { abrir(panel.hidden); });
  panel.querySelectorAll('a, .cerrar').forEach(function (el) {
    el.addEventListener('click', function () { abrir(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) abrir(false); });
})();

/* 4. Desplegables: se abren solos si se llega con un enlace que apunta a ellos
      (por ejemplo, "pedir a medida" lleva a colecciones/#pedido). */
(function () {
  function abrir() {
    if (!location.hash) return;
    var el = document.getElementById(location.hash.slice(1));
    var d = el && (el.tagName === 'DETAILS' ? el : el.querySelector('details'));
    if (d) d.open = true;
  }
  abrir();
  window.addEventListener('hashchange', abrir);
})();

/* 5. Asunto del correo de Netlify Forms: si el formulario tiene data-asunto, al
      enviarlo se arma el asunto con los datos cargados. {campo} se reemplaza por
      el valor de ese campo; {a|b} usa el primero que tenga valor. Sin JavaScript
      queda el asunto fijo del campo oculto "subject". */
(function () {
  document.querySelectorAll('form[data-asunto]').forEach(function (f) {
    f.addEventListener('submit', function () {
      var campo = f.querySelector('input[name="subject"]');
      if (!campo) return;
      var asunto = f.getAttribute('data-asunto').replace(/\{([^}]+)\}/g, function (_, nombres) {
        var partes = nombres.split('|');
        for (var i = 0; i < partes.length; i++) {
          var el = f.elements[partes[i]];
          if (el && el.value && el.value.trim()) return el.value.trim();
        }
        return '';
      });
      // Si un campo opcional quedó vacío, se borra el separador que queda colgando al final (": ", " · ").
      campo.value = asunto.replace(/\s+/g, ' ').trim().replace(/[\s:·|-]+$/, '');
    });
  });
})();

/* 6. Formularios con campos obligatorios (novalidate):
      - data-muestra en una opción abre el campo de texto con ese id y lo vuelve obligatorio;
      - .grupo[data-minimo] exige al menos una casilla tildada;
      - al enviar con datos faltantes, el formulario recibe la clase "intentado", que
        pone en rojo los campos incompletos, y se lleva la vista al primero. */
(function () {
  document.querySelectorAll('form.formulario[novalidate]').forEach(function (f) {
    function abrirCampos() {
      f.querySelectorAll('[data-muestra]').forEach(function (op) {
        var destino = document.getElementById(op.getAttribute('data-muestra'));
        if (!destino) return;
        var ctl = destino.querySelector('input, textarea');
        destino.hidden = !op.checked;
        if (ctl) { ctl.required = op.checked; if (!op.checked) ctl.value = ''; }
      });
    }
    function revisarGrupos() {
      f.querySelectorAll('.grupo[data-minimo]').forEach(function (g) {
        var casillas = g.querySelectorAll('input[type="checkbox"]');
        var alguna = Array.prototype.some.call(casillas, function (c) { return c.checked; });
        if (casillas[0]) casillas[0].setCustomValidity(alguna ? '' : 'Elegí al menos una opción.');
      });
    }
    var aviso = f.querySelector('.aviso-error');
    function actualizar() {
      abrirCampos(); revisarGrupos();
      if (aviso && f.classList.contains('intentado')) aviso.hidden = f.checkValidity();
    }
    f.addEventListener('change', actualizar);
    f.addEventListener('input', actualizar);
    actualizar();
    f.addEventListener('submit', function (e) {
      actualizar();
      if (!f.checkValidity()) {
        e.preventDefault();
        e.stopImmediatePropagation();
        f.classList.add('intentado');
        if (aviso) aviso.hidden = false;
        var primero = f.querySelector(':invalid');
        if (primero) {
          var bloque = primero.closest('.grupo, label') || primero;
          bloque.scrollIntoView({ behavior: 'smooth', block: 'center' });
          try { primero.focus({ preventScroll: true }); } catch (err) { primero.focus(); }
        }
      }
    }, true);
  });
})();
