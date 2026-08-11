document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.card'));
  let index = 0;

  function focusCard(i) {
    if (i < 0 || i >= cards.length) return;
    cards.forEach(c => c.blur());
    index = i;
    cards[index].focus();
  }

  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        focusCard((index + 1) % cards.length);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        focusCard((index - 1 + cards.length) % cards.length);
        break;
      case 'Enter':
      case ' ':
        if (document.activeElement && document.activeElement.classList.contains('card')) {
          e.preventDefault();
          const btn = document.activeElement.querySelector('.btn');
          if (btn) btn.click();
        }
        break;
    }
  });
});
