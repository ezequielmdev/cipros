/**
 * CIPROS Fisioterapia e Fisiatria - Script Principal
 * Layout Moderno inspirado no MedFisio (Fisio para Todos)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  renderServices();
  initServicesFilter();
  initAtlasAnatomico();
  renderConvenios();
  initConveniosSearch();
  initFaqAccordion();
  initContactForm();
});

/* ========================================================
   1. Menu Mobile
   ======================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const links = document.querySelectorAll('.nav-link');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (nav.classList.contains('open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* ========================================================
   2. Navegação com Rolagem Suave & Active Spy
   ======================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const navLinks = document.querySelectorAll('.nav-link');

  links.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.length <= 1) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
        const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Atualizar link ativo no menu ao rolar
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ========================================================
   3. Renderização dos Serviços & Filtros por Categoria
   ======================================================== */
let currentCategory = 'todos';

function renderServices() {
  const container = document.getElementById('services-grid-container');
  const data = (typeof CIPROS_DATA !== 'undefined' ? CIPROS_DATA : window.CIPROS_DATA);
  if (!container || !data || !data.servicos) return;

  const items = currentCategory === 'todos' 
    ? data.servicos 
    : data.servicos.filter(s => s.categoria === currentCategory);

  container.innerHTML = '';
  items.forEach(serv => {
    const card = document.createElement('div');
    card.className = 'service-card';
    const zapLink = `https://api.whatsapp.com/send/?phone=555193674766&text=Ol%C3%A1,+gostaria+de+agendar+uma+consulta!`;

    card.innerHTML = `
      <div class="service-card-top">
        <div class="service-icon-box">
          <i class="fa-solid ${serv.icone || 'fa-notes-medical'}"></i>
        </div>
        <div>
          <span class="service-tag">${serv.tag}</span>
          <h3 class="service-card-title">${serv.titulo}</h3>
        </div>
      </div>
      <p class="service-card-desc">${serv.descricao}</p>
      <a href="${zapLink}" target="_blank" class="service-card-btn" rel="noopener">
        <i class="fa-brands fa-whatsapp"></i> Agendar Tratamento
      </a>
    `;
    container.appendChild(card);
  });
}

function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'todos';
      renderServices();
    });
  });
}

/* ========================================================
   4. Atlas Anatômico & Biomecânica Clínica 3D CIPROS
   ======================================================== */
