// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Handle keyboard navigation for mobile toggle
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Statistics counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate statistics when they come into view
            if (entry.target.classList.contains('stats')) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target);
                });
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form validation
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const formInputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    const errorElements = {
        name: document.getElementById('name-error'),
        email: document.getElementById('email-error'),
        subject: document.getElementById('subject-error'),
        message: document.getElementById('message-error')
    };

    // Validation rules
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            errorMessages: {
                required: 'El nombre es obligatorio',
                minLength: 'El nombre debe tener al menos 2 caracteres',
                maxLength: 'El nombre no puede exceder 50 caracteres',
                pattern: 'El nombre solo puede contener letras y espacios'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            maxLength: 100,
            errorMessages: {
                required: 'El email es obligatorio',
                pattern: 'Por favor ingresa un email válido',
                maxLength: 'El email no puede exceder 100 caracteres'
            }
        },
        subject: {
            required: true,
            minLength: 5,
            maxLength: 100,
            errorMessages: {
                required: 'El asunto es obligatorio',
                minLength: 'El asunto debe tener al menos 5 caracteres',
                maxLength: 'El asunto no puede exceder 100 caracteres'
            }
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000,
            errorMessages: {
                required: 'El mensaje es obligatorio',
                minLength: 'El mensaje debe tener al menos 10 caracteres',
                maxLength: 'El mensaje no puede exceder 1000 caracteres'
            }
        }
    };

    // Validate single field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        const errors = [];

        if (rules.required && (!value || value.trim() === '')) {
            errors.push(rules.errorMessages.required);
        }

        if (value && rules.minLength && value.trim().length < rules.minLength) {
            errors.push(rules.errorMessages.minLength);
        }

        if (value && rules.maxLength && value.trim().length > rules.maxLength) {
            errors.push(rules.errorMessages.maxLength);
        }

        if (value && rules.pattern && !rules.pattern.test(value.trim())) {
            errors.push(rules.errorMessages.pattern);
        }

        return errors;
    }

    // Display validation errors
    function showFieldError(fieldName, errors) {
        const input = formInputs[fieldName];
        const errorElement = errorElements[fieldName];

        if (errors.length > 0) {
            input.classList.add('error');
            errorElement.textContent = errors[0];
            errorElement.setAttribute('aria-live', 'polite');
        } else {
            input.classList.remove('error');
            errorElement.textContent = '';
            errorElement.removeAttribute('aria-live');
        }
    }

    // Real-time validation
    Object.keys(formInputs).forEach(fieldName => {
        const input = formInputs[fieldName];
        
        input.addEventListener('blur', function() {
            const errors = validateField(fieldName, this.value);
            showFieldError(fieldName, errors);
        });

        input.addEventListener('input', function() {
            // Clear error on input if field was previously invalid
            if (this.classList.contains('error')) {
                const errors = validateField(fieldName, this.value);
                if (errors.length === 0) {
                    showFieldError(fieldName, []);
                }
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const formData = {};

        // Validate all fields
        Object.keys(formInputs).forEach(fieldName => {
            const input = formInputs[fieldName];
            const value = input.value;
            const errors = validateField(fieldName, value);

            formData[fieldName] = value.trim();
            showFieldError(fieldName, errors);

            if (errors.length > 0) {
                isValid = false;
            }
        });

        if (isValid) {
            // Show success message
            showFormSuccess();
            
            // Here you would typically send the data to your server
            console.log('Form submitted successfully:', formData);
            
            // Reset form
            contactForm.reset();
            
            // Clear any remaining error states
            Object.keys(formInputs).forEach(fieldName => {
                formInputs[fieldName].classList.remove('error');
                errorElements[fieldName].textContent = '';
            });
        } else {
            // Focus on first error field
            const firstErrorField = Object.keys(formInputs).find(fieldName => {
                return formInputs[fieldName].classList.contains('error');
            });
            
            if (firstErrorField) {
                formInputs[firstErrorField].focus();
            }
        }
    });

    // Show success message
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #34a853;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(52, 168, 83, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        successMessage.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
            ¡Mensaje enviado correctamente! Te contactaré pronto.
        `;

        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(successMessage);

        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.parentNode.removeChild(successMessage);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 300);
        }, 5000);
    }
}

// Lazy loading for images (if not natively supported)
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for older browsers
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.dataset.src = img.src;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        img.classList.add('lazy');
        imageObserver.observe(img);
    });
}

// Add smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .skill-category,
        .project-card,
        .stat-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate .skill-category,
        .animate .project-card,
        .animate .stat-card {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate .skill-category:nth-child(1) { transition-delay: 0.1s; }
        .animate .skill-category:nth-child(2) { transition-delay: 0.2s; }
        .animate .skill-category:nth-child(3) { transition-delay: 0.3s; }
        
        .animate .project-card:nth-child(1) { transition-delay: 0.1s; }
        .animate .project-card:nth-child(2) { transition-delay: 0.2s; }
        .animate .project-card:nth-child(3) { transition-delay: 0.3s; }
        .animate .project-card:nth-child(4) { transition-delay: 0.4s; }
        .animate .project-card:nth-child(5) { transition-delay: 0.5s; }
        
        .animate .stat-card:nth-child(1) { transition-delay: 0.1s; }
        .animate .stat-card:nth-child(2) { transition-delay: 0.2s; }
        .animate .stat-card:nth-child(3) { transition-delay: 0.3s; }
        .animate .stat-card:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content on Tab key from navigation
    if (e.key === 'Tab' && document.activeElement.closest('.navbar')) {
        const mainContent = document.querySelector('main') || document.querySelector('#home');
        if (mainContent && !e.shiftKey) {
            e.preventDefault();
            mainContent.focus();
        }
    }
});

// Add focus management for better accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

function trapFocus(element) {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    document.addEventListener('keydown', function(e) {
        const isTabPressed = e.key === 'Tab';

        if (!isTabPressed) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
            }
        }
    });
}