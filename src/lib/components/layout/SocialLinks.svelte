<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import { socials } from "$lib/data/socials";

	interface Props {
		class?: string;
	}

	let { class: className = "" }: Props = $props();

	const links = [
		{ href: socials.github.url, label: socials.github.label, external: true },
		{ href: socials.x.url, label: socials.x.label, external: true },
		{ href: socials.email.url, label: socials.email.label, external: false }
	] as const;
</script>

<div class={cn("flex items-center gap-6 text-sm", className)}>
	{#each links as link (link.label)}
		{#if link.external}
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="editorial-link"
			>
				{link.label}
			</a>
		{:else}
			<a href={link.href} class="editorial-link">{link.label}</a>
		{/if}
	{/each}
</div>
