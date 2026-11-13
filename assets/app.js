const form = document.querySelector('#quote-form');
const select = document.querySelector('#prestation');
const menuToggle = document.querySelector('.menu-toggle');
(function () {
  var s = document.getElementById('surf');
  if (!s) return;
  try {
    var q = new URLSearchParams(location.search).get('surface');
    if (q && +q > 0 && +q <= 600) s.value = q;
  } catch (e) {}
})();
(function () {
  var f = document.getElementById('nt-devis');
  var m = document.getElementById('nt-msg');
  if (!f || !m) return;
  var go = null;
  f.addEventListener('submit', function () {
    var s = document.getElementById('nt-surface');
    var fo = document.getElementById('nt-formule');
    go = { s: s ? s.value.trim() : '', fo: fo ? fo.value : '' };
  }, true);
  new MutationObserver(function () {
    if (go && /\bok\b/.test(m.className)) {
      var d = go;
      go = null;
      m.textContent += ' Vous allez être redirigé vers nos formules.';
      setTimeout(function () {
        var q = [];
        if (+d.s > 0) q.push('surface=' + encodeURIComponent(d.s));
        if (d.fo) q.push('formule=' + encodeURIComponent(d.fo));
        location.href = 'formules.html' + (q.length ? '?' + q.join('&') : '');
      }, 4000);
    }
  }).observe(m, { attributes: true, attributeFilter: ['class'] });
})();

(function () {
  var o = document.querySelector('.orion-request');
  if (!o || !document.getElementById('devis')) return;
  o.innerHTML = '<h3>Demander un devis à Frédéric</h3><p>Indiquez votre commune, la surface approximative de votre toiture et la formule qui vous intéresse. Frédéric vous rappelle pour fixer une visite gratuite.</p><a class="primary-btn" href="contact.html#demande">Remplir ma demande de devis</a><p class="privacy-note">Cette demande ne vous engage pas à commander des travaux. Si vous préférez échanger directement, appelez le <a href="tel:+33685094855">06 85 09 48 55</a>.</p>';
})();

const mainNav = document.querySelector('.main-nav');
(function () {
  var f = document.getElementById('nt-devis');
  if (!f) return;
  var sel = f.querySelector('#nt-presta');
  var a = f.querySelector('#nt-adresse');
  if (!sel || !a) return;
  var box = sel.parentNode;
  var w = document.createElement('div');
  w.className = 'full';
  w.innerHTML = '<label for="nt-surface">Surface approximative de la toiture en m² (si vous la connaissez)</label><input id="nt-surface" type="number" inputmode="numeric" min="10" max="2000" placeholder="Ex. : 100"><label for="nt-formule" style="display:block;margin-top:10px">Formule souhaitée</label><select id="nt-formule"><option value="">Je ne sais pas encore</option><option value="Essentiel">Essentiel</option><option value="Extérieurs">Extérieurs</option><option value="Intégral">Intégral</option></select>';
  box.parentNode.insertBefore(w, box.nextSibling);
  try {
    var q = new URLSearchParams(location.search).get('formule');
    if (q) document.getElementById('nt-formule').value = q;
  } catch (e) {}
  var base = null;
  a.addEventListener('input', function () { base = null; });
  document.addEventListener('submit', function (e) {
    if (e.target !== f) return;
    if (base === null) base = a.value;
    var s = document.getElementById('nt-surface').value.trim();
    var fo = document.getElementById('nt-formule').value;
    var extra = '';
    if (s) extra += ' | Toiture env. ' + s + ' m²';
    if (fo) extra += ' | Formule ' + fo;
    a.value = base.slice(0, 250 - extra.length) + extra;
  }, true);
})();


(function () {
  var n = document.querySelector('.main-nav');
  if (!n || n.querySelector('a[href="formules.html"]')) return;
  var p = n.querySelector('a[href="prestations.html"]');
  var a = document.createElement('a');
  a.href = 'formules.html';
  a.textContent = 'Nos formules';
  if (p && p.nextSibling) n.insertBefore(a, p.nextSibling); else n.appendChild(a);
})();

if (menuToggle && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

if (select) {
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      const service = link.dataset.service;
      const exact = [...select.options].find((option) => option.text === service);
      select.value = exact ? exact.value : 'Autre prestation';
    });
  });
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Demande Net Toiture — ${data.get('prestation') || 'Renseignement'}`;
    const body = [
      `Nom : ${data.get('nom') || ''}`,
      `Téléphone : ${data.get('telephone') || ''}`,
      `Commune : ${data.get('commune') || ''}`,
      `Prestation : ${data.get('prestation') || ''}`,
      '',
      data.get('message') || ''
    ].join('\n');
    const feedback = document.querySelector('#form-feedback');
    if (feedback) feedback.hidden = false;
    window.location.href = `mailto:nettoiture44@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
