<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { Byline } from "$lib/components/editorial";
	import { cn } from "$lib/utils/cn";

	interface Props {
		slug: string;
		title: string;
		description: string;
		tags: string[];
		githubUrl: string;
		features: string[];
		class?: string;
	}

	let {
		slug,
		title,
		description,
		tags,
		features,
		class: className = "",
	}: Props = $props();
</script>

<a
	href="/tools/{slug}"
	class={cn(
		"group block py-8 px-2 -mx-2 transition-colors hover:bg-paper-elevated/50",
		className,
	)}
>
	<article>
		<h3
			class="font-display text-xl md:text-2xl font-semibold text-ink group-hover:text-accent transition-colors mb-2"
		>
			{title}
		</h3>

		<Byline class="text-xs mb-4" />

		<p class="font-body text-base text-ink-soft leading-[1.6] mb-4">
			{description}
		</p>

		<div class="flex flex-wrap gap-x-3 gap-y-1 mb-4">
			{#each tags as tag (tag)}
				<Badge variant="kicker">{tag}</Badge>
			{/each}
		</div>

		{#if features.length > 0}
			<ul class="space-y-1.5 mb-5">
				{#each features as feature (feature)}
					<li
						class="font-body text-sm text-ink-soft leading-[1.5] flex gap-2"
					>
						<span class="text-ink-faint shrink-0" aria-hidden="true">·</span>
						<span>{feature}</span>
					</li>
				{/each}
			</ul>
		{/if}

		<span
			class="editorial-link text-sm inline-flex items-center gap-2 text-ink-soft group-hover:text-accent"
		>
			Read more <span aria-hidden="true">&rarr;</span>
		</span>
	</article>
</a>
