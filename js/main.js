// assets/js/main.js

// ================= NAV TOGGLE =================
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
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
});

// ================= BANNER PARALLAX =================
const banner = document.querySelector('.banner-wrap');
if (banner) {
  const img = banner.querySelector('img');
  const glow = banner.querySelector('.iridescent-layer');
  const bubbles = banner.querySelectorAll('.bubble');

  banner.addEventListener('mousemove', (e) => {
    const rect = banner.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;

    img.style.transform = `scale(1.03) translate(${moveX * 10}px, ${moveY * 10}px)`;
    glow.style.transform = `translate(${moveX * 20}px, ${moveY * 20}px)`;

    bubbles.forEach((bubble, i) => {
      const factor = (i + 1) * 6;
      bubble.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
    });
  });

  banner.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
    glow.style.transform = 'translate(0,0)';
    bubbles.forEach(b => b.style.transform = 'translate(0,0)');
  });
}
