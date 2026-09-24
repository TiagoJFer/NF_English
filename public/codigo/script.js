/**
 * Script Interativo da Landing Page (Modo Claro) — +360 Mapas Mentais de Inglês
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

  // 5. Preservação de Parâmetros UTM nos Botões de Checkout
  const checkoutButtons = document.querySelectorAll('.btn-plan, .checkout-btn, #btn-comprar-agora, #btn-comprar-pro, #btn-comprar-essencial');
  if (checkoutButtons.length > 0) {
    const urlParams = window.location.search;
    if (urlParams) {
      checkoutButtons.forEach(btn => {
        const currentHref = btn.getAttribute('href');
        if (currentHref && !currentHref.startsWith('#')) {
          const separator = currentHref.includes('?') ? '&' : '?';
          btn.setAttribute('href', `${currentHref}${separator}${urlParams.substring(1)}`);
        }
      });
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

  // 7. Carrossel Contínuo: Pausa em Touch & Modal Lightbox para Ampliar Amostras
  const samplesTrack = document.getElementById('samples-track');
  const samplesModal = document.getElementById('samples-modal');
  const modalImg = document.getElementById('samples-modal-img');
  const modalCaption = document.getElementById('samples-modal-caption');
  const modalClose = document.getElementById('samples-modal-close');
  const modalOverlay = document.getElementById('samples-modal-overlay');

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
      const imgTitle = card.getAttribute('data-title') || card.querySelector('span')?.textContent;

      if (samplesModal && modalImg && imgSrc) {
        modalImg.src = imgSrc;
        modalImg.alt = imgTitle || 'Amostra do Mapa Mental';
        if (modalCaption) {
          modalCaption.textContent = imgTitle || '';
        }
        samplesModal.classList.add('active');
        samplesModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

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

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && samplesModal && samplesModal.classList.contains('active')) {
      closeModal();
    }
  });

});
