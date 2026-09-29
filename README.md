<img src="public/hero-cupcake-doodle.png" alt="crumb. — a hand-drawn cupcake illustration in pink and butter yellow" width="220" />

# crumb.

A single-page website for a fictional small-batch cupcake shop, built as a personal front-end design study.

**Live: [crumb-drab.vercel.app](https://crumb-drab.vercel.app/)**

---

## About

The brief I set myself was to build a bakery homepage that feels made rather than generated. That meant picking one clear direction — a warm cream-and-dough palette, a rationed butter yellow, hand-drawn ink outlines, and a single saturated pink reserved for accents — and then holding the line on it everywhere, including the parts nobody looks at.

The page is also a working demonstration of the fundamentals: real metadata, one deliberate type system, a scroll-motion layer that degrades properly for anyone who has asked for reduced motion, and a 3D hero that stays off the critical path.

## Highlights

**Art direction**

- Ten-section single-page flow — hero, reservation band, how-it-works, three story panels, quotes carousel, today's case, closing, footer — each with its own layout logic rather than one repeated card grid.
- Two typefaces doing distinct jobs: **Fraunces** (variable, with the `SOFT` and `WONK` axes tuned) for display, **Outfit** for body — both self-hosted and preloaded via `next/font`.
- Every section boundary is a **real seam**, not a flat hairline: a `<Divider>` component draws scallop, drip and big-lobe shapes as inline SVG with the colour of the section above and below, so the dividers physically connect the bands.
- The palette is deliberately rationed. Cream and dough carry the page; butter appears only in the reservation band, the quotes band and hover states; pink is reserved for accents so it never stops reading as an accent.
- Decorations are brand-appropriate rather than stock: hand-drawn piped-frosting corners in the reservation band, a folded box with stressed flaps in the steps section, monogram bottle-cap avatars in the quotes carousel.
- No italics anywhere, and copy written to avoid the usual AI cadence — no balanced couplets, no tricolons, no em-dash asides.

**Engineering**

| Area | What was done |
|---|---|
| **3D hero** | A real glTF cupcake (`cupcake.glb`, 43,744 tris, one 2048² texture) rendered with **react-three-fiber**, lit by an in-scene IBL plus four Lightformers, `NeutralToneMapping` at 1.15 exposure. Fit distance is computed from the camera FOV so the model frames itself correctly at any container size. |
| **Performance** | The whole 3D scene is code-split through `next/dynamic`, so it loads after the page is interactive rather than blocking it. Route ships at **8.45 kB / 111 kB First Load JS**, prerendered static. |
| **Motion** | A small scroll-motion system (`Reveal`, `Parallax`) with per-element `--d` delays, intersection-based entry at a 0.12 threshold, and a `<noscript>` fallback that reveals everything when JS is off. |
| **Accessibility** | Semantic landmarks, one `<h1>`, labelled carousel controls, `aria-hidden` on every decorative layer, and a `prefers-reduced-motion` block that disables all animation rather than merely shortening it. |
| **Responsive** | Verified from 360 px through 1440 px+. Sections reflow rather than shrink: the reservation docket stacks, the box flaps tuck in at 560 px, and the hero decorations only appear above 1100 px where there is genuine gutter space for them. |
| **Hover correctness** | Hover lift is drawn with `box-shadow` rather than a `transform` — translating the element moved its hitbox out from under the cursor and caused the hover to drop and re-fire, which read as a flicker. |

## Tech stack

- **[Next.js 15](https://nextjs.org)** (App Router) — statically prerendered
- **React 19**
- **[react-three-fiber](https://docs.pmnd.rs/react-three-fiber)** + **[drei](https://github.com/pmndrs/drei)** — the hero cupcake
- **[Three.js](https://threejs.org)**
- Plain **CSS** with custom properties — no framework, no preprocessor
- **`next/font`** self-hosting Fraunces and Outfit

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build (all routes prerender statically)
npm start       # serve the production build
```

## Environment

There are no secrets, APIs, databases or server routes — the site is entirely static.

`next.config.mjs` allows remote images from `images.unsplash.com`, used for the placeholder photography.

## Project structure

```
app/
├── layout.jsx          # Fraunces + Outfit fonts, metadata, noscript fallback
├── page.jsx            # homepage composition and section dividers
├── globals.css         # design tokens, base styles, every component (~2,000 lines)
└── icon.svg            # favicon
components/
├── Navbar.jsx          # sticky header that tightens on scroll
├── Hero.jsx            # hero column, side decoration, drip seam
├── HeroCupcake.jsx     # three-fiber scene: camera fit, lighting, float/spin
├── HeroCupcakeClient.jsx  # next/dynamic boundary for the 3D scene
├── Sections.jsx        # Band, Steps, Panels, Strip
├── StepsBox.jsx        # the folded box (server component)
├── BoxOpen.jsx         # four stressed-flap SVGs
├── Quotes.jsx          # carousel with monogram avatars
├── Closing.jsx         # visit block + footer
├── Divider.jsx         # scallop / drip / big seam shapes
├── Drip.jsx            # the hero's cream-to-pink scallop
├── Reveal.jsx          # intersection-based entry animations
├── Parallax.jsx        # scroll-linked float
├── Icing.jsx           # the butter icing edge under the navbar
└── Underline.jsx       # hand-drawn link underline
lib/
└── images.js           # the splash photography set
public/
├── cupcake.glb         # the 3D model, 1.67 MB
├── hero-cupcake-doodle.png
└── hero-cake-doodle.png
```

## Assets

`cupcake.glb` is a generated 3D model, Y-up, normalised to one unit tall with a single 2048² JPEG texture. The two hand-drawn hero illustrations are from [Icons8](https://icons8.com) in their `doodle` style. The splash photography is stock placeholder imagery from Unsplash used to demonstrate layout and art direction.

## Status

This is a single homepage and is intentionally scoped that way. The links intentionally point at on-page anchors, and the cart badge, pickup flow and checkout are static. Still to build: real shop and product routes, a working cart, and a form backend.

---

Built by [Jimwel](https://github.com/Jimwel0406).
