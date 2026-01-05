// assets/js/main.js

// ================= NAV TOGGLE =================
const toggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Helper function to reset menu icon
function resetMenuIcon() {
  if (toggle) {
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = 'ri-menu-line';
    }
  }
}

// Helper function to close menu
function closeMenu() {
  if (navMenu) {
    navMenu.classList.remove('open');
  }
  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  }
  resetMenuIcon();
}

if (toggle && navMenu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
    
    // Change icon
    const icon = toggle.querySelector('i');
    if (icon) {
      if (navMenu.classList.contains('open')) {
        icon.className = 'ri-close-line';
      } else {
        icon.className = 'ri-menu-line';
      }
    }
  });
}

// Accesibilidad: cerrar menú al seleccionar un enlace en móvil
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', () => {
    closeMenu();
  });
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (navMenu && toggle && navMenu.classList.contains('open')) {
    if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  }
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
