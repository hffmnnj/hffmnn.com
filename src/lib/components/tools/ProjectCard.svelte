<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { GithubIcon, ArrowRight01Icon, Tick01Icon, RefreshIcon } from "@hugeicons/core-free-icons";
	import type { CommitInfo } from "$lib/utils/github";
	import { formatRelativeTime } from "$lib/utils/github";

	interface Props {
		slug: string;
		title: string;
		description: string;
		tags: string[];
		githubUrl: string;
		features: string[];
		lastCommit?: CommitInfo | null;
		class?: string;
	}

	let { slug, title, description, tags, githubUrl, features, lastCommit, class: className }: Props = $props();

	function handleGithubClick(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		window.open(githubUrl, '_blank', 'noopener,noreferrer');
	}
</script>

<a href="/tools/{slug}" class="flex flex-col glass-card p-8 group hover:border-white/15 transition-all duration-500 relative h-full {className}">
	<article class="flex-1">
		<div class="flex items-start justify-between mb-6">
			<h3 class="font-display text-2xl font-semibold">
				{title}
			</h3>
			<div class="flex items-center gap-2">
				{#if lastCommit}
					<div class="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60">
						<HugeiconsIcon icon={RefreshIcon} size={14} class="text-white/40" />
						<span>{formatRelativeTime(lastCommit.date)}</span>
					</div>
				{/if}
				<button
					onclick={handleGithubClick}
					class="p-2 rounded-lg glass-button opacity-60 hover:opacity-100 hover:scale-110 transition-all"
					aria-label="View on GitHub"
				>
					<HugeiconsIcon icon={GithubIcon} size={20} />
				</button>
			</div>
		</div>

		<p class="text-muted-foreground mb-6 leading-relaxed">
			{description}
		</p>

		<div class="flex flex-wrap gap-2 mb-6">
			{#each tags as tag}
				<Badge variant="secondary" class="bg-white/5 border-white/10 text-white/70">
					{tag}
				</Badge>
			{/each}
		</div>

		<ul class="space-y-2">
			{#each features as feature}
				<li class="text-sm text-muted-foreground flex items-start gap-2">
					<HugeiconsIcon icon={Tick01Icon} size={16} class="text-white/40 flex-shrink-0 mt-0.5" />
					{feature}
				</li>
			{/each}
		</ul>
	</article>

	<!-- Arrow indicator -->
	<div class="absolute bottom-8 right-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
		<HugeiconsIcon icon={ArrowRight01Icon} size={24} />
	</div>
</a>
