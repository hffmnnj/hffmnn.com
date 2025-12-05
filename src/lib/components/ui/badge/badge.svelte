<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	type Variant = "default" | "secondary" | "destructive" | "outline";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		variant?: Variant;
		class?: string;
		children?: Snippet;
	}

	let { variant = "default", class: className, children, ...restProps }: Props = $props();

	const baseStyles =
		"inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

	const variantStyles: Record<Variant, string> = {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		destructive: "border-transparent bg-destructive text-white",
		outline: "text-foreground",
	};

	let classes = $derived(cn(baseStyles, variantStyles[variant], className));
</script>

<div class={classes} {...restProps}>
	{#if children}
		{@render children()}
	{/if}
</div>
