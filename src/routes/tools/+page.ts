import { projects } from '$lib/data/projects';
import { fetchLatestCommit, type CommitInfo } from '$lib/utils/github';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const commits: Record<string, CommitInfo | null> = {};

	await Promise.all(
		projects.map(async (project) => {
			commits[project.slug] = await fetchLatestCommit(
				project.githubOwner,
				project.githubRepo,
				fetch
			);
		})
	);

	return { commits };
};
