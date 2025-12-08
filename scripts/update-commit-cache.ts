#!/usr/bin/env bun
/**
 * Updates the commit cache with fresh data from GitHub API.
 * Run this periodically or after builds to keep cache fresh.
 */

import { projects, capyseoProjects } from '../src/lib/data/projects';

interface CommitInfo {
	date: string;
	message: string;
	sha: string;
}

interface CommitCache {
	_note: string;
	_updated: string;
	commits: Record<string, CommitInfo>;
}

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchCommit(owner: string, repo: string): Promise<CommitInfo | null> {
	const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`;
	const headers: HeadersInit = {
		Accept: 'application/vnd.github.v3+json'
	};

	if (GITHUB_TOKEN) {
		headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
	}

	try {
		const response = await fetch(url, { headers });
		if (!response.ok) {
			console.error(`Failed to fetch ${owner}/${repo}: ${response.status}`);
			return null;
		}

		const commits = await response.json();
		if (commits.length === 0) return null;

		const commit = commits[0];
		return {
			date: commit.commit.committer.date,
			message: commit.commit.message.split('\n')[0],
			sha: commit.sha.substring(0, 7)
		};
	} catch (err) {
		console.error(`Error fetching ${owner}/${repo}:`, err);
		return null;
	}
}

async function main() {
	const allProjects = [...projects, ...capyseoProjects];
	const cache: CommitCache = {
		_note: 'Auto-generated cache of last known commit times. Fallback when GitHub API is unavailable.',
		_updated: new Date().toISOString(),
		commits: {}
	};

	console.log('Fetching commit info for all projects...\n');

	for (const project of allProjects) {
		const key = `${project.githubOwner}/${project.githubRepo}`;
		console.log(`Fetching ${key}...`);

		const commit = await fetchCommit(project.githubOwner, project.githubRepo);
		if (commit) {
			cache.commits[key] = commit;
			console.log(`  ✓ ${commit.sha} - ${commit.date}`);
		} else {
			console.log(`  ✗ Failed`);
		}
	}

	const cachePath = new URL('../src/lib/data/commit-cache.json', import.meta.url);
	await Bun.write(cachePath, JSON.stringify(cache, null, 2) + '\n');

	console.log(`\nCache updated: ${cachePath.pathname}`);
}

main().catch(console.error);
