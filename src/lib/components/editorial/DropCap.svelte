<!--
	DropCap: wraps a paragraph (or paragraph-like block) and styles its first
	letter via .has-drop-cap CSS in app.css. Caveat: ::first-letter only renders
	when the first child is a block-level element with text content (e.g. <p>).
-->
<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = "", children }: Props = $props();
</script>

<div class={cn("has-drop-cap", className)}>
	{@render children?.()}
</div>
