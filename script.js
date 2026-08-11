document.addEventListener('DOMContentLoaded', () => {
  // IntersectionObserver for smooth scroll fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // 3D Card Tilt & Cursor Glow Effect
  const cards = document.querySelectorAll('.card-glow');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Keyboard navigation for cards
  const dlCards = Array.from(document.querySelectorAll('.dl-card'));
  let index = 0;

  function focusCard(i) {
    if (i < 0 || i >= dlCards.length) return;
    dlCards.forEach(c => c.blur());
    index = i;
    dlCards[index].focus();
  }

  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        if (document.activeElement && document.activeElement.classList.contains('dl-card')) {
          e.preventDefault();
          focusCard((index + 1) % dlCards.length);
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if (document.activeElement && document.activeElement.classList.contains('dl-card')) {
          e.preventDefault();
          focusCard((index - 1 + dlCards.length) % dlCards.length);
        }
        break;
      case 'Enter':
      case ' ':
        if (document.activeElement && document.activeElement.classList.contains('dl-card')) {
          e.preventDefault();
          const btn = document.activeElement.querySelector('.btn-card');
          if (btn) btn.click();
        }
        break;
    }
  });
});

