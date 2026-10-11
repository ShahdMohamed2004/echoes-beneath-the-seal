export const WIDTH=480,HEIGHT=420,STEP=1/120;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export function toWorld(clientX,clientY,rect){return{x:(clientX-rect.left)*WIDTH/rect.width,y:(clientY-rect.top)*HEIGHT/rect.height};}
export function localPoint(b,p){const dx=p.x-b.x,dy=p.y-b.y,c=Math.cos(b.angle),s=Math.sin(b.angle);return{x:dx*c+dy*s,y:-dx*s+dy*c};}
export function contains(b,p,padding=0){const q=localPoint(b,p);return Math.abs(q.x)<=b.w/2+padding&&Math.abs(q.y)<=b.h/2+padding;}
const PAPER=['paper','record','folder'];
export class Physics{
 constructor(onImpact=()=>{}){this.onImpact=onImpact;this.acc=0;this.held=null;this.target=null;this.rope=Array.from({length:18},()=>({x:447,y:383,px:447,py:383}));this.reset();}
 reset(saved){this.held=null;this.acc=0;const defs=[['folder',63,291,72,84,1.3,6],['record',302,278,116,126,.4,4.8],['paper',171,274,116,138,.24,4],['seal',402,326,36,45,3,10],['key',69,372,38,17,.55,5],['torch',404,245,36,28,1,8],['lens',280,377,45,48,1.2,8]];this.bodies=defs.map(([id,x,y,w,h,mass,friction])=>{const q=saved?.find(v=>v.id===id);return{id,x:q?.x??x,y:q?.y??y,w,h,mass,friction,restitution:id==='key'?.35:.13,vx:0,vy:0,z:0,vz:0,angle:q?.angle||0,omega:0,cooldown:0,px:q?.x??x,py:q?.y??y};});}
 body(id){return this.bodies.find(b=>b.id===id);}
 ordered(){return this.bodies.filter(b=>b!==this.held).concat(this.held?[this.held]:[]);}
 hit(p,padding=0,enabled=()=>true){return this.ordered().reverse().find(b=>enabled(b)&&contains(b,p,padding));}
 grab(id,p){const b=this.body(id);if(!b)return;this.held=b;this.target=p;this.offset={x:b.x-p.x,y:b.y-p.y};b.vx=b.vy=b.omega=0;b.z=PAPER.includes(id)?3:8;}
 move(p){if(this.held)this.target=p;}
 release(cancel=false){const b=this.held;if(b){if(cancel)b.vx=b.vy=0;b.vx=clamp(b.vx,-180,180);b.vy=clamp(b.vy,-180,180);b.omega=cancel?0:clamp(b.vx/500,-.8,.8);b.vz=0;}this.held=null;this.target=null;return b;}
 place(id,x,y){const b=this.body(id);if(b){b.x=x;b.y=y;b.px=x;b.py=y;b.vx=b.vy=b.omega=0;b.angle=0;b.z=0;}}
 rotate(id,angle=.12){const b=this.body(id);if(b)b.angle=clamp(b.angle+angle,-.55,.55);}
 snapshot(){return this.bodies.map(({id,x,y,angle})=>({id,x,y,angle}));}
 update(dt,wind=0){this.acc+=Math.min(.1,Math.max(0,dt));let steps=0;while(this.acc>=STEP&&steps++<12){this.step(STEP,wind);this.acc-=STEP;}}
 step(dt,wind){for(const b of this.bodies){b.px=b.x;b.py=b.y;b.cooldown=Math.max(0,b.cooldown-dt);
  const half=Math.hypot(b.w,b.h)/2*.8;
  if(b===this.held){const tx=clamp(this.target.x+this.offset.x,10+half,470-half),ty=clamp(this.target.y+this.offset.y,197+b.h/2,409-b.h/2),factor=1-Math.exp(-(b.id==='lens'?80*(this.lensSensitivity||1):55)*dt);const ox=b.x,oy=b.y;b.x+=(tx-b.x)*factor;b.y+=(ty-b.y)*factor;b.vx=(b.x-ox)/dt;b.vy=(b.y-oy)/dt;continue;}
  if(PAPER.includes(b.id))b.vx+=wind*dt/b.mass;b.vx*=Math.exp(-b.friction*dt);b.vy*=Math.exp(-b.friction*dt);b.x+=b.vx*dt;b.y+=b.vy*dt;b.angle=clamp(b.angle+b.omega*dt,-.55,.55);b.omega*=Math.exp(-7*dt);
  if(b.z>0||b.vz!==0){b.vz-=700*dt;b.z+=b.vz*dt;if(b.z<=0){const v=Math.abs(b.vz);b.z=0;b.vz=v<35?0:v*b.restitution;if(v>40&&b.cooldown===0){this.onImpact(b.id,v,b.x);b.cooldown=.2;}}}
  for(const [axis,low,high] of [['x',10+half,470-half],['y',197+b.h/2,409-b.h/2]])if(b[axis]<low||b[axis]>high){const v='v'+axis;b[axis]=clamp(b[axis],low,high);if(Math.abs(b[v])>35&&b.cooldown===0){this.onImpact(b.id,Math.abs(b[v]),b.x);b.cooldown=.2;}b[v]*=-b.restitution;}
  if(Math.abs(b.vx)<.04)b.vx=0;if(Math.abs(b.vy)<.04)b.vy=0;
 }
 // Sheets overlap on separate layers. Solid tools transfer momentum on the desk; a lifted tool can contact paper.
 const tools=this.bodies.filter(b=>!PAPER.includes(b.id)&&b!==this.held&&b.z<1);for(let i=0;i<tools.length;i++)for(let j=i+1;j<tools.length;j++){const a=tools[i],b=tools[j],dx=b.x-a.x,dy=b.y-a.y,rx=(a.w+b.w)/2-Math.abs(dx),ry=(a.h+b.h)/2-Math.abs(dy);if(rx<=0||ry<=0)continue;const axis=rx<ry?'x':'y',overlap=Math.min(rx,ry),dir=Math.sign(b[axis]-a[axis])||1,ia=1/a.mass,ib=1/b.mass,total=ia+ib;a[axis]-=dir*overlap*ia/total;b[axis]+=dir*overlap*ib/total;const v='v'+axis,rel=(b[v]-a[v])*dir;if(rel<0){const impulse=-(1+.15)*rel/total;a[v]-=dir*impulse*ia;b[v]+=dir*impulse*ib;if(Math.abs(rel)>35)this.onImpact(b.id,Math.abs(rel),b.x);}}
 const seal=this.body('seal'),r=this.rope;for(let i=1;i<r.length-1;i++){const p=r[i],vx=(p.x-p.px)*.96,vy=(p.y-p.py)*.96;p.px=p.x;p.py=p.y;p.x+=vx;p.y=Math.min(411,p.y+vy+20*dt*dt);}for(let pass=0;pass<7;pass++){r[0].x=464;r[0].y=402;r.at(-1).x=seal.x;r.at(-1).y=seal.y+16;const length=Math.max(5.5,Math.hypot(464-seal.x,402-seal.y-16)/(r.length-1));for(let i=0;i<r.length-1;i++){const a=r[i],b=r[i+1],dx=b.x-a.x,dy=b.y-a.y,d=(Math.hypot(dx,dy)||1),k=(d-length)/d*.5;if(i){a.x+=dx*k;a.y+=dy*k;}if(i+1<r.length-1){b.x-=dx*k;b.y-=dy*k;}}}
 }
}
