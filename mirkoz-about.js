// mirkoz-about.js

document.addEventListener('DOMContentLoaded', function() {
  const about = document.querySelector('.mkz-about-content');
  if (about) {
    about.style.opacity = 0;
    about.style.transform = 'translateY(40px)';
    setTimeout(() => {
      about.style.transition = 'opacity 0.7s, transform 0.7s';
      about.style.opacity = 1;
      about.style.transform = 'translateY(0)';
    }, 200);
  }
}); 