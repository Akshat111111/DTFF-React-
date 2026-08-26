# Deployment Guide — GitHub Pages → `digitaltrustfuturesfoundation.org`

> **Scope:** Everything needed to deploy the DTFF React/Vite app from this repository  
> to the custom domain `digitaltrustfuturesfoundation.org` via GitHub Pages.  
> The workflow at `.github/workflows/deploy.yml` is already written and wired correctly —  
> this guide explains it, validates it, and covers the one-time setup steps that must be done  
> in GitHub and with your DNS registrar.

---

## How the pipeline works (overview)

```
push to main
    │
    ▼
.github/workflows/deploy.yml
    │
    ├─ 1. checkout repo
    ├─ 2. setup Node 20
    ├─ 3. npm ci  (installs react-app/node_modules)
    ├─ 4. npm run build  →  tsc + vite build
    │       Vite outDir = ../website   (vite.config.ts line 8)
    │       emptyOutDir = false        (preserves CNAME, _headers, etc.)
    │       base = '/'                 (correct for custom domain)
    │
    ├─ 5. actions/upload-pages-artifact  ← uploads the website/ folder
    └─ 6. actions/deploy-pages           ← publishes to GitHub Pages
              │
              ▼
        digitaltrustfuturesfoundation.org  (via CNAME in website/)
```

---

## 1. One-time GitHub repository setup

Do these steps **once** in the GitHub web UI. After this, every `git push` to `main`
that touches `react-app/**`, `website/**`, or the workflow file will re-deploy automatically.

### 1.1 Enable GitHub Pages with GitHub Actions as the source

1. Go to your repository on GitHub.
2. Click **Settings → Pages** (left sidebar).
3. Under **Source**, choose **GitHub Actions** (not the legacy "Deploy from a branch" option).
4. Click **Save**.

> **Why Actions, not branch?** The workflow uses `actions/deploy-pages` which requires the
> Actions source. Using branch source would conflict and break the workflow.

### 1.2 Set the custom domain

1. Still in **Settings → Pages**, under **Custom domain**, enter:
   ```
   digitaltrustfuturesfoundation.org
   ```
2. Click **Save**. GitHub will write a `CNAME` file to the Pages deployment.

   > ✅ **Already handled in this repo.** The file `website/CNAME` already contains
   > `digitaltrustfuturesfoundation.org` and Vite's `emptyOutDir: false` ensures it
   > is never deleted during builds.

3. Tick **Enforce HTTPS** once GitHub confirms the certificate is issued (usually within a few minutes of DNS propagation — see Section 2).

### 1.3 Repository secrets

The current workflow needs **no secrets**. The built-in `GITHUB_TOKEN` is used automatically
by `actions/deploy-pages`. No API keys are required for a static Pages deploy.

Web3Forms uses its access key client-side in the form HTML — no secret needed for that either.

---

## 2. DNS configuration at your registrar

Point `digitaltrustfuturesfoundation.org` to GitHub Pages. You need **two record types**:

### 2.1 Apex domain (`digitaltrustfuturesfoundation.org`)

Add **four A records** pointing to GitHub Pages' IP addresses:

| Type | Name | Value |
|------|------|-------|
| `A`  | `@`  | `185.199.108.153` |
| `A`  | `@`  | `185.199.109.153` |
| `A`  | `@`  | `185.199.110.153` |
| `A`  | `@`  | `185.199.111.153` |

