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

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
