<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

	type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	type Size = "default" | "sm" | "lg" | "icon";

	interface BaseProps {
		variant?: Variant;
		size?: Size;
		class?: string;
		children?: Snippet;
	}

	interface ButtonProps extends BaseProps, Omit<HTMLButtonAttributes, "class"> {
		href?: never;
	}

	interface AnchorProps extends BaseProps, Omit<HTMLAnchorAttributes, "class"> {
		href: string;
	}

	type Props = ButtonProps | AnchorProps;

	let {
		variant = "default",
		size = "default",
		class: className,
		children,
		href,
		...restProps
	}: Props = $props();

	const baseStyles =
		"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

	const variantStyles: Record<Variant, string> = {
		default: "bg-primary text-primary-foreground hover:bg-primary/90",
		destructive: "bg-destructive text-white hover:bg-destructive/90",
		outline: "border border-white/20 bg-transparent hover:bg-white/10 hover:border-white/30",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		ghost: "border border-white/15 bg-transparent hover:bg-white/10 hover:border-white/25",
		link: "text-primary underline-offset-4 hover:underline",
	};

	const sizeStyles: Record<Size, string> = {
		default: "h-10 px-4 py-2",
		sm: "h-9 rounded-md px-3",
		lg: "h-11 rounded-md px-8",
		icon: "h-10 w-10",
	};

	let classes = $derived(cn(baseStyles, variantStyles[variant], sizeStyles[size], className));
</script>

{#if href}
	<a {href} class={classes} {...restProps as Omit<HTMLAnchorAttributes, "class">}>
		{#if children}
			{@render children()}
		{/if}
	</a>
{:else}
	<button class={classes} {...restProps as Omit<HTMLButtonAttributes, "class">}>
		{#if children}
			{@render children()}
		{/if}
	</button>
{/if}
