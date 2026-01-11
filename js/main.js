// js/main.js
// ================= THEME MANAGEMENT =================
(function() {
  const html = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const icon = themeToggle ? themeToggle.querySelector('i') : null;
  const bannerImg = document.getElementById('hero-banner');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
    }
    else if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    if (bannerImg) {
      bannerImg.src = theme === 'dark' ? 'banner2.png' : 'banner.png';
    }
  }

  // Initialize from localStorage or system preference
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }
})();

// ================= 3D SHAPE MORPHING =================
(function() {
  const shape3D = document.querySelector('.shape-3d');
  if (!shape3D) return;

  const shapes = ['cube', 'sphere', 'pyramid', 'cylinder'];
  let currentShapeIndex = 0;

  function changeShape() {
    // Remove all shape classes
    shapes.forEach(shape => shape3D.classList.remove(shape));
    
    // Add current shape class
    shape3D.classList.add(shapes[currentShapeIndex]);
    
    // Move to next shape
    currentShapeIndex = (currentShapeIndex + 1) % shapes.length;
  }

  // Change shape every 2 seconds
  setInterval(changeShape, 2000);
  
  // Set initial shape to cube
  shape3D.classList.add('cube');
})();

// ================= BACKGROUND PRESS EFFECT =================
(function() {
  const body = document.body;
  let pointerActive = false;

  function handlePointerStart() {
    pointerActive = true;
    body.classList.add('bg-pressed');
  }

  function handlePointerEnd() {
    pointerActive = false;
    body.classList.remove('bg-pressed');
  }

  body.addEventListener('pointermove', (e) => {
    const isOnEmpty = e.target === body || (e.target?.tagName === 'HTML');
    if (isOnEmpty && !pointerActive) {
      handlePointerStart();
    }
  });

  body.addEventListener('pointerleave', handlePointerEnd);
  body.addEventListener('pointerup', handlePointerEnd);
  body.addEventListener('touchend', handlePointerEnd);
  body.addEventListener('touchstart', (e) => {
    if (e.target === body) handlePointerStart();
  });
})();
