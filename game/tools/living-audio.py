"""Select and normalize eight CC0 sound effects; keep source and modifications explicit."""
from pathlib import Path
import zipfile,json,subprocess,hashlib
ROOT=Path(__file__).resolve().parents[1];pack=Path('/tmp/echoes-cc0-living.zip')
items={'thunder':('thunder_01',5),'ventilation':('loop_machine_02',8),'traffic':('loop_highway',8),'door':('door_02',2),'lock':('lock_open_01',1.5),'switch':('switch_01',1),'creak':('wood_03',2),'glass-break':('glass_03',2)}
manifest=json.loads((ROOT/'audio-manifest.json').read_text());manifest['version']='2.2.0'
with zipfile.ZipFile(pack) as z:
 for name,(source,duration) in items.items():
  original='sfx100v2_'+source+'.ogg';tmp=Path('/tmp')/original;tmp.write_bytes(z.read(original));target=ROOT/f'assets/audio/{name}.wav'
  subprocess.run(['ffmpeg','-nostdin','-hide_banner','-loglevel','error','-y','-i',str(tmp),'-t',str(duration),'-ac','1','-ar','16000','-af','alimiter=limit=0.8:level=false','-c:a','pcm_s16le',str(target)],check=True)
  manifest['assets']=[a for a in manifest['assets'] if a['file']!=f'assets/audio/{name}.wav']
  manifest['assets'].append({'file':f'assets/audio/{name}.wav','event':name,'creator':'rubberduck','source':'https://opengameart.org/content/100-cc0-sfx-2','download':'https://opengameart.org/sites/default/files/sfx_100_v2.zip','originalFile':original,'license':'CC0-1.0','licenseURL':'https://creativecommons.org/publicdomain/zero/1.0/','accessDate':'2026-10-11','modifications':f'Trimmed to at most {duration}s, mono 16000Hz PCM, peak limited; runtime crossfade/spatial treatment','integrated':True,'sha256':hashlib.sha256(target.read_bytes()).hexdigest()})
(ROOT/'audio-manifest.json').write_text(json.dumps(manifest,indent=2));(ROOT/'licenses/rubberduck-CC0.txt').write_text('100 CC0 SFX #2 — rubberduck\nSource: https://opengameart.org/content/100-cc0-sfx-2\nDownload: https://opengameart.org/sites/default/files/sfx_100_v2.zip\nThe source asset page identifies this pack as CC0 (verified 2026-10-11).\nCC0 1.0 Universal: https://creativecommons.org/publicdomain/zero/1.0/\nLegal text: https://creativecommons.org/publicdomain/zero/1.0/legalcode\nNo additional restrictions stated on the source page. Attribution retained voluntarily.\nThe download contains audio files; this provenance notice is not a claim that a separate license file was packaged with it.\nSelected files and all modifications are listed in audio-manifest.json.\n')
print(json.dumps({'sounds':len(manifest['assets']),'added':list(items),'bytes':sum((ROOT/a['file']).stat().st_size for a in manifest['assets'])}))
