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

  const interfacePolish = document.createElement('style');
  interfacePolish.textContent = `
    .hero {
      padding-top: 10px !important;
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

    /* Navigation — premium floating light bar aligned with the hero container. */
    .site-header {
      top: 0 !important;
      padding: 10px 0 0 !important;
      background: transparent !important;
      border-bottom: 0 !important;
      backdrop-filter: none !important;
      transition: padding .22s ease;
    }

    .site-header .nav {
      position: relative;
      height: 68px !important;
      padding: 0 18px !important;
      gap: 18px !important;
      border: 1px solid rgba(16, 61, 44, .10);
      border-radius: 20px;
      background: rgba(255, 254, 249, .94);
      box-shadow:
        0 16px 38px rgba(18, 91, 64, .10),
        inset 0 1px 0 rgba(255,255,255,.88);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      transition: height .22s ease, border-radius .22s ease, box-shadow .22s ease, padding .22s ease;
    }

    .site-header .brand {
      gap: 12px !important;
    }

    .site-header .brand__mark {
      width: 42px !important;
      height: 42px !important;
      background: linear-gradient(180deg, #1b7955 0%, #0f563c 100%) !important;
      color: #fff !important;
      font-size: 13px !important;
      box-shadow:
        0 0 0 2px rgba(255,254,249,.98),
        0 0 0 3px rgba(255,210,63,.96),
        0 8px 18px rgba(13, 73, 52, .18) !important;
      transition: width .22s ease, height .22s ease, font-size .22s ease;
    }

    .site-header .brand__text strong {
      color: #123e2f;
      font-size: 15px !important;
      font-weight: 800;
      letter-spacing: -.025em;
      transition: font-size .22s ease;
    }

    .site-header .brand__text small {
      margin-top: 5px !important;
      color: #75857d;
      font-size: 9.5px !important;
      font-weight: 700;
      letter-spacing: .19em !important;
      transition: font-size .22s ease, margin .22s ease;
    }

    .site-header .nav-demo-tag {
      min-height: 26px !important;
      padding: 0 10px !important;
      border: 1px solid rgba(255, 199, 43, .52) !important;
      border-radius: 999px !important;
      background: rgba(255, 210, 63, .17) !important;
      color: #15523c !important;
      box-shadow: none !important;
      font-size: 9.5px !important;
      font-weight: 850 !important;
      letter-spacing: .085em !important;
      transition: min-height .22s ease, padding .22s ease, font-size .22s ease;
    }

    .site-header .desktop-nav {
      gap: 25px !important;
    }

    .site-header .desktop-nav a {
      position: relative;
      padding: 24px 0 22px;
      color: #425c51 !important;
      font-size: 12.5px !important;
      font-weight: 750 !important;
      letter-spacing: -.01em;
      transition: color .18s ease, padding .22s ease;
    }

    .site-header .desktop-nav a::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: 14px;
      width: 0;
      height: 2px;
      border-radius: 999px;
      background: var(--yellow);
      box-shadow: 0 0 10px rgba(255, 210, 63, .28);
      transform: translateX(-50%);
      transition: width .18s ease, bottom .22s ease;
    }

    .site-header .desktop-nav a:hover,
    .site-header .desktop-nav a:focus-visible {
      color: #0f563c !important;
    }

    .site-header .desktop-nav a:hover::after,
    .site-header .desktop-nav a:focus-visible::after {
      width: 24px;
    }

    .site-header .nav-cta {
      min-height: 46px !important;
      padding: 0 17px 0 19px !important;
      border: 1px solid rgba(255, 183, 20, .44) !important;
      border-radius: 14px !important;
      background: linear-gradient(180deg, #ffdc55 0%, var(--yellow) 100%) !important;
      color: #103d2c !important;
      box-shadow:
        0 11px 24px rgba(255, 199, 43, .24),
        inset 0 1px 0 rgba(255,255,255,.48) !important;
      font-size: 12.5px !important;
      font-weight: 900 !important;
      letter-spacing: .015em !important;
      gap: 9px;
      transition: min-height .22s ease, padding .22s ease, transform .18s ease, box-shadow .18s ease, background .18s ease;
    }

    .site-header .nav-cta::after {
      content: "→";
      display: inline-block;
      font-size: 16px;
      line-height: 1;
      transform: translateX(0);
      transition: transform .18s ease;
    }

    .site-header .nav-cta:hover {
      background: linear-gradient(180deg, #ffe370 0%, #ffd23f 100%) !important;
      box-shadow: 0 14px 30px rgba(255, 199, 43, .30) !important;
      transform: translateY(-1px);
    }

    .site-header .nav-cta:hover::after {
      transform: translateX(3px);
    }

    .site-header.is-compact {
      padding: 5px 0 !important;
    }

    .site-header.is-compact .nav {
      height: 58px !important;
      padding-inline: 15px !important;
      border-radius: 17px;
      box-shadow:
        0 14px 34px rgba(12, 73, 52, .14),
        inset 0 1px 0 rgba(255,255,255,.90);
    }

    .site-header.is-compact .brand__mark {
      width: 35px !important;
      height: 35px !important;
      font-size: 11.5px !important;
    }

    .site-header.is-compact .brand__text strong {
      font-size: 13.5px !important;
    }

    .site-header.is-compact .brand__text small {
      margin-top: 3px !important;
      font-size: 8.5px !important;
    }

    .site-header.is-compact .nav-demo-tag {
      min-height: 23px !important;
      padding-inline: 8px !important;
      font-size: 8.5px !important;
    }

    .site-header.is-compact .desktop-nav a {
      padding-top: 19px;
      padding-bottom: 18px;
    }

    .site-header.is-compact .desktop-nav a::after {
      bottom: 10px;
    }

    .site-header.is-compact .nav-cta {
      min-height: 40px !important;
      padding-inline: 15px !important;
    }

    .mobile-menu {
      width: min(1180px, calc(100% - 40px));
      margin: 4px auto 0;
      overflow: hidden;
      border: 1px solid rgba(16, 61, 44, .10) !important;
      border-radius: 16px;
      background: rgba(255,254,249,.98) !important;
      box-shadow: 0 18px 42px rgba(18,91,64,.12);
    }

    .mobile-menu__inner {
      padding: 10px 18px 18px !important;
    }

    .mobile-menu__inner a {
      color: #315548;
      border-bottom-color: rgba(16,61,44,.10) !important;
      font-size: 13px;
    }

    .menu-toggle {
      border-color: rgba(16,61,44,.14) !important;
      background: rgba(255,255,255,.76) !important;
      border-radius: 12px !important;
    }

    .menu-toggle span {
      background: var(--green-deep) !important;
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

      .site-header {
        padding: 8px 0 6px !important;
      }

      .site-header .nav {
        height: 62px !important;
        padding-inline: 14px !important;
        border-radius: 18px;
      }

      .site-header .brand__mark {
        width: 38px !important;
        height: 38px !important;
      }

      .site-header .nav-demo-tag {
        margin-right: auto !important;
      }

      .site-header.is-compact {
        padding: 4px 0 !important;
      }

      .site-header.is-compact .nav {
        height: 56px !important;
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

      .site-header {
        padding: 6px 0 5px !important;
      }

      .site-header .nav {
        width: min(100% - 24px, 1180px) !important;
        height: 58px !important;
        padding-inline: 12px !important;
        gap: 9px !important;
        border-radius: 16px;
      }

      .site-header .brand {
        gap: 9px !important;
      }

      .site-header .brand__mark {
        width: 35px !important;
        height: 35px !important;
        font-size: 11.5px !important;
      }

      .site-header .brand__text strong {
        font-size: 13px !important;
      }

      .site-header .brand__text small {
        margin-top: 3px !important;
        font-size: 8px !important;
      }

      .site-header .nav-demo-tag {
        min-height: 22px !important;
        padding-inline: 7px !important;
        font-size: 7.5px !important;
      }

      .site-header .menu-toggle {
        width: 40px;
        height: 40px;
        padding: 9px;
      }

      .mobile-menu {
        width: calc(100% - 24px);
        border-radius: 14px;
      }

      .site-header.is-compact .nav {
        height: 54px !important;
      }
    }
  `;
  document.head.appendChild(interfacePolish);

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