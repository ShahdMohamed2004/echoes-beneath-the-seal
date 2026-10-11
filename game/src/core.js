import {deskState} from './desk-state.js';
import {CITIZENS,DECISIONS,DEDUCTIONS,REQUIREMENTS,GREETINGS,EVIDENCE} from './content.js';
export const SAVE_KEY='echoes.save.v3',BACKUP_KEY='echoes.save.backup',META_KEY='echoes.meta.v1';
export const clone=v=>JSON.parse(JSON.stringify(v));
export function hash(s){let n=2166136261;for(const c of String(s)){n^=c.charCodeAt(0);n=Math.imul(n,16777619);}return n>>>0;}
export function random(s){s.rng=(s.rng+0x6D2B79F5)>>>0;let t=s.rng;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;}
export function fresh(seed=Date.now(),lang='ar',meta={}){
 seed=Number.isFinite(seed)?seed>>>0:hash(seed);
 const s={desk:deskState(),version:3,seed,rng:seed,day:1,caseIndex:0,phase:'intro',cinematic:1,ending:null,language:lang==='en'?'en':'ar',evidence:{},deductions:{},flags:{},inventory:{food:1,med:0},infection:0,relationships:{hala:0,yasser:0,salim:0},history:{},previousVariants:meta.lastVariants||{},cases:{},inspected:{},asked:{},requirements:{},world:{lights:true,lamp:true,drawer:false,door:false,window:false,archive:false,barricade:false,noise:0,threat:0,printer:'idle',printJob:null,printed:[],imprint:0,transform:0},props:null,log:[],settings:{master:.65,music:.25,ambience:.4,effects:.65,muted:false,reducedMotion:false,captions:true,textSize:1}};
 for(let d=1;d<=4;d++)s.cases[d]=CITIZENS[d-1].c.map((c,i)=>({...clone(c),actor:['hassan','omkarim','mona','ashraf','sameh','nadia','mahmoud'][[0,2,4,6][d-1]+i]}));
 // Optional clerical case varies in both its request and correct administrative response.
 const extra=[
 {nm:{ar:'ليلى منصور',en:'Layla Mansour'},dob:'1991-07-10',id:'L314',rec:{nm:1,dob:'1991-07-10',s:'alive'},rq:{ar:'نسخة سجل مصدّقة',en:'Certified registry copy'},say:{ar:'المستشفى طلب نسخة أصلية قبل النقل.','en':'The hospital needs an authenticated copy before the transfer.'},a:'ok',w:{ar:'النسخة والهوية متطابقتان.','en':'Copy and identity match.'},actor:'citizen'},
 {nm:{ar:'عادل سالم',en:'Adel Salem'},dob:'1974-02-19',id:'A314',rec:{nm:1,dob:'1974-12-19',s:'alive'},rq:{ar:'تصحيح تاريخ مولود',en:'Birth-date correction'},say:{ar:'اليوم صح، لكن الشهر مش هو.','en':'The day is right; the month is not.'},a:'no',w:{ar:'التاريخ مختلف. مطلوب نموذج تصحيح.','en':'The dates differ. A correction form is required.'},actor:'citizen'}
 ];
 s.cases[2].splice(1,0,clone(extra[Math.floor(random(s)*extra.length)]));
 return s;
}
export function variant(s,key,count){if(s.history[key]!==undefined)return s.history[key];let choices=Array.from({length:count},(_,i)=>i).filter(i=>count<2||i!==s.previousVariants[key]);const v=choices[Math.floor(random(s)*choices.length)];s.history[key]=v;return v;}
export function greeting(s,c){const pool=GREETINGS[c.actor]||GREETINGS.default;return pool[variant(s,c.id,pool.length)];}
export function currentCase(s){return s.cases[s.day]?.[s.caseIndex]||null;}
export function addEvidence(s,id){if(s.evidence[id])return false;s.evidence[id]={day:s.day};return true;}
export function requirement(s,id){if(REQUIREMENTS[s.day]===id){s.requirements[s.day]=true;if(s.phase==='investigate')s.phase='choice';return true;}return false;}
export function next(s){
 if(s.cinematic){s.cinematic=0;return;}
 if(s.phase==='intro'){s.phase='citizen';return;}
 if(s.phase==='result'){s.caseIndex++;if(s.caseIndex<s.cases[s.day].length)s.phase='citizen';else s.phase='dayEnd';return;}
 if(s.phase==='dayEnd'||s.phase==='decisionResult'){s.day++;s.caseIndex=0;s.cinematic=s.day;s.phase=s.day<5?'intro':s.day===15?'final':'investigate';s.world.printer='idle';s.world.printJob=null;s.world.noise=0;s.world.threat=0;s.props=null;s.world.imprint=0;
  if(s.day===8&&s.flags.doc===1){s.inventory.med++;}
  if(s.day===11&&s.flags.lock)s.world.barricade=true;
  if(s.day>=12&&s.infection&&s.inventory.med>0){s.inventory.med--;s.infection=0;s.flags.cured=true;}
  return;
 }
}
export function inspectCase(s){const c=currentCase(s);if(c)s.inspected[c.id]=true;}
export function chooseCase(s,choice){if(s.phase!=='citizen'||s.cinematic)return{ok:false,reason:'phase'};const c=currentCase(s);if(choice==='fl'&&!s.inspected[c.id])return{ok:false,reason:'proof'};s.lastChoice={choice,correct:choice===c.a,explanation:c.w};s.log.push({day:s.day,case:c.id,choice,correct:s.lastChoice.correct});if(choice===c.a&&choice==='fl')addEvidence(s,'c'+c.id);if(c.id==='8112056')addEvidence(s,'s07');s.phase='result';if(s.day===4)s.world.transform=1;return{ok:true};}
export function chooseDay(s,index){if(s.phase!=='choice'||s.cinematic||!s.requirements[s.day]||![0,1,2].includes(index))return false;
 if(index===0&&s.day===12&&!s.flags.sec&&!s.flags.key)return false;
 if(index!==1&&s.day===13&&!s.world.printed.includes('echo'))return false;
 if(index===0&&s.day===14&&!s.evidence.self)return false;
 if(index===2&&!(s.day===6&&s.evidence.cctv||s.day===8&&s.evidence.hala||s.day===13&&s.evidence.researcher))return false;
 const mapped=index===2?0:index,entry=DECISIONS[s.day-5],flag=entry[6+mapped];s.flags[flag]=1;s.choiceIndex=mapped;s.phase='decisionResult';s.log.push({day:s.day,choice:index,flag});
 if(flag==='doc'){s.relationships.hala++;s.inventory.med++;addEvidence(s,'hala');}
 if(flag==='sec')s.relationships.yasser++;
 if(flag==='mgr')addEvidence(s,'transfer');
 if(flag==='share')s.inventory.food=Math.max(0,s.inventory.food-1);
 if(flag==='greed')s.inventory.food+=2;
 if(flag==='help')s.infection=1;
 if(flag==='exp'){s.inventory.med++;addEvidence(s,'s07');}
 if(flag==='safe')s.inventory.med++;
 if(flag==='lock')s.world.barricade=true;
 if(flag==='echo')addEvidence(s,'echo');
 if(flag==='wipe'){s.flags.echo=0;s.flags.wipe=1;}
 if(flag==='self')addEvidence(s,'self');
 if(index===2){s.flags['negotiated'+s.day]=true;if(s.day===13)s.relationships.salim++;}
 return true;
}
export function deduce(s,a,b,claim){const rule=DEDUCTIONS.find(r=>(r.a===a&&r.b===b)||(r.b===a&&r.a===b));if(!rule||!s.evidence[a]||!s.evidence[b]||claim!==rule.id)return false;s.deductions[rule.id]=true;return true;}
export function resolveEnding(s,choice){
 if(choice==='truth')return !s.flags.echo||s.flags.wipe?'silence':DEDUCTIONS.every(d=>s.deductions[d.id])&&s.evidence.s07&&s.flags.self?'true':'truth';
 if(choice==='silence')return'silence';
 if(choice==='sac'&&(s.flags.share||s.inventory.med>0))return'sac';
 if(choice==='leave'||choice==='sac')return s.infection?'inf':'surv';
 if(choice==='file')return!s.flags.self?'silence':s.deductions.erasure&&s.evidence.self?'loop':'file';
 return null;
}
export function finish(s,choice){if(s.phase!=='final'||s.cinematic)return false;const end=resolveEnding(s,choice);if(!end)return false;s.ending=end;s.phase='ending';s.cinematic=16;return true;}
const boolMap=(v)=>{const o={};if(v&&typeof v==='object'&&!Array.isArray(v))for(const [k,x] of Object.entries(v).slice(0,500))if(/^[a-zA-Z0-9:_-]{1,70}$/.test(k)&&k!=='__proto__'&&x)o[k]=true;return o;};
const clamp=(v,a,b,f=a)=>Number.isFinite(v)?Math.max(a,Math.min(b,v)):f;
export function validateSave(q){
 if(!q||typeof q!=='object'||Array.isArray(q))throw Error('Invalid save');
 if(q.version!==3){if(q.ST&&Number.isInteger(q.day)&&q.day>=1&&q.day<=15)return migrateLegacy(q);throw Error('Unsupported save version');}
 if(!Number.isInteger(q.day)||q.day<1||q.day>15)throw Error('Invalid day');
 const phases=['intro','citizen','result','dayEnd','investigate','choice','decisionResult','final','ending'];
 if(!phases.includes(q.phase))throw Error('Invalid phase');
 const s=fresh(clamp(q.seed,0,4294967295),q.language);s.seed=q.seed>>>0;s.rng=(q.rng??s.seed)>>>0;s.day=q.day;s.phase=q.phase;
 s.caseIndex=Math.floor(clamp(q.caseIndex,0,(s.cases[q.day]?.length||1)-1));
 // Cases are regenerated from the saved seed; imported narrative text is never trusted.
 for(const k of ['flags','deductions','requirements','inspected','asked'])s[k]=boolMap(q[k]);
 s.evidence={};for(const[k,v]of Object.entries(boolMap(q.evidence)))s.evidence[k]={day:Math.floor(clamp(q.evidence[k]?.day,1,15,s.day))};s.infection=q.infection?1:0;s.inventory={food:Math.floor(clamp(q.inventory?.food,0,99)),med:Math.floor(clamp(q.inventory?.med,0,99))};
 for(const k of ['hala','yasser','salim'])s.relationships[k]=clamp(q.relationships?.[k],-10,10);
 s.history={};s.previousVariants={};for(const field of ['history','previousVariants'])for(const[k,v]of Object.entries(q[field]||{}).slice(0,100))if(/^[\w:-]{1,70}$/.test(k)&&Number.isInteger(v)&&v>=0&&v<=20)s[field][k]=v;
 for(const k of ['lights','lamp','drawer','door','window','archive','barricade'])s.world[k]=typeof q.world?.[k]==='boolean'?q.world[k]:s.world[k];
 s.world.transform=clamp(q.world?.transform,0,3);s.world.imprint=clamp(q.world?.imprint,0,1);s.world.threat=clamp(q.world?.threat,0,1);
 s.world.printer=['idle','printing','jam','ready'].includes(q.world?.printer)?q.world.printer:'idle';s.world.printJob=['hala','yas','deleted','s07','echo','self'].includes(q.world?.printJob)?q.world.printJob:null;if(s.world.printer!=='idle'&&!s.world.printJob)s.world.printer='idle';
 s.world.printed=(q.world?.printed||[]).filter(k=>['hala','yas','deleted','s07','echo','self'].includes(k));
 s.props=Array.isArray(q.props)?q.props.filter(b=>['paper','record','folder','seal','key','lens','torch'].includes(b.id)).map(b=>({id:b.id,x:clamp(b.x,40,440),y:clamp(b.y,220,390),angle:clamp(b.angle,-.55,.55)})):null;if(!q.desk)s.props=null;
 s.cinematic=Number.isInteger(q.cinematic)&&q.cinematic>=0&&q.cinematic<=16?q.cinematic:0;
 s.ending=['true','truth','silence','surv','inf','sac','loop','file'].includes(q.ending)?q.ending:null;if(s.phase==='ending'&&!s.ending)throw Error('Missing ending');
 s.choiceIndex=q.choiceIndex===1?1:0;
 if(q.lastChoice){const c=currentCase(s);if(c)s.lastChoice={choice:['ok','no','fl'].includes(q.lastChoice.choice)?q.lastChoice.choice:'ok',correct:!!q.lastChoice.correct,explanation:c.w};}
 for(const k of ['master','music','ambience','effects'])s.settings[k]=clamp(q.settings?.[k],0,1,s.settings[k]);for(const k of ['muted','reducedMotion','captions'])s.settings[k]=!!q.settings?.[k];s.settings.textSize=clamp(q.settings?.textSize,.9,1.4,1);
 s.log=Array.isArray(q.log)?q.log.slice(-200).filter(v=>v&&typeof v==='object').map(v=>({day:Math.floor(clamp(v.day,1,15)),choice:['ok','no','fl',0,1,2,'0','1','2'].includes(v.choice)?v.choice:'',...(v.case?{case:String(v.case).slice(0,30),correct:!!v.correct}:{}),...(v.flag&&/^[a-z0-9]+$/.test(v.flag)?{flag:v.flag}:{})})):[];
 const d=s.desk,p=q.desk;if(p&&typeof p==='object'){d.caseId=String(p.caseId||'').slice(0,40);for(const k of ['opened','folderOpen','torchOn'])d[k]=typeof p[k]==='boolean'?p[k]:d[k];d.mode=['ok','no','fl'].includes(p.mode)?p.mode:'ok';d.wet=clamp(p.wet,0,1);d.ink=clamp(p.ink,.3,1,1);d.credits=Math.floor(clamp(p.credits,0,999,2));d.examined=boolMap(p.examined);d.upgrades=Object.fromEntries(['lens','light','tray'].filter(k=>p.upgrades?.[k]).map(k=>[k,true]));d.settled=boolMap(p.settled);d.marks=Array.isArray(p.marks)?p.marks.slice(-50).filter(m=>m&&['ok','no','fl'].includes(m.choice)).map(m=>({caseId:String(m.caseId).slice(0,40),x:clamp(m.x,-58,58),y:clamp(m.y,-69,69),angle:clamp(m.angle,-1.2,1.2),choice:m.choice,dry:clamp(m.dry,0,1),bleed:clamp(m.bleed,0,1)})):[];d.audit=Array.isArray(p.audit)?p.audit.slice(-45).filter(a=>a&&a.type==='purchase'&&['lens','light','tray'].includes(a.id)).map(a=>({day:Math.floor(clamp(a.day,1,15)),type:'purchase',id:a.id,amount:-Math.floor(clamp(-a.amount,0,5))})):[];d.reports=Array.isArray(p.reports)?p.reports.slice(-15).filter(r=>r&&Number.isInteger(r.day)&&r.day>=1&&r.day<=15).map(r=>({day:r.day,...Object.fromEntries(['approved','rejected','flagged','correct','mistakes','reward','credits','food','med'].map(k=>[k,Math.floor(clamp(r[k],0,999))])),infected:!!r.infected,evidence:(Array.isArray(r.evidence)?r.evidence:[]).filter(k=>!!EVIDENCE[k]),decisions:(Array.isArray(r.decisions)?r.decisions:[]).filter(k=>typeof k==='string'&&/^[a-z0-9]+$/.test(k)).slice(0,3),purchases:(Array.isArray(r.purchases)?r.purchases:[]).filter(k=>['lens','light','tray'].includes(k))})):[];}
 s.settings.lensSensitivity=clamp(q.settings?.lensSensitivity,.5,1.5,1);
 return s;
}
export function migrateLegacy(q){const s=fresh(2026,q.L);s.day=q.day;s.phase=q.day<5?'intro':q.day===15?'final':'investigate';s.cinematic=0;s.flags=boolMap(q.G);s.evidence=boolMap(q.ST.ev);s.inventory={food:clamp(q.ST.inv?.food,0,99),med:clamp(q.ST.inv?.med,0,99)};s.infection=q.ST.inf?1:0;s.requirements=boolMap(q.ST.rd);s.inspected=boolMap(q.ST.look);
 const aliases={d5:'transfer',x5:'transfer',cam:'cctv',d6:'cctv',d7:'street',d8:'hala',phala:'hala',pdel:'deleted',arc:'deleted',d9:'call',d11:'sound',d12:'s07',ps07:'s07',pecho:'echo',echo:'echo',pself:'self',self:'self',d14:'self'};
 for(const[from,to]of Object.entries(aliases))if(s.evidence[from])s.evidence[to]=true;
 if(s.requirements[s.day]&&s.phase==='investigate')s.phase='choice';return s;
}
export class SaveStore{
 constructor(storage){this.storage=storage;this.error=null;}
 read(){let errors=[];for(const key of [SAVE_KEY,BACKUP_KEY,'crlf2']){try{const raw=this.storage.getItem(key);if(raw){const s=validateSave(JSON.parse(raw));this.error=errors.length?'Recovered backup':null;return s;}}catch(e){errors.push(e.message);}}this.error=errors.length?'Save could not be restored':null;return null;}
 write(s){try{const serialized=JSON.stringify(s);validateSave(JSON.parse(serialized));const old=this.storage.getItem(SAVE_KEY);if(old){try{validateSave(JSON.parse(old));this.storage.setItem(BACKUP_KEY,old);}catch{}}this.storage.setItem(SAVE_KEY,serialized);this.error=null;return true;}catch(e){this.error=e.message;return false;}}
 import(raw){if(raw.length>1_000_000)throw Error('Save too large');const s=validateSave(JSON.parse(raw));if(!this.write(s))throw Error(this.error);return s;}
}
