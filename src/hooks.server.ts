import { createCapyseoHandle } from '@capyseo/sveltekit/hooks';

export const handle = createCapyseoHandle({
	logLevel: 'issues',
	exclude: ['/__data.json', '/api/*'],
	geminiApiKey: process.env.GEMINI_API_KEY,
});
