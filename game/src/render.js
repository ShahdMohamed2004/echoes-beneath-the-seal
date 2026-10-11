import {drawDesk} from './desk-render.js';
import {assetURL} from './assets.js';
import {CAST,CINEMATICS,HOTSPOTS} from './content.js';
import {currentCase} from './core.js';
const STATES=['idle','talk','walk','reach','fear','pain','transform','echo','suspicion','exhaustion'];
const suspicious=(s,c)=>c&&s.inspected[c.id]&&c.a!=='ok';
export class Animator{
 constructor(){this.state='idle';this.elapsed=0;}
 set(state){if(state!==this.state){this.state=state;this.elapsed=0;}}
 update(dt,reduced){this.elapsed+=reduced?0:dt;const timings=this.state==='idle'?[.55,.5,.55,.12]:this.state==='suspicion'?[.6,.2,.6,.18]:this.state==='exhaustion'?[.65,.45,.65,.2]:[.16,.13,.18,.15],total=timings.reduce((a,b)=>a+b,0);let t=['reach','transform'].includes(this.state)?Math.min(this.elapsed,total-.001):this.elapsed%total;let f=0;while(f<3&&t>=timings[f])t-=timings[f++];return{frame:f,row:STATES.indexOf(this.state)};}
}
export class Renderer{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d',{alpha:false});this.ctx.imageSmoothingEnabled=false;this.images=new Map();this.actor=new Animator();this.particles=[];this.time=0;this.failed=[];this.hover=null;}
 async load(){const files=[...CAST.map(c=>'characters/'+c[0]+'.png'),...['office','street','archive','corridor','hospital','lab','memory'].map(n=>'environments/'+n+'.png'),'props/desk.png'];await Promise.all(files.map(f=>new Promise(resolve=>{const image=new Image();image.onload=()=>{this.images.set(f,image);resolve();};image.onerror=()=>{this.failed.push(f);resolve();};image.src=assetURL('assets/'+f);})));}
 burst(x,y,color='#c6e0b0',n=12){for(let i=0;i<n&&this.particles.length<80;i++)this.particles.push({x,y,vx:Math.cos(i*2.4)*12,vy:Math.sin(i*2.4)*12-10,life:1+i%3*.12,color});}
 sprite(id,state,x,y,frame=0,scale=1){const im=this.images.get('characters/'+id+'.png');if(!im)return;this.ctx.drawImage(im,frame*48,Math.max(0,STATES.indexOf(state))*80,48,80,Math.round(x),Math.round(y),48*scale,80*scale);}
 background(name){const im=this.images.get('environments/'+name+'.png');if(im)this.ctx.drawImage(im,0,0);else{this.ctx.fillStyle='#203c43';this.ctx.fillRect(0,0,480,270);}}
 glow(cx,cy,r,color,alpha=.3){const x=this.ctx;x.save();x.globalCompositeOperation='screen';x.globalAlpha=alpha;const g=x.createRadialGradient(cx,cy,2,cx,cy,r);g.addColorStop(0,color);g.addColorStop(1,'transparent');x.fillStyle=g;x.fillRect(cx-r,cy-r,r*2,r*2);x.restore();}
 draw(state,physics,dt,cinemaTime=0){const x=this.ctx;this.time+=state?.settings.reducedMotion?0:dt;const t=this.time;x.imageSmoothingEnabled=false;
  if(state?.cinematic){x.fillStyle='#101e27';x.fillRect(0,0,480,420);x.save();x.translate(0,54);this.cinematic(state,cinemaTime);x.restore();return;}
  this.background('office');
  const day=state?.day||1,world=state?.world||{lights:true,lamp:true};
  // Pixel-aligned weather, restricted to the window; no cross-device effect substitution.
  if(day>=3){x.save();x.beginPath();x.rect(330,39,86,95);x.clip();x.fillStyle='#9bbeb5';x.globalAlpha=.4;for(let i=0;i<33;i++){const px=330+(i*29+t*7)%86,py=39+(i*37+t*70)%95;x.fillRect(Math.floor(px),Math.floor(py),1,4);}x.restore();}
  if(day>=7){for(let i=0;i<Math.min(5,day-5);i++){x.fillStyle='#111f2a';x.fillRect(337+i*15,119+Math.round(Math.sin(t+i)),3,11);x.fillStyle='#90ac89';x.fillRect(337+i*15,116,3,3);}}
  if(state?.flags.amb){x.fillStyle='#d4d4b3';x.fillRect(349,126,30,9);x.fillStyle='#b95955';x.fillRect(361,123,5,3);}
  if(day>=9){x.strokeStyle='#172c31';x.beginPath();x.moveTo(387,46);x.lineTo(380,63);x.lineTo(391,76);x.lineTo(377,94);x.stroke();}
  if(state?.world.drawer){x.fillStyle='#111e22';x.fillRect(103,248,61,20);x.fillStyle='#e1d1a9';x.fillRect(113,249,39,5);}
  if(world.barricade){x.fillStyle='#987854';x.save();x.translate(449,145);x.rotate(-.3);x.fillRect(-22,-2,44,5);x.restore();}
  if(world.archive){x.fillStyle='#111f24';x.fillRect(21,136,43,14);}
  const c=state&&currentCase(state),actor=c&&['citizen','result'].includes(state.phase)?c.actor:day===6?'yasser':day===8?'hala':day===9?'samir':[2,5,13,14].includes(day)?'researcher':null;
  if(actor){const token=actor+':'+state.phase+':'+state.caseIndex;if(token!==this.dialogueToken){this.dialogueToken=token;this.talkUntil=t+4.5;}const anim=world.transform&&actor==='mahmoud'?'transform':state.phase==='result'?(state.lastChoice?.correct?'reach':'fear'):state.phase==='citizen'?(suspicious(state,c)?'suspicion':t<this.talkUntil?'talk':'idle'):day>=10?'exhaustion':actor==='researcher'?'suspicion':'idle';this.actor.set(anim);const pose=this.actor.update(dt,state.settings.reducedMotion);x.save();x.beginPath();x.rect(162,65,124,104);x.clip();this.sprite(actor,anim,199,82,pose.frame);x.restore();}
  if(day<5){this.sprite('citizen','idle',14,116,Math.floor(t)%4,.65);this.sprite('mona','idle',52,117,Math.floor(t+1)%4,.65);}
  x.fillStyle='#99764e';x.fillRect(156,167,132,4);x.fillStyle='#3e382f';x.fillRect(156,171,132,5);
  if(day>=10||!world.lights){x.fillStyle=world.lights?'rgba(10,24,32,.22)':'rgba(6,16,29,.6)';x.fillRect(0,0,480,270);}
  if(world.lights){this.glow(194,27,145,'#e9c78e',.18);x.fillStyle='#e4d5ab';x.fillRect(142,22,105,3);}
  if(world.lamp){this.glow(261,204,72,'#f2c987',.33);x.fillStyle='#ecd5a0';x.fillRect(247,178,29,2);}
  if(world.threat>.4){this.glow(447,128,34,'#b95356',world.threat*.2);}
  // Physical props render above the lighting mask, so evidence remains readable.
  if(physics&&false){const atlas=this.images.get('props/desk.png');x.strokeStyle='#8d7856';x.lineWidth=1;x.beginPath();physics.rope.forEach((p,i)=>i?x.lineTo(Math.round(p.x),Math.round(p.y)):x.moveTo(Math.round(p.x),Math.round(p.y)));x.stroke();
   for(const b of physics.bodies){if(b.id==='key'&&!state?.flags.key)continue;x.save();x.translate(Math.round(b.x),Math.round(b.y));x.rotate(b.angle);x.fillStyle='rgba(9,18,22,.35)';x.fillRect(-b.w/2+3,b.h/2-2,b.w,4);if(atlas)x.drawImage(atlas,{paper:0,seal:40,key:80}[b.id],0,40,48,-20,-24,40,48);x.restore();}
   if(world.imprint>0){const p=physics.body('paper');this.glow(p.x,p.y,35,'#7dd7bb',world.imprint*.4);x.fillStyle='#79b6a0';for(let i=0;i<3;i++)x.fillRect(Math.round(p.x)-11,Math.round(p.y)-7+i*5,16+i*2,1);}
  }
  if(world.printer!=='idle'){x.fillStyle=world.printer==='jam'?'#d87866':'#c6d3b0';x.fillRect(368,171,3,3);if(world.printer==='printing'||world.printer==='ready'){x.fillStyle='#ddceab';x.fillRect(378,186,23,world.printer==='ready'?22:8+Math.floor(t*5)%14);}}
  if(day===9&&state.phase==='investigate'){this.glow(317,187,18,'#e8b976',.18);x.strokeStyle='#b9d1b5';x.strokeRect(297,178,43,29);}
  if(this.hover){const r=HOTSPOTS.find(h=>h.id===this.hover)?.rect;if(r){x.strokeStyle='#e2c596';x.lineWidth=1;x.strokeRect(r[0]-.5,r[1]-.5,r[2]+1,r[3]+1);}}
  if(!state?.settings.reducedMotion){for(let i=this.particles.length-1;i>=0;i--){const p=this.particles[i];p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=9*dt;if(p.life<=0){this.particles.splice(i,1);continue;}x.globalAlpha=Math.min(1,p.life);x.fillStyle=p.color;x.fillRect(Math.round(p.x),Math.round(p.y),1,1);}x.globalAlpha=1;
   if(world.lights)for(let i=0;i<9;i++){x.fillStyle='rgba(220,208,164,.3)';x.fillRect(Math.floor(165+(i*37+t*2)%100),Math.floor(42+(i*17+t*4)%103),1,1);}}
  drawDesk(this,state,physics,this.desk);
  if(!state){x.fillStyle='rgba(9,23,28,.3)';x.fillRect(0,0,480,270);this.glow(262,204,90,'#dfac60',.15);}
 }
 cinematic(s,elapsed){const ending=s.cinematic===16,endingScenes={true:['street','player',0],truth:['office','hala',1],silence:['archive','manager',2],surv:['street','player',4],inf:['corridor','mahmoud',3],sac:['corridor','player',1],loop:['memory','researcher',2],file:['memory','player',0]},ep=endingScenes[s.ending]||endingScenes.file,c=ending?{location:ep[0],actor:ep[1],composition:ep[2]}:CINEMATICS[s.cinematic-1];this.background(c.location);const x=this.ctx;const t=s.settings.reducedMotion?1.5:elapsed;const f=Math.floor(t/.18)%4;const positions=[110,290,218,165,310];const px=positions[c.composition];
  this.sprite(c.actor,c.day===4||c.day===10||ending&&s.ending==='inf'?'transform':c.day===14||ending&&s.ending==='file'?'reach':c.day===6||ending&&s.ending==='surv'?'walk':'idle',px,108+(c.location==='street'?35:0),f,1.35);
  if(ending&&s.ending==='true'){this.sprite('hala','reach',285,150,f);this.sprite('samir','idle',338,156,f);}
  if(ending&&s.ending==='sac'){this.sprite('echo','echo',218,112,f);x.fillStyle='#c9b786';x.fillRect(341,200,28,9);}
  if(ending&&s.ending==='silence'){x.fillStyle='#111e27';x.fillRect(55,200,320,40);}
  if(ending&&s.ending==='loop'){x.globalAlpha=.35;this.sprite('player','echo',113,113,f);x.globalAlpha=1;}
  if(c.day===12)this.sprite('echo','echo',70,110,f,1.1);
  if(c.day===11&&s.flags.share)this.sprite('hala','reach',295,115,f);
  if(c.day===7&&s.flags.amb){x.fillStyle='#d7d9b7';x.fillRect(312,177,69,30);x.fillStyle='#a64a51';x.fillRect(333,170,14,6);}
  if(c.day===5||c.day===14){x.fillStyle='#dccba5';x.fillRect(190,203,51,31);x.strokeStyle='#91b29b';x.strokeRect(192,205,47,27);}
  if(c.day===2||c.day===13){x.fillStyle='#d9c59e';x.fillRect(239,206,38,Math.min(40,10+t*5));}
  if(c.day===9){x.strokeStyle='#ceaf6e';x.lineWidth=3;x.beginPath();x.arc(200,213,6,0,Math.PI*2);x.moveTo(207,213);x.lineTo(230,213);x.stroke();}
  this.glow(px+24,151,120,ending?'#9fc1b0':'#d6b685',.18);x.fillStyle='rgba(8,19,26,.4)';x.fillRect(0,0,480,19);x.fillRect(0,247,480,23);
  const fade=Math.max(0,1-elapsed*2);if(fade){x.fillStyle=`rgba(9,20,26,${fade})`;x.fillRect(0,0,480,270);}
 }
}
