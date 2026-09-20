import fs from 'node:fs';

const html = fs.readFileSync('index.html','utf8');
const css = fs.readFileSync('styles.css','utf8');
const reference = fs.readFileSync('docs/HOME-REFERENCE-CARD.md','utf8');
const errors = [];
const fail = msg => errors.push(msg);

if (!/<html lang="it">/.test(html)) fail('missing lang=it');
if (!/name="viewport"/.test(html)) fail('missing viewport');
if (!/noindex,nofollow/.test(html)) fail('demo must remain noindex,nofollow');
if ((html.match(/<h1\b/g) || []).length !== 1) fail('Home must contain exactly one H1');
if ((html.match(/<section\b/g) || []).length !== 7) fail('Home must contain exactly seven sections');
if ((html.match(/<img\b/g) || []).length !== 2) fail('Home must contain exactly two approved image assets');
if (!/class="skip-link"/.test(html)) fail('missing skip link');
if (!/class="site-header"/.test(html)) fail('missing site header');
if (!/class="hero"/.test(html)) fail('missing hero');
if (!/id="servizi"/.test(html)) fail('missing services section');
if (!/id="lavori"/.test(html)) fail('missing works section');
if (!/id="studio"/.test(html)) fail('missing studio section');
if (!/id="contatto"/.test(html)) fail('missing contact CTA');
if (/<form\b|type=["'](?:email|tel|password)["']/i.test(html)) fail('demo must not collect personal data');
if (/lorem ipsum/i.test(html)) fail('placeholder copy detected');

for (const name of ['George Northwood','Hershesons','Josh Wood Colour Atelier','Unsplash']) {
  if (!reference.includes(name)) fail('reference card missing '+name);
}

for (const token of ['#F5F3EE','#FFFFFF','#0B0B0A','#CFC9BE','#D9DAD5']) {
  if (!css.includes(token)) fail('missing approved palette token '+token);
}

for (const img of html.matchAll(/<img\b[^>]*>/g)) {
  if (!/\balt="[^"]+"/.test(img[0])) fail('image missing meaningful alt text');
  if (!/\bwidth="\d+"/.test(img[0]) || !/\bheight="\d+"/.test(img[0])) fail('image missing intrinsic dimensions');
}

if (css.length > 64 * 1024) fail('Home CSS exceeds 64 KB source budget');

if (errors.length) {
  console.error('Static QA failed:\n- '+errors.join('\n- '));
  process.exit(1);
}

console.log('Static QA PASS — Home Page 01.');
