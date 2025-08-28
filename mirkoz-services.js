// mirkoz-services.js

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.mkz-service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      card.style.background = '#f0f4ff';
    });
    card.addEventListener('mouseleave', function() {
      card.style.background = '#fff';
    });
  });
}); 