<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";

	type Side = "left" | "right";

	interface Props {
		side?: Side;
		class?: string;
		children?: Snippet;
	}

	let { side = "right", class: className = "", children }: Props = $props();

	const sideStyles: Record<Side, string> = {
		left: "text-left",
		right: "text-right",
	};

	const classes = $derived(
		cn(
			"hidden lg:block w-48 editorial-mono text-xs text-ink-faint leading-relaxed",
			sideStyles[side],
			className,
		),
	);
</script>

<aside class={classes}>
	{@render children?.()}
</aside>
