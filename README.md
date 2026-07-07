# Sawariya Solution — Website

A modern, fully responsive multi-page website for **Sawariya Solution**, a global
IT services company offering web, mobile, eCommerce, AI/ML, blockchain and cloud
development.

Built with plain **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build
step, no dependencies. It runs anywhere you can serve static files.

## Live site

Hosted with GitHub Pages. Open `index.html` locally, or run a quick server:

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

## Pages

| Page | File | Contents |
|------|------|----------|
| Home | `index.html` | Hero, about, services, industries, testimonials, process, tech stack, contact |
| About | `about.html` | Company story, stats, mission & values, why choose us |
| Services | `services.html` | Full service list, detailed sections, process, FAQ |
| Contact | `contact.html` | Contact details, enquiry form, location map |

## Structure

```
sawariya-solution-website/
├── index.html
├── about.html
├── services.html
├── contact.html
├── css/style.css
├── js/main.js
└── assets/
    ├── sawariya-logo.jpg
    ├── fonts/          # Inter + Sora (self-hosted)
    └── images/         # photos + avatars
```

## Features

- Dark, premium UI with a consistent design system and brand colours
- Sticky header with hover mega-menus (accordion drawer on mobile)
- Animated counters, scroll-reveal animations, floating cards
- Auto-playing, swipeable testimonials slider
- Working enquiry form with validation and success feedback
- Fully responsive across desktop, laptop, tablet and mobile (no horizontal scroll)
- SEO meta + Open Graph tags, `prefers-reduced-motion` support
- Self-hosted fonts and local images — fast and works offline

## Customising

- **Text:** edit the HTML files directly.
- **Contact details / social links:** they appear in the top bar, contact section
  and footer of each page.
- **Colours:** change the CSS variables at the top of `css/style.css`
  (`--brand`, `--brand-2`, `--brand-3`, backgrounds).
- **Photos:** replace files in `assets/images/` (names describe where each is used).
- **Connect the form to a backend:** replace the mock handler in `js/main.js`
  (`#contactForm`) with a `fetch()` POST to your endpoint.

## Tech

HTML5 · CSS3 (Grid, Flexbox, custom properties) · Vanilla JavaScript ·
Inter & Sora fonts · inline SVG icons.
