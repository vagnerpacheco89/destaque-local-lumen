(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const siteHeader = document.querySelector('.site-header');
  let headerTicking = false;

  const syncHeaderState = () => {
    siteHeader?.classList.toggle('is-compact', window.scrollY > 36);
    headerTicking = false;
  };

  syncHeaderState();
  window.addEventListener('scroll', () => {
    if (headerTicking) return;
    headerTicking = true;
    window.requestAnimationFrame(syncHeaderState);
  }, { passive: true });

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');

  const setMenuState = (open) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.hidden = !open;
  };

  menuToggle?.addEventListener('click', () => {
    setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || menuToggle?.getAttribute('aria-expanded') !== 'true') return;
    setMenuState(false);
    menuToggle?.focus();
  });

  const dialog = document.querySelector('#demo-dialog');

  document.addEventListener('click', (event) => {
    const cta = event.target.closest('[data-demo-cta]');
    if (!cta) return;
    event.preventDefault();
    if (dialog?.showModal) dialog.showModal();
  });

  document.querySelectorAll('[data-dialog-close]').forEach((button) => {
    button.addEventListener('click', () => dialog?.close());
  });

  dialog?.addEventListener('click', (event) => {
    const box = dialog.getBoundingClientRect();
    const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    if (outside) dialog.close();
  });

  const faqItems = [...document.querySelectorAll('.faq-list details')];
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  document.querySelector('[data-back-top]')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });

  const initWorkCarousel = () => {
    const carousel = document.querySelector('.work-carousel');
    const viewport = carousel?.querySelector('.work-carousel__viewport');
    const track = carousel?.querySelector('.work-carousel__track');
    const dots = [...(carousel?.querySelectorAll('.work-carousel__dot') || [])];
    if (!carousel || !viewport || !track) return;

    const originals = [...track.querySelectorAll('.work-carousel-card:not(.is-clone)')];
    if (!originals.length) return;

    const cloneCount = Math.min(3, originals.length);
    originals.slice(0, cloneCount).forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add('is-clone');
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('img').forEach((image) => {
        image.alt = '';
        image.setAttribute('role', 'presentation');
      });
      track.appendChild(clone);
    });

    let cards = [...track.querySelectorAll('.work-carousel-card')];
    let index = 0;
    let timer = null;
    let stepSize = 0;
    let paused = false;
    let pointerStart = null;

    const updateStep = () => {
      cards = [...track.querySelectorAll('.work-carousel-card')];
      const card = cards[0];
      if (!card) return;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      stepSize = card.getBoundingClientRect().width + gap;
    };

    const updateDots = () => {
      const active = index % originals.length;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === active));
    };

    const move = (animate = true) => {
      updateStep();
      track.style.transition = animate
        ? 'transform 760ms cubic-bezier(.22,.61,.36,1)'
        : 'none';
      track.style.transform = `translate3d(${-index * stepSize}px,0,0)`;
      updateDots();
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    const start = () => {
      stop();
      if (reducedMotion.matches || paused || document.hidden) return;
      timer = window.setInterval(() => {
        index += 1;
        move(true);
      }, 5000);
    };

    track.addEventListener('transitionend', (event) => {
      if (event.propertyName !== 'transform') return;
      if (index >= originals.length) {
        index = 0;
        move(false);
        window.requestAnimationFrame(() => {
          track.style.transition = '';
        });
      }
    });

    carousel.addEventListener('mouseenter', () => {
      paused = true;
      stop();
    });

    carousel.addEventListener('mouseleave', () => {
      paused = false;
      start();
    });

    carousel.addEventListener('focusin', () => {
      paused = true;
      stop();
    });

    carousel.addEventListener('focusout', () => {
      paused = false;
      start();
    });

    viewport.addEventListener('pointerdown', (event) => {
      pointerStart = event.clientX;
      viewport.setPointerCapture?.(event.pointerId);
      stop();
    });

    viewport.addEventListener('pointerup', (event) => {
      if (pointerStart === null) return;
      const delta = event.clientX - pointerStart;
      pointerStart = null;

      if (Math.abs(delta) > 42) {
        index = delta < 0 ? index + 1 : Math.max(0, index - 1);
        move(true);
      }
      start();
    });

    viewport.addEventListener('pointercancel', () => {
      pointerStart = null;
      start();
    });

    window.addEventListener('resize', () => {
      window.requestAnimationFrame(() => move(false));
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });

    reducedMotion.addEventListener?.('change', () => {
      if (reducedMotion.matches) stop();
      else start();
    });

    move(false);
    start();
  };

  initWorkCarousel();
})();
