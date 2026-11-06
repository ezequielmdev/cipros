/**
 * CIPROS Fisioterapia e Fisiatria - Dados, Configurações e Conteúdo
 * Identidade visual inspirada na MedFisio (Fisio para Todos) com toda a excelência da CIPROS
 */

const CIPROS_DATA = {
  // Informações de Contato e Unidades
  info: {
    nome: 'CIPROS - Fisioterapia e Fisiatria',
    slogan: 'Reabilitação física de excelência ao seu alcance',
    email: 'cipros@cipros.com.br',
    horario: 'Segunda à Sexta-feira: 07h50 às 19h10',
    whatsappGeral: '555193674766',
    whatsappLink: 'https://api.whatsapp.com/send/?phone=555193674766&text=Ol%C3%A1,+gostaria+de+agendar+uma+consulta!',
    telefoneCelular: '(51) 99367-4766',
    instagram: '@cipros_fisioterapia',
    instagramUrl: 'https://www.instagram.com/cipros_fisioterapia/',
    facebookUrl: 'https://www.facebook.com/ciproscentrodereabilitacao',
    unidadePoa: {
      nome: 'Unidade Porto Alegre',
      bairro: 'Santana / Partenon',
      enderecoCurto: 'Av. Bento Gonçalves, 502 - Santana / Partenon - Porto Alegre/RS',
      enderecoCompleto: 'Av. Bento Gonçalves, 502 - Santana, Porto Alegre - RS, 90650-000, Brasil',
      fones: ['(51) 3072-6262', '(51) 3062-7472'],
      celular: '(51) 99367-4766',
      whatsapp: '555193674766',
      whatsappFormatted: '(51) 99367-4766',
      mapsUrl: 'https://www.google.com/maps?cid=12151048254095500957',
      mapImage: 'assets/images/map_poa.png',
      fachadaImage: 'assets/unidades/unidade_porto_alegre_fachada.jpg'
    },
    unidadeSaoLeo: {
      nome: 'Unidade São Leopoldo',
      bairro: 'Centro',
      enderecoCurto: 'Rua Marquês do Herval, 553 - Centro - São Leopoldo/RS',
      enderecoCompleto: 'R. Marquês do Herval, 553 - Centro, São Leopoldo - RS, 93010-200, Brasil',
      fones: ['(51) 3037-4239'],
      celular: '(51) 99367-4766',
      whatsapp: '555193674766',
      whatsappFormatted: '(51) 99367-4766',
      mapsUrl: 'https://www.google.com/maps?cid=11821898919047276012',
      mapImage: 'assets/images/map_saoleo.png',
      fachadaImage: 'assets/unidades/unidade_sao_leopoldo_fachada.jpg'
    }
  },

  // 12 Especialidades e Tratamentos Detalhados
  servicos: [
    {
      id: 'fisioterapia-ortopedica',
      categoria: 'ortopedia',
      titulo: 'Fisioterapia Traumato-Ortopédica',
      tag: 'Reabilitação Musculoesquelética',
      icone: 'fa-crutch',
      descricao: 'Especialidade central dedicada ao tratamento de lesões em ossos, ligamentos, tendões e articulações. Abrange reabilitação de entorses, fraturas, tendinopatias, desgastes articulares (artrose) e cuidados pré e pós-operatórios (como reconstrução de LCA, meniscos e próteses articulares).'
    },
    {
      id: 'coluna-rpg',
      categoria: 'ortopedia',
      titulo: 'Coluna Vertebral & RPG',
      tag: 'Reeducação Postural Global',
      icone: 'fa-child-reaching',
      descricao: 'Abordagem especializada para o tratamento e manejo de dores na coluna, hérnias discais, lombalgias, ciatalgias e desvios posturais (escoliose, hipercifose). A RPG atua no alongamento das cadeias musculares retraídas e no fortalecimento dos músculos posturais profundos.'
    },
    {
      id: 'fisiatria-medica',
      categoria: 'fisiatria',
      titulo: 'Consulta Médica em Fisiatria',
      tag: 'Medicina Física & Reabilitação',
      icone: 'fa-user-doctor',
      descricao: 'Consulta médica especializada focada no diagnóstico funcional, manejo de dores crônicas incapacitantes, prescrição de planos terapêuticos de reabilitação e acompanhamento da evolução motora para a máxima autonomia do paciente.'
    },
    {
      id: 'fisioterapia-esportiva',
      categoria: 'esporte',
      titulo: 'Fisioterapia Esportiva & Cinemática',
      tag: 'Prevenção & Rendimento',
      icone: 'fa-person-running',
      descricao: 'Voltada para atletas amadores e profissionais. Foco na recuperação de lesões musculares e articulares, prevenção de recidivas, análise biomecânica do gesto esportivo e treino sensório-motor para retorno seguro e gradual às atividades esportivas.'
    },
    {
      id: 'pilates-clinico',
      categoria: 'esporte',
      titulo: 'Pilates Clínico & Reabilitativo',
      tag: 'Fortalecimento de Core & Postura',
      icone: 'fa-person-walking',
      descricao: 'Método guiado individualmente por fisioterapeutas em estúdios equipados. Fortalece a musculatura profunda do abdômen e coluna (Powerhouse), aprimora o equilíbrio, devolve flexibilidade e estabiliza articulações de forma suave e sem impacto.'
    },
    {
      id: 'atm-dor-orofacial',
      categoria: 'ortopedia',
      titulo: 'Disfunção da ATM & Cervical',
      tag: 'Bruxismo & Dores Orofaciais',
      icone: 'fa-brain',
      descricao: 'Tratamento específico para dores na mandíbula, estalidos ao abrir a boca, travamentos, cefaleias tensionais e bruxismo. Utiliza terapia manual intra e extra-oral, liberação dos músculos mastigatórios (masseter e temporal) e correção postural cervical.'
    },
    {
      id: 'quiropraxia-ajustes',
      categoria: 'terapias',
      titulo: 'Quiropraxia & Ajustes Articulares',
      tag: 'Alinhamento Mecânico & Alívio',
      icone: 'fa-hands-holding',
      descricao: 'Técnicas de manipulação articular precisa que restauram a amplitude normal das articulações da coluna vertebral e membros, aliviando pinçamentos nervosos, contraturas agudas e sobrecargas mecânicas corporais.'
    },
    {
      id: 'liberacao-miofascial',
      categoria: 'terapias',
      titulo: 'Liberação Miofascial & Terapia Manual',
      tag: 'Alívio de Pontos-Gatilho',
      icone: 'fa-hand-dots',
      descricao: 'Terapia manual especializada voltada à liberação de nódulos musculares dolorosos (trigger points) e redução de tensões profundas na fáscia muscular. Proporciona alívio da rigidez corporal, melhora a circulação local e favorece a mobilidade.'
    },
    {
      id: 'fisioterapia-neurologica',
      categoria: 'fisiatria',
      titulo: 'Fisioterapia Neurológica',
      tag: 'Reabilitação Neurofuncional',
      icone: 'fa-wheelchair',
      descricao: 'Reabilitação motora e sensorial para pacientes com sequelas de AVC (Acidente Vascular Cerebral), Doença de Parkinson, traumatismos cranianos, lesões medulares e neuropatias, promovendo neuroplasticidade e independência funcional.'
    },
    {
      id: 'fisioterapia-respiratoria',
      categoria: 'fisiatria',
      titulo: 'Fisioterapia Respiratória',
      tag: 'Reabilitação Pulmonar',
      icone: 'fa-lungs',
      descricao: 'Manobras respiratórias desobstrutivas, exercícios ventilatórios e fortalecimento dos músculos inspiratórios para pacientes com asma, bronquite, DPOC ou em recuperação pós-infecções pulmonares, restaurando a capacidade respiratória.'
    },
    {
      id: 'eletroterapia-tens-fes',
      categoria: 'terapias',
      titulo: 'Eletroterapia: Equipamentos TENS e FES (FENS)',
      tag: 'Recurso Eletrofísico Analgésico & Motor',
      icone: 'fa-bolt-lightning',
      imagem: 'assets/images/eletroterapia_tens_fes.jpg',
      descricao: 'Utilização de recursos eletrofísicos em TENS (Neuroestimulação Elétrica Transcutânea para auxílio no controle de dores crônicas, agudas e pós-operatórias) e FES/FENS (Estimulação Elétrica Funcional para fortalecimento muscular e recuperação neuromuscular).'
    },
    {
      id: 'palmilhas-posturais',
      categoria: 'ortopedia',
      titulo: 'Baropodometria & Palmilhas Funcionais',
      tag: 'Alinhamento de Pisada sob Medida',
      icone: 'fa-shoe-prints',
      descricao: 'Avaliação computadorizada das pressões plantares estáticas e dinâmicas na marcha. Confecção de palmilhas posturais personalizadas para alívio de fascite plantar, esporão de calcâneo, metatarsalgias e desvios de tornozelo e joelho.'
    }
  ],

  // Perguntas Frequentes (Inspirado no FAQ da MedFisio)
  faq: [
    {
      pergunta: 'É obrigatório apresentar encaminhamento médico para iniciar o tratamento?',
      resposta: 'De acordo com as resoluções vigentes do Conselho Federal de Fisioterapia e Terapia Ocupacional (COFFITO), o fisioterapeuta é um profissional de primeiro contato, capacitado para realizar a avaliação diagnóstica cinesiológico-funcional e prescrever o plano de tratamento fisioterapêutico. Caso você já possua encaminhamento, exames de imagem ou laudos médicos, eles são muito bem-vindos e integrados à sua avaliação.'
    },
    {
      pergunta: 'A clínica aceita convênios médicos?',
      resposta: 'Sim! Atendemos uma ampla rede de convênios médicos renomados (como Unimed Porto Alegre, Bradesco Saúde, SulAmérica, Amil, GEAP, CASSI, IPE, entre outros), além de oferecermos planos particulares acessíveis e facilidades para reembolso junto ao seu plano de saúde.'
    },
    {
      pergunta: 'A CIPROS possui médico fisiatra na equipe?',
      resposta: 'Sim! Contamos com acompanhamento integrado de Medicina Física e Reabilitação (Fisiatria), assegurando diagnóstico médico preciso, planejamento terapêutico integrado e suporte clínico de excelência em ambas as unidades.'
    },
    {
      pergunta: 'Como funciona a primeira consulta de avaliação?',
      resposta: 'A primeira sessão é dedicada a uma conversa aprofundada (anamnese) e a testes físicos, testes ortopédicos de mobilidade, força, postura e palpação. Com base nesses dados, o profissional explica as causas dos seus sintomas e define um programa de reabilitação personalizado com objetivos claros e metas de evolução.'
    },
    {
      pergunta: 'Quanto tempo dura cada sessão de fisioterapia?',
      resposta: 'As sessões têm duração média de 45 a 60 minutos, dependendo das necessidades específicas de cada paciente e das técnicas indicadas no dia (exercícios terapêuticos, terapia manual, recursos eletrofísicos, etc.).'
    },
    {
      pergunta: 'Onde ficam as unidades e qual é o horário de atendimento?',
      resposta: 'Possuímos duas unidades completas: em Porto Alegre (Av. Bento Gonçalves, 502 - Santana/Partenon) e em São Leopoldo (Rua Marquês do Herval, 553 - Centro). Ambas funcionam de segunda a sexta-feira, das 07h50 às 19h10, com fácil acesso e estacionamento facilitado.'
    }
  ],

  // Convênios Atendidos (Ordem exata da Imagem Oficial da Clínica)
  convenios: [
    { nome: 'Walmart (AMA)', logo: 'assets/convenios/convenio_walmart.png', desc: 'AMA' },
    { nome: 'Amil / Medial Saúde', logo: 'assets/convenios/convenio_amil_medial.png', desc: 'Medial Saúde' },
    { nome: 'ASSEFAZ', logo: 'assets/convenios/convenio_assefaz.png', desc: 'Fundação Assefaz' },
    { nome: 'CASSI', logo: 'assets/convenios/convenio_cassi.png', desc: 'Banco do Brasil' },
    { nome: 'AFMPA', logo: 'assets/convenios/convenio_afm.png', desc: 'Assoc. Funcionários Municipais Porto Alegre' },
    { nome: 'AFMLS', logo: 'assets/convenios/convenio_afmsl.png', desc: 'Assoc. Funcionários Municipais São Leopoldo' },
    { nome: 'Capesaúde', logo: 'assets/convenios/convenio_capesaude.png', desc: 'Caixa de Previdência e Assistência' },
    { nome: 'Bradesco Saúde', logo: 'assets/convenios/convenio_bradesco_saude.png', desc: 'Bradesco Seguros' },
    { nome: 'CORREIOS', logo: 'assets/convenios/convenio_correios.png', desc: 'Postal Saúde' },
    { nome: 'Centro Médico São Leopoldo', logo: 'assets/convenios/convenio_centro_medico_sl.png', desc: 'Centro Médico SL' },
    { nome: 'Fátima Saúde', logo: 'assets/convenios/convenio_fatima_saude.png', desc: 'Fátima Saúde' },
    { nome: 'FUSEX', logo: 'assets/convenios/convenio_fusex.png', desc: 'Exército Brasileiro' },
    { nome: 'GEAP Saúde', logo: 'assets/convenios/convenio_geap.png', desc: 'Fundação de Seguridade Social' },
    { nome: 'Golden Cross', logo: 'assets/convenios/convenio_golden_cross.png', desc: 'Golden Cross' },
    { nome: 'IBCM', logo: 'assets/convenios/convenio_ibcm.png', desc: 'Saúde e Assistência Social' },
    { nome: 'IPE Saúde', logo: 'assets/convenios/convenio_ipe.png', desc: 'Instituto de Previdência do Estado do RS' },
    { nome: 'PRONTOMED', logo: 'assets/convenios/convenio_prontomed.png', desc: 'Saúde, nosso jeito de comemorar a vida' },
    { nome: 'SAS', logo: 'assets/convenios/convenio_sas.png', desc: 'A saúde em primeiro plano' },
    { nome: 'SAÚDE PAS', logo: 'assets/convenios/convenio_saude_pas.png', desc: 'Medicina & Odonto' },
    { nome: 'Social Saúde', logo: 'assets/convenios/convenio_social_saude.png', desc: 'Social Saúde' },
    { nome: 'SulAmérica', logo: 'assets/convenios/convenio_sulamerica.png', desc: 'Planos de Saúde' },
    { nome: 'Unimed Porto Alegre', logo: 'assets/convenios/convenio_unimed_poa.png', desc: 'Dr. Sergio Ferreira FISIATRA - CRM 14564' },
    { nome: 'UGAPOCI / AGAPOI', logo: 'assets/convenios/convenio_agapoi.png', desc: 'Polícia Civil Porto Alegre' }
  ],

  // Atlas Anatômico e Biomecânica Clínica 3D
  anatomia: [
    {
      id: 'membros-inferiores',
      regiao: 'Membros Inferiores (Quadril, Joelho, Tornozelo e Pé)',
      tag: 'Locomoção, Absorção de Cargas, LCA & Meniscos',
      icone: 'fa-person-walking',
      imagem: 'assets/slider/slider_joelho.png',
      resumo: 'O complexo locomotor do corpo humano, projetado para suportar até 4 vezes o peso corpóreo em atividades dinâmicas, absorver impactos e garantir propulsão na marcha e corrida.',
      ossos: [
        'Cintura Pélvica: Acetábulo ósseo esférico com lábio acetabular cartilaginoso',
        'Coxa: Fêmur (o maior e mais resistente osso do corpo: Cabeça, Colo femoral a 125°, Trocanteres e Côndilos)',
        'Joelho: Patela (osso sesamoide que amplifica o braço de força do quadríceps em até 30%)',
        'Perna: Tíbia (platô tibial de sustentação de carga e maléolo medial) e Fíbula (estabilidade lateral da pinça maleolar)',
        'Tornozelo e Tarso (7 ossos): Tálus (tróclea articular), Calcâneo (tuberosidade do calcanhar), Navicular, Cuboide e 3 Cuneiformes',
        'Pé: 5 Metatarsos e 14 Falanges podais organizados em arcos plantares longitudinais e transversais'
      ],
      articulacoes: [
        'Articulação Coxofemoral (Quadril): esferoide profunda de encaixe perfeito entre a cabeça do fêmur e a cavidade acetabular.',
        'Articulação Femorotibial do Joelho: bicondilar móvel amortecida por meniscos em cunha medial e lateral.',
        'Articulação Femoropatelar: trocoide para deslizamento guiado da patela na tróclea femoral.',
        'Articulação Talocrural (Tornozelo): gínglimo em encaixe mortise para movimentos de flexão dorsal e plantar.',
        'Articulação Subtalar: responsável pela pronação, supinação, inversão e eversão dinâmica do calcanhar.'
      ],
      musculos: [
        'Glúteo Máximo, Médio e Mínimo (extensão potente e estabilização pélvica unipodal no apoio da marcha)',
        'Quadríceps Femoral: Reto Femoral, Vasto Lateral, Vasto Medial (VMO) e Vasto Intermédio',
        'Isquiotibiais Posteriores: Bíceps Femoral, Semitendíneo e Semimembranoso (freio excêntrico da corrida)',
        'Grupo Adutor da Coxa: Adutor Longo, Curto, Magno, Pectíneo e Músculo Grácil',
        'Tríceps Sural (Panturrilha): Gastrocnêmio Medial, Lateral e Músculo Sóleo inseridos no robusto Tendão de Aquiles',
        'Compartimento Anterior da Perna: Tibial Anterior (dorsiflexão e sustentação do arco plantar) e Fibulares'
      ],
      ligamentos: [
        'Ligamento Cruzado Anterior (LCA) e Posterior (LCP)',
        'Ligamentos Colaterais Medial (LCM) e Lateral (LCL)',
        'Menisco Medial (formato em C) e Menisco Lateral (formato em O)',
        'Ligamento Talofibular Anterior (LTFA) e Calcaneofibular (LCF) no tornozelo',
        'Fáscia Plantar aponeurótica espessa e Tendão Calcâneo de Aquiles'
      ],
      fisioterapia: [
        'Reabilitação Pós-Operatória de LCA, Meniscos e Suturas com retorno seguro ao esporte.',
        'Condromalácia Patelar e Dor Anterior no Joelho com reequilíbrio de vasto medial e quadríceps.',
        'Artrose de Joelho (Gonartrose) e Quadril (Coxartrose) e Reabilitação de Próteses Totais.',
        'Tendinopatia de Aquiles e Patelar ("Joelho de Saltador") com carga excêntrica controlada.',
        'Fascite Plantar e Esporão de Calcâneo com ondas de choque e adequação de palmilhas posturais.'
      ]
    },
    {
      id: 'tronco-coluna',
      regiao: 'Tronco, Tórax & Coluna Vertebral',
      tag: 'Eixo Central, Coluna Torácica, Lombar & Core',
      icone: 'fa-lungs',
      imagem: 'assets/slider/slider_coluna.png',
      resumo: 'O pilar axial do esqueleto humano, protegendo a medula espinhal, transmitindo forças mecânicas entre membros superiores e inferiores e viabilizando a mecânica respiratória.',
      ossos: [
        'Coluna Torácica: 12 Vértebras Torácicas (T1 a T12) com curvatura em cifose fisiológica',
        'Coluna Lombar: 5 Vértebras Lombares volumosas (L1 a L5) com curvatura em lordose fisiológica de absorção',
        'Caixa Torácica: 12 pares de Costelas (7 Verdadeiras, 3 Falsas e 2 Flutuantes 11ª e 12ª)',
        'Esterno: Manúbrio esternal, Corpo do esterno e Processo Xifoide cartilaginoso',
        'Cintura Pélvica Posterior: Osso Sacro (5 vértebras fundidas), Cóccix e Ossos Ilíacos pares'
      ],
      articulacoes: [
        'Discos Intervertebrais Toracolombares: anel fibroso concêntrico de colágeno e núcleo pulposo hidratado amortecedor.',
        'Articulações Zigapofisárias (Facetárias): guiam os movimentos de flexão, extensão e inclinação vertebral.',
        'Articulações Costovertebrais e Costotransversárias: permitem a expansão torácica na inspiração pulmonar.',
        'Articulações Sacroilíacas: anfiartroses com movimentos de nutação e contranutação pélvica.',
        'Sínfise Púbica anterior unindo os ossos da bacia.'
      ],
      musculos: [
        'Eretores da Espinha: Músculos Iliocostal, Longuíssimo e Espinhal do Tórax (sustentação ereta)',
        'Sistema Estabilizador Profundo: Músculos Multífidos segmentares, Rotadores e Interespinhosos',
        'Músculos do Core Abdominal: Transverso do Abdômen (cinta biomecânica natural), Reto e Oblíquos',
        'Músculos do Dorso: Grande Dorsal, Romboides Maior e Menor, Trapézio e Serrátil Anterior',
        'Músculo Diafragma Torácico (motor primário da respiração) e Músculo Quadrado Lombar'
      ],
      ligamentos: [
        'Ligamento Longitudinal Anterior (LLA) e Longitudinal Posterior (LLP)',
        'Ligamento Amarelo (rico em fibras elásticas), Supraespinhal e Interespinhal',
        'Ligamentos Sacroilíacos Anteriores, Posteriores e Interósseos de altíssima resistência'
      ],
      fisioterapia: [
        'Hérnia de Disco Lombar e Lombociatalgia com descompressão discal e método McKenzie.',
        'Escoliose, Hipercifose e Desvios com Reeducação Postural Global (RPG) e simetria muscular.',
        'Lombalgia Mecânica Crônica e Síndrome Facetária com fortalecimento do transverso e multífidos.',
        'Fisioterapia Respiratória e Reexpansão Pulmonar com cinesioterapia ventilatória.'
      ]
    },
    {
      id: 'membros-superiores',
      regiao: 'Membros Superiores (Ombro, Cotovelo, Punho e Mão)',
      tag: 'Cíngulo Escapular, Manguito Rotador & Destreza',
      icone: 'fa-hand',
      imagem: 'assets/slider/slider_ombro.png',
      resumo: 'O segmento corpóreo de maior amplitude e versatilidade cinemática, unindo a potência de alavanca do ombro à destreza micrométrica da mão humana.',
      ossos: [
        'Cíngulo Escapular: Clavícula e Escápula (acrômio, espinha, coracoide e cavidade glenoide)',
        'Braço: Úmero (cabeça umeral esférica, tubérculos maior/menor e côndilos distais)',
        'Antebraço: Rádio (lado do polegar) e Ulna (olécrano e processo coronoide no cotovelo)',
        'Carpo da Mão (8 ossos): Escafoide, Semilunar, Piramidal, Pisiforme, Trapézio, Trapezoide, Capitato e Hamato',
        'Metacarpos (5 ossos) e Falanges digitais (14 ossos)'
      ],
      articulacoes: [
        'Complexo do Ombro: Articulação Glenoumeral (esferoide triaxial com lábio glenoidal), Acromioclavicular e Esternoclavicular.',
        'Articulação Úmero-Ulnar e Úmero-Radial do Cotovelo (gínglimo para flexo-extensão).',
        'Articulações Radioulnares Proximal e Distal (trocoides para rotação de pronação e supinação).',
        'Articulação Radiocárpica do Punho (elipsoide condilar).',
        'Articulação Trapéziometacarpiana do Polegar (em sela, geradora da oponência da mão humana).'
      ],
      musculos: [
        'Manguito Rotador: Supraespinhal, Infraespinhal, Redondo Menor e Subescapular (centralizadores da cabeça do úmero)',
        'Deltoide (porções anterior, média e posterior) e Peitoral Maior',
        'Bíceps Braquial (cabeça longa e curta) e Tríceps Braquial (3 cabeças extensoras)',
        'Estabilizadores Escapulares: Músculo Serrátil Anterior, Trapézio e Romboides',
        'Musculatura Flexora e Extensora de Punho e Dedos e Músculos Intrínsecos da Mão'
      ],
      ligamentos: [
        'Ligamentos Glenoumerais e Ligamento Coracoacromial',
        'Ligamento Anular do Rádio no cotovelo',
        'Retináculo dos Músculos Flexores (teto fibroso do Túnel do Carpo)'
      ],
      fisioterapia: [
        'Síndrome do Impacto Subacromial e Bursite no Ombro com liberação do espaço acromial.',
        'Tendinopatia e Ruptura do Manguito Rotador com reeducação motora e fortalecimento excêntrico.',
        'Capsulite Adesiva ("Ombro Congelado") com mobilizações passivas de alta precisão.',
        'Epicondilite Lateral ("Cotovelo de Tenista") e Medial com ondas de choque e IASTM.',
        'Síndrome do Túnel do Carpo e Tendinite de De Quervain com neurodinâmica e órteses.'
      ]
    },
    {
      id: 'cabeca-pescoco',
      regiao: 'Cabeça, Lobos Cerebrais, Face & Coluna Cervical',
      tag: 'Lobos Frontal, Temporal, Parietal, Occipital, ATM & Cervical',
      icone: 'fa-brain',
      imagem: 'assets/slider/slider_cabeca.png',
      resumo: 'Abrange a neuroanatomia dos lobos cerebrais (Frontal, Temporal, Parietal e Occipital), a articulação temporomandibular (ATM), os ossos craniofaciais e a coluna cervical (C1 a C7) com sua rede muscular suboccipital e postural.',
      ossos: [
        'Lobos Encefálicos: Frontal (motor/marcha), Temporal (audição/equilíbrio), Parietal (propriocepção) e Occipital (visão)',
        'Crânio Neural: Frontal, Parietais, Temporais, Occipital e Esfenoide',
        'Face: Mandíbula (corpo, ramos e côndilos articulares), Maxila, Zigomático e Nasal',
        'Coluna Cervical Alta: C1 (Atlas - vértebra anelar) e C2 (Áxis - com processo odontoide pivô)',
        'Coluna Cervical Baixa: C3 a C7 com forames transversários para as artérias vertebrais',
        'Osso Hioide flutuante de sustentação da língua e laringe'
      ],
      articulacoes: [
        'Articulação Temporomandibular (ATM): bicondilar sinovial com disco fibrocartilaginoso para mastigação e fala.',
        'Articulação Atlanto-Occipital (C0-C1): elipsoide condilar para movimento de flexão/extensão ("sim").',
        'Articulação Atlanto-Axial (C1-C2): pivô trocoide responsável por 50% de toda a rotação cefálica ("não").',
        'Articulações Zigapofisárias Cervicais e Articulações Uncovertebrais de Luschka (C3-C7).'
      ],
      musculos: [
        'Músculos da Mastigação: Masseter potente, Temporal e Pterigóideos Medial e Lateral',
        'Esternocleidomastóideo (ECM) e Músculos Escalenos Anterior, Médio e Posterior',
        'Músculos Posteriores da Nuca: Trapézio Superior, Esplênio e Semiespinhal da Cabeça',
        'Músculos Suboccipitais Profundos (propriocepção da cabeça e reflexo óculo-motor)',
        'Músculos Pré-Vertebrais Profundos: Longo da Cabeça e Longo do Pescoço'
      ],
      ligamentos: [
        'Ligamento Nucal espesso e Ligamento Amarelo cervical',
        'Ligamentos Alares e Transverso do Atlas (estabilidade crânio-cervical vital)',
        'Ligamentos da ATM: Lateral Temporomandibular e Esfenomandibular'
      ],
      fisioterapia: [
        'Disfunção da ATM (DTM): dores faciais, estalidos e bruxismo com terapia manual e dry needling.',
        'Cervicalgia Aguda e Crônica com tração articular suave e estabilização cervical profunda.',
        'Cefaleias Tensionais e Cervicogênicas com liberação de pontos-gatilho suboccipitais.',
        'Hérnias Discais Cervicais e Cervicobraquialgia com descompressão e mobilização neural.'
      ]
    }
  ]
};

// Exposição explícita no escopo global
if (typeof window !== 'undefined') {
  window.CIPROS_DATA = CIPROS_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CIPROS_DATA;
}
