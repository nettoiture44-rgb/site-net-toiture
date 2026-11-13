const form = document.querySelector('#quote-form');
const select = document.querySelector('#prestation');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

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
