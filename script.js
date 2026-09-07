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

  const heroProof = document.querySelector('.hero-proof');
  if (heroProof) {
    heroProof.innerHTML = `
      <span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 3 5 6v5c0 4.6 2.9 8.1 7 10 4.1-1.9 7-5.4 7-10V6l-7-3Z"></path>
          <path d="m9.2 12 1.8 1.8 3.8-4"></path>
        </svg>
        Orçamento antes do serviço
      </span>
      <span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.8 8.8 0 0 1-3.5-.7L4 20l1.5-4A7.5 7.5 0 1 1 20 11.5Z"></path>
          <path d="M8.5 10.5h7"></path>
          <path d="M8.5 13.5h4.5"></path>
        </svg>
        Contato direto com Rafael
      </span>
      <span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path>
          <circle cx="12" cy="10" r="2.5"></circle>
        </svg>
        Palhoça e região
      </span>
    `;
  }

  document.querySelector('.trust-strip')?.remove();

  const heroContactPolish = document.createElement('style');
  heroContactPolish.textContent = `
    .hero {
      padding-bottom: 54px !important;
    }

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

    .hero-proof {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 9px !important;
      width: min(650px, 100%);
      margin-top: 28px !important;
    }

    .hero-proof > span {
      display: grid !important;
      grid-template-columns: 34px minmax(0, 1fr) !important;
      align-items: center !important;
      gap: 8px !important;
      min-height: 50px !important;
      padding: 5px 10px 5px 5px !important;
      border: 1px solid rgba(255, 210, 63, .28) !important;
      border-radius: 999px !important;
      background:
        linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.045)),
        rgba(2,48,34,.38) !important;
      color: rgba(255,255,255,.96) !important;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 8px 22px rgba(0,0,0,.10) !important;
      font-size: 11.5px !important;
      font-weight: 750 !important;
      line-height: 1.22 !important;
      letter-spacing: -.015em !important;
    }

    .hero-proof > span::before {
      content: none !important;
      display: none !important;
    }

    .hero-proof > span svg {
      width: 34px;
      height: 34px;
      padding: 7px;
      border-radius: 50%;
      background: linear-gradient(180deg, #ffdc5b 0%, var(--yellow) 100%);
      color: #0d4b36;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
      box-shadow: 0 5px 14px rgba(255,199,43,.22), inset 0 1px 0 rgba(255,255,255,.44);
    }

    @media (max-width: 980px) {
      .hero-contact {
        width: 326px !important;
        padding: 20px 20px 17px !important;
      }

      .hero-contact strong {
        max-width: 100% !important;
      }

      .hero-proof {
        width: min(610px, 100%);
      }

      .hero-proof > span {
        font-size: 11px !important;
      }
    }

    @media (max-width: 680px) {
      .hero {
        padding-bottom: 28px !important;
      }

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

      .hero-proof {
        grid-template-columns: 1fr !important;
        gap: 7px !important;
      }

      .hero-proof > span {
        min-height: 46px !important;
        font-size: 12px !important;
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
