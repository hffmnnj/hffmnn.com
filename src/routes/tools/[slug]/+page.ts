import { error } from '@sveltejs/kit';
import { getProjectBySlug, projects } from '$lib/data/projects';
import type { PageLoad, EntryGenerator } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw error(404, 'Project not found');
	}

	try {
		const url = `https://raw.githubusercontent.com/${project.githubOwner}/${project.githubRepo}/main/README.md`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const markdown = await response.text();

		return {
			project,
			markdown,
			error: null
		};
	} catch (err) {
		console.error(`Failed to fetch README for ${params.slug}:`, err);
		return {
			project,
			markdown: null,
			error: 'Unable to load README content.'
		};
	}
};

export const entries: EntryGenerator = () => {
	return projects.map((p) => ({ slug: p.slug }));
};
