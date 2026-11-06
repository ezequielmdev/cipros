/**
 * CIPROS - Controle dos Carrosséis (Slider Principal e Convênios)
 */

class HeroSlider {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slider-slide');
    this.prevBtn = this.container.querySelector('.slider-arrow.prev');
    this.nextBtn = this.container.querySelector('.slider-arrow.next');
    this.dotsContainer = document.querySelector('.slider-dots');
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.totalSlides = this.slides.length;

    this.init();
  }

  init() {
    if (this.totalSlides === 0) return;

    // Criar indicadores de pontos (dots)
    if (this.dotsContainer) {
      this.dotsContainer.innerHTML = '';
      for (let i = 0; i < this.totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => {
          this.goToSlide(i);
          this.resetAutoPlay();
        });
        this.dotsContainer.appendChild(dot);
      }
    }

    // Eventos dos botões de setas
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }

    // Pausar ao passar o mouse
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());

    // Suporte a swipe touch
    let startX = 0;
    this.container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) this.nextSlide();
        else this.prevSlide();
        this.resetAutoPlay();
      }
    }, { passive: true });

    this.goToSlide(0);
    this.startAutoPlay();
  }

  goToSlide(index) {
    if (this.slides[this.currentIndex]) {
      this.slides[this.currentIndex].classList.remove('active');
    }
    const dots = this.dotsContainer ? this.dotsContainer.querySelectorAll('.slider-dot') : [];
    if (dots[this.currentIndex]) {
      dots[this.currentIndex].classList.remove('active');
    }

    this.currentIndex = (index + this.totalSlides) % this.totalSlides;

    if (this.slides[this.currentIndex]) {
      this.slides[this.currentIndex].classList.add('active');
    }
    if (dots[this.currentIndex]) {
      dots[this.currentIndex].classList.add('active');
    }

    // Atualiza a legenda científica dinâmica com dados do Atlas
    const captionBox = document.querySelector('.slider-caption-box');
    const ciprosData = (typeof CIPROS_DATA !== 'undefined' ? CIPROS_DATA : (typeof window !== 'undefined' ? window.CIPROS_DATA : null));
    if (captionBox && ciprosData && ciprosData.sliderHome) {
      const currentSlideData = ciprosData.sliderHome[this.currentIndex];
      if (currentSlideData) {
        captionBox.innerHTML = `
          <div style="font-weight: bold; color: #0b6912; margin-bottom: 3px; font-size: 12.5px;">
            <i class="fa-solid fa-dna" style="margin-right: 4px;"></i>${currentSlideData.titulo}
          </div>
          <div>${currentSlideData.descricao}</div>
        `;
      }
    }
  }

  nextSlide() {
    this.goToSlide(this.currentIndex + 1);
  }

  prevSlide() {
    this.goToSlide(this.currentIndex - 1);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.startAutoPlay();
  }
}

class ConveniosCarousel {
  constructor(viewportSelector, trackSelector, prevBtnSelector, nextBtnSelector) {
    this.viewport = document.querySelector(viewportSelector);
    this.track = document.querySelector(trackSelector);
    this.prevBtn = document.querySelector(prevBtnSelector);
    this.nextBtn = document.querySelector(nextBtnSelector);
    this.currentOffset = 0;
    this.autoPlayInterval = null;

    if (!this.viewport || !this.track) return;
    this.init();
  }

  init() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.scrollPrev();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.scrollNext();
        this.resetAutoPlay();
      });
    }

    this.viewport.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.viewport.addEventListener('mouseleave', () => this.startAutoPlay());

    this.startAutoPlay();
  }

  getSlotWidth() {
    const firstSlot = this.track.querySelector('.convenio-slot');
    return firstSlot ? firstSlot.offsetWidth : 150;
  }

  getMaxOffset() {
    const totalWidth = this.track.scrollWidth;
    const viewportWidth = this.viewport.offsetWidth;
    return Math.max(0, totalWidth - viewportWidth);
  }

  scrollNext() {
    const slotW = this.getSlotWidth();
    const maxOffset = this.getMaxOffset();
    if (this.currentOffset >= maxOffset) {
      this.currentOffset = 0;
    } else {
      this.currentOffset = Math.min(maxOffset, this.currentOffset + slotW * 2);
    }
    this.updateTransform();
  }

  scrollPrev() {
    const slotW = this.getSlotWidth();
    const maxOffset = this.getMaxOffset();
    if (this.currentOffset <= 0) {
      this.currentOffset = maxOffset;
    } else {
      this.currentOffset = Math.max(0, this.currentOffset - slotW * 2);
    }
    this.updateTransform();
  }

  updateTransform() {
    this.track.style.transform = `translateX(-${this.currentOffset}px)`;
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.scrollNext();
    }, 3200);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.startAutoPlay();
  }
}
