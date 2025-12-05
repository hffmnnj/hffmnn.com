<script lang="ts">
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { GithubIcon, NewTwitterIcon, Mail01Icon, ThreadsIcon } from "@hugeicons/core-free-icons";

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<div class="flex items-center gap-4 {className}">
	<a href="https://github.com/hffmnnj" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="GitHub">
		<HugeiconsIcon icon={GithubIcon} size={20} />
	</a>
	<a href="https://x.com/hffmnnj" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="X (Twitter)">
		<HugeiconsIcon icon={NewTwitterIcon} size={20} />
	</a>
	<a href="https://threads.net/@hffmnnj" target="_blank" rel="noopener noreferrer" class="icon-link" aria-label="Threads">
		<HugeiconsIcon icon={ThreadsIcon} size={20} />
	</a>
	<a href="mailto:hffmnnj@tuta.io" class="icon-link" aria-label="Email">
		<HugeiconsIcon icon={Mail01Icon} size={20} />
	</a>
</div>
