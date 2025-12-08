import commitCache from '$lib/data/commit-cache.json';

export interface CommitInfo {
	date: string;
	message: string;
	sha: string;
}

interface CommitCache {
	_note: string;
	_updated: string;
	commits: Record<string, CommitInfo>;
}

const cache = commitCache as CommitCache;

export async function fetchLatestCommit(
	owner: string,
	repo: string,
	fetch: typeof globalThis.fetch = globalThis.fetch,
	token?: string
): Promise<CommitInfo | null> {
	const cacheKey = `${owner}/${repo}`;

	try {
		const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`;
		const headers: HeadersInit = {
			Accept: 'application/vnd.github.v3+json'
		};

		// Use GitHub token if provided (for higher rate limits)
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const response = await fetch(url, { headers });

		if (!response.ok) {
			// Fall back to cache on API error (rate limiting, etc.)
			return getCachedCommit(cacheKey);
		}

		const commits = await response.json();
		if (commits.length === 0) return getCachedCommit(cacheKey);

		const commit = commits[0];
		return {
			date: commit.commit.committer.date,
			message: commit.commit.message.split('\n')[0],
			sha: commit.sha.substring(0, 7)
		};
	} catch {
		// Fall back to cache on error
		return getCachedCommit(cacheKey);
	}
}

function getCachedCommit(key: string): CommitInfo | null {
	const cached = cache.commits[key];
	if (cached) {
		return cached;
	}
	return null;
}

export function formatRelativeTime(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();
	const diffMs = now.getTime() - date.getTime();
	const diffSecs = Math.floor(diffMs / 1000);
	const diffMins = Math.floor(diffSecs / 60);
	const diffHours = Math.floor(diffMins / 60);
	const diffDays = Math.floor(diffHours / 24);
	const diffWeeks = Math.floor(diffDays / 7);
	const diffMonths = Math.floor(diffDays / 30);
	const diffYears = Math.floor(diffDays / 365);

	if (diffYears > 0) return `${diffYears}y ago`;
	if (diffMonths > 0) return `${diffMonths}mo ago`;
	if (diffWeeks > 0) return `${diffWeeks}w ago`;
	if (diffDays > 0) return `${diffDays}d ago`;
	if (diffHours > 0) return `${diffHours}h ago`;
	if (diffMins > 0) return `${diffMins}m ago`;
	return 'just now';
}
