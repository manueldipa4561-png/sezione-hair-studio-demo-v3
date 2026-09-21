import fs from 'node:fs';

const home = fs.readFileSync('index.html','utf8');
const services = fs.readFileSync('servizi.html','utf8');
const works = fs.readFileSync('lavori.html','utf8');
const studio = fs.readFileSync('studio.html','utf8');
const firstVisit = fs.readFileSync('prima-visita.html','utf8');

const css = fs.readFileSync('styles.css','utf8');
const servicesCss = fs.readFileSync('servizi.css','utf8');
const worksCss = fs.readFileSync('lavori.css','utf8');
const studioCss = fs.readFileSync('studio.css','utf8');
const firstVisitCss = fs.readFileSync('prima-visita.css','utf8');

const homeReference = fs.readFileSync('docs/HOME-REFERENCE-CARD.md','utf8');
const servicesReference = fs.readFileSync('docs/SERVICES-REFERENCE-CARD.md','utf8');
const worksReference = fs.readFileSync('docs/LAVORI-REFERENCE-CARD.md','utf8');
const studioReference = fs.readFileSync('docs/STUDIO-REFERENCE-CARD.md','utf8');
const firstVisitReference = fs.readFileSync('docs/PRIMA-VISITA-REFERENCE-CARD.md','utf8');

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
checkCommon(works,'Lavori');
checkCommon(studio,'Studio');
checkCommon(firstVisit,'Prima Visita');

if ((home.match(/<section\b/g) || []).length !== 7) fail('Home must contain exactly seven sections');
if ((home.match(/<img\b/g) || []).length !== 2) fail('Home must contain exactly two approved image assets');
if (!/href="servizi\.html"/.test(home)) fail('Home must link to Services page');
if (!/href="lavori\.html"/.test(home)) fail('Home must link to Lavori page');
if (!/href="studio\.html"/.test(home)) fail('Home must link to Studio page');
if (!/href="prima-visita\.html"/.test(home)) fail('Home must link to Prima Visita page');

