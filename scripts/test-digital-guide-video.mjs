import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

// Read-only native-media regression checks; no real microphone/provider calls.
const base = (process.env.GUIDE_TEST_BASE_URL || 'http://localhost:3112').replace(/\/$/, '');
const channel = process.env.GUIDE_TEST_BROWSER_CHANNEL || undefined;
const profile = (process.env.GUIDE_TEST_PROFILE || (base.includes('localhost') ? 'local' : 'production')).replace(/[^\w-]/g, '-');
const output = 'artifacts/learning-lab/digital-avatar-build';
await mkdir(output, {recursive:true});
const browser = await chromium.launch({headless: true, channel});
const context = await browser.newContext({viewport:{width:1440,height:900},colorScheme:'dark'});
await context.addInitScript(() => {
  localStorage.setItem('theme', 'dark');
  navigator.mediaDevices.getUserMedia = async () => { throw new Error('Unexpected microphone request'); };
});
const page = await context.newPage();
const errors=[],writes=[],checks=[];
page.on('pageerror',error=>errors.push(error.message));
await context.route('**/*',route=>{
  if(!['GET','HEAD','OPTIONS'].includes(route.request().method())) {
    writes.push(route.request().url());return route.abort();
  }
  return route.continue();
});
const assert=(value,message)=>{if(!value)throw new Error(message);};
const report={base,profile,channel:channel||'bundled-chromium',checks,errors,writes};
try {
  const response=await page.goto(base+'/digital-guide',{waitUntil:'networkidle'});
  assert(response.status()===200,'Guide HTTP');
  assert(await page.evaluate(()=>!document.documentElement.classList.contains('dark')),'Default light');
  await page.getByRole('button',{name:'Open my digital guide',exact:true}).click();
  const dialog=page.getByTestId('digital-guide-dialog');
  await dialog.waitFor({state:'visible'});
  await page.screenshot({path:`${output}/${profile}-voice-1440.png`});
  await page.getByRole('button',{name:'Video',exact:true}).click();
  const player=page.getByTestId('digital-guide-welcome-video');
  await player.waitFor({state:'visible'});
  const initial=await player.evaluate(v=>({paused:v.paused,autoplay:v.autoplay,preload:v.preload,controls:v.controls,inline:v.playsInline,source:v.currentSrc}));
  assert(initial.paused&&!initial.autoplay&&initial.preload==='none'&&initial.controls&&initial.inline,'Opt-in native controls');
  assert(await dialog.locator('iframe').count()===0,'No provider iframe');
  checks.push({name:'initial',...initial});
  await player.evaluate(async v=>{v.muted=true;await v.play();});
  await page.waitForTimeout(1400);
  const playing=await player.evaluate(v=>({paused:v.paused,time:v.currentTime,duration:v.duration,width:v.videoWidth,height:v.videoHeight,error:v.error?.code,decoded:v.getVideoPlaybackQuality().totalVideoFrames,source:v.currentSrc,tracks:[...v.textTracks].map(t=>({mode:t.mode,cues:[...t.cues||[]].map(c=>({start:c.startTime,end:c.endTime,text:c.text}))}))}));
  assert(!playing.paused&&playing.time>0&&playing.duration>30&&playing.duration<40&&!playing.error&&playing.decoded>0,'Native playback');
  assert(playing.width===512&&playing.height===576,'Native dimensions');
  assert(playing.tracks[0]?.mode==='showing'&&playing.tracks[0].cues.length===9,'Captions load by default');
  assert(playing.tracks[0].cues.every((c,i,a)=>c.end>c.start&&c.end<=playing.duration+0.1&&(i===0||c.start>=a[i-1].end)),'Caption timing');
  if(channel==='chrome'||channel==='msedge') assert(playing.source.endsWith('.mp4'),'H.264 source in installed browser');
  assert(!(await page.getByText(/The welcome video could not play in this browser/).isVisible()),'No stale fallback error');
  checks.push({name:'native-playing',...playing});
  await page.screenshot({path:`${output}/${profile}-video-1440.png`});
  await player.evaluate(async v=>{
    v.pause();
    await new Promise((resolve,reject)=>{v.addEventListener('seeked',resolve,{once:true});v.addEventListener('error',reject,{once:true});v.currentTime=v.duration-0.5;});
    await v.play();
  });
  await page.waitForFunction(()=>document.querySelector('[data-testid="digital-guide-welcome-video"]').ended,undefined,{timeout:10000});
  checks.push({name:'seek-and-ended',passed:true});
  const handle=await player.elementHandle();
  await player.evaluate(async v=>{v.currentTime=0;await v.play();});
  await page.getByTestId('digital-guide-close').click();
  const stopped=await handle.evaluate(v=>({paused:v.paused,time:v.currentTime}));
  assert(stopped.paused&&stopped.time===0,'Close stops native video');
  checks.push({name:'close',...stopped});
  await page.getByRole('button',{name:'Open my digital guide',exact:true}).click();
  await page.getByRole('button',{name:'Video',exact:true}).click();
  await player.evaluate(async v=>{v.muted=true;v.querySelector('source[type="video/mp4"]').remove();v.load();await v.play();});
  await page.waitForTimeout(700);
  const webm=await player.evaluate(v=>({source:v.currentSrc,time:v.currentTime,duration:v.duration,error:v.error?.code,decoded:v.getVideoPlaybackQuality().totalVideoFrames}));
  assert(webm.source.endsWith('.webm')&&webm.time>0&&!webm.error&&Number.isFinite(webm.duration)&&webm.decoded>0,'WebM fallback');
  assert(!(await page.getByText(/The welcome video could not play in this browser/).isVisible()),'No WebM fallback error notice');
  checks.push({name:'webm-fallback',...webm});
  await page.getByTestId('digital-guide-close').click();
  const unavailableMedia = '**/videos/digital-avatar/welcome.*';
  await context.route(unavailableMedia,route=>route.abort());
  await page.getByRole('button',{name:'Open my digital guide',exact:true}).click();
  await page.getByRole('button',{name:'Video',exact:true}).click();
  await player.evaluate(v=>{v.muted=true;void v.play().catch(()=>{});});
  await page.getByText(/The welcome video could not play in this browser/).waitFor({state:'visible'});
  checks.push({name:'all-sources-failed-message',passed:true});
  await page.getByTestId('digital-guide-close').click();
  await context.unroute(unavailableMedia);
  await page.setViewportSize({width:320,height:600});
  await page.goto(base+'/digital-guide',{waitUntil:'networkidle'});
  assert(await page.evaluate(()=>!document.documentElement.classList.contains('dark')),'320 default light');
  await page.getByRole('button',{name:'Open my digital guide',exact:true}).click();
  await page.getByRole('button',{name:'Video',exact:true}).click();
  const dimensions=await dialog.evaluate(el=>{const r=el.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,overflow:document.documentElement.scrollWidth-innerWidth};});
  assert(dimensions.left>=-1&&dimensions.right<=321&&dimensions.top>=0&&dimensions.bottom<=601&&dimensions.overflow<=1,'320 popup fits');
  await page.screenshot({path:`${output}/${profile}-video-320.png`});
  checks.push({name:'320-light-layout',...dimensions});
  for(const path of ['/videos/digital-avatar/transcript.txt','/videos/digital-avatar/captions.vtt']) {
    const r=await context.request.get(base+path);assert(r.status()===200&&await r.text(),'Media text endpoint');
    checks.push({name:path,status:r.status()});
  }
  // Pointer action is intentional: Escape alone misses nav stacking regressions.
  await page.getByTestId('digital-guide-close').click();
  assert(!(await dialog.isVisible()),'320 close button is unobstructed');
  checks.push({name:'320-pointer-close',passed:true});
  await page.goto(base+'/learning-lab/free-courses',{waitUntil:'networkidle'});
  assert(await page.locator('a[href^="/learning-lab/free-courses/"]').count()>=6,'Six free courses');
  await page.goto(base+'/learning-lab/support',{waitUntil:'networkidle'});
  assert(await page.locator('img[src*="phonepe-donation-qr"]').count()>0,'Original QR still available');
  assert(!errors.length&&!writes.length,'No browser errors or writes');
  report.passed=true;
} catch(error) {report.passed=false;report.failure=error.message;process.exitCode=1;}
finally {await writeFile(`${output}/${profile}-native-video-report.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();}
