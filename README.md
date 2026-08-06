# Digital Trust Futures Foundation — website

Static website for **Digital Trust Futures Foundation NPC**, built from the Foundation's
own source documents (the comprehensive organisation profile, the positioning and strategy
document, the August 2026 organisational profile, and the website creation guide).

**Safe infrastructure. Trusted technology. Inclusive digital futures.**

---

## What's here

```
website/            ← the finished site. This is what you deploy.
_src/               ← the generator that produced it (Python, no dependencies)
_src/tests/         ← browser-based interaction test harness
```

The site is **pure static HTML, CSS and vanilla JavaScript**. No framework, no build step
required to serve it, no runtime dependencies, no third-party requests.

### Pages (23)

| Section | Pages |
| --- | --- |
| Home | `index.html` |
| About | `about.html`, `governance.html` |
| What we do | `what-we-do.html` + 5 division pages in `divisions/` |
| Programmes | `programmes.html` |
| Research | `research.html`, `open-source.html` |
| Engage | `get-involved.html`, `support-our-work.html` |
| News & contact | `news.html`, `contact.html` |
| Trust & legal | `security.html`, `credits.html`, `legal/` (privacy, cookies, terms, safeguarding) |
| Error | `404.html` |

Plus `sitemap.xml`, `robots.txt`, `.well-known/security.txt`, `site.webmanifest`,
`_headers` (security headers) and `_redirects`.

---

## Deploying

Upload the contents of `website/` to any static host. It works on Netlify, Cloudflare
Pages, GitHub Pages, S3 + CloudFront, or a plain Nginx/Apache vhost.

```bash
cd website && python3 -m http.server 8000
```

Then open <http://localhost:8000>.

**Before go-live:**

1. Point `SITE` in `_src/shell.py` at the production domain if it is not
   `https://digitaltrustfutures.org`, then rebuild.
2. Netlify / Cloudflare Pages pick up `_headers` and `_redirects` automatically. On other
   hosts, copy the header block from `_headers` into your server configuration — it carries
   HSTS, a hash-based Content-Security-Policy, `X-Content-Type-Options`, a referrer policy
   and `Permissions-Policy`.
3. Set up the mailboxes the site routes to (see *Contact routing* below).
4. Have legal counsel review and sign off the four policies in `legal/` — they are published
   in draft and say so on the page.
5. Confirm the registration number and registered address on `contact.html`.

### Contact routing

Enquiries are routed per division rather than into one inbox. These addresses must exist:

`hello@` · `partnerships@` · `dpi-lab@` · `opensource@` · `research@` · `helpdesk@` ·
`people@` · `security@` · `privacy@` · `safeguarding@` — all `@digitaltrustfutures.org`.

---

## Rebuilding

Content lives in the `_src/page_*.py` files as data (lists of rows, cards, programmes) plus
HTML fragments. The shared shell — `<head>`, header, navigation, footer — lives in
`_src/shell.py`, so a nav or footer change is made once.

```bash
python3 _src/build.py
```

Requires Python 3.8+. Nothing else.

| File | Holds |
| --- | --- |
| `_src/shell.py` | head, header, nav model, footer, icons, shared components |
| `_src/build.py` | page manifest, titles, meta descriptions, sitemap, headers |
| `_src/page_home.py` | home page, protection gaps, division cards, audiences |
| `_src/page_about.py` | about, values, theory of change, governance, IP, risk register |
| `_src/page_divisions.py` | division data and the five division pages |
| `_src/page_programmes.py` | launch programmes, flagship, fellowships, resource library |
| `_src/page_engage.py` | open source, get involved, enquiry routing |
| `_src/page_support.py` | funder investment case, funding model, news |
| `_src/page_misc.py` | contact, security policy, credits, legal, 404 |

Adding a resource to the library, for example, means adding one tuple to `RESOURCES` in
`_src/page_programmes.py` and rebuilding. Status labels (`planned`, `development`, `live`)
drive the badge shown against each record.

---

## Design system

Colours are sampled from the Foundation wordmark:

| Token | Value | Use |
| --- | --- | --- |
| Navy | `#133A63` | Headings, primary UI, dark bands |
| Orange | `#BC5012` | Accent, calls to action, rules |
| Teal | `#247E83` | Secondary accent |
| Brass | `#B08D57` | Tertiary rules (text uses the darker `#8A6A3B`) |
| Paper | `#F7F5F1` | Page background |

The website guide specified navy `#1B2A4A` and gold `#B08D57`. The wordmark navy and orange
were used instead where the two disagreed, so the site matches the actual logo; the guide's
gold survives as the brass tertiary and its light background as `--paper-2`.

Type is self-hosted: **Newsreader** (display), **Inter** (body), **IBM Plex Mono** (labels
and data) — all SIL Open Font License, latin + latin-ext subsets, ~400 KB total. Nothing is
requested from Google Fonts, so visiting the site does not disclose a reader's IP address to
a third party.

Every design token lives in `:root` in `assets/css/main.css`. Light and dark themes are both
first-class: the site follows `prefers-color-scheme` and the header toggle overrides it,
persisted in `localStorage` under `dtff-theme`.

---

## Verification performed

- **Links** — 23 pages scanned: 0 broken internal links, 0 missing anchor targets.
- **Layout** — no horizontal overflow on any page at 360, 390, 768, 1024 or 1440 px.
- **Contrast** — automated WCAG AA check across all pages in both themes: 0 failures.
  (Text over the photographic band was verified separately against the scrim.)
- **Structure** — one `h1` per page, no skipped heading levels, all images have `alt`
  text, all form controls have labels, every page has a `main` landmark.
- **Behaviour** — 22-check interaction suite in `_src/tests/interaction-tests.html`.
  To run it, copy the file into `website/`, serve the site, and open it; results print
  into the page. (Three checks depend on `requestAnimationFrame` and
  `IntersectionObserver` ticking, so they report false failures under headless Chrome's
  virtual time — they pass in a real browser.)

Not automated, and worth a human pass before launch: screen-reader walkthrough, real-device
testing, and legal review of the policy pages.

---

## Notes on content

Two constraints from the website guide were treated as hard rules:

**No fabricated figures.** Every number on the site is traceable to the source documents —
five divisions, three launch programmes, a 24-month milestone path, the USD 300,000
two-year portfolio and its allocation. Where a proof point would normally sit (countries
engaged, DPGs supported, publications released) the site either omits it or states plainly
that it will be published once real.

**No implied relationships.** No funder, government or digital public good is named as a
partner. Prospective funders appear as categories, with an explicit note that they are
illustrative. The resource library shows honest status labels and no download links until a
resource genuinely exists. The news and project directories say they are empty rather than
inventing entries.

Imagery is licensed under the Pexels License; photographers are credited on
`credits.html`. Two rules were applied when selecting it: no identifiable faces, and nothing
that could be read as depicting a real partner or beneficiary of the Foundation. Diagrams —
the citizen risk map, the security → safety → trust → inclusion chain, the allocation bars —
are built natively in HTML and CSS, not images, so they scale, reflow and respond to theme.

---

© 2026 Digital Trust Futures Foundation NPC. Site content and Foundation resources are
intended for release under CC BY 4.0; the name, logo and wordmark are not.
