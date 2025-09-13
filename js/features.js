// Reveal-on-scroll with graceful fallback (prefers-reduced-motion respected)
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.fade-root .fade-in');
  if (!items.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('appear'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => io.observe(el));
})();
