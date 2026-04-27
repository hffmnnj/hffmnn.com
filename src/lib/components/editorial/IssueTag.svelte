<script lang="ts">
	import { cn } from "$lib/utils/cn";

	type TagType = "issue" | "volume" | "current";

	interface Props {
		type: TagType;
		value: string;
		accent?: boolean;
		class?: string;
	}

	let { type, value, accent = false, class: className = "" }: Props = $props();

	const prefixes: Record<TagType, string> = {
		issue: "ISSUE",
		volume: "VOL.",
		current: "CURRENT",
	};

	const baseStyles =
		"inline-flex items-center editorial-mono text-xs px-2 py-1 rounded-sm";

	const variantStyles = $derived(
		accent
			? "bg-accent-soft text-accent border border-accent/20"
			: "bg-paper-elevated text-ink-faint border border-rule",
	);

	const classes = $derived(cn(baseStyles, variantStyles, className));
</script>

<span class={classes}>
	{prefixes[type]} {value}
</span>
