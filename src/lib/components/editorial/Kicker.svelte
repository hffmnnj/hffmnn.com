<script lang="ts">
	import { cn } from "$lib/utils/cn";

	interface Props {
		label: string;
		showRule?: boolean;
		class?: string;
	}

	let { label, showRule = false, class: className = "" }: Props = $props();
</script>

<div class={cn("mb-3", className)}>
	<span class="editorial-mono text-ink-faint text-xs" style="letter-spacing: 0.15em;">
		{label}
	</span>
	{#if showRule}
		<div class="border-rule mt-2 w-12 border-t"></div>
	{/if}
</div>
