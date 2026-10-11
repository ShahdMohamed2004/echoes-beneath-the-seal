from pathlib import Path
import zipfile,json,subprocess,hashlib
ROOT=Path(__file__).resolve().parents[1];items={'breath-m':('Human/breath-male.wav',1.5),'breath-f':('Human/breath-female.wav',1.5),'cough':('Human/cough1.wav',1.2),'gasp':('Human/gasp1.wav',.8),'laugh':('Human/laugh1.wav',.9),'hush':('Human/shh1.wav',.7)}
m=json.loads((ROOT/'audio-manifest.json').read_text())
with zipfile.ZipFile('/tmp/echoes-owlish.zip') as z:
 for name,(file,length) in items.items():
  tmp=Path('/tmp')/('echoes-voice-'+name+'.wav');tmp.write_bytes(z.read(file));dst=ROOT/f'assets/audio/{name}.wav'
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-nostdin','-y','-i',str(tmp),'-af','silenceremove=start_periods=1:start_threshold=-45dB,alimiter=limit=0.8:level=false,afade=t=in:d=0.02','-t',str(length),'-ac','1','-ar','16000','-c:a','pcm_s16le',str(dst)],check=True)
  m['assets']=[a for a in m['assets'] if a['file']!=f'assets/audio/{name}.wav'];m['assets'].append({'file':f'assets/audio/{name}.wav','event':name,'creator':'OwlishMedia','source':'https://opengameart.org/content/sound-effects-pack','download':'https://opengameart.org/sites/default/files/Owlish%20Media%20Sound%20Effects.zip','originalFile':file,'license':'CC0-1.0','licenseURL':'https://creativecommons.org/publicdomain/zero/1.0/','accessDate':'2026-10-11','modifications':'Leading silence trimmed; short nonverbal excerpt, peak-limited, mono 16000Hz PCM; contextual pitch/spatial treatment','integrated':True,'sha256':hashlib.sha256(dst.read_bytes()).hexdigest()})
(ROOT/'audio-manifest.json').write_text(json.dumps(m,indent=2));(ROOT/'licenses/OwlishMedia-CC0.txt').write_text('OwlishMedia Sound Effects Pack\nhttps://opengameart.org/content/sound-effects-pack\nSource page lists CC0 1.0 Universal, verified 2026-10-11.\nhttps://creativecommons.org/publicdomain/zero/1.0/\nNo attribution requirement or additional restriction is stated. Credit retained voluntarily.\nSix selected nonverbal human sound excerpts are listed with original filenames and modifications in audio-manifest.json. No unselected pack sounds are redistributed.\n')
print('Integrated six CC0 nonverbal human recordings; total sounds:',len(m['assets']))
