import fs from 'node:fs';

const home = fs.readFileSync('index.html','utf8');
const services = fs.readFileSync('servizi.html','utf8');
const css = fs.readFileSync('styles.css','utf8');
const servicesCss = fs.readFileSync('servizi.css','utf8');
const homeReference = fs.readFileSync('docs/HOME-REFERENCE-CARD.md','utf8');
const servicesReference = fs.readFileSync('docs/SERVICES-REFERENCE-CARD.md','utf8');
const errors = [];
const fail = msg => errors.push(msg);

const checkCommon = (html, label) => {
  if (!/<html lang="it">/.test(html)) fail(label+' missing lang=it');
  if (!/name="viewport"/.test(html)) fail(label+' missing viewport');
  if (!/noindex,nofollow/.test(html)) fail(label+' must remain noindex,nofollow');
  if ((html.match(/<h1\b/g) || []).length !== 1) fail(label+' must contain exactly one H1');
  if (!/class="skip-link"/.test(html)) fail(label+' missing skip link');
  if (!/class="site-header"/.test(html)) fail(label+' missing site header');
  if (/<form\b|type=["'](?:email|tel|password)["']/i.test(html)) fail(label+' must not collect personal data');
  if (/lorem ipsum/i.test(html)) fail(label+' contains placeholder copy');
};

checkCommon(home,'Home');
checkCommon(services,'Services');

if ((home.match(/<section\b/g) || []).length !== 7) fail('Home must contain exactly seven sections');
if ((home.match(/<img\b/g) || []).length !== 2) fail('Home must contain exactly two approved image assets');
if (!/href="servizi\.html"/.test(home)) fail('Home must link to Services page');

if ((services.match(/<section\b/g) || []).length !== 8) fail('Services must contain exactly eight sections');
if ((services.match(/<img\b/g) || []).length !== 1) fail('Services must contain exactly one approved image');
if (!/class="service-filter"/.test(services)) fail('Services missing category navigator');
if ((services.match(/class="service-family/g) || []).length !== 4) fail('Services must contain four service families');
if (!/id="prima-visita"/.test(services)) fail('Services missing first-visit route');
if (!/aria-current="page"/.test(services)) fail('Services navigation must expose current page');
if (!/Josh Wood Colour Atelier/.test(servicesReference)) fail('Services missing primary real-world reference');
if (!/George Northwood/.test(servicesReference)) fail('Services missing secondary consultation reference');
if (!/Unsplash/.test(homeReference)) fail('Home image licensing reference missing');

for (const token of ['#F5F3EE','#FFFFFF','#0B0B0A','#CFC9BE','#D9DAD5']) {
  if (!css.includes(token)) fail('missing approved palette token '+token);
}

if (!servicesCss.includes('.service-hero') || !servicesCss.includes('@media (max-width:900px)')) {
  fail('Services responsive stylesheet incomplete');
}

for (const html of [home, services]) {
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(img[0])) fail('image missing meaningful alt text');
    if (!/\bwidth="\d+"/.test(img[0]) || !/\bheight="\d+"/.test(img[0])) fail('image missing intrinsic dimensions');
  }
}

if (css.length > 64 * 1024) fail('Home CSS exceeds 64 KB source budget');
if (servicesCss.length > 48 * 1024) fail('Services CSS exceeds 48 KB source budget');

if (errors.length) {
  console.error('Static QA failed:\n- '+errors.join('\n- '));
  process.exit(1);
}

console.log('Static QA PASS — Home Page 01 + Services Page 02.');
