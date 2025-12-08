import { error } from '@sveltejs/kit';
import { getProjectBySlug, getCapyseoProjectBySlug, projects, capyseoProjects } from '$lib/data/projects';
import { fetchLatestCommit } from '$lib/utils/github';
import type { PageLoad, EntryGenerator } from './$types';

export const load: PageLoad = async ({ params, fetch, data }) => {
	const project = getProjectBySlug(params.slug) ?? getCapyseoProjectBySlug(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	// Get token from server data (if available)
	const token = data?.githubToken;

	const [markdownResult, lastCommit] = await Promise.all([
		fetchMarkdown(project, fetch),
		fetchLatestCommit(project.githubOwner, project.githubRepo, fetch, token)
	]);

	return {
		project,
		markdown: markdownResult.markdown,
		error: markdownResult.error,
		lastCommit
	};
};

async function fetchMarkdown(
	project: { githubOwner: string; githubRepo: string; slug: string },
	fetch: typeof globalThis.fetch
) {
	try {
		const url = `https://raw.githubusercontent.com/${project.githubOwner}/${project.githubRepo}/main/README.md`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const markdown = await response.text();
		return { markdown, error: null };
	} catch (err) {
		console.error(`Failed to fetch README for ${project.slug}:`, err);
		return { markdown: null, error: 'Unable to load README content.' };
	}
}

export const entries: EntryGenerator = () => {
	const allProjects = [...projects, ...capyseoProjects];
	return allProjects.map((p) => ({ slug: p.slug }));
};
