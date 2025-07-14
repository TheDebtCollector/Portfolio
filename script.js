// Particle Background Configuration
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#ffffff'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 6,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
});

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const skillBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contactForm');

// Navigation Toggle
navToggle.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav-open');
    navToggle.classList.remove('active');
  });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Animated Counter for Stats
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);
};

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-progress')) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = `${width}%`;
      }
      
      // Animate stat counters
      if (entry.target.classList.contains('stat-number')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  // Observe skill bars
  skillBars.forEach(bar => {
    bar.style.opacity = '0';
    bar.style.transform = 'translateY(20px)';
    observer.observe(bar);
  });
  
  // Observe stat numbers
  statNumbers.forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    observer.observe(stat);
  });
  
  // Observe service cards
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      observer.observe(card);
    }, index * 100);
  });
  
  // Observe project cards
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      observer.observe(card);
    }, index * 150);
  });
  
  // Observe testimonial cards
  document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      observer.observe(card);
    }, index * 200);
  });
});

// Form Handling
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (hero && heroContent) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }
});

// Hover Effects for Service Cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Project Card Interactions
document.querySelectorAll('.project-card').forEach(card => {
  const overlay = card.querySelector('.project-overlay');
  const links = card.querySelectorAll('.project-link');
  
  card.addEventListener('mouseenter', () => {
    if (overlay) overlay.style.opacity = '1';
    links.forEach(link => {
      link.style.transform = 'scale(1)';
    });
  });
  
  card.addEventListener('mouseleave', () => {
    if (overlay) overlay.style.opacity = '0';
    links.forEach(link => {
      link.style.transform = 'scale(0)';
    });
  });
});

// Skill Bar Animation on Scroll
const animateSkillBars = () => {
  skillBars.forEach(bar => {
    const rect = bar.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      const width = bar.getAttribute('data-width');
      bar.style.width = `${width}%`;
    }
  });
};

window.addEventListener('scroll', animateSkillBars);

// Loading Animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Animate hero elements
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-buttons');
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
  .hero-badge, .hero-title, .hero-description, .hero-stats, .hero-buttons {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  
  .loaded .hero-badge,
  .loaded .hero-title,
  .loaded .hero-description,
  .loaded .hero-stats,
  .loaded .hero-buttons {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Navbar scroll effect
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Active navigation
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, 100));

// Console welcome message
console.log(`
%cWelcome to Noah's Portfolio! 👋
%c
%cThis website was built with modern web technologies including:
%c• HTML5 & CSS3 with advanced animations
%c• Vanilla JavaScript with ES6+ features
%c• Particle.js for interactive background
%c• Responsive design principles
%c• Performance optimizations
%c
%cFeel free to explore the code! 🚀
`,
'color: #2563eb; font-size: 18px; font-weight: bold;',
'color: #6b7280; font-size: 14px;',
'color: #1f2937; font-size: 14px; font-weight: bold;',
'color: #6b7280; font-size: 12px;',
'color: #6b7280; font-size: 12px;',
'color: #6b7280; font-size: 12px;',
'color: #6b7280; font-size: 12px;',
'color: #6b7280; font-size: 12px;',
'color: #6b7280; font-size: 12px;',
'color: #2563eb; font-size: 14px; font-weight: bold;'
); 