import fs from 'node:fs';

const home = fs.readFileSync('index.html','utf8');
const services = fs.readFileSync('servizi.html','utf8');
const works = fs.readFileSync('lavori.html','utf8');
const studio = fs.readFileSync('studio.html','utf8');
const firstVisit = fs.readFileSync('prima-visita.html','utf8');
const contact = fs.readFileSync('contatti.html','utf8');

const css = fs.readFileSync('styles.css','utf8');
const servicesCss = fs.readFileSync('servizi.css','utf8');
const worksCss = fs.readFileSync('lavori.css','utf8');
const studioCss = fs.readFileSync('studio.css','utf8');
const firstVisitCss = fs.readFileSync('prima-visita.css','utf8');
const contactCss = fs.readFileSync('contatti.css','utf8');

const homeReference = fs.readFileSync('docs/HOME-REFERENCE-CARD.md','utf8');
const servicesReference = fs.readFileSync('docs/SERVICES-REFERENCE-CARD.md','utf8');
const worksReference = fs.readFileSync('docs/LAVORI-REFERENCE-CARD.md','utf8');
const studioReference = fs.readFileSync('docs/STUDIO-REFERENCE-CARD.md','utf8');
const firstVisitReference = fs.readFileSync('docs/PRIMA-VISITA-REFERENCE-CARD.md','utf8');
const contactReference = fs.readFileSync('docs/CONTATTI-REFERENCE-CARD.md','utf8');

const errors = [];
const fail = msg => errors.push(msg);

