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
		slug: 'me-and-my-friends',
		title: 'Me and My Friends (MAMF)',
		description:
			'A Rust-based terminal UI for hosting multi-advisor AI council discussions. Query multiple LLMs simultaneously and get diverse perspectives on any topic.',
		shortDescription: 'Rust TUI for multi-advisor AI council discussions with RAG integration.',
		tags: ['Rust', 'TUI', 'AI', 'Ratatui', 'Multi-LLM'],
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
		slug: 'vibearchy',
		title: 'Vibearchy Desktop Environment',
		description:
			'A privacy-first Arch Linux + Hyprland desktop environment with seamless AI integration. Built for developers who want a beautiful, functional workspace without compromising on privacy.',
		shortDescription:
			'Privacy-first Arch + Hyprland desktop environment with AI integration and beautiful aesthetics.',
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
		slug: 'enclave-mail',
		title: 'Enclave Mail',
		description:
			'A self-hosted, end-to-end encrypted email server with a zero-knowledge design — your keys stay in your browser and the server never sees plaintext.',
		shortDescription:
			'Self-hosted E2E encrypted email server with zero-knowledge design — keys stay in your browser, server never sees plaintext.',
		tags: ['TypeScript', 'Privacy', 'Self-hosted', 'Encryption', 'Email'],
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
			'A spec-driven development plugin for OpenCode that enforces a structured 5-phase workflow and coordinates 15 specialized AI agents to build software with precision.',
		shortDescription:
			'Spec-driven development plugin for OpenCode with a structured 5-phase workflow and 15 specialized AI agents.',
		tags: ['TypeScript', 'OpenCode', 'AI', 'Developer Tools', 'Plugin'],
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
		slug: 'nano-banana-cli',
		title: 'Nano Banana CLI',
		description:
			'A terminal image generator powered by Gemini AI that requires no API key — just your Google account. Generate images in parallel from the command line.',
		shortDescription:
			'Terminal image generator using Gemini AI — no API key required, just your Google account.',
		tags: ['CLI', 'TypeScript', 'Bun', 'Gemini', 'AI'],
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
			'Framework-agnostic SEO analysis engine with 50+ rules and multi-provider AI integration. Build custom SEO tools or integrate into your CI/CD pipeline.',
		shortDescription: 'Core SEO analysis engine with 50+ rules and AI suggestions.',
		tags: ['TypeScript', 'SEO', 'AI', 'Node.js'],
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
			'Powerful command-line SEO analyzer for any website or static site. Get AI-powered suggestions for meta descriptions, alt text, and content improvements.',
		shortDescription: 'CLI tool for SEO analysis of any website with AI suggestions.',
		tags: ['CLI', 'SEO', 'AI', 'Node.js'],
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
			'Deep SvelteKit integration with Vite plugin and real-time dev-time SEO feedback. Get instant SEO analysis as you develop with AI-powered suggestions.',
		shortDescription: 'SvelteKit Vite plugin for dev-time SEO analysis.',
		tags: ['SvelteKit', 'Vite', 'SEO', 'TypeScript'],
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

export const reinsProjects: Project[] = [
	{
		slug: 'reins-core',
		title: 'Reins — AI Assistant',
		description:
			'An open-source, privacy-first AI assistant that runs on your device. Connects to 30+ apps, works offline, and deploys across desktop, mobile, and browser without sending your data to the cloud.',
		shortDescription:
			'Open-source AI assistant that runs on your device — offline-capable, privacy-first, and integrates with 30+ apps.',
		tags: ['AI', 'Privacy', 'TypeScript', 'Open Source', 'Multi-platform'],
		githubUrl: 'https://github.com/reins-ai/reins-core',
		githubOwner: 'reins-ai',
		githubRepo: 'reins-core',
		websiteUrl: 'https://reinsbot.com',
		features: [
			'Open source under MIT — full transparency, no lock-in',
			'On-device AI processing — your data never leaves your machine',
			'30+ app integrations across productivity, communication, and dev tools',
			'Offline support — works without an internet connection',
			'Runs on Desktop, Mobile, and Browser from a single codebase',
			'Three deployment modes: local, self-hosted, and cloud'
		]
	},
	{
		slug: 'reins-mobile',
		title: 'Reins Mobile',
		description:
			'The native iOS and Android companion to Reins. Brings on-device AI to your pocket with push notifications, voice input, and seamless sync with your desktop.',
		shortDescription:
			'Native iOS and Android app for the Reins AI assistant — on-device AI in your pocket.',
		tags: ['Mobile', 'iOS', 'Android', 'AI', 'React Native'],
		githubUrl: 'https://github.com/reins-ai/reins-mobile',
		githubOwner: 'reins-ai',
		githubRepo: 'reins-mobile',
		websiteUrl: 'https://reinsbot.com',
		features: [
			'Native iOS and Android built with React Native',
			'Push notifications for AI responses and workflow completions',
			'Voice input for hands-free AI interaction',
			'Seamless sync with your Reins desktop instance',
			'On-device processing for sensitive queries'
		]
	}
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getCapyseoProjectBySlug(slug: string): Project | undefined {
	return capyseoProjects.find((p) => p.slug === slug);
}

export function getReinsProjectBySlug(slug: string): Project | undefined {
	return reinsProjects.find((p) => p.slug === slug);
}
