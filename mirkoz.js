// MKZ Vending - Pagina Navigatie
const pageMap = {
  home: 'mirkoz-home.html',
  shop: 'mirkoz-shop.html',
  services: 'mirkoz-services.html',
  about: 'mirkoz-about.html',
  contact: 'mirkoz-contact.html',
  account: 'mirkoz-account.html',
  cart: 'mirkoz-cart.html'
};
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.mkz-nav-links a');
  const frame = document.getElementById('mkz-frame');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = link.dataset.page;
      if (pageMap[page]) {
        frame.src = pageMap[page];
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
  // Set Home active on load
  navLinks[0].classList.add('active');
}); 