if ((services.match(/<section\b/g) || []).length !== 8) fail('Services must contain exactly eight sections');
if ((services.match(/<img\b/g) || []).length !== 1) fail('Services must contain exactly one approved image');
if (!/class="service-filter"/.test(services)) fail('Services missing category navigator');
if ((services.match(/class="service-family/g) || []).length !== 4) fail('Services must contain four service families');
if (!/id="prima-visita"/.test(services)) fail('Services missing first-visit support section');
if (!/aria-current="page"/.test(services)) fail('Services navigation must expose current page');
if (!/href="lavori\.html"/.test(services)) fail('Services must link to Lavori page');
if (!/href="studio\.html"/.test(services)) fail('Services must link to Studio page');
if (!/href="prima-visita\.html"/.test(services)) fail('Services must link to Prima Visita page');
if (!/Josh Wood Colour Atelier/.test(servicesReference)) fail('Services missing primary real-world reference');
if (!/George Northwood/.test(servicesReference)) fail('Services missing secondary consultation reference');

if ((works.match(/<section\b/g) || []).length !== 4) fail('Lavori must contain exactly four sections');
if ((works.match(/<img\b/g) || []).length !== 5) fail('Lavori must contain exactly five licensed lookbook images');
if ((works.match(/class="look look-/g) || []).length !== 5) fail('Lavori must contain five staggered looks');
if (!/aria-current="page"/.test(works)) fail('Lavori navigation must expose current page');
if (!/href="studio\.html"/.test(works)) fail('Lavori must link to Studio page');
if (!/href="prima-visita\.html"/.test(works)) fail('Lavori must link to Prima Visita page');
if (!/RIFERIMENTI\.<br><em>NON COPIE/.test(works)) fail('Lavori must preserve reference-not-copy framing');
if (!/Hershesons — Look Book/.test(worksReference)) fail('Lavori missing primary real-world reference');
if (!/Unsplash License/.test(worksReference)) fail('Lavori image licensing note missing');

if ((studio.match(/<section\b/g) || []).length !== 5) fail('Studio must contain exactly five sections');
if ((studio.match(/<img\b/g) || []).length !== 2) fail('Studio must contain exactly two licensed interior images');
if (!/aria-current="page"/.test(studio)) fail('Studio navigation must expose current page');
if (!/class="studio-principles-grid"/.test(studio)) fail('Studio missing spatial principles grid');
if (!/href="prima-visita\.html"/.test(studio)) fail('Studio must link to Prima Visita page');
if (!/LO SPAZIO<br><em>FA PARTE/.test(studio)) fail('Studio must preserve spatial-service framing');
if (!/Hershesons — Stores \/ Fitzrovia/.test(studioReference)) fail('Studio missing primary real-world reference');
if (!/Tile Merchant Ireland/.test(studioReference)) fail('Studio missing hero image source');
if (!/Unsplash License/.test(studioReference)) fail('Studio image licensing note missing');

if ((firstVisit.match(/<section\b/g) || []).length !== 6) fail('Prima Visita must contain exactly six sections');
if ((firstVisit.match(/<img\b/g) || []).length !== 0) fail('Prima Visita should remain text-first with zero images');
if ((firstVisit.match(/class="visit-path(?:\s|")/g) || []).length !== 2) fail('Prima Visita must contain two starting pathways');
if ((firstVisit.match(/class="visit-factor"/g) || []).length !== 4) fail('Prima Visita must contain four decision factors');
if ((firstVisit.match(/class="visit-step"/g) || []).length !== 3) fail('Prima Visita must contain three decision steps');
if ((firstVisit.match(/aria-current="page"/g) || []).length !== 2) fail('Prima Visita navigation must expose current page on desktop and mobile');
if (!/Josh Wood Colour — Consultation/.test(firstVisitReference)) fail('Prima Visita missing primary real-world reference');
if (!/No imagery is used on Page 05/.test(firstVisitReference)) fail('Prima Visita image-plan rationale missing');

if (!/Unsplash/.test(homeReference)) fail('Home image licensing reference missing');

for (const token of ['#F5F3EE','#FFFFFF','#0B0B0A','#CFC9BE','#D9DAD5']) {
  if (!css.includes(token)) fail('missing approved palette token '+token);
}

if (!servicesCss.includes('.service-hero') || !servicesCss.includes('@media (max-width:900px)')) fail('Services responsive stylesheet incomplete');
if (!worksCss.includes('.lookbook') || !worksCss.includes('@media (max-width:900px)')) fail('Lavori responsive stylesheet incomplete');
if (!studioCss.includes('.studio-hero') || !studioCss.includes('@media (max-width:900px)')) fail('Studio responsive stylesheet incomplete');
if (!firstVisitCss.includes('.visit-pathways') || !firstVisitCss.includes('@media (max-width:900px)')) fail('Prima Visita responsive stylesheet incomplete');

for (const html of [home, services, works, studio, firstVisit]) {
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(img[0])) fail('image missing meaningful alt text');
    if (!/\bwidth="\d+"/.test(img[0]) || !/\bheight="\d+"/.test(img[0])) fail('image missing intrinsic dimensions');
  }
}

if (css.length > 64 * 1024) fail('Home CSS exceeds 64 KB source budget');
if (servicesCss.length > 48 * 1024) fail('Services CSS exceeds 48 KB source budget');
if (worksCss.length > 48 * 1024) fail('Lavori CSS exceeds 48 KB source budget');
if (studioCss.length > 48 * 1024) fail('Studio CSS exceeds 48 KB source budget');
if (firstVisitCss.length > 48 * 1024) fail('Prima Visita CSS exceeds 48 KB source budget');

if (errors.length) {
  console.error('Static QA failed:\n- '+errors.join('\n- '));
  process.exit(1);
}

console.log('Static QA PASS — Home 01 + Services 02 + Lavori 03 + Studio 04 + Prima Visita 05.');
