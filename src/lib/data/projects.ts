export interface Project {
	slug: string;
	title: string;
	description: string;
	shortDescription: string;
	tags: string[];
	githubUrl: string;
	githubOwner: string;
	githubRepo: string;
	features: string[];
	websiteUrl?: string;
}

export const projects: Project[] = [
	{
		slug: 'enclave-mail',
		title: 'Enclave Mail',
		description:
			"I built Enclave Mail after getting tired of email servers that hold the decryption keys. The server never touches plaintext. Keys are derived with Argon2id in your browser, X25519/Ed25519 handle the encryption, and SRP makes sure your password never travels the wire.",
		shortDescription:
			'Self-hosted email with zero-knowledge design. Argon2id key derivation, SRP auth, server never sees plaintext.',
		tags: ['TypeScript', 'Bun', 'Astro', 'React', 'Hono', 'Docker', 'Privacy', 'Encryption'],
		githubUrl: 'https://github.com/hffmnnj/enclave-mail',
		githubOwner: 'hffmnnj',
		githubRepo: 'enclave-mail',
		features: [
			'Zero-knowledge design — server never sees plaintext',
			'Argon2id key derivation with X25519/Ed25519 encryption',
			'SRP authentication — password never leaves your device',
			'Haraka SMTP + IMAP server for full email compatibility',
			'Astro-powered webmail client included',
			'One-command deployment with Docker Compose'
		]
	},
	{
		slug: 'opencode-goopspec',
		title: 'GoopSpec — OpenCode Plugin',
		description:
			"I built GoopSpec because AI-assisted development kept shipping the wrong thing. It enforces a 5-phase workflow where specs are locked contracts before any code runs. Fifteen specialized agents handle research, planning, execution, and verification so nothing ships untested.",
		shortDescription:
			'Spec-driven OpenCode plugin. 5-phase workflow with locked contracts and 15 specialized AI agents.',
		tags: ['TypeScript', 'Bun', 'OpenCode', 'AI', 'Developer Tools'],
		githubUrl: 'https://github.com/hffmnnj/opencode-goopspec',
		githubOwner: 'hffmnnj',
		githubRepo: 'opencode-goopspec',
		features: [
			'5-phase spec-driven workflow (Discuss → Plan → Execute → Audit → Confirm)',
			'15 specialized AI agents for every phase of development',
			'Locked specifications as an immutable development contract',
			'Wave-based execution with dependency management',
			'Persistent memory across sessions',
			'Mandatory acceptance gate before any feature ships'
		]
	},
	{
		slug: 'vibearchy',
		title: 'Vibearchy Desktop Environment',
		description:
			"Vibearchy is my Arch Linux + Hyprland daily driver, open-sourced. Comes with 20+ dotfile packages, 119 wallpapers, a custom Rofi menu ecosystem, and an AI menu that keeps processing local. Three color themes, Zen Browser with privacy extensions, zero telemetry.",
		shortDescription:
			'Arch + Hyprland daily driver, open-sourced. 20+ dotfiles, 119 wallpapers, local AI menu, zero telemetry.',
		tags: ['Arch Linux', 'Hyprland', 'AI', 'Privacy', 'Dotfiles'],
		githubUrl: 'https://github.com/hffmnnj/Vibearchy',
		githubOwner: 'hffmnnj',
		githubRepo: 'Vibearchy',
		features: [
			'20+ carefully curated dotfile packages',
			'AI menu system with privacy-first design',
			'3 beautiful color themes (Celestial, Midnight, Dawn)',
			'119 handpicked wallpapers with smooth transitions',
			'Custom Rofi menu ecosystem',
			'Zen Browser integration with privacy extensions'
		]
	},
	{
		slug: 'me-and-my-friends',
		title: 'Me and My Friends (MAMF)',
		description:
			"I wanted to hear multiple AI opinions at once without leaving the terminal. MAMF spins up an AI council in Rust with Ratatui. Multiple LLMs respond in parallel, RAG with Qdrant gives them memory, and Living Council mode detects when they have converged.",
		shortDescription: 'Rust TUI that runs multiple LLMs as a council. Parallel responses, Qdrant RAG, Living Council consensus detection.',
		tags: ['Rust', 'Tokio', 'Ratatui', 'Qdrant', 'AI', 'TUI'],
		githubUrl: 'https://github.com/hffmnnj/me-and-my-friends',
		githubOwner: 'hffmnnj',
		githubRepo: 'me-and-my-friends',
		features: [
			'Multiple LLM providers (Ollama, Gemini, OpenAI, etc.)',
			'RAG/knowledge base integration with Qdrant',
			'Beautiful terminal UI with Ratatui',
			'Council-style multi-advisor discussions',
			'Living Council mode with consensus detection',
			'Session history and export to Markdown'
		]
	},
	{
		slug: 'nano-banana-cli',
		title: 'Nano Banana CLI',
		description:
			"Nano Banana generates images via Gemini without requiring an API key. It authenticates through your Google account using Playwright-driven browser automation, runs multiple prompts in parallel, and exports straight to disk. Zero config, one command.",
		shortDescription:
			'Gemini image generation in the terminal, no API key. Playwright browser auth, parallel generation, zero config.',
		tags: ['TypeScript', 'Bun', 'Playwright', 'CLI', 'AI'],
		githubUrl: 'https://github.com/hffmnnj/nano-banana-cli',
		githubOwner: 'hffmnnj',
		githubRepo: 'nano-banana-cli',
		features: [
			'No API key required — authenticates via your Google account',
			'Parallel image generation for multiple prompts at once',
			'Custom output paths and filename control',
			'Session persistence — no repeated logins',
			'Headed mode for debugging browser automation',
			'Zero-config via npx or bunx'
		]
	}
];

