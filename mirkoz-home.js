// mirkoz-home.js

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll naar shop
  const shopBtn = document.querySelector('.mkz-hero-cta .mkz-btn');
  if (shopBtn) {
    shopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.parent.postMessage({page: 'shop'}, '*');
    });
  }
}); 