<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import { socials } from "$lib/data/socials";
	import { HugeiconsIcon, Github01Icon, NewTwitterIcon, Mail01Icon } from "$lib/icons";

	interface Props {
		class?: string;
	}

	let { class: className = "" }: Props = $props();

	const links = [
		{ href: socials.github.url, label: socials.github.label, external: true, icon: Github01Icon },
		{ href: socials.x.url, label: socials.x.label, external: true, icon: NewTwitterIcon },
		{ href: socials.email.url, label: socials.email.label, external: false, icon: Mail01Icon }
	] as const;
</script>

<div class={cn("flex items-center gap-6 text-sm", className)}>
	{#each links as link (link.label)}
		{#if link.external}
			<a
				href={link.href}
				target="_blank"
				rel="noopener noreferrer"
				class="editorial-link inline-flex items-center gap-2"
			>
				<HugeiconsIcon icon={link.icon} size={16} strokeWidth={1.5} />
				{link.label}
			</a>
		{:else}
			<a href={link.href} class="editorial-link inline-flex items-center gap-2">
				<HugeiconsIcon icon={link.icon} size={16} strokeWidth={1.5} />
				{link.label}
			</a>
		{/if}
	{/each}
</div>