> These IPs are GitHub's authoritative Pages IPs. Always confirm the current list at  
> [docs.github.com/pages → Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### 2.2 `www` subdomain (redirect to apex)

Add a **CNAME record**:

| Type    | Name  | Value                              |
|---------|-------|------------------------------------|
| `CNAME` | `www` | `<your-github-username>.github.io` |

Replace `<your-github-username>` with the GitHub account or organisation that owns the repo.

### 2.3 Verify DNS propagation

```bash
# Check apex A records
dig digitaltrustfuturesfoundation.org A +short

# Expected: four GitHub IPs
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check www CNAME
dig www.digitaltrustfuturesfoundation.org CNAME +short
# Expected: <username>.github.io.
```

DNS changes take up to 48 hours to propagate globally, though typically much faster.

### 2.4 Verify domain ownership (strongly recommended)

This prevents another GitHub user from claiming your domain if the repo ever moves.

1. Go to **Settings → Pages → Verify domain**.
2. Follow the `TXT` record instructions shown in GitHub.
3. Add the TXT record to your DNS zone.
4. Click **Verify**.

---

## 3. The existing workflow — annotated

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy site

on:
  push:
    branches: [main]
    paths:
      # Only triggers when relevant files change — avoids unnecessary deploys
      - 'react-app/**'
      - 'website/**'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:   # Allows manual trigger from the GitHub Actions UI

permissions:
  contents: read
  pages: write        # Required to publish to Pages
  id-token: write     # Required by actions/deploy-pages for OIDC auth

concurrency:
  group: pages
  cancel-in-progress: false   # Lets a running deploy finish — no half-published states

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'         # Meets the Node ≥ 18 requirement
          cache: 'npm'
          cache-dependency-path: react-app/package-lock.json

      - name: Install dependencies
        run: npm ci                  # Clean install — always reproducible
        working-directory: react-app

      - name: Build with Vite
        run: npm run build           # tsc && vite build → outputs to ../website/
        working-directory: react-app

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: website              # Upload the built website/ folder

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**The workflow is already production-ready. No changes are required to the YAML file itself.**

---

## 4. React Router SPA fix for GitHub Pages 404s

> ⚠️ **Critical.** GitHub Pages is a static file host. When a visitor navigates directly to a
> URL such as `https://digitaltrustfuturesfoundation.org/human-rights`, GitHub Pages looks for
> `human-rights/index.html`, doesn't find it, and returns a 404.  
> The app uses `createBrowserRouter` (not hash routing), so this must be fixed.

This repo already has `website/404.html`. Verify it contains the SPA redirect script:

```bash
head -30 website/404.html
```

The file should contain a `<script>` block that encodes the path as a query parameter
and redirects to `/?p=<path>`, which `index.html` reads back and pushes to browser history
so React Router picks it up transparently.

### If the SPA redirect is missing or broken

**Step A — `website/404.html`** (add/replace the `<script>` in `<head>`):

```html
<script>
  // SPA redirect for GitHub Pages. Encodes path as query param → root.
  var segmentCount = 0;
  var l = window.location;
  l.replace(
    l.protocol + '//' + l.hostname +
    (l.port ? ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 + segmentCount).join('/') +
    '/?p=' + encodeURIComponent(
      l.pathname.slice(1).split('/').slice(segmentCount).join('/') +
      (l.search ? '&q=' + l.search.slice(1) : '') +
      l.hash
    )
  );
</script>
```

**Step B — `react-app/index.html`** (add before the theme-init `<script>` in `<head>`):

```html
<!-- GitHub Pages SPA redirect receiver -->
<script>
  (function(l){
    if (l.search[1] === 'p') {
      var decoded = l.search.slice(1).split('&').map(function(s){
        return s.replace(/~and~/g, '&');
      });
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) +
        (decoded[0] ? '/' + decoded[0].replace(/\?/, '&').replace(/^\//, '') : '') +
        (decoded[1] ? '?' + decoded[1] : '') +
        l.hash
      );
    }
  }(window.location));
</script>
```

After adding Step B, recompute the CSP hash (see Section 5) since there is now a second
inline script whose hash also needs to be in the `script-src` directive.

---

## 5. Content Security Policy — SHA update after build

`website/_headers` contains a CSP with an inline-script SHA:

```
script-src 'self' 'sha256-JYmTW2tRUZZpSWTSZi9EWttbAatxP8E/empbZQZ+qjA='
```

This hash corresponds exactly to the theme-init inline `<script>` in `react-app/index.html`.
**If you ever modify that script, recompute the hash:**

```bash
# Run from repo root after any change to the inline script
node -e "
  const crypto = require('crypto');
  const fs = require('fs');
  const html = fs.readFileSync('react-app/index.html', 'utf8');
  const matches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  matches.forEach((m, i) => {
    const hash = crypto.createHash('sha256').update(m[1]).digest('base64');
    console.log('Script ' + (i+1) + ': sha256-' + hash);
  });
"
```

Update `website/_headers` with every hash that appears.

> **Note:** `_headers` is a Netlify / Cloudflare Pages convention.  
> GitHub Pages does **not** serve it as HTTP response headers natively.  
> To enforce these headers in production, use Cloudflare in proxy mode (Section 7).

---

## 6. Pre-flight checklist before every production deploy

- [ ] `cd react-app && npm run build` completes without errors locally
- [ ] `tsc --noEmit` in `react-app/` reports zero type errors
- [ ] `website/CNAME` contains `digitaltrustfuturesfoundation.org`
- [ ] `website/404.html` contains the SPA redirect script (Section 4)
- [ ] `vite.config.ts` has `base: '/'` (not a subdirectory path)
- [ ] `vite.config.ts` has `emptyOutDir: false` (protects CNAME and static files)
- [ ] `website/sitemap.xml` is updated with any new routes
- [ ] `website/robots.txt` does not accidentally disallow legitimate crawlers
- [ ] No content marked "draft" or "staging only" is included in this merge
- [ ] Legal pages (`/legal/*`) — "draft" notices are intentional and reviewed
- [ ] Contact page registration number and registered address are confirmed
- [ ] Web3Forms access key in the Contact form routes to `info@digitaltrustfuturesfoundation.org`
- [ ] If the inline script in `index.html` changed — CSP hash in `_headers` updated (Section 5)

---

## 7. Recommended production architecture — Cloudflare in front of GitHub Pages

GitHub Pages serves static files but cannot attach custom HTTP response headers.
The security headers declared in `website/_headers` (HSTS, CSP, X-Frame-Options, etc.)
will **not** be served unless a proxy is in front. The recommended setup:

```
Visitor
   │
   ▼
Cloudflare (proxy mode — orange cloud ☁)
   │  ← applies Response Header Transform Rules
   │  ← terminates TLS with Cloudflare certificate
   │  ← serves edge cache for /assets/*
   ▼
GitHub Pages origin (185.199.x.x)
   └── serves the static files from the /website/ build output
```

### Cloudflare setup (free plan sufficient)

1. Add `digitaltrustfuturesfoundation.org` to your Cloudflare account.
2. Update your registrar's nameservers to the two Cloudflare nameservers shown during setup.
3. In **Cloudflare DNS**, add the four A records (Section 2.1) with **Proxy status: Proxied** (orange cloud icon). Do the same for the `www` CNAME.
4. In **SSL/TLS → Overview**, set encryption mode to **Full (strict)**.
5. In **Rules → Transform Rules → Modify Response Header**, add the headers from `website/_headers` for the `/*` path pattern:

   | Header | Value |
   |--------|-------|
   | `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
   | `X-Content-Type-Options` | `nosniff` |
   | `X-Frame-Options` | `DENY` |
   | `Referrer-Policy` | `strict-origin-when-cross-origin` |
   | `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()` |
   | `Cross-Origin-Opener-Policy` | `same-origin` |
   | `Content-Security-Policy` | *(copy full value from `website/_headers`)* |

6. In **Caching → Cache Rules**, match `/assets/*` and set **Edge Cache TTL: 1 year** (aligns with `Cache-Control: public, max-age=31536000, immutable` in `_headers`).

> Using Cloudflare is **optional** to get the site live, but strongly recommended for a
> security- and rights-focused foundation that has declared HSTS preload intent in its headers.

---

## 8. Manual / emergency deploy (without a code push)

1. Go to the **Actions** tab in your GitHub repository.
2. Click **Deploy site** in the left workflow list.
3. Click **Run workflow → Run workflow** (on the `main` branch).

This triggers a full build-and-deploy from whatever is currently on `main`,
without requiring a code change.

---

## 9. Rollback

### Option A — Re-run a previous deployment

1. Go to **Actions → Deploy site**.
2. Find the last known-good successful run.
3. Click **Re-run all jobs** on that run.

GitHub Pages republishes the artifact from that exact run.

### Option B — Revert via git

```bash
# Revert the last commit and push
git revert HEAD --no-edit
git push origin main
# The deploy workflow triggers automatically
```

---

## 10. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Workflow fails at `npm ci` | `package-lock.json` not committed or out of sync with `package.json` | Run `npm install` in `react-app/` locally; commit the updated lockfile |
| Workflow fails at `npm run build` | TypeScript or Vite error | Run `cd react-app && npm run build` locally; fix all errors before pushing |
| Site loads at `<username>.github.io` instead of custom domain | `CNAME` file missing from build output | Confirm `website/CNAME` exists and `emptyOutDir: false` is in `vite.config.ts` |
| 404 on direct URL navigation or browser refresh | SPA redirect not present in `404.html` | Add the redirect script (Section 4) |
| CSS / JS / fonts return 404 | `base` set to a subdirectory path | Confirm `base: '/'` in `vite.config.ts` |
| HTTPS not enforced / no certificate | DNS not yet propagated or custom domain not saved in Pages settings | Wait for DNS; tick "Enforce HTTPS" in Settings → Pages |
| Security headers not present in browser DevTools | GitHub Pages does not serve `_headers` natively | Use Cloudflare proxy (Section 7) |
| CSP violation in console for inline script | Hash in `_headers` doesn't match the script bytes | Recompute hash (Section 5) |
| Domain "already taken" error in Pages settings | Domain ownership not verified | Add the TXT verification record (Section 2.4) |
| Old content served after deploy | Browser or Cloudflare cache | Hard-refresh (`Ctrl+Shift+R`) or purge Cloudflare cache for the affected URL |

---

## 11. Key files reference

| File | Purpose |
|---|---|
| `react-app/vite.config.ts` | `base: '/'` and `outDir: '../website'` — critical for correct asset paths |
| `react-app/index.html` | Entry point; contains theme-init inline script whose SHA must match the CSP hash in `_headers` |
| `website/CNAME` | Custom domain declaration — must survive every build (`emptyOutDir: false`) |
| `website/404.html` | GitHub Pages 404 handler — must contain SPA redirect script |
| `website/_headers` | Security headers — only enforced if served via Cloudflare or another proxy |
| `website/_redirects` | URL redirect rules — only enforced on Netlify/Cloudflare Pages, not on raw GitHub Pages |
| `website/sitemap.xml` | Submit to Google Search Console; update when adding new routes |
| `website/robots.txt` | Search engine crawl policy |
| `.github/workflows/deploy.yml` | CI/CD pipeline — triggers on push to `main` touching `react-app/**` or `website/**` |

---

*Node 20 · Vite 8 · React 19 · react-router-dom 7 · Last updated August 2026.*
