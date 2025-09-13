// ===== Helpers
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];

const nav = qs("#primary-nav");
const hamburger = qs("#hamburger");
const backdrop = qs("#backdrop");
const language = qs("#language");
const langBtn = language?.querySelector(".language-toggle");

// Toggle primary nav (mobile)
function openNav(open) {
  const isOpen = open ?? !nav.classList.contains("open");
  nav.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", String(isOpen));
  backdrop.hidden = !isOpen;
  document.documentElement.style.overflow = isOpen ? "hidden" : "";
  document.body.style.overflow = isOpen ? "hidden" : "";
}

// Submenu toggles (mobile accordion behavior)
qsa(".has-submenu").forEach((item) => {
  const toggle = item.querySelector(".submenu-toggle");
  if (!toggle) return;
  toggle.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 992px)").matches) {
      const expanded = item.getAttribute("aria-expanded") === "true";
      qsa(".has-submenu", item.parentElement).forEach((sib) => {
        if (sib !== item) sib.setAttribute("aria-expanded", "false");
      });
      item.setAttribute("aria-expanded", String(!expanded));
    }
  });
});

// Hamburger + backdrop
hamburger?.addEventListener("click", () => openNav());
backdrop?.addEventListener("click", () => openNav(false));

// Close nav when resizing up
window.addEventListener("resize", () => {
  if (!window.matchMedia("(max-width: 992px)").matches) {
    openNav(false);
    qsa(".has-submenu").forEach((i) =>
      i.setAttribute("aria-expanded", "false")
    );
  }
});

// Language dropdown
langBtn?.addEventListener("click", () => {
  const open = language.classList.toggle("open");
  langBtn.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", (e) => {
  if (language && !language.contains(e.target)) {
    language.classList.remove("open");
    langBtn?.setAttribute("aria-expanded", "false");
  }
});

// ESC closes everything
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    openNav(false);
    language?.classList.remove("open");
    langBtn?.setAttribute("aria-expanded", "false");
  }
});

// Demo: increment cart badge
qs(".cart")?.addEventListener("click", () => {
  const badge = qs("#cart-badge");
  const n = parseInt(badge.textContent || "0", 10) + 1;
  badge.textContent = String(n);
});
