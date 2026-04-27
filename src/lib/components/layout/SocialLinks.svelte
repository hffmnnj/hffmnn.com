<script lang="ts">
	import { cn } from "$lib/utils/cn";

	interface Props {
		class?: string;
	}

	let { class: className = "" }: Props = $props();
</script>

<div class={cn("flex items-center gap-6 text-sm", className)}>
	<a
		href="https://github.com/hffmnnj"
		target="_blank"
		rel="noopener noreferrer"
		class="editorial-link"
	>
		GitHub
	</a>
	<a
		href="https://x.com/hffmnnj"
		target="_blank"
		rel="noopener noreferrer"
		class="editorial-link"
	>
		X
	</a>
	<a
		href="https://threads.net/@hffmnnj"
		target="_blank"
		rel="noopener noreferrer"
		class="editorial-link"
	>
		Threads
	</a>
	<a href="mailto:hffmnnj@tuta.io" class="editorial-link">Email</a>
</div>