const checkCommon = (html,label) => {
  if (!/<html lang="it">/.test(html)) fail(label+' missing lang=it');
  if (!/name="viewport"/.test(html)) fail(label+' missing viewport');
  if (!/noindex,nofollow/.test(html)) fail(label+' must remain noindex,nofollow');
  if ((html.match(/<h1\b/g) || []).length !== 1) fail(label+' must contain exactly one H1');
  if (!/class="skip-link"/.test(html)) fail(label+' missing skip link');
  if (!/class="site-header"/.test(html)) fail(label+' missing site header');
  if (/<form\b|type=["'](?:email|tel|password)["']/i.test(html)) fail(label+' must not collect personal data');
  if (/lorem ipsum/i.test(html)) fail(label+' contains placeholder copy');
};

for (const [html,label] of [
  [home,'Home'],
  [services,'Services'],
  [works,'Lavori'],
  [studio,'Studio'],
  [firstVisit,'Prima Visita'],
  [contact,'Contatti']
]) checkCommon(html,label);

// Home
if ((home.match(/<section\b/g) || []).length !== 7) fail('Home must contain exactly seven sections');
if ((home.match(/<img\b/g) || []).length !== 2) fail('Home must contain exactly two approved image assets');
for (const path of ['servizi.html','lavori.html','studio.html','prima-visita.html','contatti.html']) {
  if (!home.includes(`href="${path}"`)) fail('Home missing route '+path);
}

// Services
if ((services.match(/<section\b/g) || []).length !== 8) fail('Services must contain exactly eight sections');
if ((services.match(/<img\b/g) || []).length !== 1) fail('Services must contain exactly one approved image');
if ((services.match(/class="service-family/g) || []).length !== 4) fail('Services must contain four service families');
if (!/class="service-filter"/.test(services)) fail('Services missing category navigator');
if (!/id="prima-visita"/.test(services)) fail('Services missing first-visit support section');
if (!services.includes('href="contatti.html">PRENOTA</a>')) fail('Services primary nav must route to Contatti');
if (!services.includes('href="prima-visita.html"')) fail('Services must preserve Prima Visita guidance route');
if (!/Josh Wood Colour Atelier/.test(servicesReference)) fail('Services missing primary real-world reference');
if (!/George Northwood/.test(servicesReference)) fail('Services missing consultation reference');

// Lavori
if ((works.match(/<section\b/g) || []).length !== 4) fail('Lavori must contain exactly four sections');
if ((works.match(/<img\b/g) || []).length !== 5) fail('Lavori must contain exactly five licensed lookbook images');
if ((works.match(/class="look look-/g) || []).length !== 5) fail('Lavori must contain five staggered looks');
if (!works.includes('href="contatti.html">PRENOTA</a>')) fail('Lavori primary nav must route to Contatti');
if (!works.includes('href="prima-visita.html"')) fail('Lavori must preserve Prima Visita guidance route');
if (!/RIFERIMENTI\.<br><em>NON COPIE/.test(works)) fail('Lavori must preserve reference-not-copy framing');
if (!/Hershesons — Look Book/.test(worksReference)) fail('Lavori missing primary reference');
if (!/Unsplash License/.test(worksReference)) fail('Lavori image licensing note missing');

// Studio
if ((studio.match(/<section\b/g) || []).length !== 5) fail('Studio must contain exactly five sections');
if ((studio.match(/<img\b/g) || []).length !== 2) fail('Studio must contain exactly two licensed interior images');
if (!/class="studio-principles-grid"/.test(studio)) fail('Studio missing spatial principles grid');
if (!studio.includes('href="contatti.html">PRENOTA</a>')) fail('Studio primary nav must route to Contatti');
if (!studio.includes('href="prima-visita.html"')) fail('Studio must preserve Prima Visita guidance route');
if (!/LO SPAZIO<br><em>FA PARTE/.test(studio)) fail('Studio must preserve spatial-service framing');
if (!/Hershesons — Stores \/ Fitzrovia/.test(studioReference)) fail('Studio missing primary reference');
if (!/Tile Merchant Ireland/.test(studioReference)) fail('Studio missing hero image source');
if (!/Unsplash License/.test(studioReference)) fail('Studio image licensing note missing');

// Prima Visita
if ((firstVisit.match(/<section\b/g) || []).length !== 6) fail('Prima Visita must contain exactly six sections');
if ((firstVisit.match(/<img\b/g) || []).length !== 0) fail('Prima Visita should remain text-first with zero images');
if ((firstVisit.match(/class="visit-path(?:\s|")/g) || []).length !== 2) fail('Prima Visita must contain two starting pathways');
if ((firstVisit.match(/class="visit-factor"/g) || []).length !== 4) fail('Prima Visita must contain four decision factors');
if ((firstVisit.match(/class="visit-step"/g) || []).length !== 3) fail('Prima Visita must contain three decision steps');
if ((firstVisit.match(/aria-current="page"/g) || []).length !== 0) fail('Prima Visita should not be the primary nav destination');
if (!firstVisit.includes('href="contatti.html"')) fail('Prima Visita must link to Contatti');
if (!/Josh Wood Colour — Consultation/.test(firstVisitReference)) fail('Prima Visita missing primary reference');
if (!/No imagery is used on Page 05/.test(firstVisitReference)) fail('Prima Visita image-plan rationale missing');

// Contatti
if ((contact.match(/<section\b/g) || []).length !== 5) fail('Contatti must contain exactly five sections');
if ((contact.match(/<img\b/g) || []).length !== 0) fail('Contatti should remain text-first with zero images');
if ((contact.match(/class="contact-route(?:\s|")/g) || []).length !== 2) fail('Contatti must contain two booking routes');
if ((contact.match(/class="contact-slot-list"/g) || []).length !== 1) fail('Contatti must contain verified-data slots');
if ((contact.match(/aria-current="page"/g) || []).length !== 2) fail('Contatti must expose current page on desktop and mobile');
if (/mailto:|tel:/i.test(contact)) fail('Contatti must not fabricate direct contact links');
if (!/George Northwood — Find Us \/ Wells St\./.test(contactReference)) fail('Contatti missing primary reference');
if (!/No form is implemented/.test(contactReference)) fail('Contatti personal-data rule missing');

// Shared design / responsive budgets
if (!/Unsplash/.test(homeReference)) fail('Home image licensing reference missing');
for (const token of ['#F5F3EE','#FFFFFF','#0B0B0A','#CFC9BE','#D9DAD5']) {
  if (!css.includes(token)) fail('missing approved palette token '+token);
}
if (!servicesCss.includes('.service-hero') || !servicesCss.includes('@media (max-width:900px)')) fail('Services responsive stylesheet incomplete');
if (!worksCss.includes('.lookbook') || !worksCss.includes('@media (max-width:900px)')) fail('Lavori responsive stylesheet incomplete');
if (!studioCss.includes('.studio-hero') || !studioCss.includes('@media (max-width:900px)')) fail('Studio responsive stylesheet incomplete');
if (!firstVisitCss.includes('.visit-pathways') || !firstVisitCss.includes('@media (max-width:900px)')) fail('Prima Visita responsive stylesheet incomplete');
if (!contactCss.includes('.contact-routes') || !contactCss.includes('@media (max-width:900px)')) fail('Contatti responsive stylesheet incomplete');

for (const html of [home,services,works,studio,firstVisit,contact]) {
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(img[0])) fail('image missing meaningful alt text');
    if (!/\bwidth="\d+"/.test(img[0]) || !/\bheight="\d+"/.test(img[0])) fail('image missing intrinsic dimensions');
  }
}

if (css.length > 64*1024) fail('Home CSS exceeds 64 KB source budget');
if (servicesCss.length > 48*1024) fail('Services CSS exceeds 48 KB source budget');
if (worksCss.length > 48*1024) fail('Lavori CSS exceeds 48 KB source budget');
if (studioCss.length > 48*1024) fail('Studio CSS exceeds 48 KB source budget');
if (firstVisitCss.length > 48*1024) fail('Prima Visita CSS exceeds 48 KB source budget');
if (contactCss.length > 48*1024) fail('Contatti CSS exceeds 48 KB source budget');

const pageSet = [
  ['Home',home,'HOME / 01'],
  ['Services',services,'SERVIZI / 02'],
  ['Lavori',works,'LAVORI / 03'],
  ['Studio',studio,'STUDIO / 04'],
  ['Prima Visita',firstVisit,'PRIMA VISITA / 05'],
  ['Contatti',contact,'CONTATTI / 06']
];

for (const [label,html,footerLabel] of pageSet) {
  if (!/href="contatti\.html"(?: aria-current="page")?>PRENOTA<\/a>/.test(html)) fail(label+' primary navigation must use PRENOTA → contatti.html');
  if (!html.includes(footerLabel)) fail(label+' footer label is inconsistent');
  if (!html.includes('DEMO / PUNTO DUE STUDIO')) fail(label+' footer attribution is inconsistent');
}
if (!home.includes('href="index.html" aria-label="SEZIONE — Home"')) fail('Home brand must use canonical index.html route');
if (/REFERENCE-LED STUDIO DIRECTION/.test(home)) fail('Home exposes internal production language');
if (!css.includes('FINAL SITE POLISH — shared interaction system')) fail('Shared final interaction polish missing');
if (!css.includes(':focus-visible')) fail('Shared keyboard focus treatment missing');
if (!css.includes('prefers-reduced-motion')) fail('Reduced-motion treatment missing');

if (errors.length) {
  console.error('Final consistency QA failed:\n- '+errors.join('\n- '));
  process.exit(1);
}

console.log('Static QA PASS — Pages 01–06 + final site consistency.');
