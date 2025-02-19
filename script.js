document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  const slides = document.querySelectorAll('.slide');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const prevButton = document.querySelector('[data-carousel-button="prev"]');
  const nextButton = document.querySelector('[data-carousel-button="next"]');

  let currentIndex = 0;
  let autoSlideInterval;

  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.dataset.index = index;
      indicator.addEventListener('click', () => goToSlide(index));
      indicatorsContainer.appendChild(indicator);
    });
  }

  function updateIndicators() {
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    slides[currentIndex].removeAttribute('data-active');
    currentIndex = index;
    slides[currentIndex].setAttribute('data-active', 'true');
    updateIndicators();
    resetAutoSlide();
  }

  function nextSlide() {
    let newIndex = (currentIndex + 1) % slides.length;
    goToSlide(newIndex);
  }

  function prevSlide() {
    let newIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(newIndex);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  createIndicators();
  startAutoSlide();
});
