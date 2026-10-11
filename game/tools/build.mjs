import {build,transform} from 'esbuild';
import {readFile,writeFile,cp,mkdir,rm,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
const root=process.cwd(),dist=path.join(root,'dist');await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
await build({entryPoints:['src/main.js'],bundle:true,minify:true,target:['es2020'],format:'esm',outfile:'dist/game.js',legalComments:'inline',banner:{js:'/* Created and Designed by Shahd Mohamed. Copyright 2026. All rights reserved. */'}});
const css=await transform((await readFile('styles.css','utf8'))+'\n'+(await readFile('desk.css','utf8'))+'\n'+(await readFile('stats.css','utf8')),{loader:'css',minify:true});await writeFile('dist/styles.css',css.code);
const html=(await readFile('index.html','utf8')).replace('./src/main.js','./game.js');await writeFile('dist/index.html',html);
for(const file of ['assets','manifest.webmanifest','privacy.html','ASSET_CREDITS.md','AUDIO_CREDITS.md','COPYRIGHT.md','LICENSE','asset-manifest.json','audio-manifest.json','licenses'])await cp(file,path.join(dist,file),{recursive:true,filter:source=>!source.endsWith('.ogg')});
async function walk(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(path.relative(dist,p).split(path.sep).join('/'));}return out;}
const files=(await walk(dist)).sort();const digest=createHash('sha256');for(const f of files)digest.update(await readFile(path.join(dist,f)));const revision=digest.digest('hex').slice(0,12);
const sw=`/* Offline production cache; no activation during an active run. */
const CACHE='echoes-${revision}',FILES=${JSON.stringify(files.map(f=>'./'+f))};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('echoes-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})());});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith((async()=>{const c=await caches.open(CACHE);if(e.request.mode==='navigate'){const exact=await c.match(e.request,{ignoreSearch:true});if(exact)return exact;const p=new URL(e.request.url).pathname;if(p.endsWith('/')||p.endsWith('/index.html')){const cached=await c.match('./index.html');if(cached)return cached;}}const hit=await c.match(e.request);return hit||fetch(e.request);})());});
`;
await writeFile(path.join(dist,'sw.js'),sw);
const total=(await Promise.all(files.map(async f=>(await readFile(path.join(dist,f))).length))).reduce((a,b)=>a+b,0);
console.log(JSON.stringify({version:'2.1.0',revision,files:files.length,bytes:total,output:'dist',sourceMaps:false},null,2));
