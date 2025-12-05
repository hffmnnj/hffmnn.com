import { Marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

interface RepoInfo {
	owner: string;
	repo: string;
	branch?: string;
}

function transformGitHubImageUrl(src: string, repo: RepoInfo): string {
	if (src.startsWith('http://') || src.startsWith('https://')) {
		return src;
	}
	const cleanPath = src.startsWith('./') ? src.slice(2) : src;
	const branch = repo.branch || 'main';
	return `https://raw.githubusercontent.com/${repo.owner}/${repo.repo}/${branch}/${cleanPath}`;
}

function transformGitHubLink(href: string, repo: RepoInfo): string {
	if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) {
		return href;
	}
	const branch = repo.branch || 'main';
	return `https://github.com/${repo.owner}/${repo.repo}/blob/${branch}/${href}`;
}

export function parseMarkdown(content: string, repo: RepoInfo): string {
	try {
		const marked = new Marked();

		marked.use({
			renderer: {
				image({ href, title, text }) {
					const absoluteUrl = transformGitHubImageUrl(href, repo);
					const titleAttr = title ? ` title="${title}"` : '';
					return `<img src="${absoluteUrl}" alt="${text}"${titleAttr} loading="lazy" class="rounded-lg my-4 max-w-full" />`;
				},
				link({ href, title, text }) {
					const absoluteUrl = transformGitHubLink(href, repo);
					const titleAttr = title ? ` title="${title}"` : '';
					const external = absoluteUrl.startsWith('http')
						? ' target="_blank" rel="noopener noreferrer"'
						: '';

					// Handle unrendered image markdown inside links (e.g., badge images)
					let renderedText = text;
					const imgMatch = text.match(/^!\[(.*?)\]\((.*?)\)$/);
					if (imgMatch) {
						const [, alt, imgSrc] = imgMatch;
						const absoluteImgUrl = transformGitHubImageUrl(imgSrc, repo);
						// Use eager loading for badges with no-referrer policy to avoid Firefox mobile blocking
						renderedText = `<img src="${absoluteImgUrl}" alt="${alt}" loading="eager" referrerpolicy="no-referrer" crossorigin="anonymous" class="inline-block h-5" />`;
					}

					return `<a href="${absoluteUrl}"${titleAttr}${external} class="text-white/80 hover:text-white underline">${renderedText}</a>`;
				}
			}
		});

		const html = marked.parse(content) as string;

		// Sanitize HTML to prevent XSS attacks from external README content
		return DOMPurify.sanitize(html, {
			ADD_ATTR: ['target', 'rel', 'loading', 'referrerpolicy', 'crossorigin'],
			ADD_TAGS: ['img']
		});
	} catch (error) {
		console.error('Failed to parse markdown:', error);
		return '<p class="text-red-400">Failed to load README content.</p>';
	}
}
