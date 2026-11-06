import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

base_dir = r"c:\Users\ezequ\OneDrive\Desktop\Cipros"
slider_dir = os.path.join(base_dir, "assets", "slider")
os.makedirs(slider_dir, exist_ok=True)

# Tamanho padrão do slide (largura 300 x altura 290) - geramos em 2x (600x580) para qualidade Retina
W, H = 600, 580

def create_base_canvas():
    # Canvas transparente (o container do slider já possui o degradê azul escuro)
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))

def draw_glow_circle(draw, cx, cy, r, color):
    for i in range(r, 0, -3):
        alpha = int(color[3] * (i / r) * 0.4)
        draw.ellipse([cx - i, cy - i, cx + i, cy + i], fill=(color[0], color[1], color[2], alpha))

# =========================================================================
# 1. SLIDER JOELHO (Fêmur, Tíbia, Fíbula, Patela, Meniscos e LCA)
# =========================================================================
def make_knee_image():
    im = create_base_canvas()
    d = ImageDraw.Draw(im)
    
    # Brilho de fundo biomecânico
    draw_glow_circle(d, 300, 270, 180, (0, 180, 255, 60))
    
    # 1. Fêmur (extremidade distal com côndilos)
    femur_points = [
        (260, 40), (340, 40),
        (345, 140), (380, 200), (360, 250), (325, 260),
        (300, 240), # Chanfradura intercondilar
        (275, 260), (240, 250), (220, 200), (255, 140)
    ]
    d.polygon(femur_points, fill=(230, 245, 255, 230), outline=(100, 210, 255, 255))
    
    # 2. Tíbia (platô tibial)
    tibia_points = [
        (225, 290), (285, 290), (300, 280), (315, 290), (375, 290),
        (355, 340), (335, 520), (265, 520), (245, 340)
    ]
    d.polygon(tibia_points, fill=(215, 235, 250, 230), outline=(100, 210, 255, 255))
    
    # 3. Fíbula
    fibula_points = [(200, 310), (225, 315), (215, 520), (195, 520)]
    d.polygon(fibula_points, fill=(190, 215, 235, 200), outline=(80, 180, 230, 255))
    
    # 4. Meniscos (Medial e Lateral) em Ciano/Verde
    d.pieslice([225, 265, 295, 295], 0, 180, fill=(34, 197, 94, 230), outline=(180, 255, 200, 255))
    d.pieslice([305, 265, 375, 295], 0, 180, fill=(34, 197, 94, 230), outline=(180, 255, 200, 255))
    
    # 5. Ligamento Cruzado Anterior (LCA) e LCP (em Destaque Dourado/Âmbar)
    d.line([(280, 245), (320, 290)], fill=(245, 158, 11, 255), width=10)
    d.line([(320, 245), (285, 290)], fill=(217, 119, 6, 255), width=8)
    
    # 6. Patela (Rótula) translúcida em posição anterior
    d.ellipse([270, 190, 330, 250], fill=(255, 255, 255, 160), outline=(0, 230, 255, 255), width=3)
    
    # Linhas de tensão e rotação da cartilagem
    d.arc([220, 200, 380, 340], start=30, end=150, fill=(0, 230, 255, 180), width=3)
    
    # Labels Anatômicos
    d.text((270, 15), "FÊMUR", fill=(200, 235, 255, 255))
    d.text((260, 530), "TÍBIA & FÍBULA", fill=(200, 235, 255, 255))
    d.text((395, 275), "MENISCOS & LCA", fill=(74, 222, 128, 255))
    d.line([(365, 280), (390, 280)], fill=(74, 222, 128, 200), width=2)
    
    return im

