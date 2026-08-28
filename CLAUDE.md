# Focus Digitali — Website Project

## Project Overview
Landing page for Focus Digitali, a small digital solutions studio that builds bots, automations, and small systems for recurring daily problems.

## Tech Stack
- Plain HTML + CSS + vanilla JS (no framework)
- GSAP + ScrollTrigger, bundled locally for the hero sequence
- Vite for local preview; `npm run build` creates the static `dist/` artifact
- RTL Hebrew content (`dir="rtl"`, `lang="he"`)

## Brand & Colors
| Token | Value |
|---|---|
| Deep Navy (main bg) | `#121428` |
| Dark Background | `#0B0D1D` |
| Orange (brand) | `#E85B11` |
| Amber | `#F6A321` |
| Soft Gold | `#F2D15C` |
| Cream Text | `#F4F1EA` |
| Muted Beige | `#C5BEB2` |
| Light Border | `rgba(237,237,237,0.12)` |
| Brand Border | `rgba(246,163,33,0.24)` |

## Logo
`logo.jpg` — aviator sunglasses with orange/amber lens, dark navy bg, "FOCUS DIGITALI" wordmark.

## Page Sections
1. **Hero** — headline, sub-copy, 2 CTAs, scroll-linked WebP sequence on Canvas
2. **Intro** — problem statement (overload, scattered notes, recurring tasks)
3. **Case Studies** — 3 cases: Telegram status bot / Personal trainer bot / 3D-print management system
4. **Process** — 3 steps: identify → break down → build
5. **CTA** — email link `contact.focusdigitali@gmail.com`

## Narrative
- Tagline: "פתרונות קטנים לבעיות שחוזרות כל יום."
- CTA headline: "בואו נהפוך אותו לעוזר דיגיטלי קטן."
- Tone: direct, practical, human — not corporate, not "AI hype"

## File Structure
```
fd- website project/
├── CLAUDE.md
├── assets/hero-sequence/
├── assets/vendor/
├── scripts/
├── src/
├── index.html
├── app.js
├── script.js
├── styles.css
├── package.json
├── logo.jpg
```

## Design Notes
- Dark glassmorphism cards with `rgba` borders
- Orange/amber gradients on accents, buttons, and progress bars
- Smooth scroll between sections
- Progressive frame preloading, DPR-aware Canvas rendering, reduced-motion fallback
- Mobile-first, single-column stack
