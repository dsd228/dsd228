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
