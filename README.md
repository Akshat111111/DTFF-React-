# Digital Trust Futures Foundation — Website

Modern React application for the **Digital Trust Futures Foundation NPC**, built with Vite and TypeScript.

**Safe infrastructure. Trusted technology. Inclusive digital futures.**

---

## What's here

```
react-app/          ← The React application source code (Vite + TypeScript)
  ├── public/       ← Static assets (images, fonts, CSS, robots.txt, etc.)
  └── src/          ← React components, pages, data, and hooks
```

The site is built as a **client-side rendered React application** using `react-router-dom` for navigation and `react-helmet-async` for dynamic SEO. It maintains the original Vanilla CSS design system for flawless styling.

### Pages & Structure

All content is heavily modularized:
- **`src/data/`**: Contains the raw text and structure (e.g. `divisions.ts`, `siteConfig.ts`).
- **`src/components/`**: Reusable UI elements (`Header`, `Footer`, `PageHero`, etc.).
- **`src/pages/`**: The 20+ distinct page routes (`Home`, `About`, `Programmes`, `News`, etc.).

---

## Development

The project uses Node.js and npm.

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

This will generate a `dist/` directory (or configured output directory) which can be uploaded to any static host. It works perfectly on Netlify, Vercel, Cloudflare Pages, GitHub Pages, or S3 + CloudFront.

**Before go-live:**
1. Confirm form routing (the site uses Web3Forms and routes to `info@digitaltrustfuturesfoundation.org`).
2. Have legal counsel review and sign off the four policies in `src/pages/legal/` — they are published in draft and say so on the page.
3. Confirm the registration number and registered address on the Contact page.

---

## Design System

Colours are sampled from the Foundation wordmark and defined in `react-app/public/assets/css/main.css`:

| Token | Value | Use |
| --- | --- | --- |
| Navy | `#133A63` | Headings, primary UI, dark bands |
| Orange | `#BC5012` | Accent, calls to action, rules |
| Teal | `#247E83` | Secondary accent |
| Brass | `#B08D57` | Tertiary rules (text uses the darker `#8A6A3B`) |
| Paper | `#F7F5F1` | Page background |

Type is self-hosted: **Newsreader** (display), **Inter** (body), **IBM Plex Mono** (labels and data). Nothing is requested from Google Fonts, so visiting the site does not disclose a reader's IP address to a third party.

Light and dark themes are both first-class: the site follows `prefers-color-scheme` and the header toggle overrides it, persisted in `localStorage` under `dtff-theme`.

---

© 2026 Digital Trust Futures Foundation NPC. Site content and Foundation resources are intended for release under CC BY 4.0; the name, logo and wordmark are not.
