import os
from PIL import Image
import numpy as np

base_dir = r'c:\Users\ezequ\OneDrive\Desktop\Cipros'
user_up = r'C:/Users/ezequ/.gemini/antigravity/brain/c65e1b67-863f-4d31-9de5-c38ba7ba711c/.user_uploaded'

img_paths = {
    'home_top': os.path.join(user_up, 'media_1793358180898.png'),
    'home_bottom': os.path.join(user_up, 'media_1793358189984.png'),
    'conv1': os.path.join(user_up, 'media_1793358248609.png'),
    'conv2': os.path.join(user_up, 'media_1793358253405.png'),
    'conv3': os.path.join(user_up, 'media_1793358258291.png'),
    'conv4': os.path.join(user_up, 'media_1793358304440.png'),
    'home_full': os.path.join(user_up, 'media_1793358329810.png'),
    'quem_somos': os.path.join(user_up, 'media_1793358337135.png'),
    'instalacoes': os.path.join(user_up, 'media_1793358921510.png'),
    'localizacao': os.path.join(user_up, 'media_1793358938715.png')
}

# 1. Extract Logo
im_top = Image.open(img_paths['home_top']).convert('RGBA')
logo = im_top.crop((265, 8, 605, 172))
logo.save(os.path.join(base_dir, 'assets', 'logo', 'cipros_logo.png'))
print('Saved logo!')

# 2. Extract Knee and Runner Slider Images
# In home_top and home_bottom, let's stitch the complete knee illustration:
im_bot = Image.open(img_paths['home_bottom']).convert('RGBA')
knee_top = im_top.crop((287, 412, 442, 493))
knee_bot = im_bot.crop((287, 0, 442, 98))
knee_full = Image.new('RGBA', (155, 81 + 98))
knee_full.paste(knee_top, (0, 0))
knee_full.paste(knee_bot, (0, 81))
knee_full.save(os.path.join(base_dir, 'assets', 'slider', 'slider_joelho.png'))
print('Saved knee slider full image!')

# In home_full: extract arm / runner anatomical figure
im_full = Image.open(img_paths['home_full']).convert('RGBA')
arr_full = np.array(im_full)
# Region around y: 220..470, x: 80..200
sub_r = arr_full[230:470, 80:200]
runner = im_full.crop((85, 230, 195, 470))
runner.save(os.path.join(base_dir, 'assets', 'slider', 'slider_atleta.png'))
print('Saved runner slider image!')

# 3. Extract Quem Somos Caduceus Symbol
im_qs = Image.open(img_paths['quem_somos']).convert('RGBA')
arr_qs = np.array(im_qs)
sub_cad = arr_qs[110:250, 90:200]
mask = (sub_cad[:, :, :3] < 240).any(axis=2)
coords = np.argwhere(mask)
if len(coords):
    y0, x0 = coords.min(axis=0)
    y1, x1 = coords.max(axis=0)
    caduceus = im_qs.crop((90 + x0 - 3, 110 + y0 - 3, 90 + x1 + 3, 110 + y1 + 3))
else:
    caduceus = im_qs.crop((95, 120, 190, 230))
caduceus.save(os.path.join(base_dir, 'assets', 'images', 'fisioterapia_simbolo.png'))
print('Saved caduceus symbol!')

# 4. Extract Trabalhe Conosco Graphic
tc = im_bot.crop((143, 302, 248, 436))
tc.save(os.path.join(base_dir, 'assets', 'images', 'trabalhe_conosco.png'))
print('Saved trabalhe conosco!')

# 5. Extract Maps from Localização
im_loc = Image.open(img_paths['localizacao']).convert('RGBA')
# Left map (Porto Alegre):
map_poa = im_loc.crop((90, 269, 430, 680))
map_poa.save(os.path.join(base_dir, 'assets', 'images', 'map_poa.png'))
# Right map (São Leopoldo):
map_saoleo = im_loc.crop((435, 269, 775, 680))
map_saoleo.save(os.path.join(base_dir, 'assets', 'images', 'map_saoleo.png'))
print('Saved maps!')

# 6. Extract Individual Convênios
# Each convênios row has 6 slots.
# Let's write a function to crop each slot from an image row:
def extract_row_logos(img_path, y_top, y_bot, names):
    im = Image.open(img_path).convert('RGBA')
    W, H = im.size
    # The box is roughly x from 30..950 or 50..940
    # Let's locate the outer black/gray frame
    arr = np.array(im)
    sub = arr[y_top:y_bot, :]
    # detect vertical columns
    # We have 6 equal slots
    x_start = 34
    x_end = W - 75 if W > 900 else W - 40
    slot_w = (x_end - x_start) / 6.0
    for idx, name in enumerate(names):
        if not name:
            continue
        xs = int(x_start + idx * slot_w)
        xe = int(xs + slot_w)
        # crop slot
        slot = im.crop((xs + 4, y_top + 4, xe - 4, y_bot - 4))
        # tighten bounding box of content inside slot
        slot_arr = np.array(slot)
        mask = (slot_arr[:, :, :3] < 248).any(axis=2)
        c = np.argwhere(mask)
        if len(c):
            sy0, sx0 = c.min(axis=0)
            sy1, sx1 = c.max(axis=0)
            # add small padding
            pad = 6
            cropped = slot.crop((max(0, sx0 - pad), max(0, sy0 - pad), min(slot.width, sx1 + pad), min(slot.height, sy1 + pad)))
        else:
            cropped = slot
        out_name = f'convenio_{name.lower().replace(" ", "_")}.png'
        cropped.save(os.path.join(base_dir, 'assets', 'convenios', out_name))
        print(f'Saved {out_name}')

# conv1: AFMSL, Golden Cross, SAS, CASSI, IPE, AGAPOI
extract_row_logos(img_paths['conv1'], 55, 205, ['afmsl', 'golden_cross', 'sas', 'cassi', 'ipe', 'agapoi'])

# conv2: Unimed POA, Prontomed, Fatima, Bradesco, Assefaz, Unimed
extract_row_logos(img_paths['conv2'], 50, 185, ['unimed_poa', 'prontomed', 'fatima_saude', 'bradesco_saude', 'assefaz', 'unimed'])

# conv3: Centro Medico Sao Leo, Saude PAS, SulAmerica, Social Saude, Amil Medial, Correios
extract_row_logos(img_paths['conv3'], 55, 200, ['centro_medico_sl', 'saude_pas', 'sulamerica', 'social_saude', 'amil_medial', 'correios'])

# conv4: Walmart, IBCM, Fusex, GEAP, Capesaude, AFM
extract_row_logos(img_paths['conv4'], 45, 180, ['walmart', 'ibcm', 'fusex', 'geap', 'capesaude', 'afm'])

print('All assets extracted successfully!')
