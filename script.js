(() => {
  const VERSION = '20260909-process-cards-03';

  const initPageEnhancements = () => {
    initWorkCarousel();
    initQualitySection();
    initProcessSection();
  };

  const loadBaseScript = () => {
    const base = document.createElement('script');
    base.src = `script-base.js?v=${VERSION}`;
    base.onload = initPageEnhancements;
    base.onerror = initPageEnhancements;
    document.head.appendChild(base);
  };

  const initWorkCarousel = () => {
    const section = document.querySelector('#trabalhos');
    const host = section?.querySelector('.work-cards');
    if (!section || !host || host.dataset.sliderReady === 'true') return;

    host.dataset.sliderReady = 'true';

    const title = section.querySelector('.work-panel__head h2');
    const lead = section.querySelector('.work-panel__head > p:last-child');
    if (title) title.textContent = 'Veja alguns trabalhos que já realizei.';
    if (lead) lead.textContent = 'Serviços executados em diferentes situações, com atenção à instalação e ao que cada imóvel precisava.';

    const items = [
      {
        title: 'Quadros elétricos',
        description: 'Organização e adequação da instalação.',
        image: 'https://raw.githubusercontent.com/vagnerpacheco89/destaque-local-volt/main/assets/asset-02-quadro-organizado.webp',
        alt: 'Quadro elétrico residencial organizado.'
      },
      {
        title: 'Iluminação',
        description: 'Instalação de pontos e luminárias.',
        image: 'https://raw.githubusercontent.com/vagnerpacheco89/destaque-local-volt/main/assets/asset-04-luminarias.webp',
        alt: 'Instalação de iluminação em residência.'
      },
      {
        title: 'Novos pontos',
        description: 'Tomadas e pontos onde o imóvel precisa.',
        image: 'https://raw.githubusercontent.com/vagnerpacheco89/destaque-local-volt/main/assets/asset-03-novos-pontos.webp',
        alt: 'Instalação de tomada e novo ponto elétrico.'
      },
      {
        title: 'Chuveiros e circuitos',
        description: 'Instalação e correção do circuito.',
        image: 'https://raw.githubusercontent.com/vagnerpacheco89/destaque-local-volt/main/assets/asset-05-chuveiro.webp',
        alt: 'Chuveiro elétrico em instalação residencial.'
      },
      {
        title: 'Diagnóstico elétrico',
        description: 'Teste para localizar a origem da falha.',
        image: 'https://raw.githubusercontent.com/vagnerpacheco89/destaque-local-volt/main/assets/asset-10-teste-comercio.webp',
        alt: 'Eletricista realizando teste em instalação elétrica.'
      },
      {
        title: 'Fiação, DR e DPS',
        description: 'Adequações e proteção da instalação.',
        image: 'https://raw.githubusercontent.com/vagnerpacheco89/destaque-local-volt/main/assets/asset-08-dr-dps.webp',
        alt: 'Componentes de proteção DR e DPS em instalação elétrica.'
      }
    ];

    const clones = items.slice(0, 3);
    const renderCard = (item, index, clone = false) => `
      <article class="work-carousel-card${clone ? ' is-clone' : ''}" ${clone ? 'aria-hidden="true"' : ''}>
        <img src="${item.image}" alt="${clone ? '' : item.alt}" ${clone ? 'role="presentation"' : ''} loading="lazy" decoding="async" />
        <div class="work-carousel-card__shade"></div>
        <div class="work-carousel-card__content">
          <span class="work-carousel-card__index" aria-hidden="true">${String((index % items.length) + 1).padStart(2, '0')}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>`;

    host.innerHTML = `
      <div class="work-carousel" aria-label="Exemplos de trabalhos elétricos">
        <div class="work-carousel__viewport">
          <div class="work-carousel__track">
            ${items.map((item, index) => renderCard(item, index)).join('')}
            ${clones.map((item, index) => renderCard(item, index, true)).join('')}
          </div>
        </div>
        <div class="work-carousel__dots" aria-hidden="true">
          ${items.map((_, index) => `<span class="work-carousel__dot${index === 0 ? ' is-active' : ''}"></span>`).join('')}
        </div>
      </div>`;

    const oldCta = section.querySelector('.work-panel__link');
    if (oldCta && !section.querySelector('.work-panel__closing')) {
      const closing = document.createElement('div');
      closing.className = 'work-panel__closing';
      const question = document.createElement('p');
      question.textContent = 'Tem algo parecido para resolver no seu imóvel?';
      oldCta.textContent = 'FALAR COM RAFAEL →';
      oldCta.classList.add('work-panel__cta');
      oldCta.parentNode.insertBefore(closing, oldCta);
      closing.append(question, oldCta);
    }

    const carousel = host.querySelector('.work-carousel');
    const viewport = host.querySelector('.work-carousel__viewport');
    const track = host.querySelector('.work-carousel__track');
    const cards = [...host.querySelectorAll('.work-carousel-card')];
    const dots = [...host.querySelectorAll('.work-carousel__dot')];
    if (!carousel || !viewport || !track || !cards.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0;
    let timer = null;
    let stepSize = 0;
    let paused = false;

    const updateStep = () => {
      const card = cards[0];
      if (!card) return;
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
      stepSize = card.getBoundingClientRect().width + gap;
    };

    const updateDots = () => {
      const active = index % items.length;
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
      if (index >= items.length) {
        index = 0;
        move(false);
        requestAnimationFrame(() => {
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

    let pointerStart = null;
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
        if (delta < 0) {
          index += 1;
        } else {
          index = Math.max(0, index - 1);
        }
        move(true);
      }
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

    items.forEach((item) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = item.image;
    });

    move(false);
    start();
  };

  const initQualitySection = () => {
    const section = document.querySelector('.quality-section');
    if (!section || section.dataset.qualityReady === 'true') return;

    section.dataset.qualityReady = 'true';
    section.innerHTML = `
      <div class="container quality-layout">
        <div class="quality-copy">
          <p class="eyebrow">NO ATENDIMENTO</p>
          <h2>O que você pode esperar ao contratar meu serviço.</h2>
          <p class="quality-copy__lead">Clareza antes de começar, cuidado durante a execução e conferência antes de finalizar.</p>
        </div>

        <div class="quality-list" aria-label="Diferenciais do atendimento">
          <article class="quality-item">
            <span class="quality-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 21 15Z"></path><path d="M8 10h8M8 14h5"></path></svg>
            </span>
            <div><h3>Explicação clara</h3><p>Você entende o que precisa ser feito antes do serviço começar.</p></div>
          </article>

          <article class="quality-item">
            <span class="quality-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M9 5h9a2 2 0 0 1 2 2v12H6V8"></path><path d="M9 3H5a2 2 0 0 0-2 2v14h3"></path><path d="m10 12 2 2 4-4"></path></svg>
            </span>
            <div><h3>Tudo combinado antes</h3><p>Serviço, materiais e orçamento são alinhados antes da execução.</p></div>
          </article>

          <article class="quality-item">
            <span class="quality-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"></path><path d="M5.5 10.5V20h13v-9.5"></path><path d="m16.5 5.5.8-2 .8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z"></path></svg>
            </span>
            <div><h3>Cuidado com o local</h3><p>Organização durante o trabalho e atenção ao acabamento.</p></div>
          </article>

          <article class="quality-item">
            <span class="quality-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="m8 12 2.5 2.5L16 9"></path></svg>
            </span>
            <div><h3>Conferência final</h3><p>O que foi executado é testado antes da finalização.</p></div>
          </article>
        </div>
      </div>`;
  };

  const initProcessSection = () => {
    const section = document.querySelector('.process-section');
    if (!section || section.dataset.processReady === 'true') return;

    section.dataset.processReady = 'true';
    section.innerHTML = `
      <div class="container process-shell">
        <div class="process-head">
          <p class="eyebrow">COMO FUNCIONA</p>
          <h2>Do primeiro contato ao serviço finalizado.</h2>
          <p class="process-head__lead">Você explica o que precisa, eu avalio a situação e combinamos o serviço antes de começar.</p>
        </div>

        <div class="process-route" aria-label="Etapas do atendimento">
          <article class="process-step">
            <span class="process-step__number" aria-hidden="true">01</span>
            <div><h3>Você me conta o que precisa</h3><p>Envie mensagem e, se possível, fotos ou vídeos da situação.</p></div>
          </article>

          <article class="process-step">
            <span class="process-step__number" aria-hidden="true">02</span>
            <div><h3>Eu avalio o cenário</h3><p>Analiso o problema e vejo se é preciso uma visita.</p></div>
          </article>

          <article class="process-step">
            <span class="process-step__number" aria-hidden="true">03</span>
            <div><h3>Combinamos o serviço</h3><p>Alinhamos o que será feito, materiais e orçamento.</p></div>
          </article>

          <article class="process-step">
            <span class="process-step__number" aria-hidden="true">04</span>
            <div><h3>Execução e conferência</h3><p>O serviço é realizado e testado antes da finalização.</p></div>
          </article>
        </div>

        <div class="process-close">
          <p>Pronto para explicar o que precisa?</p>
          <button class="btn btn--yellow" type="button" data-demo-cta>COMEÇAR PELO WHATSAPP →</button>
        </div>
      </div>`;
  };

  loadBaseScript();
})();
