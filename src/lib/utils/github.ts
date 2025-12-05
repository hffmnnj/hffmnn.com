export interface CommitInfo {
	date: string;
	message: string;
	sha: string;
}

export async function fetchLatestCommit(
	owner: string,
	repo: string,
	fetch: typeof globalThis.fetch = globalThis.fetch
): Promise<CommitInfo | null> {
	try {
		const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`;
		const response = await fetch(url, {
			headers: {
				Accept: 'application/vnd.github.v3+json'
			}
		});

		if (!response.ok) {
			console.error(`GitHub API error: ${response.status}`);
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
		console.error(`Failed to fetch commit for ${owner}/${repo}:`, err);
		return null;
	}
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
