# SEZIONE Hair Studio Demo v3

Reference-led rebuild by Punto Due Studio.

## Canonical production workflow
This repository follows **Punto Due Studio — Demo Generation System v3**.

One **complete page** at a time:

1. start from the repository selected by Manuel;
2. choose one primary real high-end website reference for the page;
3. document the Reference Card;
4. use secondary references only for named sub-problems;
5. source client-owned or properly licensed/free photography before considering generation;
6. implement the full page directly in GitHub;
7. run static, desktop, mobile, accessibility and Lighthouse QA;
8. fix every failure before notifying Manuel;
9. only when fully green, say **YOU CAN DEPLOY THIS PAGE NOW**;
10. Manuel deploys and visually reviews;
11. APPROVED → PAGE LOCKED → next page.

## Deployment authority
ChatGPT does **not** deploy this repository under the current workflow.

Manuel deploys manually only after the current page Quality Gate is green.

## Page status

### Page 01 — HOME
**PAGE LOCKED — APPROVED BY MANUEL**

Primary reference: George Northwood  
Secondary references: Hershesons / Josh Wood Colour Atelier

Reference card:
`docs/HOME-REFERENCE-CARD.md`

### Page 02 — SERVICES
**PAGE LOCKED — APPROVED BY MANUEL**

Primary reference: Josh Wood Colour Atelier — Services & Price List  
Secondary reference: George Northwood — consultation guidance

Reference card:
`docs/SERVICES-REFERENCE-CARD.md`

Final green QA commit:
`c6585e0df90caffbe175f6ef5a83036be0608de8`

### Page 03 — LAVORI
**PAGE LOCKED — APPROVED BY MANUEL**

Primary reference: Hershesons — Look Book

Reference card:
`docs/LAVORI-REFERENCE-CARD.md`

Implementation:
- `lavori.html`
- `lavori.css`
- 5 licensed/free Unsplash portraits
- Home and Services navigation linked to Page 03

Final green QA commit:
`4f78aac816a0148b5fec96af758a325d7106af1c`

## Retired methods
Do not recover into:
- v1/v2 SEZIONE workflows;
- mandatory Figma-before-code;
- piece-by-piece Home construction;
- automatic deployment assumptions;
- old visual systems/assets by default;
- founder review while QA is red.

Canonical workflow documentation:
`docs/DEMO-GENERATION-SYSTEM-V3.md`


### Page 04 — STUDIO
**IMPLEMENTED — QA RUNNING**

Primary reference: Hershesons — Stores / Fitzrovia

Reference card:
`docs/STUDIO-REFERENCE-CARD.md`

Implementation:
- `studio.html`
- `studio.css`
- 2 licensed/free Unsplash salon interiors
- Home / Services / Lavori navigation linked to Page 04
- no generated imagery
- no invented address, hours, team or operating claims

Deployment status:
**BLOCKED UNTIL PAGE 04 QUALITY GATE IS GREEN**
