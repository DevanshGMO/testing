// Duplicate brand items to create a seamless loop (works even with few items)
(function () {
  const strip = document.querySelector("#solutions .brand-strip");
  if (!strip) return;

  // Build a long track until it's at least 2× viewport width
  const base = Array.from(strip.children).map((li) => li.cloneNode(true));
  const vw = () =>
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

  function extendTrack() {
    // reset
    while (strip.children.length) strip.removeChild(strip.lastChild);
    let w = 0,
      i = 0;
    // create repeated clones
    while (w < vw() * 2.2) {
      const clone = base[i % base.length].cloneNode(true);
      strip.appendChild(clone);
      w = strip.scrollWidth;
      i++;
      if (i > 60) break; // safety guard
    }
  }

  extendTrack();
  window.addEventListener("resize", () => {
    extendTrack();
  });

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    strip.style.animation = "none";
  }
})();
