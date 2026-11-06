/**
 * CIPROS - Agente de LGPD e Gestão de Privacidade (Lei Geral de Proteção de Dados - Lei 13.709/2018)
 * Gestão de consentimento de cookies, garantia de direitos dos titulares e transparência de dados de saúde.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'cipros_lgpd_consent';

  // Configuração padrão de preferências
  const defaultConsent = {
    essenciais: true,
    analiticos: false,
    marketing: false,
    dataConsentimento: null,
    versao: '1.0'
  };

  // Recupera consentimento salvo
  function getConsent() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  }

  // Salva consentimento
  function saveConsent(consent) {
    try {
      consent.dataConsentimento = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
      hideBanner();
      closeModals();
    } catch (e) {}
  }

  // Renderiza o Banner de Cookies no DOM
  function renderBanner() {
    if (document.getElementById('lgpd-consent-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'lgpd-consent-banner';
    banner.className = 'lgpd-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Aviso de Privacidade e Cookies');

    banner.innerHTML = `
      <div class="lgpd-banner-content">
        <div class="lgpd-banner-title">
          <i class="fa-solid fa-shield-halved"></i> Sua Privacidade &amp; Proteção de Dados
        </div>
        <p class="lgpd-banner-text">
          A CIPROS utiliza cookies e tecnologias essenciais para garantir o funcionamento seguro do site, além de tecnologias opcionais para aprimorar sua experiência, em total conformidade com a <strong>LGPD (Lei nº 13.709/2018)</strong>. Você pode escolher quais categorias autoriza.
          <a href="#" id="link-abrir-politica">Leia nossa Política de Privacidade</a>.
        </p>
      </div>
      <div class="lgpd-banner-actions">
        <button type="button" class="lgpd-btn lgpd-btn-accept" id="btn-lgpd-accept-all">
          Aceitar Todos
        </button>
        <button type="button" class="lgpd-btn lgpd-btn-essential" id="btn-lgpd-essential-only">
          Apenas Essenciais
        </button>
        <button type="button" class="lgpd-btn lgpd-btn-settings" id="btn-lgpd-open-preferences">
          Preferências
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    // Eventos
    document.getElementById('btn-lgpd-accept-all').addEventListener('click', () => {
      saveConsent({ essenciais: true, analiticos: true, marketing: true, versao: '1.0' });
    });

    document.getElementById('btn-lgpd-essential-only').addEventListener('click', () => {
      saveConsent({ essenciais: true, analiticos: false, marketing: false, versao: '1.0' });
    });

    document.getElementById('btn-lgpd-open-preferences').addEventListener('click', () => {
      openPreferencesModal();
    });

    document.getElementById('link-abrir-politica').addEventListener('click', (e) => {
      e.preventDefault();
      openPrivacyPolicyModal();
    });

    // Animação de entrada
    setTimeout(() => {
      banner.classList.add('active');
    }, 450);
  }

  function hideBanner() {
    const banner = document.getElementById('lgpd-consent-banner');
    if (banner) {
      banner.classList.remove('active');
    }
  }

  // Renderiza o Modal de Preferências de Cookies
  function renderPreferencesModal() {
    if (document.getElementById('lgpd-preferences-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'lgpd-preferences-modal';
    modal.className = 'lgpd-modal-overlay';
    modal.innerHTML = `
      <div class="lgpd-modal-box">
        <div class="lgpd-modal-header">
          <h3><i class="fa-solid fa-sliders"></i> Gerenciar Preferências de Cookies</h3>
          <button type="button" class="lgpd-modal-close" id="btn-close-pref-modal" aria-label="Fechar">&times;</button>
        </div>
        <div class="lgpd-modal-body">
          <p>
            Personalize quais cookies e tecnologias você autoriza a CIPROS utilizar durante sua navegação. Os cookies essenciais não podem ser desativados por serem indispensáveis ao funcionamento seguro da página.
          </p>

          <!-- 1. Essenciais -->
          <div class="cookie-category-card">
            <div class="cookie-card-header">
              <span class="cookie-card-title">
                <i class="fa-solid fa-lock" style="color: #0284c7;"></i> Cookies Estritamente Necessários
              </span>
              <span class="cookie-status-badge">Sempre Ativos</span>
            </div>
            <p class="cookie-card-desc">
              Imprescindíveis para navegação, segurança contra fraudes, carregamento do Atlas Anatômico e preservação de preferências básicas.
            </p>
          </div>

          <!-- 2. Analíticos -->
          <div class="cookie-category-card">
            <div class="cookie-card-header">
              <span class="cookie-card-title">
                <i class="fa-solid fa-chart-line" style="color: #10b981;"></i> Cookies de Desempenho &amp; Estatística
              </span>
              <label class="cookie-toggle">
                <input type="checkbox" id="toggle-cookie-analytics">
                <span class="cookie-slider"></span>
              </label>
            </div>
            <p class="cookie-card-desc">
              Permitem analisar anonimamente o volume de acessos e páginas mais procuradas para melhorar os serviços da clínica.
            </p>
          </div>

          <!-- 3. Comunicação & Marketing -->
          <div class="cookie-category-card">
            <div class="cookie-card-header">
              <span class="cookie-card-title">
                <i class="fa-solid fa-bullhorn" style="color: #f59e0b;"></i> Cookies de Comunicação &amp; Integração
              </span>
              <label class="cookie-toggle">
                <input type="checkbox" id="toggle-cookie-marketing">
                <span class="cookie-slider"></span>
              </label>
            </div>
            <p class="cookie-card-desc">
              Facilitam a comunicação com canais integrados (como início rápido de conversa no WhatsApp oficial).
            </p>
          </div>
        </div>

        <div class="lgpd-modal-footer">
          <button type="button" class="lgpd-btn lgpd-btn-essential" id="btn-save-preferences">
            Salvar Minhas Escolhas
          </button>
          <button type="button" class="lgpd-btn lgpd-btn-accept" id="btn-accept-all-modal">
            Aceitar Todos
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Eventos do Modal
    document.getElementById('btn-close-pref-modal').addEventListener('click', closeModals);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModals();
    });

    document.getElementById('btn-save-preferences').addEventListener('click', () => {
      const analytics = document.getElementById('toggle-cookie-analytics').checked;
      const marketing = document.getElementById('toggle-cookie-marketing').checked;
      saveConsent({ essenciais: true, analiticos: analytics, marketing: marketing, versao: '1.0' });
    });

    document.getElementById('btn-accept-all-modal').addEventListener('click', () => {
      saveConsent({ essenciais: true, analiticos: true, marketing: true, versao: '1.0' });
    });
  }

  // Renderiza o Modal de Política de Privacidade Completa
  function renderPrivacyPolicyModal() {
    if (document.getElementById('lgpd-policy-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'lgpd-policy-modal';
    modal.className = 'lgpd-modal-overlay';
    modal.innerHTML = `
      <div class="lgpd-modal-box" style="max-width: 760px;">
        <div class="lgpd-modal-header">
          <h3><i class="fa-solid fa-file-shield"></i> Política de Privacidade &amp; Proteção de Dados (LGPD)</h3>
          <button type="button" class="lgpd-modal-close" id="btn-close-policy-modal" aria-label="Fechar">&times;</button>
        </div>
        <div class="lgpd-modal-body">
          <p><strong>Última atualização:</strong> Novembro de 2026</p>
          <p>
            A <strong>CIPROS Centro de Reabilitação Ltda.</strong> tem o compromisso inequívoco de resguardar a privacidade e proteger os dados pessoais de seus pacientes, colaboradores e visitantes, atuando em estrita observância à Lei Geral de Proteção de Dados Pessoais (Lei Federal nº 13.709/2018 - LGPD).
          </p>

          <h4>1. Quais dados coletamos e para qual finalidade?</h4>
          <p>
            Coletamos exclusivamente os dados estritamente necessários para viabilizar o seu agendamento de consultas e sessões de fisioterapia e fisiatria:
          </p>
          <ul>
            <li><strong>Nome completo:</strong> para identificação do paciente perante a clínica e os convênios.</li>
            <li><strong>Telefone / WhatsApp:</strong> para confirmação de horários, triagem clínica inicial e envio de orientações.</li>
            <li><strong>Unidade e Especialidade de interesse:</strong> para direcionamento ao fisioterapeuta ou fisiatra responsável.</li>
          </ul>

          <h4>2. Base Legal para o Tratamento de Dados (Arts. 7º e 11 da LGPD)</h4>
          <p>
            O tratamento de dados pessoais e de saúde na CIPROS fundamenta-se nas seguintes bases legais expressas na LGPD:
          </p>
          <ul>
            <li><strong>Art. 7º, inciso V:</strong> execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados.</li>
            <li><strong>Art. 11, inciso II, alínea 'f':</strong> tutela da saúde, exclusivamente em procedimento realizado por profissionais de saúde, serviços de saúde ou autoridade sanitária.</li>
          </ul>

          <h4>3. Seus Direitos como Titular (Art. 18 da LGPD)</h4>
          <p>
            Você, titular dos dados, pode exercer a qualquer momento perante a CIPROS os seus direitos legais de:
          </p>
          <ul>
            <li>Confirmação da existência de tratamento e acesso aos dados.</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
            <li>Revogação do consentimento a qualquer momento.</li>
          </ul>

          <h4>4. Segurança e Não Compartilhamento</h4>
          <p>
            A CIPROS <strong>não comercializa, não aluga e não repassa</strong> seus dados pessoais a terceiros para fins publicitários. Os dados são utilizados unicamente para a prestação dos serviços fisioterapêuticos e contato direto com você.
          </p>

          <h4>5. Canal de Atendimento do Encarregado (DPO)</h4>
          <p>
            Para exercer qualquer um dos seus direitos ou esclarecer dúvidas sobre o tratamento de seus dados, entre em contato diretamente com nossa equipe de privacidade:
          </p>
          <ul>
            <li><strong>E-mail:</strong> cipros@cipros.com.br</li>
            <li><strong>WhatsApp / Telefone:</strong> (51) 99367-4766</li>
            <li><strong>Endereço Sede:</strong> Av. Bento Gonçalves, 502 - Santana, Porto Alegre - RS</li>
          </ul>
        </div>

        <div class="lgpd-modal-footer">
          <button type="button" class="lgpd-btn lgpd-btn-accept" id="btn-ok-policy">
            Entendi e Estou Ciente
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('btn-close-policy-modal').addEventListener('click', closeModals);
    document.getElementById('btn-ok-policy').addEventListener('click', closeModals);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModals();
    });
  }

  function openPreferencesModal() {
    renderPreferencesModal();
    const modal = document.getElementById('lgpd-preferences-modal');
    if (!modal) return;

    // Sincroniza toggles com consentimento atual
    const current = getConsent() || defaultConsent;
    const tAnalytics = document.getElementById('toggle-cookie-analytics');
    const tMarketing = document.getElementById('toggle-cookie-marketing');
    if (tAnalytics) tAnalytics.checked = !!current.analiticos;
    if (tMarketing) tMarketing.checked = !!current.marketing;

    modal.classList.add('active');
  }

  function openPrivacyPolicyModal() {
    renderPrivacyPolicyModal();
    const modal = document.getElementById('lgpd-policy-modal');
    if (modal) modal.classList.add('active');
  }

  function closeModals() {
    document.querySelectorAll('.lgpd-modal-overlay').forEach(m => m.classList.remove('active'));
  }

  // Inicialização
  function init() {
    const consent = getConsent();
    if (!consent) {
      renderBanner();
    }

    // Configura botões e links do rodapé
    const footerPolicyLink = document.getElementById('footer-link-lgpd-policy');
    const footerCookiesLink = document.getElementById('footer-link-lgpd-cookies');

    if (footerPolicyLink) {
      footerPolicyLink.addEventListener('click', (e) => {
        e.preventDefault();
        openPrivacyPolicyModal();
      });
    }

    if (footerCookiesLink) {
      footerCookiesLink.addEventListener('click', (e) => {
        e.preventDefault();
        openPreferencesModal();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expor API global do Agente de LGPD
  window.CIPROS_LGPD = {
    getConsent: getConsent,
    openPreferences: openPreferencesModal,
    openPrivacyPolicy: openPrivacyPolicyModal
  };
})();
