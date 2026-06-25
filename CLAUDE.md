# Focus Digitali — Website Project

## Project Overview
Landing page for Focus Digitali, a small digital solutions studio that builds bots, automations, and small systems for recurring daily problems.

## Tech Stack
- Plain HTML + CSS + vanilla JS (no framework, no build step)
- Single `index.html` + `styles.css` + optional `script.js`
- RTL Hebrew content (`dir="rtl"`, `lang="he"`)

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

## Logo
`logo.jpg` — aviator sunglasses with orange/amber lens, dark navy bg, "FOCUS DIGITALI" wordmark.

## Page Sections
1. **Hero** — headline, sub-copy, 2 CTAs, "Daily AI Ops" card visual
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
├── index.html
├── styles.css
├── logo.jpg
```

## Design Notes
- Dark glassmorphism cards with `rgba` borders
- Orange/amber gradients on accents, buttons, and progress bars
- Smooth scroll between sections
- Minimal motion: subtle fade-in on scroll
- Mobile-first, single-column stack
