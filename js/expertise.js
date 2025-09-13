// Minimal reveal-on-scroll to give the section a polished entrance.
(() => {
  const root = document.getElementById('expertise');
  if (!root || !('IntersectionObserver' in window)) return;

  // mark revealables
  const parts = [
    ...root.querySelectorAll('.exp-media, .exp-title, .exp-lead, .exp-highlights, .exp-quote')
  ];
  parts.forEach(el => el.setAttribute('data-reveal', ''));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(({isIntersecting, target}) => {
      if (isIntersecting) {
        target.classList.add('reveal-in');
        io.unobserve(target);
      }
    });
  }, {threshold: 0.15});

  parts.forEach(el => io.observe(el));
})();
