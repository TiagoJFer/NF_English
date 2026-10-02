/**
 * Script Interativo da Landing Page — +360 Infográficos de Inglês
 * Alta Performance, Pré-carregamento Inteligente e Abertura Instantânea de Amostras
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
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

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

      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        currentItem.classList.add('active');
      }
    });
  });

  // 5. Preservação de Parâmetros UTM nos Botões de Checkout
  const checkoutButtons = document.querySelectorAll('.btn-plan, .checkout-btn, .cta-btn, #cta-hero, #btn-comprar-agora, #btn-comprar-pro, #btn-comprar-essencial');
  if (checkoutButtons.length > 0) {
    const urlParams = window.location.search;
    if (urlParams) {
      checkoutButtons.forEach(btn => {
        const currentHref = btn.getAttribute('href');
        if (currentHref && !currentHref.startsWith('#')) {
          const separator = currentHref.includes('?') ? '&' : '?';
          btn.setAttribute('href', currentHref + separator + urlParams.substring(1));
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
    }, { passive: true });
    stickyBar.style.display = 'none';
  }

  // 7. Carrossel Contínuo: Pausa em Touch & Modal Lightbox Instantâneo
  const samplesTrack = document.getElementById('samples-track');
  const samplesModal = document.getElementById('samples-modal');
  const modalImg = document.getElementById('samples-modal-img');
  const modalCaption = document.getElementById('samples-modal-caption');
  const modalClose = document.getElementById('samples-modal-close');
  const modalOverlay = document.getElementById('samples-modal-overlay');

  // Pausa/retomada suave no touch em mobile
  if (samplesTrack) {
    samplesTrack.addEventListener('touchstart', () => {
      samplesTrack.classList.add('is-paused');
    }, { passive: true });

    samplesTrack.addEventListener('touchend', () => {
      setTimeout(() => {
        samplesTrack.classList.remove('is-paused');
      }, 1200);
    }, { passive: true });
  }

  // Pré-carregamento dinâmico em background das imagens completas WebP
  let preloaded = false;
  function preloadFullImages() {
    if (preloaded) return;
    preloaded = true;
    const cards = document.querySelectorAll('.sample-mini-card');
    cards.forEach(card => {
      const fullSrc = card.getAttribute('data-full');
      if (fullSrc) {
        const img = new Image();
        img.src = fullSrc;
      }
    });
  }

  // Dispara pré-carga quando o carrossel se aproxima da tela
  if ('IntersectionObserver' in window && samplesTrack) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          preloadFullImages();
          observer.disconnect();
        }
      });
    }, { rootMargin: '250px' });
    observer.observe(samplesTrack);
  } else {
    setTimeout(preloadFullImages, 2000);
  }

  // Abertura Ultra-Rápida do Modal ao Clicar/Tocar no Card
  const sampleCards = document.querySelectorAll('.sample-mini-card');
  sampleCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const fullSrc = card.getAttribute('data-full');
      const thumbImg = card.querySelector('img');
      const thumbSrc = thumbImg ? thumbImg.getAttribute('src') : '';
      const imgTitle = card.getAttribute('data-title') || card.querySelector('span')?.textContent || 'Amostra do Infográfico';

      if (samplesModal && modalImg) {
        // Passo 1: Mostra imediatamente a thumbnail que já está carregada no navegador (0ms de espera visual!)
        if (thumbSrc) {
          modalImg.src = thumbSrc;
        }
        modalImg.alt = imgTitle;
        if (modalCaption) {
          modalCaption.textContent = imgTitle;
        }

        // Abre o modal instantaneamente
        samplesModal.classList.add('active');
        samplesModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Passo 2: Se tiver a versão em alta definição leve (WebP), carrega e substitui
        if (fullSrc && fullSrc !== thumbSrc) {
          const highRes = new Image();
          highRes.src = fullSrc;
          highRes.onload = () => {
            if (samplesModal.classList.contains('active')) {
              modalImg.src = fullSrc;
            }
          };
        }
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

  // 8. Scroll Suave para Links Internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
