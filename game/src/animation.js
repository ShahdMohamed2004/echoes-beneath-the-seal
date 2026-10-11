export const STATES=['idle','talk','walk','reach','fear','pain','transform','echo','suspicion','exhaustion','turn','hesitate','confused','anger','relief','cough','listen','handover','earlyInfected','infected','hybrid'];
const ONCE=new Set(['reach','transform','handover','relief']);
export class Animator{
 constructor(){this.state='idle';this.base='idle';this.elapsed=0;this.hold=0;this.priority=0;this.interrupted=0;}
 set(state){this.base=STATES.includes(state)?state:'idle';if(this.hold<=0&&this.state!==this.base){this.state=this.base;this.elapsed=0;}}
 react(state,duration=.9,priority=1){if(!STATES.includes(state)||this.hold>0&&priority<this.priority)return false;if(this.hold>0&&state!==this.state)this.interrupted++;this.state=state;this.elapsed=0;this.hold=duration;this.priority=priority;return true;}
 reset(){this.state=this.base='idle';this.elapsed=this.hold=this.priority=0;}
 update(dt,reduced=false){this.elapsed+=Math.max(0,dt);if(this.hold>0){this.hold-=dt;if(this.hold<=0){this.priority=0;if(this.state!==this.base){this.state=this.base;this.elapsed=0;}}}const times=this.state==='idle'?[.55,.5,.55,.12]:['listen','turn','exhaustion','hesitate'].includes(this.state)?[.35,.22,.30,.22]:[.18,.12,.18,.22],total=times.reduce((a,b)=>a+b,0);let t=ONCE.has(this.state)?Math.min(this.elapsed,total-.001):this.elapsed%total,frame=0;while(frame<3&&t>=times[frame])t-=times[frame++];return{frame:reduced?1:frame,row:STATES.indexOf(this.state),state:this.state};}
}
