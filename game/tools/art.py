"""Original integer-grid art pipeline. No copied game imagery. Pillow is build-only."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import json, random, math, zipfile, wave, struct, subprocess
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets';OUT.mkdir(exist_ok=True)
for sub in ['characters','environments','props','audio','ui']:(OUT/sub).mkdir(exist_ok=True)
INK='#101820';TEAL='#26454b';PAPER='#e4d5ad';AMBER='#e8ac65';LIGHT='#ffe3aa'
font=ImageFont.load_default()
manifest=[]
def save(im,path,**meta):
 im.save(OUT/path,optimize=True)
 manifest.append(dict(file='assets/'+path,width=im.width,height=im.height,creator='Original project artwork',license='Copyright 2026 Shahd Mohamed',source='tools/art.py',integrated=True,**meta))
def rect(d,box,c):d.rectangle(box,fill=c)
def line(d,p,c,w=1):d.line(p,fill=c,width=w)
def text(d,p,s,c=PAPER):d.text(p,s,font=font,fill=c)
def panel(d,b,fill=TEAL):
 rect(d,b,INK);x,y,X,Y=b;rect(d,(x+2,y+2,X-2,Y-2),fill);line(d,[(x+3,Y-3),(x+3,y+3),(X-3,y+3)],'#58716c')
def brick(d,box):
 x,y,X,Y=box
 for row,yy in enumerate(range(y,Y,12)):
  line(d,[(x,yy),(X,yy)],'#293f43')
  for xx in range(x+(-12 if row%2 else 0),X,24):line(d,[(xx,yy),(xx,yy+12)],'#293f43')
def shelf(d,x,y,w,h):
 panel(d,(x,y,x+w,y+h),'#172b30')
 rng=random.Random(x+y)
 for yy in range(y+7,y+h-8,23):
  for xx in range(x+5,x+w-5,7):
   c=rng.choice(['#806954','#778274','#b2a381','#405959'])
   rect(d,(xx,yy,xx+5,yy+16),c);rect(d,(xx+1,yy+4,xx+4,yy+6),'#d1bf96')
  rect(d,(x+2,yy+19,x+w-2,yy+22),'#715f49')
def window(d,x,y,w,h):
 panel(d,(x,y,x+w,y+h),'#69827a')
 rect(d,(x+4,y+4,x+w-4,y+h-4),'#385b65')
 rng=random.Random(11)
 for xx in range(x+5,x+w-5,16):
  H=rng.randrange(15,45);rect(d,(xx,y+h-H,xx+13,y+h-5),'#203943')
  for yy in range(y+h-H+5,y+h-9,9):
   for q in [3,8]:rect(d,(xx+q,yy,xx+q+2,yy+3),rng.choice(['#66867f','#c0aa76','#254450']))
 rect(d,(x+w//2-2,y+3,x+w//2+1,y+h-3),'#68766b');rect(d,(x+3,y+h//2,x+w-3,y+h//2+2),'#68766b')
 line(d,[(x+5,y+h-6),(x+w-6,y+5)],'#507079')
def environment(name):
 im=Image.new('RGB',(480,270),'#132329');d=ImageDraw.Draw(im)
 rect(d,(0,0,479,183),'#284249');brick(d,(0,0,480,184))
 rect(d,(0,126,479,183),'#23383a');rect(d,(0,126,479,130),'#657166')
 rect(d,(0,184,479,269),'#182b30')
 for yy in [191,207,230,261]:line(d,[(0,yy),(480,yy)],'#30413f')
 for xx in range(-200,700,55):line(d,[(240+(xx-240)*.6,184),(xx,270)],'#30413f')
 if name=='office':
  shelf(d,14,86,57,98);panel(d,(86,46,134,113),'#948c70');text(d,(94,54),'04',INK)
  for y in [79,84,89,94]:line(d,[(94,y),(125,y)],'#635f50')
  window(d,324,35,96,105)
  panel(d,(426,57,472,187),'#484a3f');panel(d,(432,68,466,164),'#263737');rect(d,(432,69,466,81),'#6d7867');rect(d,(459,119,462,124),AMBER)
  text(d,(433,85),'EXIT','#909d86');rect(d,(433,49,465,55),'#8fb09a')
  # Service opening: room behind the visitor.
  panel(d,(155,56,291,170),'#14282d');rect(d,(160,61,286,65),'#b7a47f');rect(d,(159,64,162,165),'#526960')
  text(d,(176,43),'CIVIL REGISTRY', '#acb6a2');text(d,(189,68),'WINDOW 04','#657c76')
  rect(d,(139,16,250,22),'#0f242a');rect(d,(142,22,247,25),'#c5d1ab');rect(d,(151,26,239,27),'#6c8371')
  panel(d,(277,20,301,31),'#819184');rect(d,(291,24,300,35),'#11272b');rect(d,(290,26,294,30),'#7fb5a7')
  for x in [147,242]:line(d,[(x,0),(x,16)],'#101e24')
  # The desk has a full work surface for physical documents.
  rect(d,(73,194,425,269),'#342b28');rect(d,(70,191,429,199),'#967750')
  d.polygon([(78,197),(420,197),(448,235),(52,235)],fill='#695641')
  for yy in range(203,236,7):line(d,[(70-(yy-203)//2,yy),(425+(yy-203)//2,yy)],'#76614a')
  rect(d,(53,236,448,245),'#362b27');line(d,[(53,236),(448,236)],'#b2925c')
  panel(d,(100,247,166,269),'#524132');rect(d,(125,254,142,257),'#b5a578')
  # CRT
  panel(d,(145,158,203,202),'#898f7e');panel(d,(151,163,197,192),'#173a3c');text(d,(155,174),'CIVIL', '#a0cbb5');rect(d,(168,203,182,211),'#5d6b64');rect(d,(155,211,196,214),'#92917c')
  for x in range(156,194,5):rect(d,(x,208,x+2,210),'#c2bca0')
  # scanner, printer and telephone
  panel(d,(81,184,140,205),'#8c9c8c');rect(d,(87,187,133,196),'#264d52');line(d,[(85,199),(136,199)],'#d4d1ae')
  panel(d,(363,164,420,197),'#909787');rect(d,(368,154,413,169),'#bac2a9');rect(d,(372,174,410,179),'#263534');rect(d,(373,183,408,185),'#111d21');rect(d,(367,171,370,173),'#d7ae6b')
  d.polygon([(302,187),(334,187),(341,204),(295,204)],fill='#111e23');rect(d,(298,181,336,187),'#688179');rect(d,(298,182,306,191),'#607b74');rect(d,(328,182,336,191),'#607b74')
  for x in range(310,325,5):
   for y in range(194,202,4):rect(d,(x,y,x+2,y+1),'#a3b49b')
  line(d,[(298,188),(292,191),(297,194),(291,198),(296,201)],'#97a795')
  # Brass desk lamp and documents.
  rect(d,(259,179,262,209),'#95825b');rect(d,(251,208,272,211),'#cfb376');d.polygon([(250,165),(270,165),(281,179),(242,179)],fill='#977f4e');line(d,[(244,179),(279,179)],LIGHT)
  for y in range(244,266,6):line(d,[(340,y),(431,y)],'#40332d')
 elif name=='street':
  rect(d,(0,0,480,270),'#18313f');rect(d,(0,139,480,270),'#24383c')
  for i,(xx,w,h) in enumerate([(0,82,133),(87,72,164),(165,66,122),(274,74,153),(353,126,178)]):
   rect(d,(xx,173-h,xx+w,184),'#30464b' if i%2 else '#2a3e47');rect(d,(xx-2,169-h,xx+w+2,174-h),'#687268')
   for yy in range(183-h,159,24):
    for x in range(xx+10,xx+w-8,17):panel(d,(x,yy,x+9,yy+14),'#768577' if (x+yy)%3 else '#beaa77')
   rect(d,(xx+12,155,xx+31,184),'#11252e')
  rect(d,(235,34,268,177),'#182b34');rect(d,(243,47,254,52),AMBER)
  text(d,(16,145),'REGISTRY',PAPER);text(d,(368,129),'HOSPITAL',PAPER)
  for y in range(192,270,10):line(d,[(80,y),(395,y)],'#31464a')
  for x in [36,303]:
   rect(d,(x,98,x+3,219),'#11242b');rect(d,(x-8,94,x+14,98),'#7e8d79');rect(d,(x-6,98,x+12,100),'#ead498');rect(d,(x-10,221,x+16,224),'#718072')
  d.polygon([(36,101),(10,216),(68,216)],fill='#3a4840')
 elif name=='archive':
  shelf(d,8,18,108,169);shelf(d,128,18,87,169);shelf(d,300,18,165,169)
  panel(d,(230,38,286,174),'#14282b');text(d,(239,47),'B-14',AMBER)
  rect(d,(54,219,421,232),'#92744c');rect(d,(63,232,72,270),'#463e32');rect(d,(403,232,412,270),'#463e32')
  for i in range(5):panel(d,(85+i*49,199-i%2*9,125+i*49,216),'#9d916f');
  rect(d,(244,10,253,29),'#8c9a82');rect(d,(218,29,279,34),'#dbce9e')
 elif name=='corridor':
  d.polygon([(0,0),(480,0),(313,53),(167,53)],fill='#364849')
  d.polygon([(0,270),(480,270),(313,184),(167,184)],fill='#35423e')
  panel(d,(169,53,311,183),'#182f36');panel(d,(212,78,269,179),'#344b4c');rect(d,(236,122,240,125),AMBER)
  for xx in [14,84,339,408]:panel(d,(xx,44,xx+51,215),'#354640');panel(d,(xx+5,52,xx+46,141),'#1b333a')
  for y,w in [(12,115),(36,64),(61,30)]:rect(d,(240-w//2,y,240+w//2,y+3),'#d6d5ab')
  text(d,(210,67),'WARD 07',AMBER);line(d,[(0,165),(168,133)],'#ac9d76');line(d,[(480,165),(313,133)],'#ac9d76')
 elif name=='hospital':
  for x in range(0,480,24):line(d,[(x,0),(x,184)],'#395352')
  window(d,183,20,128,91)
  for x in [20,324]:
   panel(d,(x,147,x+121,188),'#b6c3ad');rect(d,(x+7,148,x+39,162),'#d8d4b4');rect(d,(x+20,183,x+24,224),'#819587');rect(d,(x+108,183,x+112,224),'#819587')
   line(d,[(x+112,126),(x+112,46),(x+125,46)],'#a5b6a5',2);rect(d,(x+119,49,x+130,72),'#bed1b6')
  text(d,(26,40),'EMERGENCY',PAPER);rect(d,(40,58,59,62),AMBER);rect(d,(47,51,51,70),AMBER)
  rect(d,(218,162,258,193),'#819888');panel(d,(221,165,255,186),'#17383f')
 elif name=='lab':
  for x in [19,336]:
   panel(d,(x,31,x+122,211),'#385c60');panel(d,(x+13,43,x+109,195),'#193b45')
   line(d,[(x+24,52),(x+24,184)],'#77b7b1',2);line(d,[(x+102,52),(x+102,184)],'#447b80')
   rect(d,(x+21,209,x+104,219),'#98aca0');text(d,(x+39,16),'ECHO-07','#d1c78d')
  panel(d,(171,77,305,134),'#607a72');panel(d,(178,84,298,126),'#193637');text(d,(186,93),'MEMORY / TRANSFER','#8fbdad')
  for x in range(183,286,7):line(d,[(x,116),(x+3,110+(x%5)),(x+7,116)],'#9ac4ae')
  line(d,[(81,223),(81,237),(237,237),(237,141)],'#637b74',3)
 elif name=='memory':
  im=environment('archive');d=ImageDraw.Draw(im)
  rect(d,(0,0,479,14),'#12252e');text(d,(16,1),'THREE YEARS EARLIER  /  TRANSFER 14','#d7ba85')
  panel(d,(164,81,309,212),'#dbcca5');text(d,(181,91),'TRANSFER / 14','#4c594b')
  for i in range(12):line(d,[(180,113+i*6),(293-(i%3)*10,113+i*6)],'#8f9275')
  d.ellipse((264,178,294,206),outline='#854c45',width=3)
 return im
for name in ['office','street','archive','corridor','hospital','lab','memory']:save(environment(name),'environments/'+name+'.png',role='Layered scene plate')
# Distinct facial geometry, headwear, clothing and accessories, with authored animation frames.
cast=[
 ('hassan','#b67d50','#325e73','moustache',0),('omkarim','#c49570','#773f62','scarf',1),('mona','#ad7657','#4c7663','curls',0),('ashraf','#cb9e76','#a07948','glasses',-1),('sameh','#b39475','#606c77','grey',0),('nadia','#be8e72','#6e6384','asymmetric',-1),('mahmoud','#aeab77','#687151','wristband',-2),('hala','#ab795a','#c7d3bf','doctor',-1),('yasser','#ba9066','#617061','uniform',2),('samir','#ba936e','#7d6551','beard',-1),('researcher','#c0a789','#657e79','scientist',-2),('player','#bf926c','#394f59','clerk',0),('coworker','#a6795c','#a0644f','braid',0),('manager','#b88e6e','#683e48','tie',3),('echo','#74a29e','#355c67','echo',-2),('citizen','#af8a61','#425e73','cap',1)]
states=['idle','talk','walk','reach','fear','pain','transform','echo']
def character(data,state,frame):
 name,skin,coat,kind,width=data;im=Image.new('RGBA',(48,80));d=ImageDraw.Draw(im)
 bob=1 if frame in [1,2] and state in ['idle','talk','walk'] else 0
 ox=(frame%2) if state in ['pain','transform'] else 0;cx=24+ox;heady=7+bob
 sick=state in ['transform','echo'];skin=('#96a68a' if state=='transform' else '#77aaa3') if sick else skin
 shadow='#785a48' if not sick else '#48675b'
 # legs, shoes, trouser seams
 stride=3 if state=='walk' and frame%2 else 0
 for xx,sy in [(cx-10,stride),(cx+2,-stride)]:
  rect(d,(xx,57+bob,xx+7,73+sy),INK);rect(d,(xx+1,59+bob,xx+5,71+sy),'#263944');rect(d,(xx-2,73+sy,xx+8,76+sy),INK);line(d,[(xx-1,73+sy),(xx+6,73+sy)],'#657270')
 # shaped jacket
 shoulder=16+width
 d.polygon([(cx-8,31+bob),(cx+8,31+bob),(cx+shoulder,37+bob),(cx+13,60),(cx-13,60),(cx-shoulder,37+bob)],fill=INK)
 d.polygon([(cx-8,33+bob),(cx+8,33+bob),(cx+shoulder-2,38+bob),(cx+10,58),(cx-11,58),(cx-shoulder+2,38+bob)],fill=coat)
 line(d,[(cx-10,39+bob),(cx-9,55)],'#82958a');line(d,[(cx+8,42),(cx+8,57)],'#243d43')
 d.polygon([(cx-7,32+bob),(cx,36+bob),(cx+7,32+bob),(cx+4,42+bob),(cx,38+bob),(cx-4,42+bob)],fill='#d4cab0')
 rect(d,(cx-3,26+bob,cx+3,34+bob),skin)
 # neck and ear geometry
 d.polygon([(cx-8,heady),(cx+7,heady),(cx+10,heady+8),(cx+8,heady+20),(cx+3,heady+24),(cx-4,heady+23),(cx-10,heady+17),(cx-11,heady+7)],fill=INK)
 d.polygon([(cx-7,heady+2),(cx+6,heady+2),(cx+8,heady+8),(cx+6,heady+19),(cx+2,heady+22),(cx-4,heady+21),(cx-8,heady+16),(cx-9,heady+8)],fill=skin)
 rect(d,(cx+5,heady+8,cx+8,heady+16),shadow);rect(d,(cx-11,heady+10,cx-9,heady+15),skin)
 # hair silhouette and unique accessories
 hair='#283136'
 if kind in ['scarf','doctor']:
  if kind=='scarf':
   d.polygon([(cx-13,heady+6),(cx-9,heady-1),(cx+7,heady-1),(cx+13,heady+8),(cx+13,35),(cx+5,39),(cx+7,20),(cx+7,heady+4),(cx-6,heady+3),(cx-9,heady+12),(cx-8,30),(cx-15,37)],fill='#512e4c');line(d,[(cx-11,heady+7),(cx-8,heady+1),(cx+5,heady+1)],'#b58b92')
  else:
   d.ellipse((cx+6,3,cx+15,15),fill=hair);d.polygon([(cx-10,heady+9),(cx-9,heady),(cx+5,heady-2),(cx+9,heady+5),(cx+7,heady+9),(cx+2,heady+3),(cx-6,heady+6)],fill=hair)
 elif kind in ['cap','uniform']:
  rect(d,(cx-11,heady-2,cx+10,heady+4),coat);rect(d,(cx-13,heady+4,cx+12,heady+6),INK);rect(d,(cx-1,heady,cx+2,heady+2),AMBER)
 elif kind=='beard':
  rect(d,(cx-10,heady+3,cx-7,heady+9),'#a4b4a8');d.polygon([(cx-7,heady+15),(cx,heady+19),(cx+6,heady+14),(cx+5,heady+22),(cx-1,heady+25),(cx-7,heady+20)],fill='#b3b7a6')
 elif kind=='curls':
  for xx,yy in [(-10,3),(-7,-1),(-1,-2),(5,-1),(9,4),(-11,9),(9,10)]:d.ellipse((cx+xx-3,heady+yy-3,cx+xx+3,heady+yy+3),fill=hair)
 else:
  d.polygon([(cx-11,heady+8),(cx-10,heady),(cx+4,heady-2),(cx+10,heady+4),(cx+7,heady+7),(cx+1,heady+2),(cx-6,heady+5)],fill=hair)
  if kind in ['scientist','grey']:line(d,[(cx-9,heady+2),(cx-5,heady),(cx+4,heady)],'#bac2b4',2)
  if kind=='asymmetric':d.polygon([(cx-12,heady+3),(cx-4,heady-3),(cx+9,heady+1),(cx-9,heady+12),(cx-11,heady+24)],fill=hair)
  if kind=='braid':
   for yy in range(heady+12,42,4):rect(d,(cx+9,yy,cx+12,yy+3),hair)
 # eye shapes, eyebrows and an asymmetrical nose
 browy=heady+9-(1 if state=='fear' else 0)
 line(d,[(cx-7,browy),(cx-3,browy+(1 if state=='pain' else 0))],INK);line(d,[(cx+2,browy),(cx+6,browy)],INK)
 blink=state=='idle' and frame==3
 for xx in [cx-6,cx+3]:
  rect(d,(xx,heady+11,xx+2,heady+11+(0 if blink else 1)),INK)
  if not blink:rect(d,(xx,heady+11,xx,heady+11),'#d9d1b3' if not sick else '#d8eabc')
 line(d,[(cx,heady+11),(cx-1,heady+16),(cx+2,heady+16)],shadow)
 rect(d,(cx-3,heady+19,cx+3,heady+19+(2 if state=='talk' and frame%2 or state=='fear' else 0)),'#68493e')
 if kind=='moustache':rect(d,(cx-5,heady+17,cx+4,heady+18),'#302e2b')
 if kind in ['glasses','scientist']:
  d.rectangle((cx-9,heady+10,cx-2,heady+14),outline='#d2cbb3');d.rectangle((cx+1,heady+10,cx+7,heady+14),outline='#d2cbb3');line(d,[(cx-2,heady+11),(cx+1,heady+11)],'#d2cbb3')
 if kind=='mona' or kind=='curls':rect(d,(cx-10,heady+17,cx-9,heady+19),AMBER)
 # arms: gestural animation changes actual frame silhouettes
 for side in [-1,1]:
  raised=state in ['talk','reach','fear'] and (side==1 or state=='fear');ax=cx+side*(shoulder-1);ay=37+bob
  by=42-(frame%2)*3 if raised else 53+bob+(stride//2)*side;bx=ax+side*(5 if raised else -1)
  line(d,[(ax,ay),(bx,by)],INK,8);line(d,[(ax,ay),(bx,by)],coat,5);rect(d,(bx-2,by,bx+2,by+4),skin)
  if kind=='scientist' and side==-1:rect(d,(bx-2,by,bx+2,by+4),'#d1ccac');rect(d,(bx-2,by+2,bx,by+4),'#547c84')
 if kind=='doctor':
  line(d,[(cx-6,35),(cx-6,46),(cx+4,46),(cx+4,36)],'#304e53');d.ellipse((cx+2,44,cx+6,48),fill='#b8aa7d');rect(d,(cx+7,39,cx+12,43),AMBER)
 if kind=='uniform':
  for dx in [-12,7]:rect(d,(cx+dx,34,cx+dx+5,37),AMBER)
 if kind in ['tie','clerk','scientist']:d.polygon([(cx,36),(cx+2,41),(cx+1,50),(cx-2,47),(cx-2,41)],fill='#ad7750')
 if kind=='wristband':rect(d,(cx+11,52,cx+17,53),'#d9dec2')
 if kind=='beard':rect(d,(cx-4,48,cx-2,54),AMBER);d.ellipse((cx-5,46,cx-1,50),outline=AMBER)
 if sick or kind=='echo':
  for i in range(5):line(d,[(cx-7+i*4,heady+18),(cx-9+i*4,heady+26+i%2*9)],'#7cc3b7')
  if state=='echo' or kind=='echo':
   for yy in [16,24,40,55]:rect(d,(cx-8,yy,cx+7,yy+1),'#142e37')
   rect(d,(cx-5,heady+10,cx-3,heady+12),'#daf1cc');rect(d,(cx+4,heady+10,cx+6,heady+12),'#daf1cc')
 return im
anim={}
for data in cast:
 sheet=Image.new('RGBA',(192,640))
 for row,state in enumerate(states):
  for frame in range(4):sheet.alpha_composite(character(data,state,frame),(frame*48,row*80))
 save(sheet,'characters/'+data[0]+'.png',frameWidth=48,frameHeight=80,pivot=[24,76],animations=states)
 anim[data[0]]={s:dict(row=i,frames=4,durations=([550,500,550,120] if s=='idle' else [160,130,180,150]),loop=s not in ['reach','transform']) for i,s in enumerate(states)}
(OUT/'characters/animations.json').write_text(json.dumps(anim,indent=2))
# Transparent prop atlas: paper, seal, key, and material detail.
im=Image.new('RGBA',(160,48));d=ImageDraw.Draw(im)
d.polygon([(1,5),(32,5),(39,12),(39,43),(1,43)],fill=INK);d.polygon([(3,7),(30,7),(37,13),(37,41),(3,41)],fill=PAPER);d.polygon([(30,7),(30,14),(37,14)],fill='#a8a180')
for y in [16,20,24,31,35]:line(d,[(7,y),(30-(y%3)*3,y)],'#87907a')
d.ellipse((24,28,34,38),outline='#94594e',width=2)
rect(d,(53,4,70,18),INK);rect(d,(55,5,68,17),'#bb985d');rect(d,(58,16,65,31),'#967645');rect(d,(46,29,78,42),INK);rect(d,(48,31,76,40),'#923f43');line(d,[(48,31),(75,31)],'#df8b6a')
d.ellipse((94,17,107,30),outline=INK,width=5);d.ellipse((95,18,106,29),outline='#d6b16c',width=3);rect(d,(105,23,127,27),'#d6b16c');rect(d,(121,26,125,32),'#a48754')
save(im,'props/desk.png',frameWidth=40,frameHeight=48)
for size in [192,512]:
 icon=Image.new('RGB',(64,64),'#162e35');d=ImageDraw.Draw(icon);d.rectangle((6,6,57,57),outline='#bc985f',width=2);d.ellipse((16,13,48,46),outline='#e3ba74',width=3);rect(d,(28,18,36,35),'#e3ba74');rect(d,(21,35,43,43),'#b15c53');line(d,[(13,51),(51,51)],'#74a49c',2)
 save(icon.resize((size,size),Image.Resampling.NEAREST),'ui/icon-'+str(size)+'.png',role='App icon')
if (OUT/'fonts/NotoSansArabic.ttf').exists():manifest.append(dict(file='assets/fonts/NotoSansArabic.ttf',creator='The Noto Project Authors',source='https://github.com/google/fonts/tree/main/ofl/notosansarabic',license='SIL Open Font License 1.1',integrated=True))
(ROOT/'asset-manifest.json').write_text(json.dumps({'version':'2.0.0','assets':manifest},indent=2))
# Kenney CC0 foley: copy only used recordings and retain exact license.
z=zipfile.ZipFile('/tmp/kenney-impact-sounds.zip');(ROOT/'licenses').mkdir(exist_ok=True)
(ROOT/'licenses/Kenney-Impact-Sounds.txt').write_bytes(z.read('License.txt'))
audio=[]
sounds={'wood':'impactWood_medium','metal':'impactMetal_light','paper':'impactSoft_medium','step':'footstep_concrete','glass':'impactGlass_light','stamp':'impactWood_heavy'}
for key,source in sounds.items():
 for i in range(2):
  src=f'Audio/{source}_{i:03}.ogg';dst=f'assets/audio/{key}-{i}.wav';temporary=Path('/tmp')/f'echoes-{key}-{i}.ogg';temporary.write_bytes(z.read(src))
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-nostdin','-y','-i',str(temporary),'-ac','1','-ar','22050','-c:a','pcm_s16le',str(ROOT/dst)],check=True)
  audio.append(dict(file=dst,event=key,creator='Kenney',source='https://kenney.nl/assets/impact-sounds',download='https://kenney.nl/media/pages/assets/impact-sounds/87b4ddecda-1677589768/kenney_impact-sounds.zip',license='CC0-1.0',accessDate='2026-10-10',modifications='Converted to mono 22050Hz PCM WAV with FFmpeg for common browser support',integrated=True))
# Original, sampled noise-based sound beds; these are designed audio, not field recordings.
rate=22050
for kind,duration in [('rain',6),('hum',6),('echo',3),('printer',2),('phone',1.4),('breath',3),('music',8)]:
 rng=random.Random(kind);last=0;samples=[]
 for i in range(int(rate*duration)):
  t=i/rate;white=rng.uniform(-1,1);last=last*.985+white*.015
  fade=min(1,t/.05,(duration-t)/.05)
  if kind=='rain':v=(white*.13+last*.7)*(0.8+.2*math.sin(t*2.1))
  elif kind=='hum':v=(math.sin(2*math.pi*60*t)*.055+math.sin(2*math.pi*120*t)*.025+last*.12)
  elif kind=='echo':v=(last*.65+math.sin(2*math.pi*(170-17*t)*t)*.06)*math.sin(math.pi*t/duration)**2
  elif kind=='printer':v=(white*.11 if t%.18<.065 else last*.8)*(.7+.3*math.sin(t*93))
  elif kind=='phone':v=(math.sin(t*2*math.pi*540)+math.sin(t*2*math.pi*720))*.09*(t%.6<.35)
  elif kind=='breath':v=last*2*math.sin(math.pi*t/duration)**2
  else:v=sum(math.sin(2*math.pi*f*t)*(.03+.015*math.sin(t*math.pi/4)) for f in [55,82.5,110,164.75])+last*.1
  samples.append(struct.pack('<h',int(max(-1,min(1,v*fade))*32767)))
 path=OUT/f'audio/{kind}.wav'
 with wave.open(str(path),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes(b''.join(samples))
 audio.append(dict(file='assets/audio/'+kind+'.wav',event=kind,creator='Original project sound design',source='tools/art.py',license='Copyright 2026 Shahd Mohamed',accessDate='2026-10-10',modifications='Original seeded noise / harmonic synthesis',integrated=True))
(ROOT/'audio-manifest.json').write_text(json.dumps({'version':'2.0.0','assets':audio},indent=2))
print(f'Created {len(manifest)} original images and {len(audio)} audio assets')
