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

// ================= 3D SHAPE (CUBE ONLY) =================
(function() {
  const shape3D = document.querySelector('.shape-3d');
  if (!shape3D) return;

  // Mostrar solo el cubo; se eliminan cambios de forma
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

// ================= NAVBAR DROPDOWN MENU =================
(function() {
  const dropdownButtons = document.querySelectorAll('.nav-toggle-dropdown');

  dropdownButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      // Close all other dropdowns
      dropdownButtons.forEach(btn => {
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current dropdown
      button.setAttribute('aria-expanded', !isExpanded);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown') && !e.target.closest('.nav-toggle-dropdown')) {
      dropdownButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Close dropdown when clicking a link
  const submenuLinks = document.querySelectorAll('.nav-submenu a');
  submenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      dropdownButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  });
})();

// ================= PROJECT THUMBS CAROUSEL =================
(function() {
  const projectCardsWithThumbs = document.querySelectorAll('.project-hover:has(.project-thumbs)');

  projectCardsWithThumbs.forEach(card => {
    const thumbsContainer = card.querySelector('.project-thumbs');
    const images = thumbsContainer.querySelectorAll('img');
    
    if (images.length <= 1) return;

    let currentIndex = 0;
    let carouselInterval = null;

    // Set first image as active
    images[0].classList.add('active');

    function showImage(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    function startCarousel() {
      if (carouselInterval) return; // Prevent multiple intervals
      
      carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, 2500); // Change image every 2.5s
    }

    function stopCarousel() {
      if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
      }
    }

    // Start carousel on hover
    card.addEventListener('mouseenter', startCarousel);
    card.addEventListener('mouseleave', stopCarousel);
  });
})();
