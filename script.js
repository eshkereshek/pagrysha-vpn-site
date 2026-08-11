document.addEventListener('DOMContentLoaded', () => {
  const focusableElements = Array.from(document.querySelectorAll('.download-card, .btn-download, a[href]'));
  let currentIndex = 0;

  // Set initial focus to first download card for TV remote compatibility
  if (focusableElements.length > 0) {
    focusableElements[0].classList.add('focused');
  }

  function setFocus(index) {
    if (index < 0 || index >= focusableElements.length) return;
    
    focusableElements.forEach(el => el.classList.remove('focused'));
    currentIndex = index;
    const currentEl = focusableElements[currentIndex];
    
    currentEl.classList.add('focused');
    currentEl.focus();
    currentEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // D-Pad Remote Controller & Keyboard Navigation Listener
  window.addEventListener('keydown', (e) => {
    const isTVOrKeyboard = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(e.key);
    
    if (isTVOrKeyboard) {
      document.body.classList.add('tv-nav-active');
    }

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        setFocus((currentIndex + 1) % focusableElements.length);
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        setFocus((currentIndex - 1 + focusableElements.length) % focusableElements.length);
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusableElements[currentIndex]) {
          const downloadBtn = focusableElements[currentIndex].querySelector('.btn-download') || focusableElements[currentIndex];
          if (downloadBtn && downloadBtn.href) {
            window.location.href = downloadBtn.href;
          } else {
            focusableElements[currentIndex].click();
          }
        }
        break;
    }
  });

  // Hover sync for mouse users
  focusableElements.forEach((el, idx) => {
    el.addEventListener('mouseenter', () => {
      setFocus(idx);
    });
  });
});
