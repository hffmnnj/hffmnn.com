import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { capyseo } from '@capyseo/sveltekit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: ['three']
	},
	build: {
		// Three.js chunk is intentionally large (~600KB) — expected for WebGL apps
		chunkSizeWarningLimit: 1000,
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					if (id.includes('node_modules/three')) return 'three';
				}
			}
		}
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		capyseo({
			minScore: 80,
			failOnError: false,
			exclude: ['/__data.json', '/api/*'],
			geminiApiKey: process.env.GEMINI_API_KEY,
		}),
	]
});
