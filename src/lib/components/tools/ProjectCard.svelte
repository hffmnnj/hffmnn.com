<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { GithubIcon, InformationCircleIcon } from "@hugeicons/core-free-icons";

	interface Props {
		slug: string;
		title: string;
		description: string;
		tags: string[];
		githubUrl: string;
		features: string[];
		class?: string;
	}

	let { slug, title, description, tags, githubUrl, features, class: className }: Props = $props();
</script>

<article class="glass-card p-8 group hover:border-white/15 transition-all duration-500 {className}">
	<div class="flex items-start justify-between mb-6">
		<h3 class="font-display text-2xl font-semibold">
			{title}
		</h3>
		<div class="flex gap-2">
			<a
				href="/tools/{slug}"
				class="p-2 rounded-lg glass-button opacity-60 group-hover:opacity-100 transition-opacity"
				aria-label="View project details"
			>
				<HugeiconsIcon icon={InformationCircleIcon} size={20} />
			</a>
			<a
				href={githubUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="p-2 rounded-lg glass-button opacity-60 group-hover:opacity-100 transition-opacity"
				aria-label="View on GitHub"
			>
				<HugeiconsIcon icon={GithubIcon} size={20} />
			</a>
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
			<li class="text-sm text-muted-foreground flex items-center gap-2">
				<span class="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0"></span>
				{feature}
			</li>
		{/each}
	</ul>
</article>
