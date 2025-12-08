import { GITHUB_TOKEN } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		githubToken: GITHUB_TOKEN || undefined
	};
};
