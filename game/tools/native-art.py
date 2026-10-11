from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
root=Path(__file__).resolve().parents[1];icon=Image.open(root/'assets/ui/icon-512.png').convert('RGB')
for f in (root/'android/app/src/main/res').glob('mipmap-*/*.png'):
 old=Image.open(f);icon.resize(old.size,Image.Resampling.NEAREST).save(f,optimize=True)
for f in list((root/'android/app/src/main/res').glob('drawable*/splash.png'))+list((root/'ios/App/App/Assets.xcassets/Splash.imageset').glob('*.png')):
 old=Image.open(f);im=Image.new('RGB',old.size,'#142c34');side=min(old.size)//4;mark=icon.resize((side,side),Image.Resampling.NEAREST);im.paste(mark,((im.width-side)//2,(im.height-side)//2));im.save(f,optimize=True)
icon.resize((1024,1024),Image.Resampling.NEAREST).save(root/'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png',optimize=True)
print('Native launcher icons and splash screens use original Echoes artwork')
(root/'src-tauri/icons').mkdir(parents=True,exist_ok=True)
icon.save(root/'src-tauri/icons/icon.png')
icon.save(root/'src-tauri/icons/icon.ico',sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
icon.resize((1024,1024),Image.Resampling.NEAREST).save(root/'src-tauri/icons/icon.icns')
