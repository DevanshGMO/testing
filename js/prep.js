// Reveal-on-scroll animation with reduced-motion respect
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.fade-in');
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
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach(el => io.observe(el));
})();