# =========================================================================
# 2. SLIDER COLUNA VERTEBRAL (Cervical, Torácica, Lombar e Sacro)
# =========================================================================
def make_spine_image():
    im = create_base_canvas()
    d = ImageDraw.Draw(im)
    
    draw_glow_circle(d, 300, 280, 190, (0, 200, 255, 50))
    
    # Curvatura fisiológica da coluna em S (Lordose Cervical, Cifose Torácica, Lordose Lombar, Cifose Sacral)
    total_vertebrae = 18
    for i in range(total_vertebrae):
        prog = i / total_vertebrae
        y = 50 + prog * 440
        # Curva em S
        curve_offset = math.sin(prog * math.pi * 2.2) * 45
        x = 300 + curve_offset
        
        # Corpo vertebral
        vw = 70 + (prog * 35) # Vértebras lombares são mais largas
        vh = 16
        color_v = (225, 245, 255, 240)
        outline_v = (100, 210, 255, 255)
        
        d.rounded_rectangle([x - vw/2, y - vh/2, x + vw/2, y + vh/2], radius=4, fill=color_v, outline=outline_v)
        # Processo espinhoso (lateral)
        d.polygon([(x + vw/2, y), (x + vw/2 + 25, y + 8), (x + vw/2, y + 12)], fill=(180, 220, 245, 200))
        
        # Disco intervertebral em Ciano/Verde brilhante
        if i < total_vertebrae - 1:
            dy = y + vh/2 + 3
            dw = vw * 0.85
            d.rounded_rectangle([x - dw/2, dy, x + dw/2, dy + 5], radius=2, fill=(34, 197, 94, 240))
    
    # Sacro e Cóccix na base
    sacro_pts = [(260, 500), (340, 500), (320, 555), (280, 555)]
    d.polygon(sacro_pts, fill=(200, 230, 250, 230), outline=(100, 210, 255, 255))
    
    # Identificadores das Regiões
    d.text((120, 80), "CERVICAL (C1-C7)", fill=(147, 197, 253, 255))
    d.line([(240, 90), (275, 90)], fill=(147, 197, 253, 180), width=2)
    
    d.text((90, 230), "TORÁCICA (T1-T12)", fill=(147, 197, 253, 255))
    d.line([(220, 240), (265, 240)], fill=(147, 197, 253, 180), width=2)
    
    d.text((110, 390), "LOMBAR (L1-L5)", fill=(74, 222, 128, 255))
    d.line([(220, 400), (275, 400)], fill=(74, 222, 128, 180), width=2)
    
    d.text((360, 520), "SACRO & CÓCCIX", fill=(245, 158, 11, 255))
    
    return im

# =========================================================================
# 3. SLIDER OMBRO & MANGUITO ROTADOR (Glenoumeral, Clavícula e Manguito)
# =========================================================================
def make_shoulder_image():
    im = create_base_canvas()
    d = ImageDraw.Draw(im)
    
    draw_glow_circle(d, 310, 270, 180, (0, 190, 255, 55))
    
    # Clavícula
    d.polygon([(170, 110), (330, 95), (350, 120), (170, 125)], fill=(230, 245, 255, 230), outline=(100, 210, 255, 255))
    
    # Acrômio e Escápula
    scapula = [(220, 150), (360, 125), (355, 170), (270, 380), (220, 240)]
    d.polygon(scapula, fill=(205, 230, 250, 210), outline=(80, 190, 240, 255))
    
    # Cabeça do Úmero (esférica)
    d.ellipse([340, 140, 440, 240], fill=(240, 250, 255, 240), outline=(100, 220, 255, 255), width=3)
    
    # Diáfise do Úmero
    humerus = [(365, 230), (415, 230), (410, 520), (370, 520)]
    d.polygon(humerus, fill=(220, 240, 255, 230), outline=(90, 200, 245, 255))
    
    # Manguito Rotador (Tendão do Supraespinhal em Âmbar/Verde)
    d.polygon([(260, 130), (380, 120), (395, 160), (360, 165)], fill=(245, 158, 11, 220), outline=(255, 215, 0, 255))
    
    # Ventre do Músculo Deltoide (Contorno com linhas radiadas esportivas)
    d.arc([300, 110, 470, 360], start=280, end=110, fill=(34, 197, 94, 220), width=6)
    
    # Labels
    d.text((150, 75), "CLAVÍCULA", fill=(200, 235, 255, 255))
    d.text((160, 280), "ESCÁPULA", fill=(200, 235, 255, 255))
    d.text((370, 90), "MANGUITO ROTADOR", fill=(245, 158, 11, 255))
    d.text((425, 270), "ARTICULAÇÃO", fill=(74, 222, 128, 255))
    d.text((425, 290), "GLENOUMERAL", fill=(74, 222, 128, 255))
    d.text((375, 530), "ÚMERO", fill=(200, 235, 255, 255))
    
    return im

