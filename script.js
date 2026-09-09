(() => {
  const VERSION = '20260909-work-proof-03';

  const loadBaseScript = () => {
    const base = document.createElement('script');
    base.src = `script-base.js?v=${VERSION}`;
    base.onload = initWorkCarousel;
    base.onerror = initWorkCarousel;
    document.head.appendChild(base);
  };

  const initWorkCarousel = () => {
    const section = document.querySelector('#trabalhos');
    const host = section?.querySelector('.work-cards');
    if (!section || !host || host.dataset.sliderReady === 'true') return;

    host.dataset.sliderReady = 'true';

    const title = section.querySelector('.work-panel__head h2');
    const lead = section.querySelector('.work-panel__head > p:last-child');
    if (title) title.textContent = 'Veja alguns tipos de trabalho na prática.';
    if (lead) lead.textContent = 'Exemplos visuais de situações e instalações que podem fazer parte do atendimento.';

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

  loadBaseScript();
})();
