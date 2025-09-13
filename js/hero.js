(() => {
  const hero      = document.getElementById('hero');
  const slides    = [...hero.querySelectorAll('.hero__slide')];
  const btnPrev   = hero.querySelector('.hero__nav--prev');
  const btnNext   = hero.querySelector('.hero__nav--next');
  const AUTOPLAY_MS = 6000;

  // Apply background images from data-bg and eager-load
  slides.forEach(slide => {
    const src = slide.getAttribute('data-bg');
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => slide.style.backgroundImage = `url("${src}")`;
      // in case cached:
      slide.style.backgroundImage = `url("${src}")`;
    }
  });

  let idx = slides.findIndex(s => s.classList.contains('is-active'));
  if (idx < 0) idx = 0;

  function setActive(newIdx){
    newIdx = (newIdx + slides.length) % slides.length;
    slides.forEach((s,i) => {
      const active = i === newIdx;
      s.classList.toggle('is-active', active);
      s.setAttribute('aria-hidden', String(!active));
      s.tabIndex = active ? 0 : -1;
    });
    idx = newIdx;
  }

  function next(){ setActive(idx + 1); }
  function prev(){ setActive(idx - 1); }

  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);

  // Keyboard navigation when hero is focused
  hero.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
  });

  // Touch/swipe for mobile
  let startX = 0, startT = 0;
  hero.addEventListener('touchstart', (e)=>{
    startX = e.touches[0].clientX;
    startT = Date.now();
  }, {passive:true});
  hero.addEventListener('touchend', (e)=>{
    const dx = e.changedTouches[0].clientX - startX;
    const dt = Date.now() - startT;
    if (Math.abs(dx) > 40 && dt < 600){
      dx < 0 ? next() : prev();
    }
  });

  // Autoplay with pause on hover/focus
  let timer = null;
  function play(){
    stop();
    timer = setTimeout(function tick(){
      next();
      timer = setTimeout(tick, AUTOPLAY_MS);
    }, AUTOPLAY_MS);
  }
  function stop(){ if (timer){ clearTimeout(timer); timer = null; } }

  hero.addEventListener('mouseenter', stop);
  hero.addEventListener('mouseleave', play);
  hero.addEventListener('focusin',  stop);
  hero.addEventListener('focusout', play);

  // Start
  setActive(idx);
  play();
})();