# =========================================================================
# 4. SLIDER CABEÇA, ATM & CERVICAL (Crânio, Mandíbula e ATM)
# =========================================================================
def make_head_image():
    im = create_base_canvas()
    d = ImageDraw.Draw(im)
    
    draw_glow_circle(d, 300, 260, 180, (0, 190, 255, 50))
    
    # Caixa Craniana
    d.ellipse([200, 60, 420, 280], fill=(230, 245, 255, 220), outline=(100, 210, 255, 255), width=3)
    
    # Órbita e Osso Zigomático
    d.ellipse([340, 150, 395, 205], outline=(100, 210, 255, 200), width=2)
    d.line([(310, 210), (370, 210)], fill=(100, 210, 255, 200), width=4)
    
    # Mandíbula (Queixo e Ramo Ascendente)
    mandible = [
        (320, 230), # Fossa mandibular / ATM
        (335, 240), (330, 340), (380, 370), (330, 390), (280, 350), (290, 270)
    ]
    d.polygon(mandible, fill=(215, 235, 250, 230), outline=(80, 200, 245, 255), width=2)
    
    # Destaque da Articulação Temporomandibular (ATM) com Disco Articular
    d.ellipse([305, 220, 335, 250], fill=(34, 197, 94, 240), outline=(255, 255, 255, 255), width=2)
    
    # Vértebras Cervicais Altas (C1 Atlas e C2 Áxis)
    d.rounded_rectangle([230, 290, 285, 315], radius=4, fill=(200, 225, 245, 200), outline=(100, 210, 255, 255))
    d.rounded_rectangle([230, 325, 285, 350], radius=4, fill=(200, 225, 245, 200), outline=(100, 210, 255, 255))
    d.rounded_rectangle([230, 360, 285, 385], radius=4, fill=(200, 225, 245, 200), outline=(100, 210, 255, 255))
    d.rounded_rectangle([230, 395, 285, 420], radius=4, fill=(200, 225, 245, 200), outline=(100, 210, 255, 255))
    
    # Músculo Masseter (Mastigação)
    d.line([(340, 215), (325, 350)], fill=(245, 158, 11, 200), width=10)
    
    # Labels
    d.text((250, 30), "CRÂNIO & FACE", fill=(200, 235, 255, 255))
    d.text((360, 230), "ATM (DISCO ARTICULAR)", fill=(74, 222, 128, 255))
    d.line([(335, 235), (355, 235)], fill=(74, 222, 128, 200), width=2)
    d.text((360, 300), "M. MASSETER", fill=(245, 158, 11, 255))
    d.text((110, 350), "COLUNA CERVICAL", fill=(147, 197, 253, 255))
    d.line([(225, 355), (200, 355)], fill=(147, 197, 253, 180), width=2)
    d.text((370, 400), "MANDÍBULA", fill=(200, 235, 255, 255))
    
    return im

# =========================================================================
# 5. SLIDER BIOMECÂNICA ESPORTIVA E ATLETA (Cadeias Cinemáticas)
# =========================================================================
def make_athlete_image():
    im = create_base_canvas()
    d = ImageDraw.Draw(im)
    
    draw_glow_circle(d, 300, 270, 190, (0, 210, 180, 55))
    
    # Silhueta de Atleta em Movimento com Vetores de Força Biomecânicos
    # Cabeça
    d.ellipse([270, 50, 330, 110], fill=(230, 245, 255, 240), outline=(0, 230, 255, 255), width=2)
    
    # Coluna e Tronco
    d.line([(300, 110), (280, 250)], fill=(100, 220, 255, 255), width=8)
    
    # Braço anterior (flexão e impulsão)
    d.line([(295, 130), (360, 180), (410, 140)], fill=(74, 222, 128, 255), width=6)
    d.ellipse([355, 175, 365, 185], fill=(255, 255, 255, 255))
    
    # Braço posterior
    d.line([(295, 130), (230, 170), (190, 220)], fill=(56, 189, 248, 255), width=6)
    
    # Pelve e Quadril
    d.ellipse([250, 240, 310, 270], fill=(200, 235, 255, 220), outline=(100, 210, 255, 255))
    
    # Perna dianteira (flexão de quadril e joelho)
    d.line([(290, 260), (370, 330), (350, 450), (380, 460)], fill=(245, 158, 11, 255), width=8)
    d.ellipse([365, 325, 375, 335], fill=(255, 255, 255, 255)) # Joelho
    
    # Perna traseira (extensão e propulsão)
    d.line([(270, 260), (200, 350), (170, 480), (140, 500)], fill=(74, 222, 128, 255), width=8)
    d.ellipse([195, 345, 205, 355], fill=(255, 255, 255, 255)) # Joelho
    
    # Vetores de Força e Eixos Cinemáticos
    d.arc([160, 220, 440, 480], start=200, end=350, fill=(0, 255, 200, 160), width=3)
    d.line([(370, 330), (430, 300)], fill=(255, 215, 0, 255), width=3) # Vetor de aceleração
    
    # Labels
    d.text((210, 15), "BIOMECÂNICA ESPORTIVA", fill=(0, 230, 255, 255))
    d.text((420, 120), "CADEIA CINÉTICA", fill=(74, 222, 128, 255))
    d.text((420, 140), "SUPERIOR", fill=(74, 222, 128, 255))
    d.text((70, 330), "PROPULSÃO &", fill=(245, 158, 11, 255))
    d.text((70, 350), "ISQUIOTIBIAIS", fill=(245, 158, 11, 255))
    d.text((230, 520), "CENTRO DE MASSA & EQUILÍBRIO", fill=(200, 235, 255, 255))
    
    return im

# Gerar e salvar cada slide anatômico
slides = [
    ("slider_joelho.png", make_knee_image()),
    ("slider_coluna.png", make_spine_image()),
    ("slider_ombro.png", make_shoulder_image()),
    ("slider_cabeca.png", make_head_image()),
    ("slider_atleta.png", make_athlete_image()),
]

for filename, img in slides:
    dest = os.path.join(slider_dir, filename)
    img.save(dest, "PNG")
    print(f"Salvo: {filename} ({img.size})")

print("Todos os slides anatômicos foram gerados com sucesso!")
