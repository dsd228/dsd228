// assets/js/main.js
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });
}

// Accesibilidad: cerrar menú al seleccionar un enlace en móvil
document.querySelectorAll('.nav-list a').forEach(a => {
  a.addEventListener('click', () => {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});
