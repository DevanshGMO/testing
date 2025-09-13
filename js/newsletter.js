// Reveal-on-scroll + lightweight subscribe validation
(function () {
  // Fade-in animation
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.fade-in');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('appear'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('appear'));
  }

  // Subscribe form
  const form = document.getElementById('subForm');
  const nameEl = document.getElementById('subName');
  const emailEl = document.getElementById('subEmail');
  const note = document.getElementById('subNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const ok = /\S+@\S+\.\S+/.test(email) && name.length >= 2;

      if (!ok) {
        note.textContent = 'Please enter a valid name and email.';
        return;
      }
      note.textContent = 'Thanks! You’re subscribed.';
      form.reset();
    });
  }
})();
