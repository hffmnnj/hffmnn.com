import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true
		}),
		alias: {
			$components: 'src/lib/components',
			$utils: 'src/lib/utils'
		},
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore missing favicon.ico during prerender
				if (path === '/favicon.ico') {
					return;
				}
				throw new Error(message);
			},
			handleMissingId: 'ignore' // README content may have internal anchor links
		}
	}
};

export default config;
