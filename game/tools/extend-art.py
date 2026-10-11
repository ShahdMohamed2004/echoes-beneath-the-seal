"""Extend original character atlases with authored suspicion and exhaustion frames."""
from PIL import Image,ImageDraw
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1];folder=root/'assets/characters';manifest=json.loads((root/'asset-manifest.json').read_text());animations=json.loads((folder/'animations.json').read_text())
for p in folder.glob('*.png'):
 im=Image.open(p).convert('RGBA');sheet=Image.new('RGBA',(192,800));sheet.paste(im.crop((0,0,192,640)),(0,0))
 for frame in range(4):
  suspicion=im.crop((frame*48,0,frame*48+48,80));d=ImageDraw.Draw(suspicion);d.line([(17,16),(21,18)],fill='#101820',width=1);d.line([(26,18),(30,16)],fill='#101820',width=1);d.rectangle((19,18,20,19),fill='#101820');d.rectangle((27,18,28,19),fill='#101820');d.line([(21,28),(27,28)],fill='#68493e');sheet.paste(suspicion,(frame*48,640))
  original=im.crop((frame*48,0,frame*48+48,80));tired=Image.new('RGBA',(48,80));tired.paste(original.crop((0,0,48,52)),((frame%2),3+(frame//2)));tired.paste(original.crop((0,52,48,80)),(0,52));d=ImageDraw.Draw(tired);d.line([(18,22),(21,22)],fill='#101820');d.line([(27,22),(30,22)],fill='#101820');d.line([(20,25),(22,25)],fill='#826451');sheet.paste(tired,(frame*48,720))
 sheet.save(p,optimize=True)
 for asset in manifest['assets']:
  if asset['file']=='assets/characters/'+p.name:asset.update(height=800,animations=['idle','talk','walk','reach','fear','pain','transform','echo','suspicion','exhaustion'])
 animations[p.stem]['suspicion']={'row':8,'frames':4,'durations':[600,200,600,180],'loop':True};animations[p.stem]['exhaustion']={'row':9,'frames':4,'durations':[650,450,650,200],'loop':True}
manifest['version']='2.1.0';(root/'asset-manifest.json').write_text(json.dumps(manifest,indent=2));(folder/'animations.json').write_text(json.dumps(animations,indent=2));print('16 original atlases extended to ten animation rows')
