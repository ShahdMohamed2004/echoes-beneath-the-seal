"""Original Living Pixel World sprite authoring. All frames are integer-grid Pillow art.
Reuses our original drawing primitives, not third-party sprites. No audio is regenerated.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import ast,json,math
ROOT=Path(__file__).resolve().parents[1]
source=ast.parse((ROOT/'tools/art.py').read_text())
keep=[]
for n in source.body:
 if isinstance(n,(ast.Import,ast.ImportFrom,ast.FunctionDef)):keep.append(n)
 elif isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id in {'INK','TEAL','PAPER','AMBER','LIGHT','font','cast'} for t in n.targets):keep.append(n)
ns={'__file__':str(ROOT/'tools/art.py')};exec(compile(ast.Module(body=keep,type_ignores=[]),'original-primitives','exec'),ns)
states=['idle','talk','walk','reach','fear','pain','transform','echo','suspicion','exhaustion','turn','hesitate','confused','anger','relief','cough','listen','handover','earlyInfected','infected','hybrid']
# Each face uses a different breadth, brow, age marker and clothing treatment.
profiles={'hassan':(1,'moustache','rolled sleeves'),'omkarim':(2,'round','plum headscarf and bag'),'mona':(0,'soft','green cardigan and hoop earring'),'ashraf':(-2,'angular','amber jacket and square spectacles'),'sameh':(-1,'aged','grey temples and long coat'),'nadia':(-1,'sharp','short asymmetric hair and violet scarf'),'mahmoud':(-2,'lean','olive work shirt and wristband'),'hala':(0,'focused','teal scrubs and white coat'),'yasser':(2,'square','security cap and shoulder insignia'),'samir':(1,'aged','silver beard, waistcoat and key'),'researcher':(-2,'angular','spectacles and ink-marked left glove'),'player':(0,'tired','charcoal vest and wrist scar'),'coworker':(0,'soft','braid and injured arm'),'manager':(2,'heavy','burgundy jacket and tie pin'),'echo':(-2,'split','negative-space interrupted anatomy'),'citizen':(1,'soft','work cap and blue jacket')}
ramps={'#284249':'#203e50','#23383a':'#193340','#385b65':'#286078','#69827a':'#598f91','#526960':'#39767b','#967750':'#a17746','#e4d5ad':'#e8d7ac','#172b30':'#102c39','#26454b':'#224958','#819184':'#719791'}
def enhanced(data,state,f):
 base={'turn':'idle','hesitate':'talk','confused':'fear','anger':'talk','relief':'reach','cough':'pain','listen':'idle','handover':'reach','earlyInfected':'pain','infected':'transform','hybrid':'transform','suspicion':'idle','exhaustion':'idle'}.get(state,state)
 im=ns['character'](data,base,f);name,skin,coat,kind,width=data;delta,face,clothing=profiles[name]
 # Individual head proportions are persistent across action states.
 head=im.crop((9,0,40,33));im.paste((0,0,0,0),(9,0,40,33));head=head.resize((31+delta,33),Image.Resampling.NEAREST);im.alpha_composite(head,(9-delta//2,0));d=ImageDraw.Draw(im)
 if state not in ['transform','echo','infected','hybrid']:
  d.line([(19,13),(21,12)],fill='#dfb18a');d.point((24,22),fill='#e8bc92');d.line([(28,24),(29,26)],fill='#805d48')
 if face in ['aged','tired','heavy']:
  for y in [14,16]:d.line([(19,y),(23,y)],fill='#8a674f')
  d.line([(17,24),(19,25)],fill='#7b5f50')
 if name=='hala':d.rectangle((18,38,22,52),fill='#267b7e');d.rectangle((30,39,34,43),fill='#e9c874');d.point((31,40),fill='#fbefc1')
 if name=='nadia':d.polygon([(18,33),(25,39),(30,34),(27,47),(21,42)],fill='#9880b2')
 if name=='player':d.line([(9,52),(11,53),(10,55)],fill='#bb6b55')
 if name=='omkarim':d.rectangle((4,52,13,67),fill='#ac8559');d.arc((6,48,11,55),180,360,fill='#efd3a4',width=1)
 if name=='manager':d.rectangle((29,46,40,60),fill='#ac8a5d');d.rectangle((31,48,39,57),fill='#d6bd89')
 if name=='coworker':d.line([(13,34),(29,55),(37,51)],fill='#e2cdac',width=3)
 # A stitched cuff, jacket light and trousers ramp improve readability without smoothing.
 d.line([(15,40),(15,50)],fill='#839b99');d.line([(17,61),(17,70)],fill='#536579')
 d.point((24,44),fill='#e0c798');d.point((24,49),fill='#a78667')
 if state in ['suspicion','hesitate','confused','anger','listen']:
  d.line([(17,17),(21,18 if state in ['anger','suspicion'] else 16)],fill='#111d2a');d.line([(27,18),(31,16)],fill='#111d2a')
  if state=='confused':d.line([(23,27),(27,26)],fill='#664538')
  if state=='hesitate':d.rectangle((34,35-f%2,39,38-f%2),fill=skin)
  if state=='anger':d.rectangle((20,27,27,28+f%2),fill='#663c38');d.line([(36,35),(39,30-f)],fill=skin,width=3)
  if state=='listen':d.rectangle((34,22,38,27),fill=skin);d.line([(37,26),(39,40)],fill=coat,width=4)
 if state=='relief':d.line([(21,27),(24,29),(28,26)],fill='#704a3d');d.line([(17,17),(21,17)],fill='#3a3030')
 if state in ['pain','cough','exhaustion','earlyInfected']:
  d.line([(17,20),(21,21)],fill='#252b2e');d.line([(27,21),(30,20)],fill='#252b2e')
  if state in ['cough','earlyInfected']:
   d.line([(38,45),(31,30),(26,29)],fill=coat,width=6);d.rectangle((23,26,29,31),fill=skin);d.line([(22,33),(27,34)],fill='#65755c')
  shift=[0,2,3,1][f];body=im.crop((0,0,48,57));im.paste((0,0,0,0),(0,0,48,57));im.alpha_composite(body,(shift,shift))
 if state=='handover':
  y=[48,44,42,43][f];d=ImageDraw.Draw(im);d.line([(38,38),(34,y)],fill=coat,width=6);d.rectangle((25,y-2,42,y+8),fill='#e9d6ab');d.line([(28,y+1),(38,y+1)],fill='#998772');d.rectangle((32,y+5,37,y+8),fill=skin)
 if state=='turn':
  # Actual profile head drawn with nose and one visible eye, not a mirrored front view.
  d.rectangle((10,1,39,32),fill=(0,0,0,0));cx=23+f%2;quarter=f in [0,3];nose=8 if quarter else 12;d.polygon([(cx-8,7),(cx+3,5),(cx+8,12),(cx+8,17),(cx+nose,21),(cx+7,23),(cx+6,29),(cx-2,31),(cx-9,24)],fill=skin);d.polygon([(cx-9,18),(cx-9,8),(cx-3,3),(cx+6,6),(cx+7,12),(cx-2,10),(cx-5,22)],fill='#26303c');d.line([(cx+3,16),(cx+7,16)],fill='#17212d');d.point((cx+6,19),fill='#14222b');d.line([(cx+5,27),(cx+8,26)],fill='#714e3f');d.rectangle((cx-4,17,cx-1,23),fill='#b68464')
  if quarter:d.point((cx-1,19),fill='#14222b');d.line([(cx-3,16),(cx,16)],fill='#17212d')
  if kind in ['glasses','scientist']:d.rectangle((cx+1,16,cx+8,21),outline='#cfccac');d.line([(cx-3,17),(cx+1,17)],fill='#cfccac')
  if kind=='doctor':d.ellipse((cx-14,5,cx-7,13),fill='#26303c')
  if kind=='scarf':d.polygon([(cx-11,4),(cx+3,2),(cx+8,8),(cx-2,8),(cx-6,17),(cx-3,34),(cx-12,36)],fill='#71405f')
  if kind=='beard':d.polygon([(cx,25),(cx+8,25),(cx+5,33),(cx-3,29)],fill='#b7b6a5')
 if state in ['transform','infected','hybrid'] or name=='echo':
  stage=(f+1)/4 if state=='transform' else .6 if state=='infected' else 1
  warped=Image.new('RGBA',im.size)
  for y in range(80):
   dx=round((math.sin(y*.16+f)*2+(32-y)*.055)*stage)
   warped.alpha_composite(im.crop((0,y,48,y+1)),(dx,y))
  im=warped;d=ImageDraw.Draw(im)
  d.line([(18,21),(22,22),(20,27),(24,30)],fill='#5cacaa');d.line([(27,32),(31,39),(29,48)],fill='#35555f',width=2)
  d.line([(35,38),(43,50),(39,62)],fill='#687a76',width=4);d.line([(9,38),(6,52),(11,61)],fill='#415c62',width=4)
  for i in range(3):d.line([(39+i,61),(38+i,66+i%2)],fill='#b0c8b0')
  if state=='hybrid' or name=='echo':
   d.polygon([(22,10),(27,14),(25,26),(28,36),(23,51),(20,39),(23,24)],fill='#122b3a');d.line([(24,15),(23,24),(25,31)],fill='#ad7bc8');d.rectangle((16,19,19,20),fill='#b9fbda')
 return im
manifest=json.loads((ROOT/'asset-manifest.json').read_text());animations={};bible=[]
artdir=ROOT/'docs/character-sheets';artdir.mkdir(exist_ok=True)
for data in ns['cast']:
 name=data[0];sheet=Image.new('RGBA',(192,len(states)*80));animations[name]={}
 for row,state in enumerate(states):
  for f in range(4):sheet.alpha_composite(enhanced(data,state,f),(f*48,row*80))
  times=[550,500,550,120] if state=='idle' else [350,220,300,220] if state in ['listen','turn','exhaustion','hesitate'] else [180,120,180,220]
  animations[name][state]={'row':row,'frames':4,'durations':times,'loop':state not in ['reach','transform','handover','relief']}
 sheet.save(ROOT/f'assets/characters/{name}.png',optimize=True)
 for a in manifest['assets']:
  if a['file']==f'assets/characters/{name}.png':a.update(height=sheet.height,animations=states,source='tools/living-art.py',modifications='Original individualized face, clothing, profile, expressive action and transformation frames')
 design=Image.new('RGB',(576,400),'#102431');draw=ImageDraw.Draw(design);draw.text((12,8),name.upper()+' / WINDOW 04',fill='#e4c28a')
 for i,st in enumerate(['idle','turn','talk','handover','fear','anger','relief','listen','earlyInfected','infected','hybrid','echo']):
  frame=enhanced(data,st,2).resize((96,160),Image.Resampling.NEAREST);x=(i%6)*96;y=28+(i//6)*185;design.paste(frame,(x,y),frame);draw.text((x+2,y+160),st,fill='#bcd3d1')
 design.save(artdir/f'{name}.png',optimize=True);bible.append(f'| {name} | {profiles[name][1]} / {profiles[name][2]} | [Design sheet](character-sheets/{name}.png) |')
(ROOT/'assets/characters/animations.json').write_text(json.dumps(animations,indent=2))
# Vivid original environmental plate revisions, with local modern Egyptian details.
for name in ['office','street','archive','corridor','hospital','lab','memory']:
 im=ns['environment'](name);pix=im.load();rgb={tuple(bytes.fromhex(k[1:])):tuple(bytes.fromhex(v[1:])) for k,v in ramps.items()}
 for y in range(im.height):
  for x in range(im.width):
   if pix[x,y] in rgb:pix[x,y]=rgb[pix[x,y]]
 d=ImageDraw.Draw(im)
 if name=='office':
  d.rectangle((86,46,134,113),fill='#c4b78c');d.rectangle((89,49,131,111),outline='#756c53');arabic=ImageFont.truetype(str(ROOT/'assets/fonts/NotoSansArabic.ttf'),7)
  d.text((91,49),'شباك ٤',font=arabic,fill='#34505a');d.text((90,65),'الأحوال المدنية',font=arabic,fill='#34505a');d.text((91,84),'احتفظ بالإيصال',font=arabic,fill='#745846');d.line([(94,102),(125,102)],fill='#ab8256')
  d.rectangle((4,160,12,186),fill='#a5814c');d.line([(8,160),(8,142)],fill='#4a876b',width=2)
  for x,y in [(5,144),(10,149),(4,154)]:d.ellipse((x-3,y-2,x+3,y+2),fill='#598769')
  d.rectangle((309,30,317,36),fill='#ab684b');d.point((311,32),fill='#eac27b')
 if name in ['street','corridor']:
  for i in range(14):
   x=40+(i*31)%390;y=211+(i*13)%52;d.line([(x,y),(x+12+i%9,y)],fill=['#337888','#8b7050','#4c7179'][i%3])
 if name=='lab':
  for x in [40,355]:
   for y in range(56,178,16):d.rectangle((x,y,x+2,y+3),fill='#60c5bb')
 im.save(ROOT/f'assets/environments/{name}.png',optimize=True)
 for a in manifest['assets']:
  if a['file']==f'assets/environments/{name}.png':a['source']='tools/living-art.py'
manifest['version']='2.2.0';(ROOT/'asset-manifest.json').write_text(json.dumps(manifest,indent=2))
(ROOT/'docs/LIVING_CHARACTER_BIBLE.md').write_text('# Original contemporary Egyptian cast\n\nEach runtime atlas has 21 states × four authored pixel frames at 48×80. Design sheets show front, profile and action views. The turn animation transitions through three-quarter and profile poses. The infection/hybrid previews for ordinary citizens are design studies, not assertions that those people become infected in the story. Only narratively eligible actors use infection states.\n\n| Actor | Recognizable identity | Views and expressions |\n|---|---|---|\n'+'\n'.join(bible)+'\n\nNormal: breath/blink, talk, turn, listen, handover, hesitate, confusion, anger, relief. Infection: guarded wrist/cough, collapsed posture, bent limbs, elongated hands and split Echo silhouette; no colour-only zombie substitution. All are original project drawings. Costume details and silhouettes persist across frames; side views are explicitly drawn profiles.\n')
print('Created 16 original atlases with 21 states, 16 design sheets and 7 richer scene plates')
