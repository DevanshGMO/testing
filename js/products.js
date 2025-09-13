// Mobile progress dots + active state on scroll (defensive + DOM-ready)
(function () {
  // Ensure DOM is ready (extra safe if script not loaded with `defer`)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  function init() {
    const scroller = document.getElementById("cards-scroller");
    const dotsWrap = document.getElementById("dots");

    // If markup isn't present, bail out cleanly
    if (!scroller || !dotsWrap) return;

    const isMobile = () => window.matchMedia("(max-width: 680px)").matches;

    function buildDots() {
      // If not mobile, clear and exit
      if (!isMobile()) {
        dotsWrap.innerHTML = "";
        return;
      }

      dotsWrap.innerHTML = "";
      const cards = scroller.querySelectorAll(".card");
      cards.forEach((_, i) => {
        const b = document.createElement("button");
        b.className = "dot";
        b.type = "button";
        b.setAttribute("aria-label", `Go to card ${i + 1}`);
        b.addEventListener("click", () => {
          cards[i].scrollIntoView({
            behavior: "smooth",
            inline: "start",
            block: "nearest",
          });
        });
        dotsWrap.appendChild(b);
      });
      updateActiveDot();
    }

    function updateActiveDot() {
      if (!isMobile()) return;
      const cards = Array.from(scroller.querySelectorAll(".card"));
      if (!cards.length) return;

      // Choose the card with the most horizontal visibility
      const viewW = window.innerWidth;
      const vis = cards.map((el) => {
        const r = el.getBoundingClientRect();
        const visible = Math.max(
          0,
          Math.min(r.right, viewW) - Math.max(r.left, 0)
        );
        return { el, visible };
      });
      const idx = vis.reduce(
        (best, cur, i) => (cur.visible > vis[best].visible ? i : best),
        0
      );

      dotsWrap
        .querySelectorAll(".dot")
        .forEach((d, i) => d.classList.toggle("active", i === idx));
    }

    // Init
    buildDots();
    updateActiveDot();

    // Events
    window.addEventListener(
      "resize",
      () => {
        buildDots();
        updateActiveDot();
      },
      { passive: true }
    );

    scroller.addEventListener(
      "scroll",
      () => requestAnimationFrame(updateActiveDot),
      { passive: true }
    );
  }
})();
