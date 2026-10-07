import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';

// The assigned author groups are taken from the user-supplied PGPM outline V0.2.
const readings = [
  ['Porter', 'Mintzberg', 'Collis', 'Rukstad'],
  ['Kaplan', 'Norton', 'Barrows', 'Collins', 'Porras'],
  ['Porter', '1983', '2008'],
  ['Courtney', 'Brandenburger', 'Nalebuff'],
  ['Collis', 'Montgomery', 'Prahalad', 'Hamel'],
  ['Prahalad', 'Hamel', 'Ghemawat', 'Rivkin'],
  ['Kim', 'Mauborgne', 'Ghemawat', 'Pisano'],
  ['Eisenmann', 'Parker', 'Alstyne', 'Bower', 'Christensen'],
  ['Porter', 'Campbell', 'Goold', 'Alexander'],
  ['Dyer', 'Kale', 'Singh', 'Christensen'],
  ['Ghemawat', '2001', '2007'],
  ['Neilson', 'Martin', 'Powers', 'Groysberg'],
  ['Bower', 'Paine', 'Bazerman', 'Tenbrunsel'],
];
const publicRoot = path.resolve('public');
const failures = [];
let scripts = 0;
let localAssets = 0;
for (let n = 1; n <= 13; n++) {
  const relative = `teaching/1-year-mba/session${n}.html`;
  const file = path.join(publicRoot, relative);
  const html = await readFile(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] || '';
  if (!title.startsWith(`Session ${n}:`)) failures.push(`${relative}: incorrect session title`);
  if (!html.includes(`https://www.swapnilsahoo.com/${relative}`)) failures.push(`${relative}: canonical URL missing`);
  if (!html.includes(`data-course-session="${n}"`)) failures.push(`${relative}: shared course UI not configured`);
  if (/STRAMGT 221/.test(html)) failures.push(`${relative}: obsolete course code`);
  for (const author of readings[n - 1]) {
    if (!html.toLowerCase().includes(author.toLowerCase())) failures.push(`${relative}: assigned reading author ${author} missing`);
  }
  for (const id of ['top', 'main-header', 'themeBtn', 'drawer', 'readings', 'authors']) {
    if (!new RegExp(`id=["']${id}["']`).test(html)) failures.push(`${relative}: #${id} missing`);
  }
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc=|type=["']application\//i.test(match[1])) continue;
    try { new vm.Script(match[2], { filename: `${relative}:script-${++scripts}` }); }
    catch (error) { failures.push(`${relative}: ${error.message}`); }
  }
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (!href.startsWith('/') || !/\.(?:html|css|js|png|jpe?g|svg|webp)(?:[?#]|$)/i.test(href)) continue;
    const target = path.resolve(publicRoot, decodeURIComponent(href.split(/[?#]/)[0]).replace(/^\//, ''));
    if (!target.startsWith(publicRoot + path.sep)) { failures.push(`${relative}: asset escapes public root`); continue; }
    try { await access(target); localAssets++; }
    catch { failures.push(`${relative}: missing local asset ${href}`); }
  }
}
const index = await readFile('src/app/teaching/1-year-mba/OneYearMbaExperience.tsx', 'utf8');
const plan = index.split('const sessionPlan:')[1]?.split('const learningMoves')[0] || '';
const sessions = [...plan.matchAll(/number: "(\d+)"[\s\S]*?interactiveHref: interactive\("([^"]+)"\)/g)];
if (sessions.length !== 13) failures.push('Course map must contain 13 main lesson links');
for (const [, n, file] of sessions) {
  if (file !== `session${Number(n)}.html`) failures.push(`Course map Session ${n} points to ${file}`);
}
if (failures.length) {
  console.error(`One-year course check failed:\n${failures.map(x => `- ${x}`).join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`One-year course check passed: 13 canonical lessons, assigned author groups, ${scripts} inline scripts, ${localAssets} local asset references, and sequential course-map links.`);
}
