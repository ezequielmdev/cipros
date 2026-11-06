/**
 * CIPROS 3D Anatomical Atlas - Multi-Angle Interactive Edition
 * Visualizador anatômico de alta definição médica com rotação 360° (Frente e Costas / Outro Lado),
 * visualização dos lobos cerebrais (Frontal, Temporal, Parietal, Occipital),
 * zoom interativo, dissecação por camadas e prontuário biomecânico clínico.
 */

(function () {
  'use strict';

  // Catálogo das 5 Regiões com Rotação 360° (Vista Anterior / Frente e Vista Posterior / Costas)
  const ANATOMICAL_REGIONS = {
    // 1. TRONCO & TÓRAX
    'tronco-coluna': {
      id: 'tronco-coluna',
      nome: 'Tronco, Tórax & Músculos Profundos',
      subtitulo: 'Dissecação muscular, arcos costais, vísceras e neurovascularização',
      icone: 'fa-lungs',
      vistas: {
        'frente': {
          nome: 'Vista Anterior (Frente)',
          imagem: 'assets/anatomia/anatomia_complete_tronco.jpg',
          hotspots: [
            { x: 34, y: 22, id: 'manguito-rotador', label: 'Músculo Deltoide & Ombro', sistema: 'muscular' },
            { x: 42, y: 28, id: 'core-paravertebrais', label: 'Músculos Peitorais & Parede Torácica', sistema: 'muscular' },
            { x: 29, y: 45, id: 'glenoumeral', label: 'Bíceps & Veias Braquiais', sistema: 'nervoso' },
            { x: 60, y: 28, id: 'caixa-toracica', label: 'Arcos Costais & Cartilagem', sistema: 'esqueleto' },
            { x: 46, y: 54, id: 'reto-abdominal', label: 'Reto Abdominal & Linha Alba', sistema: 'muscular' },
            { x: 58, y: 62, id: 'orgaos-viscerais', label: 'Vísceras & Alças Intestinais', sistema: 'articular' },
            { x: 44, y: 80, id: 'crista-iliaca', label: 'Crista Ilíaca Anterior & Pélvis', sistema: 'esqueleto' }
          ]
        },
        'costas': {
          nome: 'Vista Posterior (Costas / Outro Lado)',
          imagem: 'assets/anatomia/anatomia_complete_tronco_costas.jpg',
          hotspots: [
            { x: 34, y: 26, id: 'latissimo-dorso', label: 'Músculos Trapézio & Latíssimo do Dorso', sistema: 'muscular' },
            { x: 64, y: 32, id: 'escapula-dorsal', label: 'Escápula & Costelas Posteriores', sistema: 'esqueleto' },
            { x: 50, y: 48, id: 'core-paravertebrais', label: 'Músculos Paravertebrais Eretores', sistema: 'muscular' },
            { x: 58, y: 68, id: 'nervo-ciatico', label: 'Emergência dos Nervos Espinhais Lombares', sistema: 'nervoso' },
            { x: 50, y: 82, id: 'crista-iliaca', label: 'Crista Ilíaca & Articulação Sacroilíaca', sistema: 'esqueleto' }
          ]
        }
      }
    },

    // 2. JOELHO & ARTICULAÇÕES
    'membros-inferiores': {
      id: 'membros-inferiores',
      nome: 'Joelho, Articulações & LCA / LCP',
      subtitulo: 'Ligamentos cruzados (LCA e LCP), meniscos, cartilagem e fossa poplítea',
      icone: 'fa-person-walking',
      vistas: {
        'frente': {
          nome: 'Vista Anterior (Frente)',
          imagem: 'assets/anatomia/anatomia_complete_joelho.jpg',
          hotspots: [
            { x: 48, y: 46, id: 'lca', label: 'Ligamento Cruzado Anterior (LCA)', sistema: 'articular' },
            { x: 56, y: 54, id: 'meniscos', label: 'Menisco Medial e Lateral', sistema: 'articular' },
            { x: 46, y: 28, id: 'femur-cartilagem', label: 'Côndilos Femorais & Cartilagem', sistema: 'esqueleto' },
            { x: 42, y: 14, id: 'quadriceps', label: 'Músculo Quadríceps & Tendão Patelar', sistema: 'muscular' },
            { x: 48, y: 78, id: 'tibia-fibula', label: 'Platô Tibial & Inserção do Tendão', sistema: 'esqueleto' }
          ]
        },
        'costas': {
          nome: 'Vista Posterior (Costas / Outro Lado)',
          imagem: 'assets/anatomia/anatomia_complete_joelho_costas.jpg',
          hotspots: [
            { x: 50, y: 46, id: 'lcp', label: 'Ligamento Cruzado Posterior (LCP)', sistema: 'articular' },
            { x: 58, y: 55, id: 'meniscos-post', label: 'Cornos Posteriores dos Meniscos', sistema: 'articular' },
            { x: 45, y: 38, id: 'feixe-popliteo', label: 'Artéria, Veia e Nervo Tibial (Fossa Poplítea)', sistema: 'nervoso' },
            { x: 35, y: 22, id: 'isquiotibiais', label: 'Tendões dos Isquiotibiais (Posterior)', sistema: 'muscular' },
            { x: 52, y: 80, id: 'gastrocnemio-insercao', label: 'Cabeças do Músculo Gastrocnêmio', sistema: 'muscular' }
          ]
        }
      }
    },

    // 3. COLUNA VERTEBRAL & LOMBAR
    'coluna-vertebral': {
      id: 'coluna-vertebral',
      nome: 'Coluna Vertebral, Discos & Nervo Ciático',
      subtitulo: 'Vértebras lombares, discos L4-L5/L5-S1, facetas articulares e nervo ciático',
      icone: 'fa-bone',
      vistas: {
        'frente': {
          nome: 'Vista Lateral-Oblíqua (Discos & Ciático)',
          imagem: 'assets/anatomia/anatomia_complete_coluna.jpg',
          hotspots: [
            { x: 48, y: 42, id: 'hernia-discal', label: 'Disco Intervertebral L4-L5 (Hérnia Discal)', sistema: 'articular' },
            { x: 62, y: 64, id: 'nervo-ciatico', label: 'Raízes do Nervo Isquiático (Ciático)', sistema: 'nervoso' },
            { x: 42, y: 26, id: 'vertebras-lombares', label: 'Corpos Vertebrais Lombares (L1-L5)', sistema: 'esqueleto' },
            { x: 28, y: 52, id: 'core-paravertebrais', label: 'Músculos Paravertebrais Eretores', sistema: 'muscular' }
          ]
        },
        'costas': {
          nome: 'Vista Posterior (Facetas & Processos Espinhosos)',
          imagem: 'assets/anatomia/anatomia_complete_coluna_costas.jpg',
          hotspots: [
            { x: 48, y: 38, id: 'facetas-coluna', label: 'Processos Espinhosos & Lâminas Vertebrais', sistema: 'esqueleto' },
            { x: 56, y: 52, id: 'articulacoes-facetarias', label: 'Articulações Facetárias (Zigoapofisárias)', sistema: 'articular' },
            { x: 62, y: 72, id: 'nervo-ciatico', label: 'Feixe Sacral do Nervo Ciático', sistema: 'nervoso' },
            { x: 34, y: 45, id: 'core-paravertebrais', label: 'Multífidos & Musculatura Profunda', sistema: 'muscular' }
          ]
        }
      }
    },

    // 4. OMBRO & MEMBROS SUPERIORES
    'membros-superiores': {
      id: 'membros-superiores',
      nome: 'Ombro & Manguito Rotador',
      subtitulo: 'Supraespinhal, infraespinhal, articulação glenoumeral e escápula',
      icone: 'fa-hand',
      vistas: {
        'frente': {
          nome: 'Vista Anterior (Frente)',
          imagem: 'assets/anatomia/anatomia_complete_ombro.jpg',
          hotspots: [
            { x: 46, y: 34, id: 'manguito-rotador', label: 'Tendão do Supraespinhal (Manguito)', sistema: 'muscular' },
            { x: 55, y: 46, id: 'glenoumeral', label: 'Cápsula e Lábio Glenoidal', sistema: 'articular' },
            { x: 68, y: 56, id: 'deltoide-biceps', label: 'Músculo Deltoide & Tendão Bicipital', sistema: 'muscular' },
            { x: 36, y: 22, id: 'medula-plexo', label: 'Plexo Braquial & Feixe Neurovascular', sistema: 'nervoso' }
          ]
        },
        'costas': {
          nome: 'Vista Posterior (Costas / Outro Lado)',
          imagem: 'assets/anatomia/anatomia_complete_ombro_costas.jpg',
          hotspots: [
            { x: 48, y: 44, id: 'infraespinhal', label: 'Músculo Infraespinhal & Redondo Menor', sistema: 'muscular' },
            { x: 44, y: 28, id: 'espinha-escapula', label: 'Espinha da Escápula & Acrômio', sistema: 'esqueleto' },
            { x: 72, y: 52, id: 'deltoide-posterior', label: 'Feixes Posteriores do Deltoide', sistema: 'muscular' },
            { x: 60, y: 65, id: 'nervos-circunflexos', label: 'Nervo Axilar & Artéria Circunflexa', sistema: 'nervoso' }
          ]
        }
      }
    },

    // 5. CABEÇA, ENCÉFALO (LOBOS) & ATM
    'cabeca-pescoco': {
      id: 'cabeca-pescoco',
      nome: 'Cabeça, Lobos Cerebrais & ATM',
      subtitulo: 'Lobos cerebrais (Frontal, Temporal, Parietal, Occipital), ATM e cervical',
      icone: 'fa-brain',
      vistas: {
        'frente': {
          nome: 'Vista Lateral com Lobos Cerebrais (Frontal, Temporal, etc.)',
          imagem: 'assets/anatomia/anatomia_complete_cabeca_lobos.jpg',
          hotspots: [
            { x: 34, y: 26, id: 'lobo-frontal', label: 'Lobo Frontal (Córtex Motor & Marcha)', sistema: 'nervoso' },
            { x: 50, y: 38, id: 'lobo-temporal', label: 'Lobo Temporal (Equilíbrio & Audição)', sistema: 'nervoso' },
            { x: 54, y: 22, id: 'lobo-parietal', label: 'Lobo Parietal (Propriocepção & Sensibilidade)', sistema: 'nervoso' },
            { x: 72, y: 36, id: 'lobo-occipital', label: 'Lobo Occipital (Córtex Visual & Postura)', sistema: 'nervoso' },
            { x: 68, y: 52, id: 'cerebelo-tronco', label: 'Cerebelo & Coordenação Motora Fina', sistema: 'nervoso' },
            { x: 46, y: 64, id: 'atm', label: 'Articulação Temporomandibular (ATM)', sistema: 'articular' },
            { x: 42, y: 76, id: 'masseter-mastigacao', label: 'Músculo Masseter (Mastigação & Bruxismo)', sistema: 'muscular' }
          ]
        },
        'costas': {
          nome: 'Vista Crânio-Cervical (Coluna & Occipital)',
          imagem: 'assets/anatomia/anatomia_complete_cabeca.jpg',
          hotspots: [
            { x: 58, y: 30, id: 'lobo-occipital', label: 'Osso Occipital & Linha Nucal', sistema: 'esqueleto' },
            { x: 48, y: 48, id: 'atm', label: 'ATM & Côndilo Mandibular', sistema: 'articular' },
            { x: 44, y: 60, id: 'masseter-mastigacao', label: 'Músculos Mastigatórios e Faciais', sistema: 'muscular' },
            { x: 53, y: 75, id: 'coluna-cervical', label: 'Coluna Cervical (C1 a C7) & Trapézio', sistema: 'esqueleto' }
          ]
        }
      }
    }
  };

  // Base de Dados Clínica Completa com os Lobos e Estruturas Posteriores
  const CLINICAL_DATABASE = {
    // Lobos Cerebrais solicitados pelo usuário
    'lobo-frontal': {
      id: 'lobo-frontal',
      regiao: 'cabeca-pescoco',
      sistema: 'nervoso',
      nome: 'Lobo Frontal (Córtex Motor & Controle de Marcha)',
      nomeLatim: 'Lobus frontalis',
      categoria: 'Sistema Nervoso Central • Encéfalo',
      icone: 'fa-brain',
      descricao: 'O maior dos quatro lobos do telencéfalo, contendo o Córtex Motor Primário (giro pré-central), responsável por enviar os comandos elétricos para todos os músculos esqueléticos voluntários do corpo.',
      biomecanica: 'Planeja e executa os padrões de movimento da marcha, corrida, alcance de braço e estabilização postural antecipatória antes que qualquer movimento aconteça.',
      patologias: 'Lesões vasculares (AVC), déficits de planejamento motor (apraxia), rigidez motora, perda de simetria do passo e fraquezas neuromotoras centrais.',
      tratamentoCipros: 'Reabilitação neurológica com FES/FENS para reeducação neuromuscular, treino de marcha com feedback visual no ginásio funcional e cinesioterapia proprioceptiva.'
    },
    'lobo-temporal': {
      id: 'lobo-temporal',
      regiao: 'cabeca-pescoco',
      sistema: 'nervoso',
      nome: 'Lobo Temporal (Equilíbrio Vestibular & Memória Motora)',
      nomeLatim: 'Lobus temporalis',
      categoria: 'Sistema Nervoso Central • Encéfalo',
      icone: 'fa-brain',
      descricao: 'Situado lateralmente no crânio, intimamente conectado ao sistema vestibular da orelha interna e adjacente à articulação temporomandibular (ATM).',
      biomecanica: 'Integra as sensações de equilíbrio vestibular com a propriocepção cervical, essencial para manter a cabeça nivelada na linha do horizonte durante o movimento.',
      patologias: 'Labirintopatias, vertigem posicional (VPPB), zumbidos associados à disfunção da ATM (DTM) e desequilíbrios posturais com tontura na marcha.',
      tratamentoCipros: 'Fisioterapia vestibular com manobras de reposicionamento, exercícios proprioceptivos em bases instáveis e alívio das tensões musculares cervicais e mastigatórias.'
    },
    'lobo-parietal': {
      id: 'lobo-parietal',
      regiao: 'cabeca-pescoco',
      sistema: 'nervoso',
      nome: 'Lobo Parietal (Córtex Somatossensorial & Mapa Corporal)',
      nomeLatim: 'Lobus parietalis',
      categoria: 'Sistema Nervoso Central • Encéfalo',
      icone: 'fa-brain',
      descricao: 'Abriga o Córtex Somatossensorial Primário (giro pós-central), onde o cérebro processa o mapa do próprio corpo (homúnculo de Penfield), registrando toque, pressão, temperatura e dor.',
      biomecanica: 'Informa ao sistema motor a posição exata de cada articulação no espaço em milissegundos (propriocepção consciente).',
      patologias: 'Dores crônicas com sensibilização central (onde o cérebro superinterpreta a dor mesmo após a cicatrização do tecido), síndrome da dor regional complexa e perda da percepção postural.',
      tratamentoCipros: 'Dessensibilização somatossensorial, terapia espelho, TENS em frequências moduladas para reprogramação neural da dor e treino de propriocepção.'
    },
    'lobo-occipital': {
      id: 'lobo-occipital',
      regiao: 'cabeca-pescoco',
      sistema: 'nervoso',
      nome: 'Lobo Occipital (Córtex Visual & Orientação Espacial)',
      nomeLatim: 'Lobus occipitalis',
      categoria: 'Sistema Nervoso Central • Encéfalo',
      icone: 'fa-eye',
      descricao: 'Localizado no polo posterior do crânio sobre o osso occipital, responsável por decodificar os estímulos visuais do ambiente.',
      biomecanica: 'A visão é o primeiro e mais rápido canal de estabilização do equilíbrio humano. Trabalha em sincronia com os músculos suboccipitais da coluna cervical alta.',
      patologias: 'Cefaleias cervicogênicas e occipitais (Nevralgia de Arnold), fadiga óculo-motora com sobrecarga cervical e desequilíbrios posturais visuais.',
      tratamentoCipros: 'Liberação miofascial suboccipital, agulhamento a seco nos pontos-gatilho cervicais, reeducação ergonômica de postura e alívio com calor úmido.'
    },
    'cerebelo-tronco': {
      id: 'cerebelo-tronco',
      regiao: 'cabeca-pescoco',
      sistema: 'nervoso',
      nome: 'Cerebelo & Tronco Encefálico',
      nomeLatim: 'Cerebellum & Truncus encephali',
      categoria: 'Sistema Nervoso • Coordenação Motora',
      icone: 'fa-network-wired',
      descricao: 'Centro de coordenação motora fina e regulação do tônus muscular, localizado na fossa craniana posterior.',
      biomecanica: 'Compara continuamente os comandos motores emitidos pelo córtex com a execução real dos membros, corrigindo desvios em tempo real.',
      patologias: 'Ataxias motoras, dismetria (erro no alcance de alvos), tremores cinéticos e perda de coordenação motora no caminhar.',
      tratamentoCipros: 'Protocolos de coordenação motora com pistas visuais e sonoras, treino funcional em circuito no ginásio da clínica e estabilização de marcha.'
    },

    // Estruturas do Joelho Posterior (Costas)
    'lcp': {
      id: 'lcp',
      regiao: 'membros-inferiores',
      sistema: 'articular',
      nome: 'Ligamento Cruzado Posterior (LCP)',
      nomeLatim: 'Ligamentum cruciatum posterius',
      categoria: 'Sistema Articular • Joelho Posterior',
      icone: 'fa-shield-halved',
      descricao: 'O ligamento mais forte do joelho, localizado na face dorsal interna da articulação, impedindo a translação posterior da tíbia sob o fêmur.',
      biomecanica: 'Age como pivô central primário na flexão do joelho, resistindo a forças de recuo tibial (impacto no painel do carro ou quedas sobre o joelho fletido).',
      patologias: 'Ruptura do LCP (trauma do painel ou hiperflexão), dor na fossa poplítea posterior, instabilidade articular ao descer escadas e risco de artrose secundária.',
      tratamentoCipros: 'Fortalecimento potente do quadríceps (agonista protetor do LCP) com FES/FENS, cinesioterapia resistida sem gaveta posterior e ganho de propriocepção.'
    },
    'meniscos-post': {
      id: 'meniscos-post',
      regiao: 'membros-inferiores',
      sistema: 'articular',
      nome: 'Cornos Posteriores dos Meniscos Medial e Lateral',
      nomeLatim: 'Cornu posterius menisci',
      categoria: 'Sistema Articular • Joelho',
      icone: 'fa-circle-notch',
      descricao: 'A porção posterior dos meniscos, onde ocorre a maior concentração de carga do peso corporal durante a flexão profunda do joelho.',
      biomecanica: 'Suportam forças de compressão axial severas em agachamentos e giros sobre a perna apoiada.',
      patologias: 'Lesões em alça de balde, roturas longitudinais e oblíquas do corno posterior gerando bloqueio mecânico do joelho e estalidos dolorosos.',
      tratamentoCipros: 'Descompressão articular com terapia manual, reabilitação em bicicleta ergométrica de baixo impacto e eletroterapia analgésica.'
    },
    'isquiotibiais': {
      id: 'isquiotibiais',
      regiao: 'membros-inferiores',
      sistema: 'muscular',
      nome: 'Tendões dos Músculos Isquiotibiais (Bíceps Femoral & Semitendíneo)',
      nomeLatim: 'Musculi ischiocrurales',
      categoria: 'Sistema Muscular • Posterior da Coxa',
      icone: 'fa-bolt',
      descricao: 'Músculos potentes que cruzam tanto o quadril quanto o joelho por trás, responsáveis pela flexão da perna e desaceleração excêntrica da corrida.',
      biomecanica: 'Atuam como "freio biológico" na fase terminal da passada para proteger o ligamento cruzado anterior.',
      patologias: 'Estiramentos e estiramentos musculares com dor aguda em pontada, tendinopatia semitendínea e encurtamentos posturais que tracionam a coluna lombar.',
      tratamentoCipros: 'Carga excêntrica progressiva no ginásio funcional, liberação miofascial profunda nos boxes privativos e reeducação da biomecânica da corrida.'
    },
    'feixe-popliteo': {
      id: 'feixe-popliteo',
      regiao: 'membros-inferiores',
      sistema: 'nervoso',
      nome: 'Feixe Neurovascular Poplíteo (Nervo Tibial & Vasos)',
      nomeLatim: 'Arteria, Vena poplitea & Nervus tibialis',
      categoria: 'Sistema Nervoso & Vascular • Joelho Posterior',
      icone: 'fa-network-wired',
      descricao: 'Complexo que transita na fossa poplítea por trás do joelho, conduzindo o fluxo sanguíneo arterial e o nervo tibial para a panturrilha e pé.',
      biomecanica: 'Desliza suavemente durante a flexão e extensão sob proteção da fáscia poplítea.',
      patologias: 'Cisto de Baker com compressão vascular posterior, sensação de peso e inchaço por trás do joelho ao caminhar.',
      tratamentoCipros: 'Drenagem terapêutica, alívio com recursos eletroterapêuticos e mobilização neurodinâmica do nervo tibial.'
    },

    // Estruturas do Tronco Posterior (Costas)
    'latissimo-dorso': {
      id: 'latissimo-dorso',
      regiao: 'tronco-coluna',
      sistema: 'muscular',
      nome: 'Músculos Latíssimo do Dorso & Trapézio',
      nomeLatim: 'Musculus latissimus dorsi & Trapezius',
      categoria: 'Sistema Muscular • Costas',
      icone: 'fa-dumbbell',
      descricao: 'Os maiores músculos das costas, cobrindo quase toda a região torácica e lombar posterior em formato de leque até a fáscia toracolombar.',
      biomecanica: 'Puxam os braços para trás e para baixo, conectam os membros superiores à pelve e estabilizam a postura ereta.',
      patologias: 'Contraturas musculares severas por esforço ou má postura sentada, dor dorsal em queimação e sobrecarga miofascial.',
      tratamentoCipros: 'Liberação miofascial profunda, agulhamento a seco em pontos-gatilho, calor úmido e fortalecimento funcional com polias no ginásio.'
    },
    'escapula-dorsal': {
      id: 'escapula-dorsal',
      regiao: 'tronco-coluna',
      sistema: 'esqueleto',
      nome: 'Escápula & Arcos Costais Dorsais',
      nomeLatim: 'Scapula & Costae dorsales',
      categoria: 'Sistema Esquelético • Dorso',
      icone: 'fa-bone',
      descricao: 'Osso triangular plano móvel que desliza sobre a grade costal posterior pela articulação escapulotorácica.',
      biomecanica: 'Para cada 2 graus de elevação do braço, a escápula gira 1 grau (ritmo escapuloumeral), essencial para não pinçar tendões.',
      patologias: 'Discinesia escapular ("asa de escápula"), bloqueios das articulações costovertebrais gerando pontadas ao respirar fundo.',
      tratamentoCipros: 'Terapia manual articular costovertebral, fortalecimento do serrátil anterior e romboides e reeducação escapular.'
    },

    // Estruturas do Ombro Posterior (Costas)
    'infraespinhal': {
      id: 'infraespinhal',
      regiao: 'membros-superiores',
      sistema: 'muscular',
      nome: 'Músculo Infraespinhal & Redondo Menor',
      nomeLatim: 'Musculus infraspinatus & Teres minor',
      categoria: 'Sistema Muscular • Ombro Posterior',
      icone: 'fa-hand',
      descricao: 'Componentes dorsais vitais do manguito rotador, preenchendo a fossa infraespinhal da escápula e inserindo no tubérculo maior do úmero.',
      biomecanica: 'Principais rotadores externos do braço e depressores dinâmicos da cabeça umeral, impedindo o impacto subacromial ao elevar o braço.',
      patologias: 'Tendinopatias com dor profunda posterior no ombro, fraqueza para abrir o braço ou pegar objetos no banco de trás do carro.',
      tratamentoCipros: 'Exercícios com elásticos e cargas excêntricas progressivas no ginásio, laserterapia nos boxes e desativação de pontos-gatilho.'
    },
    'espinha-escapula': {
      id: 'espinha-escapula',
      regiao: 'membros-superiores',
      sistema: 'esqueleto',
      nome: 'Espinha da Escápula & Acrômio',
      nomeLatim: 'Spina scapulae & Acromion',
      categoria: 'Sistema Esquelético • Ombro',
      icone: 'fa-bone',
      descricao: 'Proeminência óssea horizontal palpável nas costas do ombro que se projeta lateralmente formando o teto ósseo do acrômio.',
      biomecanica: 'Serve de ponto de ancoragem sólido para o músculo trapézio e deltoide.',
      patologias: 'Impacto subacromial por esporões ósseos acromiais, dor noturna ao dormir sobre o ombro e atrito tendíneo.',
      tratamentoCipros: 'Abertura do espaço subacromial com terapia manual Maitland, descompressão e fortalecimento escapular.'
    },

    // Estruturas da Coluna Posterior (Costas)
    'facetas-coluna': {
      id: 'facetas-coluna',
      regiao: 'coluna-vertebral',
      sistema: 'esqueleto',
      nome: 'Processos Espinhosos & Lâminas Vertebrais',
      nomeLatim: 'Processus spinosus & Lamina arcus vertebrae',
      categoria: 'Sistema Esquelético • Coluna Dorsal',
      icone: 'fa-bone',
      descricao: 'As proeminências ósseas palpáveis na linha média das costas que formam o teto protetor do canal vertebral.',
      biomecanica: 'Oferecem alavanca mecânica para os músculos eretores e ligamentos interespinhais limitarem a flexão excessiva do tronco.',
      patologias: 'Entesites interespinhais, sobrecarga mecânica postural e espondilolistese.',
      tratamentoCipros: 'Terapia manual articular, exercícios de flexibilização da cadeia posterior e reeducação postural RPG.'
    },
    'articulacoes-facetarias': {
      id: 'articulacoes-facetarias',
      regiao: 'coluna-vertebral',
      sistema: 'articular',
      nome: 'Articulações Facetárias Lombares (Zigapofisárias)',
      nomeLatim: 'Articulationes zygapophysiales',
      categoria: 'Sistema Articular • Coluna',
      icone: 'fa-arrows-spin',
      descricao: 'Pequenas articulações sinoviais pareadas atrás de cada vértebra que guiam e limitam os movimentos de rotação e inclinação da coluna.',
      biomecanica: 'Suportam até 30% da carga axial na extensão lombar (ficar em pé ereto ou dobrar o corpo para trás).',
      patologias: 'Síndrome facetária com dor lombar aguda que piora ao jogar o corpo para trás e melhora ao sentar curvado, artrose facetária.',
      tratamentoCipros: 'Mobilização articular oscilatória, termoterapia, TENS analgésico e fortalecimento específico do core para descompressão facetária.'
    },

    // Estruturas já existentes preservadas
    'lca': {
      id: 'lca',
      regiao: 'membros-inferiores',
      sistema: 'articular',
      nome: 'Ligamento Cruzado Anterior (LCA)',
      nomeLatim: 'Ligamentum cruciatum anterius',
      categoria: 'Sistema Articular • Joelho',
      icone: 'fa-arrows-split-up-and-left',
      descricao: 'Principal estabilizador estático do joelho contra a translação anterior da tíbia e restritor das rotações interna e externa sob carga.',
      biomecanica: 'Trabalha em sinergia protetora com os isquiotibiais e em oposição ao quadríceps em desacelerações bruscas, giros e aterrissagens de saltos.',
      patologias: 'Ruptura ligamentar por entorse em pivô com estalido audível, derrame articular agudo (hemartrose), sensação de falseio e instabilidade na marcha.',
      tratamentoCipros: 'Protocolo de reabilitação pré e pós-operatória com cinesioterapia proprioceptiva no ginásio funcional, eletroterapia com TENS analgésico e FES/FENS para fortalecimento potente do quadríceps e estabilização de marcha.'
    },
    'meniscos': {
      id: 'meniscos',
      regiao: 'membros-inferiores',
      sistema: 'articular',
      nome: 'Meniscos Medial e Lateral do Joelho',
      nomeLatim: 'Meniscus medialis et lateralis',
      categoria: 'Sistema Articular • Joelho',
      icone: 'fa-circle-notch',
      descricao: 'Estruturas fibrocartilaginosas em forma de meia-lua interpostas entre os côndilos femorais e o platô tibial.',
      biomecanica: 'Absorvem até 70% das cargas axiais do joelho, aumentam a área de contato articular, lubrificam com líquido sinovial e protegem contra a artrose.',
      patologias: 'Lesões por cisalhamento e torção com carga, bloqueio mecânico que impede estender a perna, dor na linha articular e estalidos.',
      tratamentoCipros: 'Terapia manual descompressiva, reabilitação em bicicleta ergométrica de baixo impacto, controle inflamatório e fortalecimento estabilizador.'
    },
    'manguito-rotador': {
      id: 'manguito-rotador',
      regiao: 'membros-superiores',
      sistema: 'muscular',
      nome: 'Manguito Rotador (Tendão do Supraespinhal)',
      nomeLatim: 'Musculus supraspinatus & Rotator cuff',
      categoria: 'Sistema Muscular • Ombro',
      icone: 'fa-hand',
      descricao: 'Grupo de quatro tendões profundos (Supraespinhal, Infraespinhal, Redondo Menor e Subescapular) que estabilizam a cabeça do úmero na glenoide.',
      biomecanica: 'Centraliza ativamente a cabeça umeral contra a pequena cavidade glenoidal durante a elevação e rotação do braço.',
      patologias: 'Síndrome do impacto subacromial, tendinite com ou sem calcificação, bursite subacromial e rupturas parciais ou completas.',
      tratamentoCipros: 'Alívio da dor aguda com TENS e laserterapia nos boxes privativos, terapia manual escapular e fortalecimento excêntrico específico.'
    },
    'glenoumeral': {
      id: 'glenoumeral',
      regiao: 'membros-superiores',
      sistema: 'articular',
      nome: 'Articulação Glenoumeral & Vasos Braquiais',
      nomeLatim: 'Articulatio glenohumeralis & Vena cephalica',
      categoria: 'Sistema Articular & Vascular • Ombro e Braço',
      icone: 'fa-arrows-to-circle',
      descricao: 'Articulação de maior amplitude do corpo humano, integrada à musculatura bicipital e à drenagem venosa cefálica e basílica do braço.',
      biomecanica: 'Combina extrema mobilidade tridimensional com necessidade crítica de estabilização neuromuscular constante.',
      patologias: 'Capsulite adesiva ("ombro congelado"), luxações recidivantes e tenossinovite do bíceps.',
      tratamentoCipros: 'Mobilização articular Maitland, termoterapia profunda, cinesioterapia com polias no ginásio e reeducação biomecânica.'
    },
    'hernia-discal': {
      id: 'hernia-discal',
      regiao: 'coluna-vertebral',
      sistema: 'articular',
      nome: 'Discos Intervertebrais L4-L5 / L5-S1 (Hérnia Discal)',
      nomeLatim: 'Disci intervertebrales lumbales',
      categoria: 'Sistema Articular • Coluna Lombar',
      icone: 'fa-shield-halved',
      descricao: 'Amortecedores hidráulicos compostos por anel fibroso concêntrico de colágeno e núcleo pulposo hidrofílico hidratado.',
      biomecanica: 'Distribuem as pressões mecânicas do peso corporal entre as vértebras e preservam o espaço dos forames neurais.',
      patologias: 'Hérnia de disco lombar (protrusão e extrusão discal), compressão de raízes nervosas, ciatalgia aguda com queimação e perda de reflexos.',
      tratamentoCipros: 'Descompressão vertebral manual, RPG para realinhamento postural global, eletroterapia analgésica com TENS de alta frequência e fortalecimento do core.'
    },
    'nervo-ciatico': {
      id: 'nervo-ciatico',
      regiao: 'coluna-vertebral',
      sistema: 'nervoso',
      nome: 'Nervo Isquiático (Nervo Ciático)',
      nomeLatim: 'Nervus ischiadicus',
      categoria: 'Sistema Nervoso • Coluna e Pernas',
      icone: 'fa-bolt-lightning',
      descricao: 'O maior tronco nervoso do corpo humano, originado nas raízes de L4 a S3, descendo pela nádega e face posterior da perna até os pés.',
      biomecanica: 'Conduz todos os comandos motores para músculos posteriores da coxa, perna e pé, além da sensibilidade da pele de todo o membro inferior.',
      patologias: 'Ciatalgia ("dor ciática"), síndrome do piriforme com pinçamento neural, queimação, formigamento em choques e perda de força no pé.',
      tratamentoCipros: 'Técnicas de mobilização neural (neurodinâmica) para restaurar o deslizamento do nervo, liberação profunda do piriforme e TENS analgésico.'
    },
    'atm': {
      id: 'atm',
      regiao: 'cabeca-pescoco',
      sistema: 'articular',
      nome: 'Articulação Temporomandibular (ATM)',
      nomeLatim: 'Articulatio temporomandibularis',
      categoria: 'Sistema Articular • Cabeça e Mandíbula',
      icone: 'fa-brain',
      descricao: 'Articulação sinovial bicondilar que liga a mandíbula ao osso temporal do crânio, contendo um disco fibrocartilaginoso amortecedor.',
      biomecanica: 'Combina rotação com translação deslizante para a mastigação, fala, deglutição e abertura da boca.',
      patologias: 'Disfunção da ATM (DTM), deslocamento de disco com estalidos ou travamento mandibular, dores orofaciais e cefaleias tensionais.',
      tratamentoCipros: 'Terapia manual intra e extra-oral especializada, liberação dos músculos mastigatórios (masseter e pterigóideos), laserterapia e controle ergonômico.'
    },
    'masseter-mastigacao': {
      id: 'masseter-mastigacao',
      regiao: 'cabeca-pescoco',
      sistema: 'muscular',
      nome: 'Músculo Masseter & Músculo Temporal (Bruxismo)',
      nomeLatim: 'Musculus masseter & Musculus temporalis',
      categoria: 'Sistema Muscular • Face e Mandíbula',
      icone: 'fa-tooth',
      descricao: 'Os músculos mastigatórios mais potentes do corpo humano por centímetro quadrado, capazes de exercer intensa força oclusal.',
      biomecanica: 'Trabalham em sincronia para fechamento potente da boca e lateralização mandibular.',
      patologias: 'Contraturas musculares severas associadas ao bruxismo (apertamento noturno/diurno), cefaleia tensional matinal e desgaste dental.',
      tratamentoCipros: 'Agulhamento a seco (dry needling) facial, liberação miofascial profunda, relaxamento suboccipital cervical e termoterapia.'
    },
    'coluna-cervical': {
      id: 'coluna-cervical',
      regiao: 'cabeca-pescoco',
      sistema: 'esqueleto',
      nome: 'Coluna Cervical (C1 a C7)',
      nomeLatim: 'Vertebrae cervicales',
      categoria: 'Sistema Esquelético • Pescoço',
      icone: 'fa-bone',
      descricao: 'Sete vértebras que sustentam a cabeça e fornecem ampla mobilidade para a visão e orientação espacial.',
      biomecanica: 'C1-C2 realizam 50% de toda a rotação do pescoço; as vértebras inferiores amortecem cargas axiais e protegem a medula espinhal.',
      patologias: 'Cervicalgia postural, retificação cervical ("pescoço de texto"), artrose facetária e cervicobraquialgia com irradiação para o braço.',
      tratamentoCipros: 'Mobilizações suaves conceito Maitland, tração cervical descompressiva, fortalecimento dos flexores profundos e RPG.'
    },
    'core-paravertebrais': {
      id: 'core-paravertebrais',
      regiao: 'tronco-coluna',
      sistema: 'muscular',
      nome: 'Músculos Paravertebrais, Peitorais e Core',
      nomeLatim: 'Musculi erector spinae & Pectoralis major',
      categoria: 'Sistema Muscular • Tronco e Coluna',
      icone: 'fa-shield',
      descricao: 'Cinturão muscular que engloba os eretores da espinha, multífidos lombares, peitorais e transverso do abdômen.',
      biomecanica: 'Gera estabilidade central e pressão intra-abdominal protetora para permitir movimentos de braços e pernas sem sobrecarregar a coluna.',
      patologias: 'Fraqueza crônica do core, contraturas musculares em faixas tensionadas, dor lombar mecânica e recidivas de hérnia de disco.',
      tratamentoCipros: 'Fortalecimento progressivo no ginásio funcional com bolas suíças e elásticos, treinamento isométrico e cinesioterapia ativa.'
    },
    'quadriceps': {
      id: 'quadriceps',
      regiao: 'membros-inferiores',
      sistema: 'muscular',
      nome: 'Músculo Quadríceps Femoral',
      nomeLatim: 'Musculus quadriceps femoris',
      categoria: 'Sistema Muscular • Coxa',
      icone: 'fa-bolt',
      descricao: 'Grande músculo anterior da coxa com 4 ventres (Reto Femoral, Vasto Lateral, Vasto Medial e Vasto Intermédio).',
      biomecanica: 'Mais potente extensor do joelho. Indispensável para marcha, corrida, agachamento, subir e descer escadas.',
      patologias: 'Atrofia rápida pós-cirurgia ou imobilização, tendinite patelar, condromalácia e dor fêmoro-patelar por desequilíbrio muscular.',
      tratamentoCipros: 'Estimulação elétrica motora com FES/FENS para recrutamento muscular acelerado, treino excêntrico de força e agulhamento a seco.'
    },
    'cotovelo-epicondilite': {
      id: 'cotovelo-epicondilite',
      regiao: 'tronco-coluna',
      sistema: 'muscular',
      nome: 'Músculos do Antebraço & Epicôndilo Lateral',
      nomeLatim: 'Musculi antebrachii & Epicondylus lateralis',
      categoria: 'Sistema Muscular • Braço e Cotovelo',
      icone: 'fa-hand-back-fist',
      descricao: 'Grupo dos músculos extensores e flexores dos punhos e dedos com origem no cotovelo.',
      biomecanica: 'Garantem a força de preensão palmar e sustentam tarefas manuais repetitivas no trabalho e no esporte.',
      patologias: 'Epicondilite lateral ("cotovelo de tenista"), dor ao digitar ou segurar pesos, perda de força de preensão manual.',
      tratamentoCipros: 'Terapia manual miofascial, Dry Needling nos pontos-gatilho, TENS analgésico e fortalecimento excêntrico resistido.'
    },
    'reto-abdominal': {
      id: 'reto-abdominal',
      regiao: 'tronco-coluna',
      sistema: 'muscular',
      nome: 'Músculo Reto Abdominal & Linha Alba',
      nomeLatim: 'Musculus rectus abdominis & Linea alba',
      categoria: 'Sistema Muscular • Parede Abdominal',
      icone: 'fa-shield',
      descricao: 'Músculo vertical par separado centralmente pela faixa tendinosa da Linha Alba.',
      biomecanica: 'Flexiona o tronco, comprime as vísceras e atua como elemento frontal da cinta estabilizadora da pelve e coluna.',
      patologias: 'Diástase abdominal pós-gestacional ou por esforço, fraqueza da parede anterior gerando hiperlordose lombar compensatória.',
      tratamentoCipros: 'Exercícios hipopressivos, fortalecimento isométrico do core e reabilitação neuromuscular postural.'
    },
    'caixa-toracica': {
      id: 'caixa-toracica',
      regiao: 'tronco-coluna',
      sistema: 'esqueleto',
      nome: 'Caixa Torácica, Arcos Costais & Cartilagem',
      nomeLatim: 'Cavea thoracis & Cartilago costalis',
      categoria: 'Sistema Esquelético • Tórax',
      icone: 'fa-bone',
      descricao: 'Estrutura óssea e cartilaginosa formada por 12 pares de costelas unidas ao esterno pelas cartilagens costais.',
      biomecanica: 'Expande e retrai durante a respiração pulmonar e protege o coração, pulmões e grandes vasos sanguíneos.',
      patologias: 'Costocondrite (dor aguda anterior no peito), bloqueios mecânicos costovertebrais e rigidez da expansão torácica.',
      tratamentoCipros: 'Mobilização costal manual, cinesioterapia respiratória descompressiva e termoterapia analgésica.'
    },
    'femur-cartilagem': {
      id: 'femur-cartilagem',
      regiao: 'membros-inferiores',
      sistema: 'esqueleto',
      nome: 'Côndilos Femorais & Cartilagem Articular Hialina',
      nomeLatim: 'Condylus femoris & Cartilago articularis',
      categoria: 'Sistema Esquelético & Cartilaginoso • Fêmur',
      icone: 'fa-bone',
      descricao: 'Extremidade distal do fêmur revestida por cartilagem hialina lisa e brilhante, livre de atrito.',
      biomecanica: 'Desliza e rola sobre a tíbia durante a flexão do joelho, transmitindo a carga de cada passada.',
      patologias: 'Artrose (gonartrose), lesões osteocondrais, condropatia fêmoro-tibial com estalidos e dor ao caminhar.',
      tratamentoCipros: 'Viscossuplementação combinada à fisioterapia, fortalecimento do quadríceps em bicicleta ergométrica e alívio com TENS.'
    },
    'tibia-fibula': {
      id: 'tibia-fibula',
      regiao: 'membros-inferiores',
      sistema: 'esqueleto',
      nome: 'Platô Tibial & Inserções Ligamentares',
      nomeLatim: 'Tibia & Fibula',
      categoria: 'Sistema Esquelético • Perna',
      icone: 'fa-bone',
      descricao: 'Osso de suporte de carga do membro inferior com superfície articular superior e inserção dos tendões patelar e pata de ganso.',
      biomecanica: 'Recebe as forças transmitidas pelo fêmur e as transfere para o tornozelo e pé.',
      patologias: 'Tendinite da pata de ganso, canelite (síndrome do estresse tibial), bursite anserina e sequelas de fratura.',
      tratamentoCipros: 'Crioterapia nos boxes, liberação miofascial profunda, laserterapia e treino de marcha com esteira.'
    },
    'vertebras-lombares': {
      id: 'vertebras-lombares',
      regiao: 'coluna-vertebral',
      sistema: 'esqueleto',
      nome: 'Corpos Vertebrais Lombares (L1 a L5) & Sacro',
      nomeLatim: 'Vertebrae lumbales & Os sacrum',
      categoria: 'Sistema Esquelético • Coluna Lombar',
      icone: 'fa-bone',
      descricao: 'As maiores e mais volumosas vértebras do corpo humano, projetadas para suportar a carga de todo o tronco.',
      biomecanica: 'Apresentam lordose fisiológica que dissipa impactos axiais na deambulação.',
      patologias: 'Espondilolistese (escorregamento vertebral), espondiloartrose (bicos de papagaio) e estenose do canal vertebral.',
      tratamentoCipros: 'Terapia manual articular, exercícios de flexão de Williams ou extensão de McKenzie, e fortalecimento muscular estabilizador.'
    },
    'medula-plexo': {
      id: 'medula-plexo',
      regiao: 'membros-superiores',
      sistema: 'nervoso',
      nome: 'Plexo Braquial & Feixe Neurovascular',
      nomeLatim: 'Plexus brachialis',
      categoria: 'Sistema Nervoso • Pescoço e Braço',
      icone: 'fa-network-wired',
      descricao: 'Rede de nervos originada nas raízes de C5 a T1 que inerva todos os músculos e a sensibilidade do ombro, braço e mão.',
      biomecanica: 'Transmite comandos neurais com alta velocidade de condução e acomoda o movimento dos membros superiores.',
      patologias: 'Síndrome do desfiladeiro torácico com formigamento nas mãos, radiculopatias cervicais e dor irradiada.',
      tratamentoCipros: 'Neurodinâmica suave para descompressão neural, tração cervical e fortalecimento postural.'
    },
    'orgaos-viscerais': {
      id: 'orgaos-viscerais',
      regiao: 'tronco-coluna',
      sistema: 'articular',
      nome: 'Estruturas Viscerais & Fáscia Abdominal',
      nomeLatim: 'Viscera abdominalis',
      categoria: 'Sistema Visceral & Fáscia • Tronco',
      icone: 'fa-lungs',
      descricao: 'Conjunto de órgãos viscerais ancorados pelo peritônio e pelas conexões fasciais com o diafragma e a coluna lombar.',
      biomecanica: 'O diafragma desce na inspiração gerando pressão intra-abdominal essencial para a estabilização lombar.',
      patologias: 'Aderências fasciais, disfunção respiratória diafragmática gerando sobrecarga mecânica na coluna lombar.',
      tratamentoCipros: 'Liberação miofascial diafragmática, exercícios respiratórios e manobras osteopáticas viscerais.'
    },
    'deltoide-biceps': {
      id: 'deltoide-biceps',
      regiao: 'membros-superiores',
      sistema: 'muscular',
      nome: 'Músculo Deltoide & Tendão Bicipital',
      nomeLatim: 'Musculus deltoideus & Biceps brachii',
      categoria: 'Sistema Muscular • Ombro e Braço',
      icone: 'fa-bolt',
      descricao: 'Músculo potente que recobre o ombro e bíceps na face anterior do braço.',
      biomecanica: 'Responsável pela abdução do braço e flexão com supinação do antebraço.',
      patologias: 'Tendinite da cabeça longa do bíceps, estiramentos e contraturas do deltoide.',
      tratamentoCipros: 'Laserterapia anti-inflamatória, TENS analgésico, massagem miofascial e treino excêntrico de força.'
    },
    'crista-iliaca': {
      id: 'crista-iliaca',
      regiao: 'tronco-coluna',
      sistema: 'esqueleto',
      nome: 'Crista Ilíaca & Articulação Sacroilíaca',
      nomeLatim: 'Crista iliaca & Articulatio sacroiliaca',
      categoria: 'Sistema Esquelético • Bacia e Coluna',
      icone: 'fa-bone',
      descricao: 'Borda superior da asa do osso ilíaco e articulação anfiartrose que liga a pelve ao osso sacro da coluna.',
      biomecanica: 'Transmite todo o peso da coluna vertebral e do tronco para os membros inferiores durante a marcha.',
      patologias: 'Sacroileíte (dor glútea profunda com rigidez matinal), entesite da crista ilíaca e desníveis pélvicos.',
      tratamentoCipros: 'Manipulação osteopática sacroilíaca, alongamento com RPG, termoterapia nos boxes e confecção de palmilhas posturais.'
    },
    'deltoide-posterior': {
      id: 'deltoide-posterior',
      regiao: 'membros-superiores',
      sistema: 'muscular',
      nome: 'Feixes Posteriores do Músculo Deltoide',
      nomeLatim: 'Pars posterior musculi deltoidei',
      categoria: 'Sistema Muscular • Ombro Posterior',
      icone: 'fa-bolt',
      descricao: 'A porção posterior espinhal do deltoide, originada na espinha da escápula.',
      biomecanica: 'Realiza extensão horizontal e rotação externa do braço, crucial para estabilizar a cintura escapular.',
      patologias: 'Sobrecarga muscular por má postura cifótica (ombros caídos para frente) e fadiga em atividades esportivas.',
      tratamentoCipros: 'Fortalecimento com elásticos, liberação miofascial e treino de estabilização escapular.'
    },
    'nervos-circunflexos': {
      id: 'nervos-circunflexos',
      regiao: 'membros-superiores',
      sistema: 'nervoso',
      nome: 'Nervo Axilar & Artéria Circunflexa Umeral',
      nomeLatim: 'Nervus axillaris & Arteria circumflexa humeri',
      categoria: 'Sistema Nervoso • Ombro Posterior',
      icone: 'fa-bolt-lightning',
      descricao: 'Nervo que transita pelo espaço quadrangular na face dorsal do ombro para inervar o deltoide e o redondo menor.',
      biomecanica: 'Acompanha o colo cirúrgico do úmero durante rotações do braço.',
      patologias: 'Compressão do espaço quadrangular com fraqueza do ombro e dormência na face lateral do braço.',
      tratamentoCipros: 'Mobilização neural suave, agulhamento a seco nos rotadores externos e eletroterapia descompressiva.'
    },
    'gastrocnemio-insercao': {
      id: 'gastrocnemio-insercao',
      regiao: 'membros-inferiores',
      sistema: 'muscular',
      nome: 'Cabeças do Músculo Gastrocnêmio (Panturrilha)',
      nomeLatim: 'Caput mediale et laterale musculi gastrocnemii',
      categoria: 'Sistema Muscular • Perna Posterior',
      icone: 'fa-person-walking',
      descricao: 'As duas cabeças superiores da panturrilha que se originam nos côndilos posteriores do fêmur, logo acima do joelho.',
      biomecanica: 'Cruzam duas articulações (joelho e tornozelo), gerando a propulsão do salto e a flexão plantar na corrida.',
      patologias: 'Síndrome da pedrada (ruptura parcial da cabeça medial do gastrocnêmio), contraturas agudas e tendinopatia.',
      tratamentoCipros: 'Crioterapia inicial, laser de alta potência, treino excêntrico progressivo e massagem descompressiva.'
    }
  };

  // Estado da Aplicação
  const State = {
    currentRegion: 'tronco-coluna',
    currentSide: 'frente', // 'frente' ou 'costas'
    activeSystemFilter: 'todos',
    selectedStructure: 'manguito-rotador',
    zoom: 1.0,
    pan: { x: 0, y: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    touchStartDist: 0,
    touchStartX: 0
  };

  // Inicialização
  function init() {
    const container = document.getElementById('atlas-3d-canvas-container');
    if (!container) return;

    renderStageUI(container);
    setupEvents();
    loadView(State.currentRegion, State.currentSide);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 820;
    selectStructure(State.selectedStructure, !isMobile);
  }

  // Renderiza o Palco Completo com Controles de Rotação 360°
  function renderStageUI(container) {
    container.innerHTML = `
      <div class="complete-anatomy-stage" id="ca-stage">
        
        <!-- Barra de Controles de Rotação 360° (Topo Central) -->
        <div class="ca-flip-control-bar">
          <button type="button" id="btn-side-frente" class="ca-side-pill active" title="Ver Frente / Anterior">
            <i class="fa-solid fa-user"></i> Frente
          </button>
          <button type="button" id="btn-flip-360" class="ca-side-pill ca-flip-btn" title="Girar para o Outro Lado (360°)">
            <i class="fa-solid fa-arrows-rotate"></i> <span class="flip-text-full">Girar para o Outro Lado</span><span class="flip-text-short">Girar 360°</span>
          </button>
          <button type="button" id="btn-side-costas" class="ca-side-pill" title="Ver Costas / Posterior">
            <i class="fa-solid fa-user-injured"></i> Costas
          </button>
        </div>

        <!-- Viewport com Imagem Médica e Efeito de Flip 3D -->
        <div class="ca-viewport" id="ca-viewport">
          <div class="ca-pan-zoom-container" id="ca-pan-zoom-container">
            <img src="" alt="Anatomia Médica 3D" id="ca-main-image" class="ca-main-image">
            <!-- Camada de Hotspots Interativos (Pins) -->
            <div class="ca-hotspots-layer" id="ca-hotspots-layer"></div>
          </div>
        </div>

        <!-- Controles Flutuantes de Zoom (Canto Inferior Direito) -->
        <div class="ca-zoom-toolbar">
          <button type="button" id="btn-zoom-in" class="ca-zoom-btn" title="Aproximar Zoom">+</button>
          <button type="button" id="btn-zoom-out" class="ca-zoom-btn" title="Afastar Zoom">−</button>
          <button type="button" id="btn-zoom-reset" class="ca-zoom-btn" title="Resetar Zoom"><i class="fa-solid fa-rotate-left"></i></button>
          <span class="ca-zoom-level" id="ca-zoom-level">100%</span>
        </div>

        <!-- Crachá de Guia Interativo -->
        <div class="ca-hint-badge">
          <i class="fa-solid fa-arrows-rotate"></i> <span class="ca-hint-full">Arraste para os lados para girar e ver o outro lado • Clique nos pontos para inspecionar</span><span class="ca-hint-short">Toque nos pontos para diagnóstico</span>
        </div>

      </div>
    `;
  }

  // Carrega uma região e lado específico (frente ou costas)
  function loadView(regionId, side) {
    const reg = ANATOMICAL_REGIONS[regionId];
    if (!reg) return;

    State.currentRegion = regionId;
    State.currentSide = side || 'frente';
    State.zoom = 1.0;
    State.pan = { x: 0, y: 0 };
    updateTransform();

    const vista = reg.vistas[State.currentSide] || reg.vistas['frente'];
    const img = document.getElementById('ca-main-image');
    const container = document.getElementById('ca-pan-zoom-container');

    if (container) {
      container.classList.add('flipping');
      setTimeout(() => {
        if (img) {
          img.src = vista.imagem;
          img.alt = `${reg.nome} - ${vista.nome}`;
        }
        renderHotspots(vista);
        container.classList.remove('flipping');
      }, 140);
    } else if (img) {
      img.src = vista.imagem;
      renderHotspots(vista);
    }

    // Atualiza pílulas de Lado (Frente / Costas)
    const btnFrente = document.getElementById('btn-side-frente');
    const btnCostas = document.getElementById('btn-side-costas');
    if (btnFrente && btnCostas) {
      if (State.currentSide === 'frente') {
        btnFrente.classList.add('active');
        btnCostas.classList.remove('active');
      } else {
        btnCostas.classList.add('active');
        btnFrente.classList.remove('active');
      }
    }

    // Sincronizar abas de região superiores
    document.querySelectorAll('.atlas-region-pill').forEach(pill => {
      const pReg = pill.getAttribute('data-region');
      if (pReg === regionId) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Sincronizar pilares inferiores
    if (typeof window.renderAtlasCards === 'function') {
      window.renderAtlasCards(regionId === 'coluna-vertebral' ? 'tronco-coluna' : regionId);
    }
  }

  // Alterna suavemente para o outro lado (Giro 180° / 360°)
  function flipSide() {
    const nextSide = State.currentSide === 'frente' ? 'costas' : 'frente';
    loadView(State.currentRegion, nextSide);
  }

  // Renderiza os Hotspots luminosos na imagem médica ativa
  function renderHotspots(vista) {
    const layer = document.getElementById('ca-hotspots-layer');
    if (!layer || !vista.hotspots) return;

    layer.innerHTML = '';
    vista.hotspots.forEach(spot => {
      // Filtrar por sistema se não for 'todos'
      if (State.activeSystemFilter !== 'todos' && spot.sistema !== State.activeSystemFilter) {
        return;
      }

      const isRightSide = spot.x > 50;
      const pin = document.createElement('div');
      pin.className = `ca-pin ${spot.id === State.selectedStructure ? 'active' : ''} pin-sistema-${spot.sistema} ${isRightSide ? 'pin-align-right' : 'pin-align-left'}`;
      pin.style.left = `${spot.x}%`;
      pin.style.top = `${spot.y}%`;
      pin.setAttribute('data-id', spot.id);
      pin.setAttribute('title', spot.label);

      pin.innerHTML = `
        <div class="ca-pin-beacon"></div>
        <div class="ca-pin-core"></div>
        <div class="ca-pin-tag">${spot.label}</div>
      `;

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        selectStructure(spot.id, true);
      });

      layer.appendChild(pin);
    });
  }

  // Seleciona uma estrutura anatômica e abre o Prontuário Lateral
  function selectStructure(structureId, shouldOpenPanel = true) {
    const item = CLINICAL_DATABASE[structureId];
    if (!item) return;

    State.selectedStructure = structureId;

    // Se a estrutura pertence a outra região, navega até ela
    if (item.regiao && item.regiao !== State.currentRegion && ANATOMICAL_REGIONS[item.regiao]) {
      loadView(item.regiao, 'frente');
    }

    // Destaca o pin ativo
    document.querySelectorAll('.ca-pin').forEach(pin => {
      if (pin.getAttribute('data-id') === structureId) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });

    // Atualiza o Inspector Panel (Prontuário)
    updateInspectorPanel(item, shouldOpenPanel);
  }

  // Preenche o Prontuário Anatômico Lateral (Inspector Panel)
  function updateInspectorPanel(item, shouldOpenPanel = true) {
    const panel = document.getElementById('atlas-inspector-panel');
    if (!panel) return;

    const zapText = encodeURIComponent(`Olá! Gostaria de agendar uma consulta para avaliação de ${item.nome} na CIPROS.`);
    const zapUrl = `https://api.whatsapp.com/send/?phone=555193674766&text=${zapText}`;

    panel.innerHTML = `
      <div class="inspector-header">
        <div>
          <span class="inspector-category-badge">
            <i class="fa-solid ${item.icone}"></i> ${item.categoria}
          </span>
          <h3 class="inspector-title">${item.nome}</h3>
          <span class="inspector-latin">${item.nomeLatim}</span>
        </div>
        <button type="button" id="btn-close-inspector" class="inspector-close-btn" aria-label="Fechar painel">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="inspector-body">
        <!-- Descrição Anatômica -->
        <div class="inspector-section">
          <h4 class="inspector-sec-title">
            <i class="fa-solid fa-microscope"></i> Anatomia &amp; Descrição
          </h4>
          <p class="inspector-text">${item.descricao}</p>
        </div>

        <!-- Biomecânica Clínica -->
        <div class="inspector-section">
          <h4 class="inspector-sec-title">
            <i class="fa-solid fa-person-running"></i> Biomecânica Funcional
          </h4>
          <p class="inspector-text">${item.biomecanica}</p>
        </div>

        <!-- Patologias e Lesões Frequentes -->
        <div class="inspector-section warning-box">
          <h4 class="inspector-sec-title alert-title">
            <i class="fa-solid fa-triangle-exclamation"></i> Lesões &amp; Patologias Comuns
          </h4>
          <p class="inspector-text alert-text">${item.patologias}</p>
        </div>

        <!-- Protocolo Clínico CIPROS -->
        <div class="inspector-section success-box">
          <h4 class="inspector-sec-title success-title">
            <i class="fa-solid fa-hospital-user"></i> Abordagem Fisioterapêutica CIPROS
          </h4>
          <p class="inspector-text success-text">${item.tratamentoCipros}</p>
        </div>

        <!-- Ação Direta no WhatsApp -->
        <div class="inspector-cta-box">
          <a href="${zapUrl}" target="_blank" class="inspector-whatsapp-btn" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> Agendar Avaliação desta Região
          </a>
          <span class="inspector-cta-note">
            <i class="fa-solid fa-shield-halved"></i> Atendimento em Porto Alegre e São Leopoldo
          </span>
        </div>
      </div>
    `;

    if (shouldOpenPanel) {
      panel.classList.add('open');
    } else {
      panel.classList.remove('open');
    }

    // Botão Fechar
    const closeBtn = document.getElementById('btn-close-inspector');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
      });
    }
  }

  // Configura Eventos de Zoom, Pan, Arrastar para Girar e Controles
  function setupEvents() {
    const viewport = document.getElementById('ca-viewport');
    if (!viewport) return;

    let dragDeltaX = 0;

    // Zoom com Scroll do Mouse
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY * -0.0015;
      const newZoom = Math.min(3.2, Math.max(1.0, State.zoom + delta));
      if (newZoom !== State.zoom) {
        State.zoom = newZoom;
        if (State.zoom === 1.0) State.pan = { x: 0, y: 0 };
        updateTransform();
      }
    }, { passive: false });

    // Pan / Arrastar com Mouse + Detecção de Swipe para Girar
    viewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('.ca-pin')) return;
      State.isDragging = true;
      dragDeltaX = 0;
      State.dragStart = { x: e.clientX - State.pan.x, y: e.clientY - State.pan.y };
      viewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!State.isDragging) return;
      const newX = e.clientX - State.dragStart.x;
      const newY = e.clientY - State.dragStart.y;
      dragDeltaX += (e.movementX || 0);

      State.pan.x = newX;
      State.pan.y = newY;
      clampPan();
      updateTransform();
    });

    window.addEventListener('mouseup', () => {
      if (State.isDragging) {
        State.isDragging = false;
        viewport.style.cursor = 'grab';

        // Se o usuário arrastou bastante na horizontal enquanto não estava no zoom máximo, gira para o outro lado!
        if (State.zoom <= 1.3 && Math.abs(dragDeltaX) > 160) {
          flipSide();
        }
      }
    });

    // Suporte a Toque em Celular com Detecção de Swipe para Girar
    let touchStartX = 0;
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        State.isDragging = true;
        touchStartX = e.touches[0].clientX;
        State.dragStart = { x: e.touches[0].clientX - State.pan.x, y: e.touches[0].clientY - State.pan.y };
      } else if (e.touches.length === 2) {
        State.touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    viewport.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && State.isDragging) {
        State.pan.x = e.touches[0].clientX - State.dragStart.x;
        State.pan.y = e.touches[0].clientY - State.dragStart.y;
        clampPan();
        updateTransform();
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = (dist - State.touchStartDist) * 0.005;
        State.zoom = Math.min(3.2, Math.max(1.0, State.zoom + factor));
        State.touchStartDist = dist;
        updateTransform();
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (State.isDragging) {
        State.isDragging = false;
        if (e.changedTouches && e.changedTouches.length === 1 && State.zoom <= 1.3) {
          const deltaX = e.changedTouches[0].clientX - touchStartX;
          if (Math.abs(deltaX) > 120) {
            flipSide();
          }
        }
      }
    });

    // Botões de Rotação 360° no Topo
    const btnFlip = document.getElementById('btn-flip-360');
    const btnFrente = document.getElementById('btn-side-frente');
    const btnCostas = document.getElementById('btn-side-costas');

    if (btnFlip) {
      btnFlip.addEventListener('click', () => {
        flipSide();
      });
    }

    if (btnFrente) {
      btnFrente.addEventListener('click', () => {
        loadView(State.currentRegion, 'frente');
      });
    }

    if (btnCostas) {
      btnCostas.addEventListener('click', () => {
        loadView(State.currentRegion, 'costas');
      });
    }

    // Botões On-Screen de Zoom
    const btnIn = document.getElementById('btn-zoom-in');
    const btnOut = document.getElementById('btn-zoom-out');
    const btnReset = document.getElementById('btn-zoom-reset');

    if (btnIn) {
      btnIn.addEventListener('click', () => {
        State.zoom = Math.min(3.2, State.zoom + 0.35);
        updateTransform();
      });
    }

    if (btnOut) {
      btnOut.addEventListener('click', () => {
        State.zoom = Math.max(1.0, State.zoom - 0.35);
        if (State.zoom === 1.0) State.pan = { x: 0, y: 0 };
        updateTransform();
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        State.zoom = 1.0;
        State.pan = { x: 0, y: 0 };
        updateTransform();
      });
    }

    // Abas de Regiões Superiores
    document.querySelectorAll('.atlas-region-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const reg = pill.getAttribute('data-region');
        if (ANATOMICAL_REGIONS[reg]) {
          loadView(reg, 'frente');
        }
      });
    });

    // Filtros de Sistemas (Camadas)
    setupSystemFilters();

    // Busca Anatômica em Tempo Real
    setupSearch();
  }

  function setupSystemFilters() {
    const filterInputs = [
      { id: 'toggle-layer-skeleton', sistema: 'esqueleto' },
      { id: 'toggle-layer-muscles', sistema: 'muscular' },
      { id: 'toggle-layer-joints', sistema: 'articular' },
      { id: 'toggle-layer-nerves', sistema: 'nervoso' }
    ];

    filterInputs.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) {
        el.addEventListener('change', () => {
          const activeSistemas = filterInputs.filter(f => {
            const input = document.getElementById(f.id);
            return input && input.checked;
          }).map(f => f.sistema);

          const reg = ANATOMICAL_REGIONS[State.currentRegion];
          if (!reg) return;

          const vista = reg.vistas[State.currentSide] || reg.vistas['frente'];
          const layer = document.getElementById('ca-hotspots-layer');
          if (!layer) return;

          layer.querySelectorAll('.ca-pin').forEach(pin => {
            const id = pin.getAttribute('data-id');
            const spot = vista.hotspots.find(h => h.id === id);
            if (spot) {
              if (activeSistemas.includes(spot.sistema)) {
                pin.style.display = 'block';
              } else {
                pin.style.display = 'none';
              }
            }
          });
        });
      }
    });

    // Modo Raio-X
    const btnXray = document.getElementById('btn-atlas-xray');
    if (btnXray) {
      btnXray.addEventListener('click', () => {
        const img = document.getElementById('ca-main-image');
        if (!img) return;
        const isXray = img.classList.toggle('xray-active');
        btnXray.classList.toggle('active', isXray);
      });
    }

    // Botões Rápidos de Pranchas
    const btnAnterior = document.getElementById('btn-cam-anterior');
    const btnPosterior = document.getElementById('btn-cam-posterior');
    const btnLateral = document.getElementById('btn-cam-lateral');
    const btnReset = document.getElementById('btn-cam-reset');

    if (btnAnterior) {
      btnAnterior.addEventListener('click', () => {
        loadView('tronco-coluna', 'frente');
      });
    }
    if (btnPosterior) {
      btnPosterior.addEventListener('click', () => {
        loadView('coluna-vertebral', 'costas');
      });
    }
    if (btnLateral) {
      btnLateral.addEventListener('click', () => {
        loadView('cabeca-pescoco', 'frente');
      });
    }
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        loadView('membros-inferiores', 'frente');
      });
    }
  }

  function setupSearch() {
    const searchInput = document.getElementById('atlas-3d-search');
    const searchResults = document.getElementById('atlas-search-dropdown');
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
      }

      const matches = Object.keys(CLINICAL_DATABASE).filter(key => {
        const item = CLINICAL_DATABASE[key];
        return item.nome.toLowerCase().includes(query) ||
               item.nomeLatim.toLowerCase().includes(query) ||
               item.patologias.toLowerCase().includes(query) ||
               item.descricao.toLowerCase().includes(query);
      });

      if (matches.length > 0) {
        searchResults.innerHTML = matches.map(mKey => {
          const m = CLINICAL_DATABASE[mKey];
          return `
            <div class="atlas-search-match-item" data-id="${m.id}">
              <div>
                <strong>${m.nome}</strong>
                <div style="font-size:11px;color:#94a3b8;">${m.categoria} • ${m.nomeLatim}</div>
              </div>
              <i class="fa-solid fa-arrow-right" style="font-size:12px;color:#38bdf8;"></i>
            </div>
          `;
        }).join('');
        searchResults.style.display = 'block';

        searchResults.querySelectorAll('.atlas-search-match-item').forEach(el => {
          el.addEventListener('click', () => {
            const id = el.getAttribute('data-id');
            selectStructure(id);
            searchResults.style.display = 'none';
            searchInput.value = '';
          });
        });
      } else {
        searchResults.innerHTML = '<div style="padding:12px;font-size:12px;color:#94a3b8;text-align:center;">Nenhuma estrutura encontrada. Tente "lobo frontal", "LCA", "LCP", "ciático", "ATM"...</div>';
        searchResults.style.display = 'block';
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
      }
    });
  }

  function clampPan() {
    const maxPan = (State.zoom - 1) * 350;
    State.pan.x = Math.max(-maxPan, Math.min(maxPan, State.pan.x));
    State.pan.y = Math.max(-maxPan, Math.min(maxPan, State.pan.y));
  }

  function updateTransform() {
    const container = document.getElementById('ca-pan-zoom-container');
    const zoomText = document.getElementById('ca-zoom-level');
    if (container) {
      container.style.transform = `translate(${State.pan.x}px, ${State.pan.y}px) scale(${State.zoom})`;
    }
    if (zoomText) {
      zoomText.textContent = `${Math.round(State.zoom * 100)}%`;
    }
  }

  // Expor Globalmente
  window.CIPROS_ATLAS_3D = {
    init: init,
    loadView: loadView,
    flipSide: flipSide,
    selectStructure: selectStructure
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 80);
  }

})();
