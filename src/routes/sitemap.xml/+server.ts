import * as sitemap from 'super-sitemap';
import type { RequestHandler } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';

export const prerender = true;

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: 'https://hffmnn.com',
		excludeRoutePatterns: [],
		paramValues: {
			'/tools/[slug]': projects.map((p) => p.slug)
		},
		defaultChangefreq: 'weekly',
		defaultPriority: 0.7,
		sort: 'alpha'
	});
};
