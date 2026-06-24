document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.fade-in, .fade-up').forEach(el => observer.observe(el));

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) return;
      const subject = encodeURIComponent(`פנייה מ-${name}`);
      const body    = encodeURIComponent(`שם: ${name}\nאימייל: ${email}\n\nהודעה:\n${message}`);
      window.location.href = `mailto:contact.focusdigitali@gmail.com?subject=${subject}&body=${body}`;
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'נשלח!';
      btn.disabled = true;
    });
  }
});
