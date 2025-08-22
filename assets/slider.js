(function () {
  const slides = document.getElementById('slides');
  if (!slides) return;

  const figures = Array.from(slides.querySelectorAll('.slide'));
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const dots = document.getElementById('dots');

  let index = 0;
  const count = figures.length;

  // dots
  figures.forEach((_, i) => {
    const d = document.createElement('button');
    d.addEventListener('click', () => goTo(i));
    dots.appendChild(d);
  });

  function updateDots() {
    dots.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });
  }

  function goTo(i) {
    index = (i + count) % count;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  function nextSlide() { goTo(index + 1); }
  function prevSlide() { goTo(index - 1); }

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  // keyboard
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });

  // swipe (very light)
  let startX = 0;
  slides.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, {passive:true});
  slides.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) prevSlide();
    if (dx < -40) nextSlide();
  }, {passive:true});

  // optional autoplay (comment out if you don’t want it)
  const interval = setInterval(nextSlide, 6000);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearInterval(interval);
  });

  goTo(0);
})();
