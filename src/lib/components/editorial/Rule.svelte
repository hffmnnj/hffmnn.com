<script lang="ts">
	import { cn } from "$lib/utils/cn";

	type Variant = "hairline" | "heavy" | "dotted" | "spacer";
	type Width = "full" | "narrow";

	interface Props {
		variant?: Variant;
		width?: Width;
		class?: string;
	}

	let { variant = "hairline", width = "full", class: className = "" }: Props = $props();

	const variantStyles: Record<Variant, string> = {
		hairline: "border-0 border-t border-rule",
		heavy: "border-0 border-t-2 border-ink",
		dotted: "border-0 border-t border-dotted border-rule-strong",
		spacer: "border-0",
	};

	const widthStyles: Record<Width, string> = {
		full: "w-full",
		narrow: "w-12",
	};

	const classes = $derived(cn("my-6", variantStyles[variant], widthStyles[width], className));
</script>

<hr class={classes} />
