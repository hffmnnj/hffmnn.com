import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const body = ['User-agent: *', 'Allow: /', '', 'Sitemap: https://hffmnn.com/sitemap.xml'].join(
		'\n'
	);

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain' }
	});
};
