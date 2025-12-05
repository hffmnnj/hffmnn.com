# hffmnn.com

![hffmnn.com](docs/images/header.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-Runtime-000000?logo=bun&logoColor=white)](https://bun.sh)
[![Static Site](https://img.shields.io/badge/Type-Static_Site-green)](https://kit.svelte.dev/docs/adapter-static)

Privacy-focused personal portfolio website showcasing open-source projects. Built with SvelteKit 5 and Tailwind CSS v4.

## Features

- **Dark-first design** — Pure black background with glassmorphism effects
- **Auto-fetched GitHub READMEs** — Project pages pull live README content from GitHub
- **Smooth load-in animations** — Staggered fade-up animations across all pages
- **Self-hosted fonts** — No external font requests for privacy
- **Static generation** — Pre-rendered HTML, no server required
- **Zero analytics** — No tracking, no cookies, no external scripts

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
| Icons | [Hugeicons](https://hugeicons.com) (Svelte) |
| Fonts | [Inter](https://rsms.me/inter/) + [Kode Mono](https://fonts.google.com/specimen/Kode+Mono) via @fontsource |
| Markdown | [Marked](https://marked.js.org) |
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
   - Custom styling applied to all markdown elements

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

2. Rebuild — the new project page is automatically generated at `/tools/my-project`

## Design System

### Colors

```css
--background: oklch(0% 0 0);           /* Pure black */
--foreground: oklch(93% 0 0);          /* Light gray text */
--muted-foreground: oklch(55% 0 0);    /* Medium gray */
--border: oklch(100% 0 0 / 8%);        /* Subtle white borders */
--pulsyn: oklch(75% 0.18 160);         /* Accent green */
```

### Typography

- **Display font**: Kode Mono Variable (headings)
- **Body font**: Inter Variable (paragraphs)

### Utilities

```css
.glass-card    /* Frosted glass card effect */
.glass-button  /* Frosted glass button */
.text-gradient /* White gradient text */
.animate-fade-up / .animate-fade-in / .animate-fade-scale
.delay-100 through .delay-700
```

## Project Structure

```
src/
├── app.css                    # Global styles, theme, animations
├── routes/
│   ├── +page.svelte          # Homepage
│   ├── tools/
│   │   ├── +page.svelte      # Projects listing
│   │   └── [slug]/
│   │       ├── +page.svelte  # Project detail (renders README)
│   │       └── +page.ts      # Fetches README from GitHub
│   └── venture/
│       └── +page.svelte      # Pulsyn venture page
├── lib/
│   ├── components/
│   │   ├── home/             # Homepage sections
│   │   ├── layout/           # Header, Footer, SocialLinks
│   │   ├── tools/            # ProjectCard
│   │   └── ui/               # Button, Badge, Card (shadcn pattern)
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
bun dev

# Type check
bun run check

# Build for production
bun build

# Preview production build
bun preview
```

## Build Output

Static files are generated to `build/` with:
- Pre-compressed brotli and gzip assets
- 404.html fallback
- All fonts bundled (no external requests)

Deploy to any static host: Netlify, Vercel, Cloudflare Pages, nginx, Caddy, etc.

## License

MIT
