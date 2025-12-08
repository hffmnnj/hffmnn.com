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
		title: 'Vibearchy',
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
	}
];

export const capyseoProjects: Project[] = [
	{
		slug: 'capyseo-core',
		title: '@capyseo/core',
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
		title: '@capyseo/cli',
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
		title: '@capyseo/sveltekit',
		description:
			'Deep SvelteKit integration with Vite plugin and real-time dev-time SEO feedback. Get instant SEO analysis as you develop.',
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

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getCapyseoProjectBySlug(slug: string): Project | undefined {
	return capyseoProjects.find((p) => p.slug === slug);
}
