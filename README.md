# Digital Trust Futures Foundation — Website

Modern React application for the **Digital Trust Futures Foundation NPC**, built with Vite and TypeScript.

**Protecting people, their rights and the digital systems they depend on.**

---

## What's here

```
react-app/          ← The React application source code (Vite + TypeScript)
  ├── public/       ← Static assets (images, fonts, CSS, robots.txt, etc.)
  └── src/          ← React components, pages, data, and hooks
```

The site is built as a **client-side rendered React application** using `react-router-dom` for navigation and `react-helmet-async` for dynamic SEO. It maintains the original Vanilla CSS design system for consistent styling.

---

## Pages & Structure

All content is heavily modularised:
- **`src/data/`** — Raw text and structure (`divisions.ts`, `navigation.ts`, `siteConfig.ts`).
- **`src/components/`** — Reusable UI elements (`Header`, `Footer`, `PageHero`, `HeroCanvas`, etc.).
- **`src/pages/`** — 25+ distinct page routes.

### Page routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About the Foundation |
| `/human-rights` | Human Rights & Digital Trust *(new — Aug 2026)* |
| `/governance` | Governance & Board |
| `/what-we-do` | What We Do (five divisions overview) |
| `/divisions/:slug` | Individual division pages (×5) |
| `/programmes` | Launch programmes |
| `/research` | Research & resources library |
| `/open-source` | Open-source projects |
| `/civil-society` | Civil Society & Human Rights Defenders *(new — Aug 2026)* |
| `/children-young-people` | Children & Young People Digital Trust & Safety *(new — Aug 2026)* |
| `/get-involved` | Get involved |
| `/support-our-work` | Support our work |
| `/news` | News |
| `/contact` | Contact |
| `/security` | Vulnerability disclosure |
| `/credits` | Credits |
| `/legal/privacy` | Privacy policy |
| `/legal/cookies` | Cookie policy |
| `/legal/terms` | Terms of use |
| `/legal/safeguarding` | Safeguarding policy |

### August 2026 update — rights, civil society and children

The site was updated in August 2026 to reflect the *DTFF Human Rights and Civil Protection Aligned Strategy*. The key changes:

- **Four-pillar operating model**: Security → Safety → **Rights** → Trust, with Inclusion as the fifth lens.
- **Human rights assurance**: 11 assurance domains now tested in every DPI assessment; effective remedy pathway added as a distinctive DTFF theme.
- **Civil society**: Three formal roles formalised — beneficiary, evidence partner and accountability participant. Civil Society Digital Harm Evidence Network introduced.
- **Children & young people**: Cross-foundation protected constituency with 9 workstreams and the D-CRIA (Child Rights Impact Assessment for DPI) methodology.
- **Governance**: Board seat renamed to Human Rights, Child Protection & Digital Rights Expert; new Head of Human Rights, Safeguarding and Ethics exec role; new Human Rights, Child Safety and Safeguarding Advisory Panel; partner due diligence table added; MEL framework expanded.
- **Research library**: 10 new tools covering rights, child protection and civil-society resilience, with new filter tags.

---

## Development

Requires Node.js ≥ 18 and npm.

```bash
cd react-app
npm install
npm run dev
```

Then open <http://localhost:5173>.

---

## Deployment

To build the static assets for production:

```bash
cd react-app
npm run build
```

Output goes to `../website/` (configured in `vite.config.ts`). This can be deployed to any static host — Netlify, Vercel, Cloudflare Pages, GitHub Pages, or S3 + CloudFront.

**Before go-live:**
1. Confirm form routing (uses Web3Forms, routes to `info@digitaltrustfuturesfoundation.org`).
2. Have legal counsel review and sign off the four policies in `src/pages/legal/` — they are published in draft and say so on the page.
3. Confirm the registration number and registered address on the Contact page.
4. Review the safeguarding policy to confirm it reflects the August 2026 governance update (Head of Human Rights, Safeguarding and Ethics; Advisory Panel).

---

## Design System

Colours are sampled from the Foundation wordmark and defined in `react-app/public/assets/css/main.css`:

| Token | Value | Use |
|---|---|---|
| Navy | `#133A63` | Headings, primary UI, dark bands |
| Orange | `#BC5012` | Accent, calls to action, rules |
| Teal | `#247E83` | Secondary accent |
| Brass | `#B08D57` | Tertiary rules (text uses the darker `#8A6A3B`) |
| Paper | `#F7F5F1` | Page background |

Type is self-hosted: **Newsreader** (display), **Inter** (body), **IBM Plex Mono** (labels and data). Nothing is requested from Google Fonts, so visiting the site does not disclose a reader's IP address to a third party.

Light and dark themes are both first-class: the site follows `prefers-color-scheme` and the header toggle overrides it, persisted in `localStorage` under `dtff-theme`.

---

© 2026 Digital Trust Futures Foundation NPC. Site content and Foundation resources are intended for release under CC BY 4.0; the name, logo and wordmark are not.
