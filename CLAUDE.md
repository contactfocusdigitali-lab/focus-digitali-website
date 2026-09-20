# Focus Digitali — Website Project

## Project Overview
Landing page for Focus Digitali, a small digital solutions studio that builds bots, automations, and small systems for recurring daily problems.

## Tech Stack
- Plain HTML + CSS + vanilla JS (no framework, no build step)
- `index.html` (home), `projects.html` (all projects), `project.html?id=<id>` (one project, rendered from `projects.js`), `styles.css`, `script.js` (i18n, scroll thread, analytics, form), `projects.js` (project data + rendering), `privacy.html` + `accessibility.html` (legal pages, Hebrew only)
- RTL Hebrew content (`dir="rtl"`, `lang="he"`), EN toggle via `data-i18n*` keys in `script.js`

## Brand & Colors
| Role | Name | HEX |
|---|---|---|
| Main bg | Dark navy | `#0B1126` |
| Secondary bg / cards | Deep blue | `#111B3D` |
| Blue glow | Electric blue | `#2F6BFF` |
| Orange CTA | Brand orange | `#FF7A1A` |
| Orange hover | Light orange | `#FF9838` |
| Orange glow | Amber glow | `#FFB347` |
| Primary text | White | `#FFFFFF` |
| Secondary text | Light gray | `#C8D1E5` |
| Borders | Blue-gray | `#27355F` |

Text on orange buttons is navy (`#0B1126`), not white (white on orange fails AA contrast).

## Typography
- Display (headlines): Frank Ruhl Libre (Hebrew + Latin serif)
- Body/UI: Heebo
- Mono, Latin only (tags, PIECE ids): JetBrains Mono. It has no Hebrew glyphs.

## Design direction: "Puzzle Table"
- Metaphor: many small pieces that connect. Hero = loose pieces + one orange piece snapping in.
- Signature: the thread. A dashed line down the gutter of `.threaded` fills as you scroll (`--thread` set in `script.js`); each section has a puzzle-piece `.node` that lights when the thread reaches it.
- Tone: warm, direct, practical, not corporate, not "AI hype". Audience: small business owners / solo operators.

## Page Sections (index.html)
1. **Hero** — kicker (what we build), tagline headline, WhatsApp CTA, tools row, puzzle SVG
2. **Value** (`#value`) — 4 claims, each with a proof line
3. **Projects** (`#cases`) — featured projects rendered from `projects.js` into `#featuredProjects`
4. **About** (`#about`)
5. **CTA** (`#cta`) — WhatsApp card, 4-step process, contact form
6. Footer

There is no separate Process section; it lives inside the CTA as 4 numbered steps.

## Adding a project
1. Append an object to `PROJECTS` in `projects.js` (he/en text, `types`, `tags`, `visual`, `featured`). It shows on `projects.html`; `featured: true` also shows a preview card on the home page (first 3 only).
2. Add its entry to `DETAILS` (same id): `stack` (name + he/en role) and he/en `what`, `audience`, `goal`, `saves`. This feeds the project's own page.
3. Real screenshots: put files in `assets/showcase/<id>/` and list them in the project's `images: [{ src, he, en }]` (he/en = alt text). Ideal is 3-5. The gallery shows the built-in mockup first, then the images. `visual: null` uses a generic placeholder.

## Must keep working
- `script.js` hooks: `.nav-link`, `.nav-cta`, `a.btn-primary[href*=wa.me]` (hero), `[data-wa-source]` links, `.fade-in/.fade-up`, `#langToggle`, `.lang-opt`, `#contactForm`, `.cta-submit`, `#threaded`, `.node`, section ids `hero/value/cases/about/cta`
- GA4 (`G-93XHMTG2DY`), Clarity, `config.js` (gitignored, `SHEET_URL`)
- New text needs both `he` and `en` entries (i18n dict in `script.js`, or `LABELS`/project data in `projects.js`)

## Legal and accessibility
- Contact form has an unchecked, optional marketing-consent checkbox (Israeli Spam Law, section 30A of the Communications Law: explicit prior consent). The payload sent to the Google Sheet includes `marketingConsent`, `consentText`, `consentAt`, `pageUrl`, `lang`; the Apps Script must store them.
- The form notice and `privacy.html` describe real data flows only (Google Sheets, GA4, Clarity, Google Fonts, WhatsApp link, localStorage). If a data flow changes, update the policy in the same change. Do not add claims that are not verifiably true.
- Accessibility widget is built in `script.js` (`initA11yWidget`) with styles in `styles.css` (`html.a11y-*`); settings persist in localStorage key `a11y`. It complements, not replaces, real accessibility work (target: Israeli Standard 5568, level AA). The site has not had an external accessibility audit.
- Testing: `config.js` holds the real Apps Script URL. In tests, route `**/config.js` to a stub, or a test lead will be written to the live sheet.

## Testing
No build. Serve or open `index.html` directly. For screenshots and interaction checks, use playwright-core with `executablePath` set to the installed Google Chrome (headless Chrome enforces a ~500px min window width, so test mobile through a 390px iframe or playwright viewport).

## File Structure
```
├── CLAUDE.md
├── index.html
├── projects.html
├── styles.css
├── script.js
├── projects.js
├── logo.jpg
└── assets/
```
