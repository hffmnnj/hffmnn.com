<script lang="ts">
	import { cn } from "$lib/utils/cn";

	interface Props {
		author?: string;
		location?: string;
		date?: string;
		class?: string;
	}

	let {
		author = "James Hoffmann",
		location,
		date,
		class: className = "",
	}: Props = $props();
</script>

<p class={cn("editorial-byline text-sm", className)}>
	By {author}{location ? ` · ${location}` : ""}{date ? ` · ${date}` : ""}
</p>
