<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant =
		| "default"
		| "secondary"
		| "destructive"
		| "outline"
		| "kicker"
		| "meta"
		| "accent";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		variant?: Variant;
		class?: string;
		children?: Snippet;
	}

	let { variant = "default", class: className, children, ...restProps }: Props = $props();

	const baseStyles =
		"inline-flex items-center text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

	const variantStyles: Record<Variant, string> = {
		default: "bg-ink text-paper px-2.5 py-0.5 rounded-sm border-transparent",
		secondary:
			"bg-paper-elevated text-ink-soft border border-rule px-2.5 py-0.5 rounded-sm",
		destructive: "bg-destructive text-paper px-2.5 py-0.5 rounded-sm border-transparent",
		outline: "border border-rule text-ink-soft px-2.5 py-0.5 rounded-sm",
		kicker: "editorial-mono text-ink-faint px-0 py-0 border-0 bg-transparent",
		meta: "italic text-ink-soft bg-paper-elevated px-2.5 py-0.5 rounded-full font-normal",
		accent:
			"editorial-mono text-accent bg-accent-soft border border-accent/20 px-2 py-0.5 rounded-sm",
	};

	let classes = $derived(cn(baseStyles, variantStyles[variant], className));
</script>

<div class={classes} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
