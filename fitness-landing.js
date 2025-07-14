// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const bookingForm = document.getElementById('bookingForm');
const toastContainer = document.getElementById('toast-container');

// Navigation Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('nav-open');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('nav-open');
    navToggle.classList.remove('active');
  });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .feature, .contact-item');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Toast notification system
function showToast(type, title, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
  
  toast.innerHTML = `
    <i class="toast-icon ${icon}"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

// Booking form handling
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.name || !data.email || !data.service) {
      showToast('error', 'Validation Error', 'Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showToast('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }
    
    // Simulate form submission
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      showToast('success', 'Booking Request Sent!', 'Thank you for your interest. Sarah will contact you within 24 hours to schedule your free consultation.');
      
      // Reset form
      bookingForm.reset();
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      
      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 2000);
  });
}

// Counter animation for hero stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + suffix;
      }
    };
    
    updateCounter();
  });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
  heroObserver.observe(heroSection);
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

// Testimonial card hover effects
document.addEventListener('DOMContentLoaded', () => {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
});

// Contact item hover effects
document.addEventListener('DOMContentLoaded', () => {
  const contactItems = document.querySelectorAll('.contact-item');
  
  contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateX(8px)';
      item.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
    });
  });
});

// Social media link effects
document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = '';
    });
  });
});

// Form input focus effects
document.addEventListener('DOMContentLoaded', () => {
  const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = '';
    });
  });
});

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Preloader effect
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Scroll to top functionality
function createScrollToTopButton() {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollButton.className = 'scroll-to-top';
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  `;
  
  document.body.appendChild(scrollButton);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollButton.style.opacity = '1';
      scrollButton.style.visibility = 'visible';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top when clicked
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effects
  scrollButton.addEventListener('mouseenter', () => {
    scrollButton.style.transform = 'translateY(-2px) scale(1.1)';
  });
  
  scrollButton.addEventListener('mouseleave', () => {
    scrollButton.style.transform = '';
  });
}

// Initialize scroll to top button
createScrollToTopButton();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Navbar scroll effect
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Active navigation link highlighting
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  // Escape key to close mobile menu
  if (e.key === 'Escape') {
    navMenu.classList.remove('nav-open');
    navToggle.classList.remove('active');
  }
  
  // Enter key to submit form when focused on submit button
  if (e.key === 'Enter' && document.activeElement === bookingForm?.querySelector('button[type="submit"]')) {
    bookingForm.dispatchEvent(new Event('submit'));
  }
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
  // Add ARIA labels to interactive elements
  const buttons = document.querySelectorAll('button:not([aria-label])');
  buttons.forEach(button => {
    if (button.textContent.trim()) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });
  
  // Add focus indicators
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--primary-color)';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  showToast('error', 'Error', 'Something went wrong. Please refresh the page.');
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
} 