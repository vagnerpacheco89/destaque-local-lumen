(() => {
  const heroTitle = document.querySelector('.hero-card__content h1');
  const heroLead = document.querySelector('.hero-card__lead');

  if (heroTitle) heroTitle.textContent = 'Eletricista em Palhoça';
  if (heroLead) {
    heroLead.textContent = 'Manutenção, instalações e correções elétricas para residências e pequenos comércios, com atendimento direto e serviço explicado com clareza.';
  }

  const heroContactText = document.querySelector('.hero-contact strong');
  if (heroContactText) {
    heroContactText.innerHTML = 'Conte o que precisa e envie<br>fotos quando possível.';
  }

  const heroContactPolish = document.createElement('style');
  heroContactPolish.textContent = `
    .hero-contact {
      width: 350px !important;
      padding: 22px 22px 18px !important;
    }

    .hero-contact::before {
      content: none !important;
      display: none !important;
    }

    .hero-contact__kicker {
      width: 100%;
      text-align: center;
    }

    .hero-contact strong {
      max-width: 100% !important;
      margin: 0 auto 14px !important;
      text-align: center;
      white-space: nowrap;
    }

    .hero-contact .text-link {
      width: 100% !important;
      margin-left: 0 !important;
    }

    @media (max-width: 980px) {
      .hero-contact {
        width: 326px !important;
        padding: 20px 20px 17px !important;
      }

      .hero-contact strong {
        max-width: 100% !important;
      }
    }

    @media (max-width: 680px) {
      .hero-contact {
        left: 18px !important;
        right: 18px !important;
        width: auto !important;
        padding: 18px 18px 16px !important;
      }

      .hero-contact strong {
        max-width: none !important;
        text-align: center;
        white-space: normal;
      }

      .hero-contact .text-link {
        width: 100% !important;
        margin-left: 0 !important;
      }
    }
  `;
  document.head.appendChild(heroContactPolish);

  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');

  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  };

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    mobileMenu.hidden = open;
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
