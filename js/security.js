/**
 * CIPROS - Módulo de Segurança Anti-Cópia, Anti-Clonagem e Proteção contra Ameaças
 * Proteção ativa contra:
 * - Clonagem por Iframe / Phishing (Anti-Clickjacking)
 * - Automações maliciosas e bots de extração (Headless Scrapers)
 * - Injeção e tabnabbing em links externos (rel="noopener noreferrer")
 * - Disparos automatizados e flood em formulários (Honeypot + Rate Limiting)
 */

(function () {
  'use strict';

  // 1. Proteção Anti-Clickjacking (Impede que o site seja clonado dentro de iframes maliciosos)
  function initFrameProtection() {
    try {
      if (window.self !== window.top) {
        // Se estiver dentro de iframe, quebra o iframe e redireciona para a janela principal
        window.top.location = window.self.location.href;
      }
    } catch (e) {
      // Bloqueio de cross-origin: força saída
      try {
        document.documentElement.style.display = 'none';
        window.top.location = window.self.location.href;
      } catch (err) {}
    }
  }

  // 2. Proteção Anti-Tabnabbing e Sanitização de Links Externos (Anti-Phishing)
  function sanitizeExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    const currentHost = window.location.hostname;

    links.forEach(link => {
      try {
        const url = new URL(link.href);
        if (url.hostname !== currentHost) {
          // Garante noopener noreferrer em links externos
          const currentRel = link.getAttribute('rel') || '';
          const relParts = new Set(currentRel.split(' ').filter(Boolean));
          relParts.add('noopener');
          relParts.add('noreferrer');
          link.setAttribute('rel', Array.from(relParts).join(' '));
        }
      } catch (e) {}
    });
  }

  // 3. Detecção de Automação e Headless Scrapers (Puppeteer, Selenium, Playwright)
  const BotDetector = {
    isAutomated: false,
    flags: [],

    check() {
      // Detecção de WebDriver
      if (navigator.webdriver) {
        this.isAutomated = true;
        this.flags.push('webdriver_active');
      }

      // Detecção de variáveis típicas de automação
      if (
        window._phantom ||
        window.__nightmare ||
        window.callPhantom ||
        window.__selenium_unwrapped ||
        document.$cdc_asdjflasutopfhvcZLmcfl_
      ) {
        this.isAutomated = true;
        this.flags.push('automation_vars_present');
      }

      // Detecção de plugins vazios suspeitos em desktop
      if (
        !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) &&
        navigator.plugins &&
        navigator.plugins.length === 0 &&
        !this.isAutomated
      ) {
        // Possível ambiente headless
        this.flags.push('zero_plugins_desktop');
      }

      return this.isAutomated;
    }
  };

  // 4. Rate Limiting de Ações e Formulários no Cliente (Anti-Flood / Anti-DDoS leve)
  const RateLimiter = {
    storageKey: 'cipros_action_burst',
    maxRequests: 6,
    windowMs: 60 * 1000, // 1 minuto

    canExecute(actionName) {
      const now = Date.now();
      let records = [];
      try {
        const stored = sessionStorage.getItem(`${this.storageKey}_${actionName}`);
        if (stored) records = JSON.parse(stored);
      } catch (e) {
        records = [];
      }

      // Filtra apenas registros da janela recente
      records = records.filter(ts => now - ts < this.windowMs);

      if (records.length >= this.maxRequests) {
        return false;
      }

      records.push(now);
      try {
        sessionStorage.setItem(`${this.storageKey}_${actionName}`, JSON.stringify(records));
      } catch (e) {}
      return true;
    }
  };

  // 5. Injeção de Campo Honeypot Invisível nos Formulários (Armadilha para Bots)
  function setupHoneypots() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      if (form.querySelector('.cipros-hp-field')) return;

      const hpInput = document.createElement('input');
      hpInput.type = 'text';
      hpInput.name = 'website_verify_hp';
      hpInput.id = 'website_verify_hp';
      hpInput.className = 'cipros-hp-field';
      hpInput.autocomplete = 'off';
      hpInput.tabIndex = -1;
      hpInput.setAttribute('aria-hidden', 'true');

      form.appendChild(hpInput);

      form.addEventListener('submit', function (e) {
        // Se o campo invisível estiver preenchido, é um bot automático!
        if (hpInput.value && hpInput.value.trim().length > 0) {
          e.preventDefault();
          e.stopPropagation();
          console.warn('[CIPROS Security] Tentativa automatizada de spam bloqueada via Honeypot.');
          return false;
        }

        // Verifica Rate Limiting
        if (!RateLimiter.canExecute('form_submit')) {
          e.preventDefault();
          e.stopPropagation();
          alert('Muitas tentativas consecutivas detectadas. Por favor, aguarde alguns instantes antes de enviar novamente.');
          return false;
        }
      }, true);
    });
  }

  // Inicialização
  function init() {
    initFrameProtection();
    sanitizeExternalLinks();
    setupHoneypots();
    BotDetector.check();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expor utilitários de segurança globalmente
  window.CIPROS_SECURITY = {
    isAutomated: () => BotDetector.isAutomated,
    canExecute: (act) => RateLimiter.canExecute(act)
  };
})();
