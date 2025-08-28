// mirkoz-account.js
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.mkz-login-form, .mkz-register-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Demo: formulier verzonden!');
      form.reset();
    });
  });
}); 