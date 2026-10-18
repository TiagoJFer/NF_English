/**
 * Script Interativo da Landing Page — +360 Mapas Mentais de Inglês
 */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Data Dinâmica em Português para Urgência
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    const today = new Date();
    const options = { day: 'numeric', month: 'long' };
    dateEl.textContent = today.toLocaleDateString('pt-BR', options);
  }

  // 2. Ano Atual no Rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Sistema de Abas dos Níveis (A1 ao C2)
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove classe ativa de todos
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      // Ativa o clicado
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 4. Accordion Interativo para o FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains('active');

      // Fecha todos os outros accordions
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      // Se não estava ativo, abre
      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });

  // 5. Preservação de Parâmetros UTM no Botão de Checkout
  // Garante que todo o tráfego rastreado na Landing Page passe para o checkout da Cakto/Wiven
  const checkoutBtn = document.getElementById('btn-comprar-agora');
  if (checkoutBtn) {
    const urlParams = window.location.search;
    if (urlParams) {
      const currentHref = checkoutBtn.getAttribute('href');
      // Evita duplicar "?" caso a URL base já tenha
      const separator = currentHref.includes('?') ? '&' : '?';
      checkoutBtn.setAttribute('href', `${currentHref}${separator}${urlParams.substring(1)}`);
    }
  }

  // 6. Controle de Exibição da Barra Sticky no Mobile
  const stickyBar = document.getElementById('sticky-bar');
  const heroSection = document.getElementById('hero');

  if (stickyBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyBar.style.display = 'flex';
      } else {
        stickyBar.style.display = 'none';
      }
    });
    // Inicia oculto
    stickyBar.style.display = 'none';
  }

  // 7. Carrossel Contínuo: Pausa em Touch & Modal Lightbox para Ampliar Amostras com Navegação
  const samplesTrack = document.getElementById('samples-track');
  const samplesModal = document.getElementById('samples-modal');
  const modalImgWrapper = document.getElementById('samples-modal-img-wrapper');
  const modalImg = document.getElementById('samples-modal-img');
  const modalCaption = document.getElementById('samples-modal-caption');
  const modalCounter = document.getElementById('samples-modal-counter');
  const modalClose = document.getElementById('samples-modal-close');
  const modalOverlay = document.getElementById('samples-modal-overlay');
  const modalPrev = document.getElementById('samples-modal-prev');
  const modalNext = document.getElementById('samples-modal-next');

  // Coleta a lista única de dados dos cards
  const samplesData = [];
  const seenCards = new Set();
  document.querySelectorAll('.sample-mini-card').forEach(card => {
    const src = card.getAttribute('data-full') || card.querySelector('img')?.getAttribute('src');
    const title = card.getAttribute('data-title') || card.querySelector('span')?.textContent;
    if (src && !seenCards.has(src)) {
      seenCards.add(src);
      samplesData.push({ src, title: title || 'Infográfico Ilustrado' });
    }
  });

  let currentSampleIdx = 0;

  const renderSample = (idx, animate = true) => {
    if (!samplesData.length) return;
    currentSampleIdx = (idx + samplesData.length) % samplesData.length;
    const current = samplesData[currentSampleIdx];

    if (animate && modalImg) {
      modalImg.classList.add('is-switching');
      setTimeout(() => {
        modalImg.src = current.src;
        modalImg.alt = current.title;
        if (modalCaption) modalCaption.textContent = current.title;
        if (modalCounter) modalCounter.textContent = `${currentSampleIdx + 1} / ${samplesData.length}`;
        modalImg.classList.remove('is-switching');
      }, 110);
    } else if (modalImg) {
      modalImg.src = current.src;
      modalImg.alt = current.title;
      if (modalCaption) modalCaption.textContent = current.title;
      if (modalCounter) modalCounter.textContent = `${currentSampleIdx + 1} / ${samplesData.length}`;
    }
  };

  // Pausa/retomada no touch em mobile
  if (samplesTrack) {
    samplesTrack.addEventListener('touchstart', () => {
      samplesTrack.classList.add('is-paused');
    }, { passive: true });

    samplesTrack.addEventListener('touchend', () => {
      setTimeout(() => {
        samplesTrack.classList.remove('is-paused');
      }, 1500);
    }, { passive: true });
  }

  // Abertura do Modal de Zoom ao Clicar em Qualquer Card
  const sampleCards = document.querySelectorAll('.sample-mini-card');
  sampleCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-full') || card.querySelector('img')?.getAttribute('src');
      const foundIdx = samplesData.findIndex(s => s.src === imgSrc);
      if (foundIdx !== -1) {
        currentSampleIdx = foundIdx;
      }

      if (samplesModal && modalImg) {
        renderSample(currentSampleIdx, false);
        samplesModal.classList.add('active');
        samplesModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const nextSample = () => renderSample(currentSampleIdx + 1, true);
  const prevSample = () => renderSample(currentSampleIdx - 1, true);

  if (modalNext) {
    modalNext.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSample();
    });
  }

  if (modalPrev) {
    modalPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSample();
    });
  }

  // Função para fechar o Modal
  const closeModal = () => {
    if (samplesModal) {
      samplesModal.classList.remove('active');
      samplesModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (modalImg) modalImg.src = '';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  // Teclas do Teclado: ESC (fechar), Seta Direita (próximo), Seta Esquerda (anterior)
  document.addEventListener('keydown', (e) => {
    if (!samplesModal || !samplesModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextSample();
    if (e.key === 'ArrowLeft') prevSample();
  });

  // Touch Swipe Gesture no Mobile para navegar pelos cards
  let touchStartX = 0;
  if (modalImgWrapper) {
    modalImgWrapper.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    modalImgWrapper.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const diffX = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diffX) > 45) {
          if (diffX > 0) {
            nextSample();
          } else {
            prevSample();
          }
        }
      }
    }, { passive: true });
  }

});
