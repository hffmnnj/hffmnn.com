# hffmnn.com

![hffmnn.com](docs/images/header.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-Runtime-000000?logo=bun&logoColor=white)](https://bun.sh)
[![Static Site](https://img.shields.io/badge/Type-Static_Site-green)](https://kit.svelte.dev/docs/adapter-static)
[![SEO by Capyseo](https://img.shields.io/badge/SEO-Capyseo-FF6B35?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PC9zdmc+)](https://github.com/Capyseo)

Privacy-focused personal portfolio website. Built with SvelteKit 5 and Tailwind CSS v4. Editorial newspaper aesthetic — warm paper substrate, Fraunces serif, hairline rules, drop caps, masthead navigation.

## Features

- **Editorial newspaper design** — Warm paper substrate with Fraunces + Newsreader + Geist Mono typography
- **Auto-fetched GitHub READMEs** — Project pages pull live README content from GitHub at build time
- **Variable font motion** — Fraunces optical-size and SOFT axes animate on hover via `@property`
- **Self-hosted fonts** — No external font requests for privacy
- **Static generation** — Pre-rendered HTML, no server required
- **Zero analytics** — No tracking, no cookies, no external scripts
- **CSS paper grain** — Subtle SVG noise overlay gives a tactile print feel
- **Scroll-driven reveals** — IntersectionObserver-powered clip-path entry animations

## Screenshots

### Homepage

![Homepage](docs/images/home.png)

### Tools & Projects

![Tools page](docs/images/tools.png)

### Project Detail (Auto-fetched README)

![Project detail page](docs/images/page_showcase.png)

### Venture Page

![Venture page](docs/images/venture.png)

### Mobile

![Mobile view](docs/images/mobile.png)

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [SvelteKit 2](https://svelte.dev) with [Svelte 5](https://svelte.dev/docs/svelte/overview) (runes syntax) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) (Vite plugin) |
| Runtime | [Bun](https://bun.sh) |
| Fonts | [Fraunces](https://fonts.google.com/specimen/Fraunces) + [Newsreader](https://fonts.google.com/specimen/Newsreader) + [Geist Mono](https://vercel.com/font) via @fontsource |
| Markdown | [Marked](https://marked.js.org) |
| SEO | [Capyseo](https://github.com/Capyseo) (build-time + dev-time analysis) |
| Deployment | Static adapter (any static host) |

## GitHub README Auto-Fetch

Project detail pages automatically fetch and render README.md files from GitHub repositories at build time.

### How It Works

1. **Data source** (`src/lib/data/projects.ts`):
   ```ts
   {
     slug: 'vibearchy',
     githubOwner: 'hffmnnj',
     githubRepo: 'Vibearchy',
     // ...
   }
   ```

2. **Fetch at build** (`src/routes/tools/[slug]/+page.ts`):
   ```ts
   const url = `https://raw.githubusercontent.com/${project.githubOwner}/${project.githubRepo}/main/README.md`;
   const response = await fetch(url);
   const markdown = await response.text();
   ```

3. **Transform & render** (`src/lib/utils/markdown.ts`):
   - Relative image paths → absolute GitHub raw URLs
   - Relative links → GitHub blob URLs
   - Badge images inside links are properly rendered
   - Editorial light-mode styling applied to all markdown elements

### Adding a New Project

1. Add project data to `src/lib/data/projects.ts`:
   ```ts
   {
     slug: 'my-project',
     title: 'My Project',
     description: 'Full description for the detail page',
     shortDescription: 'Brief description for cards',
     tags: ['Rust', 'CLI'],
     githubUrl: 'https://github.com/user/my-project',
     githubOwner: 'user',
     githubRepo: 'my-project',
     features: ['Feature 1', 'Feature 2']
   }
   ```

2. Spread the array in the `entries` generator in `src/routes/tools/[slug]/+page.ts` — required for static prerendering.

3. Rebuild — the new project page is automatically generated at `/tools/my-project`.

## Design System

### Colors

```css
--paper:          oklch(97% 0.01 80);   /* Warm off-white substrate */
--ink:            oklch(25% 0.02 80);   /* Charcoal foreground */
--ink-soft:       oklch(45% 0.03 80);   /* Secondary text */
--ink-faint:      oklch(60% 0.02 80);   /* Tertiary / kicker text */
--accent:         oklch(50% 0.18 25);   /* Classic ink red */
--paper-elevated: oklch(95% 0.01 80);   /* Card surfaces */
--pulsyn:         oklch(75% 0.18 160);  /* Pulsyn brand green */
--capybara:       oklch(55% 0.11 42);   /* Capyseo brand brown */
--reins:          oklch(65% 0.15 270);  /* Reins brand blue-violet */
```

### Typography

- **Display font**: Fraunces Variable — optical size + SOFT + WONK axes animate on hover
- **Body font**: Newsreader Variable — screen-optimized optical sizes
- **Mono font**: Geist Mono Variable — kicker labels, datelines, section metadata

### Editorial Primitives

```
src/lib/components/editorial/
├── Masthead.svelte      — nameplate + dateline + vol/issue + nav slot
├── Kicker.svelte        — uppercase tracked mono eyebrow label
├── Rule.svelte          — hairline / heavy / dotted / spacer variants
├── DropCap.svelte       — accent-colored first-letter with optical baseline
├── Byline.svelte        — italic "By James Hoffmann · Phoenix, AZ"
├── IssueTag.svelte      — ISSUE / VOL. / CURRENT mono pill
├── Marginalia.svelte    — xl-only sidebar aside
├── RunningHeader.svelte — xl-only vertical section breadcrumb
└── index.ts             — barrel export
```

### Utilities

```css
.paper-texture    /* Fixed SVG grain + ambient vignette overlay */
.fraunces-hover   /* Variable font axis animation via @property */
.editorial-link   /* Accent underline draw-in on hover */
.has-drop-cap     /* First-letter drop cap (accent color) */
.editorial-mono   /* Uppercase tracked Geist Mono */
.editorial-byline /* Italic Newsreader */
.ornament-break   /* Dotted rails + centered glyph section divider */
.pullquote        /* Accent-ruled italic blockquote */
.section-counter  /* Faint oversized mono backdrop numeral */
.ledger-row       /* Hover wash + title slide on project list rows */
.reveal-clip      /* IntersectionObserver scroll-in reveal */
.ticker-wrap      /* CSS-only infinite marquee (pauses on hover) */
```

## Project Structure

```
src/
├── app.css                    # Global styles, editorial theme, animations
├── routes/
│   ├── +page.svelte          # Homepage
│   ├── tools/
│   │   ├── +page.svelte      # Projects listing (ledger style)
│   │   └── [slug]/
│   │       ├── +page.svelte  # Project detail (renders README)
│   │       └── +page.ts      # Fetches README from GitHub
│   └── venture/
│       └── +page.svelte      # Pulsyn venture page
├── lib/
│   ├── components/
│   │   ├── editorial/        # Newspaper primitives (Masthead, Kicker, etc.)
│   │   ├── home/             # Homepage sections
│   │   ├── layout/           # Header, Footer, SocialLinks
│   │   ├── tools/            # ProjectCard
│   │   └── ui/               # Button, Badge (shadcn pattern)
│   ├── data/
│   │   └── projects.ts       # Project definitions
│   └── utils/
│       ├── cn.ts             # Class name utility
│       └── markdown.ts       # GitHub README transformer
```

## Development

```bash
# Install dependencies
bun install

# Start dev server (localhost:5173)
bun run dev

# Type check
bun run check

# Build for production
bun run build

# Preview production build
bun run preview
```

## SEO Analysis

This site uses [Capyseo](https://github.com/Capyseo) for SEO quality assurance:

- **During development**: SEO issues appear in terminal as you browse (`bun run dev`)
- **After build**: Run `bun seo` to analyze all pages

### Available Commands

```bash
bun seo      # Analyze build for SEO issues
bun seo:ai   # Analyze with AI-powered suggestions (requires GEMINI_API_KEY)
```

### Enable AI Suggestions

```bash
export GEMINI_API_KEY=your-key-here
bun seo:ai
```

## Build Output

Static files are generated to `build/` with:
- Pre-compressed brotli and gzip assets
- 404.html fallback
- All fonts bundled (no external requests)

Deploy to any static host: Netlify, Vercel, Cloudflare Pages, nginx, Caddy, etc.

## License

MIT
