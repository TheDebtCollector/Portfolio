// InfoCourses JS

document.addEventListener('DOMContentLoaded', function() {
  // Dark mode toggle
  const darkToggle = document.getElementById('ic-dark-toggle');
  const body = document.body;
  function setDarkMode(on) {
    if (on) {
      body.classList.add('ic-dark');
      localStorage.setItem('ic-dark', '1');
      darkToggle.innerHTML = '🌙';
    } else {
      body.classList.remove('ic-dark');
      localStorage.setItem('ic-dark', '0');
      darkToggle.innerHTML = '☀️';
    }
  }
  // Initial mode
  setDarkMode(localStorage.getItem('ic-dark') === '1');
  darkToggle.addEventListener('click', () => {
    setDarkMode(!body.classList.contains('ic-dark'));
  });

  // Enroll button alert
  document.querySelectorAll('.ic-enroll-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Thank you for your interest! Course enrollment coming soon.');
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.ic-nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}); 