function initAtlasAnatomico() {
  const container = document.getElementById('atlas-dynamic-content');
  const tabs = document.querySelectorAll('.atlas-tab');
  const searchInput = document.getElementById('atlas-search-input');
  const ciprosData = (typeof CIPROS_DATA !== 'undefined' ? CIPROS_DATA : (typeof window !== 'undefined' ? window.CIPROS_DATA : null));

  if (!container || !ciprosData || !ciprosData.anatomia) return;

  const data = ciprosData.anatomia;
  let currentRegionId = 'membros-inferiores';

  function renderRegion(item) {
    container.innerHTML = `
      <!-- Cabeçalho em destaque da região -->
      <div class="atlas-region-hero">
        <div class="atlas-region-text">
          <span class="atlas-region-tag">${item.tag}</span>
          <h3 class="atlas-region-title">
            <i class="fa-solid ${item.icone}"></i> ${item.regiao}
          </h3>
          <p class="atlas-region-summary">${item.resumo}</p>
        </div>
        <div class="atlas-region-media">
          <img src="${item.imagem}" alt="${item.regiao}" class="atlas-thumb-img" onerror="this.src='assets/slider/slider_joelho.png'">
        </div>
      </div>

      <!-- Grade dos 4 Pilares Anatômicos -->
      <div class="atlas-pillars-grid">
        <!-- 1. OSSOS -->
        <div class="atlas-pillar-box box-ossos">
          <div class="atlas-pillar-box-header">
            <i class="fa-solid fa-bone"></i>
            <span>Estrutura Óssea (${item.ossos.length})</span>
          </div>
          <ul class="atlas-items-list">
            ${item.ossos.map(o => `<li><i class="fa-solid fa-check"></i> <span>${o}</span></li>`).join('')}
          </ul>
        </div>

        <!-- 2. ARTICULAÇÕES -->
        <div class="atlas-pillar-box box-articulacoes">
          <div class="atlas-pillar-box-header">
            <i class="fa-solid fa-arrows-spin"></i>
            <span>Articulações &amp; Biomecânica (${item.articulacoes.length})</span>
          </div>
          <ul class="atlas-items-list">
            ${item.articulacoes.map(a => `<li><i class="fa-solid fa-circle-dot"></i> <span>${a}</span></li>`).join('')}
          </ul>
          ${item.ligamentos && item.ligamentos.length ? `
            <div class="atlas-tags-wrapper">
              <span class="atlas-tags-label">Ligamentos &amp; Estabilizadores:</span>
              <div class="atlas-tags-cloud">
                ${item.ligamentos.map(l => `<span class="atlas-tag-item">${l}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- 3. MÚSCULOS -->
        <div class="atlas-pillar-box box-musculos">
          <div class="atlas-pillar-box-header">
            <i class="fa-solid fa-bolt"></i>
            <span>Músculos &amp; Tendões (${item.musculos.length})</span>
          </div>
          <ul class="atlas-items-list">
            ${item.musculos.map(m => `<li><i class="fa-solid fa-caret-right"></i> <span>${m}</span></li>`).join('')}
          </ul>
        </div>

        <!-- 4. ATUAÇÃO FISIOTERAPÊUTICA CIPROS -->
        <div class="atlas-pillar-box box-fisioterapia">
          <div class="atlas-pillar-box-header">
            <i class="fa-solid fa-hospital-user"></i>
            <span>Atuação Fisioterapêutica CIPROS</span>
          </div>
          <ul class="atlas-items-list">
            ${item.fisioterapia.map(f => `<li><i class="fa-solid fa-circle-check"></i> <span>${f}</span></li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  function renderSearch(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      const active = data.find(d => d.id === currentRegionId) || data[0];
      renderRegion(active);
      return;
    }

    const matches = data.filter(item => {
      const name = item.regiao.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q);
      const ossos = item.ossos.some(o => o.toLowerCase().includes(q));
      const art = item.articulacoes.some(a => a.toLowerCase().includes(q));
      const musc = item.musculos.some(m => m.toLowerCase().includes(q));
      const fisio = item.fisioterapia.some(f => f.toLowerCase().includes(q));
      const lig = item.ligamentos && item.ligamentos.some(l => l.toLowerCase().includes(q));
      return name || ossos || art || musc || fisio || lig;
    });

    if (matches.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; background: #ffffff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 32px; color: #94a3b8; margin-bottom: 12px;"></i>
          <h4 style="font-size: 16px; color: #1e293b; margin-bottom: 6px;">Nenhum termo anatômico encontrado para "${query}"</h4>
          <p style="font-size: 13.5px; color: #64748b;">Tente buscar por termos como <strong>menisco</strong>, <strong>LCA</strong>, <strong>fêmur</strong>, <strong>ATM</strong>, <strong>manguito rotador</strong> ou <strong>hérnia de disco</strong>.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div style="background: #e0effe; color: #005ba9; padding: 12px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; margin-bottom: 16px;">
        <i class="fa-solid fa-filter"></i> Encontrado em <strong>${matches.length}</strong> região(ões) anatômica(s) para "<strong>${query}</strong>":
      </div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${matches.map(m => `
          <div style="display: flex; align-items: center; justify-content: space-between; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px 18px;">
            <div>
              <strong style="color: #1a3b6b; font-size: 15px;"><i class="fa-solid ${m.icone}" style="color: #0284c7; margin-right: 8px;"></i>${m.regiao}</strong>
              <div style="font-size: 12.5px; color: #64748b; margin-top: 2px;">${m.tag}</div>
            </div>
            <button class="atlas-tab btn-view-match" data-id="${m.id}" style="padding: 6px 16px; font-size: 12.5px;">
              Ver Mapeamento
            </button>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.btn-view-match').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        currentRegionId = id;
        tabs.forEach(t => {
          if (t.getAttribute('data-region') === id) t.classList.add('active');
          else t.classList.remove('active');
        });
        if (searchInput) searchInput.value = '';
        const selected = data.find(d => d.id === id);
        if (selected) renderRegion(selected);
      });
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentRegionId = tab.getAttribute('data-region');
      if (searchInput) searchInput.value = '';
      const selected = data.find(d => d.id === currentRegionId);
      if (selected) renderRegion(selected);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderSearch(e.target.value);
    });
  }

  window.renderAtlasCards = function(regionId) {
    if (!regionId || regionId === 'todos') {
      const active = data.find(d => d.id === 'membros-inferiores') || data[0];
      renderRegion(active);
      return;
    }
    const selected = data.find(d => d.id === regionId);
    if (selected) {
      currentRegionId = regionId;
      renderRegion(selected);
    }
  };

  const initial = data.find(d => d.id === currentRegionId) || data[0];
  renderRegion(initial);
}

/* ========================================================
   5. Convênios Médicos & Busca
   ======================================================== */
function renderConvenios() {
  const container = document.getElementById('convenios-grid-container');
  const data = (typeof CIPROS_DATA !== 'undefined' ? CIPROS_DATA : window.CIPROS_DATA);
  if (!container || !data || !data.convenios) return;

  function display(items) {
    container.innerHTML = '';
    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 25px; color: #64748b; font-size: 14px;">
          Nenhum convênio encontrado com esse nome. Entre em contato conosco para verificar outros planos particulares ou facilidades de reembolso.
        </div>
      `;
      return;
    }
    items.forEach(c => {
      const card = document.createElement('div');
      card.className = 'convenio-card';
      card.title = c.nome;
      card.innerHTML = `<img src="${c.logo}" alt="${c.nome}" loading="lazy" onerror="this.style.display='none'">`;
      container.appendChild(card);
    });
  }

  display(data.convenios);
}

function initConveniosSearch() {
  const searchInput = document.getElementById('convenios-search-input');
  const container = document.getElementById('convenios-grid-container');
  const data = (typeof CIPROS_DATA !== 'undefined' ? CIPROS_DATA : window.CIPROS_DATA);

  if (!searchInput || !container || !data || !data.convenios) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = data.convenios.filter(c => c.nome.toLowerCase().includes(q) || (c.desc && c.desc.toLowerCase().includes(q)));
    
    container.innerHTML = '';
    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 35px 20px; color: #64748b; font-size: 14.5px; background: #ffffff; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 28px; color: #94a3b8; margin-bottom: 10px;"></i>
          <div>Nenhum convênio encontrado para "<strong>${e.target.value}</strong>".</div>
          <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">Consulte nossa recepção para confirmar cobertura ou opções de reembolso para seu plano.</div>
        </div>
      `;
      return;
    }
    filtered.forEach(c => {
      const card = document.createElement('div');
      card.className = 'convenio-card';
      card.title = c.nome;
      card.innerHTML = `<img src="${c.logo}" alt="${c.nome}" loading="lazy">`;
      container.appendChild(card);
    });
  });
}

/* ========================================================
   6. Perguntas Frequentes (FAQ Acordeão)
   ======================================================== */
function initFaqAccordion() {
  const container = document.getElementById('faq-accordion-container');
  const data = (typeof CIPROS_DATA !== 'undefined' ? CIPROS_DATA : window.CIPROS_DATA);
  if (!container || !data || !data.faq) return;

  container.innerHTML = '';
  data.faq.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = `faq-item ${index === 0 ? 'active' : ''}`;
    faqItem.innerHTML = `
      <button class="faq-question-btn" type="button" aria-expanded="${index === 0}">
        <span>${item.pergunta}</span>
        <span class="faq-icon-indicator"><i class="fa-solid fa-chevron-down"></i></span>
      </button>
      <div class="faq-answer-panel">
        <p class="faq-answer-text">${item.resposta}</p>
      </div>
    `;

    const btn = faqItem.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isOpen = faqItem.classList.contains('active');
      // Fecha os outros
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faqItem.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    container.appendChild(faqItem);
  });
}

/* ========================================================
   7. Formulário de Contato & Pré-Agendamento
   ======================================================== */
function initContactForm() {
  const form = document.getElementById('cipros-contact-form');
  const feedback = document.getElementById('form-feedback-alert');
  const telInput = document.getElementById('contato-telefone');

  if (!form) return;

  // Máscara dinâmica para Telefone / WhatsApp
  if (telInput) {
    telInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.substring(0, 11);

      if (v.length > 6) {
        if (v.length <= 10) {
          e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 6)}-${v.substring(6)}`;
        } else {
          e.target.value = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
        }
      } else if (v.length > 2) {
        e.target.value = `(${v.substring(0, 2)}) ${v.substring(2)}`;
      } else if (v.length > 0) {
        e.target.value = `(${v}`;
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('contato-nome').value.trim();
    const telefone = telInput ? telInput.value.trim() : '';
    const email = document.getElementById('contato-email').value.trim();
    const unidade = document.getElementById('contato-unidade').value;
    const mensagem = document.getElementById('contato-mensagem').value.trim();

    if (!nome) {
      showFeedback('Por favor, informe seu nome completo.', 'error');
      document.getElementById('contato-nome').focus();
      return;
    }

    if (!telefone || telefone.length < 14) {
      showFeedback('Por favor, informe um número de telefone com DDD.', 'error');
      if (telInput) telInput.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showFeedback('Por favor, informe um endereço de e-mail válido.', 'error');
      document.getElementById('contato-email').focus();
      return;
    }

    // Sucesso - feedback visual
    showFeedback(
      `Obrigado, ${nome}! Sua mensagem para a ${unidade} foi recebida com sucesso. Nossa equipe entrará em contato com você o mais breve possível para confirmar seu atendimento.`,
      'success'
    );

    // Opcional: abre o WhatsApp com a mensagem formatada
    const zapText = encodeURIComponent(
      `Olá! Meu nome é ${nome}. Gostaria de agendar uma avaliação na ${unidade}.\nTelefone: ${telefone}\nE-mail: ${email}\nMensagem: ${mensagem}`
    );
    const zapUrl = `https://api.whatsapp.com/send/?phone=555193674766&text=${zapText}`;

    // Adiciona botão direto para agilizar
    setTimeout(() => {
      const openZap = confirm('Deseja enviar também esses dados diretamente para o WhatsApp da CIPROS agora?');
      if (openZap) {
        window.open(zapUrl, '_blank');
      }
    }, 600);

    form.reset();
  });

  function showFeedback(text, type) {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.className = `form-feedback-alert ${type}`;
    feedback.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 9000);
    }
  }
}
