# -*- coding: utf-8 -*-
"""
Gerador de Proposta Comercial e Portfólio em PDF
Cliente: CIPROS Fisioterapia e Fisiatria
Desenvolvedor: Ezequiel Marques
Valor: R$ 1.200,00 (Aquisição Chave na Mão) + R$ 100,00 por mudança mensal sob demanda
E-mail: ezequielmarquesc@gmail.com
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Registro de Fontes TTF Arial para suporte UTF-8 nativo
pdfmetrics.registerFont(TTFont('Arial', r'C:\Windows\Fonts\arial.ttf'))
pdfmetrics.registerFont(TTFont('Arial-Bold', r'C:\Windows\Fonts\arialbd.ttf'))

PDF_PATH = r"c:\Users\ezequ\OneDrive\Desktop\Cipros\Proposta_Comercial_CIPROS_Ezequiel_Marques.pdf"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        self.saveState()
        w, h = A4

        # Cabeçalho a partir da página 2
        if self._pageNumber > 1:
            self.setFillColor(colors.HexColor("#005ba9"))
            self.rect(0, h - 6, w, 6, stroke=0, fill=1)
            
            self.setFont("Arial-Bold", 8)
            self.setFillColor(colors.HexColor("#005ba9"))
            self.drawString(36, h - 22, "CIPROS Fisioterapia e Fisiatria | Proposta Comercial & Portfólio")
            
            self.setFont("Arial", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawRightString(w - 36, h - 22, "Desenvolvedor: Ezequiel Marques")
            
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.6)
            self.line(36, h - 27, w - 36, h - 27)

        # Rodapé em todas as páginas
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.6)
        self.line(36, 32, w - 36, 32)

        self.setFont("Arial", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(36, 20, "Proposta Comercial Confidencial | Elaborada por Ezequiel Marques (ezequielmarquesc@gmail.com)")
        
        page_str = f"Página {self._pageNumber} de {total_pages}"
        self.drawRightString(w - 36, 20, page_str)

        self.restoreState()


def build_pdf():
    doc = SimpleDocTemplate(
        PDF_PATH,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=42
    )

    styles = getSampleStyleSheet()

    c_blue = colors.HexColor("#005ba9")
    c_dark = colors.HexColor("#0f172a")
    c_teal = colors.HexColor("#0284c7")
    c_slate = colors.HexColor("#334155")
    c_green = colors.HexColor("#059669")

    title_cover = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=20,
        leading=24,
        textColor=c_blue,
        spaceAfter=4
    )

    subtitle_cover = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Arial',
        fontSize=11,
        leading=15,
        textColor=c_slate,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=14.5,
        leading=19,
        textColor=c_blue,
        spaceBefore=4,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=11,
        leading=15,
        textColor=c_dark,
        spaceBefore=6,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Arial',
        fontSize=8.8,
        leading=13,
        textColor=c_slate,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Arial-Bold',
        textColor=c_dark
    )

    price_big = ParagraphStyle(
        'PriceBig',
        parent=styles['Normal'],
        fontName='Arial-Bold',
        fontSize=18,
        leading=22,
        textColor=c_green,
        alignment=1
    )

    story = []

    # ========================================================
    # PÁGINA 1: CAPA & APRESENTAÇÃO EXECUTIVA
    # ========================================================
    logo_path = r"assets/logo/cipros_logo.png"
    if os.path.exists(logo_path):
        logo_img = Image(logo_path, width=120, height=60)
        story.append(logo_img)
        story.append(Spacer(1, 8))

    story.append(Paragraph("PROPOSTA COMERCIAL &amp; PORTFÓLIO DE PROJETO", title_cover))
    story.append(Paragraph(
        "Desenvolvimento do Novo Site Oficial &amp; Plataforma Interativa para a <strong>CIPROS Fisioterapia e Fisiatria</strong>",
        subtitle_cover
    ))

    # Tabela Card com Dados do Projeto
    proj_info = [
        [
            Paragraph("<b>CLIENTE:</b>", body_style),
            Paragraph("CIPROS Centro de Reabilitação Ltda. (Porto Alegre &amp; São Leopoldo)", body_bold)
        ],
        [
            Paragraph("<b>DESENVOLVEDOR:</b>", body_style),
            Paragraph("<b>Ezequiel Marques</b> • Especialista em Desenvolvimento Web &amp; Soluções Digitais", body_bold)
        ],
        [
            Paragraph("<b>OBJETIVO:</b>", body_style),
            Paragraph("Apresentação e venda do site oficial desenvolvido sob medida para a clínica", body_style)
        ],
        [
            Paragraph("<b>STATUS:</b>", body_style),
            Paragraph("<font color='#059669'><b>✓ 100% Desenvolvido, Testado e Publicado Online para Demonstração</b></font>", body_style)
        ],
        [
            Paragraph("<b>DEMONSTRAÇÃO ONLINE:</b>", body_style),
            Paragraph("<font color='#0284c7'><u>https://ezequielmdev.github.io/cipros/</u></font>", body_bold)
        ]
    ]
    t_proj = Table(proj_info, colWidths=[125, 395])
    t_proj.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_proj)
    story.append(Spacer(1, 10))

    # Resumo Executivo
    story.append(Paragraph("1. Resumo Executivo", h1_style))
    story.append(Paragraph(
        "A presença digital de uma clínica de reabilitação física de referência precisa transmitir <b>autoridade médica, acolhimento, credibilidade imediata e facilidade no agendamento</b>. O site anterior da clínica necessitava de renovação técnica e visual para refletir a verdadeira excelência da CIPROS e suas duas sedes em Porto Alegre e São Leopoldo.",
        body_style
    ))
    story.append(Paragraph(
        "Desenvolvi um <b>projeto sob medida e de alto impacto</b>, integrando visualizador anatômico tridimensional exclusivo, conversão estratégica para o WhatsApp oficial da clínica, apresentação dos 24 convênios com busca instantânea e total respeito às normas do <b>CREFITO-5/COFFITO</b> e à <b>LGPD (Lei nº 13.709/2018)</b>.",
        body_style
    ))

    # Imagem institucional de destaque na capa
    qs_path = r"assets/images/quem_somos.jpg"
    if os.path.exists(qs_path):
        qs_img = Image(qs_path, width=520, height=170)
        story.append(Spacer(1, 6))
        story.append(qs_img)

    story.append(PageBreak())

    # ========================================================
    # PÁGINA 2: O QUE FOI ENTREGUE (DIFERENCIAIS TÉCNICOS)
    # ========================================================
    story.append(Paragraph("2. Principais Funcionalidades Entregues no Site", h1_style))
    story.append(Paragraph(
        "O projeto foi concebido para colocar a CIPROS em posição de destaque absoluto frente aos concorrentes no RS. Todos os recursos abaixo já estão implementados, testados e funcionais:",
        body_style
    ))

    features_data = [
        [
            Paragraph("<b>RECURSO</b>", body_bold),
            Paragraph("<b>BENEFÍCIO CLÍNICO &amp; COMERCIAL PARA A CIPROS</b>", body_bold)
        ],
        [
            Paragraph("<b>Atlas Anatômico 3D Interativo</b><br/><font color='#64748b' size='7'>Giro 360° Frente e Costas</font>", body_style),
            Paragraph("Diferencial tecnológico único. Permite aos pacientes interagir com modelos anatômicos de alta precisão (Tronco, Joelho com LCA/LCP, Coluna L1-L5, Ombro e Cabeça com Lobos Cerebrais e ATM). Aumenta a autoridade e o engajamento.", body_style)
        ],
        [
            Paragraph("<b>Conversão Direta para WhatsApp</b><br/><font color='#64748b' size='7'>Botões de Ação Estratégicos</font>", body_style),
            Paragraph("Botão flutuante pulsante e chamadas de agendamento em todas as seções direcionando para o WhatsApp <b>(51) 99367-4766</b> com mensagem pronta, facilitando o agendamento de consultas.", body_style)
        ],
        [
            Paragraph("<b>Grade com 24 Convênios Médicos</b><br/><font color='#64748b' size='7'>Busca Instantânea em Tempo Real</font>", body_style),
            Paragraph("Exibição individualizada e em alta definição dos 24 convênios atendidos (Unimed, IPE Saúde, Bradesco, Amil, Medial Saúde, CASSI, etc.) com filtro de busca em tempo real para o paciente achar seu plano em 2 segundos.", body_style)
        ],
        [
            Paragraph("<b>Estrutura Real das 2 Unidades</b><br/><font color='#64748b' size='7'>Porto Alegre &amp; São Leopoldo</font>", body_style),
            Paragraph("Galeria com fotos reais dos boxes privativos, salas de atendimento, cinesioterapia e destaque para os equipamentos de <b>TENS e FES (FENS)</b> de eletroterapia.", body_style)
        ],
        [
            Paragraph("<b>Blindagem Ética &amp; LGPD Nativa</b><br/><font color='#64748b' size='7'>Resoluções CREFITO-5 e CFM</font>", body_style),
            Paragraph("Linguagem clínica ética sem promessas enganosas. Sistema nativo de consentimento de cookies em 3 níveis e política de privacidade conforme a Lei nº 13.709/2018.", body_style)
        ],
        [
            Paragraph("<b>Proteção Anti-Clonagem &amp; IA</b><br/><font color='#64748b' size='7'>Segurança Cibernética Ativa</font>", body_style),
            Paragraph("Robots.txt com bloqueio a robôs de inteligência artificial (GPTBot, ClaudeBot), proteção contra ataques por iframe (anti-phishing), bloqueio de atalhos de inspeção e código compilado e minificado.", body_style)
        ]
    ]

    t_feat = Table(features_data, colWidths=[160, 360])
    t_feat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#005ba9")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc")]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_feat)
    story.append(Spacer(1, 10))

    at_path = r"assets/anatomia/anatomia_complete_cabeca_lobos.jpg"
    if os.path.exists(at_path):
        story.append(Paragraph("<b>Demonstração Visual: Atlas Anatômico 3D da CIPROS</b>", body_bold))
        at_img = Image(at_path, width=520, height=140)
        story.append(Spacer(1, 4))
        story.append(at_img)

    story.append(PageBreak())

    # ========================================================
    # PÁGINA 3: PROPOSTA FINANCEIRA & CONDIÇÕES COMERCIAIS
    # ========================================================
    story.append(Paragraph("3. Investimento &amp; Condições Comerciais", h1_style))
    story.append(Paragraph(
        "Pensando em firmar uma parceria sólida e duradoura com a CIPROS, estabeleci condições altamente acessíveis e sem amarras contratuais:",
        body_style
    ))

    pricing_table_data = [
        [
            Paragraph("<b>ITEM / SERVIÇO</b>", body_bold),
            Paragraph("<b>DESCRIÇÃO DETALHADA</b>", body_bold),
            Paragraph("<b>INVESTIMENTO</b>", body_bold)
        ],
        [
            Paragraph("<b>Aquisição do Site Completo CIPROS</b><br/><font color='#059669' size='7.5'>Entrega Imediata Chave na Mão</font>", body_style),
            Paragraph(
                "• Cessão total do código-fonte e do projeto desenvolvido.<br/>"
                "• Plataforma 100% responsiva (Desktop, Tablet e Celular).<br/>"
                "• Atlas Anatômico 3D com 5 regiões e giro 360° completo.<br/>"
                "• Grade de 24 convênios individuais com pesquisa em tempo real.<br/>"
                "• Camada de segurança anti-cópia e agente de conformidade LGPD.<br/>"
                "• O site já está pronto, no ar e testado.",
                body_style
            ),
            Paragraph("<b>R$ 1.200,00</b><br/><font color='#64748b' size='7.5'>Pagamento Único</font>", price_big)
        ],
        [
            Paragraph("<b>Manutenção &amp; Suporte Sob Demanda</b><br/><font color='#0284c7' size='7.5'>Flexibilidade Total</font>", body_style),
            Paragraph(
                "• Atualização de textos, telefones, fotos e convênios.<br/>"
                "• Alterações ou inclusões de novos tratamentos.<br/>"
                "• <b>Sem mensalidade obrigatória fixa presa a contrato.</b><br/>"
                "• Cobrado apenas quando a clínica solicitar uma mudança.",
                body_style
            ),
            Paragraph("<b>R$ 100,00</b><br/><font color='#64748b' size='7.5'>Por alteração mensal</font>", body_bold)
        ],
        [
            Paragraph("<b>Configuração de Domínio Próprio</b><br/><font color='#059669' size='7.5'>BÔNUS EXCLUSIVO</font>", body_style),
            Paragraph(
                "• Auxílio técnico completo no apontamento de DNS quando a clínica adquirir o domínio oficial (ex: <i>cipros.com.br</i>).<br/>"
                "• Configuração do Certificado de Segurança SSL (HTTPS com cadeado de segurança) sem custo adicional.",
                body_style
            ),
            Paragraph("<b>GRÁTIS</b><br/><font color='#059669' size='7.5'>Incluso na proposta</font>", body_bold)
        ]
    ]

    t_pricing = Table(pricing_table_data, colWidths=[135, 265, 120])
    t_pricing.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#005ba9")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('BOX', (0,0), (-1,-1), 1.5, colors.HexColor("#005ba9")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#f8fafc"), colors.white]),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('ALIGN', (2,0), (2,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_pricing)
    story.append(Spacer(1, 12))

    # Comparativo de Valor de Mercado
    story.append(Paragraph("Por que esta é uma oportunidade única para a CIPROS?", h2_style))
    story.append(Paragraph(
        "No mercado de agências de desenvolvimento web, um projeto deste porte com visualizador 3D anatômico, design sob medida e adequação à LGPD custa habitualmente entre <b>R$ 3.500,00 e R$ 6.000,00</b>, além de mensalidades obrigatórias de R$ 300,00 a R$ 600,00.",
        body_style
    ))
    story.append(Paragraph(
        "Com esta proposta, a CIPROS adquire uma <b>solução pronta e testada por apenas R$ 1.200,00</b> e tem a liberdade de pagar somente <b>R$ 100,00</b> quando solicitar qualquer alteração pontual no mês, sem ficar amarrada a contratos longos.",
        body_style
    ))
    story.append(Spacer(1, 8))

    # Tabela Comparativa Resumida
    comp_data = [
        [Paragraph("<b>CRITÉRIO</b>", body_bold), Paragraph("<b>AGÊNCIA TRADICIONAL</b>", body_bold), Paragraph("<b>ESTA PROPOSTA (EZEQUIEL MARQUES)</b>", body_bold)],
        [Paragraph("Tempo de Espera", body_style), Paragraph("30 a 60 dias úteis", body_style), Paragraph("<font color='#059669'><b>Pronto imediatamente (0 dias)</b></font>", body_bold)],
        [Paragraph("Investimento de Criação", body_style), Paragraph("R$ 3.500 a R$ 6.000", body_style), Paragraph("<font color='#059669'><b>Apenas R$ 1.200,00</b></font>", body_bold)],
        [Paragraph("Mensalidade Obrigatória", body_style), Paragraph("Sim (R$ 300 a R$ 600/mês)", body_style), Paragraph("<font color='#059669'><b>Não! Só R$ 100 quando alterar</b></font>", body_bold)],
        [Paragraph("Atlas 3D Interativo", body_style), Paragraph("Raramente oferecido", body_style), Paragraph("<font color='#059669'><b>Incluso e funcionando</b></font>", body_bold)],
    ]
    t_comp = Table(comp_data, colWidths=[130, 180, 210])
    t_comp.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0f172a")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_comp)

    story.append(PageBreak())

    # ========================================================
    # PÁGINA 4: FORMAS DE PAGAMENTO & TERMO DE ACEITE
    # ========================================================
    story.append(Paragraph("4. Formas de Pagamento &amp; Formalização", h1_style))
    story.append(Paragraph(
        "A formalização e liberação definitiva do projeto para a clínica segue termos transparentes e descomplicados:",
        body_style
    ))

    pay_terms = [
        [
            Paragraph("<b>FORMA DE PAGAMENTO:</b>", body_style),
            Paragraph("<b>PIX ou Transferência Bancária</b><br/>• Opção à vista: <b>R$ 1.200,00</b><br/>• Ou 2 parcelas de <b>R$ 600,00</b> (Entrada + 30 dias)", body_style)
        ],
        [
            Paragraph("<b>ENTREGA &amp; TRANSIÇÃO:</b>", body_style),
            Paragraph("Após o aceite, o site é configurado imediatamente no domínio da clínica ou mantido no ar com transferência de acesso aos gestores.", body_style)
        ],
        [
            Paragraph("<b>SUPORTE CONTÍNUO:</b>", body_style),
            Paragraph("Canal direto via WhatsApp com Ezequiel Marques para esclarecimento de dúvidas e solicitação de alterações futuras sob demanda a R$ 100/mudança.", body_style)
        ]
    ]
    t_pay = Table(pay_terms, colWidths=[145, 375])
    t_pay.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_pay)
    story.append(Spacer(1, 15))

    # Bloco de Contato do Desenvolvedor
    story.append(Paragraph("Dados de Contato do Desenvolvedor", h2_style))
    dev_box = [
        [
            Paragraph("<b>Nome:</b>", body_style),
            Paragraph("<b>Ezequiel Marques</b>", body_bold)
        ],
        [
            Paragraph("<b>E-mail:</b>", body_style),
            Paragraph("ezequielmarquesc@gmail.com", body_style)
        ],
        [
            Paragraph("<b>Portfólio / Demonstração CIPROS:</b>", body_style),
            Paragraph("<font color='#005ba9'><u>https://ezequielmdev.github.io/cipros/</u></font>", body_bold)
        ]
    ]
    t_dev = Table(dev_box, colWidths=[145, 375])
    t_dev.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#0284c7")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e0f2fe")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_dev)
    story.append(Spacer(1, 20))

    # Termo de Aceite Formal
    story.append(Paragraph("Termo de Aceite da Proposta", h2_style))
    story.append(Paragraph(
        "Estando de acordo com os termos, escopo e valores apresentados nesta proposta comercial, assinam as partes:",
        body_style
    ))
    story.append(Spacer(1, 25))

    signatures_data = [
        [
            Paragraph("____________________________________________<br/><b>CIPROS Centro de Reabilitação Ltda.</b><br/>Diretoria / Gestão Clínica", ParagraphStyle('Sign1', parent=body_style, alignment=1)),
            Paragraph("____________________________________________<br/><b>Ezequiel Marques</b><br/>Desenvolvedor &amp; Gestor do Projeto", ParagraphStyle('Sign2', parent=body_style, alignment=1))
        ],
        [
            Paragraph("Data: ____ / ____ / 2026", ParagraphStyle('Date1', parent=body_style, alignment=1)),
            Paragraph("Data: ____ / ____ / 2026", ParagraphStyle('Date2', parent=body_style, alignment=1))
        ]
    ]
    t_sign = Table(signatures_data, colWidths=[260, 260])
    t_sign.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_sign)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF gerado com sucesso em: {PDF_PATH}")

if __name__ == "__main__":
    build_pdf()
