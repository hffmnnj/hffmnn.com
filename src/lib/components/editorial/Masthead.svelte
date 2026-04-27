<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";

	interface Props {
		volume?: string;
		issue?: string;
		date?: string;
		location?: string;
		nameplate?: string;
		class?: string;
		children?: Snippet;
	}

	let {
		volume = "I",
		issue = "04",
		date,
		location = "PHOENIX, AZ",
		nameplate = "hffmnn",
		class: className = "",
		children,
	}: Props = $props();

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const resolvedDate = $derived.by(() => {
		if (date) return date;
		const now = new Date();
		return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
	});
</script>

<header class={cn("border-ink border-b-2 py-6", className)}>
	<div class="flex items-baseline justify-between gap-4">
		<a
			href="/"
			class="font-display text-ink text-4xl font-bold tracking-[-0.02em] md:text-6xl"
		>
			{nameplate}
		</a>
		<div class="editorial-mono text-ink-faint hidden text-xs sm:block">
			<div>{location}</div>
			<div>{resolvedDate}</div>
		</div>
	</div>
	<div class="border-rule mt-4 flex items-center justify-between border-t pt-3">
		<span class="editorial-mono text-ink-faint text-xs">
			VOL. {volume} · ISSUE {issue}
		</span>
		<nav class="flex items-center gap-4">
			{@render children?.()}
		</nav>
	</div>
</header>
