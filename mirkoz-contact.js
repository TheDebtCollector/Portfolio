// mirkoz-contact.js
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.mkz-contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Bedankt voor je bericht! We nemen zo snel mogelijk contact op.');
      form.reset();
    });
  }
}); 