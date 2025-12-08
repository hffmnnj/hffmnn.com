import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { capyseo } from '@capyseo/sveltekit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
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
