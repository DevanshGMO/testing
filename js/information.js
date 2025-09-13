// Count-up animation for stats when they enter the viewport
(function () {
  const nums = document.querySelectorAll('.stat__num');
  if (!nums.length || !('IntersectionObserver' in window)) return;

  const format = (n) => n.toLocaleString();

  function animate(el) {
    const end = Number(el.dataset.count || '0');
    const duration = 1200; // ms
    const start = 0;
    const t0 = performance.now();

    function tick(now) {
      const p = Math.min(1, (now - t0) / duration);
      const value = Math.floor(start + (end - start) * (1 - Math.pow(1 - p, 3))); // easeOutCubic
      el.textContent = format(value);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(end);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  nums.forEach((n) => io.observe(n));
})();
