# Punto Due Studio — Demo Generation System v3

Status: **CANONICAL**

This file is the repository-local copy of the approved future demo-generation method.

## Core rule
Build **one complete page at a time**.

Sequence:

`clean repo → real reference research → Reference Card → full page implementation → automated QA → fix all failures → YOU CAN DEPLOY THIS PAGE NOW → Manuel deploys → Manuel reviews → APPROVED = PAGE LOCKED → next page`

## Real-reference rule
Each page must begin with **one primary real high-end website**.

Document:
- exact URL;
- palette logic;
- typography;
- image treatment;
- spacing;
- grid;
- navigation / CTA;
- mobile behavior;
- what to adapt;
- what not to copy.

Secondary references are allowed only for a named functional/design problem.

## Image rule
Priority:
1. client-owned images;
2. licensed/free-to-use images;
3. online third-party images as reference only;
4. generated imagery only if a genuine gap remains.

Do not use AI imagery by default.

## Implementation rule
Default to direct GitHub implementation.

Figma is optional and should not block production unless Manuel specifically asks for it or the page genuinely needs isolated visual exploration.

## Content integrity
Do not invent:
- reviews;
- prices;
- awards;
- staff credentials;
- opening hours;
- addresses;
- client outcomes;
- operating claims.

## Mandatory QA
Before Manuel is told to deploy:
- Static QA must pass.
- Desktop browser QA must pass.
- Mobile browser QA must pass.
- Serious/critical accessibility violations must be zero.
- Assets must load.
- Horizontal overflow must pass.
- Lighthouse budgets must pass.

If anything fails, fix it before notifying Manuel.

## Deployment authority
Under this workflow ChatGPT does not deploy.

Only when the current page is fully green may the assistant say:

**YOU CAN DEPLOY THIS PAGE NOW.**

Then Manuel deploys and checks the visual himself.

## Founder gate
- APPROVED → PAGE LOCKED → next page.
- REVISE → modify current page only, rerun QA.
- REJECT / START OVER → reopen reference selection for current page.

## Recovery
`RECOVER → VERIFY ACTIVE REPOSITORY → READ README + CURRENT PAGE REFERENCE CARD → VERIFY QA STATE → CONTINUE FROM FIRST INCOMPLETE STEP`

Never recover into archived v1/v2 workflows.

## Current validation
The workflow was validated on SEZIONE Hair Studio Demo v3 Home Page 01.

Final green QA commit:
`dc90b9633ee04c738797409601030a88cad10a1e`

Founder decision:
**APPROVED / PAGE LOCKED**