export const capyseoProjects: Project[] = [
	{
		slug: 'capyseo-core',
		title: '@capyseo/core - SEO Analysis Engine',
		description:
			"The core of the CapySEO toolkit. Fifty-plus rules cover meta, images, headings, social tags, and technical SEO. Plug in Gemini, OpenAI, Anthropic, or Ollama for AI suggestions. Outputs console, JSON, HTML, CSV, or SARIF.",
		shortDescription: 'SEO analysis engine with 50+ rules. Multi-provider AI (Gemini, OpenAI, Anthropic, Ollama), five output formats.',
		tags: ['TypeScript', 'Bun', 'Playwright', 'Anthropic', 'OpenAI', 'SEO', 'AI'],
		githubUrl: 'https://github.com/Capyseo/capyseo-core',
		githubOwner: 'Capyseo',
		githubRepo: 'capyseo-core',
		features: [
			'50+ SEO rules (meta, images, headings, social, technical)',
			'Multi-provider AI support (Gemini, OpenAI, Anthropic, Ollama)',
			'Custom rules support',
			'Multiple reporters (console, JSON, HTML, CSV, SARIF)'
		]
	},
	{
		slug: 'capyseo-cli',
		title: '@capyseo/cli - SEO Command Line Tool',
		description:
			"Analyze any website or local folder from the command line. CapySEO CLI checks 50+ SEO rules, suggests AI-generated meta descriptions and alt text, and exits with codes that plug into CI/CD. Ships sitemaps and robots.txt too.",
		shortDescription: 'CLI SEO analyzer for live URLs and local builds. AI suggestions, CI/CD-compatible exit codes, sitemap generation.',
		tags: ['TypeScript', 'Bun', 'Node.js', 'SEO', 'CLI'],
		githubUrl: 'https://github.com/Capyseo/capyseo-cli',
		githubOwner: 'Capyseo',
		githubRepo: 'capyseo-cli',
		features: [
			'Analyze local folders or live URLs',
			'AI-powered meta description and alt text suggestions',
			'CI/CD integration with exit codes',
			'Generate sitemaps, robots.txt, meta tags'
		]
	},
	{
		slug: 'capyseo-sveltekit',
		title: '@capyseo/sveltekit - SvelteKit SEO Plugin',
		description:
			"SvelteKit Vite plugin that surfaces SEO issues as you develop. The server hook catches problems at request time during dev, AI suggests meta descriptions and alt text, and the build-time check runs before your CI does.",
		shortDescription: 'SvelteKit Vite plugin for dev-time SEO analysis. AI suggestions on save, build-time checks, zero config.',
		tags: ['TypeScript', 'SvelteKit', 'Vite', 'Bun', 'SEO'],
		githubUrl: 'https://github.com/Capyseo/capyseo-sveltekit',
		githubOwner: 'Capyseo',
		githubRepo: 'capyseo-sveltekit',
		features: [
			'Vite plugin for build-time analysis',
			'Server hooks for real-time dev feedback',
			'AI-powered meta and alt text suggestions',
			'Zero-config setup with sensible defaults',
			'Works with SvelteKit 2.x, Svelte 4 & 5'
		]
	}
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getCapyseoProjectBySlug(slug: string): Project | undefined {
	return capyseoProjects.find((p) => p.slug === slug);
}
